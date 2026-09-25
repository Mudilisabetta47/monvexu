import { Check } from 'lucide-react';
import { AgencyHero } from './AgencyHero';
import { AgencyCta } from './AgencyCta';
import { Compliance, ExampleList, FaqList, ProblemGrid, ProcessSteps, RelatedLinks, SolutionGrid, WhyMonvex } from './Sections';
import { RegionGrid, SubIndustryGrid } from './Cards';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  AGENCY_BASE,
  findPublishedIndustry,
  industryPath,
  publishedRegions,
  servicePath,
  getService,
  subPath,
  type Industry,
} from '@/data/agency';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/agency-seo';

/** Branchen- bzw. Unterbranchenseite. `parent` gesetzt = Unterbranche (z. B. Steuerberater). */
export function IndustryPage({ industry, parent }: { industry: Industry; parent?: Industry }) {
  const path = parent ? subPath(parent, industry) : industryPath(industry);
  const crumbs = [
    { name: 'MONVEX', path: '/' },
    { name: 'Werbeagentur', path: AGENCY_BASE },
    { name: 'Branchen', path: `${AGENCY_BASE}/branchen` },
    ...(parent ? [{ name: parent.name, path: industryPath(parent) }] : []),
    { name: industry.name, path },
  ];
  const regions = parent ? [] : publishedRegions(industry);
  const usedServices = Array.from(new Set(industry.solutions.map((s) => s.service)));
  const related = industry.related
    .map((slug) => findPublishedIndustry(slug))
    .filter((f): f is NonNullable<typeof f> => !!f && f.path !== path);
  const siblings = parent ? (parent.subpages ?? []).filter((s) => s.slug !== industry.slug) : [];
  const hasSubs = !parent && !!industry.subpages?.length;

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema({ name: `Werbeagentur für ${industry.name}`, description: industry.seo.description, path, serviceType: `Werbeagentur für ${industry.name}` }), faqSchema(industry.faq)]} />
      <AgencyHero
        crumbs={crumbs}
        eyebrow={industry.eyebrow}
        h1={industry.h1}
        lead={industry.lead}
        chips={industry.segments}
        secondary={{ label: 'Lösungen ansehen', href: '#loesungen' }}
        aside={
          <div className="rounded-[28px] bg-ink p-7 text-white shadow-lift">
            <p className="font-mono text-[.66rem] uppercase tracking-[.18em] text-white/50">Was wir für {industry.name} umsetzen</p>
            <ul className="mt-5 space-y-3">
              {industry.solutions.slice(0, 5).map((s) => (
                <li key={s.title} className="flex gap-3 text-[.95rem] leading-snug text-white/85">
                  <Check size={17} className="mt-0.5 shrink-0 text-ember" />
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <ProblemGrid title={`Was ${industry.name}\nonline *ausbremst.*`} items={industry.problems} />
      <div id="loesungen" />
      <SolutionGrid title={`Was MONVEX für\n${industry.name} *umsetzt.*`} items={industry.solutions} />
      <ExampleList title={'Typische\n*Umsetzungen.*'} items={industry.examples} />
      {industry.compliance && (
        <div className="py-10">
          <Compliance text={industry.compliance} />
        </div>
      )}
      {hasSubs && <SubIndustryGrid parent={industry} />}
      <ProcessSteps index="04" />
      <WhyMonvex index="05" />
      <RegionGrid industry={industry} regions={regions} index="06" />
      <FaqList items={industry.faq} index={regions.length ? '07' : '06'} />
      <RelatedLinks
        groups={[
          { title: 'Passende Leistungen', links: usedServices.map((s) => ({ label: getService(s)?.name ?? s, href: servicePath(s) })) },
          { title: 'Verwandte Branchen', links: [...related.map((f) => ({ label: f.industry.name, href: f.path })), ...siblings.map((s) => ({ label: s.name, href: subPath(parent!, s) }))] },
          { title: 'Mehr zu MONVEX', links: [...(parent ? [{ label: parent.name, href: industryPath(parent) }] : []), { label: 'Werbeagentur-Übersicht', href: AGENCY_BASE }, { label: 'Alle Branchen', href: `${AGENCY_BASE}/branchen` }] },
        ]}
      />
      <AgencyCta headline={industry.cta.headline} text={industry.cta.text} topic={`Werbeagentur für ${industry.name}`} />
    </>
  );
}
