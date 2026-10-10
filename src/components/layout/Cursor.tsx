'use client';

import { useEffect, useRef } from 'react';

const TRAIL = 7;

/**
 * Eigener Cursor (nur Maus), auf hellem UND dunklem Grund sichtbar:
 *  - Kern: Ember-Punkt (immer sichtbar), schrumpft beim Klick
 *  - Ring: invertiert sich per mix-blend-mode zum Hintergrund (eigene Blend-Ebene!), dehnt sich in Bewegungsrichtung
 *  - Schweif: kleine Ember-Punkte, die der Maus mit Verzögerung folgen und ausblenden
 *  - data-cursor="Text": Ring wird zur Ember-Blase mit Label ("Ansehen" …)
 *  - Links/Buttons: Ring wächst und füllt sich leicht
 * Direkte DOM-Updates in rAF, kein React-Rerender pro Mausbewegung.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const blend = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const trail = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine) return;
    const html = document.documentElement;
    html.classList.add('has-cursor');

    let x = -100, y = -100, rx = -100, ry = -100, vx = 0, vy = 0;
    const pts = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }));
    let raf = 0;
    let visible = false;

    const setState = (state: string, text = '') => {
      if (root.current) root.current.dataset.state = state;
      if (blend.current) blend.current.dataset.state = state;
      if (label.current) label.current.textContent = text;
    };
    const show = (on: boolean) => {
      visible = on;
      if (root.current) root.current.style.opacity = on ? '1' : '0';
      if (blend.current) blend.current.style.opacity = on ? '1' : '0';
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        rx = x; ry = y;
        pts.forEach((p) => { p.x = x; p.y = y; });
        show(true);
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
    const down = () => {
      if (root.current) root.current.dataset.press = '1';
      if (blend.current) blend.current.dataset.press = '1';
    };
    const up = () => {
      if (root.current) delete root.current.dataset.press;
      if (blend.current) delete blend.current.dataset.press;
    };

    const loop = () => {
      const px = rx, py = ry;
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      vx += ((rx - px) - vx) * 0.25;
      vy += ((ry - py) - vy) * 0.25;
      const speed = Math.hypot(vx, vy);
      const stretch = reduced ? 0 : Math.min(speed / 38, 0.55);
      const angle = Math.atan2(vy, vx);

      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      const rt = `translate3d(${rx}px,${ry}px,0) rotate(${angle}rad) scale(${1 + stretch},${1 - stretch * 0.4})`;
      if (ring.current) ring.current.style.transform = rt;
      if (bubble.current) bubble.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;

      if (!reduced) {
        let tx = x, ty = y;
        for (let i = 0; i < TRAIL; i++) {
          const p = pts[i];
          p.x += (tx - p.x) * 0.34;
          p.y += (ty - p.y) * 0.34;
          tx = p.x; ty = p.y;
          const el = trail.current[i];
          if (el) el.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    const leave = () => show(false);
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
    <>
      {/* Ebene 1: invertierender Ring. mix-blend-mode sitzt auf dem Container selbst, damit er gegen die Seite blendet. */}
      <div ref={blend} data-state="idle" aria-hidden className="mx-blend">
        <div ref={ring} className="mx-ring">
          <div className="mx-ring-in" />
        </div>
      </div>
      {/* Ebene 2: farbige Elemente (Schweif, Kern, Label-Blase) ohne Blend. */}
      <div ref={root} data-state="idle" aria-hidden className="mx-cursor">
        {Array.from({ length: TRAIL }).map((_, i) => (
          <span
            key={i}
            ref={(el) => { trail.current[i] = el; }}
            className="mx-trail"
            style={{ ['--i' as string]: i }}
          />
        ))}
        <div ref={dot} className="mx-dot-wrap">
          <div className="mx-dot" />
        </div>
        <div ref={bubble} className="mx-bubble-wrap">
          <div className="mx-bubble">
            <span ref={label} />
          </div>
        </div>
      </div>
    </>
  );
}
