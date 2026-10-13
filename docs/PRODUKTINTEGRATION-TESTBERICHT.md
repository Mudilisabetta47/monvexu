# Testbericht: Produktintegration MONVEX BusOS und EasyKFZ24

Stand: 13.10.2026 · Branch `feature/produkte` · **nicht veröffentlicht, nicht gemergt**

## Umfang (Phase 1)

| Bereich | Ergebnis |
|---|---|
| Navigation | `Produkte ▾` (Mega-Menü mit echten Vorschaubildern), `Leistungen ▾`, `Brands ▾`, `Unternehmen`, `Kontakt` |
| Startseite | neue Hero-Folie „Eigene Software. Eigene Plattformen.“, Sektion „Unsere Produkte“ mit drei Bereichen (Digitale Produkte, Softwareentwicklung, Digital Services), zwei große Showcases, Abschnitt „Technologie & Arbeitsweise“, Footer-Spalte „Produkte“ |
| Produktseiten | `/produkte`, `/produkte/busos`, `/produkte/easykfz24` |
| SEO | eigene Titles/Descriptions, Canonical, Open-Graph-Bild, JSON-LD (SoftwareApplication/WebApplication, FAQPage, BreadcrumbList, ItemList), Sitemap |
| Externe Links | alle `https`, `target="_blank"`, `rel="noopener noreferrer"`; Ziel `https://easykfz24.de/` plus die fünf Leistungs-Deeplinks und `/kennzeichen` (alle HTTP 200 geprüft) |

## Tests

| Prüfung | Ergebnis |
|---|---|
| `tsc --noEmit`, `next lint`, `next build` (95 Seiten) | bestanden |
| `npm run verify:products` (33 Prüfungen: Seiten, Canonical, OG, H1, JSON-LD, Sitemap, Mega-Menü, Links, Aussagen-Wächter) | bestanden |
| `npm run verify:seo` (81 Sitemap-URLs, 80 interne Link-Ziele, Dubletten, Ähnlichkeit) | bestanden |
| Horizontaler Überlauf bei 390, 430, 768, 1024, 1440, 1920, 2560 px (4 Seiten je Breite) | keiner |
| JavaScript-Fehler in der Konsole | keine |
| Mobiles Menü, Mega-Menü per Hover, Tastatur (Escape) | bestanden |

Nicht getestet: echte Geräte (nur Chrome-Emulation), Safari/Firefox.

## Belegbasis der Aussagen

- **BusOS:** Modulkatalog `MONVEXUGOXZ/src/lib/modules.ts` (`implemented`-Flag). Als „im Demo-Betrieb nutzbar“ gelten CORE, CHARTER, CONNECT, OPS, DRIVER_APP; alle übrigen Module stehen als „In Entwicklung“. Bilder: Demo-Screenshots des Projekts (fiktiver Betrieb „Demo Busunternehmen Beta“, Beispielkunden), jeweils als Demo gekennzeichnet. Das WordPress-Plugin ist als „in Erprobung, nicht veröffentlicht“ ausgewiesen.
- **EasyKFZ24:** Live-Seite https://easykfz24.de (Leistungen, Fahrzeugarten, Ablauf, Hinweis „keine Behörde“), Farben aus `src/styles/tokens.css`, Zeichen aus `public/favicon.svg`. Aufnahmen vom 13.10.2026, oberhalb der Preiszeilen beschnitten (keine Preise auf der MONVEX-Seite).

## Nicht übernommen / bewusst offen

- Keine Preise, Kennzahlen, Kundenreferenzen oder „verfügbar“-Aussagen zu BusOS.
- Kein Logo-Dateiasset von EasyKFZ24 im Projekt außer dem Favicon-Zeichen; Wortmarke wird aus Zeichen + Schrift nachgebaut.
- Kein BusOS-Quellcode, keine Datenbank, keine Zugänge, keine `.env`-Dateien gelesen oder kopiert.
- Operator/Eigentümer von EasyKFZ24: im Projekt nicht dokumentiert (Impressum dort noch Platzhalter). MONVEX wird nur als **Entwickler** genannt.

## Offene Freigaben

1. Darf BusOS öffentlich als Produkt in Entwicklung gezeigt werden? Dürfen die Demo-Screenshots öffentlich genutzt werden?
2. Betreiber/Eigentümer von EasyKFZ24 klären (Impressum auf easykfz24.de).
3. Darf „MONVEX entwickelt EasyKFZ24“ so stehen?
