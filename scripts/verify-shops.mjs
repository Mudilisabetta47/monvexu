#!/usr/bin/env node
/** Prüft den Shop-Start-Entwurf (/shops): Überlauf, H1, Konsole, Formular-Vorbelegung/Validierung/Payload. BASE=http://localhost:3140 */
import { chromium } from 'playwright-core';
const BASE = process.env.BASE ?? 'http://localhost:3140';
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const bad = []; let n = 0;
for (const w of [360, 390, 768, 1024, 1440, 1920]) {
  const page = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  const errs = []; page.on('console', (m) => m.type() === 'error' && errs.push(m.text())); page.on('pageerror', (e) => errs.push(String(e)));
  for (const p of ['/shops', '/shops/bestellen']) {
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
await page.route('**/api/contact', async (r) => { sent.push(JSON.parse(r.request().postData())); await r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
await page.goto(BASE + '/shops/bestellen?paket=premium&nische=genuss', { waitUntil: 'networkidle' });
if ((await page.locator('#sh-niche').inputValue()) !== 'genuss') bad.push('Nischen-Vorbelegung fehlt');
if (!(await page.getByRole('radio', { name: /Premium/ }).isChecked())) bad.push('Paket-Vorbelegung fehlt');
await page.getByRole('button', { name: 'Bestellung absenden' }).click();
if ((await page.getByRole('alert').count()) < 4) bad.push('Validierung unvollständig');
if (sent.length) bad.push('gesendet trotz Fehlern');
await page.fill('#sh-shopname', 'Café Test'); await page.fill('#sh-name', 'Test Person'); await page.fill('#sh-email', 'test@example.com');
await page.locator('input[name=terms]').check(); await page.locator('input[name=consent]').check();
await page.getByRole('button', { name: 'Bestellung absenden' }).click(); await page.getByRole('status').waitFor();
const s = sent[0] ?? {};
if (s.topic !== 'Shop-Start: Premium · Café, Food & Genuss') bad.push('Topic: ' + s.topic);
if (!/Paket: Premium \(349 €\)/.test(s.message ?? '')) bad.push('Payload ohne Paket/Preis');
await b.close();
console.log(bad.length ? '✗ ' + bad.join('\n- ') : `✓ Shops-Entwurf ok (${n} Seitenprüfungen + Formular, Payload: ${s.topic})`);
