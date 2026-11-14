'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Placeholder } from '@/components/ui/Placeholder';
import { social } from '@/config/brand';
import { testimonials, testimonialsConfig } from '@/config/testimonials';
import { cn } from '@/utils/cn';

const AUTOPLAY = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(false);
  const ring = useRef<HTMLDivElement>(null);
  const n = testimonials.length;

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setI((x) => (x + 1) % n), AUTOPLAY);
    return () => window.clearTimeout(id);
  }, [i, paused, n]);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!testimonialsConfig.enabled || n === 0) return null;
  const t = testimonials[i];
  const go = (d: number) => setI((x) => (x + d + n) % n);
  const score = Number(social.googleRating.score);
  const C = 2 * Math.PI * 54;

  return (
    <section aria-labelledby="testimonials-title" className="relative overflow-hidden border-y border-ink/[0.08] bg-deep py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-glow/[0.06] blur-[120px]" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" data-reveal>
          <p className="mb-5 flex items-center gap-3">
            <span className="kicker">Guest stories</span>
          </p>
          <h2 id="testimonials-title" className="text-title">
            {testimonialsConfig.heading.charAt(0).toUpperCase() + testimonialsConfig.heading.slice(1)}
          </h2>

          <a href={social.googleReviews} target="_blank" rel="noopener noreferrer" className="group mt-10 flex items-center gap-6">
            <div ref={ring} className="relative h-[132px] w-[132px] shrink-0">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgb(var(--ink) / 0.08)" strokeWidth="4" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#ring-grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={seen ? C * (1 - score / 5) : C}
                  style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)', filter: 'drop-shadow(0 0 6px rgb(var(--glow) / 0.6))' }}
                />
                <defs>
                  <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--glow))" />
                    <stop offset="100%" stopColor="rgb(var(--violet))" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[34px] font-semibold leading-none tracking-[-0.04em] text-ink">{social.googleRating.score}</span>
                <span className="mt-1 flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} className="h-3 w-3 fill-sun text-sun" strokeWidth={1.5} />
                  ))}
                </span>
              </span>
            </div>
            <span>
              <span className="block font-display text-[20px] font-medium tracking-[-0.02em] text-ink">{social.googleRating.count} reviews</span>
              <span className="mt-1 block text-[14px] text-soft transition-colors group-hover:text-glow-ink">on Google →</span>
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-mute">As of {social.googleRating.asOf}</span>
            </span>
          </a>
        </div>

        <div className="lg:col-span-8" data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="glass relative min-h-[360px] overflow-hidden rounded-panel p-7 sm:p-10">
            <Quote aria-hidden className="absolute right-6 top-6 h-20 w-20 text-glow/10" strokeWidth={1} />
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={t.id + i}
                initial={{ opacity: 0, x: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="flex items-center gap-3">
                  {typeof t.rating === 'number' && (
                    <span className="flex gap-1" aria-label={`Rated ${t.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, k) => (
                        <Star key={k} className={cn('h-4 w-4', k < t.rating! ? 'fill-sun text-sun' : 'text-ink/20')} strokeWidth={1.5} />
                      ))}
                    </span>
                  )}
                  {t.isPlaceholder && <Placeholder label="Sample review" />}
                </div>
                <blockquote className="mt-7 font-display text-[clamp(1.2rem,2.2vw,1.75rem)] font-normal leading-[1.4] tracking-[-0.02em] text-ink">“{t.review}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-[14px]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-glow to-violet font-display text-[14px] font-semibold text-on-glow">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-ink">{t.name}</span>
                    {t.origin && <span className="block text-[12px] text-mute">{t.origin}</span>}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-soft transition-colors duration-160 hover:border-glow/50 hover:text-glow-ink">
              <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-soft transition-colors duration-160 hover:border-glow/50 hover:text-glow-ink">
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <div className="flex flex-1 gap-1.5" role="tablist" aria-label="Choose a review">
              {testimonials.map((r, k) => (
                <button key={r.id} type="button" role="tab" aria-selected={k === i} aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                  {k < i && <span className="absolute inset-0 bg-glow/60" />}
                  {k === i && (
                    <span
                      key={`${i}-${paused}`}
                      className="absolute inset-0 origin-left bg-glow"
                      style={{ animation: paused ? undefined : `draw-x ${AUTOPLAY}ms linear both` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
