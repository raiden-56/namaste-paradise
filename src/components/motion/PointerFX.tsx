'use client';

import { useEffect } from 'react';
import { allowHeavyMotion } from '@/utils/motion';

/**
 * One pointer listener for every cursor-driven effect, wired through data attributes
 * so sections can stay server components:
 *
 *  data-spot        sets --mx / --my (px) on the element — used by .spot / .spot-border glows
 *  data-tilt="8"    3D tilt toward the cursor (max degrees)
 *  data-magnetic    element drifts a few px toward the cursor
 *
 * Only on fine pointers (mouse / trackpad) and when heavy motion is allowed.
 */
export function PointerFX() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const motion = allowHeavyMotion();
    let raf = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;

    const reset = (el: HTMLElement | null, kind: 'tilt' | 'magnet') => {
      if (!el) return;
      el.style.transform = '';
      if (kind === 'tilt') el.removeAttribute('data-tilting');
    };

    const frame = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;
      if (!target || !('closest' in target)) return;

      const spot = target.closest<HTMLElement>('[data-spot]');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      if (!motion) return;

      const tilt = target.closest<HTMLElement>('[data-tilt]');
      if (tilt !== tilted) {
        reset(tilted, 'tilt');
        tilted = tilt;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const max = Number(tilt.dataset.tilt) || 6;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.setAttribute('data-tilting', '');
        tilt.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      }

      const mag = target.closest<HTMLElement>('[data-magnetic]');
      if (mag !== magnet) {
        reset(magnet, 'magnet');
        magnet = mag;
      }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.28).toFixed(1)}px)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      reset(tilted, 'tilt');
      reset(magnet, 'magnet');
      tilted = magnet = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return null;
}
