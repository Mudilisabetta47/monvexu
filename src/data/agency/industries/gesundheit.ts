import type { Industry } from '../types';

const hwg =
  'Für Heilberufe gelten Vorgaben zu Werbung, etwa Berufsordnung und Heilmittelwerbegesetz. Wir gestalten sachlich, vermeiden Heilversprechen und stimmen Inhalte mit Ihnen ab. Eine Rechtsberatung ersetzen wir nicht.';

export const aerzte: Industry = {
  slug: 'aerzte',
  name: 'Ärzte & Praxen',
  group: 'Gesundheit',
  blurb: 'Praxis-Website, Online-Terminanfrage, lokale SEO und Patientenkommunikation.',
  seo: {
    title: 'Werbeagentur für Ärzte & Arztpraxen: Website & Termine',
    description:
      'Werbeagentur für Ärzte und Praxen: Praxis-Website, Online-Terminanfrage, lokale SEO und Patientenkommunikation – sachlich und datenschutzgerecht.',
  },
  eyebrow: 'Werbeagentur für Ärzte',
  h1: 'Praxis-Website, die Patienten Orientierung gibt und die Anmeldung entlastet',
  lead: 'Patienten suchen eine Praxis in ihrer Nähe, prüfen Sprechzeiten und Leistungen – und wollen wissen, wie sie Termine bekommen. Eine gute Website beantwortet das, bevor das Telefon klingelt.',
  segments: ['Hausarztpraxen', 'Fachärzte', 'Gemeinschaftspraxen', 'Medizinische Versorgungszentren'],
  problems: [
    { title: 'Überlastetes Telefon', text: 'Viele Anrufe betreffen Sprechzeiten, Rezepte oder Formulare. Ein Teil davon lässt sich mit einer klaren Website und strukturierter Anfrage vermeiden.' },
    { title: 'Leistungen und Schwerpunkte unklar', text: 'Patienten erkennen nicht, was die Praxis anbietet, ob Kassen- oder Privatpatienten willkommen sind oder ob Termine online möglich sind.' },
    { title: 'Lokale Auffindbarkeit', text: 'Bei „Arzt in der Nähe“ entscheiden Karten-Einträge, Bewertungen und aktuelle Öffnungszeiten – veraltete Angaben kosten Vertrauen.' },
    { title: 'Personal finden', text: 'Medizinische Fachangestellte und Ärzte sind gefragt. Eine Praxis, die sich als Arbeitgeber zeigt, erleichtert die Suche.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Praxis-Website mit klarer Struktur', text: 'Leistungen, Team, Sprechzeiten, Anfahrt, Terminwege und Patienteninformationen – barrierearm und mobil.' },
    { service: 'buchungssysteme-crm', title: 'Terminanfrage und Rezeptanforderung', text: 'Strukturierte Anfragen mit datensparsamem Formular; auf Wunsch Anbindung an gängige Terminsysteme.' },
    { service: 'seo', title: 'Lokale Sichtbarkeit', text: 'Gepflegtes Google-Profil, aktuelle Öffnungszeiten, Leistungsseiten und ein sauberer Bewertungsprozess.' },
    { service: 'social-media', title: 'Employer Branding', text: 'Einblicke in Praxisalltag und Team, um Fachkräfte anzusprechen.' },
  ],
  examples: [
    { title: 'Leistungsseiten je Schwerpunkt', text: 'Eine Seite pro Schwerpunkt mit verständlicher Erklärung, Ablauf und Ansprechpartner – ohne Heilversprechen.' },
    { title: 'Datensparsame Terminanfrage', text: 'Ein Formular, das nur Notwendiges abfragt und deutlich macht, wofür Daten genutzt werden. Für medizinische Details verweist es auf ein persönliches Gespräch.' },
    { title: 'Aktuelle Praxisinfos', text: 'Ein zentraler Bereich für Urlaubszeiten, Vertretungsregelung und Hinweise, der Website und Google-Profil konsistent hält.' },
  ],
  faq: [
    { q: 'Was dürfen Ärzte auf der Website schreiben?', a: 'Sachliche Informationen zu Leistungen, Qualifikationen und Praxisablauf. Heilversprechen, irreführende Aussagen und übertriebene Werbung sind zu vermeiden. Wir formulieren sachlich und weisen auf kritische Stellen hin.' },
    { q: 'Wie gehen Sie mit Patientendaten um?', a: 'Wir fragen auf der Website nur das Nötigste ab und übertragen verschlüsselt. Medizinische Details gehören nicht in ein allgemeines Kontaktformular. Für sensible Prozesse beraten wir zu geeigneten Lösungen.' },
    { q: 'Können Sie unsere Terminsoftware einbinden?', a: 'Häufig ja, über Widgets oder Schnittstellen. Wir prüfen im Erstgespräch, was mit Ihrem System möglich ist.' },
  ],
  cta: {
    headline: 'Eine Praxis-Website, die Ihr Team entlastet.',
    text: 'Erzählen Sie uns von Ihrer Praxis und Ihren Abläufen. Wir zeigen, wie Website und Terminwege Ihr Telefon entlasten.',
  },
  compliance: hwg,
  related: ['zahnaerzte', 'physiotherapie', 'anwaelte'],
};

