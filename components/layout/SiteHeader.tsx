'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { LogoMark } from '@/components/layout/LogoMark';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const NAV = [
  { href: '/orders', label: 'The Six Orders' },
  { href: '/pharmacopeia', label: 'Pharmacopeia' },
  { href: '/practitioners', label: 'Find a Practitioner' },
  { href: '/privacy', label: 'Privacy' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur print:hidden">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 rounded-md" aria-label="Qanoon-e-Mufrad Aza — home">
          <LogoMark />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-slate-900">Qanoon-e-Mufrad Aza</span>
            <span className="text-[11px] font-medium text-slate-500">Eastern Functional Tissue Medicine</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                'aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-800',
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/assessment" className={buttonClasses('primary', 'sm', 'ml-2')}>
            Start assessment
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Main mobile"
        hidden={!open}
        className="border-t border-slate-200 bg-white lg:hidden"
      >
        <ul className="container-page flex flex-col gap-1 py-3">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-800"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href="/assessment" className={buttonClasses('primary', 'md', 'w-full')}>
              Start assessment
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
