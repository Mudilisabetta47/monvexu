import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';
import { getLanding, landings } from '@/data/landing';
import { SITE_URL } from '@/data/site';

export const dynamicParams = false;
export const generateStaticParams = () => landings.map((l) => ({ slug: l.slug }));

type P = { params: Promise<{ slug: string }> };

// Anzeigen-Landingpages: für bezahlte Anzeigen, nicht für die organische Suche (die ausführlichen Branchenseiten liegen unter /werbeagentur)
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = getLanding((await params).slug);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}/lp/${l.slug}` },
  };
}

export default async function LpPage({ params }: P) {
  const l = getLanding((await params).slug);
  if (!l) notFound();
  return <LandingPage l={l} />;
}
