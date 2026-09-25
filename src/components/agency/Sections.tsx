import Link from 'next/link';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { getService, servicePath } from '@/data/agency';
import type { Example, Faq, Problem, Solution } from '@/data/agency';
import { cn } from '@/lib/cn';

/** Sektionsrahmen mit einheitlichem Abstand. */
export function Block({ id, children, tone = 'paper', className }: { id?: string; children: ReactNode; tone?: 'paper' | 'white' | 'ink'; className?: string }) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-28', tone === 'white' && 'bg-white', tone === 'ink' && 'bg-ink text-white', className)}>
      {tone === 'white' && <div className="hairline absolute inset-x-0 top-0" />}
      <div className="shell">{children}</div>
    </section>
  );
}

export function ProblemGrid({ title, items, index = '01' }: { title: string; items: Problem[]; index?: string }) {
  return (
    <Block>
      <SectionHead index={index} label="Ausgangslage" title={title} />
      <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-2">
        {items.map((p, i) => (
          <div key={p.title} className="group bg-paper p-8 transition-colors duration-500 hover:bg-white sm:p-10">
            <p className="font-mono text-[.7rem] tracking-[.2em] text-ember-deep">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-6 text-h3 font-semibold">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-graphite">{p.text}</p>
          </div>
        ))}
      </div>
    </Block>
  );
}

