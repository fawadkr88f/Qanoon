import { Badge } from '@/components/ui/Badge';
import type { PractitionerProfile } from '@/types/practitioner';

interface PractitionerCardProps {
  readonly practitioner: PractitionerProfile;
}

export function PractitionerCard({ practitioner }: PractitionerCardProps) {
  const { name, title, clinicName, city, country, methods, languages, specialties, yearsInPractice, bio, contact, verification } =
    practitioner;

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-hover hover:border-brand-300">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{name}</h3>
              {verification.status === 'verified' && (
                <span title="Verified Credentials" aria-label="Verified Credentials">
                  <Badge tone="success">Verified</Badge>
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-slate-500">{title}</p>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
            {yearsInPractice} yrs exp.
          </span>
        </div>

        <div className="space-y-1 text-xs text-slate-600">
          <p className="font-semibold text-slate-800">{clinicName}</p>
          <p>
            {city}, {country}
          </p>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{bio}</p>

        {/* Consultation Methods */}
        <div className="flex flex-wrap gap-1.5">
          {methods.map((method) => (
            <span
              key={method}
              className="rounded bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-800"
            >
              {method === 'in-person' ? 'In-Person' : 'Remote / Video'}
            </span>
          ))}
        </div>

        {/* Specialties */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Specialties:</span>
          <div className="flex flex-wrap gap-1">
            {specialties.map((s) => (
              <span
                key={s}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="text-[11px] text-slate-500">
          <span className="font-semibold">Languages:</span> {languages.join(', ')}
        </div>
      </div>

      {/* Contact & Actions */}
      <div className="mt-6 border-t border-slate-100 pt-4 flex flex-wrap items-center gap-2">
        {contact.whatsapp && (
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            WhatsApp
          </a>
        )}
        {contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Call
          </a>
        )}
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Email
          </a>
        )}
      </div>
    </article>
  );
}
