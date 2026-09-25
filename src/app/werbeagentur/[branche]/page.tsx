import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryPage } from '@/components/agency/IndustryPage';
import { getIndustry, industries, industryPath } from '@/data/agency';
import { agencyMetadata } from '@/lib/agency-seo';

export const dynamicParams = false;
export const generateStaticParams = () => industries.map((i) => ({ branche: i.slug }));

type P = { params: Promise<{ branche: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const i = getIndustry((await params).branche);
  if (!i) return {};
  return agencyMetadata({ title: i.seo.title, description: i.seo.description, path: industryPath(i) });
}

export default async function BranchePage({ params }: P) {
  const i = getIndustry((await params).branche);
  if (!i) notFound();
  return <IndustryPage industry={i} />;
}