export function SolutionGrid({ title, items, index = '02', intro }: { title: string; items: Solution[]; index?: string; intro?: string }) {
  return (
    <Block tone="white">
      <SectionHead index={index} label="MONVEX Lösungen" title={title}>
        {intro}
      </SectionHead>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => {
          const svc = getService(s.service);
          return (
            <Reveal key={s.title} delay={(i % 3) * 0.07}>
              <Link
                href={servicePath(s.service)}
                className="group flex h-full flex-col justify-between rounded-[24px] border border-line bg-paper p-7 shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-ink hover:text-white hover:shadow-lift"
              >
                <div>
                  <span className="inline-block rounded-full border border-line px-3 py-1 font-mono text-[.64rem] uppercase tracking-[.14em] text-graphite transition-colors group-hover:border-white/20 group-hover:text-white/70">
                    {svc?.name ?? s.service}
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-graphite transition-colors group-hover:text-white/70">{s.text}</p>
                </div>
                <span className="mt-8 flex items-center gap-2 text-[.9rem] font-medium">
                  Mehr zur Leistung
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Block>
  );
}

export function ExampleList({ title, items, index = '03', note }: { title: string; items: Example[]; index?: string; note?: string }) {
  return (
    <Block tone="ink">
      <SectionHead index={index} label="Umsetzungen" title={title} dark>
        {note ?? 'Beispielhafte Umsetzungen aus unserem Leistungsspektrum – keine Kundenreferenzen.'}
      </SectionHead>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <article className="h-full rounded-[24px] border border-white/12 bg-white/[.04] p-7 transition-colors duration-500 hover:bg-white/[.08]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ember/15 font-mono text-[.72rem] text-ember">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-[1.25rem] font-semibold tracking-tight">{e.title}</h3>
              <p className="mt-3 leading-relaxed text-white/65">{e.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Block>
  );
}

const STEPS = [
  { t: 'Erstgespräch', d: 'Wir hören zu: Ziele, Zielgruppe, Ausgangslage und Wünsche.' },
  { t: 'Konzept', d: 'Struktur, Inhalte und Design werden abgestimmt – mit klarem Angebot.' },
  { t: 'Umsetzung', d: 'Gestaltung und Entwicklung in überschaubaren Schritten mit Abnahmen.' },
  { t: 'Launch', d: 'Technischer Start, Tracking, Suchmaschinen-Anmeldung und Übergabe.' },
  { t: 'Betreuung', d: 'Wartung, Auswertung und Weiterentwicklung – auf Wunsch dauerhaft.' },
];

export function ProcessSteps({ index = '04' }: { index?: string }) {
  return (
    <Block>
      <SectionHead index={index} label="Ablauf" title={'In fünf Schritten\nzum *Ergebnis.*'} />
      <ol className="mt-14 grid gap-4 md:grid-cols-5">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.t} delay={i * 0.07}>
            <div className="relative h-full rounded-[22px] border border-line bg-white p-6 shadow-card">
              <span className="font-mono text-[.7rem] tracking-[.2em] text-ember-deep">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-[1.2rem] font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[.92rem] leading-relaxed text-graphite">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Block>
  );
}

const WHY = [
  { t: 'Marke, Technik und Marketing unter einem Dach', d: 'Design, Entwicklung und Sichtbarkeit greifen ineinander, statt bei drei Dienstleistern zu liegen.' },
  { t: 'Wir betreiben selbst digitale Marken', d: 'MONVEX führt eigene Marken wie Boundforfuture und GoKlinik. Sie erhalten Praxis statt Theorie.' },
  { t: 'Agentur mit Sitz in Bremen', d: 'Persönliche Termine im Nordwesten sind möglich; Zusammenarbeit funktioniert bundesweit digital.' },
  { t: 'Substanz statt Massenware', d: 'Keine austauschbaren Textbausteine, keine gekauften Bewertungen, keine Ranking-Versprechen.' },
];

export function WhyMonvex({ index = '05' }: { index?: string }) {
  return (
    <Block tone="white">
      <SectionHead index={index} label="Warum MONVEX" title={'Eine Agentur,\ndie *mitdenkt.*'} />
      <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
        {WHY.map((w, i) => (
          <Reveal as="li" key={w.t} delay={(i % 2) * 0.08} className="flex gap-5 border-t border-line pt-6">
            <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-white">
              <Check size={16} strokeWidth={2} />
            </span>
            <div>
              <h3 className="text-[1.15rem] font-semibold tracking-tight">{w.t}</h3>
              <p className="mt-2 leading-relaxed text-graphite">{w.d}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Block>
  );
}

/** FAQ als <details>: funktioniert ohne JavaScript, Antworten stehen vollständig im HTML. */
export function FaqList({ title = 'Häufige Fragen', items, index = '06' }: { title?: string; items: Faq[]; index?: string }) {
  return (
    <Block>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-ember">{index}</span>
            <span className="h-px w-10 bg-ink/25" />
            FAQ
          </p>
          <h2 className="mt-5 text-h3 font-semibold">{title}</h2>
        </div>
        <div className="lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="group border-t border-line py-6 last:border-b">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.1rem] font-semibold tracking-tight marker:content-none [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition-transform duration-500 group-open:rotate-45">
                  <Plus size={14} />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-graphite">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Block>
  );
}

export function Compliance({ text }: { text: string }) {
  return (
    <div className="shell">
      <aside className="rounded-[20px] border border-line bg-white p-6 text-[.92rem] leading-relaxed text-graphite">
        <p className="mb-1 font-mono text-[.64rem] uppercase tracking-[.16em] text-ember-deep">Hinweis</p>
        {text}
      </aside>
    </div>
  );
}

export type LinkGroup = { title: string; links: { label: string; href: string; hint?: string }[] };

/** Interne Verlinkung: Gruppen von Links zu Leistungen, Branchen und Regionen. */
export function RelatedLinks({ groups }: { groups: LinkGroup[] }) {
  const valid = groups.filter((g) => g.links.length > 0);
  if (valid.length === 0) return null;
  return (
    <Block tone="white">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {valid.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="eyebrow">{g.title}</h2>
            <ul className="mt-5 space-y-2.5">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-baseline justify-between gap-4 border-b border-line py-2.5 transition-colors hover:border-ink">
                    <span className="font-medium tracking-tight">{l.label}</span>
                    {l.hint && <span className="hidden text-[.8rem] text-mute sm:inline">{l.hint}</span>}
                    <ArrowUpRight size={15} className="shrink-0 text-mute transition-transform duration-500 group-hover:rotate-45 group-hover:text-ember" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </Block>
  );
}
