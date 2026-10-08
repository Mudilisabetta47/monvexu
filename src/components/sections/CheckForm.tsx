'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Field, fieldBase } from './ContactForm';
import { EASE } from '@/lib/motion';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'company' | 'email' | 'consent', string>>;

/** Kurzes Anfrageformular für den Website-Check: 3 Pflichtfelder + 2 optionale, sonst nichts. */
export function CheckForm({ topic }: { topic: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = 'Bitte nennen Sie uns Ihren Namen.';
    if (!data.company?.trim()) next.company = 'Bitte nennen Sie Ihr Unternehmen.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '')) next.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (!data.consent) next.consent = 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    setServerMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, kind: 'check', topic }),
      });
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

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <m.div key="ok" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex min-h-[360px] flex-col items-start justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-ink text-white">
            <Check size={28} strokeWidth={1.8} />
          </span>
          <h2 className="mt-8 text-h3 font-semibold">Danke, Ihre Anfrage ist angekommen.</h2>
          <p className="mt-3 max-w-md text-graphite">Wir schauen uns Ihr Google-Profil und Ihre Website an und melden uns bei Ihnen mit drei konkreten Verbesserungen.</p>
        </m.div>
      ) : (
        <m.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-7" aria-busy={status === 'sending'}>
          <Field id="ck-name" label="Name" required error={errors.name}>
            <input id="ck-name" name="name" autoComplete="name" placeholder="Name" className={fieldBase} aria-invalid={!!errors.name} />
          </Field>
          <Field id="ck-company" label="Unternehmen" required error={errors.company}>
            <input id="ck-company" name="company" autoComplete="organization" placeholder="Unternehmen" className={fieldBase} aria-invalid={!!errors.company} />
          </Field>
          <Field id="ck-email" label="E-Mail" required error={errors.email}>
            <input id="ck-email" name="email" type="email" autoComplete="email" placeholder="E-Mail" className={fieldBase} aria-invalid={!!errors.email} />
          </Field>
          <div className="grid gap-7 sm:grid-cols-2">
            <Field id="ck-phone" label="Telefon (für den Rückruf)">
              <input id="ck-phone" name="phone" type="tel" autoComplete="tel" placeholder="Telefon" className={fieldBase} />
            </Field>
            <Field id="ck-site" label="Ihre Website (falls vorhanden)">
              <input id="ck-site" name="siteUrl" type="text" inputMode="url" autoComplete="url" placeholder="Website" className={fieldBase} />
            </Field>
          </div>

          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-[.88rem] leading-snug text-graphite">
              <input type="checkbox" name="consent" value="yes" className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#FF4A1C]" aria-invalid={!!errors.consent} />
              <span>
                Ich habe die{' '}
                <Link href="/datenschutz" className="link-u text-ink" target="_blank">
                  Datenschutzerklärung
                </Link>{' '}
                gelesen und bin damit einverstanden, dass MONVEX meine Angaben zur Bearbeitung des Website-Checks verwendet.
              </span>
            </label>
            {errors.consent && (
              <p role="alert" className="mt-2 text-[.82rem] text-ember-deep">
                {errors.consent}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-4">
            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Wird gesendet …' : 'Website-Check anfordern'}
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
  );
}
