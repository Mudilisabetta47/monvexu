'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/cn';

type Cta = { label: string; href: string; external?: boolean };
type Slide = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  primary: Cta;
  secondary?: Cta;
  note?: string;
  visual: 'film' | 'busos' | 'easy' | 'agency';
  /** Anzeigedauer in Sekunden */
  seconds: number;
};

const facts = [
  { v: '2', l: 'eigene Produkte: BusOS und EasyKFZ24' },
  { v: '3', l: 'Bereiche: Produkte, Software, Werbeagentur' },
  { v: '2026', l: 'gegründet, Sitz in Bremen' },
] as const;

const slides: Slide[] = [
  {
    id: 'monvex',
    eyebrow: 'Software · Digitale Produkte · Werbeagentur',
    title: <>Wir bauen Software, Produkte und Marken <span className="serif-i">aus Bremen.</span></>,
    text: 'MONVEX entwickelt Software und eigene digitale Produkte: Plattformen für Busunternehmen und die digitale Kfz-Zulassung, dazu Marken, Webentwicklung und Marketing.',
    primary: { label: 'Kontakt aufnehmen', href: '/#kontakt' },
    secondary: { label: 'Unsere Produkte', href: '/produkte' },
    visual: 'film',
    seconds: 10,
  },
  {
    id: 'busos',
    eyebrow: 'MONVEX BusOS · in Entwicklung',
    title: <>Das Betriebssystem für moderne <span className="serif-i">Busunternehmen.</span></>,
    text: 'Von der Charteranfrage über Kalkulation und Angebot bis zur Fahrt in der Leitstelle. Die Plattform läuft intern mit einem Demo-Betrieb.',
    primary: { label: 'BusOS entdecken', href: '/produkte/busos' },
    secondary: { label: 'Demo anfragen', href: '/produkte/busos#demo' },
    note: 'Noch nicht öffentlich verfügbar. Die Abbildungen zeigen einen Demo-Betrieb mit fiktiven Daten.',
    visual: 'busos',
    seconds: 7,
  },
  {
    id: 'easykfz24',
    eyebrow: 'EasyKFZ24 · online',
    title: <>Kfz-Zulassung. <span className="serif-i">Einfach digital.</span></>,
    text: 'Zulassen, ummelden, wiederzulassen oder abmelden: Vorgang online starten, Unterlagen hochladen und den Status jederzeit abrufen.',
    primary: { label: 'EasyKFZ24 besuchen', href: 'https://easykfz24.de/', external: true },
    secondary: { label: 'Mehr dazu', href: '/produkte/easykfz24' },
    visual: 'easy',
    seconds: 7,
  },
  {
    id: 'agentur',
    eyebrow: 'Werbeagentur · Bremen',
    title: <>Websites und Marketing, die <span className="serif-i">Anfragen bringen.</span></>,
    text: 'Webdesign, SEO, Google Ads, Branding und Print aus einer Hand. Persönlich, modern und mit dem Ziel, dass am Ende Anfragen stehen.',
    primary: { label: 'Zur Werbeagentur', href: '/werbeagentur' },
    secondary: { label: 'Anfragen', href: '/#kontakt' },
    visual: 'agency',
    seconds: 7,
  },
];

const chips = ['Webdesign', 'SEO', 'Google Ads', 'Branding', 'Print', 'Webentwicklung'];

