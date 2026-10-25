#!/usr/bin/env node
/**
 * Layout-Test des Softwarebereichs gegen einen laufenden Server (Standard http://localhost:3140, `next start`):
 * für jede Seite und Breite: kein horizontaler Überlauf, Konsole ohne Fehler, genau ein h1, Hauptseiten-Hülle ausgeblendet.
 *   BASE=http://localhost:3140 npm run verify:software-layout
 */
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';

const BASE = process.env.BASE ?? 'http://localhost:3140';
const slugs = ['crm', 'finance', 'workforce', 'booking', 'document-cloud', 'ai-agent', 'ai-concierge', 'enterprise-ai', 'workflow-automation', 'analytics', 'integration-hub', 'service-desk', 'supplier-portal', 'fleet-management', 'money', 'garage', 'life', 'family'];
const cats = ['business-software', 'kuenstliche-intelligenz', 'enterprise-loesungen', 'persoenliche-software'];
const pages = ['/software', '/software/katalog', '/software/anfrage', ...cats.map((c) => `/software/kategorie/${c}`), ...slugs.map((s) => `/software/${s}`)];
const widths = [360, 390, 430, 768, 1024, 1280, 1440, 1920];

const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const bad = [];
let checks = 0;
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  page.on('pageerror', (e) => errs.push(String(e)));
  for (const p of pages) {
    errs.length = 0;
    const res = await page.goto(BASE + p, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      iw: window.innerWidth,
      h1: document.querySelectorAll('h1').length,
      mainNav: !!document.querySelector('nav[aria-label="Hauptnavigation"]'),
      swNav: !!document.querySelector('header [aria-label="MONVEX Software, Startseite"]'),
      mocks: document.querySelectorAll('.sw-win').length,
    }));
    checks += 1;
    if (res?.status() !== 200) bad.push(`${w} ${p}: HTTP ${res?.status()}`);
    if (r.sw > r.iw) bad.push(`${w} ${p}: horizontaler Überlauf ${r.sw} > ${r.iw}`);
    if (r.h1 !== 1) bad.push(`${w} ${p}: ${r.h1} h1`);
    if (!r.swNav) bad.push(`${w} ${p}: Software-Navigation fehlt`);
    if (r.mainNav) bad.push(`${w} ${p}: Hauptseiten-Navigation sichtbar`);
    const real = errs.filter((e) => !/favicon|Failed to load resource.*(font|_vercel)/i.test(e));
    if (real.length) bad.push(`${w} ${p}: Konsole: ${real[0].slice(0, 120)}`);
  }
  await ctx.close();
}
await b.close();
if (bad.length) {
  console.error(`✗ ${bad.length} Probleme (${checks} Prüfungen):\n- ${bad.slice(0, 40).join('\n- ')}`);
  process.exit(1);
}
console.log(`✓ Layout ok: ${pages.length} Seiten × ${widths.length} Breiten (${checks} Prüfungen), kein Überlauf, keine Konsolenfehler.`);
