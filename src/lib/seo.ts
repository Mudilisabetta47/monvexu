import { brands } from '@/data/brands';
import { SITE_URL, company, legal } from '@/data/site';

export const SEO = {
  title: 'MONVEX – Software, digitale Produkte & Werbeagentur aus Bremen',
  description:
    'MONVEX UG aus Bremen entwickelt eigene Software und digitale Produkte (MONVEX BusOS, EasyKFZ24), dazu Webentwicklung, Markenentwicklung, Online-Marketing und Werbeagentur-Leistungen.',
  keywords: [
    'MONVEX',
    'MONVEX UG',
    'digitale Produkte',
    'MONVEX BusOS',
    'EasyKFZ24',
    'Werbeagentur',
    'Werbeagentur Bremen',
    'Webdesign',
    'SEO',
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
        ...(legal.email ? { email: legal.email } : {}),
        ...(legal.phone ? { telephone: `+49${legal.phone.replace(/\s/g, '').replace(/^0/, '')}` } : {}),
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
