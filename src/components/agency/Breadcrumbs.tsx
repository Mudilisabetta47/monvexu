import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Crumb } from '@/lib/agency-seo';

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[.68rem] uppercase tracking-[.14em] text-graphite">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="link-u transition-colors hover:text-ink">
                    {c.name}
                  </Link>
                  <ChevronRight size={12} aria-hidden className="opacity-50" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
