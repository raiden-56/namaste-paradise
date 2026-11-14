import type { Config } from 'tailwindcss';

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

/**
 * Lagoon — light sea-glass surfaces with a deep-teal glow; dark photo scenes use fixed "aqua".
 * One teal "glow" accent and a warm "sun" for prices.
 */
const config: Config = {
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
        glow: token('glow'), // the accent — deep teal
        'glow-ink': token('glow-ink'), // accent used as text on page
        'on-glow': token('on-glow'), // text on accent fills
        sun: token('sun'), // warm secondary — fares, sunsets
        violet: token('violet'), // only inside gradients
        night: '#03070c', // fixed — scene overlays
        cream: '#eaf6f8',
        aqua: '#34f0d6', // fixed bright accent for dark photo scenes
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.3rem, 6.2vw, 5.75rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        title: ['clamp(1.75rem, 3.6vw, 3.1rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        subtitle: ['clamp(1.25rem, 2vw, 1.65rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      maxWidth: { site: '84rem' },
      borderRadius: { card: '20px', panel: '28px', control: '999px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      transitionDuration: { 160: '160ms', 400: '400ms', 700: '700ms' },
      boxShadow: {
        float: '0 30px 60px -30px rgb(0 0 0 / 0.7)',
        glow: '0 0 0 1px rgb(var(--glow) / 0.35), 0 10px 40px -8px rgb(var(--glow) / 0.45)',
        soft: '0 1px 2px rgb(0 0 0 / 0.05), 0 8px 24px rgb(0 0 0 / 0.06)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'marquee-rev': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
        ping: { '0%': { transform: 'scale(0.4)', opacity: '0.9' }, '100%': { transform: 'scale(2.6)', opacity: '0' } },
        sweep: { to: { transform: 'rotate(360deg)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.25' } },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'marquee-rev': 'marquee-rev var(--marquee-duration, 40s) linear infinite',
        ping: 'ping 3s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        sweep: 'sweep 6s linear infinite',
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
