import type { Metadata } from 'next';
import { LegalPage, Missing } from '@/components/layout/LegalPage';
import { company, legal } from '@/data/site';

export const metadata: Metadata = {
  title: 'Impressum',
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
      </div>
      <div>
        <h2>Vertreten durch</h2>
        <p>
          Geschäftsführer: <Missing what="Name der Geschäftsführung" value={legal.managingDirector} />
        </p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <Missing what="E-Mail-Adresse" value={legal.email} />
          <br />
          Telefon: <Missing what="Telefonnummer" value={legal.phone} />
        </p>
      </div>
      <div>
        <h2>Registereintrag</h2>
        <p>
          Registergericht: <Missing what="Registergericht" value={legal.registerCourt} />
          <br />
          Registernummer: <Missing what="Registernummer (HRB)" value={legal.registerNumber} />
        </p>
      </div>
      <div>
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: <Missing what="USt-IdNr." value={legal.vatId} />
        </p>
      </div>
      <div>
        <h2>Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
        <p>
          <Missing what="Name" value={legal.managingDirector} />, {company.address.street}, {company.address.zip} {company.address.city}
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
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </div>
    </LegalPage>
  );
}
