/**
 * Core domain types for Qanoon-e-Mufrad Aza (QMA).
 * Source of truth: Qanoon_Mufrad_Aza_Clinical_Master_Database.xlsx (sheets 1–6).
 */

/* -------------------------------------------------------------------------- */
/*  Tissues & orders                                                          */
/* -------------------------------------------------------------------------- */

/** The three fundamental tissues (Mufrad Aza). */
export type TissueType = 'aasabi' | 'azlati' | 'ghudi';

/** The six compound states on the hexagonal QMA cycle. */
export type OrderId = 1 | 2 | 3 | 4 | 5 | 6;

export type TissueScores = Readonly<Record<TissueType, number>>;

export interface BilingualText {
  readonly en: string;
  /** Classical Urdu rendering (rendered RTL). */
  readonly ur: string;
}

export interface TissueInfo {
  readonly id: TissueType;
  /** Transliterated classical name, e.g. "Aasabi". */
  readonly name: string;
  readonly nameUrdu: string;
  /** English tissue name, e.g. "Nervous". */
  readonly tissueEn: string;
  /** Governing organ, e.g. "Brain". */
  readonly organ: string;
  readonly description: string;
}

export interface QMAOrder {
  readonly id: OrderId;
  readonly slug: string;
  /** Dominant (stimulated) tissue. */
  readonly primary: TissueType;
  /** Secondary tissue that colours the state. */
  readonly secondary: TissueType;
  /** English system label, e.g. "Nervous – Muscular". */
  readonly systemEn: string;
  /** Transliterated classical term, e.g. "Aasabi-Azlati". */
  readonly classicalName: string;
  readonly termUrdu: string;
  readonly temperament: BilingualText;
  readonly dominantHumour: string;
  readonly governingOrgan: string;
}

/** Roles of the three orders involved in the 3-hop triad. */
export type TriadRole = 'tehreek' | 'tehleel' | 'taskeen';

export interface QMATriad {
  /** Tehreek — hyperactive / stimulated (diagnosed) state. */
  readonly tehreek: QMAOrder;
  /** Tehleel — dissolving / depleted state (next in cycle). */
  readonly tehleel: QMAOrder;
  /** Taskeen — dormant state, +3 hops; the therapeutic target. */
  readonly taskeen: QMAOrder;
}

/* -------------------------------------------------------------------------- */
/*  Pharmacopeia                                                              */
/* -------------------------------------------------------------------------- */

export type FormulationDegree = 'shadeed' | 'mulyan' | 'mushil' | 'akseer';

export type FormulationHazard = 'mercury' | 'arsenic' | 'croton' | 'strong-purgative' | 'mineral';

export interface Formulation {
  readonly order: OrderId;
  readonly degree: FormulationDegree;
  /** e.g. "Shadeed No. 1" */
  readonly name: string;
  readonly nameUrdu: string;
  readonly ingredients: readonly string[];
  readonly ratio: string;
  readonly singleDose: string;
  readonly frequency: string;
  readonly purpose: string;
  /** Practitioner-only formulas are never suggested automatically. */
  readonly practitionerOnly: boolean;
  readonly hazards: readonly FormulationHazard[];
}

/* -------------------------------------------------------------------------- */
/*  Diet                                                                      */
/* -------------------------------------------------------------------------- */

export interface FoodGroups {
  readonly grains: readonly string[];
  readonly vegetables: readonly string[];
  readonly proteins: readonly string[];
  readonly fruits: readonly string[];
  readonly spices: readonly string[];
  readonly infusions: readonly string[];
}

export type MealSlot = 'breakfast' | 'morningSnack' | 'lunch' | 'eveningSnack' | 'dinner' | 'bedtime';

export type DailyMenu = Readonly<Record<MealSlot, string>>;

export interface DietaryPlan {
  /** Ghaza number — equal to the order whose temperament it carries. */
  readonly ghazaNo: OrderId;
  readonly temperament: BilingualText;
  /** The morbid (Tehreek) order this diet counter-balances. */
  readonly curesOrder: OrderId;
  readonly foodGroups: FoodGroups;
  readonly mealPlan: DailyMenu;
}

/* -------------------------------------------------------------------------- */
/*  Intake / assessment                                                       */
/* -------------------------------------------------------------------------- */

export type QuestionId =
  | 'Q1.1'
  | 'Q1.2'
  | 'Q2.1'
  | 'Q2.2'
  | 'Q3.1'
  | 'Q3.2'
  | 'Q4.1'
  | 'Q4.2'
  | 'Q5.1'
  | 'Q5.2';

export type OptionKey = 'A' | 'B' | 'C';

export type BowelStatus = 'normal' | 'constipated' | 'purging';

export interface IntakeOption {
  readonly key: OptionKey;
  readonly tissue: TissueType;
  readonly label: string;
  readonly weight: number;
  /** Only present on the bowel question; drives formulation degree. */
  readonly bowelStatus?: BowelStatus;
}

export interface IntakeQuestion {
  readonly id: QuestionId;
  /** Grouping shown in the progress stepper. */
  readonly section: string;
  readonly domain: string;
  readonly prompt: string;
  readonly options: readonly [IntakeOption, IntakeOption, IntakeOption];
  /** Clinical triage rationale (from intake matrix). */
  readonly rationale: string;
  /** Lower number = stronger marker, used to break score ties. */
  readonly tieBreakPriority?: number;
}

export type AssessmentAnswers = Partial<Record<QuestionId, OptionKey>>;
export type CompleteAssessmentAnswers = Readonly<Record<QuestionId, OptionKey>>;

export type ConfidenceLevel = 'high' | 'moderate' | 'low';

export interface AssessmentConfidence {
  readonly level: ConfidenceLevel;
  /** Smallest normalised gap (0–1) between consecutive ranked tissues. */
  readonly margin: number;
  /** True when a score tie had to be broken by marker priority. */
  readonly tieBroken: boolean;
}

export interface AnsweredItem {
  readonly questionId: QuestionId;
  readonly domain: string;
  readonly prompt: string;
  readonly answer: string;
  readonly tissue: TissueType;
}

export interface AssessmentResult {
  readonly scores: TissueScores;
  readonly ranking: readonly [TissueType, TissueType, TissueType];
  readonly triad: QMATriad;
  /** Therapeutic target order (= triad.taskeen), via the 3-hop rule. */
  readonly targetOrder: QMAOrder;
  readonly bowelStatus: BowelStatus;
  /** Educational suggestion — Shadeed or Mulyan only. */
  readonly suggestedFormulation: Formulation;
  readonly diet: DietaryPlan;
  readonly confidence: AssessmentConfidence;
  readonly answered: readonly AnsweredItem[];
  /** ISO timestamp, generated on the client only. */
  readonly generatedAt: string;
}

/**
 * Mirrors the `qma_assessments` table (sheet 6) for a possible future,
 * explicitly opt-in, de-identified research export. NOT persisted in this build.
 */
export interface AssessmentRecordDraft {
  readonly score_aasabi: number;
  readonly score_azlati: number;
  readonly score_ghudi: number;
  readonly diagnosed_tehreek: OrderId;
  readonly target_cure_order: OrderId;
  readonly bowel_status_flag: BowelStatus;
  readonly prescribed_ghaza: OrderId;
}
