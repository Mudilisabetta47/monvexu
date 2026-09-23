import { brands } from '@/data/brands';
import { BrandCard } from '@/components/brands/BrandCard';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/** Startseiten-Vorschau: die ersten Marken, Rest ueber /brands. */
export function BrandsPreview() {
  const preview = brands.slice(0, 3);
  return (
    <section id="brands" className="relative bg-white py-28 sm:py-40">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <SectionHead index="02" label="Portfolio" title={'Unsere\n*Marken*'}>
          Kein Projektarchiv, sondern ein Portfolio: Jede Marke hat ihre eigene Welt, ihren eigenen Auftritt – und einen gemeinsamen Unterbau.
        </SectionHead>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {preview.map((b, i) => (
            <div key={b.slug} className="lg:[&:nth-child(3n+2)]:mt-16">
              <BrandCard brand={b} index={i} tall />
            </div>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-lg text-graphite">
            Das Portfolio wächst. Neue Marken kommen dazu, sobald sie bereit sind – nicht vorher.
          </p>
          <Button href="/brands" variant="secondary">
            Alle Marken entdecken
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
