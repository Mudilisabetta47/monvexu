import { brands } from '@/data/brands';
import { SITE_URL, company } from '@/data/site';

export const SEO = {
  title: 'MONVEX – Dachmarke für Marken, Produkte & digitale Geschäftsmodelle',
  description:
    'MONVEX UG aus Bremen: Dachmarke für Markenentwicklung, Softwareentwicklung, E-Commerce, Online-Marketing sowie Travel & Mobility – Marken, Produkte, Geschäftsmodelle.',
  keywords: [
    'MONVEX',
    'MONVEX UG',
    'Digitalisierung',
    'Softwareentwicklung',
    'Webentwicklung',
    'Digital Business',
    'Markenentwicklung',
    'E-Commerce',
    'Online-Marketing',
    'Travel',
    'Mobility',
    'Bremen',
  ],
};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: company.name,
        legalName: company.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/monvex-mark.svg`,
        slogan: company.tagline,
        foundingDate: company.founded,
        description: SEO.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          postalCode: company.address.zip,
          addressLocality: company.address.city,
          addressCountry: 'DE',
        },
        knowsAbout: SEO.keywords,
        brand: brands.map((b) => ({ '@type': 'Brand', name: b.name, description: b.description })),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: company.name,
        inLanguage: 'de-DE',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}
