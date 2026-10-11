import { describe, expect, it } from 'vitest';
import {
  IncompleteAssessmentError,
  buildAssessmentResult,
  calculateTissueScores,
  computeConfidence,
  deriveBowelStatus,
  maxPossibleScores,
  nextInCycle,
  orderFromTissues,
  rankTissues,
  resolveTriad,
  selectDegree,
  threeHop,
  toOrderId,
} from '@/lib/qmaEngine';
import { DIETARY_PLANS, FORMULATIONS, INTAKE_QUESTIONS, QMA_ORDERS } from '@/lib/qma-engine';
import type { AssessmentAnswers, CompleteAssessmentAnswers, OrderId } from '@/types/qma';

const allAnswers = (key: 'A' | 'B' | 'C'): CompleteAssessmentAnswers =>
  Object.fromEntries(INTAKE_QUESTIONS.map((q) => [q.id, key])) as CompleteAssessmentAnswers;

describe('3-hop arithmetic', () => {
  it.each<[OrderId, OrderId]>([
    [1, 4],
    [2, 5],
    [3, 6],
    [4, 1],
    [5, 2],
    [6, 3],
  ])('threeHop(%i) = %i (matches sheet 1 targets)', (state, target) => {
    expect(threeHop(state)).toBe(target);
  });

  it('is an involution: applying it twice returns the original order', () => {
    for (const o of QMA_ORDERS) expect(threeHop(threeHop(o.id))).toBe(o.id);
  });

  it('nextInCycle wraps 6 → 1', () => {
    expect(nextInCycle(6)).toBe(1);
    expect(nextInCycle(3)).toBe(4);
  });

  it('rejects invalid order ids', () => {
    expect(() => toOrderId(0)).toThrow(RangeError);
    expect(() => toOrderId(7)).toThrow(RangeError);
    expect(() => toOrderId(2.5)).toThrow(RangeError);
  });

  describe('Stimulation logic: Mechanical (1, 3, 5) vs Chemical (2, 4, 6)', () => {
    it.each<[OrderId, 'mechanical' | 'chemical']>([
      [1, 'mechanical'],
      [2, 'chemical'],
      [3, 'mechanical'],
      [4, 'chemical'],
      [5, 'mechanical'],
      [6, 'chemical'],
    ])('order %i is classified as %s stimulation', (id, expectedType) => {
      const triad = resolveTriad(id);
      expect(triad.stimulationType).toBe(expectedType);
    });

    it('in Mechanical stimulations (1, 3, 5), body pairs Tehreek & Tehleel; target is Tehleel (2 hops)', () => {
      // Order 1 -> 2 hops further is 3 (Tehleel)
      const t1 = resolveTriad(1);
      expect(t1.activePairedRole).toBe('tehleel');
      expect(t1.tehleel?.id).toBe(3);
      expect(t1.taskeen).toBeUndefined();
      expect(t1.twoHopOrgan.id).toBe(3);
      expect(t1.targetOrder.id).toBe(3);
      expect(t1.targetRole).toBe('tehleel');

      // Order 3 -> 2 hops further is 5 (Tehleel)
      const t3 = resolveTriad(3);
      expect(t3.activePairedRole).toBe('tehleel');
      expect(t3.tehleel?.id).toBe(5);
      expect(t3.taskeen).toBeUndefined();
      expect(t3.twoHopOrgan.id).toBe(5);
      expect(t3.targetOrder.id).toBe(5);
      expect(t3.targetRole).toBe('tehleel');

      // Order 5 -> 2 hops further is 1 (Tehleel)
      const t5 = resolveTriad(5);
      expect(t5.activePairedRole).toBe('tehleel');
      expect(t5.tehleel?.id).toBe(1);
      expect(t5.taskeen).toBeUndefined();
      expect(t5.twoHopOrgan.id).toBe(1);
      expect(t5.targetOrder.id).toBe(1);
      expect(t5.targetRole).toBe('tehleel');
    });

    it('in Chemical stimulations (2, 4, 6), body pairs Tehreek & Taskeen; target is Taskeen (2 hops)', () => {
      // Order 2 -> 2 hops further is 4 (Taskeen)
      const t2 = resolveTriad(2);
      expect(t2.activePairedRole).toBe('taskeen');
      expect(t2.taskeen?.id).toBe(4);
      expect(t2.tehleel).toBeUndefined();
      expect(t2.twoHopOrgan.id).toBe(4);
      expect(t2.targetOrder.id).toBe(4);
      expect(t2.targetRole).toBe('taskeen');

      // Order 4 -> 2 hops further is 6 (Taskeen)
      const t4 = resolveTriad(4);
      expect(t4.activePairedRole).toBe('taskeen');
      expect(t4.taskeen?.id).toBe(6);
      expect(t4.tehleel).toBeUndefined();
      expect(t4.twoHopOrgan.id).toBe(6);
      expect(t4.targetOrder.id).toBe(6);
      expect(t4.targetRole).toBe('taskeen');

      // Order 6 -> 2 hops further is 2 (Taskeen)
      const t6 = resolveTriad(6);
      expect(t6.activePairedRole).toBe('taskeen');
      expect(t6.taskeen?.id).toBe(2);
      expect(t6.tehleel).toBeUndefined();
      expect(t6.twoHopOrgan.id).toBe(2);
      expect(t6.targetOrder.id).toBe(2);
      expect(t6.targetRole).toBe('taskeen');
    });
  });
});

