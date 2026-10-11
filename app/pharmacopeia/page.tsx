import type { Metadata } from 'next';
import { FORMULATIONS, DEGREE_INFO, HAZARD_LABELS } from '@/lib/qma-engine/formulations';
import { Urdu } from '@/components/ui/Urdu';
import { Badge } from '@/components/ui/Badge';
import { MedicalDisclaimer } from '@/components/layout/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Classical Pharmacopeia · Qanoon-e-Mufrad Aza',
  description:
    'Complete Sabir Multani classical formulation matrix (Orders 1–6, Degrees 1–4) with safety warnings and hazard classifications.',
};

export default function PharmacopeiaPage() {
  return (
    <div className="container-page py-12 space-y-10">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
          Materia Medica &amp; Formulations
        </span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Classical Pharmacopeia (Sabir Multani Matrix)
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          The 24 foundational formulations across all six orders and four therapeutic degrees:
          <strong> Shadeed</strong> (Stimulant), <strong>Mulyan</strong> (Aperient),
          <strong> Mus-hil</strong> (Purgative), and <strong>Akseer</strong> (Elixir).
        </p>
      </div>

      <MedicalDisclaimer />

      {/* Degrees Explanation */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(['shadeed', 'mulyan', 'mushil', 'akseer'] as const).map((deg) => {
          const info = DEGREE_INFO[deg];
          return (
            <div key={deg} className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Degree: {info.label} (<Urdu>{info.urdu}</Urdu>)
                </span>
                <Badge tone={info.practitionerOnly ? 'warning' : 'neutral'}>
                  {info.role}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                {info.practitionerOnly
                  ? 'High potency / purging; strictly practitioner supervised.'
                  : 'Standard gentle stimulant / stool softening stage.'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Formulations Master Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Order &amp; Formula</th>
              <th className="px-4 py-3">Degree</th>
              <th className="px-4 py-3">Classical Ingredients</th>
              <th className="px-4 py-3">Proportions &amp; Dose</th>
              <th className="px-4 py-3">Clinical Action</th>
              <th className="px-4 py-3">Safety Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {FORMULATIONS.map((f) => {
              return (
                <tr key={`${f.order}-${f.degree}`} className="align-top hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900">{f.name}</div>
                    <div className="text-xs text-slate-500">
                      <Urdu>{f.nameUrdu}</Urdu> · Order {f.order}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize font-semibold text-xs text-slate-700">
                      {f.degree}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 max-w-xs">
                    {f.ingredients.join(', ')}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    <div><strong>Ratio:</strong> {f.ratio}</div>
                    <div><strong>Dose:</strong> {f.singleDose}</div>
                    <div className="text-slate-500">{f.frequency}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700 max-w-sm">
                    {f.purpose}
                  </td>
                  <td className="px-4 py-3">
                    {f.practitionerOnly ? (
                      <div className="space-y-1">
                        <Badge tone="warning">Practitioner Only</Badge>
                        {f.hazards.map((h) => (
                          <div key={h} className="text-[10px] text-rose-700 font-medium">
                            ⚠ {HAZARD_LABELS[h]}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Badge tone="success">Safe Aperient</Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
