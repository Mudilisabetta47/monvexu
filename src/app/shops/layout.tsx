import type { ReactNode } from 'react';
import Link from 'next/link';
import { MonvexLogo } from '@/components/ui/Logo';
import { SITE_URL, company } from '@/data/site';
import { SHOPS } from '@/data/shops';

/** Eigener Rahmen für Shop-Start: Hinweisleiste, schlanker Kopf, schlanker Fuß. Die MONVEX-Hauptnavigation wird über SiteChrome ausgeblendet. */
export default function ShopsLayout({ children }: { children: ReactNode }) {
  const main = (p: string) => `${SITE_URL}${p}`;
  return (
    <div className="bg-paper">
      <div className="bg-ink text-white">
        <ul className="mx-auto flex max-w-shell items-center justify-center gap-x-8 gap-y-1 overflow-x-auto px-5 py-2.5 text-[.8rem] font-medium whitespace-nowrap no-scrollbar">
          {['Shop gehört dir', 'Voller Admin-Zugriff', 'Keine Vertragsbindung bei uns', 'Einmalzahlung für den Aufbau'].map((t) => (
            <li key={t} className="flex items-center gap-1.5"><span className="text-ember" aria-hidden>✓</span> {t}</li>
          ))}
        </ul>
      </div>
      <header className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="shell flex h-[68px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MonvexLogo className="h-5" />
            <span className="hidden rounded-full bg-ink px-2.5 py-1 font-mono text-[.62rem] uppercase tracking-[.14em] text-white min-[400px]:inline">Shop-Start</span>
          </div>
          <nav aria-label="Shop-Start" className="flex items-center gap-1 text-[.9rem]">
            <Link href="/shops#faq" className="hidden rounded-full px-3.5 py-2 text-graphite hover:text-ink sm:block">Fragen</Link>
            <a href={main('/')} className="hidden rounded-full px-3.5 py-2 text-graphite hover:text-ink sm:block">MONVEX</a>
            <Link href="/shops/bestellen" className="rounded-full bg-ink px-4 py-2 font-medium text-white transition-colors hover:bg-ember">Bestellen</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-line bg-white pb-24 pt-12 lg:pb-12">
        <div className="shell flex flex-col gap-8 text-[.9rem] text-graphite sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <MonvexLogo className="h-5" />
            <p className="mt-4 leading-relaxed">{SHOPS.name} ist ein Angebot der {company.legalName}, Bremen. Wir bauen Shopify-Shops, wir sind nicht Shopify. Keine Rechtsberatung, keine Umsatzgarantie.</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/shops/agb" className="hover:text-ink">AGB</Link></li>
            <li><Link href="/shops/widerruf" className="hover:text-ink">Widerruf</Link></li>
            <li><Link href="/shops/widerruf#online" className="font-medium text-ink hover:text-ember">Vertrag widerrufen</Link></li>
            <li><a href={main('/impressum')} className="hover:text-ink">Impressum</a></li>
            <li><a href={main('/datenschutz')} className="hover:text-ink">Datenschutz</a></li>
            <li><a href={main('/')} className="hover:text-ink">MONVEX</a></li>
            <li><Link href="/shops/bestellen" className="hover:text-ink">Kontakt</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
