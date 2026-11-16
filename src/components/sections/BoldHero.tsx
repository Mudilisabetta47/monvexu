import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const facts = [
  { v: '2', l: 'eigene Produkte: BusOS und EasyKFZ24' },
  { v: '3', l: 'Bereiche: Produkte, Software, Werbeagentur' },
  { v: '2026', l: 'gegründet, Sitz in Bremen' },
] as const;

/** Startseiten-Einstieg: links die Aussage, rechts die eigenen Produkte vor der MONVEX-Scheibe. Nur belegte Angaben. */
export function BoldHero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper pt-[5.6rem] sm:pt-[6.4rem]">
      <div className="shell grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24">
        <div className="min-w-0 pt-6 lg:pt-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[.8rem] font-semibold text-ink">
            <span aria-hidden className="h-2 w-2 rounded-full bg-ember" />
            Software, digitale Produkte und Werbeagentur
          </p>
          <h1 id="hero-title" className="display-title mt-7 text-[clamp(2.6rem,1.3rem+4.6vw,5.2rem)] leading-[.98] text-ink">
            Wir bauen Software, Produkte und Marken <span className="serif-i">aus Bremen.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lead text-graphite">
            MONVEX entwickelt Software und eigene digitale Produkte: Plattformen für Busunternehmen und die digitale Kfz-Zulassung, dazu Marken, Webentwicklung und Marketing.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#kontakt" className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[.98rem] font-semibold text-white transition-colors hover:bg-ember">
              Kontakt aufnehmen <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/produkte" className="inline-flex items-center gap-3 rounded-full border border-ink/25 bg-white px-7 py-4 text-[.98rem] font-semibold text-ink transition-colors hover:border-ink">
              Unsere Produkte <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6">
            {facts.map((f) => (
              <div key={f.v} className="border-l-2 border-ember pl-4">
                <dt className="display-title text-[1.9rem] leading-none text-ink sm:text-[2.3rem]">{f.v}</dt>
                <dd className="mt-2 text-[.82rem] leading-snug text-graphite">{f.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative isolate mx-auto aspect-[4/4.4] w-full max-w-[40rem] lg:max-w-none">
          <div aria-hidden className="absolute left-[8%] top-[4%] -z-10 aspect-square w-[78%] rounded-full bg-[radial-gradient(circle_at_30%_25%,#ff8a5c,#ff4a1c_55%,#c8340c)] shadow-[0_40px_90px_-30px_rgba(255,74,28,.7)]" />
          <div aria-hidden className="absolute left-[2%] top-[0%] -z-10 aspect-square w-[90%] rounded-full border border-ink/10" />
          <Image
            src="/products/busos/desktop.webp"
            alt="MONVEX BusOS: Betriebssystem für Busunternehmen (Demo mit fiktiven Daten)"
            width={1440}
            height={900}
            priority
            sizes="(min-width:1024px) 46vw, 92vw"
            className="absolute left-0 top-[18%] w-[88%] rounded-xl shadow-lift ring-1 ring-ink/10"
          />
          <Image
            src="/products/easykfz24/mobile.webp"
            alt="EasyKFZ24: digitale Kfz-Zulassung auf dem Smartphone"
            width={640}
            height={1302}
            sizes="(min-width:1024px) 16vw, 34vw"
            className="absolute bottom-0 right-[2%] w-[31%] max-w-[13.5rem] rounded-2xl shadow-lift ring-1 ring-ink/10"
          />
          <p className="absolute left-0 top-[6%] rounded-full bg-ink px-4 py-2 text-[.78rem] font-semibold text-white">MONVEX BusOS · in Entwicklung</p>
          <p className="absolute bottom-[6%] left-[6%] rounded-full bg-white px-4 py-2 text-[.78rem] font-semibold text-ink shadow-card">EasyKFZ24 · online</p>
        </div>
      </div>
    </section>
  );
}
