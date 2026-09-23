'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'light' | 'ghost';
  disabled?: boolean;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
};

const variants = {
  primary: 'bg-ink text-white hover:bg-ember',
  secondary: 'border border-ink/15 bg-white/70 text-ink backdrop-blur hover:border-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink hover:bg-ember hover:text-white',
  ghost: 'text-ink hover:bg-ink/5',
} as const;

export function Button({ children, href, onClick, type = 'button', variant = 'primary', disabled, className, arrow = true, magnetic = true }: Props) {
  const cls = cn(
    'group relative inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[.95rem] font-medium tracking-tight transition-colors duration-500 ease-out disabled:pointer-events-none disabled:opacity-50',
    !arrow && 'pr-6',
    variants[variant],
    className,
  );
  const inner = (
    <>
      <span className="relative block h-[1.25em] overflow-hidden">
        <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {arrow && (
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:bg-white/25">
          <ArrowUpRight size={18} strokeWidth={1.8} className={variant === 'secondary' || variant === 'light' || variant === 'ghost' ? 'text-current' : ''} />
        </span>
      )}
    </>
  );

  let el: ReactNode;
  if (href && /^https?:/.test(href)) {
    el = (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  } else if (href) {
    el = (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  } else {
    el = (
      <button type={type} onClick={onClick} disabled={disabled} className={cls}>
        {inner}
      </button>
    );
  }
  return magnetic ? <Magnetic strength={0.18}>{el}</Magnetic> : <>{el}</>;
}
