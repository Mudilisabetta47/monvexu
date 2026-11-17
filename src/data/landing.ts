/**
 * Kurze Landingpages für bezahlte Anzeigen (Google Ads, Meta).
 * Je Seite ein Suchbegriff in H1/Title, wenige klare Aussagen, ein Formular.
 * Bewusst KEINE Preisangabe und keine Zeit-/Ergebnisversprechen, die wir nicht belegen können.
 * Die Seiten sind noindex: Sie sind für Anzeigen gedacht, nicht als zweite Branchenseite neben /werbeagentur/<branche>.
 */
export type Landing = {
  slug: string;
  /** Kurzname für Formularthema und Breadcrumbs */
  name: string;
  /** <title> (ohne Marken-Suffix) */
  title: string;
  description: string;
  h1: string;
  lead: string;
  /** Suchbegriffe, die in Anzeigen und Text vorkommen (Referenz für die Anzeigenplanung) */
  keywords: string[];
  benefits: { t: string; d: string }[];
  faq: { q: string; a: string }[];
  /** Verweis auf die ausführliche Branchenseite */
  more: { label: string; href: string };
};

export const PRICE_FROM: string | null = null; // z. B. 'ab 990 €' – erst eintragen, wenn der Preis feststeht und gelten soll

const process3 = [
  { n: '1', t: 'Kurz anfragen', d: 'Formular oder Anruf, ein paar Stichpunkte reichen.' },
  { n: '2', t: 'Angebot vorab', d: 'Sie erhalten vor dem Start ein schriftliches Angebot mit Leistungsumfang.' },
  { n: '3', t: 'Umsetzung und Start', d: 'Wir bauen, Sie geben frei, die Seite geht online.' },
] as const;
export const landingProcess = process3;

