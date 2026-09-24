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
 *    Die Einstufung (own/managed) ist eine Annahme und bitte zu bestaetigen.
 */
export type BrandType = 'own' | 'managed';
export type BrandStatus = 'live' | 'building' | 'planned';
export type BrandArt = 'route' | 'bloom' | 'rim' | 'horizon' | 'pulse' | 'monogram';

export type Brand = {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  tagline: string;
  description: string;
  highlights: string[];
  /** Kürzel im Logo-Chip (sonst Initialen des Namens). */
  monogram?: string;
  /** Wortmarke in zwei Teilen (fett + leicht), sonst aus dem Namen abgeleitet. */
  wordmark?: [string, string];
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
    slug: 'boundforfuture',
    name: 'Boundforfuture',
    category: 'Werbeagentur • Marke • Kommunikation',
    tags: ['Werbeagentur', 'Marke'],
    tagline: 'Nächster Stopp Zukunft.',
    description:
      'Werbeagentur für Markenaufbau, Kommunikation und digitale Kampagnen: Ideen, die Marken nach vorn bringen.',
    highlights: ['Markenaufbau', 'Kommunikation & Kampagnen', 'Digitales Marketing'],
    monogram: 'BF',
    wordmark: ['BOUND', 'FOR FUTURE'],
    website: 'https://boundforfuture.com',
    status: 'live',
    type: 'own',
    art: 'horizon',
    theme: { bg: '#0E0F14', bg2: '#1D1F2E', fg: '#F5F6F0', muted: '#A3A7B8', accent: '#C8F03C' },
  },
  {
    slug: 'goklinik',
    name: 'GoKlinik',
    category: 'Digitale Gesundheit • Plattform',
    tags: ['Digitale Gesundheit', 'Plattform'],
    tagline: 'Gesundheit, einfach digital.',
    description:
      'Digitale Gesundheitsplattform: Online-Anfragen, Patienten-App und klare Prozesse rund um Praxis und Apotheke.',
    highlights: ['Online-Anfragen', 'Patienten-App', 'Digitale Prozesse'],
    monogram: 'GK',
    wordmark: ['GO', 'KLINIK'],
    website: 'https://goklinik.de',
    status: 'live',
    type: 'own',
    art: 'pulse',
    theme: { bg: '#0A2E33', bg2: '#0E5A62', fg: '#F2FAFA', muted: '#9CC7CB', accent: '#4FD8D0' },
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
    theme: { bg: '#F8EAE4', bg2: '#EFCFCB', fg: '#2B1A17', muted: '#8B5E5A', accent: '#B8465B' },
  },
  {
    slug: 'busvermittlung',
    name: 'Busvermittlung',
    category: 'Travel • Mobility • Bus',
    tags: ['Travel', 'Mobility', 'Bus'],
    tagline: 'Kommt bald.',
    description:
      'Digitale Busvermittlung für Verbindungen, Gruppenreisen und Mobilitätsangebote. In Vorbereitung.',
    highlights: ['Busvermittlung', 'Gruppenreisen', 'Mobilitätsangebote'],
    monogram: 'BV',
    wordmark: ['BUS', 'VERMITTLUNG'],
    website: undefined,
    status: 'planned',
    type: 'own',
    art: 'route',
    theme: { bg: '#0B1A2C', bg2: '#12345A', fg: '#F4F7FB', muted: '#9FB3CC', accent: '#F5B63A' },
  },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
