import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Firmenname für Druckdateien – liest IN_FORMATION aus src/data/site.ts (einzige Quelle für den Zusatz "i. G."). */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = fs.readFileSync(path.join(root, 'src/data/site.ts'), 'utf8');
const inFormation = /export const IN_FORMATION = true/.test(site);
const base = /const BASE_NAME = '([^']+)'/.exec(site)[1];
export const legalName = inFormation ? `${base}\u00a0i.\u00a0G.` : base;

/** Registernummer (z. B. 'HRB 12345 HB') aus src/data/site.ts, falls eingetragen. */
export const registerNumber = /registerNumber: '([^']+)'/.exec(site)?.[1];
export const isInFormation = inFormation;
if (!inFormation && !registerNumber) {
  console.warn('⚠ IN_FORMATION=false, aber keine Registernummer in src/data/site.ts: Pflichtangabe im Impressum und auf Geschäftsbriefen fehlt noch.');
}
