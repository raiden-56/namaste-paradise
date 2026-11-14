import Link from 'next/link';
import { brand } from '@/config/brand';
import { cn } from '@/utils/cn';

/** Mark: a glowing sun sinking into a ring of sea — like a sonar ping on the horizon. */
export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeOpacity="0.25" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeOpacity="0.15" />
      <path d="M10 16.5a6 6 0 0 1 12 0Z" fill="rgb(var(--glow))" />
      <path d="M7 19.5h18M10.5 23h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ onScene = false, className }: { onScene?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${brand.name}, home`} className={cn('group inline-flex items-center gap-2.5', onScene ? 'text-cream' : 'text-ink', className)}>
      <LogoMark className="h-8 w-8 transition-transform duration-700 ease-out group-hover:rotate-[360deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[14px] font-semibold uppercase tracking-[0.02em]">Namaste</span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] opacity-70">Paradise Cruise</span>
      </span>
    </Link>
  );
}
