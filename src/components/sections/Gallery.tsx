'use client';

import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
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
          className="fixed inset-0 z-[70] flex flex-col bg-night/90 text-cream backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] tabular-nums text-cream/60">
              {String(index! + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <button type="button" onClick={onClose} aria-label="Close" autoFocus className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream hover:bg-cream/10">
              <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-20" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_: unknown, info: PanInfo) => (info.offset.x < -60 ? go(1) : info.offset.x > 60 ? go(-1) : undefined)}
                className="w-full max-w-5xl"
              >
                <div className="relative aspect-[4/5] max-h-[72vh] w-full overflow-hidden rounded-panel border border-cream/10 sm:aspect-[16/10]">
                  <Media image={item.image} sizes="90vw" />
                </div>
                <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-[18px] font-medium tracking-[-0.02em]">{item.caption}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-aqua">{item.category}</span>
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
                className={cn('absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/15 bg-night/40 text-cream hover:border-aqua/60 hover:text-aqua sm:grid', pos)}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Tile({ item, onOpen, className, sizes, hidden = false }: { item: GalleryItem; onOpen: () => void; className?: string; sizes: string; hidden?: boolean }) {
  return (
    <button type="button" tabIndex={hidden ? -1 : undefined} onClick={onOpen} className={cn('group relative block overflow-hidden rounded-card border border-ink/[0.08] bg-card text-left', className)} aria-label={`Open image: ${item.caption}`}>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.07]">
        <Media image={item.image} sizes={sizes} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/0 to-night/0 opacity-80 transition-opacity duration-400 group-hover:opacity-100" />
      <span className="glass-scene absolute right-3 top-3 grid h-9 w-9 scale-75 place-items-center rounded-full text-cream opacity-0 transition-[opacity,transform] duration-400 group-hover:scale-100 group-hover:opacity-100">
        <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-aqua">{item.category}</span>
        <span className="mt-1 block text-[13px] text-cream">{item.caption}</span>
      </span>
    </button>
  );
}

export function Gallery({ filters = false, limit, heading = true }: { filters?: boolean; limit?: number; heading?: boolean }) {
  const [category, setCategory] = useState<GalleryCategory | 'All'>('All');
  const [index, setIndex] = useState<number | null>(null);
  const items = useMemo(() => {
    const list = category === 'All' ? gallery : gallery.filter((g) => g.category === category);
    return limit && !filters ? list.slice(0, Math.max(limit, 8)) : list;
  }, [category, limit, filters]);

  // Home: two counter-scrolling film strips. Gallery page: filterable grid.
  const strip = !filters;
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <section id="gallery" aria-labelledby={heading ? 'gallery-title' : undefined} aria-label={heading ? undefined : 'Photo gallery'} className="relative overflow-hidden py-24 sm:py-32">
      {heading && (
        <div className="wrap mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between" data-reveal>
          <div className="max-w-[40rem]">
            <p className="mb-5 flex items-center gap-3">
              <span className="kicker">Gallery</span>
            </p>
            <h2 id="gallery-title" className="text-title">
              Moments from the water
            </h2>
            <p className="mt-5 text-[16px] text-soft">Our boat, the coves and the sunsets along the way</p>
          </div>
          {limit && (
            <Link href="/gallery" className={buttonClass('secondary', 'md', 'shrink-0 self-start md:self-auto')}>
              Full gallery <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          )}
        </div>
      )}

      {strip ? (
        <div className="marquee-pause space-y-4">
          {rows.map((row, r) => (
            <div key={r} className="relative overflow-hidden">
              <ul className={cn('flex w-max gap-4', r === 0 ? 'animate-marquee' : 'animate-marquee-rev')} style={{ ['--marquee-duration' as string]: '60s' }}>
                {[...row, ...row].map((item, k) => {
                  const realIndex = r === 0 ? k % row.length : half + (k % row.length);
                  return (
                    <li key={`${item.id}-${k}`} aria-hidden={k >= row.length || undefined}>
                      <Tile
                        item={item}
                        onOpen={() => setIndex(realIndex)}
                        hidden={k >= row.length}
                        sizes="420px"
                        className={cn('h-[220px] sm:h-[280px]', item.ratio === 'landscape' ? 'w-[300px] sm:w-[400px]' : 'w-[200px] sm:w-[240px]')}
                      />
                    </li>
                  );
                })}
              </ul>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-page to-transparent sm:w-32" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-page to-transparent sm:w-32" />
            </div>
          ))}
        </div>
      ) : (
        <div className="wrap">
          <div role="tablist" aria-label="Gallery categories" className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {(['All', ...galleryCategories] as const).map((c) => {
              const on = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setCategory(c)}
                  className={cn('relative h-10 shrink-0 rounded-full border px-4 text-[13px] transition-colors duration-160', on ? 'border-glow/50 text-on-glow' : 'border-ink/10 text-soft hover:border-ink/20 hover:text-ink')}
                >
                  {on && <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-glow" transition={{ duration: 0.45, ease: EASE }} />}
                  <span className="relative">{c}</span>
                </button>
              );
            })}
          </div>
          <motion.ul layout className="columns-2 gap-3 sm:gap-4 lg:columns-3">
            <AnimatePresence initial={false}>
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mb-3 break-inside-avoid sm:mb-4"
                >
                  <Tile item={item} onOpen={() => setIndex(i)} sizes="(min-width: 1024px) 30vw, 50vw" className={cn('w-full', ratio[item.ratio])} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      )}
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </section>
  );
}
