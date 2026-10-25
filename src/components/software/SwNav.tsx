'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { MonvexMark } from '@/components/ui/Logo';
import { SwIcon } from './icons';
import { SwButton } from './SwButton';
import { categories, productsInCategory, requestHref, swPath, type CategorySlug } from '@/data/software';
import { cn } from '@/lib/cn';

/** Eigene Navigation des Softwarebereichs: Kategorien mit Produkt-Menü, Katalog, Plattform, Anfrage. */
export function SwNav({ mainUrl }: { mainUrl: string }) {
  const path = usePathname() ?? '';
  const [open, setOpen] = useState<CategorySlug | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [acc, setAcc] = useState<CategorySlug | null>(null);
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        setMobile(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobile]);

  const active = categories.find((c) => c.slug === open);

  return (
    <header ref={wrap} className={cn('fixed inset-x-0 top-0 z-[100] transition-all duration-500', scrolled || open || mobile ? 'bg-white/90 shadow-[0_1px_0_rgba(12,16,36,.07)] backdrop-blur-xl' : 'bg-transparent')} onMouseLeave={() => setOpen(null)}>
      <div className="mx-auto flex h-[68px] w-full max-w-[1320px] items-center gap-3 px-5 sm:px-8">
        <Link href={swPath.home} className="flex shrink-0 items-center gap-2.5" aria-label="MONVEX Software, Startseite">
          <MonvexMark className="h-7 w-7" />
          <span className="text-[1.08rem] font-semibold tracking-[-0.03em] text-sw-ink">MONVEX</span>
          <span className="rounded-full bg-[linear-gradient(100deg,#4F46FF,#6D4DF5)] px-2.5 py-1 text-[.7rem] font-semibold tracking-wide text-white">Software</span>
        </Link>

        <nav aria-label="Software-Kategorien" className="ml-6 hidden items-center gap-0.5 lg:flex">
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-expanded={open === c.slug}
              aria-controls="sw-mega"
              onMouseEnter={() => setOpen(c.slug)}
              onFocus={() => setOpen(c.slug)}
              onClick={() => setOpen(open === c.slug ? null : c.slug)}
              className={cn('flex shrink-0 items-center gap-1 rounded-full px-3.5 py-2 text-[.92rem] font-medium transition-colors', open === c.slug ? 'bg-sw-ink/5 text-sw-ink' : 'text-sw-text hover:text-sw-ink')}
            >
              <span className="whitespace-nowrap">
                <span className="xl:hidden">{c.short}</span>
                <span className="hidden xl:inline">{c.short === 'KI' ? 'Künstliche Intelligenz' : c.name}</span>
              </span>
              <ChevronDown size={14} className={cn('transition-transform duration-300', open === c.slug && 'rotate-180')} aria-hidden />
            </button>
          ))}
          <Link href={swPath.catalog} className={cn('whitespace-nowrap rounded-full px-3.5 py-2 text-[.92rem] font-medium transition-colors hover:text-sw-ink', path.startsWith(swPath.catalog) ? 'text-sw-ink' : 'text-sw-text')} onMouseEnter={() => setOpen(null)}>
            Katalog
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a href={mainUrl} className="hidden whitespace-nowrap rounded-full px-3 py-2 text-[.85rem] text-sw-mute transition-colors hover:text-sw-ink 2xl:block">
            monvex-group.de
          </a>
          <SwButton href={requestHref('beratung')} className="hidden whitespace-nowrap sm:inline-flex" arrow={false}>
            Beratung vereinbaren
          </SwButton>
          <button type="button" aria-label={mobile ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={mobile} aria-controls="sw-mobile" onClick={() => setMobile(!mobile)} className="grid h-11 w-11 place-items-center rounded-full border border-sw-ink/10 bg-white text-sw-ink lg:hidden">
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mega-Menü (Desktop) */}
      <div id="sw-mega" className={cn('hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out lg:block', active ? 'max-h-[420px] opacity-100' : 'pointer-events-none max-h-0 opacity-0')}>
        {active && (
          <div className="mx-auto grid w-full max-w-[1320px] grid-cols-[320px_1fr] gap-10 px-8 pb-9 pt-3">
            <div className="rounded-2xl p-6" style={{ background: `linear-gradient(150deg, color-mix(in srgb, ${active.accent} 14%, #fff), #fff)`, border: `1px solid color-mix(in srgb, ${active.accent} 22%, transparent)` }}>
              <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${active.accent}, ${active.accent2})` }}>
                <SwIcon name={active.icon} size={22} />
              </span>
              <h2 className="mt-4 text-[1.25rem] font-semibold tracking-tight">{active.name}</h2>
              <p className="mt-2 text-[.9rem] leading-relaxed text-sw-mute">{active.tagline}</p>
              <Link href={swPath.category(active.slug)} className="mt-5 inline-flex items-center gap-1.5 text-[.9rem] font-semibold" style={{ color: active.accent }}>
                Kategorie ansehen <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 self-start">
              {productsInCategory(active.slug).map((p) => (
                <li key={p.slug}>
                  <Link href={swPath.product(p.slug)} className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-sw-soft">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ background: `color-mix(in srgb, ${active.accent} 12%, #fff)`, color: active.accent }}>
                      <SwIcon name={p.icon} size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-[.95rem] font-semibold text-sw-ink">
                        {p.name.replace('MONVEX ', '')}
                        <span className="rounded-full bg-sw-soft px-1.5 py-0.5 text-[.58rem] font-semibold uppercase tracking-wider text-sw-mute">Konzept</span>
                      </span>
                      <span className="mt-0.5 block text-[.82rem] leading-snug text-sw-mute">{p.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div id="sw-mobile" hidden={!mobile} className="fixed inset-x-0 top-[68px] bottom-0 overflow-y-auto overscroll-contain bg-white px-5 pb-10 pt-3 lg:hidden">
        <ul className="divide-y divide-sw-line">
          {categories.map((c) => (
            <li key={c.slug}>
              <button type="button" aria-expanded={acc === c.slug} onClick={() => setAcc(acc === c.slug ? null : c.slug)} className="flex w-full items-center gap-3 py-4 text-left text-[1.08rem] font-semibold text-sw-ink">
                <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: `color-mix(in srgb, ${c.accent} 12%, #fff)`, color: c.accent }}>
                  <SwIcon name={c.icon} size={18} />
                </span>
                <span className="flex-1">{c.name}</span>
                <ChevronDown size={18} className={cn('transition-transform', acc === c.slug && 'rotate-180')} aria-hidden />
              </button>
              {acc === c.slug && (
                <ul className="pb-3 pl-12">
                  {productsInCategory(c.slug).map((p) => (
                    <li key={p.slug}>
                      <Link href={swPath.product(p.slug)} className="flex items-center justify-between py-2.5 text-[.98rem] text-sw-text">
                        {p.name}
                        <span className="text-[.6rem] font-semibold uppercase tracking-wider text-sw-mute">Konzept</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={swPath.category(c.slug)} className="block py-2.5 text-[.95rem] font-semibold" style={{ color: c.accent }}>
                      Alle in {c.short === 'KI' ? 'KI' : c.name}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
          <li>
            <Link href={swPath.catalog} className="block py-4 text-[1.08rem] font-semibold text-sw-ink">
              Katalog und Vergleich
            </Link>
          </li>
          <li>
            <a href={mainUrl} className="block py-4 text-[1.02rem] text-sw-mute">
              Zur MONVEX-Hauptseite
            </a>
          </li>
        </ul>
        <SwButton href={requestHref('beratung')} className="mt-4 w-full" size="lg">
          Beratung vereinbaren
        </SwButton>
      </div>
    </header>
  );
}
