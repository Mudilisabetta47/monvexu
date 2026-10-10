'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Check, CircleAlert, Minus, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { legal } from '@/data/site';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { AiResult, CheckResponse, Finding, Report, Status } from '@/lib/site-check/types';

const STEPS = ['Seite wird geladen …', 'Technik und Tempo werden geprüft …', 'Suchmaschinen-Signale werden gelesen …', 'Vertrauen und Kontaktwege werden bewertet …', 'Die KI wertet aus …'];

const tone = (n: number) => (n >= 80 ? { c: '#1FA971', t: 'Stark' } : n >= 60 ? { c: '#E0A100', t: 'Solide, mit Potenzial' } : n >= 40 ? { c: '#FF4A1C', t: 'Deutlicher Handlungsbedarf' } : { c: '#D6361A', t: 'Dringend verbessern' });

function Ring({ value, size = 168 }: { value: number; size?: number }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const { c } = tone(value);
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(11,11,13,.09)" strokeWidth="10" />
        <m.circle cx="80" cy="80" r={r} fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: circ * (1 - value / 100) }} transition={{ duration: 1.6, ease: EASE }} />
      </svg>
      <div className="text-center">
        <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="block text-[3.2rem] font-semibold leading-none tracking-[-0.06em]">
          {value}
        </m.span>
        <span className="mt-1 block font-mono text-[.62rem] uppercase tracking-[.18em] text-graphite">von 100</span>
      </div>
    </div>
  );
}

const StatusIcon = ({ s }: { s: Status }) =>
  s === 'ok' ? (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1FA971]/15 text-[#12805A]"><Check size={14} strokeWidth={2.4} /></span>
  ) : s === 'warn' ? (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E0A100]/18 text-[#9A7000]"><Minus size={14} strokeWidth={2.6} /></span>
  ) : (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ember/15 text-ember-deep"><CircleAlert size={14} strokeWidth={2.2} /></span>
  );

function FindingRow({ f }: { f: Finding }) {
  return (
    <li className="flex gap-3 border-t border-line py-4 first:border-t-0">
      <StatusIcon s={f.status} />
      <div>
        <p className="font-semibold tracking-tight">{f.label}</p>
        <p className="mt-0.5 text-[.92rem] leading-snug text-graphite">{f.detail}</p>
        {f.tip && <p className="mt-1.5 text-[.88rem] leading-snug text-ink"><span className="font-semibold text-ember-deep">Empfehlung: </span>{f.tip}</p>}
      </div>
    </li>
  );
}

function AiCard({ ai }: { ai: AiResult }) {
  return (
    <m.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.25 }} className="relative overflow-hidden rounded-[32px] bg-ink p-7 text-white shadow-lift sm:p-10">
      <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ember/35 blur-[90px]" />
      <div className="relative">
        <p className="flex items-center gap-2 font-mono text-[.66rem] uppercase tracking-[.2em] text-white/60"><Sparkles size={14} className="text-ember" /> KI-Einschätzung</p>
        <p className="mt-5 text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.03em]">{ai.summary}</p>
        {ai.firstImpression && <p className="mt-4 max-w-2xl text-[.98rem] leading-relaxed text-white/70"><span className="font-semibold text-white">Erster Eindruck: </span>{ai.firstImpression}</p>}
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {ai.improvements.map((i, k) => (
            <li key={i.title} className="rounded-[22px] border border-white/12 bg-white/[.05] p-5">
              <span className="font-mono text-[.66rem] tracking-[.2em] text-ember">0{k + 1}</span>
              <p className="mt-3 text-[1.05rem] font-semibold leading-tight tracking-tight">{i.title}</p>
              {i.why && <p className="mt-2 text-[.88rem] leading-snug text-white/65">{i.why}</p>}
              <p className="mt-3 text-[.9rem] leading-snug text-white/90"><span className="font-semibold text-ember">So geht’s: </span>{i.how}</p>
            </li>
          ))}
        </ol>
      </div>
    </m.section>
  );
}

