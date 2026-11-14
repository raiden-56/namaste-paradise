import { Check, Clock, IndianRupee, MapPin, Users } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookButton } from '@/components/booking/BookButton';
import { RouteStops } from '@/components/media/RouteStops';
import { JsonLd } from '@/components/seo/JsonLd';
import { Boarding } from '@/components/sections/Boarding';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { PackageTicket } from '@/components/sections/PackageTicket';
import { PageHero } from '@/components/sections/PageHero';
import { buttonClass } from '@/components/ui/button';
import { Placeholder } from '@/components/ui/Placeholder';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { boarding } from '@/config/brand';
import { activePackages, formatDuration, formatGroup, formatPrice, getPackageBySlug } from '@/config/packages';
import { breadcrumbSchema, tourSchema } from '@/utils/structuredData';
import { pageMetadata } from '@/utils/seo';
import { buildPackageEnquiry, buildWhatsAppUrl } from '@/utils/whatsapp';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return activePackages.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = getPackageBySlug((await params).slug);
  if (!pkg) return {};
  return pageMetadata({
    title: `${pkg.name}, Gokarna Boat Tour`,
    description: `${pkg.shortDescription} Departs ${boarding.name}. Enquire and book on WhatsApp.`,
    path: `/packages/${pkg.slug}`,
  });
}

export default async function PackagePage({ params }: Props) {
  const pkg = getPackageBySlug((await params).slug);
  if (!pkg) notFound();
  const related = activePackages.filter((p) => p.id !== pkg.id).slice(0, 2);
  const facts = [
    { icon: Clock, label: 'Duration', value: formatDuration(pkg) },
    { icon: IndianRupee, label: 'Fare', value: formatPrice(pkg) },
    { icon: Users, label: 'Group', value: formatGroup(pkg) },
    { icon: MapPin, label: 'Departs', value: boarding.name },
  ];

  return (
    <>
      <PageHero
        kicker={pkg.tag}
        title={pkg.name}
        description={pkg.shortDescription}
        image={pkg.image}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Packages', href: '/packages' }, { label: pkg.name }]}
      >
        {pkg.isPlaceholder && <Placeholder label="Timing and price confirmed on WhatsApp" className="mt-5" />}
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="kicker mb-4">Overview</p>
            <h2 className="text-title">About this trip</h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-soft">{pkg.description}</p>

            <h3 className="mt-14 font-display text-[19px] font-medium tracking-[-0.02em]">Route</h3>
            <RouteStops stops={pkg.route} animate="scroll" className="mt-6" />

            <h3 className="mt-14 font-display text-[19px] font-medium tracking-[-0.02em]">Highlights</h3>
            <ul className="mt-5">
              {pkg.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 border-t border-ink/[0.08] py-3.5 text-[15px] text-ink">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-glow" strokeWidth={2} /> {h}
                </li>
              ))}
            </ul>

            <h3 className="mt-14 font-display text-[19px] font-medium tracking-[-0.02em]">Best for</h3>
            <ul className="mt-4 flex flex-wrap gap-2">{pkg.bestFor.map((b) => (<li key={b} className="glass rounded-full px-4 py-1.5 text-[13px] text-ink">{b}</li>))}</ul>

            <div className="mt-14 rounded-card border border-glow/30 bg-glow/[0.06] p-5">
              <h3 className="font-sans text-[15px] font-medium">Good to know</h3>
              <ul className="mt-3 space-y-2 text-[15px] leading-[1.6] text-soft">
                {pkg.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
                <li>Trips operate only in safe sea and weather conditions. Routes and timings are confirmed on WhatsApp.</li>
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="glass relative overflow-hidden rounded-panel p-6 shadow-float sm:p-8 lg:sticky lg:top-28"><div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-glow/20 blur-3xl" />
              <p className="font-display text-[20px] font-medium tracking-[-0.02em]">At a glance</p>
              <dl className="mt-4">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-t border-ink/[0.08] py-3.5 text-[15px]">
                    <dt className="flex items-center gap-2.5 text-soft">
                      <Icon className="h-[18px] w-[18px] text-glow" strokeWidth={1.5} /> {label}
                    </dt>
                    <dd className="text-right text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 space-y-3">
                <BookButton packageId={pkg.id} variant="glow" size="lg" className="w-full" icon={<WhatsAppIcon />}>
                  {pkg.ctaLabel}
                </BookButton>
                <a href={buildWhatsAppUrl(buildPackageEnquiry(pkg.name))} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'lg', 'w-full')}>
                  Quick question on WhatsApp
                </a>
              </div>
              <p className="mt-4 text-center text-[13px] text-mute">No online payment. Confirmed only after our team replies</p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-ink/[0.08] bg-deep py-20 sm:py-28">
          <div className="wrap">
            <p className="kicker mb-4">More trips</p>
            <h2 id="related-title" className="text-title">
              Other ways to see the coast
            </h2>
            <div className="mt-12 space-y-6">
              {related.map((p) => (
                <PackageTicket key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Boarding />
      <FinalCTA />
      <JsonLd
        data={[
          tourSchema(pkg),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Tour packages', path: '/packages' },
            { name: pkg.name, path: `/packages/${pkg.slug}` },
          ]),
        ]}
      />
    </>
  );
}
