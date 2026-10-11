import type { Metadata } from 'next';
import Link from 'next/link';
import { QMA_ORDERS } from '@/lib/qma-engine/orders';
import { Urdu } from '@/components/ui/Urdu';
import { Badge } from '@/components/ui/Badge';
import { threeHop } from '@/lib/qmaEngine';

export const metadata: Metadata = {
  title: 'The Six Orders (Sitta Mufrad Aza)',
  description: 'Detailed overview of the 6 pathological and therapeutic orders in Qanoon-e-Mufrad Aza.',
};

export default function OrdersIndexPage() {
  return (
    <div className="container-page py-12 space-y-12">
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
          Theoretical Taxonomy
        </span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          The 6 Functional Orders
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          The QMA system models physiological balance across six defined tissue pairs. Click any order
          to inspect its governing organ, dominant humour, recommended Ghaza diet, and weekly meal plan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {QMA_ORDERS.map((order) => {
          const target = threeHop(order.id);
          return (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-hover hover:border-brand-500 hover:shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge tone="neutral">Order {order.id}</Badge>
                  <span className="text-xs font-semibold text-slate-500">
                    Cures with Order {target}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">{order.classicalName}</h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {order.systemEn} · <Urdu>{order.termUrdu}</Urdu>
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 rounded-xl p-3">
                  <p>
                    <strong>Temperament:</strong> {order.temperament.en} (<Urdu>{order.temperament.ur}</Urdu>)
                  </p>
                  <p>
                    <strong>Humour:</strong> {order.dominantHumour}
                  </p>
                  <p>
                    <strong>Governing:</strong> {order.governingOrgan}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-brand-700 flex items-center justify-between">
                <span>View Full Diet Chart</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
