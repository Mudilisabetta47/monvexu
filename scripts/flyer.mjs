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
import { legalName } from './company-name.mjs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as Lucide from 'lucide-react';

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
const optional = (s, on) => String(s).replace(/ ?\[([^\]]*)\]/g, on ? ' $1' : '');
const accent = (s) => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');

/** Lucide-Symbol als statisches SVG (Konturstärke/Farbe anpassbar). */
const icon = (name, size, color, stroke = 1.7) => renderToStaticMarkup(createElement(Lucide[name], { size, color, strokeWidth: stroke, absoluteStrokeWidth: false }));

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
.back .in{position:absolute;left:14mm;right:14mm;top:15mm}
.back .logo{width:30mm;display:block}
.back h2{margin-top:5mm;font-weight:600;font-size:25pt;line-height:1;letter-spacing:-.045em}
.back h2 em{color:#FF4A1C}
.svc{margin-top:11mm;display:grid;grid-template-columns:1fr 1fr;gap:9mm 7mm}
.svc .r{display:flex;gap:4mm;align-items:flex-start}
.svc .ic{flex:none;width:12.5mm;height:12.5mm;border-radius:3.4mm;background:#0B0B0D;display:grid;place-items:center}
.svc .ic svg{display:block}
.svc .r:nth-child(4n+1) .ic,.svc .r:nth-child(4n+2) .ic{background:#0B0B0D}
.svc b{display:block;font-size:10pt;font-weight:600;letter-spacing:-.025em;line-height:1.15;padding-top:.4mm}
.svc p{margin-top:1mm;font-size:7.4pt;line-height:1.38;color:#55575D}
.ind{margin-top:11mm;border-top:.2mm solid rgba(11,11,13,.14);padding-top:5mm}
.ind .t{font-size:5.8pt;letter-spacing:.22em;color:#55575D}
.ind p{margin-top:2.4mm;font-size:9.4pt;font-weight:500;line-height:1.55;letter-spacing:-.01em}
.ind p i{color:#FF4A1C;font-style:normal;padding:0 1.3mm}
.steps{margin-top:9mm;display:flex;align-items:center;gap:2mm;font-size:8pt;font-weight:500}
.steps span{display:flex;align-items:center;gap:1.8mm;white-space:nowrap}
.steps span i{display:grid;place-items:center;width:4.6mm;height:4.6mm;border-radius:50%;background:#FF4A1C;color:#fff;font:400 5.4pt GM,monospace;font-style:normal}
.steps hr{flex:1;border:0;border-top:.2mm dashed rgba(11,11,13,.3)}
.foot{position:absolute;left:0;right:0;bottom:0;height:46mm;background:#0B0B0D;color:#fff;padding:6mm 14mm 8mm;display:flex;justify-content:space-between;gap:8mm}
.foot::before{content:"";position:absolute;left:0;top:0;width:34mm;height:1.2mm;background:#FF4A1C}
.foot h3{font-weight:600;font-size:17pt;letter-spacing:-.04em;line-height:1}
.foot h3 em{color:#FF4A1C}
.foot .who{margin-top:3.6mm;font-size:10.4pt;font-weight:600}
.foot .role{margin-top:.9mm;font:400 6.6pt GM,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.8)}
.foot .mk{margin-top:4mm;width:7.5mm;height:7.5mm;display:block}
.foot ul{list-style:none;font-size:9.4pt;line-height:1.25;color:#fff;display:flex;flex-direction:column;gap:${hasPhone ? 1.9 : 2.8}mm;padding-top:.4mm}
.foot li{display:flex;align-items:center;gap:3mm}
.foot li .ci{flex:none;width:6.8mm;height:6.8mm;border-radius:50%;border:.2mm solid rgba(255,255,255,.28);display:grid;place-items:center}
.foot li .cn{display:block;font-size:8.3pt;white-space:nowrap}
.foot li small{display:block;font-size:7.8pt;color:rgba(255,255,255,.8);margin-top:.4mm}
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
    <div class="svc">${f.services.map(([t, d, ic]) => `<div class="r"><span class="ic">${icon(ic, 21, '#FFFFFF', 1.6)}</span><div><b>${esc(t)}</b><p>${esc(d)}</p></div></div>`).join('')}</div>
    <div class="ind"><span class="t mono">${esc(f.industriesTitle)}</span><p>${f.industries.map(esc).join('<i>·</i>')}</p></div>
    <div class="steps">${f.steps.map((s, i) => `${i ? '<hr>' : ''}<span><i>${i + 1}</i>${esc(s)}</span>`).join('')}</div>
  </div>
  <div class="foot">
    <div>
      <h3>${accent(f.ctaTitle.replace(/darüber\./, '*darüber.*'))}</h3>
      <div class="who">${esc(f.contact.name)}</div><div class="role">${esc(f.contact.title)}</div>
      <svg class="mk" viewBox="6 6 52 52"><path d="${MARK.ember}" fill="#FF4A1C"/><path d="${MARK.ink}" fill="#fff"/></svg>
    </div>
    <ul>
      ${f.contact.phone ? `<li><span class="ci">${icon('Phone', 13, '#FF4A1C', 1.8)}</span><span>${esc(f.contact.phone)}</span></li>` : ''}
      ${f.contact.email ? `<li><span class="ci">${icon('Mail', 13, '#FF4A1C', 1.8)}</span><span>${esc(f.contact.email)}</span></li>` : ''}
      <li><span class="ci">${icon('Globe', 13, '#FF4A1C', 1.8)}</span><span>${esc(co.website)}</span></li>
      <li><span class="ci">${icon('MapPin', 13, '#FF4A1C', 1.8)}</span><span><span class="cn">${esc(legalName)}</span><small>${esc(co.street)} · ${esc(co.city)}</small></span></li>
    </ul>
  </div>
</section>
</body></html>`;


const makeOfferHtml = (f, co, qr) => {
  const ct = f.contact ?? co.contact;
  const hasPhone = !!ct.phone;
  return `<!doctype html><html lang="de"><meta charset="utf-8"><style>
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
.front{background:#0B0B0D;color:#fff}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.05) .15mm,transparent .15mm),linear-gradient(to bottom,rgba(255,255,255,.05) .15mm,transparent .15mm);background-size:7mm 7mm;-webkit-mask-image:radial-gradient(ellipse 90% 55% at 85% 10%,#000,transparent 80%);mask-image:radial-gradient(ellipse 90% 55% at 85% 10%,#000,transparent 80%)}
.glow{position:absolute;right:-34mm;top:-38mm;width:120mm;height:120mm;border-radius:50%;background:radial-gradient(circle,rgba(255,74,28,.32),transparent 62%)}
.front .logo{position:absolute;left:14mm;top:15mm;width:40mm}
.badge{position:absolute;right:12mm;top:12mm;width:36mm;height:36mm;border-radius:50%;background:#FF4A1C;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-9deg);box-shadow:0 2mm 5mm rgba(0,0,0,.35);text-align:center}
.badge span{font:500 7pt GM,monospace;letter-spacing:.2em;text-transform:uppercase}
.badge b{margin-top:1.4mm;font-size:15pt;line-height:.98;font-weight:700;letter-spacing:-.04em}
.badge::after{content:"";position:absolute;inset:1.6mm;border-radius:50%;border:.25mm dashed rgba(255,255,255,.6)}
.front .eb{position:absolute;left:14mm;top:51mm;font-size:7.6pt;letter-spacing:.24em;color:#FF4A1C}
.front h1{position:absolute;left:14mm;right:14mm;top:59mm;font-weight:600;font-size:34pt;line-height:.98;letter-spacing:-.05em}
.front h1 em{color:#FF4A1C;font-size:1.06em}
.front .lead{position:absolute;left:14mm;right:16mm;top:99mm;font-size:10.8pt;line-height:1.45;color:rgba(255,255,255,.88)}
.chk{position:absolute;left:14mm;right:14mm;top:118mm;display:flex;flex-direction:column;gap:3.4mm}
.chk .r{display:flex;gap:3.8mm;align-items:center}
.chk .ci{flex:none;width:11.5mm;height:11.5mm;border-radius:50%;border:.25mm solid rgba(255,74,28,.7);display:grid;place-items:center}
.chk b{display:block;font-size:11.4pt;font-weight:600;letter-spacing:-.02em}
.chk p{margin-top:.6mm;font-size:9pt;line-height:1.3;color:rgba(255,255,255,.86)}
.cta{position:absolute;left:14mm;right:14mm;bottom:11mm;display:flex;align-items:center;gap:5.5mm;padding-top:4.6mm;border-top:.2mm solid rgba(255,255,255,.18)}
.cta .q{width:27mm;height:27mm;background:#fff;border-radius:2.2mm;padding:2mm;flex:none}
.cta .q svg{width:100%;height:100%;display:block}
.cta b{display:block;font-size:13.4pt;font-weight:700;letter-spacing:-.03em;line-height:1.1}
.cta .off{margin-top:1.6mm;font-size:8.6pt;line-height:1.35;color:rgba(255,255,255,.9)}
.cta .tel{margin-top:2.2mm;font-size:13pt;font-weight:700;letter-spacing:-.02em;color:#FF4A1C}.cta .tel small{font-size:8pt;font-weight:500;color:rgba(255,255,255,.85);letter-spacing:0}
.cta .url{display:block;margin-top:1.6mm;font-size:7pt;letter-spacing:.12em;color:rgba(255,255,255,.8)}
.back{background:#F6F5F1;color:#0B0B0D}
.back .bar{position:absolute;left:0;top:0;right:0;height:5.2mm;background:#0B0B0D}
.back .bar::after{content:"";position:absolute;right:0;top:0;height:100%;width:34mm;background:#FF4A1C}
.back .in{position:absolute;left:14mm;right:14mm;top:15mm}
.back .logo{width:30mm;display:block}
.back h2{margin-top:5mm;font-weight:600;font-size:25pt;line-height:1;letter-spacing:-.045em}
.back h2 em{color:#FF4A1C}
.st{margin-top:5mm;display:flex;flex-direction:column}
.st .r{display:flex;gap:5mm;align-items:flex-start;padding:2.3mm 0;border-top:.2mm solid rgba(11,11,13,.14)}
.st .n{flex:none;width:11mm;font-weight:600;font-size:21pt;line-height:.9;letter-spacing:-.06em;color:#FF4A1C}
.st b{display:block;font-size:11.4pt;font-weight:600;letter-spacing:-.025em}
.st p{margin-top:.6mm;font-size:9pt;line-height:1.32;color:#34363B}
.bn{margin-top:1.6mm;border-top:.2mm solid rgba(11,11,13,.14);padding-top:4mm}
.bn .t{font-size:6.8pt;letter-spacing:.2em;color:#3F4147}
.bg{margin-top:3.6mm;display:grid;grid-template-columns:1fr 1fr;gap:5.6mm 6mm}
.bg .r{display:flex;gap:3.4mm;align-items:flex-start}
.bg .ic{flex:none;width:10.5mm;height:10.5mm;border-radius:3mm;background:#0B0B0D;display:grid;place-items:center}
.bg b{display:block;font-size:10.4pt;font-weight:600;letter-spacing:-.025em;line-height:1.15;padding-top:.3mm}
.bg p{margin-top:.5mm;font-size:8.4pt;line-height:1.3;color:#34363B}
.tr{margin-top:6mm;display:flex;flex-direction:column;gap:2mm}
.tr div{display:flex;gap:2.6mm;align-items:center;font-size:8.8pt;font-weight:500}
.tr .ti{flex:none;width:5.6mm;height:5.6mm;border-radius:50%;background:rgba(255,74,28,.12);display:grid;place-items:center}
.foot{position:absolute;left:0;right:0;bottom:0;height:46mm;background:#0B0B0D;color:#fff;padding:6mm 14mm 8mm;display:flex;justify-content:space-between;gap:8mm}
.foot::before{content:"";position:absolute;left:0;top:0;width:34mm;height:1.2mm;background:#FF4A1C}
.foot h3{font-weight:600;font-size:17pt;letter-spacing:-.04em;line-height:1}
.foot h3 em{color:#FF4A1C}
.foot .who{margin-top:3.6mm;font-size:10.4pt;font-weight:600}
.foot .role{margin-top:.9mm;font:400 6.6pt GM,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.8)}
.foot .mk{margin-top:4mm;width:7.5mm;height:7.5mm;display:block}
.foot ul{list-style:none;font-size:9.4pt;line-height:1.25;color:#fff;display:flex;flex-direction:column;gap:${hasPhone ? 1.9 : 2.8}mm;padding-top:.4mm}
.foot li{display:flex;align-items:center;gap:3mm}
.foot li .ci{flex:none;width:6.8mm;height:6.8mm;border-radius:50%;border:.2mm solid rgba(255,255,255,.28);display:grid;place-items:center}
.foot li .cn{display:block;font-size:8.3pt;white-space:nowrap}
.foot li small{display:block;font-size:7.8pt;color:rgba(255,255,255,.8);margin-top:.4mm}
</style><body>
<section class="page front">
  <div class="grid"></div><div class="glow"></div>
  <svg class="logo" viewBox="0 0 271.5 40"><path d="${WORD.ember}" fill="#FF4A1C"/><path d="${WORD.ink}" fill="#fff"/></svg>
  <div class="badge"><span>${esc(f.badgeTop)}</span><b>${esc(f.badgeMain).replace('-', '-<br>')}</b></div>
  <div class="eb mono">${esc(f.eyebrow)}</div>
  <h1>${accent(f.headline)}</h1>
  <p class="lead">${esc(f.lead)}</p>
  <div class="chk">${f.checks.map(([ic, t, d]) => `<div class="r"><span class="ci">${icon(ic, 17, '#FF4A1C', 1.7)}</span><div><b>${esc(t)}</b><p>${esc(d)}</p></div></div>`).join('')}</div>
  <div class="cta"><div class="q">${qr}</div><div><b>${esc(f.qrLabel)}</b><div class="off">${esc(f.offer)}</div>${hasPhone ? `<div class="tel"><small>Oder anrufen:</small> ${esc(ct.phone)}</div>` : ''}<span class="url mono">${esc(f.qrSub)}</span></div></div>
</section>
<section class="page back">
  <div class="bar"></div>
  <div class="in">
    <svg class="logo" viewBox="0 0 271.5 40"><path d="${WORD.ember}" fill="#FF4A1C"/><path d="${WORD.ink}" fill="#0B0B0D"/></svg>
    <h2>${accent(f.backTitle)}</h2>
    <div class="st">${f.steps.map(([t, d], i) => `<div class="r"><span class="n">${i + 1}</span><div><b>${esc(t)}</b><p>${esc(optional(d, hasPhone))}</p></div></div>`).join('')}</div>
    <div class="bn"><div class="t mono">${esc(f.bonusTitle)}</div>
      <div class="bg">${f.bonus.map(([ic, t, d]) => `<div class="r"><span class="ic">${icon(ic, 19, '#FFFFFF', 1.6)}</span><div><b>${esc(t)}</b><p>${esc(d)}</p></div></div>`).join('')}</div>
    </div>
    <div class="tr">${f.trust.map(([ic, t]) => `<div><span class="ti">${icon(ic, 12, '#FF4A1C', 1.9)}</span>${esc(t)}</div>`).join('')}</div>
  </div>
  <div class="foot" style="height:${hasPhone ? 52 : 46}mm">
    <div>
      <h3>${accent(f.ctaTitle.replace(/darüber\./, '*darüber.*'))}</h3>
      <div class="who">${esc(ct.name)}</div><div class="role">${esc(ct.title)}</div>
      <svg class="mk" viewBox="6 6 52 52"><path d="${MARK.ember}" fill="#FF4A1C"/><path d="${MARK.ink}" fill="#fff"/></svg>
    </div>
    <ul>
      ${ct.phone ? `<li><span class="ci">${icon('Phone', 13, '#FF4A1C', 1.8)}</span><span>${esc(ct.phone)}</span></li>` : ''}
      ${ct.email ? `<li><span class="ci">${icon('Mail', 13, '#FF4A1C', 1.8)}</span><span>${esc(ct.email)}</span></li>` : ''}
      <li><span class="ci">${icon('Globe', 13, '#FF4A1C', 1.8)}</span><span>${esc(co.website)}</span></li>
      <li><span class="ci">${icon('MapPin', 13, '#FF4A1C', 1.8)}</span><span><span class="cn">${esc(legalName)}</span><small>${esc(co.street)} · ${esc(co.city)}</small></span></li>
    </ul>
  </div>
</section>
</body></html>`;
};

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const mm = 96 / 25.4;
for (const f of config.flyers) {
  const qr = await QRCode.toString(f.qrUrl, { type: 'svg', margin: 0, color: { dark: '#0B0B0D', light: '#0000' }, errorCorrectionLevel: 'M' });
  const htmlPath = path.join(outDir, `${f.slug}.html`);
  fs.writeFileSync(htmlPath, (f.template === 'offer' ? makeOfferHtml : makeHtml)(f, { ...config.company, contact: config.contact }, qr));
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
