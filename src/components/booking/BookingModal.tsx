'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Media } from '@/components/media/Media';
import { getPackageById } from '@/config/packages';
import { photo } from '@/config/photos';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { ImageAsset } from '@/types';
import { BookingForm } from './BookingForm';

const fallback: ImageAsset = photo('npc-cruise-boat');
const EASE = [0.22, 1, 0.36, 1] as const;

export default function BookingModal({ open, onClose, initialPackageId = '' }: { open: boolean; onClose: () => void; initialPackageId?: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const pkg = initialPackageId ? getPackageById(initialPackageId) : undefined;
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>('input, select')?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const els = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea');
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-night/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative flex max-h-[94svh] w-full max-w-[960px] overflow-hidden rounded-t-panel border border-ink/10 bg-page shadow-float sm:rounded-panel"
          >
            <div className="relative hidden w-[36%] shrink-0 lg:block">
              <Media image={pkg?.image ?? fallback} sizes="340px" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-night/0 p-8 pt-24 text-cream">
                <p className="font-mono text-[13px] text-cream/70">{pkg ? pkg.tag : 'Gokarna coast'}</p>
                <p className="mt-2 font-serif text-[28px] leading-[1.1]">{pkg ? pkg.name : 'An evening on the Arabian Sea'}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink/[0.08] bg-page px-6 py-5 sm:px-8">
                <div>
                  <h2 id="booking-title" className="text-[28px] leading-[1.15]">
                    Plan your trip
                  </h2>
                  <p className="mt-1 text-[14px] text-soft">Sent to our team on WhatsApp</p>
                </div>
                <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-control text-soft transition-colors duration-160 hover:bg-ink/5 hover:text-ink">
                  <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </button>
              </div>
              <div className="px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 sm:px-8 sm:pb-8">
                <BookingForm key={initialPackageId || 'none'} initialPackageId={initialPackageId} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
