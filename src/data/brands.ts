/**
 * Marken-Portfolio – datenbasiert.
 *
 * NEUE MARKE HINZUFUEGEN: einfach ein weiteres Objekt anhaengen. Alles andere
 * (Startseite, Oekosystem, /brands, /brands/[slug], Sitemap, JSON-LD) folgt automatisch.
 *
 *  - `logo` / `image`: optional. Pfad unter /public (z. B. '/brand/rose/logo.svg').
 *    Ohne Datei erzeugt die Seite ein Wortmarken-Logo und ein generatives Key-Visual (`art`).
 *  - `website`: optional. Solange leer, zeigt die Seite "Website folgt" statt eines Links.
 *  - `type`: 'own' = eigene Marke, 'managed' = von MONVEX geführte Marke.
 *    Die Einstufung der drei Startmarken ist ein Platzhalter und bitte zu bestaetigen.
 */
export type BrandType = 'own' | 'managed';
export type BrandStatus = 'live' | 'building' | 'planned';
export type BrandArt = 'route' | 'bloom' | 'rim' | 'monogram';

export type Brand = {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  tagline: string;
  description: string;
  highlights: string[];
  logo?: string;
  image?: string;
  website?: string;
  status: BrandStatus;
  type: BrandType;
  art: BrandArt;
  theme: {
    bg: string;
    bg2: string;
    fg: string;
    muted: string;
    accent: string;
  };
};

export const brandTypeLabel: Record<BrandType, string> = {
  own: 'Eigene Marke',
  managed: 'Geführte Marke',
};

export const brandStatusLabel: Record<BrandStatus, string> = {
  live: 'Live',
  building: 'Im Aufbau',
  planned: 'In Planung',
};

export const brands: Brand[] = [
  {
    slug: 'metropol-tours',
    name: 'Metropol Tours',
    category: 'Travel • Mobility • Bus',
    tags: ['Travel', 'Mobility', 'Bus'],
    tagline: 'Unterwegs. Verbunden. Verlässlich.',
    description:
      'Reise- und Busvermittlung mit digitalem Fokus: Verbindungen, Gruppenreisen und Mobilitätsangebote aus einer Hand.',
    highlights: ['Reisevermittlung', 'Busvermittlung', 'Mobilitätsangebote'],
    website: undefined,
    status: 'building',
    type: 'own',
    art: 'route',
    theme: { bg: '#0B1A2C', bg2: '#12345A', fg: '#F4F7FB', muted: '#9FB3CC', accent: '#F5B63A' },
  },
  {
    slug: 'rose-cafe',
    name: 'Rose Café',
    category: 'Gastronomie • Hospitality',
    tags: ['Gastronomie', 'Hospitality'],
    tagline: 'Ein Ort zum Ankommen.',
    description:
      'Café- und Gastronomiemarke mit klarem Charakter: Genuss, Atmosphäre und Gastfreundschaft als Markenerlebnis.',
    highlights: ['Gastronomie', 'Hospitality', 'Markenerlebnis'],
    website: undefined,
    status: 'live',
    type: 'managed',
    art: 'bloom',
    theme: { bg: '#F6E2DF', bg2: '#EFC9C6', fg: '#3A1219', muted: '#8B5A5F', accent: '#C2314B' },
  },
  {
    slug: 'mtc-autoservice',
    name: 'MTC Autoservice',
    category: 'Automotive • Service',
    tags: ['Automotive', 'Service'],
    tagline: 'Präzision. Rund ums Fahrzeug.',
    description:
      'Automotive-Servicemarke für Wartung, Pflege und Betreuung: verlässliche Abläufe, sauber dokumentiert.',
    highlights: ['Fahrzeugservice', 'Wartung & Pflege', 'Klare Abläufe'],
    website: undefined,
    status: 'live',
    type: 'managed',
    art: 'rim',
    theme: { bg: '#14171B', bg2: '#22272E', fg: '#F1F3F5', muted: '#98A1AB', accent: '#22C1B0' },
  },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
