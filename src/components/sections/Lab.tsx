'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import { Boxes, Cpu, Palette, Workflow } from 'lucide-react';
import { SplitText } from '@/components/ui/SplitText';
import { Reveal } from '@/components/ui/Reveal';
import { EASE } from '@/lib/motion';

const CODE = [
  { c: 'text-white/35', t: '// monvex.lab / build.ts' },
  { c: '', t: 'const venture = await lab.build({' },
  { c: '', t: "  idea:     'digital mobility'," },
  { c: '', t: "  brand:    'own identity'," },
  { c: '', t: "  platform: ['web', 'booking', 'automation']," },
  { c: '', t: '});' },
  { c: '', t: '' },
  { c: '', t: 'await venture.launch();  // → live' },
];

function highlight(line: string) {
  const parts = line.split(/('[^']*'|\b(?:const|await)\b|→ live)/);
  return parts.map((p, i) => {
    if (/^'/.test(p)) return <span key={i} className="text-[#7fe0c3]">{p}</span>;
    if (/^(const|await)$/.test(p)) return <span key={i} className="text-ember">{p}</span>;
    if (p === '→ live') return <span key={i} className="text-white/45">{p}</span>;
    return <span key={i}>{p}</span>;
  });
}

function CodeWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [n, setN] = useState(0);
  const total = CODE.reduce((a, l) => a + l.t.length + 1, 0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(total);
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setN(i);
      if (i >= total) clearInterval(id);
    }, 26);
    return () => clearInterval(id);
  }, [inView, total]);

  let left = n;
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[22px] border border-white/12 bg-ink-800/90 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-ember" />
        <span className="ml-3 font-mono text-[.66rem] tracking-[.14em] text-white/40">lab / build.ts</span>
      </div>
      <pre className="min-h-[214px] overflow-hidden p-5 font-mono text-[.78rem] leading-[1.75] text-white/85 sm:text-[.84rem]">
        {CODE.map((l, i) => {
          const shown = Math.max(0, Math.min(l.t.length, left));
          left -= l.t.length + 1;
          const typing = shown > 0 && shown < l.t.length;
          return (
            <div key={i} className={l.c}>
              {highlight(l.t.slice(0, shown))}
              {typing && <span className="ml-px inline-block h-[1em] w-[.5em] translate-y-[.15em] animate-blink bg-ember" />}
              {!l.t && ' '}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

function Cube() {
  const face = 'absolute inset-0 border border-white/35 bg-white/[.04]';
  return (
    <div className="h-[120px] w-[120px]" style={{ perspective: 700 }}>
      <div className="preserve-3d relative h-full w-full animate-cube">
        {[0, 90, 180, 270].map((r) => (
          <div key={r} className={face} style={{ transform: `rotateY(${r}deg) translateZ(60px)` }} />
        ))}
        <div className={face} style={{ transform: 'rotateX(90deg) translateZ(60px)' }} />
        <div className={face} style={{ transform: 'rotateX(-90deg) translateZ(60px)' }} />
        <div className="absolute left-1/2 top-1/2 h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 preserve-3d">
          {[0, 90, 180, 270].map((r) => (
            <div key={r} className="absolute inset-0 bg-ember/85" style={{ transform: `rotateY(${r}deg) translateZ(23px)` }} />
          ))}
          <div className="absolute inset-0 bg-ember" style={{ transform: 'rotateX(90deg) translateZ(23px)' }} />
          <div className="absolute inset-0 bg-ember" style={{ transform: 'rotateX(-90deg) translateZ(23px)' }} />
        </div>
      </div>
    </div>
  );
}

const NODES: [number, number][] = [[12, 20], [34, 8], [58, 24], [82, 12], [90, 46], [70, 62], [44, 54], [20, 66], [8, 44], [52, 88], [84, 84]];
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0], [2, 6], [6, 9], [5, 10], [1, 6], [4, 10]];

function NodeGraph() {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-60">
      {EDGES.map(([a, b], i) => (
        <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} stroke="#fff" strokeOpacity=".16" strokeWidth="1" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" className="animate-flow" style={{ animationDuration: `${2 + (i % 4)}s` }} />
      ))}
      {NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.55" fill={i % 4 === 0 ? '#FF4A1C' : '#fff'} fillOpacity={i % 4 === 0 ? 1 : 0.6} />
      ))}
    </svg>
  );
}

