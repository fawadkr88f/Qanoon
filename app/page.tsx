import Link from 'next/link';
import { TriadDiagram } from '@/components/results/TriadDiagram';
import { ButtonLink } from '@/components/ui/Button';
import { QMA_ORDERS, TISSUES } from '@/lib/qma-engine';
import { Urdu } from '@/components/ui/Urdu';

export default function HomePage() {
  return (
    <div className="space-y-24 py-10">
      {/* Hero Section */}
      <section className="container-page text-center space-y-6 max-w-4xl">
        <span className="rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-800 ring-1 ring-inset ring-brand-200">
          Eastern Functional Tissue Medicine
        </span>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
          Qanoon-e-Mufrad Aza
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 sm:text-xl max-w-2xl mx-auto">
          A clinical framework grounded in the three primary human tissues (Nervous, Muscular, Glandular)
          and the mathematical 3-Hop antipodal therapeutic balancing law.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <ButtonLink href="/assessment" variant="primary" size="lg">
            Start Clinical Assessment
          </ButtonLink>
          <ButtonLink href="/orders" variant="secondary" size="lg">
            Explore the 6 Orders
          </ButtonLink>
        </div>
      </section>

      {/* The 3 Fundamental Tissues (Mufrad Aza) */}
      <section className="container-page space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            The Three Master Tissues (Mufrad Aza)
          </h2>
          <p className="text-sm text-slate-600">
            Every pathological condition begins with hyperactivity in one of the three foundational physiological systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(['aasabi', 'azlati', 'ghudi'] as const).map((key) => {
            const tissue = TISSUES[key];
            return (
              <div
                key={tissue.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black uppercase tracking-wider text-brand-700">
                    {tissue.name} (<Urdu>{tissue.nameUrdu}</Urdu>)
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{tissue.organ}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{tissue.tissueEn} Tissue Matrix</h3>
                <p className="text-xs leading-relaxed text-slate-600">{tissue.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3-Hop Triad Diagram & Science */}
      <section className="container-page grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Clinical Law of Therapeutics
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            The Hexagonal 3-Hop Antipodal Rule
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            In classical QMA physiology developed by Hakim Inayatullah Naseem Suharwardi and codified by
            Hakim Muhammad Kabiruddin and Hakim Inqilab Sabir Multani, a diseased state (<strong>Tehreek</strong>)
            is never treated with direct suppression.
          </p>
          <div className="space-y-3 rounded-2xl bg-slate-50 p-5 text-xs text-slate-700 border border-slate-200">
            <p>
              <strong>1. Tehreek (تحریک - Hyperactive):</strong> The stimulated, diseased organ causing symptom excess.
            </p>
            <p>
              <strong>2. Tehleel (تحلیل - Depleted):</strong> The organ directly following in cycle, losing vitality.
            </p>
            <p>
              <strong>3. Taskeen (تسکین - Dormant Target):</strong> Exactly 3 hops away in the hexagonal circle.
              Stimulating this organ forces the hyperactive tissue into natural sedation.
            </p>
          </div>
          <div className="pt-2">
            <ButtonLink href="/assessment" variant="primary">
              Take the Digital Assessment
            </ButtonLink>
          </div>
        </div>

        <div className="flex justify-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
          <TriadDiagram />
        </div>
      </section>

      {/* The 6 Orders Preview */}
      <section className="container-page space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">The 6 Compound Orders</h2>
            <p className="text-sm text-slate-600 mt-1">
              The hexagonal spectrum of human physiology and humoral pathology.
            </p>
          </div>
          <Link href="/orders" className="text-xs font-semibold text-brand-700 hover:underline">
            View full dietary charts →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QMA_ORDERS.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-hover hover:border-brand-500 hover:shadow-md"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Order {order.id}</span>
                <span>{order.temperament.en}</span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                {order.classicalName}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                <Urdu>{order.termUrdu}</Urdu> · {order.dominantHumour}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
