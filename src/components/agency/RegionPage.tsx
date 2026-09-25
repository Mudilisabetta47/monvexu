import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgencyHero } from './AgencyHero';
import { AgencyCta } from './AgencyCta';
import { Block, FaqList, RelatedLinks } from './Sections';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  AGENCY_BASE,
  flatIndustries,
  getRegion,
  getService,
  industryPath,
  publishedRegions,
  regionPath,
  servicePath,
  type Industry,
  type Region,
  type RegionNote,
} from '@/data/agency';
import { breadcrumbSchema, faqSchema, localBusinessSchema, serviceSchema } from '@/lib/agency-seo';

/** Stabile, regionsabhängige Auswahl einer Branchen-FAQ, damit nicht jede Regionalseite dieselbe Frage zeigt. */
function pickFaqs(industry: Industry, region: Region) {
  const n = industry.faq.length;
  let h = 0;
  for (const c of region.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const a = h % n;
  return [industry.faq[a]];
}

/** Regionalseite: individueller Text pro Branche × Region (RegionNote), ergänzt um datengetriebene Links. */
export function RegionPage({ industry, region, note }: { industry: Industry; region: Region; note: RegionNote }) {
  const path = regionPath(industry, region);
  const state = region.state ? getRegion(region.state) : undefined;
  const label = region.kind === 'city' ? 'Stadt' : 'Bundesland';
  const crumbs = [
    { name: 'MONVEX', path: '/' },
    { name: 'Werbeagentur', path: AGENCY_BASE },
    { name: 'Branchen', path: `${AGENCY_BASE}/branchen` },
    { name: industry.name, path: industryPath(industry) },
    { name: region.name, path },
  ];
  const faqs = [note.faq, ...pickFaqs(industry, region)];
  const published = publishedRegions(industry);
  const neighborLinks = published
    .filter((p) => region.neighbors.includes(p.region.slug) || (state && p.region.slug === state.slug))
    .filter((p) => p.region.slug !== region.slug)
    .map((p) => ({ label: `${industry.name} in ${p.region.name}`, href: regionPath(industry, p.region), hint: p.region.kind === 'city' ? 'Stadt' : 'Bundesland' }));
  const cityLinks = region.kind === 'state'
    ? published.filter((p) => p.region.kind === 'city' && p.region.state === region.slug).map((p) => ({ label: `${industry.name} in ${p.region.name}`, href: regionPath(industry, p.region), hint: 'Stadt' }))
    : [];
  // Dieselbe Region bei anderen Branchen: nur wenn dort wirklich eine Seite existiert.
  const otherIndustries = flatIndustries()
    .filter((f) => !f.parent && f.industry.slug !== industry.slug)
    .flatMap((f) => publishedRegions(f.industry).filter((p) => p.region.slug === region.slug).map(() => ({ label: `${f.industry.name} in ${region.name}`, href: regionPath(f.industry, region), hint: f.industry.group })));
  const usedServices = Array.from(new Set(industry.solutions.map((s) => s.service)));
  const isBremen = region.slug === 'bremen';
  const owner = industry.slug === 'fahrschulen' ? 'eine Fahrschule' : industry.slug === 'anwaelte' ? 'eine Kanzlei' : `ein Unternehmen aus der Branche ${industry.name}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: `Werbeagentur für ${industry.name} in ${region.name}`, description: note.metaDescription, path, areaServed: region.name, serviceType: `Werbeagentur für ${industry.name}` }),
          faqSchema(faqs),
          ...(isBremen ? [localBusinessSchema(path)] : []),
        ]}
      />
      <AgencyHero
        crumbs={crumbs}
        eyebrow={`${industry.eyebrow} · ${label} ${region.name}`}
        h1={`Werbeagentur für ${industry.name} in ${region.name}`}
        lead={note.intro}
        chips={region.places.slice(0, 6)}
        secondary={{ label: `Alle Infos für ${industry.name}`, href: industryPath(industry) }}
        aside={
          <div className="rounded-[28px] bg-ink p-7 text-white shadow-lift">
            <p className="flex items-center gap-2 font-mono text-[.66rem] uppercase tracking-[.18em] text-white/50">
              <MapPin size={14} /> {region.name}
            </p>
            <p className="mt-4 text-[1.4rem] font-semibold leading-tight tracking-tight">{industry.name} in {region.name} sichtbar machen.</p>
            <p className="mt-3 text-[.92rem] leading-relaxed text-white/65">Website, lokale Suche, Anzeigen und Auftritt – abgestimmt auf Ihren Markt vor Ort.</p>
          </div>
        }
      />

      <Block tone="white">
        <SectionHead index="01" label="Vor Ort" title={`Was ${industry.name}\nin *${region.name}* beschäftigt`} />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {note.angles.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <article className="h-full rounded-[26px] border border-line bg-paper p-8 shadow-card">
                <span className="font-mono text-[.7rem] tracking-[.2em] text-ember-deep">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-h3 font-semibold">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-graphite">{a.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 rounded-[24px] border border-line bg-paper p-8">
          <h3 className="eyebrow">Typische Einzugsgebiete in {region.name}</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {region.places.map((p) => (
              <li key={p} className="rounded-full border border-line bg-white px-4 py-2 text-[.88rem] text-graphite">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Block>

 {note.firstStep && (
        <Block>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow flex items-center gap-3">
                <span className="text-ember">02</span>
                <span className="h-px w-10 bg-ink/25" />
                Erster Schritt
              </p>
              <h2 className="mt-5 text-h3 font-semibold">So würden wir in {region.name} starten</h2>
            </div>
            <Reveal className="lg:col-span-8">
              <p className="text-lead text-graphite">{note.firstStep}</p>
            </Reveal>
          </div>
        </Block>
      )}

      <Block tone="white">
        <SectionHead index="03" label="Leistungen" title={`Was wir für ${industry.name}\nin *${region.name}* tun`} />
        <ul className="mt-10 flex flex-wrap gap-2">
          {usedServices.map((sv) => (
            <li key={sv}>
              <Link href={servicePath(sv)} className="inline-block rounded-full border border-line bg-white px-5 py-3 text-[.95rem] font-medium transition-all duration-500 hover:border-ink hover:bg-ink hover:text-white">
                {getService(sv)?.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[.95rem] text-graphite">
          Probleme, Lösungen und Umsetzungen im Detail: <Link href={industryPath(industry)} className="link-u font-medium text-ink">Werbeagentur für {industry.name}</Link>.
        </p>
      </Block>

      <FaqList title={`Fragen aus ${region.name}`} items={faqs} index="04" />
      <RelatedLinks
        groups={[
          { title: 'Benachbarte Regionen', links: [...cityLinks, ...neighborLinks] },
          { title: `${region.name} bei anderen Branchen`, links: otherIndustries },
          { title: 'Weiterführend', links: [{ label: `Werbeagentur für ${industry.name}`, href: industryPath(industry) }, ...usedServices.slice(0, 4).map((s) => ({ label: getService(s)?.name ?? s, href: servicePath(s) })), { label: 'Werbeagentur-Übersicht', href: AGENCY_BASE }] },
        ]}
      />
      <AgencyCta
        headline={`${industry.name} in ${region.name}: sprechen wir darüber.`}
        text={`Sie führen ${owner} in ${region.name}? Schildern Sie uns Standort, Ziele und Wünsche. Wir melden uns mit einer ersten Einschätzung${isBremen ? ' – auf Wunsch persönlich bei uns in Bremen oder bei Ihnen vor Ort' : ''}.`}
        topic={`Werbeagentur für ${industry.name} in ${region.name}`}
      />
    </>
  );
}
