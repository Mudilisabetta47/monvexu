/**
 * Selected Work – bewusst getrennt von den Marken.
 *
 * `kind` steuert die Einordnung. Die Seite behauptet nirgends eine
 * Tochtergesellschaft; die Zuordnung ist pro Eintrag hier festgelegt:
 *   own-brand      eigene Marke
 *   managed-brand  geführte Marke
 *   project        eigenes Projekt / digitales Produkt
 *   client         Kundenprojekt
 * Die Einstufung der drei Startprojekte ist ein Platzhalter und bitte zu bestaetigen.
 */
export type ProjectKind = 'own-brand' | 'managed-brand' | 'project' | 'client';

export const projectKindLabel: Record<ProjectKind, string> = {
  'own-brand': 'Eigene Marke',
  'managed-brand': 'Geführte Marke',
  project: 'Projekt',
  client: 'Kundenprojekt',
};

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  scope: string;
  summary: string;
  year?: string;
  /** Verknuepfung zu einer Marke aus brands.ts – liefert Farben und Key-Visual. */
  brandSlug: string;
};

export const projects: Project[] = [
  {
    slug: 'metropol-tours',
    title: 'Metropol Tours',
    kind: 'own-brand',
    scope: 'Markenaufbau · Digitale Plattform',
    summary: 'Digitale Präsenz und Vertriebsstruktur für Reise- und Busvermittlung.',
    brandSlug: 'metropol-tours',
  },
  {
    slug: 'rose-cafe',
    title: 'Rose Café',
    kind: 'managed-brand',
    scope: 'Markenauftritt · Digitale Präsenz',
    summary: 'Ein Markenauftritt, der Atmosphäre und Gastfreundschaft digital übersetzt.',
    brandSlug: 'rose-cafe',
  },
  {
    slug: 'mtc-autoservice',
    title: 'MTC Autoservice',
    kind: 'managed-brand',
    scope: 'Digitale Präsenz · Servicekommunikation',
    summary: 'Klare, verlässliche Darstellung von Leistungen und Abläufen rund ums Fahrzeug.',
    brandSlug: 'mtc-autoservice',
  },
];
