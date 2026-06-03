'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Toggles `.in` on `.reveal` elements as they enter the viewport.
 * Mirrors the prototype's app.js with three fail-safes so content can never
 * stay trapped at opacity:0 (reveal-in-view on mount, on first scroll, and a
 * timeout backstop). Re-runs on client navigations.
 */
const ScrollReveals = () => {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!reveals.length) return;

    const show = (el: Element) => el.classList.add('in');
    const showInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) show(el);
      });
    };

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            show(en.target);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    reveals.forEach((el) => io.observe(el));
    showInView();

    const timeout = window.setTimeout(() => {
      if (document.querySelectorAll('.reveal:not(.in)').length === reveals.length) {
        reveals.forEach(show);
      }
    }, 1400);
    window.addEventListener('scroll', showInView, { passive: true });

    return () => {
      io.disconnect();
      window.clearTimeout(timeout);
      window.removeEventListener('scroll', showInView);
    };
  }, [pathname]);

  return null;
};

export default ScrollReveals;
