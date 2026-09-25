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
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_30%,#000_30%,transparent_100%)]" />
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-ember/[.08] blur-[110px]" />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className={aside ? 'lg:col-span-7' : 'lg:col-span-10'}>
            <p className="eyebrow flex animate-rise items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-ember" />
              {eyebrow}
            </p>
            <h1 className="mt-6 animate-rise text-[clamp(2.3rem,1.1rem+4vw,4.9rem)] font-semibold leading-[.96] tracking-[-0.05em] [animation-delay:.08s]">{h1}</h1>
            <p className="mt-8 max-w-2xl animate-rise text-lead text-graphite [animation-delay:.18s]">{lead}</p>
            {chips && chips.length > 0 && (
              <ul className="mt-8 flex animate-rise flex-wrap gap-2 [animation-delay:.26s]">
                {chips.map((c) => (
                  <li key={c} className="rounded-full border border-line bg-white/70 px-4 py-2 text-[.85rem] text-graphite backdrop-blur">
                    {c}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-10 flex animate-rise flex-wrap items-center gap-3 [animation-delay:.34s]">
              <Button href={primary.href}>{primary.label}</Button>
              {secondary && (
                <Button href={secondary.href} variant="secondary">
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
