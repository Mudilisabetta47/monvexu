import Link from 'next/link';
import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SHOPS, niches, notIncluded, packages, priceLabel, shopFaq, shopSteps } from '@/data/shops';
import { agencyMetadata, breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/agency-seo';
import { cn } from '@/lib/cn';

const TITLE = 'Fertiger Online-Shop ab 99 €: Shopify-Shop für Ihre Branche';
const DESC = 'MONVEX baut Ihren Shopify-Shop nach Branchenvorlage auf und übergibt ihn auf Ihren Namen. Festpreis-Pakete ab 99 €, Anleitung inklusive. Shopify-Tarif extra.';
// ENTWURF: bis zur Freigabe nicht indexieren und nicht in die Sitemap aufnehmen.
export const metadata: Metadata = { ...agencyMetadata({ title: TITLE, description: DESC, path: '/shops' }), robots: { index: false, follow: false } };

export default function ShopsPage() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Shop-Start', path: '/shops' }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: '/shops' }), faqSchema(shopFaq)]} />

      <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_30%,#000_30%,transparent_100%)]" />
        <div className="shell">
          <p className="eyebrow flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-ember" /> {SHOPS.name}</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.6rem,1.2rem+6vw,6.4rem)] font-semibold leading-[.92] tracking-[-0.055em]">
            Ihr Online-Shop. <span className="serif-i text-ember">Fertig aufgebaut.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-graphite">
            Wir bauen Ihren Shopify-Shop nach der Vorlage Ihrer Branche und übergeben ihn auf Ihren Namen, mit Anleitung für die nächsten Schritte. Als Festpreis-Paket ab {packages[0].price} €.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#pakete">Pakete ansehen</Button>
            <Button href="/shops/bestellen" variant="secondary" arrow={false}>Direkt bestellen</Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[.92rem] text-graphite">
            {['Einmalzahlung für den Aufbau', 'Shop gehört Ihnen', 'Keine Vertragsbindung an MONVEX', 'Shopify-Tarif extra'].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check size={16} className="text-ember" aria-hidden /> {t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell pb-20">
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {shopSteps.map((s, k) => (
            <Reveal as="li" key={s.t} delay={k * 0.07} className="rounded-3xl border border-line bg-white p-6">
              <span className="font-mono text-eyebrow text-ember">0{k + 1}</span>
              <h2 className="mt-4 text-[1.2rem] font-semibold tracking-tight">{s.t}</h2>
              <p className="mt-2 text-[.92rem] leading-relaxed text-graphite">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="pakete" className="scroll-mt-24 border-y border-line bg-white py-20">
        <div className="shell">
          <p className="eyebrow">Pakete</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,1.2rem+3vw,3.8rem)] font-semibold leading-[.98] tracking-[-0.045em]">Wählen Sie, wie viel wir übernehmen.</h2>
          <p className="mt-4 max-w-2xl text-graphite">Alle Preise sind Einmalzahlungen für den Aufbau, inkl. MwSt. Lieferzeit-Ziel: {SHOPS.deliveryTarget} nach vollständigen Angaben.</p>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((p) => (
              <article key={p.id} className={cn('flex flex-col rounded-3xl border p-7', p.highlight ? 'border-ink bg-ink text-white' : 'border-line bg-paper')}>
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.3rem] font-semibold tracking-tight">{p.name}</h3>
                  {p.highlight && <span className="rounded-full bg-ember px-2.5 py-1 font-mono text-[.62rem] uppercase tracking-wider text-white">Unser Tipp</span>}
                </div>
                <p className={cn('mt-1 text-[.9rem]', p.highlight ? 'text-white/65' : 'text-graphite')}>{p.tagline}</p>
                <p className="mt-6 text-[2.4rem] font-semibold tracking-[-0.04em]">{priceLabel(p)}</p>
                <p className={cn('text-[.78rem]', p.highlight ? 'text-white/55' : 'text-mute')}>{p.price == null ? 'nach Gespräch' : 'einmalig, inkl. MwSt.'}</p>
                <p className={cn('mt-5 text-[.9rem] leading-relaxed', p.highlight ? 'text-white/75' : 'text-graphite')}>{p.forWho}</p>
                <ul className="mt-5 space-y-2.5 text-[.9rem]">
                  {p.includes.map((i) => (
                    <li key={i} className="flex gap-2.5"><Check size={16} className={cn('mt-0.5 shrink-0', p.highlight ? 'text-ember' : 'text-ember')} aria-hidden /> <span>{i}</span></li>
                  ))}
                </ul>
                <Link href={`/shops/bestellen?paket=${p.id}`} className={cn('mt-auto block rounded-full px-5 py-3 text-center text-[.95rem] font-medium transition-colors', p.highlight ? 'mt-8 bg-white text-ink hover:bg-ember hover:text-white' : 'mt-8 bg-ink text-white hover:bg-ember')}>
                  {p.price == null ? 'Gespräch anfragen' : `${p.name} bestellen`}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20">
        <p className="eyebrow">Branchenvorlagen</p>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,1.2rem+3vw,3.8rem)] font-semibold leading-[.98] tracking-[-0.045em]">Für welche Branche soll Ihr Shop sein?</h2>
        <p className="mt-4 max-w-2xl text-graphite">Jede Vorlage hat Struktur, Kategorien und Seitenaufbau, die zu Ihrer Branche passen. Ihre Marke, Farben und Produkte kommen dazu.</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {niches.map((n) => (
            <li key={n.id}>
              <Link href={`/shops/bestellen?nische=${n.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-4 text-[.95rem] font-medium transition-all hover:-translate-y-0.5 hover:border-ink">
                <span aria-hidden className="text-xl">{n.emoji}</span> {n.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[.9rem] text-graphite">Ihre Branche fehlt? <Link href="/shops/bestellen?nische=allgemein" className="font-medium text-ink underline underline-offset-4">Wählen Sie „Allgemeiner Shop“ und beschreiben Sie uns Ihr Vorhaben.</Link></p>
      </section>

      <section className="border-y border-line bg-white py-20">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Ehrlich vorab</p>
            <h2 className="mt-4 text-[clamp(1.8rem,1.2rem+2vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">Was nicht enthalten ist.</h2>
            <p className="mt-4 text-graphite">Damit Sie wissen, was nach der Übergabe noch auf Sie zukommt, steht es hier, nicht im Kleingedruckten.</p>
          </div>
          <ul className="divide-y divide-line rounded-3xl border border-line bg-paper">
            {notIncluded.map((n) => (
              <li key={n.t} className="flex gap-4 p-6">
                <X size={18} className="mt-1 shrink-0 text-ember" aria-hidden />
                <div>
                  <h3 className="font-semibold tracking-tight">{n.t}</h3>
                  <p className="mt-1 text-[.93rem] leading-relaxed text-graphite">{n.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell max-w-4xl py-20">
        <h2 className="text-[clamp(1.8rem,1.2rem+2vw,3rem)] font-semibold tracking-[-0.04em]">Häufige Fragen</h2>
        <div className="mt-8 divide-y divide-line rounded-3xl border border-line bg-white px-6">
          {shopFaq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-lg transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pr-10 text-[.96rem] leading-relaxed text-graphite">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl bg-ink p-8 text-white sm:flex-row sm:items-center">
          <p className="max-w-md text-[1.3rem] font-semibold leading-tight tracking-tight">Bereit für Ihren Shop? Bestellung in drei Minuten.</p>
          <Button href="/shops/bestellen" variant="light">Jetzt bestellen</Button>
        </div>
      </section>
    </>
  );
}
