# MONVEX Shop-Start (ENTWURF, nicht veröffentlicht)

Branch `feature/shops-landing`. Seiten: `/shops` (Landingpage, Pakete, Branchen, „Was nicht enthalten ist“, FAQ), `/shops/bestellen`
(Bestellformular → bestehendes `/api/contact`, Topic „Shop-Start: Paket · Branche“). Beide Seiten sind `noindex` und nicht in der Sitemap.
Subdomain: `shops.monvex-group.de` (Host über `SHOPS_HOST`) bildet `/` auf `/shops` ab, siehe `next.config.mjs`.

## Vor dem Start zu entscheiden (alles Platzhalter in `src/data/shops.ts`)
- Preise und Leistungsumfang (hier 99 / 199 / 349 €, inkl. MwSt. angenommen), Lieferzeit-Ziel (3–5 Werktage), Markenname
- **Branchenvorlagen müssen existieren**, bevor sie beworben werden: je Branche ein Muster-Shop (Shopify-Partner-Entwicklungsshop mit Theme, Kategorien, Seiten)
- AGB, Widerrufsbelehrung für digitale Dienstleistungen, Datenschutz-Ergänzung, Impressum-Hinweis; Rechtstexte der Kunden NICHT als „rechtssicher“ versprechen
- Shopify-Partner-Bedingungen und Theme-Lizenzen prüfen (Übergabe des Shops auf den Kunden, Weiterverkauf von Themes)
- Bezahlung: aktuell nur Bestellung per Formular, Rechnung danach. Stripe-Checkout erst mit Konto und Schlüsseln des Inhabers

## Wahrheitsregeln
Keine erfundenen Bewertungen, Verkaufszahlen („130 Shops“), Countdowns/Dringlichkeit, Umsatzversprechen; keine Dropshipping-Lieferanten oder Produkte von uns.

## Automatisierung (Stufe 1 → 3)
1. Formular + Checkliste, erste 3 Shops von Hand aus der Vorlage bauen (Aufwand messen)
2. Shopify-Konfiguration per Admin-API (Theme, Produkte, Seiten, Menü) nach App-Installation durch den Kunden: Machbarkeit vorher gegen aktuelle Shopify-Doku prüfen
3. Admin-Bereich mit Auftragsstatus und Freigabe, Stripe-Webhook, Statusmails

## Test
`BASE=http://localhost:3140 npm run verify:shops`
