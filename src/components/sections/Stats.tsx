import { Asterisk } from 'lucide-react';
import { Counter } from '@/components/ui/Counter';
import { social } from '@/config/brand';
import { activeExperiences } from '@/config/experiences';

const stats = [
  { value: Number(social.googleRating.score), decimals: 1, label: 'Google rating', suffix: '' },
  { value: social.googleRating.count, label: 'Google reviews', suffix: '' },
  { value: 799, prefix: '₹', label: 'Trips from, per person' },
  { value: 24, label: 'Office open, all week', suffix: '×7' },
];

/** Activity ticker + headline numbers right under the hero. */
export function Stats() {
  const ticker = activeExperiences.map((e) => e.title);
  return (
    <section aria-label="At a glance" className="relative border-b border-ink/[0.08] bg-page">
      <div className="marquee-pause relative overflow-hidden border-b border-ink/[0.08] py-5" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap" style={{ ['--marquee-duration' as string]: '45s' }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-10">
              {[...ticker, ...ticker].map((t, i) => (
                <span key={`${k}-${i}`} className="inline-flex items-center gap-10 font-display text-[clamp(1.25rem,2.6vw,2rem)] font-medium uppercase tracking-[-0.02em]">
                  <span className={i % 2 ? 'text-outline' : 'text-ink'}>{t}</span>
                  <Asterisk className="h-6 w-6 text-glow" strokeWidth={1.5} />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-page to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-page to-transparent" />
      </div>

      <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-spot=""
            className={`spot group relative px-2 py-10 sm:px-6 sm:py-12 ${i % 2 ? 'border-l border-ink/[0.08]' : ''} ${i >= 2 ? 'max-lg:border-t max-lg:border-ink/[0.08]' : ''} ${i === 2 ? 'lg:border-l lg:border-ink/[0.08]' : ''}`}
          >
            <dd className="relative z-[2] font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-none tracking-[-0.04em] text-ink">
              <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
            </dd>
            <dt className="relative z-[2] mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
