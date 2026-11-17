import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { ContactForm } from '@/components/sections/ContactForm';
import { JsonLd } from '@/components/ui/JsonLd';
import { faqSchema, serviceSchema } from '@/lib/agency-seo';
import { legal } from '@/data/site';
import { PRICE_FROM, landingProcess, type Landing } from '@/data/landing';

const tel = `tel:+49${(legal.phone ?? '').replace(/\D/g, '').replace(/^0/, '')}`;

/** Kurze Anzeigen-Landingpage: H1 mit Suchbegriff, drei Vorteile, drei Schritte, Formular, FAQ. Mobil zuerst. */
export function LandingPage({ l }: { l: Landing }) {
  return (
    <>
      <JsonLd data={[serviceSchema({ name: l.title, description: l.description, path: `/lp/${l.slug}`, serviceType: `Website erstellen für ${l.name}` }), faqSchema(l.faq)]} />

      <section className="relative isolate overflow-hidden bg-ink pb-14 pt-[104px] text-white sm:pb-20 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute -right-[18%] -top-[30%] -z-10 aspect-square w-[min(56rem,110vw)] rounded-full bg-[radial-gradient(circle_at_30%_25%,#ff8a5c,#ff4a1c_55%,#c8340c)] opacity-80 shadow-[0_60px_140px_-40px_rgba(255,74,28,.6)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b0b0d_0%,#0b0b0d_40%,rgba(11,11,13,.6)_72%,rgba(11,11,13,.25)_100%)] max-md:bg-[linear-gradient(180deg,rgba(11,11,13,.55),#0b0b0d_70%)]" />
        <div className="shell">
          <div className="max-w-3xl">
            <h1 className="display-title animate-rise text-[clamp(2.2rem,1.1rem+4.2vw,4.6rem)] leading-[1] text-white [overflow-wrap:anywhere]">{l.h1}</h1>
            <p className="mt-6 max-w-2xl animate-rise text-lead text-white/80 [animation-delay:.1s]">{l.lead}</p>
            {PRICE_FROM && <p className="mt-5 animate-rise text-[1.1rem] font-semibold text-white [animation-delay:.14s]">{PRICE_FROM}</p>}
            <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:.2s]">
              <a href="#anfrage" className="inline-flex min-h-[3.4rem] items-center gap-3 rounded-full bg-ember px-8 py-3.5 text-[1rem] font-semibold text-white transition-colors hover:bg-white hover:text-ink">
                Unverbindlich anfragen <ArrowRight size={18} aria-hidden />
              </a>
              <a href={tel} className="inline-flex min-h-[3.4rem] items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-[1rem] font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-ink">
                <Phone size={18} aria-hidden /> {legal.phone}
              </a>
            </div>
            <ul className="mt-8 flex animate-rise flex-wrap gap-x-6 gap-y-2 text-[.92rem] text-white/75 [animation-delay:.28s]">
              {['Angebot vor dem Start', 'Persönlicher Ansprechpartner', 'Aus Bremen, deutschlandweit'].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check size={16} className="text-ember" aria-hidden /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="shell">
          <h2 className="text-h2 font-semibold tracking-tight">Was Sie bekommen</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {l.benefits.map((b) => (
              <li key={b.t} className="rounded-3xl border border-line bg-white p-7">
                <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-ember/10 text-ember"><Check size={20} /></span>
                <h3 className="mt-5 text-[1.2rem] font-semibold leading-snug">{b.t}</h3>
                <p className="mt-3 text-graphite">{b.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="shell">
          <h2 className="text-h2 font-semibold tracking-tight">So läuft es ab</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {landingProcess.map((s) => (
              <li key={s.n} className="flex gap-5 rounded-3xl bg-paper p-7">
                <span className="display-title text-[2.6rem] leading-none text-ember">{s.n}</span>
                <div>
                  <h3 className="text-[1.15rem] font-semibold">{s.t}</h3>
                  <p className="mt-2 text-graphite">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="anfrage" className="scroll-mt-24 bg-ink py-16 text-white sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2 font-semibold tracking-tight">Jetzt unverbindlich anfragen</h2>
            <p className="mt-5 max-w-md text-white/70">Ein paar Stichpunkte genügen. Wir melden uns persönlich und schicken Ihnen ein Angebot, bevor irgendetwas startet.</p>
            <p className="mt-6 text-white/80">Lieber telefonieren? <a href={tel} className="link-u font-semibold text-white">{legal.phone}</a></p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 text-ink sm:p-10 lg:col-span-7">
            <ContactForm topic={`Anzeigen-Landingpage: ${l.name}`} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="shell max-w-3xl">
          <h2 className="text-h2 font-semibold tracking-tight">Häufige Fragen</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {l.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.08rem] font-semibold">
                  {f.q}
                  <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 text-[1.2rem] leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-graphite">{f.a}</p>
              </details>
            ))}
          </div>
          <Link href={l.more.href} className="link-u mt-10 inline-block font-medium">{l.more.label}</Link>
        </div>
      </section>

      {/* Mobile: feste Leiste mit Anruf und Anfrage */}
      <div className="fixed inset-x-0 bottom-0 z-[80] flex gap-2 border-t border-black/10 bg-white/95 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <a href={tel} className="flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 font-semibold text-ink"><Phone size={17} aria-hidden /> Anrufen</a>
        <a href="#anfrage" className="flex min-h-[3rem] flex-[1.4] items-center justify-center gap-2 rounded-full bg-ember font-semibold text-white">Anfragen <ArrowRight size={17} aria-hidden /></a>
      </div>
      <div aria-hidden className="h-[4.5rem] bg-paper md:hidden" />
    </>
  );
}
