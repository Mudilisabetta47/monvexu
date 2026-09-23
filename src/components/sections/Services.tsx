'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { m } from 'framer-motion';
import { Cpu, Megaphone, Monitor, Rocket, Route, ShoppingBag, type LucideIcon } from 'lucide-react';
import { services, type Service, type ServiceIcon } from '@/data/services';
import { SplitText } from '@/components/ui/SplitText';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

const ICONS: Record<ServiceIcon, LucideIcon> = {
  monitor: Monitor,
  cpu: Cpu,
  'shopping-bag': ShoppingBag,
  megaphone: Megaphone,
  route: Route,
  rocket: Rocket,
};

/** Feine Linienmotive pro Leistung – ruhig, auf Hover in Akzentfarbe. */
function Motif({ id }: { id: string }) {
  const c = 'stroke-current';
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full text-ink/[.16] transition-colors duration-700 group-hover:text-white/30" fill="none" strokeWidth="1.5" aria-hidden>
      {id === 'digital' && (
        <g className={c}>
          <rect x="30" y="14" width="240" height="122" rx="12" />
          <path d="M30 42h240" />
          <circle cx="48" cy="28" r="3" /><circle cx="62" cy="28" r="3" /><circle cx="76" cy="28" r="3" />
          <rect x="48" y="58" width="110" height="60" rx="6" />
          <path d="M176 62h78M176 78h60M176 94h70M176 110h40" strokeLinecap="round" />
          <rect x="48" y="58" width="110" height="60" rx="6" className="stroke-ember" strokeDasharray="4 6" />
        </g>
      )}
      {id === 'technology' && (
        <g className={c}>
          <rect x="105" y="35" width="90" height="80" rx="10" />
          <rect x="128" y="55" width="44" height="40" rx="4" className="stroke-ember" />
          {[0, 1, 2, 3].map((i) => (<path key={i} d={`M${118 + i * 21} 35v-20M${118 + i * 21} 115v20`} strokeLinecap="round" />))}
          {[0, 1, 2].map((i) => (<path key={i} d={`M105 ${55 + i * 20}h-30M195 ${55 + i * 20}h30`} strokeLinecap="round" />))}
          <path d="M40 75l-14 0M260 75l14 0" strokeDasharray="2 5" />
        </g>
      )}
      {id === 'e-commerce' && (
        <g className={c}>
          {[0, 1, 2].map((i) => (<rect key={i} x={30 + i * 84} y="22" width="72" height="72" rx="10" className={i === 1 ? 'stroke-ember' : ''} />))}
          {[0, 1, 2].map((i) => (<path key={i} d={`M${34 + i * 84} 108h50M${34 + i * 84} 122h30`} strokeLinecap="round" />))}
          <circle cx="66" cy="58" r="14" /><path d="M150 76l16-28 16 28z" className="stroke-ember" /><rect x="222" y="44" width="28" height="28" rx="5" />
        </g>
      )}
      {id === 'marketing' && (
        <g className={c}>
          {[24, 46, 68, 90].map((r, i) => (<path key={r} d={`M${150 - r} 130a${r} ${r} 0 0 1 ${r * 2} 0`} className={i === 1 ? 'stroke-ember' : ''} />))}
          <circle cx="150" cy="130" r="6" />
          <path d="M150 130L232 52M150 130L64 60" strokeDasharray="3 6" />
        </g>
      )}
      {id === 'travel-mobility' && (
        <g className={c}>
          <path d="M24 112C80 112 80 40 140 40S200 104 276 44" />
          <path d="M24 112C80 112 80 40 140 40S200 104 276 44" className="animate-flow stroke-ember" strokeDasharray="3 10" />
          {[[24, 112], [140, 40], [276, 44]].map(([x, y]) => (<g key={x}><circle cx={x} cy={y} r="9" className="fill-paper" /><circle cx={x} cy={y} r="3.5" className="fill-current" /></g>))}
        </g>
      )}
      {id === 'ventures' && (
        <g className={c}>
          {[0, 1, 2, 3, 4].map((i) => (<rect key={i} x={36 + i * 50} y={110 - (i + 1) * 18} width="38" height={(i + 1) * 18 + 10} rx="7" className={i === 4 ? 'stroke-ember' : ''} />))}
          <path d="M40 60L120 42 176 58 262 18" strokeLinecap="round" strokeDasharray="2 6" />
        </g>
      )}
    </svg>
  );
}

