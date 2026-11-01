import { SITE_URL } from '@/data/site';
import { niches, packages, type ShopPackage } from '@/data/shops';

/**
 * Online-Bezahlung für MONVEX Shop-Start (Stripe Checkout, gehostete Bezahlseite – wir sehen keine Kartendaten).
 *
 * Aktiv NUR wenn beides gesetzt ist:
 *   MOLLIE_API_KEY          – Mollie-API-Schlüssel (live_… oder test_… zum Testen), nur serverseitig; ODER
 *   STRIPE_SECRET_KEY       – geheimer Schlüssel (sk_live_… oder sk_test_… zum Testen), nur serverseitig (Mollie hat Vorrang)
 *   SHOPS_LEGAL_CONFIRMED   – "true": AGB + Widerrufsbelehrung liegen vor und sind unter SHOPS_AGB_URL / SHOPS_WIDERRUF_URL abrufbar
 * Sonst bleibt es bei der Anfrage per Formular (Rechnung nach Bestätigung). Preise kommen IMMER aus src/data/shops.ts, nie vom Browser.
 * Webhook (empfohlen): STRIPE_WEBHOOK_SECRET, Endpunkt /api/shops/stripe-webhook, Ereignis checkout.session.completed.
 * Test: STRIPE_API_BASE / RESEND_API_BASE überschreiben die API-Adressen (Mock-Server, siehe scripts/verify-shops-pay.mjs).
 */
export const stripeBase = () => (process.env.STRIPE_API_BASE || 'https://api.stripe.com').replace(/\/$/, '');
export const mollieBase = () => (process.env.MOLLIE_API_BASE || 'https://api.mollie.com').replace(/\/$/, '');

export type Provider = 'mollie' | 'stripe';

export function paymentConfig() {
  const mollieKey = process.env.MOLLIE_API_KEY?.trim();
  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
  /** Mollie hat Vorrang, wenn beide Schlüssel gesetzt sind. */
  const provider: Provider | null = mollieKey ? 'mollie' : stripeKey ? 'stripe' : null;
  const key = provider === 'mollie' ? mollieKey : stripeKey;
  const legal = process.env.SHOPS_LEGAL_CONFIRMED === 'true';
  const agbUrl = process.env.SHOPS_AGB_URL?.trim() || `${SITE_URL}/shops/agb`;
  const widerrufUrl = process.env.SHOPS_WIDERRUF_URL?.trim() || `${SITE_URL}/shops/widerruf`;
  const enabled = !!provider && legal && !!agbUrl && !!widerrufUrl;
  return { enabled, provider, key, stripeKey, mollieKey, agbUrl, widerrufUrl };
}

export const findPackage = (id: unknown): ShopPackage | undefined => packages.find((p) => p.id === id);
export const findNiche = (id: unknown) => niches.find((n) => n.id === id);

const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');
export const field = (v: unknown, max: number) => oneLine(clip(v, max));
export const longField = (v: unknown, max: number) => clip(v, max);

export function originOf(req: Request) {
  const o = req.headers.get('origin');
  if (o && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o)) return o; // lokale Tests
  return SITE_URL;
}

/** Mail an uns über Resend (gleiche Variablen wie das Kontaktformular). */
export async function sendOrderMail(subject: string, text: string, replyTo?: string) {
  return sendMailTo(process.env.CONTACT_TO_EMAIL, subject, text, replyTo);
}

/** Mail an eine beliebige Adresse (z. B. Eingangsbestätigung an den Kunden), Absender wie beim Kontaktformular. */
export async function sendMailTo(to: string | undefined, subject: string, text: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('[shops] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL nicht gesetzt – Mail nicht gesendet.');
    return false;
  }
  try {
    const res = await fetch(`${(process.env.RESEND_API_BASE || 'https://api.resend.com').replace(/\/$/, '')}/emails`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], ...(replyTo ? { reply_to: replyTo } : {}), subject, text }),
    });
    if (!res.ok) console.error('[shops] Resend-Fehler', res.status, await res.text().catch(() => ''));
    return res.ok;
  } catch (e) {
    console.error('[shops] Mailversand fehlgeschlagen', e);
    return false;
  }
}
