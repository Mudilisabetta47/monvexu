import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  size?: 'md' | 'lg';
  arrow?: boolean;
  className?: string;
  /** Absoluter Link auf die MONVEX-Hauptseite (voller Seitenwechsel). */
  external?: boolean;
  style?: React.CSSProperties;
};

const variants = {
  primary: 'sw-btn-primary shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--sw-a,#4f46ff)_70%,transparent)] hover:shadow-[0_14px_36px_-10px_color-mix(in_srgb,var(--sw-a,#4f46ff)_80%,transparent)]',
  secondary: 'border border-sw-ink/15 bg-white text-sw-ink hover:border-sw-ink/40 hover:bg-sw-soft',
  ghost: 'text-sw-ink hover:bg-sw-ink/5',
  dark: 'bg-sw-ink text-white hover:bg-[#1c2244]',
} as const;

export function SwButton({ href, children, variant = 'primary', size = 'md', arrow = true, className, external, style }: Props) {
  const cls = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-out hover:-translate-y-0.5',
    size === 'lg' ? 'px-7 py-3.5 text-[1rem]' : 'px-5 py-2.5 text-[.92rem]',
    variants[variant],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight size={size === 'lg' ? 18 : 16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />}
    </>
  );
  return external || /^https?:/.test(href) ? (
    <a href={href} className={cls} style={style}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} style={style}>
      {inner}
    </Link>
  );
}
