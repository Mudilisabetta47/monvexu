import Link from 'next/link';
import { ArrowRight, Building2, Code2, Megaphone } from 'lucide-react';
import { company, legal } from '@/data/site';

const areas = [
  { href: '/produkte', icon: Building2, title: 'Digitale Produkte', text: 'Eigene Software und Plattformen, die wir selbst entwickeln.', cta: 'Zu den Produkten' },
  { href: '/software', icon: Code2, title: 'Softwareentwicklung', text: 'Individuelle technische Lösungen für Unternehmen: Webanwendungen, Portale und Schnittstellen.', cta: 'Zur Softwareentwicklung' },
  { href: '/werbeagentur', icon: Megaphone, title: 'Werbeagentur', text: 'Webdesign, SEO, Google Ads, Branding und Print aus Bremen.', cta: 'Zur Werbeagentur' },
] as const;

/** Unternehmensdaten wie auf einer Amtsseite: nur belegte Angaben, nichts erfunden. Fehlende Werte werden ausgelassen. */
function facts() {
  const rows: Array<[string, string]> = [
    ['Unternehmen', company.legalName],
    ['Rechtsform', company.legalForm],
    ['Sitz', `${company.address.street}, ${company.address.zip} ${company.address.city}`],
  ];
  if (legal.registerCourt) rows.push(['Registergericht', legal.registerCourt]);
  if (legal.registerNumber) rows.push(['Handelsregister', legal.registerNumber]);
  if (legal.managingDirector) rows.push(['Geschäftsführung', legal.managingDirector]);
  if (legal.phone) rows.push(['Telefon', legal.phone]);
  if (legal.email) rows.push(['E-Mail', legal.email]);
  return rows;
}

export function CivicHero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line bg-paper pt-[8.5rem] sm:pt-[10.5rem]">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 pb-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16 lg:pb-20">
          <div className="min-w-0">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-ember" />
              {company.legalName} · {company.address.city}
            </p>
            <h1 id="hero-title" className="mt-6 max-w-3xl text-h1 font-semibold text-ink">
              Software, digitale Produkte und Werbeagentur aus Bremen.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-graphite">
              MONVEX entwickelt Software und eigene digitale Produkte: Plattformen für Busunternehmen und die digitale Kfz-Zulassung, dazu Marken, Webentwicklung und Marketing.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/#kontakt" className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-[.98rem] font-medium text-white transition-colors hover:bg-ember">
                Kontakt aufnehmen <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/produkte" className="inline-flex items-center gap-2 rounded-md border border-ink/25 bg-white px-6 py-3.5 text-[.98rem] font-medium text-ink transition-colors hover:border-ink">
                Unsere Produkte
              </Link>
            </div>
          </div>

          <aside aria-label="Unternehmensdaten" className="self-start rounded-lg border border-line bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-line bg-ink px-6 py-3.5 text-white">
              <p className="text-[.8rem] font-semibold uppercase tracking-[.14em]">Unternehmen auf einen Blick</p>
              <span aria-hidden className="h-2 w-2 rounded-full bg-ember" />
            </div>
            <dl className="divide-y divide-line px-6 text-[.95rem]">
              {facts().map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-0.5 py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-graphite">{k}</dt>
                  <dd className="min-w-0 break-words font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-line px-6 py-3.5 text-[.8rem] text-graphite">
              Alle Pflichtangaben im <Link href="/impressum" className="font-medium text-ink underline underline-offset-4">Impressum</Link>.
            </p>
          </aside>
        </div>

        <div className="grid border-t border-line md:grid-cols-3 md:divide-x md:divide-line">
          {areas.map((a) => (
            <Link key={a.href} href={a.href} className="group flex flex-col gap-4 border-b border-line px-0 py-8 transition-colors hover:bg-white md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-white text-ember transition-colors group-hover:border-ember">
                <a.icon size={22} aria-hidden />
              </span>
              <h2 className="text-h3 font-semibold text-ink">{a.title}</h2>
              <p className="text-graphite">{a.text}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-[.95rem] font-medium text-ember">
                {a.cta} <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
