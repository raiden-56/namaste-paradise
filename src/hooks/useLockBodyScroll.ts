'use client';

import { useEffect } from 'react';

/** Locks page scroll while a modal / menu is open, without layout shift. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prev = [body.style.overflow, body.style.paddingRight];
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      [body.style.overflow, body.style.paddingRight] = prev;
    };
  }, [locked]);
}
