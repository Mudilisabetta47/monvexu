import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AgencyHero } from '@/components/agency/AgencyHero';
import { AgencyCta } from '@/components/agency/AgencyCta';
import { Block } from '@/components/agency/Sections';
import { JsonLd } from '@/components/ui/JsonLd';
import { AGENCY_BASE, agencyServices, servicePath } from '@/data/agency';
import { agencyMetadata, breadcrumbSchema, webPageSchema } from '@/lib/agency-seo';

const PATH = `${AGENCY_BASE}/leistungen`;
const TITLE = 'Leistungen der Werbeagentur MONVEX im Überblick';
const DESC =
  'Alle Leistungen der Werbeagentur MONVEX: Webdesign, Webentwicklung, SEO, Google Ads, Social Media, Branding, Print, Fahrzeugbeschriftung, E-Commerce und Betreuung.';

export const metadata: Metadata = agencyMetadata({ title: TITLE, description: DESC, path: PATH });

export default function LeistungenPage() {
  const crumbs = [
    { name: 'MONVEX', path: '/' },
    { name: 'Werbeagentur', path: AGENCY_BASE },
    { name: 'Leistungen', path: PATH },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: PATH })]} />
      <AgencyHero crumbs={crumbs} eyebrow="Leistungen" h1="Leistungen der Werbeagentur MONVEX" lead="Von der Marke über die Website bis zur laufenden Betreuung: Hier finden Sie alle Leistungen mit Details, Ablauf und häufigen Fragen." />
      <Block tone="white" className="!pt-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {agencyServices.map((s) => (
            <li key={s.slug}>
              <Link href={servicePath(s.slug)} className="group flex items-start justify-between gap-6 rounded-[22px] border border-line bg-paper p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-card">
                <span>
                  <span className="block text-[1.25rem] font-semibold tracking-tight">{s.name}</span>
                  <span className="mt-2 block leading-relaxed text-graphite">{s.short}</span>
                </span>
                <ArrowUpRight size={18} className="mt-1 shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-ember" />
              </Link>
            </li>
          ))}
        </ul>
      </Block>
      <AgencyCta headline="Welche Leistung passt zu Ihnen?" text="Erzählen Sie uns von Ihrem Vorhaben. Wir empfehlen, was wirklich sinnvoll ist – und was nicht." topic="Leistungsanfrage" />
    </>
  );
}
