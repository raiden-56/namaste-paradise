import { CheckCircle2 } from 'lucide-react';
import { Placeholder } from '@/components/ui/Placeholder';
import { safetyItems } from '@/config/safety';

/** Pre-departure checklist. */
export function Safety() {
  return (
    <section id="safety" aria-labelledby="safety-title" className="relative py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" data-reveal>
          <p className="mb-5 flex items-center gap-3">
            <span className="kicker">Before you sail</span>
          </p>
          <h2 id="safety-title" className="text-title">
            The sea sets the schedule
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-soft">
            Trips run only when sea and weather conditions allow. Routes, stops and timings are confirmed on WhatsApp and may change on the day for
            safety.
          </p>
          <div className="glass mt-8 inline-flex items-center gap-3 rounded-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-soft">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-glow" />
            </span>
            Pre-departure checklist
          </div>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
          {safetyItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.id} data-spot="" className="spot group relative overflow-hidden rounded-card border border-ink/[0.08] bg-card p-5 transition-colors duration-400 hover:border-glow/30" data-reveal>
                <div className="relative z-[2] flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-raised">
                    <Icon className="h-[18px] w-[18px] text-glow" strokeWidth={1.5} />
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                    Check {String(i + 1).padStart(2, '0')}
                    <CheckCircle2 className="h-4 w-4 text-glow/40 transition-colors duration-400 group-hover:text-glow" strokeWidth={1.75} />
                  </span>
                </div>
                <dt className="relative z-[2] mt-5 font-display text-[15px] font-medium tracking-[-0.01em] text-ink">{item.title}</dt>
                <dd className="relative z-[2] mt-2 text-[14px] leading-[1.6] text-soft">
                  {item.detail}
                  {item.needsConfirmation && <Placeholder label="To confirm" className="ml-0 mt-3 flex w-fit" />}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
