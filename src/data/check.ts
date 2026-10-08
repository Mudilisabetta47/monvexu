/**
 * Zielseiten für den kostenlosen Website-Check (QR-Code auf Flyern).
 * Bewusst kurz und noindex: reine Aktionsseiten, keine SEO-Konkurrenz zu den Branchenseiten.
 * Neue Branche: Eintrag ergänzen, Route entsteht automatisch (/check/<slug>).
 */
export type CheckVariant = {
  slug: string; // '' = allgemein (/check)
  audience: string;
  title: string;
  h1: string;
  lead: string;
  checks: { icon: 'MapPin' | 'Smartphone' | 'MessageSquare' | 'UserPlus' | 'Search' | 'ShieldCheck' | 'CalendarCheck'; title: string; text: string }[];
  topic: string;
};

export const checkVariants: CheckVariant[] = [
  {
    slug: '',
    audience: 'Unternehmen',
    title: 'Kostenloser Website-Check für Ihr Unternehmen',
    h1: 'Kostenloser Website-Check für Ihr Unternehmen',
    lead: 'Wir prüfen Ihr Google-Profil, Ihre Website und Ihren Kontaktweg und zeigen Ihnen drei konkrete Verbesserungen. Ohne Verpflichtung.',
    checks: [
      { icon: 'MapPin', title: 'Google-Profil', text: 'Werden Sie gefunden, wenn jemand in Ihrer Nähe sucht?' },
      { icon: 'Smartphone', title: 'Website auf dem Handy', text: 'Überzeugt sie in Sekunden und führt sie zur Anfrage?' },
      { icon: 'MessageSquare', title: 'Kontaktweg', text: 'Wie leicht wird aus einem Besucher eine Anfrage?' },
    ],
    topic: 'Website-Check (allgemein)',
  },
  {
    slug: 'fahrschulen',
    audience: 'Fahrschulen',
    title: 'Kostenloser Website-Check für Ihre Fahrschule',
    h1: 'Kostenloser Website-Check für Ihre Fahrschule',
    lead: 'Wir prüfen Ihr Google-Profil, Ihre Website und Ihren Anmeldeweg und zeigen Ihnen drei konkrete Verbesserungen. Ohne Verpflichtung.',
    checks: [
      { icon: 'MapPin', title: 'Google-Profil', text: 'Werden Sie bei „Fahrschule in meiner Nähe“ gefunden?' },
      { icon: 'Smartphone', title: 'Website auf dem Handy', text: 'Überzeugt sie in Sekunden, und ist alles lesbar?' },
      { icon: 'UserPlus', title: 'Anmeldung', text: 'Wie viele Hürden liegen zwischen Interessent und Anmeldung?' },
    ],
    topic: 'Website-Check (Fahrschulen)',
  },
  {
    slug: 'kanzleien',
    audience: 'Kanzleien',
    title: 'Kostenloser Website-Check für Ihre Kanzlei',
    h1: 'Kostenloser Website-Check für Ihre Kanzlei',
    lead: 'Wir prüfen Ihre Website, Ihr Google-Profil und Ihren Erstkontakt und zeigen Ihnen drei konkrete Verbesserungen, sachlich und ohne Verpflichtung.',
    checks: [
      { icon: 'Search', title: 'Rechtsgebiete', text: 'Finden Mandanten Sie bei den Themen, die Sie tatsächlich bearbeiten?' },
      { icon: 'ShieldCheck', title: 'Vertrauen', text: 'Zeigt Ihr Auftritt Qualifikation, Schwerpunkte und Seriosität?' },
      { icon: 'CalendarCheck', title: 'Erstkontakt', text: 'Ist die Erstberatung auf dem Handy diskret und einfach anzufragen?' },
    ],
    topic: 'Website-Check (Kanzleien)',
  },
];

export const getCheckVariant = (slug: string) => checkVariants.find((v) => v.slug === slug);
export const checkPath = (v: CheckVariant) => (v.slug ? `/check/${v.slug}` : '/check');
