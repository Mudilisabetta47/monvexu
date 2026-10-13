import type { Metadata } from 'next';
import { SITE_URL, company } from '@/data/site';
import { agencyMetadata } from './agency-seo';
import type { Product } from '@/data/products';

/** Metadata einer Produktseite inkl. Vorschaubild (Open Graph/Twitter). */
export function productMetadata(p: Product, path: string): Metadata {
  const base = agencyMetadata({ title: p.seo.title, description: p.seo.description, path });
  const image = { url: `${SITE_URL}/products/${p.slug}/og.jpg`, width: 1200, height: 630, alt: `${p.name}: Produktvorschau` };
  return { ...base, openGraph: { ...base.openGraph, images: [image] }, twitter: { ...base.twitter, images: [image.url] } };
}

/** SoftwareApplication ohne Preis- oder Verfügbarkeitsbehauptungen. MONVEX nur als Entwickler (creator). */
export const softwareSchema = (p: Product, path: string, extra: Record<string, unknown> = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: p.name,
  description: p.seo.description,
  url: p.external ?? `${SITE_URL}${path}`,
  image: `${SITE_URL}/products/${p.slug}/og.jpg`,
  inLanguage: 'de-DE',
  creator: { '@id': `${SITE_URL}/#organization` },
  mainEntityOfPage: `${SITE_URL}${path}`,
  ...extra,
});

export const productsListSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Produkte von ${company.name}`,
  itemListElement: items.map((i, k) => ({ '@type': 'ListItem', position: k + 1, name: i.name, url: `${SITE_URL}${i.path}` })),
});
