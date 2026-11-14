import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Media } from '@/components/media/Media';
import type { ImageAsset } from '@/types';

interface PageHeroProps {
  kicker: string;
  title: string;
  description?: ReactNode;
  image: ImageAsset;
  crumbs?: Array<{ label: string; href?: string }>;
  children?: ReactNode;
}

/** Inner-page banner: full-bleed scene, cursor-lit grid, HUD breadcrumb and display headline. */
export function PageHero({ kicker, title, description, image, crumbs, children }: PageHeroProps) {
  return (
    <section data-parallax-root="" data-out="" data-spot="" className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-night pb-16 pt-36 text-cream sm:min-h-[72svh] sm:pb-20">
      <div className="scene-in absolute inset-0 -z-20">
        <div className="absolute inset-0" data-parallax="0.15">
          <Media image={image} priority />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/45 to-night/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/70 to-transparent" />
      <div
        aria-hidden
        className="grid-bg-scene absolute inset-0 -z-10"
        style={{
          WebkitMaskImage: 'radial-gradient(380px circle at var(--mx, 75%) var(--my, 40%), #000, transparent 70%)',
          maskImage: 'radial-gradient(380px circle at var(--mx, 75%) var(--my, 40%), #000, transparent 70%)',
        }}
      />

      <div className="wrap" data-parallax="-0.2">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="rise mb-8">
            <ol className="glass-scene inline-flex flex-wrap items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-cream/65">
              {crumbs.map((c, i) => (
                <li key={c.label} className="inline-flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors duration-160 hover:text-aqua">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-cream">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" strokeWidth={1.5} />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="rise rise-1 inline-flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-aqua">
          <span className="h-1.5 w-1.5 rounded-[1px] bg-aqua shadow-[0_0_10px_#34f0d6]" />
          {kicker}
        </p>
        <h1 className="rise rise-2 mt-5 max-w-[60rem] text-hero font-semibold uppercase text-cream">{title}</h1>
        {description && <div className="rise rise-3 mt-6 max-w-[38rem] text-[17px] leading-[1.7] text-cream/80">{description}</div>}
        {children}
      </div>
    </section>
  );
}
