import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { BookButton } from '@/components/booking/BookButton';
import { Media } from '@/components/media/Media';
import { RouteStops } from '@/components/media/RouteStops';
import { Placeholder } from '@/components/ui/Placeholder';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { formatDuration, formatGroup, formatPrice } from '@/config/packages';
import type { TourPackage } from '@/types';
import { cn } from '@/utils/cn';
import { buildPackageEnquiry, buildWhatsAppUrl } from '@/utils/whatsapp';

/** A package as a boarding pass: image, briefing, route and fare readouts. */
export function PackageTicket({ pkg, headingLevel = 'h3', className, index }: { pkg: TourPackage; headingLevel?: 'h2' | 'h3'; className?: string; index?: number }) {
  const H = headingLevel;
  const href = `/packages/${pkg.slug}`;
  return (
    <article data-spot="" className={cn('spot spot-border group relative overflow-hidden rounded-panel border border-ink/[0.08] bg-card', className)}>
      <div className="relative z-[3] grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[380px]" tabIndex={-1} aria-hidden>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
            <Media image={pkg.image} sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
          {typeof index === 'number' && (
            <span className="absolute left-5 top-4 font-display text-[56px] font-semibold leading-none tracking-[-0.05em] text-cream/90 [text-shadow:0_4px_30px_rgb(0_0_0/0.4)]">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          {pkg.price && <span className="glass-scene absolute bottom-4 left-4 rounded-full px-3 py-1 font-mono text-[12px] text-sun">{pkg.price}</span>}
        </Link>

        <div className="relative flex flex-col p-6 sm:p-8">
          {/* boarding-pass perforation */}
          <span aria-hidden className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full border border-ink/[0.08] bg-page md:block" />
          <div className="flex flex-wrap items-center gap-3">
            <span className="kicker">{pkg.tag}</span>
            {pkg.isPlaceholder && <Placeholder label="Details to confirm" />}
          </div>
          <H className="mt-4 text-subtitle">
            <Link href={href} className="inline-flex items-start gap-2 text-ink hover:text-glow-ink">
              {pkg.name}
              <ArrowUpRight className="mt-1 h-5 w-5 text-mute transition-transform duration-160 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow-ink" strokeWidth={1.5} />
            </Link>
          </H>
          <p className="mt-3 max-w-[34rem] text-[15px] leading-[1.65] text-soft">{pkg.shortDescription}</p>

          <RouteStops stops={pkg.route} className="mt-7" />

          <dl className="mt-7 grid grid-cols-3 overflow-hidden rounded-card border border-ink/[0.08]">
            {[
              ['Duration', formatDuration(pkg)],
              ['Group', formatGroup(pkg)],
              ['Fare', formatPrice(pkg)],
            ].map(([k, v], i) => (
              <div key={k} className={cn('bg-raised/40 px-3 py-3', i > 0 && 'border-l border-ink/[0.08]')}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">{k}</dt>
                <dd className={cn('mt-1 text-[13px] leading-5', k === 'Fare' && pkg.price ? 'text-sun' : 'text-ink')}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex items-center gap-3 pt-7">
            <BookButton packageId={pkg.id} variant="glow" className="flex-1 sm:flex-none">
              {pkg.ctaLabel}
            </BookButton>
            <a
              href={buildWhatsAppUrl(buildPackageEnquiry(pkg.name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Quick WhatsApp question about ${pkg.name}`}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-raised text-soft transition-colors duration-160 hover:border-glow/40 hover:text-ink"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
