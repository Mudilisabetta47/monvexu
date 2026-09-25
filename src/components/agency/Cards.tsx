import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Block } from './Sections';
import { SectionHead } from '@/components/ui/SectionHead';
import type { Industry, PublishedRegion } from '@/data/agency';
import { AGENCY_BASE, industryPath, regionPath, subPath } from '@/data/agency';

export function IndustryCard({ industry, href, i = 0 }: { industry: Industry; href: string; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 0.06}>
      <Link href={href} className="group flex h-full flex-col justify-between rounded-[24px] border border-line bg-white p-7 shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift">
        <div>
          <span className="font-mono text-[.64rem] uppercase tracking-[.16em] text-graphite">{industry.group}</span>
          <h3 className="mt-4 text-h3 font-semibold">{industry.name}</h3>
          <p className="mt-3 leading-relaxed text-graphite">{industry.blurb}</p>
        </div>
        <span className="mt-8 flex items-center gap-2 text-[.9rem] font-medium">
          Zur Branche
          <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-ember" />
        </span>
      </Link>
    </Reveal>
  );
}

/** Übersicht der Unterbranchen (z. B. Steuerberater unter Anwälte). */
export function SubIndustryGrid({ parent }: { parent: Industry }) {
  if (!parent.subpages?.length) return null;
  return (
    <Block>
      <SectionHead index="03" label="Berufsgruppen" title={`Für jede Berufsgruppe\n*ein eigener Auftritt.*`}>
        Rechtsanwälte, Steuerberater, Notare und Wirtschaftsprüfer haben eigene Regeln und Zielgruppen. Deshalb haben wir eigene Seiten dafür.
      </SectionHead>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {parent.subpages.map((s, i) => (
          <IndustryCard key={s.slug} industry={s} href={subPath(parent, s)} i={i} />
        ))}
      </div>
    </Block>
  );
}

/** Übersicht veröffentlichter Regionen einer Branche, gruppiert nach Bundesländern und Städten. */
export function RegionGrid({ industry, regions, index = '07' }: { industry: Industry; regions: PublishedRegion[]; index?: string }) {
  if (regions.length === 0) return null;
  const states = regions.filter((r) => r.region.kind === 'state');
  const cities = regions.filter((r) => r.region.kind === 'city');
  const card = (r: PublishedRegion) => (
    <li key={r.region.slug}>
      <Link href={regionPath(industry, r.region)} className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-paper p-5 transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:shadow-card">
        <span className="flex items-center justify-between gap-3 text-[1.05rem] font-semibold tracking-tight">
          {r.region.name}
          <ArrowUpRight size={15} className="shrink-0 text-mute transition-transform duration-500 group-hover:rotate-45 group-hover:text-ember" />
        </span>
        <span className="mt-2 text-[.82rem] leading-snug text-graphite">{r.region.places.slice(0, 4).join(' · ')}</span>
      </Link>
    </li>
  );
  return (
    <Block tone="white">
      <SectionHead index={index} label="Regionen" title={`Werbeagentur für ${industry.name}\nin *Ihrer Region.*`}>
        Jede Regionalseite enthält eigene Hinweise zu Markt, Zielgruppen und Gegebenheiten vor Ort.
      </SectionHead>
      {states.length > 0 && (
        <>
          <h3 className="eyebrow mt-14">Bundesländer</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{states.map(card)}</ul>
        </>
      )}
      {cities.length > 0 && (
        <>
          <h3 className="eyebrow mt-12">Städte</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{cities.map(card)}</ul>
        </>
      )}
    </Block>
  );
}

export { AGENCY_BASE, industryPath };
