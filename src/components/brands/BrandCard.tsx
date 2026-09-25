'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { m } from 'framer-motion';
import type { Brand } from '@/data/brands';
import { brandStatusLabel, brandTypeLabel } from '@/data/brands';
import { BrandArt } from './BrandArt';
import { BrandLogo } from './BrandLogo';
import { Tilt } from '@/components/ui/Tilt';
import { EASE } from '@/lib/motion';

/**
 * Grosse Markenkarte mit eigener Farbwelt. Beim Hover: 3D-Neigung, Visual parallax,
 * Text schiebt herein, Cursor wird zum "Ansehen"-Label.
 */
export function BrandCard({ brand, index = 0, tall = false, headingLevel = 'h3' }: { brand: Brand; index?: number; tall?: boolean; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  const t = brand.theme;
  return (
    <m.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, delay: (index % 3) * 0.1, ease: EASE }}
      className="perspective-1200"
    >
      <Tilt className="rounded-[28px]" max={5}>
        <Link
          href={`/brands/${brand.slug}`}
          data-cursor="Ansehen"
          className="group relative flex flex-col overflow-hidden rounded-[28px] shadow-card ring-1 ring-black/5 transition-shadow duration-700 ease-out hover:shadow-lift"
          style={{ background: t.bg, color: t.fg, minHeight: tall ? 560 : 440 }}
          aria-label={`${brand.name} – ${brand.category}`}
        >
          <BrandArt brand={brand} className="absolute inset-0 h-full w-full scale-105 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.12]" />
          <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, ${t.bg}f2 0%, ${t.bg}99 32%, transparent 62%)` }} />

          <div className="relative z-10 flex items-start justify-between p-6 sm:p-8">
            <BrandLogo brand={brand} />
            <span
              className="rounded-full border px-3 py-1.5 font-mono text-[.66rem] uppercase tracking-[.16em] backdrop-blur"
              style={{ borderColor: `${t.fg}33`, color: t.muted, background: `${t.bg}66` }}
            >
              {brandTypeLabel[brand.type]}
            </span>
          </div>

          <div className="relative z-10 mt-auto p-6 sm:p-8">
            <p className="font-mono text-[.72rem] uppercase tracking-[.18em]" style={{ color: t.accent }}>
              {brand.category}
            </p>
            <Heading className="mt-3 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] font-semibold leading-[.95] tracking-[-0.045em]">{brand.name}</Heading>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-out group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="mt-4 max-w-md translate-y-3 text-[.98rem] leading-relaxed opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100" style={{ color: t.muted }}>
                  {brand.description}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="flex items-center gap-2 font-mono text-[.7rem] uppercase tracking-[.16em]" style={{ color: t.muted }}>
                <span className="relative flex h-2 w-2">
                  {brand.status === 'live' && <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: t.accent }} />}
                  <span className="relative h-2 w-2 rounded-full" style={{ background: t.accent }} />
                </span>
                {brandStatusLabel[brand.status]}
              </span>
              <span
                className="grid h-12 w-12 place-items-center rounded-full transition-transform duration-500 ease-out group-hover:rotate-45"
                style={{ background: t.accent, color: t.bg }}
              >
                <ArrowUpRight size={20} strokeWidth={1.8} />
              </span>
            </div>
          </div>
        </Link>
      </Tilt>
    </m.div>
  );
}
