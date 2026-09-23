import type { ReactNode } from 'react';
import { SplitText } from './SplitText';
import { Reveal } from './Reveal';
import { cn } from '@/lib/cn';

type Props = {
  index: string;
  label: string;
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
};

/** Einheitlicher Sektionskopf: Nummer + Label, grosse Headline, Text und optionale Aktion. */
export function SectionHead({ index, label, title, children, aside, dark, className }: Props) {
  return (
    <div className={cn('grid gap-8 lg:grid-cols-12 lg:items-end', className)}>
      <div className="lg:col-span-8">
        <Reveal>
          <p className={cn('eyebrow flex items-center gap-3', dark && '!text-white/55')}>
            <span className="text-ember">{index}</span>
            <span className={cn('h-px w-10', dark ? 'bg-white/25' : 'bg-ink/25')} />
            {label}
          </p>
        </Reveal>
        <SplitText text={title} className={cn('mt-6 text-h2 font-semibold', dark && 'text-white')} accentClassName={cn('serif-i', dark ? 'text-ember' : 'text-ember')} />
      </div>
      {(children || aside) && (
        <div className="lg:col-span-4">
          {children && (
            <Reveal delay={0.15}>
              <p className={cn('text-lead', dark ? 'text-white/65' : 'text-graphite')}>{children}</p>
            </Reveal>
          )}
          {aside && <Reveal delay={0.25} className="mt-6">{aside}</Reveal>}
        </div>
      )}
    </div>
  );
}
