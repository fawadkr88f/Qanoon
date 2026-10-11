import Link from 'next/link';
import { LogoMark } from '@/components/layout/LogoMark';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50 print:hidden">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-7" />
            <span className="font-semibold text-slate-900">Qanoon-e-Mufrad Aza</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            An educational resource on the classical tissue-based framework of Eastern medicine, with a
            directory of verified practitioners. Content is for learning only and does not replace professional
            medical care.
          </p>
        </div>

        <nav aria-label="Learn">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Learn</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-slate-700 hover:text-brand-700" href="/orders">The six orders</Link></li>
            <li><Link className="text-slate-700 hover:text-brand-700" href="/pharmacopeia">Pharmacopeia</Link></li>
            <li><Link className="text-slate-700 hover:text-brand-700" href="/assessment">Self-observation</Link></li>
          </ul>
        </nav>

        <nav aria-label="Platform">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Platform</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-slate-700 hover:text-brand-700" href="/practitioners">Practitioner directory</Link></li>
            <li><Link className="text-slate-700 hover:text-brand-700" href="/privacy">Privacy &amp; GDPR</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-200">
        <p className="container-page py-5 text-xs text-slate-500">
          © {new Date().getFullYear()} Qanoon-e-Mufrad Aza Platform. No cookies. No tracking. Assessment data never
          leaves your device.
        </p>
      </div>
    </footer>
  );
}