export const zahnaerzte: Industry = {
  slug: 'zahnaerzte',
  name: 'Zahnärzte & Zahnarztpraxen',
  group: 'Gesundheit',
  blurb: 'Auftritt, Leistungsseiten und Patientengewinnung für Zahnarztpraxen.',
  seo: {
    title: 'Werbeagentur für Zahnärzte: Praxis-Website & Sichtbarkeit',
    description:
      'Werbeagentur für Zahnärzte: Zahnarzt-Website, Leistungsseiten, lokale SEO, Online-Terminanfrage und Praxis-Branding – sachlich und vertrauenswürdig.',
  },
  eyebrow: 'Werbeagentur für Zahnärzte',
  h1: 'Zahnarztpraxis-Website, die Angst nimmt und Vertrauen aufbaut',
  lead: 'Der Gang zum Zahnarzt ist für viele mit Sorgen verbunden. Eine freundliche, klare Website nimmt Hemmschwellen und zeigt, was Ihre Praxis besonders macht.',
  segments: ['Zahnarztpraxen', 'Kieferorthopädie', 'Oralchirurgie', 'Prophylaxe & ästhetische Zahnheilkunde'],
  problems: [
    { title: 'Behandlungsangst und Unsicherheit', text: 'Neue Patienten suchen Hinweise darauf, dass sie ernst genommen werden. Eine unpersönliche Website verstärkt Zweifel.' },
    { title: 'Selbstzahlerleistungen erklären', text: 'Leistungen wie Prophylaxe oder ästhetische Behandlungen brauchen verständliche Erklärungen, sonst bleiben sie ungenutzt.' },
    { title: 'Starke lokale Konkurrenz', text: 'Zahnarztpraxen stehen im direkten lokalen Wettbewerb. Bewertungen, Erreichbarkeit und Profil entscheiden über den ersten Termin.' },
    { title: 'Werberechtliche Grenzen', text: 'Vorher-Nachher-Versprechen oder reißerische Formulierungen sind riskant und untergraben Seriosität.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Freundliche Praxis-Website', text: 'Helles, beruhigendes Design, Teamfotos, Leistungsübersicht und ein sichtbarer Weg zur Terminanfrage.' },
    { service: 'seo', title: 'Leistungs- und Standortseiten', text: 'Hilfreiche Seiten zu Behandlungen, Angst-Patienten-Themen und lokale Optimierung Ihres Einzugsgebiets.' },
    { service: 'branding', title: 'Praxis-Branding', text: 'Logo, Farbwelt und Räume-nahe Gestaltung für Website, Print und Praxisschilder.' },
    { service: 'google-ads', title: 'Gezielte Anzeigen für Selbstzahlerleistungen', text: 'Anzeigen in Ihrer Region, sachlich formuliert und mit passender Landingpage.' },
  ],
  examples: [
    { title: 'Behandlungsseiten mit Ablauf', text: 'Wie läuft ein Termin ab, was passiert davor und danach, welche Fragen gibt es? Verständlich und ohne Fachjargon.' },
    { title: 'Praxisrundgang', text: 'Fotos und Kurzbeschreibung der Räume und des Teams – das baut Nähe auf, bevor jemand die Praxis betritt.' },
    { title: 'Terminanfrage mit Anlass', text: 'Ein kurzer Ablauf mit Anlasswahl (Kontrolle, Beschwerden, Prophylaxe) und Wunschzeitraum.' },
  ],
  faq: [
    { q: 'Dürfen Zahnärzte mit Vorher-Nachher-Bildern werben?', a: 'Hier gelten enge Grenzen (u. a. Heilmittelwerbegesetz). Wir verzichten auf riskante Darstellungen und setzen auf sachliche Erklärungen und Vertrauen durch Transparenz.' },
    { q: 'Wie kann die Website Behandlungsängste mindern?', a: 'Durch verständliche Erklärungen, sichtbares Team, Hinweise zu Angstpatienten und einen niedrigschwelligen Kontaktweg.' },
    { q: 'Machen Sie auch Praxisschilder und Print?', a: 'Ja, im Rahmen des Corporate Designs gestalten wir Schilder, Flyer und Patienteninformationen im einheitlichen Erscheinungsbild.' },
  ],
  cta: {
    headline: 'Eine Praxis, die man gern betritt – schon online.',
    text: 'Erzählen Sie uns von Ihren Schwerpunkten und Ihrer Praxis. Wir entwickeln einen Auftritt, der Vertrauen aufbaut.',
  },
  compliance: hwg,
  related: ['aerzte', 'physiotherapie', 'anwaelte'],
};

