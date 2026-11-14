import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Media } from '@/components/media/Media';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { activeExperiences } from '@/config/experiences';
import { cn } from '@/utils/cn';

/** Bento layout on a 3-column grid: wide, narrow / narrow, wide / narrow, wide. */
const span = ['lg:col-span-2', '', '', 'lg:col-span-2', '', 'lg:col-span-2'];

/** Bento grid of tilting, cursor-lit cards. */
export function Experiences() {
  return (
    <section id="experiences" aria-labelledby="experiences-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_70%,transparent)]" />
      <div className="wrap relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="experiences-title" kicker="Experiences" title="Six ways onto the Arabian Sea">
            Slow sightseeing past the coves, a mini cruise at sunset, or a private boat for your own group.
          </SectionHeader>
          <p className="max-w-[16rem] font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-mute md:text-right" data-reveal>
            Hover a card to explore · tap to see the trip
          </p>
        </div>

        <ul className="mt-14 grid auto-rows-[320px] gap-4 sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3">
          {activeExperiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <li key={exp.id} className={cn('min-w-0', span[i % span.length])} data-reveal>
                <Link
                  href={`/packages/${exp.packageSlug}`}
                  data-tilt="5"
                  data-spot=""
                  className="spot spot-border group relative block h-full overflow-hidden rounded-panel border border-ink/[0.08] bg-card"
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                    <Media image={exp.image} sizes="(min-width: 1024px) 60vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/0 transition-opacity duration-400 group-hover:opacity-90" />

                  <div className="relative z-[3] flex h-full flex-col justify-between p-6 text-cream sm:p-7">
                    <div className="flex items-start justify-between">
                      <span className="glass-scene grid h-11 w-11 place-items-center rounded-full text-aqua">
                        <Icon className="h-[18px] w-[18px] text-glow" strokeWidth={1.5} />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.16em] text-cream/55">{String(i + 1).padStart(2, '0')} / {String(activeExperiences.length).padStart(2, '0')}</span>
                    </div>
                    <div>
                      {exp.note && (
                        <span className="mb-3 inline-flex rounded-full border border-cream/20 bg-night/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/75">
                          {exp.note}
                        </span>
                      )}
                      <h3 className="flex items-end justify-between gap-4 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.1] tracking-[-0.03em] text-cream">
                        {exp.title}
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-glow text-on-glow opacity-0 transition-[opacity,transform] duration-400 ease-out group-hover:opacity-100 group-hover:rotate-0 max-lg:opacity-100 lg:-rotate-45">
                          <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.75} />
                        </span>
                      </h3>
                      <p className="mt-2 max-w-[30rem] text-[14px] leading-[1.6] text-cream/75 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-[max-height,opacity] lg:duration-700 lg:ease-out lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
