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

/** Light inner-page banner: breadcrumb + display headline on a cursor-lit grid, then a wide framed scene. */
export function PageHero({ kicker, title, description, image, crumbs, children }: PageHeroProps) {
  return (
    <section data-spot="" className="relative isolate overflow-hidden bg-page pb-6 pt-32 sm:pt-36">
      <div
        aria-hidden
        className="grid-bg absolute inset-0 -z-10"
        style={{
          WebkitMaskImage: 'radial-gradient(480px circle at var(--mx, 70%) var(--my, 30%), #000, transparent 75%)',
          maskImage: 'radial-gradient(480px circle at var(--mx, 70%) var(--my, 30%), #000, transparent 75%)',
        }}
      />
      <div aria-hidden className="absolute -right-32 -top-10 -z-10 h-[380px] w-[380px] rounded-full bg-glow/[0.12] blur-[110px]" />

      <div className="wrap">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="rise mb-8">
            <ol className="glass inline-flex flex-wrap items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
              {crumbs.map((c, i) => (
                <li key={c.label} className="inline-flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors duration-160 hover:text-glow-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" strokeWidth={1.5} />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="rise rise-1 kicker">{kicker}</p>
            <h1 className="rise rise-2 mt-5 text-hero font-semibold uppercase text-ink">{title}</h1>
          </div>
          {(description || children) && (
            <div className="rise rise-3 lg:col-span-4 lg:pb-3">
              {description && <div className="text-[17px] leading-[1.7] text-soft">{description}</div>}
              {children}
            </div>
          )}
        </div>

        <div data-parallax-root="" className="scene-in relative mt-12 h-[38svh] min-h-[260px] overflow-hidden rounded-[32px] border border-ink/[0.08] bg-card shadow-[0_40px_80px_-40px_rgb(7_24_36/0.4)] sm:h-[46svh]">
          <div className="absolute -inset-y-[12%] inset-x-0" data-parallax="0.12">
            <Media image={image} priority sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-night/30 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
