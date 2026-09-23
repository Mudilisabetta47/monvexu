'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';

type Props = {
  /** `\n` = Zeilenumbruch, `*wort*` = Serif-Kursiv-Akzent. */
  text: string;
  as?: Tag;
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  /** true = sofort animieren (Hero), sonst beim Einscrollen. */
  immediate?: boolean;
};

type Word = { w: string; accent: boolean };

function parse(text: string): Word[][] {
  return text.split('\n').map((line) =>
    line
      .split(/(\*[^*]+\*)/)
      .filter(Boolean)
      .flatMap((seg) => {
        const accent = seg.startsWith('*') && seg.endsWith('*');
        const clean = accent ? seg.slice(1, -1) : seg;
        return clean
          .split(' ')
          .filter(Boolean)
          .map((w) => ({ w, accent }));
      }),
  );
}

/** Headline-Reveal: jedes Wort steigt aus einer Maske auf. */
export function SplitText({ text, as = 'h2', className, accentClassName, delay = 0, stagger = 0.06, immediate }: Props) {
  const Tag = m[as] as typeof m.h2;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const show = immediate || inView;
  const lines = parse(text);
  const plain = text.replace(/\*/g, '').replace(/\n/g, ' ');
  let n = 0;

  return (
    <Tag ref={ref as never} className={className} aria-label={plain}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className="block">
          {line.map((word, wi) => {
            const i = n++;
            const anim = {
              initial: { y: '115%', rotate: 3 },
              animate: show ? { y: '0%', rotate: 0 } : { y: '115%', rotate: 3 },
              transition: { duration: 1.1, delay: delay + i * stagger, ease: EASE },
            };
            return (
              <span key={wi}>
                <span className="inline-block -mb-[.14em] -mt-[.08em] overflow-hidden pb-[.14em] pt-[.08em] align-bottom">
                  <m.span
                    className={cn('inline-block origin-left will-change-transform', word.accent && (accentClassName ?? 'serif-i'))}
                    {...anim}
                  >
                    {word.w}
                    {word.accent && <span className="inline-block w-[.08em]" />}
                  </m.span>
                </span>
                {wi < line.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
