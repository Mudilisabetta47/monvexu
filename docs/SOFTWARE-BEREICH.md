# MONVEX Software – eigenständiger Website-Bereich

Stand: Oktober 2026 · Branch `feature/software-bereich`

## Was es ist
Ein eigenständiger Bereich unter `/software` mit eigener Navigation, eigenem Footer, eigener Farbwelt (Indigo/Violett,
Kategorie-Akzente) und eigenen Komponenten. Die MONVEX-Hauptseiten-Hülle (Nav, Footer, Cursor, Fortschrittsbalken) wird dort
über `src/components/layout/SiteChrome.tsx` ausgeblendet. Bestehende Seiten und Funktionen wurden nicht verändert
(Änderungen am Bestand: `layout.tsx` – SiteChrome-Wrapper, `sitemap.ts` – 25 neue URLs, `tailwind.config.ts` – `sw`-Farben, `next.config.mjs` – optionaler Subdomain-Rewrite).

## Seiten (25)
| Pfad | Inhalt |
|---|---|
| `/software` | Startseite: Hero mit animierter Produktbühne, vier Welten, Produkt-Explorer, Plattform-Schichten (3D), bestehende Produkte, Zielgruppen, Vorgehen, FAQ |
| `/software/katalog` | Suche, Filter (Kategorie, Zielgruppe), Vergleich bis 3 Produkte, Zustand in der URL (`?q=&kat=&zg=&vergleich=`) |
| `/software/kategorie/<slug>` | 4 Kategorieseiten |
| `/software/<produkt>` | 18 Produktseiten (Hero, interaktive Vorschau, Funktionen, Anwendungsfälle, Vorteile, Integration, Vorgehen, FAQ, verwandte Produkte, CTA) |
| `/software/anfrage` | Anfrageformular (Demo / Beratung / Angebot / individuelle Lösung), Vorbelegung per `?art=…&produkt=…`; sendet über das bestehende `/api/contact` |

## Wahrheitsregeln (nicht verhandelbar)
- **Alle 18 Produkte werden individuell für das Unternehmen des Kunden vorbereitet und gebaut** (Datenmodell: `status: 'concept'`).
  Tonalität: „Wir bereiten das für Ihr Unternehmen vor“, nicht „ist nicht live“. Trotzdem nie als sofort verfügbar, fertig kaufbar oder
  mit Preis/Starttermin/Referenzen/Bewertungen darstellen. Jede Produktseite trägt den Hinweis „So bekommen Sie …“, jede Vorschau die
  Beschriftung „Vorschau · Beispieldaten“.
- „Demo anfragen“ bedeutet: Wir zeigen, wie die Lösung für das Unternehmen aussehen würde. Das steht auf der Seite und im Formular.
- Benefits sind als *Entwurfsziele* formuliert, Anwendungsfälle als *Beispiel-Szenarien*. Integrationen sind „geplant“.
- Keine Zertifizierungsbehauptungen (DSGVO-konform, ISO …), keine Garantien. `npm run verify:software` bricht bei solchen Texten ab.
- Real sind nur **MONVEX BusOS** (in Entwicklung) und **EasyKFZ24** (online). Sie erscheinen als „Woran wir bereits bauen“ und als
  verwandte Produkte (Fleet Management → BusOS, Garage → EasyKFZ24) ohne Behauptung über Zusammenspiel.
- Strukturierte Daten: Konzepte erhalten `WebPage` + `FAQPage` + `BreadcrumbList`, **kein** `SoftwareApplication`.

## Neues Produkt / Änderung
Inhalt liegt in `src/data/software/{business,ai,enterprise,personal}.ts`, Kategorien in `categories.ts`.
Neues Icon: in `src/components/software/icons.tsx` ergänzen. Danach `npm run verify:software` (prüft u. a. 6 Funktionen,
4 Vorteile, 2 Mock-Ansichten, gültige Icons/Related, Verbotenes).
Wird ein Produkt real: `status` und Hinweistexte bewusst anpassen, nicht nur Flag umlegen.

## Betrieb auf eigener Subdomain
`next.config.mjs` bildet auf dem Host aus `SOFTWARE_HOST` (Standard `software.monvex-group.de`) `/` → `/software` und
`/<pfad>` → `/software/<pfad>` ab. `/software/*`, `/api/*`, `/_next/*` und Dateien mit Endung bleiben unverändert.
Footer-Links auf die Hauptseite sind absolut (`SITE_URL`). Canonical-URLs zeigen immer auf die Hauptdomain (`/software/...`),
damit kein Duplicate Content entsteht. Ablauf: Domain in Vercel hinzufügen, DNS (CNAME) setzen. Keine Codeänderung nötig.

## Tests (Server auf Port 3140: `npx next start -p 3140`)
```bash
npm run verify:software                                  # Daten + Wahrheitsregeln, ohne Server
BASE=http://localhost:3140 npm run verify:software-layout # 25 Seiten × 8 Breiten, Überlauf, Konsole, H1
BASE=http://localhost:3140 npm run verify:software-ui     # Katalog, Vergleich, Formular (Versand abgefangen), Menüs
BASE_URL=http://localhost:3140 npm run verify:seo         # bestehende SEO-Prüfung inkl. neuer URLs
```
Barrierefreiheit wurde zusätzlich mit axe-core (WCAG 2.1 AA + Best Practice) auf 8 Seiten × 2 Breiten geprüft: 0 Verstöße.
Kontrast: `--sw-a`/Kategorie-`accent` sind AA-konform auf Weiß und auf 10 %-Tönung; die hellen `accent2`-Töne nur für Flächen.

## Offen / Entscheidung der Inhaberin bzw. des Inhabers
- Freigabe der Produktnamen und -ideen (alle sind Vorschläge aus dem Briefing, nichts davon ist beschlossen).
- Eigene Domain/Subdomain (`software.monvex-group.de`) anlegen, falls gewünscht.
- Resend-Variablen in Vercel (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`), sonst zeigt das Formular „derzeit nicht verfügbar“.
- Optional: eigenes Open-Graph-Bild für `/software` (aktuell das allgemeine MONVEX-Bild).
