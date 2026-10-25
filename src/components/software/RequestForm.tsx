'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';
import { requestKinds, softwareProducts, categories, type RequestKind } from '@/data/software';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

const input = 'w-full rounded-xl border border-sw-ink/15 bg-white px-4 py-3 text-[1rem] text-sw-ink outline-none transition-colors placeholder:text-sw-mute/60 focus:border-sw-indigo focus:ring-4 focus:ring-sw-indigo/10';
const sizes = ['Privatperson', 'Einzelunternehmen / bis 10 Personen', '11 bis 250 Personen', 'Über 250 Personen', 'Behörde / Verband'];

function Label({ id, children, required }: { id: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={id} className="mb-1.5 block text-[.85rem] font-medium text-sw-ink">
      {children}
      {required && <span className="text-sw-indigo"> *</span>}
    </label>
  );
}

export function RequestForm({ initialKind, initialProduct }: { initialKind?: RequestKind; initialProduct?: string }) {
  const [kind, setKind] = useState<RequestKind>(initialKind ?? 'beratung');
  const [product, setProduct] = useState(initialProduct ?? '');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState('');

  // Vorbelegung aus der URL (?art=demo&produkt=crm), damit die Seite statisch bleiben kann.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const art = q.get('art');
    const prod = q.get('produkt');
    if (art && requestKinds.some((k) => k.id === art)) setKind(art as RequestKind);
    if (prod && softwareProducts.some((p) => p.slug === prod)) setProduct(prod);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Errors = {};
    if (!fd.name?.trim()) next.name = 'Bitte nennen Sie uns Ihren Namen.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email ?? '')) next.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (!fd.message?.trim() || fd.message.trim().length < 10) next.message = 'Schildern Sie uns kurz Ihr Vorhaben (mind. 10 Zeichen).';
    if (!fd.consent) next.consent = 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const k = requestKinds.find((x) => x.id === kind)!;
    const pr = softwareProducts.find((x) => x.slug === product);
    const body = {
      name: fd.name,
      company: fd.company,
      email: fd.email,
      phone: fd.phone,
      website: fd.website, // Honeypot
      consent: fd.consent,
      topic: `Software: ${k.label}${pr ? ` · ${pr.name}` : ''}`,
      message: [`Art der Anfrage: ${k.label}`, pr ? `Produkt (Konzept): ${pr.name}` : 'Produkt: keines gewählt / individuelle Lösung', fd.size ? `Größe: ${fd.size}` : '', '', fd.message].filter((l) => l !== '').join('\n'),
    };
    setStatus('sending');
    setServerMsg('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setServerMsg(json.message ?? 'Das hat leider nicht geklappt. Bitte versuchen Sie es später erneut.');
        setStatus('error');
        return;
      }
      setStatus('success');
      form.reset();
    } catch {
      setServerMsg('Keine Verbindung. Bitte prüfen Sie Ihr Netz und versuchen Sie es erneut.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="sw-card flex min-h-[420px] flex-col items-start justify-center p-8 sm:p-12">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#4F46FF,#6D4DF5)] text-white">
          <Check size={26} />
        </span>
        <h2 className="mt-7 text-[1.8rem] font-semibold tracking-tight">Danke, Ihre Anfrage ist angekommen.</h2>
        <p className="mt-3 max-w-md text-sw-mute">Wir melden uns persönlich bei Ihnen. Es gibt keinen Verkaufsautomaten und keinen Bot-Anruf.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-7 text-[.95rem] font-semibold text-sw-indigo hover:underline">
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === 'sending'} className="sw-card relative p-6 sm:p-9">
      <fieldset>
        <legend className="mb-3 text-[.85rem] font-medium text-sw-ink">Was möchten Sie?</legend>
        <div className="grid-cols-1 grid gap-2.5 sm:grid-cols-2">
          {requestKinds.map((k) => (
            <label key={k.id} className={cn('flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all', kind === k.id ? 'border-sw-indigo bg-sw-indigo/[.05] shadow-[0_0_0_3px_rgba(79,70,255,.10)]' : 'border-sw-ink/12 hover:border-sw-ink/30')}>
              <input type="radio" name="art" value={k.id} checked={kind === k.id} onChange={() => setKind(k.id)} className="mt-1 accent-[#4F46FF]" />
              <span>
                <span className="block text-[.95rem] font-semibold text-sw-ink">{k.label}</span>
                <span className="block text-[.8rem] leading-snug text-sw-mute">{k.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid-cols-1 mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label id="sw-product">Produkt</Label>
          <select id="sw-product" name="produkt" value={product} onChange={(e) => setProduct(e.target.value)} className={input}>
            <option value="">Kein bestimmtes Produkt / individuelle Lösung</option>
            {categories.map((c) => (
              <optgroup key={c.slug} label={c.name}>
                {softwareProducts
                  .filter((p) => p.category === c.slug)
                  .map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} (Konzept)
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <Label id="sw-name" required>Name</Label>
          <input id="sw-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'sw-name-err' : undefined} className={input} />
          {errors.name && <p id="sw-name-err" role="alert" className="mt-1.5 text-[.82rem] text-red-600">{errors.name}</p>}
        </div>
        <div>
          <Label id="sw-company">Unternehmen</Label>
          <input id="sw-company" name="company" autoComplete="organization" className={input} />
        </div>
        <div>
          <Label id="sw-email" required>E-Mail</Label>
          <input id="sw-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'sw-email-err' : undefined} className={input} />
          {errors.email && <p id="sw-email-err" role="alert" className="mt-1.5 text-[.82rem] text-red-600">{errors.email}</p>}
        </div>
        <div>
          <Label id="sw-phone">Telefon</Label>
          <input id="sw-phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </div>
        <div className="sm:col-span-2">
          <Label id="sw-size">Wer sind Sie?</Label>
          <select id="sw-size" name="size" defaultValue="" className={input}>
            <option value="">Bitte wählen (optional)</option>
            {sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label id="sw-message" required>Ihr Vorhaben</Label>
          <textarea id="sw-message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'sw-message-err' : undefined} placeholder="Was soll die Software leisten? Wer nutzt sie? Welche Systeme gibt es schon?" className={cn(input, 'resize-y')} />
          {errors.message && <p id="sw-message-err" role="alert" className="mt-1.5 text-[.82rem] text-red-600">{errors.message}</p>}
        </div>
      </div>

      {/* Honeypot: für Menschen unsichtbar */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-[.88rem] leading-snug text-sw-mute">
        <input type="checkbox" name="consent" value="yes" aria-invalid={!!errors.consent} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#4F46FF]" />
        <span>
          Ich habe die{' '}
          <Link href="/datenschutz" target="_blank" className="font-medium text-sw-ink underline underline-offset-2">
            Datenschutzerklärung
          </Link>{' '}
          gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage einverstanden.
        </span>
      </label>
      {errors.consent && <p role="alert" className="mt-1.5 text-[.82rem] text-red-600">{errors.consent}</p>}

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,#4F46FF,#6D4DF5)] px-7 py-3.5 text-[1rem] font-medium text-white shadow-[0_10px_30px_-10px_rgba(79,70,255,.7)] transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60">
          {status === 'sending' && <Loader2 size={18} className="animate-spin" aria-hidden />}
          {status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
        </button>
        {status === 'error' && (
          <p role="alert" className="text-[.9rem] text-red-600">
            {serverMsg}
          </p>
        )}
      </div>
      <p className="mt-5 text-[.8rem] leading-relaxed text-sw-mute">
        Hinweis: Alle Produkte im Katalog sind Konzepte. Eine „Demo“ ist daher ein Konzept-Walkthrough oder ein Gespräch zum Stand, keine Live-Software.
      </p>
    </form>
  );
}
