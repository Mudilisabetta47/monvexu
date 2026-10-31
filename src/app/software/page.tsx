import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { Explorer, HeroStage, PlatformStack } from '@/components/software/HomeInteractive';
import { SwButton } from '@/components/software/SwButton';
import { SwIcon } from '@/components/software/icons';
import { FaqList, IconTile, SwHead } from '@/components/software/SwUi';
import { categories, existingProducts, processSteps, productsInCategory, requestHref, softwareProducts, swPath } from '@/data/software';
import { SITE_URL } from '@/data/site';
import { breadcrumbSchema, catalogSchema, faqSchema, swMetadata, webPageSchema } from '@/lib/software-seo';

const TITLE = 'MONVEX Software: Produktwelt für Unternehmen und Privatpersonen';
const DESC = 'MONVEX Software: 18 Lösungen für Unternehmen und Privatpersonen, von CRM bis KI-Agent. Wir bereiten sie individuell für Ihr Unternehmen vor.';
export const metadata = swMetadata({ title: TITLE, description: DESC, path: '/software' });

const faq = [
  { q: 'Sind das fertige Programme, die ich sofort nutzen kann?', a: 'Nein. Wir bereiten jede Lösung individuell für Ihr Unternehmen vor und bauen sie nach Ihren Anforderungen auf. Bereits real sind MONVEX BusOS (in Entwicklung, Demo auf Anfrage) und EasyKFZ24, der digitale Zulassungsservice. Beides finden Sie auf der MONVEX-Hauptseite.' },
  { q: 'Was bedeutet „Demo anfragen“?', a: 'Wir zeigen Ihnen, wie die Lösung für Ihr Unternehmen aussehen würde, besprechen Ihren Bedarf und klären, wie wir sie umsetzen. Die Vorschauen auf dieser Seite zeigen Beispieldaten.' },
  { q: 'Zeigen die Dashboards echte Kundendaten?', a: 'Nein. Alle Vorschauen verwenden erfundene Beispieldaten und sind als „Vorschau · Beispieldaten“ beschriftet. Es gibt keine Kundenreferenzen und keine Bewertungen.' },
  { q: 'Kann MONVEX eine Software nach meinen Wünschen entwickeln?', a: 'Ja, genau das ist unser Angebot. Neben eigenen Produkten entwickeln wir individuelle Software, Portale und Schnittstellen. Schildern Sie uns Ihr Vorhaben, wir schätzen Aufwand und Vorgehen ein und machen ein Angebot.' },
  { q: 'Was kostet das?', a: 'Preis und Zeitplan hängen vom Umfang ab. Nach dem ersten Gespräch erhalten Sie ein individuelles Angebot.' },
];

const audiences = [
  { icon: 'Store', t: 'Kleine Unternehmen', d: 'Schlank starten: Kundenverwaltung, Rechnungen, Buchungen und Dokumente, ohne ein Großprojekt.', picks: ['crm', 'finance', 'booking'] },
  { icon: 'Building2', t: 'Mittelstand', d: 'Prozesse verbinden: Teams, Systeme und Lieferanten in einem durchgängigen Ablauf.', picks: ['workforce', 'workflow-automation', 'integration-hub'] },
  { icon: 'Landmark', t: 'Konzerne', d: 'Skalierbar und kontrolliert: Analytics, Integration, Service und KI mit Rechten und Protokoll.', picks: ['analytics', 'enterprise-ai', 'service-desk'] },
  { icon: 'Home', t: 'Privatpersonen', d: 'Persönlich und datensparsam: Geld, Auto, Alltag und Familie an einem Ort.', picks: ['money', 'garage', 'family'] },
];

