/**
 * Produktportfolio von MONVEX – einzige Quelle für Startseite, Mega-Menü, Produktseiten, Sitemap und SEO.
 *
 * WAHRHEITSREGEL: Aussagen über Funktionen stammen aus belegten Quellen (Stand 13.10.2026):
 *  - BusOS: Modulkatalog `MONVEXUGOXZ/src/lib/modules.ts` (Flag `implemented`) und die Modul-Dokumentation.
 *    Das Produkt ist intern lauffähig und getestet, aber NICHT öffentlich verfügbar. Öffentliche Darstellung als
 *    „in Entwicklung“ inkl. Demo-Bildern vom Inhaber freigegeben (13.10.2026). Alle Bilder zeigen einen
 *    fiktiven Demo-Betrieb ("Demo Busunternehmen Beta", Beispiel-Kunden).
 *  - EasyKFZ24: öffentlich erreichbare Live-Seite https://easykfz24.de (Texte, Leistungen, Farben).
 * Keine Preise, keine Kennzahlen, keine Kundenreferenzen. Neue Funktion erst eintragen, wenn sie belegt ist.
 *
 * Betreiber-/Eigentumsangaben: MONVEX wird nur als ENTWICKLER genannt. Der Betreiber von EasyKFZ24 ist im Projekt
 * (Impressum-Entwurf mit Platzhaltern) nicht dokumentiert und wird deshalb nicht behauptet.
 */
export type ProductSlug = 'busos' | 'easykfz24';
export type ModuleState = 'available' | 'development';

export type ProductModule = { name: string; text: string; state: ModuleState };

export type Product = {
  slug: ProductSlug;
  name: string;
  wordmark: [string, string];
  tagline: string;
  /** Kurzbeschreibung (Karten, Mega-Menü). */
  short: string;
  /** Langtext (Showcase, Produktseite). */
  description: string;
  status: { label: string; detail: string; tone: 'build' | 'live' };
  href: string;
  external?: string;
  cta: { primary: { label: string; href: string; external?: boolean }; secondary: { label: string; href: string; external?: boolean } };
  theme: { ink: string; accent: string; accent2: string; soft: string; bg: string; line: string };
  seo: { title: string; description: string };
  chips: string[];
};

