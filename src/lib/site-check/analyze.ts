import type { CategoryId, Finding, Report, Status } from './types';
import type { Page } from './fetch';

const ent = (s: string) =>
  s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const strip = (h: string) => ent(h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ').replace(/<svg[\s\S]*?<\/svg>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<\/?(?:span|em|strong|b|i|u|a|small|mark|sup|sub|abbr|font|label)\b[^>]*>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (tag: string, name: string) => {
  const m = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(tag);
  return m ? ent(m[1] ?? m[2] ?? m[3] ?? '') : null;
};

const CATEGORY_LABEL: Record<CategoryId, string> = { technik: 'Technik', mobil: 'Mobil', seo: 'Suchmaschinen (SEO)', vertrauen: 'Vertrauen & Kontakt' };

export function analyze(page: Page, robotsStatus: number | null, sitemapStatus: number | null, inputUrl: string): Report {
  const { html, finalUrl, headers, ms } = page;
  const u = new URL(finalUrl);
  const findings: Finding[] = [];
  const add = (id: string, category: CategoryId, label: string, status: Status, detail: string, tip?: string, weight = 1) => findings.push({ id, category, label, status, detail, tip, ...({ w: weight } as object) } as Finding);

  const title = ent(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '').replace(/\s+/g, ' ').trim();
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const meta = (key: string) => {
    const t = metas.find((x) => (attr(x, 'name') ?? attr(x, 'property') ?? '').toLowerCase() === key);
    return t ? (attr(t, 'content') ?? '').trim() : '';
  };
  const description = meta('description');
  const robotsMeta = meta('robots').toLowerCase();
  const viewport = metas.some((x) => (attr(x, 'name') ?? '').toLowerCase() === 'viewport');
  const lang = (attr(/<html\b[^>]*>/i.exec(html)?.[0] ?? '', 'lang') ?? '').trim();
  const canonical = /<link\b[^>]*rel=["']?canonical["']?[^>]*>/i.test(html);
  const og = ['og:title', 'og:description', 'og:image'].filter((k) => meta(k));
  const h1s = [...html.matchAll(/<h1\b[\s\S]*?<\/h1>/gi)].map((m) => (attr(m[0], 'aria-label') ?? '').trim() || strip(m[0])).filter(Boolean);
  const h2s = [...html.matchAll(/<h2\b[\s\S]*?<\/h2>/gi)].map((m) => strip(m[0])).filter(Boolean);
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => attr(t, 'alt') === null).length;
  const jsonLd = /<script[^>]*application\/ld\+json/i.test(html);
  const text = strip(html);
  const words = (text.match(/[\p{L}\p{N}]{2,}/gu) ?? []).length;
  const hrefs = [...html.matchAll(/<a\b[^>]*href\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({ href: (m[1] ?? m[2] ?? '').toLowerCase(), text: strip(m[3]).toLowerCase() }));
  const tel = hrefs.some((l) => l.href.startsWith('tel:'));
  const mail = hrefs.some((l) => l.href.startsWith('mailto:'));
  const form = /<form\b/i.test(html);
  const imprint = hrefs.some((l) => /impressum|imprint|legal-notice/.test(l.href) || /impressum|imprint/.test(l.text));
  const privacy = hrefs.some((l) => /datenschutz|privacy|datenschutzerkl/.test(l.href) || /datenschutz|privacy/.test(l.text));
  const sizeKb = Math.round(Buffer.byteLength(html) / 1024);

  // ---------------- Technik ----------------
  add('https', 'technik', 'Verschlüsselte Verbindung (HTTPS)', u.protocol === 'https:' ? 'ok' : 'bad', u.protocol === 'https:' ? 'Die Seite wird verschlüsselt ausgeliefert.' : 'Die Seite wird unverschlüsselt ausgeliefert. Browser zeigen „Nicht sicher“ an.', u.protocol === 'https:' ? undefined : 'Ein SSL-Zertifikat einrichten und alle Aufrufe auf https umleiten.', 2);
  add('status', 'technik', 'Seite erreichbar', page.status < 400 ? 'ok' : 'bad', page.status < 400 ? `Antwortet mit Status ${page.status}.` : `Antwortet mit Fehlerstatus ${page.status}.`, page.status < 400 ? undefined : 'Die Seite liefert einen Fehler aus. Das schadet Besuchern und der Auffindbarkeit.', 2);
  add('speed', 'technik', 'Antwortzeit', ms < 900 ? 'ok' : ms < 2200 ? 'warn' : 'bad', `Die Seite wurde in ca. ${(ms / 1000).toFixed(1).replace('.', ',')} Sekunden geladen (einzelne Messung von unserem Server).`, ms < 900 ? undefined : 'Bilder komprimieren, Caching und schnelleres Hosting prüfen. Jede Sekunde Wartezeit kostet Besucher.', 1.5);
  add('size', 'technik', 'Größe der Startseite', sizeKb < 500 ? 'ok' : sizeKb < 1200 ? 'warn' : 'bad', `Das HTML-Dokument ist ca. ${sizeKb} KB groß.`, sizeKb < 500 ? undefined : 'Überflüssigen Code und eingebettete Inhalte reduzieren.');
  add('hsts', 'technik', 'Sicherheits-Header (HSTS)', headers['strict-transport-security'] ? 'ok' : 'warn', headers['strict-transport-security'] ? 'HSTS ist aktiv.' : 'Es ist kein HSTS-Header gesetzt.', headers['strict-transport-security'] ? undefined : 'HSTS aktivieren, damit Browser immer die verschlüsselte Version nutzen.', 0.5);

  // ---------------- Mobil ----------------
  add('viewport', 'mobil', 'Mobile Darstellung (Viewport)', viewport ? 'ok' : 'bad', viewport ? 'Die Seite meldet sich als mobiltauglich an.' : 'Es fehlt die Viewport-Angabe. Auf dem Smartphone wird die Seite meist winzig dargestellt.', viewport ? undefined : 'Den Viewport-Meta-Tag ergänzen und die Seite für kleine Bildschirme gestalten.', 2);
  add('lang', 'mobil', 'Sprache der Seite angegeben', lang ? 'ok' : 'warn', lang ? `Sprache: ${lang}.` : 'Die Seitensprache ist nicht angegeben.', lang ? undefined : 'Das lang-Attribut im HTML ergänzen (hilft Screenreadern und Suchmaschinen).', 0.5);
  add('alt', 'mobil', 'Bilder mit Textalternative', imgs.length === 0 ? 'ok' : noAlt === 0 ? 'ok' : noAlt / imgs.length > 0.4 ? 'bad' : 'warn', imgs.length === 0 ? 'Auf der Startseite wurden keine Bilder erkannt, es gibt also nichts zu beschriften.' : noAlt === 0 ? `Alle ${imgs.length} Bilder haben eine Textalternative.` : `${noAlt} von ${imgs.length} Bildern haben keine Textalternative.`, imgs.length === 0 || noAlt === 0 ? undefined : 'Alt-Texte ergänzen. Das hilft Barrierefreiheit und Bildersuche.');

  // ---------------- SEO ----------------
  const tl = title.length;
  add('title', 'seo', 'Seitentitel', !tl ? 'bad' : tl < 25 || tl > 65 ? 'warn' : 'ok', !tl ? 'Es gibt keinen Seitentitel.' : `„${title.slice(0, 90)}“ (${tl} Zeichen).`, !tl ? 'Einen aussagekräftigen Titel mit Leistung und Ort ergänzen.' : tl < 25 || tl > 65 ? 'Ideal sind etwa 30 bis 60 Zeichen mit dem wichtigsten Suchbegriff am Anfang.' : undefined, 1.5);
  const dl = description.length;
  add('desc', 'seo', 'Meta-Beschreibung', !dl ? 'bad' : dl < 70 || dl > 170 ? 'warn' : 'ok', !dl ? 'Es gibt keine Meta-Beschreibung.' : `${dl} Zeichen.`, !dl ? 'Eine Beschreibung von 100 bis 160 Zeichen schreiben, die zum Klick einlädt.' : dl < 70 || dl > 170 ? 'Ideal sind 100 bis 160 Zeichen.' : undefined, 1.5);
  add('h1', 'seo', 'Hauptüberschrift (H1)', h1s.length === 1 ? 'ok' : h1s.length === 0 ? 'bad' : 'warn', h1s.length === 1 ? `„${h1s[0].slice(0, 90)}“` : h1s.length === 0 ? 'Es gibt keine H1-Überschrift.' : `Es gibt ${h1s.length} H1-Überschriften.`, h1s.length === 1 ? undefined : 'Genau eine H1 pro Seite, die das Thema klar benennt.', 1.5);
  add('h2', 'seo', 'Zwischenüberschriften', h2s.length >= 2 ? 'ok' : h2s.length === 1 ? 'warn' : 'bad', h2s.length ? `${h2s.length} Zwischenüberschriften gefunden.` : 'Keine Zwischenüberschriften gefunden.', h2s.length >= 2 ? undefined : 'Inhalte mit H2-Überschriften gliedern, für Leser und Suchmaschinen.');
  add('content', 'seo', 'Textumfang', words >= 250 ? 'ok' : words >= 120 ? 'warn' : 'bad', `Ca. ${words} Wörter sichtbarer Text auf der Startseite.`, words >= 250 ? undefined : 'Mehr hilfreicher Text zu Leistungen, Ablauf und Region gibt Suchmaschinen und Kunden Substanz.');
  add('canonical', 'seo', 'Canonical-Link', canonical ? 'ok' : 'warn', canonical ? 'Ein Canonical-Link ist gesetzt.' : 'Kein Canonical-Link gefunden.', canonical ? undefined : 'Einen Canonical-Link setzen, um doppelte Inhalte zu vermeiden.', 0.5);
  add('og', 'seo', 'Vorschau beim Teilen (Open Graph)', og.length === 3 ? 'ok' : og.length ? 'warn' : 'warn', og.length === 3 ? 'Titel, Beschreibung und Bild sind gesetzt.' : og.length ? `Nur ${og.length} von 3 Angaben gesetzt.` : 'Keine Open-Graph-Angaben gefunden.', og.length === 3 ? undefined : 'Open-Graph-Angaben ergänzen, damit geteilte Links ansprechend aussehen.', 0.5);
  add('schema', 'seo', 'Strukturierte Daten', jsonLd ? 'ok' : 'warn', jsonLd ? 'Strukturierte Daten (JSON-LD) gefunden.' : 'Keine strukturierten Daten gefunden.', jsonLd ? undefined : 'Organisations- und Leistungsdaten als JSON-LD ergänzen, für bessere Darstellung bei Google.');
  add('noindex', 'seo', 'Für Suchmaschinen freigegeben', /noindex/.test(robotsMeta) ? 'bad' : 'ok', /noindex/.test(robotsMeta) ? 'Die Seite ist auf „noindex“ gestellt und wird bei Google nicht angezeigt.' : 'Kein Indexierungsverbot gefunden.', /noindex/.test(robotsMeta) ? 'Das noindex entfernen, sofern die Seite gefunden werden soll.' : undefined, 2);
  add('robots', 'seo', 'robots.txt', robotsStatus === 200 ? 'ok' : 'warn', robotsStatus === 200 ? 'Vorhanden.' : 'Nicht gefunden.', robotsStatus === 200 ? undefined : 'Eine robots.txt anlegen und die Sitemap darin verlinken.', 0.5);
  add('sitemap', 'seo', 'Sitemap', sitemapStatus === 200 ? 'ok' : 'warn', sitemapStatus === 200 ? 'sitemap.xml vorhanden.' : 'Keine sitemap.xml unter dem Standardpfad gefunden.', sitemapStatus === 200 ? undefined : 'Eine Sitemap anlegen und in der Google Search Console einreichen.', 0.5);

  // ---------------- Vertrauen & Kontakt ----------------
  add('phone', 'vertrauen', 'Telefonnummer zum Antippen', tel ? 'ok' : 'warn', tel ? 'Eine anklickbare Telefonnummer ist vorhanden.' : 'Keine anklickbare Telefonnummer gefunden.', tel ? undefined : 'Die Nummer als tel:-Link einbinden, damit Mobilnutzer mit einem Tipp anrufen.', 1.5);
  add('contact', 'vertrauen', 'Kontaktweg', mail || form ? 'ok' : 'bad', mail || form ? `${form ? 'Formular' : ''}${form && mail ? ' und ' : ''}${mail ? 'E-Mail-Link' : ''} vorhanden.` : 'Weder Kontaktformular noch E-Mail-Link gefunden.', mail || form ? undefined : 'Einen einfachen Kontaktweg gut sichtbar anbieten.', 2);
  add('imprint', 'vertrauen', 'Impressum verlinkt', imprint ? 'ok' : 'bad', imprint ? 'Ein Impressum-Link ist vorhanden.' : 'Kein Impressum-Link gefunden. Für gewerbliche Seiten in Deutschland ist es Pflicht.', imprint ? undefined : 'Impressum auf jeder Seite verlinken.', 1.5);
  add('privacy', 'vertrauen', 'Datenschutzerklärung verlinkt', privacy ? 'ok' : 'bad', privacy ? 'Ein Datenschutz-Link ist vorhanden.' : 'Kein Datenschutz-Link gefunden.', privacy ? undefined : 'Datenschutzerklärung auf jeder Seite verlinken.', 1.5);

  // ---------------- Scores ----------------
  const val = (s: Status) => (s === 'ok' ? 1 : s === 'warn' ? 0.5 : 0);
  const wOf = (f: Finding) => ((f as unknown as { w: number }).w ?? 1);
  const score = (list: Finding[]) => Math.round((list.reduce((a, f) => a + val(f.status) * wOf(f), 0) / list.reduce((a, f) => a + wOf(f), 0)) * 100);
  const categories = (Object.keys(CATEGORY_LABEL) as CategoryId[]).map((id) => ({ id, label: CATEGORY_LABEL[id], score: score(findings.filter((f) => f.category === id)) }));
  const order: Record<Status, number> = { bad: 0, warn: 1, ok: 2 };
  const clean = findings.map(({ id, category, label, status, detail, tip }) => ({ id, category, label, status, detail, tip })).sort((a, b) => order[a.status] - order[b.status]);

  return {
    url: inputUrl,
    finalUrl,
    host: u.hostname.replace(/^www\./, ''),
    score: score(findings),
    categories,
    findings: clean,
    facts: { title, description, h1: h1s.slice(0, 3), h2: h2s.slice(0, 8), words, responseMs: ms, lang, excerpt: text.slice(0, 1800) },
    checkedAt: new Date().toISOString(),
  };
}
