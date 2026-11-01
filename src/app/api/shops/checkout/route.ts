import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { field, findNiche, findPackage, longField, mollieBase, originOf, paymentConfig, sendOrderMail, stripeBase } from '@/lib/shops-pay';

export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** Ob Online-Bezahlung aktiv ist (für das Formular). Keine Geheimnisse in der Antwort. */
export async function GET() {
  const c = paymentConfig();
  return NextResponse.json({ payments: c.enabled, provider: c.enabled ? c.provider : null, agbUrl: c.enabled ? c.agbUrl : '', widerrufUrl: c.enabled ? c.widerrufUrl : '' });
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'rate_limited', message: 'Zu viele Versuche. Bitte warte ein paar Minuten.' }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Ungültige Anfrage.' }, { status: 400 });
  }
  if (field(body.website, 200)) return NextResponse.json({ ok: true, mode: 'inquiry' }); // Honeypot

  const pkg = findPackage(body.paket);
  const niche = findNiche(body.nische);
  const name = field(body.name, 120);
  const email = field(body.email, 200);
  const shopname = field(body.shopname, 120);
  const company = field(body.company, 160);
  const phone = field(body.phone, 60);
  const products = field(body.products, 60);
  const existing = field(body.existing, 200);
  const message = longField(body.message, 3000);
  const cfg = paymentConfig();

  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!pkg || !niche || !name || !okMail || !shopname || body.consent !== 'yes' || body.terms !== 'yes') {
    return NextResponse.json({ error: 'invalid', message: 'Bitte prüfe deine Angaben.' }, { status: 400 });
  }
  const payMode = cfg.enabled && pkg.price != null;
  if (payMode && body.legal !== 'yes') {
    return NextResponse.json({ error: 'legal', message: 'Bitte bestätige AGB und Widerrufsbelehrung.' }, { status: 400 });
  }
  if (payMode && body.startnow !== 'yes') {
    return NextResponse.json({ error: 'startnow', message: 'Bitte bestätige, dass wir vor Ablauf der Widerrufsfrist mit der Ausführung beginnen sollen.' }, { status: 400 });
  }

  const orderId = `SS-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString('hex').toUpperCase()}`;
  const details = [
    `Bestellnummer: ${orderId}`,
    `Paket: ${pkg.name} (${pkg.price == null ? 'auf Anfrage' : `${pkg.price} €`})`,
    `Branche: ${niche.name}`,
    `Shopname: ${shopname}`,
    `Name: ${name}`,
    `Unternehmen: ${company || '–'}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone || '–'}`,
    `Produkte als Tabelle vorhanden: ${products || 'keine Angabe'}`,
    `Website/Social: ${existing || '–'}`,
    '',
    message || '(keine weitere Nachricht)',
  ].join('\n');

  // Ohne Online-Bezahlung (oder Paket „Individuell“): Anfrage per Mail, Rechnung nach Bestätigung
  if (!payMode) {
    const sent = await sendOrderMail(`Shop-Start Anfrage: ${pkg.name} · ${niche.name} (${name})`, `Neue Anfrage (noch keine Zahlung)\n\n${details}`, email);
    if (!sent) return NextResponse.json({ error: 'not_configured', message: 'Das Formular ist derzeit nicht verfügbar. Bitte versuche es später erneut.' }, { status: 503 });
    return NextResponse.json({ ok: true, mode: 'inquiry', orderId });
  }

  const origin = originOf(req);

  // Mollie (Preis serverseitig aus den Paketdaten; Zahlungsbestätigung kommt über den Webhook)
  if (cfg.provider === 'mollie') {
    const clip = (v: string, n: number) => v.slice(0, n);
    const meta: Record<string, string> = {
      order_id: orderId, paket: pkg.id, nische: niche.id, shopname: clip(shopname, 60), name: clip(name, 60), email: clip(email, 90), company: clip(company, 60),
      phone: clip(phone, 30), products: clip(products, 20), existing: clip(existing, 80), message: clip(message, 160), legal_accepted: 'yes', startnow_accepted: 'yes',
    };
    while (JSON.stringify(meta).length > 960 && meta.message.length > 0) meta.message = meta.message.slice(0, Math.max(0, meta.message.length - 30)); // Mollie erlaubt 1 KB Metadaten
    const body: Record<string, unknown> = {
      amount: { currency: 'EUR', value: (pkg.price as number).toFixed(2) },
      description: `MONVEX Shop-Start: ${pkg.name} (${niche.name}) ${orderId}`,
      redirectUrl: `${origin}/shops/danke?order=${orderId}`,
      cancelUrl: `${origin}/shops/bestellen?paket=${pkg.id}&nische=${niche.id}&abgebrochen=1`,
      locale: 'de_DE',
      metadata: meta,
    };
    if (!/^https?:\/\/(localhost|127\.0\.0\.1)/.test(origin)) body.webhookUrl = `${origin}/api/shops/mollie-webhook`; // Mollie lehnt lokale Adressen ab
    let url = '';
    try {
      const res = await fetch(`${mollieBase()}/v2/payments`, { method: 'POST', headers: { Authorization: `Bearer ${cfg.key}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const payment = (await res.json()) as { _links?: { checkout?: { href?: string } }; detail?: string };
      url = payment._links?.checkout?.href ?? '';
      if (!res.ok || !url) {
        console.error('[shops] Mollie-Fehler', res.status, payment.detail);
        return NextResponse.json({ error: 'mollie', message: 'Die Bezahlung konnte nicht gestartet werden. Bitte versuche es später erneut oder schreib uns.' }, { status: 502 });
      }
    } catch (e) {
      console.error('[shops] Mollie nicht erreichbar', e);
      return NextResponse.json({ error: 'mollie', message: 'Keine Verbindung zur Bezahlseite. Bitte versuche es später erneut.' }, { status: 502 });
    }
    await sendOrderMail(`Shop-Start: Bezahlung gestartet (noch nicht bezahlt) ${orderId}`, `Der Kunde wurde zu Mollie weitergeleitet. Der Zahlungseingang folgt als eigene Mail (Webhook) bzw. im Mollie-Dashboard.\n\n${details}`, email);
    return NextResponse.json({ ok: true, mode: 'pay', url, orderId });
  }

  // Stripe Checkout (Preis serverseitig aus den Paketdaten)
  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('locale', 'de');
  params.set('customer_email', email);
  params.set('client_reference_id', orderId);
  params.set('success_url', `${origin}/shops/danke?session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${origin}/shops/bestellen?paket=${pkg.id}&nische=${niche.id}&abgebrochen=1`);
  params.set('billing_address_collection', 'required');
  params.set('invoice_creation[enabled]', 'true');
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', 'eur');
  params.set('line_items[0][price_data][unit_amount]', String(Math.round((pkg.price as number) * 100)));
  params.set('line_items[0][price_data][product_data][name]', `MONVEX Shop-Start: ${pkg.name} (${niche.name})`);
  params.set('line_items[0][price_data][product_data][description]', 'Aufbau deines Shopify-Shops nach Branchenvorlage, Übergabe auf deinen Namen. Shopify-Tarif nicht enthalten.');
  const meta: Record<string, string> = {
    order_id: orderId, paket: pkg.id, nische: niche.id, shopname, name, company, phone, products, existing, message: message.slice(0, 450), legal_accepted: 'yes', startnow_accepted: 'yes',
  };
  for (const [k, v] of Object.entries(meta)) params.set(`metadata[${k}]`, v.slice(0, 500));

  let session: { id?: string; url?: string; error?: { message?: string } };
  try {
    const res = await fetch(`${stripeBase()}/v1/checkout/sessions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    session = (await res.json()) as typeof session;
    if (!res.ok || !session.url) {
      console.error('[shops] Stripe-Fehler', res.status, session.error?.message);
      return NextResponse.json({ error: 'stripe', message: 'Die Bezahlung konnte nicht gestartet werden. Bitte versuche es später erneut oder schreib uns.' }, { status: 502 });
    }
  } catch (e) {
    console.error('[shops] Stripe nicht erreichbar', e);
    return NextResponse.json({ error: 'stripe', message: 'Keine Verbindung zur Bezahlseite. Bitte versuche es später erneut.' }, { status: 502 });
  }

  // Wir behalten die Angaben, auch wenn die Bezahlung abgebrochen wird (Mail ist „unbezahlt“ gekennzeichnet)
  await sendOrderMail(`Shop-Start: Bezahlung gestartet (noch nicht bezahlt) ${orderId}`, `Der Kunde wurde zu Stripe weitergeleitet. Zahlungseingang folgt als eigene Mail (Webhook) bzw. im Stripe-Dashboard.\n\n${details}`, email);
  return NextResponse.json({ ok: true, mode: 'pay', url: session.url, orderId });
}
