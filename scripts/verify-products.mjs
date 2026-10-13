#!/usr/bin/env node
/**
 * Prüfung der Produktintegration (Server muss laufen):  npm run verify:products   (BASE_URL=http://localhost:3055)
 *  - Seiten erreichbar, Navigation/Mega-Menü funktionieren, Produktlinks führen auf die richtigen Ziele
 *  - externe Links: https, target=_blank, rel=noopener noreferrer
 *  - Aussagen-Wächter: keine Preise, keine Referenz-/Kundenbehauptungen, keine internen Adressen, kein "Jetzt kaufen"
 *  - SEO: Titel, Beschreibung, Canonical, Open-Graph-Bild, JSON-LD, Sitemap-Eintrag
 */
import { chromium } from 'playwright-core';

const BASE = (process.env.BASE_URL ?? 'http://localhost:3055').replace(/\/$/, '');
const fails = [];
const ok = (c, m) => { console.log(`${c ? 'ok  ' : 'FAIL'} ${m}`); if (!c) fails.push(m); };
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/\s+/g, ' ');

const pages = ['/produkte', '/produkte/busos', '/produkte/easykfz24'];
const sitemap = await (await fetch(BASE + '/sitemap.xml')).text();
for (const path of pages) {
  const r = await fetch(BASE + path);
  const html = await r.text();
  ok(r.status === 200, `${path}: HTTP 200`);
  ok(new RegExp(`<link rel="canonical" href="[^"]*${path}"`).test(html), `${path}: Canonical`);
  ok(/<meta property="og:image" content="[^"]+"/.test(html) || path === '/produkte', `${path}: og:image`);
  ok((html.match(/<h1[\s>]/g) ?? []).length === 1, `${path}: genau eine H1`);
  ok(/application\/ld\+json/.test(html), `${path}: JSON-LD`);
  ok(sitemap.includes(path), `${path}: in sitemap.xml`);
  const t = text(html);
  ok(!/\d\s?€|€\s?\d/.test(t), `${path}: keine Preisangaben`);
  ok(!/Referenz(en)?\b|Kundenstimmen|zufriedene Kunden|Testimonial/i.test(t.replace(/Kundenreferenz\w*/g, '')), `${path}: keine Referenz-/Kundenbehauptungen`);
  ok(!/localhost|127\.0\.0\.1|\.invalid|:3100|SEED_|password|passwort/i.test(html.replace(/Passwort/gi, '')), `${path}: keine internen Adressen/Zugangsdaten im HTML`);
  ok(!/Jetzt kaufen|Jetzt buchen|Preise ab|kostenlos testen/i.test(t), `${path}: keine Verkaufs-/Preisversprechen`);
  for (const m of html.matchAll(/<a [^>]*href="(https?:\/\/(?!(?:www\.)?monvex)[^"]+)"[^>]*>/g)) {
    const tag = m[0];
    ok(/target="_blank"/.test(tag) && /rel="noopener noreferrer"/.test(tag), `${path}: externer Link sicher eingebunden: ${m[1]}`);
  }
}
const busos = text(await (await fetch(BASE + '/produkte/busos')).text());
ok(/in Entwicklung/i.test(busos) && /Demo/i.test(busos), 'BusOS: Produktstatus und Demo-Kennzeichnung vorhanden');
ok(!/Live GPS.*(verfügbar|nutzbar)/i.test(busos.replace(/Live GPS\s+Echte[^.]*\./i, '')), 'BusOS: Live GPS nicht als verfügbar beworben');
const easy = text(await (await fetch(BASE + '/produkte/easykfz24')).text());
ok(/keine Behörde/i.test(easy), 'EasyKFZ24: Hinweis „keine Behörde“');
ok(!/betrieben von|Betreiber|Inhaber/i.test(easy), 'EasyKFZ24: kein Betreiber-/Eigentumsanspruch behauptet');

