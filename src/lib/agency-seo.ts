import type { Metadata } from 'next';
import { SITE_URL, company } from '@/data/site';

/** Metadata für Agentur-Seiten: Canonical, OpenGraph und Twitter aus Titel + Beschreibung. */
export function agencyMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', locale: 'de_DE', url: `${SITE_URL}${path}`, siteName: company.name, title: `${title} | MONVEX`, description },
    twitter: { card: 'summary_large_image', title: `${title} | MONVEX`, description },
  };
}

export type Crumb = { name: string; path: string };

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.path}`,
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const serviceSchema = ({ name, description, path, areaServed, serviceType }: { name: string; description: string; path: string; areaServed?: string; serviceType?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: `${SITE_URL}${path}`,
  serviceType: serviceType ?? name,
  provider: { '@id': `${SITE_URL}/#organization` },
  ...(areaServed ? { areaServed: { '@type': 'AdministrativeArea', name: areaServed } } : { areaServed: { '@type': 'Country', name: 'Deutschland' } }),
  inLanguage: 'de-DE',
});

/** LocalBusiness NUR für Seiten mit echtem lokalem Bezug (Firmensitz Bremen). Keine erfundenen Telefonnummern oder Bewertungen. */
export const localBusinessSchema = (path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
  name: company.legalName,
  url: `${SITE_URL}${path}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    postalCode: company.address.zip,
    addressLocality: company.address.city,
    addressCountry: 'DE',
  },
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
});

export const webPageSchema = ({ name, description, path }: { name: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  description,
  url: `${SITE_URL}${path}`,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  inLanguage: 'de-DE',
});
