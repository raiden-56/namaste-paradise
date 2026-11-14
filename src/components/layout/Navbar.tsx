'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useBooking } from '@/components/booking/BookingProvider';
import { buttonClass } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { boarding, contact } from '@/config/brand';
import { navItems } from '@/config/site';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/utils/cn';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Logo } from './Logo';

const EASE = [0.22, 1, 0.36, 1] as const;

function isActive(to: string, pathname: string) {
  if (to.includes('#')) return false;
  return to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const onScene = !scrolled;

  return (
    <>
      {/* scroll progress */}
      <span aria-hidden className="fixed inset-x-0 top-0 z-[55] h-[2px] bg-transparent">
        <span ref={bar} className="block h-full origin-left scale-x-0 bg-gradient-to-r from-glow via-glow to-violet shadow-[0_0_12px_rgb(var(--glow)/0.8)]" />
      </span>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            'mx-auto flex h-14 max-w-site items-center justify-between gap-4 rounded-full pl-4 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-400 ease-out sm:pl-5',
            scrolled ? 'glass shadow-float' : 'border border-transparent',
          )}
        >
          <Logo onScene={onScene} />
          <ul className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const active = isActive(item.to, pathname);
              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-160',
                      onScene ? 'text-cream/75 hover:bg-cream/10 hover:text-cream' : 'text-soft hover:bg-ink/5 hover:text-ink',
                      active && (onScene ? 'text-cream' : 'text-ink'),
                    )}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-glow shadow-[0_0_8px_rgb(var(--glow))]" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => openBooking()} data-magnetic className={buttonClass('glow', 'sm', 'hidden sm:inline-flex')}>
              Book your cruise
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={cn(
                'grid h-10 w-10 place-items-center rounded-full transition-colors duration-160 xl:hidden',
                onScene ? 'text-cream hover:bg-cream/10' : 'text-ink hover:bg-ink/5',
              )}
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="grid-bg fixed inset-0 z-[60] flex flex-col bg-deep"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex h-[72px] items-center justify-between px-6 pt-3 sm:px-9">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" autoFocus className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink hover:bg-ink/5">
                <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>
            <motion.ul
              className="wrap flex-1 overflow-y-auto pt-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
            >
              {navItems.map((item, i) => (
                <motion.li key={item.to} variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}>
                  <Link href={item.to} onClick={() => setOpen(false)} className="group flex items-baseline gap-4 border-b border-ink/[0.08] py-4">
                    <span className="font-mono text-[12px] text-mute">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-[clamp(1.6rem,7vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink transition-colors duration-160 group-hover:text-glow-ink">
                      {item.label}
                    </span>
                    <ArrowUpRight className="ml-auto h-5 w-5 self-center text-mute transition-transform duration-160 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow-ink" strokeWidth={1.5} />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="wrap space-y-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass('glow', 'lg', 'w-full')}>
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
                className={buttonClass('secondary', 'lg', 'w-full')}
              >
                Book your cruise
              </button>
              <p className="pt-1 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                Departs {boarding.name} · {contact.phoneDisplay}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
