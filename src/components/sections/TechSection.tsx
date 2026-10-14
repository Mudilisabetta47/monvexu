import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Technologie & Arbeitsweise – ausschließlich belegte Praxis aus den eigenen Produkten (BusOS, EasyKFZ24) und dieser Website.
 * Keine Kennzahlen, keine Zertifizierungen.
 */
const ITEMS = [
  { t: 'Moderne Web-Technologie', d: 'Unsere Produkte und diese Website entstehen mit etablierten Technologien: TypeScript, React und Next.js, dazu PostgreSQL bzw. Cloudflare-Datenbanken.', tag: 'BusOS · EasyKFZ24' },
  { t: 'Daten sauber getrennt', d: 'In BusOS sind die Daten jedes Unternehmens strikt voneinander getrennt (Row-Level-Security in PostgreSQL), dazu Rollen, Rechte und ein Audit-Protokoll.', tag: 'BusOS' },
  { t: 'Integrationen mit Absicherung', d: 'Schnittstellen und Webhooks mit Signaturprüfung, Formular-Anbindung für Websites und ein WordPress-Plugin in Erprobung.', tag: 'BusOS Connect · EasyKFZ24' },
  { t: 'Sicherheit im Detail', d: 'Eingaben werden serverseitig geprüft, Uploads anhand der Dateisignatur, Anfragen begrenzt und Zugriffe protokolliert.', tag: 'BusOS · EasyKFZ24' },
  { t: 'Getestet, bevor es live geht', d: 'Automatisierte Unit- und End-to-End-Tests sowie Prüfungen vor jeder Veröffentlichung gehören zum Standard.', tag: 'BusOS · EasyKFZ24' },
  { t: 'Erst verstehen, dann bauen', d: 'Wir klären Abläufe und Ziele, entwickeln in überschaubaren Etappen und zeigen früh lauffähige Ergebnisse.', tag: 'Arbeitsweise' },
];

export function TechSection() {
  return (
    <section id="technologie" className="relative bg-white py-24 sm:py-36">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <SectionHead index="05" label="Technologie & Arbeitsweise" title={'Wie wir\n*bauen.*'}>
          Keine Schlagworte: So entstehen unsere Produkte und Kundenprojekte tatsächlich.
        </SectionHead>
        <ul className="mt-14 grid gap-x-12 md:grid-cols-2">
          {ITEMS.map((x, i) => (
            <Reveal as="li" key={x.t} delay={(i % 2) * 0.07} className="group border-t border-line py-8">
              <div className="flex items-start gap-5">
                <span className="mt-1 font-mono text-[.7rem] tracking-[.2em] text-ember-deep">0{i + 1}</span>
                <div>
                  <h3 className="text-[1.3rem] font-semibold tracking-[-0.03em]">{x.t}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-graphite">{x.d}</p>
                  <p className="mt-3 font-mono text-[.64rem] uppercase tracking-[.16em] text-mute">{x.tag}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
