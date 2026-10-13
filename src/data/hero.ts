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
    lead: 'MONVEX entwickelt Software und eigene digitale Produkte: Plattformen für Busunternehmen und die digitale Kfz-Zulassung, dazu Marken, Webentwicklung und Marketing.',
    phase: 0.08,
    primary: { label: 'Unsere Produkte', href: '/produkte' },
    secondary: { label: 'Was wir machen', href: '/#services' },
    h1: true,
  },
  {
    id: 'produkte',
    eyebrow: '01 · Eigene Produkte',
    title: 'Eigene Software.\nEigene *Plattformen.*',
    lead: 'MONVEX BusOS für Busunternehmen (in Entwicklung) und EasyKFZ24 für die digitale Kfz-Zulassung: Produkte, die wir selbst entwickeln.',
    phase: 0.24,
    primary: { label: 'Alle Produkte', href: '/produkte' },
    secondary: { label: 'EasyKFZ24 ansehen', href: '/produkte/easykfz24' },
  },
  {
    id: 'dachmarke',
    eyebrow: '02 · Dachmarke',
    title: 'One company.\nMultiple *brands.*',
    lead: 'MONVEX entwickelt, betreibt und führt Marken, Produkte und Geschäftsmodelle aus unterschiedlichen Bereichen.',
    phase: 0.4,
    primary: { label: 'Unsere Marken', href: '/#brands' },
    secondary: { label: 'Alle Marken entdecken', href: '/brands' },
  },
  {
    id: 'werbeagentur',
    eyebrow: '03 · Werbeagentur',
    title: 'Wir machen Ihre\nMarke *sichtbar.*',
    lead: 'Webdesign, SEO, Google Ads, Branding und Print: Ihre Werbeagentur aus Bremen. Persönlich, modern und mit dem Ziel, dass am Ende Anfragen stehen.',
    phase: 0.58,
    primary: { label: 'Zur Werbeagentur', href: '/werbeagentur' },
    secondary: { label: 'KI-Website-Check', href: '/website-check' },
  },
  {
    id: 'lab',
    eyebrow: '04 · MONVEX Lab',
    title: 'Ideas become\n*products.*',
    lead: 'Im MONVEX Lab entstehen neue digitale Produkte, Plattformen und Geschäftsmodelle.',
    phase: 0.78,
    primary: { label: 'Zum Lab', href: '/#lab' },
  },
  {
    id: 'business',
    eyebrow: '05 · From idea to business',
    title: 'Von der Idee zum\n*Unternehmen.*',
    lead: 'Von der Idee über Entwicklung und Markenaufbau bis zum laufenden Betrieb – mit klarem Fokus auf langfristige Strukturen.',
    phase: 1,
    primary: { label: 'Kontakt aufnehmen', href: '/#kontakt' },
    secondary: { label: 'So arbeiten wir', href: '/#prozess' },
  },
];
