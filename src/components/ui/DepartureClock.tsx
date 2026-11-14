'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

/** Daily departures from the package details (IST). */
const DEPARTURES = [
  { h: 8, m: 30, label: '08:30' },
  { h: 14, m: 30, label: '14:30' },
];
const IST_OFFSET = 5.5 * 60 * 60 * 1000;
const pad = (n: number) => String(n).padStart(2, '0');

function compute(now: number) {
  const ist = new Date(now + IST_OFFSET); // read with UTC getters → IST wall clock
  const secs = ist.getUTCHours() * 3600 + ist.getUTCMinutes() * 60 + ist.getUTCSeconds();
  let next = DEPARTURES.find((d) => d.h * 3600 + d.m * 60 > secs);
  let diff: number;
  if (next) diff = next.h * 3600 + next.m * 60 - secs;
  else {
    next = DEPARTURES[0];
    diff = 86400 - secs + next.h * 3600 + next.m * 60;
  }
  return {
    clock: `${pad(ist.getUTCHours())}:${pad(ist.getUTCMinutes())}:${pad(ist.getUTCSeconds())}`,
    next: next.label,
    countdown: `${pad(Math.floor(diff / 3600))}:${pad(Math.floor((diff % 3600) / 60))}:${pad(diff % 60)}`,
    tomorrow: !DEPARTURES.find((d) => d.h * 3600 + d.m * 60 > secs),
  };
}

/** Live Gokarna time and a countdown to the next scheduled departure. */
export function DepartureClock({ className, onScene = true }: { className?: string; onScene?: boolean }) {
  const [state, setState] = useState<ReturnType<typeof compute> | null>(null);

  useEffect(() => {
    const tick = () => setState(compute(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const muted = onScene ? 'text-cream/55' : 'text-mute';
  const strong = onScene ? 'text-cream' : 'text-ink';

  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      <div>
        <p className={cn('font-mono text-[10px] uppercase tracking-[0.18em]', muted)}>
          Next departure {state ? `· ${state.next}${state.tomorrow ? ' tmrw' : ''}` : ''}
        </p>
        <p className={cn('mt-1.5 font-mono text-[22px] leading-none tabular-nums', onScene ? 'text-aqua' : 'text-glow-ink')} aria-live="off">
          {state ? state.countdown : '--:--:--'}
        </p>
      </div>
      <div>
        <p className={cn('font-mono text-[10px] uppercase tracking-[0.18em]', muted)}>Gokarna time · IST</p>
        <p className={cn('mt-1.5 font-mono text-[22px] leading-none tabular-nums', strong)}>{state ? state.clock : '--:--:--'}</p>
      </div>
    </div>
  );
}
