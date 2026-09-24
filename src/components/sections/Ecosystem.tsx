'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { brands, brandTypeLabel } from '@/data/brands';
import type { Brand } from '@/data/brands';
import { MonvexMark } from '@/components/ui/Logo';
import { BrandLogo } from '@/components/brands/BrandLogo';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Node = { key: string; brand?: Brand; x: number; y: number };

/** Positioniert n Knoten gleichmaessig auf einer Ellipse um das Zentrum (in %). */
function layout(n: number): Node[] {
  return Array.from({ length: n }).map((_, i) => {
    const a = ((-90 + 180 / n + (i * 360) / n) * Math.PI) / 180;
    return { key: `n${i}`, x: 50 + Math.cos(a) * 37, y: 50 + Math.sin(a) * 34 };
  });
}

const PILLARS = [
  { n: '01', t: 'Entwickeln', d: 'Marken, Produkte und Geschäftsmodelle entstehen bei MONVEX – von der ersten Idee an.' },
  { n: '02', t: 'Betreiben', d: 'Was startet, wird geführt: mit klaren Prozessen, digitaler Infrastruktur und Verantwortung.' },
  { n: '03', t: 'Führen', d: 'Ein Verbund, der Wissen teilt – und jeder Marke ihre eigene Identität lässt.' },
];

