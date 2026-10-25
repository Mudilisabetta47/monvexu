import { JsonLd } from '@/components/ui/JsonLd';
import { Catalog } from '@/components/software/Catalog';
import { SwHead } from '@/components/software/SwUi';
import { SwButton } from '@/components/software/SwButton';
import { requestHref, softwareProducts } from '@/data/software';
import { breadcrumbSchema, catalogSchema, swMetadata, webPageSchema } from '@/lib/software-seo';

const TITLE = 'Software-Katalog: suchen, filtern und vergleichen';
const DESC = `Alle ${softwareProducts.length} Software-Konzepte von MONVEX im Katalog: nach Stichwort suchen, nach Kategorie und Zielgruppe filtern und bis zu drei Konzepte vergleichen.`;
export const metadata = swMetadata({ title: TITLE, description: DESC, path: '/software/katalog' });

export default function CatalogPage() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Software', path: '/software' }, { name: 'Katalog', path: '/software/katalog' }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: '/software/katalog' }), catalogSchema()]} />
      <section className="relative isolate overflow-hidden pb-10 pt-28 sm:pt-32 lg:pt-36">
        <div className="sw-mesh pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
          <SwHead eyebrow="Software-Katalog" h1 title={<>Finden, vergleichen, <span className="sw-grad-text">anfragen.</span></>}>
            Alle Konzepte an einem Ort. Suchen Sie nach einem Stichwort, filtern Sie nach Kategorie oder Zielgruppe und stellen Sie bis zu drei Produkte nebeneinander. Alle Einträge sind Konzepte ohne Live-Version.
          </SwHead>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1320px] px-5 pb-28 sm:px-8">
        <Catalog />
        <div className="sw-card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em]">Nichts Passendes dabei?</h2>
            <p className="mt-2 max-w-xl text-[.98rem] leading-relaxed text-sw-mute">Wir entwickeln Software auch individuell. Erzählen Sie uns, was Ihr Unternehmen braucht.</p>
          </div>
          <SwButton href={requestHref('individuell')}>Individuelle Lösung anfragen</SwButton>
        </div>
      </section>
    </>
  );
}
