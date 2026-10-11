import type { Metadata } from 'next';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Privacy & GDPR Compliance · Qanoon-e-Mufrad Aza',
  description:
    'Our strict zero-database, client-side architectural commitment to health data privacy under EU GDPR.',
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-12 max-w-3xl space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
          Data Protection
        </span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy &amp; GDPR Architecture
        </h1>
        <p className="text-sm text-slate-600">
          Last updated: October 2026. Designed in compliance with Regulation (EU) 2016/679 (GDPR).
        </p>
      </div>

      <Callout tone="info" title="Zero-Storage Health Data Guarantee">
        The Qanoon-e-Mufrad Aza self-observation assessment executes <strong>100% locally in your web browser</strong>.
        We do not collect, transmit, store, or profile any special category personal data (Article 9 GDPR).
      </Callout>

      <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">1. Architectural Privacy by Design (Art. 25 GDPR)</h2>
        <p>
          Unlike traditional web intake forms that submit health markers to an administrative database (MySQL/PostgreSQL),
          the QMA Clinical Logic Engine (`lib/qmaEngine.ts`) is compiled directly into browser JavaScript. All question
          responses, weighted scoring calculations, and resulting dietary recommendations are computed within temporary
          React state in your device memory.
        </p>
        <p>
          Closing the browser tab instantly and irreversibly purges all entered information.
        </p>
      </section>

      <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">2. No Cookies, No Tracking</h2>
        <p>
          We do not use tracking pixels, Google Analytics, third-party advertising cookies, or behavioral fingerprinting.
          No consent banners (e.g. Borlabs / Cookiebot) are needed because no non-essential cookies are created.
        </p>
      </section>

      <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">3. Practitioner Directory Inquiries</h2>
        <p>
          When you contact a practitioner listed in our directory via WhatsApp, phone, or email, your communication
          occurs directly via the respective communication service according to their individual privacy terms. No
          intermediary recording occurs on our servers.
        </p>
      </section>

      <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">4. Hosting Infrastructure</h2>
        <p>
          Our web servers are hosted within certified ISO 27001 data centers located in the European Union (Germany),
          ensuring strict adherence to European data sovereignty standards.
        </p>
      </section>
    </div>
  );
}
