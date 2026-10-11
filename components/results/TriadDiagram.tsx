import { useId } from 'react';
import { QMA_ORDERS } from '@/lib/qma-engine';
import { TISSUE_STYLES } from '@/lib/tissueStyles';
import { cn } from '@/lib/cn';
import type { OrderId, QMATriad } from '@/types/qma';

const SIZE = 320;
const CENTER = SIZE / 2;
const NODE_RADIUS = 100;
const LABEL_RADIUS = 140;

function polar(index: number, radius: number): { x: number; y: number } {
  // Order 1 at the top, proceeding clockwise.
  const angle = ((-90 + index * 60) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
}

interface TriadDiagramProps {
  /** When provided, highlights Tehreek / Tehleel / Taskeen and draws the 3-hop arrow. */
  readonly triad?: QMATriad;
  readonly className?: string;
  readonly title?: string;
}

/**
 * Hexagonal QMA cycle (orders 1–6). Accessible as a single image with a
 * textual description; colours are reinforced by stroke styles for print/B&W.
 */
export function TriadDiagram({ triad, className, title = 'The QMA hexagonal cycle' }: TriadDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const roleOf = (id: OrderId): 'tehreek' | 'tehleel' | 'taskeen' | null => {
    if (!triad) return null;
    if (triad.tehreek.id === id) return 'tehreek';
    if (triad.tehleel.id === id) return 'tehleel';
    if (triad.taskeen.id === id) return 'taskeen';
    return null;
  };

  const description = triad
    ? `Six orders arranged in a cycle. Tehreek (hyperactive) is order ${triad.tehreek.id}, ${triad.tehreek.classicalName}. Tehleel (depleted) is order ${triad.tehleel.id}. Taskeen, the therapeutic target three hops across, is order ${triad.taskeen.id}, ${triad.taskeen.classicalName}.`
    : 'Six compound orders arranged clockwise: 1 Aasabi-Azlati, 2 Azlati-Aasabi, 3 Azlati-Ghudi, 4 Ghudi-Azlati, 5 Ghudi-Aasabi, 6 Aasabi-Ghudi. Each order is balanced by the one directly opposite (three hops away).';

  const from = triad ? polar(triad.tehreek.id - 1, NODE_RADIUS - 26) : null;
  const to = triad ? polar(triad.taskeen.id - 1, NODE_RADIUS - 26) : null;
  const hexPoints = QMA_ORDERS.map((_, i) => {
    const p = polar(i, NODE_RADIUS);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
      className={cn('h-auto w-full max-w-sm', className)}
    >
      <title id={`${uid}-title`}>{title}</title>
      <desc id={`${uid}-desc`}>{description}</desc>

      <defs>
        <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-brand-700" />
        </marker>
      </defs>

      <polygon points={hexPoints} className="fill-none stroke-slate-300" strokeWidth={1.5} strokeDasharray="4 4" />

      {/* Opposite-pair guide lines */}
      {[0, 1, 2].map((i) => {
        const a = polar(i, NODE_RADIUS);
        const b = polar(i + 3, NODE_RADIUS);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="stroke-slate-200" strokeWidth={1} />;
      })}

      {from && to ? (
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          className="stroke-brand-700"
          strokeWidth={3}
          markerEnd={`url(#${uid}-arrow)`}
        />
      ) : null}

      {QMA_ORDERS.map((order, i) => {
        const p = polar(i, NODE_RADIUS);
        const l = polar(i, LABEL_RADIUS);
        const role = roleOf(order.id);
        const style = TISSUE_STYLES[order.primary];
        return (
          <g key={order.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r={role ? 24 : 21}
              className={cn(
                style.fill,
                role === 'tehreek' && 'stroke-azlati',
                role === 'tehleel' && 'stroke-ghudi',
                role === 'taskeen' && 'stroke-brand-700',
                !role && style.stroke,
              )}
              strokeWidth={role ? 4 : 2}
              strokeDasharray={role === 'tehleel' ? '5 3' : undefined}
            />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-900 text-[15px] font-bold"
            >
              {order.id}
            </text>
            <text
              x={l.x}
              y={l.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-600 text-[9.5px] font-medium"
            >
              {order.classicalName}
            </text>
            {role ? (
              <text
                x={l.x}
                y={l.y + 12}
                textAnchor="middle"
                dominantBaseline="central"
                className={cn(
                  'text-[9px] font-bold uppercase tracking-wide',
                  role === 'tehreek' && 'fill-azlati',
                  role === 'tehleel' && 'fill-ghudi',
                  role === 'taskeen' && 'fill-brand-700',
                )}
              >
                {role === 'taskeen' ? 'Taskeen · target' : role}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
