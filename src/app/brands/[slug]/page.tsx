import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { brands, brandStatusLabel, brandTypeLabel, getBrand } from '@/data/brands';
import { BrandArt } from '@/components/brands/BrandArt';
import { BrandLogo } from '@/components/brands/BrandLogo';
import { BrandCard } from '@/components/brands/BrandCard';
import { SplitText } from '@/components/ui/SplitText';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/Tilt';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  return {
    title: `${b.name} – ${b.category}`,
    description: `${b.name}: ${b.description} Eine Marke aus dem MONVEX Portfolio.`,
    alternates: { canonical: `/brands/${b.slug}` },
    openGraph: { title: `${b.name} | MONVEX`, description: b.description },
  };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) notFound();
  const t = b.theme;
  const others = brands.filter((x) => x.slug !== b.slug).slice(0, 2);

  return (
    <>
      {/* Markenwelt: Vollflaeche in der Farbwelt der Marke */}
      <section className="relative isolate overflow-hidden" style={{ background: t.bg, color: t.fg }}>
        <Tilt max={1.5} glare={false} className="absolute inset-0 -z-10">
          <BrandArt brand={b} className="h-full w-full scale-[1.25] origin-right opacity-90 md:scale-[1.05]" />
        </Tilt>
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(90deg, ${t.bg} 8%, ${t.bg}cc 42%, transparent 80%), linear-gradient(to top, ${t.bg} 0%, transparent 35%)` }} />

        <div className="shell flex min-h-[92svh] flex-col justify-end pb-16 pt-40 sm:pb-24">
          <Reveal>
            <Link href="/brands" className="link-u inline-flex items-center gap-2 font-mono text-[.7rem] uppercase tracking-[.18em]" style={{ color: t.muted }}>
              <ArrowLeft size={14} /> Alle Marken
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <BrandLogo brand={b} />
          </Reveal>
          <SplitText as="h1" immediate delay={0.2} text={b.name} className="mt-6 max-w-5xl text-[clamp(3.2rem,1rem+9vw,10rem)] font-semibold leading-[.88] tracking-[-0.06em]" />
          <Reveal delay={0.5} className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border px-4 py-2 font-mono text-[.68rem] uppercase tracking-[.16em] backdrop-blur" style={{ borderColor: `${t.fg}33`, color: t.accent }}>
              {b.category}
            </span>
            <span className="rounded-full border px-4 py-2 font-mono text-[.68rem] uppercase tracking-[.16em]" style={{ borderColor: `${t.fg}33`, color: t.muted }}>
              {brandTypeLabel[b.type]}
            </span>
            <span className="rounded-full border px-4 py-2 font-mono text-[.68rem] uppercase tracking-[.16em]" style={{ borderColor: `${t.fg}33`, color: t.muted }}>
              {brandStatusLabel[b.status]}
            </span>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-36">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Die Marke</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-[clamp(1.8rem,1.1rem+2.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.04em]">{b.tagline}</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-lead text-graphite">{b.description}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              {b.website ? (
                <a
                  href={b.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 font-medium transition-transform duration-500 ease-out hover:-translate-y-0.5"
                  style={{ background: t.bg, color: t.fg }}
                >
                  Website besuchen
                  <span className="grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 ease-out group-hover:rotate-45" style={{ background: t.accent, color: t.bg }}>
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              ) : (
                <p className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-[.92rem] text-graphite">
                  <span className="h-2 w-2 rounded-full" style={{ background: t.accent }} /> Website folgt
                </p>
              )}
            </Reveal>
          </div>

          <ul className="grid gap-4 lg:col-span-5">
            {b.highlights.map((h, i) => (
              <Reveal as="li" key={h} delay={i * 0.1}>
                <div className="flex items-center justify-between rounded-3xl p-6 shadow-card" style={{ background: t.bg, color: t.fg }}>
                  <span className="text-[1.2rem] font-semibold tracking-tight">{h}</span>
                  <span className="font-mono text-[.7rem] tracking-[.18em]" style={{ color: t.accent }}>
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-line bg-white py-24 sm:py-32">
          <div className="shell">
            <Reveal>
              <p className="eyebrow">Weitere Marken</p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {others.map((o, i) => (
                <BrandCard key={o.slug} brand={o} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
