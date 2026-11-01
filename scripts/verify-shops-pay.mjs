#!/usr/bin/env node
/**
 * Testet die Online-Bezahlung (Stripe Checkout) ohne echtes Stripe/Resend: Mock-Server fängt alle API-Aufrufe ab.
 * Startet zwei Next-Server (mit und ohne aktive Bezahlung) aus dem vorhandenen Build (`npm run build` vorher).
 *   node scripts/verify-shops-pay.mjs
 */
import http from 'node:http';
import { spawn } from 'node:child_process';
import { createHmac } from 'node:crypto';

const MOCK = 3198, ON = 3191, OFF = 3192, MOL = 3193;
const calls = { stripe: [], resend: [], mollie: [] };
const mock = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    const json = (o, st = 200) => { res.writeHead(st, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(o)); };
    if (req.url === '/v1/checkout/sessions' && req.method === 'POST') { calls.stripe.push({ auth: req.headers.authorization, form: Object.fromEntries(new URLSearchParams(body)) }); return json({ id: 'cs_test_123', url: 'https://checkout.stripe.test/c/pay/cs_test_123' }); }
    if (req.url?.startsWith('/v1/checkout/sessions/cs_test_paid')) return json({ id: 'cs_test_paid', payment_status: 'paid' });
    if (req.url?.startsWith('/v1/checkout/sessions/cs_test_open')) return json({ id: 'cs_test_open', payment_status: 'unpaid' });
    if (req.url === '/v2/payments' && req.method === 'POST') { calls.mollie.push({ auth: req.headers.authorization, json: JSON.parse(body) }); res.writeHead(201, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ id: 'tr_test1', status: 'open', _links: { checkout: { href: 'https://pay.mollie.test/checkout/tr_test1' } } })); }
    if (req.url?.startsWith('/v2/payments/tr_')) {
      const id = req.url.split('/').pop(); const meta = { order_id: 'SS-MOL', paket: 'plus', nische: 'beauty', shopname: 'Test Shop', name: 'Test Person', email: 'kunde@example.com', legal_accepted: 'yes', startnow_accepted: 'yes' };
      if (id === 'tr_paid1') return json({ id, status: 'paid', amount: { value: '79.00', currency: 'EUR' }, metadata: meta });
      if (id === 'tr_open1') return json({ id, status: 'open', amount: { value: '79.00', currency: 'EUR' }, metadata: meta });
      if (id === 'tr_wrong1') return json({ id, status: 'paid', amount: { value: '10.00', currency: 'EUR' }, metadata: meta });
      return json({ error: 'not found' }, 404);
    }
    if (req.url === '/emails') { calls.resend.push(JSON.parse(body)); return json({ id: 'mail_1' }); }
    json({ error: 'not found' }, 404);
  });
}).listen(MOCK);

const base = { ...process.env, RESEND_API_KEY: 're_test', CONTACT_TO_EMAIL: 'team@example.com', CONTACT_FROM_EMAIL: 'shop@example.com', RESEND_API_BASE: `http://localhost:${MOCK}`, STRIPE_API_BASE: `http://localhost:${MOCK}` };
const pay = { ...base, STRIPE_SECRET_KEY: 'sk_test_x', SHOPS_LEGAL_CONFIRMED: 'true', SHOPS_AGB_URL: 'https://example.com/agb', SHOPS_WIDERRUF_URL: 'https://example.com/widerruf', STRIPE_WEBHOOK_SECRET: 'whsec_test' };
const mollie = { ...base, MOLLIE_API_KEY: 'test_x', MOLLIE_API_BASE: `http://localhost:${MOCK}`, SHOPS_LEGAL_CONFIRMED: 'true', SHOPS_AGB_URL: 'https://example.com/agb', SHOPS_WIDERRUF_URL: 'https://example.com/widerruf' };
const start = (port, env) => spawn('npx', ['next', 'start', '-p', String(port)], { env, stdio: 'ignore' });
const servers = [start(ON, pay), start(OFF, base), start(MOL, mollie)];
const wait = async (port) => { for (let i = 0; i < 60; i++) { try { await fetch(`http://localhost:${port}/api/shops/checkout`); return; } catch { await new Promise((r) => setTimeout(r, 500)); } } throw new Error('Server startet nicht'); };

