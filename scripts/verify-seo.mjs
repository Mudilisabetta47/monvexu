#!/usr/bin/env node
/**
 * SEO-/Link-Prüfung gegen einen laufenden Server:
 *
 *   npm run build && npm start &     # Server auf :3000
 *   npm run verify:seo               # oder: BASE_URL=http://localhost:3055 node scripts/verify-seo.mjs
 *
 * Prüft für jede Seite der sitemap.xml: HTTP 200, einmalig Title/Description/H1, Canonical, OpenGraph,
 * gültiges JSON-LD, kein noindex, alle internen Links (200), Mindest-Textmenge und Ähnlichkeit zwischen Regionalseiten.
 */
const BASE = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const fails = [];
const warns = [];
const fail = (m) => fails.push(m);
const warn = (m) => warns.push(m);

async function get(path) {
  const res = await fetch(BASE + path, { redirect: 'manual' });
  return { status: res.status, text: await res.text(), headers: res.headers };
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attr = (tag, name) => decode(new RegExp(`${name}="([^"]*)"`).exec(tag)?.[1] ?? '');
const strip = (h) => decode(h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

// ---------- robots.txt ----------
const robots = await get('/robots.txt');
if (robots.status !== 200) fail('robots.txt nicht erreichbar');
else {
  if (!/Sitemap:\s*\S+\/sitemap\.xml/i.test(robots.text)) fail('robots.txt: Sitemap-Zeile fehlt');
  for (const p of ['/api/', '/admin', '/login', '/account']) if (!robots.text.includes(`Disallow: ${p}`)) fail(`robots.txt: Disallow ${p} fehlt`);
  if (/Disallow:\s*\/\s*$/m.test(robots.text)) fail('robots.txt sperrt die gesamte Website');
}

// ---------- sitemap ----------
const sm = await get('/sitemap.xml');
if (sm.status !== 200) { console.error('sitemap.xml nicht erreichbar'); process.exit(1); }
const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = locs.map((l) => new URL(l).pathname);
if (new Set(paths).size !== paths.length) fail('Sitemap enthält doppelte URLs');
for (const p of paths) if (/^\/(api|admin|login|account|preview|debug|intern)(\/|$)/.test(p)) fail(`Sitemap enthält gesperrten Pfad ${p}`);
const inSitemap = new Set(paths);

// ---------- Seiten ----------
const pages = [];
for (const p of paths) {
  const r = await get(p);
  if (r.status !== 200) { fail(`${p}: HTTP ${r.status}`); continue; }
  const html = r.text;
  const title = decode(/<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? '');
  const descTag = /<meta name="description"[^>]*>/.exec(html)?.[0] ?? '';
  const desc = attr(descTag, 'content');
  const canonicalTag = /<link rel="canonical"[^>]*>/.exec(html)?.[0] ?? '';
  const canonical = attr(canonicalTag, 'href');
  const ogTitle = attr(/<meta property="og:title"[^>]*>/.exec(html)?.[0] ?? '', 'content');
  const twitter = /<meta name="twitter:card"/.test(html);
  const robotsMeta = attr(/<meta name="robots"[^>]*>/.exec(html)?.[0] ?? '', 'content');
  const h1s = [...html.matchAll(/<h1[\s\S]*?<\/h1>/g)].map((m) => strip(m[0]));
  const h2n = [...html.matchAll(/<h2[\s>]/g)].length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const main = /<main[\s\S]*?<\/main>/.exec(html)?.[0] ?? '';
  const text = strip(main);
  const links = [...main.matchAll(/<a [^>]*href="([^"#][^"]*)"/g)].map((m) => decode(m[1])).filter((h) => h.startsWith('/')).map((h) => h.split('#')[0].split('?')[0]).filter(Boolean);

  if (!title) fail(`${p}: kein <title>`);
  else if (title.length > 75) warn(`${p}: Title lang (${title.length})`);
  if (!desc) fail(`${p}: keine Meta Description`);
  else if (desc.length < 70 || desc.length > 175) warn(`${p}: Description-Länge ${desc.length}`);
  if (!canonical) fail(`${p}: kein Canonical`);
  else if (new URL(canonical, BASE).pathname.replace(/\/$/, '') !== p.replace(/\/$/, '')) fail(`${p}: Canonical zeigt auf ${canonical}`);
  if (!ogTitle) fail(`${p}: og:title fehlt`);
  if (!twitter) fail(`${p}: twitter:card fehlt`);
  if (/noindex/i.test(robotsMeta)) fail(`${p}: noindex gesetzt, steht aber in der Sitemap`);
  if (h1s.length !== 1) fail(`${p}: ${h1s.length} H1 (erwartet 1)`);
  if (h2n < 1) fail(`${p}: keine H2`);
  for (const block of ld) { try { JSON.parse(block); } catch { fail(`${p}: ungültiges JSON-LD`); } }
  if (p.startsWith('/werbeagentur') && p !== '/werbeagentur') {
    if (!ld.some((b) => b.includes('BreadcrumbList'))) fail(`${p}: BreadcrumbList fehlt`);
  }
  pages.push({ p, title, desc, h1: h1s[0] ?? '', text, links, words: text.split(' ').length, ld: ld.join('') });
}

// ---------- Einzigartigkeit ----------
for (const [key, label] of [['title', 'Title'], ['desc', 'Description'], ['h1', 'H1']]) {
  const seen = new Map();
  for (const pg of pages) {
    const v = pg[key].toLowerCase();
    if (!v) continue;
    if (seen.has(v)) fail(`Doppelte ${label}: ${pg.p} = ${seen.get(v)}`);
    else seen.set(v, pg.p);
  }
}

// ---------- LocalBusiness nur auf Bremen-Regionalseiten ----------
for (const pg of pages) {
  const isBremenLocal = /^\/werbeagentur\/[^/]+\/bremen$/.test(pg.p);
  if (pg.ld.includes('"ProfessionalService"') && !isBremenLocal) fail(`${pg.p}: LocalBusiness-Schema auf nicht-lokaler Seite`);
}

// ---------- Textmenge ----------
for (const pg of pages) {
  if (!pg.p.startsWith('/werbeagentur')) continue;
  const isIndex = /^\/werbeagentur\/(leistungen|branchen)$/.test(pg.p);
  const min = isIndex ? 180 : /^\/werbeagentur\/[^/]+\/[^/]+$/.test(pg.p) && !pg.p.includes('/leistungen/') ? 400 : 300;
  if (pg.words < min) warn(`${pg.p}: nur ${pg.words} Wörter im Hauptinhalt (Richtwert ${min})`);
}

// ---------- Ähnlichkeit (Doorway-Schutz) ----------
const shingles = (t) => { const w = t.toLowerCase().split(' '); const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };
const jac = (a, b) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1); };
const groups = new Map();
for (const pg of pages) {
  const m = /^\/werbeagentur\/([^/]+)\/([^/]+)$/.exec(pg.p);
  if (!m || m[1] === 'leistungen') continue;
  (groups.get(m[1]) ?? groups.set(m[1], []).get(m[1])).push({ ...pg, sh: shingles(pg.text) });
}
let maxSim = { v: 0, a: '', b: '' };
for (const [, list] of groups) {
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const v = jac(list[i].sh, list[j].sh);
    if (v > maxSim.v) maxSim = { v, a: list[i].p, b: list[j].p };
    if (v > 0.5) fail(`Zu ähnliche Seiten (${(v * 100).toFixed(0)} %): ${list[i].p} ↔ ${list[j].p}`);
    else if (v > 0.35) warn(`Ähnlichkeit ${(v * 100).toFixed(0)} %: ${list[i].p} ↔ ${list[j].p}`);
  }
}

// ---------- Interne Links ----------
const allLinks = new Set();
for (const pg of pages) for (const l of pg.links) allLinks.add(l);
let linkChecks = 0;
for (const l of allLinks) {
  const path = l.replace(/\/$/, '') || '/';
  if (/\.(svg|png|jpg|webp|ico|xml|txt)$/.test(path)) continue;
  linkChecks++;
  const r = await get(path);
  if (r.status !== 200) fail(`Defekter interner Link: ${path} (HTTP ${r.status})`);
  else if (path.startsWith('/werbeagentur') && !inSitemap.has(path)) fail(`Interner Link auf Seite außerhalb der Sitemap: ${path}`);
}
// jede Agentur-Seite muss intern verlinkt sein (keine Waisen)
const linked = new Set([...allLinks].map((l) => l.replace(/\/$/, '') || '/'));
for (const p of paths) if (p.startsWith('/werbeagentur') && p !== '/werbeagentur' && !linked.has(p)) fail(`Verwaiste Seite (nirgends verlinkt): ${p}`);

// ---------- Ergebnis ----------
const agency = pages.filter((x) => x.p.startsWith('/werbeagentur'));
console.log(`\nGeprüft: ${pages.length} Sitemap-URLs (davon ${agency.length} Werbeagentur), ${linkChecks} interne Link-Ziele`);
console.log(`Wörter/Seite (Agentur): min ${Math.min(...agency.map((x) => x.words))}, max ${Math.max(...agency.map((x) => x.words))}`);
console.log(`Größte Ähnlichkeit zwischen Branchen-Unterseiten: ${(maxSim.v * 100).toFixed(1)} % (${maxSim.a} ↔ ${maxSim.b})`);
if (warns.length) console.log(`\nHinweise (${warns.length}):\n - ` + warns.join('\n - '));
if (fails.length) { console.error(`\nFEHLER (${fails.length}):\n - ` + fails.join('\n - ')); process.exit(1); }
console.log('\nOK – keine Fehler.');
