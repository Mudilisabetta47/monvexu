import type { Metadata } from 'next';
import { AgencyCta } from '@/components/agency/AgencyCta';
import { Breadcrumbs } from '@/components/agency/Breadcrumbs';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { JsonLd } from '@/components/ui/JsonLd';
import { products } from '@/data/products';
import { agencyMetadata, breadcrumbSchema, webPageSchema } from '@/lib/agency-seo';
import { productsListSchema } from '@/lib/product-seo';

const PATH = '/produkte';
const TITLE = 'Produkte: MONVEX BusOS und EasyKFZ24';
const DESC = 'Eigene Software und Plattformen von MONVEX: MONVEX BusOS für Busunternehmen (in Entwicklung) und EasyKFZ24, die digitale Plattform für Kfz-Zulassung.';
export const metadata: Metadata = agencyMetadata({ title: TITLE, description: DESC, path: PATH });

export default function ProduktePage() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Produkte', path: PATH }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: PATH }), productsListSchema(products.map((p) => ({ name: p.name, path: p.href })))]} />
      <section className="relative isolate overflow-hidden pb-4 pt-32 sm:pt-40">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_30%,#000_30%,transparent_100%)]" />
        <div className="shell">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-ember" /> Eigene Software und Plattformen</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.6rem,1.2rem+6vw,6.6rem)] font-semibold leading-[.92] tracking-[-0.055em]">
            Produkte von <span className="serif-i text-ember">MONVEX.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-graphite">
            MONVEX entwickelt nicht nur für Kunden, sondern auch eigene Technologie: eine Plattform für Busunternehmen und einen digitalen Zulassungsservice. Hier sehen Sie, woran wir bauen und in welchem Stand die Produkte sind.
          </p>
        </div>
      </section>
      <ProductsSection standalone />
      <AgencyCta id="anfrage" headline="Eigene Software für Ihr Unternehmen?" text="Neben eigenen Produkten entwickeln wir individuelle Software, Portale und Schnittstellen. Schildern Sie uns Ihr Vorhaben." topic="Produkte / Softwareentwicklung" />
    </>
  );
}
