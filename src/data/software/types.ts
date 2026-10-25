/**
 * Datenmodell des MONVEX-Softwarebereichs.
 *
 * WAHRHEITSREGEL: Außer MONVEX BusOS (in Entwicklung, siehe src/data/products.ts) und EasyKFZ24 (live, extern)
 * existiert keines dieser Produkte als lauffähige Software. Alle Produkte hier sind KONZEPTE und werden überall
 * so gekennzeichnet. Es gibt keine Preise, keine Kundenzahlen, keine Bewertungen, keine Verfügbarkeitstermine.
 * Mockups zeigen Beispieldaten und sind als „Konzept-Vorschau“ beschriftet.
 */

export type CategorySlug = 'business-software' | 'kuenstliche-intelligenz' | 'enterprise-loesungen' | 'persoenliche-software';

export type Audience = 'Kleinunternehmen' | 'Mittelstand' | 'Konzern' | 'Privat';

export type SoftwareStatus = 'concept';

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Kurzer Anker für Navigation und Chips. */
  short: string;
  icon: string;
  accent: string;
  accent2: string;
  tagline: string;
  description: string;
  seo: { title: string; description: string };
};

export type Feature = { icon: string; t: string; d: string };
export type UseCase = { who: string; t: string; d: string };
export type Benefit = { t: string; d: string };
export type Faq = { q: string; a: string };

/** Diagramm- und Inhaltsbausteine für die Konzept-Vorschau. Alle Werte sind Beispieldaten. */
export type Panel =
  | { k: 'line'; title: string; pts: number[]; pts2?: number[]; unit?: string }
  | { k: 'bars'; title: string; vals: number[]; labels?: string[] }
  | { k: 'donut'; title: string; segs: { l: string; v: number }[] }
  | { k: 'kanban'; title: string; cols: { t: string; cards: string[] }[] }
  | { k: 'chat'; title: string; msgs: { who: 'u' | 'a'; t: string }[] }
  | { k: 'flow'; title: string; nodes: string[] }
  | { k: 'list'; title: string; rows: { t: string; s: string; tag?: string }[] }
  | { k: 'cal'; title: string; events: { d: number; r: number; t: string; h?: number }[] }
  | { k: 'route'; title: string; stops: string[] }
  | { k: 'heat'; title: string; seed: number }
  | { k: 'gauge'; title: string; v: number; sub: string };

export type MockView = {
  label: string;
  kpis: { l: string; v: string; d?: string }[];
  a: Panel;
  b?: Panel;
};

export type MockSpec = {
  /** Titel in der Fensterleiste, z. B. „Pipeline“. */
  screen: string;
  nav: { icon: string; l: string }[];
  views: MockView[];
};

export type SoftwareProduct = {
  slug: string;
  name: string;
  category: CategorySlug;
  icon: string;
  tagline: string;
  summary: string;
  audience: Audience[];
  status: SoftwareStatus;
  headline: [string, string];
  features: Feature[];
  useCases: UseCase[];
  benefits: Benefit[];
  integrations: string[];
  faq: Faq[];
  related: string[];
  /** Hinweis auf bestehende MONVEX-Produkte, die thematisch verwandt sind (keine Verfügbarkeitsaussage). */
  relatedExisting?: { label: string; href: string; note: string };
  mock: MockSpec;
};
