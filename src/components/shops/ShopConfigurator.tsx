'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { ShopPreview } from './ShopPreview';
import { niches, packages, priceLabel, upgradeNote } from '@/data/shops';
import { cn } from '@/lib/cn';
import { usePayments } from './usePayments';

/** Produkt-Konfigurator: Paket wählen, Branche wählen, Zusammenfassung, Bestell-Link (Bestellung läuft über das Formular). */
export function ShopConfigurator() {
  const [pkgId, setPkgId] = useState<string>('plus');
  const [nicheId, setNicheId] = useState<string>('beauty');
  const pay = usePayments();
  const pkg = packages.find((p) => p.id === pkgId)!;
  const niche = niches.find((n) => n.id === nicheId)!;
  const href = `/shops/bestellen?paket=${pkg.id}&nische=${niche.id}`;
  const cta = pkg.price == null ? 'Gespräch anfragen' : `${pkg.name} für ${niche.name} bestellen`;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      {/* Vorschau */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink p-5 sm:p-8">
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember/30 blur-3xl" />
          <p className="relative mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[.8rem] font-medium text-ink">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Beispiel-Vorschau · Platzhalter-Marke
          </p>
          <div className="relative">
            <ShopPreview niche={nicheId} />
            <div className="absolute -bottom-3 right-3 w-[26%] sm:right-6">
              <ShopPreview niche={nicheId} compact className="rounded-[14px] border-4 border-ink !shadow-xl" />
            </div>
          </div>
          <p className="relative mt-8 text-[.82rem] leading-relaxed text-white/60">
            So sieht die Vorlage für <strong className="text-white">{niche.name}</strong> im Aufbau aus. Marke, Farben und Produkte setzen wir je nach Paket für dich ein.
          </p>
        </div>
      </div>

      {/* Auswahl */}
      <div>
        <h1 className="text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[.98] tracking-[-0.05em]">
          Dein fertiger <span className="serif-i text-ember">Shopify-Shop.</span>
        </h1>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-graphite">Wir bauen deinen Shop nach der Vorlage deiner Branche und übergeben ihn auf deinen Namen, mit Anleitung für die nächsten Schritte.</p>
        <ul className="mt-6 space-y-2.5 text-[.98rem]">
          {['Einmal zahlen für den Aufbau, kein Abo bei uns', 'Der Shop gehört dir, voller Admin-Zugriff', 'Keine Shopify-Erfahrung nötig'].map((t) => (
            <li key={t} className="flex items-center gap-2.5"><Check size={18} className="text-ember" aria-hidden /> {t}</li>
          ))}
        </ul>

        <fieldset className="mt-10">
          <legend className="text-[1.15rem] font-semibold tracking-tight"><span className="mr-2 font-mono text-[.8rem] text-ember">1</span>Paket wählen</legend>
          <div className="mt-4 space-y-2.5">
            {packages.map((p) => (
              <label key={p.id} className={cn('flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all sm:p-5', pkgId === p.id ? 'border-ink bg-white shadow-[0_14px_40px_-20px_rgba(0,0,0,.35)]' : 'border-line bg-white/60 hover:border-ink/40')}>
                <input type="radio" name="paket" value={p.id} checked={pkgId === p.id} onChange={() => setPkgId(p.id)} className="h-[18px] w-[18px] accent-[#0B0B0D]" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-semibold">{p.name}{p.highlight && <span className="rounded-full bg-ember px-2 py-0.5 font-mono text-[.58rem] uppercase tracking-wider text-white">Unser Tipp</span>}</span>
                  <span className="block text-[.86rem] text-graphite">{p.tagline}</span>
                </span>
                <span className="text-right">
                  <span className="block text-[1.25rem] font-semibold tracking-tight">{priceLabel(p)}</span>
                  <span className="block text-[.7rem] text-mute">{p.price == null ? 'nach Gespräch' : 'einmalig, kein Abo'}</span>
                  {upgradeNote(p) && <span className="block text-[.72rem] font-medium text-ember-deep">{upgradeNote(p)}</span>}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-3 rounded-2xl bg-white p-5">
            <p className="font-mono text-[.68rem] uppercase tracking-[.16em] text-graphite">In {pkg.name} enthalten</p>
            <ul className="mt-3 space-y-2 text-[.93rem]">
              {pkg.includes.map((i) => (
                <li key={i} className="flex gap-2.5"><Check size={16} className="mt-0.5 shrink-0 text-ember" aria-hidden /> {i}</li>
              ))}
            </ul>
            <p className="mt-4 text-[.86rem] text-graphite">{pkg.forWho}</p>
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-[1.15rem] font-semibold tracking-tight"><span className="mr-2 font-mono text-[.8rem] text-ember">2</span>Branche wählen</legend>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {niches.map((n) => (
              <button key={n.id} type="button" aria-pressed={nicheId === n.id} onClick={() => setNicheId(n.id)} className={cn('flex items-center gap-2 rounded-xl border-2 px-3 py-3 text-left text-[.9rem] font-medium transition-all', nicheId === n.id ? 'border-ink bg-white' : 'border-line bg-white/60 hover:border-ink/40')}>
                <span aria-hidden>{n.emoji}</span> {n.name}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[.85rem] text-graphite">Deine Branche fehlt? Nimm „Allgemeiner Shop“ und beschreib uns dein Vorhaben.</p>
        </fieldset>

        <div className="mt-10 rounded-2xl border border-line bg-white p-5" aria-live="polite">
          <dl className="space-y-2 text-[.95rem]">
            <div className="flex justify-between"><dt className="text-graphite">Paket</dt><dd className="font-semibold">{pkg.name}</dd></div>
            <div className="flex justify-between"><dt className="text-graphite">Branche</dt><dd className="font-semibold">{niche.emoji} {niche.name}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-[1.1rem]"><dt className="font-semibold">Gesamt</dt><dd className="font-semibold">{priceLabel(pkg)}</dd></div>
          </dl>
          <p className="mt-3 text-[.8rem] leading-relaxed text-mute">{pkg.price == null ? 'Preis nach Gespräch.' : 'Einmalzahlung, inkl. MwSt.'} Der Shopify-Tarif ist nicht enthalten. {pay.payments && pkg.price != null ? 'Du bezahlst sicher online über Stripe, die Rechnung kommt per E-Mail.' : 'Bezahlt wird nach unserer Bestätigung per Rechnung.'}</p>
          <Link href={href} className="mt-5 block rounded-full bg-ink px-6 py-4 text-center text-[1rem] font-medium text-white transition-colors hover:bg-ember">{cta}</Link>
        </div>
      </div>

      {/* Sticky Kaufleiste (mobil) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-line bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[.78rem] text-graphite">{pkg.name} · {niche.name}</p>
          <p className="text-[1.15rem] font-semibold tracking-tight">{priceLabel(pkg)}</p>
        </div>
        <Link href={href} className="shrink-0 rounded-full bg-ink px-6 py-3 text-[.95rem] font-medium text-white">{pkg.price == null ? 'Anfragen' : 'Bestellen'}</Link>
      </div>
    </div>
  );
}
