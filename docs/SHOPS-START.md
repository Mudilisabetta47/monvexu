# MONVEX Shop-Start (ENTWURF, nicht veröffentlicht)

Branch `feature/shops-landing`. Seiten: `/shops` (Landingpage, Pakete, Branchen, „Was nicht enthalten ist“, FAQ), `/shops/bestellen`
(Bestellformular → bestehendes `/api/contact`, Topic „Shop-Start: Paket · Branche“). Beide Seiten sind `noindex` und nicht in der Sitemap.
Subdomain: `shops.monvex-group.de` (Host über `SHOPS_HOST`) bildet `/` auf `/shops` ab, siehe `next.config.mjs`.

## Vor dem Start zu entscheiden (alles Platzhalter in `src/data/shops.ts`)
- Preise und Leistungsumfang (hier 49 / 79 / 299 €, inkl. MwSt. angenommen), Lieferzeit-Ziel (3–5 Werktage), Markenname
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

## Online-Bezahlung (Stripe Checkout) – Stand: Code fertig, aktiv erst mit Schlüsseln
Ablauf: Formular `/shops/bestellen` → `POST /api/shops/checkout` → Stripe-Bezahlseite (gehostet, wir sehen keine Kartendaten) → `/shops/danke`.
Der Betrag kommt immer aus `src/data/shops.ts`, nie vom Browser. Stripe erzeugt die Rechnung (PDF) automatisch. Wir bekommen zwei Mails:
„Bezahlung gestartet (noch nicht bezahlt)“ beim Absenden und „BEZAHLT“ über den Webhook.

**Aktivierung (macht der Inhaber, ca. 20 Minuten):**
1. Stripe-Konto anlegen und Firmendaten ausfüllen (Rechnungs-/Impressumsdaten, Bankkonto, Identitätsprüfung). Zahlungsarten im Dashboard wählen (Karte, PayPal, Klarna, SEPA …).
2. **AGB und Widerrufsbelehrung** erstellen lassen (Anwalt oder Rechtstext-Anbieter) und als Seiten/Dateien online stellen. Für Verbraucher ist bei Beginn der Leistung vor Ablauf der Widerrufsfrist eine ausdrückliche Zustimmung nötig, das muss im Text stehen. Ohne diese Texte NICHT aktivieren.
3. In Vercel (Project → Settings → Environment Variables) setzen, danach neu deployen:
   - `STRIPE_SECRET_KEY` (zuerst `sk_test_…` zum Testen, dann `sk_live_…`)
   - `SHOPS_LEGAL_CONFIRMED=true`
   - `SHOPS_AGB_URL`, `SHOPS_WIDERRUF_URL` (vollständige Adressen)
   - `STRIPE_WEBHOOK_SECRET` (siehe 4)
   - vorhanden sein müssen außerdem `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
4. Stripe → Entwickler → Webhooks → Endpunkt `https://www.monvex-group.de/api/shops/stripe-webhook`, Ereignisse `checkout.session.completed` und `checkout.session.async_payment_succeeded`; das Signing-Secret (`whsec_…`) als `STRIPE_WEBHOOK_SECRET` eintragen.
5. Mit Testschlüssel und Testkarte 4242 4242 4242 4242 durchspielen, erst dann Live-Schlüssel.

Ohne diese Variablen bleibt es bei der Anfrage per Formular (Rechnung nach Bestätigung). Test des Codes: `npm run verify:shops-pay` (Mock-Server, keine echten Zahlungen).
Offen: Umsatzsteuer-Einstellungen (Preise sind als Bruttopreise angesetzt), Stripe Tax optional, Stornos/Erstattungen im Stripe-Dashboard.

## Rechtstexte (Entwurf, Branch `feature/shops-rechtstexte`)
Als Dienstleistung aufgebaut (Aufbau eines Shops, kein Warenverkauf): `/shops/agb` (AGB), `/shops/widerruf` (Widerrufsbelehrung nach gesetzlichem Muster für Dienstleistungen, Muster-Widerrufsformular, **Online-Widerruf** mit Eingangsbestätigung per E-Mail). Footer-Link „Vertrag widerrufen“ in jedem Shop-Start-Fuß.
- Im Bestellformular (nur bei aktiver Bezahlung) gibt es zusätzlich zur AGB-Checkbox die **ausdrückliche Zustimmung zum Beginn der Ausführung vor Ablauf der Widerrufsfrist** samt Hinweis auf das Erlöschen des Widerrufsrechts (§ 356 Abs. 4 BGB). Der Server verlangt sie, sie wird in Stripe-Metadaten und der „BEZAHLT“-Mail festgehalten.
- Die Texte sind **nicht anwaltlich geprüft**. `LEGAL_REVIEWED` in `src/data/shops.ts` steht auf `false`: Hinweis-Banner und noindex. Erst nach Prüfung auf `true` setzen.
- `SHOPS_AGB_URL` / `SHOPS_WIDERRUF_URL` sind jetzt optional (Standard: `<SITE_URL>/shops/agb` und `/shops/widerruf`). Weiter nötig: `SHOPS_LEGAL_CONFIRMED=true`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.
- Vom Anwalt zu klären: Umsatzsteuer-Satz/Kleinunternehmer-Hinweis in § 5, Streitbeilegungs-Erklärung in § 13, Haftungsklausel, Wertersatz-Formulierung, EU-Widerrufsfunktion (gilt nach der EU-Richtlinie 2023/2673 ab 19.06.2026, Umsetzung in Deutschland prüfen lassen).

## Preis-Darstellung
Stufen 49 / 79 / 299 € (Endziffer 9, Plus als „Unser Tipp“). Auf den Karten und im Vergleich steht der Aufpreis zur nächsten Stufe („+100 € zu Start“) und „einmalig, kein Abo“. Bewusst NICHT verwendet: Streichpreise („statt …“), erfundene Rabatte, Zeitdruck, Verknappung, Verkaufszahlen. Das wäre unwahr und in Deutschland abmahnbar (UWG, PAngV).
