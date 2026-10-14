'use client';

import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Tilt } from '@/components/ui/Tilt';
import { SplitText } from '@/components/ui/SplitText';
import { Reveal } from '@/components/ui/Reveal';
import { BrowserFrame, EasyWordmark, PhoneFrame } from './Frames';
import { StatusChip } from './Chips';
import { productBySlug } from '@/data/products';

const p = productBySlug('easykfz24');

/** EasyKFZ24-Showcase mit eigener Markenwelt: Electric Blue · Navy · Cyan, Live-Aufnahmen von easykfz24.de. */
export function EasyShowcase({ id = 'easykfz24' }: { id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yDesk = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -30]);
  const yPhone = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [110, -60]);

  return (
    <article id={id} ref={ref} aria-labelledby={`${id}-h`} className="relative overflow-hidden rounded-[32px] border p-6 sm:rounded-[44px] sm:p-10 lg:p-14" style={{ borderColor: p.theme.line, background: 'linear-gradient(160deg,#EEF3FF 0%,#F8FAFD 48%,#DFE8FF 100%)' }}>
      <span aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-[460px] w-[460px] rounded-full opacity-60 blur-[100px]" style={{ background: '#2A55FF33' }} />
      <span aria-hidden className="pointer-events-none absolute -bottom-32 left-10 h-[360px] w-[360px] rounded-full opacity-50 blur-[100px]" style={{ background: '#3FD8F244' }} />
      <div className="relative grid items-center gap-12 lg:grid-cols-12">
        {/* Bild links, Text rechts: Gegenbewegung zu BusOS */}
        <div className="relative order-2 lg:order-1 lg:col-span-7">
          <Tilt max={3.5} glare={false} className="relative mx-auto max-w-[760px] pb-4 sm:pb-8">
            {['Neuzulassung', 'Ummeldung', 'Abmeldung'].map((c, i) => (
              <span key={c} aria-hidden className={`absolute z-30 hidden animate-float rounded-full border bg-white/90 px-3.5 py-2 text-[.78rem] font-semibold shadow-card backdrop-blur lg:block ${['-top-8 left-[8%]', 'bottom-2 left-[8%]', '-top-8 left-[34%]'][i]}`} style={{ borderColor: p.theme.line, color: p.theme.accent, animationDelay: `${-i * 2.1}s`, transform: `translateZ(60px)` }}>
                {c}
              </span>
            ))}
            <m.div style={{ y: yDesk }} className="relative z-10 sm:w-[88%]">
              <BrowserFrame label="easykfz24.de" img={{ src: '/products/easykfz24/desktop.webp', alt: 'EasyKFZ24: Seite zu Kfz-Kennzeichen mit Konfigurator für Fahrzeugart und Wunschkennzeichen', width: 1800, height: 813, sizes: '(min-width:1024px) 50vw, 92vw' }} />
            </m.div>
            <m.div style={{ y: yPhone }} className="relative z-20 mx-auto mt-8 w-fit sm:absolute sm:-bottom-10 sm:-right-2 sm:mt-0 lg:-right-4">
              <PhoneFrame img={{ src: '/products/easykfz24/mobile.webp', alt: 'EasyKFZ24 auf dem Smartphone: Kennzeichen-Konfigurator', width: 640, height: 1302 }} />
            </m.div>
          </Tilt>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <Reveal>
            <EasyWordmark />
            <div className="mt-5"><StatusChip product={p} /></div>
          </Reveal>
          <SplitText as="h3" text={'Kfz-Zulassung.\n*Einfach digital.*'} className="mt-6 text-[clamp(1.9rem,1.1rem+2.3vw,3.1rem)] font-semibold leading-[.98] tracking-[-0.045em] text-[#0A1433]" accentClassName="serif-i text-[#2A55FF]" />
          <Reveal delay={0.1}>
            <p id={`${id}-h`} className="mt-6 max-w-lg text-lead text-[#46536F]">{p.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.chips.map((c) => (
                <li key={c} className="rounded-full border bg-white/80 px-3.5 py-1.5 text-[.82rem] font-medium text-[#0A1433]" style={{ borderColor: p.theme.line }}>{c}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={p.cta.primary.href} variant="primary" className="!bg-[#2A55FF] hover:!bg-[#1F45E6]">{p.cta.primary.label}</Button>
              <Button href={p.cta.secondary.href} variant="secondary">{p.cta.secondary.label}</Button>
            </div>
            <p className="mt-5 max-w-md text-[.8rem] leading-snug text-[#5A6683]">EasyKFZ24 ist ein privater Zulassungsservice und keine Behörde. Vorgänge werden ausschließlich auf easykfz24.de beauftragt.</p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
