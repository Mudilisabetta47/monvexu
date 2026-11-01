#!/usr/bin/env node
/**
 * Testet die Online-Bezahlung (Stripe Checkout) ohne echtes Stripe/Resend: Mock-Server fängt alle API-Aufrufe ab.
 * Startet zwei Next-Server (mit und ohne aktive Bezahlung) aus dem vorhandenen Build (`npm run build` vorher).
 *   node scripts/verify-shops-pay.mjs
 */
import http from 'node:http';
import { spawn } from 'node:child_process';
import { createHmac } from 'node:crypto';

const MOCK = 3198, ON = 3191, OFF = 3192;
const calls = { stripe: [], resend: [] };
const mock = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    const json = (o, st = 200) => { res.writeHead(st, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(o)); };
    if (req.url === '/v1/checkout/sessions' && req.method === 'POST') { calls.stripe.push({ auth: req.headers.authorization, form: Object.fromEntries(new URLSearchParams(body)) }); return json({ id: 'cs_test_123', url: 'https://checkout.stripe.test/c/pay/cs_test_123' }); }
    if (req.url?.startsWith('/v1/checkout/sessions/cs_test_paid')) return json({ id: 'cs_test_paid', payment_status: 'paid' });
    if (req.url?.startsWith('/v1/checkout/sessions/cs_test_open')) return json({ id: 'cs_test_open', payment_status: 'unpaid' });
    if (req.url === '/emails') { calls.resend.push(JSON.parse(body)); return json({ id: 'mail_1' }); }
    json({ error: 'not found' }, 404);
  });
}).listen(MOCK);

const base = { ...process.env, RESEND_API_KEY: 're_test', CONTACT_TO_EMAIL: 'team@example.com', CONTACT_FROM_EMAIL: 'shop@example.com', RESEND_API_BASE: `http://localhost:${MOCK}`, STRIPE_API_BASE: `http://localhost:${MOCK}` };
const pay = { ...base, STRIPE_SECRET_KEY: 'sk_test_x', SHOPS_LEGAL_CONFIRMED: 'true', SHOPS_AGB_URL: 'https://example.com/agb', SHOPS_WIDERRUF_URL: 'https://example.com/widerruf', STRIPE_WEBHOOK_SECRET: 'whsec_test' };
const start = (port, env) => spawn('npx', ['next', 'start', '-p', String(port)], { env, stdio: 'ignore' });
const servers = [start(ON, pay), start(OFF, base)];
const wait = async (port) => { for (let i = 0; i < 60; i++) { try { await fetch(`http://localhost:${port}/api/shops/checkout`); return; } catch { await new Promise((r) => setTimeout(r, 500)); } } throw new Error('Server startet nicht'); };

