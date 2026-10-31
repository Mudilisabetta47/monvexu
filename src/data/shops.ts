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
      'Shopify-Shop auf Basis der Vorlage Ihrer Branche',
      'Startseite, Kategorien und Produktseiten-Vorlage',
      'Seitenstruktur für Impressum, Datenschutz, AGB und Widerruf (Texte liefern Sie bzw. ein Rechtstext-Anbieter)',
      'Übergabe auf Ihren Namen mit Schritt-für-Schritt-Anleitung',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    tagline: 'Mit Ihrem Auftritt',
    price: 199,
    highlight: true,
    forWho: 'Für Shops, die von Anfang an nach Ihrer Marke aussehen sollen.',
    includes: [
      'Alles aus Start',
      'Logo, Farben und Schriften angepasst',
      'Import von bis zu 20 Produkten aus Ihrer Tabelle',
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
      'Import von bis zu 100 Produkten aus Ihrer Tabelle',
      'Grundeinstellungen für Suchmaschinen (Titel, Beschreibungen)',
      'Gemeinsame Einrichtung von Versand und Zahlungsarten im Videogespräch',
      '30 Tage Support per E-Mail',
    ],
  },
  {
    id: 'individuell',
    name: 'Individuell',
    tagline: 'Nach Ihrem Projekt',
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
  { t: 'Paket und Branche wählen', d: 'Sie wählen Paket und Branchenvorlage und schicken die Bestellung ab.' },
  { t: 'Angaben senden', d: 'Sie nennen uns Name, Farben, Logo und bei Plus/Premium Ihre Produktliste. Fehlt etwas, fragen wir per E-Mail nach.' },
  { t: 'Wir bauen Ihren Shop', d: 'Wir richten den Shop auf Basis der Vorlage ein und prüfen ihn, bevor er an Sie geht.' },
  { t: 'Übergabe mit Anleitung', d: 'Der Shop gehört Ihnen. Sie schließen Shopify-Tarif, Zahlungsarten, Rechtstexte und Domain mit unserer Anleitung ab.' },
];

export const notIncluded = [
  { t: 'Shopify-Tarif', d: 'Den Vertrag mit Shopify schließen Sie selbst. Die laufenden Kosten richten sich nach dem gewählten Tarif.' },
  { t: 'Rechtstexte', d: 'Impressum, Datenschutz, AGB und Widerruf müssen zu Ihrem Geschäft passen. Wir richten die Seiten ein, die Texte kommen von Ihnen oder einem Rechtstext-Anbieter. Wir geben keine Rechtsberatung.' },
  { t: 'Produkte, Bilder, Lieferanten', d: 'Sortiment, Bilder und Bezugsquellen bringen Sie mit. Wir importieren Ihre Daten, wir liefern keine Ware.' },
  { t: 'Domain und Zahlungsanbieter', d: 'Eigene Domain und Auszahlung (Identitätsprüfung) richten Sie mit der Anleitung ein, bei Premium gemeinsam mit uns.' },
  { t: 'Umsatz und Werbung', d: 'Ein Shop ist die Grundlage, kein Umsatzversprechen. Anzeigen und Reichweite sind nicht enthalten.' },
];

export const shopFaq = [
  { q: 'Was bekomme ich genau?', a: 'Einen Shopify-Shop, der nach der Vorlage Ihrer Branche aufgebaut und je nach Paket an Ihre Marke und Produkte angepasst ist. Er wird auf Ihren Namen übergeben, Sie haben vollen Zugriff.' },
  { q: 'Ist Shopify im Preis enthalten?', a: 'Nein. Sie schließen den Shopify-Tarif selbst ab und zahlen ihn direkt an Shopify. Der Paketpreis ist eine Einmalzahlung an MONVEX für den Aufbau.' },
  { q: 'Wie schnell bekomme ich meinen Shop?', a: 'Unser Ziel sind 3 bis 5 Werktage nach vollständigen Angaben. Das ist kein Festtermin. Wenn etwas fehlt, melden wir uns.' },
  { q: 'Sind Produkte enthalten?', a: 'Wir importieren die Produkte, die Sie uns liefern (Tabelle mit Titeln, Preisen, Beschreibungen, Bildern). Wir liefern keine Produkte und vermitteln keine Lieferanten.' },
  { q: 'Sind die Rechtstexte dabei?', a: 'Wir richten die Seiten ein. Die Texte müssen zu Ihrem Geschäft passen und kommen von Ihnen oder einem Rechtstext-Anbieter. Das ist keine Rechtsberatung.' },
  { q: 'Gibt es eine Umsatzgarantie?', a: 'Nein. Wir garantieren keinen Umsatz. Ein Shop ist die Grundlage, mit Kunden kommt er erst durch Ihr Angebot und Ihre Werbung.' },
  { q: 'Was, wenn mir etwas nicht gefällt?', a: 'Je nach Paket sind Korrekturrunden enthalten. Wenn etwas nicht dem Vereinbarten entspricht, bessern wir nach.' },
  { q: 'Kann ich später upgraden?', a: 'Ja. Sie können jederzeit ein größeres Paket oder einzelne Leistungen nachbuchen.' },
];

export const priceLabel = (p: ShopPackage) => (p.price == null ? 'auf Anfrage' : `${p.price} €`);
