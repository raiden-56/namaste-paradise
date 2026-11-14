import { site } from '@/config/brand';
import { cn } from '@/utils/cn';

/**
 * Quiet marker for sample / unverified content. Toggle globally with
 * site.showPlaceholderMarkers in src/config/brand.ts before launch.
 */
export function Placeholder({ label = 'Sample', className, onScene = false }: { label?: string; className?: string; onScene?: boolean }) {
  if (!site.showPlaceholderMarkers) return null;
  return (
    <span
      title="Placeholder — replace with verified business information before launch"
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full border border-dashed px-2.5 font-mono text-[11px] uppercase leading-none tracking-[0.08em]',
        onScene ? 'border-cream/30 text-cream/75' : 'border-ink/20 text-mute',
        className,
      )}
    >
      {label}
    </span>
  );
}
