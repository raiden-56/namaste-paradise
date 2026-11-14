'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useBooking } from '@/components/booking/BookingProvider';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { cn } from '@/utils/cn';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

/**
 * Bottom-right floating actions: back-to-top (after scrolling) above an icon-only WhatsApp button.
 * Both hide while the booking modal is open.
 */
export function FloatingWhatsApp() {
  const { isOpen } = useBooking();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShowTop(window.scrollY > window.innerHeight * 0.8));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div
      className={cn(
        'fixed bottom-[max(20px,env(safe-area-inset-bottom))] right-5 z-40 flex flex-col items-center gap-3 transition-opacity duration-160',
        isOpen && 'pointer-events-none opacity-0',
      )}
    >
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={cn(
          'grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-card text-ink shadow-float transition-[opacity,transform,background-color] duration-400 ease-out hover:bg-raised',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
        )}
      >
        <ArrowUp className="h-[18px] w-[18px]" strokeWidth={1.5} />
      </button>
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#1E8E50] text-white shadow-float transition-[background-color,transform] duration-160 hover:bg-[#1A7C46] active:scale-[0.96]"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
