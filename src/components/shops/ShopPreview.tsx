import { nichePreview } from '@/data/shops';
import { cn } from '@/lib/cn';

/**
 * Beispiel-Vorschau eines Shops: reine CSS-Darstellung mit Platzhalter-Marke „Deine Marke“ und Platzhalter-Produkten.
 * Keine echten Marken, Produkte oder Kundenshops. Immer mit dem Hinweis „Beispiel-Vorschau“ verwenden.
 */
export function ShopPreview({ niche, className, compact }: { niche: string; className?: string; compact?: boolean }) {
  const v = nichePreview[niche] ?? nichePreview.allgemein;
  return (
    <div className={cn('overflow-hidden rounded-xl border border-black/10 bg-white text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)]', className)} style={{ background: v.bg, color: v.ink }} aria-hidden>
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-white/70 px-3 py-2">
        <i className="h-2 w-2 rounded-full bg-black/15" />
        <i className="h-2 w-2 rounded-full bg-black/15" />
        <i className="h-2 w-2 rounded-full bg-black/15" />
        <span className="ml-2 h-4 flex-1 rounded-full bg-black/5" />
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-[.62rem] font-semibold uppercase tracking-[.14em]">
        <span>Deine Marke</span>
        <span className="flex gap-3 opacity-60">{v.cats.slice(0, compact ? 2 : 4).map((c) => <span key={c}>{c}</span>)}</span>
      </div>
      <div className="mx-4 rounded-lg px-5 py-6" style={{ background: `linear-gradient(120deg, ${v.accent}, color-mix(in srgb, ${v.accent} 55%, ${v.bg}))`, color: '#fff' }}>
        <p className="text-[.55rem] font-semibold uppercase tracking-[.18em] opacity-80">Neu</p>
        <p className="mt-1 text-[1.15rem] font-semibold leading-tight tracking-tight">{v.headline}</p>
        <span className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-[.55rem] font-semibold uppercase tracking-wider" style={{ color: v.ink }}>Entdecken</span>
      </div>
      <div className="grid grid-cols-4 gap-2 px-4 pb-4 pt-3">
        {[0, 1, 2, 3].slice(0, compact ? 2 : 4).map((i) => (
          <div key={i} className={cn(compact && 'col-span-2')}>
            <div className="aspect-[4/5] rounded-md" style={{ background: `color-mix(in srgb, ${v.accent} ${14 + i * 9}%, #fff)` }} />
            <p className="mt-1.5 text-[.55rem] font-semibold">Produkt {i + 1}</p>
            <p className="text-[.55rem] opacity-60">{(19.9 + i * 10).toFixed(2).replace('.', ',')} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}
