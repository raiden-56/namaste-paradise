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

/** A package as a boarding ticket: image stub, details, route and fare column. */
export function PackageTicket({ pkg, headingLevel = 'h3', className }: { pkg: TourPackage; headingLevel?: 'h2' | 'h3'; className?: string }) {
  const H = headingLevel;
  const href = `/packages/${pkg.slug}`;
  return (
    <article className={cn('overflow-hidden rounded-panel border border-ink/[0.08] bg-card', className)}>
      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Link href={href} className="group relative block aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[360px]" tabIndex={-1} aria-hidden>
          <div className="absolute inset-0 transition-transform duration-400 ease-out group-hover:scale-[1.03]">
            <Media image={pkg.image} sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </Link>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[13px] text-ember-ink">{pkg.tag}</span>
            {pkg.isPlaceholder && <Placeholder label="Details to confirm" />}
          </div>
          <H className="mt-3 text-subtitle">
            <Link href={href} className="group inline-flex items-start gap-2 text-ink">
              {pkg.name}
              <ArrowUpRight className="mt-1.5 h-[18px] w-[18px] text-mute transition-colors duration-160 group-hover:text-ink" strokeWidth={1.5} />
            </Link>
          </H>
          <p className="mt-3 max-w-[34rem] text-[15px] leading-[1.6] text-soft">{pkg.shortDescription}</p>

          <RouteStops stops={pkg.route} className="mt-7" />

          <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-dashed border-ink/15 pt-5">
            {[
              ['Duration', formatDuration(pkg)],
              ['Group', formatGroup(pkg)],
              ['Fare', formatPrice(pkg)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[13px] text-mute">{k}</dt>
                <dd className="mt-1 text-[14px] leading-5 text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex items-center gap-3 pt-7">
            <BookButton packageId={pkg.id} variant="primary" className="flex-1 sm:flex-none">
              {pkg.ctaLabel}
            </BookButton>
            <a
              href={buildWhatsAppUrl(buildPackageEnquiry(pkg.name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Quick WhatsApp question about ${pkg.name}`}
              className="grid h-11 w-11 place-items-center rounded-control border border-ink/10 bg-raised text-soft transition-colors duration-160 hover:text-ink"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
