'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { m } from 'framer-motion';
import { brands, brandTypeLabel, type BrandType } from '@/data/brands';
import { BrandCard } from './BrandCard';
import { Reveal } from '@/components/ui/Reveal';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Filter = 'all' | BrandType;

export function BrandGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const filters: { id: Filter; label: string; n: number }[] = [
    { id: 'all' as Filter, label: 'Alle', n: brands.length },
    ...(Object.keys(brandTypeLabel) as BrandType[]).map((t) => ({ id: t as Filter, label: `${brandTypeLabel[t]}n`, n: brands.filter((b) => b.type === t).length })),
  ].filter((f) => f.id === 'all' || f.n > 0);
  const list = brands.filter((b) => filter === 'all' || b.type === filter);

  return (
    <>
      <div role="tablist" aria-label="Marken filtern" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full border px-5 py-2.5 text-[.9rem] font-medium transition-colors duration-300',
              filter === f.id ? 'border-ink bg-ink text-white' : 'border-line bg-white text-graphite hover:border-ink/40 hover:text-ink',
            )}
          >
            {f.label} <span className="ml-1 font-mono text-[.7rem] opacity-60">{String(f.n).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((b, i) => (
            <m.div key={b.slug} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3, ease: EASE }} className="xl:[&:nth-child(3n+2)]:mt-12">
              <BrandCard brand={b} index={i} tall />
            </m.div>
          ))}
        </AnimatePresence>
        {filter === 'all' && (
          <Reveal className="xl:[&:nth-child(3n+2)]:mt-12">
            <div className="flex min-h-[440px] flex-col justify-between rounded-[28px] border border-dashed border-ink/25 bg-white/40 p-8 sm:min-h-[560px]">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-dashed border-ink/30 font-mono text-xl text-ink/40">+</span>
              <div>
                <p className="eyebrow">Nächste Marke</p>
                <h3 className="mt-3 text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] font-semibold leading-[.98] tracking-[-0.045em]">Das Portfolio wächst.</h3>
                <p className="mt-3 max-w-xs text-graphite">Weitere Marken werden hier ergänzt, sobald sie startklar sind.</p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </>
  );
}
