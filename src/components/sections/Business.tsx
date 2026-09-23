import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ScrollWords } from '@/components/ui/ScrollWords';
import { Reveal } from '@/components/ui/Reveal';

const AUDIENCE = [
  { t: 'Unternehmer', d: 'Gründer und Inhaber mit einem konkreten Vorhaben.' },
  { t: 'Unternehmen', d: 'Etablierte Häuser auf dem Weg in neue Geschäftsfelder.' },
  { t: 'Geschäftspartner', d: 'Verlässliche Zusammenarbeit auf Augenhöhe.' },
  { t: 'Marken', d: 'Identitäten, die wachsen und bestehen sollen.' },
  { t: 'Investoren', d: 'Klare Strukturen und ein langfristiger Blick.' },
  { t: 'Dienstleister', d: 'Partner für Umsetzung, Betrieb und Service.' },
  { t: 'Kooperationspartner', d: 'Gemeinsam neue Geschäftsmodelle aufbauen.' },
];

export function Business() {
  return (
    <section id="unternehmer" className="relative py-28 sm:py-40">
      <div className="shell">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-ember">05</span>
            <span className="h-px w-10 bg-ink/25" />
            Für Unternehmen
          </p>
        </Reveal>

        <ScrollWords
          className="mt-8 max-w-[1150px] text-[clamp(2.1rem,1rem+3.9vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
          text="Für Unternehmen, die *etwas bewegen* wollen. MONVEX entwickelt digitale Lösungen, Marken und Geschäftsmodelle mit einem klaren Fokus auf *langfristige Strukturen.*"
        />

        <Reveal className="mt-24">
          <p className="eyebrow mb-6">Wir sprechen mit</p>
        </Reveal>
        <Reveal className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((a, i) => (
            <div key={a.t} className="group relative bg-paper transition-colors duration-500 hover:bg-white">
              <div className="flex min-h-[210px] flex-col justify-between p-7">
                <span className="font-mono text-[.7rem] tracking-[.2em] text-mute">0{i + 1}</span>
                <div>
                  <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.035em] transition-transform duration-500 ease-out group-hover:-translate-y-1">{a.t}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[.92rem] leading-relaxed text-graphite opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100 [@media(hover:none)]:max-h-24 [@media(hover:none)]:opacity-100">
                    {a.d}
                  </p>
                </div>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ember transition-transform duration-700 ease-out group-hover:scale-x-100" />
            </div>
          ))}
          <div className="bg-ink text-white">
            <Link href="/#kontakt" data-cursor="Los" className="group flex h-full min-h-[210px] flex-col justify-between p-7 transition-colors duration-500 hover:bg-ember">
              <span className="font-mono text-[.7rem] tracking-[.2em] text-white/50">08</span>
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.035em]">Sprechen wir.</h3>
                <ArrowUpRight className="shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45" />
              </div>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
