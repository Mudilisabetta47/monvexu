import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { AGENCY_BASE, agencyServices, industries, industryPath, servicePath } from '@/data/agency';

/** Startseiten-Teaser: MONVEX ist auch Full-Service-Werbeagentur – mit direkten Wegen in Leistungen und Branchen. */
export function AgencyTeaser() {
  return (
    <section id="werbeagentur" className="relative bg-white py-28 sm:py-40">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <SectionHead index="+" label="Werbeagentur" title={'Auch\n*Werbeagentur.*'} aside={<Button href={AGENCY_BASE}>Zur Werbeagentur</Button>}>
          Neben eigenen Marken und Produkten arbeitet MONVEX als Full-Service-Werbeagentur: Webdesign, SEO, Google Ads, Social Media, Branding, Print, Fahrzeugbeschriftung und individuelle Webanwendungen.
        </SectionHead>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Leistungen</p>
            <ul className="mt-5">
              {agencyServices.slice(0, 6).map((s) => (
                <Reveal as="li" key={s.slug}>
                  <Link href={servicePath(s.slug)} className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:border-ink">
                    <span className="text-[1.25rem] font-semibold tracking-tight">{s.name}</span>
                    <ArrowUpRight size={18} className="text-mute transition-transform duration-500 group-hover:rotate-45 group-hover:text-ember" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Branchen</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={industryPath(i)} className="inline-block rounded-full border border-line bg-paper px-4 py-2.5 text-[.9rem] text-graphite transition-all duration-500 hover:border-ink hover:bg-ink hover:text-white">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-md text-[.92rem] leading-relaxed text-graphite">
              Jede Branche hat eigene Kunden, eigene Suchen und eigene Regeln – deshalb gibt es Branchenseiten mit eigenen Inhalten statt Standardtext.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
