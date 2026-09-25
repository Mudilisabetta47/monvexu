import type { Metadata } from 'next';
import Link from 'next/link';
import { AgencyHero } from '@/components/agency/AgencyHero';
import { AgencyCta } from '@/components/agency/AgencyCta';
import { Block } from '@/components/agency/Sections';
import { IndustryCard } from '@/components/agency/Cards';
import { JsonLd } from '@/components/ui/JsonLd';
import { AGENCY_BASE, industries, industryPath, industryPipeline, publishedRegions } from '@/data/agency';
import { agencyMetadata, breadcrumbSchema, webPageSchema } from '@/lib/agency-seo';

const PATH = `${AGENCY_BASE}/branchen`;
const TITLE = 'Branchen: Werbeagentur für Fahrschulen, Anwälte, Praxen & mehr';
const DESC =
  'Branchenlösungen der Werbeagentur MONVEX: Fahrschulen, Anwälte und Kanzleien, Ärzte, Immobilien, Handwerk, Gastronomie, Hotels, Bus und Online-Shops.';

export const metadata: Metadata = agencyMetadata({ title: TITLE, description: DESC, path: PATH });

export default function BranchenPage() {
  const crumbs = [
    { name: 'MONVEX', path: '/' },
    { name: 'Werbeagentur', path: AGENCY_BASE },
    { name: 'Branchen', path: PATH },
  ];
  const groups = Array.from(new Set(industries.map((i) => i.group)));
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: PATH })]} />
      <AgencyHero
        crumbs={crumbs}
        eyebrow="Branchen"
        h1="Werbeagentur für Ihre Branche"
        lead="Ein Anwalt braucht einen anderen Auftritt als eine Fahrschule, ein Handwerker andere Kunden als ein Hotel. Unsere Branchenseiten zeigen, worauf es jeweils ankommt – mit eigenen Inhalten statt Textbausteinen."
      />
      {groups.map((g, gi) => (
        <Block key={g} tone={gi % 2 === 0 ? 'white' : 'paper'} className="!py-16">
          <h2 className="eyebrow border-b border-line pb-4">{g}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industries
              .filter((i) => i.group === g)
              .map((ind, i) => (
                <div key={ind.slug}>
                  <IndustryCard industry={ind} href={industryPath(ind)} i={i} />
                  {(ind.subpages?.length || publishedRegions(ind).length > 0) && (
                    <p className="mt-3 px-2 text-[.8rem] leading-relaxed text-graphite">
                      {ind.subpages?.length ? `${ind.subpages.map((s) => s.name).join(', ')}. ` : ''}
                      {publishedRegions(ind).length > 0 ? `Mit ${publishedRegions(ind).length} Regionalseiten.` : ''}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </Block>
      ))}
      <Block>
        <h2 className="eyebrow">In Vorbereitung</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-graphite">
          Diese Branchen sind geplant. Wir veröffentlichen eine Branchenseite erst, wenn sie eigenen, nützlichen Inhalt hat – nicht auf Vorrat. Wenn Ihre Branche dabei ist, sprechen Sie uns direkt an, wir beraten Sie auch ohne eigene Seite.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {industryPipeline.map((n) => (
            <li key={n} className="rounded-full border border-dashed border-ink/25 px-4 py-2 text-[.85rem] text-graphite">
              {n}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[.9rem] text-graphite">
          Zurück zur <Link href={AGENCY_BASE} className="link-u text-ink">Werbeagentur-Übersicht</Link>.
        </p>
      </Block>
      <AgencyCta headline="Ihre Branche ist nicht dabei?" text="Kein Problem – schildern Sie uns Ihr Geschäft. Wir sagen Ihnen ehrlich, wo wir helfen können." topic="Branchenanfrage" />
    </>
  );
}
