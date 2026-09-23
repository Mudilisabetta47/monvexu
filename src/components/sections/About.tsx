import { company } from '@/data/site';
import { SplitText } from '@/components/ui/SplitText';
import { Reveal } from '@/components/ui/Reveal';

const FACTS = [
  { k: 'Sitz', v: 'Bremen', s: 'Deutschland' },
  { k: 'Gründung', v: company.founded, s: 'Ein Unternehmen mit langem Atem' },
  { k: 'Rechtsform', v: 'UG', s: company.legalForm },
];

const FOCUS = ['Digitalisierung', 'Technologie', 'Markenentwicklung', 'Langfristige Strukturen'];

export function About() {
  return (
    <section id="unternehmen" className="relative overflow-hidden bg-white py-28 sm:py-40">
      <div className="hairline absolute inset-x-0 top-0" />
      <span aria-hidden className="outline-text pointer-events-none absolute -right-6 top-10 select-none font-semibold leading-none tracking-[-0.07em] text-ink/[.09]" style={{ fontSize: 'clamp(9rem,26vw,28rem)', WebkitTextStroke: '1.5px currentColor' }}>
        2026
      </span>
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-ember">08</span>
            <span className="h-px w-10 bg-ink/25" />
            Über MONVEX
          </p>
        </Reveal>
        <SplitText text={'Built for the\n*long term.*'} className="mt-6 text-h2 font-semibold" />

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[1.05rem] font-semibold tracking-tight">{company.legalName}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lead text-graphite">
                MONVEX entwickelt und betreibt digitale Geschäftsmodelle, Marken und Dienstleistungen. Der Fokus liegt auf Digitalisierung, Technologie, Markenentwicklung und dem Aufbau langfristiger Strukturen.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {FOCUS.map((f) => (
                  <li key={f} className="rounded-full border border-line bg-paper px-4 py-2 text-[.85rem] text-graphite">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <dl className="lg:col-span-7 lg:col-start-6">
            {FACTS.map((f, i) => (
              <Reveal key={f.k} delay={i * 0.1} className="group border-t border-line py-8 last:border-b">
                <div className="grid items-baseline gap-2 sm:grid-cols-[180px_1fr]">
                  <dt className="font-mono text-eyebrow uppercase text-graphite">{f.k}</dt>
                  <dd className="transition-transform duration-500 ease-out group-hover:translate-x-2">
                    <span className="block text-[clamp(2.4rem,1.4rem+3.6vw,4.8rem)] font-semibold leading-none tracking-[-0.055em]">{f.v}</span>
                    <span className="mt-2 block text-graphite">{f.s}</span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
