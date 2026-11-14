'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { allowHeavyMotion } from '@/utils/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * One place for all scroll-driven motion, wired through data attributes so
 * every section can stay a server component:
 *
 *  data-reveal                      fade + rise + unblur when scrolled into view (below-the-fold only)
 *  data-parallax="0.12"             move inside its [data-parallax-root] (or parent) while scrolling
 *  data-parallax-root[data-out]     parallax runs from top-of-page as the root scrolls away (heroes)
 *  data-progress="x|y"              line that fills with scroll inside [data-progress-root]
 *  data-hscroll                     section pinned while [data-hscroll-track] slides sideways (desktop);
 *                                   [data-hscroll-progress] fills and [data-hscroll-node] light up
 *
 * Reduced motion / low-power devices / touch screens: nothing is hidden; rails scroll natively.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const heavy = allowHeavyMotion();
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (!heavy) return;

      /* Reveals — only for elements that start below the fold, so nothing flashes */
      const reveal = gsap.utils
        .toArray<HTMLElement>('[data-reveal]')
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      if (reveal.length) {
        gsap.set(reveal, { opacity: 0, y: 24, filter: 'blur(6px)' });
        // A plain scroll sweep (rAF-throttled): it never misses blocks jumped over by a fast scroll or an anchor link.
        let pending = [...reveal];
        let raf = 0;
        const sweep = () => {
          raf = 0;
          const limit = window.innerHeight * 0.9;
          const passed: HTMLElement[] = [];
          const entering: HTMLElement[] = [];
          pending = pending.filter((el) => {
            const r = el.getBoundingClientRect();
            if (r.bottom <= 0) passed.push(el);
            else if (r.top < limit) entering.push(el);
            else return true;
            return false;
          });
          if (passed.length) gsap.set(passed, { opacity: 1, y: 0, filter: 'none' });
          if (entering.length)
            gsap.to(entering, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power3.out',
              stagger: { amount: Math.min(0.4, entering.length * 0.07) },
              clearProps: 'filter',
            });
          if (!pending.length) detach();
        };
        const onScroll = () => {
          if (!raf) raf = requestAnimationFrame(sweep);
        };
        const detach = () => {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        cleanups.push(() => {
          detach();
          cancelAnimationFrame(raf);
        });
      }

      /* Parallax */
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1');
        const root = (el.closest('[data-parallax-root]') as HTMLElement | null) ?? el.parentElement!;
        const out = root.hasAttribute('data-out');
        gsap.fromTo(
          el,
          { yPercent: out ? 0 : -speed * 100 },
          {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: { trigger: root, start: out ? 'top top' : 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      /* Progress lines */
      gsap.utils.toArray<HTMLElement>('[data-progress]').forEach((el) => {
        const prop = el.dataset.progress === 'y' ? 'scaleY' : 'scaleX';
        const root = (el.closest('[data-progress-root]') as HTMLElement | null) ?? el;
        gsap.fromTo(el, { [prop]: 0 }, { [prop]: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 60%', scrub: 0.4 } });
      });
    });

    /* Horizontal journeys (desktop, fine pointer, heavy motion allowed) */
    const mm = gsap.matchMedia();
    if (heavy)
      mm.add('(min-width: 1024px)', () => {
        const restore: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>('[data-hscroll]').forEach((section) => {
          const viewport = section.querySelector<HTMLElement>('[data-hscroll-viewport]');
          const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
          if (!viewport || !track) return;
          const bar = section.querySelector<HTMLElement>('[data-hscroll-progress]');
          const nodes = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('[data-hscroll-node]'));
          const prevOverflow = viewport.style.overflowX;
          viewport.style.overflowX = 'hidden';
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          const setNode = (p: number) => {
            const idx = Math.round(p * (nodes.length - 1));
            nodes.forEach((n, i) => n.toggleAttribute('data-active', i <= idx));
          };
          setNode(0);
          gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (bar) bar.style.transform = `scaleX(${self.progress})`;
                setNode(self.progress);
              },
            },
          });
          restore.push(() => {
            viewport.style.overflowX = prevOverflow;
          });
        });
        return () => restore.forEach((fn) => fn());
      });

    // Re-measure once fonts and lazy media have settled.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      window.clearTimeout(t);
      cleanups.forEach((fn) => fn());
      mm.revert();
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
