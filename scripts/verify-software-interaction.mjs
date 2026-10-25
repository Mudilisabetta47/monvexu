#!/usr/bin/env node
/**
 * Interaktionstests des Softwarebereichs (Playwright gegen laufenden Server, Standard http://localhost:3140):
 * Katalog (Suche, Filter, Vergleich, URL-Zustand), Anfrageformular (Vorbelegung, Validierung, Payload, Honeypot),
 * Mega-Menü, mobile Navigation, Produkt-Mockup-Tabs, Tastatur (Esc).  Der Versand wird abgefangen – es wird keine Mail verschickt.
 */
import { chromium } from 'playwright-core';

const BASE = process.env.BASE ?? 'http://localhost:3140';
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const fails = [];
let n = 0;
const ok = (c, m) => { n++; if (!c) fails.push(m); };

/* ---------- Desktop ---------- */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const sent = [];
  await page.route('**/api/contact', async (route) => {
    sent.push(JSON.parse(route.request().postData() ?? '{}'));
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });

  // Katalog: Suche, Filter, Vergleich
  await page.goto(`${BASE}/software/katalog`, { waitUntil: 'networkidle' });
  ok((await page.locator('article').count()) === 18, 'Katalog zeigt nicht 18 Karten');
  await page.fill('#sw-search', 'rechnung');
  ok((await page.locator('article h3').allTextContents()).some((t) => /Finance/.test(t)), 'Suche „rechnung“ findet Finance nicht');
  ok((await page.locator('article').count()) < 18, 'Suche filtert nicht');
  await page.fill('#sw-search', 'ki agent');
  ok((await page.locator('article h3').allTextContents()).some((t) => /AI Agent/.test(t)), 'Suche „ki agent“ findet AI Agent nicht');
  await page.fill('#sw-search', 'zzzzqq');
  ok(await page.getByText('Dazu gibt es noch kein Konzept').isVisible(), 'Leerzustand fehlt');
  await page.fill('#sw-search', '');
  await page.getByRole('button', { name: 'Personal', exact: true }).click();
  ok((await page.locator('article').count()) === 4, 'Kategorie Personal sollte 4 Karten zeigen');
  ok(page.url().includes('kat=persoenliche-software'), 'URL enthält Kategorie-Filter nicht');
  await page.getByRole('button', { name: 'Alle', exact: true }).first().click();
  await page.getByRole('button', { name: 'Konzern', exact: true }).click();
  ok((await page.locator('article').count()) > 0 && (await page.locator('article').count()) < 18, 'Zielgruppenfilter wirkungslos');
  await page.getByRole('button', { name: 'Alle Zielgruppen' }).click();
  // Vergleich: bis 3, 4. gesperrt
  const cmpBtns = page.getByRole('button', { name: /Vergleichen$/ });
  for (let i = 0; i < 3; i++) await page.locator('article').nth(i).getByRole('button', { name: /Vergleichen/ }).click();
  ok(await page.locator('article').nth(3).getByRole('button', { name: /Vergleichen/ }).isDisabled(), '4. Vergleichsprodukt nicht gesperrt');
  ok(await page.locator('#vergleich table').isVisible(), 'Vergleichstabelle fehlt');
  ok((await page.locator('#vergleich thead th').count()) === 4, 'Vergleichstabelle: 3 Produktspalten erwartet');
  ok(/vergleich=crm%2Cfinance%2Cworkforce/.test(page.url()), 'URL enthält Vergleich nicht');
  await page.reload({ waitUntil: 'networkidle' });
  ok(await page.locator('#vergleich table').isVisible(), 'Vergleich aus URL wird nicht wiederhergestellt');
  ok(!(await page.content()).includes('€/Monat'), 'Preis im Vergleich');

  // Anfrage: Vorbelegung, Validierung, Payload, Honeypot
  await page.goto(`${BASE}/software/anfrage?art=angebot&produkt=fleet-management`, { waitUntil: 'networkidle' });
  ok((await page.locator('#sw-product').inputValue()) === 'fleet-management', 'Produkt-Vorbelegung fehlt');
  ok(await page.getByRole('radio', { name: /Angebot erhalten/ }).isChecked(), 'Art-Vorbelegung fehlt');
  await page.getByRole('button', { name: 'Anfrage senden' }).click();
  ok((await page.getByRole('alert').count()) >= 3, 'Validierungsfehler fehlen');
  ok(sent.length === 0, 'Formular wurde trotz Fehlern gesendet');
  await page.fill('#sw-name', 'Test Person');
  await page.fill('#sw-email', 'test@example.com');
  await page.fill('#sw-message', 'Wir suchen eine Lösung für unseren Fuhrpark mit 30 Fahrzeugen.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Anfrage senden' }).click();
  await page.getByRole('status').waitFor();
  ok(sent.length === 1, 'Genau ein Versand erwartet');
  const p = sent[0] ?? {};
  ok(p.topic === 'Software: Angebot erhalten · MONVEX Fleet Management', `Topic falsch: ${p.topic}`);
  ok(/Art der Anfrage: Angebot erhalten/.test(p.message ?? '') && /Produkt \(Konzept\): MONVEX Fleet Management/.test(p.message ?? ''), 'Nachricht enthält Art/Produkt nicht');
  ok(p.consent === 'yes' && !p.website, 'Consent/Honeypot im Payload falsch');

  // Produktseite: Tabs, Anker, Kennzeichnung
  await page.goto(`${BASE}/software/analytics`, { waitUntil: 'networkidle' });
  ok(await page.getByText('Konzept-Vorschau · Beispieldaten').first().isVisible(), 'Kennzeichnung Konzept-Vorschau fehlt');
  ok(await page.getByText('Konzeptstatus:').isVisible(), 'Konzeptstatus-Hinweis fehlt');
  const before = await page.locator('.sw-win .sw-panel-title').first().textContent();
  await page.getByRole('tab', { name: 'Warnungen' }).click();
  const after = await page.locator('.sw-win .sw-panel-title').first().textContent();
  ok(before !== after, 'Mock-Tab wechselt Ansicht nicht');
  ok((await page.locator('details').count()) >= 4, 'FAQ unvollständig');
  ok((await page.locator('script[type="application/ld+json"]').allTextContents()).join('').includes('FAQPage'), 'FAQPage-JSON-LD fehlt');
  ok(!(await page.locator('script[type="application/ld+json"]').allTextContents()).join('').includes('SoftwareApplication'), 'Konzept darf kein SoftwareApplication-Schema tragen');
  ok((await page.locator('link[rel="canonical"]').getAttribute('href')) === '/software/analytics' || /\/software\/analytics$/.test((await page.locator('link[rel="canonical"]').getAttribute('href')) ?? ''), 'Canonical falsch');
  for (const t of ['Demo anfragen', 'Beratung vereinbaren', 'Angebot erhalten']) ok((await page.getByRole('link', { name: t }).count()) > 0, `CTA „${t}“ fehlt`);

  // Mega-Menü + Esc
  await page.goto(`${BASE}/software`, { waitUntil: 'networkidle' });
  const kiBtn = page.locator('header nav button', { hasText: 'Künstliche Intelligenz' });
  await kiBtn.hover();
  const mega = page.locator('#sw-mega');
  await mega.getByRole('link', { name: /AI Concierge/ }).waitFor({ state: 'visible' });
  ok(await mega.getByRole('link', { name: /Workflow Automation/ }).isVisible(), 'Mega-Menü zeigt Produkte nicht');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(700);
  ok((await mega.getByRole('link').count()) === 0, 'Esc schließt Mega-Menü nicht');

  // Hero-Bühne: Tabs
  await page.getByRole('group', { name: 'Produktvorschau wählen' }).getByRole('button', { name: /AI Agent/ }).click();
  await page.waitForTimeout(900);
  ok(await page.locator('.sw-win').getByText('MONVEX AI Agent').first().isVisible(), 'Hero-Bühne wechselt Produkt nicht');
  await ctx.close();
}

/* ---------- Mobil ---------- */
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/software`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Menü öffnen' }).click();
  ok(await page.locator('#sw-mobile').isVisible(), 'Mobile Navigation öffnet nicht');
  await page.locator('#sw-mobile').getByRole('button', { name: /Business Software/ }).click();
  await page.locator('#sw-mobile').getByRole('link', { name: /MONVEX Finance/ }).click();
  await page.waitForURL('**/software/finance');
  await page.locator('#sw-mobile').waitFor({ state: 'hidden' });
  ok(!(await page.locator('#sw-mobile').isVisible()), 'Mobile Navigation bleibt nach Navigation offen');
  ok((await page.evaluate(() => document.documentElement.style.overflow)) !== 'hidden', 'Scroll-Sperre bleibt nach Navigation aktiv');
  await ctx.close();
}

await b.close();
if (fails.length) {
  console.error(`✗ ${fails.length} von ${n} Prüfungen fehlgeschlagen:\n- ${fails.join('\n- ')}`);
  process.exit(1);
}
console.log(`✓ Interaktionen ok (${n} Prüfungen): Katalog, Vergleich, Formular, Produktseite, Menüs.`);
