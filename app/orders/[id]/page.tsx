import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { QMA_ORDERS } from '@/lib/qma-engine/orders';
import { getOrder, getDietaryPlan, getFormulationsForOrder, resolveTriad, isOrderId } from '@/lib/qmaEngine';
import { Urdu } from '@/components/ui/Urdu';
import { Badge } from '@/components/ui/Badge';
import { FoodGroupTable, MealPlanTable } from '@/components/results/DietPlanTables';
import { TriadDiagram } from '@/components/results/TriadDiagram';
import { MedicalDisclaimer } from '@/components/layout/MedicalDisclaimer';

interface OrderPageProps {
  readonly params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return QMA_ORDERS.map((o) => ({ id: o.id.toString() }));
}

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const num = parseInt(resolvedParams.id, 10);
  if (!isOrderId(num)) return { title: 'Order Not Found' };
  const order = getOrder(num);
  return {
    title: `Order ${order.id}: ${order.classicalName} · Qanoon-e-Mufrad Aza`,
    description: `Clinical profile, 3-Hop therapeutic logic, and Ghaza dietary chart for Order ${order.id}.`,
  };
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const resolvedParams = await params;
  const num = parseInt(resolvedParams.id, 10);
  if (!isOrderId(num)) notFound();

  const order = getOrder(num);
  const triad = resolveTriad(order.id);
  const targetOrder = triad.taskeen;
  // Ghaza matching this order's temperament
  const diet = getDietaryPlan(order.id);
  const formulations = getFormulationsForOrder(order.id);

  return (
    <div className="container-page py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/orders" className="hover:underline">The 6 Orders</Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">Order {order.id}: {order.classicalName}</span>
      </nav>

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge tone="neutral">Order {order.id}</Badge>
          <span className="text-xs font-semibold text-brand-700">
            {order.systemEn}
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {order.classicalName} (<Urdu>{order.termUrdu}</Urdu>)
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          Governed primarily by the <strong>{order.governingOrgan}</strong> with dominant humour of{' '}
          <strong>{order.dominantHumour}</strong>. The baseline temperament is{' '}
          <strong>{order.temperament.en} (<Urdu>{order.temperament.ur}</Urdu>)</strong>.
        </p>
      </div>

      {/* 3-Hop Triad Balancing Mechanism */}
      <section className="grid gap-8 lg:grid-cols-2 items-center rounded-3xl border border-slate-200 bg-slate-50/50 p-8">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Antipodal Balancing
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            3-Hop Therapeutic Rule for Order {order.id}
          </h2>
          <p className="text-xs leading-relaxed text-slate-600">
            When a patient is diagnosed with hyperactivity in Order {order.id} (Tehreek), the organ in Order {triad.tehleel.id}{' '}
            enters depletion (Tehleel). To restore balance, therapy stimulates the dormant organ at Order {targetOrder.id}{' '}
            (Taskeen), located 3 steps away.
          </p>

          <div className="rounded-xl bg-white p-4 border border-slate-200 text-xs space-y-2">
            <p>
              <strong>Morbid Stimulated State (Tehreek):</strong> Order {order.id} ({order.classicalName})
            </p>
            <p>
              <strong>Depleted State (Tehleel):</strong> Order {triad.tehleel.id} ({triad.tehleel.classicalName})
            </p>
            <p>
              <strong>Curative Target (+3 Hops):</strong>{' '}
              <Link href={`/orders/${targetOrder.id}`} className="font-bold text-brand-700 hover:underline">
                Order {targetOrder.id} ({targetOrder.classicalName}) →
              </Link>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <TriadDiagram triad={triad} />
        </div>
      </section>

      {/* Dietary Chart (Ghaza No. X) */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Clinical Nutrition
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Ghaza No. {diet.ghazaNo} Dietary Chart
          </h2>
          <p className="text-xs text-slate-600">
            This dietary chart carries the {diet.temperament.en} temperament of Order {diet.ghazaNo} and cures morbid Order {diet.curesOrder}.
          </p>
        </div>

        <FoodGroupTable plan={diet} />
      </section>

      {/* Structured Meal Plan */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Structured Daily Meal Menu (Ghaza {diet.ghazaNo})
        </h3>
        <MealPlanTable plan={diet} />
      </section>

      {/* Associated Pharmacopeia Formulations */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Classical Formulas
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Formulations for Order {order.id}
          </h2>
          <p className="text-xs text-slate-600">
            Formulations 1–4 across the 4 therapeutic degrees (Shadeed, Mulyan, Mus-hil, Akseer).
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {formulations.map((form) => (
            <div key={form.degree} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  {form.name} (<Urdu>{form.nameUrdu}</Urdu>)
                </h3>
                <Badge tone={form.practitionerOnly ? 'warning' : 'neutral'}>
                  {form.degree.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Purpose:</strong> {form.purpose}
              </p>
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                {form.practitionerOnly ? (
                  <span className="text-amber-800 font-medium">
                    Practitioner-only formulation. Dispensed upon clinical consultation.
                  </span>
                ) : (
                  <span>Standard dosage: {form.singleDose} ({form.frequency})</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <MedicalDisclaimer />
    </div>
  );
}
