'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, projectKindLabel, type Project, type ProjectKind } from '@/data/projects';
import { getBrand } from '@/data/brands';
import { BrandArt } from '@/components/brands/BrandArt';
import { BrandLogo } from '@/components/brands/BrandLogo';
import { Tilt } from '@/components/ui/Tilt';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';

const KIND_TEXT: Record<ProjectKind, string> = {
  'own-brand': 'Von MONVEX entwickelt und gehalten.',
  'managed-brand': 'Von MONVEX aufgebaut und geführt.',
  project: 'Eigene digitale Produkte und Initiativen.',
  client: 'Umsetzung im Auftrag Dritter.',
};

function WorkCard({ p, i, total }: { p: Project; i: number; total: number }) {
  const brand = getBrand(p.brandSlug);
  const ref = useRef<HTMLDivElement>(null);
  // Beim Ueberdecken durch die naechste Karte schrumpft und dunkelt diese leicht ab.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, i === total - 1 ? 1 : 0.92]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, i === total - 1 ? 0 : 0.35]);
  if (!brand) return null;
  const t = brand.theme;

  return (
    <div ref={ref} className="sticky mb-6 sm:mb-10" style={{ top: `calc(84px + ${i * 22}px)` }}>
      <m.div style={{ scale }} className="origin-top">
        <Tilt max={2.5} glare={false} className="rounded-[32px]">
          <Link
            href={`/brands/${brand.slug}`}
            data-cursor="Ansehen"
            className="group relative grid overflow-hidden rounded-[32px] shadow-lift ring-1 ring-black/5 lg:min-h-[520px] lg:grid-cols-12"
            style={{ background: t.bg, color: t.fg }}
          >
            <div className="relative z-10 flex flex-col justify-between gap-12 p-7 sm:p-10 lg:col-span-5 lg:p-12">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[.7rem] tracking-[.2em]" style={{ color: t.muted }}>
                  0{i + 1} / 0{total}
                </span>
                <span className="rounded-full border px-3 py-1.5 font-mono text-[.64rem] uppercase tracking-[.16em]" style={{ borderColor: `${t.fg}33`, color: t.accent }}>
                  {projectKindLabel[p.kind]}
                </span>
              </div>
              <div>
                <BrandLogo brand={brand} />
                <h3 className="mt-6 text-[clamp(2.4rem,1.5rem+3vw,4.6rem)] font-semibold leading-[.92] tracking-[-0.05em]">{p.title}</h3>
                <p className="mt-3 font-mono text-[.7rem] uppercase tracking-[.16em]" style={{ color: t.accent }}>
                  {p.scope}
                </p>
                <p className="mt-5 max-w-sm leading-relaxed" style={{ color: t.muted }}>
                  {p.summary}
                </p>
                <span className="mt-8 inline-flex items-center gap-3 text-[.95rem] font-medium">
                  Markenwelt öffnen
                  <span className="grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 ease-out group-hover:rotate-45" style={{ background: t.accent, color: t.bg }}>
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </div>
            </div>
            <div className="relative min-h-[260px] overflow-hidden lg:col-span-7">
              <BrandArt brand={brand} className="absolute inset-0 h-full w-full scale-110 transition-transform duration-[1400ms] ease-out group-hover:scale-125" />
              <div className="absolute inset-0 hidden lg:block" style={{ background: `linear-gradient(90deg, ${t.bg} 0%, transparent 35%)` }} />
            </div>
            <m.span aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-black" />
          </Link>
        </Tilt>
      </m.div>
    </div>
  );
}

export function SelectedWork() {
  const kinds = Object.keys(projectKindLabel) as ProjectKind[];
  return (
    <section id="projects" className="relative bg-white py-28 sm:py-40">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <SectionHead index="06" label="Projekte" title={'Selected\n*Work*'}>
          Projekte und digitale Produkte – sauber getrennt nach ihrer Beziehung zu MONVEX.
        </SectionHead>

        <Reveal className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {kinds.map((k) => {
            const count = projects.filter((p) => p.kind === k).length;
            return (
              <div key={k} className="flex items-start justify-between gap-4 bg-white p-6">
                <div>
                  <p className="text-[.98rem] font-semibold tracking-tight">{projectKindLabel[k]}</p>
                  <p className="mt-1 text-[.85rem] leading-snug text-graphite">{KIND_TEXT[k]}</p>
                </div>
                <span className="font-mono text-[.8rem] text-ember-deep">{count ? String(count).padStart(2, '0') : '—'}</span>
              </div>
            );
          })}
        </Reveal>

        <div className="relative mt-16">
          {projects.map((p, i) => (
            <WorkCard key={p.slug} p={p} i={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