export const products: Product[] = [
  {
    slug: 'busos',
    name: 'MONVEX BusOS',
    wordmark: ['MONVEX', 'BusOS'],
    tagline: 'Das Betriebssystem für moderne Busunternehmen.',
    short: 'Charteranfragen, Kalkulation, Angebote, Aufträge und Fahrten-Leitstelle in einer digitalen Arbeitsumgebung.',
    description:
      'MONVEX BusOS verbindet zentrale Abläufe eines Busunternehmens in einer digitalen Arbeitsumgebung: von der Charteranfrage über Kalkulation und Angebot bis zur Fahrt in der Leitstelle. Die Plattform ist in Entwicklung und läuft intern mit einem Demo-Betrieb.',
    status: { label: 'In Entwicklung', detail: 'Intern lauffähig, Demo auf Anfrage', tone: 'build' },
    href: '/produkte/busos',
    cta: { primary: { label: 'MONVEX BusOS entdecken', href: '/produkte/busos' }, secondary: { label: 'Demo anfragen', href: '/produkte/busos#demo' } },
    theme: { ink: '#0B2540', accent: '#096A63', accent2: '#2B63F2', soft: '#E2F3F1', bg: '#F1FAF8', line: 'rgba(9,106,99,.18)' },
    seo: {
      title: 'MONVEX BusOS – Betriebssoftware für Busunternehmen',
      description:
        'MONVEX BusOS verbindet Charteranfragen, Kalkulation, Angebote, Aufträge und Leitstelle in einer Software für Busunternehmen. In Entwicklung, Demo auf Anfrage.',
    },
    chips: ['Charter', 'OPS Center', 'Angebote & PDF', 'Fahrer-App', 'MONVEX Connect'],
  },
  {
    slug: 'easykfz24',
    name: 'EasyKFZ24',
    wordmark: ['Easy', 'KFZ24'],
    tagline: 'Kfz-Zulassung. Einfach digital.',
    short: 'Digitale Plattform für Dienstleistungen rund um die Kfz-Zulassung: Vorgang online starten, Unterlagen hochladen, Status abrufen.',
    description:
      'EasyKFZ24 ist eine digitale Plattform für Dienstleistungen rund um die Kfz-Zulassung. Zulassen, ummelden, wiederzulassen oder abmelden: Vorgang online starten, Unterlagen hochladen und den Status jederzeit abrufen.',
    status: { label: 'Online', detail: 'Live auf easykfz24.de', tone: 'live' },
    href: '/produkte/easykfz24',
    external: 'https://easykfz24.de/',
    cta: { primary: { label: 'EasyKFZ24 besuchen', href: 'https://easykfz24.de/', external: true }, secondary: { label: 'Mehr zum Produkt', href: '/produkte/easykfz24' } },
    theme: { ink: '#0A1433', accent: '#2A55FF', accent2: '#3FD8F2', soft: '#EEF3FF', bg: '#F8FAFD', line: 'rgba(42,85,255,.18)' },
    seo: {
      title: 'EasyKFZ24 – digitale Plattform für Kfz-Zulassung',
      description:
        'EasyKFZ24: Kfz zulassen, ummelden, wiederzulassen oder abmelden. Vorgang online starten, Unterlagen hochladen, Status abrufen. Entwickelt von MONVEX.',
    },
    chips: ['Neuzulassung', 'Ummeldung', 'Wiederzulassung', 'Abmeldung', 'Wunschkennzeichen'],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productBySlug = (slug: ProductSlug) => products.find((p) => p.slug === slug)!;

/** Die drei Bereiche der Außendarstellung. */
export const pillars = [
  { id: 'produkte', title: 'Digitale Produkte', text: 'Eigene Software und Plattformen, die wir selbst entwickeln.', href: '/produkte', cta: 'Zu den Produkten' },
  { id: 'software', title: 'Softwareentwicklung', text: 'Individuelle technische Lösungen für Unternehmen: Webanwendungen, Portale und Schnittstellen.', href: '/werbeagentur/leistungen/webentwicklung', cta: 'Zur Softwareentwicklung' },
  { id: 'services', title: 'Digital Services', text: 'Webentwicklung, Integrationen, Digitalisierung und technische Betreuung.', href: '/werbeagentur', cta: 'Zu den Services' },
] as const;

// ------------------------------------------------------------------ BusOS
export const busosModules: ProductModule[] = [
  { name: 'Charter Management', text: 'Anfragen aus Website, E-Mail, Telefon oder manuell, Kalkulation, Angebote als PDF, Aufträge.', state: 'available' },
  { name: 'OPS Center', text: 'Leitstelle für heutige und morgige Fahrten: Zuweisung von Fahrzeug und Fahrer, Konflikt-Hinweise, Live-Übersicht.', state: 'available' },
  { name: 'MONVEX Connect', text: 'Anfrageformular für die eigene Website, Webhooks und Schnittstelle. Das WordPress-Plugin ist in Erprobung.', state: 'available' },
  { name: 'Fahrer-App', text: 'Mobile Fahrer-App (PWA) mit eigenen Einsätzen und Statusmeldungen. Offline-Basis folgt.', state: 'available' },
  { name: 'Stammdaten', text: 'Kunden, Fuhrpark (Basis), Mitarbeiter und Fahrer, Betriebshöfe.', state: 'available' },
  { name: 'Plattform', text: 'Benutzer, Rollen und Rechte, Audit-Protokoll und strikte Trennung der Daten je Unternehmen.', state: 'available' },
  { name: 'Gantt-Disposition', text: 'Zeitachsen-Planung mit Konfliktengine und Szenarien (Advanced Dispatch).', state: 'development' },
  { name: 'Fleet Management', text: 'Wartung, Fahrzeugkosten, Dokumente.', state: 'development' },
  { name: 'Touristik', text: 'Reisen, Buchungen, Sitzplätze, Tickets.', state: 'development' },
  { name: 'Linienplanung', text: 'Linien, Fahrpläne, Umläufe, SEV, Shuttle.', state: 'development' },
  { name: 'Live GPS', text: 'Echte Fahrzeugpositionen und Ankunftszeiten. Im Demo-Betrieb sind die Positionen simuliert.', state: 'development' },
  { name: 'Werkstatt & Buchhaltung', text: 'Werkstattaufträge, Rechnungen, Zahlungen.', state: 'development' },
  { name: 'Kundenportal & Reporting', text: 'Kundenzugang, Angebotsannahme, Auswertungen.', state: 'development' },
  { name: 'KI-Assistent', text: 'Assistenzfunktionen für den Betriebsalltag.', state: 'development' },
];

/** Vom Eingang der Anfrage bis zur Fahrt – so läuft der Prozess im Produkt (durchgängig getestet im Demo-Betrieb). */
export const busosFlow = [
  { n: '01', title: 'Anfrage', text: 'Eine Anfrage kommt über das Formular der Website, per E-Mail, Telefon oder manuell in den Posteingang.' },
  { n: '02', title: 'Kalkulation', text: 'Strecke, Fahrer, Nebenkosten und Aufschlag werden kalkuliert, mit nachvollziehbarer Preisbildung.' },
  { n: '03', title: 'Angebot & PDF', text: 'Das Angebot entsteht als Dokument, wird geprüft, als PDF versendet und im Verlauf versioniert.' },
  { n: '04', title: 'Auftrag', text: 'Nach der Annahme wird aus dem Angebot ein Auftrag mit den Fahrtdaten.' },
  { n: '05', title: 'Fahrt in der Leitstelle', text: 'Im OPS Center werden Fahrzeug und Fahrer zugewiesen, Konflikte erscheinen als Hinweis.' },
  { n: '06', title: 'Fahrer-App', text: 'Der Fahrer sieht seine Einsätze auf dem Smartphone und meldet den Status zurück.' },
];

export const busosFaq = [
  { q: 'Ist MONVEX BusOS schon verfügbar?', a: 'Nein, nicht öffentlich. BusOS ist in Entwicklung und läuft intern mit einem Demo-Betrieb. Ein Start für Kunden ist nicht erfolgt. Interessierte Busunternehmen können eine Demo anfragen.' },
  { q: 'Welche Funktionen gibt es heute?', a: 'Im Demo-Betrieb nutzbar sind Charter Management mit Anfragen, Kalkulation, Angeboten und Aufträgen, das OPS Center, MONVEX Connect, die Fahrer-App sowie Stammdaten und Rechteverwaltung. Weitere Module sind in Entwicklung und auf dieser Seite gekennzeichnet.' },
  { q: 'Sind die gezeigten Bilder echte Kundendaten?', a: 'Nein. Alle Abbildungen stammen aus einem Demo-Betrieb mit fiktiven Daten. Auch die Fahrzeugpositionen im OPS Center sind dort simuliert.' },
  { q: 'Kann ich BusOS mit meiner Website verbinden?', a: 'MONVEX Connect bindet ein Anfrageformular in die eigene Website ein, Anfragen landen im Posteingang von BusOS. Für WordPress gibt es ein Plugin, das sich in Erprobung befindet.' },
];

// ------------------------------------------------------------------ EasyKFZ24
export const easyServices = [
  { id: 'neuzulassung', title: 'Neuzulassung', text: 'Fahrzeug zulassen: Neufahrzeug oder Import.', href: 'https://easykfz24.de/kfz-anmelden/auftrag?leistung=neuzulassung' },
  { id: 'halterwechsel', title: 'Ummeldung bei Halterwechsel', text: 'Fahrzeug auf einen neuen Halter umschreiben.', href: 'https://easykfz24.de/kfz-anmelden/auftrag?leistung=halterwechsel' },
  { id: 'umzug', title: 'Ummeldung bei Umzug', text: 'Adresse ändern, Kennzeichen behalten, wo möglich.', href: 'https://easykfz24.de/kfz-anmelden/auftrag?leistung=umzug' },
  { id: 'wiederzulassung', title: 'Wiederzulassung', text: 'Abgemeldetes Fahrzeug wieder anmelden: nach Stilllegung oder zum Saisonstart.', href: 'https://easykfz24.de/kfz-anmelden/auftrag?leistung=wiederzulassung' },
  { id: 'abmeldung', title: 'Abmeldung', text: 'Fahrzeug digital außer Betrieb setzen: Verkauf, Stilllegung, Export.', href: 'https://easykfz24.de/kfz-anmelden/auftrag?leistung=abmeldung' },
] as const;

export const easyVehicles = ['Auto', 'E-Kennzeichen', 'H-Kennzeichen', 'Traktor', 'Motorrad', 'Leichtkraftrad'];

/** Ablauf wie auf easykfz24.de beschrieben. */
export const easyFlow = [
  { n: '01', title: 'Dein Fahrzeug', text: 'Fahrzeugart und gewünschten Vorgang wählen, optional ein Wunschkennzeichen eintippen.' },
  { n: '02', title: 'Deine Daten', text: 'Daten zu Fahrzeug und Halter in der Auftragsstrecke eingeben, die Eingaben werden geprüft.' },
  { n: '03', title: 'Alles digital', text: 'Benötigte Unterlagen je Leistung online hochladen.' },
  { n: '04', title: 'Wir kümmern uns um den Rest', text: 'EasyKFZ24 übernimmt die Abwicklung mit der Zulassungsstelle.' },
  { n: '05', title: 'Status abrufen', text: 'Mit Auftragsnummer und E-Mail-Adresse jederzeit den Stand des Vorgangs ansehen.' },
];

export const easyFaq = [
  { q: 'Ist EasyKFZ24 eine Behörde?', a: 'Nein. EasyKFZ24 ist ein privater Zulassungsservice. Über Zulassungsvorgänge entscheidet die jeweils zuständige Zulassungsbehörde.' },
  { q: 'Wo beauftrage ich eine Zulassung?', a: 'Ausschließlich auf easykfz24.de. Diese Seite stellt das Produkt vor, hier können keine Vorgänge beauftragt werden.' },
  { q: 'Welche Fahrzeugarten werden unterstützt?', a: 'Auf easykfz24.de lassen sich Auto, E-Kennzeichen, H-Kennzeichen, Traktor, Motorrad und Leichtkraftrad auswählen.' },
];

export const easyColors = [
  { name: 'Navy', hex: '#0A1433' },
  { name: 'Electric Blue', hex: '#2A55FF' },
  { name: 'Cyan', hex: '#3FD8F2' },
  { name: 'Off-White', hex: '#F8FAFD' },
];
