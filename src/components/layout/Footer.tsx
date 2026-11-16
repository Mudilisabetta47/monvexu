import Link from 'next/link';
import { brands } from '@/data/brands';
import { company, legal, legalNav, nav } from '@/data/site';
import { products } from '@/data/products';
import { AGENCY_BASE, agencyServices, servicePath } from '@/data/agency';
import { MonvexLogo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-ember bg-ink text-white">
      <div className="shell relative pt-14 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <MonvexLogo invert className="h-8" />
            <p className="mt-6 max-w-xs text-[1.15rem] font-semibold leading-snug tracking-tight">
              Software, digitale Produkte und Werbeagentur aus Bremen.
            </p>
            <address className="mt-8 text-[.95rem] not-italic leading-relaxed text-white/60">
              <span className="text-white">{company.legalName}</span>
              <br />
              {company.address.street}
              <br />
              {company.address.zip} {company.address.city}
              <br />
              {company.address.country}
              {(legal.phone || legal.email) && <br />}
              {legal.phone && <><br /><a href={`tel:${legal.phone.replace(/\s/g, '')}`} className="hover:text-white">Tel. {legal.phone}</a></>}
              {legal.email && <><br /><a href={`mailto:${legal.email}`} className="hover:text-white">{legal.email}</a></>}
            </address>
          </div>

          <FooterCol title="Navigation">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Produkte">
            <FooterLink href="/produkte">Alle Produkte</FooterLink>
            {products.map((pr) => (
              <FooterLink key={pr.slug} href={pr.href}>
                {pr.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Marken">
            {brands.map((b) => (
              <FooterLink key={b.slug} href={`/brands/${b.slug}`}>
                {b.name}
              </FooterLink>
            ))}
            <FooterLink href="/brands">Alle Marken</FooterLink>
          </FooterCol>

          <FooterCol title="Werbeagentur">
            <FooterLink href={AGENCY_BASE}>Übersicht</FooterLink>
            {agencyServices.slice(0, 5).map((s) => (
              <FooterLink key={s.slug} href={servicePath(s.slug)}>
                {s.name}
              </FooterLink>
            ))}
            <FooterLink href={`${AGENCY_BASE}/fahrschulen`}>Für Fahrschulen</FooterLink>
            <FooterLink href={`${AGENCY_BASE}/anwaelte`}>Für Anwälte</FooterLink>
            <FooterLink href={`${AGENCY_BASE}/branchen`}>Alle Branchen</FooterLink>
            <FooterLink href="/website-check">KI-Website-Check</FooterLink>
          </FooterCol>

          <FooterCol title="Rechtliches">
            {legalNav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/12 py-6 text-[.8rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName}. Alle Rechte vorbehalten.</p>
          <p>{legal.registerCourt ? `${legal.registerCourt}${legal.registerNumber ? `, ${legal.registerNumber}` : ''}` : company.seat}{legal.managingDirector ? ` · Geschäftsführung: ${legal.managingDirector}` : ''}</p>
        </div>
      </div>

    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-eyebrow uppercase text-white/40">{title}</p>
      <ul className="mt-6 space-y-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-u text-[1.02rem] text-white/80 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
