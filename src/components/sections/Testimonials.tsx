'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';
import { Placeholder } from '@/components/ui/Placeholder';
import { social } from '@/config/brand';
import { testimonials, testimonialsConfig } from '@/config/testimonials';
import { cn } from '@/utils/cn';

export function Testimonials() {
  const [i, setI] = useState(0);
  if (!testimonialsConfig.enabled || testimonials.length === 0) return null;
  const t = testimonials[i];
  const go = (d: number) => setI((x) => (x + d + testimonials.length) % testimonials.length);

  return (
    <section aria-labelledby="testimonials-title" className="border-t border-ink/[0.08] bg-deep py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" data-reveal>
          <p className="kicker mb-4">Guest stories</p>
          <h2 id="testimonials-title" className="text-title">
            {testimonialsConfig.heading.charAt(0).toUpperCase() + testimonialsConfig.heading.slice(1)}
          </h2>
          <a href={social.googleReviews} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-4 rounded-card border border-ink/10 bg-card px-5 py-4 transition-colors duration-160 hover:border-ink/20">
            <span className="font-serif text-[40px] leading-none text-ink">{social.googleRating.score}</span>
            <span>
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, k) => (
                  <Star key={k} className="h-4 w-4 fill-ember text-ember" strokeWidth={1.5} />
                ))}
              </span>
              <span className="mt-1 block text-[14px] text-soft group-hover:text-ink">
                {social.googleRating.count} reviews on Google
              </span>
            </span>
          </a>
          <p className="mt-3 font-mono text-[12px] text-mute">As of {social.googleRating.asOf}</p>
        </div>

        <div className="lg:col-span-8" data-reveal>
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure key={t.id + i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center gap-3">
                  {typeof t.rating === 'number' && (
                    <span className="flex gap-1" aria-label={`Rated ${t.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, k) => (
                        <Star key={k} className={cn('h-4 w-4', k < t.rating! ? 'fill-ember text-ember' : 'text-ink/20')} strokeWidth={1.5} />
                      ))}
                    </span>
                  )}
                  {t.isPlaceholder && <Placeholder label="Sample review" />}
                </div>
                <blockquote className="mt-6 font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] text-ink">“{t.review}”</blockquote>
                <figcaption className="mt-8 text-[15px]">
                  <span className="text-ink">{t.name}</span>
                  {t.origin && <span className="text-mute"> · {t.origin}</span>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-control border border-ink/10 text-soft transition-colors duration-160 hover:text-ink">
              <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-control border border-ink/10 text-soft transition-colors duration-160 hover:text-ink">
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <p className="font-mono text-[13px] tabular-nums text-mute">
              {i + 1} / {testimonials.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
