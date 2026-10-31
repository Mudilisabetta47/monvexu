import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SwIcon } from './icons';
import { categoryBySlug, statusInfo, swPath, type SoftwareProduct } from '@/data/software';
import { cn } from '@/lib/cn';

export function SwHead({ eyebrow, title, children, center, className, h1 }: { eyebrow: string; title: ReactNode; children?: ReactNode; center?: boolean; className?: string; h1?: boolean }) {
  const H = h1 ? 'h1' : 'h2';
  return (
    <div className={cn(center && 'mx-auto text-center', 'max-w-3xl', className)}>
      <p className="sw-eyebrow">{eyebrow}</p>
      <H className="mt-4 text-[clamp(2rem,1.2rem+2.8vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em]">{title}</H>
      {children && <p className={cn('mt-5 text-[1.05rem] leading-relaxed text-sw-mute', center && 'mx-auto')}>{children}</p>}
    </div>
  );
}

export function StatusBadge({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[.66rem] font-semibold uppercase tracking-[.1em]', light ? 'border-white/30 bg-white/15 text-white' : 'border-sw-line bg-white text-sw-mute', className)} title={statusInfo.concept.detail}>
      <i className="h-1.5 w-1.5 rounded-full bg-sw-indigo" aria-hidden />
      {statusInfo.concept.label}
    </span>
  );
}

export function IconTile({ name, accent, size = 44, icon = 22 }: { name: string; accent: string; size?: number; icon?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-2xl" style={{ width: size, height: size, background: `color-mix(in srgb, ${accent} 12%, #fff)`, color: accent }}>
      <SwIcon name={name} size={icon} />
    </span>
  );
}

export function ProductCard({ p, actions }: { p: SoftwareProduct; actions?: ReactNode }) {
  const cat = categoryBySlug(p.category)!;
  return (
    <article className="sw-card sw-card-hover group relative flex h-full flex-col p-6" style={{ ['--c' as string]: cat.accent }}>
      <div className="flex items-start justify-between gap-3">
        <IconTile name={p.icon} accent={cat.accent} />
        <StatusBadge />
      </div>
      <h3 className="mt-5 text-[1.22rem] font-semibold tracking-[-0.025em]">
        <Link href={swPath.product(p.slug)} className="after:absolute after:inset-0 after:content-['']">
          {p.name}
        </Link>
      </h3>
      <p className="mt-2 text-[.95rem] leading-relaxed text-sw-mute">{p.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-full px-2.5 py-1 text-[.7rem] font-medium" style={{ background: `color-mix(in srgb, ${cat.accent} 10%, #fff)`, color: cat.accent }}>
          {cat.name}
        </span>
        {p.audience.map((a) => (
          <span key={a} className="rounded-full bg-sw-soft px-2.5 py-1 text-[.7rem] font-medium text-sw-mute">
            {a}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="inline-flex items-center gap-1 text-[.9rem] font-semibold" style={{ color: cat.accent }}>
          Details <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
        {actions && <div className="relative z-10">{actions}</div>}
      </div>
    </article>
  );
}

export function FaqList({ items, accent }: { items: { q: string; a: string }[]; accent?: string }) {
  return (
    <div className="divide-y divide-sw-line rounded-3xl border border-sw-line bg-white px-6 sm:px-8">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-semibold text-sw-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sw-soft text-lg leading-none transition-transform duration-300 group-open:rotate-45" style={accent ? { color: accent } : undefined} aria-hidden>
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl pr-10 text-[.98rem] leading-relaxed text-sw-mute">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
