import Image from 'next/image';
import { cn } from '@/lib/cn';

type Img = { src: string; alt: string; width: number; height: number; sizes?: string; priority?: boolean };

/** Fenster-Rahmen für Desktop-Screenshots. `label` ist eine ehrliche Beschriftung (z. B. „Demo-Betrieb“), keine erfundene URL. */
export function BrowserFrame({ img, label, className, tone = 'light' }: { img: Img; label: string; className?: string; tone?: 'light' | 'dark' }) {
  return (
    <figure className={cn('overflow-hidden rounded-[18px] border bg-white shadow-[0_50px_90px_-30px_rgba(11,37,64,.45),0_10px_30px_-12px_rgba(11,37,64,.18)]', tone === 'dark' ? 'border-white/15' : 'border-black/10', className)}>
      <div className="flex items-center gap-2 border-b border-black/[.07] bg-[#F4F6F8] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-1 font-mono text-[.62rem] tracking-[.04em] text-[#5A6683]">{label}</span>
      </div>
      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={img.sizes ?? '(min-width:1024px) 55vw, 92vw'} priority={img.priority} className="block h-auto w-full" />
    </figure>
  );
}

/** Smartphone-Rahmen. Der untere Rand des Screenshots wird weich ausgeblendet (Aufnahme ist bewusst oberhalb von Preiszeilen beschnitten). */
export function PhoneFrame({ img, className, fade = true }: { img: Img; className?: string; fade?: boolean }) {
  return (
    <figure className={cn('relative aspect-[9/19] w-[200px] shrink-0 rounded-[38px] bg-[#0A1433] p-[7px] shadow-[0_40px_70px_-20px_rgba(10,20,51,.55),inset_0_0_0_1.5px_rgba(255,255,255,.12)] sm:w-[230px]', className)}>
      <span aria-hidden className="absolute left-1/2 top-[11px] z-10 h-[15px] w-[62px] -translate-x-1/2 rounded-full bg-[#0A1433]" />
      <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-white">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="240px" className="block h-auto w-full" />
        {fade && <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-white via-white/85 to-transparent" />}
      </div>
    </figure>
  );
}

/** Echtes Produktzeichen von EasyKFZ24 (aus dem Projekt übernommen). */
export function EasyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" className={className} aria-hidden>
      <rect width="34" height="34" rx="9.5" fill="#0a1433" />
      <rect x="9" y="8.6" width="3.4" height="16.8" rx="1.7" fill="#fff" />
      <rect x="9" y="8.6" width="15.4" height="3.4" rx="1.7" fill="#fff" />
      <rect x="9" y="22" width="15.4" height="3.4" rx="1.7" fill="#fff" />
      <path d="M10.7 15.3h12.6l-1.7-1.7a1 1 0 0 1 1.4-1.4l3.6 3.6a1.2 1.2 0 0 1 0 1.7l-3.6 3.6a1 1 0 0 1-1.4-1.4l1.7-1.7H10.7a1.35 1.35 0 0 1 0-2.7z" fill="#3d6bff" />
    </svg>
  );
}

/** Echtes Produktzeichen von BusOS (aus dem Projekt übernommen). */
export function BusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 26" className={className} fill="none" aria-hidden>
      <path d="M4 3l18 20" stroke="#096a63" strokeWidth="4.6" strokeLinecap="round" />
      <path d="M22 3 4 23" stroke="#2b63f2" strokeWidth="4.6" strokeLinecap="round" />
      <circle cx="13" cy="13" r="2.9" fill="#86efcf" />
    </svg>
  );
}

export function EasyWordmark({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <EasyMark className="h-9 w-9" />
      <span className="text-[1.35rem] font-bold tracking-[-0.03em]" style={{ color: tone === 'ink' ? '#0A1433' : '#fff' }}>
        Easy<span style={{ color: '#2A55FF' }}>KFZ24</span>
      </span>
    </span>
  );
}

export function BusWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BusMark className="h-8 w-8" />
      <span className="text-[1.05rem] font-semibold tracking-[.2em] text-[#0B2540]">MONVEX</span>
      <span className="rounded-md bg-[#096A63] px-2 py-1 text-[.7rem] font-bold leading-none tracking-wide text-white">BusOS</span>
    </span>
  );
}
