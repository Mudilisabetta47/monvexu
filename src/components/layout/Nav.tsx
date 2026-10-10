'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { m } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { MonvexLogo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { MegaPanel } from './MegaMenu';
import { getLenis } from './SmoothScroll';
import { agencyServices, industries, industryPath, servicePath } from '@/data/agency';
import { brands } from '@/data/brands';
import { company, nav, type MegaId } from '@/data/site';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(pathname === '/');
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24);
    setOnDark(pathname === '/' && v < window.innerHeight * 0.62);
  });

  useEffect(() => {
    setOpen(false);
    setOnDark(pathname === '/' && window.scrollY < window.innerHeight * 0.62);
  }, [pathname]);
  const [mega, setMega] = useState<MegaId | null>(null);
  const [mobileSub, setMobileSub] = useState<MegaId | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openMega = useCallback((id: MegaId) => {
    clearTimeout(closeTimer.current);
    setMega(id);
  }, []);
  const closeMegaSoon = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 160);
  }, []);
  const closeMegaNow = useCallback(() => {
    clearTimeout(closeTimer.current);
    setMega(null);
  }, []);
  useEffect(() => closeMegaNow(), [pathname, closeMegaNow]);
  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMegaNow();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mega, closeMegaNow]);
  const dark = onDark || open;

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      getLenis()?.start();
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-6 sm:pt-5">
        <div className="relative mx-auto max-w-[1380px]" onMouseEnter={() => clearTimeout(closeTimer.current)} onMouseLeave={closeMegaSoon}>
        <m.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className={cn(
            'flex w-full items-center justify-between rounded-full border py-2 pl-4 pr-2 transition-all duration-700 ease-out sm:pl-5',
            dark
              ? 'border-white/15 bg-white/[.07] shadow-[0_10px_40px_-14px_rgba(0,0,0,.6)] backdrop-blur-xl'
              : scrolled || pathname !== '/'
                ? 'glass border-white/80 shadow-card'
                : 'border-transparent bg-transparent',
          )}
        >
          <Link href="/" aria-label="MONVEX – Startseite" data-cursor="Home">
            <MonvexLogo className="h-[26px]" invert={dark} />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isOpen = mega === item.mega && !!item.mega;
              const base = cn(
                'group relative flex items-center gap-1 rounded-full px-4 py-2 text-[.92rem] font-medium transition-colors',
                dark ? 'text-white/70 hover:text-white' : 'text-graphite hover:text-ink',
                isOpen && (dark ? '!text-white' : '!text-ink'),
              );
              const underline = (
                <span className={cn('absolute -bottom-1 left-0 h-px w-full origin-left bg-ember transition-transform duration-500 ease-out', isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')} />
              );
              if (!item.mega) {
                return (
                  <Link key={item.href} href={item.href} onMouseEnter={closeMegaSoon} onFocus={closeMegaNow} className={base}>
                    <span className="relative">
                      {item.label}
                      {underline}
                    </span>
                  </Link>
                );
              }
              const id = item.mega;
              return (
                <div key={item.href} className="relative flex items-center" onMouseEnter={() => openMega(id)}>
                  <Link href={item.href} className={base} onClick={closeMegaNow} onFocus={() => openMega(id)}>
                    <span className="relative">
                      {item.label}
                      {underline}
                    </span>
                  </Link>
                  <button
                    type="button"
                    aria-label={`${item.label}-Menü ${isOpen ? 'schließen' : 'öffnen'}`}
                    aria-expanded={isOpen}
                    aria-controls={`mega-${id}`}
                    onClick={() => (isOpen ? closeMegaNow() : openMega(id))}
                    className={cn('-ml-3 grid h-7 w-7 place-items-center rounded-full transition-colors', dark ? 'text-white/60 hover:text-white' : 'text-mute hover:text-ink')}
                  >
                    <ChevronDown size={14} className={cn('transition-transform duration-500 ease-out', isOpen && 'rotate-180')} />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="/#kontakt" magnetic={false} variant={dark ? 'light' : 'primary'} className="!py-1.5 !pl-5 !pr-1.5 text-[.88rem] [&>span:last-child]:!h-9 [&>span:last-child]:!w-9">
                Kontakt aufnehmen
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
              className={cn("relative grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden", dark ? "bg-white text-ink hover:bg-ember hover:text-white" : "bg-ink text-white hover:bg-ember")}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </m.div>

        {/* Mega-Menü */}
        <AnimatePresence>
          {mega && (
            <m.div
              key={mega}
              id={`mega-${mega}`}
              role="region"
              aria-label={mega === 'brands' ? 'Marken' : 'Werbeagentur'}
              initial={{ opacity: 0, y: -10, scale: 0.985, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, scale: 0.99, filter: 'blur(4px)', transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-x-0 top-full z-10 hidden origin-top pt-3 lg:block"
            >
              <div className="rounded-[30px] border border-line bg-white p-6 text-ink shadow-[0_40px_100px_-30px_rgba(11,11,13,.5),0_6px_20px_rgba(11,11,13,.1)] xl:p-8">
                <MegaPanel id={mega} onNavigate={closeMegaNow} />
              </div>
            </m.div>
          )}
        </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-ink px-6 pb-8 pt-28 text-white lg:hidden"
          >
            <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-60" />
            <nav aria-label="Mobile Navigation" className="relative flex flex-1 flex-col justify-center gap-1 py-6">
              {nav.map((item, i) => {
                const sub = item.mega === mobileSub;
                const links =
                  item.mega === 'brands'
                    ? [...brands.map((b) => ({ label: b.name, href: `/brands/${b.slug}` })), { label: 'Alle Marken', href: '/brands' }]
                    : item.mega === 'agency'
                      ? [
                          { label: 'Übersicht', href: '/werbeagentur' },
                          ...agencyServices.slice(0, 6).map((s) => ({ label: s.name, href: servicePath(s.slug) })),
                          ...industries.slice(0, 4).map((x) => ({ label: `Für ${x.name}`, href: industryPath(x) })),
                          { label: 'Alle Branchen', href: '/werbeagentur/branchen' },
                          { label: 'KI-Website-Check', href: '/website-check' },
                        ]
                      : [];
                return (
                  <div key={item.href}>
                    <div className="overflow-hidden">
                      <m.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.07 }} className="flex items-center justify-between gap-3">
                        <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2 text-[clamp(2.4rem,11vw,4.2rem)] font-semibold leading-none tracking-[-0.05em]">
                          <span className="font-mono text-[.7rem] font-normal tracking-widest text-white/40">0{i + 1}</span>
                          {item.label}
                        </Link>
                        {item.mega && (
                          <button
                            type="button"
                            aria-expanded={sub}
                            aria-label={`${item.label}: Unterpunkte ${sub ? 'einklappen' : 'ausklappen'}`}
                            onClick={() => setMobileSub(sub ? null : (item.mega as MegaId))}
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 text-white"
                          >
                            <ChevronDown size={18} className={cn('transition-transform duration-500', sub && 'rotate-180')} />
                          </button>
                        )}
                      </m.div>
                    </div>
                    <AnimatePresence initial={false}>
                      {sub && (
                        <m.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="ml-9 grid grid-cols-2 gap-x-4 gap-y-1 overflow-hidden border-l border-white/15 pl-4"
                        >
                          {links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} onClick={() => setOpen(false)} className="block py-1.5 text-[.98rem] text-white/75 transition-colors hover:text-ember">
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </m.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="relative mt-10 border-t border-white/15 pt-6 text-sm text-white/60">
              <p className="font-medium text-white">{company.legalName}</p>
              <p>{company.address.street}, {company.address.zip} {company.address.city}</p>
              <p className="mt-4 font-mono text-[.7rem] uppercase tracking-[.2em] text-ember">{company.tagline}</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
