/**
 * QMA Clinical Logic Engine
 * ─────────────────────────
 * Pure, deterministic, side-effect-free TypeScript. No I/O, no storage, no
 * network — safe to run entirely in the browser (GDPR: health data never
 * leaves the device).
 *
 * Pipeline:
 *   answers ──► tissue scores ──► ranked tissues ──► Tehreek order
 *          ──► 3-hop target (Taskeen) ──► Ghaza diet + formulation degree
 */
import { DIETARY_PLANS } from '@/lib/qma-engine/diet';
import { DEGREE_INFO, FORMULATIONS } from '@/lib/qma-engine/formulations';
import { QMA_ORDERS, TISSUE_SEQUENCE } from '@/lib/qma-engine/orders';
import { INTAKE_QUESTIONS } from '@/lib/qma-engine/questions';
import type {
  AnsweredItem,
  AssessmentAnswers,
  AssessmentConfidence,
  AssessmentRecordDraft,
  AssessmentResult,
  BowelStatus,
  CompleteAssessmentAnswers,
  ConfidenceLevel,
  DietaryPlan,
  Formulation,
  FormulationDegree,
  IntakeOption,
  IntakeQuestion,
  OptionKey,
  OrderId,
  QMAOrder,
  QMATriad,
  TissueScores,
  TissueType,
} from '@/types/qma';

export const ORDER_COUNT = 6;
/** Number of steps across the hexagon to reach the antipodal (dormant) order. */
export const HOP_DISTANCE = 3;

/** Confidence thresholds on the normalised score margin (0–1). */
export const CONFIDENCE_THRESHOLDS = { high: 0.15, moderate: 0.06 } as const;

export class IncompleteAssessmentError extends Error {
  constructor(public readonly missing: readonly string[]) {
    super(`Assessment incomplete. Missing answers: ${missing.join(', ')}`);
    this.name = 'IncompleteAssessmentError';
  }
}

/* -------------------------------------------------------------------------- */
/*  Order arithmetic                                                          */
/* -------------------------------------------------------------------------- */

export function isOrderId(value: number): value is OrderId {
  return Number.isInteger(value) && value >= 1 && value <= ORDER_COUNT;
}

export function toOrderId(value: number): OrderId {
  if (!isOrderId(value)) {
    throw new RangeError(`Invalid QMA order "${value}". Expected an integer 1–${ORDER_COUNT}.`);
  }
  return value;
}

/**
 * The 3-hop antipodal rule (sheet 1):
 *   Target = MOD(Tehreek − 1 + 3, 6) + 1
 * 1→4, 2→5, 3→6, 4→1, 5→2, 6→3.
 */
export function threeHop(state: OrderId): OrderId {
  return toOrderId(((state - 1 + HOP_DISTANCE) % ORDER_COUNT) + 1);
}

/** Next order in the natural cycle (the Tehleel / depleted state). */
export function nextInCycle(state: OrderId): OrderId {
  return toOrderId((state % ORDER_COUNT) + 1);
}

export function getOrder(id: OrderId): QMAOrder {
  const order = QMA_ORDERS.find((o) => o.id === id);
  if (!order) throw new RangeError(`Order ${id} is not defined.`);
  return order;
}

/** Maps a (primary, secondary) tissue pair to its compound order. */
export function orderFromTissues(primary: TissueType, secondary: TissueType): QMAOrder {
  if (primary === secondary) {
    throw new RangeError('Primary and secondary tissue must differ.');
  }
  const order = QMA_ORDERS.find((o) => o.primary === primary && o.secondary === secondary);
  if (!order) throw new RangeError(`No order for ${primary} → ${secondary}.`);
  return order;
}

export function resolveTriad(tehreekId: OrderId): QMATriad {
  return {
    tehreek: getOrder(tehreekId),
    tehleel: getOrder(nextInCycle(tehreekId)),
    taskeen: getOrder(threeHop(tehreekId)),
  };
}

/* -------------------------------------------------------------------------- */
/*  Scoring                                                                   */
/* -------------------------------------------------------------------------- */

