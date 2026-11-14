'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import { BookButton } from '@/components/booking/BookButton';
import { Media } from '@/components/media/Media';
import { RouteStops } from '@/components/media/RouteStops';
import { buttonClass } from '@/components/ui/button';
import { Placeholder } from '@/components/ui/Placeholder';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { activePackages, formatDuration, formatGroup, formatPrice } from '@/config/packages';
import { cn } from '@/utils/cn';
import { buildPackageEnquiry, buildWhatsAppUrl } from '@/utils/whatsapp';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Package "console": pick a trip on the left, its full briefing appears on the right. */
export function Tours() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pkg = activePackages[active];

  const onKey = (e: KeyboardEvent) => {
    const n = activePackages.length;
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="tours" aria-labelledby="tours-title" className="relative overflow-hidden border-y border-ink/[0.08] bg-deep py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-glow/[0.07] blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-violet/[0.08] blur-[120px]" />
      <div className="wrap relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="tours-title" kicker="Boat tours" title="Curated boat tours and mini cruises">
            Pick a trip and send your date on WhatsApp. We reply with availability, timing, fare and boarding details.
          </SectionHeader>
          <Link href="/packages" className={buttonClass('secondary', 'md', 'shrink-0 self-start md:self-auto')}>
            Compare all packages <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12" data-reveal>
          {/* Selector */}
          <div role="tablist" aria-label="Tour packages" aria-orientation="vertical" onKeyDown={onKey} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {activePackages.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tour-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="tour-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                  className={cn(
                    'group relative flex min-w-[220px] shrink-0 items-center gap-4 overflow-hidden rounded-card border px-5 py-4 text-left transition-[background-color,border-color] duration-400 lg:min-w-0',
                    on ? 'border-glow/40 bg-card' : 'border-ink/[0.08] bg-transparent hover:border-ink/15 hover:bg-card/50',
                  )}
                >
                  {on && <motion.span layoutId="tour-indicator" className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-glow shadow-[0_0_12px_rgb(var(--glow))]" transition={{ duration: 0.5, ease: EASE }} />}
                  <span className={cn('font-mono text-[12px] transition-colors', on ? 'text-glow-ink' : 'text-mute')}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className={cn('block font-display text-[15px] font-medium leading-tight tracking-[-0.02em]', on ? 'text-ink' : 'text-soft group-hover:text-ink')}>{p.name}</span>
                    <span className="mt-1 block truncate text-[12px] text-mute">{p.tag}</span>
                  </span>
                  <span className={cn('shrink-0 font-mono text-[12px]', p.price ? 'text-sun' : 'text-mute')}>{p.price ? p.price.replace(' per person', '') : 'Ask'}</span>
                </button>
              );
            })}
          </div>

          {/* Briefing panel */}
          <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${pkg.id}`} className="relative min-h-[560px] overflow-hidden rounded-panel border border-ink/[0.08] bg-card lg:col-span-8">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid h-full md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
              >
                <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
                  <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }}>
                    <Media image={pkg.image} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card/40" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {pkg.bestFor.slice(0, 2).map((b) => (
                      <span key={b} className="glass-scene rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-cream/85">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="kicker">{pkg.tag}</span>
                    {pkg.isPlaceholder && <Placeholder label="Details to confirm" />}
                  </div>
                  <h3 className="mt-4 text-subtitle">
                    <Link href={`/packages/${pkg.slug}`} className="group inline-flex items-start gap-2 text-ink hover:text-glow-ink">
                      {pkg.name}
                      <ArrowUpRight className="mt-1 h-5 w-5 text-mute transition-transform duration-160 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow-ink" strokeWidth={1.5} />
                    </Link>
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-soft">{pkg.shortDescription}</p>

                  <dl className="mt-6 grid grid-cols-3 overflow-hidden rounded-card border border-ink/[0.08]">
                    {[
                      ['Duration', formatDuration(pkg)],
                      ['Group', formatGroup(pkg)],
                      ['Fare', formatPrice(pkg)],
                    ].map(([k, v], i) => (
                      <div key={k} className={cn('bg-raised/40 px-3 py-3', i > 0 && 'border-l border-ink/[0.08]')}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">{k}</dt>
                        <dd className={cn('mt-1 text-[13px] leading-5', k === 'Fare' && pkg.price ? 'text-sun' : 'text-ink')}>{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <RouteStops stops={pkg.route} animate="load" className="mt-7" key={`route-${pkg.id}`} />

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {pkg.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-[13px] leading-[1.5] text-soft">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-glow" strokeWidth={2} /> {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-3 pt-8">
                    <BookButton packageId={pkg.id} variant="glow" className="flex-1 sm:flex-none">
                      {pkg.ctaLabel}
                    </BookButton>
                    <a
                      href={buildWhatsAppUrl(buildPackageEnquiry(pkg.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Quick WhatsApp question about ${pkg.name}`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-raised text-soft transition-colors duration-160 hover:border-glow/40 hover:text-ink"
                    >
                      <WhatsAppIcon />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
