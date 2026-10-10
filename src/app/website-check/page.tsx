import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { SiteCheckTool } from '@/components/sections/SiteCheckTool';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { SITE_URL } from '@/data/site';
import { agencyMetadata, breadcrumbSchema, webPageSchema } from '@/lib/agency-seo';

const PATH = '/website-check';
const TITLE = 'KI-Website-Check: Ihre Website in 30 Sekunden prüfen';
const DESC = 'Kostenloser Website-Check mit KI-Auswertung: Technik, Mobil, SEO und Vertrauen Ihrer Website werden automatisch geprüft, inklusive konkreter Verbesserungen. Von MONVEX aus Bremen.';

export const metadata: Metadata = agencyMetadata({ title: TITLE, description: DESC, path: PATH });

const POINTS = ['Technik: HTTPS, Tempo, Sicherheit', 'Mobil: Darstellung auf dem Smartphone', 'SEO: Titel, Überschriften, Sitemap', 'Vertrauen: Kontakt, Impressum, Datenschutz', 'KI: individuelle Einschätzung und 3 Verbesserungen'];

export default function WebsiteCheckPage() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Website-Check', path: PATH }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: PATH }), { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'KI-Website-Check', url: `${SITE_URL}${PATH}`, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', inLanguage: 'de-DE', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, provider: { '@id': `${SITE_URL}/#organization` } }]} />
      <section className="relative isolate overflow-hidden pb-28 pt-32 sm:pt-40">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_30%,transparent_100%)]" />
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-ember/[.1] blur-[110px]" />
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow flex items-center justify-center gap-3"><span className="rounded-full bg-ember px-3 py-1.5 text-[.66rem] font-medium text-white">Kostenlos</span> KI-Website-Check</p>
            <h1 className="mt-6 text-[clamp(2.4rem,1.1rem+5vw,5.6rem)] font-semibold leading-[.95] tracking-[-0.055em]">Wie gut ist Ihre Website <span className="serif-i text-ember">wirklich?</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-graphite">Adresse eingeben, 30 Sekunden warten, fertig: Sie erhalten eine Bewertung mit Punktzahl und eine KI-Einschätzung mit drei konkreten Verbesserungen.</p>
          </div>
          <div className="mt-12"><SiteCheckTool /></div>
          <Reveal className="mx-auto mt-20 max-w-4xl">
            <h2 className="eyebrow text-center">Das wird geprüft</h2>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {POINTS.map((p) => (<li key={p} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-[.9rem] text-graphite"><Check size={14} className="text-ember" /> {p}</li>))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
