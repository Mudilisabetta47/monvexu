import Image from 'next/image';
import Link from 'next/link';
import { BrandLogo } from '@/components/brands/BrandLogo';
import { getBrand } from '@/data/brands';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

type Ref = {
  name: string;
  place: string;
  /** Logo-Datei unter /public/referenzen (von der jeweiligen Website übernommen) */
  logo?: { src: string; w: number; h: number };
  /** helle Logos (weiße Schrift) auf dunkler Kachel */
  dark?: boolean;
  href?: string;
  brand?: string;
};

/** Die Referenzliste. Nur eintragen, was der Inhaber freigibt. Orte nur dort, wo sie sicher feststehen. */
export const references: Ref[] = [
  { name: 'ING Gutachten', place: 'Hannover', logo: { src: '/referenzen/ing-gutachten.svg', w: 312, h: 120 }, dark: true },
  { name: 'SVZ Niedersachsen', place: 'Niedersachsen', logo: { src: '/referenzen/svz-niedersachsen.svg', w: 388, h: 85 } },
  { name: 'Fahrschule Metropol', place: 'Hannover, Garbsen & Bremen', logo: { src: '/referenzen/fahrschule-metropol.png', w: 520, h: 101 } },
  { name: 'Metropol Tours', place: 'Hannover', logo: { src: '/referenzen/metropol-tours.png', w: 186, h: 180 } },
  { name: 'Metropol Bildungszentrum', place: 'Niedersachsen', logo: { src: '/referenzen/metropol-bz.png', w: 520, h: 115 } },
  { name: 'Autokosmetik Lilienthal', place: 'Lilienthal', logo: { src: '/referenzen/autokosmetik-lilienthal.png', w: 520, h: 163 } },
  { name: 'DellenTechnik Lilienthal', place: 'Lilienthal', logo: { src: '/referenzen/dellentechnik-lilienthal.png', w: 355, h: 180 } },
  { name: 'MTC-Autoservice', place: 'Hohenhameln', logo: { src: '/referenzen/mtc-autoservice.png', w: 520, h: 105 }, dark: true },
  { name: 'Rose Café', place: 'Bremen', brand: 'rose-cafe', href: '/brands/rose-cafe' },
  { name: 'EasyKFZ24', place: 'eigenes Produkt', logo: { src: '/referenzen/easykfz24.svg', w: 34, h: 34 }, href: '/produkte/easykfz24' },
  { name: 'MagicColor', place: 'Bremen' },
  { name: 'Bolm-Apartments', place: 'Bremen' },
  { name: 'XPertConnect', place: 'Dubai' },
];

function Mark({ r }: { r: Ref }) {
  const brand = r.brand ? getBrand(r.brand) : undefined;
  if (brand) return <span className="inline-block [zoom:.62] sm:[zoom:1]"><BrandLogo brand={brand} /></span>;
  if (r.logo && r.logo.w === r.logo.h) {
    // Bildmarke ohne Schriftzug (EasyKFZ24): Zeichen plus Name
    return (
      <span className="inline-flex items-center gap-3 [zoom:.7] sm:[zoom:1]">
        <Image src={r.logo.src} alt="" width={r.logo.w} height={r.logo.h} unoptimized className="h-10 w-10" />
        <span className="display-h3 text-[1.35rem] leading-none text-ink">{r.name}</span>
      </span>
    );
  }
  if (r.logo) return <Image src={r.logo.src} alt={`${r.name} Logo`} width={r.logo.w} height={r.logo.h} unoptimized={r.logo.src.endsWith('.svg')} className="h-14 w-auto max-w-[78%] object-contain sm:h-16" />;
  // ohne Logodatei: sauberer Schriftzug
  return <span className="display-h3 break-words text-center text-[1.15rem] leading-none text-ink sm:text-[1.7rem]">{r.name}</span>;
}

export function References() {
  return (
    <section id="referenzen" aria-labelledby="ref-title" className="bg-paper py-20 sm:py-28">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="text-[.8rem] font-bold uppercase tracking-[.18em] text-ember-deep">Referenzen</p>
          <h2 id="ref-title" className="display-title mt-4 text-h2 text-ink">
            Unternehmen, mit denen wir <span className="serif-i">arbeiten.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lead text-graphite">Eine Auswahl: {references.length} Unternehmen aus Bremen, Niedersachsen und Dubai, von der Fahrschule bis zum Kfz-Betrieb.</p>
        </div>
        <Reveal>
          <ul className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
            {references.map((r) => {
              const tile = (
                <>
                  <div className="flex h-24 w-full items-center justify-center sm:h-28">
                    <Mark r={r} />
                  </div>
                  <p className={cn('mt-3 text-center text-[.82rem] leading-snug', r.dark ? 'text-white/70' : 'text-graphite')}>
                    <span className={cn('block font-semibold', r.dark ? 'text-white' : 'text-ink')}>{r.name}</span>
                    {r.place}
                  </p>
                </>
              );
              const cls = cn(
                'flex h-full flex-col items-center justify-between rounded-2xl border p-5 sm:p-6',
                r.dark ? 'border-ink bg-ink' : 'border-line bg-white',
                r.href && 'transition-all duration-300 hover:-translate-y-0.5 hover:border-ember hover:shadow-card',
              );
              return (
                <li key={r.name} className="min-w-0 basis-[calc(50%-.375rem)] md:basis-[calc(33.333%-.7rem)] lg:basis-[calc(25%-.75rem)]">
                  {r.href ? (
                    <Link href={r.href} className={cls}>
                      {tile}
                    </Link>
                  ) : (
                    <div className={cls}>{tile}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
