'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBooking } from '@/components/booking/BookingProvider';
import { buttonClass } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { boarding } from '@/config/brand';
import { navItems } from '@/config/site';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/utils/cn';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

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
  useLockBodyScroll(open);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-400 ease-out',
          scrolled ? 'border-ink/[0.08] bg-page/90 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <nav className="wrap flex h-16 items-center justify-between gap-6" aria-label="Primary">
          <Logo onScene={onScene} />
          <ul className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => {
              const active = isActive(item.to, pathname);
              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-control px-3 py-2 text-[14px] transition-colors duration-160',
                      onScene ? 'text-cream/75 hover:text-cream' : 'text-soft hover:text-ink',
                      active && (onScene ? 'text-cream' : 'text-ink'),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle onScene={onScene} />
            <button
              type="button"
              onClick={() => openBooking()}
              className={buttonClass(onScene ? 'scene' : 'primary', 'sm', 'hidden sm:inline-flex')}
            >
              Book your cruise
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={cn(
                'grid h-9 w-9 place-items-center rounded-control transition-colors duration-160 xl:hidden',
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
            className="fixed inset-0 z-[60] flex flex-col bg-deep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <div className="wrap flex h-16 items-center justify-between">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" autoFocus className="grid h-9 w-9 place-items-center rounded-control text-ink hover:bg-ink/5">
                <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>
            <motion.ul
              className="wrap flex-1 overflow-y-auto pt-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {navItems.map((item) => (
                <motion.li key={item.to} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } } }}>
                  <Link href={item.to} onClick={() => setOpen(false)} className="block border-b border-ink/[0.08] py-4 font-serif text-[32px] leading-[1.1] text-ink">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="wrap space-y-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass('ember', 'lg', 'w-full')}>
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
              <p className="pt-1 text-center font-mono text-[12px] text-mute">Departs from {boarding.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
