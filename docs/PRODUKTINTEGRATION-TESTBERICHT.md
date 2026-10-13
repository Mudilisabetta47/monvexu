# Testbericht: Produktintegration MONVEX BusOS und EasyKFZ24

Stand: 13.10.2026 · Branch `feature/produkte` · Phase 1 + Phase 2 · **nicht veröffentlicht, nicht gemergt**

## Umfang (Phase 1)

| Bereich | Ergebnis |
|---|---|
| Navigation | `Produkte ▾` (Mega-Menü mit echten Vorschaubildern), `Leistungen ▾`, `Brands ▾`, `Unternehmen`, `Kontakt` |
| Startseite | neue Hero-Folie „Eigene Software. Eigene Plattformen.“, Sektion „Unsere Produkte“ mit drei Bereichen (Digitale Produkte, Softwareentwicklung, Digital Services), zwei große Showcases, Abschnitt „Technologie & Arbeitsweise“, Footer-Spalte „Produkte“ |
| Produktseiten | `/produkte`, `/produkte/busos`, `/produkte/easykfz24` |
| SEO | eigene Titles/Descriptions, Canonical, Open-Graph-Bild, JSON-LD (SoftwareApplication/WebApplication, FAQPage, BreadcrumbList, ItemList), Sitemap |
| Externe Links | alle `https`, `target="_blank"`, `rel="noopener noreferrer"`; Ziel `https://easykfz24.de/` plus die fünf Leistungs-Deeplinks und `/kennzeichen` (alle HTTP 200 geprüft) |

## Phase 2 (Premium-Verfeinerung)

| Bereich | Umsetzung |
|---|---|
| Scrollanimation | Pinned Produkt-Story auf `/produkte/busos` (OPS Center → Charter → Connect) und `/produkte/easykfz24` (Vorgang → Kennzeichen → Auftrag): Bühne bleibt stehen, Text und Mockup wechseln weich. Unter lg und bei „Bewegung reduzieren“ gestapelte Darstellung ohne Pinning |
| Mockups | Neue Handy-Screens für EasyKFZ24 (aus Live-Aufnahmen, Preiszeilen und Aktionshinweise entfernt), Handy-Rahmen mit passendem Seitenverhältnis, 3D-Neigung zum Cursor in den Startseiten-Showcases, schwebende Chips mit realen Modul-/Leistungsnamen |
| Mega-Menü | Schnellzugriffe: BusOS-Demo anfragen, easykfz24.de besuchen (extern, sicher), Alle Produkte; Navigation um „Technologie“ erweitert |
| SEO | gestaltete Teilen-Bilder (1200×630) für `/produkte`, BusOS, EasyKFZ24 (`npm run product-og`), Querverweis von `/werbeagentur/busunternehmen` auf BusOS |
| Mobil | Story gestapelt, Nav bei 1024–1279 px ohne Kontakt-Button (verhindert Abschneiden) |

Gemessen (lokaler Produktionsserver, Chrome): LCP 40–150 ms Desktop, 360–460 ms mobil (4× CPU-Drosselung, 4G), CLS 0. Echte Messwerte im Internet liegen höher; empfohlen: PageSpeed Insights nach dem Livegang.

## Tests

| Prüfung | Ergebnis |
|---|---|
| `tsc --noEmit`, `next lint`, `next build` (95 Seiten) | bestanden |
| `npm run verify:products` (42 Prüfungen: Seiten, Canonical, OG, H1, JSON-LD, Sitemap, Mega-Menü, Story, Links, Aussagen-Wächter) | bestanden |
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

1. ~~BusOS öffentlich zeigen~~ – vom Inhaber am 13.10.2026 freigegeben (als „in Entwicklung“, mit Demo-Bildern). Die Freigabe zum Veröffentlichen der Website (Merge) steht noch aus.
2. Betreiber/Eigentümer von EasyKFZ24 klären (Impressum auf easykfz24.de).
3. Darf „MONVEX entwickelt EasyKFZ24“ so stehen?
