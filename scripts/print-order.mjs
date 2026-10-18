#!/usr/bin/env node
/**
 * Druckauftrags-Übersicht (1 Seite, DIN A4) für die Druckerei: Spezifikation, Dateien, Kontakt.
 *   npm run print-order  →  design/flyer/out/monvex-druckauftrag.pdf
 * Firmenname (mit/ohne "i. G.") kommt aus src/data/site.ts. Offene Felder (Auflage, Lieferdatum) bleiben zum Ausfüllen leer.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { legalName } from './company-name.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'design/flyer/out');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'design/flyer/flyer.config.json'), 'utf8'));
const co = cfg.company, ct = cfg.contact;
const names = { allgemein: 'Allgemein (alle Branchen)', fahrschulen: 'Fahrschulen', kanzleien: 'Kanzleien' };
const rows = cfg.flyers.map((f) => `<tr><td>${names[f.slug] ?? f.slug}</td><td class="mono">monvex-flyer-${f.slug}-druck.pdf</td><td class="fill"></td></tr>`).join('');
const font = (f) => `file://${path.join(root, 'node_modules/geist/dist/fonts', f)}`;

const html = `<!doctype html><html lang="de"><meta charset="utf-8"><style>
@font-face{font-family:G;src:url(${font('geist-sans/Geist-Variable.woff2')});font-weight:100 900}
@font-face{font-family:GM;src:url(${font('geist-mono/GeistMono-Regular.woff2')})}
@page{size:A4;margin:0}*{box-sizing:border-box;margin:0}
body{font:9.4pt/1.4 G,sans-serif;color:#0B0B0D;padding:13mm 18mm;width:210mm;height:297mm;position:relative;-webkit-print-color-adjust:exact}
.top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:.6mm solid #0B0B0D;padding-bottom:5mm}
h1{font-size:22pt;letter-spacing:-.04em;line-height:1}h1 span{color:#FF4A1C}
.meta{text-align:right;font-size:8.5pt;color:#55575D}
h2{margin:5.5mm 0 2mm;font:400 7.5pt GM,monospace;letter-spacing:.2em;text-transform:uppercase;color:#C8340C}
table{width:100%;border-collapse:collapse}td,th{padding:1.5mm 2.5mm;border-bottom:.2mm solid #D8D8D4;text-align:left;vertical-align:top}
th{width:34%;font-weight:600;background:#F6F5F1}.mono{font:400 8.5pt GM,monospace}
.fill{border-bottom:.3mm solid #0B0B0D;width:30mm}thead th{background:#0B0B0D;color:#fff;font:400 7.5pt GM,monospace;letter-spacing:.14em;text-transform:uppercase;width:auto}
.box{border:.3mm solid #0B0B0D;border-radius:2mm;padding:3.5mm 4mm;background:#FFF6F2}.box b{color:#C8340C}
ul{padding-left:4.5mm}li{margin:.8mm 0}.two{display:grid;grid-template-columns:1fr 1fr;gap:6mm}
.foot{position:absolute;left:18mm;right:18mm;bottom:9mm;font-size:8pt;color:#55575D;border-top:.2mm solid #D8D8D4;padding-top:3mm}
</style>
<div class="top"><div><h1>Druckauftrag <span>Flyer</span></h1><div style="margin-top:2mm;color:#55575D">${legalName}</div></div>
<div class="meta">Datum: ____________<br>Seite 1 von 1</div></div>

<h2>Produkt</h2>
<table>
<tr><th>Produkt</th><td>Flyer, <b>beidseitig bedruckt</b> (Vorder- und Rückseite)</td></tr>
<tr><th>Endformat</th><td><b>DIN A5 hoch, 148 × 210 mm</b></td></tr>
<tr><th>Datenformat</th><td><b>154 × 216 mm</b> (Endformat + <b>3 mm Beschnitt</b> umlaufend). Keine Schnittmarken. Wichtige Inhalte liegen mit mindestens 7 mm Abstand zum Endformat.</td></tr>
<tr><th>Farbe</th><td><b>4/4-farbig</b> (CMYK beidseitig). Die Daten sind in RGB angelegt, bitte <b>Konvertierung nach CMYK</b> durchführen. Großflächig dunkle Gestaltung (Vorderseite) und ein kräftiges Orange (Bildschirmwert RGB #FF4A1C): bitte auf sattes Schwarz und gleichmäßige Flächen achten, gern mit Hinweis zur erwartbaren Farbwirkung.</td></tr>
<tr><th>Papier</th><td>Bilderdruck <b>matt</b>, <b>135 g/m²</b> (alternativ 170 g/m²). Veredelung: keine, bei Bedarf Soft-Touch-/Mattlack-Beratung.</td></tr>
<tr><th>Verpackung / Versand</th><td>Kartonweise, Lieferung an die Adresse unten. Wunschtermin: ____________</td></tr>
</table>

<h2>Dateien und Auflagen</h2>
<table><thead><tr><th>Motiv</th><th>Datei (2 Seiten: 1 = Vorderseite, 2 = Rückseite)</th><th>Auflage</th></tr></thead>${rows}</table>

<h2>Bitte vor Produktion</h2>
<div class="box"><b>Digitalproof bzw. Freigabe-PDF</b> vor dem Druck senden. Wir bitten um Hinweis, falls Farbabweichungen (Orange, Schwarz) oder Schriftprobleme auffallen.
Alle Schriften sind in den PDFs eingebettet, es sind keine Rasterbilder enthalten. QR-Codes dürfen nicht skaliert oder verändert werden.</div>

<div class="two">
<div><h2>Rechnung und Lieferung</h2><b>${legalName}</b><br>${co.street}<br>${co.city}<br><br>Rechnung und Lieferung an dieselbe Adresse.<br>USt-IdNr.: ____________</div>
<div><h2>Ansprechpartner</h2><b>${ct.name}</b>, ${ct.title}<br>Telefon: ${ct.phone}<br>E-Mail: ${ct.email}<br>${co.website}</div>
</div>

<div class="foot">Hinweis: Dieses Dokument enthält keine Preise. Bitte Angebot über die oben genannten Spezifikationen erstellen (Staffel z. B. 250 / 500 / 1.000 Stück je Motiv).</div>
</html>`;

const tmp = path.join(out, '_druckauftrag.html');
fs.writeFileSync(tmp, html);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage();
await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: path.join(out, 'monvex-druckauftrag.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
fs.unlinkSync(tmp); await b.close();
console.log('OK →', path.join(out, 'monvex-druckauftrag.pdf'));
