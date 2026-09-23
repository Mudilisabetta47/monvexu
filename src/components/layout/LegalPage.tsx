import type { ReactNode } from 'react';
import { SplitText } from '@/components/ui/SplitText';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="relative pb-28 pt-36 sm:pb-40 sm:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="shell">
        <p className="eyebrow">Rechtliches</p>
        <SplitText as="h1" immediate text={title} className="mt-6 text-[clamp(2.8rem,1.2rem+7vw,7.5rem)] font-semibold leading-[.9] tracking-[-0.055em]" />
        <div className="mt-16 max-w-3xl space-y-12 text-[1.02rem] leading-relaxed text-graphite [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:text-[1.25rem] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mb-1 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </section>
  );
}

/** Markiert eine noch fehlende Pflichtangabe sichtbar, statt etwas zu erfinden. */
export function Missing({ what, value }: { what: string; value?: string }) {
  if (value) return <>{value}</>;
  return (
    <span className="rounded-md bg-ember/10 px-2 py-0.5 font-mono text-[.8rem] text-ember-deep">
      [{what} – bitte in src/data/site.ts ergänzen]
    </span>
  );
}
