'use client';

import { useRef, type ReactNode } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { m } from 'framer-motion';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
};

/**
 * 3D-Neigung zum Cursor plus Spotlight. Setzt zusaetzlich die CSS-Variablen
 * --px/--py (-1…1) und --mx/--my (%), damit Kinder ihre Ebenen per CSS parallax bewegen koennen.
 */
export function Tilt({ children, className, max = 7, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.5 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.5 });

  const reset = () => {
    rx.set(0);
    ry.set(0);
    ref.current?.style.setProperty('--px', '0');
    ref.current?.style.setProperty('--py', '0');
  };

  return (
    <m.div
      ref={ref}
      className={cn('group/tilt preserve-3d', !/\b(absolute|fixed)\b/.test(className ?? '') && 'relative', className)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width) * 2 - 1;
        const py = ((e.clientY - r.top) / r.height) * 2 - 1;
        rx.set(-py * max);
        ry.set(px * max);
        const el = ref.current;
        el.style.setProperty('--px', px.toFixed(3));
        el.style.setProperty('--py', py.toFixed(3));
        el.style.setProperty('--mx', `${((px + 1) / 2) * 100}%`);
        el.style.setProperty('--my', `${((py + 1) / 2) * 100}%`);
      }}
      onPointerLeave={reset}
    >
      {children}
      {glare && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{ background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.28), transparent 60%)', mixBlendMode: 'soft-light' }}
        />
      )}
    </m.div>
  );
}
