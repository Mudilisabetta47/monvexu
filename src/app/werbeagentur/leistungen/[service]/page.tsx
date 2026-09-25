import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { AgencyHero } from '@/components/agency/AgencyHero';
import { AgencyCta } from '@/components/agency/AgencyCta';
import { Block, FaqList, RelatedLinks } from '@/components/agency/Sections';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { AGENCY_BASE, agencyServices, flatIndustries, getService, servicePath } from '@/data/agency';
import { agencyMetadata, breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/agency-seo';

export const dynamicParams = false;
export const generateStaticParams = () => agencyServices.map((s) => ({ service: s.slug }));

type P = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const s = getService((await params).service);
  if (!s) return {};
  return agencyMetadata({ title: s.seo.title, description: s.seo.description, path: servicePath(s.slug) });
}

export default async function ServicePage({ params }: P) {
  const s = getService((await params).service);
  if (!s) notFound();
  const path = servicePath(s.slug);
  const crumbs = [
    { name: 'MONVEX', path: '/' },
    { name: 'Werbeagentur', path: AGENCY_BASE },
    { name: 'Leistungen', path: `${AGENCY_BASE}/leistungen` },
    { name: s.name, path },
  ];
  // Branchen, in denen diese Leistung eine Rolle spielt (echte, datengetriebene interne Links).
  const inIndustries = flatIndustries().filter((f) => f.industry.solutions.some((sol) => sol.service === s.slug));
  const others = agencyServices.filter((o) => o.slug !== s.slug && o.category === s.category).slice(0, 4);
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema({ name: s.name, description: s.seo.description, path }), faqSchema(s.faq)]} />
      <AgencyHero
        crumbs={crumbs}
        eyebrow={`Leistung · ${s.name}`}
        h1={s.h1}
        lead={s.lead}
        chips={s.covers}
        aside={
          <div className="rounded-[28px] bg-ink p-7 text-white shadow-lift">
            <p className="font-mono text-[.66rem] uppercase tracking-[.18em] text-white/50">Enthalten</p>
            <ul className="mt-5 space-y-3">
              {s.deliverables.slice(0, 5).map((d) => (
                <li key={d} className="flex gap-3 text-[.95rem] leading-snug text-white/85">
                  <Check size={17} className="mt-0.5 shrink-0 text-ember" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <Block tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {s.paragraphs.map((p) => (
              <Reveal key={p.slice(0, 20)}>
                <p className="text-lead text-graphite">{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">Leistungsumfang</p>
            <ul className="mt-5">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 border-t border-line py-3.5 leading-snug last:border-b">
                  <Check size={17} className="mt-0.5 shrink-0 text-ember" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>
      <Block>
        <SectionHead index="01" label="Vorteile" title={'Was Sie\n*davon haben.*'} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {s.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07}>
              <div className="h-full rounded-[24px] border border-line bg-white p-7 shadow-card">
                <span className="font-mono text-[.7rem] tracking-[.2em] text-ember-deep">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-h3 font-semibold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-graphite">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>
      <FaqList items={s.faq} index="02" />
      <RelatedLinks
        groups={[
          { title: `${s.name} für Ihre Branche`, links: inIndustries.map((f) => ({ label: f.industry.name, href: f.path, hint: f.industry.group })) },
          { title: 'Verwandte Leistungen', links: others.map((o) => ({ label: o.name, href: servicePath(o.slug) })) },
          { title: 'Mehr zu MONVEX', links: [{ label: 'Werbeagentur-Übersicht', href: AGENCY_BASE }, { label: 'Alle Branchen', href: `${AGENCY_BASE}/branchen` }, { label: 'Alle Leistungen', href: `${AGENCY_BASE}/leistungen` }] },
        ]}
      />
      <AgencyCta headline={`${s.name}: sprechen wir darüber.`} text="Beschreiben Sie kurz Ihr Vorhaben. Wir melden uns mit einer ehrlichen Einschätzung und einem Vorschlag für den Einstieg." topic={s.name} />
    </>
  );
}
