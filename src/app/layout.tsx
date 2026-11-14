import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Providers } from '@/components/layout/Providers';
import { PointerFX } from '@/components/motion/PointerFX';
import { ScrollEffects } from '@/components/motion/ScrollEffects';
import { JsonLd } from '@/components/seo/JsonLd';
import { brand, site } from '@/config/brand';
import { localBusinessSchema, websiteSchema } from '@/utils/structuredData';
import './globals.css';

// Self-hosted from @fontsource (no build-time call to Google; served from our own domain).
// Unbounded — wide, rounded display face for headlines; Sora — geometric, very readable body text.
const display = localFont({
  src: '../../node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2',
  weight: '200 900',
  variable: '--font-display',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
const sans = localFont({
  src: '../../node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2',
  weight: '100 800',
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
const mono = localFont({
  src: [
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2', weight: '400' },
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', weight: '500' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Gokarna Boat Tours & Mini Cruises | ${brand.name}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: brand.name,
    locale: site.locale,
    url: '/',
    title: `Gokarna Boat Tours & Mini Cruises | ${brand.name}`,
    description: brand.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f6fafb',
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-page">
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
        <ScrollEffects />
        <PointerFX />
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
