import type { Metadata } from 'next';
import { PractitionerDirectory } from '@/components/directory/PractitionerDirectory';

export const metadata: Metadata = {
  title: 'Verified Practitioners · Qanoon-e-Mufrad Aza',
  description:
    'Find certified and verified Hakims and Eastern tissue medicine practitioners across Germany, Pakistan, and internationally.',
};

export default function PractitionersPage() {
  return (
    <div className="container-page py-12 space-y-8">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
          Clinical Directory
        </span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Verified QMA Practitioners
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Connect with qualified Hakims specializing in Qanoon-e-Mufrad Aza, pulse diagnosis (Nabz),
          visual urinalysis (Qarura), and customized Ghaza dietetic therapy. Filter by city or consultation method.
        </p>
      </div>

      <PractitionerDirectory />
    </div>
  );
}
