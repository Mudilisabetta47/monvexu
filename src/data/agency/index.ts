import type { Industry, Region, RegionNote } from './types';
import { industries, industryPipeline } from './industries';
import { regions, getRegion } from './regions';
import { agencyServices, getService, servicePath } from './services';
import { regionalSteps } from './regional-steps';

export * from './types';
export { industries, industryPipeline, regions, agencyServices, getService, servicePath, getRegion };
export { serviceCatalog } from './services';

/** Datum der letzten inhaltlichen Überarbeitung (steuert `lastmod` in der Sitemap). */
export const CONTENT_UPDATED = new Date('2026-09-25');

export const AGENCY_BASE = '/werbeagentur';

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
export const getSubIndustry = (parent: Industry, slug: string) => parent.subpages?.find((s) => s.slug === slug);

export const industryPath = (i: Industry) => `${AGENCY_BASE}/${i.slug}`;
export const subPath = (parent: Industry, sub: Industry) => `${AGENCY_BASE}/${parent.slug}/${sub.slug}`;
export const regionPath = (i: Industry, r: Region) => `${AGENCY_BASE}/${i.slug}/${r.slug}`;

export type PublishedRegion = { region: Region; note: RegionNote };

/** Nur Regionen mit individuell geschriebenem Text werden veröffentlicht – alles andere existiert nicht. */
export function publishedRegions(industry: Industry): PublishedRegion[] {
  return (industry.regions ?? [])
    .map((slug) => getRegion(slug))
    .filter((r): r is Region => !!r)
    .flatMap((region) => {
      const base = region.notes[industry.slug];
      return base ? [{ region, note: { ...base, firstStep: regionalSteps[`${industry.slug}:${region.slug}`] } }] : [];
    });
}

export type Resolved =
  | { type: 'region'; industry: Industry; region: Region; note: RegionNote }
  | { type: 'sub'; parent: Industry; industry: Industry };

/** Löst /werbeagentur/<branche>/<teil> auf: Region oder Unterbranche. */
export function resolveSubRoute(industrySlug: string, teil: string): Resolved | null {
  const industry = getIndustry(industrySlug);
  if (!industry) return null;
  const sub = getSubIndustry(industry, teil);
  if (sub) return { type: 'sub', parent: industry, industry: sub };
  const pr = publishedRegions(industry).find((p) => p.region.slug === teil);
  if (pr) return { type: 'region', industry, region: pr.region, note: pr.note };
  return null;
}

export type AgencyUrl = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' };

/** Alle veröffentlichten Agentur-URLs – einzige Quelle für Sitemap und Prüfskripte. */
export function allAgencyUrls(): AgencyUrl[] {
  const urls: AgencyUrl[] = [
    { path: AGENCY_BASE, priority: 0.9, changeFrequency: 'monthly' },
    { path: `${AGENCY_BASE}/branchen`, priority: 0.8, changeFrequency: 'monthly' },
    { path: `${AGENCY_BASE}/leistungen`, priority: 0.8, changeFrequency: 'monthly' },
    ...agencyServices.map((s) => ({ path: servicePath(s.slug), priority: 0.7, changeFrequency: 'monthly' as const })),
  ];
  for (const i of industries) {
    urls.push({ path: industryPath(i), priority: 0.8, changeFrequency: 'monthly' });
    for (const s of i.subpages ?? []) urls.push({ path: subPath(i, s), priority: 0.7, changeFrequency: 'monthly' });
    for (const { region } of publishedRegions(i)) urls.push({ path: regionPath(i, region), priority: 0.6, changeFrequency: 'monthly' });
  }
  return urls;
}

/** Alle veröffentlichten Branchen-Seiten inkl. Unterbranchen, flach. */
export const flatIndustries = (): { industry: Industry; parent?: Industry; path: string }[] =>
  industries.flatMap((i) => [
    { industry: i, path: industryPath(i) },
    ...(i.subpages ?? []).map((s) => ({ industry: s, parent: i, path: subPath(i, s) })),
  ]);

export const findPublishedIndustry = (slug: string) => flatIndustries().find((f) => f.industry.slug === slug);
