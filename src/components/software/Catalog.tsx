'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Scale, Search, X } from 'lucide-react';
import { SwButton } from './SwButton';
import { SwIcon } from './icons';
import { IconTile, ProductCard, StatusBadge } from './SwUi';
import { audiences, categories, categoryBySlug, requestHref, softwareProducts, swPath, type Audience, type CategorySlug } from '@/data/software';
import { cn } from '@/lib/cn';

const MAX_COMPARE = 3;
/** Suchbegriffe, die in den Texten selbst nicht vorkommen (z. B. „KI“ für Artificial Intelligence). */
const SYNONYMS: Partial<Record<CategorySlug, string>> = {
  'kuenstliche-intelligenz': 'ki künstliche intelligenz artificial intelligence assistent automatisierung',
  'enterprise-loesungen': 'unternehmen konzern enterprise',
  'persoenliche-software': 'privat persönlich app',
  'business-software': 'unternehmen büro verwaltung',
};
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');

export function Catalog() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<CategorySlug | 'all'>('all');
  const [aud, setAud] = useState<Audience | 'all'>('all');
  const [cmp, setCmp] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Zustand aus der URL lesen (teilbare Links: ?q=…&kat=…&zg=…&vergleich=crm,finance)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setQ(p.get('q') ?? '');
    const k = p.get('kat');
    if (k && categories.some((c) => c.slug === k)) setCat(k as CategorySlug);
    const z = p.get('zg');
    if (z && audiences.includes(z as Audience)) setAud(z as Audience);
    const v = (p.get('vergleich') ?? '').split(',').filter((s) => softwareProducts.some((x) => x.slug === s)).slice(0, MAX_COMPARE);
    setCmp(v);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (cat !== 'all') p.set('kat', cat);
    if (aud !== 'all') p.set('zg', aud);
    if (cmp.length) p.set('vergleich', cmp.join(','));
    const s = p.toString();
    window.history.replaceState(null, '', s ? `?${s}` : window.location.pathname);
  }, [q, cat, aud, cmp, ready]);

  const results = useMemo(() => {
    const n = norm(q.trim());
    return softwareProducts.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false;
      if (aud !== 'all' && !p.audience.includes(aud)) return false;
      if (!n) return true;
      const hay = norm([p.name, p.tagline, p.summary, SYNONYMS[p.category] ?? '', p.features.map((f) => `${f.t} ${f.d}`).join(' '), p.useCases.map((u) => u.who).join(' '), p.integrations.join(' ')].join(' '));
      return n.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [q, cat, aud]);

  const toggle = (slug: string) => setCmp((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : c.length < MAX_COMPARE ? [...c, slug] : c));
  const picked = cmp.map((s) => softwareProducts.find((p) => p.slug === s)!).filter(Boolean);
  const reset = () => {
    setQ('');
    setCat('all');
    setAud('all');
  };

  return (
    <div>
      {/* Suche + Filter */}
      <div className="sw-card p-4 sm:p-5">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sw-mute" aria-hidden />
          <label htmlFor="sw-search" className="sr-only">
            Software suchen
          </label>
          <input id="sw-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Software suchen, z. B. Rechnung, Termin, KI, Fuhrpark" className="w-full rounded-full border border-sw-ink/12 bg-white py-3.5 pl-11 pr-11 text-[1rem] text-sw-ink outline-none transition focus:border-sw-indigo focus:ring-4 focus:ring-sw-indigo/10" />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Suche löschen" className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-sw-mute hover:bg-sw-soft">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Kategorie filtern" className="no-scrollbar flex gap-1.5 overflow-x-auto">
            <Chip on={cat === 'all'} onClick={() => setCat('all')}>
              Alle
            </Chip>
            {categories.map((c) => (
              <Chip key={c.slug} on={cat === c.slug} onClick={() => setCat(c.slug)} accent={c.accent}>
                <SwIcon name={c.icon} size={14} />
                {c.short === 'KI' ? 'KI' : c.name.replace(' Software', '').replace(' Solutions', '')}
              </Chip>
            ))}
          </div>
          <div role="group" aria-label="Zielgruppe filtern" className="no-scrollbar flex gap-1.5 overflow-x-auto">
            <Chip on={aud === 'all'} onClick={() => setAud('all')} small>
              Alle Zielgruppen
            </Chip>
            {audiences.map((a) => (
              <Chip key={a} on={aud === a} onClick={() => setAud(a)} small>
                {a}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-[.9rem] text-sw-mute" role="status" aria-live="polite">
        {results.length} von {softwareProducts.length} Konzepten
        {(q || cat !== 'all' || aud !== 'all') && (
          <button type="button" onClick={reset} className="ml-3 font-semibold text-sw-indigo hover:underline">
            Filter zurücksetzen
          </button>
        )}
      </p>

      <h2 className="sr-only">Software-Konzepte</h2>
      {results.length === 0 ? (
        <div className="sw-card mt-5 p-10 text-center">
          <h2 className="text-[1.4rem] font-semibold tracking-tight">Dazu gibt es noch kein Konzept.</h2>
          <p className="mx-auto mt-3 max-w-md text-sw-mute">Vielleicht ist genau das Ihr Vorhaben? Wir entwickeln Software auch individuell.</p>
          <div className="mt-6 flex justify-center">
            <SwButton href={requestHref('individuell')}>Individuelle Lösung anfragen</SwButton>
          </div>
        </div>
      ) : (
        <ul className="grid-cols-1 mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((p) => {
            const on = cmp.includes(p.slug);
            const full = !on && cmp.length >= MAX_COMPARE;
            return (
              <li key={p.slug}>
                <ProductCard
                  p={p}
                  actions={
                    <button type="button" onClick={() => toggle(p.slug)} aria-pressed={on} disabled={full} title={full ? `Maximal ${MAX_COMPARE} Produkte vergleichbar` : undefined} className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[.78rem] font-semibold transition-all disabled:opacity-40', on ? 'border-sw-indigo bg-sw-indigo text-white' : 'border-sw-ink/15 bg-white text-sw-text hover:border-sw-ink/40')}>
                      {on ? <Check size={14} /> : <Scale size={14} />}
                      {on ? 'Im Vergleich' : 'Vergleichen'}
                    </button>
                  }
                />
              </li>
            );
          })}
        </ul>
      )}

      {/* Vergleich */}
      {picked.length >= 2 && (
        <section id="vergleich" aria-labelledby="vergleich-h" className="mt-16 scroll-mt-28">
          <div className="flex items-end justify-between gap-4">
            <h2 id="vergleich-h" className="text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-semibold tracking-[-0.035em]">
              Vergleich
            </h2>
            <button type="button" onClick={() => setCmp([])} className="text-[.9rem] font-semibold text-sw-indigo hover:underline">
              Vergleich leeren
            </button>
          </div>
          <div className="sw-card mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-[.92rem]">
              <caption className="sr-only">Vergleich der ausgewählten Software-Konzepte</caption>
              <thead>
                <tr className="border-b border-sw-line">
                  <th scope="col" className="w-[150px] p-5 text-[.75rem] font-semibold uppercase tracking-[.1em] text-sw-mute">
                    Merkmal
                  </th>
                  {picked.map((p) => {
                    const c = categoryBySlug(p.category)!;
                    return (
                      <th key={p.slug} scope="col" className="p-5 align-top">
                        <div className="flex items-center gap-3">
                          <IconTile name={p.icon} accent={c.accent} size={38} icon={19} />
                          <Link href={swPath.product(p.slug)} className="text-[1.05rem] font-semibold text-sw-ink hover:underline">
                            {p.name}
                          </Link>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="[&_th]:align-top [&_td]:align-top">
                <Row label="Status" cells={picked.map((p) => <StatusBadge key={p.slug} />)} />
                <Row label="Kategorie" cells={picked.map((p) => categoryBySlug(p.category)!.name)} />
                <Row label="Zielgruppe" cells={picked.map((p) => p.audience.join(', '))} />
                <Row label="Kurz gesagt" cells={picked.map((p) => p.tagline)} />
                <Row
                  label="Kernfunktionen"
                  cells={picked.map((p) => (
                    <ul key={p.slug} className="space-y-1.5">
                      {p.features.slice(0, 4).map((f) => (
                        <li key={f.t} className="flex gap-2">
                          <Check size={15} className="mt-0.5 shrink-0 text-sw-indigo" aria-hidden />
                          {f.t}
                        </li>
                      ))}
                    </ul>
                  ))}
                />
                <Row label="Geplante Anbindungen" cells={picked.map((p) => p.integrations.slice(0, 5).join(', '))} />
                <Row label="Typischer Einsatz" cells={picked.map((p) => p.useCases[0].who)} />
                <Row
                  label="Nächster Schritt"
                  cells={picked.map((p) => (
                    <div key={p.slug} className="flex flex-col items-start gap-2">
                      <Link href={requestHref('demo', p.slug)} className="font-semibold text-sw-indigo hover:underline">
                        Demo anfragen
                      </Link>
                      <Link href={requestHref('angebot', p.slug)} className="font-semibold text-sw-indigo hover:underline">
                        Angebot erhalten
                      </Link>
                    </div>
                  ))}
                />
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Vergleichsleiste */}
      {cmp.length > 0 && (
        <div className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-sw-ink/10 bg-white/95 p-3 shadow-[0_24px_60px_-20px_rgba(12,16,36,.5)] backdrop-blur-xl sm:bottom-5">
          <Scale size={18} className="ml-1 shrink-0 text-sw-indigo" aria-hidden />
          <ul className="flex min-w-0 flex-1 flex-wrap gap-1.5">
            {picked.map((p) => (
              <li key={p.slug} className="inline-flex max-w-full items-center gap-1 rounded-full bg-sw-soft py-1 pl-3 pr-1 text-[.8rem] font-medium text-sw-ink">
                <span className="truncate">{p.name.replace('MONVEX ', '')}</span>
                <button type="button" onClick={() => toggle(p.slug)} aria-label={`${p.name} aus Vergleich entfernen`} className="grid h-6 w-6 place-items-center rounded-full hover:bg-sw-ink/10">
                  <X size={12} />
                </button>
              </li>
            ))}
          </ul>
          {cmp.length >= 2 ? (
            <a href="#vergleich" className="shrink-0 rounded-full bg-sw-ink px-4 py-2.5 text-[.85rem] font-semibold text-white">
              Vergleichen
            </a>
          ) : (
            <span className="shrink-0 pr-2 text-[.78rem] text-sw-mute">Noch eines wählen</span>
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ on, onClick, children, accent, small }: { on: boolean; onClick: () => void; children: React.ReactNode; accent?: string; small?: boolean }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-full border font-medium transition-all', small ? 'px-3 py-1.5 text-[.8rem]' : 'px-3.5 py-2 text-[.88rem]', on ? 'border-transparent bg-sw-ink text-white' : 'border-sw-ink/12 bg-white text-sw-text hover:border-sw-ink/35')} style={on && accent ? { background: accent } : undefined}>
      {children}
    </button>
  );
}

function Row({ label, cells }: { label: string; cells: React.ReactNode[] }) {
  return (
    <tr className="border-b border-sw-line last:border-0">
      <th scope="row" className="p-5 text-[.8rem] font-semibold text-sw-mute">
        {label}
      </th>
      {cells.map((c, i) => (
        <td key={i} className="p-5 text-sw-text">
          {c}
        </td>
      ))}
    </tr>
  );
}
