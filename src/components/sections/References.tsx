import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
  /** Schriftzug statt Logodatei (wenn die Website selbst nur einen Schriftzug nutzt) */
  wordmark?: [string, string];
};

/** Die Referenzliste. Nur eintragen, was der Inhaber freigibt. Orte nur dort, wo sie sicher feststehen. */
export const references: Ref[] = [
  { name: 'ING Gutachten', place: 'Hannover', logo: { src: '/referenzen/ing-gutachten.svg', w: 312, h: 120 }, dark: true },
  { name: 'SVZ Niedersachsen', place: 'Niedersachsen', logo: { src: '/referenzen/svz-niedersachsen.svg', w: 388, h: 85 } },
  { name: 'Fahrschule Metropol', place: 'Hannover, Garbsen & Bremen', logo: { src: '/referenzen/fahrschule-metropol.png', w: 520, h: 101 } },
  { name: 'Metropol Tours', place: 'Hannover', logo: { src: '/referenzen/metropol-tours.png', w: 395, h: 160 } },
  { name: 'Metropol Bildungszentrum', place: 'Niedersachsen', logo: { src: '/referenzen/metropol-bz.png', w: 520, h: 115 } },
  { name: 'Autokosmetik Lilienthal', place: 'Lilienthal', logo: { src: '/referenzen/autokosmetik-lilienthal.png', w: 520, h: 163 } },
  { name: 'DellenTechnik Lilienthal', place: 'Lilienthal', logo: { src: '/referenzen/dellentechnik-lilienthal.png', w: 355, h: 180 } },
  { name: 'MTC-Autoservice', place: 'Hohenhameln', logo: { src: '/referenzen/mtc-autoservice.png', w: 520, h: 105 }, dark: true },
  { name: 'Rose Café', place: 'Bremen', brand: 'rose-cafe', href: '/brands/rose-cafe' },
  { name: 'EasyKFZ24', place: 'eigenes Produkt', logo: { src: '/referenzen/easykfz24.svg', w: 34, h: 34 }, href: '/produkte/easykfz24' },
  { name: 'MagicColor', place: 'Bremen' },
  { name: 'Bolm Apartments', place: 'Bremen', wordmark: ['BOLM', 'APARTMENTS'] },
  { name: 'Xperts Connect', place: 'Dubai', logo: { src: '/referenzen/xperts-connect.svg', w: 478, h: 104 }, dark: true },
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
  if (r.wordmark) {
    return (
      <span className="flex flex-col items-center leading-none text-ink">
        <span className="text-[1.7rem] font-bold tracking-[.22em] sm:text-[2rem]">{r.wordmark[0]}</span>
        <span className="mt-2 text-[.62rem] font-medium tracking-[.42em] text-graphite sm:text-[.7rem]">{r.wordmark[1]}</span>
      </span>
    );
  }
  // ohne Logodatei: sauberer Schriftzug
  return <span className="display-h3 break-words text-center text-[1.15rem] leading-none text-ink sm:text-[1.7rem]">{r.name}</span>;
}