describe('data integrity', () => {
  it('has 6 orders, 36 formulations (6 orders × 6 degrees) and 6 diet plans', () => {
    expect(QMA_ORDERS).toHaveLength(6);
    expect(FORMULATIONS).toHaveLength(36);
    expect(DIETARY_PLANS).toHaveLength(6);
  });

  it('maps every tissue pair to exactly one order', () => {
    expect(orderFromTissues('aasabi', 'azlati').id).toBe(1);
    expect(orderFromTissues('azlati', 'aasabi').id).toBe(2);
    expect(orderFromTissues('azlati', 'ghudi').id).toBe(3);
    expect(orderFromTissues('ghudi', 'azlati').id).toBe(4);
    expect(orderFromTissues('ghudi', 'aasabi').id).toBe(5);
    expect(orderFromTissues('aasabi', 'ghudi').id).toBe(6);
  });

  it('every Ghaza cures the order three hops away', () => {
    for (const plan of DIETARY_PLANS) expect(threeHop(plan.ghazaNo)).toBe(plan.curesOrder);
  });

  it('flags all Mus-hil and Akseer formulas as practitioner-only', () => {
    for (const f of FORMULATIONS) {
      if (f.degree === 'mushil' || f.degree === 'akseer') expect(f.practitionerOnly).toBe(true);
      if (f.hazards.includes('mercury') || f.hazards.includes('arsenic')) expect(f.practitionerOnly).toBe(true);
    }
  });
});

describe('scoring', () => {
  it('sums weights per tissue', () => {
    expect(calculateTissueScores(allAnswers('A'))).toEqual({ aasabi: 23, azlati: 0, ghudi: 0 });
    expect(calculateTissueScores(allAnswers('B'))).toEqual({ aasabi: 0, azlati: 28, ghudi: 0 });
    expect(calculateTissueScores(allAnswers('C'))).toEqual({ aasabi: 0, azlati: 0, ghudi: 28 });
  });

  it('reports max possible scores', () => {
    expect(maxPossibleScores()).toEqual({ aasabi: 23, azlati: 28, ghudi: 28 });
  });

  it('ignores unanswered questions', () => {
    expect(calculateTissueScores({ 'Q2.2': 'C' })).toEqual({ aasabi: 0, azlati: 0, ghudi: 3 });
  });
});

