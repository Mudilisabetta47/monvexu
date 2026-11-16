import { SectionHead } from '@/components/ui/SectionHead';
import { BusOSShowcase } from '@/components/products/BusOSShowcase';
import { EasyShowcase } from '@/components/products/EasyShowcase';

/** Startseite: „Unsere Produkte“ mit den drei Bereichen und beiden Showcases. */
export function ProductsSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="produkte" className="relative py-24 sm:py-36">
      <div className="shell">
        {!standalone && (
          <SectionHead titleClassName="text-[clamp(2.2rem,1.1rem+4.2vw,5rem)] leading-[.96] tracking-[-0.045em]" index="01" label="Unsere Produkte" title={'Wir entwickeln nicht nur Software.\n*Wir entwickeln eigene Plattformen.*'}>
            Von digitaler Fahrzeugverwaltung und Zulassungsservices bis zu umfassenden Betriebssystemen für Unternehmen: Wir entwickeln Technologien für reale Geschäftsprozesse.
          </SectionHead>
        )}

        <div className="mt-12 space-y-8 sm:space-y-12">
          <BusOSShowcase />
          <EasyShowcase />
        </div>
      </div>
    </section>
  );
}
