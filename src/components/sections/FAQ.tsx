'use client';

import { Plus, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { buttonClass } from '@/components/ui/button';
import { Placeholder } from '@/components/ui/Placeholder';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { faqs } from '@/config/faq';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

/** Native <details> accordion (works without JS, fully indexable) with a live search filter. */
export function FAQ({ limit }: { limit?: number }) {
  const [query, setQuery] = useState('');
  const base = limit ? faqs.slice(0, limit) : faqs;
  const q = query.trim().toLowerCase();
  const list = useMemo(() => (q ? base.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q)) : base), [base, q]);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative border-t border-ink/[0.08] py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32" data-reveal>
            <p className="mb-5 flex items-center gap-3">
              <span className="kicker">Questions</span>
            </p>
            <h2 id="faq-title" className="text-title">
              Good to know before you board
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-soft">Can’t find your answer? Message us and a person from our team replies.</p>
            <a href={buildWhatsAppUrl('Hello, I have a question about your Gokarna boat tours.')} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'md', 'mt-8')}>
              <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
        </div>
        <div className="lg:col-span-8">
          <label className="glass relative mb-6 flex h-14 items-center gap-3 rounded-full px-5 focus-within:border-glow/50 focus-within:shadow-[0_0_0_4px_rgb(var(--glow)/0.12)]">
            <Search className="h-[18px] w-[18px] shrink-0 text-mute" strokeWidth={1.5} />
            <span className="sr-only">Search questions</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: price, kids, timing, swimming…"
              className="h-full flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-mute [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="grid h-8 w-8 place-items-center rounded-full text-mute hover:bg-ink/5 hover:text-ink">
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            )}
            <span className="hidden font-mono text-[11px] tabular-nums text-mute sm:block" aria-live="polite">
              {list.length}/{base.length}
            </span>
          </label>

          <div className="space-y-3">
            {list.map((f, i) => (
              <details key={f.id} className="group overflow-hidden rounded-card border border-ink/[0.08] bg-card transition-colors duration-400 open:border-glow/30 open:bg-card" open={!q && i === 0 ? true : undefined}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 transition-colors duration-160 hover:text-glow-ink sm:px-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="flex items-baseline gap-4 font-sans text-[16px] font-medium leading-[1.4]">
                    <span className="font-mono text-[11px] text-mute group-open:text-glow-ink">{String(i + 1).padStart(2, '0')}</span>
                    {f.question}
                  </h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/10 transition-[transform,background-color,border-color] duration-400 group-open:rotate-45 group-open:border-glow group-open:bg-glow group-open:text-on-glow">
                    <Plus className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </summary>
                <div className="px-5 pb-6 pl-[3.25rem] pr-14 sm:px-6 sm:pl-[3.6rem]">
                  <p className="text-[15px] leading-[1.7] text-soft">{f.answer}</p>
                  {f.needsConfirmation && <Placeholder label="Draft answer, to confirm" className="mt-3" />}
                </div>
              </details>
            ))}
            {list.length === 0 && (
              <p className="rounded-card border border-dashed border-ink/15 px-6 py-10 text-center text-[15px] text-soft">
                No matching questions.{' '}
                <a href={buildWhatsAppUrl(`Hello, I have a question: ${query}`)} target="_blank" rel="noopener noreferrer" className="link">
                  Ask us on WhatsApp
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