function emptyScores(): Record<TissueType, number> {
  return { aasabi: 0, azlati: 0, ghudi: 0 };
}

function selectedOption(question: IntakeQuestion, key: OptionKey | undefined): IntakeOption | undefined {
  return key === undefined ? undefined : question.options.find((o) => o.key === key);
}

/** Sums weighted points per tissue. Unanswered questions contribute nothing. */
export function calculateTissueScores(
  answers: AssessmentAnswers,
  questions: readonly IntakeQuestion[] = INTAKE_QUESTIONS,
): TissueScores {
  const scores = emptyScores();
  for (const question of questions) {
    const option = selectedOption(question, answers[question.id]);
    if (option) scores[option.tissue] += option.weight;
  }
  return scores;
}

/** Highest achievable score per tissue (useful for normalised charts). */
export function maxPossibleScores(questions: readonly IntakeQuestion[] = INTAKE_QUESTIONS): TissueScores {
  const max = emptyScores();
  for (const question of questions) {
    for (const option of question.options) max[option.tissue] += option.weight;
  }
  return max;
}

export interface TissueRanking {
  readonly ranking: readonly [TissueType, TissueType, TissueType];
  readonly tieBroken: boolean;
}

/**
 * Ranks tissues by score (desc). Ties are resolved by the strongest diagnostic
 * marker the respondent chose (Qarura → Tongue → Thermal), then by canonical
 * sequence (Aasabi → Azlati → Ghudi) for full determinism.
 */
export function rankTissues(
  scores: TissueScores,
  answers: AssessmentAnswers,
  questions: readonly IntakeQuestion[] = INTAKE_QUESTIONS,
): TissueRanking {
  const markerRank = (tissue: TissueType): number => {
    let best = Number.POSITIVE_INFINITY;
    for (const q of questions) {
      if (q.tieBreakPriority === undefined) continue;
      if (selectedOption(q, answers[q.id])?.tissue === tissue) {
        best = Math.min(best, q.tieBreakPriority);
      }
    }
    return best;
  };

  const compare = (a: TissueType, b: TissueType): number => {
    const byScore = scores[b] - scores[a];
    if (byScore !== 0) return byScore;
    const ra = markerRank(a);
    const rb = markerRank(b);
    if (ra !== rb) return ra < rb ? -1 : 1;
    return TISSUE_SEQUENCE.indexOf(a) - TISSUE_SEQUENCE.indexOf(b);
  };

  const [first, second, third] = [...TISSUE_SEQUENCE].sort(compare);
  if (!first || !second || !third) throw new Error('Tissue sequence must contain three tissues.');

  return {
    ranking: [first, second, third],
    tieBroken: scores[first] === scores[second] || scores[second] === scores[third],
  };
}

export function computeConfidence(
  scores: TissueScores,
  { ranking, tieBroken }: TissueRanking,
): AssessmentConfidence {
  const [first, second, third] = ranking;
  const total = scores.aasabi + scores.azlati + scores.ghudi;
  if (total === 0) return { level: 'low', margin: 0, tieBroken };

  // Primary margin decides the dominant tissue; secondary margin decides the sub-state.
  const margin = Math.min(scores[first] - scores[second], scores[second] - scores[third]) / total;

  let level: ConfidenceLevel = 'low';
  if (!tieBroken && margin >= CONFIDENCE_THRESHOLDS.high) level = 'high';
  else if (!tieBroken && margin >= CONFIDENCE_THRESHOLDS.moderate) level = 'moderate';

  return { level, margin: Number(margin.toFixed(3)), tieBroken };
}

/* -------------------------------------------------------------------------- */
/*  Therapeutics                                                              */
/* -------------------------------------------------------------------------- */

export function deriveBowelStatus(
  answers: AssessmentAnswers,
  questions: readonly IntakeQuestion[] = INTAKE_QUESTIONS,
): BowelStatus {
  for (const q of questions) {
    const status = selectedOption(q, answers[q.id])?.bowelStatus;
    if (status) return status;
  }
  return 'normal';
}

