'use client';

import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { m } from 'framer-motion';
import { processSteps } from '@/data/process';
import { SplitText } from '@/components/ui/SplitText';
import { ProcessScene } from './ProcessScene';
import { cn } from '@/lib/cn';

/** "FROM IDEA TO BUSINESS." – gepinnte Scroll-Sequenz, die durch fuenf Phasen fuehrt. */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const s = Math.min(processSteps.length - 1, Math.floor(v * processSteps.length));
    setStep((prev) => (prev === s ? prev : s));
  });
  const current = processSteps[step];

  return (
    <section ref={ref} id="prozess" className="relative bg-white" style={{ height: `${processSteps.length * 85 + 40}vh` }}>
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-20 sm:py-24">
        <div className="shell w-full">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-ember">04</span>
                <span className="h-px w-10 bg-ink/25" />
                Geschäftsmodell
              </p>
              <SplitText text={'FROM IDEA\nTO *BUSINESS.*'} className="mt-4 text-[clamp(2.2rem,1rem+4.2vw,5.6rem)] font-semibold leading-[.9] tracking-[-0.05em]" />
            </div>
            <p className="hidden max-w-sm text-lead text-graphite lg:block">Von der Idee über Entwicklung und Markenaufbau bis zum laufenden Betrieb.</p>
          </div>

          <div className="mt-6 grid gap-5 sm:mt-10 lg:grid-cols-12 lg:gap-10">
            {/* Szene */}
            <div className="relative order-1 h-[30svh] overflow-hidden rounded-[28px] border border-line bg-paper sm:h-[34svh] lg:order-2 lg:col-span-7 lg:h-[46svh] lg:rounded-[36px]">
              <div className="grid-bg absolute inset-0 opacity-70" />
              <ProcessScene step={step} />
              <div className="absolute bottom-4 left-5 flex items-baseline gap-3 sm:bottom-6 sm:left-8">
                <span className="font-mono text-[.7rem] tracking-[.2em] text-ember-deep">0{step + 1}</span>
                <m.span key={current.id} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-[clamp(2rem,1rem+3vw,4.2rem)] font-semibold leading-none tracking-[-0.05em]">
                  {current.word}
                </m.span>
              </div>
            </div>

            {/* Schritte */}
            <ol className="relative order-2 lg:order-1 lg:col-span-5">
              <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-ink/15" />
              <m.span aria-hidden style={{ scaleY: scrollYProgress }} className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-ember" />
              {processSteps.map((s, i) => {
                const on = i === step;
                return (
                  <li key={s.id} className="relative pl-10">
                    <span className={cn('absolute left-0 top-[.85rem] h-[15px] w-[15px] rounded-full border-2 bg-white transition-all duration-500', i <= step ? 'border-ember' : 'border-ink/20', on && 'scale-125 bg-ember')} />
                    <div className={cn('py-1.5 transition-opacity duration-500 sm:py-2', on ? 'opacity-100' : 'opacity-40')}>
                      <p className="flex items-baseline gap-3">
                        <span className="text-[clamp(1.3rem,1rem+1.2vw,2rem)] font-semibold tracking-[-0.04em]">{s.word}</span>
                        <span className="font-mono text-[.66rem] uppercase tracking-[.16em] text-graphite">{s.title}</span>
                      </p>
                      <div className={cn('grid transition-[grid-template-rows] duration-500 ease-out', on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                        <p className="overflow-hidden text-[.95rem] leading-relaxed text-graphite">
                          <span className="block pt-1.5">{s.text}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
