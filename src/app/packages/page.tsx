import { BookButton } from '@/components/booking/BookButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Journey } from '@/components/sections/Journey';
import { PackageTicket } from '@/components/sections/PackageTicket';
import { PageHero } from '@/components/sections/PageHero';
import { activePackages, NOT_SURE_PACKAGE } from '@/config/packages';
import { photo } from '@/config/photos';
import { breadcrumbSchema } from '@/utils/structuredData';
import { pageMetadata } from '@/utils/seo';

export const metadata = pageMetadata({
  title: 'Gokarna Boat Tour Packages and Mini Cruises',
  description:
    'Compare Gokarna boat tour packages: coastal sightseeing, mini cruises, dolphin watching, hidden beach trips and private boat booking. Enquire on WhatsApp.',
  path: '/packages',
});

export default function PackagesPage() {
  return (
    <>
      <PageHero
        kicker="Tour packages"
        title="Choose your day on the water"
        description="From a one-hour sightseeing ride to a three-hour beach-hopping trip with kayaking and snorkeling. All trips start at Tadadi."
        image={photo('npc-cruise-boat')}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Tour packages' }]}
      />
      <section aria-label="All packages" className="py-20 sm:py-28">
        <div className="wrap space-y-6 md:space-y-8">
          {activePackages.map((pkg, i) => (
            <div key={pkg.id} data-reveal>
              <PackageTicket pkg={pkg} headingLevel="h2" index={i} />
            </div>
          ))}
          <div className="flex flex-col items-start justify-between gap-6 glass rounded-panel p-8 sm:p-10 md:flex-row md:items-center" data-reveal>
            <div>
              <h2 className="text-subtitle">Not sure which trip suits you</h2>
              <p className="mt-2 max-w-[34rem] text-[15px] leading-[1.6] text-soft">
                Tell us who is travelling and what you would like to see. We will suggest the best experience for your day.
              </p>
            </div>
            <BookButton packageId={NOT_SURE_PACKAGE} variant="glow" size="lg" className="shrink-0">
              Ask for a suggestion
            </BookButton>
          </div>
        </div>
      </section>
      <Journey />
      <FAQ limit={6} />
      <FinalCTA />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Tour packages', path: '/packages' }])} />
    </>
  );
}
