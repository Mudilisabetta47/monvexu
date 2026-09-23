# MONVEX – Corporate Website

Website der **MONVEX UG (haftungsbeschränkt)**, Bremen: Dachmarke für Marken, Produkte und digitale Geschäftsmodelle.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion (LazyMotion) · Lenis · Lucide

## Starten

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Produktions-Build
npm start            # Produktions-Server
npm run typecheck
npm run lint
```

## Neue Marke hinzufügen

Alles ist datenbasiert. In [`src/data/brands.ts`](src/data/brands.ts) ein Objekt anhängen – Startseite, Ökosystem, `/brands`, `/brands/[slug]`, Sitemap und JSON-LD folgen automatisch:

```ts
{
  slug: 'meine-marke',
  name: 'Meine Marke',
  category: 'Kategorie • Kategorie',
  tags: ['Kategorie'],
  tagline: 'Ein Satz.',
  description: 'Kurzbeschreibung.',
  highlights: ['Punkt 1', 'Punkt 2', 'Punkt 3'],
  logo: '/brand/meine-marke/logo.svg',   // optional (sonst generierte Wortmarke)
  image: '/brand/meine-marke/key.webp',  // optional
  website: 'https://…',                   // optional (sonst "Website folgt")
  status: 'live',                         // live | building | planned
  type: 'own',                            // own = eigene Marke | managed = geführte Marke
  art: 'monogram',                        // route | bloom | rim | monogram (generatives Key-Visual)
  theme: { bg, bg2, fg, muted, accent },  // eigene Farbwelt
}
```

**Selected Work** wird in [`src/data/projects.ts`](src/data/projects.ts) gepflegt. Die Kategorien `own-brand`, `managed-brand`, `project` und `client` werden sauber getrennt dargestellt. Es wird nirgends behauptet, ein Projekt sei eine Tochtergesellschaft.

Leistungen: `src/data/services.ts` · Prozess: `src/data/process.ts` · Firmendaten & Impressum-Pflichtangaben: `src/data/site.ts`

## Vor dem Livegang

1. **Impressum ergänzen** – in `src/data/site.ts` (`legal`): Geschäftsführung, Registergericht/-nummer, E-Mail, ggf. Telefon und USt-IdNr. Fehlende Angaben werden auf `/impressum` und `/datenschutz` sichtbar als „bitte ergänzen“ markiert. Rechtstexte bitte juristisch prüfen lassen.
2. **Kontaktformular aktivieren** – `.env.example` nach `.env.local` (bzw. in Vercel unter *Environment Variables*) kopieren und `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` setzen. Ohne diese Werte zeigt das Formular eine freundliche Fehlermeldung, statt Anfragen zu verlieren. Der Endpunkt (`src/app/api/contact/route.ts`) hat Validierung, Honeypot und einfaches Rate-Limit.
3. **Domain** – `NEXT_PUBLIC_SITE_URL` setzen (Sitemap, OpenGraph, JSON-LD).
4. **Marken-Websites** – `website` in `brands.ts` eintragen, sobald die URLs feststehen.
5. **Einstufung prüfen** – ob Metropol Tours / Rose Café / MTC Autoservice als „eigene“ oder „geführte“ Marke geführt werden (`type` in `brands.ts`, `kind` in `projects.ts`).

## Deployment

Vercel (empfohlen): Repository verbinden, Environment Variables setzen, deployen. Jeder Node-Host mit `npm run build && npm start` funktioniert ebenfalls. Das Kontaktformular benötigt die serverseitige Route – ein reiner statischer Export ist deshalb nicht vorgesehen.

## Architektur

```
src/
  app/            Routen: /, /brands, /brands/[slug], /impressum, /datenschutz, /api/contact, sitemap, robots, OG-Image
  components/
    layout/       Nav, Footer, Cursor, SmoothScroll, Providers, ScrollProgress
    sections/     Hero, Ecosystem, BrandsPreview, Services, Process, Business, SelectedWork, Lab, About, Contact
    brands/       BrandCard, BrandGrid, BrandArt, BrandLogo
    ui/           Button, Reveal, SplitText, ScrollWords, Tilt, Magnetic, Marquee, Logo, SectionHead
  data/           brands, services, projects, process, site
  lib/            seo, motion, cn
```

## Performance & Bewegung

- `LazyMotion` + `m`-Komponenten statt vollem `motion` (kleineres JS), Lab-Sektion als eigener Chunk.
- Animiert werden ausschließlich `transform` und `opacity` (GPU); Scroll-Effekte laufen über `useScroll`/`useTransform` ohne React-Re-Renders.
- Keine Bilder-Downloads: alle Visuals sind SVG/CSS. Schriften (Geist, Instrument Serif) werden über `next/font` selbst gehostet – keine Google-Requests beim Besucher.
- `prefers-reduced-motion` wird respektiert (Framer `MotionConfig`, Lenis aus, CSS-Fallback). Smooth-Scroll und Custom-Cursor nur bei Maus, nie auf Touch.
- Kein GSAP: Framer Motion deckt Pinning, Horizontal-Scroll und Reveals vollständig ab – eine Bibliothek weniger.
