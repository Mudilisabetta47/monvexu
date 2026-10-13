import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock } from 'lucide-react';
import { AgencyCta } from '@/components/agency/AgencyCta';
import { Breadcrumbs } from '@/components/agency/Breadcrumbs';
import { Block, FaqList } from '@/components/agency/Sections';
import { BrowserFrame, BusWordmark, PhoneFrame } from '@/components/products/Frames';
import { StatusChip } from '@/components/products/Chips';
import { ProductStory } from '@/components/products/ProductStory';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { busosFaq, busosFlow, busosModules, productBySlug } from '@/data/products';
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/agency-seo';
import { productMetadata, softwareSchema } from '@/lib/product-seo';

const p = productBySlug('busos');
const PATH = p.href;
export const metadata: Metadata = productMetadata(p, PATH);

const available = busosModules.filter((m) => m.state === 'available');
const planned = busosModules.filter((m) => m.state === 'development');

export default function BusOSPage() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Produkte', path: '/produkte' }, { name: p.name, path: PATH }];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema({ name: p.seo.title, description: p.seo.description, path: PATH }),
          softwareSchema(p, PATH, { applicationCategory: 'BusinessApplication', applicationSubCategory: 'Betriebssoftware für Busunternehmen', operatingSystem: 'Web' }),
          faqSchema(busosFaq),
        ]}
      />

      {/* 1 Hero */}
      <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40" style={{ background: 'linear-gradient(160deg,#E6F6F2 0%,#F6FBFA 46%,#F6F5F1 100%)' }}>
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_30%,#000_20%,transparent_100%)]" />
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[520px] w-[520px] rounded-full blur-[110px]" style={{ background: '#86EFCF55' }} />
        <div className="shell">
          <Breadcrumbs crumbs={crumbs} />
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <BusWordmark />
              <div className="mt-5"><StatusChip product={p} /></div>
              <h1 className="mt-6 text-[clamp(2.6rem,1.4rem+5vw,5.4rem)] font-semibold leading-[.94] tracking-[-0.055em]" style={{ color: p.theme.ink }}>
                MONVEX <span className="serif-i" style={{ color: p.theme.accent }}>BusOS</span>
              </h1>
              <p className="mt-4 text-[clamp(1.2rem,1rem+1vw,1.7rem)] font-medium leading-snug tracking-[-0.02em]" style={{ color: p.theme.ink }}>{p.tagline}</p>
              <p className="mt-5 max-w-lg text-lead" style={{ color: '#3C5568' }}>{p.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#demo">Demo anfragen</Button>
                <Button href="#module" variant="secondary">Module ansehen</Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <BrowserFrame label="MONVEX BusOS · Demo-Betrieb" img={{ src: '/products/busos/desktop.webp', alt: 'MONVEX BusOS Desktop mit Modulen und OPS-Live-Übersicht im Demo-Betrieb', width: 1440, height: 900, priority: true }} />
              <p className="mt-3 text-center text-[.78rem] text-[#5A7080]">Demo-Betrieb mit fiktiven Daten. Module mit grauem Punkt sind in Entwicklung.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 Status */}
      <div className="shell -mt-2 py-10">
        <div className="flex gap-4 rounded-[24px] border p-6 sm:p-7" style={{ borderColor: p.theme.line, background: p.theme.soft }}>
          <Clock size={22} className="mt-0.5 shrink-0" style={{ color: p.theme.accent }} />
          <div>
            <h2 className="text-[1.1rem] font-semibold tracking-tight" style={{ color: p.theme.ink }}>Aktueller Produktstatus (Stand Oktober 2026)</h2>
            <p className="mt-1.5 max-w-3xl leading-relaxed text-[#3C5568]">
              MONVEX BusOS ist in Entwicklung. Die Plattform läuft intern mit einem Demo-Betrieb und ist nicht öffentlich verfügbar. Was heute funktioniert und was noch kommt, steht transparent unter „Module“. Interessierte Busunternehmen können eine Demo anfragen.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Zielgruppe */}
      <Block>
        <SectionHead index="01" label="Zielgruppe" title={'Für Busunternehmen mit\n*Charterverkehr.*'}>
          Wer Anfragen per Website, E-Mail und Telefon bekommt, Angebote kalkuliert und Fahrten disponiert, arbeitet oft mit vielen getrennten Werkzeugen. BusOS führt diese Abläufe in einer Arbeitsumgebung zusammen.
        </SectionHead>
        <Reveal className="mt-10">
          <p className="eyebrow">Kundenarten in BusOS</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {['Reisebüros und Veranstalter', 'Schulen und Vereine', 'Unternehmen', 'Behörden und Kommunen', 'Privatkunden'].map((k) => (
              <li key={k} className="rounded-full border border-line bg-white px-4 py-2 text-[.9rem] text-graphite">{k}</li>
            ))}
          </ul>
        </Reveal>
      </Block>

      {/* 4 Prozess */}
      <Block tone="white">
        <SectionHead index="02" label="Geschäftsprozess" title={'Von der Anfrage\nbis zur *Fahrt.*'}>
          So läuft ein Auftrag durch BusOS. Dieser Ablauf funktioniert durchgängig im Demo-Betrieb, von der Anfrage bis zur Fahrer-App.
        </SectionHead>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {busosFlow.map((s, i) => (
            <Reveal as="li" key={s.n} delay={(i % 3) * 0.06} className="bg-paper">
              <div className="h-full p-7 sm:p-8">
                <p className="font-mono text-[.7rem] tracking-[.2em]" style={{ color: p.theme.accent }}>{s.n}</p>
                <h3 className="mt-5 text-[1.3rem] font-semibold tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Block>

      {/* 5 Produkt-Story: scrollgesteuert (ab lg), sonst gestapelt */}
      <Block id="module-detail">
        <SectionHead index="03" label="Im Produkt" title={'Drei Bereiche,\ndie *zusammenspielen.*'}>
          Scrollen Sie durch die Arbeitsumgebung. Alle Bilder stammen aus dem Demo-Betrieb mit fiktiven Daten.
        </SectionHead>
        <div className="mt-14">
          <ProductStory
            accent={p.theme.accent}
            ink={p.theme.ink}
            line={p.theme.line}
            steps={[
              {
                kicker: 'OPS Center',
                title: 'Die Leitstelle Ihres Betriebs.',
                text: 'Heutige und morgige Fahrten, Zuweisung und Konflikte auf einen Blick.',
                points: ['Fahrten nach Status filtern: geplant, unterwegs, verspätet, Störung', 'Konflikt-Hinweise, etwa doppelt belegte Fahrzeuge oder fehlende Fahrer', 'Zuweisung von Fahrzeug und Fahrer', 'Live-Lage mit simulierten Demo-Positionen. Echte GPS-Anbindung ist in Entwicklung'],
                shape: 'wide',
                media: <BrowserFrame label="OPS Center · Demo-Betrieb" img={{ src: '/products/busos/ops-center.webp', alt: 'OPS Center von MONVEX BusOS mit Kennzahlen und Fahrtenliste im Demo-Betrieb', width: 1440, height: 900 }} />,
              },
              {
                kicker: 'Charter Management',
                title: 'Vom Angebot zum PDF.',
                text: 'Anfragen kalkulieren, Angebote erstellen und als PDF versenden.',
                points: ['Kalkulation mit nachvollziehbarer Preisbildung', 'Angebotsdokument mit Versionen und Verlauf', 'Angebote als PDF, Annahme und Ablehnung werden dokumentiert', 'Aufträge entstehen aus dem Angebot'],
                shape: 'wide',
                media: (
                  <div className="grid items-end gap-5 sm:grid-cols-[1.25fr_.75fr]">
                    <BrowserFrame label="Kunden · Demo-Betrieb" img={{ src: '/products/busos/kunden.webp', alt: 'Kundenverwaltung in MONVEX BusOS mit fiktiven Beispielkunden', width: 1440, height: 900, sizes: '(min-width:1024px) 34vw, 90vw' }} />
                    <figure className="mx-auto w-[78%] overflow-hidden rounded-[10px] border border-black/10 bg-white shadow-[0_40px_70px_-24px_rgba(11,37,64,.45)] sm:w-full">
                      <Image src="/products/busos/angebot.webp" alt="Beispielangebot als PDF mit fiktiven Daten" width={900} height={1271} sizes="(min-width:1024px) 20vw, 60vw" className="block h-auto w-full" />
                      <figcaption className="border-t border-black/5 px-3 py-2 text-center text-[.7rem] text-graphite">Beispielangebot, fiktive Daten</figcaption>
                    </figure>
                  </div>
                ),
              },
              {
                kicker: 'MONVEX Connect',
                title: 'Anfragen direkt von Ihrer Website.',
                text: 'Ein Anfrageformular für Ihre Website, das Anfragen direkt in BusOS bringt.',
                points: ['Formular für die eigene Website, Anfragen landen im Posteingang von BusOS', 'Webhooks und Schnittstelle für eigene Anbindungen', 'Domain wird vor der Aktivierung verifiziert', 'WordPress-Plugin: in Erprobung, noch nicht veröffentlicht'],
                shape: 'tall',
                media: (
                  <div className="flex h-full flex-col items-center justify-center">
                    <PhoneFrame ratio={560 / 1212} className="!w-[220px] lg:!h-[min(64svh,620px)] lg:!w-auto" img={{ src: '/products/busos/connect-mobile.webp', alt: 'Anfrageformular von MONVEX Connect auf dem Smartphone, Demo-Website', width: 560, height: 1212 }} />
                    <p className="mt-3 text-center text-[.74rem] text-graphite">Demo-Website eines fiktiven Busunternehmens</p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Block>

      {/* 6 Modulübersicht */}
      <Block id="module" tone="white">
        <SectionHead index="04" label="Module" title={'Was heute geht.\nWas noch *kommt.*'}>
          Wir kennzeichnen ehrlich, was im Demo-Betrieb nutzbar ist und was sich in Entwicklung befindet.
        </SectionHead>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border p-7 sm:p-9" style={{ borderColor: p.theme.line, background: p.theme.bg }}>
            <h3 className="flex items-center gap-2.5 text-[1.2rem] font-semibold" style={{ color: p.theme.ink }}><span className="h-2.5 w-2.5 rounded-full" style={{ background: p.theme.accent }} /> Im Demo-Betrieb nutzbar</h3>
            <ul className="mt-5 divide-y" style={{ borderColor: p.theme.line }}>
              {available.map((m) => (
                <li key={m.name} className="py-3.5">
                  <p className="font-semibold tracking-tight">{m.name}</p>
                  <p className="mt-0.5 text-[.92rem] leading-snug text-graphite">{m.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-line bg-paper p-7 sm:p-9">
            <h3 className="flex items-center gap-2.5 text-[1.2rem] font-semibold"><span className="h-2.5 w-2.5 rounded-full bg-[#E0A100]" /> In Entwicklung</h3>
            <ul className="mt-5 divide-y divide-line">
              {planned.map((m) => (
                <li key={m.name} className="py-3.5">
                  <p className="font-semibold tracking-tight">{m.name}</p>
                  <p className="mt-0.5 text-[.92rem] leading-snug text-graphite">{m.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-[.85rem] leading-relaxed text-mute">Stand der Module: Oktober 2026. Angaben ohne Gewähr für künftige Verfügbarkeit; Funktionen und Reihenfolge können sich ändern.</p>
      </Block>

      <FaqList title="Häufige Fragen zu BusOS" items={busosFaq} index="05" />

      <AgencyCta id="demo" headline="BusOS-Demo anfragen." text="Sie führen ein Busunternehmen und möchten sehen, wie BusOS arbeitet? Schreiben Sie uns kurz zu Ihrem Betrieb, dann melden wir uns zu einer Demo." topic="MONVEX BusOS – Demo-Anfrage" />

      <div className="shell pb-24">
        <Link href="/produkte/easykfz24" className="group flex items-center justify-between rounded-[24px] border border-line bg-white p-6 transition-shadow duration-500 hover:shadow-card">
          <span><span className="eyebrow block">Weiteres Produkt</span><span className="mt-1 block text-[1.3rem] font-semibold tracking-tight">EasyKFZ24: digitale Kfz-Zulassung</span></span>
          <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
        </Link>
      </div>
    </>
  );
}
