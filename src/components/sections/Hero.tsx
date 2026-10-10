'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { m, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroMoon } from './HeroMoon';
import { company } from '@/data/site';
import { heroSlides } from '@/data/hero';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

const N = heroSlides.length;
const AUTOPLAY_MS = 8000;

/** Deterministische Sterne (Server = Client). */
function stars(n: number) {
  let s = 11;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: n }, () => ({ x: rnd() * 100, y: rnd() * 100, r: 1 + rnd() * 2.2, d: rnd() * 5, t: 2.6 + rnd() * 4, o: 0.35 + rnd() * 0.6 }));
}

const accent = (s: string, cls: string) =>
  s.split(/(\*[^*]+\*)/).filter(Boolean).map((seg, i) =>
    seg.startsWith('*') ? <em key={i} className={cn('serif-i', cls)}>{seg.slice(1, -1)}</em> : <span key={i}>{seg}</span>,
  );

/**
 * Vollbild-Slider im 16:9-Format (ab lg), auf kleineren Schirmen höher.
 * Schwarzer Nachthimmel, grosser oranger Mond, dessen Phase mit der Folie wechselt.
 * Bedienung: Wischen/Ziehen, Pfeile, Indikatoren, Pfeiltasten. Autoplay stoppt bei Interaktion.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hidden, setHidden] = useState(false);
  const gesture = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const star = useMemo(() => stars(110), []);

  const go = useCallback((n: number) => {
    setI(((n % N) + N) % N);
    setAuto(false);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!auto || reduce || !inView || hidden) return;
    const t = setTimeout(() => setI((x) => (x + 1) % N), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, auto, reduce, inView, hidden]);
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Pfeiltasten (nur wenn der Hero sichtbar ist und kein Eingabefeld fokussiert ist)
  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('input,textarea,select,[contenteditable="true"],input[type=range]')) return;
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView, i, go]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const moonScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const slide = heroSlides[i];

  return (
    <section
      ref={ref}
      id="top"
      aria-roledescription="Karussell"
      aria-label="MONVEX – Vorstellung"
      className="relative isolate min-h-[min(100svh,860px)] w-full select-none overflow-hidden rounded-b-[32px] bg-ink text-white sm:rounded-b-[56px] lg:aspect-video lg:min-h-[640px]"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={(e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        gesture.current = { x: e.clientX, y: e.clientY, moved: false };
      }}
      onPointerUp={(e) => {
        const g = gesture.current;
        gesture.current = null;
        if (!g) return;
        const dx = e.clientX - g.x;
        if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(e.clientY - g.y) * 1.4) {
          g.moved = true;
          go(i + (dx < 0 ? 1 : -1));
          // Klick nach dem Wischen unterdrücken
          const stop = (ev: Event) => ev.stopPropagation();
          window.addEventListener('click', stop, { capture: true, once: true });
          setTimeout(() => window.removeEventListener('click', stop, { capture: true }), 60);
        }
      }}
      onPointerCancel={() => (gesture.current = null)}
    >
      {/* Sterne */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {star.map((s, k) => (
          <span key={k} className="mx-star absolute rounded-full bg-white" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r, opacity: s.o, animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }} />
        ))}
      </div>
      <div aria-hidden className="grid-bg-dark pointer-events-none absolute inset-0 opacity-[.22] [mask-image:radial-gradient(ellipse_70%_80%_at_72%_50%,#000_10%,transparent_75%)]" />

      {/* Mond */}
      <div className="pointer-events-none absolute left-1/2 top-[30%] w-[132vw] -translate-x-1/2 -translate-y-1/2 sm:top-[34%] lg:left-auto lg:right-[-9%] lg:top-1/2 lg:w-[min(122%,128svh)] lg:max-w-none lg:translate-x-0">
        <HeroMoon phase={slide.phase} stage={i} stages={N} scale={moonScale} y={moonY} />
      </div>

      {/* Lesbarkeit links / unten */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0B0B0D_8%,rgba(11,11,13,.55)_38%,transparent_62%)] lg:bg-[linear-gradient(90deg,#0B0B0D_6%,rgba(11,11,13,.72)_34%,transparent_62%)]" />

      {/* Inhalt */}
      <m.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end px-5 pb-28 pt-32 sm:px-8 lg:justify-center lg:px-12 lg:pb-24 lg:pt-28">
        <div className="mx-auto grid w-full max-w-shell">
          {heroSlides.map((s, k) => {
            const on = k === i;
            const Title = s.h1 ? 'h1' : 'h2';
            return (
              <m.div
                key={s.id}
                aria-hidden={!on}
                aria-roledescription="Folie"
                aria-label={`${k + 1} von ${N}`}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: on ? 0.35 : 0.4, delay: on ? 0.05 : 0 }}
                style={{ visibility: on ? 'visible' : undefined }}
                className={cn('col-start-1 row-start-1 max-w-[760px]', !on && 'pointer-events-none')}
              >
                <m.p
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : 14 }}
                  transition={{ duration: 0.8, ease: EASE, delay: on ? 0.1 : 0 }}
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.07] py-2 pl-3 pr-4 font-mono text-[.66rem] uppercase tracking-[.18em] text-white/75 backdrop-blur"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ember" />
                    <span className="relative h-2 w-2 rounded-full bg-ember" />
                  </span>
                  {s.eyebrow || `${company.legalName} · Bremen`}
                </m.p>

                <Title
                  className={cn(
                    'mt-6 font-semibold leading-[.92] tracking-[-0.05em]',
                    s.h1 ? 'text-[clamp(3.4rem,1.4rem+10.5vw,10.5rem)]' : 'text-[clamp(2.6rem,1.2rem+6vw,6.4rem)]',
                  )}
                >
                  {s.title.split('\n').map((line, li) => (
                    <span key={li} className={cn('block overflow-hidden pb-[.08em]', s.h1 && li === 1 && 'mt-2 text-[clamp(1.4rem,.8rem+3.2vw,3.6rem)] leading-[1.05] tracking-[-0.04em]')}>
                      <m.span
                        className="inline-block will-change-transform"
                        animate={{ y: on ? '0%' : '112%', rotate: on ? 0 : 3 }}
                        transition={{ duration: 1.1, ease: EASE, delay: on ? 0.15 + li * 0.09 : 0 }}
                      >
                        {accent(line, 'text-ember')}
                      </m.span>
                    </span>
                  ))}
                </Title>

                <m.p
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : 18 }}
                  transition={{ duration: 0.9, ease: EASE, delay: on ? 0.45 : 0 }}
                  className="mt-6 max-w-xl text-lead text-white/72"
                >
                  {s.lead}
                </m.p>

                <m.div
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : 18 }}
                  transition={{ duration: 0.9, ease: EASE, delay: on ? 0.58 : 0 }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  <Button href={s.primary.href} variant="light" tabIndex={on ? 0 : -1}>
                    {s.primary.label}
                  </Button>
                  {s.secondary && (
                    <Link
                      href={s.secondary.href}
                      tabIndex={on ? 0 : -1}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-[1.05rem] text-[.95rem] font-medium tracking-tight text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-ink"
                    >
                      {s.secondary.label}
                    </Link>
                  )}
                </m.div>
              </m.div>
            );
          })}
        </div>
      </m.div>

      {/* Steuerung */}
      <div className="absolute inset-x-5 bottom-6 z-20 flex items-end justify-between gap-6 sm:inset-x-8 lg:inset-x-12">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(i - 1)} aria-label="Vorherige Folie" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Nächste Folie" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink">
            <ArrowRight size={18} />
          </button>
          <span className="ml-3 hidden font-mono text-[.7rem] tracking-[.2em] text-white/60 sm:inline">
            0{i + 1} / 0{N}
          </span>
        </div>

        <ol className="flex flex-1 items-end justify-center gap-2 sm:gap-3 lg:w-[460px] lg:flex-none">
          {heroSlides.map((s, k) => (
            <li key={s.id} className="flex-1">
              <button type="button" onClick={() => go(k)} aria-label={`Folie ${k + 1}`} aria-current={k === i} className="group block w-full py-3">
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20">
                  <span
                    key={`${k}-${i === k ? 'on' : 'off'}-${auto}`}
                    className={cn('absolute inset-y-0 left-0 rounded-full bg-ember', k < i && 'w-full', k > i && 'w-0')}
                    style={i === k ? { width: auto && !reduce ? undefined : '100%', animation: auto && !reduce ? `mx-fill ${AUTOPLAY_MS}ms linear forwards` : undefined } : undefined}
                  />
                </span>
              </button>
            </li>
          ))}
        </ol>

        <p className="hidden font-mono text-[.68rem] uppercase tracking-[.18em] text-white/55 lg:block">
          {company.founded === '2026' ? 'Est. 2026' : ''}
        </p>
      </div>
    </section>
  );
}
