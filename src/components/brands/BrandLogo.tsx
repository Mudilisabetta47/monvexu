import Image from 'next/image';
import type { Brand } from '@/data/brands';
import { cn } from '@/lib/cn';

/**
 * Logo einer Marke: echte Datei aus `brand.logo`, sonst eine saubere Wortmarke
 * (erstes Wort fett, Rest leicht) mit Monogramm-Chip in Markenfarbe.
 */
export function BrandLogo({ brand, className, color }: { brand: Brand; className?: string; color?: string }) {
  const fg = color ?? brand.theme.fg;
  if (brand.logo) {
    return <Image src={brand.logo} alt={`${brand.name} Logo`} width={160} height={40} className={cn('h-8 w-auto', className)} />;
  }
  const [first, ...rest] = brand.wordmark ? [brand.wordmark[0], brand.wordmark[1]] : brand.name.split(' ');
  const initials = brand.monogram ?? brand.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} style={{ color: fg }}>
      <span
        className="grid h-9 w-9 place-items-center rounded-[10px] font-mono text-[.72rem] font-semibold tracking-tight"
        style={{ background: brand.theme.accent, color: brand.theme.bg }}
      >
        {initials}
      </span>
      <span className="text-[1.02rem] leading-none tracking-[.02em]">
        <span className="font-semibold uppercase">{first}</span>
        {rest.length > 0 && <span className="ml-1.5 font-light uppercase opacity-80">{rest.join(' ')}</span>}
      </span>
    </span>
  );
}
