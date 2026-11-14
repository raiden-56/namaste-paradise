import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'glow' | 'secondary' | 'scene' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-160 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  // Off-white on abyss, ink on lagoon
  primary: 'bg-ink text-page hover:bg-ink/90 hover:shadow-[0_10px_30px_-10px_rgb(var(--ink)/0.5)]',
  // The accent — the one action that matters on a screen
  glow: 'bg-glow text-on-glow shadow-[0_0_0_1px_rgb(var(--glow)/0.4),0_8px_30px_-6px_rgb(var(--glow)/0.55)] hover:shadow-[0_0_0_1px_rgb(var(--glow)/0.6),0_12px_44px_-4px_rgb(var(--glow)/0.75)]',
  secondary: 'glass text-ink hover:border-glow/40 hover:text-ink',
  // Secondary action placed over a dark scene, regardless of theme
  scene: 'glass-scene text-cream hover:border-cream/35 hover:bg-night/60',
  ghost: 'text-ink hover:bg-ink/5',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-[52px] px-7 text-[15px]',
};

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
