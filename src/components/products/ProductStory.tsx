'use client';

import { useRef, useState, type ReactNode } from 'react';
import { m, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Check } from 'lucide-react';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

export type StoryStep = { kicker: string; title: string; text: string; points: string[]; media: ReactNode; /** Breite der Bühne relativ zur Höhe, z. B. 1.5 für Browser, 0.5 für Handy */ shape: 'wide' | 'tall' };

/**
 * Scrollgesteuerte Produkt-Story (ab lg): Die Bühne bleibt stehen, mit dem Scrollen wechseln Text und Bild.
 * Darunter (mobil/Tablet) und bei „Bewegung reduzieren“: normale, gestapelte Darstellung ohne Pinning.
 */
export function ProductStory({ steps, accent, ink, line }: { steps: StoryStep[]; accent: string; ink: string; line: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)))));

  const stacked = (
    <ol className={cn('space-y-16', !reduce && 'lg:hidden')}>
      {steps.map((s, i) => (
        <li key={s.title} className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="font-mono text-[.7rem] tracking-[.2em]" style={{ color: accent }}>{String(i + 1).padStart(2, '0')} · {s.kicker}</p>
            <h3 className="mt-3 text-[clamp(1.7rem,1.2rem+2vw,2.8rem)] font-semibold leading-[1] tracking-[-0.04em]" style={{ color: ink }}>{s.title}</h3>
            <p className="mt-3 max-w-md text-lead text-graphite">{s.text}</p>
            <ul className="mt-5 grid gap-2.5">
              {s.points.map((x) => (<li key={x} className="flex gap-3 leading-snug"><Check size={17} className="mt-0.5 shrink-0" style={{ color: accent }} />{x}</li>))}
            </ul>
          </div>
          <div className="flex justify-center lg:col-span-7">{s.media}</div>
        </li>
      ))}
    </ol>
  );
  if (reduce) return stacked;

  return (
    <>
      {stacked}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${steps.length * 80 + 30}vh` }}>
        <div className="sticky top-0 grid h-[100svh] grid-cols-12 items-center gap-10 pt-16">
          {/* Text */}
          <div className="col-span-5">
            <ol className="relative">
              <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px" style={{ background: line }} />
              <m.span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px origin-top" style={{ background: accent, scaleY: scrollYProgress }} />
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.title} className="relative pl-10">
                    <span className="absolute left-0 top-[.7rem] h-[15px] w-[15px] rounded-full border-2 bg-white transition-all duration-500" style={{ borderColor: i <= active ? accent : line, background: on ? accent : '#fff', transform: on ? 'scale(1.25)' : undefined }} />
                    <div className={cn('py-3 transition-opacity duration-500', on ? 'opacity-100' : 'opacity-35')}>
                      <p className="font-mono text-[.68rem] tracking-[.2em]" style={{ color: accent }}>{String(i + 1).padStart(2, '0')} · {s.kicker}</p>
                      <h3 className="mt-2 text-[clamp(1.5rem,1.1rem+1.4vw,2.4rem)] font-semibold leading-[1] tracking-[-0.04em]" style={{ color: ink }}>{s.title}</h3>
                      <div className={cn('grid transition-[grid-template-rows] duration-700 ease-out', on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                        <div className="overflow-hidden">
                          <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-graphite">{s.text}</p>
                          <ul className="mt-4 grid gap-2">
                            {s.points.map((x) => (<li key={x} className="flex gap-3 text-[.95rem] leading-snug"><Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />{x}</li>))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Bühne */}
          <div className="relative col-span-7 h-[68svh] max-h-[680px]">
            <span aria-hidden className="absolute inset-[6%] rounded-full opacity-60 blur-[90px]" style={{ background: `${accent}33` }} />
            {steps.map((s, i) => {
              const on = i === active;
              const before = i < active;
              return (
                <m.div
                  key={s.title}
                  aria-hidden={!on}
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, scale: on ? 1 : before ? 0.94 : 1.05, y: on ? 0 : before ? -40 : 50, filter: on ? 'blur(0px)' : 'blur(8px)' }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ pointerEvents: on ? 'auto' : 'none' }}
                >
                  <div className={s.shape === 'tall' ? 'h-full' : 'w-full'}>{s.media}</div>
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
