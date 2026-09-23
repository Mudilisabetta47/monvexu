'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

let instance: Lenis | null = null;
export const getLenis = () => instance;

/**
 * Sanftes Scrollen (Lenis). Auf Touch-Geraeten und bei prefers-reduced-motion
 * bleibt natives Scrollen aktiv – dort ist es schlicht besser.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !fine) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    instance = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      const href = a?.getAttribute('href');
      if (!href || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const hash = href.startsWith('#') ? href : href.startsWith('/#') && location.pathname === '/' ? href.slice(1) : null;
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.4 });
      history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
