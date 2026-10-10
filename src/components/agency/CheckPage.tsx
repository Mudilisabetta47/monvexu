import Link from 'next/link';
import { CalendarCheck, Check, MapPin, MessageSquare, Search, ShieldCheck, Smartphone, UserPlus, type LucideIcon } from 'lucide-react';
import { CheckForm } from '@/components/sections/CheckForm';
import type { CheckVariant } from '@/data/check';

const ICONS: Record<CheckVariant['checks'][number]['icon'], LucideIcon> = { MapPin, Smartphone, MessageSquare, UserPlus, Search, ShieldCheck, CalendarCheck };

const STEPS = [
  ['Anfordern', 'Formular ausfüllen, das dauert eine Minute.'],
  ['Wir prüfen', 'Wir schauen uns Google-Profil, Website und Kontaktweg an.'],
  ['Sie entscheiden', 'Sie erhalten drei konkrete Verbesserungen. Ob Sie mit uns arbeiten, entscheiden allein Sie.'],
];

/** Kurze Aktionsseite zum QR-Code: Nutzen oben, Formular direkt daneben, wenig Ablenkung. */
export function CheckPage({ v }: { v: CheckVariant }) {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_30%_20%,#000_30%,transparent_100%)]" />
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-ember/[.08] blur-[110px]" />
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-3">
            <span className="rounded-full bg-ember px-3 py-1.5 text-[.66rem] font-medium text-white">Kostenlos</span>
            Für {v.audience}
          </p>
          <h1 className="mt-6 text-[clamp(2.2rem,1.1rem+4vw,4.4rem)] font-semibold leading-[.98] tracking-[-0.05em]">{v.h1}</h1>
          <p className="mt-6 max-w-xl text-lead text-graphite">{v.lead}</p>

          <ul className="mt-10 space-y-5">
            {v.checks.map((c) => {
              const Icon = ICONS[c.icon];
              return (
                <li key={c.title} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink text-white">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-[1.1rem] font-semibold tracking-tight">{c.title}</span>
                    <span className="mt-0.5 block leading-snug text-graphite">{c.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 rounded-2xl border border-line bg-white p-4 text-[.92rem] text-graphite">Lieber sofort ein Ergebnis? Der <Link href="/website-check" className="link-u font-semibold text-ink">KI-Website-Check</Link> prüft Ihre Adresse automatisch in 30 Sekunden.</p>

          <ol className="mt-8 border-t border-line">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="flex gap-5 border-b border-line py-4">
                <span className="w-6 text-[1.5rem] font-semibold leading-none tracking-[-0.06em] text-ember">{i + 1}</span>
                <span>
                  <span className="block font-semibold tracking-tight">{t}</span>
                  <span className="mt-0.5 block text-[.95rem] leading-snug text-graphite">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-[32px] border border-line bg-white p-7 shadow-card sm:p-10 lg:sticky lg:top-28">
            <p className="flex items-center gap-2 font-mono text-[.68rem] uppercase tracking-[.18em] text-graphite">
              <Check size={14} className="text-ember" /> Kostenlos und unverbindlich
            </p>
            <h2 className="mb-8 mt-4 text-h3 font-semibold">Website-Check anfordern</h2>
            <CheckForm topic={v.topic} />
          </div>
        </div>
      </div>
    </section>
  );
}