export function Ecosystem() {
  const [active, setActive] = useState<string | null>(null);
  const ghosts = 1;
  const nodes = layout(brands.length + ghosts).map((n, i) => ({ ...n, brand: brands[i] }));

  return (
    <section id="dachmarke" className="relative py-28 sm:py-40">
      <div className="shell">
        <SectionHead index="01" label="Dachmarke" title={'ONE COMPANY.\nMULTIPLE *BRANDS.*'}>
          MONVEX entwickelt, betreibt und führt Marken, Produkte und Geschäftsmodelle aus unterschiedlichen Bereichen.
        </SectionHead>

        {/* Desktop: Oekosystem-Canvas */}
        <Reveal className="mt-16 hidden md:block">
          <div className="relative aspect-[16/9] max-h-[760px] w-full overflow-hidden rounded-[40px] border border-line bg-white/60 shadow-card">
            <div className="grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_78%)]" />

            <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {nodes.map((n, i) => {
                const on = active === n.brand?.slug;
                const cx = (50 + n.x) / 2 + (n.y - 50) * 0.12;
                const cy = (50 + n.y) / 2 - (n.x - 50) * 0.12;
                const d = `M50 50 Q${cx} ${cy} ${n.x} ${n.y}`;
                return (
                  <g key={n.key}>
                    <m.path
                      d={d}
                      fill="none"
                      stroke={on && n.brand ? n.brand.theme.accent : '#0B0B0D'}
                      strokeOpacity={on ? 1 : 0.24}
                      strokeWidth={on ? 2 : 1}
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: EASE, delay: 0.3 + i * 0.15 }}
                      style={{ transition: 'stroke .5s, stroke-opacity .5s' }}
                    />
                    {n.brand && (
                      <path d={d} fill="none" stroke={n.brand.theme.accent} strokeWidth="1.5" strokeDasharray="2 22" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="animate-flow" strokeOpacity={on ? 1 : 0.55} />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Zentrum */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative grid h-[190px] w-[190px] place-items-center">
                <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-ink/25" />
                <span className="absolute inset-[-34px] animate-spin-slow rounded-full border border-ink/10 [animation-direction:reverse] [animation-duration:70s]" />
                <span className="absolute inset-6 animate-pulse-ring rounded-full bg-ember/15" />
                <div className="relative grid h-[124px] w-[124px] place-items-center rounded-full bg-ink shadow-lift">
                  <MonvexMark className="h-[52px] w-[52px]" invert />
                </div>
                <span className="absolute -bottom-9 whitespace-nowrap font-mono text-[.66rem] uppercase tracking-[.22em] text-graphite">MONVEX · Dachmarke</span>
              </div>
            </div>

            {/* Marken-Knoten */}
            {nodes.map((n, i) =>
              n.brand ? (
                <BrandNode key={n.key} brand={n.brand} x={n.x} y={n.y} i={i} active={active === n.brand.slug} onActive={setActive} dim={active !== null && active !== n.brand.slug} />
              ) : (
                <div key={n.key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <m.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE, delay: 0.6 + i * 0.12 }}
                  className={cn('transition-opacity duration-500', active && '!opacity-40')}
                >
                  <div className="flex w-[190px] items-center gap-3 rounded-2xl border border-dashed border-ink/25 bg-white/40 px-4 py-3.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-dashed border-ink/25 font-mono text-lg text-ink/40">+</span>
                    <span className="leading-tight">
                      <span className="block text-[.9rem] font-medium text-graphite">Weitere Marke</span>
                      <span className="block font-mono text-[.6rem] uppercase tracking-[.16em] text-mute">Folgt</span>
                    </span>
                  </div>
                </m.div>
                </div>
              ),
            )}
          </div>
        </Reveal>

        {/* Mobil: vertikale Struktur */}
        <div className="relative mt-14 md:hidden">
          <div className="relative flex items-center gap-4 rounded-3xl bg-ink p-5 text-white shadow-lift">
            <MonvexMark className="h-12 w-12" invert />
            <div>
              <p className="text-lg font-semibold tracking-tight">MONVEX</p>
              <p className="font-mono text-[.64rem] uppercase tracking-[.2em] text-white/50">Dachmarke</p>
            </div>
          </div>
          <div className="ml-8 space-y-4 border-l border-dashed border-ink/25 pb-2 pl-6 pt-6">
            {brands.map((b) => (
              <Reveal key={b.slug}>
                <Link
                  href={`/brands/${b.slug}`}
                  className="relative block rounded-3xl p-5 shadow-card"
                  style={{ background: b.theme.bg, color: b.theme.fg }}
                >
                  <span className="absolute -left-6 top-1/2 h-px w-6 border-t border-dashed border-ink/25" />
                  <BrandLogo brand={b} />
                  <p className="mt-4 font-mono text-[.66rem] uppercase tracking-[.16em]" style={{ color: b.theme.accent }}>{b.category}</p>
                  <p className="mt-2 text-[.95rem] leading-relaxed" style={{ color: b.theme.muted }}>{b.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Entwickeln · Betreiben · Fuehren */}
        <Reveal className="mt-20 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.n} className="bg-paper p-8 sm:p-10">
              <p className="font-mono text-[.7rem] tracking-[.2em] text-ember-deep">{p.n}</p>
              <h3 className="mt-10 text-h3 font-semibold">{p.t}</h3>
              <p className="mt-3 text-graphite">{p.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function BrandNode({ brand, x, y, i, active, dim, onActive }: { brand: Brand; x: number; y: number; i: number; active: boolean; dim: boolean; onActive: (s: string | null) => void }) {
  const t = brand.theme;
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%`, zIndex: active ? 30 : 10 }}>
    <m.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE, delay: 0.5 + i * 0.12 }}
    >
      <Link
        href={`/brands/${brand.slug}`}
        data-cursor="Ansehen"
        onMouseEnter={() => onActive(brand.slug)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(brand.slug)}
        onBlur={() => onActive(null)}
        className={cn(
          'block w-[230px] origin-center rounded-[22px] border p-4 shadow-card transition-all duration-500 ease-out',
          active ? 'scale-[1.1] shadow-lift' : 'border-line bg-white',
          dim && 'opacity-45',
        )}
        style={active ? { background: t.bg, color: t.fg, borderColor: t.accent } : undefined}
      >
        <div className="flex items-center justify-between gap-2">
          <BrandLogo brand={brand} color={active ? t.fg : '#0B0B0D'} className="[&>span:first-child]:!h-8 [&>span:first-child]:!w-8" />
        </div>
        <p className="mt-3 font-mono text-[.6rem] uppercase tracking-[.16em]" style={{ color: active ? t.accent : '#55575D' }}>
          {brand.category}
        </p>
        <div className={cn('grid transition-[grid-template-rows] duration-500 ease-out', active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
          <div className="overflow-hidden">
            <p className="pt-3 text-[.82rem] leading-relaxed" style={{ color: t.muted }}>
              {brand.description}
            </p>
            <p className="mt-3 font-mono text-[.58rem] uppercase tracking-[.18em]" style={{ color: t.accent }}>
              {brandTypeLabel[brand.type]} →
            </p>
          </div>
        </div>
      </Link>
    </m.div>
    </div>
  );
}
