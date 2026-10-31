/**
 * MONVEX Shop-Start: fertig aufgebaute Shopify-Shops als Festpreis-Paket.  ENTWURF – nicht veröffentlicht.
 *
 * PLATZHALTER, die vor dem Start von der Geschäftsführung festgelegt werden müssen:
 *  - Preise (hier: 99 / 199 / 349 €, inkl. MwSt. angenommen), Leistungsumfang je Paket, Lieferzeit-Ziel
 *  - Markenname (hier: „MONVEX Shop-Start“)
 *  - Die Branchenvorlagen (Muster-Shops) müssen existieren, bevor sie beworben werden
 *  - AGB, Widerrufsbelehrung für digitale Dienstleistungen, Datenschutz-Ergänzung
 * Wahrheitsregel: keine erfundenen Bewertungen, Verkaufszahlen, Countdowns, Umsatzversprechen, keine Dropshipping-Lieferanten.
 */
export const SHOPS = {
  name: 'MONVEX Shop-Start',
  basePath: '/shops',
  /** Zielzeit nach vollständigen Angaben des Kunden. Erst nach den ersten Pilotshops auf einen belastbaren Wert setzen. */
  deliveryTarget: '3 bis 5 Werktage',
} as const;

export type ShopPackage = {
  id: 'start' | 'plus' | 'premium' | 'individuell';
  name: string;
  tagline: string;
  /** Preis in Euro, null = auf Anfrage */
  price: number | null;
  highlight?: boolean;
  forWho: string;
  includes: string[];
};

