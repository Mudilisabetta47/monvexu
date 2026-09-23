import type { Metadata } from 'next';
import { BrandGrid } from '@/components/brands/BrandGrid';
import { SplitText } from '@/components/ui/SplitText';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { brands, brandTypeLabel } from '@/data/brands';

export const metadata: Metadata = {
  title: 'Marken – das MONVEX Portfolio',
  description: 'Alle Marken der MONVEX Dachmarke: Travel & Mobility, Gastronomie und Automotive Service – eigene und geführte Marken im Überblick.',
  alternates: { canonical: '/brands' },
};

const DEFINITIONS = [
  { t: brandTypeLabel.own, d: 'Von MONVEX entwickelt und gehalten: Idee, Marke und Betrieb liegen bei uns.' },
  { t: brandTypeLabel.managed, d: 'MONVEX verantwortet Markenaufbau und operative Führung – die Marke behält ihren eigenen Charakter.' },
];

export default function BrandsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 sm:pt-44">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]" />
        <div className="shell">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-ember">{String(brands.length).padStart(2, '0')}</span>
              <span className="h-px w-10 bg-ink/25" />
              Portfolio
            </p>
          </Reveal>
          <SplitText as="h1" immediate text={'Alle\n*Marken*'} className="mt-6 text-h1 font-semibold" accentClassName="serif-i text-ember" />
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <Reveal delay={0.3} className="lg:col-span-5">
              <p className="text-lead text-graphite">Ein Portfolio, keine Projektliste. Jede Marke hat ihre eigene Welt – und einen gemeinsamen Unterbau bei MONVEX.</p>
            </Reveal>
            <Reveal delay={0.4} className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              {DEFINITIONS.map((d) => (
                <div key={d.t} className="bg-paper p-5">
                  <p className="font-semibold tracking-tight">{d.t}</p>
                  <p className="mt-1.5 text-[.88rem] leading-snug text-graphite">{d.d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell">
          <BrandGrid />
        </div>
      </section>

      <section className="pb-28 sm:pb-40">
        <div className="shell">
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-[32px] bg-ink p-8 text-white sm:flex-row sm:items-center sm:p-12">
            <p className="max-w-xl text-[clamp(1.5rem,1.1rem+1.4vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Sie haben eine Idee, die eine eigene Marke verdient?
            </p>
            <Button href="/#kontakt" variant="light">
              Kontakt aufnehmen
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
