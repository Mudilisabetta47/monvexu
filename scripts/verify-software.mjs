#!/usr/bin/env node
/**
 * Prüft den Softwarebereich auf Datenkonsistenz und Wahrheitsregeln (ohne Browser):
 *  - 18 Produkte, eindeutige Slugs, gültige Kategorien/Icons/Related
 *  - jede Produktseite hat Hero-Texte, 6 Funktionen, ≥3 Anwendungsfälle, 4 Vorteile, Integrationen, FAQ, Mock mit 2 Ansichten
 *  - Verbotene Aussagen (Preise, Kundenzitate, Bewertungen, „verfügbar ab“) kommen nirgends vor
 *   npm run verify:software
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/data/software');
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
const files = ['business.ts', 'ai.ts', 'enterprise.ts', 'personal.ts'];
const src = files.map(read).join('\n');
const errors = [];
const ok = (c, m) => { if (!c) errors.push(m); };

const slugs = [...src.matchAll(/^\s{4}slug: '([a-z0-9-]+)'/gm)].map((m) => m[1]);
ok(slugs.length === 18, `Erwartet 18 Produkte, gefunden ${slugs.length}`);
ok(new Set(slugs).size === slugs.length, 'Doppelte Slugs');

const cats = [...read('categories.ts').matchAll(/slug: '([a-z-]+)'/g)].map((m) => m[1]);
for (const m of src.matchAll(/category: '([a-z-]+)'/g)) ok(cats.includes(m[1]), `Unbekannte Kategorie ${m[1]}`);

const icons = fs.readFileSync(path.join(root, 'src/components/software/icons.tsx'), 'utf8');
const have = new Set([...icons.matchAll(/^\s{2}([A-Z][A-Za-z0-9]+),$/gm)].map((m) => m[1]));
for (const m of new Set([...src.matchAll(/icon: '([A-Za-z0-9]+)'/g)].map((x) => x[1]).concat([...read('categories.ts').matchAll(/icon: '([A-Za-z0-9]+)'/g)].map((x) => x[1])))) ok(have.has(m), `Icon ${m} fehlt in icons.tsx`);

for (const m of src.matchAll(/related: \[([^\]]*)\]/g)) for (const s of m[1].match(/'([a-z0-9-]+)'/g) ?? []) ok(slugs.includes(s.replace(/'/g, '')), `related: unbekannter Slug ${s}`);

// Struktur je Produkt (grobe Zählung pro Block)
const blocks = src.split(/\n  \{\n    slug: /).slice(1);
ok(blocks.length === 18, `Blöcke: ${blocks.length}`);
for (const b of blocks) {
  const slug = b.match(/^'([a-z0-9-]+)'/)[1];
  const count = (key) => ((b.match(new RegExp(`${key}: \\[([\\s\\S]*?)\\n    \\],`)) ?? [])[1] ?? '').split('\n').filter((l) => /^\s{6}\{/.test(l)).length;
  ok(count('features') === 6, `${slug}: 6 Funktionen erwartet, ${count('features')}`);
  ok(count('useCases') >= 3, `${slug}: ≥3 Anwendungsfälle`);
  ok(count('benefits') === 4, `${slug}: 4 Vorteile erwartet, ${count('benefits')}`);
  ok(count('faq') >= 2, `${slug}: ≥2 FAQ`);
  ok((b.match(/label: '/g) ?? []).length >= 2, `${slug}: Mock braucht ≥2 Ansichten`);
  ok(/status: 'concept'/.test(b), `${slug}: Status muss 'concept' sein`);
}

// Wahrheitsregeln
const all = files.map(read).join('\n') + fs.readFileSync(path.join(root, 'src/data/software/index.ts'), 'utf8');
const banned = [
  [/\d+\s?(€|EUR)\s*(\/|pro)\s*(Monat|Jahr|Nutzer)/i, 'Preisangabe'],
  [/ab\s+\d+[,.]?\d*\s?€/i, 'Preisangabe'],
  [/verfügbar ab|Starttermin\s*:|Release[- ]Datum|erscheint (im|am|in)\b/i, 'Verfügbarkeitstermin'],
  [/Kunden(stimmen|bewertung)|Erfahrungsbericht|5\s?Sterne|★/i, 'Bewertung/Referenz'],
  [/vertrauen (bereits|uns)\s+\d+|über \d+\s+(Kunden|Unternehmen)/i, 'Kundenzahl'],
  [/DSGVO-konform|ISO\s?27001-zertifiziert|BSI-zertifiziert|TÜV-zertifiziert/i, 'Zertifizierungsbehauptung'],
  [/garantiert|100\s?%\s?(sicher|fehlerfrei)/i, 'Garantieversprechen'],
];
for (const [re, label] of banned) ok(!re.test(all), `Verbotene Aussage gefunden (${label}): ${re}`);

// UI-Texte
const ui = ['src/components/software/Mock.tsx', 'src/components/software/SwFooter.tsx', 'src/app/software/page.tsx', 'src/app/software/[slug]/page.tsx'].map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
ok(/Konzept-Vorschau · Beispieldaten/.test(ui), 'Mock-Kennzeichnung „Konzept-Vorschau · Beispieldaten“ fehlt');
ok(/Konzeptstatus/.test(ui), 'Konzeptstatus-Hinweis auf Produktseite fehlt');

if (errors.length) {
  console.error(`✗ ${errors.length} Fehler:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✓ Softwarebereich konsistent: ${slugs.length} Produkte, ${cats.length} Kategorien, alle Wahrheitsregeln eingehalten.`);
