'use client';

import { useRef } from 'react';
import { useTransform, type MotionValue } from 'framer-motion';
import { m } from 'framer-motion';
import { brands } from '@/data/brands';
import { MonvexMark } from '@/components/ui/Logo';

const PLATES = [
  { label: 'VENTURES', kind: 'grid' },
  { label: 'PLATFORMS', kind: 'dots' },
  { label: 'PRODUCTS', kind: 'squares' },
  { label: 'MONVEX', kind: 'top' },
] as const;

function Plate({ i, progress, label, kind }: { i: number; progress: MotionValue<number>; label: string; kind: (typeof PLATES)[number]['kind'] }) {
  // Beim Scrollen "atmet" der Stapel auseinander.
  const z = useTransform(progress, [0, 1], [i * 44, i * 44 + i * 120]);
  const isTop = kind === 'top';
  return (
    <m.div
      style={{ z }}
      className={`absolute inset-0 overflow-hidden rounded-[30px] ${
        isTop ? 'bg-ink shadow-[0_40px_80px_-20px_rgba(11,11,13,.55)]' : 'border border-white/80 bg-white/55 shadow-[0_20px_50px_-20px_rgba(11,11,13,.25)] backdrop-blur-[2px]'
      }`}
    >
      {kind === 'grid' && <div className="grid-bg absolute inset-0 opacity-90" style={{ backgroundSize: '38px 38px' }} />}
      {kind === 'dots' && <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'radial-gradient(rgba(11,11,13,.28) 1.4px, transparent 1.5px)', backgroundSize: '26px 26px' }} />}
      {kind === 'squares' &&
        [36, 78, 120].map((p) => <div key={p} className="absolute rounded-[20px] border border-ink/15" style={{ inset: p }} />)}
      {isTop && (
        <>
          <div className="grid-bg-dark absolute inset-0 opacity-70" style={{ backgroundSize: '38px 38px' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,28,.28),transparent_55%)]" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <span className="absolute inset-0 animate-pulse-ring rounded-[26px] bg-ember/40" />
              <MonvexMark className="relative h-20 w-20" invert />
            </div>
          </div>
        </>
      )}
      <span className={`absolute bottom-4 left-5 font-mono text-[10px] tracking-[.24em] ${isTop ? 'text-white/60' : 'text-ink/45'}`}>{label}</span>
      <span className={`absolute right-5 top-4 font-mono text-[10px] tracking-[.24em] ${isTop ? 'text-white/40' : 'text-ink/30'}`}>0{i + 1}</span>
    </m.div>
  );
}

const CHIPS = [
  { left: '0%', top: '14%', depth: 22, delay: '0s', line: [22, 24] },
  { left: '66%', top: '42%', depth: -16, delay: '-2.4s', line: [78, 50] },
  { left: '4%', top: '72%', depth: 30, delay: '-4.6s', line: [26, 76] },
] as const;

/** 3D-Ebenenstapel: die Dachmarke traegt Marken, Plattformen und Produkte. */
export function HeroScene({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative h-[380px] w-full sm:h-[500px] lg:h-[700px]"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        ref.current.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--px', '0');
        ref.current?.style.setProperty('--py', '0');
      }}
    >
      {/* Verbindungslinien zu den Marken-Modulen */}
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block">
        {CHIPS.map((c, i) => (
          <line key={i} x1={c.line[0]} y1={c.line[1]} x2="50" y2="50" stroke="#0B0B0D" strokeOpacity=".28" strokeWidth="1" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" className="animate-flow" />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 scale-[.5] sm:scale-[.72] lg:scale-100" style={{ perspective: 1500 }}>
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="preserve-3d relative h-[300px] w-[300px] transition-transform duration-[900ms] ease-out"
            style={{ transform: 'rotateX(calc(58deg - var(--py,0) * 5deg)) rotateZ(calc(-38deg + var(--px,0) * 7deg))' }}
          >
            <div className="absolute inset-[-40px] rounded-full bg-ink/25 blur-3xl" style={{ transform: 'translateZ(-30px)' }} />
            {PLATES.map((p, i) => (
              <Plate key={p.label} i={i} progress={progress} label={p.label} kind={p.kind} />
            ))}
          </div>
        </div>
      </div>

      {/* Marken-Module (schweben ueber der Szene) */}
      {CHIPS.map((c, i) => {
        const b = brands[i];
        if (!b) return null;
        return (
          <div
            key={b.slug}
            className="absolute z-10 hidden sm:block"
            style={{
              left: c.left,
              top: c.top,
              transform: `translate3d(calc(var(--px,0) * ${c.depth}px), calc(var(--py,0) * ${c.depth}px), 0)`,
              transition: 'transform .7s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div className="glass animate-float flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card" style={{ animationDelay: c.delay }}>
              <span className="relative grid h-9 w-9 place-items-center rounded-xl text-[.7rem] font-semibold" style={{ background: b.theme.bg, color: b.theme.accent }}>
                {b.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </span>
              <span className="leading-tight">
                <span className="block text-[.9rem] font-semibold tracking-tight">{b.name}</span>
                <span className="block font-mono text-[.62rem] uppercase tracking-[.14em] text-graphite">{b.tags[0]}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
