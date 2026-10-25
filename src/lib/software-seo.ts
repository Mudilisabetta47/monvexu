import type { Metadata } from 'next';
import { agencyMetadata, breadcrumbSchema, faqSchema, webPageSchema, type Crumb } from './agency-seo';
import { SITE_URL, company } from '@/data/site';
import { softwareProducts, type SoftwareProduct } from '@/data/software';

export const swMetadata = (o: { title: string; description: string; path: string }): Metadata => agencyMetadata(o);

export { breadcrumbSchema, faqSchema, webPageSchema };
export type { Crumb };

/** Produktseite eines KONZEPTS: bewusst WebPage + FAQ statt SoftwareApplication (keine Verfügbarkeitsbehauptung). */
export const productPageSchema = (p: SoftwareProduct, path: string) =>
  webPageSchema({ name: `${p.name}: ${p.tagline}`, description: p.summary, path });

export const catalogSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Software-Katalog von ${company.name}`,
  itemListElement: softwareProducts.map((p, k) => ({ '@type': 'ListItem', position: k + 1, name: p.name, url: `${SITE_URL}/software/${p.slug}` })),
});
