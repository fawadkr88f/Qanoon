import { Urdu } from '@/components/ui/Urdu';
import { TISSUES, TISSUE_SEQUENCE } from '@/lib/qma-engine';
import { TISSUE_STYLES } from '@/lib/tissueStyles';
import { cn } from '@/lib/cn';
import type { TissueScores, TissueType } from '@/types/qma';

interface TissueScoreChartProps {
  readonly scores: TissueScores;
  readonly ranking: readonly [TissueType, TissueType, TissueType];
}

/** Horizontal bar chart; exposes values as text so it is screen-reader and print friendly. */
export function TissueScoreChart({ scores, ranking }: TissueScoreChartProps) {
  const total = TISSUE_SEQUENCE.reduce((sum, t) => sum + scores[t], 0) || 1;

  return (
    <dl className="space-y-4">
      {TISSUE_SEQUENCE.map((tissue) => {
        const info = TISSUES[tissue];
        const style = TISSUE_STYLES[tissue];
        const pct = Math.round((scores[tissue] / total) * 100);
        const rank = ranking.indexOf(tissue) + 1;
        return (
          <div key={tissue}>
            <dt className="flex items-baseline justify-between gap-3 text-sm">
              <span className="flex items-baseline gap-2">
                <span className={cn('font-semibold', style.text)}>{info.name}</span>
                <span className="text-slate-500">
                  {info.tissueEn} · {info.organ}
                </span>
                <Urdu className="text-xs text-slate-500">{info.nameUrdu}</Urdu>
              </span>
              <span className="text-xs font-medium text-slate-500">
                {rank === 1 ? 'Dominant' : rank === 2 ? 'Secondary' : 'Least active'}
              </span>
            </dt>
            <dd className="mt-1.5 flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                <div className={cn('h-full rounded-full', style.bg)} style={{ width: `${pct}%` }} />
              </div>
              <span className="w-24 text-right text-sm tabular-nums text-slate-700">
                {scores[tissue]} pts <span className="text-slate-400">({pct}%)</span>
              </span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
