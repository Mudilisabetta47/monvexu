'use client';

import { useEffect, useRef } from 'react';

/**
 * Eigener Cursor (nur Maus). Punkt + Ring folgen der Maus mit leichter Traegheit.
 * Elemente mit data-cursor="Text" verwandeln den Ring in ein Label ("Ansehen", "Ziehen" …).
 * Direkte DOM-Updates in rAF – kein React-Rerender pro Mausbewegung.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    const html = document.documentElement;
    html.classList.add('has-cursor');

    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;
    let visible = false;

    const setState = (state: string, text = '') => {
      if (!ring.current || !label.current) return;
      ring.current.dataset.state = state;
      label.current.textContent = text;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        dot.current?.style.setProperty('opacity', '1');
        ring.current?.style.setProperty('opacity', '1');
      }
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const withLabel = t?.closest<HTMLElement>('[data-cursor]');
      if (withLabel) return setState('label', withLabel.dataset.cursor);
      if (t?.closest('a,button,[role="button"],summary,label,select')) return setState('hover');
      if (t?.closest('input,textarea')) return setState('text');
      setState('idle');
    };
    const leave = () => {
      visible = false;
      dot.current?.style.setProperty('opacity', '0');
      ring.current?.style.setProperty('opacity', '0');
    };
    const down = () => ring.current?.classList.add('scale-90');
    const up = () => ring.current?.classList.remove('scale-90');

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={dot}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-300"
      />
      <div ref={ring} data-state="idle" className="group/ring absolute left-0 top-0 opacity-0 transition-opacity duration-300">
        <div
          className="absolute -left-[18px] -top-[18px] flex h-9 w-9 items-center justify-center rounded-full border border-white mix-blend-difference transition-[width,height,left,top,background-color,border-color] duration-500 ease-out
            group-data-[state=hover]/ring:-left-[30px] group-data-[state=hover]/ring:-top-[30px] group-data-[state=hover]/ring:h-[60px] group-data-[state=hover]/ring:w-[60px]
            group-data-[state=text]/ring:-left-[1px] group-data-[state=text]/ring:-top-[12px] group-data-[state=text]/ring:h-6 group-data-[state=text]/ring:w-[2px] group-data-[state=text]/ring:rounded-none group-data-[state=text]/ring:bg-white
            group-data-[state=label]/ring:opacity-0"
        />
        <div
          className="absolute -left-[46px] -top-[46px] flex h-[92px] w-[92px] scale-50 items-center justify-center rounded-full bg-ember text-center font-mono text-[10px] font-medium uppercase tracking-[.16em] text-white opacity-0 transition-[transform,opacity] duration-500 ease-out
            group-data-[state=label]/ring:scale-100 group-data-[state=label]/ring:opacity-100"
        >
          <span ref={label} />
        </div>
      </div>
    </div>
  );
}