const fails = []; let n = 0;
const ok = (c, m) => { n++; if (!c) fails.push(m); };
const post = (port, body, headers = {}) => fetch(`http://localhost:${port}/api/shops/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': `10.0.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`, ...headers }, body: JSON.stringify(body) });
const order = { paket: 'plus', nische: 'beauty', shopname: 'Test Shop', name: 'Test Person', email: 'kunde@example.com', consent: 'yes', terms: 'yes', legal: 'yes', startnow: 'yes', message: 'Hallo' };

try {
  await Promise.all([wait(ON), wait(OFF), wait(MOL)]);

  // Konfiguration
  ok((await (await fetch(`http://localhost:${ON}/api/shops/checkout`)).json()).payments === true, 'Zahlung sollte aktiv sein');
  ok((await (await fetch(`http://localhost:${OFF}/api/shops/checkout`)).json()).payments === false, 'Ohne Schlüssel darf Zahlung nicht aktiv sein');

  // Bezahl-Bestellung: Preis kommt vom Server (79 €), nicht vom Browser
  let r = await post(ON, { ...order, price: 1, unit_amount: 1 });
  let j = await r.json();
  ok(r.status === 200 && j.mode === 'pay' && /^https:\/\/checkout\.stripe\.test\//.test(j.url), `Pay-Antwort falsch: ${JSON.stringify(j)}`);
  const f = calls.stripe[0]?.form ?? {};
  ok(f['line_items[0][price_data][unit_amount]'] === '7900', `Betrag falsch: ${f['line_items[0][price_data][unit_amount]']}`);
  ok(f['line_items[0][price_data][currency]'] === 'eur' && f.mode === 'payment' && f.locale === 'de', 'Stripe-Parameter falsch');
  ok(calls.stripe[0]?.auth === 'Bearer sk_test_x', 'Auth-Header fehlt');
  ok(f['metadata[paket]'] === 'plus' && f['metadata[shopname]'] === 'Test Shop' && f.customer_email === 'kunde@example.com', 'Metadaten fehlen');
  ok(f['invoice_creation[enabled]'] === 'true' && f.billing_address_collection === 'required', 'Rechnung/Adresse fehlt');
  ok(/\/shops\/danke\?session_id=\{CHECKOUT_SESSION_ID\}/.test(f.success_url ?? ''), 'success_url falsch');
  ok(calls.resend.some((m) => /noch nicht bezahlt/.test(m.subject)), 'Lead-Mail „noch nicht bezahlt“ fehlt');

  // Einstiegspaket „Start“: 49 € (4900 Cent), ebenfalls vom Server
  r = await post(ON, { ...order, paket: 'start' }); j = await r.json();
  ok(r.status === 200 && j.mode === 'pay', `Start-Paket: Pay-Antwort falsch: ${JSON.stringify(j)}`);
  ok(calls.stripe.at(-1)?.form?.['line_items[0][price_data][unit_amount]'] === '4900', `Start-Betrag falsch: ${calls.stripe.at(-1)?.form?.['line_items[0][price_data][unit_amount]']}`);
  calls.stripe.pop(); calls.resend.pop();

  // Online-Widerruf: Mail an uns und Eingangsbestätigung an den Kunden
  const mailsBefore = calls.resend.length;
  const wd = await fetch(`http://localhost:${ON}/api/shops/widerruf`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.9.9.9' }, body: JSON.stringify({ name: 'Test Person', email: 'kunde@example.com', order: 'SS-1', note: 'bitte stornieren' }) });
  const wdj = await wd.json();
  ok(wd.status === 200 && wdj.ok && /20\d\d/.test(wdj.receivedAt ?? ''), `Widerruf-Antwort falsch: ${JSON.stringify(wdj)}`);
  ok(calls.resend.length === mailsBefore + 2 && calls.resend.some((m) => /WIDERRUF/.test(m.subject)) && calls.resend.some((m) => /Eingangsbestätigung/.test(m.subject) && (m.to ?? []).includes('kunde@example.com')), 'Widerruf: Mail an uns und Bestätigung an den Kunden fehlen');
  ok((await fetch(`http://localhost:${ON}/api/shops/widerruf`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.9.9.8' }, body: JSON.stringify({ name: '', email: 'kaputt' }) })).status === 400, 'Widerruf ohne gültige Angaben muss 400 geben');

  // Validierung
  ok((await post(ON, { ...order, legal: undefined })).status === 400, 'Ohne AGB-Bestätigung muss 400 kommen');
  ok((await post(ON, { ...order, startnow: undefined })).status === 400, 'Ohne Zustimmung zum Ausführungsbeginn muss 400 kommen');
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

  // ---------- Mollie ----------
  const cfgM = await (await fetch(`http://localhost:${MOL}/api/shops/checkout`)).json();
  ok(cfgM.payments === true && cfgM.provider === 'mollie', `Mollie sollte aktiv sein: ${JSON.stringify(cfgM)}`);
  let rm = await post(MOL, { ...order, message: 'x'.repeat(2500) }); let jm = await rm.json();
  ok(rm.status === 200 && jm.mode === 'pay' && jm.url === 'https://pay.mollie.test/checkout/tr_test1', `Mollie-Antwort falsch: ${JSON.stringify(jm)}`);
  const mp = calls.mollie.at(-1);
  ok(mp?.auth === 'Bearer test_x', 'Mollie-Auth fehlt');
  ok(mp?.json.amount.value === '79.00' && mp?.json.amount.currency === 'EUR' && mp?.json.locale === 'de_DE', `Mollie-Betrag falsch: ${JSON.stringify(mp?.json.amount)}`);
  ok(/\/shops\/danke\?order=SS-/.test(mp?.json.redirectUrl ?? '') && /\/api\/shops\/mollie-webhook$/.test(mp?.json.webhookUrl ?? '') && /abgebrochen=1/.test(mp?.json.cancelUrl ?? ''), 'Mollie-URLs falsch');
  ok(JSON.stringify(mp?.json.metadata).length <= 1000 && mp?.json.metadata.paket === 'plus' && mp?.json.metadata.startnow_accepted === 'yes', `Mollie-Metadaten zu groß/falsch: ${JSON.stringify(mp?.json.metadata).length}`);
  ok((await post(MOL, { ...order, price: 1, amount: 1 })).status === 200 && calls.mollie.at(-1).json.amount.value === '79.00', 'Mollie-Betrag darf nicht vom Browser kommen');
  ok((await post(MOL, { ...order, startnow: undefined })).status === 400 && (await post(MOL, { ...order, legal: undefined })).status === 400, 'Mollie: ohne Zustimmungen muss 400 kommen');
  ok(calls.resend.some((m) => /noch nicht bezahlt/.test(m.subject) && /Mollie/.test(m.text)), 'Mollie: Lead-Mail fehlt');
  const hook = (id) => fetch(`http://localhost:${MOL}/api/shops/mollie-webhook`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `id=${id}` });
  let mm = calls.resend.length;
  ok((await hook('tr_open1')).status === 200 && calls.resend.length === mm, 'Mollie: offene Zahlung darf keine Mail auslösen');
  ok((await hook('..%2Fetc')).status === 200 && calls.resend.length === mm, 'Mollie: ungültige ID muss ignoriert werden');
  ok((await hook('tr_paid1')).status === 200 && calls.resend.length === mm + 2, `Mollie: bezahlt soll 2 Mails senden (uns + Kunde), war ${calls.resend.length - mm}`);
  const mailTo = calls.resend.slice(mm);
  ok(mailTo.some((x) => /BEZAHLT/.test(x.subject) && /79,00 €/.test(x.text) && !/ACHTUNG/.test(x.text)) && mailTo.some((x) => (x.to ?? []).includes('kunde@example.com') && /Deine Bestellung/.test(x.subject) && /widerruf/.test(x.text)), 'Mollie: Mails fehlen/falsch');
  ok((await hook('tr_paid1')).status === 200 && calls.resend.length === mm + 2, 'Mollie: doppelter Webhook darf nicht doppelt mailen');
  ok((await hook('tr_wrong1')).status === 200 && calls.resend.slice(mm + 2).some((x) => /ACHTUNG/.test(x.text)), 'Mollie: abweichender Betrag muss markiert werden');
  ok((await fetch(`http://localhost:${ON}/api/shops/mollie-webhook`, { method: 'POST', body: 'id=tr_paid1' })).status === 503, 'Ohne Mollie-Schlüssel muss der Webhook 503 geben');
  const dm = await (await fetch(`http://localhost:${MOL}/shops/danke?order=SS-MOL`)).text();
  ok(/bestätigen dir die Zahlung per E-Mail/.test(dm) && !/Deine Zahlung ist bei uns angekommen/.test(dm), 'Mollie-Danke-Seite falsch');
} catch (e) {
  fails.push(String(e));
} finally {
  servers.forEach((s) => s.kill());
  mock.close();
}
if (fails.length) { console.error(`✗ ${fails.length} von ${n} Prüfungen fehlgeschlagen:\n- ${fails.join('\n- ')}`); process.exit(1); }
console.log(`✓ Bezahlung ok (${n} Prüfungen): Betrag nur vom Server, AGB-Pflicht, Webhook-Signatur, Mollie (Betrag, Webhook, Mails), Danke-Seite, Fallback ohne Schlüssel.`);