describe('tie-breaking', () => {
  it('uses the Qarura marker first', () => {
    const r = rankTissues({ aasabi: 5, azlati: 10, ghudi: 10 }, { 'Q2.1': 'C', 'Q3.1': 'B' });
    expect(r.ranking).toEqual(['ghudi', 'azlati', 'aasabi']);
    expect(r.tieBroken).toBe(true);
  });

  it('falls back to canonical sequence when no marker discriminates', () => {
    const r = rankTissues({ aasabi: 10, azlati: 10, ghudi: 0 }, {});
    expect(r.ranking).toEqual(['aasabi', 'azlati', 'ghudi']);
  });

  it('reports low confidence on ties', () => {
    const scores = { aasabi: 10, azlati: 10, ghudi: 0 };
    expect(computeConfidence(scores, rankTissues(scores, {})).level).toBe('low');
  });
});

describe('degree selection', () => {
  it('constipation → Mulyan, otherwise Shadeed', () => {
    expect(selectDegree('constipated')).toBe('mulyan');
    expect(selectDegree('purging')).toBe('shadeed');
    expect(selectDegree('normal')).toBe('shadeed');
  });

  it('derives bowel status from Q4.1', () => {
    expect(deriveBowelStatus({ 'Q4.1': 'B' })).toBe('constipated');
    expect(deriveBowelStatus({ 'Q4.1': 'A' })).toBe('purging');
    expect(deriveBowelStatus({})).toBe('normal');
  });
});

describe('buildAssessmentResult', () => {
  // Mirrors the sheet-6 sample row: Tehreek 2 → target 5, constipated → Mulyan No. 5, Ghaza 5.
  const answers: CompleteAssessmentAnswers = {
    'Q1.1': 'B',
    'Q1.2': 'B',
    'Q2.1': 'B',
    'Q2.2': 'A',
    'Q3.1': 'B',
    'Q3.2': 'A',
    'Q4.1': 'B',
    'Q4.2': 'B',
    'Q5.1': 'A',
    'Q5.2': 'C',
  };
  const now = new Date('2026-10-11T14:30:00Z');
  const result = buildAssessmentResult(answers, { now });

  it('computes scores and ranking', () => {
    expect(result.scores).toEqual({ aasabi: 6, azlati: 17, ghudi: 3 });
    expect(result.ranking).toEqual(['azlati', 'aasabi', 'ghudi']);
  });

  it('resolves Tehreek 2 → Chemical stimulation → paired Taskeen target 4 with Mulyan No. 4 and Ghaza 4', () => {
    expect(result.triad.tehreek.id).toBe(2);
    expect(result.triad.stimulationType).toBe('chemical');
    expect(result.triad.targetRole).toBe('taskeen');
    expect(result.targetOrder.id).toBe(4);
    expect(result.bowelStatus).toBe('constipated');
    expect(result.suggestedFormulation.name).toBe('Mulyan No. 4');
    expect(result.suggestedFormulation.practitionerOnly).toBe(false);
    expect(result.diet.ghazaNo).toBe(4);
    expect(result.diet.curesOrder).toBe(1);
  });

  it('is deterministic for an injected clock', () => {
    expect(buildAssessmentResult(answers, { now })).toEqual(result);
    expect(result.generatedAt).toBe('2026-10-11T14:30:00.000Z');
    // Secondary margin (aasabi 6 vs ghudi 3) = 3 / 26 ≈ 0.115 → moderate.
    expect(result.confidence.level).toBe('moderate');
    expect(result.confidence.tieBroken).toBe(false);
  });

  it('throws on incomplete answers', () => {
    const partial: AssessmentAnswers = { 'Q1.1': 'A' };
    expect(() => buildAssessmentResult(partial)).toThrow(IncompleteAssessmentError);
  });

  it('never auto-suggests a practitioner-only formula', () => {
    for (const key of ['A', 'B', 'C'] as const) {
      expect(buildAssessmentResult(allAnswers(key), { now }).suggestedFormulation.practitionerOnly).toBe(false);
    }
  });
});
