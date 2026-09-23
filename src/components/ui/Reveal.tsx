'use client';

import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { EASE } from '@/lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  as?: 'div' | 'li' | 'section' | 'p' | 'span';
};

/** Einblenden beim Scrollen: leichter Versatz, optional minimaler Blur. */
export function Reveal({ children, className, delay = 0, y = 28, blur = false, as = 'div' }: Props) {
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
