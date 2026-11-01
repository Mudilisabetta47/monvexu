import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { LegalDraftNote } from '@/components/shops/LegalDraftNote';
import { WiderrufForm } from '@/components/shops/WiderrufForm';
import { LEGAL_STAND, SHOPS } from '@/data/shops';
import { company, legal } from '@/data/site';

export const metadata: Metadata = {
  title: 'Widerruf Shop-Start',
  description: 'Widerrufsbelehrung, Muster-Widerrufsformular und Online-Widerruf für MONVEX Shop-Start.',
  alternates: { canonical: '/shops/widerruf' },
  robots: { index: false, follow: true },
};

export default function ShopsWiderruf() {
  return (
    <LegalPage title="Widerruf Shop-Start">
      <LegalDraftNote />
      <p className="text-[.9rem]">Stand: {LEGAL_STAND}. Diese Belehrung gilt für Verbraucher. {SHOPS.name} ist eine Dienstleistung (Aufbau eines Shops).</p>

      <div>
        <h2>Widerrufsbelehrung</h2>
        <h3>Widerrufsrecht</h3>
        <p>
          Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
        </p>
        <p className="mt-3">
          Um dein Widerrufsrecht auszuüben, musst du uns ({company.legalName}, {company.address.street}, {company.address.zip} {company.address.city}
          {legal.email ? `, E-Mail: ${legal.email}` : ''}
          {legal.phone ? `, Telefon: ${legal.phone}` : ''}) mittels einer eindeutigen Erklärung (zum Beispiel ein mit der Post versandter Brief oder eine E-Mail) über deinen Entschluss, diesen Vertrag zu widerrufen, informieren. Du kannst dafür das unten stehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist, oder direkt hier <a href="#online">online widerrufen</a>.
        </p>
        <p className="mt-3">Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absendest.</p>

        <h3>Folgen des Widerrufs</h3>
        <p>
          Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die wir von dir erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über deinen Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das du bei der ursprünglichen Transaktion eingesetzt hast, es sei denn, mit dir wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden dir wegen dieser Rückzahlung Entgelte berechnet.
        </p>
        <p className="mt-3">
          Hast du verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so hast du uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem du uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichtest, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
        </p>

        <h3>Vorzeitiges Erlöschen des Widerrufsrechts</h3>
        <p>
          Dein Widerrufsrecht erlischt bei einem Vertrag über die Erbringung von Dienstleistungen, wenn wir die Dienstleistung vollständig erbracht haben und mit der Ausführung erst begonnen haben, nachdem du dazu deine ausdrückliche Zustimmung gegeben und gleichzeitig bestätigt hast, dass du dein Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlierst.
        </p>
        <p className="mt-3">Für Unternehmer gilt kein gesetzliches Widerrufsrecht.</p>
      </div>

      <div>
        <h2>Muster-Widerrufsformular</h2>
        <p>(Wenn du den Vertrag widerrufen willst, fülle dieses Formular aus und sende es zurück.)</p>
        <blockquote className="mt-3 border-l-2 border-ink/20 pl-4">
          An {company.legalName}, {company.address.street}, {company.address.zip} {company.address.city}
          {legal.email ? `, E-Mail: ${legal.email}` : ''}:
          <br />
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung: ……………………
          <br />
          Bestellt am (*) / erhalten am (*): ……………………
          <br />
          Name des/der Verbraucher(s): ……………………
          <br />
          Anschrift des/der Verbraucher(s): ……………………
          <br />
          Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ……………………
          <br />
          Datum: ……………………
          <br />
          <span className="text-[.85rem]">(*) Unzutreffendes streichen.</span>
        </blockquote>
      </div>

      <div id="online" className="scroll-mt-28">
        <h2>Online widerrufen</h2>
        <p>Mit diesem Formular kannst du den Vertrag direkt erklären. Du bekommst sofort eine Eingangsbestätigung per E-Mail.</p>
        <div className="mt-5 not-prose">
          <WiderrufForm />
        </div>
      </div>
    </LegalPage>
  );
}
