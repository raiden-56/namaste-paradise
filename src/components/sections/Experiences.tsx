'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Media } from '@/components/media/Media';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { activeExperiences } from '@/config/experiences';
import { cn } from '@/utils/cn';

/** Editorial list on the right; a sticky preview on the left swaps with hover / focus. */
export function Experiences() {
  const [active, setActive] = useState(0);
  const current = activeExperiences[active];

  return (
    <section id="experiences" aria-labelledby="experiences-title" className="py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader id="experiences-title" kicker="Experiences" title="Six ways onto the Arabian Sea">
              Slow sightseeing past the coves, a mini cruise at sunset, or a private boat for your own group.
            </SectionHeader>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-panel bg-card lg:block">
              {activeExperiences.map((exp, i) => (
                <div
                  key={exp.id}
                  className={cn('absolute inset-0 transition-opacity duration-400 ease-out', i === active ? 'opacity-100' : 'opacity-0')}
                  aria-hidden={i !== active}
                >
                  <Media image={exp.image} sizes="(min-width: 1024px) 36vw, 0px" />
                </div>
              ))}
              <p className="absolute bottom-4 left-4 rounded-[8px] bg-night/70 px-3 py-1.5 font-mono text-[12px] text-cream">{current?.title}</p>
            </div>
          </div>
        </div>

        <ul className="border-t border-ink/[0.08] lg:col-span-7">
          {activeExperiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <li key={exp.id} className="border-b border-ink/[0.08]" data-reveal>
                <Link
                  href={`/packages/${exp.packageSlug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[72px_1fr_auto] items-center gap-5 py-6 sm:grid-cols-[96px_1fr_auto] lg:grid-cols-[24px_1fr_auto]"
                >
                  <span className="relative aspect-square overflow-hidden rounded-[12px] bg-card lg:hidden">
                    <Media image={exp.image} sizes="96px" />
                  </span>
                  <Icon className="hidden h-[18px] w-[18px] text-mute transition-colors duration-160 group-hover:text-ember-ink lg:block" strokeWidth={1.5} />
                  <span>
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-serif text-[26px] leading-[1.15] text-ink">{exp.title}</span>
                      {exp.note && <span className="font-mono text-[12px] text-mute">{exp.note}</span>}
                    </span>
                    <span className="mt-1.5 block text-[15px] leading-[1.6] text-soft">{exp.description}</span>
                  </span>
                  <ArrowUpRight className="h-[18px] w-[18px] text-mute transition-[color,transform] duration-160 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" strokeWidth={1.5} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
