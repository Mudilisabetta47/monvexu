/**
 * Selected Work – bewusst getrennt von den Marken.
 *
 * `kind` steuert die Einordnung. Die Seite behauptet nirgends eine
 * Tochtergesellschaft; die Zuordnung ist pro Eintrag hier festgelegt:
 *   own-brand      eigene Marke
 *   managed-brand  geführte Marke
 *   project        eigenes Projekt / digitales Produkt
 *   client         Kundenprojekt
 * Die Einstufung der Startprojekte ist ein Platzhalter und bitte zu bestaetigen.
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
    slug: 'boundforfuture',
    title: 'Boundforfuture',
    kind: 'own-brand',
    scope: 'Werbeagentur · Markenkommunikation',
    summary: 'Werbeagentur für Markenaufbau, Kommunikation und digitale Kampagnen. Nächster Stopp: Zukunft.',
    brandSlug: 'boundforfuture',
  },
  {
    slug: 'goklinik',
    title: 'GoKlinik',
    kind: 'own-brand',
    scope: 'Digitale Gesundheit · Plattform',
    summary: 'Digitale Gesundheitsplattform mit Patienten-App, Online-Anfragen und klaren Abläufen.',
    brandSlug: 'goklinik',
  },
  {
    slug: 'rose-cafe',
    title: 'Rose Café',
    kind: 'managed-brand',
    scope: 'Markenauftritt · Digitale Präsenz',
    summary: 'Ein Markenauftritt, der Atmosphäre und Gastfreundschaft digital übersetzt.',
    brandSlug: 'rose-cafe',
  },
];
