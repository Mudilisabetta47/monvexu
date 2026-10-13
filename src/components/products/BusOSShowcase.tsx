'use client';

import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SplitText } from '@/components/ui/SplitText';
import { Reveal } from '@/components/ui/Reveal';
import { BrowserFrame, BusWordmark } from './Frames';
import { StatusChip } from './Chips';
import Image from 'next/image';
import { Tilt } from '@/components/ui/Tilt';
import { productBySlug } from '@/data/products';

const p = productBySlug('busos');

/** Grosser BusOS-Showcase: Petrol · Mint · Navy, echte Demo-Screenshots, leichte Scroll-Tiefe. */
export function BusOSShowcase({ id = 'busos' }: { id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yMain = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const yOps = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -70]);
  const yDoc = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -110]);
  const rot = useTransform(scrollYProgress, [0, 1], reduce ? [4, 4] : [8, 2]);

  return (
    <article id={id} ref={ref} aria-labelledby={`${id}-h`} className="relative overflow-hidden rounded-[32px] border p-6 sm:rounded-[44px] sm:p-10 lg:p-14" style={{ borderColor: p.theme.line, background: 'linear-gradient(135deg,#E6F6F2 0%,#F6FBFA 42%,#DCF1EC 100%)' }}>
      <span aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full opacity-60 blur-[90px]" style={{ background: '#86EFCF55' }} />
      <span aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-[460px] w-[460px] rounded-full opacity-50 blur-[110px]" style={{ background: '#0B254022' }} />
      <div className="relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <BusWordmark />
            <div className="mt-5"><StatusChip product={p} /></div>
          </Reveal>
          <SplitText as="h3" text={'Das Betriebssystem für\nmoderne *Busunternehmen.*'} className="mt-6 text-[clamp(1.9rem,1.1rem+2.3vw,3.1rem)] font-semibold leading-[.98] tracking-[-0.045em]" accentClassName="serif-i text-[#096A63]" />
          <Reveal delay={0.1}>
            <p id={`${id}-h`} className="mt-6 max-w-lg text-lead" style={{ color: '#3C5568' }}>{p.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.chips.map((c) => (
                <li key={c} className="rounded-full border bg-white/75 px-3.5 py-1.5 text-[.82rem] font-medium" style={{ borderColor: p.theme.line, color: p.theme.ink }}>{c}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={p.cta.primary.href}>{p.cta.primary.label}</Button>
              <Button href={p.cta.secondary.href} variant="secondary">{p.cta.secondary.label}</Button>
            </div>
            <p className="mt-5 max-w-md text-[.8rem] leading-snug text-[#5A7080]">Noch nicht öffentlich verfügbar. Die Abbildungen zeigen einen Demo-Betrieb mit fiktiven Daten.</p>
          </Reveal>
        </div>

        {/* Bildkomposition */}
        <div className="relative lg:col-span-7">
          <Tilt max={3.5} glare={false} className="relative mx-auto max-w-[760px] pb-6 sm:pb-16 lg:pb-14">
            {['OPS Center', 'Angebot als PDF', 'Fahrer-App'].map((c, i) => (
              <span key={c} aria-hidden className={`absolute z-30 hidden animate-float rounded-full border bg-white/90 px-3.5 py-2 text-[.78rem] font-semibold shadow-card backdrop-blur lg:block ${['-top-8 right-[8%]', 'bottom-0 left-[44%]', '-top-8 left-[34%]'][i]}`} style={{ borderColor: p.theme.line, color: p.theme.accent, animationDelay: `${-i * 2.1}s`, transform: `translateZ(60px)` }}>
                {c}
              </span>
            ))}
            <m.div style={{ y: yMain }} className="relative z-10">
              <BrowserFrame label="MONVEX BusOS · Demo-Betrieb" img={{ src: '/products/busos/desktop.webp', alt: 'MONVEX BusOS Desktop mit Modulen und OPS-Live-Übersicht im Demo-Betrieb', width: 1440, height: 900, priority: false }} />
            </m.div>
            <m.div style={{ y: yOps }} className="absolute -bottom-2 -left-2 z-20 hidden w-[56%] sm:block lg:-left-6">
              <BrowserFrame label="OPS Center" img={{ src: '/products/busos/ops-center.webp', alt: 'OPS Center von MONVEX BusOS: Fahrten, Konflikte und Zuweisung', width: 1440, height: 900, sizes: '30vw' }} />
            </m.div>
            <m.div style={{ y: yDoc, rotate: rot }} className="absolute -bottom-6 -right-2 z-20 hidden w-[24%] sm:block lg:-right-3">
              <figure className="overflow-hidden rounded-[10px] border border-black/10 bg-white shadow-[0_40px_70px_-20px_rgba(11,37,64,.5)]">
                <Image src="/products/busos/angebot.webp" alt="Beispielangebot als PDF mit fiktiven Daten" width={900} height={1271} sizes="18vw" className="block h-auto w-full" />
              </figure>
            </m.div>
          </Tilt>
        </div>
      </div>
    </article>
  );
}
