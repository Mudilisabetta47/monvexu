/**
 * Folien des Hero-Sliders. Jede Folie hat eine Mondphase (0 = Neumond … 1 = Vollmond).
 * Folie 0 trägt die H1 der Startseite (MONVEX) und ist die einzige mit `h1: true`.
 */
export type HeroSlide = {
  id: string;
  eyebrow: string;
  /** `\n` = Zeilenumbruch, `*wort*` = Serif-Kursiv-Akzent in Orange. */
  title: string;
  lead: string;
  phase: number;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  h1?: boolean;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'monvex',
    eyebrow: '', // wird mit dem Firmennamen gefüllt
    title: "MONVEX\nBuilding what's *next.*",
    lead: 'MONVEX verbindet Technologie, Unternehmertum und Markenentwicklung, um moderne Geschäftsmodelle aufzubauen und langfristig zu entwickeln.',
    phase: 0.1,
    primary: { label: 'Unsere Marken', href: '/#brands' },
    secondary: { label: 'Was wir machen', href: '/#services' },
    h1: true,
  },
  {
    id: 'dachmarke',
    eyebrow: '01 · Dachmarke',
    title: 'One company.\nMultiple *brands.*',
    lead: 'MONVEX entwickelt, betreibt und führt Marken, Produkte und Geschäftsmodelle aus unterschiedlichen Bereichen.',
    phase: 0.3,
    primary: { label: 'Unsere Marken', href: '/#brands' },
    secondary: { label: 'Alle Marken entdecken', href: '/brands' },
  },
  {
    id: 'werbeagentur',
    eyebrow: '02 · Werbeagentur',
    title: 'Wir machen Ihre\nMarke *sichtbar.*',
    lead: 'Webdesign, SEO, Google Ads, Branding und Print: Ihre Werbeagentur aus Bremen. Persönlich, modern und mit dem Ziel, dass am Ende Anfragen stehen.',
    phase: 0.52,
    primary: { label: 'Zur Werbeagentur', href: '/werbeagentur' },
    secondary: { label: 'KI-Website-Check', href: '/website-check' },
  },
  {
    id: 'lab',
    eyebrow: '03 · MONVEX Lab',
    title: 'Ideas become\n*products.*',
    lead: 'Im MONVEX Lab entstehen neue digitale Produkte, Plattformen und Geschäftsmodelle.',
    phase: 0.76,
    primary: { label: 'Zum Lab', href: '/#lab' },
  },
  {
    id: 'business',
    eyebrow: '04 · From idea to business',
    title: 'Von der Idee zum\n*Unternehmen.*',
    lead: 'Von der Idee über Entwicklung und Markenaufbau bis zum laufenden Betrieb – mit klarem Fokus auf langfristige Strukturen.',
    phase: 1,
    primary: { label: 'Kontakt aufnehmen', href: '/#kontakt' },
    secondary: { label: 'So arbeiten wir', href: '/#prozess' },
  },
];