export function SiteCheckTool() {
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [step, setStep] = useState(0);
  const [err, setErr] = useState('');
  const [res, setRes] = useState<{ report: Report; ai: AiResult | null; aiConfigured: boolean } | null>(null);
  const out = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== 'loading') return;
    setStep(0);
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 2600);
    return () => clearInterval(t);
  }, [phase]);

  async function run(e: FormEvent) {
    e.preventDefault();
    if (phase === 'loading') return;
    if (!url.trim()) {
      setErr('Bitte geben Sie die Adresse Ihrer Website ein.');
      setPhase('error');
      return;
    }
    setPhase('loading');
    setErr('');
    try {
      const r = await fetch('/api/website-check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
      const j = (await r.json()) as CheckResponse;
      if (!j.ok) {
        setErr(j.message);
        setPhase('error');
        return;
      }
      setRes({ report: j.report, ai: j.ai, aiConfigured: j.aiConfigured });
      setPhase('done');
      setTimeout(() => out.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    } catch {
      setErr('Keine Verbindung. Bitte versuchen Sie es erneut.');
      setPhase('error');
    }
  }

  const rep = res?.report;
  const problems = rep?.findings.filter((f) => f.status !== 'ok') ?? [];
  const goods = rep?.findings.filter((f) => f.status === 'ok') ?? [];
  const phone = legal.phone;

  return (
    <div>
      <form onSubmit={run} noValidate className="relative mx-auto max-w-3xl">
        <label htmlFor="sc-url" className="sr-only">Adresse Ihrer Website</label>
        <div className={cn('flex items-center gap-2 rounded-full border bg-white p-2 pl-6 shadow-card transition-colors', phase === 'error' ? 'border-ember' : 'border-line focus-within:border-ink')}>
          <input id="sc-url" name="url" type="text" inputMode="url" autoComplete="url" spellCheck={false} placeholder="www.ihre-website.de" value={url} onChange={(e) => setUrl(e.target.value)} disabled={phase === 'loading'} aria-invalid={phase === 'error'} aria-describedby={phase === 'error' ? 'sc-err' : undefined} className="min-w-0 flex-1 bg-transparent py-3 text-[1.05rem] outline-none placeholder:text-mute" />
          <Button type="submit" disabled={phase === 'loading'} magnetic={false}>{phase === 'loading' ? 'Wird geprüft …' : 'Jetzt prüfen'}</Button>
        </div>
        {phase === 'error' && <p id="sc-err" role="alert" className="mt-3 px-6 text-[.92rem] text-ember-deep">{err}</p>}
        <p className="mt-4 px-2 text-center text-[.82rem] leading-snug text-mute">Kostenlos, ohne Anmeldung. Wir rufen nur Ihre öffentliche Startseite ab. Die Auswertung ist eine automatische Momentaufnahme.</p>
      </form>

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <m.div key="load" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto mt-14 max-w-xl" role="status" aria-live="polite">
            <div className="flex items-center gap-4">
              <span className="relative grid h-14 w-14 place-items-center">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ember/30" />
                <span className="relative h-5 w-5 rounded-full bg-ember" />
              </span>
              <AnimatePresence mode="wait">
                <m.p key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="text-[1.1rem] font-medium tracking-tight">{STEPS[step]}</m.p>
              </AnimatePresence>
            </div>
            <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-ink/10"><m.span className="block h-full rounded-full bg-ember" initial={{ width: '4%' }} animate={{ width: `${12 + step * 22}%` }} transition={{ duration: 1.2, ease: EASE }} /></div>
          </m.div>
        )}
      </AnimatePresence>

      {phase === 'done' && rep && res && (
        <div ref={out} className="mt-16 scroll-mt-28 space-y-6">
          <m.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="grid gap-8 rounded-[32px] border border-line bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
            <div className="flex flex-col items-center gap-4"><Ring value={rep.score} /><p className="rounded-full px-4 py-1.5 text-[.82rem] font-semibold text-white" style={{ background: tone(rep.score).c }}>{tone(rep.score).t}</p></div>
            <div>
              <p className="eyebrow">Ergebnis für</p>
              <h2 className="mt-2 break-all text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)] font-semibold leading-tight tracking-[-0.04em]">{rep.host}</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {rep.categories.map((c) => (
                  <li key={c.id}>
                    <p className="flex items-baseline justify-between text-[.92rem]"><span className="font-medium">{c.label}</span><span className="font-mono text-[.78rem] text-graphite">{c.score}</span></p>
                    <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-ink/[.08]"><m.span className="block h-full rounded-full" style={{ background: tone(c.score).c }} initial={{ width: 0 }} animate={{ width: `${c.score}%` }} transition={{ duration: 1.3, ease: EASE, delay: 0.2 }} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </m.section>

          {res.ai ? (
            <AiCard ai={res.ai} />
          ) : (
            res.aiConfigured && <p className="rounded-2xl border border-line bg-white p-5 text-[.92rem] text-graphite">Die KI-Einschätzung ist gerade nicht verfügbar. Die automatische Analyse unten ist vollständig.</p>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[28px] border border-line bg-white p-7 sm:p-8">
              <h3 className="flex items-center gap-2 text-h3 font-semibold">Zu verbessern <span className="rounded-full bg-ember/12 px-2.5 py-1 font-mono text-[.7rem] text-ember-deep">{problems.length}</span></h3>
              <ul className="mt-4">{problems.length ? problems.map((f) => <FindingRow key={f.id} f={f} />) : <li className="py-4 text-graphite">Hier gibt es nichts zu beanstanden. Stark!</li>}</ul>
            </section>
            <section className="rounded-[28px] border border-line bg-white p-7 sm:p-8">
              <h3 className="flex items-center gap-2 text-h3 font-semibold">Läuft gut <span className="rounded-full bg-[#1FA971]/14 px-2.5 py-1 font-mono text-[.7rem] text-[#12805A]">{goods.length}</span></h3>
              <ul className="mt-4">{goods.length ? goods.map((f) => <FindingRow key={f.id} f={f} />) : <li className="py-4 text-graphite">Noch keine erfüllten Punkte.</li>}</ul>
            </section>
          </div>

          <section className="grid gap-6 rounded-[32px] bg-paper p-7 ring-1 ring-line sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h3 className="text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)] font-semibold leading-[1] tracking-[-0.045em]">Wollen Sie das <span className="serif-i text-ember">gemeinsam</span> durchgehen?</h3>
              <p className="mt-4 max-w-xl leading-relaxed text-graphite">Ein automatischer Check sieht nur, was von außen messbar ist. In einem persönlichen Gespräch ordnen wir die Ergebnisse ein und zeigen, was für Ihr Geschäft zuerst zählt. Kostenlos und unverbindlich.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button href={`/check?url=${encodeURIComponent(rep.finalUrl)}`}>Persönlichen Check anfordern</Button>
              {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-[.95rem] text-graphite hover:text-ink"><Phone size={15} /> oder anrufen: <span className="font-semibold text-ink">{phone}</span></a>}
            </div>
          </section>

          <p className="flex items-start gap-2 px-2 text-[.8rem] leading-snug text-mute"><ShieldCheck size={15} className="mt-0.5 shrink-0" /> Der Check ist eine automatische Momentaufnahme Ihrer Startseite und ersetzt keine Beratung. Die KI kann Fehler machen. Nutzen Sie ihre Hinweise als Orientierung. Geprüft am {new Date(rep.checkedAt).toLocaleDateString('de-DE')}.</p>
        </div>
      )}
    </div>
  );
}
