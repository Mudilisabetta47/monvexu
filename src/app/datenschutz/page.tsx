import type { Metadata } from 'next';
import { LegalPage, Missing } from '@/components/layout/LegalPage';
import { company, legal } from '@/data/site';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der MONVEX UG: Informationen zur Verarbeitung personenbezogener Daten, Kontaktformular, Hosting und Ihren Rechten.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
};

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutz">
      <div>
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          <strong>{company.legalName}</strong>, {company.address.street}, {company.address.zip} {company.address.city}, {company.address.country}
          <br />
          E-Mail: <Missing what="E-Mail-Adresse" value={legal.email} />
        </p>
      </div>
      <div>
        <h2>2. Hosting und Server-Logfiles</h2>
        <p>
          Diese Website wird bei einem externen Hosting-Dienstleister betrieben. Beim Aufruf werden technisch notwendige Daten verarbeitet, die Ihr Browser automatisch übermittelt (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp, Betriebssystem, Referrer-URL). Die Verarbeitung dient der sicheren und stabilen Bereitstellung der Website; Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mit dem Hosting-Dienstleister besteht ein Vertrag zur Auftragsverarbeitung.
        </p>
      </div>
      <div>
        <h2>3. Kontaktformular</h2>
        <p>
          Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihre Angaben (Name, Unternehmen, E-Mail-Adresse, Telefonnummer, Nachricht), um Ihre Anfrage zu bearbeiten und für Anschlussfragen. Die Nachricht wird über einen E-Mail-Versanddienstleister an uns zugestellt. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. die Anbahnung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO). Wir löschen Ihre Angaben, sobald sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
      </div>
      <div>
        <h2>4. Cookies, Tracking und Schriftarten</h2>
        <p>
          Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken ein und verwendet keine Tracking- oder Analyse-Tools. Die verwendeten Schriftarten werden von unserem eigenen Server ausgeliefert; es findet keine Verbindung zu Google-Servern statt.
        </p>
      </div>
      <div>
        <h2>5. Ihre Rechte</h2>
        <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p className="mt-3">
          Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen.
        </p>
      </div>
      <div>
        <h2>6. Aktualität</h2>
        <p>Wir passen diese Erklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt die jeweils hier veröffentlichte Fassung.</p>
      </div>
    </LegalPage>
  );
}
