import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { Tilt } from '@/components/ui/Tilt';
import { SoftwareMock } from '@/components/software/Mock';
import { SwButton } from '@/components/software/SwButton';
import { SwIcon } from '@/components/software/icons';
import { IntegrationMap } from '@/components/software/IntegrationMap';
import { FaqList, IconTile, ProductCard, StatusBadge, SwHead } from '@/components/software/SwUi';
import { categoryBySlug, faqFor, processSteps, productBySlug, requestHref, softwareProducts, swPath } from '@/data/software';
import { SITE_URL } from '@/data/site';
import { breadcrumbSchema, faqSchema, productPageSchema, swMetadata } from '@/lib/software-seo';

type Params = { slug: string };

/** Kürzt an einer Wortgrenze auf die gewünschte Länge (Meta-Description). */
const clip = (t: string, max: number) => (t.length <= max ? t : `${t.slice(0, max - 1).replace(/\s+\S*$/, '')}…`);
export const dynamicParams = false;
export const generateStaticParams = () => softwareProducts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return swMetadata({ title: `${p.name}: Software-Konzept`, description: clip(p.summary, 158), path: swPath.product(p.slug) });
}

const anchors = [
  ['funktionen', 'Funktionen'],
  ['einsatz', 'Einsatz'],
  ['nutzen', 'Nutzen'],
  ['integration', 'Integration'],
  ['faq', 'FAQ'],
] as const;

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  const c = categoryBySlug(p.category)!;
  const path = swPath.product(p.slug);
  const faq = faqFor(p);
  const crumbs = [
    { name: 'MONVEX', path: '/' },
    { name: 'Software', path: '/software' },
    { name: c.name, path: swPath.category(c.slug) },
    { name: p.name, path },
  ];
  const related = p.related.map((s) => productBySlug(s)).filter((x): x is NonNullable<typeof x> => !!x);
  const vars = { ['--sw-a' as string]: c.accent, ['--sw-a2' as string]: c.accent2, ['--sw-g2' as string]: c.accent, ['--sw-g3' as string]: c.accent } as CSSProperties;

  return (
    <div style={vars}>
      <JsonLd data={[breadcrumbSchema(crumbs), productPageSchema(p, path), faqSchema(faq)]} />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20" style={{ background: `radial-gradient(60% 55% at 15% 5%, color-mix(in srgb, ${c.accent} 18%, transparent), transparent 70%), radial-gradient(50% 50% at 90% 15%, color-mix(in srgb, ${c.accent2} 22%, transparent), transparent 70%)` }} />
        <div className="sw-dots pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,#000_20%,transparent_100%)]" />
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[.8rem] text-sw-mute">
              {crumbs.slice(1).map((cr, i, a) => (
                <li key={cr.path} className="flex items-center gap-2">
                  {i < a.length - 1 ? (
                    <>
                      <Link href={cr.path} className="hover:text-sw-ink">{cr.name}</Link>
                      <span aria-hidden>/</span>
                    </>
                  ) : (
                    <span aria-current="page" className="font-medium text-sw-ink">{cr.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid-cols-1 grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[.8rem] font-semibold" style={{ background: `color-mix(in srgb, ${c.accent} 10%, #fff)`, color: c.accent }}>
                  <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: c.accent }}>
                    <SwIcon name={p.icon} size={13} />
                  </span>
                  {p.name}
                </span>
                <StatusBadge />
              </div>
              <h1 className="mt-6 text-[clamp(2.4rem,1.3rem+4.6vw,4.9rem)] font-semibold leading-[1] tracking-[-0.05em]">
                {p.headline[0]} <span className="sw-grad-text">{p.headline[1]}</span>
              </h1>
              <p className="mt-6 max-w-xl text-[clamp(1.05rem,.98rem+.35vw,1.22rem)] leading-relaxed text-sw-mute">{p.summary}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <SwButton href={requestHref('demo', p.slug)} size="lg">Demo anfragen</SwButton>
                <SwButton href={requestHref('beratung', p.slug)} variant="secondary" size="lg" arrow={false}>Beratung vereinbaren</SwButton>
                <SwButton href={requestHref('angebot', p.slug)} variant="ghost" size="lg" arrow={false}>Angebot erhalten</SwButton>
              </div>
              <p className="mt-6 max-w-xl rounded-xl border border-sw-line bg-white/80 p-4 text-[.84rem] leading-relaxed text-sw-mute">
                <strong className="font-semibold text-sw-ink">Konzeptstatus:</strong> {p.name} gibt es noch nicht als Live-Software. Die Vorschau rechts zeigt das Konzept mit Beispieldaten. Eine „Demo“ ist ein Konzept-Walkthrough, ohne Preise und ohne Starttermin.
              </p>
            </div>
            <Tilt max={4} glare={false}>
              <SoftwareMock spec={p.mock} name={p.name} accent={c.accent} accent2={c.accent2} />
            </Tilt>
          </div>
        </div>
      </section>

      {/* ---------- Auf einen Blick + Ankernavigation ---------- */}
      <div className="sticky top-[68px] z-40 border-y border-sw-line bg-white/85 backdrop-blur-xl">
        <nav aria-label="Auf dieser Seite" className="no-scrollbar mx-auto flex w-full max-w-[1320px] gap-1 overflow-x-auto px-5 py-2 sm:px-8">
          {anchors.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-4 py-2 text-[.88rem] font-medium text-sw-text transition-colors hover:bg-sw-soft hover:text-sw-ink">
              {label}
            </a>
          ))}
          <Link href={requestHref('beratung', p.slug)} className="ml-auto hidden shrink-0 rounded-full px-4 py-2 text-[.88rem] font-semibold sm:block" style={{ color: c.accent }}>
            Beratung vereinbaren
          </Link>
        </nav>
      </div>

      <section className="mx-auto w-full max-w-[1320px] px-5 pt-16 sm:px-8">
        <dl className="grid-cols-1 grid gap-px overflow-hidden rounded-3xl border border-sw-line bg-sw-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Kategorie', c.name],
            ['Status', 'Konzept, keine Live-Version'],
            ['Zielgruppe', p.audience.join(' · ')],
            ['Umsetzung', 'Als Auftragsentwicklung möglich'],
          ].map(([k, v]) => (
            <div key={k} className="bg-white p-6">
              <dt className="sw-eyebrow">{k}</dt>
              <dd className="mt-3 text-[1.02rem] font-semibold tracking-tight text-sw-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Funktionen ---------- */}
      <section id="funktionen" className="mx-auto w-full max-w-[1320px] scroll-mt-32 px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SwHead eyebrow="Funktionen" title={<>Was {p.name.replace('MONVEX ', '')} <span className="sw-grad-text">können soll.</span></>}>
            Der geplante Funktionsumfang des Konzepts. Er wird im Gespräch auf Ihren Bedarf zugeschnitten.
          </SwHead>
        </Reveal>
        <div className="grid-cols-1 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f, k) => (
            <Reveal key={f.t} delay={(k % 3) * 0.06}>
              <div className="sw-card sw-card-hover h-full p-6" style={{ ['--c' as string]: c.accent }}>
                <IconTile name={f.icon} accent={c.accent} />
                <h3 className="mt-5 text-[1.12rem] font-semibold tracking-[-0.02em]">{f.t}</h3>
                <p className="mt-2 text-[.93rem] leading-relaxed text-sw-mute">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Anwendungsfälle ---------- */}
      <section id="einsatz" className="scroll-mt-32 border-y border-sw-line bg-white/60 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <SwHead eyebrow="Anwendungsfälle und Zielgruppen" title={<>Wer davon <span className="sw-grad-text">profitieren soll.</span></>}>
              Beispielhafte Szenarien. Sie beschreiben, wofür das Konzept gedacht ist, nicht Erfahrungen realer Kunden.
            </SwHead>
          </Reveal>
          <div className="grid-cols-1 mt-12 grid gap-5 lg:grid-cols-3">
            {p.useCases.map((u, k) => (
              <Reveal key={u.t} delay={k * 0.07}>
                <article className="sw-card h-full p-7">
                  <p className="inline-flex rounded-full px-3 py-1 text-[.74rem] font-semibold" style={{ background: `color-mix(in srgb, ${c.accent} 10%, #fff)`, color: c.accent }}>
                    {u.who}
                  </p>
                  <h3 className="mt-5 text-[1.25rem] font-semibold leading-tight tracking-[-0.025em]">{u.t}</h3>
                  <p className="mt-3 text-[.95rem] leading-relaxed text-sw-mute">{u.d}</p>
                  <p className="mt-5 text-[.7rem] font-medium uppercase tracking-[.14em] text-sw-mute">Beispiel-Szenario</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Vorteile ---------- */}
      <section id="nutzen" className="grid-cols-1 mx-auto grid w-full max-w-[1320px] scroll-mt-32 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:py-28">
        <Reveal>
          <SwHead eyebrow="Vorteile für Unternehmen" title={<>Nutzen, auf den das Konzept <span className="sw-grad-text">zielt.</span></>}>
            Das sind Entwurfsziele, keine gemessenen Ergebnisse. Ob und wie stark sie in Ihrem Betrieb greifen, besprechen wir realistisch.
          </SwHead>
        </Reveal>
        <ol className="divide-y divide-sw-line rounded-3xl border border-sw-line bg-white">
          {p.benefits.map((b, k) => (
            <Reveal as="li" key={b.t} delay={k * 0.06} className="flex gap-5 p-6 sm:p-7">
              <span className="sw-grad-text w-10 shrink-0 text-[1.7rem] font-semibold leading-none tracking-[-0.04em]">0{k + 1}</span>
              <div>
                <h3 className="text-[1.12rem] font-semibold tracking-[-0.02em]">{b.t}</h3>
                <p className="mt-1.5 text-[.95rem] leading-relaxed text-sw-mute">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- Integration ---------- */}
      <section id="integration" className="scroll-mt-32 border-y border-sw-line bg-white/60 py-20 lg:py-28">
        <div className="grid-cols-1 mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SwHead eyebrow="Technische Integration" title={<>Verbunden mit dem, <span className="sw-grad-text">was Sie schon nutzen.</span></>}>
              Die Anbindungen sind Teil der Konzeption. Keine davon existiert bereits, jede wird projektbezogen umgesetzt.
            </SwHead>
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.integrations.map((i) => (
                <li key={i} className="inline-flex items-center gap-1.5 rounded-full border border-sw-line bg-white px-3 py-1.5 text-[.84rem] font-medium text-sw-text">
                  <Check size={14} style={{ color: c.accent }} aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="sw-card p-4 sm:p-8">
            <IntegrationMap name={p.name} icon={p.icon} accent={c.accent} items={p.integrations} />
          </div>
        </div>
      </section>

      {/* ---------- Vorgehen ---------- */}
      <section className="mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SwHead eyebrow="Der Weg" title={<>Von der Idee <span className="sw-grad-text">zur Lösung.</span></>} />
        </Reveal>
        <ol className="grid-cols-1 mt-12 grid gap-5 md:grid-cols-4">
          {processSteps.map((s, k) => (
            <Reveal as="li" key={s.t} delay={k * 0.07} className="h-full rounded-3xl border border-sw-line bg-white p-6">
              <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.05em]" style={{ color: c.accent }}>0{k + 1}</span>
              <h3 className="mt-5 text-[1.15rem] font-semibold tracking-[-0.02em]">{s.t}</h3>
              <p className="mt-2 text-[.92rem] leading-relaxed text-sw-mute">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="mx-auto w-full max-w-[980px] scroll-mt-32 px-5 pb-20 sm:px-8 lg:pb-28">
        <Reveal>
          <SwHead eyebrow="FAQ" title={`Fragen zu ${p.name.replace('MONVEX ', '')}`} />
        </Reveal>
        <div className="mt-10">
          <FaqList items={faq} accent={c.accent} />
        </div>
      </section>

      {/* ---------- Verwandt ---------- */}
      <section className="mx-auto w-full max-w-[1320px] px-5 pb-20 sm:px-8 lg:pb-28">
        <Reveal>
          <SwHead eyebrow="Passt dazu" title="Weitere Konzepte der Produktfamilie" />
        </Reveal>
        <div className="grid-cols-1 mt-10 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <ProductCard key={r.slug} p={r} />
          ))}
        </div>
        {p.relatedExisting && (
          <a href={`${SITE_URL}${p.relatedExisting.href}`} className="group mt-6 flex flex-col gap-2 rounded-2xl border border-sw-line bg-white p-6 transition hover:border-sw-ink/25 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="sw-eyebrow">Verwandtes bestehendes Produkt</span>
              <span className="mt-2 block text-[1.1rem] font-semibold tracking-tight">{p.relatedExisting.label}</span>
              <span className="mt-1 block text-[.92rem] text-sw-mute">{p.relatedExisting.note}</span>
            </span>
            <span className="inline-flex items-center gap-1 font-semibold" style={{ color: c.accent }}>
              Ansehen <ArrowUpRight size={16} aria-hidden />
            </span>
          </a>
        )}
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="relative isolate overflow-hidden rounded-[36px] bg-sw-ink px-7 py-14 text-center text-white sm:px-14 sm:py-20">
          <div aria-hidden className="absolute inset-0 -z-10 opacity-80" style={{ background: `radial-gradient(60% 80% at 15% 0%, color-mix(in srgb, ${c.accent} 60%, transparent), transparent 70%), radial-gradient(50% 70% at 95% 100%, color-mix(in srgb, ${c.accent2} 40%, transparent), transparent 70%)` }} />
          <h2 className="mx-auto max-w-3xl text-[clamp(1.9rem,1.2rem+3vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.045em] !text-white">
            Interesse an {p.name.replace('MONVEX ', '')}? Lassen Sie uns darüber sprechen.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/70">Wir sagen Ihnen offen, was es heute gibt, was Konzept ist und wie wir es für Sie umsetzen könnten.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SwButton href={requestHref('demo', p.slug)} variant="secondary" size="lg" className="!border-transparent">Demo anfragen</SwButton>
            <SwButton href={requestHref('beratung', p.slug)} variant="ghost" size="lg" arrow={false} className="!text-white hover:!bg-white/10">Beratung vereinbaren</SwButton>
            <SwButton href={requestHref('angebot', p.slug)} variant="ghost" size="lg" arrow={false} className="!text-white hover:!bg-white/10">Angebot erhalten</SwButton>
          </div>
        </div>
      </section>
    </div>
  );
}
