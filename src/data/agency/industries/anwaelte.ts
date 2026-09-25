import type { Industry } from '../types';

const berufsrecht =
  'Kanzleien unterliegen berufsrechtlichen Vorgaben zur Werbung: Sie darf über die berufliche Tätigkeit nur sachlich unterrichten (für Rechtsanwälte etwa § 43b BRAO). Wir gestalten Auftritt und Texte entsprechend zurückhaltend und stimmen sie mit Ihnen ab. Eine Rechtsberatung ersetzt das nicht – bitte prüfen Sie Ihre Inhalte im Zweifel mit Ihrer Kammer.';

const rechtsanwaelte: Industry = {
  slug: 'rechtsanwaelte',
  name: 'Rechtsanwälte',
  group: 'Recht & Beratung',
  blurb: 'Website und Sichtbarkeit für Einzelanwälte und Fachanwälte.',
  seo: {
    title: 'Werbeagentur für Rechtsanwälte: Website & Sichtbarkeit',
    description:
      'Werbeagentur für Rechtsanwälte und Fachanwälte: Kanzlei-Website, Rechtsgebiete-Seiten, lokale SEO und Erstberatungs-Anfragen. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Rechtsanwälte',
  h1: 'Die Website für Rechtsanwälte, die Mandanten überzeugt',
  lead: 'Wer einen Anwalt sucht, hat meist ein konkretes Problem und wenig Zeit. Ihre Website muss in Sekunden zeigen, dass Sie das Rechtsgebiet beherrschen, erreichbar sind und diskret arbeiten.',
  problems: [
    { title: 'Fachgebiete gehen unter', text: 'Mandanten suchen nach Problemen („Kündigung erhalten“), nicht nach Kanzleinamen. Ohne eigene Seite je Rechtsgebiet erscheint Ihre Expertise in der Suche nicht.' },
    { title: 'Fachanwaltstitel bleiben unsichtbar', text: 'Qualifikationen wie ein Fachanwaltstitel sind ein starkes Vertrauenssignal, werden aber oft nur im Impressum erwähnt statt sichtbar herausgestellt.' },
    { title: 'Der Erstkontakt ist zu schwer', text: 'Wer in einer belastenden Situation zögert, gibt schnell auf, wenn er nur eine Telefonnummer findet. Ein diskretes Anfrageformular oder eine Online-Terminbuchung senkt die Schwelle.' },
    { title: 'Werbung mit berufsrechtlichen Grenzen', text: 'Anwaltswerbung muss sachlich bleiben. Klassische Werbeagentur-Sprache passt oft nicht – das Ergebnis wirkt entweder aufdringlich oder beliebig.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Seriöse, klare Kanzlei-Website', text: 'Ruhiges Design, Profil und Qualifikation, Rechtsgebiete als eigene Seiten, klare Kontaktwege und eine Darstellung, die Vertrauen schafft statt zu werben.' },
    { service: 'seo', title: 'Sichtbarkeit für Rechtsgebiete', text: 'Für jedes Kernthema eine hilfreiche Seite mit Erklärungen, typischen Fragen und Ihrem Angebot – und ein gepflegtes Google-Unternehmensprofil für die lokale Suche.' },
    { service: 'branding', title: 'Kanzlei-Auftritt mit Charakter', text: 'Logo, Schrift und Farbwelt, die zu Ihrer Positionierung passen, von der Visitenkarte bis zum Briefkopf.' },
    { service: 'buchungssysteme-crm', title: 'Terminbuchung für die Erstberatung', text: 'Mandanten wählen freie Zeiten selbst, Sie erhalten strukturierte Angaben vorab. Datenschutzgerecht und ohne unnötige Datenfelder.' },
    { service: 'google-ads', title: 'Zurückhaltende Anzeigen', text: 'Gezielte Suchanzeigen für dringende Rechtsfragen in Ihrer Region – sachlich formuliert und mit Blick auf berufsrechtliche Vorgaben.' },
  ],
  examples: [
    { title: 'Rechtsgebiete-Seiten', text: 'Pro Fachgebiet eine Seite: typische Situationen, Ablauf einer Beratung, häufige Fragen. So finden Mandanten Ihre Kanzlei genau dann, wenn sie Ihre Leistung brauchen.' },
    { title: 'Diskretes Kontaktformular', text: 'Ein kurzes Formular mit Themenauswahl, klarem Hinweis zum Datenschutz und der Möglichkeit, eine Rückrufzeit zu wählen – ohne dass sensible Details bereits im ersten Schritt abgefragt werden.' },
    { title: 'Profil mit Qualifikation', text: 'Eine Anwaltsseite mit Werdegang, Fachanwaltstitel, Tätigkeitsschwerpunkten und Veröffentlichungen, die Kompetenz nachvollziehbar macht.' },
  ],
  faq: [
    { q: 'Dürfen Rechtsanwälte überhaupt werben?', a: 'Ja, aber sachlich: Werbung darf über die berufliche Tätigkeit informieren und keine irreführenden oder reklamehaften Aussagen enthalten. Wir gestalten Ihren Auftritt entsprechend und weisen auf sensible Formulierungen hin. Die endgültige Prüfung bleibt bei Ihnen bzw. Ihrer Kammer.' },
    { q: 'Wie zeigen wir Fachanwaltstitel und Schwerpunkte?', a: 'Sichtbar im Profil, in der Seitenüberschrift und in den Rechtsgebiete-Seiten – nicht nur im Impressum. So verstehen Besucher sofort, wofür Sie stehen.' },
    { q: 'Lohnt sich Google Ads für eine Kanzlei?', a: 'In umkämpften Rechtsgebieten oder beim Aufbau kann sich eine begrenzte Kampagne lohnen. Wir empfehlen, zuerst Website und lokale Sichtbarkeit zu stärken und Ads gezielt für Kernthemen zu testen.' },
    { q: 'Wie gehen Sie mit dem Mandatsgeheimnis um?', a: 'Auf der Website erheben wir nur die nötigsten Daten, übertragen sie verschlüsselt und weisen transparent auf die Verarbeitung hin. Für sensible Prozesse wie Dokumentenaustausch beraten wir zu geeigneten, datenschutzgerechten Lösungen.' },
  ],
  cta: {
    headline: 'Sprechen wir über Ihren Kanzleiauftritt.',
    text: 'Nennen Sie uns Ihre Rechtsgebiete und Ihren Standort. Wir zeigen Ihnen, wie Ihre Kanzlei online sachlich, seriös und auffindbar wird.',
  },
  compliance: berufsrecht,
  related: ['kanzleien', 'steuerberater', 'notare'],
};

const kanzleien: Industry = {
  slug: 'kanzleien',
  name: 'Kanzleien',
  group: 'Recht & Beratung',
  blurb: 'Auftritt, Teamdarstellung und Recruiting für Sozietäten und Kanzleien.',
  seo: {
    title: 'Werbeagentur für Kanzleien: Positionierung & Recruiting',
    description:
      'Werbeagentur für Kanzleien und Sozietäten: Positionierung, Website mit Teamprofilen, Recruiting-Seiten und lokale Sichtbarkeit. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Kanzleien',
  h1: 'Kanzleimarke und Website für Sozietäten mit mehreren Berufsträgern',
  lead: 'Mehrere Anwälte, mehrere Rechtsgebiete, ein Auftritt: Wir schaffen eine Kanzleimarke, die Teamstärke zeigt und zugleich jedem Berufsträger Profil gibt.',
  problems: [
    { title: 'Viele Köpfe, kein gemeinsamer Auftritt', text: 'Gewachsene Sozietäten wirken oft wie ein Nebeneinander von Einzelprofilen. Der gemeinsame Anspruch der Kanzlei bleibt unsichtbar.' },
    { title: 'Nachwuchs gewinnen', text: 'Referendare, Associates und Fachkräfte entscheiden früh, wo sie sich bewerben. Eine Kanzlei ohne aussagekräftige Karriereseite verliert im Wettbewerb um Talente.' },
    { title: 'Rechtsgebiete und Standorte ordnen', text: 'Mehrere Standorte und Fachbereiche brauchen eine Struktur, die Besucher intuitiv verstehen – sonst gehen wichtige Leistungen unter.' },
  ],
  solutions: [
    { service: 'branding', title: 'Kanzleimarke und Positionierung', text: 'Gemeinsame Botschaft, Erscheinungsbild und Regeln, in die Einzelprofile eingebettet werden.' },
    { service: 'webdesign', title: 'Website mit Team- und Fachbereichsstruktur', text: 'Übersichtliche Teamseiten, Fachbereiche, Standorte und Publikationen in einer skalierbaren Struktur.' },
    { service: 'seo', title: 'Lokale und fachliche Sichtbarkeit', text: 'Standortseiten mit echtem Inhalt und Fachseiten für Kernthemen – nicht austauschbar kopiert.' },
    { service: 'social-media', title: 'Employer Branding', text: 'Einblicke in Kanzleialltag und Kultur auf professionellen Kanälen wie LinkedIn – sachlich und glaubwürdig.' },
  ],
  examples: [
    { title: 'Karriereseite mit Bewerbungsformular', text: 'Offene Stellen, Ausbildungsweg, Team und Ansprechpartner sowie ein Bewerbungsformular mit Dokumenten-Upload.' },
    { title: 'Fachbereichs-Navigation', text: 'Eine klare Navigation nach Rechtsgebieten und Standorten, die Besucher in zwei Klicks zum passenden Ansprechpartner führt.' },
  ],
  faq: [
    { q: 'Wie kann eine Kanzlei ihre Teamstärke zeigen?', a: 'Durch eine gemeinsame Marke mit einheitlichen Profilen, Fachbereichsseiten und Beiträgen, die Zusammenarbeit sichtbar machen – statt nebeneinanderstehender Einzelseiten.' },
    { q: 'Was gehört auf eine Kanzlei-Karriereseite?', a: 'Klare Stellenprofile, Einblicke in Arbeitsweise und Team, Entwicklungsmöglichkeiten und ein niedrigschwelliger Bewerbungsweg.' },
    { q: 'Übernehmen Sie auch die Pflege der Publikationen?', a: 'Ja, auf Wunsch strukturieren wir Beiträge und Veröffentlichungen so, dass sie sowohl für Leser als auch für Suchmaschinen gut auffindbar sind.' },
  ],
  cta: {
    headline: 'Kanzleimarke aus einem Guss.',
    text: 'Erzählen Sie uns von Ihrer Kanzlei, den Fachbereichen und Standorten. Wir zeigen, wie ein gemeinsamer Auftritt aussehen kann.',
  },
  compliance: berufsrecht,
  related: ['rechtsanwaelte', 'steuerberater', 'wirtschaftspruefer'],
};

const steuerberater: Industry = {
  slug: 'steuerberater',
  name: 'Steuerberater',
  group: 'Recht & Beratung',
  blurb: 'Mandantengewinnung, Mandantenportal und Recruiting für Steuerberatungskanzleien.',
  seo: {
    title: 'Werbeagentur für Steuerberater: Website & Mandanten',
    description:
      'Werbeagentur für Steuerberater: Kanzlei-Website, lokale SEO, Mandantenportal, Fachkräfte-Recruiting und klare Positionierung. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Steuerberater',
  h1: 'Mehr passende Mandate für Ihre Steuerkanzlei',
  lead: 'Steuerberatung ist Vertrauenssache, und Mandanten wechseln selten. Umso wichtiger ist, dass Sie im richtigen Moment gefunden werden und digital einfach zusammenarbeiten.',
  problems: [
    { title: 'Austauschbarer Auftritt', text: 'Viele Kanzleiseiten klingen gleich: Kompetenz, Erfahrung, Vertrauen. Ohne klare Zielgruppe und Spezialisierung wird der Wechselgrund nicht sichtbar.' },
    { title: 'Belegflut und Rückfragen', text: 'E-Mail, Papier und Boten kosten Zeit. Ein strukturierter Weg für Belege und Unterlagen entlastet Team und Mandanten.' },
    { title: 'Fachkräftemangel', text: 'Wer keine attraktive Karriereseite hat, verliert Bewerber an Kanzleien mit sichtbarer Kultur und klaren Perspektiven.' },
    { title: 'Saisonale Nachfrage', text: 'Rund um Abgabefristen und Jahreswechsel steigt die Suche nach Steuerberatern. Wer dann nicht sichtbar ist, verpasst Neumandate.' },
  ],
  solutions: [
    { service: 'branding', title: 'Positionierung und Auftritt', text: 'Zielgruppen und Schwerpunkte schärfen und in einem klaren, seriösen Erscheinungsbild ausdrücken.' },
    { service: 'webdesign', title: 'Kanzlei-Website mit Leistungsübersicht', text: 'Leistungen, Schwerpunkte, Team, Ablauf der Zusammenarbeit und einfache Kontaktwege.' },
    { service: 'buchungssysteme-crm', title: 'Mandantenportal und Belegupload', text: 'Ein geschützter Bereich für Unterlagen und Nachrichten – schlank und ohne Medienbruch.' },
    { service: 'seo', title: 'Lokale Sichtbarkeit', text: 'Suchbegriffe rund um Steuererklärung, Buchhaltung, Existenzgründung und Nachfolge – vor Ort und im Einzugsgebiet.' },
  ],
  examples: [
    { title: 'Schwerpunkt-Landingpages', text: 'Eigene Seiten für Zielgruppen wie Selbstständige, Vermieter oder Existenzgründer, jeweils mit typischen Fragen und Ansprechpartner.' },
    { title: 'Bewerbungsseite für Fachkräfte', text: 'Stellen, Ausbildungsweg, Teamvorstellung und ein kurzes Bewerbungsformular.' },
    { title: 'Digitaler Mandanten-Onboarding-Ablauf', text: 'Ein strukturierter Ablauf für neue Mandate: Erstgespräch buchen, Unterlagenliste erhalten, Dokumente sicher hochladen.' },
  ],
  faq: [
    { q: 'Dürfen Steuerberater werben?', a: 'Ja, in sachlicher Form. Die Berufsordnung und das Steuerberatungsgesetz setzen Grenzen für reklamehafte oder irreführende Werbung. Wir formulieren zurückhaltend und stimmen Inhalte mit Ihnen ab.' },
    { q: 'Was bringt ein Mandantenportal?', a: 'Weniger Rückfragen, geordnete Unterlagen und ein professioneller Eindruck. Wir beraten zu Lösungen, die zu Ihrer Kanzleisoftware passen, und bauen bei Bedarf die Anbindung.' },
    { q: 'Wie gewinne ich neue Mandate im Netz?', a: 'Mit klarer Spezialisierung, lokal optimierten Seiten, gepflegtem Google-Profil und einer Website, die Fragen beantwortet, bevor Interessenten anrufen.' },
  ],
  cta: {
    headline: 'Ihre Steuerkanzlei sichtbar machen.',
    text: 'Beschreiben Sie Ihre Schwerpunkte und Ihre Wunschmandanten. Wir melden uns mit Ideen für Positionierung und Umsetzung.',
  },
  compliance:
    'Steuerberater dürfen sachlich informieren, aber nicht berufswidrig werben. Die Vorgaben ergeben sich aus dem Steuerberatungsgesetz und der Berufsordnung. Wir gestalten zurückhaltend und stimmen Formulierungen mit Ihnen ab; eine Rechtsberatung ersetzen wir nicht.',
  related: ['rechtsanwaelte', 'wirtschaftspruefer', 'notare'],
};

const notare: Industry = {
  slug: 'notare',
  name: 'Notare',
  group: 'Recht & Beratung',
  blurb: 'Sachliche, barrierearme Informationsauftritte und Terminvereinbarung für Notariate.',
  seo: {
    title: 'Website für Notare: sachlich, klar, barrierearm',
    description:
      'Website und Auftritt für Notare: sachliche Information, Ablauf, Terminvereinbarung und Formulare – barrierearm und seriös. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Notare',
  h1: 'Notariats-Website: sachlich informieren, Termine erleichtern',
  lead: 'Notare üben ein öffentliches Amt aus und unterliegen besonderen Regeln zur Außendarstellung. Ein guter Auftritt informiert deshalb klar, dient der Orientierung und erleichtert die Terminvereinbarung.',
  problems: [
    { title: 'Enge Grenzen für Werbung', text: 'Marktschreierische Werbung passt weder zum Amt noch zum Berufsrecht. Der Auftritt muss informieren, nicht werben.' },
    { title: 'Mandanten wissen nicht, was sie mitbringen müssen', text: 'Viele Termine scheitern oder verzögern sich, weil Unterlagen fehlen. Eine verständliche Vorbereitung entlastet das Notariat.' },
    { title: 'Terminabstimmung kostet Zeit', text: 'Telefon und E-Mail binden Personal. Eine strukturierte Terminanfrage nach Anlass beschleunigt die Abläufe.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Ruhiger, barrierearmer Auftritt', text: 'Klare Struktur nach Anlässen (Immobilienkauf, Testament, Gesellschaft …), gut lesbare Typografie und hohe Zugänglichkeit.' },
    { service: 'buchungssysteme-crm', title: 'Terminanfrage nach Anlass', text: 'Interessenten wählen den Anlass und erhalten direkt eine Liste benötigter Unterlagen; das Notariat erhält strukturierte Anfragen.' },
    { service: 'seo', title: 'Auffindbarkeit im Einzugsgebiet', text: 'Sachliche Inhalte zu Anlässen und ein gepflegtes Standort-Profil, damit Ihr Notariat bei lokalen Suchen erscheint.' },
    { service: 'print-werbemittel', title: 'Geschäftsausstattung', text: 'Sachlich gestaltete Broschüren, Merkblätter und Visitenkarten im Corporate Design.' },
  ],
  examples: [
    { title: 'Anlass-Seiten mit Checkliste', text: 'Pro Anlass eine Seite: was ist zu tun, welche Unterlagen werden benötigt, wie läuft der Termin ab.' },
    { title: 'Strukturierte Terminanfrage', text: 'Ein kurzes Formular mit Anlass, Wunschzeitraum und Kontaktdaten, das keine sensiblen Details vorab verlangt.' },
  ],
  faq: [
    { q: 'Dürfen Notare eine Website betreiben?', a: 'Ja. Sie dürfen sachlich über Amt, Leistungen und Ablauf informieren. Reklamehafte oder vergleichende Werbung ist tabu. Wir gestalten deshalb nüchtern und stimmen Inhalte mit Ihnen ab.' },
    { q: 'Können Kosten auf der Website genannt werden?', a: 'Notarkosten sind gesetzlich geregelt. Informationen dazu können sachlich erläutert werden; wir klären mit Ihnen, welche Darstellung angemessen ist.' },
    { q: 'Wie wichtig ist Barrierefreiheit?', a: 'Sehr wichtig – Ihre Klientel ist vielfältig. Wir achten auf lesbare Schriften, ausreichende Kontraste und eine gut bedienbare Struktur.' },
  ],
  cta: {
    headline: 'Ein Auftritt, der dem Amt gerecht wird.',
    text: 'Schildern Sie uns Ihr Notariat und den Wunschumfang. Wir stimmen einen sachlichen Auftritt und die Terminorganisation auf Ihre Abläufe ab.',
  },
  compliance:
    'Für Notare gelten besonders strenge Regeln zur Außendarstellung. Wir beschränken uns auf sachliche Information und stimmen jeden Inhalt mit Ihnen ab. Prüfen Sie Ihren Auftritt im Zweifel mit Ihrer Notarkammer – eine Rechtsberatung ersetzen wir nicht.',
  related: ['rechtsanwaelte', 'steuerberater', 'immobilien'],
};

const wirtschaftspruefer: Industry = {
  slug: 'wirtschaftspruefer',
  name: 'Wirtschaftsprüfer',
  group: 'Recht & Beratung',
  blurb: 'Positionierung, Fachbeiträge und Recruiting für Prüfungs- und Beratungsgesellschaften.',
  seo: {
    title: 'Werbeagentur für Wirtschaftsprüfer: Auftritt & Recruiting',
    description:
      'Werbeagentur für Wirtschaftsprüfer und Prüfungsgesellschaften: Positionierung, Website, Fachbeiträge und Recruiting. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Wirtschaftsprüfer',
  h1: 'Auftritt für Wirtschaftsprüfer: kompetent, unabhängig, nachvollziehbar',
  lead: 'Ihre Zielgruppe sind Geschäftsführer, Aufsichtsräte und Finanzverantwortliche. Sie erwarten Unabhängigkeit, Fachtiefe und Klarheit – auch im Auftritt.',
  problems: [
    { title: 'Kompetenz sichtbar machen', text: 'Fachwissen ist unsichtbar, solange es nicht in Beiträgen, Profilen und klaren Leistungsbeschreibungen erscheint.' },
    { title: 'Mittelstand erreichen', text: 'Mandate entstehen häufig über Empfehlungen. Eine professionelle Website stützt diese Empfehlungen, wenn Interessenten nachprüfen.' },
    { title: 'Nachwuchs gewinnen', text: 'Prüfungsgesellschaften konkurrieren um qualifizierten Nachwuchs. Ohne Karriereauftritt bleibt der Zugang zu Talenten begrenzt.' },
  ],
  solutions: [
    { service: 'branding', title: 'Seriöse Markenführung', text: 'Ein zurückhaltendes, präzises Erscheinungsbild, das Unabhängigkeit und Fachlichkeit ausstrahlt.' },
    { service: 'webdesign', title: 'Fachlich strukturierte Website', text: 'Leistungen, Branchen, Teams, Fachbeiträge und Kontaktwege in klarer, ruhiger Struktur.' },
    { service: 'seo', title: 'Sichtbarkeit für Fachthemen', text: 'Inhalte zu prüfungs- und beratungsrelevanten Themen, die von Entscheidern gefunden werden.' },
    { service: 'social-media', title: 'LinkedIn und Employer Branding', text: 'Fachbeiträge und Einblicke in Team und Kultur für Entscheider und Nachwuchs.' },
  ],
  examples: [
    { title: 'Fachbeiträge-Bereich', text: 'Strukturierte Veröffentlichungen mit Autorenprofilen, Themen und Filter nach Branche.' },
    { title: 'Karriereportal', text: 'Einstiegsprogramme, Prüfungsvorbereitung und Team im Überblick, mit einfacher Bewerbung.' },
  ],
  faq: [
    { q: 'Gelten für Wirtschaftsprüfer Werbebeschränkungen?', a: 'Ja, berufsrechtliche Regeln verlangen sachliche, nicht irreführende Außendarstellung. Wir gestalten zurückhaltend und stimmen Inhalte mit Ihnen ab.' },
    { q: 'Wie lässt sich Fachkompetenz online zeigen?', a: 'Durch Fachbeiträge, Profile der Berufsträger, klare Leistungsbeschreibungen und nachvollziehbare Schwerpunkte statt allgemeiner Versprechen.' },
    { q: 'Ist ein Mandantenportal sinnvoll?', a: 'Für den regelmäßigen Austausch von Unterlagen kann ein geschützter Bereich Abläufe erleichtern. Wir beraten zu passenden, sicheren Lösungen.' },
  ],
  cta: {
    headline: 'Fachkompetenz sichtbar machen.',
    text: 'Erzählen Sie uns von Ihrer Gesellschaft, Ihren Zielbranchen und Ihrem Anspruch. Wir entwickeln einen Auftritt, der zu Ihrem Berufsstand passt.',
  },
  compliance:
    'Für Wirtschaftsprüfer gelten berufsrechtliche Vorgaben zur Außendarstellung (u. a. Wirtschaftsprüferordnung und Berufssatzung). Wir gestalten sachlich und stimmen Inhalte mit Ihnen ab; eine Rechtsberatung ersetzen wir nicht.',
  related: ['steuerberater', 'kanzleien', 'rechtsanwaelte'],
};

export const anwaelte: Industry = {
  slug: 'anwaelte',
  name: 'Anwälte & Kanzleien',
  group: 'Recht & Beratung',
  blurb: 'Kanzlei-Website, Rechtsgebiete, lokale SEO und Erstberatung für Anwälte, Steuerberater und Notare.',
  seo: {
    title: 'Werbeagentur für Anwälte & Kanzleien',
    description:
      'Werbeagentur für Anwälte, Kanzleien, Steuerberater und Notare: seriöse Kanzlei-Website, Rechtsgebiete-Seiten, lokale SEO und Terminbuchung. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Anwälte & Kanzleien',
  h1: 'Kanzlei-Website und Sichtbarkeit für Anwälte, die Vertrauen schaffen',
  lead: 'Mandanten wählen Kanzleien nach Vertrauen, Erreichbarkeit und erkennbarer Kompetenz. Wir gestalten Ihren Auftritt seriös, sachlich und so, dass die Richtigen den ersten Schritt gehen.',
  segments: ['Rechtsanwälte', 'Kanzleien & Sozietäten', 'Steuerberater', 'Notare', 'Wirtschaftsprüfer'],
  problems: [
    { title: 'Vertrauen entscheidet, nicht Lautstärke', text: 'Wer einen Anwalt braucht, steckt oft in einer schwierigen Situation. Die Website muss ruhig, klar und kompetent wirken – ein reißerischer Auftritt schadet.' },
    { title: 'Rechtsgebiete werden nicht gefunden', text: 'Mandanten suchen nach ihrem Problem. Ohne eigene, hilfreiche Seite je Rechtsgebiet erscheint Ihre Kanzlei in genau diesen Suchen nicht.' },
    { title: 'Werbung mit berufsrechtlichen Grenzen', text: 'Anwälte, Steuerberater und Notare dürfen nur sachlich informieren. Viele Agenturen kennen diese Grenzen nicht und liefern Auftritte, die berufsrechtlich heikel sind.' },
    { title: 'Erstkontakt und Vertraulichkeit', text: 'Wer diskret anfragen will, braucht einen einfachen und datenschutzgerechten Weg – ein überladenes Formular schreckt ab.' },
    { title: 'Lokale Konkurrenz um Aufmerksamkeit', text: 'Im Einzugsgebiet konkurrieren viele Kanzleien um dieselben Suchen. Sichtbarkeit entsteht durch Profil, Bewertungen und Inhalte, nicht durch bloße Präsenz.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Seriöse Kanzlei-Website', text: 'Ruhige Gestaltung, klare Struktur, Profil und Qualifikation, Rechtsgebiete als eigene Seiten und mobil zuerst.' },
    { service: 'seo', title: 'Lokale SEO und Rechtsgebiete-Seiten', text: 'Hilfreiche Inhalte für Ihre Kernthemen, gepflegtes Google-Unternehmensprofil und konsistente Firmendaten.' },
    { service: 'branding', title: 'Kanzleimarke', text: 'Logo, Corporate Design und Geschäftsausstattung, die Ihre Positionierung unaufdringlich ausdrücken.' },
    { service: 'buchungssysteme-crm', title: 'Erstberatung online buchen', text: 'Terminwahl, strukturierte Vorabangaben und datenschutzgerechte Abläufe – auf Wunsch mit Mandantenportal.' },
    { service: 'google-ads', title: 'Gezielte Suchanzeigen', text: 'Zurückhaltende Anzeigen für dringende Rechtsfragen in Ihrer Region, mit eigener Landingpage je Thema.' },
    { service: 'wartung-hosting', title: 'Sicherer Betrieb', text: 'Regelmäßige Updates, Sicherungen und Datenschutz-Hygiene – wichtig für vertrauliche Anfragen.' },
  ],
  examples: [
    { title: 'Rechtsgebiete als eigene Landingpages', text: 'Jedes Kernthema erhält eine Seite mit typischen Situationen, dem Ablauf einer Beratung, Fragen und Ansprechpartner. So wird Ihre Expertise auffindbar.' },
    { title: 'Diskrete Erstberatungs-Anfrage', text: 'Ein kompaktes Formular mit Themenauswahl und Rückrufzeit, klarem Datenschutzhinweis und ohne Pflichtfelder zu sensiblen Details.' },
    { title: 'Kanzlei-Profil mit Fachanwaltstitel', text: 'Werdegang, Qualifikation, Schwerpunkte und Veröffentlichungen, sachlich dargestellt und für Suchmaschinen strukturiert.' },
  ],
  faq: [
    { q: 'Dürfen Anwälte überhaupt Werbung machen?', a: 'Ja, sofern sie sachlich informiert und nicht irreführend oder reklamehaft ist. Wir gestalten Ihren Auftritt entsprechend und weisen auf heikle Formulierungen hin. Die Verantwortung für die Zulässigkeit liegt bei Ihnen; im Zweifel klären Sie sie mit Ihrer Kammer.' },
    { q: 'Was unterscheidet einen guten Kanzleiauftritt von einer normalen Firmenwebsite?', a: 'Zurückhaltung, Klarheit und Nachprüfbarkeit: sichtbare Qualifikationen, konkrete Rechtsgebiete, einfacher Erstkontakt und ein Design, das Ruhe ausstrahlt. Die Sprache ist informierend, nicht anpreisend.' },
    { q: 'Wie schnell zeigt lokale SEO Wirkung?', a: 'Technische und Profil-Verbesserungen wirken oft innerhalb weniger Wochen, inhaltliche Sichtbarkeit baut sich über Monate auf. Wir priorisieren, was in Ihrem Einzugsgebiet am meisten bringt.' },
    { q: 'Können Sie auch Steuerberater und Notare betreuen?', a: 'Ja. Für diese Berufe gelten eigene berufsrechtliche Rahmenbedingungen. Deshalb haben wir eigene Unterseiten und passen Auftritt und Sprache an.' },
    { q: 'Ersetzen Sie eine berufsrechtliche Prüfung?', a: 'Nein. Wir orientieren uns an üblichen Vorgaben, ersetzen aber keine Rechtsberatung. Bitte prüfen Sie Inhalte im Zweifel mit Ihrer Kammer.' },
  ],
  cta: {
    headline: 'Ein Kanzleiauftritt, der Mandanten den ersten Schritt erleichtert.',
    text: 'Nennen Sie uns Rechtsgebiete, Standort und Ziele. Wir melden uns mit einer ersten Einschätzung und zeigen, wie Ihre Kanzlei online souverän wirkt.',
  },
  compliance: berufsrecht,
  related: ['fahrschulen', 'immobilien', 'aerzte'],
  subpages: [rechtsanwaelte, kanzleien, steuerberater, notare, wirtschaftspruefer],
  regions: [
    'niedersachsen', 'bremen', 'hamburg', 'berlin', 'nordrhein-westfalen', 'bayern', 'baden-wuerttemberg', 'hessen',
    'rheinland-pfalz', 'saarland', 'sachsen', 'sachsen-anhalt', 'thueringen', 'brandenburg', 'mecklenburg-vorpommern',
    'schleswig-holstein',
  ],
};