function Visual({ kind, active }: { kind: Slide['visual']; active: boolean }) {
  if (kind === 'film') return null; // das Video liegt als Hintergrund hinter dem ganzen Hero
  const disc = {
    busos: 'bg-[radial-gradient(circle_at_30%_25%,#6ee7d9,#0f9488_55%,#075e57)] shadow-[0_40px_90px_-30px_rgba(15,148,136,.7)]',
    easy: 'bg-[radial-gradient(circle_at_30%_25%,#8fb0ff,#2b63f2_55%,#1a3fa8)] shadow-[0_40px_90px_-30px_rgba(43,99,242,.7)]',
    agency: 'bg-[radial-gradient(circle_at_30%_25%,#ff8a5c,#ff4a1c_55%,#c8340c)] shadow-[0_40px_90px_-30px_rgba(255,74,28,.7)]',
  }[kind];
  return (
    <div className="relative isolate mx-auto aspect-[4/3.6] w-full max-w-[34rem] lg:max-w-none">
      <div aria-hidden className={cn('absolute left-[10%] top-[2%] -z-10 aspect-square w-[76%] rounded-full', disc)} />
      <div aria-hidden className="absolute left-[3%] top-[-3%] -z-10 aspect-square w-[90%] rounded-full border border-white/10" />
      {kind === 'busos' && (
        <>
          <Image src="/products/busos/desktop.webp" alt="MONVEX BusOS: Übersicht im Demo-Betrieb (fiktive Daten)" width={1440} height={900} sizes="(min-width:1024px) 46vw, 92vw" priority={active} className="absolute left-0 top-[14%] w-[86%] rounded-xl shadow-lift ring-1 ring-white/15" />
          <Image src="/products/busos/angebot.webp" alt="BusOS: Angebot als PDF (Beispiel)" width={900} height={1271} sizes="(min-width:1024px) 16vw, 32vw" className="absolute bottom-[-2%] right-[2%] w-[27%] -rotate-3 rounded-lg shadow-lift ring-1 ring-white/20" />
        </>
      )}
      {kind === 'easy' && (
        <>
          <Image src="/products/easykfz24/desktop.webp" alt="EasyKFZ24 auf dem Desktop" width={1800} height={813} sizes="(min-width:1024px) 46vw, 92vw" className="absolute left-0 top-[20%] w-[92%] rounded-xl shadow-lift ring-1 ring-white/15" />
          <Image src="/products/easykfz24/mobile.webp" alt="EasyKFZ24 auf dem Smartphone" width={640} height={1302} sizes="(min-width:1024px) 15vw, 30vw" className="absolute bottom-[-2%] right-[3%] w-[29%] max-w-[13rem] rounded-2xl shadow-lift ring-1 ring-white/25" />
        </>
      )}
      {kind === 'agency' && (
        <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-3 p-6 sm:gap-4">
          {chips.map((c, i) => (
            <span key={c} className={cn('rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[1rem] font-semibold text-white backdrop-blur sm:text-[1.15rem]', i % 2 ? 'translate-y-3' : '-translate-y-2')}>
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [bar, setBar] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const n = slides.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => { setReduced(mq.matches); if (mq.matches) setPlaying(false); };
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  const go = useCallback((to: number) => { setI(((to % n) + n) % n); setBar(0); }, [n]);

  // Automatischer Wechsel mit Fortschrittsbalken; pausiert bei Hover, Fokus, Berührung, im Hintergrund-Tab und bei „weniger Bewegung“
  useEffect(() => {
    if (!playing || hold || reduced) return;
    const dur = slides[i].seconds * 1000;
    const start = performance.now() - bar * dur;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setBar(p);
      if (p >= 1) { go(i + 1); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // bar bewusst nicht in den Abhängigkeiten: sie wird hier fortgeschrieben
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, playing, hold, reduced, go]);

  // Video läuft nur, solange seine Folie sichtbar ist
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (i === 0 && !reduced && !hold) void v.play().catch(() => undefined);
    else v.pause();
  }, [i, reduced, hold]);

  useEffect(() => {
    const vis = () => setHold(document.hidden);
    document.addEventListener('visibilitychange', vis);
    return () => document.removeEventListener('visibilitychange', vis);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { go(i + 1); setPlaying(false); }
    if (e.key === 'ArrowLeft') { go(i - 1); setPlaying(false); }
  };

  return (
    <section
      aria-roledescription="Karussell"
      aria-label="Highlights von MONVEX"
      className="relative isolate overflow-hidden bg-ink pt-[84px] text-white"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
      onKeyDown={onKey}
      onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; setHold(true); }}
      onTouchEnd={(e) => {
        const s = touch.current; touch.current = null; setHold(false);
        if (!s) return;
        const dx = e.changedTouches[0].clientX - s.x, dy = e.changedTouches[0].clientY - s.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) { go(i + (dx < 0 ? 1 : -1)); setPlaying(false); }
      }}
    >
      {/* Film (Folie 1) als Hintergrund; ab Folie 2 blendet er aus */}
      <div aria-hidden className={cn('absolute inset-0 -z-10 transition-opacity duration-1000', i === 0 ? 'opacity-100' : 'opacity-0')}>
        <video ref={videoRef} className="h-full w-full object-cover" muted loop playsInline preload="metadata" poster="/hero/monvex-film-poster.jpg" autoPlay={!reduced}>
          <source src="/hero/monvex-film-m.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/hero/monvex-film.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,13,.92)_0%,rgba(11,11,13,.72)_42%,rgba(11,11,13,.25)_100%)] max-md:bg-[linear-gradient(180deg,rgba(11,11,13,.5),rgba(11,11,13,.88))]" />
      </div>

      <div className="grid">
        {slides.map((s, k) => {
          const active = k === i;
          const H = k === 0 ? 'h1' : 'h2';
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="Folie"
              aria-label={`${k + 1} von ${n}`}
              aria-hidden={!active}
              inert={!active}
              className={cn('col-start-1 row-start-1 transition-all duration-700 ease-out', active ? 'visible translate-x-0 opacity-100' : 'invisible pointer-events-none opacity-0', !active && (k < i ? '-translate-x-6' : 'translate-x-6'))}
            >
              <div className="shell grid min-h-[32rem] items-center gap-10 py-10 sm:min-h-[36rem] lg:min-h-[33rem] lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:py-10">
                <div className="min-w-0">
                  <H id={k === 0 ? 'hero-title' : undefined} className="display-title text-[clamp(2.3rem,1.1rem+3.3vw,4.3rem)] leading-[.98] text-white [overflow-wrap:anywhere]">
                    {s.title}
                  </H>
                  <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-white/75">{s.text}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {[s.primary, s.secondary].filter(Boolean).map((c, idx) => {
                      const cta = c as Cta;
                      const cls = idx === 0
                        ? 'bg-ember text-white hover:bg-white hover:text-ink'
                        : 'border border-white/30 bg-white/5 text-white backdrop-blur hover:border-white hover:bg-white hover:text-ink';
                      const inner = <>{cta.label} {idx === 0 ? <ArrowRight size={18} aria-hidden /> : <ArrowUpRight size={18} aria-hidden />}</>;
                      const base = cn('inline-flex min-h-[3.2rem] items-center gap-3 rounded-full px-7 py-3.5 text-[.98rem] font-semibold transition-colors duration-300', cls);
                      return cta.external ? (
                        <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className={base} tabIndex={active ? 0 : -1}>{inner}</a>
                      ) : (
                        <Link key={cta.label} href={cta.href} className={base} tabIndex={active ? 0 : -1}>{inner}</Link>
                      );
                    })}
                  </div>
                  {s.note && <p className="mt-5 max-w-md text-[.8rem] leading-snug text-white/50">{s.note}</p>}
                  {k === 0 && (
                    <dl className="mt-8 grid max-w-xl grid-cols-3 gap-5 sm:mt-10">
                      {facts.map((f) => (
                        <div key={f.v} className="border-l-2 border-ember pl-3 sm:pl-4">
                          <dt className="display-title text-[1.7rem] leading-none text-white sm:text-[2.2rem]">{f.v}</dt>
                          <dd className="mt-2 text-[.78rem] leading-snug text-white/60 sm:text-[.82rem]">{f.l}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
                <div className={cn(s.visual === 'film' && 'hidden lg:block')}>
                  <Visual kind={s.visual} active={active} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Steuerung */}
      <div className="shell relative pb-6 sm:pb-8">
        <div className="flex items-center gap-4 border-t border-white/12 pt-5">
          <div className="flex gap-2">
            <button type="button" onClick={() => { go(i - 1); setPlaying(false); }} aria-label="Vorherige Folie" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white transition-colors hover:bg-white hover:text-ink"><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { go(i + 1); setPlaying(false); }} aria-label="Nächste Folie" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white transition-colors hover:bg-white hover:text-ink"><ChevronRight size={20} /></button>
          </div>
          <ol className="flex flex-1 items-center gap-2" aria-label="Folie wählen">
            {slides.map((s, k) => (
              <li key={s.id} className="flex-1">
                <button type="button" onClick={() => { go(k); }} aria-label={`Folie ${k + 1}: ${s.eyebrow}`} aria-current={k === i} className="group flex h-7 w-full items-center">
                  <span className="relative block h-[3px] w-full overflow-hidden rounded bg-white/20">
                    <span className="absolute inset-y-0 left-0 block bg-ember" style={{ width: k < i ? '100%' : k === i ? `${(playing && !reduced ? bar : 1) * 100}%` : '0%' }} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="hidden font-mono text-[.78rem] tabular-nums text-white/60 sm:block" aria-hidden>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
          {!reduced && (
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Automatischen Wechsel anhalten' : 'Automatischen Wechsel starten'} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white transition-colors hover:bg-white hover:text-ink">
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
          )}
        </div>
      </div>
      <p aria-live={playing ? 'off' : 'polite'} className="sr-only">Folie {i + 1} von {n}: {slides[i].eyebrow}</p>
    </section>
  );
}
