import Link from 'next/link';
import { MonvexMark } from '@/components/ui/Logo';
import { categories, productsInCategory, requestHref, swPath } from '@/data/software';
import { company, legal } from '@/data/site';

export function SwFooter({ mainUrl }: { mainUrl: string }) {
  const main = (p: string) => `${mainUrl}${p}`;
  return (
    <footer className="relative mt-24 border-t border-sw-line bg-white">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-8">
        <div className="grid-cols-1 grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <MonvexMark className="h-8 w-8" />
              <span className="text-xl font-semibold tracking-[-0.03em] text-sw-ink">MONVEX</span>
              <span className="rounded-full bg-[linear-gradient(100deg,#4F46FF,#6D4DF5)] px-2.5 py-1 text-[.7rem] font-semibold text-white">Software</span>
            </div>
            <p className="mt-5 max-w-sm text-[.95rem] leading-relaxed text-sw-mute">
              Software aus Bremen: eigene Produkte und individuelle Lösungen für kleine Unternehmen, den Mittelstand und Konzerne.
            </p>
            <p className="mt-4 max-w-sm rounded-xl border border-sw-line bg-sw-soft p-4 text-[.82rem] leading-relaxed text-sw-mute">
              <strong className="font-semibold text-sw-ink">So arbeiten wir:</strong> Wir bereiten jede Lösung individuell für Ihr Unternehmen vor und bauen sie nach Ihren Anforderungen. Vorschauen zeigen Beispieldaten, Preis und Zeitplan richten sich nach Ihrem Vorhaben.
            </p>
            <Link href={requestHref('beratung')} className="mt-6 inline-block text-[.95rem] font-semibold text-sw-indigo hover:underline">
              Beratung vereinbaren
            </Link>
          </div>
          <div className="grid-cols-1 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <div key={c.slug}>
                <h2 className="text-[.82rem] font-semibold uppercase tracking-[.12em]" style={{ color: c.accent }}>
                  <Link href={swPath.category(c.slug)}>{c.name}</Link>
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {productsInCategory(c.slug).map((p) => (
                    <li key={p.slug}>
                      <Link href={swPath.product(p.slug)} className="text-[.9rem] text-sw-text transition-colors hover:text-sw-ink">
                        {p.name.replace('MONVEX ', '')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-cols-1 mt-14 grid gap-8 border-t border-sw-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-[.82rem] font-semibold uppercase tracking-[.12em] text-sw-ink">Software</h2>
            <ul className="mt-4 space-y-2.5 text-[.9rem] text-sw-text">
              <li><Link href={swPath.catalog} className="hover:text-sw-ink">Katalog und Vergleich</Link></li>
              <li><Link href={requestHref('individuell')} className="hover:text-sw-ink">Individuelle Lösung anfragen</Link></li>
              <li><Link href={`${swPath.home}#plattform`} className="hover:text-sw-ink">Plattform-Prinzipien</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-[.82rem] font-semibold uppercase tracking-[.12em] text-sw-ink">Bestehende Produkte</h2>
            <ul className="mt-4 space-y-2.5 text-[.9rem] text-sw-text">
              <li><a href={main('/produkte/busos')} className="hover:text-sw-ink">MONVEX BusOS (in Entwicklung)</a></li>
              <li><a href={main('/produkte/easykfz24')} className="hover:text-sw-ink">EasyKFZ24</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-[.82rem] font-semibold uppercase tracking-[.12em] text-sw-ink">MONVEX</h2>
            <ul className="mt-4 space-y-2.5 text-[.9rem] text-sw-text">
              <li><a href={main('/')} className="hover:text-sw-ink">Hauptseite</a></li>
              <li><a href={main('/werbeagentur')} className="hover:text-sw-ink">Werbeagentur und Websites</a></li>
              <li><a href={main('/website-check')} className="hover:text-sw-ink">Kostenloser Website-Check</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-[.82rem] font-semibold uppercase tracking-[.12em] text-sw-ink">Kontakt</h2>
            <address className="mt-4 space-y-2.5 text-[.9rem] not-italic text-sw-text">
              <p>{company.address.street}<br />{company.address.zip} {company.address.city}</p>
              {legal.phone && <p><a href={`tel:${legal.phone.replace(/\s/g, '')}`} className="hover:text-sw-ink">{legal.phone}</a></p>}
              {legal.email && <p><a href={`mailto:${legal.email}`} className="hover:text-sw-ink">{legal.email}</a></p>}
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sw-line pt-6 text-[.8rem] text-sw-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName} · Bremen</p>
          <p className="flex gap-5">
            <a href={main('/impressum')} className="hover:text-sw-ink">Impressum</a>
            <a href={main('/datenschutz')} className="hover:text-sw-ink">Datenschutz</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
