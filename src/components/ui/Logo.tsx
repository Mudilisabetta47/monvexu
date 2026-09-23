import { cn } from '@/lib/cn';
import { MARK, WORDMARK } from './logo-paths';

const EMBER = '#FF4A1C';

/** MONVEX-Zeichen: ein M, dessen aufsteigender Strich in Ember leuchtet. */
export function MonvexMark({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <svg viewBox="6 6 52 52" className={className} aria-hidden fill="none">
      <path d={MARK.ember} fill={EMBER} />
      <path d={MARK.ink} fill={invert ? '#fff' : '#0B0B0D'} />
    </svg>
  );
}

/** Vollständiger Schriftzug – das M ist das Zeichen, der Ember-Strich kehrt im X wieder. */
export function MonvexLogo({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`}
      className={cn('h-6 w-auto', className)}
      role="img"
      aria-label="MONVEX"
      fill="none"
    >
      <path d={WORDMARK.ember} fill={EMBER} />
      <path d={WORDMARK.ink} fill={invert ? '#fff' : '#0B0B0D'} />
    </svg>
  );
}
