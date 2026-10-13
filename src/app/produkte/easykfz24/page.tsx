import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AgencyCta } from '@/components/agency/AgencyCta';
import { Breadcrumbs } from '@/components/agency/Breadcrumbs';
import { Block, FaqList } from '@/components/agency/Sections';
import { BrowserFrame, EasyWordmark, PhoneFrame } from '@/components/products/Frames';
import { StatusChip } from '@/components/products/Chips';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { easyColors, easyFaq, easyFlow, easyServices, easyVehicles, productBySlug } from '@/data/products';
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/agency-seo';
import { productMetadata, softwareSchema } from '@/lib/product-seo';

const p = productBySlug('easykfz24');
const PATH = p.href;
const SITE = 'https://easykfz24.de/';
export const metadata: Metadata = productMetadata(p, PATH);

/** Externer Link: neuer Tab, ohne Referrer-Weitergabe (noopener noreferrer). */
const Ext = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

export default function EasyKfzPage() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Produkte', path: '/produkte' }, { name: p.name, path: PATH }];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema({ name: p.seo.title, description: p.seo.description, path: PATH }),
          softwareSchema(p, PATH, { '@type': 'WebApplication', applicationCategory: 'BusinessApplication', operatingSystem: 'Web' }),
          faqSchema(easyFaq),
        ]}
      />

      {/* 1 Hero */}
      <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40" style={{ background: 'linear-gradient(160deg,#EEF3FF 0%,#F8FAFD 50%,#E6EDFF 100%)' }}>
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[520px] w-[520px] rounded-full blur-[110px]" style={{ background: '#2A55FF33' }} />
        <span aria-hidden className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-[380px] w-[380px] rounded-full blur-[110px]" style={{ background: '#3FD8F244' }} />
        <div className="shell">
          <Breadcrumbs crumbs={crumbs} />
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <EasyWordmark />
              <div className="mt-5"><StatusChip product={p} /></div>
              <h1 className="mt-6 text-[clamp(2.6rem,1.4rem+5vw,5.4rem)] font-semibold leading-[.94] tracking-[-0.055em] text-[#0A1433]">
                Easy<span className="serif-i text-[#2A55FF]">KFZ24</span>
              </h1>
              <p className="mt-4 text-[clamp(1.2rem,1rem+1vw,1.7rem)] font-medium leading-snug tracking-[-0.02em] text-[#0A1433]">Digitale Plattform für Dienstleistungen rund um die Kfz-Zulassung.</p>
              <p className="mt-5 max-w-lg text-lead text-[#46536F]">{p.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={SITE} className="!bg-[#2A55FF] hover:!bg-[#1F45E6]">EasyKFZ24 besuchen</Button>
                <Button href="#ablauf" variant="secondary">So funktioniert’s</Button>
              </div>
            </div>
            <div className="relative lg:col-span-7">
              <div className="relative mx-auto max-w-[760px] pb-6 sm:pb-12">
                <div className="relative z-10 sm:w-[88%]">
                  <BrowserFrame label="easykfz24.de" img={{ src: '/products/easykfz24/desktop.webp', alt: 'EasyKFZ24: Seite zu Kfz-Kennzeichen mit Konfigurator für Fahrzeugart und Wunschkennzeichen', width: 1800, height: 813, priority: true }} />
                </div>
                <div className="relative z-20 mx-auto mt-8 w-fit sm:absolute sm:-bottom-8 sm:-right-2 sm:mt-0 lg:-right-2">
                  <PhoneFrame img={{ src: '/products/easykfz24/mobile.webp', alt: 'EasyKFZ24 auf dem Smartphone: Kennzeichen-Konfigurator', width: 640, height: 1302 }} />
                </div>
              </div>
              <p className="mt-6 text-center text-[.78rem] text-[#5A6683]">Aufnahmen von easykfz24.de</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 Was ist EasyKFZ24 */}
      <Block>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead index="01" label="Das Produkt" title={'Was ist\n*EasyKFZ24?*'} />
          </div>
          <div className="space-y-5 lg:col-span-7 lg:pt-10">
            <Reveal><p className="text-lead text-graphite">EasyKFZ24 ist eine digitale Plattform für die Kfz-Zulassung: Statt Formulare auszudrucken und Termine zu koordinieren, startet man den Vorgang online, lädt die nötigen Unterlagen hoch und verfolgt den Stand.</p></Reveal>
            <Reveal delay={0.08}><p className="leading-relaxed text-graphite">Die Dienstleistungen werden ausschließlich auf <Ext href={SITE} className="link-u font-semibold text-ink">easykfz24.de</Ext> erbracht und beauftragt. Diese Seite stellt das Produkt vor und ersetzt dessen Auftragsstrecke nicht. EasyKFZ24 ist ein privater Zulassungsservice und keine Behörde; über Zulassungsvorgänge entscheidet die zuständige Zulassungsbehörde.</p></Reveal>
            <Reveal delay={0.12}>
              <p className="eyebrow mt-6">Unterstützte Fahrzeugarten</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {easyVehicles.map((v) => (<li key={v} className="rounded-full border border-line bg-white px-4 py-2 text-[.9rem] text-graphite">{v}</li>))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Block>

      {/* 3 Leistungen */}
      <Block tone="white">
        <SectionHead index="02" label="Leistungen" title={'Was EasyKFZ24\n*tatsächlich bietet.*'}>
          Diese Vorgänge lassen sich auf easykfz24.de beauftragen. Ein Klick führt direkt zur jeweiligen Auftragsstrecke.
        </SectionHead>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {easyServices.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.06}>
              <Ext href={s.href} className="group flex h-full flex-col justify-between rounded-[24px] border p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-card" >
                <span style={{ display: 'contents' }}>
                  <span>
                    <span className="font-mono text-[.7rem] tracking-[.2em] text-[#2A55FF]">0{i + 1}</span>
                    <span className="mt-4 block text-[1.3rem] font-semibold leading-tight tracking-[-0.03em] text-[#0A1433]">{s.title}</span>
                    <span className="mt-2 block leading-snug text-graphite">{s.text}</span>
                  </span>
                  <span className="mt-6 flex items-center gap-2 text-[.88rem] font-medium text-[#2A55FF]">Auf easykfz24.de starten <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" /></span>
                </span>
              </Ext>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.12}>
            <Ext href="https://easykfz24.de/kennzeichen" className="group flex h-full flex-col justify-between rounded-[24px] bg-[#0A1433] p-6 text-white transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift">
              <span style={{ display: 'contents' }}>
                <span>
                  <span className="font-mono text-[.7rem] tracking-[.2em] text-[#3FD8F2]">+</span>
                  <span className="mt-4 block text-[1.3rem] font-semibold leading-tight tracking-[-0.03em]">Wunschkennzeichen</span>
                  <span className="mt-2 block leading-snug text-white/70">Kennzeichen-Konfigurator mit allen Ortskennzeichen. Die Verfügbarkeit wird bei der Reservierung geprüft.</span>
                </span>
                <span className="mt-6 flex items-center gap-2 text-[.88rem] font-medium text-[#3FD8F2]">Kennzeichen ansehen <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" /></span>
              </span>
            </Ext>
          </Reveal>
        </ul>
      </Block>

      {/* 4 Ablauf */}
      <Block id="ablauf">
        <SectionHead index="03" label="Ablauf" title={'So funktioniert\ndas *grundsätzlich.*'} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {easyFlow.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.05} className="bg-paper">
              <div className="h-full p-6">
                <p className="font-mono text-[.7rem] tracking-[.2em] text-[#2A55FF]">{s.n}</p>
                <h3 className="mt-4 text-[1.1rem] font-semibold leading-tight tracking-[-0.025em]">{s.title}</h3>
                <p className="mt-2 text-[.92rem] leading-snug text-graphite">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Block>

      {/* 5 Markenidentität */}
      <Block tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3"><span className="text-ember">04</span><span className="h-px w-10 bg-ink/25" />Marke</p>
            <h2 className="mt-6 text-[clamp(2.2rem,1.2rem+4vw,4.6rem)] font-semibold leading-[.96] tracking-[-0.045em]">Eine eigene <span className="serif-i text-ember">Markenwelt.</span></h2>
            <p className="mt-6 max-w-md text-lead text-graphite">EasyKFZ24 tritt eigenständig auf: mit eigenem Zeichen, eigener Schrift und eigenen Farben.</p>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-[32px] border p-8 sm:p-10" style={{ borderColor: p.theme.line, background: 'linear-gradient(160deg,#EEF3FF,#fff)' }}>
              <EasyWordmark />
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {easyColors.map((c) => (
                  <li key={c.hex}>
                    <span className="block h-16 rounded-2xl border border-black/10" style={{ background: c.hex }} />
                    <span className="mt-2 block text-[.85rem] font-semibold">{c.name}</span>
                    <span className="block font-mono text-[.7rem] text-graphite">{c.hex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Block>

      <FaqList title="Häufige Fragen zu EasyKFZ24" items={easyFaq} index="05" />

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[36px] p-8 text-white sm:p-14" style={{ background: 'linear-gradient(135deg,#0A1433,#142A7A)' }}>
            <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#2A55FF]/50 blur-[90px]" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-[clamp(1.8rem,1.2rem+2.4vw,3.4rem)] font-semibold leading-[1] tracking-[-0.045em]">Fahrzeug zulassen, <span className="serif-i text-[#3FD8F2]">einfach digital.</span></h2>
                <p className="mt-4 max-w-xl text-white/70">Alle Leistungen und die Auftragsstrecke finden Sie auf easykfz24.de.</p>
              </div>
              <Button href={SITE} variant="light">EasyKFZ24 besuchen</Button>
            </div>
          </div>
          <Link href="/produkte/busos" className="group mt-6 flex items-center justify-between rounded-[24px] border border-line bg-white p-6 transition-shadow duration-500 hover:shadow-card">
            <span><span className="eyebrow block">Weiteres Produkt</span><span className="mt-1 block text-[1.3rem] font-semibold tracking-tight">MONVEX BusOS: Software für Busunternehmen</span></span>
            <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>
      </section>

      <AgencyCta id="anfrage" headline="Eigene Plattform geplant?" text="MONVEX entwickelt digitale Produkte und individuelle Software. Schildern Sie uns Ihr Vorhaben." topic="EasyKFZ24 / Softwareentwicklung" />
    </>
  );
}
