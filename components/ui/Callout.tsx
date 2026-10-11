import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'info' | 'warning' | 'danger';

const tones: Record<Tone, { box: string; icon: string; path: string }> = {
  info: {
    box: 'border-brand-200 bg-brand-50 text-brand-900',
    icon: 'text-brand-600',
    path: 'M12 8h.01M11 12h1v4h1m-1-13a9 9 0 110 18 9 9 0 010-18z',
  },
  warning: {
    box: 'border-amber-300 bg-amber-50 text-amber-950',
    icon: 'text-amber-600',
    path: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  },
  danger: {
    box: 'border-rose-300 bg-rose-50 text-rose-950',
    icon: 'text-rose-600',
    path: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  },
};

interface CalloutProps {
  readonly tone?: Tone;
  readonly title?: string;
  readonly children: ReactNode;
  readonly className?: string;
  /** Use role="note" for static advisory content (default). */
  readonly role?: 'note' | 'alert' | 'status';
}

export function Callout({ tone = 'info', title, children, className, role = 'note' }: CalloutProps) {
  const t = tones[tone];
  return (
    <div role={role} className={cn('flex gap-3 rounded-xl border p-4 text-sm print-avoid-break', t.box, className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('mt-0.5 size-5 shrink-0', t.icon)}
      >
        <path d={t.path} />
      </svg>
      <div className="space-y-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
