import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { pillars } from '@/data/products';

/** Leistungen als Kachelraster (aus den bestehenden Bereichen der Seite, nichts Neues behauptet). */
const extra = [
  { id: 'webdesign', title: 'Webdesign', text: 'Websites, die Anfragen bringen: modern, schnell und für Suchmaschinen aufgebaut.', href: '/werbeagentur/leistungen/webdesign' },
  { id: 'seo', title: 'SEO & Google Ads', text: 'Gefunden werden in Bremen und darüber hinaus: Suchmaschinenoptimierung und bezahlte Anzeigen.', href: '/werbeagentur/leistungen/seo' },
  { id: 'branding', title: 'Branding & Print', text: 'Logo, Auftritt, Visitenkarten und Flyer aus einer Hand.', href: '/werbeagentur/leistungen/branding' },
] as const;

export function ServiceRows() {
  const rows = [...pillars.map((p) => ({ id: p.id, title: p.title, text: p.text, href: p.href })), ...extra];
  return (
    <section id="leistungen" className="bg-white py-20 sm:py-28">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="text-[.8rem] font-bold uppercase tracking-[.18em] text-ember-deep">Leistungen</p>
          <h2 className="display-title mt-4 text-h2 text-ink">
            Was wir für Sie <span className="serif-i">entwickeln.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lead text-graphite">Von eigenen Plattformen bis zur Werbeagentur: Software, Auftritt und Marketing von einem Ansprechpartner in Bremen.</p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r, i) => (
            <li key={r.id}>
              <Link href={r.href} className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ember hover:bg-white hover:shadow-card sm:p-8">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-[.85rem] font-bold text-white transition-colors group-hover:bg-ember">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-h3 mt-8 text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-[1.02] text-ink">{r.title}</h3>
                <p className="mt-3 text-[.98rem] leading-snug text-graphite">{r.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 pt-2 text-[.92rem] font-semibold text-ink group-hover:text-ember">
                  Mehr erfahren <ArrowUpRight size={17} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
