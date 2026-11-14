import type { Config } from 'tailwindcss';

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

/**
 * Monsoon dusk — evening on the Arabian Sea.
 * One warm neutral ramp (dark first, "daybreak" light variant) + one ember accent.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: token('deep'), // deepest surface (footer, nav sheet)
        page: token('page'), // page background
        card: token('card'), // raised card
        raised: token('raised'), // inputs, active rows
        ink: token('ink'), // primary text
        soft: token('soft'), // secondary text
        mute: token('mute'), // meta, captions, icons
        line: token('ink'), // hairlines — always used at 8–12% alpha
        ember: token('ember'), // the one accent
        'ember-ink': token('ember-ink'), // accent used as text on page
        'on-ember': token('on-ember'), // text on accent fills
        night: '#0d0c0b', // fixed — scene overlays
        cream: '#efe9de',
        whatsapp: '#25D366',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6.4vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        title: ['clamp(2rem, 4.2vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        subtitle: ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: { site: '80rem' },
      borderRadius: { card: '16px', panel: '20px', control: '10px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      transitionDuration: { 160: '160ms', 400: '400ms' },
      boxShadow: {
        float: '0 24px 48px -24px rgb(0 0 0 / 0.55)',
        soft: '0 1px 2px rgb(0 0 0 / 0.05), 0 8px 24px rgb(0 0 0 / 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