export const packages: ShopPackage[] = [
  {
    id: 'start',
    name: 'Start',
    tagline: 'Der einfache Einstieg',
    price: 99,
    forWho: 'Für alle, die einen sauberen Rahmen wollen und vieles selbst übernehmen.',
    includes: [
      'Shopify-Shop auf Basis der Vorlage deiner Branche',
      'Startseite, Kategorien und Produktseiten-Vorlage',
      'Seitenstruktur für Impressum, Datenschutz, AGB und Widerruf (Texte kommen von dir oder einem Rechtstext-Anbieter)',
      'Übergabe auf deinen Namen mit Schritt-für-Schritt-Anleitung',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    tagline: 'Mit deinem Auftritt',
    price: 199,
    highlight: true,
    forWho: 'Für Shops, die von Anfang an nach deiner Marke aussehen sollen.',
    includes: [
      'Alles aus Start',
      'Logo, Farben und Schriften angepasst',
      'Import von bis zu 20 Produkten aus deiner Tabelle',
      'Menü, Footer und Kontaktseite eingerichtet',
      'Eine Korrekturrunde',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Startklar mit Begleitung',
    price: 349,
    forWho: 'Für alle, die möglichst wenig selbst einrichten wollen.',
    includes: [
      'Alles aus Plus',
      'Import von bis zu 100 Produkten aus deiner Tabelle',
      'Grundeinstellungen für Suchmaschinen (Titel, Beschreibungen)',
      'Gemeinsame Einrichtung von Versand und Zahlungsarten im Videogespräch',
      '30 Tage Support per E-Mail',
    ],
  },
  {
    id: 'individuell',
    name: 'Individuell',
    tagline: 'Nach deinem Projekt',
    price: null,
    forWho: 'Für größere Sortimente, besondere Funktionen oder eigene Designs.',
    includes: ['Umfang und Preis nach Gespräch', 'Eigenes Design und individuelle Funktionen', 'Anbindung an Warenwirtschaft oder Schnittstellen'],
  },
];

export const niches = [
  { id: 'mode', name: 'Mode', emoji: '👗' },
  { id: 'beauty', name: 'Beauty & Pflege', emoji: '💄' },
  { id: 'schmuck', name: 'Schmuck & Accessoires', emoji: '💎' },
  { id: 'home', name: 'Home & Living', emoji: '🏠' },
  { id: 'fitness', name: 'Fitness & Sport', emoji: '🏋️' },
  { id: 'haustiere', name: 'Haustiere', emoji: '🐶' },
  { id: 'kinder', name: 'Kinder & Baby', emoji: '👶' },
  { id: 'elektronik', name: 'Elektronik', emoji: '📱' },
  { id: 'genuss', name: 'Café, Food & Genuss', emoji: '☕' },
  { id: 'geschenke', name: 'Geschenke & Personalisierung', emoji: '🎁' },
  { id: 'handwerk', name: 'Handwerk & Dienstleistung', emoji: '🛠️' },
  { id: 'allgemein', name: 'Allgemeiner Shop', emoji: '🛒' },
] as const;

export const shopSteps = [
  { t: 'Paket und Branche wählen', d: 'Du wählst Paket und Branchenvorlage und schickst die Bestellung ab.' },
  { t: 'Angaben senden', d: 'Du nennst uns Name, Farben, Logo und bei Plus/Premium deine Produktliste. Fehlt etwas, fragen wir per E-Mail nach.' },
  { t: 'Wir bauen deinen Shop', d: 'Wir richten den Shop auf Basis der Vorlage ein und prüfen ihn, bevor er an dich geht.' },
  { t: 'Übergabe mit Anleitung', d: 'Der Shop gehört dir. Shopify-Tarif, Zahlungsarten, Rechtstexte und Domain schließt du mit unserer Anleitung ab.' },
];

export const notIncluded = [
  { t: 'Shopify-Tarif', d: 'Den Vertrag mit Shopify schließt du selbst. Die laufenden Kosten richten sich nach dem gewählten Tarif.' },
  { t: 'Rechtstexte', d: 'Impressum, Datenschutz, AGB und Widerruf müssen zu deinem Geschäft passen. Wir richten die Seiten ein, die Texte kommen von dir oder einem Rechtstext-Anbieter. Wir geben keine Rechtsberatung.' },
  { t: 'Produkte, Bilder, Lieferanten', d: 'Sortiment, Bilder und Bezugsquellen bringst du mit. Wir importieren deine Daten, wir liefern keine Ware.' },
  { t: 'Domain und Zahlungsanbieter', d: 'Eigene Domain und Auszahlung (Identitätsprüfung) richtest du mit der Anleitung ein, bei Premium gemeinsam mit uns.' },
  { t: 'Umsatz und Werbung', d: 'Ein Shop ist die Grundlage, kein Umsatzversprechen. Anzeigen und Reichweite sind nicht enthalten.' },
];

export const shopFaq = [
  { q: 'Was bekomme ich genau?', a: 'Einen Shopify-Shop, der nach der Vorlage deiner Branche aufgebaut und je nach Paket an deine Marke und Produkte angepasst ist. Er wird auf deinen Namen übergeben, du hast vollen Zugriff.' },
  { q: 'Brauche ich Shopify-Erfahrung?', a: 'Nein. Du bekommst eine Schritt-für-Schritt-Anleitung für alles, was nach der Übergabe kommt. Bei Premium richten wir Versand und Zahlungsarten gemeinsam mit dir ein.' },
  { q: 'Ist Shopify im Preis enthalten?', a: 'Nein. Du schließt den Shopify-Tarif selbst ab und zahlst ihn direkt an Shopify. Der Paketpreis ist eine Einmalzahlung an MONVEX für den Aufbau.' },
  { q: 'Wie schnell bekomme ich meinen Shop?', a: 'Unser Ziel sind 3 bis 5 Werktage nach vollständigen Angaben. Das ist kein Festtermin. Wenn etwas fehlt, melden wir uns.' },
  { q: 'Sind Produkte enthalten?', a: 'Wir importieren die Produkte, die du uns lieferst (Tabelle mit Titeln, Preisen, Beschreibungen, Bildern). Wir liefern keine Produkte und vermitteln keine Lieferanten.' },
  { q: 'Sind die Rechtstexte dabei?', a: 'Wir richten die Seiten ein. Die Texte müssen zu deinem Geschäft passen und kommen von dir oder einem Rechtstext-Anbieter. Das ist keine Rechtsberatung.' },
  { q: 'Gibt es eine Umsatzgarantie?', a: 'Nein. Wir garantieren keinen Umsatz. Ein Shop ist die Grundlage, Kunden kommen erst durch dein Angebot und deine Werbung.' },
  { q: 'Was, wenn mir etwas nicht gefällt?', a: 'Je nach Paket sind Korrekturrunden enthalten. Wenn etwas nicht dem Vereinbarten entspricht, bessern wir nach.' },
  { q: 'Kann ich später upgraden?', a: 'Ja. Du kannst jederzeit ein größeres Paket oder einzelne Leistungen nachbuchen.' },
];

/** Kaufhilfe: „Welches Paket passt zu mir?“ */
export const buyingHelp: { text: string; pkg: ShopPackage['id'] }[] = [
  { text: 'Ich will günstig starten und vieles selbst übernehmen.', pkg: 'start' },
  { text: 'Ich will, dass der Shop von Anfang an nach meiner Marke aussieht und meine ersten Produkte drin sind.', pkg: 'plus' },
  { text: 'Ich will möglichst wenig selbst einrichten und Hilfe bei Versand und Zahlung.', pkg: 'premium' },
  { text: 'Ich brauche ein eigenes Design oder besondere Funktionen.', pkg: 'individuell' },
];

/** Vorschau-Paletten der Beispiel-Shops (Marke bewusst „Deine Marke“, keine echten Marken). */
export const nichePreview: Record<string, { bg: string; ink: string; accent: string; headline: string; cats: string[] }> = {
  mode: { bg: '#F6EFE9', ink: '#2A1F1A', accent: '#B5543A', headline: 'Mode, die zu dir passt.', cats: ['Neu', 'Oberteile', 'Hosen', 'Sale'] },
  beauty: { bg: '#FBEFF1', ink: '#3A1F27', accent: '#D4577A', headline: 'Pflege, die man sieht.', cats: ['Pflege', 'Make-up', 'Seren', 'Sets'] },
  schmuck: { bg: '#F4F1EA', ink: '#2B2619', accent: '#B8913A', headline: 'Schmuck für jeden Tag.', cats: ['Ketten', 'Ringe', 'Ohrringe', 'Sets'] },
  home: { bg: '#EEF1EC', ink: '#1F2A22', accent: '#4F7A5A', headline: 'Wohnen mit Charakter.', cats: ['Deko', 'Textilien', 'Licht', 'Küche'] },
  fitness: { bg: '#EAF0F6', ink: '#14202E', accent: '#2563EB', headline: 'Bewegung. Jeden Tag.', cats: ['Training', 'Outfits', 'Zubehör', 'Neu'] },
  haustiere: { bg: '#F6F0E6', ink: '#2A2112', accent: '#C9772B', headline: 'Alles für deinen Liebling.', cats: ['Hunde', 'Katzen', 'Spielzeug', 'Pflege'] },
  kinder: { bg: '#EEF4F8', ink: '#1B2A38', accent: '#4A9BD1', headline: 'Für die Kleinsten.', cats: ['Baby', 'Spielen', 'Kleidung', 'Geschenke'] },
  elektronik: { bg: '#EDEEF2', ink: '#12131A', accent: '#4F46E5', headline: 'Technik, die einfach läuft.', cats: ['Audio', 'Smart Home', 'Zubehör', 'Neu'] },
  genuss: { bg: '#F5EEE6', ink: '#2B1D12', accent: '#8A5A33', headline: 'Genuss zum Mitnehmen.', cats: ['Kaffee', 'Tee', 'Süßes', 'Geschenke'] },
  geschenke: { bg: '#F8EEF0', ink: '#2C1A1F', accent: '#C2415D', headline: 'Geschenke mit Herz.', cats: ['Persönlich', 'Anlässe', 'Sets', 'Neu'] },
  handwerk: { bg: '#EFEFEA', ink: '#1E1F1A', accent: '#E0701B', headline: 'Qualität vom Profi.', cats: ['Leistungen', 'Material', 'Pakete', 'Kontakt'] },
  allgemein: { bg: '#F1F1EF', ink: '#161616', accent: '#FF4A1C', headline: 'Deine Produkte. Dein Shop.', cats: ['Neu', 'Highlights', 'Sets', 'Sale'] },
};

export const priceLabel = (p: ShopPackage) => (p.price == null ? 'auf Anfrage' : `${p.price} €`);

/** Vergleichstabelle (muss zu `packages[].includes` passen). Werte je Paket: Start, Plus, Premium. */
export const comparison: { row: string; v: [string, string, string] }[] = [
  { row: 'Shop nach Vorlage deiner Branche', v: ['✓', '✓', '✓'] },
  { row: 'Startseite, Kategorien, Produktseiten-Vorlage', v: ['✓', '✓', '✓'] },
  { row: 'Seitenstruktur für Rechtstexte', v: ['✓', '✓', '✓'] },
  { row: 'Übergabe auf deinen Namen + Anleitung', v: ['✓', '✓', '✓'] },
  { row: 'Logo, Farben und Schriften angepasst', v: ['–', '✓', '✓'] },
  { row: 'Produktimport aus deiner Tabelle', v: ['–', 'bis 20', 'bis 100'] },
  { row: 'Menü, Footer, Kontaktseite', v: ['–', '✓', '✓'] },
  { row: 'Grundeinstellungen für Suchmaschinen', v: ['–', '–', '✓'] },
  { row: 'Versand und Zahlungsarten gemeinsam im Videogespräch', v: ['–', '–', '✓'] },
  { row: 'Korrekturrunden', v: ['–', '1', '1'] },
  { row: 'Support per E-Mail', v: ['–', '–', '30 Tage'] },
];
