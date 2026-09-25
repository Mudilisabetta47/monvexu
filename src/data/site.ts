/**
 * Zentrale Stammdaten. Nur Angaben, die belegt sind – nichts erfunden.
 * Offene Pflichtangaben fuer das Impressum stehen in `legal` (undefined = noch ergaenzen).
 */
const DEFAULT_SITE_URL = 'https://monvex.de';

/** Toleriert eine falsch gesetzte Env-Variable (ohne https://, mit Leerzeichen, leer) statt den Build abzubrechen. */
function resolveSiteUrl(raw: string | undefined) {
  const v = (raw ?? '').trim();
  if (!v) return DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const company = {
  name: 'MONVEX',
  legalName: 'MONVEX UG (haftungsbeschränkt)',
  legalForm: 'Unternehmergesellschaft (haftungsbeschränkt)',
  seat: 'Bremen, Deutschland',
  founded: '2026',
  tagline: 'Build. Brand. Scale.',
  address: {
    street: 'Kirchbachstraße 200',
    zip: '28211',
    city: 'Bremen',
    country: 'Deutschland',
  },
} as const;

/** Impressum-Pflichtangaben, die noch nicht vorliegen. Hier eintragen – die Seite zeigt sie automatisch. */
export const legal: {
  managingDirector?: string;
  registerCourt?: string;
  registerNumber?: string;
  vatId?: string;
  email?: string;
  phone?: string;
} = {
  managingDirector: undefined,
  registerCourt: undefined,
  registerNumber: undefined,
  vatId: undefined,
  email: undefined,
  phone: undefined,
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: 'Unternehmen', href: '/#unternehmen' },
  { label: 'Brands', href: '/#brands' },
  { label: 'Services', href: '/#services' },
  { label: 'Werbeagentur', href: '/werbeagentur' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#kontakt' },
];

export const legalNav: NavItem[] = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
];
