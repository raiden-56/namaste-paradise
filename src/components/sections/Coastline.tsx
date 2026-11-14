import { CoastChart } from '@/components/media/CoastChart';
import { Media } from '@/components/media/Media';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { destinations, routeStatusLabel } from '@/config/destinations';
import type { Destination } from '@/types';

/** The order a boat meets them: from the Tadadi jetty north along the coast. */
const JOURNEY = ['aghanashini', 'paradise', 'half-moon', 'om-beach', 'kudle', 'main-beach'];

export function Coastline({ limit }: { limit?: number }) {
  const ordered = JOURNEY.map((id) => destinations.find((d) => d.id === id)).filter(Boolean) as Destination[];
  const list = limit ? ordered.slice(0, limit) : ordered;

  return (
    <section id="coastline" aria-labelledby="coastline-title" className="py-24 sm:py-32">
      <div className="wrap">
        <SectionHeader id="coastline-title" kicker="The coastline" title="Gokarna’s coast, stop by stop">
          From the river mouth at Tadadi, the coast runs north past secluded coves to the temple town. Every route is confirmed with you before you sail.
        </SectionHeader>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky chart */}
          <div className="min-w-0 lg:col-span-5">
            <figure className="overflow-hidden rounded-panel border border-ink/[0.08] bg-card lg:sticky lg:top-24">
              <CoastChart destinations={list} className="block aspect-[2/3] max-h-[70svh] w-full lg:aspect-auto lg:h-[calc(100svh-11rem)] lg:max-h-[720px]" />
              <figcaption className="border-t border-ink/[0.08] px-4 py-3 font-mono text-[12px] text-mute">
                Schematic chart, not for navigation. Routes vary with sea conditions
              </figcaption>
            </figure>
          </div>

          {/* Stories (+ a sticky route bar on small screens, where the chart isn't sticky) */}
          <div className="min-w-0 lg:col-span-7">
          <nav aria-label="Coastline stops" className="sticky top-16 z-20 -mx-5 mb-10 border-b border-ink/[0.08] bg-page/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:hidden">
            <ol className="relative flex gap-2 overflow-x-auto [scrollbar-width:none]">
              {list.map((d, i) => (
                <li key={d.id} className="shrink-0">
                  <a href={`#stop-${d.id}`} data-chart-label={d.id} className="inline-flex h-8 items-center gap-2 rounded-[8px] border px-3 font-mono text-[12px]">
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    {d.id === 'aghanashini' ? 'Tadadi' : d.name.replace('Gokarna Main Beach', 'Main Beach').replace(' Beach', '')}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <ol id="coastline-stories" className="space-y-20 lg:space-y-32">
            {list.map((d, i) => (
              <li key={d.id} id={`stop-${d.id}`} data-chart-step={d.id} className="scroll-mt-32">
                <article>
                  <div data-parallax-root="" className="relative aspect-[16/10] overflow-hidden rounded-panel bg-card" data-reveal>
                    <div className="absolute -inset-y-[10%] inset-x-0" data-parallax="0.08">
                      <Media image={d.image} sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto]" data-reveal>
                    <div>
                      <p className="font-mono text-[13px] text-mute">
                        Stop {String(i + 1).padStart(2, '0')} · {d.kicker}
                      </p>
                      <h3 className="mt-2 text-subtitle">{d.name}</h3>
                    </div>
                    <p className="self-start rounded-[6px] border border-ink/10 px-2 py-1 font-mono text-[12px] text-soft">{routeStatusLabel[d.routeStatus]}</p>
                  </div>
                  <p className="mt-4 max-w-[36rem] text-[16px] leading-[1.65] text-soft" data-reveal>
                    {d.description}
                  </p>
                  <p className="mt-4 max-w-[36rem] border-l-2 border-ember pl-4 text-[15px] leading-[1.6] text-ink" data-reveal>
                    {d.special}
                  </p>
                  <p className="mt-4 text-[13px] text-mute">{d.routeNote}</p>
                </article>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