export default function SoftwareHome() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Software', path: '/software' }];
  const total = softwareProducts.length;
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: '/software' }), catalogSchema(), faqSchema(faq)]} />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden pb-24 pt-28 sm:pt-32 lg:pb-32 lg:pt-40">
        <div className="sw-mesh pointer-events-none absolute inset-0 -z-20" />
        <div className="sw-dots pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_30%,#000_20%,transparent_100%)]" />
        <div className="grid-cols-1 mx-auto grid w-full max-w-[1320px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.12fr] lg:gap-10">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-sw-line bg-white/80 py-1.5 pl-2 pr-4 text-[.78rem] font-medium text-sw-text backdrop-blur">
              <span className="relative grid h-5 w-5 place-items-center">
                <span className="absolute inset-0 rounded-full bg-sw-indigo/30 [animation:sw-pulse_2.4s_infinite]" />
                <span className="h-2 w-2 rounded-full bg-sw-indigo" />
              </span>
              MONVEX Software · Produktwelt im Aufbau
            </p>
            <h1 className="mt-7 text-[clamp(2.7rem,1.4rem+5.4vw,5.6rem)] font-semibold leading-[.98] tracking-[-0.05em]">
              Software, die Unternehmen <span className="sw-grad-text">wirklich weiterbringt.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[clamp(1.05rem,.98rem+.4vw,1.28rem)] leading-relaxed text-sw-mute">
              {total} Lösungen in vier Kategorien, vom CRM bis zum KI-Agenten, vom Familienplaner bis zum Fuhrpark. Entwickelt in Bremen und für Ihr Unternehmen vorbereitet.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SwButton href={swPath.catalog} size="lg">
                Katalog entdecken
              </SwButton>
              <SwButton href={requestHref('beratung')} variant="secondary" size="lg" arrow={false}>
                Beratung vereinbaren
              </SwButton>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {[
                [String(total), 'Lösungen'],
                ['4', 'Kategorien'],
                ['1', 'Plattform in Entwicklung'],
                ['1', 'Produkt bereits online'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-[.74rem] leading-tight text-sw-mute">{l}</dt>
                  <dd className="order-first text-[2rem] font-semibold tracking-[-0.04em] text-sw-ink">{n}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroStage />
        </div>
      </section>

      {/* ---------- Vier Welten ---------- */}
      <section className="mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SwHead eyebrow="Produktwelt" title={<>Vier Welten. <span className="sw-grad-text">Ein Fundament.</span></>}>
            Von der Buchhaltung eines Handwerksbetriebs bis zur KI für Konzerne: Die Produkte sind als Familie gedacht, damit Daten, Rechte und Bedienung zusammenpassen.
          </SwHead>
        </Reveal>
        <div className="grid-cols-1 mt-14 grid gap-5 md:grid-cols-2">
          {categories.map((c, k) => (
            <Reveal key={c.slug} delay={k * 0.06}>
              <Link href={swPath.category(c.slug)} className="sw-card sw-card-hover group relative block h-full overflow-hidden p-7 sm:p-9" style={{ ['--c' as string]: c.accent }}>
                <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100" style={{ background: `radial-gradient(circle, color-mix(in srgb, ${c.accent} 38%, transparent), transparent 70%)` }} />
                <div className="relative flex items-start justify-between">
                  <IconTile name={c.icon} accent={c.accent} size={52} icon={26} />
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-sw-line bg-white transition-all duration-300 group-hover:border-transparent group-hover:text-white" style={{ ['--hv' as string]: c.accent }}>
                    <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" aria-hidden />
                  </span>
                </div>
                <h3 className="relative mt-7 text-[1.7rem] font-semibold tracking-[-0.035em]">{c.name}</h3>
                <p className="relative mt-3 max-w-md text-[1rem] leading-relaxed text-sw-mute">{c.tagline}</p>
                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {productsInCategory(c.slug).map((p) => (
                    <li key={p.slug} className="inline-flex items-center gap-1.5 rounded-full border border-sw-line bg-white/80 px-3 py-1.5 text-[.8rem] font-medium text-sw-text">
                      <SwIcon name={p.icon} size={13} style={{ color: c.accent }} />
                      {p.name.replace('MONVEX ', '')}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Produkt-Explorer ---------- */}
      <section id="explorer" className="relative border-y border-sw-line bg-white/60 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <SwHead eyebrow="Produkt-Explorer" title={<>Sehen Sie, <span className="sw-grad-text">wie es gedacht ist.</span></>}>
              Wählen Sie eine Kategorie und ein Produkt. Die Vorschau zeigt, wie die Lösung für Sie aussehen könnte, mit Beispieldaten, und lässt sich umschalten.
            </SwHead>
          </Reveal>
          <Explorer />
        </div>
      </section>

      {/* ---------- Plattform ---------- */}
      <section id="plattform" className="mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SwHead eyebrow="Plattform-Prinzipien" title={<>Nicht 18 Insellösungen, <span className="sw-grad-text">sondern eine Plattform.</span></>}>
            Gemeinsame Bausteine für Anmeldung, Rechte, Daten und Schnittstellen sollen dafür sorgen, dass sich Produkte miteinander verbinden lassen, statt nebeneinander zu stehen.
          </SwHead>
        </Reveal>
        <PlatformStack />
      </section>

      {/* ---------- Bereits real ---------- */}
      <section className="mx-auto w-full max-w-[1320px] px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="sw-card overflow-hidden p-7 sm:p-12">
          <div className="grid-cols-1 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="sw-eyebrow">Was es schon gibt</p>
              <h2 className="mt-4 text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.04em]">Woran wir bereits bauen.</h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-sw-mute">Neben Lösungen für Ihr Unternehmen entwickelt MONVEX zwei eigene Produkte. Sie haben eigene Seiten auf der MONVEX-Hauptseite.</p>
            </div>
            <ul className="grid-cols-1 grid gap-4 sm:grid-cols-2">
              {existingProducts.map((e) => (
                <li key={e.slug}>
                  <a href={`${SITE_URL}${e.href}`} className="group flex h-full flex-col rounded-2xl border border-sw-line bg-sw-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sw-ink/25 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(12,16,36,.35)]">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[.66rem] font-semibold uppercase tracking-[.1em] text-emerald-700">
                      <i className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                      {e.status}
                    </span>
                    <h3 className="mt-4 text-[1.2rem] font-semibold tracking-[-0.025em]">{e.name}</h3>
                    <p className="mt-2 text-[.92rem] leading-relaxed text-sw-mute">{e.text}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[.9rem] font-semibold text-sw-indigo">
                      Zur Produktseite <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Zielgruppen ---------- */}
      <section className="border-y border-sw-line bg-white/60 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <SwHead eyebrow="Für wen" title={<>Vom Einzelunternehmen <span className="sw-grad-text">bis zum Konzern.</span></>} />
          </Reveal>
          <div className="grid-cols-1 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, k) => (
              <Reveal key={a.t} delay={k * 0.06}>
                <div className="sw-card flex h-full flex-col p-6">
                  <IconTile name={a.icon} accent="#4F46FF" />
                  <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.025em]">{a.t}</h3>
                  <p className="mt-2 text-[.92rem] leading-relaxed text-sw-mute">{a.d}</p>
                  <ul className="mt-auto space-y-1.5 pt-5 text-[.88rem]">
                    {a.picks.map((s) => {
                      const p = softwareProducts.find((x) => x.slug === s)!;
                      return (
                        <li key={s}>
                          <Link href={swPath.product(s)} className="inline-flex items-center gap-1.5 font-medium text-sw-text transition-colors hover:text-sw-indigo">
                            <SwIcon name={p.icon} size={14} />
                            {p.name.replace('MONVEX ', '')}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Vorgehen ---------- */}
      <section className="mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SwHead eyebrow="So entsteht Ihre Lösung" title={<>Vom Gespräch <span className="sw-grad-text">zur Software.</span></>}>
            Ob eine Lösung aus dem Katalog oder eine ganz eigene Idee: Der Weg ist derselbe, schrittweise und mit Abnahmen.
          </SwHead>
        </Reveal>
        <ol className="grid-cols-1 mt-12 grid gap-5 md:grid-cols-4">
          {processSteps.map((s, k) => (
            <Reveal as="li" key={s.t} delay={k * 0.07} className="relative h-full rounded-3xl border border-sw-line bg-white p-6">
              <span className="sw-grad-text text-[2.6rem] font-semibold leading-none tracking-[-0.05em]">0{k + 1}</span>
              <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.025em]">{s.t}</h3>
              <p className="mt-2 text-[.92rem] leading-relaxed text-sw-mute">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto w-full max-w-[980px] px-5 pb-20 sm:px-8 lg:pb-28">
        <Reveal>
          <SwHead eyebrow="Häufige Fragen" title="Offen gefragt, offen beantwortet." />
        </Reveal>
        <div className="mt-10">
          <FaqList items={faq} />
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="relative isolate overflow-hidden rounded-[36px] bg-sw-ink px-7 py-16 text-center text-white sm:px-14 sm:py-24">
          <div aria-hidden className="absolute inset-0 -z-10 opacity-70" style={{ background: 'radial-gradient(60% 80% at 20% 0%, rgba(79,70,255,.55), transparent 70%), radial-gradient(50% 70% at 90% 100%, rgba(34,211,238,.35), transparent 70%)' }} />
          <h2 className="mx-auto max-w-3xl text-[clamp(2rem,1.2rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] !text-white">Ihre Software fehlt noch? Wir bauen sie für Ihr Unternehmen.</h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/70">Schildern Sie uns Ihr Vorhaben. Wir antworten persönlich, ehrlich und ohne Verkaufsdruck.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SwButton href={requestHref('individuell')} variant="secondary" size="lg" className="!border-transparent">
              Individuelle Lösung anfragen
            </SwButton>
            <SwButton href={requestHref('beratung')} variant="ghost" size="lg" arrow={false} className="!text-white hover:!bg-white/10">
              Beratung vereinbaren
            </SwButton>
          </div>
        </div>
      </section>
    </>
  );
}
