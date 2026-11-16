import { cn } from '@/lib/cn';

export function Marquee({ items, className, dot = true, dotClassName = 'bg-ember rounded-full' }: { items: string[]; className?: string; dot?: boolean; dotClassName?: string }) {
  const row = (aria: boolean) => (
    <ul aria-hidden={aria || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center">
          <span className={cn('px-6 sm:px-10', className)}>{t}</span>
          {dot && <span className={cn('h-1.5 w-1.5', dotClassName)} />}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex shrink-0 animate-ticker group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