/** Eine Kachel. `compact` = Handy-Band (feste Breite), sonst Rasterkachel. */
function Tile({ r, compact = false }: { r: Ref; compact?: boolean }) {
  const inner = (
    <>
      <div className={cn('flex w-full items-center justify-center', compact ? 'h-[4.5rem]' : 'h-24 sm:h-28')}>
        <Mark r={r} />
      </div>
      <p className={cn('mt-3 w-full border-t pt-3 text-center text-[.78rem] leading-snug', r.dark ? 'border-white/10 text-white/55' : 'border-ink/10 text-graphite')}>
        <span className={cn('block text-[.84rem] font-semibold tracking-wide', r.dark ? 'text-white' : 'text-ink')}>{r.name}</span>
        {r.place}
      </p>
    </>
  );
  const cls = cn(
    'flex h-full flex-col items-center justify-between rounded-[1.6rem] border shadow-[0_24px_60px_-34px_rgba(0,0,0,.7)]',
    compact ? 'w-[11.5rem] shrink-0 p-4' : 'p-5 sm:p-6',
    r.dark ? 'border-white/15 bg-[#17171b]' : 'border-white/70 bg-white',
    r.href && 'transition-all duration-500 hover:-translate-y-1 hover:border-ember hover:shadow-[0_30px_70px_-30px_rgba(255,74,28,.55)]',
  );
  return r.href ? (
    <Link href={r.href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/** Handy: zwei gegenläufige Logo-Bänder. Mit Daumen wischbar, Bewegung stoppt bei Berührung und bei „weniger Bewegung“. */
function MobileBand({ items, reverse = false, label }: { items: Ref[]; reverse?: boolean; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
      {items.map((r) => (
        <li key={r.name} className="flex">
          <Tile r={r} compact />
        </li>
      ))}
    </ul>
  );
  return (
    <div role="group" aria-label={label} className="no-scrollbar overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] motion-reduce:snap-x">
      <div className={cn('flex w-max animate-[ticker_46s_linear_infinite] active:[animation-play-state:paused] motion-reduce:animate-none', reverse && '[animation-direction:reverse]')}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function References() {
  const half = Math.ceil(references.length / 2);
  return (
    <section id="referenzen" aria-labelledby="ref-title" className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -bottom-[38%] -right-[14%] -z-10 aspect-square w-[min(56rem,100vw)] rounded-full bg-[radial-gradient(circle_at_30%_25%,#ff8a5c,#ff4a1c_55%,#c8340c)] opacity-[.22] blur-[3px]" />
      <div aria-hidden className="pointer-events-none absolute -left-[20%] -top-[30%] -z-10 aspect-square w-[min(40rem,90vw)] rounded-full bg-ember/10 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-5xl">
            <p className="flex items-center gap-4 text-[.72rem] font-semibold uppercase tracking-[.32em] text-white/60">
              <span aria-hidden className="h-px w-10 bg-ember sm:w-12" />
              Referenzen
            </p>
            <h2 id="ref-title" className="mt-5 text-[clamp(2.2rem,1.2rem+4vw,4.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-white sm:mt-6">
              Unternehmen, mit denen <span className="whitespace-nowrap">wir <em className="font-serif font-normal italic text-ember">arbeiten.</em></span>
            </h2>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/60 sm:mt-6 sm:text-[1.08rem]">
              Eine Auswahl von {references.length} Unternehmen aus Bremen, Niedersachsen und Dubai, von der Fahrschule bis zum Kfz-Betrieb.
            </p>
          </div>
          <Link href="/#kontakt" className="group hidden w-fit items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 text-[1rem] font-semibold text-ink transition-colors duration-500 hover:bg-ember hover:text-white sm:inline-flex">
            Anfragen
            <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>
      </div>

      {/* Handy: zwei Bänder, volle Breite */}
      <div className="mt-12 space-y-3 md:hidden">
        <MobileBand items={references.slice(0, half)} label="Referenzen, erste Reihe" />
        <MobileBand items={references.slice(half)} reverse label="Referenzen, zweite Reihe" />
      </div>

      {/* Tablet und Desktop: Raster */}
      <div className="shell hidden md:block">
        <Reveal>
          <ul className="mt-16 flex flex-wrap justify-center gap-3 sm:gap-4">
            {references.map((r) => (
              <li key={r.name} className="min-w-0 basis-[calc(33.333%-.7rem)] lg:basis-[calc(25%-.75rem)]">
                <Tile r={r} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="shell">
        <div className="mt-12 flex flex-col items-stretch justify-between gap-6 border-t border-white/12 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:pt-10">
          <p className="max-w-xl text-[1.3rem] font-light leading-snug text-white/85 sm:text-[1.5rem]">Ihr Unternehmen könnte hier stehen.</p>
          <Link href="/#kontakt" className="group inline-flex min-h-[3.4rem] items-center justify-between gap-3 rounded-full bg-ember py-3 pl-7 pr-3 text-[1.05rem] font-semibold text-white transition-colors duration-500 hover:bg-white hover:text-ink sm:justify-start">
            Jetzt anfragen
            <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-white/20 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
