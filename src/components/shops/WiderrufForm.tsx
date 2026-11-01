'use client';

import { useState, type FormEvent } from 'react';
import { Check, Loader2 } from 'lucide-react';

const input = 'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[1rem] outline-none transition-colors focus:border-ink focus:ring-4 focus:ring-ink/5';
const L = ({ id, children, req }: { id: string; children: React.ReactNode; req?: boolean }) => (
  <label htmlFor={id} className="mb-1.5 block text-[.85rem] font-medium">{children}{req && <span className="text-ember"> *</span>}</label>
);

export function WiderrufForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [receipt, setReceipt] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!fd.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email ?? '')) { setMsg('Bitte gib deinen Namen und eine gültige E-Mail-Adresse an.'); setStatus('error'); return; }
    setStatus('sending'); setMsg('');
    try {
      const res = await fetch('/api/shops/widerruf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fd) });
      const j = (await res.json()) as { message?: string; receivedAt?: string };
      if (!res.ok) { setMsg(j.message ?? 'Das hat leider nicht geklappt. Bitte schreib uns per E-Mail.'); setStatus('error'); return; }
      setReceipt(j.receivedAt ?? ''); setStatus('done');
    } catch {
      setMsg('Keine Verbindung. Bitte versuche es erneut oder schreib uns per E-Mail.'); setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-6">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white"><Check size={20} /></span>
        <p className="mt-4 text-[1.1rem] font-semibold text-ink">Dein Widerruf ist bei uns eingegangen.</p>
        <p className="mt-1">Eingang: {receipt}. Eine Bestätigung ist per E-Mail unterwegs.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === 'sending'} className="relative space-y-4 rounded-2xl border border-line bg-white p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><L id="wd-name" req>Name</L><input id="wd-name" name="name" autoComplete="name" className={input} /></div>
        <div><L id="wd-email" req>E-Mail</L><input id="wd-email" name="email" type="email" autoComplete="email" className={input} /></div>
        <div><L id="wd-order">Bestellnummer (falls bekannt)</L><input id="wd-order" name="order" className={input} /></div>
        <div><L id="wd-date">Bestellt am (falls bekannt)</L><input id="wd-date" name="date" className={input} /></div>
        <div className="sm:col-span-2"><L id="wd-note">Anmerkung (optional)</L><textarea id="wd-note" name="note" rows={3} className={`${input} resize-y`} /></div>
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {status === 'error' && <p role="alert" className="text-[.9rem] text-ember-deep">{msg}</p>}
      <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-medium text-white transition-colors hover:bg-ember disabled:opacity-60">
        {status === 'sending' && <Loader2 size={18} className="animate-spin" aria-hidden />}
        Vertrag jetzt widerrufen
      </button>
    </form>
  );
}
