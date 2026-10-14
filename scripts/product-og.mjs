#!/usr/bin/env node
/**
 * Erzeugt die Teilen-Bilder (Open Graph, 1200x630) für /produkte, BusOS und EasyKFZ24 aus den echten Produktbildern.
 *   npm run product-og   →   public/products/{busos,easykfz24}/og.jpg und public/products/og.jpg
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (f) => `file://${path.join(root, 'public/products', f)}`;
const font = (f) => `file://${path.join(root, 'node_modules/geist/dist/fonts', f)}`;
const lp = fs.readFileSync(path.join(root, 'src/components/ui/logo-paths.ts'), 'utf8');
const grab = (block, key) => new RegExp(`${block}[\\s\\S]*?${key}:\\s*'([^']+)'`).exec(lp)[1];
const M = { ink: grab('MARK', 'ink'), ember: grab('MARK', 'ember') };

const css = `@font-face{font-family:G;src:url(${font('geist-sans/Geist-Variable.woff2')});font-weight:100 900}
@font-face{font-family:GM;src:url(${font('geist-mono/GeistMono-Regular.woff2')})}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;overflow:hidden;font-family:G,sans-serif;position:relative}
.mono{font:400 15px GM,monospace;letter-spacing:.18em;text-transform:uppercase}
.brand{position:absolute;left:64px;bottom:48px;display:flex;align-items:center;gap:12px;font:500 15px GM,monospace;letter-spacing:.2em;color:inherit;opacity:.7}
.brand svg{width:30px;height:30px}
.shot{position:absolute;border-radius:18px;overflow:hidden;box-shadow:0 40px 80px -24px rgba(0,0,0,.45),0 0 0 1px rgba(0,0,0,.08);background:#fff}.shot img{display:block;width:100%}
h1{font-weight:650;letter-spacing:-.055em;line-height:.94}h1 i{font-family:Georgia,serif;font-weight:400}`;
const mark = `<svg viewBox="6 6 52 52"><path d="${M.ember}" fill="#FF4A1C"/><path d="${M.ink}" fill="#0B0B0D"/></svg>`;

const pages = {
  'busos/og.jpg': `<body style="background:linear-gradient(135deg,#DDF3EE,#F6FBFA 55%,#CFEBE4);color:#0B2540">
    <div class="mono" style="position:absolute;left:64px;top:64px;color:#096A63">MONVEX · Eigenes Produkt · In Entwicklung</div>
    <h1 style="position:absolute;left:64px;top:132px;font-size:92px;width:560px">MONVEX<br><i style="color:#096A63">BusOS</i></h1>
    <p style="position:absolute;left:64px;top:372px;font-size:30px;line-height:1.25;width:480px;color:#3C5568">Das Betriebssystem für moderne Busunternehmen.</p>
    <div class="shot" style="left:610px;top:96px;width:640px;transform:rotate(-1.5deg)"><img src="${pub('busos/desktop.webp')}"></div>
    <div class="shot" style="left:560px;top:330px;width:420px;transform:rotate(1.2deg)"><img src="${pub('busos/ops-center.webp')}"></div>
    <div class="brand">${mark} MONVEX</div></body>`,
  'easykfz24/og.jpg': `<body style="background:linear-gradient(135deg,#E3EBFF,#F8FAFD 55%,#D4E0FF);color:#0A1433">
    <div class="mono" style="position:absolute;left:64px;top:64px;color:#2A55FF">Entwickelt von MONVEX · Online</div>
    <h1 style="position:absolute;left:64px;top:132px;font-size:92px;width:600px">Easy<i style="color:#2A55FF">KFZ24</i></h1>
    <p style="position:absolute;left:64px;top:300px;font-size:30px;line-height:1.25;width:480px;color:#46536F">Kfz-Zulassung. Einfach digital.</p>
    <div class="shot" style="left:560px;top:80px;width:700px;transform:rotate(-1.2deg)"><img src="${pub('easykfz24/desktop.webp')}"></div>
    <div class="shot" style="left:900px;top:300px;width:200px;border-radius:30px;border:6px solid #0A1433;transform:rotate(1.5deg)"><img src="${pub('easykfz24/mobile.webp')}"></div>
    <div class="brand">${mark} MONVEX</div></body>`,
  'og.jpg': `<body style="background:linear-gradient(135deg,#F6F5F1,#fff 50%,#ECEBE6);color:#0B0B0D">
    <div class="mono" style="position:absolute;left:64px;top:64px;color:#C8340C">MONVEX · Eigene Software und Plattformen</div>
    <h1 style="position:absolute;left:64px;top:132px;font-size:84px;width:560px">Produkte<br>von <i style="color:#FF4A1C">MONVEX.</i></h1>
    <div class="shot" style="left:660px;top:70px;width:500px;transform:rotate(-2deg)"><img src="${pub('busos/desktop.webp')}"></div>
    <div class="shot" style="left:700px;top:300px;width:460px;transform:rotate(1.5deg)"><img src="${pub('easykfz24/desktop.webp')}"></div>
    <div class="brand">${mark} MONVEX</div></body>`,
};

const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const [out, body] of Object.entries(pages)) {
  const html = `<!doctype html><meta charset="utf-8"><style>${css}</style>${body}`;
  const tmp = path.join(root, 'public/products', '_og.html');
  fs.writeFileSync(tmp, html);
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(root, 'public/products', out), type: 'jpeg', quality: 88 });
  fs.unlinkSync(tmp);
  console.log('→', out);
}
await b.close();
