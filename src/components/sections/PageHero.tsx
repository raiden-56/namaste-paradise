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

/** Inner-page banner: full-bleed scene with layered parallax, headline on its calm upper half. */
export function PageHero({ kicker, title, description, image, crumbs, children }: PageHeroProps) {
  return (
    <section data-parallax-root="" data-out="" className="relative isolate flex min-h-[60svh] items-end overflow-hidden bg-night pb-16 pt-32 text-cream sm:min-h-[64svh] sm:pb-20">
      <div className="scene-in absolute inset-0 -z-10">
        <div className="absolute inset-0" data-parallax="0.15">
          <Media image={image} priority />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/85 via-night/40 to-night/50" />

      <div className="wrap" data-parallax="-0.2">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="rise mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[12px] text-cream/65">
              {crumbs.map((c, i) => (
                <li key={c.label} className="inline-flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors duration-160 hover:text-cream">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-cream">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5 opacity-60" strokeWidth={1.5} />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="rise rise-1 font-mono text-[13px] text-[#e88d58]">{kicker}</p>
        <h1 className="rise rise-2 mt-4 max-w-[46rem] text-hero text-cream">{title}</h1>
        {description && <div className="rise rise-3 mt-6 max-w-[36rem] text-[18px] leading-[1.6] text-cream/80">{description}</div>}
        {children}
      </div>
    </section>
  );
}
