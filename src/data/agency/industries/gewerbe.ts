import type { Industry } from '../types';

export const immobilien: Industry = {
  slug: 'immobilien',
  name: 'Immobilien & Hausverwaltung',
  group: 'Immobilien & Bau',
  blurb: 'Makler-Website, Exposé-Design, Verwaltungsportale und lokale SEO.',
  seo: {
    title: 'Werbeagentur für Immobilienmakler & Hausverwaltungen',
    description:
      'Werbeagentur für Makler, Hausverwaltungen und Immobilienunternehmen: Website, Exposé-Design, Eigentümerportal, lokale SEO und Marke. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Immobilienunternehmen',
  h1: 'Immobilienmarke und Website, die Objekte und Vertrauen verkauft',
  lead: 'Eigentümer vertrauen Ihnen ihr wichtigstes Vermögen an. Ihr Auftritt muss zeigen, dass Sie den Markt vor Ort kennen, transparent arbeiten und Objekte hochwertig präsentieren.',
  segments: ['Immobilienmakler', 'Hausverwaltungen', 'Bauträger & Projektentwickler', 'Immobilienunternehmen'],
  problems: [
    { title: 'Eigentümer akquirieren', text: 'Verkäufer wählen Makler nach Vertrauen und lokaler Kompetenz. Ohne sichtbaren Nachweis, etwa erklärte Marktkenntnis und Ablauf, überzeugen Sie sie nicht.' },
    { title: 'Objekte verlieren auf Portalen', text: 'Auf Immobilienportalen sehen alle Angebote ähnlich aus. Eine eigene Objektpräsentation hebt Ihre Immobilien von der Masse ab.' },
    { title: 'Verwaltung erzeugt viel Kommunikation', text: 'Hausverwaltungen kämpfen mit Anfragen zu Schäden, Abrechnungen und Terminen. Strukturierte Portale sparen Zeit.' },
    { title: 'Lokale Sichtbarkeit', text: '„Makler in [Stadt]“ und „Hausverwaltung [Stadtteil]“ sind umkämpfte Suchen, bei denen Profil und Bewertungen zählen.' },
  ],
  solutions: [
    { service: 'branding', title: 'Immobilienmarke', text: 'Ein hochwertiges Erscheinungsbild für Exposés, Schilder, Website und Fahrzeuge.' },
    { service: 'webdesign', title: 'Website mit Objektpräsentation', text: 'Eigene Objektseiten mit Bildern, Grundrissen, Lage und Anfrageformular – unabhängig von Portalen.' },
    { service: 'buchungssysteme-crm', title: 'Verwaltungs- und Eigentümerportal', text: 'Meldungen, Dokumente und Abrechnungen an einem Ort, mit Rollen für Verwaltung und Bewohner.' },
    { service: 'seo', title: 'Lokale Marktseiten', text: 'Hilfreiche Seiten zu Stadtteilen, Verkaufsablauf und Bewertung – mit echtem lokalem Wissen statt Textbausteinen.' },
    { service: 'print-werbemittel', title: 'Exposés und Schilder', text: 'Exposé-Vorlagen, Visitenkarten, Bauschilder und Werbeflächen im einheitlichen Design.' },
  ],
  examples: [
    { title: 'Objektseite mit Anfrage', text: 'Bilder, Eckdaten, Lage und ein Kontaktformular mit Terminwahl für Besichtigungen.' },
    { title: 'Schadensmeldung für Bewohner', text: 'Ein Formular mit Foto-Upload und Kategorien, das automatisch die zuständige Person informiert.' },
    { title: 'Bewertungs- und Ablaufseite', text: 'Erklärt Eigentümern, wie die Wertermittlung und der Verkaufsprozess aussehen – ehrlich und verständlich.' },
  ],
  faq: [
    { q: 'Brauche ich eine eigene Website, wenn ich Portale nutze?', a: 'Ja. Portale gehören anderen. Eine eigene Website sichert Ihre Marke, Ihre Kontakte und Ihre Sichtbarkeit unabhängig von Portalgebühren.' },
    { q: 'Wie hilft Marketing bei der Eigentümer-Akquise?', a: 'Durch lokale Sichtbarkeit, verständliche Ablauf- und Marktseiten und gute Bewertungen. So lernen Eigentümer Sie kennen, bevor sie anrufen.' },
    { q: 'Kann ein Verwaltungsportal an bestehende Software angebunden werden?', a: 'Häufig ja über Schnittstellen oder Exporte. Wir prüfen im Erstgespräch, welche Anbindung sinnvoll ist.' },
  ],
  cta: {
    headline: 'Ihre Immobilienmarke – vor Ort stark.',
    text: 'Schildern Sie uns Ihr Geschäft und Ihr Gebiet. Wir zeigen, wie Sie Eigentümer gewinnen und Objekte hochwertig präsentieren.',
  },
  related: ['handwerk', 'anwaelte', 'hotels'],
};

export const handwerk: Industry = {
  slug: 'handwerk',
  name: 'Handwerk & Bau',
  group: 'Immobilien & Bau',
  blurb: 'Website, Anfragen, lokale SEO und Fahrzeugbeschriftung für Handwerksbetriebe.',
  seo: {
    title: 'Werbeagentur für Handwerker & Bauunternehmen',
    description:
      'Werbeagentur für Handwerksbetriebe: Elektriker, Sanitär, Heizung, Dach und Bau. Website, lokale SEO, Fahrzeugbeschriftung, Google Ads und Recruiting.',
  },
  eyebrow: 'Werbeagentur für Handwerk & Bau',
  h1: 'Mehr Aufträge und bessere Azubis für Ihren Handwerksbetrieb',
  lead: 'Ihre Kunden suchen im Notfall oder bei Projekten schnell einen zuverlässigen Betrieb in der Nähe. Wir sorgen dafür, dass Sie gefunden werden, professionell wirken und Anfragen einfach eingehen.',
  segments: ['Elektriker', 'Sanitär & Heizung', 'Dachdecker', 'Maler & Ausbau', 'Bauunternehmen', 'Gebäudetechnik'],
  problems: [
    { title: 'Notfall-Suchen gewinnen', text: 'Bei Rohrbruch oder Heizungsausfall entscheidet der erste Treffer. Ohne Google-Profil und lokale Seiten ruft der Kunde jemand anderen an.' },
    { title: 'Anfragen kosten Zeit', text: 'Rückrufe, Fotos per WhatsApp und unklare Angaben binden Zeit. Ein Anfrageformular mit Foto-Upload und Kategorien spart Rückfragen.' },
    { title: 'Nachwuchs fehlt', text: 'Auszubildende und Gesellen suchen online nach Betrieben. Ein moderner Auftritt zeigt Perspektiven und Teamgeist.' },
    { title: 'Ihre Fahrzeuge werben zu wenig', text: 'Firmenwagen sind täglich beim Kunden – oft ohne klare Kontaktdaten oder mit veraltetem Design.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Handwerker-Website', text: 'Leistungen, Referenz-Einblicke, Einzugsgebiet und Anfrageformular mit Foto-Upload – mobil zuerst.' },
    { service: 'seo', title: 'Lokal gefunden werden', text: 'Google-Unternehmensprofil, Leistungsseiten je Gewerk und Einzugsgebiet, Bewertungsprozess.' },
    { service: 'google-ads', title: 'Anzeigen für dringende Aufträge', text: 'Suchanzeigen im Einzugsgebiet, auch zeitlich gesteuert, zum Beispiel für Notdienst-Leistungen.' },
    { service: 'fahrzeugbeschriftung', title: 'Fahrzeugbeschriftung', text: 'Auffällige, gut lesbare Beschriftung mit Telefonnummer und QR-Code zur Anfrageseite.' },
    { service: 'branding', title: 'Betriebsmarke und Arbeitskleidung', text: 'Logo und Design für Fahrzeuge, Kleidung, Baustellenschilder und Angebote.' },
  ],
  examples: [
    { title: 'Anfrage mit Foto-Upload', text: 'Kunden wählen die Leistung, laden ein Foto hoch und nennen einen Wunschzeitraum. Sie sehen vorab, worum es geht.' },
    { title: 'Leistungs- und Gebietsseiten', text: 'Für jedes Gewerk eine hilfreiche Seite, dazu eine Seite pro Einsatzgebiet mit echten Informationen und Ansprechpartnern.' },
    { title: 'Ausbildungsseite', text: 'Ausbildungsberufe, Alltag im Betrieb, Bewerbungsformular und Team-Einblicke.' },
  ],
  faq: [
    { q: 'Was bringt Handwerkern eine Website überhaupt noch?', a: 'Mehr, als viele denken: Kunden prüfen vor dem Anruf online, wer Sie sind. Eine klare Seite mit Leistungen, Gebiet und Kontakt überzeugt und filtert unpassende Anfragen.' },
    { q: 'Lohnt sich Google Ads für kleine Betriebe?', a: 'Kann sich lohnen, vor allem für Notdienste und margenstarke Aufträge. Wir planen Budget und Einzugsgebiet so, dass Sie Kosten und Ergebnis im Blick behalten.' },
    { q: 'Können Sie auch Fahrzeuge und Arbeitskleidung gestalten?', a: 'Ja, im Rahmen des Corporate Designs entwickeln wir Fahrzeugbeschriftung, Arbeitskleidung und Baustellenschilder.' },
  ],
  cta: {
    headline: 'Volle Auftragsbücher beginnen mit Sichtbarkeit.',
    text: 'Nennen Sie uns Gewerk und Einsatzgebiet. Wir zeigen, wie Ihr Betrieb online gefunden wird und Anfragen erhält.',
  },
  related: ['autowerkstaetten', 'immobilien', 'fahrschulen'],
};

export const autowerkstaetten: Industry = {
  slug: 'autowerkstaetten',
  name: 'Autowerkstätten & Autohäuser',
  group: 'Verkehr & Mobilität',
  blurb: 'Werkstatt-Website, Terminbuchung, lokale SEO und Fahrzeug-Präsentation.',
  seo: {
    title: 'Werbeagentur für Autowerkstätten & Autohäuser',
    description:
      'Werbeagentur für Autowerkstätten und Autohäuser: Website, Online-Terminbuchung, lokale SEO, Google Ads und Marke. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Autowerkstätten & Autohäuser',
  h1: 'Werkstatt-Termine online füllen und Kunden langfristig binden',
  lead: 'Autofahrer wollen schnelle Termine, faire Transparenz und einen Betrieb, dem sie ihr Fahrzeug anvertrauen. Ihr Auftritt zeigt, dass Sie all das bieten.',
  segments: ['Freie Werkstätten', 'Markenwerkstätten', 'Autohäuser', 'Reifen- und Karosseriebetriebe'],
  problems: [
    { title: 'Terminanfragen laufen über das Telefon', text: 'Wer in der Werkstatt schraubt, kann nicht ständig ans Telefon. Anrufer, die nicht durchkommen, rufen die nächste Werkstatt an.' },
    { title: 'Saisonspitzen', text: 'Reifenwechsel, HU und Klimaservice erzeugen Spitzen. Wer rechtzeitig sichtbar ist, füllt seine Termine früher.' },
    { title: 'Vertrauen und Transparenz', text: 'Kunden fürchten unklare Kosten. Klare Leistungspakete und erklärte Abläufe schaffen Vertrauen.' },
    { title: 'Fahrzeugpräsentation im Autohaus', text: 'Bestandsfahrzeuge brauchen eine ansprechende, aktuelle Online-Präsentation – sonst gewinnen die Portale.' },
  ],
  solutions: [
    { service: 'buchungssysteme-crm', title: 'Online-Terminbuchung', text: 'Leistung wählen, Wunschtermin angeben, Fahrzeugdaten übermitteln – und Sie erhalten eine strukturierte Anfrage.' },
    { service: 'webdesign', title: 'Werkstatt-Website', text: 'Leistungspakete, Preisbeispiele, Team, Fahrzeugmarken und Anfahrt auf einen Blick.' },
    { service: 'seo', title: 'Lokale SEO', text: 'Sichtbarkeit für Suchen wie „Inspektion in [Ort]“ mit Leistungsseiten und Google-Profil.' },
    { service: 'google-ads', title: 'Saison-Kampagnen', text: 'Anzeigen vor dem Reifenwechsel oder zur HU-Erinnerung, begrenzt auf Ihr Einzugsgebiet.' },
    { service: 'fahrzeugbeschriftung', title: 'Betriebs- und Servicefahrzeuge', text: 'Einheitliche Beschriftung für Hol- und Bringdienst, Kundenersatzwagen und Servicefahrzeuge.' },
  ],
  examples: [
    { title: 'Terminbuchung mit Leistungswahl', text: 'Inspektion, Reifenwechsel, HU oder Klimaservice als klare Auswahl, inklusive Hinweis, was der Termin umfasst.' },
    { title: 'Saison-Landingpage', text: 'Eine Seite für den Reifenwechsel mit Preispaketen, Terminwahl und Erinnerung per E-Mail.' },
    { title: 'Fahrzeugbestand im Autohaus', text: 'Eine eigene Präsentation Ihres Bestands mit Bildern, Ausstattung und Anfrage – synchronisierbar mit Ihrem Bestandssystem.' },
  ],
  faq: [
    { q: 'Welche Vorteile hat eine Online-Terminbuchung für Werkstätten?', a: 'Weniger Telefonate, planbare Auslastung und Anfragen mit Fahrzeugdaten, sodass Sie Termine vorbereiten können.' },
    { q: 'Können Sie unser Bestandssystem im Autohaus anbinden?', a: 'In vielen Fällen ja, über Schnittstellen oder Exporte. Wir prüfen im Erstgespräch, was Ihr System bietet.' },
    { q: 'Was ist mit Bewertungen?', a: 'Zufriedene Kunden nach dem Werkstatttermin um eine Bewertung zu bitten, ist der wirksamste Hebel für lokale Sichtbarkeit – wir richten den Prozess ein.' },
  ],
  cta: {
    headline: 'Terminkalender voll, Telefon ruhig.',
    text: 'Beschreiben Sie Ihren Betrieb und Ihre Auslastung. Wir zeigen, wie Online-Termine und Sichtbarkeit zusammenspielen.',
  },
  related: ['fahrschulen', 'handwerk', 'busunternehmen'],
};
