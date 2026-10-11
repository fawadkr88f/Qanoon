import type { TissueType } from '@/types/qma';

/** Static class maps so Tailwind can detect every class at build time. */
export const TISSUE_STYLES: Readonly<
  Record<TissueType, { text: string; bg: string; soft: string; border: string; fill: string; stroke: string }>
> = {
  aasabi: {
    text: 'text-aasabi',
    bg: 'bg-aasabi',
    soft: 'bg-aasabi-soft',
    border: 'border-aasabi',
    fill: 'fill-aasabi-soft',
    stroke: 'stroke-aasabi',
  },
  azlati: {
    text: 'text-azlati',
    bg: 'bg-azlati',
    soft: 'bg-azlati-soft',
    border: 'border-azlati',
    fill: 'fill-azlati-soft',
    stroke: 'stroke-azlati',
  },
  ghudi: {
    text: 'text-ghudi',
    bg: 'bg-ghudi',
    soft: 'bg-ghudi-soft',
    border: 'border-ghudi',
    fill: 'fill-ghudi-soft',
    stroke: 'stroke-ghudi',
  },
};
