import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { BusOSShowcase } from '@/components/products/BusOSShowcase';
import { EasyShowcase } from '@/components/products/EasyShowcase';
import { pillars } from '@/data/products';

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

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-3">
          {pillars.map((x, i) => (
            <Reveal as="li" key={x.id} delay={i * 0.07} className="bg-paper">
              <Link href={x.href} className="group flex h-full flex-col justify-between gap-8 p-7 transition-colors duration-500 hover:bg-white sm:p-9">
                <div>
                  <p className="font-mono text-[.66rem] uppercase tracking-[.18em] text-ember-deep">0{i + 1}</p>
                  <h3 className="mt-5 text-[clamp(1.2rem,1rem+.8vw,1.6rem)] font-semibold uppercase leading-none tracking-[-0.02em]">{x.title}</h3>
                  <p className="mt-3 max-w-xs leading-snug text-graphite">{x.text}</p>
                </div>
                <span className="flex items-center gap-2 text-[.9rem] font-medium">{x.cta}<ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-ember" /></span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 space-y-8 sm:space-y-12">
          <BusOSShowcase />
          <EasyShowcase />
        </div>
      </div>
    </section>
  );
}
