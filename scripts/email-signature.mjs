#!/usr/bin/env node
/**
 * E-Mail-Signaturen: erzeugt pro Person eine Vorschauseite mit "Signatur kopieren"-Button (design/signatur/out/).
 * Personen: design/visitenkarte/card.config.json. Firmendaten/Pflichtangaben: src/data/site.ts (IN_FORMATION, Geschäftsführer).
 *   npm run signatur
 * Technik: reine Tabellen + Inline-Styles, keine Bilder (Gmail/Outlook blocken oder strippen sie) – läuft in Apple Mail, Gmail, Outlook.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { legalName } from './company-name.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'design/signatur/out');
fs.mkdirSync(outDir, { recursive: true });
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'design/visitenkarte/card.config.json'), 'utf8'));
const site = fs.readFileSync(path.join(root, 'src/data/site.ts'), 'utf8');
const inFormation = /export const IN_FORMATION = true/.test(site);
const director = /managingDirector: '([^']+)'/.exec(site)?.[1] ?? '';
const registerNumber = /registerNumber: '([^']+)'/.exec(site)?.[1];
const c = cfg.company;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const F = "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;";
const INK = '#0B0B0D', EMBER = '#FF4A1C', GRAY = '#55575D';
const nb = (s) => esc(s).replace(/ /g, '&nbsp;');

const register = registerNumber ? `Amtsgericht Bremen, ${esc(registerNumber)}` : 'Amtsgericht Bremen, Eintragung beantragt';

function signature(p) {
  const url = `https://www.monvex-group.de/website-check?utm_source=email&utm_medium=signatur&utm_campaign=${p.slug}`;
  const row = (label, content) => `<tr><td width="22" valign="top" style="${F}font-size:11px;line-height:20px;font-weight:bold;color:${EMBER};padding:0;">${label}</td><td valign="top" style="${F}font-size:13px;line-height:20px;color:${INK};padding:0;">${content}</td></tr>`;
  const rows = [
    p.phone && row('T', `<a href="tel:${esc(p.phone.replace(/\s/g, ''))}" style="color:${INK};text-decoration:none;">${nb(p.phone)}</a>`),
    p.email && row('E', `<a href="mailto:${esc(p.email)}" style="color:${INK};text-decoration:none;">${esc(p.email)}</a>`),
    row('W', `<a href="https://www.monvex-group.de" style="color:${INK};text-decoration:none;">${esc(c.website)}</a>`),
    row('A', `<span style="color:${GRAY};">${esc(c.street)}, ${esc(c.city)}</span>`),
  ].filter(Boolean).join('');
  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="520" style="width:520px;max-width:100%;border-collapse:collapse;">
<tr>
<td width="5" style="width:5px;background-color:${EMBER};font-size:0;line-height:0;">&nbsp;</td>
<td style="padding:2px 0 2px 18px;">
  <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
    <tr><td style="${F}font-size:12px;line-height:14px;letter-spacing:4px;font-weight:bold;color:${INK};padding:0 0 12px 0;">MONVE<span style="color:${EMBER};">X</span></td></tr>
    <tr><td style="${F}font-size:20px;line-height:24px;font-weight:bold;color:${INK};padding:0;letter-spacing:-0.3px;">${esc(p.name)}</td></tr>
    <tr><td style="${F}font-size:11px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:${EMBER};font-weight:bold;padding:2px 0 12px 0;">${esc(p.title)}</td></tr>
    <tr><td style="padding:0;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">${rows}</table></td></tr>
  </table>
</td>
</tr>
<tr><td colspan="2" style="padding:18px 0 0 0;">
  <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse:collapse;width:100%;">
    <tr><td bgcolor="${INK}" style="background-color:${INK};border-radius:10px;padding:16px 18px;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse:collapse;width:100%;">
        <tr>
          <td valign="middle" style="${F}padding:0 12px 0 0;">
            <div style="${F}font-size:15px;line-height:20px;font-weight:bold;color:#FFFFFF;letter-spacing:-0.2px;">Bereit für Ihr neues Projekt?</div>
            <div style="${F}font-size:12px;line-height:17px;color:#C9CBD1;padding-top:3px;">Website, Branding, Marketing: Wir bauen es.</div>
          </td>
          <td valign="middle" align="right" style="padding:0;white-space:nowrap;">
            <a href="${esc(url)}" style="${F}display:inline-block;background-color:${EMBER};color:#FFFFFF;font-size:12px;line-height:16px;font-weight:bold;text-decoration:none;padding:10px 16px;border-radius:999px;mso-padding-alt:0;">Kostenloser&nbsp;Website-Check&nbsp;&rarr;</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</td></tr>
<tr><td colspan="2" style="${F}padding:12px 0 0 0;font-size:10px;line-height:15px;color:#8B8D93;">
  <span style="color:${INK};font-weight:bold;">${nb(legalName)}</span> &middot; Sitz: Bremen<br>
  ${register} &middot; 
  Geschäftsführer: ${esc(director)}<br>
  <em style="font-style:normal;color:${EMBER};letter-spacing:1px;">BUILD. BRAND. SCALE.</em>
</td></tr>
</table>`;
}

const plain = (p) => [`${p.name}`, `${p.title} · MONVEX`, '', p.phone && `T ${p.phone}`, p.email && `E ${p.email}`, `W ${c.website}`, `${c.street}, ${c.city}`, '', 'Bereit für Ihr neues Projekt? Kostenloser Website-Check: https://www.monvex-group.de/website-check', '', `${legalName.replace(/ /g, ' ')} · Sitz: Bremen · ${registerNumber ? `Amtsgericht Bremen, ${registerNumber}` : 'Amtsgericht Bremen, Eintragung beantragt'}`, `Geschäftsführer: ${director}`].filter((x) => x !== false && x !== undefined && x !== null).join('\n');

const page = `<!doctype html><html lang="de"><meta charset="utf-8"><title>MONVEX E-Mail-Signatur</title><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box}body{margin:0;background:#F6F5F1;color:${INK};font:15px/1.5 'Helvetica Neue',Helvetica,Arial,sans-serif}
.wrap{max-width:900px;margin:0 auto;padding:48px 24px 80px}
h1{font-size:clamp(2rem,5vw,3.2rem);letter-spacing:-.04em;line-height:1;margin:0}h1 em{color:${EMBER};font-family:Georgia,serif;font-weight:400}
.lead{color:${GRAY};max-width:560px;margin:14px 0 36px}
.card{background:#fff;border:1px solid rgba(11,11,13,.1);border-radius:24px;padding:28px;margin:0 0 28px;box-shadow:0 12px 32px -16px rgba(11,11,13,.18)}
.card h2{margin:0 0 4px;font-size:1.05rem}.sub{color:${GRAY};font-size:.85rem;margin:0 0 18px}
.stage{border:1px dashed rgba(11,11,13,.18);border-radius:16px;padding:24px;background:#fff;overflow-x:auto}
.bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:18px}
button{font:inherit;font-weight:600;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:${INK};color:#fff;transition:background .3s}
button:hover{background:${EMBER}}button.ok{background:#1FA971}
.ghost{background:transparent;color:${INK};border:1px solid rgba(11,11,13,.2)}.ghost:hover{background:${INK};color:#fff}
.how{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}.how div{background:#fff;border:1px solid rgba(11,11,13,.1);border-radius:18px;padding:18px}
.how b{display:block;margin-bottom:4px}.how p{margin:0;color:${GRAY};font-size:.88rem}
</style>
<div class="wrap">
<h1>Ihre neue <em>E-Mail-Signatur.</em></h1>
<p class="lead">Auf „Signatur kopieren“ klicken, dann im Mailprogramm einfügen. Die Signatur ist so gebaut, dass sie in Apple Mail, Gmail und Outlook gleich aussieht.</p>
${cfg.people.map((p, i) => `<section class="card"><h2>${esc(p.name)}</h2><p class="sub">${esc(p.title)}</p>
<div class="stage"><div id="sig${i}">${signature(p)}</div></div>
<div class="bar"><button onclick="copySig(${i},this)">Signatur kopieren</button><button class="ghost" onclick="copyText(${i},this)">Nur Text kopieren</button></div>
<textarea id="txt${i}" hidden>${esc(plain(p))}</textarea></section>`).join('\n')}
<h2 style="margin:40px 0 14px">So fügen Sie die Signatur ein</h2>
<div class="how">
<div><b>Apple Mail</b><p>Mail → Einstellungen → Signaturen → „+“. Rechts die Vorschau leeren, Signatur einfügen (⌘V). Haken bei „Immer Standardschrift“ entfernen.</p></div>
<div><b>Gmail</b><p>Einstellungen (Zahnrad) → Alle Einstellungen → Signatur → neue Signatur anlegen, einfügen, unten „Änderungen speichern“.</p></div>
<div><b>Outlook</b><p>Datei → Optionen → E-Mail → Signaturen → Neu, Signatur einfügen und speichern. Outlook zeigt abgerundete Ecken ggf. eckig, sonst identisch.</p></div>
</div>
</div>
<script>
function flash(b,t){const o=b.textContent;b.textContent=t;b.classList.add('ok');setTimeout(()=>{b.textContent=o;b.classList.remove('ok')},1800)}
async function copySig(i,b){const el=document.getElementById('sig'+i);const html=el.innerHTML;const text=document.getElementById('txt'+i).value;
 try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([text],{type:'text/plain'})})]);flash(b,'Kopiert ✓');return}catch(e){}
 const r=document.createRange();r.selectNode(el);const s=getSelection();s.removeAllRanges();s.addRange(r);
 try{document.execCommand('copy');flash(b,'Kopiert ✓')}catch(e){flash(b,'Bitte Strg/⌘+C drücken')}s.removeAllRanges()}
async function copyText(i,b){await navigator.clipboard.writeText(document.getElementById('txt'+i).value);flash(b,'Kopiert ✓')}
</script></html>`;
fs.writeFileSync(path.join(outDir, 'monvex-email-signatur.html'), page);
for (const [i, p] of cfg.people.entries()) fs.writeFileSync(path.join(outDir, `signatur-${p.slug}.html`), `<!doctype html><meta charset="utf-8">${signature(p)}`);
console.log('OK →', outDir);
