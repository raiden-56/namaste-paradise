'use client';

import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Media } from '@/components/media/Media';
import { buttonClass } from '@/components/ui/button';
import { gallery, galleryCategories } from '@/config/gallery';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { GalleryCategory, GalleryItem } from '@/types';
import { cn } from '@/utils/cn';

const ratio: Record<GalleryItem['ratio'], string> = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  tall: 'aspect-[3/4]',
};
const EASE = [0.22, 1, 0.36, 1] as const;

function Lightbox({ items, index, onClose, onChange }: { items: GalleryItem[]; index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const open = index !== null;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useLockBodyScroll(open);
  const go = useCallback((d: 1 | -1) => index !== null && onChange((index + d + items.length) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, go, onClose]);

  const item = index !== null ? items[index] : null;
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          className="fixed inset-0 z-[70] flex flex-col bg-night/95 text-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono text-[13px] tabular-nums text-cream/60">
              {index! + 1} / {items.length}
            </p>
            <button type="button" onClick={onClose} aria-label="Close" autoFocus className="grid h-9 w-9 place-items-center rounded-control text-cream hover:bg-cream/10">
              <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-20" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_: unknown, info: PanInfo) => (info.offset.x < -60 ? go(1) : info.offset.x > 60 ? go(-1) : undefined)}
                className="w-full max-w-5xl"
              >
                <div className="relative aspect-[4/5] max-h-[72vh] w-full overflow-hidden rounded-panel sm:aspect-[16/10]">
                  <Media image={item.image} sizes="90vw" />
                </div>
                <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-serif text-[22px]">{item.caption}</span>
                  <span className="font-mono text-[12px] text-cream/60">{item.category}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            {(
              [
                [-1, 'left-3', ChevronLeft, 'Previous image'],
                [1, 'right-3', ChevronRight, 'Next image'],
              ] as const
            ).map(([d, pos, Icon, label]) => (
              <button
                key={d}
                type="button"
                onClick={() => go(d)}
                aria-label={label}
                className={cn('absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-control border border-cream/15 text-cream hover:bg-cream/10 sm:grid', pos)}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function Gallery({ filters = false, limit, heading = true }: { filters?: boolean; limit?: number; heading?: boolean }) {
  const [category, setCategory] = useState<GalleryCategory | 'All'>('All');
  const [index, setIndex] = useState<number | null>(null);
  const items = useMemo(() => {
    const list = category === 'All' ? gallery : gallery.filter((g) => g.category === category);
    return limit ? list.slice(0, limit) : list;
  }, [category, limit]);

  return (
    <section id="gallery" aria-labelledby={heading ? 'gallery-title' : undefined} aria-label={heading ? undefined : 'Photo gallery'} className="border-t border-ink/[0.08] py-24 sm:py-32">
      <div className="wrap">
        {heading && (
          <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between" data-reveal>
            <div className="max-w-[40rem]">
              <p className="kicker mb-4">Gallery</p>
              <h2 id="gallery-title" className="text-title">
                Moments from the water
              </h2>
              <p className="mt-5 text-[17px] text-soft">Our boat, the coves and the sunsets along the way</p>
            </div>
            {limit && (
              <Link href="/gallery" className={buttonClass('secondary', 'md', 'shrink-0 self-start md:self-auto')}>
                Full gallery <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            )}
          </div>
        )}

        {filters && (
          <div role="tablist" aria-label="Gallery categories" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {(['All', ...galleryCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  'h-9 shrink-0 rounded-control border px-4 text-[14px] transition-colors duration-160',
                  category === c ? 'border-ink/20 bg-raised text-ink' : 'border-transparent text-soft hover:text-ink',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
          {items.map((item, i) => (
            <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-card bg-card text-left" aria-label={`Open image: ${item.caption}`}>
                <div className={cn('relative w-full', ratio[item.ratio])}>
                  <div className="absolute inset-0 transition-transform duration-400 ease-out group-hover:scale-[1.03]">
                    <Media image={item.image} sizes="(min-width: 1024px) 30vw, 50vw" />
                  </div>
                </div>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-night/0 p-3 pt-10 font-mono text-[12px] text-cream sm:p-4 sm:pt-12">{item.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </section>
  );
}
