import type { AgencyService, ServiceCategory, ServiceSlug } from './types';

export const categoryLabel: Record<ServiceCategory, string> = {
  design: 'Marke & Design',
  web: 'Web & Software',
  marketing: 'Marketing & Sichtbarkeit',
  print: 'Print & Werbemittel',
  betrieb: 'Betrieb & Betreuung',
};

/** Vollständiger Leistungskatalog (jede Zeile = eine Einzelleistung) und die Seite, die sie abdeckt. */
export const serviceCatalog: { name: string; page: ServiceSlug }[] = [
  { name: 'Webdesign', page: 'webdesign' },
  { name: 'Landingpages', page: 'webdesign' },
  { name: 'Webentwicklung', page: 'webentwicklung' },
  { name: 'Individuelle Webanwendungen', page: 'webentwicklung' },
  { name: 'SEO', page: 'seo' },
  { name: 'Google Ads', page: 'google-ads' },
  { name: 'Performance Marketing', page: 'online-marketing' },
  { name: 'Online-Marketing', page: 'online-marketing' },
  { name: 'Social Media Marketing', page: 'social-media' },
  { name: 'Content Creation', page: 'social-media' },
  { name: 'Branding', page: 'branding' },
  { name: 'Logo Design', page: 'branding' },
  { name: 'Corporate Design', page: 'branding' },
  { name: 'Grafikdesign', page: 'branding' },
  { name: 'Flyer', page: 'print-werbemittel' },
  { name: 'Broschüren', page: 'print-werbemittel' },
  { name: 'Plakate', page: 'print-werbemittel' },
  { name: 'Visitenkarten', page: 'print-werbemittel' },
  { name: 'Werbemittel', page: 'print-werbemittel' },
  { name: 'Fahrzeugbeschriftung', page: 'fahrzeugbeschriftung' },
  { name: 'E-Commerce', page: 'e-commerce' },
  { name: 'Buchungssysteme', page: 'buchungssysteme-crm' },
  { name: 'CRM-/Admin-Systeme', page: 'buchungssysteme-crm' },
  { name: 'Wartung & Betreuung', page: 'wartung-hosting' },
  { name: 'Hosting & technische Betreuung', page: 'wartung-hosting' },
];

