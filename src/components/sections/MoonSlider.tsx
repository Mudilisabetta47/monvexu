'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { processSteps } from '@/data/process';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

const CX = 200;
const CY = 205;
const R = 98;
const ORBIT = 158;

/** Pfad der beleuchteten Mondfläche. f = 0 Neumond … 1 Vollmond (zunehmend, Licht rechts). */
function litPath(f: number) {
  const rx = Math.abs(1 - 2 * f) * R;
  const sweep = f < 0.5 ? 0 : 1;
  return `M${CX} ${CY - R} A${R} ${R} 0 0 1 ${CX} ${CY + R} A${rx} ${R} 0 0 ${sweep} ${CX} ${CY - R} Z`;
}

/** Deterministische Sterne (kein Zufall, damit Server und Client identisch rendern). */
function stars(n: number) {
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: n }, () => ({ x: rnd() * 400, y: rnd() * 400, r: 0.5 + rnd() * 1.3, d: rnd() * 4, t: 2.4 + rnd() * 3 }));
}

const STOPS = processSteps.length;

export function MoonSlider() {
  const uid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const [v, setV] = useState(46);
  const [touched, setTouched] = useState(false);
  const disc = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const stage = Math.min(STOPS - 1, Math.round((v / 100) * (STOPS - 1)));
  const f = 0.07 + 0.93 * (v / 100);

  const fMv = useSpring(f, { stiffness: 110, damping: 20, mass: 0.7 });
  useEffect(() => {
    if (reduce) fMv.jump(f);
    else fMv.set(f);
  }, [f, fMv, reduce]);

  const d = useTransform(fMv, litPath);
  const glow = useTransform(fMv, (x) => 0.18 + x * 0.5);
  const star = useMemo(() => stars(46), []);

  // Zu Beginn kurz "atmen", damit klar ist, dass man den Mond bewegen kann.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => !touched && setV(62), 1700);
    return () => clearTimeout(t);
  }, [reduce, touched]);

  const fromPointer = (clientX: number) => {
    const r = disc.current?.getBoundingClientRect();
    if (!r) return;
    setTouched(true);
    setV(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  const step = processSteps[stage];
  const orbitDots = processSteps.map((_, i) => {
    const a = ((198 + i * 36) * Math.PI) / 180;
    return { x: CX + ORBIT * Math.cos(a), y: CY + ORBIT * Math.sin(a) };
  });

  return (
    <div className="relative mx-auto w-full max-w-[460px] select-none">
      {/* Nachthimmel */}
      <div
        ref={disc}
        className="relative aspect-square w-full cursor-grab touch-pan-y overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_38%,#1d1e25_0%,#0B0B0D_70%)] shadow-[0_50px_90px_-30px_rgba(11,11,13,.6),inset_0_0_0_1px_rgba(255,255,255,.08)] active:cursor-grabbing"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        data-cursor="Ziehen"
      >
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(circle,#000_30%,transparent_72%)]" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden role="presentation">
          <defs>
            <radialGradient id={`${uid}-g`} cx="38%" cy="32%" r="80%">
              <stop offset="0" stopColor="#FF8A5C" />
              <stop offset=".45" stopColor="#FF4A1C" />
              <stop offset="1" stopColor="#C8340C" />
            </radialGradient>
            <clipPath id={`${uid}-lit`}>
              <m.path d={d} />
            </clipPath>
            <filter id={`${uid}-blur`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
          </defs>

          {/* Sterne */}
          {star.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" className="mx-star" style={{ animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }} />
          ))}

          {/* Umlaufbahn mit fünf Stationen */}
          <circle cx={CX} cy={CY} r={ORBIT} fill="none" stroke="rgba(255,255,255,.16)" strokeDasharray="2 7" />
          <circle cx={CX} cy={CY} r={ORBIT + 34} fill="none" stroke="rgba(255,255,255,.07)" />

          {/* Glühen hinter dem Mond */}
          <m.circle cx={CX} cy={CY} r={R + 6} fill="#FF4A1C" filter={`url(#${uid}-blur)`} style={{ opacity: glow }} />

          {/* unbeleuchteter Teil (Erdschein) */}
          <circle cx={CX} cy={CY} r={R} fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.22)" strokeWidth="1" />

          {/* beleuchteter Teil mit Kratern */}
          <m.path d={d} fill={`url(#${uid}-g)`} />
          <g clipPath={`url(#${uid}-lit)`}>
            <circle cx="238" cy="160" r="22" fill="#C8340C" opacity=".38" />
            <circle cx="262" cy="214" r="13" fill="#C8340C" opacity=".32" />
            <circle cx="224" cy="248" r="26" fill="#C8340C" opacity=".3" />
            <circle cx="180" cy="178" r="9" fill="#C8340C" opacity=".3" />
            <circle cx="276" cy="168" r="8" fill="#C8340C" opacity=".3" />
            <circle cx="198" cy="226" r="7" fill="#C8340C" opacity=".28" />
            <circle cx="150" cy="212" r="14" fill="#C8340C" opacity=".26" />
          </g>

          {/* Stationen auf der Umlaufbahn */}
          {orbitDots.map((p, i) => {
            const on = i === stage;
            const passed = i < stage;
            return (
              <g key={i}>
                {on && <circle cx={p.x} cy={p.y} r="9" fill="#FF4A1C" opacity=".35" className="animate-pulse-ring" style={{ transformOrigin: `${p.x}px ${p.y}px` }} />}
                <circle cx={p.x} cy={p.y} r={on ? 5.5 : 3.6} fill={on || passed ? '#FF4A1C' : '#0B0B0D'} stroke={on || passed ? '#FF4A1C' : 'rgba(255,255,255,.45)'} strokeWidth="1.4" style={{ transition: 'all .5s cubic-bezier(.16,1,.3,1)' }} />
              </g>
            );
          })}
        </svg>

        {/* Hinweis */}
        <AnimatePresence>
          {!touched && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="pointer-events-none absolute inset-x-0 bottom-[11%] flex justify-center">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-[.64rem] uppercase tracking-[.2em] text-white/80 backdrop-blur">← Mond ziehen →</span>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Regler */}
      <div className="mt-6">
        <div className="relative">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(v)}
            onChange={(e) => {
              setTouched(true);
              setV(Number(e.target.value));
            }}
            aria-label="Mondphase: von der Idee bis zum Wachstum"
            aria-valuetext={`${step.word} – ${step.title}`}
            className="mx-range w-full"
            style={{ ['--p' as string]: `${v}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          {processSteps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setTouched(true);
                setV((i / (STOPS - 1)) * 100);
              }}
              className={cn('font-mono text-[.62rem] uppercase tracking-[.16em] transition-colors duration-500', i === stage ? 'text-ember-deep' : 'text-mute hover:text-ink')}
            >
              {s.word}
            </button>
          ))}
        </div>
        <div className="mt-4 min-h-[70px] border-t border-line pt-3.5">
          <AnimatePresence mode="wait">
            <m.div key={step.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}>
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-[.68rem] tracking-[.2em] text-ember-deep">0{stage + 1}</span>
                <span className="text-[1.5rem] font-semibold tracking-[-0.04em]">{step.title}</span>
              </p>
              <p className="mt-1 max-w-md text-[.92rem] leading-snug text-graphite">{step.text}</p>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