export const physiotherapie: Industry = {
  slug: 'physiotherapie',
  name: 'Physiotherapie & Pflege',
  group: 'Gesundheit',
  blurb: 'Website, Terminwege, Recruiting und lokale Sichtbarkeit für Therapie- und Pflegebetriebe.',
  seo: {
    title: 'Werbeagentur für Physiotherapie & Pflegedienste',
    description:
      'Werbeagentur für Physiotherapie-Praxen und Pflegedienste: Website, Terminanfrage, Fachkräfte-Recruiting und lokale SEO. MONVEX aus Bremen.',
  },
  eyebrow: 'Werbeagentur für Physiotherapie & Pflege',
  h1: 'Physiotherapie und Pflege: Sichtbarkeit bei Patienten und Fachkräften',
  lead: 'Ihre Praxis oder Ihr Pflegedienst braucht zwei Zielgruppen: Patienten und Angehörige, die Sie finden, und Fachkräfte, die sich bewerben. Beides beginnt online.',
  segments: ['Physiotherapiepraxen', 'Ergotherapie & Logopädie', 'Ambulante Pflegedienste', 'Tagespflege'],
  problems: [
    { title: 'Angehörige suchen in der Krise', text: 'Wer plötzlich einen Pflegedienst braucht, sucht schnell und lokal. Ohne klare Angaben zu Leistungen und Einzugsgebiet bleibt eine Anfrage aus.' },
    { title: 'Fachkräftemangel', text: 'Therapeuten und Pflegekräfte wählen Arbeitgeber oft anhand des Online-Auftritts – Kultur, Arbeitszeiten und Bewerbungsweg müssen sichtbar sein.' },
    { title: 'Terminverwaltung im Alltag', text: 'Rückrufe und Terminwünsche per Telefon binden Zeit, die für Behandlung fehlt.' },
  ],
  solutions: [
    { service: 'webdesign', title: 'Klare, warme Website', text: 'Leistungen, Team, Einzugsgebiet, Kontakt und Bewerbungswege – gut lesbar auch für ältere Besucher.' },
    { service: 'seo', title: 'Lokale Auffindbarkeit', text: 'Sichtbar für Suchen wie „Pflegedienst in meiner Nähe“ oder „Physiotherapie mit Hausbesuch“.' },
    { service: 'social-media', title: 'Recruiting-Kanäle', text: 'Team-Einblicke und Stellenanzeigen dort, wo Fachkräfte unterwegs sind.' },
    { service: 'buchungssysteme-crm', title: 'Terminanfrage und Bewerbermanagement', text: 'Strukturierte Anfragen und ein einfacher Bewerbungsablauf mit Übersicht für Ihr Team.' },
  ],
  examples: [
    { title: 'Einzugsgebiet auf einen Blick', text: 'Eine Seite, die zeigt, wo Sie tätig sind, welche Leistungen Sie anbieten und wie der Erstkontakt abläuft.' },
    { title: 'Karriereseite mit Kurzbewerbung', text: 'Ein Bewerbungsformular in wenigen Schritten und ehrliche Einblicke in den Arbeitsalltag.' },
  ],
  faq: [
    { q: 'Wie erreiche ich Angehörige von Pflegebedürftigen?', a: 'Über klare, verständliche Informationen zu Leistungen und Ablauf, lokale Sichtbarkeit und einen einfachen Erstkontakt. Angehörige wollen schnell wissen, ob und wie Sie helfen können.' },
    { q: 'Was macht eine Karriereseite überzeugend?', a: 'Konkrete Angaben zu Arbeitszeiten, Team, Weiterbildung und Bewerbungsweg – und ein Bewerbungsformular, das in zwei Minuten ausgefüllt ist.' },
    { q: 'Gibt es Werbebeschränkungen?', a: 'Ja, im Gesundheitsbereich gelten Vorgaben wie das Heilmittelwerbegesetz. Wir formulieren sachlich und ohne Heilversprechen.' },
  ],
  cta: {
    headline: 'Patienten und Fachkräfte erreichen.',
    text: 'Beschreiben Sie Ihren Betrieb und Ihr Einzugsgebiet. Wir schlagen vor, wie Sie online für beide Zielgruppen sichtbar werden.',
  },
  compliance: hwg,
  related: ['aerzte', 'zahnaerzte', 'handwerk'],
};