const fails = []; let n = 0;
const ok = (c, m) => { n++; if (!c) fails.push(m); };
const post = (port, body, headers = {}) => fetch(`http://localhost:${port}/api/shops/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': `10.0.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`, ...headers }, body: JSON.stringify(body) });
const order = { paket: 'plus', nische: 'beauty', shopname: 'Test Shop', name: 'Test Person', email: 'kunde@example.com', consent: 'yes', terms: 'yes', legal: 'yes', message: 'Hallo' };

try {
  await Promise.all([wait(ON), wait(OFF)]);

  // Konfiguration
  ok((await (await fetch(`http://localhost:${ON}/api/shops/checkout`)).json()).payments === true, 'Zahlung sollte aktiv sein');
  ok((await (await fetch(`http://localhost:${OFF}/api/shops/checkout`)).json()).payments === false, 'Ohne Schlüssel darf Zahlung nicht aktiv sein');

  // Bezahl-Bestellung: Preis kommt vom Server (199 €), nicht vom Browser
  let r = await post(ON, { ...order, price: 1, unit_amount: 1 });
  let j = await r.json();
  ok(r.status === 200 && j.mode === 'pay' && /^https:\/\/checkout\.stripe\.test\//.test(j.url), `Pay-Antwort falsch: ${JSON.stringify(j)}`);
  const f = calls.stripe[0]?.form ?? {};
  ok(f['line_items[0][price_data][unit_amount]'] === '19900', `Betrag falsch: ${f['line_items[0][price_data][unit_amount]']}`);
  ok(f['line_items[0][price_data][currency]'] === 'eur' && f.mode === 'payment' && f.locale === 'de', 'Stripe-Parameter falsch');
  ok(calls.stripe[0]?.auth === 'Bearer sk_test_x', 'Auth-Header fehlt');
  ok(f['metadata[paket]'] === 'plus' && f['metadata[shopname]'] === 'Test Shop' && f.customer_email === 'kunde@example.com', 'Metadaten fehlen');
  ok(f['invoice_creation[enabled]'] === 'true' && f.billing_address_collection === 'required', 'Rechnung/Adresse fehlt');
  ok(/\/shops\/danke\?session_id=\{CHECKOUT_SESSION_ID\}/.test(f.success_url ?? ''), 'success_url falsch');
  ok(calls.resend.some((m) => /noch nicht bezahlt/.test(m.subject)), 'Lead-Mail „noch nicht bezahlt“ fehlt');

  // Validierung
  ok((await post(ON, { ...order, legal: undefined })).status === 400, 'Ohne AGB-Bestätigung muss 400 kommen');
  ok((await post(ON, { ...order, paket: 'gratis' })).status === 400, 'Unbekanntes Paket muss 400 geben');
  ok((await post(ON, { ...order, email: 'kaputt' })).status === 400, 'Ungültige E-Mail muss 400 geben');
  ok((await post(ON, { ...order, terms: undefined })).status === 400, 'Ohne Leistungsumfang-Bestätigung muss 400 kommen');
  const honey = await (await post(ON, { ...order, website: 'bot' })).json();
  ok(honey.mode === 'inquiry' && calls.stripe.length === 1, 'Honeypot darf keine Sitzung anlegen');

  // Individuell → Anfrage, keine Stripe-Sitzung
  const before = calls.stripe.length;
  j = await (await post(ON, { ...order, paket: 'individuell' })).json();
  ok(j.mode === 'inquiry' && calls.stripe.length === before, 'Individuell darf nicht zu Stripe gehen');

  // Ohne aktive Zahlung → nur Anfrage
  const b2 = calls.stripe.length;
  j = await (await post(OFF, { ...order, legal: undefined })).json();
  ok(j.mode === 'inquiry' && calls.stripe.length === b2, 'Ohne Zahlungskonfiguration muss es eine Anfrage bleiben');

  // Webhook
  const event = JSON.stringify({ type: 'checkout.session.completed', data: { object: { id: 'cs_test_123', payment_status: 'paid', amount_total: 19900, customer_details: { email: 'kunde@example.com' }, client_reference_id: 'SS-TEST', metadata: { order_id: 'SS-TEST', paket: 'plus', nische: 'beauty', shopname: 'Test Shop', name: 'Test Person', legal_accepted: 'yes' } } } });
  const sign = (t, secret = 'whsec_test') => `t=${t},v1=${createHmac('sha256', secret).update(`${t}.${event}`).digest('hex')}`;
  const wh = (sig) => fetch(`http://localhost:${ON}/api/shops/stripe-webhook`, { method: 'POST', headers: { 'stripe-signature': sig }, body: event });
  const m0 = calls.resend.length;
  ok((await wh(sign(Math.floor(Date.now() / 1000)))).status === 200, 'Gültiger Webhook muss 200 liefern');
  ok(calls.resend.length === m0 + 1 && /BEZAHLT/.test(calls.resend.at(-1).subject) && /199,00 €/.test(calls.resend.at(-1).text), 'Zahlungs-Mail fehlt/falsch');
  ok((await wh(sign(Math.floor(Date.now() / 1000), 'falsch'))).status === 400, 'Falsche Signatur muss 400 geben');
  ok((await wh(sign(Math.floor(Date.now() / 1000) - 3600))).status === 400, 'Alter Zeitstempel muss 400 geben');
  ok((await fetch(`http://localhost:${ON}/api/shops/stripe-webhook`, { method: 'POST', body: event })).status === 400, 'Ohne Signatur muss 400 kommen');
  ok(calls.resend.length === m0 + 1, 'Ungültige Webhooks dürfen keine Mail auslösen');
  ok((await fetch(`http://localhost:${OFF}/api/shops/stripe-webhook`, { method: 'POST', body: event })).status === 503, 'Ohne Webhook-Secret muss 503 kommen');

  // Danke-Seite
  const paid = await (await fetch(`http://localhost:${ON}/shops/danke?session_id=cs_test_paid`)).text();
  ok(/Deine Zahlung ist bei uns angekommen/.test(paid), 'Danke-Seite zeigt „bezahlt“ nicht');
  const open = await (await fetch(`http://localhost:${ON}/shops/danke?session_id=cs_test_open`)).text();
  ok(/wird noch bestätigt/.test(open) && !/Deine Zahlung ist bei uns angekommen/.test(open), 'Danke-Seite muss offene Zahlung als „ausstehend“ zeigen');
  const bad = await (await fetch(`http://localhost:${ON}/shops/danke?session_id=../../etc`)).text();
  ok(!/Deine Zahlung ist bei uns angekommen/.test(bad), 'Ungültige Session-ID darf nicht als bezahlt gelten');
} catch (e) {
  fails.push(String(e));
} finally {
  servers.forEach((s) => s.kill());
  mock.close();
}
if (fails.length) { console.error(`✗ ${fails.length} von ${n} Prüfungen fehlgeschlagen:\n- ${fails.join('\n- ')}`); process.exit(1); }
console.log(`✓ Bezahlung ok (${n} Prüfungen): Betrag nur vom Server, AGB-Pflicht, Webhook-Signatur, Danke-Seite, Fallback ohne Schlüssel.`);