function ServiceCard({ s, className, scale }: { s: Service; className?: string; scale?: MotionValue<number> }) {
  const Icon = ICONS[s.icon];
  return (
    <m.article
      style={scale ? { scale } : undefined}
      className={cn(
        'group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[32px] border border-line bg-white p-7 shadow-card transition-colors duration-700 ease-out hover:bg-ink hover:text-white sm:p-9',
        className,
      )}
    >
      <span aria-hidden className="pointer-events-none absolute -right-4 -top-10 select-none font-semibold leading-none tracking-[-0.06em] text-ink/[.05] transition-colors duration-700 group-hover:text-white/[.07]" style={{ fontSize: 'clamp(9rem,16vw,15rem)' }}>
        {s.index}
      </span>
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[.7rem] tracking-[.2em] text-ember-deep group-hover:text-ember">{s.index} / 0{services.length}</span>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white transition-all duration-700 ease-out group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-ember">
          <Icon size={24} strokeWidth={1.5} />
        </span>
      </div>
      <div aria-hidden className="relative my-4 min-h-[90px] flex-1 px-2 py-4 opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        <Motif id={s.id} />
      </div>
      <div className="relative">
        <h3 className="text-[clamp(2.2rem,1.4rem+2.6vw,3.8rem)] font-semibold leading-[.95] tracking-[-0.05em]">{s.title}</h3>
        <p className="mt-4 max-w-sm text-[1.02rem] leading-relaxed text-graphite transition-colors duration-700 group-hover:text-white/70">{s.description}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {s.points.map((p) => (
            <li key={p} className="rounded-full border border-line px-3.5 py-1.5 text-[.8rem] text-graphite transition-colors duration-700 group-hover:border-white/20 group-hover:text-white/80">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </m.article>
  );
}

function DesktopTrack() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  useEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(services.length - 1, Math.round(v * (services.length - 1)))));

  return (
    <div ref={section} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <m.div ref={track} style={{ x }} className="flex items-stretch gap-6 pl-12 pr-[12vw] will-change-transform xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
          <div className="flex w-[min(42vw,620px)] shrink-0 flex-col justify-center pr-10">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-ember">03</span>
                <span className="h-px w-10 bg-ink/25" />
                Leistungen
              </p>
            </Reveal>
            <SplitText text={'Wir bauen nicht nur *Websites.*'} className="mt-6 text-[clamp(2.6rem,1rem+4.4vw,6rem)] font-semibold leading-[.92] tracking-[-0.05em]" />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lead text-graphite">
                Sechs Felder, ein Ziel: Geschäftsmodelle, die funktionieren – technisch, gestalterisch und wirtschaftlich.
              </p>
            </Reveal>
            <p className="mt-10 flex items-center gap-3 font-mono text-[.68rem] uppercase tracking-[.2em] text-graphite">
              <span className="inline-block h-px w-10 animate-pulse bg-ember" /> Weiter scrollen
            </p>
          </div>
          {services.map((s, i) => (
            <CardWithScale key={s.id} s={s} i={i} progress={scrollYProgress} />
          ))}
        </m.div>

        <div className="shell absolute inset-x-0 bottom-8 flex items-center gap-5">
          <span className="font-mono text-[.7rem] tracking-[.2em] text-graphite">
            0{active + 1} / 0{services.length}
          </span>
          <span className="relative h-px flex-1 bg-ink/15">
            <m.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-ink" />
          </span>
        </div>
      </div>
    </div>
  );
}

function CardWithScale({ s, i, progress }: { s: Service; i: number; progress: MotionValue<number> }) {
  const n = services.length;
  const scale = useTransform(progress, (v) => 1 - Math.min(Math.abs(v - i / (n - 1)) * 0.28, 0.1));
  return <ServiceCard s={s} scale={scale} className="h-[min(64vh,560px)] w-[min(34vw,500px)] min-w-[380px]" />;
}

export function Services() {
  return (
    <section id="services" className="relative">
      <div className="hairline absolute inset-x-0 top-0" />
      {/* Desktop: gepinnter, horizontal scrollender Track */}
      <div className="hidden lg:block">
        <DesktopTrack />
      </div>

      {/* Mobil / Tablet: nativer Snap-Scroller */}
      <div className="py-24 sm:py-32 lg:hidden">
        <div className="shell">
          <SectionHead index="03" label="Leistungen" title={'Wir bauen nicht nur *Websites.*'}>
            Sechs Felder, ein Ziel: Geschäftsmodelle, die funktionieren – technisch, gestalterisch und wirtschaftlich.
          </SectionHead>
        </div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:px-8">
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} className="min-h-[440px] w-[82vw] max-w-[420px] snap-center" />
          ))}
        </div>
      </div>
    </section>
  );
}
