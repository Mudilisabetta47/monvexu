'use client';

import Link from 'next/link';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { brands, brandStatusLabel, brandTypeLabel } from '@/data/brands';
import { AGENCY_BASE, agencyServices, industries, industryPath, servicePath } from '@/data/agency';
import { legal, type MegaId } from '@/data/site';
import { BrandLogo } from '@/components/brands/BrandLogo';
import { Button } from '@/components/ui/Button';

type PanelProps = { onNavigate: () => void };

const rise = (i: number) => ({ animationDelay: `${60 + i * 45}ms` });

function Col({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center justify-between border-b border-line pb-3 font-mono text-[.66rem] uppercase tracking-[.18em] text-graphite">
        {title}
        {href && (
          <Link href={href} className="link-u flex items-center gap-1 text-ink">
            Alle <ArrowUpRight size={12} />
          </Link>
        )}
      </p>
      <ul className="mt-3 grid gap-0.5">{children}</ul>
    </div>
  );
}

function Item({ href, children, hint, onNavigate, i }: { href: string; children: React.ReactNode; hint?: string; onNavigate: () => void; i: number }) {
  return (
    <li className="animate-rise" style={rise(i)}>
      <Link href={href} onClick={onNavigate} className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[.94rem] font-medium tracking-tight transition-colors hover:bg-paper">
        <span>{children}</span>
        <span className="flex items-center gap-2">
          {hint && <span className="hidden text-[.74rem] font-normal text-mute xl:inline">{hint}</span>}
          <ArrowUpRight size={14} className="text-mute opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:text-ember group-hover:opacity-100" />
        </span>
      </Link>
    </li>
  );
}

/** Mega-Menü „Brands“: die Marken als farbige Karten – automatisch aus data/brands.ts. */
function BrandsPanel({ onNavigate }: PanelProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3 lg:grid-cols-4">
        {brands.map((b, i) => (
          <Link
            key={b.slug}
            href={`/brands/${b.slug}`}
            onClick={onNavigate}
            className="group relative flex min-h-[188px] animate-rise flex-col justify-between overflow-hidden rounded-[22px] p-5 shadow-card ring-1 ring-black/5 transition-transform duration-500 ease-out hover:-translate-y-1"
            style={{ background: `linear-gradient(150deg, ${b.theme.bg}, ${b.theme.bg2})`, color: b.theme.fg, ...rise(i) }}
          >
            <span aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80" style={{ background: b.theme.accent }} />
            <div className="relative flex items-start justify-between gap-2">
              <BrandLogo brand={b} className="[&>span:first-child]:!h-8 [&>span:first-child]:!w-8" />
              <span className="rounded-full border px-2.5 py-1 font-mono text-[.58rem] uppercase tracking-[.14em]" style={{ borderColor: `${b.theme.fg}33`, color: b.theme.muted }}>
                {brandStatusLabel[b.status]}
              </span>
            </div>
            <div className="relative">
              <p className="font-mono text-[.6rem] uppercase tracking-[.16em]" style={{ color: b.theme.accent }}>
                {b.category}
              </p>
              <p className="mt-1.5 text-[1.12rem] font-semibold leading-tight tracking-[-0.03em]">{b.tagline}</p>
              <p className="mt-3 flex items-center justify-between text-[.74rem]" style={{ color: b.theme.muted }}>
                {brandTypeLabel[b.type]}
                <span className="grid h-8 w-8 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45" style={{ background: b.theme.accent, color: b.theme.bg }}>
                  <ArrowUpRight size={15} />
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-[.9rem]">
        <p className="text-graphite">Eigene und geführte Marken unter einer Dachmarke. Das Portfolio wächst.</p>
        <div className="flex items-center gap-5 font-medium">
          <Link href="/#dachmarke" onClick={onNavigate} className="link-u">
            Die Dachmarke
          </Link>
          <Link href="/#projects" onClick={onNavigate} className="link-u">
            Selected Work
          </Link>
          <Link href="/brands" onClick={onNavigate} className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-white transition-colors hover:bg-ember">
            Alle Marken entdecken <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Mega-Menü „Werbeagentur“: Leistungen + Branchen + Website-Check – automatisch aus data/agency. */
function AgencyPanel({ onNavigate }: PanelProps) {
  const phone = legal.phone;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr_.95fr]">
      <Col title="Leistungen" href={`${AGENCY_BASE}/leistungen`}>
        {agencyServices.map((s, i) => (
          <Item key={s.slug} href={servicePath(s.slug)} onNavigate={onNavigate} i={i}>
            {s.name}
          </Item>
        ))}
      </Col>

      <Col title="Branchen" href={`${AGENCY_BASE}/branchen`}>
        {industries.map((ind, i) => (
          <Item key={ind.slug} href={industryPath(ind)} onNavigate={onNavigate} i={i}>
            {ind.name}
          </Item>
        ))}
      </Col>

      <div className="relative flex animate-rise flex-col justify-between overflow-hidden rounded-[24px] bg-ink p-6 text-white shadow-lift" style={rise(2)}>
        <span aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-ember/45 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ember px-3 py-1.5 font-mono text-[.6rem] font-medium uppercase tracking-[.16em]">
            <Sparkles size={11} /> Kostenlos · KI
          </span>
          <p className="mt-5 text-[1.9rem] font-semibold leading-[.98] tracking-[-0.05em]">
            Website-<span className="serif-i text-ember">Check</span>
          </p>
          <p className="mt-3 text-[.9rem] leading-snug text-white/75">Adresse eingeben, 30 Sekunden warten: Punktzahl, Auswertung und drei konkrete Verbesserungen.</p>
          <ul className="mt-4 grid gap-1.5 text-[.84rem] text-white/85">
            {['Technik & Tempo', 'Mobil & SEO', 'Vertrauen & Kontakt'].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check size={13} className="text-ember" /> {t}</li>
            ))}
          </ul>
        </div>
        <div className="relative mt-6 grid gap-3">
          <Button href="/website-check" variant="light" magnetic={false} className="w-full justify-between">
            Jetzt prüfen
          </Button>
          <Link href="/check" onClick={onNavigate} className="text-center text-[.86rem] text-white/75 transition-colors hover:text-white">
            oder <span className="link-u font-medium text-white">persönlichen Check anfordern</span>
          </Link>
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-center text-[.82rem] text-white/60 transition-colors hover:text-white">
              {phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function MegaPanel({ id, onNavigate }: { id: MegaId } & PanelProps) {
  return id === 'brands' ? <BrandsPanel onNavigate={onNavigate} /> : <AgencyPanel onNavigate={onNavigate} />;
}
