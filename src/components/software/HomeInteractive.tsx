'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { SoftwareMock, PanelView } from './Mock';
import { SwIcon } from './icons';
import { SwButton } from './SwButton';
import { IconTile, StatusBadge } from './SwUi';
import { Tilt } from '@/components/ui/Tilt';
import { categories, categoryBySlug, productBySlug, productsInCategory, requestHref, swPath, type CategorySlug } from '@/data/software';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

/* ------------------------------------------------------------------ Hero-Bühne */

const STAGE = ['crm', 'ai-agent', 'analytics', 'money'] as const;

export function HeroStage() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % STAGE.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const p = productBySlug(STAGE[i])!;
  const cat = categoryBySlug(p.category)!;
  const crm = productBySlug('ai-concierge')!;
  const gauge = productBySlug('service-desk')!;
  const donut = productBySlug('finance')!;

  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[60px] opacity-80 blur-3xl transition-colors duration-1000" style={{ background: `radial-gradient(60% 60% at 50% 40%, color-mix(in srgb, ${cat.accent} 26%, transparent), transparent 70%)` }} />

      <Tilt max={5} glare={false} className="[transform-style:preserve-3d]">
        <AnimatePresence mode="wait">
          <m.div key={p.slug} initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.99 }} transition={{ duration: 0.7, ease: EASE }}>
            <SoftwareMock spec={p.mock} name={p.name} accent={cat.accent} accent2={cat.accent2} />
          </m.div>
        </AnimatePresence>

        {/* Schwebende Zusatzkarten (3D-Tiefe) – nur ab lg, damit mobile Layouts ruhig bleiben */}
        <div className="pointer-events-none absolute -bottom-16 left-8 hidden w-[200px] lg:block" style={{ transform: 'translateZ(70px)' }} aria-hidden>
          <div className="sw-float sw-card p-4" style={{ animationDelay: '-2s' }}>
            <p className="text-[.62rem] font-semibold text-sw-mute">SLA-Einhaltung (Beispiel)</p>
            <PanelView p={{ k: 'gauge', title: 'SLA', v: 94, sub: 'letzte 30 Tage' }} a={categoryBySlug(gauge.category)!.accent} a2="#5DD6D0" />
          </div>
        </div>
        <div className="pointer-events-none absolute -right-6 -top-10 hidden w-[230px] lg:block" style={{ transform: 'translateZ(90px)' }} aria-hidden>
          <div className="sw-float sw-card p-3.5" style={{ animationDelay: '-4s' }}>
            <p className="mb-2 flex items-center gap-1.5 text-[.62rem] font-semibold text-sw-mute">
              <SwIcon name={crm.icon} size={12} /> Concierge (Beispiel)
            </p>
            <PanelView p={{ k: 'chat', title: 'Chat', msgs: [{ who: 'u', t: 'Haben Sie samstags offen?' }, { who: 'a', t: 'Ja, von 9 bis 13 Uhr. Termin buchen?' }] }} a={categoryBySlug(crm.category)!.accent} a2="#B79CFF" />
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-14 right-2 hidden w-[230px] lg:block" style={{ transform: 'translateZ(50px)' }} aria-hidden>
          <div className="sw-float sw-card p-3.5" style={{ animationDelay: '-1s' }}>
            <p className="mb-2 text-[.62rem] font-semibold text-sw-mute">Ausgaben (Beispiel)</p>
            <PanelView p={{ k: 'donut', title: 'Ausgaben', segs: [{ l: 'Personal', v: 46 }, { l: 'Software', v: 18 }, { l: 'Marketing', v: 21 }, { l: 'Sonst.', v: 15 }] }} a={categoryBySlug(donut.category)!.accent} a2="#7C9BFF" />
          </div>
        </div>
      </Tilt>

      <div className="mt-8 flex items-center justify-center gap-2 lg:mt-28 lg:justify-start" role="group" aria-label="Produktvorschau wählen">
        {STAGE.map((s, k) => {
          const sp = productBySlug(s)!;
          const sc = categoryBySlug(sp.category)!;
          return (
            <button key={s} aria-pressed={k === i} aria-label={sp.name} onClick={() => setI(k)} className={cn('flex items-center gap-2 rounded-full border px-3 py-2 text-[.8rem] font-medium transition-all', k === i ? 'border-transparent text-white shadow-lg' : 'border-sw-line bg-white text-sw-mute hover:text-sw-ink')} style={k === i ? { background: sc.accent } : undefined}>
              <SwIcon name={sp.icon} size={14} />
              <span className="hidden sm:inline">{sp.name.replace('MONVEX ', '')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Produkt-Explorer */

export function Explorer() {
  const [cat, setCat] = useState<CategorySlug>('business-software');
  const list = productsInCategory(cat);
  const [slug, setSlug] = useState(list[0].slug);
  const c = categoryBySlug(cat)!;
  const p = productBySlug(slug) ?? list[0];

  const pick = (s: CategorySlug) => {
    setCat(s);
    setSlug(productsInCategory(s)[0].slug);
  };

  return (
    <div className="mt-12">
      <div role="group" aria-label="Kategorie wählen" className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((k) => (
          <button key={k.slug} aria-pressed={k.slug === cat} onClick={() => pick(k.slug)} className={cn('flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[.9rem] font-medium transition-all', k.slug === cat ? 'border-transparent text-white shadow-lg' : 'border-sw-line bg-white text-sw-text hover:border-sw-ink/30')} style={k.slug === cat ? { background: k.accent } : undefined}>
            <SwIcon name={k.icon} size={16} />
            {k.name}
          </button>
        ))}
      </div>

      <div className="grid-cols-1 mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <ul className="grid-cols-1 grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Produkt wählen">
          {list.map((x) => (
            <li key={x.slug}>
              <button aria-pressed={x.slug === slug} onClick={() => setSlug(x.slug)} className={cn('flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300', x.slug === slug ? 'bg-white shadow-[0_14px_36px_-18px_rgba(12,16,36,.35)]' : 'border-transparent hover:bg-white/70')} style={x.slug === slug ? { borderColor: `color-mix(in srgb, ${c.accent} 40%, transparent)` } : undefined}>
                <IconTile name={x.icon} accent={c.accent} size={40} icon={20} />
                <span className="min-w-0">
                  <span className="block text-[.95rem] font-semibold text-sw-ink">{x.name.replace('MONVEX ', '')}</span>
                  <span className="block truncate text-[.8rem] text-sw-mute">{x.tagline}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <m.div key={p.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: EASE }}>
              <SoftwareMock spec={p.mock} name={p.name} accent={c.accent} accent2={c.accent2} />
              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[1.4rem] font-semibold tracking-[-0.03em]">{p.name}</h3>
                    <StatusBadge />
                  </div>
                  <p className="mt-2 text-[.98rem] leading-relaxed text-sw-mute">{p.summary}</p>
                  <ul className="grid-cols-1 mt-4 grid gap-1.5 sm:grid-cols-2">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f.t} className="flex items-start gap-2 text-[.88rem] text-sw-text">
                        <Check size={15} className="mt-0.5 shrink-0" style={{ color: c.accent }} aria-hidden />
                        {f.t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <SwButton href={swPath.product(p.slug)} style={{ ['--sw-a' as string]: c.accent, ['--sw-a2' as string]: c.accent2 } as CSSProperties}>
                    Produkt ansehen
                  </SwButton>
                  <SwButton href={requestHref('demo', p.slug)} variant="secondary" arrow={false}>
                    Demo anfragen
                  </SwButton>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Plattform-Schichten (3D) */

const LAYERS = [
  {
    id: 'apps',
    icon: 'Layers',
    t: 'Anwendungen',
    d: 'Die einzelnen MONVEX-Produkte und individuelle Lösungen. Jede Anwendung hat ihr eigenes Gesicht, nutzt aber dasselbe Fundament.',
    pills: ['CRM', 'Finance', 'AI Agent', 'Fleet', 'Money'],
    color: '#4F46FF',
  },
  {
    id: 'services',
    icon: 'KeyRound',
    t: 'Plattform-Dienste',
    d: 'Gemeinsame Bausteine: Anmeldung und Rechte, Benachrichtigungen, Suche, Dokumente, Protokoll. Einmal gebaut, überall genutzt.',
    pills: ['Anmeldung & Rechte', 'Suche', 'Benachrichtigung', 'Protokoll'],
    color: '#8B5CF6',
  },
  {
    id: 'data',
    icon: 'Database',
    t: 'Daten und Integration',
    d: 'Ein sauberes Datenmodell, Schnittstellen (REST, Webhooks), Import und Export und der Integration Hub für Ihre Bestandssysteme.',
    pills: ['REST-API', 'Webhooks', 'Import/Export', 'Integration Hub'],
    color: '#0EA5A4',
  },
  {
    id: 'ops',
    icon: 'Server',
    t: 'Betrieb',
    d: 'Hosting in Deutschland oder der EU, Backups, Monitoring und Updates. Das Betriebsmodell legen wir mit Ihnen fest.',
    pills: ['EU-Hosting', 'Backups', 'Monitoring', 'Updates'],
    color: '#FF6B4A',
  },
] as const;

export function PlatformStack() {
  const [sel, setSel] = useState(0);
  const L = LAYERS[sel];
  return (
    <div className="grid-cols-1 mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="sw-stack relative mx-auto h-[360px] w-full max-w-[460px] sm:h-[420px]" role="img" aria-label="Schematische Darstellung der vier Plattform-Schichten">
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {LAYERS.map((l, k) => {
            const on = k === sel;
            return (
              <div
                key={l.id}
                className="sw-layer absolute left-1/2 w-[230px] -translate-x-1/2 sm:w-[270px]"
                style={{ top: `${k * 74 + 10}px`, transform: `translateX(-50%) rotateX(58deg) rotateZ(-30deg) translateZ(${on ? 34 : 0}px)`, opacity: on ? 1 : 0.78 }}
              >
                <div className="aspect-square w-full rounded-[28px] border p-5" style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${l.color} ${on ? 22 : 10}%, #fff), #fff)`, borderColor: `color-mix(in srgb, ${l.color} ${on ? 55 : 25}%, transparent)`, boxShadow: on ? `0 40px 60px -30px ${l.color}` : '0 20px 30px -24px rgba(12,16,36,.4)' }}>
                  <div className="grid h-full grid-cols-4 gap-2.5">
                    {Array.from({ length: 16 }).map((_, c) => (
                      <i key={c} className="rounded-lg" style={{ background: `color-mix(in srgb, ${l.color} ${(c * 7) % 5 === 0 ? 55 : 16}%, #fff)` }} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <ul className="space-y-2" aria-label="Plattform-Schicht wählen">
          {LAYERS.map((l, k) => (
            <li key={l.id}>
              <button aria-pressed={k === sel} onClick={() => setSel(k)} onMouseEnter={() => setSel(k)} className={cn('w-full rounded-2xl border p-4 text-left transition-all duration-300', k === sel ? 'bg-white shadow-[0_18px_40px_-22px_rgba(12,16,36,.4)]' : 'border-transparent hover:bg-white/70')} style={k === sel ? { borderColor: `color-mix(in srgb, ${l.color} 45%, transparent)` } : undefined}>
                <span className="flex items-center gap-3">
                  <IconTile name={l.icon} accent={l.color} size={38} icon={19} />
                  <span className="text-[1.02rem] font-semibold text-sw-ink">{l.t}</span>
                </span>
                {k === sel && (
                  <m.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.4, ease: EASE }} className="block overflow-hidden">
                    <span className="mt-3 block text-[.92rem] leading-relaxed text-sw-mute">{L.d}</span>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {L.pills.map((x) => (
                        <span key={x} className="rounded-full px-2.5 py-1 text-[.72rem] font-medium" style={{ background: `color-mix(in srgb, ${l.color} 10%, #fff)`, color: l.color }}>
                          {x}
                        </span>
                      ))}
                    </span>
                  </m.span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-xl border border-sw-line bg-white/70 p-4 text-[.82rem] leading-relaxed text-sw-mute">
          <strong className="font-semibold text-sw-ink">Zielbild, kein Ist-Zustand:</strong> Die Schichten beschreiben die Architektur, auf die wir hinarbeiten. Was davon im einzelnen Projekt umgesetzt wird, legen wir gemeinsam fest.
        </p>
      </div>
    </div>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1.5 text-[.95rem] font-semibold text-sw-indigo">
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