// Phase 2: Teilen-Bilder, Story, Querverweise
for (const f of ['/products/og.jpg', '/products/busos/og.jpg', '/products/easykfz24/og.jpg']) {
  const r = await fetch(BASE + f);
  ok(r.status === 200 && /image\/jpeg/.test(r.headers.get('content-type') ?? ''), `Open-Graph-Bild ${f}`);
}
for (const [path, n] of [['/produkte/busos', 3], ['/produkte/easykfz24', 3]]) {
  const h = await (await fetch(BASE + path)).text();
  ok((h.match(/aria-roledescription|<ol class="space-y-16/g) ?? []).length >= 1 && (h.match(/<li class="grid gap-8 lg:grid-cols-12/g) ?? []).length === n, `${path}: Produkt-Story mit ${n} Schritten`);
}
const bus = await (await fetch(BASE + '/werbeagentur/busunternehmen')).text();
ok(bus.includes('href="/produkte/busos"'), 'Branchenseite Busunternehmen verlinkt MONVEX BusOS');

// Navigation im Browser
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto(BASE + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
const nav = p.locator('nav[aria-label="Hauptnavigation"]');
ok((await nav.locator('a', { hasText: 'Produkte' }).count()) === 1, 'Navigation: Punkt „Produkte“ vorhanden');
ok((await nav.locator('a', { hasText: 'Technologie' }).count()) === 1, 'Navigation: Punkt „Technologie“ vorhanden');
const box = await nav.locator('a', { hasText: 'Produkte' }).boundingBox();
await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 }); await p.waitForTimeout(900);
ok(await p.locator('#mega-products').isVisible(), 'Mega-Menü „Produkte“ öffnet beim Hover');
ok((await p.locator('#mega-products img').count()) >= 2, 'Mega-Menü zeigt zwei Produktvorschauen');
ok((await p.locator('#mega-products a[href="/produkte/busos#demo"]').count()) === 1 && (await p.locator('#mega-products a[href="https://easykfz24.de/"][rel="noopener noreferrer"]').count()) === 1, 'Mega-Menü: Schnellzugriffe Demo anfragen und easykfz24.de');
await p.keyboard.press('Escape'); await p.waitForTimeout(500);
ok((await p.locator('#mega-products').count()) === 0, 'Escape schließt das Mega-Menü');
await p.mouse.move(40, 600); await p.waitForTimeout(300);
await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 }); await p.waitForTimeout(900);
await p.locator('#mega-products a[href="/produkte/busos"]').click(); await p.waitForURL('**/produkte/busos'); ok(true, 'Mega-Menü → /produkte/busos');
await p.goto(BASE + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
await p.mouse.move(40, 600); await p.waitForTimeout(300);
await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 }); await p.waitForTimeout(800);
await p.locator('#mega-products a[href="/produkte/easykfz24"]').click(); await p.waitForURL('**/produkte/easykfz24'); ok(true, 'Mega-Menü → /produkte/easykfz24');
// Startseite: beide Showcases mit Links
await p.goto(BASE + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
ok((await p.locator('#produkte #busos').count()) === 1 && (await p.locator('#produkte #easykfz24').count()) === 1, 'Startseite: BusOS- und EasyKFZ24-Showcase');
ok((await p.locator('#easykfz24 a[href="https://easykfz24.de/"][target=_blank][rel="noopener noreferrer"]').count()) === 1, 'Startseite: „EasyKFZ24 besuchen“ → https://easykfz24.de/ (sicher)');
ok((await p.locator('#busos a[href="/produkte/busos#demo"]').count()) === 1, 'Startseite: „Demo anfragen“ → /produkte/busos#demo');
// Hero hat die Produkt-Folie
ok((await p.locator('#top h2, #top h1').filter({ hasText: /Eigene Software/ }).count()) === 1, 'Hero: Folie „Eigene Software. Eigene Plattformen.“');
// Mobil
const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
await m.goto(BASE + '/', { waitUntil: 'networkidle' }); await m.waitForTimeout(1200);
await m.getByRole('button', { name: 'Menü öffnen' }).click(); await m.waitForTimeout(1200);
await m.getByRole('button', { name: /Produkte: Unterpunkte/ }).click(); await m.waitForTimeout(700);
ok((await m.locator('#mobile-menu a[href="/produkte/busos"]').isVisible()) && (await m.locator('#mobile-menu a[href="/produkte/easykfz24"]').isVisible()), 'Mobil: Menü zeigt beide Produkte');
ok(errs.length === 0, `keine JavaScript-Fehler (${errs.length})`);
await b.close();
console.log(fails.length ? `\n${fails.length} FEHLER` : '\nOK – alle Produktprüfungen bestanden.');
process.exit(fails.length ? 1 : 0);
