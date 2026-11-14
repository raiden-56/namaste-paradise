'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { allowHeavyMotion, prefersReducedMotion } from '@/utils/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * One place for all scroll-driven motion, wired through data attributes so
 * every section can stay a server component:
 *
 *  data-reveal                      fade + rise when scrolled into view (below-the-fold only)
 *  data-parallax="0.12"             move inside its [data-parallax-root] (or parent) while scrolling
 *  data-parallax-root[data-out]     parallax runs from top-of-page as the root scrolls away (heroes)
 *  data-progress="x|y"              line that fills with scroll inside [data-progress-root]
 *  data-draw                        SVG path that draws with scroll inside [data-draw-root]
 *  data-stack-card                  sticky cards — the previous card recedes as the next arrives
 *  data-chart-step="id"             story blocks that move [data-chart-marker] to [data-chart-stop="id"]
 *
 * Reduced motion / low-power devices: nothing is hidden or moved; the chart still tracks.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const heavy = allowHeavyMotion();
    const prefersReduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      /* Chart tracking (state, not decoration — always on) */
      // The marker is moved with GSAP (SVG transform attribute) — reliable in every browser, incl. Safari.
      const marker = document.querySelector<SVGGElement>('[data-chart-marker]');
      let current = '';
      const setActive = (id: string, instant = false) => {
        if (id === current) return;
        current = id;
        document.querySelectorAll<SVGElement>('[data-chart-stop]').forEach((stop) => {
          const on = stop.dataset.chartStop === id;
          stop.toggleAttribute('data-active', on);
          if (on && marker) {
            const to = { x: Number(stop.dataset.x), y: Number(stop.dataset.y) };
            if (instant || prefersReduced) gsap.set(marker, to);
            else gsap.to(marker, { ...to, duration: 0.7, ease: 'power3.inOut', overwrite: true });
          }
        });
        // Mobile route bar + story emphasis
        document.querySelectorAll<HTMLElement>('[data-chart-label], [data-chart-step]').forEach((el) => {
          el.toggleAttribute('data-active', (el.dataset.chartLabel ?? el.dataset.chartStep) === id);
        });
        // Centre the active stop inside the mobile bar only (scrollIntoView would also move the page).
        const label = document.querySelector<HTMLElement>(`[data-chart-label="${id}"]`);
        const bar = label?.closest('ol');
        if (label && bar && bar.scrollWidth > bar.clientWidth) {
          const li = label.parentElement as HTMLElement;
          bar.scrollTo({ left: li.offsetLeft - (bar.clientWidth - li.offsetWidth) / 2, behavior: prefersReduced ? 'auto' : 'smooth' });
        }
      };
      const steps = gsap.utils.toArray<HTMLElement>('[data-chart-step]');
      if (steps.length) {
        setActive(steps[0].dataset.chartStep!, true);
        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            // the step whose block crosses the middle of the screen is the active one
            start: i === 0 ? 'top bottom' : 'top 55%',
            end: i === steps.length - 1 ? 'bottom top' : 'bottom 55%',
            onToggle: (self) => self.isActive && setActive(step.dataset.chartStep!),
          });
        });
      }

      if (!heavy) return;

      /* Reveals — only for elements that start below the fold, so nothing flashes */
      const reveal = gsap.utils
        .toArray<HTMLElement>('[data-reveal]')
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      if (reveal.length) {
        gsap.set(reveal, { opacity: 0, y: 12 });
        // A plain scroll sweep (rAF-throttled) rather than ScrollTrigger.batch / IntersectionObserver:
        // both can miss blocks that are jumped over by a fast scroll or an anchor link.
        let pending = [...reveal];
        let raf = 0;
        const sweep = () => {
          raf = 0;
          const limit = window.innerHeight * 0.92;
          const passed: HTMLElement[] = [];
          const entering: HTMLElement[] = [];
          pending = pending.filter((el) => {
            const r = el.getBoundingClientRect();
            if (r.bottom <= 0) passed.push(el);
            else if (r.top < limit) entering.push(el);
            else return true;
            return false;
          });
          if (passed.length) gsap.set(passed, { opacity: 1, y: 0 });
          if (entering.length)
            gsap.to(entering, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: { amount: Math.min(0.3, entering.length * 0.05) } });
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
        gsap.fromTo(el, { [prop]: 0 }, { [prop]: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 } });
      });

      /* Drawn SVG paths */
      gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach((path) => {
        const len = path.getTotalLength();
        // data-draw="#selector" ties the drawing to another element's scroll (e.g. the story list)
        const target = path.dataset.draw ? document.querySelector<HTMLElement>(path.dataset.draw) : null;
        const root = target ?? (path.closest('[data-draw-root]') as HTMLElement | null) ?? path.ownerSVGElement!;
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: target
              ? { trigger: target, start: 'top 55%', end: 'bottom 55%', scrub: 0.5 }
              : { trigger: root, start: 'top 60%', end: 'bottom 70%', scrub: 0.4 },
          },
        );
      });
    });

    /* Stacked sticky cards (desktop only) */
    const mm = gsap.matchMedia();
    if (heavy)
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          const inner = card.querySelector<HTMLElement>('[data-stack-inner]');
          if (!next || !inner) return;
          gsap.to(inner, {
            scale: 0.94,
            opacity: 0.45,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true },
          });
        });
      });

    // Re-measure once fonts and lazy media have settled.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 500);
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
