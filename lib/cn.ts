/** Tiny className joiner — avoids a runtime dependency. */
export function cn(...classes: ReadonlyArray<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