export const agencyServices: AgencyService[] = [
  {
    slug: 'webdesign',
    name: 'Webdesign',
    category: 'web',
    short: 'Websites und Landingpages, die Vertrauen aufbauen und Anfragen auslösen.',
    covers: ['Webdesign', 'Landingpages'],
    seo: {
      title: 'Webdesign & Landingpages von MONVEX',
      description:
        'Webdesign, das Anfragen erzeugt: konzeptionell, mobil zuerst und schnell. Websites und Landingpages der Werbeagentur MONVEX aus Bremen.',
    },
    h1: 'Webdesign, das Anfragen erzeugt – nicht nur gut aussieht',
    lead: 'Eine Website ist Ihr wichtigster Vertriebsmitarbeiter: Sie ist rund um die Uhr erreichbar und entscheidet in Sekunden über Vertrauen. Wir gestalten sie entsprechend.',
    paragraphs: [
      'Bevor wir gestalten, klären wir, wer Ihre Website besucht, was diese Menschen wissen wollen und welche eine Handlung Sie sich am Ende wünschen: einen Anruf, eine Anmeldung, ein Angebot, einen Termin. Aus dieser Antwort entstehen Aufbau, Texte und Design – nicht umgekehrt.',
      'Technisch setzen wir auf schnelle, saubere Seiten ohne unnötigen Ballast. Der Großteil Ihrer Besucher kommt heute vom Smartphone, deshalb entwerfen wir mobil zuerst und prüfen Ladezeit, Lesbarkeit und Bedienbarkeit auf echten Geräten. Landingpages für einzelne Kampagnen, etwa für Google Ads, bauen wir als schlanke, klar fokussierte Seiten.',
    ],
    deliverables: [
      'Struktur- und Inhaltskonzept',
      'Individuelles Design (kein Baukasten-Template)',
      'Responsive Umsetzung, mobil zuerst',
      'Anfrage- und Kontaktfunktionen',
      'Grundlegende technische SEO-Ausstattung',
      'Datenschutzgerechte Einbindung (Impressum, Datenschutz, Einwilligungen)',
    ],
    benefits: [
      { title: 'Klarer Zweck', text: 'Jede Seite hat ein definiertes Ziel und einen erkennbaren nächsten Schritt.' },
      { title: 'Schnell und mobil', text: 'Kurze Ladezeiten und eine Bedienung, die auf dem Smartphone funktioniert.' },
      { title: 'Erweiterbar', text: 'Die Basis wächst mit: neue Seiten, Funktionen oder Kampagnen ohne Neuanfang.' },
    ],
    faq: [
      { q: 'Wie lange dauert ein Website-Projekt?', a: 'Das hängt von Umfang und Vorbereitung ab. Eine kompakte Unternehmensseite lässt sich in wenigen Wochen umsetzen, umfangreichere Projekte planen wir in Abschnitten. Einen belastbaren Zeitplan erhalten Sie nach dem Erstgespräch.' },
      { q: 'Erstellen Sie auch die Texte und Bilder?', a: 'Ja, auf Wunsch übernehmen wir Textkonzept und Bildauswahl oder arbeiten mit Ihrem vorhandenen Material. Entscheidend ist, dass Inhalte zur Zielgruppe passen und nicht austauschbar klingen.' },
      { q: 'Kann ich die Website später selbst pflegen?', a: 'Wenn Sie das möchten, richten wir die Pflege so ein, dass Sie Inhalte selbst ändern können. Alternativ übernehmen wir die laufende Betreuung.' },
    ],
  },
  {
    slug: 'webentwicklung',
    name: 'Webentwicklung',
    category: 'web',
    short: 'Individuelle Webanwendungen, Portale und Schnittstellen – maßgeschneidert statt Standard.',
    covers: ['Webentwicklung', 'Individuelle Webanwendungen'],
    seo: {
      title: 'Webentwicklung & individuelle Webanwendungen',
      description:
        'Webentwicklung nach Maß: individuelle Webanwendungen, Portale und Schnittstellen. Technische Umsetzung mit Next.js und TypeScript von MONVEX aus Bremen.',
    },
    h1: 'Webentwicklung nach Maß – von der Idee bis zum laufenden System',
    lead: 'Wenn Standardlösungen an ihre Grenzen kommen, entwickeln wir Webanwendungen, die zu Ihren Abläufen passen – nicht umgekehrt.',
    paragraphs: [
      'Viele Unternehmen behelfen sich mit Tabellen, E-Mail-Verkehr und mehreren Tools, die nicht miteinander sprechen. Wir bauen daraus ein zusammenhängendes System: Portale für Kunden, interne Verwaltungsoberflächen, Anfrage-Workflows oder Schnittstellen zu bestehender Software.',
      'Wir arbeiten mit modernen, etablierten Technologien wie TypeScript, React und Next.js. Das Ergebnis ist wartbar, dokumentiert und lässt sich später von anderen Entwicklern weiterführen – Sie sind nicht von uns abhängig, auch wenn Sie uns gern langfristig behalten dürfen.',
    ],
    deliverables: [
      'Anforderungsklärung und technisches Konzept',
      'Entwicklung in überschaubaren Etappen mit Abnahmen',
      'Schnittstellen (APIs) zu bestehenden Systemen',
      'Rollen- und Rechtekonzept',
      'Datenschutz- und Sicherheitsgrundlagen von Anfang an',
      'Dokumentation und Übergabe',
    ],
    benefits: [
      { title: 'Passgenau', text: 'Funktionen, die Ihre Abläufe abbilden, statt Kompromisse eines Standardprodukts.' },
      { title: 'Etappenweise', text: 'Sie sehen früh lauffähige Ergebnisse und steuern die nächsten Schritte mit.' },
      { title: 'Nachhaltig', text: 'Saubere Architektur, damit das System wachsen und gepflegt werden kann.' },
    ],
    faq: [
      { q: 'Für welche Projekte lohnt sich eine Individualentwicklung?', a: 'Immer dann, wenn ein Prozess Ihr Geschäft prägt und Standardsoftware ihn nicht sauber abbildet – etwa bei Buchung, Disposition, Kundenportalen oder Verwaltungsoberflächen.' },
      { q: 'Wie werden die Kosten kalkuliert?', a: 'Nach einer Anforderungsklärung teilen wir das Projekt in Etappen auf. So wissen Sie vorab, was der nächste Abschnitt kostet, und behalten Kontrolle über das Budget.' },
      { q: 'Wem gehört der Quellcode?', a: 'Das klären wir transparent im Angebot. Ziel ist eine Lösung, die für Sie langfristig nutzbar und nicht an uns gebunden ist.' },
    ],
  },
  {
    slug: 'seo',
    name: 'SEO',
    category: 'marketing',
    short: 'Suchmaschinenoptimierung mit Substanz: technisch sauber, lokal stark, inhaltlich nützlich.',
    covers: ['SEO'],
    seo: {
      title: 'SEO & lokale Suchmaschinenoptimierung',
      description:
        'SEO ohne Tricks: technische Optimierung, hilfreiche Inhalte und lokale Sichtbarkeit bei Google. Suchmaschinenoptimierung von MONVEX aus Bremen.',
    },
    h1: 'SEO, das auf Substanz baut – lokal und überregional',
    lead: 'Gefunden werden, wenn Menschen suchen: Wir kombinieren saubere Technik, hilfreiche Inhalte und lokale Signale zu Sichtbarkeit, die bleibt.',
    paragraphs: [
      'Suchmaschinenoptimierung ist kein Trick, sondern Handwerk. Google will Nutzern die beste Antwort auf ihre Frage liefern. Unsere Aufgabe ist es, Ihre Seite so aufzubauen, dass sie diese Antwort ist: technisch einwandfrei, inhaltlich hilfreich und für Suchmaschinen eindeutig strukturiert.',
      'Für Betriebe mit Einzugsgebiet ist die lokale Suche entscheidend. Dazu gehören ein gepflegtes Google-Unternehmensprofil, konsistente Firmendaten, Standortseiten mit echtem Inhalt und Bewertungen. Massenhaft kopierte Ortsseiten lehnen wir ab – sie schaden mehr, als sie nützen.',
    ],
    deliverables: [
      'Technischer SEO-Check und Behebung von Schwachstellen',
      'Keyword- und Suchintentionsanalyse',
      'Strukturierte Daten, saubere Metadaten und Sitemap',
      'Inhaltsplanung mit echtem Mehrwert',
      'Lokale SEO: Google-Unternehmensprofil und Standortseiten',
      'Transparentes Reporting ohne Zahlen-Nebel',
    ],
    benefits: [
      { title: 'Nachhaltig', text: 'Wir setzen auf Maßnahmen, die Richtlinien-konform sind und langfristig tragen.' },
      { title: 'Lokal relevant', text: 'Sichtbarkeit genau dort, wo Ihre Kunden suchen – im Einzugsgebiet.' },
      { title: 'Nachvollziehbar', text: 'Sie sehen, was wir tun und warum, und welche Wirkung erkennbar ist.' },
    ],
    faq: [
      { q: 'Wie schnell wirkt SEO?', a: 'SEO ist ein mittelfristiger Kanal. Technische Verbesserungen wirken oft zuerst, Inhalte und Autorität brauchen Zeit. Wer schnelle Anfragen braucht, kombiniert SEO sinnvoll mit Google Ads.' },
      { q: 'Können Sie ein Ranking garantieren?', a: 'Nein, und wer das verspricht, sollte hinterfragt werden. Wir garantieren saubere Arbeit, klare Priorisierung und transparente Auswertung.' },
      { q: 'Was ist lokale SEO?', a: 'Optimierung für ortsbezogene Suchen wie „Fahrschule in meiner Nähe“ – mit Google-Unternehmensprofil, Bewertungen, konsistenten Firmendaten und Standortinhalten.' },
    ],
  },
  {
    slug: 'google-ads',
    name: 'Google Ads',
    category: 'marketing',
    short: 'Bezahlte Suchanzeigen mit klarem Ziel: passende Anfragen statt bloßer Klicks.',
    covers: ['Google Ads'],
    seo: {
      title: 'Google Ads Agentur: Anfragen statt Klicks',
      description:
        'Google Ads mit Strategie: Kampagnenaufbau, Anzeigentexte, Landingpages und Conversion-Tracking. Ihre Werbeagentur MONVEX aus Bremen.',
    },
    h1: 'Google Ads – Anzeigen, die zu Anfragen führen',
    lead: 'Mit Suchanzeigen erscheinen Sie genau dann, wenn jemand nach Ihrer Leistung sucht. Entscheidend ist, dass aus dem Klick eine Anfrage wird.',
    paragraphs: [
      'Eine gute Kampagne beginnt vor der Anzeige: mit klaren Zielen, einer Auswahl passender Suchbegriffe und einer Seite, auf der Besucher sofort finden, was die Anzeige versprochen hat. Deshalb entwickeln wir Kampagne und Landingpage gemeinsam.',
      'Wir richten Conversion-Tracking ein, damit Sie wissen, welche Anzeigen Anrufe, Formulare oder Buchungen bringen, und steuern Budget entsprechend. Auf Wunsch begrenzen wir Anzeigen auf Ihr Einzugsgebiet und Ihre Öffnungs- oder Erreichbarkeitszeiten.',
    ],
    deliverables: [
      'Zielklärung und Budgetplanung',
      'Kampagnenstruktur und Keyword-Recherche',
      'Anzeigentexte und Erweiterungen',
      'Passende Landingpage',
      'Conversion-Tracking (datenschutzgerecht)',
      'Laufende Optimierung und verständliches Reporting',
    ],
    benefits: [
      { title: 'Schnell sichtbar', text: 'Anzeigen können kurzfristig Anfragen bringen – ideal zum Start oder für Aktionen.' },
      { title: 'Steuerbar', text: 'Budget, Region und Zeiten lassen sich genau festlegen und laufend anpassen.' },
      { title: 'Messbar', text: 'Sie sehen, welche Maßnahmen Anfragen erzeugen, und investieren gezielt dort.' },
    ],
    faq: [
      { q: 'Wie hoch sollte das Budget sein?', a: 'Das hängt von Branche, Region und Wettbewerb ab. Nach der Keyword-Analyse nennen wir eine realistische Größenordnung, bevor Sie sich festlegen.' },
      { q: 'Wer zahlt die Klicks?', a: 'Die Klickkosten zahlen Sie direkt an Google. Unser Honorar für Aufbau und Betreuung wird separat und transparent vereinbart.' },
      { q: 'Brauche ich eine eigene Landingpage?', a: 'In den meisten Fällen ja. Eine auf die Anzeige abgestimmte Seite steigert die Chance auf eine Anfrage deutlich gegenüber der allgemeinen Startseite.' },
    ],
  },
  {
    slug: 'social-media',
    name: 'Social Media & Content',
    category: 'marketing',
    short: 'Social-Media-Marketing und Content, der zur Marke passt und Reichweite aufbaut.',
    covers: ['Social Media Marketing', 'Content Creation'],
    seo: {
      title: 'Social Media Marketing & Content Creation',
      description:
        'Social Media Marketing und Content Creation aus einer Hand: Konzept, Beiträge, Kurzvideos und Community-Aufbau. MONVEX Werbeagentur aus Bremen.',
    },
    h1: 'Social Media und Content, der zu Ihrer Marke passt',
    lead: 'Reichweite entsteht nicht durch Dauerposting, sondern durch Inhalte, die Ihre Zielgruppe wirklich interessieren – regelmäßig und erkennbar Ihre.',
    paragraphs: [
      'Wir beginnen mit der Frage, auf welchen Kanälen Ihre Zielgruppe tatsächlich unterwegs ist – und lassen den Rest weg. Statt überall halbherzig präsent zu sein, konzentrieren wir uns auf wenige Plattformen und liefern dort verlässlich.',
      'Content Creation umfasst Fotos, Grafiken und Kurzvideos ebenso wie Texte und Redaktionsplanung. Auf Wunsch entwickeln wir wiederkehrende Formate, damit Ihr Auftritt wiedererkennbar wird und die Produktion planbar bleibt.',
    ],
    deliverables: [
      'Kanal- und Zielgruppenanalyse',
      'Redaktionsplan und Content-Formate',
      'Grafiken, Fotos und Kurzvideos',
      'Community-Management auf Wunsch',
      'Bezahlte Social-Media-Kampagnen',
      'Monatliche Auswertung',
    ],
    benefits: [
      { title: 'Fokussiert', text: 'Wenige, gut gewählte Kanäle statt Streuverlust.' },
      { title: 'Wiedererkennbar', text: 'Einheitliche Gestaltung und Tonalität, abgeleitet aus Ihrer Marke.' },
      { title: 'Planbar', text: 'Redaktionsplan und feste Abläufe entlasten Ihr Tagesgeschäft.' },
    ],
    faq: [
      { q: 'Welche Plattformen bespielen Sie?', a: 'Das richtet sich nach Ihrer Zielgruppe, typischerweise Instagram, Facebook, LinkedIn, TikTok oder YouTube. Wir empfehlen nur Kanäle, die für Sie sinnvoll sind.' },
      { q: 'Muss ich selbst Material liefern?', a: 'Nicht zwingend. Für authentische Einblicke ist Material aus Ihrem Alltag hilfreich, den Rest produzieren oder gestalten wir.' },
      { q: 'Lohnt sich Social Media für regionale Betriebe?', a: 'Ja, wenn Inhalte lokalen Bezug haben und Vertrauen aufbauen – etwa Team, Abläufe und Ergebnisse. Bezahlte Reichweite lässt sich auf Ihr Einzugsgebiet begrenzen.' },
    ],
  },
  {
    slug: 'online-marketing',
    name: 'Online-Marketing & Performance',
    category: 'marketing',
    short: 'Kanalübergreifendes Online- und Performance-Marketing mit klaren Zielen und Messung.',
    covers: ['Online-Marketing', 'Performance Marketing'],
    seo: {
      title: 'Online-Marketing & Performance Marketing',
      description:
        'Online-Marketing und Performance Marketing mit klarer Strategie: Kanäle, Budget, Tracking und Optimierung. MONVEX Werbeagentur aus Bremen.',
    },
    h1: 'Online-Marketing mit Strategie und messbarem Ergebnis',
    lead: 'Wir verbinden Suche, Anzeigen, Social Media und Website zu einem Zusammenspiel, das Sie steuern und bewerten können.',
    paragraphs: [
      'Einzelne Maßnahmen wirken selten allein. Eine Anzeige braucht eine gute Landingpage, eine Landingpage braucht Vertrauen, und Vertrauen braucht Sichtbarkeit. Wir planen deshalb Kanäle, Budget und Botschaft gemeinsam und legen fest, woran wir Erfolg messen.',
      'Performance Marketing bedeutet für uns: Entscheidungen auf Basis von Daten, nicht Bauchgefühl. Wir testen Anzeigenvarianten, werten Ergebnisse aus und verschieben Budget dorthin, wo es Anfragen oder Umsatz bringt.',
    ],
    deliverables: [
      'Marketing-Strategie und Zielsystem',
      'Kanal- und Budgetplanung',
      'Kampagnen in Suche, Social und Display',
      'Tracking-Setup und Dashboard',
      'A/B-Tests und laufende Optimierung',
      'Regelmäßiger Review-Termin',
    ],
    benefits: [
      { title: 'Zusammenhängend', text: 'Kanäle ergänzen sich, statt nebeneinander zu laufen.' },
      { title: 'Datenbasiert', text: 'Budget wird dorthin gelenkt, wo es nachweislich wirkt.' },
      { title: 'Transparent', text: 'Kennzahlen, die Sie verstehen und einordnen können.' },
    ],
    faq: [
      { q: 'Was unterscheidet Online- von Performance-Marketing?', a: 'Online-Marketing ist der Oberbegriff. Performance Marketing konzentriert sich auf messbare Ergebnisse wie Anfragen, Buchungen oder Verkäufe und optimiert konsequent darauf.' },
      { q: 'Wie starten wir?', a: 'Mit einem Erstgespräch und einer kurzen Bestandsaufnahme Ihrer Website, Kanäle und Ziele. Daraus leiten wir einen priorisierten Plan ab.' },
      { q: 'Gibt es Mindestlaufzeiten?', a: 'Wir vereinbaren Laufzeiten passend zum Vorhaben und halten sie so flexibel wie möglich. Details klären wir im Angebot.' },
    ],
  },
  {
    slug: 'branding',
    name: 'Branding & Design',
    category: 'design',
    short: 'Logo, Corporate Design und Grafikdesign – eine Marke, die erkennbar und konsistent ist.',
    covers: ['Branding', 'Logo Design', 'Corporate Design', 'Grafikdesign'],
    seo: {
      title: 'Branding, Logo & Corporate Design',
      description:
        'Branding, Logo Design und Corporate Design aus einem Guss: Markenstrategie, visuelle Identität und Gestaltungsrichtlinien. MONVEX aus Bremen.',
    },
    h1: 'Branding und Corporate Design mit Wiedererkennungswert',
    lead: 'Eine starke Marke ist mehr als ein Logo: Sie ist ein Versprechen, das an jeder Stelle gleich aussieht und klingt.',
    paragraphs: [
      'Wir entwickeln Marken von der Positionierung bis zur Anwendung: Wofür stehen Sie, für wen, und wie unterscheiden Sie sich? Daraus entstehen Name oder Claim, Logo, Farben, Typografie und Bildsprache. Ein Logo ohne diese Grundlage bleibt Dekoration.',
      'Damit die Marke auch im Alltag konsistent bleibt, fassen wir sie in ein Corporate-Design-Handbuch: Regeln und Vorlagen für Website, Social Media, Geschäftsausstattung, Print und Fahrzeuge. Grafikdesign für einzelne Anlässe bleibt dadurch schnell und einheitlich.',
    ],
    deliverables: [
      'Positionierung und Markenkern',
      'Logo in allen benötigten Varianten',
      'Farb-, Schrift- und Bildwelt',
      'Corporate-Design-Handbuch',
      'Geschäftsausstattung und Vorlagen',
      'Grafikdesign für laufende Anlässe',
    ],
    benefits: [
      { title: 'Eigenständig', text: 'Ein Auftritt, der sich vom Wettbewerb abhebt statt ihn zu imitieren.' },
      { title: 'Konsistent', text: 'Klare Regeln sorgen für einen einheitlichen Eindruck an jedem Kontaktpunkt.' },
      { title: 'Skalierbar', text: 'Vorlagen und Systeme machen künftige Gestaltung schneller und günstiger.' },
    ],
    faq: [
      { q: 'Brauche ich ein komplettes Corporate Design?', a: 'Nicht immer. Für kleinere Betriebe genügt oft ein kompaktes Set aus Logo, Farben, Schrift und Vorlagen. Wir empfehlen, was zu Ihrem Vorhaben passt.' },
      { q: 'Erhalte ich die Rechte am Logo?', a: 'Nutzungsrechte und Übergabe der Dateien regeln wir klar im Angebot, damit Sie Ihre Marke uneingeschränkt einsetzen können.' },
      { q: 'Kann ein bestehendes Logo überarbeitet werden?', a: 'Ja. Eine behutsame Modernisierung erhält den Wiedererkennungswert und beseitigt technische Schwächen, etwa fehlende Varianten.' },
    ],
  },
  {
    slug: 'print-werbemittel',
    name: 'Print & Werbemittel',
    category: 'print',
    short: 'Flyer, Broschüren, Plakate, Visitenkarten und Werbemittel – gestaltet und produktionsreif.',
    covers: ['Flyer', 'Broschüren', 'Plakate', 'Visitenkarten', 'Werbemittel'],
    seo: {
      title: 'Flyer, Broschüren, Plakate & Werbemittel',
      description:
        'Print und Werbemittel: Gestaltung von Flyern, Broschüren, Plakaten und Visitenkarten. Einheitlich zur Marke und druckfertig. MONVEX aus Bremen.',
    },
    h1: 'Print und Werbemittel, die im Alltag wirken',
    lead: 'Digitale Kanäle sind wichtig – doch Visitenkarte, Flyer und Plakat prägen den Eindruck vor Ort. Wir gestalten sie einheitlich zu Ihrer Marke.',
    paragraphs: [
      'Ob Flyer für eine Aktion, Broschüre für Ihr Leistungsspektrum oder Plakat für die Schaufensterfläche: Jedes Werbemittel hat einen Zweck, einen Ort und eine Zielgruppe. Wir gestalten so, dass die Botschaft in wenigen Sekunden ankommt und zum restlichen Auftritt passt.',
      'Wir liefern druckfertige Daten und begleiten auf Wunsch die Produktion – von der Auswahl von Format und Papier bis zur Abstimmung mit der Druckerei. Für Werbeartikel und weitere Werbemittel beraten wir zu sinnvollen, hochwertigen Lösungen.',
    ],
    deliverables: [
      'Layout und Gestaltung nach Ihrem Corporate Design',
      'Texte und Bildauswahl auf Wunsch',
      'Druckfertige Daten mit korrekten Formaten',
      'Beratung zu Papier, Veredelung und Auflage',
      'Begleitung der Produktion auf Wunsch',
      'Anpassbare Vorlagen für Wiederholungen',
    ],
    benefits: [
      { title: 'Einheitlich', text: 'Print, Web und Social wirken wie aus einer Hand.' },
      { title: 'Druckfertig', text: 'Saubere Daten ohne Überraschungen bei der Produktion.' },
      { title: 'Wirksam', text: 'Klare Botschaft und ein eindeutiger nächster Schritt statt Informationsflut.' },
    ],
    faq: [
      { q: 'Drucken Sie selbst?', a: 'Wir gestalten und bereiten druckfertig vor und begleiten die Produktion mit passenden Druckpartnern. Sie erhalten ein Gesamtangebot oder bestellen den Druck selbst.' },
      { q: 'Kann ich einzelne Vorlagen später selbst anpassen?', a: 'Ja, auf Wunsch liefern wir Vorlagen, die Sie für wiederkehrende Anlässe selbst befüllen können.' },
      { q: 'Wie kommt ein QR-Code sinnvoll ins Spiel?', a: 'Ein QR-Code verbindet Print und Web: Er führt zu einer passenden Landingpage, auf der Sie die Wirkung messen können.' },
    ],
  },
  {
    slug: 'fahrzeugbeschriftung',
    name: 'Fahrzeugbeschriftung',
    category: 'print',
    short: 'Fahrzeugbeschriftung und Flottendesign: rollende Werbung, die Aufmerksamkeit bindet.',
    covers: ['Fahrzeugbeschriftung'],
    seo: {
      title: 'Fahrzeugbeschriftung & Flottendesign',
      description:
        'Fahrzeugbeschriftung und Flottendesign: Gestaltung von Firmenwagen, Transportern, Fahrschul- und Busflotten. Einheitlich und auffällig. MONVEX aus Bremen.',
    },
    h1: 'Fahrzeugbeschriftung, die Ihre Flotte zur Marke macht',
    lead: 'Ein beschriftetes Fahrzeug wirbt täglich – im Straßenverkehr, auf Parkplätzen und beim Kunden. Wir gestalten Beschriftungen, die auffallen und lesbar bleiben.',
    paragraphs: [
      'Ein Fahrzeug ist eine bewegte Fläche mit Karosserieformen, Fenstern und Blickwinkeln. Deshalb gestalten wir Beschriftungen am Fahrzeugmodell, nicht auf einer flachen Vorlage: Kontraste, Schriftgrößen und Kontaktdaten müssen aus Abstand und in Bewegung lesbar sein.',
      'Für Betriebe mit mehreren Fahrzeugen entwickeln wir ein Flottendesign, das sich auf verschiedene Modelle übertragen lässt. Wir stimmen Motive, Materialien und Montage mit einem Beklebe-Partner ab und liefern produktionsreife Daten.',
    ],
    deliverables: [
      'Aufmaß-basierte Gestaltung je Fahrzeugmodell',
      'Motiv im Corporate Design',
      'Flottendesign für mehrere Fahrzeuge',
      'Produktionsreife Druck- und Schnittdaten',
      'Abstimmung mit Beklebe-Partnern',
      'Passende Landingpage und Kontaktmöglichkeit zur Beschriftung',
    ],
    benefits: [
      { title: 'Lesbar', text: 'Kontraste und Größen für Abstand, Tempo und wechselnde Lichtverhältnisse.' },
      { title: 'Einheitlich', text: 'Ein durchgängiges Erscheinungsbild über die gesamte Flotte.' },
      { title: 'Dauerhaft wirksam', text: 'Werbung, die täglich sichtbar ist, ohne laufende Mediakosten.' },
    ],
    faq: [
      { q: 'Für welche Fahrzeuge gestalten Sie?', a: 'Für Pkw, Transporter, Lkw, Fahrschulfahrzeuge, Reise- und Linienbusse sowie Anhänger. Die Gestaltung erfolgt immer passend zum konkreten Modell.' },
      { q: 'Wer übernimmt das Bekleben?', a: 'Wir arbeiten mit Beklebe-Partnern zusammen und koordinieren das Projekt. Sie können auch eine eigene Werkstatt beauftragen; dann liefern wir die Daten.' },
      { q: 'Gibt es rechtliche Vorgaben?', a: 'Je nach Fahrzeugart gelten Vorgaben, etwa zu Kennzeichen, Beleuchtung oder Warnmarkierungen. Wir berücksichtigen sie in der Gestaltung, ersetzen aber keine fachliche Prüfung im Einzelfall.' },
    ],
  },
  {
    slug: 'e-commerce',
    name: 'E-Commerce',
    category: 'web',
    short: 'Online-Shops und Commerce-Systeme mit klarer Nutzerführung und sauberer Technik.',
    covers: ['E-Commerce'],
    seo: {
      title: 'E-Commerce: Online-Shops & Commerce-Systeme',
      description:
        'E-Commerce-Entwicklung: Online-Shop, Produktdaten, Checkout und Anbindungen. Von Konzept bis Betrieb. MONVEX Werbeagentur aus Bremen.',
    },
    h1: 'E-Commerce – Online-Shops, die verkaufen und mitwachsen',
    lead: 'Ein Shop ist mehr als eine Produktliste: Er verbindet Sortiment, Vertrauen, Bezahlung und Logistik zu einem reibungslosen Kauferlebnis.',
    paragraphs: [
      'Wir konzipieren und bauen Online-Shops mit Fokus auf klare Produktdarstellung, schnelle Suche und einen Checkout ohne Hürden. Die Wahl der technischen Basis richtet sich nach Ihrem Sortiment und Ihren Prozessen – nicht nach unserer Vorliebe.',
      'Ein Shop lebt von seinen Daten. Deshalb kümmern wir uns um Produktdatenstruktur, Anbindung an Warenwirtschaft oder Zahlungsdienstleister und die rechtlichen Grundlagen wie Widerruf, Preisangaben und Datenschutz. Danach sorgt Marketing für Besucher.',
    ],
    deliverables: [
      'Shop-Konzept und Sortimentsstruktur',
      'Design und Umsetzung',
      'Zahlungs- und Versandanbindung',
      'Produktdatenimport und -pflege',
      'Rechtliche Grundlagen (Impressum, AGB-Einbindung, Widerruf)',
      'Marketing-Anbindung (Suche, Anzeigen, Newsletter)',
    ],
    benefits: [
      { title: 'Reibungslos', text: 'Ein schlanker Checkout senkt Kaufabbrüche.' },
      { title: 'Integriert', text: 'Anbindung an Zahlung, Versand und Warenwirtschaft.' },
      { title: 'Skalierbar', text: 'Vom kleinen Sortiment bis zum umfangreichen Katalog.' },
    ],
    faq: [
      { q: 'Welche Shop-Technologie empfehlen Sie?', a: 'Das entscheiden wir gemeinsam nach Sortiment, Budget und internen Abläufen. Wir bauen sowohl auf etablierten Shop-Systemen als auch individuell.' },
      { q: 'Können bestehende Produktdaten übernommen werden?', a: 'In der Regel ja. Wir importieren Daten aus Tabellen oder Systemen und bereinigen dabei die Struktur.' },
      { q: 'Wer sorgt für Besucher?', a: 'Auf Wunsch übernehmen wir SEO, Google Ads und Social Media, damit Ihr Shop nicht unsichtbar bleibt.' },
    ],
  },
  {
    slug: 'buchungssysteme-crm',
    name: 'Buchungssysteme & CRM',
    category: 'web',
    short: 'Buchungssysteme, CRM- und Admin-Systeme, die Abläufe vereinfachen und Daten ordnen.',
    covers: ['Buchungssysteme', 'CRM-/Admin-Systeme'],
    seo: {
      title: 'Buchungssysteme, CRM- & Admin-Systeme',
      description:
        'Individuelle Buchungssysteme, CRM- und Admin-Systeme: Termine, Anfragen und Kundendaten in einem System. Entwicklung von MONVEX aus Bremen.',
    },
    h1: 'Buchungssysteme und CRM, die Ihren Alltag entlasten',
    lead: 'Anfragen, Termine und Kundendaten liegen oft verstreut. Wir bringen sie in ein System, das Ihre Abläufe versteht.',
    paragraphs: [
      'Ein Buchungssystem nimmt Ihnen wiederkehrende Abstimmungen ab: Kunden wählen Termin oder Leistung selbst, Sie sehen sofort, was ansteht. Wir bauen es passend zu Ihren Regeln – etwa Kapazitäten, Ressourcen, Bestätigungen und Erinnerungen.',
      'CRM- und Admin-Systeme sind die Kommandozentrale dahinter: Kontakte, Vorgänge, Dokumente und Auswertungen an einem Ort, mit Rollen und Rechten. Sie schaffen Überblick, sparen Zeit und reduzieren Fehler, ohne Sie an ein starres Standardprodukt zu binden.',
    ],
    deliverables: [
      'Anforderungsworkshop und Prozessaufnahme',
      'Buchungs- und Terminlogik nach Ihren Regeln',
      'Kunden- und Vorgangsverwaltung',
      'Rollen, Rechte und Protokollierung',
      'E-Mail-Benachrichtigungen und Erinnerungen',
      'Datenschutz- und Sicherheitskonzept',
    ],
    benefits: [
      { title: 'Zeitersparnis', text: 'Weniger Rückfragen, weniger Doppelerfassung, weniger Papier.' },
      { title: 'Überblick', text: 'Alle Vorgänge und Kundendaten an einem Ort.' },
      { title: 'Passend', text: 'Abläufe werden abgebildet, nicht umgebogen.' },
    ],
    faq: [
      { q: 'Wann lohnt sich ein eigenes Buchungssystem?', a: 'Wenn Ihre Regeln zu speziell für Standardtools sind oder wenn Buchung, Verwaltung und Kommunikation ineinandergreifen sollen.' },
      { q: 'Lässt sich das System an bestehende Software anbinden?', a: 'Häufig ja, über Schnittstellen zu Kalendern, Buchhaltung, Zahlungsanbietern oder anderen Systemen.' },
      { q: 'Wie sicher sind die Daten?', a: 'Wir setzen auf Zugriffsbeschränkung, verschlüsselte Übertragung und ein Rechtekonzept. Bei sensiblen Daten stimmen wir zusätzlich die datenschutzrechtlichen Anforderungen mit Ihnen ab.' },
    ],
  },
  {
    slug: 'wartung-hosting',
    name: 'Wartung, Hosting & Betreuung',
    category: 'betrieb',
    short: 'Laufende Betreuung, Updates, Hosting und technischer Support für Ihre digitale Präsenz.',
    covers: ['Wartung & Betreuung', 'Hosting & technische Betreuung'],
    seo: {
      title: 'Website-Wartung, Hosting & technische Betreuung',
      description:
        'Wartung, Hosting und technische Betreuung für Websites und Webanwendungen: Updates, Sicherheit, Backups und Support. MONVEX aus Bremen.',
    },
    h1: 'Wartung, Hosting und Betreuung – damit alles läuft',
    lead: 'Eine Website ist nie „fertig“. Wir halten sie sicher, aktuell und schnell, damit Sie sich um Ihr Geschäft kümmern können.',
    paragraphs: [
      'Software veraltet, Sicherheitslücken werden bekannt, Anforderungen ändern sich. Regelmäßige Wartung schützt Ihre Investition: Wir spielen Updates ein, prüfen Funktion und Ladezeit und beheben Störungen, bevor Besucher sie bemerken.',
      'Auf Wunsch übernehmen wir auch Hosting und Domainverwaltung. Sie erhalten einen festen Ansprechpartner, statt bei Problemen zwischen Anbietern zu vermitteln. Änderungen an Inhalten und kleine Erweiterungen erledigen wir im Rahmen eines Betreuungsvertrags.',
    ],
    deliverables: [
      'Regelmäßige Updates und Sicherheitschecks',
      'Sicherungen und Wiederherstellung',
      'Überwachung von Erreichbarkeit und Leistung',
      'Hosting und Domainverwaltung auf Wunsch',
      'Inhaltliche Änderungen und kleine Erweiterungen',
      'Fester Ansprechpartner',
    ],
    benefits: [
      { title: 'Sicher', text: 'Aktuelle Software und Sicherungen reduzieren Ausfall- und Angriffsrisiken.' },
      { title: 'Sorglos', text: 'Ein Ansprechpartner für Technik, Hosting und Änderungen.' },
      { title: 'Planbar', text: 'Feste Leistungen und Kosten statt unvorhersehbarer Einzelaufträge.' },
    ],
    faq: [
      { q: 'Übernehmen Sie auch Websites, die andere gebaut haben?', a: 'Häufig ja. Wir prüfen zuerst den Zustand und sagen offen, ob eine Betreuung sinnvoll ist oder eine Modernisierung nötig wäre.' },
      { q: 'Was passiert bei einem Ausfall?', a: 'Wir überwachen die Erreichbarkeit und greifen ein. Reaktionszeiten und Umfang legen wir im Betreuungsvertrag fest.' },
      { q: 'Wo werden die Daten gehostet?', a: 'Standort und Anbieter stimmen wir passend zu Ihren Datenschutzanforderungen ab und dokumentieren sie transparent.' },
    ],
  },
];

export const getService = (slug: string) => agencyServices.find((s) => s.slug === slug);
export const servicePath = (slug: ServiceSlug) => `/werbeagentur/leistungen/${slug}`;
