import Link from 'next/link';
import type { Metadata } from 'next';
import { X } from 'lucide-react';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { ShopConfigurator } from '@/components/shops/ShopConfigurator';
import { ShopPreview } from '@/components/shops/ShopPreview';
import { buyingHelp, comparison, niches, notIncluded, packages, shopFaq, shopSteps, SHOPS } from '@/data/shops';
import { agencyMetadata, breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/agency-seo';

const TITLE = 'Fertiger Shopify-Shop ab 49 €: Aufbau nach Branchenvorlage';
const DESC = 'MONVEX baut deinen Shopify-Shop nach Branchenvorlage auf und übergibt ihn auf deinen Namen. Festpreis-Pakete ab 49 €, Anleitung inklusive. Shopify-Tarif extra.';
// ENTWURF: bis zur Freigabe nicht indexieren und nicht in die Sitemap aufnehmen.
export const metadata: Metadata = { ...agencyMetadata({ title: TITLE, description: DESC, path: '/shops' }), robots: { index: false, follow: false } };

const gallery = ['beauty', 'schmuck', 'home', 'fitness', 'genuss', 'mode'];

export default function ShopsPage() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Shop-Start', path: '/shops' }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: '/shops' }), faqSchema(shopFaq)]} />

      <section className="shell pb-20 pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-[.82rem] text-graphite">
          <Link href="/shops" className="hover:text-ink">Start</Link> <span aria-hidden>/</span> <span className="text-ink">Fertiger Shopify-Shop</span>
        </nav>
        <ShopConfigurator />
      </section>

      <section className="border-y border-line bg-white py-20">
        <div className="shell">
          <p className="eyebrow">Pakete im Vergleich</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,1.2rem+3vw,3.6rem)] font-semibold leading-[.98] tracking-[-0.045em]">Was steckt in welchem Paket?</h2>
          <div className="mt-10 overflow-x-auto rounded-3xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-[.93rem]">
              <caption className="sr-only">Vergleich der Pakete Start, Plus und Premium</caption>
              <thead>
                <tr className="border-b border-line bg-paper">
                  <th scope="col" className="p-5 text-[.75rem] font-semibold uppercase tracking-[.1em] text-graphite">Leistung</th>
                  {packages.slice(0, 3).map((p) => (
                    <th key={p.id} scope="col" className="p-5">
                      <span className="block text-[1.1rem] font-semibold tracking-tight">{p.name}</span>
                      <span className="block font-normal text-graphite">{p.price} € einmalig</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((r) => (
                  <tr key={r.row} className="border-b border-line last:border-0">
                    <th scope="row" className="p-5 font-medium">{r.row}</th>
                    {r.v.map((c, i) => (
                      <td key={i} className={c === '–' ? 'p-5 text-mute' : 'p-5 font-medium text-ink'}>{c === '✓' ? <span className="text-ember" aria-label="enthalten">✓</span> : c === '–' ? <span aria-label="nicht enthalten">–</span> : c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[.85rem] text-graphite">Größeres Sortiment, eigenes Design oder besondere Funktionen? Dann ist das Paket „Individuell“ das richtige.</p>
        </div>
      </section>

      <section className="shell py-20">
        <p className="eyebrow">Nach der Bestellung</p>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,1.2rem+3vw,3.6rem)] font-semibold leading-[.98] tracking-[-0.045em]">Was passiert danach?</h2>
        <p className="mt-4 max-w-2xl text-graphite">Unser Ziel: Dein Shop ist {SHOPS.deliveryTarget} nach vollständigen Angaben bei dir. Das ist ein Richtwert, kein Festtermin.</p>
        <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
          {shopSteps.map((s, k) => (
            <Reveal as="li" key={s.t} delay={k * 0.07} className="rounded-3xl border border-line bg-white p-6">
              <span className="font-mono text-eyebrow text-ember">0{k + 1}</span>
              <h3 className="mt-4 text-[1.15rem] font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[.92rem] leading-relaxed text-graphite">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-white py-20">
        <div className="shell">
          <p className="eyebrow">Beispiel-Vorschauen</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,1.2rem+3vw,3.6rem)] font-semibold leading-[.98] tracking-[-0.045em]">So können Vorlagen aussehen.</h2>
          <p className="mt-4 max-w-2xl text-graphite">Die Vorschauen zeigen den Aufbau mit Platzhalter-Marke und Platzhalter-Produkten. Es sind keine Kundenshops. Deine Marke, Farben und Produkte setzen wir je nach Paket ein.</p>
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((id) => {
              const n = niches.find((x) => x.id === id)!;
              return (
                <li key={id}>
                  <Link href={`/shops/bestellen?nische=${id}`} className="group block">
                    <div className="transition-transform duration-500 group-hover:-translate-y-1"><ShopPreview niche={id} /></div>
                    <p className="mt-3 text-[.95rem] font-semibold">{n.emoji} {n.name}</p>
                    <p className="text-[.82rem] text-graphite group-hover:text-ink">Diese Vorlage bestellen →</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="shell py-20">
        <p className="eyebrow">Kaufhilfe</p>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,1.2rem+3vw,3.6rem)] font-semibold leading-[.98] tracking-[-0.045em]">Welches Paket passt zu dir?</h2>
        <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          {buyingHelp.map((b) => {
            const p = packages.find((x) => x.id === b.pkg)!;
            return (
              <li key={b.text}>
                <Link href={`/shops/bestellen?paket=${p.id}`} className="flex h-full items-center justify-between gap-5 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-ink">
                  <span className="text-[.98rem]">{b.text}</span>
                  <span className="shrink-0 rounded-full bg-ink px-3.5 py-1.5 text-[.82rem] font-semibold text-white">{p.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-y border-line bg-white py-20">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Ehrlich vorab</p>
            <h2 className="mt-4 text-[clamp(1.8rem,1.2rem+2vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">Was nicht enthalten ist.</h2>
            <p className="mt-4 text-graphite">Damit du weißt, was nach der Übergabe noch auf dich zukommt, steht es hier und nicht im Kleingedruckten.</p>
          </div>
          <ul className="divide-y divide-line rounded-3xl border border-line bg-paper">
            {notIncluded.map((n) => (
              <li key={n.t} className="flex gap-4 p-6">
                <X size={18} className="mt-1 shrink-0 text-ember" aria-hidden />
                <div>
                  <h3 className="font-semibold tracking-tight">{n.t}</h3>
                  <p className="mt-1 text-[.93rem] leading-relaxed text-graphite">{n.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="shell max-w-4xl scroll-mt-20 py-20">
        <h2 className="text-[clamp(1.8rem,1.2rem+2vw,3rem)] font-semibold tracking-[-0.04em]">Fragen vor dem Kauf</h2>
        <div className="mt-8 divide-y divide-line rounded-3xl border border-line bg-white px-6">
          {shopFaq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-lg transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pr-10 text-[.96rem] leading-relaxed text-graphite">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-graphite">Noch unsicher? Schreib uns über das <Link href="/shops/bestellen" className="font-medium text-ink underline underline-offset-4">Formular</Link>, wir sagen dir ehrlich, was für deinen Start reicht.</p>
      </section>
    </>
  );
}
