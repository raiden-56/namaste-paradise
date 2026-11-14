import { cn } from '@/utils/cn';

/**
 * The signature: an ember dotted route line with stops.
 * `animate`: "load" draws on page load (CSS), "scroll" fills with scroll (GSAP), "none" static.
 */
export function RouteStops({
  stops,
  onScene = false,
  animate = 'none',
  className,
}: {
  stops: string[];
  onScene?: boolean;
  animate?: 'load' | 'scroll' | 'none';
  className?: string;
}) {
  const n = stops.length;
  const inset = `${50 / n}%`;
  return (
    <ol
      className={cn('relative grid', className)}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      aria-label={`Route: ${stops.join(' to ')}`}
      data-progress-root={animate === 'scroll' ? '' : undefined}
    >
      <span aria-hidden className="absolute top-[5px]" style={{ left: inset, right: inset }}>
        <span
          className={cn('route-dots block', animate === 'load' && 'draw-x')}
          data-progress={animate === 'scroll' ? 'x' : undefined}
        />
      </span>
      {stops.map((stop, i) => (
        <li key={`${stop}-${i}`} className="relative flex flex-col items-center px-1 text-center">
          <span
            className={cn(
              'h-[14px] w-[14px] rounded-full border-2 border-ember',
              i === 0 ? 'bg-ember' : onScene ? 'bg-[#1c1a18]' : 'bg-card',
            )}
          />
          <span className={cn('mt-3 font-mono text-[12px] leading-4', onScene ? 'text-cream/80' : 'text-soft')}>{stop}</span>
        </li>
      ))}
    </ol>
  );
}
