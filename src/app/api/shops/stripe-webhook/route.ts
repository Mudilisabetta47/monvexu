import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { sendOrderMail } from '@/lib/shops-pay';

export const runtime = 'nodejs';

/** Prüft die Stripe-Signatur (t=…,v1=…) ohne SDK. Toleranz 5 Minuten. */
function verify(raw: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(',').map((p) => p.split('=') as [string, string]));
  const t = Number(parts.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = createHmac('sha256', secret).update(`${parts.t}.${raw}`).digest('hex');
  const a = Buffer.from(expected);
  const sigs = header.split(',').filter((p) => p.startsWith('v1=')).map((p) => p.slice(3));
  return sigs.some((s) => {
    const b = Buffer.from(s);
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  const raw = await req.text();
  if (!verify(raw, req.headers.get('stripe-signature'), secret)) return NextResponse.json({ error: 'bad_signature' }, { status: 400 });

  let event: { type?: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }
  const s = event.data?.object ?? {};
  const paid = event.type === 'checkout.session.completed' ? s.payment_status === 'paid' : event.type === 'checkout.session.async_payment_succeeded';
  if (paid) {
    const m = (s.metadata ?? {}) as Record<string, string>;
    const amount = typeof s.amount_total === 'number' ? `${(s.amount_total / 100).toFixed(2).replace('.', ',')} €` : '–';
    const text = [
      'ZAHLUNG ERHALTEN – Shop-Start',
      '',
      `Bestellnummer: ${m.order_id ?? s.client_reference_id ?? '–'}`,
      `Betrag: ${amount}`,
      `Stripe-Session: ${String(s.id ?? '–')}`,
      `Paket: ${m.paket ?? '–'} · Branche: ${m.nische ?? '–'}`,
      `Shopname: ${m.shopname ?? '–'}`,
      `Name: ${m.name ?? '–'} · Unternehmen: ${m.company || '–'}`,
      `E-Mail: ${String((s.customer_details as { email?: string } | undefined)?.email ?? s.customer_email ?? '–')} · Telefon: ${m.phone || '–'}`,
      `Produkte als Tabelle: ${m.products || '–'} · Website/Social: ${m.existing || '–'}`,
      `AGB/Widerruf bestätigt: ${m.legal_accepted ?? '–'}`,
      '',
      m.message || '(keine weitere Nachricht)',
      '',
      'Nächste Schritte: Bestätigung an den Kunden, Aufbau starten, Übergabe mit Anleitung.',
    ].join('\n');
    await sendOrderMail(`Shop-Start BEZAHLT: ${m.paket ?? ''} · ${m.shopname ?? ''} (${amount})`, text);
  }
  return NextResponse.json({ received: true });
}
