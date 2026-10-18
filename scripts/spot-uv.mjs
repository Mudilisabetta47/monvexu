#!/usr/bin/env node
/**
 * Lack-Ebene für Veredelung (partieller Glanzlack / Spot UV) der Visitenkarten-Vorderseite.
 * Erzeugt eine 1-seitige Vektor-PDF (91 x 61 mm, Beschnitt inklusive): alles, was lackiert werden soll, in 100 % Schwarz auf Weiß –
 * deckungsgleich mit dem großen M und dem Schriftzug der Vorderseite (gleiche Maße wie scripts/visitenkarte.mjs).
 *   npm run spot-uv   →   design/visitenkarte/out/monvex-visitenkarte-lack-ebene.pdf
 * Hinweis: Eine echte Sonderfarbe ("Lack") kann der Browser nicht erzeugen; die Druckerei bzw. Acrobat weist die Sonderfarbe zu.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'design/visitenkarte/out');
const lp = fs.readFileSync(path.join(root, 'src/components/ui/logo-paths.ts'), 'utf8');
const grab = (block, key) => new RegExp(`${block}[\\s\\S]*?${key}:\\s*'([^']+)'`).exec(lp)[1];
const MARK = grab('MARK', 'ink') + ' ' + grab('MARK', 'ember');
const WORD = grab('WORDMARK', 'ink') + ' ' + grab('WORDMARK', 'ember');
const vc = fs.readFileSync(path.join(root, 'scripts/visitenkarte.mjs'), 'utf8');
// Positionen aus der Vorderseite übernehmen, damit nichts auseinanderläuft
const big = /\.bigmark\{position:absolute;right:(-?[\d.]+)mm;top:(-?[\d.]+)mm;width:([\d.]+)mm;height:([\d.]+)mm/.exec(vc);
const word = /\.front \.word\{position:absolute;left:([\d.]+)mm;bottom:([\d.]+)mm;width:([\d.]+)mm/.exec(vc);
if (!big || !word) throw new Error('Positionen in visitenkarte.mjs nicht gefunden');

const html = `<!doctype html><meta charset="utf-8"><style>
@page{size:91mm 61mm;margin:0}*{margin:0}html,body{width:91mm;height:61mm;background:#fff;overflow:hidden;position:relative;-webkit-print-color-adjust:exact}
svg{position:absolute}
.big{right:${big[1]}mm;top:${big[2]}mm;width:${big[3]}mm;height:${big[4]}mm}
.word{left:${word[1]}mm;bottom:${word[2]}mm;width:${word[3]}mm}
</style>
<svg class="big" viewBox="6 6 52 52"><path d="${MARK}" fill="#000"/></svg>
<svg class="word" viewBox="0 0 271.5 40"><path d="${WORD}" fill="#000"/></svg>`;
const tmp = path.join(out, '_lack.html');
fs.writeFileSync(tmp, html);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage();
await p.goto('file://' + tmp);
await p.pdf({ path: path.join(out, 'monvex-visitenkarte-lack-ebene.pdf'), width: '91mm', height: '61mm', printBackground: true, preferCSSPageSize: true });
fs.unlinkSync(tmp); await b.close();
console.log('OK →', path.join(out, 'monvex-visitenkarte-lack-ebene.pdf'));
