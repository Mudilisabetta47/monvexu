'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';
import { niches, packages, priceLabel } from '@/data/shops';
import { cn } from '@/lib/cn';
import { usePayments } from './usePayments';

type Status = 'idle' | 'sending' | 'success' | 'error';
const input = 'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[1rem] outline-none transition-colors focus:border-ink focus:ring-4 focus:ring-ink/5';
const L = ({ id, children, req }: { id: string; children: React.ReactNode; req?: boolean }) => (
  <label htmlFor={id} className="mb-1.5 block text-[.85rem] font-medium">{children}{req && <span className="text-ember"> *</span>}</label>
);

export function ShopOrderForm() {
  const [pkg, setPkg] = useState('plus');
  const [niche, setNiche] = useState('allgemein');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMsg, setServerMsg] = useState('');
  const [cancelled, setCancelled] = useState(false);
  const [inquiryPkg, setInquiryPkg] = useState('');
  const pay = usePayments();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = q.get('paket');
    const n = q.get('nische');
    if (q.get('abgebrochen')) setCancelled(true);
    if (p && packages.some((x) => x.id === p)) setPkg(p);
    if (n && niches.some((x) => x.id === n)) setNiche(n);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!fd.name?.trim()) next.name = 'Bitte nenn uns deinen Namen.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email ?? '')) next.email = 'Bitte gib eine gültige E-Mail-Adresse an.';
    if (!fd.shopname?.trim()) next.shopname = 'Wie soll dein Shop heißen (auch ein Arbeitstitel)?';
    if (!fd.consent) next.consent = 'Bitte stimme der Verarbeitung deiner Angaben zu.';
    if (!fd.terms) next.terms = 'Bitte bestätige, dass du den Leistungsumfang gelesen hast.';
    const willPay = pay.payments && packages.find((x) => x.id === pkg)?.price != null;
    if (willPay && !fd.legal) next.legal = 'Bitte bestätige AGB und Widerrufsbelehrung.';
    if (willPay && !fd.startnow) next.startnow = 'Bitte bestätige den Beginn der Ausführung vor Ablauf der Widerrufsfrist.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const p = packages.find((x) => x.id === pkg)!;
    const body = {
      paket: pkg, nische: niche, shopname: fd.shopname, name: fd.name, company: fd.company, email: fd.email, phone: fd.phone,
      products: fd.products, existing: fd.existing, message: fd.message, website: fd.website, consent: fd.consent, terms: fd.terms, legal: fd.legal, startnow: fd.startnow,
    };
    setStatus('sending');
    setServerMsg('');
    try {
      const res = await fetch('/api/shops/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const json = (await res.json().catch(() => ({}))) as { message?: string; mode?: 'pay' | 'inquiry'; url?: string };
      if (!res.ok) { setServerMsg(json.message ?? 'Das hat leider nicht geklappt. Bitte versuche es später erneut.'); setStatus('error'); return; }
      if (json.mode === 'pay' && json.url) { window.location.assign(json.url); return; }
      setInquiryPkg(p.name);
      setStatus('success');
      form.reset();
    } catch {
      setServerMsg('Keine Verbindung. Bitte prüfe dein Netz und versuche es erneut.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-3xl border border-line bg-white p-8 sm:p-12">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white"><Check size={26} /></span>
        <h2 className="mt-7 text-[1.8rem] font-semibold tracking-tight">Danke, deine Anfrage ist angekommen.</h2>
        <p className="mt-3 max-w-md text-graphite">Wir melden uns per E-Mail mit Bestätigung, Rechnung und offenen Fragen. Erst nach Bestätigung und Zahlung beginnt der Aufbau.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === 'sending'} className="relative space-y-8 rounded-3xl border border-line bg-white p-6 sm:p-9">
      {cancelled && <p role="status" className="rounded-xl bg-paper p-4 text-[.92rem]">Die Bezahlung wurde abgebrochen. Deine Angaben sind noch da, du kannst es jederzeit erneut versuchen.</p>}
      <fieldset>
        <legend className="mb-3 text-[.85rem] font-medium">Paket</legend>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {packages.map((p) => (
            <label key={p.id} className={cn('flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all', pkg === p.id ? 'border-ink bg-paper' : 'border-line hover:border-ink/40')}>
              <input type="radio" name="paket" value={p.id} checked={pkg === p.id} onChange={() => setPkg(p.id)} className="accent-[#0B0B0D]" />
              <span className="flex-1 font-semibold">{p.name}</span>
              <span className="text-graphite">{priceLabel(p)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <L id="sh-niche">Branche</L>
        <select id="sh-niche" value={niche} onChange={(e) => setNiche(e.target.value)} className={input}>
          {niches.map((n) => <option key={n.id} value={n.id}>{n.emoji} {n.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <L id="sh-shopname" req>Name deines Shops</L>
          <input id="sh-shopname" name="shopname" className={input} aria-invalid={!!errors.shopname} />
          {errors.shopname && <p role="alert" className="mt-1.5 text-[.82rem] text-ember-deep">{errors.shopname}</p>}
        </div>
        <div>
          <L id="sh-name" req>Dein Name</L>
          <input id="sh-name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} />
          {errors.name && <p role="alert" className="mt-1.5 text-[.82rem] text-ember-deep">{errors.name}</p>}
        </div>
        <div>
          <L id="sh-company">Unternehmen</L>
          <input id="sh-company" name="company" autoComplete="organization" className={input} />
        </div>
        <div>
          <L id="sh-email" req>E-Mail</L>
          <input id="sh-email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} />
          {errors.email && <p role="alert" className="mt-1.5 text-[.82rem] text-ember-deep">{errors.email}</p>}
        </div>
        <div>
          <L id="sh-phone">Telefon</L>
          <input id="sh-phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </div>
        <div>
          <L id="sh-products">Produkte als Tabelle vorhanden?</L>
          <select id="sh-products" name="products" defaultValue="" className={input}>
            <option value="">Bitte wählen</option>
            <option>Ja, vollständig</option>
            <option>Teilweise</option>
            <option>Noch nicht</option>
          </select>
        </div>
        <div>
          <L id="sh-existing">Website oder Instagram (optional)</L>
          <input id="sh-existing" name="existing" className={input} />
        </div>
        <div className="sm:col-span-2">
          <L id="sh-message">Was ist dir wichtig? (optional)</L>
          <textarea id="sh-message" name="message" rows={4} className={cn(input, 'resize-y')} />
        </div>
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="space-y-3 text-[.88rem] leading-snug text-graphite">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="terms" value="yes" aria-invalid={!!errors.terms} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#FF4A1C]" />
          <span>Ich habe gelesen, was enthalten ist und was nicht: Shopify-Tarif, Rechtstexte, Produkte und Domain sind nicht Teil des Pakets, und es gibt keine Umsatzgarantie.</span>
        </label>
        {errors.terms && <p role="alert" className="text-[.82rem] text-ember-deep">{errors.terms}</p>}
        {pay.payments && packages.find((x) => x.id === pkg)?.price != null && (
          <>
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" name="legal" value="yes" aria-invalid={!!errors.legal} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#FF4A1C]" />
              <span>Ich habe die <a href={pay.agbUrl} target="_blank" rel="noopener" className="font-medium text-ink underline underline-offset-2">AGB</a> und die <a href={pay.widerrufUrl} target="_blank" rel="noopener" className="font-medium text-ink underline underline-offset-2">Widerrufsbelehrung</a> gelesen und akzeptiere sie.</span>
            </label>
            {errors.legal && <p role="alert" className="text-[.82rem] text-ember-deep">{errors.legal}</p>}
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" name="startnow" value="yes" aria-invalid={!!errors.startnow} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#FF4A1C]" />
              <span>Ich verlange ausdrücklich, dass MONVEX vor Ablauf der Widerrufsfrist mit der Ausführung beginnt. Mir ist bekannt, dass ich mein Widerrufsrecht bei vollständiger Vertragserfüllung durch MONVEX verliere.</span>
            </label>
            {errors.startnow && <p role="alert" className="text-[.82rem] text-ember-deep">{errors.startnow}</p>}
          </>
        )}
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="consent" value="yes" aria-invalid={!!errors.consent} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#FF4A1C]" />
          <span>Ich habe die <Link href="/datenschutz" target="_blank" className="font-medium text-ink underline underline-offset-2">Datenschutzerklärung</Link> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Bestellung einverstanden.</span>
        </label>
        {errors.consent && <p role="alert" className="text-[.82rem] text-ember-deep">{errors.consent}</p>}
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-medium text-white transition-colors hover:bg-ember disabled:opacity-60">
          {status === 'sending' && <Loader2 size={18} className="animate-spin" aria-hidden />}
          {status === 'sending' ? 'Einen Moment …' : pay.payments && packages.find((x) => x.id === pkg)?.price != null ? `Jetzt bezahlen · ${priceLabel(packages.find((x) => x.id === pkg)!)}` : 'Anfrage absenden'}
        </button>
        {status === 'error' && <p role="alert" className="text-[.9rem] text-ember-deep">{serverMsg}</p>}
      </div>
    </form>
  );
}
