import { business } from './business';
import { ai } from './ai';
import { enterprise } from './enterprise';
import { personal } from './personal';
import { categories, categoryBySlug } from './categories';
import type { Audience, CategorySlug, Faq, SoftwareProduct } from './types';

export * from './types';
export { categories, categoryBySlug };

/** Reihenfolge = Reihenfolge der Kategorien. */
export const softwareProducts: SoftwareProduct[] = [...business, ...ai, ...enterprise, ...personal];

export const productBySlug = (slug: string) => softwareProducts.find((p) => p.slug === slug);
export const productsInCategory = (c: CategorySlug) => softwareProducts.filter((p) => p.category === c);

export const SW_BASE = '/software';
export const swPath = {
  home: SW_BASE,
  catalog: `${SW_BASE}/katalog`,
  request: `${SW_BASE}/anfrage`,
  category: (slug: CategorySlug) => `${SW_BASE}/kategorie/${slug}`,
  product: (slug: string) => `${SW_BASE}/${slug}`,
};

/** Anfrage-Link mit Vorbelegung (Produkt + Art der Anfrage). */
export const requestHref = (kind: RequestKind, product?: string) =>
  `${swPath.request}?art=${kind}${product ? `&produkt=${encodeURIComponent(product)}` : ''}`;

export type RequestKind = 'demo' | 'beratung' | 'angebot' | 'individuell';
export const requestKinds: { id: RequestKind; label: string; hint: string }[] = [
  { id: 'demo', label: 'Demo anfragen', hint: 'Wir zeigen Ihnen, wie die Lösung für Ihr Unternehmen aussehen würde' },
  { id: 'beratung', label: 'Beratung vereinbaren', hint: 'Persönliches Gespräch zu Ihrem Vorhaben' },
  { id: 'angebot', label: 'Angebot erhalten', hint: 'Einschätzung zu Aufwand und Vorgehen für Ihre Umsetzung' },
  { id: 'individuell', label: 'Individuelle Lösung', hint: 'Ihre eigene Idee oder ein Produkt aus dem Katalog: wir entwickeln es mit Ihnen' },
];

export const statusInfo = {
  concept: {
    label: 'Für Sie gebaut',
    short: 'Für Sie gebaut',
    detail: 'Wir bereiten diese Lösung individuell für Ihr Unternehmen vor und bauen sie nach Ihren Anforderungen. Vorschauen zeigen Beispieldaten.',
  },
} as const;

export const audiences: Audience[] = ['Kleinunternehmen', 'Mittelstand', 'Konzern', 'Privat'];

/** Gemeinsame Fragen jeder Produktseite. Ehrlich zum Status. */
export const commonFaq = (p: SoftwareProduct): Faq[] => [
  {
    q: `Kann ich ${p.name} für mein Unternehmen bekommen?`,
    a: `Ja. Wir bereiten ${p.name} individuell für Ihr Unternehmen vor und bauen es nach Ihren Anforderungen auf. Ablauf: Gespräch, Konzept, Prototyp, Umsetzung. Preis und Zeitplan hängen vom Umfang ab, ein Angebot erhalten Sie nach dem ersten Gespräch.`,
  },
  {
    q: 'Kann MONVEX die Lösung individuell für mich umsetzen?',
    a: 'Ja. Wir entwickeln Software auch als Auftragsarbeit. Schildern Sie uns Ihr Vorhaben, wir schätzen Aufwand und Vorgehen ein und machen Ihnen ein Angebot.',
  },
];

export const faqFor = (p: SoftwareProduct): Faq[] => [...commonFaq(p).slice(0, 1), ...p.faq, ...commonFaq(p).slice(1)];

/** Bereits bestehende bzw. in Entwicklung befindliche MONVEX-Produkte (Quelle: src/data/products.ts). */
export const existingProducts = [
  { slug: 'busos', name: 'MONVEX BusOS', status: 'In Entwicklung', text: 'Betriebssoftware für Busunternehmen: Charter, Kalkulation, Angebote und Leitstelle.', href: '/produkte/busos' },
  { slug: 'easykfz24', name: 'EasyKFZ24', status: 'Online verfügbar', text: 'Digitaler Zulassungsservice für Fahrzeuge, mit eigener Website.', href: '/produkte/easykfz24' },
] as const;

export const processSteps = [
  { t: 'Gespräch', d: 'Wir hören zu: Ziel, Nutzer, Systeme, Rahmen.' },
  { t: 'Konzept', d: 'Funktionsumfang, Oberfläche und Architektur als gemeinsamer Plan.' },
  { t: 'Prototyp', d: 'Ein klickbarer Entwurf, damit Sie früh sehen, was Sie bekommen.' },
  { t: 'Umsetzung', d: 'Schrittweise Entwicklung mit regelmäßigen Abnahmen und Betrieb nach Absprache.' },
] as const;
