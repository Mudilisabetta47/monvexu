'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SplitText } from '@/components/ui/SplitText';
import { HeroScene } from './HeroScene';
import { EASE } from '@/lib/motion';

const LETTERS = 'MONVEX'.split('');

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const textBlur = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', 'blur(10px)']);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sceneProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden">
      {/* Hintergrund: Raster, Glow, Koernung */}
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,#000_35%,transparent_100%)]" />
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-ember/[.09] blur-[110px]" />
      <div className="pointer-events-none absolute -left-40 top-1/2 -z-10 h-[420px] w-[420px] rounded-full bg-ink/[.05] blur-[110px]" />

      <div className="shell relative flex min-h-[100svh] flex-col justify-center pb-28 pt-32 sm:pt-36">
        <div className="grid items-center gap-6 lg:grid-cols-12">
          <m.div style={{ y: textY, opacity: textOpacity, scale: textScale, filter: textBlur }} className="relative z-10 origin-left lg:col-span-8">
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/70 py-2 pl-3 pr-4 font-mono text-[.68rem] uppercase tracking-[.18em] text-graphite backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ember" />
                <span className="relative h-2 w-2 rounded-full bg-ember" />
              </span>
              MONVEX UG (haftungsbeschränkt) · Bremen
            </m.p>

            <h1 className="mt-7" aria-label="MONVEX – Building what's next.">
              <span aria-hidden className="block text-[clamp(3.4rem,20vw,7.5rem)] font-semibold leading-[.86] tracking-[-0.06em] lg:text-h1">
                {LETTERS.map((l, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[.08em] align-bottom">
                    <m.span
                      className="inline-block will-change-transform"
                      initial={{ y: '112%', rotate: 6 }}
                      animate={{ y: '0%', rotate: 0 }}
                      transition={{ duration: 1.3, ease: EASE, delay: 0.25 + i * 0.07 }}
                    >
                      {l}
                    </m.span>
                  </span>
                ))}
              </span>
              <SplitText
                as="span"
                immediate
                delay={0.85}
                stagger={0.08}
                text={"BUILDING WHAT'S *NEXT.*"}
                accentClassName="serif-i text-ember"
                className="mt-3 block text-[clamp(1.6rem,.9rem+3.4vw,4.6rem)] font-semibold leading-[.95] tracking-[-0.045em] sm:mt-5"
              />
            </h1>

            <m.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.25 }}
              className="mt-8 max-w-xl text-lead text-graphite"
            >
              MONVEX verbindet Technologie, Unternehmertum und Markenentwicklung, um moderne Geschäftsmodelle aufzubauen und langfristig zu entwickeln.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.4 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button href="/#brands">Unsere Marken</Button>
              <Button href="/#services" variant="secondary">
                Was wir machen
              </Button>
            </m.div>
          </m.div>

          <m.div
            style={{ y: sceneY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
            className="relative lg:absolute lg:-right-6 lg:top-1/2 lg:-mt-[350px] lg:w-[58%] xl:-right-2"
          >
            <HeroScene progress={sceneProgress} />
          </m.div>
        </div>

        {/* Fusszeile */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="absolute inset-x-5 bottom-7 flex items-end justify-between gap-6 sm:inset-x-8 lg:inset-x-12"
        >
          <p className="hidden font-mono text-[.68rem] uppercase leading-relaxed tracking-[.18em] text-graphite sm:block">
            Marken · Produkte
            <br />
            Unternehmen · Geschäftsmodelle
          </p>
          <a href="#brands" className="group flex items-center gap-3 font-mono text-[.68rem] uppercase tracking-[.18em] text-graphite" aria-label="Nach unten scrollen">
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-ink/15">
              <span className="absolute inset-0 animate-scroll-hint bg-ink" />
            </span>
          </a>
          <p className="font-mono text-[.68rem] uppercase tracking-[.18em] text-graphite">Est. 2026</p>
        </m.div>
      </div>
    </section>
  );
}
