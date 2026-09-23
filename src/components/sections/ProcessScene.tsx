'use client';

import { m } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { MonvexMark } from '@/components/ui/Logo';
import { EASE } from '@/lib/motion';

const t = (delay: number, d = 0.9) => ({ duration: d, ease: EASE, delay });

function Idea() {
  return (
    <g>
      {[150, 110, 70].map((r, i) => (
        <m.circle key={r} cx="300" cy="170" r={r} fill="none" stroke="#0B0B0D" strokeOpacity={0.12 + i * 0.06} strokeDasharray="3 7"
          initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={t(i * 0.12)} style={{ transformOrigin: '300px 170px' }} />
      ))}
      {[[110, 90], [480, 110], [140, 250], [470, 240], [300, 30]].map(([x, y], i) => (
        <m.g key={i} initial={{ x: 0, y: 0, opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.2 + i * 0.1)}>
          <line x1={x} y1={y} x2="300" y2="170" stroke="#0B0B0D" strokeOpacity=".2" strokeDasharray="2 6" />
          <circle cx={x} cy={y} r="5" fill="#0B0B0D" fillOpacity=".5" />
        </m.g>
      ))}
      <circle cx="300" cy="170" r="30" fill="#FF4A1C" opacity=".18" className="animate-pulse-ring" style={{ transformOrigin: '300px 170px' }} />
      <circle cx="300" cy="170" r="14" fill="#FF4A1C" />
    </g>
  );
}

function Build() {
  const cells = Array.from({ length: 5 * 3 });
  return (
    <g>
      {cells.map((_, i) => {
        const c = i % 5, r = Math.floor(i / 5);
        const hot = i === 7 || i === 2 || i === 11;
        return (
          <m.rect key={i} x={120 + c * 76} y={90 + r * 76} width="64" height="64" rx="12"
            fill={hot ? '#FF4A1C' : '#0B0B0D'} fillOpacity={hot ? 1 : 0.06 + ((i * 7) % 5) * 0.05}
            stroke="#0B0B0D" strokeOpacity=".14"
            initial={{ opacity: 0, y: -24, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={t(i * 0.05)}
            style={{ transformOrigin: `${152 + c * 76}px ${122 + r * 76}px` }} />
        );
      })}
    </g>
  );
}

function Brand() {
  return (
    <foreignObject x="0" y="0" width="600" height="340">
      <div className="flex h-full items-center justify-center gap-8">
        <m.div initial={{ scale: 0.6, rotate: -12, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={t(0)}>
          <MonvexMark className="h-40 w-40 drop-shadow-2xl" />
        </m.div>
        <div className="space-y-3">
          <m.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={t(0.2)} className="text-6xl font-semibold tracking-[-0.06em]">Aa<span className="serif-i text-ember">Bb</span></m.p>
          <div className="flex gap-2">
            {['#0B0B0D', '#FF4A1C', '#ECEBE6', '#55575D'].map((c, i) => (
              <m.span key={c} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={t(0.35 + i * 0.08, 0.6)} className="h-9 w-9 rounded-full border border-ink/10" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </foreignObject>
  );
}

function Launch() {
  const d = 'M70 270 C160 260 200 200 270 170 S420 90 530 50';
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="60" y1={80 + i * 60} x2="550" y2={80 + i * 60} stroke="#0B0B0D" strokeOpacity=".07" />
      ))}
      <m.path d={d} fill="none" stroke="#0B0B0D" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={t(0, 1.6)} />
      <m.path d={d} fill="none" stroke="#FF4A1C" strokeWidth="2.5" strokeDasharray="2 14" strokeLinecap="round" className="animate-flow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(1.2)} />
      <m.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={t(1.4)} style={{ transformOrigin: '530px 50px' }}>
        <circle cx="530" cy="50" r="22" fill="#FF4A1C" opacity=".2" className="animate-pulse-ring" style={{ transformOrigin: '530px 50px' }} />
        <circle cx="530" cy="50" r="9" fill="#FF4A1C" />
      </m.g>
      <circle cx="70" cy="270" r="6" fill="#0B0B0D" />
    </g>
  );
}

function Scale() {
  const bars = [40, 62, 84, 118, 156, 210];
  return (
    <g>
      {bars.map((h, i) => (
        <m.rect key={i} x={90 + i * 76} y={290 - h} width="48" height={h} rx="10" fill={i === bars.length - 1 ? '#FF4A1C' : '#0B0B0D'} fillOpacity={i === bars.length - 1 ? 1 : 0.08 + i * 0.04}
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={t(i * 0.09)} style={{ transformOrigin: `${114 + i * 76}px 290px` }} />
      ))}
      <m.polyline points={bars.map((h, i) => `${114 + i * 76},${290 - h - 22}`).join(' ')} fill="none" stroke="#0B0B0D" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={t(0.4, 1.4)} />
      {bars.map((h, i) => (
        <circle key={i} cx={114 + i * 76} cy={290 - h - 22} r="4.5" fill="#F6F5F1" stroke="#0B0B0D" strokeWidth="2" />
      ))}
    </g>
  );
}

const SCENES = [Idea, Build, Brand, Launch, Scale];

export function ProcessScene({ step }: { step: number }) {
  const Scene = SCENES[step];
  return (
    <svg viewBox="0 0 600 340" className="h-full w-full" aria-hidden role="presentation">
      <AnimatePresence mode="wait">
        <m.g key={step} initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.35 }}>
          <Scene />
        </m.g>
      </AnimatePresence>
    </svg>
  );
}
