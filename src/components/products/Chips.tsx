import { cn } from '@/lib/cn';
import type { Product } from '@/data/products';

export function StatusChip({ product, className }: { product: Product; className?: string }) {
  const live = product.status.tone === 'live';
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full border bg-white/80 py-1.5 pl-2.5 pr-3.5 font-mono text-[.64rem] uppercase tracking-[.16em] backdrop-blur', className)} style={{ borderColor: product.theme.line, color: product.theme.ink }}>
      <span className="relative flex h-2 w-2">
        {live && <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: product.theme.accent }} />}
        <span className="relative h-2 w-2 rounded-full" style={{ background: live ? product.theme.accent : '#E0A100' }} />
      </span>
      {product.status.label} · {product.status.detail}
    </span>
  );
}
