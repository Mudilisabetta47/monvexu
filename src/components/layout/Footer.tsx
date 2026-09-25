import Link from 'next/link';
import { brands } from '@/data/brands';
import { company, legalNav, nav } from '@/data/site';
import { AGENCY_BASE, agencyServices, servicePath } from '@/data/agency';
import { MonvexLogo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[36px] bg-ink text-white sm:rounded-t-[56px]">
      <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div className="shell relative pt-20 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <MonvexLogo invert className="h-8" />
            <p className="mt-8 max-w-xs text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Build. <span className="serif-i text-ember">Brand.</span> Scale.
            </p>
            <address className="mt-8 text-[.95rem] not-italic leading-relaxed text-white/60">
              <span className="text-white">{company.legalName}</span>
              <br />
              {company.address.street}
              <br />
              {company.address.zip} {company.address.city}
              <br />
              {company.address.country}
            </address>
          </div>

          <FooterCol title="Navigation">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
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
          <p className="font-mono uppercase tracking-[.18em]">{company.seat} · Est. {company.founded}</p>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none relative -mb-[.16em] select-none overflow-hidden text-center font-semibold leading-[.8] tracking-[-0.07em] text-white/[.07]" style={{ fontSize: 'clamp(5rem, 24.5vw, 26rem)' }}>
        MONVEX
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
