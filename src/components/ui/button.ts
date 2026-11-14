import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'ember' | 'secondary' | 'scene' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium transition-[background-color,color,border-color,transform] duration-160 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  // Off-white on dusk, ink on daybreak
  primary: 'bg-ink text-page hover:bg-ink/85',
  // The accent — used for the one action that matters on a screen
  ember: 'bg-ember text-on-ember hover:bg-ember/90',
  secondary: 'border border-ink/10 bg-raised text-ink hover:border-ink/20 hover:bg-raised/70',
  // Secondary action placed over a dark scene, regardless of theme
  scene: 'border border-cream/15 bg-night/50 text-cream hover:border-cream/30 hover:bg-night/70',
  ghost: 'text-ink hover:bg-ink/5',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[14px]',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[15px]',
};

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
