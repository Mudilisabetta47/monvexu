import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckPage } from '@/components/agency/CheckPage';
import { checkPath, checkVariants, getCheckVariant } from '@/data/check';

export const dynamicParams = false;
export const generateStaticParams = () => checkVariants.filter((v) => v.slug).map((v) => ({ branche: v.slug }));

type P = { params: Promise<{ branche: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const v = getCheckVariant((await params).branche);
  if (!v) return {};
  return { title: v.title, description: v.lead, alternates: { canonical: checkPath(v) }, robots: { index: false, follow: false } };
}

export default async function CheckBranche({ params }: P) {
  const v = getCheckVariant((await params).branche);
  if (!v || !v.slug) notFound();
  return <CheckPage v={v} />;
}
