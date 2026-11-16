import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from './Breadcrumbs';
import type { Crumb } from '@/lib/agency-seo';

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  h1: string;
  lead: string;
  chips?: string[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  aside?: ReactNode;
};

/** Hero der Agentur-Seiten. Bewusst CSS-animiert (kein JS nötig): schneller LCP, saubere H1 im HTML. */
export function AgencyHero({ crumbs, eyebrow, h1, lead, chips, primary = { label: 'Unverbindlich anfragen', href: '#anfrage' }, secondary, aside }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute -right-[12%] -top-[28%] -z-10 aspect-square w-[min(62rem,95vw)] rounded-full bg-[radial-gradient(circle_at_30%_25%,#ff8a5c,#ff4a1c_55%,#c8340c)] opacity-90 shadow-[0_60px_140px_-40px_rgba(255,74,28,.65)]" />
      <div aria-hidden className="pointer-events-none absolute -right-[16%] -top-[34%] -z-10 aspect-square w-[min(70rem,105vw)] rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b0b0d_0%,#0b0b0d_38%,rgba(11,11,13,.55)_70%,rgba(11,11,13,.2)_100%)]" />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} dark />
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className={aside ? 'lg:col-span-7' : 'lg:col-span-10'}>
            <p className="eyebrow flex animate-rise items-center gap-3 !text-white/65">
              <span className="h-2 w-2 rounded-full bg-ember" />
              {eyebrow}
            </p>
            <h1 className="display-title mt-6 animate-rise text-[clamp(2.3rem,1.1rem+4vw,4.9rem)] leading-[.98] text-white [animation-delay:.08s]">{h1}</h1>
            <p className="mt-8 max-w-2xl animate-rise text-lead text-white/75 [animation-delay:.18s]">{lead}</p>
            {chips && chips.length > 0 && (
              <ul className="mt-8 flex animate-rise flex-wrap gap-2 [animation-delay:.26s]">
                {chips.map((c) => (
                  <li key={c} className="rounded-full border border-white/20 bg-white/[.08] px-4 py-2 text-[.85rem] text-white/85 backdrop-blur">
                    {c}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-10 flex animate-rise flex-wrap items-center gap-3 [animation-delay:.34s]">
              <Button href={primary.href} variant="light">{primary.label}</Button>
              {secondary && (
                <Button href={secondary.href} variant="secondary" className="!border-white/30 !bg-transparent !text-white hover:!bg-white hover:!text-ink">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
          {aside && <div className="animate-rise [animation-delay:.3s] lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
