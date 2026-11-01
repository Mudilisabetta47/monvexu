#!/usr/bin/env node
/** Prüft den Shop-Start-Entwurf (/shops): Überlauf, H1, Konsole, Formular-Vorbelegung/Validierung/Payload. BASE=http://localhost:3140 */
import { chromium } from 'playwright-core';
const BASE = process.env.BASE ?? 'http://localhost:3140';
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const bad = []; let n = 0;
for (const w of [360, 390, 768, 1024, 1440, 1920]) {
  const page = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  const errs = []; page.on('console', (m) => m.type() === 'error' && errs.push(m.text())); page.on('pageerror', (e) => errs.push(String(e)));
  for (const p of ['/shops', '/shops/bestellen', '/shops/agb', '/shops/widerruf']) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' }); n++;
    const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, h1: document.querySelectorAll('h1').length }));
    if (r.sw > r.iw) bad.push(`${w} ${p} Überlauf ${r.sw}>${r.iw}`);
    if (r.h1 !== 1) bad.push(`${w} ${p} h1=${r.h1}`);
  }
  if (errs.length) bad.push(`${w} Konsole: ${errs[0].slice(0, 100)}`);
}
// Formular: Vorbelegung, Validierung, Payload
const page = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
const sent = [];
await page.route('**/api/shops/checkout', async (r) => { if (r.request().method() === 'GET') return r.fulfill({ status: 200, contentType: 'application/json', body: '{"payments":false,"agbUrl":"","widerrufUrl":""}' }); sent.push(JSON.parse(r.request().postData())); await r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"mode":"inquiry"}' }); });
await page.goto(BASE + '/shops/bestellen?paket=premium&nische=genuss', { waitUntil: 'networkidle' });
if ((await page.locator('#sh-niche').inputValue()) !== 'genuss') bad.push('Nischen-Vorbelegung fehlt');
if (!(await page.getByRole('radio', { name: /Premium/ }).isChecked())) bad.push('Paket-Vorbelegung fehlt');
await page.getByRole('button', { name: 'Anfrage absenden' }).click();
if ((await page.getByRole('alert').count()) < 4) bad.push('Validierung unvollständig');
if (sent.length) bad.push('gesendet trotz Fehlern');
await page.fill('#sh-shopname', 'Café Test'); await page.fill('#sh-name', 'Test Person'); await page.fill('#sh-email', 'test@example.com');
await page.locator('input[name=terms]').check(); await page.locator('input[name=consent]').check();
await page.getByRole('button', { name: 'Anfrage absenden' }).click(); await page.getByRole('status').waitFor();
const s = sent[0] ?? {};
if (s.paket !== 'premium' || s.nische !== 'genuss') bad.push('Payload: ' + JSON.stringify({ paket: s.paket, nische: s.nische }));
if (s.shopname !== 'Café Test') bad.push('Payload ohne Shopname');
// Variante mit aktiver Bezahlung: Rechts-Checkbox, Button-Text, Weiterleitung zur Bezahlseite
{
  const pg = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  const posted = [];
  await pg.route('**/api/shops/checkout', async (r) => {
    if (r.request().method() === 'GET') return r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ payments: true, agbUrl: 'https://example.com/agb', widerrufUrl: 'https://example.com/widerruf' }) });
    posted.push(JSON.parse(r.request().postData()));
    await r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, mode: 'pay', url: 'https://checkout.stripe.test/c/pay/cs_test_1' }) });
  });
  await pg.route('https://checkout.stripe.test/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<h1>Stripe-Mock</h1>' }));
  await pg.goto(BASE + '/shops/bestellen?paket=premium&nische=mode', { waitUntil: 'networkidle' });
  if (!(await pg.getByRole('button', { name: /Jetzt bezahlen · 299 €/ }).isVisible())) bad.push('Bezahl-Button fehlt');
  if (!(await pg.locator('input[name=legal]').isVisible())) bad.push('AGB-Checkbox fehlt bei aktiver Bezahlung');
  await pg.fill('#sh-shopname', 'Pay Test'); await pg.fill('#sh-name', 'Pay Person'); await pg.fill('#sh-email', 'pay@example.com');
  await pg.locator('input[name=terms]').check(); await pg.locator('input[name=consent]').check();
  await pg.getByRole('button', { name: /Jetzt bezahlen/ }).click();
  if (posted.length) bad.push('Ohne AGB-Bestätigung darf nichts gesendet werden');
  if (!(await pg.locator('input[name=startnow]').isVisible())) bad.push('Checkbox „Ausführungsbeginn vor Ablauf der Widerrufsfrist“ fehlt bei aktiver Bezahlung');
  await pg.locator('input[name=legal]').check();
  await pg.locator('input[name=startnow]').check();
  await pg.getByRole('button', { name: /Jetzt bezahlen/ }).click();
  await pg.waitForURL('https://checkout.stripe.test/**', { timeout: 8000 }).catch(() => bad.push('Keine Weiterleitung zur Bezahlseite'));
  if (posted[0]?.legal !== 'yes' || posted[0]?.startnow !== 'yes' || posted[0]?.paket !== 'premium') bad.push('Payload bei Bezahlung falsch: ' + JSON.stringify(posted[0]));
  if ('price' in (posted[0] ?? {})) bad.push('Browser darf keinen Preis senden');
}
await b.close();
console.log(bad.length ? '✗ ' + bad.join('\n- ') : `✓ Shops-Entwurf ok (${n} Seitenprüfungen + Formular, Payload: ${s.paket}/${s.nische})`);
