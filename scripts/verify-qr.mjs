#!/usr/bin/env node
/**
 * QR-Prüfung für die Flyer: liest die QR-Codes aus den fertigen Vorderseiten-PNGs wieder aus
 * (in voller und in stark reduzierter Auflösung), vergleicht sie mit der konfigurierten Adresse
 * und prüft optional, dass die Zielseite erreichbar ist.
 *
 *   npm run flyer && npm run verify:qr                 # nur Decodierung
 *   BASE_URL=http://localhost:3000 npm run verify:qr   # zusätzlich: Zielseite liefert 200 (Pfad gegen BASE_URL)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'design/flyer/flyer.config.json'), 'utf8'));
const BASE = process.env.BASE_URL?.replace(/\/$/, '');

/** Nearest-Neighbour-Verkleinerung, simuliert eine schlechte Druck-/Scanqualität. */
function scale(png, factor) {
  const w = Math.round(png.width * factor), h = Math.round(png.height * factor);
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const sx = Math.min(png.width - 1, Math.floor(x / factor)), sy = Math.min(png.height - 1, Math.floor(y / factor));
    const si = (sy * png.width + sx) * 4, di = (y * w + x) * 4;
    for (let k = 0; k < 4; k++) out.data[di + k] = png.data[si + k];
  }
  return out;
}
const decode = (png) => jsQR(new Uint8ClampedArray(png.data), png.width, png.height)?.data ?? null;

let failed = 0;
for (const f of config.flyers) {
  const file = path.join(root, `design/flyer/out/monvex-flyer-${f.slug}-vorderseite.png`);
  const png = PNG.sync.read(fs.readFileSync(file));
  const results = [['voll (≈190 dpi)', 1], ['reduziert (≈110 dpi)', 0.58], ['stark reduziert (≈75 dpi)', 0.4]].map(([label, k]) => [label, decode(k === 1 ? png : scale(png, k))]);
  const ok = results.every(([, v]) => v === f.qrUrl);
  console.log(`\n${ok ? '✔' : '✘'} ${f.slug}: ${f.qrUrl}`);
  for (const [label, v] of results) console.log(`   ${v === f.qrUrl ? 'ok ' : 'FEHLER'} ${label}${v && v !== f.qrUrl ? ` → ${v}` : v ? '' : ' → nicht lesbar'}`);
  if (!ok) failed++;
  if (BASE) {
    const u = new URL(f.qrUrl);
    const res = await fetch(BASE + u.pathname + u.search, { redirect: 'manual' });
    console.log(`   ${res.status === 200 ? 'ok ' : 'FEHLER'} Zielseite ${u.pathname} → HTTP ${res.status}`);
    if (res.status !== 200) failed++;
  }
}
if (failed) { console.error(`\n${failed} Prüfung(en) fehlgeschlagen.`); process.exit(1); }
console.log('\nOK – alle QR-Codes lesbar und korrekt.');
