/**
 * Zentrale Stammdaten. Nur Angaben, die belegt sind – nichts erfunden.
 * Offene Pflichtangaben fuer das Impressum stehen in `legal` (undefined = noch ergaenzen).
 */
const DEFAULT_SITE_URL = 'https://www.monvex-group.de';

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

/**
 * true, solange die Gesellschaft nicht im Handelsregister eingetragen ist (Anmeldung vom 23.09.2026).
 * Dann führt der Firmenname den Zusatz "i. G." (in Gründung) – überall: Website, Impressum, Flyer, Visitenkarten.
 * NACH DER EINTRAGUNG: auf false setzen und `legal.registerNumber` eintragen.
 */
export const IN_FORMATION = true;

const BASE_NAME = 'MONVEX UG (haftungsbeschränkt)';

export const company = {
  name: 'MONVEX',
  legalName: IN_FORMATION ? `${BASE_NAME}\u00a0i.\u00a0G.` : BASE_NAME,
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

/**
 * Impressum-Pflichtangaben. Quelle: Handelsregister-Anmeldung vom 23.09.2026 (Amtsgericht Bremen, "HRB neu").
 * Bewusst NICHT enthalten: Geburtsdatum und Wohnort der Geschäftsführung (gehören nicht ins Impressum).
 * Nach der Eintragung: `registerNumber` (z. B. 'HRB 12345 HB') setzen und `registerPending` auf false stellen.
 */
export const legal: {
  managingDirector?: string;
  /** Vertretungsregel laut Anmeldung (Einzelvertretung bei einem Geschäftsführer). */
  representation?: string;
  registerCourt?: string;
  registerNumber?: string;
  /** true = Eintragung beantragt, Nummer noch nicht vergeben. */
  registerPending: boolean;
  vatId?: string;
  email?: string;
  phone?: string;
} = {
  managingDirector: 'Mohammed Al Bakhit',
  representation: 'Der Geschäftsführer ist einzelvertretungsberechtigt.',
  registerCourt: 'Amtsgericht Bremen',
  registerNumber: undefined,
  registerPending: IN_FORMATION,
  vatId: undefined,
  email: 'mudi@monvex-group.de',
  phone: '0421 499 58 207',
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