/**
 * Degree selection (sheet 6, `bowel_status_flag`): constipation → Mulyan,
 * otherwise Shadeed. Mus-hil / Akseer are NEVER auto-selected.
 */
export function selectDegree(bowel: BowelStatus): Extract<FormulationDegree, 'shadeed' | 'mulyan'> {
  return bowel === 'constipated' ? 'mulyan' : 'shadeed';
}

export function getFormulation(order: OrderId, degree: FormulationDegree): Formulation {
  const f = FORMULATIONS.find((x) => x.order === order && x.degree === degree);
  if (!f) throw new RangeError(`No ${DEGREE_INFO[degree].label} formulation for order ${order}.`);
  return f;
}

export function getFormulationsForOrder(order: OrderId): readonly Formulation[] {
  return FORMULATIONS.filter((f) => f.order === order);
}

/** Ghaza No. N carries Order N's temperament — so the target order's Ghaza is prescribed. */
export function getDietaryPlan(ghazaNo: OrderId): DietaryPlan {
  const plan = DIETARY_PLANS.find((p) => p.ghazaNo === ghazaNo);
  if (!plan) throw new RangeError(`No Ghaza plan ${ghazaNo}.`);
  return plan;
}

/* -------------------------------------------------------------------------- */
/*  Orchestration                                                             */
/* -------------------------------------------------------------------------- */

export function missingAnswers(
  answers: AssessmentAnswers,
  questions: readonly IntakeQuestion[] = INTAKE_QUESTIONS,
): readonly IntakeQuestion['id'][] {
  return questions.filter((q) => answers[q.id] === undefined).map((q) => q.id);
}

export function isAssessmentComplete(
  answers: AssessmentAnswers,
  questions: readonly IntakeQuestion[] = INTAKE_QUESTIONS,
): answers is CompleteAssessmentAnswers {
  return missingAnswers(answers, questions).length === 0;
}

export interface BuildResultOptions {
  readonly questions?: readonly IntakeQuestion[];
  /** Injectable clock to keep the function pure & testable. */
  readonly now?: Date;
}

export function buildAssessmentResult(
  answers: AssessmentAnswers,
  { questions = INTAKE_QUESTIONS, now = new Date() }: BuildResultOptions = {},
): AssessmentResult {
  const missing = missingAnswers(answers, questions);
  if (missing.length > 0) throw new IncompleteAssessmentError(missing);

  const scores = calculateTissueScores(answers, questions);
  const tissueRanking = rankTissues(scores, answers, questions);
  const [primary, secondary] = tissueRanking.ranking;

  const tehreek = orderFromTissues(primary, secondary);
  const triad = resolveTriad(tehreek.id);
  const target = triad.taskeen;
  const bowelStatus = deriveBowelStatus(answers, questions);

  const answered: AnsweredItem[] = questions.flatMap((q) => {
    const option = selectedOption(q, answers[q.id]);
    return option
      ? [{ questionId: q.id, domain: q.domain, prompt: q.prompt, answer: option.label, tissue: option.tissue }]
      : [];
  });

  return {
    scores,
    ranking: tissueRanking.ranking,
    triad,
    targetOrder: target,
    bowelStatus,
    suggestedFormulation: getFormulation(target.id, selectDegree(bowelStatus)),
    diet: getDietaryPlan(target.id),
    confidence: computeConfidence(scores, tissueRanking),
    answered,
    generatedAt: now.toISOString(),
  };
}

/**
 * Shapes a result like a `qma_assessments` row (sheet 6) for a future,
 * explicit opt-in research export. Contains no identifiers. Not called anywhere
 * in this build — no data is persisted.
 */
export function toAssessmentRecordDraft(result: AssessmentResult): AssessmentRecordDraft {
  return {
    score_aasabi: result.scores.aasabi,
    score_azlati: result.scores.azlati,
    score_ghudi: result.scores.ghudi,
    diagnosed_tehreek: result.triad.tehreek.id,
    target_cure_order: result.targetOrder.id,
    bowel_status_flag: result.bowelStatus,
    prescribed_ghaza: result.diet.ghazaNo,
  };
}
