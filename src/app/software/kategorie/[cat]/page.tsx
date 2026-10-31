import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/Tilt';
import { SoftwareMock } from '@/components/software/Mock';
import { SwButton } from '@/components/software/SwButton';
import { SwIcon } from '@/components/software/icons';
import { ProductCard, SwHead } from '@/components/software/SwUi';
import { categories, categoryBySlug, productsInCategory, requestHref, swPath } from '@/data/software';
import { breadcrumbSchema, swMetadata, webPageSchema } from '@/lib/software-seo';

type Params = { cat: string };
export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ cat: c.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { cat } = await params;
  const c = categoryBySlug(cat);
  return c ? swMetadata({ title: c.seo.title, description: c.seo.description, path: swPath.category(c.slug) }) : {};
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { cat } = await params;
  const c = categoryBySlug(cat);
  if (!c) notFound();
  const list = productsInCategory(c.slug);
  const path = swPath.category(c.slug);
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Software', path: '/software' }, { name: c.name, path }];
  const lead = list[0];
  const vars = { ['--sw-a' as string]: c.accent, ['--sw-a2' as string]: c.accent2, ['--sw-g2' as string]: c.accent, ['--sw-g3' as string]: c.accent } as CSSProperties;
  return (
    <div style={vars}>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: c.seo.title, description: c.seo.description, path })]} />
      <section className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(60% 55% at 15% 5%, color-mix(in srgb, ${c.accent} 18%, transparent), transparent 70%), radial-gradient(50% 50% at 90% 15%, color-mix(in srgb, ${c.accent2} 22%, transparent), transparent 70%)` }} />
        <div className="grid-cols-1 mx-auto grid w-full max-w-[1320px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[.8rem] font-semibold" style={{ background: `color-mix(in srgb, ${c.accent} 10%, #fff)`, color: c.accent }}>
              <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: c.accent }}>
                <SwIcon name={c.icon} size={13} />
              </span>
              {c.name}
            </span>
            <h1 className="mt-6 text-[clamp(2.4rem,1.3rem+4.4vw,4.6rem)] font-semibold leading-[1] tracking-[-0.05em]">{c.tagline}</h1>
            <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-sw-mute">{c.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <SwButton href={requestHref('beratung')} size="lg">Beratung vereinbaren</SwButton>
              <SwButton href={`${swPath.catalog}?kat=${c.slug}`} variant="secondary" size="lg" arrow={false}>Im Katalog filtern</SwButton>
            </div>
          </div>
          <Tilt max={4} glare={false}>
            <SoftwareMock spec={lead.mock} name={lead.name} accent={c.accent} accent2={c.accent2} />
          </Tilt>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1320px] px-5 pb-28 sm:px-8">
        <Reveal>
          <SwHead eyebrow={`${list.length} Lösungen`} title={`Produkte in ${c.name}`} />
        </Reveal>
        <ul className="grid-cols-1 mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug}>
              <ProductCard p={p} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
