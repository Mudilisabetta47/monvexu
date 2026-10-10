#!/usr/bin/env node
/**
 * Visitenkarte: erzeugt druckfertiges PDF (85 x 55 mm + 3 mm Beschnitt, Vorder- und Rückseite) und PNG-Vorschauen.
 * Daten: design/visitenkarte/card.config.json (leere Felder werden weggelassen).
 *
 *   npm run card            # nutzt Google Chrome (CHROME_PATH überschreibt den Pfad)
 *
 * Ausgabe: design/visitenkarte/out/
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import { chromium } from 'playwright-core';
import { legalName } from './company-name.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'design/visitenkarte/out');
fs.mkdirSync(outDir, { recursive: true });
const config = JSON.parse(fs.readFileSync(path.join(root, 'design/visitenkarte/card.config.json'), 'utf8'));

// Logo-Pfade aus der einzigen Quelle (logo-paths.ts) lesen
const lp = fs.readFileSync(path.join(root, 'src/components/ui/logo-paths.ts'), 'utf8');
const grab = (block, key) => new RegExp(`${block}[\\s\\S]*?${key}:\\s*'([^']+)'`).exec(lp)[1];
const MARK = { ink: grab('MARK', 'ink'), ember: grab('MARK', 'ember') };
const WORD = { ink: grab('WORDMARK', 'ink'), ember: grab('WORDMARK', 'ember') };
const font = (f) => `file://${path.join(root, 'node_modules/geist/dist/fonts', f)}`;

const qr = await QRCode.toString(config.company.websiteUrl, { type: 'svg', margin: 0, color: { dark: '#0B0B0D', light: '#0000' }, errorCorrectionLevel: 'M' });
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const makeHtml = (cfg) => {
  const rows = [
    cfg.phone && ['T', cfg.phone],
    cfg.email && ['E', cfg.email],
    cfg.website && ['W', cfg.website],
  ].filter(Boolean);
  return `<!doctype html><html lang="de"><meta charset="utf-8"><style>
@font-face{font-family:G;src:url(${font('geist-sans/Geist-Variable.woff2')});font-weight:100 900}
@font-face{font-family:GM;src:url(${font('geist-mono/GeistMono-Regular.woff2')});font-weight:400}
@page{size:91mm 61mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:91mm}
body{font-family:G,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.card{position:relative;width:91mm;height:61mm;overflow:hidden;page-break-after:always;break-after:page}
.card:last-child{page-break-after:auto;break-after:auto}
/* Sicherheitsabstand: 3 mm Beschnitt + 5 mm Rand = 8 mm vom Blattrand */
.safe{position:absolute;inset:8mm}
.front{background:#0B0B0D;color:#fff}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.055) .15mm,transparent .15mm),linear-gradient(to bottom,rgba(255,255,255,.055) .15mm,transparent .15mm);background-size:5mm 5mm;-webkit-mask-image:radial-gradient(ellipse 80% 90% at 85% 15%,#000 0%,transparent 75%);mask-image:radial-gradient(ellipse 80% 90% at 85% 15%,#000 0%,transparent 75%)}
.glow{position:absolute;right:-18mm;top:-22mm;width:60mm;height:60mm;border-radius:50%;background:radial-gradient(circle,rgba(255,74,28,.34),transparent 65%)}
.bigmark{position:absolute;right:-5mm;top:-4mm;width:42mm;height:42mm}
.front .word{position:absolute;left:8mm;bottom:12.5mm;width:44mm}
.front .tag{position:absolute;left:8mm;bottom:8mm;font:400 5.2pt GM,monospace;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.back{background:#F6F5F1;color:#0B0B0D}
.back .bar{position:absolute;left:0;top:0;bottom:0;width:5.2mm;background:#0B0B0D}
.back .bar::after{content:"";position:absolute;left:0;bottom:0;width:100%;height:17mm;background:#FF4A1C}
.who{position:absolute;left:11mm;top:9.5mm}
.who .n{font:600 11.5pt/1.05 G,sans-serif;letter-spacing:-.03em}
.who .t{margin-top:1.4mm;font:400 5.4pt GM,monospace;letter-spacing:.2em;text-transform:uppercase;color:#55575D}
.contact{position:absolute;left:11mm;top:25.5mm;font:400 7.4pt/1 G,sans-serif}
.contact div{display:flex;gap:2.2mm;align-items:baseline;margin-bottom:1.9mm}
.contact b{font:500 5.2pt GM,monospace;color:#FF4A1C;width:2.2mm;letter-spacing:.05em}
.qr{position:absolute;right:8mm;top:9.5mm;width:15mm;height:15mm}
.qr svg{width:100%;height:100%;display:block}
.qrl{position:absolute;right:8mm;top:25mm;width:15mm;text-align:center;font:400 4pt GM,monospace;letter-spacing:.16em;text-transform:uppercase;color:#8B8D93}
.foot{position:absolute;left:11mm;right:8mm;bottom:7.6mm;border-top:.18mm solid rgba(11,11,13,.15);padding-top:1.7mm;display:flex;justify-content:space-between;align-items:flex-start}
.foot .a{font:400 5.3pt/1.45 G,sans-serif;color:#55575D}
.foot .a strong{font-weight:600;color:#0B0B0D}
.foot .m{width:5mm;height:5mm}
</style>
<body>
<div class="card front">
  <div class="grid"></div><div class="glow"></div>
  <svg class="bigmark" viewBox="6 6 52 52"><path d="${MARK.ember}" fill="#FF4A1C"/><path d="${MARK.ink}" fill="#fff"/></svg>
  <svg class="word" viewBox="0 0 271.5 40"><path d="${WORD.ember}" fill="#FF4A1C"/><path d="${WORD.ink}" fill="#fff"/></svg>
  <div class="tag">${esc(cfg.tagline)}</div>
</div>
<div class="card back">
  <div class="bar"></div>
  <div class="who"><div class="n">${esc(cfg.name)}</div>${cfg.title ? `<div class="t">${esc(cfg.title)}</div>` : ''}</div>
  <div class="contact">${rows.map(([k, v]) => `<div><b>${k}</b><span>${esc(v)}</span></div>`).join('')}</div>
  <div class="qr">${qr}</div><div class="qrl">Website</div>
  <div class="foot">
    <div class="a"><strong>${esc(legalName)}</strong><br>${esc(cfg.street)} · ${esc(cfg.city)}</div>
    <svg class="m" viewBox="6 6 52 52"><path d="${MARK.ember}" fill="#FF4A1C"/><path d="${MARK.ink}" fill="#0B0B0D"/></svg>
  </div>
</div>
</body></html>`;
};


const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const mm = 96 / 25.4;
for (const person of config.people) {
  const cfg = { ...config.company, ...person };
  const htmlPath = path.join(outDir, `${person.slug}.html`);
  fs.writeFileSync(htmlPath, makeHtml(cfg));
  const page = await browser.newPage({ viewport: { width: 344, height: 231 } });
  await page.goto('file://' + htmlPath);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(outDir, `monvex-visitenkarte-${person.slug}-druck.pdf`), width: '91mm', height: '61mm', printBackground: true, preferCSSPageSize: true });
  const big = await browser.newPage({ viewport: { width: Math.round(91 * mm), height: Math.round(61 * mm) * 2 + 2 }, deviceScaleFactor: 1004 / (85 * mm) });
  await big.goto('file://' + htmlPath);
  await big.evaluate(() => document.fonts.ready);
  for (const [i, name] of ['vorderseite', 'rueckseite'].entries()) {
    await big.screenshot({ path: path.join(outDir, `monvex-visitenkarte-${person.slug}-${name}.png`), clip: { x: 3 * mm, y: i * 61 * mm + 3 * mm, width: 85 * mm, height: 55 * mm } });
  }
  fs.unlinkSync(htmlPath);
}
await browser.close();
console.log('OK →', outDir);
