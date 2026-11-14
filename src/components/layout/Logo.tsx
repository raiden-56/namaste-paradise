import Link from 'next/link';
import { brand } from '@/config/brand';
import { cn } from '@/utils/cn';

/** Flat mark: a sun setting into two lines of sea, plus the wordmark. */
export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <path d="M7 15a7 7 0 0 1 14 0Z" fill="rgb(var(--ember))" />
      <path d="M3 18.5h22M7 22.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ onScene = false, className }: { onScene?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${brand.name}, home`} className={cn('inline-flex items-center gap-2.5', onScene ? 'text-cream' : 'text-ink', className)}>
      <LogoMark />
      <span className="text-[17px] font-medium leading-none">{brand.name}</span>
    </Link>
  );
}