const MODULES = [
  { icon: Cpu, name: 'Platform Core', meta: 'API · Daten · Auth', w: 82 },
  { icon: Boxes, name: 'Commerce Module', meta: 'Katalog · Checkout', w: 64 },
  { icon: Palette, name: 'Brand System', meta: 'Design Tokens · UI', w: 91 },
  { icon: Workflow, name: 'Automation', meta: 'Workflows · Events', w: 47 },
];

export function Lab() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 15%'] });
  // Bildmaske: die dunkle Buehne oeffnet sich beim Einscrollen von der Karte zur Vollflaeche.
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(9% 5% 9% 5% round 56px)', 'inset(0% 0% 0% 0% round 0px)']);
  const scaleInner = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <section ref={ref} id="lab" className="relative">
      <m.div style={{ clipPath: clip }} className="relative isolate overflow-hidden bg-ink text-white">
        <m.div style={{ scale: scaleInner }} className="relative">
          <div className="grid-bg-dark pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_60%_40%,#000_20%,transparent_75%)]" />
          <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-ember/20 blur-[140px]" />

          <div className="shell grid gap-16 py-32 sm:py-44 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow flex items-center gap-3 !text-white/55">
                  <span className="text-ember">07</span>
                  <span className="h-px w-10 bg-white/25" />
                  MONVEX Lab
                </p>
              </Reveal>
              <SplitText text={'Ideas become\n*products.*'} className="mt-6 text-h2 font-semibold text-white" />
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-md text-lead text-white/65">Im MONVEX Lab entstehen neue digitale Produkte, Plattformen und Geschäftsmodelle.</p>
              </Reveal>
              <Reveal delay={0.25}>
                <ul className="mt-10 flex flex-wrap gap-2">
                  {['Produkte', 'Plattformen', 'Geschäftsmodelle', 'Prototypen'].map((t) => (
                    <li key={t} className="rounded-full border border-white/15 px-4 py-2 font-mono text-[.68rem] uppercase tracking-[.14em] text-white/70">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="relative lg:col-span-7">
              <div
                className="relative flex flex-col gap-5 sm:block sm:min-h-[600px]"
                onPointerMove={(e) => {
                  if (e.pointerType !== 'mouse') return;
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
                  e.currentTarget.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
                }}
              >
                <NodeGraph />
                <div className="relative sm:absolute sm:left-0 sm:top-0 sm:w-[84%]" style={{ transform: 'translate3d(calc(var(--px,0)*-8px), calc(var(--py,0)*-8px), 0)', transition: 'transform .7s cubic-bezier(.16,1,.3,1)' }}>
                  <CodeWindow />
                </div>

                <div className="relative grid gap-3 sm:absolute sm:bottom-0 sm:left-0 sm:w-[64%]" style={{ transform: 'translate3d(calc(var(--px,0)*10px), calc(var(--py,0)*10px), 0)', transition: 'transform .7s cubic-bezier(.16,1,.3,1)' }}>
                  {MODULES.map((mod, i) => (
                    <m.div
                      key={mod.name}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[.06] px-4 py-3 backdrop-blur-md"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-ember">
                        <mod.icon size={19} strokeWidth={1.6} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="text-[.92rem] font-medium">{mod.name}</span>
                          <span className="hidden font-mono text-[.6rem] tracking-[.14em] text-white/40 sm:inline">{mod.meta}</span>
                        </span>
                        <span className="mt-2 block h-[3px] overflow-hidden rounded-full bg-white/10">
                          <m.span initial={{ width: 0 }} whileInView={{ width: `${mod.w}%` }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE, delay: 0.6 + i * 0.12 }} className="block h-full rounded-full bg-ember" />
                        </span>
                      </span>
                    </m.div>
                  ))}
                </div>

                <div className="absolute bottom-6 right-2 hidden sm:right-10 sm:block" style={{ transform: 'translate3d(calc(var(--px,0)*22px), calc(var(--py,0)*22px), 0)', transition: 'transform .7s cubic-bezier(.16,1,.3,1)' }}>
                  <Cube />
                </div>
              </div>
              <p className="mt-6 font-mono text-[.62rem] uppercase tracking-[.18em] text-white/35">Interface-Studie · illustrative Darstellung</p>
            </div>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
