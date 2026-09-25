import type { Region } from './types';

/**
 * Regionen (Bundesländer und Städte). Eine Region wird für eine Branche nur veröffentlicht, wenn
 * `notes[<branchen-slug>]` vorhanden ist – jeder Eintrag ist ein individuell geschriebener Text.
 * Neue Region/Branche: Region ergänzen bzw. `notes` erweitern; Routen, Sitemap und Links folgen automatisch.
 */
export const regions: Region[] = [
  {
    slug: 'niedersachsen',
    name: 'Niedersachsen',
    kind: 'state',
    places: ['Hannover', 'Braunschweig', 'Osnabrück', 'Oldenburg', 'Göttingen', 'Wolfsburg', 'Lüneburg', 'Hildesheim', 'Emden'],
    neighbors: ['bremen', 'hamburg', 'nordrhein-westfalen', 'sachsen-anhalt', 'schleswig-holstein'],
    notes: {
      fahrschulen: {
        intro: 'Niedersachsen ist das zweitgrößte Flächenland Deutschlands: Zwischen Küste, Heide und Harz liegen Landkreise, in denen Bus und Bahn nur begrenzt fahren. Für viele Jugendliche ist der Führerschein hier der Schlüssel zu Ausbildung, Schule und Freizeit.',
        metaDescription: 'Werbeagentur für Fahrschulen in Niedersachsen: Sichtbarkeit in Landkreisen und Städten wie Hannover, Osnabrück und Göttingen – Website, SEO, Ads, Anmeldung.',
        angles: [
          { title: 'Ländlicher Raum: Einzugsgebiet statt Stadtteil', text: 'Fahrschüler in der Fläche suchen nach dem nächstgelegenen Ort, nicht nach dem Stadtteil. Standortseiten für Ihre Unterrichtsorte, ein Google-Profil je Standort und klare Anfahrtsinfos entscheiden, wer angerufen wird.' },
          { title: 'Universitäts- und Messestädte', text: 'In Hannover, Göttingen, Osnabrück oder Oldenburg kommt eine junge, mobile Zielgruppe hinzu: Studierende und Zugezogene mit eigenem Zeitplan. Hier zählen Online-Anmeldung, kurze Wege und flexible Theorietermine.' },
        ],
        faq: { q: 'Wie deckt eine Fahrschule mit mehreren Unterrichtsorten in Niedersachsen ihr Gebiet online ab?', a: 'Mit einer eigenen Seite je Unterrichtsort, die echte Angaben enthält (Adresse, Zeiten, Ansprechpartner), und einem Google-Unternehmensprofil pro Standort. Kopierte Ortsseiten ohne Inhalt lohnen sich nicht – wir bauen nur Seiten, die Besuchern etwas nützen.' },
      },
      anwaelte: {
        intro: 'Die niedersächsische Justiz ist auf die Oberlandesgerichte Celle, Braunschweig und Oldenburg verteilt. Kanzleien in Hannover, Braunschweig, Oldenburg oder im ländlichen Raum arbeiten in sehr unterschiedlichen Märkten – vom Agrar- und Baurecht bis zum Arbeitsrecht rund um große Industriestandorte.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Niedersachsen: seriöse Website, Rechtsgebiete-Seiten und lokale SEO für Hannover, Braunschweig, Oldenburg und die Fläche.',
        angles: [
          { title: 'Stadt und Land: zwei Mandantenwelten', text: 'Kanzleien in Hannover konkurrieren um städtische Privat- und Unternehmensmandate, Kanzleien in der Fläche leben von persönlichem Vertrauen und Weiterempfehlung. Die Website muss diese unterschiedlichen Erwartungen bedienen.' },
          { title: 'Fachgebiete mit regionalem Bezug', text: 'Agrar-, Verkehrs-, Bau- und Arbeitsrecht sind in Niedersachsen besonders gefragt. Eigene Seiten zu diesen Themen, mit regionalen Beispielen, machen Ihre Schwerpunkte in der Suche sichtbar.' },
        ],
        faq: { q: 'Wie zeigt eine Kanzlei in Niedersachsen ihre lokale Nähe?', a: 'Durch klare Standortangaben, ein gepflegtes Google-Profil, Hinweise zu Gerichtsbezirken, in denen Sie regelmäßig tätig sind, und persönliche Profile der Berufsträger. Das schafft Nähe, ohne aufdringlich zu werben.' },
      },
    },
  },
  {
    slug: 'bremen',
    name: 'Bremen',
    kind: 'state',
    places: ['Bremen', 'Bremerhaven', 'Schwachhausen', 'Neustadt', 'Findorff', 'Vegesack', 'Walle', 'Gröpelingen'],
    neighbors: ['niedersachsen', 'hamburg'],
    notes: {
      fahrschulen: {
        intro: 'Das Land Bremen besteht aus den Städten Bremen und Bremerhaven. Als Bremer Agentur sitzen wir selbst in der Kirchbachstraße und kennen die kurzen Wege, die Stadtteile und die lokale Konkurrenz aus eigener Anschauung.',
        metaDescription: 'Werbeagentur für Fahrschulen in Bremen und Bremerhaven: Website, Online-Anmeldung, lokale SEO und Ads – von einer Agentur mit Sitz in Bremen.',
        angles: [
          { title: 'Stadtteile als Suchraum', text: 'In Bremen suchen Fahrschüler oft nach ihrem Stadtteil: Neustadt, Schwachhausen, Vegesack, Walle oder Findorff. Ein Google-Profil mit korrektem Einzugsgebiet und passenden Inhalten sorgt dafür, dass Ihre Fahrschule dort erscheint, wo Ihre Fahrschüler wohnen.' },
          { title: 'Zwei Städte, zwei Märkte', text: 'Bremerhaven hat eigene Wege, Arbeitgeber und Zielgruppen, etwa Hafen- und Seefahrtsberufe. Wer beide Städte bedient, braucht getrennte Standortseiten statt einer gemeinsamen Sammelseite.' },
        ],
        faq: { q: 'Können wir uns als Bremer Fahrschule persönlich beraten lassen?', a: 'Ja. MONVEX hat seinen Sitz in Bremen, Erstgespräche sind auch vor Ort möglich. Wir schauen uns Ihr Einzugsgebiet, Ihre Fahrzeuge und Ihre Unterrichtsräume gemeinsam an.' },
      },
      anwaelte: {
        intro: 'In Bremen sitzen Landgericht und Hanseatisches Oberlandesgericht auf engem Raum; der Markt der Kanzleien ist überschaubar, die Konkurrenz um Sichtbarkeit trotzdem spürbar. Als Agentur mit Sitz in Bremen sprechen wir die Situation vor Ort aus eigener Kenntnis an.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Bremen und Bremerhaven: Kanzlei-Website, lokale SEO und Erstberatung online – von einer Agentur mit Sitz in Bremen.',
        angles: [
          { title: 'Überschaubarer Markt, klare Positionierung', text: 'In einem kleinen Stadtstaat spricht sich Kompetenz herum – und Verwechslungen fallen auf. Eine klare Positionierung auf wenige Rechtsgebiete macht Ihre Kanzlei unverwechselbar.' },
          { title: 'Hafen, Handel, Mittelstand', text: 'Bremer und Bremerhavener Unternehmen aus Handel, Hafenwirtschaft und Logistik suchen Anwälte mit Branchenverständnis. Fachseiten zu diesen Themen zeigen, dass Sie den Markt kennen.' },
        ],
        faq: { q: 'Bieten Sie persönliche Termine für Bremer Kanzleien an?', a: 'Ja, wir sitzen in Bremen und besprechen Auftritt und Umsetzung gern persönlich – diskret und ohne Verkaufsdruck.' },
      },
    },
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    kind: 'state',
    places: ['Hamburg-Mitte', 'Altona', 'Eimsbüttel', 'Hamburg-Nord', 'Wandsbek', 'Bergedorf', 'Harburg'],
    neighbors: ['niedersachsen', 'schleswig-holstein', 'bremen'],
    notes: {
      fahrschulen: {
        intro: 'Hamburg ist Stadtstaat und Metropole mit sieben Bezirken und einem dichten öffentlichen Nahverkehr. Für viele Hamburger ist ein Auto kein Muss – wer den Führerschein macht, tut das aus konkretem Anlass und vergleicht Fahrschulen gründlich.',
        metaDescription: 'Werbeagentur für Fahrschulen in Hamburg: Sichtbarkeit in Bezirken wie Altona, Wandsbek und Harburg – Website, Online-Anmeldung, SEO und Google Ads.',
        angles: [
          { title: 'Bezirke und Quartiere als Suchraum', text: 'Fahrschüler suchen in Hamburg kleinräumig: „Fahrschule Eimsbüttel“, „Fahrschule Harburg“. Bezirksbezogene Inhalte und ein sauberes Google-Profil sind der Weg in die lokale Kartenanzeige.' },
          { title: 'Hoher Wettbewerb, klare Abgrenzung', text: 'In einer Millionenstadt gibt es viele Fahrschulen. Wer sich über Zielgruppen wie Wiedereinsteiger, Intensivkurse oder Zusatzklassen profiliert, sticht heraus.' },
        ],
        faq: { q: 'Lohnt sich Google Ads für Hamburger Fahrschulen bei hoher Konkurrenz?', a: 'Gezielt eingesetzt ja: mit Fokus auf Bezirke, konkrete Klassen und Aktionen. Breite Kampagnen sind teuer; wir starten klein, messen und skalieren nur, was Anmeldungen bringt.' },
      },
      anwaelte: {
        intro: 'Hamburg ist Sitz des Hanseatischen Oberlandesgerichts und ein bedeutender Standort für Handel, Schifffahrt, Medien und Finanzen. Kanzleien reichen von großen Wirtschaftskanzleien bis zu Einzelanwälten in den Quartieren.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Hamburg: sachlicher Kanzlei-Auftritt, Rechtsgebiete-Seiten und lokale SEO für Bezirke und Wirtschaftsrecht.',
        angles: [
          { title: 'Wirtschaftsstandort mit Spezialisierung', text: 'Handels-, See- und Verkehrsrecht, Medienrecht und Gesellschaftsrecht sind in Hamburg besonders präsent. Spezialisierte Fachseiten machen Ihre Schwerpunkte in der Suche auffindbar.' },
          { title: 'Quartier oder Metropole?', text: 'Privatmandanten suchen nach Anwälten in ihrem Bezirk, Unternehmen nach Fachkanzleien in der ganzen Stadt. Beide Zielgruppen brauchen unterschiedliche Einstiegsseiten.' },
        ],
        faq: { q: 'Wie hebt sich eine Hamburger Kanzlei von der großen Konkurrenz ab?', a: 'Durch klare Positionierung, sichtbare Qualifikationen und Fachbeiträge zu Ihren Schwerpunkten. Reichweite bringt hier weniger als Relevanz für eine definierte Zielgruppe.' },
      },
    },
  },
  {
    slug: 'berlin',
    name: 'Berlin',
    kind: 'state',
    places: ['Mitte', 'Charlottenburg-Wilmersdorf', 'Friedrichshain-Kreuzberg', 'Pankow', 'Neukölln', 'Spandau', 'Steglitz-Zehlendorf', 'Lichtenberg'],
    neighbors: ['brandenburg'],
    notes: {
      fahrschulen: {
        intro: 'Berlin hat zwölf Bezirke, eine große internationale Bevölkerung und einen dichten Nahverkehr. Fahrschulen in der Hauptstadt bedienen eine besonders vielfältige Zielgruppe – und einen besonders vielfältigen Markt.',
        metaDescription: 'Werbeagentur für Fahrschulen in Berlin: mehrsprachige Websites, Bezirks-SEO, Online-Anmeldung und Ads für alle zwölf Bezirke.',
        angles: [
          { title: 'Mehrsprachig erreichbar', text: 'Viele Berliner Fahrschüler sprechen Deutsch als Zweitsprache oder kommen aus dem Ausland. Wichtige Seiten und der Anmeldeweg in Englisch (und weiteren Sprachen, wo sinnvoll) erweitern Ihre Zielgruppe deutlich.' },
          { title: 'Bezirke und Kieze', text: 'Berlin ist kleinteilig: Menschen suchen nach Bezirk und Kiez, nicht nach der ganzen Stadt. Bezirksbezogene Inhalte und Bewertungen in Ihrem Einzugsgebiet machen den Unterschied.' },
        ],
        faq: { q: 'Sollte eine Berliner Fahrschule ihre Website mehrsprachig anbieten?', a: 'Wenn Ihre Zielgruppe es erwartet, ja – zumindest Englisch für Ablauf, Preise und Anmeldung. Wir bauen die Sprachstruktur sauber auf, damit Suchmaschinen die Versionen richtig zuordnen.' },
      },
      anwaelte: {
        intro: 'Berlin ist Sitz des Kammergerichts und Hauptstadt der Start-ups, Verbände und Verwaltung. Kanzleien finden hier ein sehr breites Mandantenspektrum – von Gründern über Mieter und Vermieter bis zu Behörden und Verbänden.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Berlin: Auftritt für Fachgebiete, Bezirke, Start-ups und Immobilienrecht – sachlich, seriös, auffindbar.',
        angles: [
          { title: 'Breite Nachfrage, scharfe Positionierung', text: 'Miet- und Immobilienrecht, Start-up-Recht, Arbeits- und Verwaltungsrecht: Der Berliner Markt ist thematisch breit. Wer sich klar positioniert, wird für die passenden Mandate gefunden.' },
          { title: 'Internationale Mandanten', text: 'Viele Mandanten suchen Beratung in englischer Sprache. Ein englischer Auftritt für Kernleistungen kann Ihre Reichweite erheblich vergrößern.' },
        ],
        faq: { q: 'Wie finden Berliner Mandanten die passende Kanzlei?', a: 'Meist über die Suche nach ihrem konkreten Problem plus Ortsbezug. Fachseiten für Ihre Themen und ein gepflegtes Google-Profil sind deshalb die wichtigsten Bausteine.' },
      },
    },
  },
  {
    slug: 'nordrhein-westfalen',
    name: 'Nordrhein-Westfalen',
    kind: 'state',
    places: ['Köln', 'Düsseldorf', 'Dortmund', 'Essen', 'Duisburg', 'Bochum', 'Münster', 'Bonn', 'Bielefeld'],
    neighbors: ['niedersachsen', 'hessen', 'rheinland-pfalz'],
    notes: {
      fahrschulen: {
        intro: 'Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland: Im Ruhrgebiet, am Rhein und in Westfalen liegen Großstädte dicht beieinander. Der Wettbewerb unter Fahrschulen ist hoch, die Suche erfolgt sehr kleinräumig.',
        metaDescription: 'Werbeagentur für Fahrschulen in Nordrhein-Westfalen: Ruhrgebiet, Rheinland und Westfalen – lokale SEO, Website, Online-Anmeldung und Google Ads.',
        angles: [
          { title: 'Ruhrgebiet: Städte ohne Grenzen', text: 'Zwischen Duisburg, Essen, Bochum und Dortmund gehen Stadtgrenzen ineinander über. Fahrschüler suchen nach Stadtteil oder Haltestelle; entscheidend ist, das Einzugsgebiet exakt zu definieren und darzustellen.' },
          { title: 'Rheinland und Westfalen: unterschiedliche Märkte', text: 'In Köln, Düsseldorf und Bonn treffen Sie auf urbane, wechselnde Zielgruppen, in Münster oder Bielefeld auf Studierende und Familien. Botschaften und Kanäle unterscheiden sich, die Grundstruktur bleibt.' },
        ],
        faq: { q: 'Wie gewinnt eine Fahrschule im dichten Ruhrgebiet neue Fahrschüler?', a: 'Mit einem exakt gepflegten Google-Profil, klarer Einzugsgebiets-Darstellung, Bewertungen und schnellen Anmeldewegen. Massenhafte Ortsseiten helfen nicht – wenige, gute Seiten schon.' },
      },
      anwaelte: {
        intro: 'In Nordrhein-Westfalen sind die Oberlandesgerichte Düsseldorf, Hamm und Köln zuständig. Zwischen Wirtschaftskanzlei in Düsseldorf, Rheinland-Mittelstand und Ruhrgebiets-Kanzlei sind Zielgruppen und Erwartungen sehr verschieden.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in NRW: Auftritt und Sichtbarkeit in Köln, Düsseldorf, Dortmund und dem Ruhrgebiet – Website, SEO, Erstberatung.',
        angles: [
          { title: 'Drei Oberlandesgerichtsbezirke, viele Märkte', text: 'Ein Auftritt, der in Düsseldorf funktioniert, passt nicht automatisch nach Dortmund. Wir stimmen Tonalität, Schwerpunkte und Standortangaben auf Ihren Markt ab.' },
          { title: 'Hohe Dichte, klare Nische', text: 'In NRW gibt es besonders viele Kanzleien. Wer sich auf ein Rechtsgebiet oder eine Zielgruppe spezialisiert und das sichtbar macht, gewinnt gegenüber Generalisten.' },
        ],
        faq: { q: 'Wie wird eine Kanzlei in NRW lokal sichtbar?', a: 'Durch Google-Profil, Standortangaben, Bewertungen und Fachseiten zu Ihren Schwerpunkten. Wichtig ist Konsistenz: gleiche Firmendaten überall.' },
      },
    },
  },
  {
    slug: 'bayern',
    name: 'Bayern',
    kind: 'state',
    places: ['München', 'Nürnberg', 'Augsburg', 'Regensburg', 'Würzburg', 'Ingolstadt', 'Rosenheim', 'Bamberg'],
    neighbors: ['baden-wuerttemberg', 'hessen', 'thueringen', 'sachsen'],
    notes: {
      fahrschulen: {
        intro: 'Bayern ist das flächengrößte Bundesland, von Ballungsräumen wie München und Nürnberg bis zu Alpenregionen und ländlichen Räumen in Franken und Niederbayern. Die Anforderungen an Fahrschulen unterscheiden sich stark je Region.',
        metaDescription: 'Werbeagentur für Fahrschulen in Bayern: München, Nürnberg, Augsburg und ländliche Regionen – lokale SEO, Website, Motorrad-Kampagnen und Anmeldung.',
        angles: [
          { title: 'Motorradsaison und Alpenraum', text: 'In Oberbayern und den Alpenregionen spielt der Motorradführerschein eine große Rolle. Saisonale Kampagnen und eigene Seiten für die Klassen A1, A2 und A holen Interessenten zum richtigen Zeitpunkt ab.' },
          { title: 'Städte und Fläche', text: 'In München konkurrieren Fahrschulen um Stadtteile und Studierende, in ländlichen Landkreisen um das nächstgelegene Einzugsgebiet. Die Strategie unterscheidet sich, die Grundlage – ein sauberes lokales Profil – ist dieselbe.' },
        ],
        faq: { q: 'Lohnt sich für bayerische Fahrschulen eine eigene Seite pro Führerscheinklasse?', a: 'Ja, wenn Sie die Klasse anbieten und etwas Nützliches dazu sagen können: Voraussetzungen, Ablauf, Kosten und Ansprechpartner. Für Motorrad- und Lkw-Klassen sind eigene Seiten besonders sinnvoll.' },
      },
      anwaelte: {
        intro: 'Bayerns Justiz ist auf die Oberlandesgerichte München, Nürnberg und Bamberg verteilt. Wirtschaftskanzleien in München, mittelständische Kanzleien in Franken und Einzelanwälte in ländlichen Regionen haben sehr unterschiedliche Anforderungen an ihren Auftritt.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Bayern: Auftritt für München, Nürnberg und die Regionen – Website, Rechtsgebiete, lokale SEO und Erstberatung.',
        angles: [
          { title: 'München: Wettbewerb um Sichtbarkeit', text: 'In der bayerischen Landeshauptstadt ist die Kanzleidichte hoch. Ohne klare Schwerpunkte und Profil verschwinden Sie in der Menge.' },
          { title: 'Franken und ländliche Regionen: Nähe zählt', text: 'Außerhalb der Metropolen suchen Mandanten den Anwalt vor Ort. Persönliche Profile, klare Standortinfos und verlässliche Erreichbarkeit sind hier das Wichtigste.' },
        ],
        faq: { q: 'Was unterscheidet den Kanzleiauftritt in München von dem in ländlichen Regionen?', a: 'In München zählt Spezialisierung und Wirtschaftsnähe, auf dem Land persönliche Nähe und Erreichbarkeit. Wir richten Botschaft, Struktur und Kanäle entsprechend aus.' },
      },
    },
  },
  {
    slug: 'baden-wuerttemberg',
    name: 'Baden-Württemberg',
    kind: 'state',
    places: ['Stuttgart', 'Karlsruhe', 'Mannheim', 'Freiburg', 'Heidelberg', 'Ulm', 'Tübingen', 'Heilbronn'],
    neighbors: ['bayern', 'hessen', 'rheinland-pfalz'],
    notes: {
      fahrschulen: {
        intro: 'Baden-Württemberg ist geprägt von Automobilindustrie, Mittelstand und Universitätsstädten wie Heidelberg, Freiburg und Tübingen. Autofahren hat hier hohen Stellenwert, die Zielgruppen reichen von Schülern bis zu Pendlern.',
        metaDescription: 'Werbeagentur für Fahrschulen in Baden-Württemberg: Stuttgart, Karlsruhe, Freiburg und ländliche Räume – Website, SEO, Online-Anmeldung und Ads.',
        angles: [
          { title: 'Automobilland mit Fahrzeugnähe', text: 'Viele Menschen arbeiten bei Autoherstellern und Zulieferern; ein Auftritt, der Fahrzeug und Technik ernst nimmt, trifft hier auf Resonanz. Gepflegte Fahrzeugflotten, einheitlich beschriftet, sind ein starkes Signal.' },
          { title: 'Universitätsstädte und Pendlerregionen', text: 'In Heidelberg, Freiburg oder Tübingen prägen Studierende den Markt, im Umland die Pendler zwischen Wohnort und Arbeit. Kurse und Anmeldung sollten zu diesen unterschiedlichen Rhythmen passen.' },
        ],
        faq: { q: 'Wie profiliert sich eine Fahrschule in einer Region mit vielen Fahrzeugmarken und Autoaffinität?', a: 'Durch sichtbare Qualität: moderne, einheitlich gestaltete Fahrzeuge, klare Ausbildungskonzepte und Transparenz bei Ablauf und Kosten. Das vermittelt Professionalität.' },
      },
      anwaelte: {
        intro: 'Baden-Württemberg ist Standort für Mittelstand und Weltmarktführer; die Oberlandesgerichte Stuttgart und Karlsruhe sind zuständig. Mandanten sind häufig inhabergeführte Unternehmen, aber auch Privatpersonen in Universitäts- und Ballungsräumen.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Baden-Württemberg: Auftritt für Stuttgart, Karlsruhe, Freiburg und Mittelstand – Website, SEO und Erstberatung.',
        angles: [
          { title: 'Mittelstand als Zielgruppe', text: 'Inhabergeführte Unternehmen suchen langfristige Ansprechpartner, keine Anbieter von der Stange. Ein Auftritt, der Kontinuität und Branchenkenntnis zeigt, überzeugt hier besonders.' },
          { title: 'Spezialisierung sichtbar machen', text: 'Gesellschafts- und Arbeitsrecht sowie technologienahe Themen sind gefragt. Fachseiten mit konkretem Praxisbezug zeigen Ihre Kompetenz und werden von Entscheidern gefunden.' },
        ],
        faq: { q: 'Wie erreichen Kanzleien in Baden-Württemberg mittelständische Unternehmer?', a: 'Mit Fachbeiträgen zu praxisnahen Themen, klarer Positionierung und einer Website, die Ansprechpartner und Vorgehen transparent macht.' },
      },
    },
  },
  {
    slug: 'hessen',
    name: 'Hessen',
    kind: 'state',
    places: ['Frankfurt am Main', 'Wiesbaden', 'Kassel', 'Darmstadt', 'Offenbach', 'Gießen', 'Marburg', 'Fulda'],
    neighbors: ['niedersachsen', 'nordrhein-westfalen', 'rheinland-pfalz', 'baden-wuerttemberg', 'bayern', 'thueringen'],
    notes: {
      fahrschulen: {
        intro: 'Hessen verbindet die dichte Metropolregion Rhein-Main um Frankfurt mit ländlichen Räumen in Nord- und Mittelhessen. Das Spektrum reicht vom internationalen Stadtpublikum bis zu Fahrschülern, die auf das Auto angewiesen sind.',
        metaDescription: 'Werbeagentur für Fahrschulen in Hessen: Rhein-Main, Kassel und ländliche Regionen – lokale SEO, Website, Online-Anmeldung und Google Ads für Fahrschulen.',
        angles: [
          { title: 'Rhein-Main: dichte Konkurrenz, internationale Zielgruppe', text: 'Rund um Frankfurt, Offenbach und Wiesbaden entscheidet die Kartenansicht in Google. Ein mehrsprachiger Anmeldeweg spricht die internationale Bevölkerung an.' },
          { title: 'Nord- und Mittelhessen: Fläche und Studierende', text: 'In Kassel, Marburg und Gießen prägen Hochschulen den Markt, im Umland die Mobilität in der Fläche. Standortseiten für Ihre Unterrichtsorte sind besonders wichtig.' },
        ],
        faq: { q: 'Wie erreicht eine hessische Fahrschule Pendler und Zugezogene?', a: 'Mit flexiblen Kursangeboten, klarer Online-Anmeldung und Informationen zu Umschreibung und Wiedereinstieg, sofern Sie diese anbieten.' },
      },
      anwaelte: {
        intro: 'Hessen ist mit Frankfurt am Main der wichtigste Finanzplatz Deutschlands; das Oberlandesgericht sitzt in Frankfurt. Kanzleien beraten hier von Bank- und Kapitalmarktrecht bis zu klassischen Privatmandaten in Nord- und Mittelhessen.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Hessen: Auftritt für Frankfurt, Wiesbaden, Kassel – Wirtschaftsrecht, Rechtsgebiete-Seiten, lokale SEO.',
        angles: [
          { title: 'Finanzplatz Frankfurt', text: 'Für Kanzleien im Bank- und Wirtschaftsrecht zählen Reputation, Klarheit und Fachtiefe. Der Auftritt sollte zurückhaltend und präzise sein und Fachautorität zeigen.' },
          { title: 'Privatmandate in der Region', text: 'Außerhalb der Ballungsräume suchen Mandanten den Anwalt in ihrer Nähe – für Familien-, Miet- oder Verkehrsrecht. Klare Standortdaten und Bewertungen helfen bei der Auswahl.' },
        ],
        faq: { q: 'Wie unterscheidet sich der Kanzleiauftritt für Wirtschaftsrecht von dem für Privatmandate?', a: 'Wirtschaftsrecht braucht Fachbeiträge und Referenzen auf Entscheiderebene, Privatmandate brauchen Verständlichkeit, Nähe und einen niedrigschwelligen Erstkontakt.' },
      },
    },
  },
  {
    slug: 'rheinland-pfalz',
    name: 'Rheinland-Pfalz',
    kind: 'state',
    places: ['Mainz', 'Koblenz', 'Trier', 'Kaiserslautern', 'Ludwigshafen', 'Worms', 'Speyer', 'Neustadt an der Weinstraße'],
    neighbors: ['nordrhein-westfalen', 'hessen', 'baden-wuerttemberg', 'saarland'],
    notes: {
      fahrschulen: {
        intro: 'Rheinland-Pfalz ist ein Land der mittleren Städte und Weinregionen: Mainz, Koblenz, Trier und Kaiserslautern liegen in einem Gebiet, das zwischen Rhein-Main, Rhein-Neckar und der Grenze zu Luxemburg zu Pendlern führt.',
        metaDescription: 'Werbeagentur für Fahrschulen in Rheinland-Pfalz: Mainz, Koblenz, Trier und ländliche Regionen – lokale SEO, Website, Online-Anmeldung und Ads.',
        angles: [
          { title: 'Viele mittlere Städte statt einer Metropole', text: 'Es gibt keine dominante Großstadt: Jede Region hat ihren eigenen Markt. Lokale Identität und Standortseiten mit echten Angaben zählen mehr als Reichweite.' },
          { title: 'Pendler und Grenznähe', text: 'Viele Menschen pendeln nach Mainz, Frankfurt oder Luxemburg. Flexible Unterrichtszeiten am Abend und Wochenende sind ein starkes Argument, das die Website deutlich machen sollte.' },
        ],
        faq: { q: 'Wie machen sich Fahrschulen in Weinbau- und Tourismusregionen sichtbar?', a: 'Mit regionalem Bezug, saisonal passenden Kursen und einem Google-Profil, das Öffnungszeiten und Einzugsgebiet präzise abbildet.' },
      },
      anwaelte: {
        intro: 'In Rheinland-Pfalz sind die Oberlandesgerichte Koblenz und Zweibrücken zuständig. Kanzleien in Mainz, Koblenz, Trier oder Kaiserslautern bedienen Privat- und Unternehmensmandanten in einer Region mit Weinbau, Tourismus, Mittelstand und Grenznähe.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Rheinland-Pfalz: Auftritt für Mainz, Koblenz, Trier – Website, Fachgebiete-Seiten und lokale SEO.',
        angles: [
          { title: 'Mittelstand und Familienunternehmen', text: 'Weingüter, Handwerksbetriebe und Familienunternehmen suchen Anwälte, die ihre Situation verstehen. Fachseiten zu Nachfolge, Vertragsrecht und Arbeitsrecht sprechen sie an.' },
          { title: 'Grenznahe Mandate', text: 'In Trier und der Westpfalz spielen grenzüberschreitende Sachverhalte eine Rolle. Wer entsprechende Erfahrung hat, sollte sie sichtbar machen.' },
        ],
        faq: { q: 'Wie zeigt eine Kanzlei in Rheinland-Pfalz regionale Verwurzelung?', a: 'Durch klare Standorte, regionale Fachthemen und persönliche Profile. Bewertungen und ein gepflegtes Google-Profil ergänzen das.' },
      },
    },
  },
  {
    slug: 'saarland',
    name: 'Saarland',
    kind: 'state',
    places: ['Saarbrücken', 'Neunkirchen', 'Homburg', 'Saarlouis', 'Völklingen', 'St. Ingbert', 'Merzig'],
    neighbors: ['rheinland-pfalz'],
    notes: {
      fahrschulen: {
        intro: 'Das Saarland ist das kleinste Flächenland und grenzt an Frankreich und Luxemburg. Kurze Wege, eine dichte Siedlungsstruktur und viele Pendler nach Luxemburg und Frankreich prägen den Markt.',
        metaDescription: 'Werbeagentur für Fahrschulen im Saarland: Saarbrücken, Neunkirchen, Saarlouis und Grenzregion – lokale SEO, Website, Online-Anmeldung und Ads.',
        angles: [
          { title: 'Grenzregion und Pendlerströme', text: 'Viele Saarländer arbeiten im Nachbarland. Flexible Kurszeiten und klare Informationen für Fahrschüler mit Wohnsitz und Arbeit in unterschiedlichen Ländern sind ein relevanter Vorteil.' },
          { title: 'Kleine Region, große Sichtbarkeit', text: 'Im überschaubaren Saarland spricht sich Qualität herum. Ein gepflegtes Google-Profil und viele echte Bewertungen wirken hier überproportional.' },
        ],
        faq: { q: 'Ist ein französischsprachiger Auftritt für saarländische Fahrschulen sinnvoll?', a: 'Kann sich lohnen, wenn Sie Fahrschüler aus Grenzregionen ansprechen. Wir bauen wichtige Seiten bei Bedarf zweisprachig und sauber für Suchmaschinen aus.' },
      },
      anwaelte: {
        intro: 'Das Saarland ist mit dem Oberlandesgericht Saarbrücken justiziell überschaubar organisiert. Kanzleien arbeiten in einem kleinen Markt mit engen Netzwerken und einer Grenzlage, die grenzüberschreitende Sachverhalte häufig macht.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien im Saarland: Auftritt für Saarbrücken und die Grenzregion – Website, Rechtsgebiete, lokale SEO und Erstberatung.',
        angles: [
          { title: 'Kleiner Markt, enge Netzwerke', text: 'Empfehlungen spielen eine große Rolle. Ein Auftritt, der Empfehlungen bestätigt – mit Profilen, Qualifikationen und Bewertungen – festigt Vertrauen.' },
          { title: 'Grenzüberschreitende Themen', text: 'Arbeits-, Steuer- und Familienrecht mit Bezug zu Frankreich und Luxemburg sind im Saarland relevant. Eigene Seiten dazu machen Ihre Erfahrung auffindbar.' },
        ],
        faq: { q: 'Wie profitiert eine saarländische Kanzlei von Grenznähe?', a: 'Indem Sie grenzüberschreitende Erfahrung sichtbar machen und Ihre Website – wo sinnvoll – mehrsprachig aufbauen.' },
      },
    },
  },
  {
    slug: 'sachsen',
    name: 'Sachsen',
    kind: 'state',
    places: ['Dresden', 'Leipzig', 'Chemnitz', 'Zwickau', 'Görlitz', 'Plauen', 'Freiberg'],
    neighbors: ['brandenburg', 'sachsen-anhalt', 'thueringen', 'bayern'],
    notes: {
      fahrschulen: {
        intro: 'Sachsen vereint wachsende Großstädte wie Leipzig und Dresden mit Regionen im Erzgebirge und in der Lausitz. Studierende und Zuzug prägen die Städte, in ländlichen Gebieten bleibt das Auto zentral.',
        metaDescription: 'Werbeagentur für Fahrschulen in Sachsen: Leipzig, Dresden, Chemnitz und ländliche Regionen – Website, lokale SEO, Online-Anmeldung und Google Ads.',
        angles: [
          { title: 'Wachsende Städte', text: 'In Leipzig und Dresden kommen laufend Zugezogene und Studierende hinzu. Ein Auftritt, der Ablauf und Anmeldung klar erklärt, gewinnt Menschen, die sich noch nicht auskennen.' },
          { title: 'Erzgebirge und Lausitz', text: 'In ländlichen Regionen sind Wege weit und Nahverkehr dünn. Standortseiten mit Unterrichtsorten und flexiblen Angeboten erleichtern die Entscheidung.' },
        ],
        faq: { q: 'Wie erreichen sächsische Fahrschulen Studierende in Leipzig oder Dresden?', a: 'Über Social Media, Online-Anmeldung, flexible Termine und eine klare Preisdarstellung – kombiniert mit einem Google-Profil, das im Stadtteil sichtbar ist.' },
      },
      anwaelte: {
        intro: 'Sachsen gehört zum Bezirk des Oberlandesgerichts Dresden. In Leipzig, Dresden und Chemnitz konzentrieren sich Kanzleien; Wirtschaft, Immobilienmarkt und Hochschulen erzeugen unterschiedliche Mandantengruppen.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Sachsen: Auftritt für Leipzig, Dresden, Chemnitz – Website, Rechtsgebiete-Seiten, SEO und Erstberatung.',
        angles: [
          { title: 'Dynamischer Immobilien- und Unternehmensmarkt', text: 'Wachsende Städte erzeugen Bedarf in Miet-, Bau- und Gesellschaftsrecht. Fachseiten zu diesen Themen erreichen Mandanten in der Entscheidungsphase.' },
          { title: 'Junge Mandantengruppen', text: 'Studierende, Start-ups und Zugezogene suchen online. Ein klarer, digitaler Erstkontakt und eine verständliche Sprache holen sie ab.' },
        ],
        faq: { q: 'Wie positioniert sich eine Kanzlei in Sachsen in wachsenden Städten?', a: 'Mit klarer Spezialisierung, verständlichen Fachseiten und einem einfachen Erstkontakt. Die Nachfrage steigt – wer auffindbar und klar ist, profitiert.' },
      },
    },
  },
  {
    slug: 'sachsen-anhalt',
    name: 'Sachsen-Anhalt',
    kind: 'state',
    places: ['Magdeburg', 'Halle (Saale)', 'Dessau-Roßlau', 'Wittenberg', 'Stendal', 'Halberstadt', 'Naumburg'],
    neighbors: ['niedersachsen', 'brandenburg', 'sachsen', 'thueringen'],
    notes: {
      fahrschulen: {
        intro: 'Sachsen-Anhalt ist geprägt von ländlichen Räumen, mittleren Städten wie Magdeburg und Halle und einem spürbaren demografischen Wandel. Weniger junge Menschen bedeuten: Jeder Fahrschüler zählt.',
        metaDescription: 'Werbeagentur für Fahrschulen in Sachsen-Anhalt: Magdeburg, Halle und ländliche Räume – Website, lokale SEO, Online-Anmeldung und Anzeigen.',
        angles: [
          { title: 'Demografischer Wandel', text: 'Wenn weniger Jugendliche nachrücken, gewinnt die Fahrschule, die auch Erwachsene, Wiedereinsteiger und Zusatzklassen anspricht. Eigene Seiten für diese Zielgruppen erweitern den Markt.' },
          { title: 'Weite Wege, kaum Nahverkehr', text: 'In ländlichen Regionen ist das Auto oft alternativlos. Klare Anfahrts- und Standortinformationen sowie flexible Unterrichtsformen sind entscheidende Vorteile.' },
        ],
        faq: { q: 'Wie sprechen Fahrschulen in Sachsen-Anhalt neben Jugendlichen weitere Zielgruppen an?', a: 'Mit Seiten für Wiedereinsteiger, Motorrad, Anhänger und Zusatzqualifikationen sowie Anzeigen, die diese Suchen abfangen.' },
      },
      anwaelte: {
        intro: 'Sachsen-Anhalt gehört zum Bezirk des Oberlandesgerichts Naumburg. Kanzleien in Magdeburg und Halle konkurrieren mit Kanzleien in kleineren Städten; ländlich geprägte Mandanten legen Wert auf persönliche Erreichbarkeit.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Sachsen-Anhalt: Auftritt für Magdeburg, Halle und die Region – Website, lokale SEO, Rechtsgebiete-Seiten.',
        angles: [
          { title: 'Vertrauen durch Nähe', text: 'In kleineren Städten und Dörfern zählt, dass der Anwalt bekannt und erreichbar ist. Persönliche Profile und klare Sprechzeiten sind wichtiger als aufwendige Inszenierung.' },
          { title: 'Agrar-, Bau- und Nachfolgethemen', text: 'Landwirtschaft, Grundstücke und Betriebsnachfolge sind in der Region wichtige Rechtsgebiete. Fachseiten dazu sind eine Chance für spezialisierte Kanzleien.' },
        ],
        faq: { q: 'Wie sichtbar kann eine Kanzlei in einer kleinen Stadt online werden?', a: 'Sehr gut, denn der lokale Wettbewerb ist geringer. Ein gepflegtes Google-Profil und wenige gute Fachseiten reichen oft für Spitzenplätze im Einzugsgebiet.' },
      },
    },
  },
  {
    slug: 'thueringen',
    name: 'Thüringen',
    kind: 'state',
    places: ['Erfurt', 'Jena', 'Weimar', 'Gera', 'Gotha', 'Eisenach', 'Suhl'],
    neighbors: ['hessen', 'niedersachsen', 'sachsen', 'sachsen-anhalt', 'bayern'],
    notes: {
      fahrschulen: {
        intro: 'Thüringen liegt in der Mitte Deutschlands: Erfurt, Jena und Weimar bilden einen Städtekorridor, dazwischen und darum liegen ländliche Regionen im Thüringer Wald und in der Rhön. Jena und Ilmenau sind Hochschulstandorte.',
        metaDescription: 'Werbeagentur für Fahrschulen in Thüringen: Erfurt, Jena, Weimar und ländliche Regionen – Website, lokale SEO, Online-Anmeldung und Anzeigen.',
        angles: [
          { title: 'Städtekorridor und Hochschulstandorte', text: 'Zwischen Erfurt, Weimar und Jena liegen kurze Wege. Studierende und Pendler brauchen flexible Kurse, die zu ihren Stundenplänen passen.' },
          { title: 'Ländliche Regionen', text: 'Im Thüringer Wald und in der Rhön ist das Auto Alltag. Klare Standortinfos und Angebote für Jugendliche in der Fläche sind zentral.' },
        ],
        faq: { q: 'Wie lassen sich Fahrschüler in Jena und Erfurt gezielt erreichen?', a: 'Mit Social Media, flexiblen Kursen, einer einfachen Online-Anmeldung und Bewertungen, die im jeweiligen Stadtgebiet sichtbar sind.' },
      },
      anwaelte: {
        intro: 'Thüringen hat mit dem Thüringer Oberlandesgericht seinen Sitz in Jena. Kanzleien in Erfurt, Jena und Gera arbeiten in einer Region mit mittelständischer Wirtschaft, Technologie- und Optikunternehmen sowie Tourismus.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Thüringen: Auftritt für Erfurt, Jena, Weimar – Website, Rechtsgebiete-Seiten, lokale SEO und Erstberatung.',
        angles: [
          { title: 'Technologie und Mittelstand', text: 'Um Jena und Erfurt gibt es viele technologieorientierte Unternehmen. Fachseiten zu Vertrags-, Gesellschafts- und Arbeitsrecht sprechen sie direkt an.' },
          { title: 'Tourismus und Gastgewerbe', text: 'Im Thüringer Wald und rund um Weimar sind Gastgewerbe und Tourismus wichtige Mandantengruppen. Branchenkenntnis lässt sich auf eigenen Seiten zeigen.' },
        ],
        faq: { q: 'Wie sprechen Thüringer Kanzleien Unternehmer an?', a: 'Mit Fachbeiträgen zu praxisnahen Themen, klaren Ansprechpartnern und einem professionellen, ruhigen Auftritt.' },
      },
    },
  },
  {
    slug: 'brandenburg',
    name: 'Brandenburg',
    kind: 'state',
    places: ['Potsdam', 'Cottbus', 'Brandenburg an der Havel', 'Frankfurt (Oder)', 'Oranienburg', 'Falkensee', 'Eberswalde'],
    neighbors: ['berlin', 'sachsen', 'sachsen-anhalt', 'niedersachsen', 'mecklenburg-vorpommern'],
    notes: {
      fahrschulen: {
        intro: 'Brandenburg umgibt Berlin und reicht bis an die polnische Grenze. Rund um die Hauptstadt wachsen Städte wie Potsdam und Falkensee, weiter draußen sind Wege lang und der Nahverkehr dünn.',
        metaDescription: 'Werbeagentur für Fahrschulen in Brandenburg: Potsdam, Cottbus, Speckgürtel und ländliche Räume – lokale SEO, Website, Online-Anmeldung und Ads.',
        angles: [
          { title: 'Der Berliner Rand', text: 'Im Speckgürtel ziehen Familien zu, Jugendliche wollen mobil sein. Standortseiten für Ihre Unterrichtsorte und ein exaktes Einzugsgebiet im Google-Profil bringen Anmeldungen.' },
          { title: 'Weite Fläche, lange Wege', text: 'In der Uckermark, der Prignitz oder der Lausitz ist der Führerschein oft Voraussetzung für Ausbildung und Arbeit. Klare Anfahrts-, Zeit- und Kosteninformationen erleichtern die Entscheidung.' },
        ],
        faq: { q: 'Wie erreichen Fahrschulen im Berliner Umland Zuzügler?', a: 'Mit Standortseiten, die den Ort nennen, und einer Anmeldung, die schnell und mobil funktioniert. Zuzügler kennen die lokale Fahrschule noch nicht und suchen im Netz.' },
      },
      anwaelte: {
        intro: 'Brandenburg gehört zum Bezirk des Brandenburgischen Oberlandesgerichts in Brandenburg an der Havel. Kanzleien in Potsdam und im Berliner Umland bedienen stark wachsende Privat- und Immobilienmärkte, in der Lausitz und in ländlichen Regionen andere Themen.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Brandenburg: Auftritt für Potsdam, Cottbus und das Berliner Umland – Website, SEO und Erstberatung.',
        angles: [
          { title: 'Wachstumsregion Berliner Umland', text: 'Zuzug erzeugt Bedarf in Immobilien-, Bau-, Familien- und Erbrecht. Verständliche Fachseiten holen neue Einwohner ab, die noch keinen Anwalt vor Ort kennen.' },
          { title: 'Lausitz und ländliche Räume', text: 'Strukturwandel, Energie und Landwirtschaft prägen andere Rechtsfragen. Wer hier Schwerpunkte hat, sollte sie sichtbar machen.' },
        ],
        faq: { q: 'Wie finden Zuzügler im Berliner Umland Kanzleien?', a: 'Über lokale Suchen nach Rechtsproblem plus Ort. Ein gepflegtes Google-Profil und passende Fachseiten sind entscheidend.' },
      },
    },
  },
  {
    slug: 'mecklenburg-vorpommern',
    name: 'Mecklenburg-Vorpommern',
    kind: 'state',
    places: ['Rostock', 'Schwerin', 'Greifswald', 'Stralsund', 'Neubrandenburg', 'Wismar', 'Güstrow'],
    neighbors: ['schleswig-holstein', 'niedersachsen', 'brandenburg'],
    notes: {
      fahrschulen: {
        intro: 'Mecklenburg-Vorpommern ist dünn besiedelt, mit Küste, Seenplatte und weiten Wegen. Rostock, Schwerin und Greifswald sind die Zentren, dazwischen prägt die Fläche den Alltag – und macht den Führerschein besonders wertvoll.',
        metaDescription: 'Werbeagentur für Fahrschulen in Mecklenburg-Vorpommern: Rostock, Schwerin, Greifswald und Fläche – lokale SEO, Website, Anmeldung und Anzeigen.',
        angles: [
          { title: 'Dünn besiedelt, weit verteilt', text: 'Fahrschulen bedienen große Einzugsgebiete. Klare Angaben zu Unterrichtsorten, Fahrstundenwegen und Terminen sparen Rückfragen und Anrufe.' },
          { title: 'Tourismus und Saisonarbeit', text: 'Ostsee und Seenplatte prägen Arbeitsmärkte. Junge Menschen brauchen früh den Führerschein für Saisonjobs; Kampagnen vor Saisonbeginn erreichen sie.' },
        ],
        faq: { q: 'Wie plant eine Fahrschule in Mecklenburg-Vorpommern Kurse in der Fläche?', a: 'Mit klaren Kursorten und -zeiten auf der Website, einer einfachen Anmeldung und einem Google-Profil, das Einzugsgebiet und Erreichbarkeit korrekt abbildet.' },
      },
      anwaelte: {
        intro: 'Mecklenburg-Vorpommern gehört zum Bezirk des Oberlandesgerichts Rostock. Kanzleien in Rostock, Schwerin und Greifswald stehen Einzelkanzleien in der Fläche gegenüber; Tourismus, Landwirtschaft und Immobilien prägen die Mandate.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Mecklenburg-Vorpommern: Auftritt für Rostock, Schwerin, Greifswald – Website, Fachgebiete, lokale SEO.',
        angles: [
          { title: 'Tourismus- und Immobilienrecht', text: 'Ferienimmobilien, Pacht, Gastgewerbe und Baurecht sind an der Küste gefragte Themen. Fachseiten mit regionalem Bezug helfen Mandanten, den richtigen Anwalt zu finden.' },
          { title: 'Erreichbarkeit in der Fläche', text: 'Wo Wege weit sind, zählen flexible Erstkontakte: Telefonberatung, Videotermin oder Online-Terminbuchung erweitern Ihr Einzugsgebiet.' },
        ],
        faq: { q: 'Sind digitale Beratungswege für Kanzleien in ländlichen Regionen sinnvoll?', a: 'Ja. Terminbuchung und, wo zulässig, digitale Erstgespräche senken die Hürde für Mandanten in der Fläche. Datenschutz und Berufsrecht sind dabei zu beachten.' },
      },
    },
  },
  {
    slug: 'schleswig-holstein',
    name: 'Schleswig-Holstein',
    kind: 'state',
    places: ['Kiel', 'Lübeck', 'Flensburg', 'Neumünster', 'Norderstedt', 'Elmshorn', 'Husum'],
    neighbors: ['hamburg', 'niedersachsen', 'mecklenburg-vorpommern'],
    notes: {
      fahrschulen: {
        intro: 'Schleswig-Holstein liegt zwischen Nord- und Ostsee und reicht von den Hamburger Randgemeinden bis zur dänischen Grenze. Kiel, Lübeck und Flensburg sind Zentren, dazwischen liegen ländliche Kreise und Küstenorte.',
        metaDescription: 'Werbeagentur für Fahrschulen in Schleswig-Holstein: Kiel, Lübeck, Flensburg, Hamburger Rand – Website, lokale SEO, Online-Anmeldung und Anzeigen.',
        angles: [
          { title: 'Hamburger Rand und Küstenstädte', text: 'Im Süden orientieren sich viele Menschen nach Hamburg, an der Küste prägen Hochschulen und Häfen den Markt. Die Ansprache unterscheidet sich, die lokale Sichtbarkeit bleibt zentral.' },
          { title: 'Tourismus und Grenzlage', text: 'Saisonarbeit im Tourismus und Pendler nach Dänemark bringen besondere Anforderungen: flexible Termine, Zusatzklassen und klare Informationen zur Ausbildung.' },
        ],
        faq: { q: 'Wie sprechen Fahrschulen in Flensburg Fahrschüler aus dem Grenzgebiet an?', a: 'Mit klaren Informationen zu Ablauf und Terminen, wo sinnvoll ergänzt um dänisch- oder englischsprachige Kerninhalte, und einem Google-Profil mit exaktem Einzugsgebiet.' },
      },
      anwaelte: {
        intro: 'Das Schleswig-Holsteinische Oberlandesgericht hat seinen Sitz in Schleswig. Kanzleien in Kiel, Lübeck und Flensburg beraten Mandanten aus Schifffahrt, Landwirtschaft, Tourismus und Mittelstand sowie Privatpersonen entlang der Küsten.',
        metaDescription: 'Werbeagentur für Anwälte und Kanzleien in Schleswig-Holstein: Auftritt für Kiel, Lübeck, Flensburg – Website, Rechtsgebiete-Seiten, lokale SEO.',
        angles: [
          { title: 'Maritime Wirtschaft und Tourismus', text: 'Schifffahrt, Hafen, Gastgewerbe und Ferienimmobilien erzeugen spezielle Rechtsfragen. Fachseiten dazu zeigen Branchenverständnis.' },
          { title: 'Nähe zu Hamburg und Dänemark', text: 'Mandate aus dem Hamburger Rand und grenzüberschreitende Themen erfordern klare Positionierung. Sichtbare Erfahrung in diesen Feldern hebt Sie ab.' },
        ],
        faq: { q: 'Wie machen Kanzleien in Schleswig-Holstein ihre Schwerpunkte sichtbar?', a: 'Mit eigenen Fachseiten, klarem Profil und lokaler Optimierung. In kleineren Städten genügen oft wenige, gut gemachte Seiten für Spitzenplätze im Einzugsgebiet.' },
      },
    },
  },
  // ---- Städte (nur Fahrschulen, mit stadtspezifischem Content) ----
  {
    slug: 'hannover',
    name: 'Hannover',
    kind: 'city',
    state: 'niedersachsen',
    places: ['List', 'Linden', 'Südstadt', 'Oststadt', 'Döhren', 'Misburg', 'Herrenhausen', 'Region Hannover'],
    neighbors: ['niedersachsen', 'bremen'],
    notes: {
      fahrschulen: {
        intro: 'Hannover ist Landeshauptstadt, Messe- und Hochschulstadt mit 13 Stadtbezirken. Fahrschulen konkurrieren hier um Studierende, Berufseinsteiger und Familien in Stadtteilen wie List, Linden oder Südstadt – und um Pendler aus der Region Hannover.',
        metaDescription: 'Werbeagentur für Fahrschulen in Hannover: Sichtbarkeit in List, Linden, Südstadt & Region – Website, lokale SEO, Online-Anmeldung, Google Ads und Beschriftung.',
        angles: [
          { title: 'Stadtteile und Region', text: 'Neben der Stadt selbst zählt die Region Hannover mit ihren Umlandgemeinden. Wer nur „Hannover“ optimiert, verpasst Fahrschüler aus Langenhagen, Laatzen, Garbsen oder Hemmingen. Sinnvoll sind klar abgegrenzte Einzugsgebiete im Google-Profil.' },
          { title: 'Messe, Hochschulen, Zuzug', text: 'Die Leibniz Universität, die Medizinische Hochschule und weitere Hochschulen bringen junge Zielgruppen, die schnell und digital entscheiden. Online-Anmeldung und Kurse abends oder am Wochenende sind hier starke Argumente.' },
        ],
        faq: { q: 'Wie viele Standortseiten braucht eine Fahrschule in Hannover?', a: 'So viele, wie Sie echte Standorte oder Kursorte haben – nicht pro Stadtteil auf Vorrat. Jede Seite braucht Adresse, Zeiten und Ansprechpartner, sonst nützt sie weder Besuchern noch Suchmaschinen.' },
      },
    },
  },
  {
    slug: 'muenchen',
    name: 'München',
    kind: 'city',
    state: 'bayern',
    places: ['Schwabing', 'Sendling', 'Pasing', 'Giesing', 'Haidhausen', 'Neuhausen', 'Bogenhausen'],
    neighbors: ['bayern', 'baden-wuerttemberg'],
    notes: {
      fahrschulen: {
        intro: 'München hat 25 Stadtbezirke, hohe Lebenshaltungskosten und eine große, häufig wechselnde Bevölkerung aus Studierenden und Berufstätigen. Fahrschulen konkurrieren in einem der teuersten Märkte Deutschlands – auch bei Anzeigen.',
        metaDescription: 'Werbeagentur für Fahrschulen in München: Stadtbezirke wie Schwabing, Sendling, Pasing – lokale SEO, Website, Anmeldung und effiziente Google Ads.',
        angles: [
          { title: 'Teurer Markt: effizient werben', text: 'Klickpreise für Fahrschul-Suchen sind in München hoch. Umso wichtiger sind saubere Kampagnenstruktur, gute Landingpages und organische Sichtbarkeit über Google-Profil und Bewertungen.' },
          { title: 'Studierende und Zugezogene', text: 'LMU, TU und viele Zuzügler bilden eine Zielgruppe ohne lokale Vorkenntnisse. Sie suchen online, vergleichen Preise und erwarten eine Anmeldung ohne Papier.' },
        ],
        faq: { q: 'Lohnen sich Google Ads für Fahrschulen in München bei hohen Klickpreisen?', a: 'Nur mit klarer Struktur: enge Region, konkrete Klassen, gute Landingpage und laufende Auswertung. Ohne diese Basis verbrennt man in München schnell Budget.' },
      },
    },
  },
  {
    slug: 'koeln',
    name: 'Köln',
    kind: 'city',
    state: 'nordrhein-westfalen',
    places: ['Ehrenfeld', 'Nippes', 'Lindenthal', 'Rodenkirchen', 'Kalk', 'Mülheim', 'Porz', 'Chorweiler'],
    neighbors: ['nordrhein-westfalen', 'rheinland-pfalz'],
    notes: {
      fahrschulen: {
        intro: 'Köln besteht aus neun Stadtbezirken – von Ehrenfeld über Nippes bis Porz – und ist Universitäts- und Medienstadt. Die Menschen identifizieren sich stark mit ihrem Veedel; das prägt auch die Fahrschulsuche.',
        metaDescription: 'Werbeagentur für Fahrschulen in Köln: Veedel und Stadtbezirke – Website, lokale SEO, Online-Anmeldung, Social Media und Google Ads für Kölner Fahrschulen.',
        angles: [
          { title: 'Veedel-Denken', text: 'Kölner suchen nach ihrem Viertel: „Fahrschule Ehrenfeld“, „Fahrschule Nippes“. Inhalte mit echtem Veedel-Bezug und ein präzises Einzugsgebiet im Google-Profil sind wirkungsvoll.' },
          { title: 'Zielgruppen in der Rheinmetropole', text: 'Universität, Medienbranche und ein lebendiges Umland ergeben unterschiedliche Zielgruppen. Social Media und kurze Formate erreichen junge Fahrschüler, Anzeigen die Wiedereinsteiger.' },
        ],
        faq: { q: 'Sollte eine Kölner Fahrschule Seiten pro Veedel anlegen?', a: 'Nur wenn Sie dort tatsächlich Unterricht oder Treffpunkte haben. Besser sind wenige, echte Standortseiten und ein Google-Profil, das Ihr Einzugsgebiet genau abbildet.' },
      },
    },
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt am Main',
    kind: 'city',
    state: 'hessen',
    places: ['Sachsenhausen', 'Bornheim', 'Nordend', 'Bockenheim', 'Höchst', 'Ostend', 'Gallus'],
    neighbors: ['hessen', 'rheinland-pfalz'],
    notes: {
      fahrschulen: {
        intro: 'Frankfurt am Main ist Finanzplatz und Flughafenstandort mit 16 Ortsbezirken und einer sehr internationalen Bevölkerung. Pendler aus dem gesamten Rhein-Main-Gebiet prägen den Alltag und die Nachfrage nach flexiblen Fahrschulangeboten.',
        metaDescription: 'Werbeagentur für Fahrschulen in Frankfurt am Main: mehrsprachige Website, lokale SEO für Sachsenhausen, Bornheim, Höchst – Anmeldung und Google Ads.',
        angles: [
          { title: 'Internationales Publikum', text: 'Viele Frankfurter sprechen Deutsch nicht als Erstsprache. Englischsprachige Kernseiten und ein klarer Anmeldeprozess erweitern Ihre Zielgruppe spürbar.' },
          { title: 'Pendler und Berufstätige', text: 'Wer in der Stadt arbeitet, hat wenig Zeit. Abendkurse, Intensivangebote und eine Website, die diese Angebote klar zeigt, gewinnen berufstätige Fahrschüler.' },
        ],
        faq: { q: 'Ist eine englischsprachige Version für eine Frankfurter Fahrschule sinnvoll?', a: 'In vielen Fällen ja: für Ablauf, Preise und Anmeldung. Wir bauen die Mehrsprachigkeit sauber auf, sodass Suchmaschinen die Sprachversionen richtig zuordnen.' },
      },
    },
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    kind: 'city',
    state: 'baden-wuerttemberg',
    places: ['Bad Cannstatt', 'Vaihingen', 'Degerloch', 'Feuerbach', 'Zuffenhausen', 'Möhringen', 'Stuttgart-Mitte'],
    neighbors: ['baden-wuerttemberg', 'bayern'],
    notes: {
      fahrschulen: {
        intro: 'Stuttgart liegt im Talkessel und gliedert sich in 23 Stadtbezirke. Als Sitz großer Automobilhersteller und Zulieferer ist die Stadt stark vom Auto geprägt – gleichzeitig sorgen Topografie, Verkehr und Nahverkehr für besondere Anforderungen an die Fahrausbildung.',
        metaDescription: 'Werbeagentur für Fahrschulen in Stuttgart: Bezirke wie Bad Cannstatt, Vaihingen, Degerloch – Website, lokale SEO, Online-Anmeldung und Google Ads.',
        angles: [
          { title: 'Kessellage, Stadtbezirke, Verkehr', text: 'Die Topografie der Stadt macht die Fahrschulwahl auch zu einer Frage des Standorts: Wer wohnt in welchem Bezirk, wie kommt er zum Unterricht? Klare Standort- und Anfahrtsinformationen sind ein echter Vorteil.' },
          { title: 'Automobilstadt', text: 'Menschen mit Bezug zur Automobilindustrie erwarten Qualität. Moderne, sauber gestaltete Ausbildungsfahrzeuge und ein professioneller Auftritt unterstreichen Ihren Anspruch.' },
        ],
        faq: { q: 'Wie hebt sich eine Stuttgarter Fahrschule in einer autoaffinen Stadt ab?', a: 'Mit sichtbarer Qualität bei Fahrzeugen und Ausbildung, klarem Ablauf und transparenten Informationen. Ein einheitlicher Auftritt von Website bis Fahrzeug verstärkt den Eindruck.' },
      },
    },
  },
];

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);
