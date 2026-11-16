import { processSteps } from '@/data/process';

/** Dunkler Abschnitt „Von der Idee zum Betrieb“: die fünf Phasen aus den bestehenden Prozessdaten, ohne Scroll-Animation. */
export function Workflow() {
  return (
    <section id="prozess" className="bg-ink py-20 text-white sm:py-28">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="text-[.8rem] font-bold uppercase tracking-[.18em] text-ember">Ablauf</p>
          <h2 className="display-title mt-4 text-h2">Von der Idee zum <span className="serif-i">Betrieb.</span></h2>
          <p className="mt-5 max-w-2xl text-lead text-white/70">Fünf Phasen, klar getrennt: Sie wissen jederzeit, wo ein Projekt steht und was als Nächstes kommt.</p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.id} className="rounded-2xl border border-white/12 bg-white/[.04] p-6">
              <span className="display-title text-[2.6rem] leading-none text-ember">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display-h3 mt-6 text-[1.5rem]">{s.title}</h3>
              <p className="mt-3 text-[.95rem] leading-snug text-white/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
