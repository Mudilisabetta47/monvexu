'use client';

import { useId, useMemo } from 'react';
import { m, useSpring, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { useEffect } from 'react';

const C = 500;
const R = 290;

/** Pfad der beleuchteten Fläche. f = 0 Neumond … 1 Vollmond (zunehmend, Licht rechts). */
function litPath(f: number) {
  const rx = Math.abs(1 - 2 * f) * R;
  const sweep = f < 0.5 ? 0 : 1;
  return `M${C} ${C - R} A${R} ${R} 0 0 1 ${C} ${C + R} A${rx} ${R} 0 0 ${sweep} ${C} ${C - R} Z`;
}

// Krater (relativ zum Mond, in 1000er-Koordinaten)
const CRATERS: [number, number, number, number][] = [
  [624, 366, 66, 0.36], [706, 506, 38, 0.3], [588, 612, 78, 0.28], [468, 392, 28, 0.3],
  [736, 380, 24, 0.3], [512, 568, 21, 0.26], [358, 520, 42, 0.24], [640, 700, 30, 0.26], [430, 650, 20, 0.22],
];

type Props = { phase: number; stage: number; stages: number; scale?: MotionValue<number>; y?: MotionValue<number> };

/** Grosser Mond: Phase per Feder, Umlaufbahn mit Stationen, Glühen. Füllt seinen Container (quadratisch). */
export function HeroMoon({ phase, stage, stages, scale, y }: Props) {
  const uid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const fMv = useSpring(phase, { stiffness: 70, damping: 18, mass: 0.9 });
  useEffect(() => {
    if (reduce) fMv.jump(phase);
    else fMv.set(phase);
  }, [phase, fMv, reduce]);
  const d = useTransform(fMv, litPath);
  const glow = useTransform(fMv, (x) => 0.22 + x * 0.55);

  const dots = useMemo(
    () =>
      Array.from({ length: stages }, (_, i) => {
        const a = ((222 - i * (84 / Math.max(1, stages - 1))) * Math.PI) / 180;
        return { x: C + 345 * Math.cos(a), y: C + 345 * Math.sin(a) };
      }),
    [stages],
  );

  return (
    <m.div style={{ scale, y }} className="relative aspect-square w-full">
      {/* Glühen */}
      <m.div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,74,28,.55)_0%,rgba(255,74,28,.18)_42%,transparent_68%)]" style={{ opacity: glow }} />
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full" aria-hidden role="presentation">
        <defs>
          <radialGradient id={`${uid}-g`} cx="36%" cy="30%" r="82%">
            <stop offset="0" stopColor="#FF9A70" />
            <stop offset=".42" stopColor="#FF4A1C" />
            <stop offset="1" stopColor="#B82E08" />
          </radialGradient>
          <clipPath id={`${uid}-lit`}>
            <m.path d={d} />
          </clipPath>
        </defs>

        {/* Umlaufbahnen */}
        <g className="origin-center animate-spin-slow" style={{ transformOrigin: '500px 500px', animationDuration: '120s' }}>
          <circle cx={C} cy={C} r={345} fill="none" stroke="rgba(255,255,255,.18)" strokeDasharray="3 12" />
        </g>
        <circle cx={C} cy={C} r={492} fill="none" stroke="rgba(255,255,255,.06)" />
        <circle cx={C} cy={C} r={438} fill="none" stroke="rgba(255,255,255,.07)" />

        {/* Unbeleuchteter Teil (Erdschein) */}
        <circle cx={C} cy={C} r={R} fill="rgba(255,255,255,.045)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" />

        {/* Beleuchteter Teil mit Kratern */}
        <m.path d={d} fill={`url(#${uid}-g)`} />
        <g clipPath={`url(#${uid}-lit)`}>
          {CRATERS.map(([x, yy, r, o], i) => (
            <g key={i}>
              <circle cx={x} cy={yy} r={r} fill="#A92A07" opacity={o} />
              <circle cx={x - r * 0.12} cy={yy - r * 0.12} r={r * 0.86} fill="none" stroke="#FFB08F" strokeOpacity={0.22} strokeWidth={Math.max(1.5, r * 0.06)} />
            </g>
          ))}
        </g>

        {/* Stationen */}
        {dots.map((p, i) => {
          const on = i === stage;
          const passed = i < stage;
          return (
            <g key={i}>
              {on && <circle cx={p.x} cy={p.y} r="22" fill="#FF4A1C" opacity=".35" className="animate-pulse-ring" style={{ transformOrigin: `${p.x}px ${p.y}px` }} />}
              <circle
                cx={p.x}
                cy={p.y}
                r={on ? 12 : 8}
                fill={on || passed ? '#FF4A1C' : '#0B0B0D'}
                stroke={on || passed ? '#FF4A1C' : 'rgba(255,255,255,.5)'}
                strokeWidth="2.4"
                style={{ transition: 'all .6s cubic-bezier(.16,1,.3,1)' }}
              />
            </g>
          );
        })}
      </svg>
    </m.div>
  );
}
