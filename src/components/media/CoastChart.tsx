import { boarding } from '@/config/brand';
import type { Destination } from '@/types';

/**
 * Schematic night chart of the Gokarna coast, north up, sea to the west.
 * Order north → south: Main Beach, Kudle, Om, Half Moon, Paradise, then Tadadi
 * at the Aghanashini river mouth. Not for navigation.
 *
 * Stops carry data-chart-stop so <ScrollEffects/> can move the marker as
 * destination stories scroll by; the route path draws with scroll (data-draw).
 */
const NORTH_LAND =
  'M286,-10 L282,30 Q276,44 268,52 Q276,66 280,82 Q276,104 236,122 Q252,146 256,172 Q248,200 210,222 Q232,232 236,246 Q234,256 232,262 Q234,270 236,282 Q226,298 196,306 Q218,322 222,340 Q214,360 184,376 Q204,394 206,410 Q198,432 180,452 Q190,478 202,500 L420,498 L420,-10 Z';
const SOUTH_LAND = 'M206,540 L420,536 L420,610 L190,610 Q186,580 206,540 Z';
const ROUTE = 'M214,522 C180,520 160,482 166,442 C172,402 176,372 180,340 C184,304 190,282 198,262 C206,232 214,202 222,172 C230,140 238,110 248,80';

export function CoastChart({ destinations, className }: { destinations: Destination[]; className?: string }) {
  const first = destinations[0];
  return (
    <svg viewBox="0 0 400 600" preserveAspectRatio="xMaxYMid slice" className={className} role="img" aria-label="Schematic chart of the Gokarna coastline from Gokarna Main Beach south to Tadadi Port, with the boat route along the coast">
      {/* sea contours */}
      <g fill="none" stroke="rgb(var(--ink) / 0.08)" strokeWidth={1}>
        <path d="M256,-10 C230,80 200,140 186,240 C172,340 150,420 150,520 L150,610" />
        <path d="M206,-10 C178,90 150,160 138,250 C126,350 104,430 100,610" />
        <path d="M150,-10 C122,100 96,180 84,270 C72,370 52,450 46,610" strokeDasharray="3 5" />
      </g>
      <text x={24} y={590} className="fill-[rgb(var(--ink)/0.3)] font-serif" fontSize={22}>
        Arabian Sea
      </text>

      {/* land */}
      <path d={NORTH_LAND} fill="rgb(var(--raised))" stroke="rgb(var(--ink) / 0.35)" strokeWidth={1.2} />
      <path d={SOUTH_LAND} fill="rgb(var(--raised))" stroke="rgb(var(--ink) / 0.35)" strokeWidth={1.2} />
      <text x={296} y={38} className="fill-[rgb(var(--ink)/0.55)] font-serif" fontSize={18}>
        Gokarna
      </text>
      <text x={262} y={566} className="fill-[rgb(var(--mute))] font-mono" fontSize={12}>
        Aghanashini river
      </text>

      {/* route — faint base + drawn ember line */}
      <path d={ROUTE} fill="none" stroke="rgb(var(--ember) / 0.2)" strokeWidth={2} strokeLinecap="round" />
      <g data-draw-root="">
        <path d={ROUTE} fill="none" stroke="rgb(var(--ember))" strokeWidth={2.5} strokeLinecap="round" data-draw="#coastline-stories" />
      </g>

      {/* stops */}
      {destinations.map((d) => (
        <g key={d.id} data-chart-stop={d.id} data-x={d.chart.x} data-y={d.chart.y}>
          <circle cx={d.chart.x} cy={d.chart.y} r={4.5} strokeWidth={1.5} />
          <text x={d.chart.x + 30} y={d.chart.y + 4} className="font-mono" fontSize={12}>
            {d.id === 'aghanashini' ? boarding.name : d.name.replace('Gokarna Main Beach', 'Main Beach')}
          </text>
        </g>
      ))}

      {/* active marker */}
      {first && (
        <g data-chart-marker="" transform={`translate(${first.chart.x} ${first.chart.y})`}>
          <circle r={13} fill="rgb(var(--ember) / 0.22)" />
          <circle r={6} fill="rgb(var(--ember))" />
        </g>
      )}

      {/* north arrow */}
      <g transform="translate(40 50)" className="font-mono" fontSize={12}>
        <path d="M0,-18 L6,4 L0,0 L-6,4Z" fill="rgb(var(--ink) / 0.6)" />
        <text x={-4} y={22} fill="rgb(var(--mute))">
          N
        </text>
      </g>
    </svg>
  );
}
