import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/layout/LegalPage';
import { LegalDraftNote } from '@/components/shops/LegalDraftNote';
import { LEGAL_STAND, SHOPS } from '@/data/shops';
import { company, legal } from '@/data/site';

export const metadata: Metadata = {
  title: 'AGB Shop-Start',
  description: 'Allgemeine Geschäftsbedingungen für MONVEX Shop-Start, den Aufbau von Shopify-Shops als digitale Dienstleistung.',
  alternates: { canonical: '/shops/agb' },
  robots: { index: false, follow: true },
};

export default function ShopsAgb() {
  return (
    <LegalPage title="AGB Shop-Start">
      <LegalDraftNote />
      <p className="text-[.9rem]">Stand: {LEGAL_STAND}</p>

      <div>
        <h2>§ 1 Geltung und Anbieter</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über „{SHOPS.name}“ zwischen der {company.legalName}, {company.address.street}, {company.address.zip} {company.address.city} („MONVEX“) und dem Kunden. Abweichende Bedingungen des Kunden gelten nur, wenn MONVEX ihnen ausdrücklich in Textform zustimmt.
        </p>
        <p className="mt-3">Verbraucher ist, wer den Vertrag zu Zwecken abschließt, die überwiegend weder seiner gewerblichen noch seiner selbständigen beruflichen Tätigkeit zugerechnet werden können. Unternehmer ist, wer in Ausübung seiner gewerblichen oder selbständigen beruflichen Tätigkeit handelt.</p>
      </div>

      <div>
        <h2>§ 2 Leistung</h2>
        <p>
          MONVEX baut für den Kunden einen Shopify-Shop nach der gewählten Branchenvorlage auf und übergibt ihn auf den Namen des Kunden. Es handelt sich um eine Dienstleistung, MONVEX schuldet die vereinbarte Tätigkeit und das vereinbarte Ergebnis, aber keinen wirtschaftlichen Erfolg. Der Umfang ergibt sich aus der Leistungsbeschreibung des gewählten Pakets auf der Website zum Zeitpunkt der Bestellung.
        </p>
      </div>

      <div>
        <h2>§ 3 Nicht enthalten</h2>
        <ul>
          <li>der Shopify-Tarif und alle Gebühren von Shopify und Zahlungsanbietern (der Kunde schließt diese Verträge selbst)</li>
          <li>Rechtstexte wie Impressum, Datenschutz, AGB und Widerruf des Kunden (MONVEX richtet die Seiten ein, die Texte muss der Kunde selbst bereitstellen; es erfolgt keine Rechtsberatung)</li>
          <li>Produkte, Bilder, Lieferanten, Domain, Werbung und Reichweite</li>
        </ul>
      </div>

      <div>
        <h2>§ 4 Vertragsschluss</h2>
        <p>
          Die Darstellung der Pakete auf der Website ist kein verbindliches Angebot. Mit dem Absenden der Bestellung gibt der Kunde ein Angebot ab. Der Vertrag kommt zustande, wenn MONVEX die Bestellung per E-Mail bestätigt oder mit der Ausführung beginnt. Bei Online-Bezahlung über Stripe wird die Bestellung zusätzlich mit erfolgreicher Zahlung wirksam.
        </p>
      </div>

      <div>
        <h2>§ 5 Preise und Zahlung</h2>
        <p>
          Es gelten die zum Zeitpunkt der Bestellung auf der Website angegebenen Preise in Euro. Die Preise sind Endpreise einschließlich der gesetzlichen Umsatzsteuer, soweit diese anfällt. Die Zahlung ist eine Einmalzahlung im Voraus. Bei Online-Bezahlung erfolgt sie über die Zahlungsseite von Stripe; MONVEX erhält keine Kartendaten. Bei Zahlung per Rechnung ist der Betrag nach Rechnungserhalt ohne Abzug fällig.
        </p>
      </div>

      <div>
        <h2>§ 6 Ausführung und Lieferzeit</h2>
        <p>
          Die Ausführung beginnt, sobald der Vertrag zustande gekommen ist, die Zahlung eingegangen ist (bei Zahlung im Voraus) und der Kunde alle für das Paket nötigen Angaben geliefert hat. Als Ziel nennt MONVEX {SHOPS.deliveryTarget} nach vollständigen Angaben. Das ist ein Richtwert und kein fester Liefertermin.
        </p>
      </div>

      <div>
        <h2>§ 7 Mitwirkung des Kunden</h2>
        <p>
          Der Kunde stellt rechtzeitig und vollständig bereit, was für die Ausführung nötig ist, zum Beispiel Shopname, Logo, Farben, Produktdaten und Freigaben. Fehlt etwas oder kommt es verspätet, verschiebt sich die Ausführung entsprechend. Das ist kein Grund zur Kündigung oder Rückerstattung, solange MONVEX die Leistung ohne die fehlenden Angaben nicht vertragsgemäß erbringen kann und den Kunden darauf hingewiesen hat.
        </p>
      </div>

      <div>
        <h2>§ 8 Übergabe und Nutzungsrechte</h2>
        <p>
          Der Shop wird auf den Namen des Kunden übergeben; der Kunde erhält vollen Admin-Zugriff. Nach vollständiger Zahlung erhält der Kunde das einfache, zeitlich und räumlich unbeschränkte Recht, die gelieferten Inhalte und Einstellungen für den eigenen Shop zu nutzen. Vorlagen, Themes und Software Dritter unterliegen deren Lizenzbedingungen. Die Vorlage selbst darf der Kunde nicht als Vorlage weiterverkaufen. Beispielbilder und Platzhaltertexte dienen nur der Veranschaulichung; der Kunde ersetzt sie vor dem Verkaufsstart durch eigene Inhalte, an denen er die Rechte hat.
        </p>
      </div>

      <div>
        <h2>§ 9 Korrekturen und Mängel</h2>
        <p>
          Je nach Paket sind Korrekturrunden enthalten. Entspricht die Leistung nicht dem Vereinbarten, bessert MONVEX nach. Gesetzliche Rechte des Kunden bei Mängeln bleiben unberührt. Support erfolgt im Rahmen des gebuchten Pakets und für den dort genannten Zeitraum.
        </p>
      </div>

      <div>
        <h2>§ 10 Haftung</h2>
        <p>
          MONVEX haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit und nach dem Produkthaftungsgesetz. Bei leichter Fahrlässigkeit haftet MONVEX nur für die Verletzung wesentlicher Vertragspflichten (Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags erst ermöglicht und auf die der Kunde regelmäßig vertrauen darf), und dann beschränkt auf den vorhersehbaren, typischerweise eintretenden Schaden. MONVEX schuldet keinen Umsatz, Gewinn oder Werbeerfolg und prüft nicht, ob die Inhalte, Produkte oder Rechtstexte des Kunden rechtlich zulässig sind.
        </p>
      </div>

      <div>
        <h2>§ 11 Widerrufsrecht</h2>
        <p>Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Einzelheiten, das Muster-Widerrufsformular und die Möglichkeit, online zu widerrufen, stehen unter <Link href="/shops/widerruf">Widerruf</Link>.</p>
      </div>

      <div>
        <h2>§ 12 Datenschutz</h2>
        <p>Wie wir personenbezogene Daten verarbeiten, steht in der <Link href="/datenschutz">Datenschutzerklärung</Link>.</p>
      </div>

      <div>
        <h2>§ 13 Schlussbestimmungen</h2>
        <p>
          Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Bei Verbrauchern gilt diese Rechtswahl nur, soweit dadurch nicht zwingende Verbraucherschutzvorschriften des Staates entzogen werden, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat. Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand Bremen. Ist eine Bestimmung unwirksam, bleibt die Wirksamkeit der übrigen unberührt.
        </p>
        <p className="mt-3">Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</p>
        <p className="mt-3">Kontakt: {legal.email ? legal.email : 'siehe Impressum'}</p>
      </div>
    </LegalPage>
  );
}
