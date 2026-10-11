import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-500';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 shadow-sm',
  secondary: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400',
  ghost: 'text-brand-700 hover:bg-brand-50',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  readonly variant?: Variant;
  readonly size?: Size;
}

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}

interface ButtonLinkProps {
  readonly href: string;
  readonly variant?: Variant;
  readonly size?: Size;
  readonly className?: string;
  readonly children: ReactNode;
}

export function ButtonLink({ href, variant = 'primary', size = 'md', className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}
