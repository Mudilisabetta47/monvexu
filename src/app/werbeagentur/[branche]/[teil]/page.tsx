import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryPage } from '@/components/agency/IndustryPage';
import { RegionPage } from '@/components/agency/RegionPage';
import { industries, publishedRegions, regionPath, resolveSubRoute, subPath } from '@/data/agency';
import { agencyMetadata } from '@/lib/agency-seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.flatMap((i) => [
    ...(i.subpages ?? []).map((s) => ({ branche: i.slug, teil: s.slug })),
    ...publishedRegions(i).map((p) => ({ branche: i.slug, teil: p.region.slug })),
  ]);
}

type P = { params: Promise<{ branche: string; teil: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { branche, teil } = await params;
  const r = resolveSubRoute(branche, teil);
  if (!r) return {};
  if (r.type === 'sub') return agencyMetadata({ title: r.industry.seo.title, description: r.industry.seo.description, path: subPath(r.parent, r.industry) });
  return agencyMetadata({
    title: `Werbeagentur für ${r.industry.name} in ${r.region.name}`,
    description: r.note.metaDescription,
    path: regionPath(r.industry, r.region),
  });
}

export default async function TeilPage({ params }: P) {
  const { branche, teil } = await params;
  const r = resolveSubRoute(branche, teil);
  if (!r) notFound();
  if (r.type === 'sub') return <IndustryPage industry={r.industry} parent={r.parent} />;
  return <RegionPage industry={r.industry} region={r.region} note={r.note} />;
}
