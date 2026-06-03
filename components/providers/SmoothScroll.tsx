'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Inertia smooth scrolling (Lenis). Falls back to native scroll on touch
 * devices and when the user prefers reduced motion. Also upgrades in-page
 * anchor links (`#section`) to eased scrolling that lands below the fixed nav.
 */
const SmoothScroll = () => {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;

    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const navH =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 76;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -(navH + 22) });
      if (history.replaceState) history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
