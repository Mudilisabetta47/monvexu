'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MonvexLogo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { getLenis } from './SmoothScroll';
import { company, nav } from '@/data/site';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  useEffect(() => setOpen(false), [pathname]);

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
        <m.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className={cn(
            'mx-auto flex max-w-[1380px] items-center justify-between rounded-full border py-2 pl-4 pr-2 transition-all duration-700 ease-out sm:pl-5',
            scrolled || open || pathname !== '/' ? 'glass border-white/80 shadow-card' : 'border-transparent bg-transparent',
          )}
        >
          <Link href="/" aria-label="MONVEX – Startseite" data-cursor="Home">
            <MonvexLogo className="h-[26px]" />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="group relative rounded-full px-4 py-2 text-[.92rem] font-medium text-graphite transition-colors hover:text-ink">
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="/#kontakt" magnetic={false} className="!py-1.5 !pl-5 !pr-1.5 text-[.88rem] [&>span:last-child]:!h-9 [&>span:last-child]:!w-9">
                Kontakt aufnehmen
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-ember lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </m.div>
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
            <nav aria-label="Mobile Navigation" className="relative flex flex-1 flex-col justify-center gap-1">
              {nav.map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <m.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.07 }}>
                    <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2 text-[clamp(2.6rem,12vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">
                      <span className="font-mono text-[.7rem] font-normal tracking-widest text-white/40">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </m.div>
                </div>
              ))}
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
