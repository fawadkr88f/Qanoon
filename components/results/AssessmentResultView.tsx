import Link from 'next/link';
import { Urdu } from '@/components/ui/Urdu';
import { Badge } from '@/components/ui/Badge';
import { TriadDiagram } from '@/components/results/TriadDiagram';
import { TissueScoreChart } from '@/components/results/TissueScoreChart';
import { FoodGroupTable, MealPlanTable } from '@/components/results/DietPlanTables';
import { PrintButton } from '@/components/results/PrintButton';
import { MedicalDisclaimer } from '@/components/layout/MedicalDisclaimer';
import type { AssessmentResult } from '@/types/qma';

interface AssessmentResultViewProps {
  readonly result: AssessmentResult;
  readonly onRetake?: () => void;
}

export function AssessmentResultView({ result, onRetake }: AssessmentResultViewProps) {
  const { triad, targetOrder, suggestedFormulation, diet, scores, ranking, confidence } = result;

  const dateFormatted = new Date(result.generatedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-10">
      {/* Top Banner Actions (Hidden on Print) */}
      <div className="flex flex-col gap-4 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-800">
            Observation Complete
          </span>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Your QMA Clinical Profile &amp; Dietary Prescription
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            Computed client-side on {dateFormatted}. No personal data stored.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {onRetake && (
            <button
              type="button"
              onClick={onRetake}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Retake Assessment
            </button>
          )}
          <PrintButton label="Print Observation Sheet" />
        </div>
      </div>

      {/* Patient Header for Print Only */}
      <div className="hidden border-b pb-4 print:block">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              Qanoon-e-Mufrad Aza (QMA) Patient Observation Sheet
            </h1>
            <p className="text-xs text-slate-600">
              Generated: {dateFormatted} · Client Assessment Record
            </p>
          </div>
          <div className="text-right text-xs">
            <p>Patient Name: _______________________</p>
            <p className="mt-1">Practitioner: _______________________</p>
          </div>
        </div>
      </div>

      {/* Primary Diagnostic Summary */}
      <section className="grid gap-8 lg:grid-cols-2 items-start print:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                Primary State (Tehreek / تحریک)
              </span>
              <div className="flex items-center gap-1.5">
                <Badge tone={triad.stimulationType === 'mechanical' ? 'brand' : 'warning'}>
                  {triad.stimulationType === 'mechanical' ? 'Mechanical (مادی/میکانیکی)' : 'Chemical (کیمیاوی)'}
                </Badge>
                <Badge tone="neutral">State {triad.tehreek.id}</Badge>
              </div>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              {triad.tehreek.classicalName}
            </h2>
            <p className="text-sm font-medium text-slate-600">
              {triad.tehreek.systemEn} · <Urdu>{triad.tehreek.termUrdu}</Urdu>
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-xs">
              <div>
                <span className="text-slate-500">Governing Organ:</span>
                <p className="font-semibold text-slate-900">{triad.tehreek.governingOrgan}</p>
              </div>
              <div>
                <span className="text-slate-500">Pathological Humour:</span>
                <p className="font-semibold text-slate-900">{triad.tehreek.dominantHumour}</p>
              </div>
              <div>
                <span className="text-slate-500">Stimulation Nature:</span>
                <p className="font-semibold capitalize text-slate-900">
                  {triad.stimulationType} (Nr. {triad.tehreek.id})
                </p>
              </div>
              <div>
                <span className="text-slate-500">
                  {triad.stimulationType === 'mechanical'
                    ? '2-Hop Tehleel Organ:'
                    : '2-Hop Taskeen Organ:'}
                </span>
                <p className="font-semibold text-slate-900">
                  Order {triad.twoHopOrgan.id} ({triad.twoHopOrgan.classicalName})
                </p>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                <span className="text-slate-500">Intake Confidence:</span>
                <span className="font-semibold capitalize text-slate-800">
                  {confidence.level} {confidence.tieBroken ? '(biomarker tie-breaker applied)' : ''}
                </span>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-[11px] leading-relaxed text-slate-600">
              {triad.stimulationType === 'mechanical' ? (
                <>
                  <strong>Mechanical Stimulation Rule (Orders 1, 3, 5):</strong> Stimulating Order {triad.tehreek.id} causes
                  the organ 2 hops further (<strong>Order {triad.tehleel.id} - {triad.tehleel.classicalName}</strong>) to enter <em>Tehleel</em> (depletion).
                </>
              ) : (
                <>
                  <strong>Chemical Stimulation Rule (Orders 2, 4, 6):</strong> Stimulating Order {triad.tehreek.id} causes
                  the organ 2 hops further (<strong>Order {triad.taskeen.id} - {triad.taskeen.classicalName}</strong>) to enter <em>Taskeen</em> (sedation).
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-brand-300 bg-brand-50/40 p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-900">
                3-Hop Antipodal Target (Prescription)
              </span>
              <Badge tone="brand">Target Order {targetOrder.id}</Badge>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-brand-950">
              Order {targetOrder.id}: {targetOrder.classicalName}
            </h2>
            <p className="text-sm font-medium text-slate-700">
              {targetOrder.systemEn} · <Urdu>{targetOrder.termUrdu}</Urdu>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              By stimulating Order {targetOrder.id} ({targetOrder.temperament.en}), the hyperactive{' '}
              {triad.tehreek.classicalName} tissue is gently forced into sedation, restoring systemic humoral equilibrium.
            </p>
          </div>
        </div>

        {/* Hexagonal Triad Visualisation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 self-start">
            Hexagonal Cycle &amp; Dynamics
          </h3>
          <p className="text-xs text-slate-500 self-start mb-4">
            Tehreek: State {triad.tehreek.id} ({triad.stimulationType}) ➔ 2-Hop: State {triad.twoHopOrgan.id} (
            {triad.stimulationType === 'mechanical' ? 'Tehleel' : 'Taskeen'}) ➔ 3-Hop Target: State {targetOrder.id}
          </p>
          <TriadDiagram triad={triad} />
        </div>
      </section>

      {/* Quantitative Tissue Scores */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">
          Quantitative Functional Tissue Scores (Mufrad Aza)
        </h3>
        <p className="mt-1 text-xs text-slate-500 mb-6">
          Distribution of diagnostic markers across the 3 fundamental organs and tissue matrices.
        </p>
        <TissueScoreChart scores={scores} ranking={ranking} />
      </section>

      {/* Pharmacopeia Recommendation (Safe Overview) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs print-avoid-break">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Prescription Formulation Category
            </span>
            <h3 className="text-xl font-black text-slate-900">
              {suggestedFormulation.name} (<Urdu>{suggestedFormulation.nameUrdu}</Urdu>)
            </h3>
          </div>
          <Badge tone={result.bowelStatus === 'constipated' ? 'warning' : 'neutral'}>
            Bowel Profile: {result.bowelStatus}
          </Badge>
        </div>

        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>
            <strong>Therapeutic Action:</strong> {suggestedFormulation.purpose}
          </p>
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-950">
            <strong>Clinical Safety Notice:</strong> Specific medicinal compounds, dosages, and mineral purifications
            (Kajjali, Mudabbar) require precise qualification and supervision. Consult a verified practitioner to obtain the
            appropriate classical formulation.
          </div>
        </div>
      </section>

      {/* Recommended Dietary Chart (Ghaza) */}
      <section className="space-y-6 print-break-before">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Dietary Prescription
            </span>
            <Badge tone="brand">Ghaza No. {diet.ghazaNo}</Badge>
          </div>
          <h2 className="mt-1 text-2xl font-black text-slate-900">
            Nutritional Regimen (Ghaza No. {diet.ghazaNo})
          </h2>
          <p className="text-sm text-slate-600">
            Temperament: {diet.temperament.en} (<Urdu>{diet.temperament.ur}</Urdu>) — Designed to counter Order {diet.curesOrder}.
          </p>
        </div>

        <FoodGroupTable plan={diet} />
      </section>

      {/* Daily Meal Schedule */}
      <section className="space-y-4 print-avoid-break">
        <h3 className="text-lg font-bold text-slate-900">
          Structured Daily Meal Schedule (Menu {diet.ghazaNo})
        </h3>
        <MealPlanTable plan={diet} />
      </section>

      {/* Find Practitioner CTA (Hidden on Print) */}
      <section className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white text-center print:hidden">
        <h3 className="text-2xl font-black">Discuss Your Results With a Qualified Hakim</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
          Connect with practitioners in Germany, Pakistan, and internationally for in-person Qarura (urine) &amp; Nabz (pulse)
          evaluations or structured tele-health consultations.
        </p>
        <div className="mt-6">
          <Link
            href="/practitioners"
            className="inline-flex rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-400 focus-visible:outline-2 focus-visible:outline-white"
          >
            Browse Verified Practitioner Directory
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <MedicalDisclaimer />
    </div>
  );
}
