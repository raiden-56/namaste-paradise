'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

import { THEME_KEY } from '@/config/theme';

/** Dusk (dark) is the default; daybreak (light) is the opt-in. Persisted in localStorage. */
export function ThemeToggle({ className, onScene = false }: { className?: string; onScene?: boolean }) {
  const [dark, setDark] = useState(true);
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to daybreak (light) theme' : 'Switch to dusk (dark) theme'}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-control transition-colors duration-160',
        onScene ? 'text-cream/80 hover:bg-cream/10 hover:text-cream' : 'text-soft hover:bg-ink/5 hover:text-ink',
        className,
      )}
    >
      {dark ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} />}
    </button>
  );
}
