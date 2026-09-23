'use client';

import { useRef } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { m } from 'framer-motion';
import { cn } from '@/lib/cn';

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <m.span style={{ opacity }} className={cn('inline-block', accent && 'serif-i text-ember-deep')}>
      {children}
    </m.span>
  );
}

/** Grosser Absatz, dessen Woerter beim Scrollen nacheinander aufleuchten. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.55'] });
  const words = text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .flatMap((seg) => {
      const accent = seg.startsWith('*');
      return (accent ? seg.slice(1, -1) : seg)
        .split(' ')
        .filter(Boolean)
        .map((w) => ({ w, accent }));
    });
  const n = words.length;
  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, '')}>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <Word progress={scrollYProgress} range={[i / n, Math.min(1, (i + 1.6) / n)]} accent={word.accent}>
            {word.w}
          </Word>{' '}
        </span>
      ))}
    </p>
  );
}
