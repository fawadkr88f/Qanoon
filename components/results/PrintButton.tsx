'use client';

import { Button } from '@/components/ui/Button';

/** Triggers the browser's print dialog — users can choose "Save as PDF". */
export function PrintButton({ label = 'Print / Save as PDF' }: { readonly label?: string }) {
  return (
    <Button onClick={() => window.print()} variant="primary">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" />
      </svg>
      {label}
    </Button>
  );
}
