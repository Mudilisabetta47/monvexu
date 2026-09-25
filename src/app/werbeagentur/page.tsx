import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AgencyHero } from '@/components/agency/AgencyHero';
import { AgencyCta } from '@/components/agency/AgencyCta';
import { Block, FaqList, ProcessSteps, WhyMonvex } from '@/components/agency/Sections';
import { IndustryCard } from '@/components/agency/Cards';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { AGENCY_BASE, agencyServices, industries, industryPath, industryPipeline, serviceCatalog, servicePath } from '@/data/agency';
import { categoryLabel } from '@/data/agency/services';
import type { ServiceCategory } from '@/data/agency';
import { agencyMetadata, breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from '@/lib/agency-seo';

const PATH = AGENCY_BASE;
const TITLE = 'Werbeagentur Bremen: Webdesign, SEO, Branding & Ads';
const DESC =
  'MONVEX ist Full-Service-Werbeagentur aus Bremen: Webdesign, SEO, Google Ads, Social Media, Branding, Print, Fahrzeugbeschriftung und individuelle Webanwendungen.';

export const metadata: Metadata = agencyMetadata({ title: TITLE, description: DESC, path: PATH });

const FAQ = [
  { q: 'Was macht MONVEX als Werbeagentur?', a: 'Wir verbinden Markenentwicklung, Design, Webentwicklung und Marketing: von Logo und Corporate Design über Website, SEO und Google Ads bis zu Print, Fahrzeugbeschriftung und individuellen Webanwendungen wie Buchungs- und CRM-Systemen.' },
  { q: 'Für welche Unternehmen arbeiten Sie?', a: 'Für Betriebe, Praxen, Kanzleien, Fahrschulen, Gastronomie, Handwerk und viele weitere Branchen. Unsere Branchenseiten zeigen, welche Themen jeweils wichtig sind.' },
  { q: 'Arbeiten Sie nur in Bremen?', a: 'Nein. MONVEX sitzt in Bremen, arbeitet aber bundesweit. Persönliche Termine sind vor allem im Nordwesten möglich, alles andere läuft digital.' },
  { q: 'Was kostet die Zusammenarbeit?', a: 'Das hängt stark von Umfang und Zielen ab. Nach einem Erstgespräch erhalten Sie ein transparentes Angebot, bei größeren Projekten in Etappen, damit Sie das Budget im Griff behalten.' },
  { q: 'Garantieren Sie Rankings oder Anfragen?', a: 'Nein, und wir misstrauen jedem, der das tut. Wir garantieren saubere Arbeit, klare Priorisierung und transparente Auswertung.' },
];

export default function WerbeagenturPage() {
  const cats = Object.keys(categoryLabel) as ServiceCategory[];
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Werbeagentur', path: PATH }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: PATH }), serviceSchema({ name: 'Werbeagentur', description: DESC, path: PATH, serviceType: 'Werbeagentur' }), faqSchema(FAQ)]} />
      <AgencyHero
        crumbs={crumbs}
        eyebrow="Full-Service-Werbeagentur · Bremen"
        h1="Werbeagentur MONVEX: Marke, Web und Marketing aus einer Hand"
        lead="Wir entwickeln Marken, bauen Websites und Webanwendungen und sorgen dafür, dass Ihr Unternehmen gefunden wird. Modern, persönlich und mit dem Anspruch, dass am Ende Anfragen stehen – nicht nur schöne Bilder."
        chips={['Webdesign', 'SEO', 'Google Ads', 'Social Media', 'Branding', 'Print', 'Fahrzeugbeschriftung', 'Webanwendungen']}
        secondary={{ label: 'Leistungen ansehen', href: '#leistungen' }}
      />

      <Block id="leistungen" tone="white">
        <SectionHead index="01" label="Leistungen" title={'Alles, was Ihre Marke\n*sichtbar* macht.'}>
          Fünf Bereiche, ein Ansprechpartner. Jede Leistung hat eine eigene Seite mit Details, Ablauf und Fragen.
        </SectionHead>
        <div className="mt-14 space-y-14">
          {cats.map((cat) => {
            const list = agencyServices.filter((s) => s.category === cat);
            if (!list.length) return null;
            return (
              <div key={cat}>
                <h3 className="eyebrow border-b border-line pb-4">{categoryLabel[cat]}</h3>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                      <Link href={servicePath(s.slug)} className="group flex h-full flex-col justify-between rounded-[22px] border border-line bg-paper p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-ink hover:text-white hover:shadow-lift">
                        <div>
                          <h4 className="text-[1.3rem] font-semibold tracking-tight">{s.name}</h4>
                          <p className="mt-2 leading-relaxed text-graphite transition-colors group-hover:text-white/70">{s.short}</p>
                        </div>
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {s.covers.map((c) => (
                            <li key={c} className="rounded-full border border-line px-2.5 py-1 text-[.72rem] text-graphite transition-colors group-hover:border-white/20 group-hover:text-white/70">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-12 max-w-3xl text-[.95rem] leading-relaxed text-graphite">
          Im Überblick: {serviceCatalog.map((c) => c.name).join(', ')}.
        </p>
      </Block>

      <Block id="branchen">
        <SectionHead index="02" label="Branchen" title={'Wir kennen Ihre\n*Branche.*'} aside={<Link href={`${PATH}/branchen`} className="link-u inline-flex items-center gap-2 font-medium">Alle Branchen ansehen <ArrowUpRight size={16} /></Link>}>
          Jede Branche hat andere Kunden, andere Suchen und andere Regeln. Deshalb gibt es Branchenseiten mit eigenen Inhalten statt Standardtext.
        </SectionHead>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <IndustryCard key={ind.slug} industry={ind} href={industryPath(ind)} i={i} />
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-[.9rem] leading-relaxed text-graphite">
          Weitere Branchen sind in Vorbereitung ({industryPipeline.slice(0, 8).join(', ')} u. a.). Eigene Seiten gibt es erst, wenn wir dazu etwas Eigenes zu sagen haben – bis dahin sprechen Sie uns gern direkt an.
        </p>
      </Block>

      <ProcessSteps index="03" />
      <WhyMonvex index="04" />
      <FaqList items={FAQ} index="05" />
      <AgencyCta headline="Sprechen wir über Ihr Vorhaben." text="Schildern Sie uns kurz, was Sie vorhaben. Wir melden uns mit einer ersten Einschätzung und einem Vorschlag für die nächsten Schritte." topic="Werbeagentur" />
    </>
  );
}
