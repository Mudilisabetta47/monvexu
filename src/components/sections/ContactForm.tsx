'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

const fieldBase =
  'peer w-full border-0 border-b border-ink/20 bg-transparent px-0 pb-3 pt-6 text-[1.05rem] text-ink outline-none transition-colors placeholder-transparent focus:border-ink focus-visible:outline-none';

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 origin-left text-[1.05rem] text-mute transition-all duration-300 ease-out peer-focus:-translate-y-5 peer-focus:scale-[.72] peer-focus:text-ink peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[.72]"
      >
        {label}
        {required && <span className="text-ember"> *</span>}
      </label>
      <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out peer-focus:scale-x-100" />
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 text-[.82rem] text-ember-deep">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ topic }: { topic?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (topic) data.topic = topic;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = 'Bitte nennen Sie uns Ihren Namen.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '')) next.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (!data.message?.trim() || data.message.trim().length < 10) next.message = 'Erzählen Sie uns kurz, worum es geht (mind. 10 Zeichen).';
    if (!data.consent) next.consent = 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    setServerMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
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

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <m.div
            key="ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex min-h-[420px] flex-col items-start justify-center"
            role="status"
          >
            <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className="grid h-16 w-16 place-items-center rounded-full bg-ink text-white">
              <Check size={28} strokeWidth={1.8} />
            </m.span>
            <h3 className="mt-8 text-h3 font-semibold">Danke – Ihre Nachricht ist angekommen.</h3>
            <p className="mt-3 max-w-md text-graphite">Wir melden uns so bald wie möglich bei Ihnen.</p>
            <button type="button" onClick={() => setStatus('idle')} className="link-u mt-8 text-[.95rem] font-medium">
              Weitere Nachricht senden
            </button>
          </m.div>
        ) : (
          <m.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-x-8 gap-y-7 sm:grid-cols-2" aria-busy={status === 'sending'}>
            <Field id="cf-name" label="Name" required error={errors.name}>
              <input id="cf-name" name="name" autoComplete="name" placeholder="Name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} className={fieldBase} />
            </Field>
            <Field id="cf-company" label="Unternehmen">
              <input id="cf-company" name="company" autoComplete="organization" placeholder="Unternehmen" className={fieldBase} />
            </Field>
            <Field id="cf-email" label="E-Mail" required error={errors.email}>
              <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="E-Mail" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} className={fieldBase} />
            </Field>
            <Field id="cf-phone" label="Telefon">
              <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="Telefon" className={fieldBase} />
            </Field>
            <div className="sm:col-span-2">
              <Field id="cf-message" label="Nachricht" required error={errors.message}>
                <textarea id="cf-message" name="message" rows={4} placeholder="Nachricht" required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} className={cn(fieldBase, 'resize-none')} />
              </Field>
            </div>

            {/* Honeypot: fuer Menschen unsichtbar */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 text-[.88rem] leading-snug text-graphite">
                <input type="checkbox" name="consent" value="yes" className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#FF4A1C]" aria-invalid={!!errors.consent} />
                <span>
                  Ich habe die{' '}
                  <Link href="/datenschutz" className="link-u text-ink" target="_blank">
                    Datenschutzerklärung
                  </Link>{' '}
                  gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage einverstanden.
                </span>
              </label>
              {errors.consent && (
                <p role="alert" className="mt-2 text-[.82rem] text-ember-deep">
                  {errors.consent}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <Button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Wird gesendet …' : 'Kontakt aufnehmen'}
              </Button>
              {status === 'error' && (
                <p role="alert" className="text-[.9rem] text-ember-deep">
                  {serverMsg}
                </p>
              )}
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
