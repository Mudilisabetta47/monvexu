#!/usr/bin/env node
/**
 * Flyer: druckfertiges PDF (DIN A5 148 x 210 mm + 3 mm Beschnitt, Vorder- und Rückseite) + PNG-Vorschauen.
 * Inhalte: design/flyer/flyer.config.json (mehrere Flyer-Varianten möglich).   npm run flyer
 * Ausgabe: design/flyer/out/
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'design/flyer/out');
fs.mkdirSync(outDir, { recursive: true });
const config = JSON.parse(fs.readFileSync(path.join(root, 'design/flyer/flyer.config.json'), 'utf8'));

const lp = fs.readFileSync(path.join(root, 'src/components/ui/logo-paths.ts'), 'utf8');
const grab = (block, key) => new RegExp(`${block}[\\s\\S]*?${key}:\\s*'([^']+)'`).exec(lp)[1];
const MARK = { ink: grab('MARK', 'ink'), ember: grab('MARK', 'ember') };
const WORD = { ink: grab('WORDMARK', 'ink'), ember: grab('WORDMARK', 'ember') };
const fontUrl = (f) => `file://${path.join(root, f)}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const accent = (s) => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');

const W = 154, H = 216; // mm inkl. 3 mm Beschnitt je Seite

const makeHtml = (f, co, qr) => `<!doctype html><html lang="de"><meta charset="utf-8"><style>
@font-face{font-family:G;src:url(${fontUrl('node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2')});font-weight:100 900}
@font-face{font-family:GM;src:url(${fontUrl('node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2')});font-weight:400}
@font-face{font-family:IS;src:url(${fontUrl('src/app/fonts/InstrumentSerif-Italic.woff2')});font-style:italic}
@page{size:${W}mm ${H}mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:G,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact;width:${W}mm}
.page{position:relative;width:${W}mm;height:${H}mm;overflow:hidden;break-after:page;page-break-after:always}
.page:last-child{break-after:auto;page-break-after:auto}
em{font-family:IS,serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.mono{font-family:GM,monospace;text-transform:uppercase}
/* ---------- Vorderseite ---------- */
.front{background:#0B0B0D;color:#fff}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.05) .15mm,transparent .15mm),linear-gradient(to bottom,rgba(255,255,255,.05) .15mm,transparent .15mm);background-size:7mm 7mm;-webkit-mask-image:radial-gradient(ellipse 90% 60% at 80% 12%,#000,transparent 80%);mask-image:radial-gradient(ellipse 90% 60% at 80% 12%,#000,transparent 80%)}
.glow{position:absolute;right:-30mm;top:-34mm;width:120mm;height:120mm;border-radius:50%;background:radial-gradient(circle,rgba(255,74,28,.36),transparent 62%)}
.bigmark{position:absolute;right:-12mm;top:22mm;width:72mm;height:72mm}
.front .logo{position:absolute;left:14mm;top:15mm;width:46mm}
.front .txt{position:absolute;left:14mm;right:14mm;bottom:55mm}
.front .eb{font-size:7pt;letter-spacing:.24em;color:#FF4A1C}
.front h1{margin-top:5mm;font-weight:600;font-size:41pt;line-height:.95;letter-spacing:-.05em}
.front h1 em{color:#FF4A1C;font-size:1.06em}
.front .lead{margin-top:7mm;max-width:104mm;font-size:10.6pt;line-height:1.5;color:rgba(255,255,255,.72)}
.cta{position:absolute;left:14mm;right:14mm;bottom:14mm;display:flex;align-items:center;gap:6mm;padding-top:6mm;border-top:.2mm solid rgba(255,255,255,.18)}
.cta .q{width:25mm;height:25mm;background:#fff;border-radius:2.2mm;padding:2mm;flex:none}
.cta .q svg{width:100%;height:100%;display:block}
.cta b{display:block;font-size:12.5pt;font-weight:600;letter-spacing:-.02em}
.cta span{display:block;margin-top:1.6mm;font-size:6.4pt;letter-spacing:.16em;color:rgba(255,255,255,.6)}
.cta i{display:block;margin-top:2.4mm;font:400 5.6pt GM,monospace;letter-spacing:.2em;text-transform:uppercase;color:#FF4A1C;font-style:normal}
/* ---------- Rückseite ---------- */
.back{background:#F6F5F1;color:#0B0B0D}
.back .bar{position:absolute;left:0;top:0;right:0;height:5.2mm;background:#0B0B0D}
.back .bar::after{content:"";position:absolute;right:0;top:0;height:100%;width:34mm;background:#FF4A1C}
.back .in{position:absolute;left:14mm;right:14mm;top:15mm;bottom:0}
.back .logo{width:30mm;display:block}
.back h2{margin-top:5mm;font-weight:600;font-size:24pt;line-height:1;letter-spacing:-.045em}
.back h2 em{color:#FF4A1C}
.svc{margin-top:5mm;display:grid;grid-template-columns:1fr 1fr;gap:2.6mm}
.svc div{background:#fff;border:.2mm solid rgba(11,11,13,.1);border-radius:2.4mm;padding:2.8mm 3.6mm 3mm}
.svc .n{font:400 5.4pt GM,monospace;letter-spacing:.2em;color:#FF4A1C}
.svc b{display:block;margin-top:1.2mm;font-size:9.4pt;font-weight:600;letter-spacing:-.025em}
.svc p{margin-top:.8mm;font-size:7.1pt;line-height:1.35;color:#55575D}
.ind{margin-top:5mm}
.ind .t{font-size:5.8pt;letter-spacing:.22em;color:#55575D}
.ind ul{margin-top:2.4mm;list-style:none;display:flex;flex-wrap:wrap;gap:1.4mm}
.ind li{border:.2mm solid rgba(11,11,13,.22);border-radius:10mm;padding:1.1mm 2.6mm;font-size:7pt}
.steps{margin-top:5mm;display:flex;align-items:center;gap:2mm;font-size:7.6pt;font-weight:500}
.steps span{display:flex;align-items:center;gap:1.8mm;white-space:nowrap}
.steps span i{display:grid;place-items:center;width:4.6mm;height:4.6mm;border-radius:50%;background:#0B0B0D;color:#fff;font:400 5.4pt GM,monospace;font-style:normal}
.steps hr{flex:1;border:0;border-top:.2mm dashed rgba(11,11,13,.3)}
.contact{position:absolute;left:0;right:0;bottom:10mm;background:#0B0B0D;color:#fff;border-radius:3.6mm;padding:5mm 7mm;display:flex;justify-content:space-between;align-items:flex-end;gap:6mm}
.contact h3{font-weight:600;font-size:15pt;letter-spacing:-.04em}
.contact h3 em{color:#FF4A1C}
.contact .who{margin-top:3.6mm;font-size:9.4pt;font-weight:600}
.contact .role{margin-top:.8mm;font:400 5.4pt GM,monospace;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.contact dl{margin-top:3mm;font-size:8.4pt;line-height:1.55;color:rgba(255,255,255,.85)}
.contact dl div{display:flex;gap:2.4mm}
.contact dt{font:500 5.6pt GM,monospace;color:#FF4A1C;width:2.4mm;padding-top:.5mm}
.contact .addr{text-align:right;font-size:6.8pt;line-height:1.5;color:rgba(255,255,255,.62)}
.contact .addr strong{display:block;color:#fff;font-weight:600}
.contact .addr svg{width:8mm;height:8mm;margin:0 0 2.6mm auto;display:block}
</style><body>
<section class="page front">
  <div class="grid"></div><div class="glow"></div>
  <svg class="bigmark" viewBox="6 6 52 52"><path d="${MARK.ember}" fill="#FF4A1C"/><path d="${MARK.ink}" fill="#fff"/></svg>
  <svg class="logo" viewBox="0 0 271.5 40"><path d="${WORD.ember}" fill="#FF4A1C"/><path d="${WORD.ink}" fill="#fff"/></svg>
  <div class="txt">
    <div class="eb mono">${esc(f.eyebrow)}</div>
    <h1>${accent(f.headline)}</h1>
    <p class="lead">${esc(f.lead)}</p>
  </div>
  <div class="cta"><div class="q">${qr}</div><div><b>${esc(f.qrLabel)}</b><span class="mono">${esc(f.qrSub)}</span><i>${esc(co.tagline)}</i></div></div>
</section>
<section class="page back">
  <div class="bar"></div>
  <div class="in">
    <svg class="logo" viewBox="0 0 271.5 40"><path d="${WORD.ember}" fill="#FF4A1C"/><path d="${WORD.ink}" fill="#0B0B0D"/></svg>
    <h2>${accent(f.backTitle.replace(/Hand\./, '*Hand.*'))}</h2>
    <div class="svc">${f.services.map(([t, d], i) => `<div><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('')}</div>
    <div class="ind"><div class="t mono">${esc(f.industriesTitle)}</div><ul>${f.industries.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <div class="steps">${f.steps.map((s, i) => `${i ? '<hr>' : ''}<span><i>${i + 1}</i>${esc(s)}</span>`).join('')}</div>
    <div class="contact">
      <div>
        <h3>${accent(f.ctaTitle.replace(/darüber\./, '*darüber.*'))}</h3>
        <div class="who">${esc(f.contact.name)}</div><div class="role">${esc(f.contact.title)}</div>
        <dl>${f.contact.phone ? `<div><dt>T</dt><dd>${esc(f.contact.phone)}</dd></div>` : ''}${f.contact.email ? `<div><dt>E</dt><dd>${esc(f.contact.email)}</dd></div>` : ''}<div><dt>W</dt><dd>${esc(co.website)}</dd></div></dl>
      </div>
      <div class="addr"><svg viewBox="6 6 52 52"><path d="${MARK.ember}" fill="#FF4A1C"/><path d="${MARK.ink}" fill="#fff"/></svg><strong>${esc(co.legalName)}</strong>${esc(co.street)}<br>${esc(co.city)}</div>
    </div>
  </div>
</section>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const mm = 96 / 25.4;
for (const f of config.flyers) {
  const qr = await QRCode.toString(f.qrUrl, { type: 'svg', margin: 0, color: { dark: '#0B0B0D', light: '#0000' }, errorCorrectionLevel: 'M' });
  const htmlPath = path.join(outDir, `${f.slug}.html`);
  fs.writeFileSync(htmlPath, makeHtml(f, config.company, qr));
  const page = await browser.newPage({ viewport: { width: Math.round(W * mm), height: Math.round(H * mm) } });
  await page.goto('file://' + htmlPath);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(outDir, `monvex-flyer-${f.slug}-druck.pdf`), width: `${W}mm`, height: `${H}mm`, printBackground: true, preferCSSPageSize: true });
  const big = await browser.newPage({ viewport: { width: Math.round(W * mm), height: Math.round(H * mm) * 2 + 4 }, deviceScaleFactor: 1100 / (148 * mm) });
  await big.goto('file://' + htmlPath);
  await big.evaluate(() => document.fonts.ready);
  for (const [i, name] of ['vorderseite', 'rueckseite'].entries()) {
    await big.screenshot({ path: path.join(outDir, `monvex-flyer-${f.slug}-${name}.png`), clip: { x: 3 * mm, y: i * H * mm + 3 * mm, width: 148 * mm, height: 210 * mm } });
  }
  fs.unlinkSync(htmlPath);
}
await browser.close();
console.log('OK →', outDir);
