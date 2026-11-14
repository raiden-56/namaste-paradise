import { ArrowRight, MoveHorizontal } from 'lucide-react';
import { Media } from '@/components/media/Media';
import { BookButton } from '@/components/booking/BookButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { destinations, routeStatusLabel } from '@/config/destinations';
import type { Destination } from '@/types';
import { cn } from '@/utils/cn';

/** The order a boat meets them: from the Tadadi jetty north along the coast. */
const JOURNEY = ['aghanashini', 'paradise', 'half-moon', 'om-beach', 'kudle', 'main-beach'];
const shortName = (d: Destination) => (d.id === 'aghanashini' ? 'Tadadi' : d.name.replace('Gokarna Main Beach', 'Main Beach').replace(' Beach', ''));

/** Horizontal voyage: pinned and scroll-driven on desktop, a swipeable rail on touch screens. */
export function Coastline({ limit }: { limit?: number }) {
  const ordered = JOURNEY.map((id) => destinations.find((d) => d.id === id)).filter(Boolean) as Destination[];
  const list = limit ? ordered.slice(0, limit) : ordered;
  const edge = 'pl-4 sm:pl-8 lg:pl-[max(3rem,calc((100vw-84rem)/2+3rem))]';

  return (
    <section id="coastline" aria-labelledby="coastline-title" data-hscroll="" className="relative overflow-hidden bg-page py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-20">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader id="coastline-title" kicker="The coastline" title="Gokarna’s coast, stop by stop">
            From the river mouth at Tadadi, the coast runs north past secluded coves to the temple town. Every route is confirmed with you before you sail.
          </SectionHeader>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mute lg:hidden">
            <MoveHorizontal className="h-4 w-4" strokeWidth={1.5} /> Swipe to sail along
          </p>
          <ol className="hidden shrink-0 items-start gap-0 lg:flex" aria-hidden>
            {list.map((d, i) => (
              <li key={d.id} data-hscroll-node="" className="flex flex-col items-center gap-2" style={{ width: 76 }}>
                <span className="relative flex w-full items-center justify-center">
                  {i > 0 && <span className="absolute right-1/2 top-1/2 h-px w-full -translate-y-1/2 bg-ink/15" />}
                  <span className="node-dot relative h-3 w-3 rounded-full border-2" />
                </span>
                <span className="node-label font-mono text-[10px] uppercase tracking-[0.1em]">{shortName(d)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div data-hscroll-viewport="" className="no-scrollbar mt-12 snap-x snap-mandatory overflow-x-auto lg:mt-14">
        <ol data-hscroll-track="" className={cn('flex w-max gap-5 pr-4 sm:pr-8 lg:gap-8', edge)}>
          {list.map((d, i) => (
            <li key={d.id} id={`stop-${d.id}`} className="w-[84vw] shrink-0 snap-start sm:w-[62vw] lg:w-[min(46vw,640px)]">
              <article className="group">
                <div className="relative aspect-[16/11] overflow-hidden rounded-panel border border-ink/[0.08] bg-card lg:aspect-auto lg:h-[44svh]">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                    <Media image={d.image} sizes="(min-width: 1024px) 46vw, 84vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-night/20" />
                  <span className="absolute left-5 top-5 font-display text-[64px] font-semibold leading-none tracking-[-0.05em] text-cream/90 [text-shadow:0_4px_30px_rgb(0_0_0/0.4)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="glass-scene absolute bottom-4 left-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/90">
                    {routeStatusLabel[d.routeStatus]}
                  </span>
                </div>
                <div className="mt-6 grid gap-x-8 gap-y-3 lg:grid-cols-[1fr_1.1fr]">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-glow-ink">{d.kicker}</p>
                    <h3 className="mt-2 text-subtitle">{d.name}</h3>
                    <p className="mt-3 text-[12px] text-mute">{d.routeNote}</p>
                  </div>
                  <div>
                    <p className="text-[14px] leading-[1.65] text-soft">{d.description}</p>
                    <p className="mt-3 border-l-2 border-glow pl-3 text-[13px] leading-[1.6] text-ink">{d.special}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
          <li className="flex w-[70vw] shrink-0 snap-start items-center sm:w-[40vw] lg:w-[min(30vw,420px)]">
            <div className="glass relative w-full overflow-hidden rounded-panel p-8">
              <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-glow/20 blur-3xl" />
              <p className="kicker">End of route</p>
              <p className="mt-4 font-display text-[22px] font-medium leading-tight tracking-[-0.02em]">Ready to see it from the water?</p>
              <p className="mt-3 text-[14px] text-soft">Routes vary with sea conditions and are confirmed on WhatsApp.</p>
              <BookButton variant="glow" className="mt-6">
                Plan my trip <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </BookButton>
            </div>
          </li>
        </ol>
      </div>

      <div className="wrap mt-10 hidden lg:block" aria-hidden>
        <div className="h-px w-full bg-ink/10">
          <div data-hscroll-progress="" className="h-px origin-left scale-x-0 bg-glow shadow-[0_0_10px_rgb(var(--glow))]" />
        </div>
      </div>
    </section>
  );
}