export const landings: Landing[] = [
  {
    slug: 'fahrschule',
    name: 'Fahrschule',
    title: 'Fahrschul-Website erstellen lassen – schnell & günstig',
    description: 'Fahrschul-Website erstellen lassen: modern, mobil optimiert, mit Anmeldung für Fahrschüler. Persönliches Angebot vorab. MONVEX aus Bremen.',
    h1: 'Fahrschul-Website erstellen lassen. Schnell und günstig.',
    lead: 'Eine Website, die Fahrschüler auf dem Handy überzeugt: Klassen, Preise, Anmeldung und Standort sofort sichtbar.',
    keywords: ['Fahrschul-Website erstellen', 'Website für Fahrschule', 'Fahrschule Homepage erstellen lassen', 'Fahrschul-Homepage'],
    benefits: [
      { t: 'Fahrschüler finden Sie', d: 'Klare Seiten für Führerscheinklassen, Preise und Standorte, sauber für die Suche aufgebaut.' },
      { t: 'Anmeldung in Minuten', d: 'Ein kurzes Formular statt Telefon-Tennis. Anfragen kommen direkt bei Ihnen an.' },
      { t: 'Auf dem Handy gemacht', d: 'Die meisten Fahrschüler suchen mobil. Die Seite ist dafür gebaut und lädt schnell.' },
    ],
    faq: [
      { q: 'Was kostet eine Fahrschul-Website?', a: 'Das hängt von Umfang und Wünschen ab. Sie erhalten nach einem kurzen Gespräch ein schriftliches Angebot, bevor wir starten.' },
      { q: 'Brauche ich eigene Texte und Fotos?', a: 'Nein, nicht zwingend. Wir helfen bei Texten und Aufbau. Eigene Fotos von Fahrzeugen und Team machen die Seite aber persönlicher.' },
      { q: 'Kann ich später selbst etwas ändern?', a: 'Ja, das besprechen wir vorab. Auf Wunsch übernehmen wir auch Änderungen und Pflege.' },
    ],
    more: { label: 'Mehr zu Websites für Fahrschulen', href: '/werbeagentur/fahrschulen' },
  },
  {
    slug: 'rechtsanwalt',
    name: 'Kanzlei',
    title: 'Anwalts-Website erstellen lassen – professionell & günstig',
    description: 'Kanzlei-Website erstellen lassen: seriös, übersichtlich und mobil optimiert. Persönliches Angebot vorab. MONVEX aus Bremen.',
    h1: 'Anwalts-Website erstellen lassen. Seriös und günstig.',
    lead: 'Eine Kanzlei-Website, die Vertrauen schafft: Rechtsgebiete, Ansprechpartner und Erstkontakt klar und ohne Umwege.',
    keywords: ['Anwalt Website erstellen', 'Kanzlei Homepage erstellen lassen', 'Website für Rechtsanwälte', 'Kanzlei-Website'],
    benefits: [
      { t: 'Vertrauen auf den ersten Blick', d: 'Ruhiges, klares Design, Ihre Rechtsgebiete und Personen im Vordergrund.' },
      { t: 'Mandanten finden den Weg', d: 'Pro Rechtsgebiet eine eigene Seite, damit Suchende genau Ihr Thema finden.' },
      { t: 'Impressum und Datenschutz bedacht', d: 'Pflichtangaben sauber eingebunden. Die berufsrechtliche Prüfung Ihrer Texte bleibt bei Ihnen.' },
    ],
    faq: [
      { q: 'Was kostet eine Kanzlei-Website?', a: 'Das hängt von Umfang und Rechtsgebieten ab. Sie erhalten vor dem Start ein schriftliches Angebot.' },
      { q: 'Kümmern Sie sich um die Pflichtangaben?', a: 'Wir binden Impressum und Datenschutz technisch ein. Den Inhalt der Pflichtangaben und die berufsrechtliche Zulässigkeit der Werbung prüfen Sie bzw. Ihre Kammer.' },
      { q: 'Können Mandanten online anfragen?', a: 'Ja, mit einem kurzen Formular. Auf Wunsch weisen wir auf Schweigepflicht und Datenschutz hin.' },
    ],
    more: { label: 'Mehr zu Websites für Kanzleien', href: '/werbeagentur/anwaelte' },
  },
  {
    slug: 'arztpraxis',
    name: 'Praxis',
    title: 'Praxis-Website erstellen lassen – modern & günstig',
    description: 'Arztpraxis-Website erstellen lassen: übersichtlich, mobil optimiert, mit Terminanfrage. Persönliches Angebot vorab. MONVEX aus Bremen.',
    h1: 'Praxis-Website erstellen lassen. Modern und günstig.',
    lead: 'Öffnungszeiten, Leistungen und Terminanfrage sofort auffindbar, auch für Patienten, die nur kurz auf dem Handy schauen.',
    keywords: ['Praxis Website erstellen', 'Arztpraxis Homepage erstellen lassen', 'Website für Arztpraxis', 'Praxis-Homepage'],
    benefits: [
      { t: 'Das Wichtigste sofort', d: 'Öffnungszeiten, Anfahrt, Telefon und Leistungen ohne Suchen.' },
      { t: 'Terminanfrage online', d: 'Ein schlankes Formular entlastet das Telefon. Wir binden auf Wunsch auch Ihr Terminsystem ein.' },
      { t: 'Datenschutz im Blick', d: 'Sparsame Datenerhebung und saubere Einbindung der Pflichtseiten.' },
    ],
    faq: [
      { q: 'Was kostet eine Praxis-Website?', a: 'Das hängt vom Umfang ab. Sie erhalten vor dem Start ein schriftliches Angebot.' },
      { q: 'Dürfen Heilversprechen auf die Seite?', a: 'Nein, das regelt das Heilmittelwerbegesetz. Wir bleiben bei sachlichen Angaben zu Leistungen und Ablauf. Die Freigabe der Texte liegt bei Ihnen.' },
      { q: 'Läuft das mit meinem Terminsystem?', a: 'Meist ja, das klären wir im Erstgespräch.' },
    ],
    more: { label: 'Mehr zu Websites für Praxen', href: '/werbeagentur/aerzte' },
  },
  {
    slug: 'handwerker',
    name: 'Handwerksbetrieb',
    title: 'Handwerker-Website erstellen lassen – schnell & günstig',
    description: 'Handwerker-Website erstellen lassen: Leistungen, Referenzen und Anfrage auf einen Blick, mobil optimiert. MONVEX aus Bremen.',
    h1: 'Handwerker-Website erstellen lassen. Schnell und günstig.',
    lead: 'Zeigen Sie, was Sie können, und lassen Sie Kunden direkt anfragen. Mit Leistungen, Einsatzgebiet und Fotos Ihrer Arbeit.',
    keywords: ['Handwerker Website erstellen', 'Homepage für Handwerksbetrieb', 'Website Handwerker günstig', 'Handwerker Homepage'],
    benefits: [
      { t: 'Anfragen statt Visitenkarte', d: 'Kunden sehen Leistungen und Einsatzgebiet und fragen direkt an.' },
      { t: 'Ihre Arbeit im Bild', d: 'Eine Galerie mit Ihren Projekten, damit Kunden sehen, was sie bekommen.' },
      { t: 'Vor Ort gefunden', d: 'Saubere Seite für die Suche in Ihrer Region, mit Telefon und Anfahrt.' },
    ],
    faq: [
      { q: 'Was kostet eine Handwerker-Website?', a: 'Das hängt vom Umfang ab. Sie erhalten vor dem Start ein schriftliches Angebot.' },
      { q: 'Muss ich Texte schreiben?', a: 'Nein, nicht allein. Stichpunkte reichen, wir formulieren daraus die Seiten.' },
      { q: 'Gibt es das auch mit Google-Anzeigen?', a: 'Ja, auf Wunsch betreuen wir auch Anzeigen. Das ist ein getrenntes Angebot.' },
    ],
    more: { label: 'Mehr zu Websites für Handwerker', href: '/werbeagentur/handwerk' },
  },
  {
    slug: 'autowerkstatt',
    name: 'Autowerkstatt',
    title: 'Autowerkstatt-Website erstellen lassen – günstig',
    description: 'Werkstatt-Website erstellen lassen: Leistungen, Terminanfrage und Anfahrt, mobil optimiert. MONVEX aus Bremen.',
    h1: 'Autowerkstatt-Website erstellen lassen. Günstig und mobil.',
    lead: 'Leistungen, Öffnungszeiten und Terminanfrage ohne Umwege: für Kunden, die gerade eine Werkstatt in der Nähe suchen.',
    keywords: ['Werkstatt Website erstellen', 'Autowerkstatt Homepage', 'Website für Autohaus', 'KFZ-Werkstatt Website'],
    benefits: [
      { t: 'Termin per Klick', d: 'Kunden fragen Termine online an, Sie sparen Telefonzeit.' },
      { t: 'Leistungen klar benannt', d: 'Inspektion, Reifen, HU: pro Leistung eine klare Darstellung.' },
      { t: 'In der Nähe gefunden', d: 'Aufbau für die lokale Suche und eine gepflegte Standortseite.' },
    ],
    faq: [
      { q: 'Was kostet eine Werkstatt-Website?', a: 'Das hängt vom Umfang ab. Sie erhalten vor dem Start ein schriftliches Angebot.' },
      { q: 'Kann ich Aktionen selbst eintragen?', a: 'Das klären wir vorab. Auf Wunsch übernehmen wir die Pflege.' },
      { q: 'Machen Sie auch Fahrzeugbeschriftung?', a: 'Ja, als Teil unserer Agentur-Leistungen. Das ist ein eigenes Angebot.' },
    ],
    more: { label: 'Mehr zu Websites für Autowerkstätten', href: '/werbeagentur/autowerkstaetten' },
  },
  {
    slug: 'busunternehmen',
    name: 'Busunternehmen',
    title: 'Busunternehmen Website erstellen lassen',
    description: 'Website für Busunternehmen und Reiseveranstalter: Charteranfrage, Flotte und Reisen übersichtlich. Von den Machern von MONVEX BusOS.',
    h1: 'Busunternehmen-Website erstellen lassen. Mit Charteranfrage.',
    lead: 'Flotte, Reisen und eine Charteranfrage, die Daten liefert, mit denen Sie sofort kalkulieren können. Von den Entwicklern von MONVEX BusOS.',
    keywords: ['Busunternehmen Website', 'Reisebus Homepage erstellen', 'Website für Reiseveranstalter', 'Charteranfrage Website'],
    benefits: [
      { t: 'Charteranfrage mit System', d: 'Ein Formular, das Datum, Strecke und Personenzahl strukturiert aufnimmt.' },
      { t: 'Flotte und Reisen im Bild', d: 'Fahrzeuge, Ausstattung und Angebote übersichtlich und mobil.' },
      { t: 'Passt zu BusOS', d: 'Wer später unsere Betriebssoftware nutzen möchte, hat eine passende Anbindung. BusOS ist noch in Entwicklung.' },
    ],
    faq: [
      { q: 'Was kostet eine Busunternehmen-Website?', a: 'Das hängt vom Umfang ab. Sie erhalten vor dem Start ein schriftliches Angebot.' },
      { q: 'Ist BusOS schon erhältlich?', a: 'Nein, BusOS ist noch in Entwicklung und läuft intern im Demo-Betrieb. Die Website funktioniert unabhängig davon.' },
      { q: 'Können Fahrgäste online buchen?', a: 'Eine Anfrage ist möglich. Eine echte Online-Buchung besprechen wir im Erstgespräch.' },
    ],
    more: { label: 'Mehr zu Websites für Busunternehmen', href: '/werbeagentur/busunternehmen' },
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    title: 'Restaurant-Website erstellen lassen – günstig',
    description: 'Restaurant-Website erstellen lassen: Speisekarte, Reservierung und Anfahrt, mobil optimiert. MONVEX aus Bremen.',
    h1: 'Restaurant-Website erstellen lassen. Günstig und appetitlich.',
    lead: 'Speisekarte, Öffnungszeiten und Reservierung auf einen Blick, mit Bildern, die Lust auf den Besuch machen.',
    keywords: ['Restaurant Website erstellen', 'Café Homepage erstellen lassen', 'Website für Gastronomie', 'Restaurant Homepage'],
    benefits: [
      { t: 'Karte und Zeiten sofort', d: 'Gäste sehen Speisekarte, Öffnungszeiten und Anfahrt ohne Suchen.' },
      { t: 'Reservierung per Anfrage', d: 'Ein einfaches Formular oder die Anbindung Ihres Systems.' },
      { t: 'Schnell auf dem Handy', d: 'Gäste entscheiden unterwegs. Die Seite lädt zügig und ist für kleine Bildschirme gebaut.' },
    ],
    faq: [
      { q: 'Was kostet eine Restaurant-Website?', a: 'Das hängt vom Umfang ab. Sie erhalten vor dem Start ein schriftliches Angebot.' },
      { q: 'Kann die Speisekarte oft wechseln?', a: 'Ja. Wie Sie sie aktualisieren, legen wir vorab fest. Auf Wunsch übernehmen wir das.' },
      { q: 'Brauche ich professionelle Fotos?', a: 'Gute Fotos helfen sehr. Wir beraten, was sich lohnt.' },
    ],
    more: { label: 'Mehr zu Websites für Gastronomie', href: '/werbeagentur/gastronomie' },
  },
];

export const getLanding = (slug: string) => landings.find((l) => l.slug === slug);
