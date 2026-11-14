import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { buttonClass } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { activePackages } from '@/config/packages';
import { PackageTicket } from './PackageTicket';

/** Packages as boarding tickets that stack as you scroll (sticky on desktop). */
export function Tours() {
  return (
    <section id="tours" aria-labelledby="tours-title" className="border-t border-ink/[0.08] bg-deep py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="tours-title" kicker="Boat tours" title="Curated boat tours and mini cruises">
            Pick a trip and send your date on WhatsApp. We reply with availability, timing, fare and boarding details.
          </SectionHeader>
          <Link href="/packages" className={buttonClass('secondary', 'md', 'shrink-0 self-start md:self-auto')}>
            Compare all packages <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-14 space-y-6 md:space-y-10">
          {activePackages.map((pkg, i) => (
            <div key={pkg.id} data-stack-card="" className="md:sticky" style={{ top: `${96 + i * 16}px` }}>
              <div data-stack-inner="" className="origin-top">
                <PackageTicket pkg={pkg} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
