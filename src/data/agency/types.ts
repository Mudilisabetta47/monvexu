/**
 * Datenmodell des Werbeagentur-Bereichs.
 *
 * Grundregel gegen Doorway-Pages: Eine Seite wird NUR veröffentlicht (Route, Sitemap, interne Links),
 * wenn sie eigenen, nützlichen Content besitzt. Dafür sorgen die Helfer in `./index.ts`:
 *  - Branche: nur wenn sie in `industries/index.ts` registriert ist (Content vorhanden).
 *  - Region:  nur wenn `region.notes[industrySlug]` existiert (individueller Text pro Branche × Region).
 */
export type Faq = { q: string; a: string };

export type ServiceCategory = 'design' | 'web' | 'marketing' | 'print' | 'betrieb';

export type ServiceSlug =
  | 'webdesign'
  | 'webentwicklung'
  | 'seo'
  | 'google-ads'
  | 'social-media'
  | 'online-marketing'
  | 'branding'
  | 'print-werbemittel'
  | 'fahrzeugbeschriftung'
  | 'e-commerce'
  | 'buchungssysteme-crm'
  | 'wartung-hosting';

export type AgencyService = {
  slug: ServiceSlug;
  name: string;
  category: ServiceCategory;
  /** Kurztext für Karten. */
  short: string;
  /** Einzelleistungen, die diese Seite abdeckt (Begriffe aus dem Leistungskatalog). */
  covers: string[];
  seo: { title: string; description: string };
  h1: string;
  lead: string;
  paragraphs: string[];
  deliverables: string[];
  benefits: { title: string; text: string }[];
  faq: Faq[];
};

export type Problem = { title: string; text: string };
export type Solution = { service: ServiceSlug; title: string; text: string };
export type Example = { title: string; text: string };

/** Inhalt einer Branchenseite (auch für Unterbranchen, z. B. Steuerberater unter Anwälte). */
export type Industry = {
  slug: string;
  /** Anzeigename, z. B. "Fahrschulen". */
  name: string;
  /** Kurzbeschreibung für Übersichtskarten. */
  blurb: string;
  group: string;
  seo: { title: string; description: string };
  h1: string;
  eyebrow: string;
  lead: string;
  problems: Problem[];
  solutions: Solution[];
  /** Typische Umsetzungen – ausdrücklich keine Kundenreferenzen. */
  examples: Example[];
  faq: Faq[];
  cta: { headline: string; text: string };
  /** Hinweis zu berufs-/werberechtlichen Besonderheiten der Branche (optional). */
  compliance?: string;
  /** Slugs verwandter Branchen (nur veröffentlichte werden verlinkt). */
  related: string[];
  /** Slugs der Regionen, die für diese Branche geplant sind; veröffentlicht wird nur mit `region.notes[slug]`. */
  regions?: string[];
  /** Unterbranchen (eigene Seiten unter /werbeagentur/<slug>/<sub>). */
  subpages?: Industry[];
  /** Einzelgewerke/Berufe, die auf der Seite genannt werden (Text-Chips). */
  segments?: string[];
};

export type RegionNote = {
  /** Einleitung, individuell für Branche × Region. */
  intro: string;
  /** Meta Description, individuell. */
  metaDescription: string;
  angles: { title: string; text: string }[];
  faq: Faq;
  /** Konkreter erster Schritt für diese Region (aus regional-steps.ts). */
  firstStep?: string;
};

export type Region = {
  slug: string;
  name: string;
  kind: 'state' | 'city';
  /** Bei Städten: Slug des Bundeslandes. */
  state?: string;
  /** Wichtige Städte/Landkreise/Stadtteile – nur reale Orte. */
  places: string[];
  /** Benachbarte Regionen (Slugs) für interne Links. */
  neighbors: string[];
  notes: Record<string, RegionNote | undefined>;
};
