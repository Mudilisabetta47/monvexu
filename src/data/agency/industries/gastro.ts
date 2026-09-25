import type { Industry } from '../types';

export const gastronomie: Industry = {
  slug: 'gastronomie',
  name: 'Restaurants, Cafés & Gastronomie',
  group: 'Gastgewerbe & Reisen',
  blurb: 'Website, Reservierung, Social Media und Markenauftritt für Gastronomiebetriebe.',
  seo: {
    title: 'Werbeagentur für Restaurants, Cafés & Gastronomie',
    description:
      'Werbeagentur für Gastronomie: Restaurant- und Café-Website, Reservierung, Social Media, Speisekarten-Design und Markenauftritt. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Gastronomie',
  h1: 'Gastronomie-Marketing, das Tische füllt und Stammgäste bindet',
  lead: 'Gäste entscheiden mit den Augen und dem Handy: Foto, Karte, Öffnungszeiten, Reservierung. Wir bringen Atmosphäre und Praxis zusammen.',
  segments: ['Restaurants', 'Cafés & Bäckereien', 'Bars & Lounges', 'Catering & Events'],
  problems: [
    { title: 'Atmosphäre geht online verloren', text: 'Ein Restaurant lebt von Stimmung. Stockfotos und lieblose Seiten vermitteln das Gegenteil.' },
    { title: 'Speisekarte und Öffnungszeiten veraltet', text: 'Nichts verärgert Gäste mehr als falsche Öffnungszeiten oder eine PDF-Karte, die am Handy nicht lesbar ist.' },
    { title: 'Reservierungen per Telefon', text: 'Zur Stoßzeit ist niemand am Telefon. Eine einfache Online-Reservierung fängt Gäste auf.' },
    { title: 'Social Media als Dauerbelastung', text: 'Regelmäßig posten ist Arbeit. Ohne Plan bleibt es bei Zufallsbeiträgen.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Website mit Atmosphäre', text: 'Große Bilder, mobile Speisekarte, aktuelle Öffnungszeiten und Reservierung – schnell und klar.' },
    { service: 'social-media', title: 'Social Media mit Plan', text: 'Redaktionsplan, Fotos und Kurzvideos, die Ihr Team und Ihre Gerichte zeigen.' },
    { service: 'branding', title: 'Markenauftritt und Speisekarten-Design', text: 'Logo, Farbwelt, Speisekarten, Aufsteller und Fensterfolien aus einem Guss.' },
    { service: 'seo', title: 'Lokale Sichtbarkeit', text: 'Gepflegtes Google-Profil, Bewertungen und Suchbegriffe wie „Frühstück in [Stadtteil]“.' },
    { service: 'buchungssysteme-crm', title: 'Reservierungssystem', text: 'Tischreservierung mit Kapazitätslogik, Bestätigung und Erinnerung.' },
  ],
  examples: [
    { title: 'Mobile Speisekarte', text: 'Eine Karte, die am Smartphone lesbar ist, sich schnell aktualisieren lässt und Allergene übersichtlich darstellt.' },
    { title: 'Reservierung mit Bestätigung', text: 'Gäste wählen Datum, Uhrzeit und Personenzahl; das System berücksichtigt Ihre Kapazität und bestätigt automatisch.' },
    { title: 'Event- und Catering-Anfrage', text: 'Ein Formular für Feiern und Firmenevents mit Personenzahl, Anlass und Budgetrahmen.' },
  ],
  faq: [
    { q: 'Brauche ich als Café eine eigene Website?', a: 'Ja: Öffnungszeiten, Karte und Anfahrt gehören auf eine Seite, die Sie selbst kontrollieren. Social Media allein reicht nicht, weil Inhalte dort schwer auffindbar sind.' },
    { q: 'Kann ich die Speisekarte selbst ändern?', a: 'Ja. Wir bauen die Karte so, dass Sie Gerichte und Preise einfach selbst pflegen können.' },
    { q: 'Wie bekomme ich mehr Google-Bewertungen?', a: 'Durch einen einfachen Prozess: freundliche Bitte am Tisch oder auf der Rechnung mit QR-Code zum Bewertungsformular – ohne gekaufte Bewertungen.' },
  ],
  cta: {
    headline: 'Machen Sie Appetit auf Ihr Lokal.',
    text: 'Erzählen Sie uns von Ihrem Konzept. Wir zeigen, wie Auftritt und Reservierung Ihre Gäste erreichen.',
  },
  related: ['hotels', 'onlineshops', 'immobilien'],
};

export const hotels: Industry = {
  slug: 'hotels',
  name: 'Hotels & Ferienwohnungen',
  group: 'Gastgewerbe & Reisen',
  blurb: 'Direktbuchung, Website, Bildsprache und lokale Sichtbarkeit für Beherbergungsbetriebe.',
  seo: {
    title: 'Werbeagentur für Hotels & Ferienwohnungen',
    description:
      'Werbeagentur für Hotels, Pensionen und Ferienwohnungen: Website mit Direktbuchung, Bildsprache, SEO und Social Media. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Hotels & Ferienwohnungen',
  h1: 'Mehr Direktbuchungen für Hotel und Ferienwohnung',
  lead: 'Buchungsportale nehmen Provision und Kundenbeziehung. Mit einer starken eigenen Website gewinnen Sie Gäste direkt und behalten Ihre Marge.',
  segments: ['Hotels & Pensionen', 'Ferienwohnungen', 'Boutique-Hotels', 'Tagungs- und Eventlocations'],
  problems: [
    { title: 'Portalabhängigkeit', text: 'Wer fast nur über Portale gebucht wird, zahlt jede Buchung mit Provision und kennt seine Gäste kaum.' },
    { title: 'Bilder überzeugen nicht', text: 'Gäste entscheiden visuell. Unscharfe oder generische Fotos kosten Buchungen.' },
    { title: 'Saison und Auslastung', text: 'Nebensaison-Termine bleiben leer, wenn Angebote nicht sichtbar sind.' },
    { title: 'Mehrsprachigkeit', text: 'Internationale Gäste erwarten verständliche Seiten in ihrer Sprache.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Website mit Direktbuchung', text: 'Zimmer- und Wohnungsübersicht, Bildsprache, Preise, Verfügbarkeit und ein klarer Buchungsweg.' },
    { service: 'buchungssysteme-crm', title: 'Buchungs- und Anfragesystem', text: 'Verfügbarkeiten, Anfragen und Bestätigungen in einem System, auf Wunsch mit Anbindung an Kanalmanager.' },
    { service: 'seo', title: 'Lokale und Reise-Suchen', text: 'Inhalte zu Region, Ausflugszielen und Angeboten, die Gäste bereits beim Planen erreichen.' },
    { service: 'social-media', title: 'Inspirierende Bilder', text: 'Redaktionsplan mit Saisonthemen, Region und Gästeerlebnissen.' },
  ],
  examples: [
    { title: 'Angebots-Landingpages', text: 'Pauschalen wie Wellness-Wochenende oder Familienwoche mit eigener Seite und Buchungsanfrage.' },
    { title: 'Regionsseiten mit echtem Wissen', text: 'Ausflugsziele, Wanderrouten und Tipps aus Ihrer Region, die Gäste zum Buchen inspirieren.' },
  ],
  faq: [
    { q: 'Kann eine eigene Website Portale ersetzen?', a: 'Nicht vollständig, aber ergänzen. Ziel ist, den Anteil der Direktbuchungen zu erhöhen und Provisionen zu senken.' },
    { q: 'Wie funktioniert ein Buchungssystem?', a: 'Gäste sehen Verfügbarkeit und Preise, buchen oder fragen an und erhalten Bestätigung. Sie behalten Überblick und Kontrolle.' },
    { q: 'Sind mehrsprachige Seiten möglich?', a: 'Ja, mit sauberer Sprachstruktur, damit auch die Suchmaschinen sie richtig zuordnen.' },
  ],
  cta: {
    headline: 'Mehr Gäste, die direkt bei Ihnen buchen.',
    text: 'Erzählen Sie uns von Ihrem Haus. Wir zeigen, wie Website und Buchungsweg zu mehr Direktbuchungen führen.',
  },
  related: ['gastronomie', 'busunternehmen', 'immobilien'],
};

export const busunternehmen: Industry = {
  slug: 'busunternehmen',
  name: 'Busunternehmen & Reiseveranstalter',
  group: 'Gastgewerbe & Reisen',
  blurb: 'Buchungsstrecken, Fahrzeugbeschriftung, Reiseangebote und Anfragen für Bus- und Reiseanbieter.',
  seo: {
    title: 'Werbeagentur für Busunternehmen & Reiseveranstalter',
    description:
      'Werbeagentur für Busunternehmen, Reiseveranstalter und Reisebüros: Buchungsstrecke, Reiseangebote, Flottenbeschriftung, SEO und Ads. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Bus & Reise',
  h1: 'Mehr Buchungen für Busreisen und Gruppenfahrten',
  lead: 'Ob Tagesfahrt, Gruppenreise oder Transfer: Kunden wollen Preis, Termin und Verfügbarkeit sofort sehen. Ein klarer Buchungsweg und eine erkennbare Marke zahlen sich aus.',
  segments: ['Busunternehmen', 'Reiseveranstalter', 'Reisebüros', 'Gruppen- und Vereinsfahrten'],
  problems: [
    { title: 'Anfragen für Gruppenfahrten sind aufwendig', text: 'Vereine und Firmen fragen individuell an. Wer Anfragen nicht strukturiert erfasst, verliert Zeit und Aufträge.' },
    { title: 'Angebote gehen unter', text: 'Reiseangebote und Fahrten brauchen eigene, saisonal aktuelle Seiten, sonst finden Kunden sie nicht.' },
    { title: 'Flotte als Werbefläche', text: 'Reisebusse sind rollende Werbung. Eine einheitliche Gestaltung steigert Wiedererkennung.' },
    { title: 'Vertrauen bei Anzahlung und Buchung', text: 'Kunden zahlen im Voraus. Klare Bedingungen, Kontaktmöglichkeit und Referenzen bauen Vertrauen auf.' },
  ],
  solutions: [
    { service: 'buchungssysteme-crm', title: 'Buchungs- und Anfragesystem', text: 'Fahrten, Sitzplätze, Gruppenanfragen und Bestätigungen in einem System – auf Wunsch mit Vermittlungslogik.' },
    { service: 'webdesign', title: 'Reise-Website', text: 'Reiseangebote, Termine, Preise, Route und Buchungsweg; mobil zuerst.' },
    { service: 'fahrzeugbeschriftung', title: 'Bus- und Flottenbeschriftung', text: 'Großflächige, gut lesbare Gestaltung, abgestimmt auf Fahrzeugmodell und Marke.' },
    { service: 'seo', title: 'Sichtbarkeit für Reiseziele', text: 'Seiten für Ziele, Anlässe und Gruppenfahrten, die genau die richtigen Suchen bedienen.' },
    { service: 'google-ads', title: 'Saison-Kampagnen', text: 'Anzeigen für Frühbucher, Ausflugssaison und Advents- oder Weihnachtsmarkt-Fahrten.' },
  ],
  examples: [
    { title: 'Gruppenanfrage-Assistent', text: 'Ein Formular fragt Personenzahl, Datum, Route und Sonderwünsche ab und liefert dem Team alle nötigen Angaben.' },
    { title: 'Reisekalender', text: 'Eine Übersicht kommender Fahrten mit Preis, Plätzen und Buchung, die automatisch aktualisiert wird.' },
    { title: 'Flottendesign', text: 'Einheitliche Gestaltung aller Busse mit Logo, Kontakt und QR-Code zur Buchungsseite.' },
  ],
  faq: [
    { q: 'Können Sie eine Busvermittlungs-Plattform bauen?', a: 'Ja. Digitale Vermittlungs- und Buchungsprozesse gehören zu unseren Entwicklungsfeldern; mit Busvermittlung bauen wir selbst ein entsprechendes Angebot auf. Wir klären mit Ihnen, welche Funktionen für Ihren Betrieb nötig sind.' },
    { q: 'Wie funktioniert die Fahrzeugbeschriftung bei Bussen?', a: 'Wir gestalten passend zum Fahrzeugmodell, stimmen Material und Montage mit Partnern ab und berücksichtigen Vorgaben zu Fensterflächen und Kennzeichnung.' },
    { q: 'Wie gewinne ich Vereine und Firmen als Kunden?', a: 'Mit Seiten für Gruppenfahrten, klarer Anfrage und lokaler Sichtbarkeit. Vereine suchen oft erst online und rufen dann an.' },
  ],
  cta: {
    headline: 'Volle Busse durch klare Buchungswege.',
    text: 'Schildern Sie uns Ihr Angebot. Wir zeigen, wie Buchung, Sichtbarkeit und Marke zusammenspielen.',
  },
  related: ['hotels', 'fahrschulen', 'autowerkstaetten'],
};

export const onlineshops: Industry = {
  slug: 'onlineshops',
  name: 'Online-Shops & Einzelhandel',
  group: 'Handel',
  blurb: 'Shop-Entwicklung, Produktdaten, Marketing und Markenaufbau für Händler.',
  seo: {
    title: 'Werbeagentur für Online-Shops & Einzelhandel',
    description:
      'Werbeagentur für Online-Shops und Einzelhändler: Shop-Entwicklung, Produktdaten, SEO, Google Ads und Markenaufbau. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Online-Shops & Einzelhandel',
  h1: 'Online-Shop und Marketing, die Umsatz und Marke aufbauen',
  lead: 'Ein guter Shop überzeugt schon vor dem Kauf: mit klarer Produktdarstellung, Vertrauenssignalen und reibungslosem Checkout. Ergänzt durch Marketing, das die richtigen Besucher bringt.',
  segments: ['Online-Shops', 'Modegeschäfte', 'Einzelhandel mit Filiale', 'B2B-Handel'],
  problems: [
    { title: 'Besucher, die nicht kaufen', text: 'Unklare Produktseiten, versteckte Versandkosten oder ein umständlicher Checkout kosten Umsatz.' },
    { title: 'Abhängigkeit von Marktplätzen', text: 'Wer nur auf Plattformen verkauft, zahlt Gebühren und besitzt die Kundenbeziehung nicht.' },
    { title: 'Produktdaten sind ein Flickenteppich', text: 'Unstrukturierte Daten erschweren Pflege, Suche und Marketing.' },
    { title: 'Stationär und online passen nicht zusammen', text: 'Filialhändler brauchen eine Verbindung aus Ladengeschäft und Online-Auftritt, inklusive lokaler Sichtbarkeit.' },
  ],
  solutions: [
    { service: 'e-commerce', title: 'Shop-Konzept und Umsetzung', text: 'Sortiment, Design, Checkout, Zahlung, Versand und Anbindung an Warenwirtschaft.' },
    { service: 'seo', title: 'SEO für Kategorien und Produkte', text: 'Saubere Struktur, hilfreiche Kategorieseiten und technische Optimierung für gute Auffindbarkeit.' },
    { service: 'google-ads', title: 'Shopping- und Suchkampagnen', text: 'Anzeigen mit klarem Ziel und Auswertung nach Umsatz statt nur Klicks.' },
    { service: 'branding', title: 'Markenaufbau', text: 'Wiedererkennbarer Auftritt für Shop, Verpackung, Social Media und Print.' },
    { service: 'social-media', title: 'Content und Community', text: 'Produktgeschichten, Kurzvideos und Kampagnen, die Käufer aktivieren.' },
  ],
  examples: [
    { title: 'Kategorie-Landingpage', text: 'Eine Kategorie mit Ratgebertext, Filter und ausgewählten Produkten – für Kunden und Suchmaschinen hilfreich.' },
    { title: 'Click & Collect', text: 'Online bestellen, im Laden abholen – die Brücke für Händler mit Filiale.' },
    { title: 'Produktdaten-Import', text: 'Bestehende Produktlisten werden bereinigt und in eine pflegbare Struktur überführt.' },
  ],
  faq: [
    { q: 'Welches Shop-System ist das richtige?', a: 'Das hängt von Sortiment, Prozessen und Budget ab. Wir empfehlen ein System nach Bedarf, nicht nach Gewohnheit.' },
    { q: 'Lohnt sich ein eigener Shop neben Marktplätzen?', a: 'Meist ja: Eigene Kunden, bessere Marge und Markenbindung. Marktplätze bleiben ergänzend sinnvoll.' },
    { q: 'Was kostet ein Shop?', a: 'Das ist stark umfangsabhängig. Nach Klärung von Sortiment, Funktionen und Anbindungen nennen wir eine belastbare Größenordnung.' },
  ],
  cta: {
    headline: 'Vom Sortiment zum Umsatz.',
    text: 'Erzählen Sie uns von Ihren Produkten. Wir zeigen, wie Shop, Marketing und Marke zusammenwirken.',
  },
  related: ['gastronomie', 'busunternehmen', 'hotels'],
};
