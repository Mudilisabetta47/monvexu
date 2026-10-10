import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, Missing } from '@/components/layout/LegalPage';
import { company, legal } from '@/data/site';

const STAND = 'Oktober 2026';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der MONVEX UG (haftungsbeschränkt), Kirchbachstraße 200, 28211 Bremen: Anbieter, Vertretung, Kontakt, Handelsregister und rechtliche Hinweise.',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
};

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <div>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <strong>{company.legalName}</strong>
          <br />
          {company.address.street}
          <br />
          {company.address.zip} {company.address.city}
          <br />
          {company.address.country}
        </p>
        <p className="mt-3">
          Rechtsform: {company.legalForm}
          <br />
          Sitz der Gesellschaft: {company.address.city}
        </p>
      </div>
      <div>
        <h2>Vertreten durch</h2>
        <p>
          Geschäftsführer: <Missing what="Name der Geschäftsführung" value={legal.managingDirector} />
          {legal.representation && (
            <>
              <br />
              {legal.representation}
            </>
          )}
        </p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p>
          {legal.phone && (
            <>
              Telefon: <a href={`tel:${legal.phone.replace(/\s/g, '')}`}>{legal.phone}</a>
              <br />
            </>
          )}
          E-Mail: <Missing what="E-Mail-Adresse" value={legal.email} />
        </p>
      </div>
      <div>
        <h2>Registereintrag</h2>
        <p>
          Eintragung im Handelsregister.
          <br />
          Registergericht: <Missing what="Registergericht" value={legal.registerCourt} />
          <br />
          Registernummer:{' '}
          {legal.registerNumber ? legal.registerNumber : legal.registerPending ? 'Die Eintragung ist beantragt; die Registernummer wird nach der Eintragung ergänzt.' : <Missing what="Registernummer (HRB)" />}
        </p>
      </div>
      {legal.vatId && (
        <div>
          <h2>Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: {legal.vatId}</p>
        </div>
      )}
      <div>
        <h2>Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
        <p>
          <Missing what="Name" value={legal.managingDirector} />, {company.address.street}, {company.address.zip} {company.address.city}
        </p>
      </div>
      <div>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle im Sinne des Verbraucherstreitbeilegungsgesetzes (VSBG) teilzunehmen.
        </p>
      </div>
      <div>
        <h2>Zielgruppe des Angebots</h2>
        <p>
          Unser Angebot richtet sich an Unternehmer, Gewerbetreibende, Freiberufler und Organisationen. Die Leistungen unserer Marken und Projekte werden auf den jeweiligen Seiten gesondert beschrieben.
        </p>
      </div>
      <div>
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        </p>
      </div>
      <div>
        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.
        </p>
      </div>
      <div>
        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit Inhalte nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet; sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen Hinweis. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Inhalte umgehend.
        </p>
      </div>
      <div>
        <h2>Marken und Bezeichnungen</h2>
        <p>
          „MONVEX“, das MONVEX-Logo sowie die auf dieser Website genannten Marken, Produkt- und Firmenbezeichnungen sind Eigentum ihrer jeweiligen Inhaber. Die Nennung dient allein der Information.
        </p>
      </div>
      <div>
        <h2>Datenschutz</h2>
        <p>
          Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </p>
      </div>
      <p className="font-mono text-[.7rem] uppercase tracking-[.16em] text-mute">Stand: {STAND}</p>
    </LegalPage>
  );
}
