import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Renders classical Urdu terms with correct language, direction and Nastaliq font. */
export function Urdu({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return (
    <span lang="ur" dir="rtl" className={cn('font-urdu', className)}>
      {children}
    </span>
  );
}
