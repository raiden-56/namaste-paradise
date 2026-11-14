import { Media } from '@/components/media/Media';
import { Coastline } from '@/components/sections/Coastline';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { PageHero } from '@/components/sections/PageHero';
import { WhyUs } from '@/components/sections/WhyUs';
import { brand } from '@/config/brand';
import { photo } from '@/config/photos';
import { pageMetadata } from '@/utils/seo';

export const metadata = pageMetadata({
  title: 'About Namaste Paradise Cruise, Tadadi, Gokarna',
  description: `Meet ${brand.name}: boat tours and mini cruises along the Gokarna coast in Karnataka, with simple, personal WhatsApp booking.`,
  path: '/about',
});

const promises = [
  { title: 'The sea sets the schedule', text: 'We sail when it is right to sail. Weather and sea conditions always come before timetables.' },
  { title: 'Clear from the first message', text: 'Fares, timing and boarding details on WhatsApp before you confirm. No surprises.' },
  { title: 'Respect for the coast', text: 'We keep our distance from wildlife and leave beaches as we found them.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="Water sports and mini cruises from Tadadi"
        description="We share the joy of the sea along the coastline of Gokarna and Paradise Beach."
        image={photo('main-beach-aerial')}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About us' }]}
      />

      <section className="py-20 sm:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-parallax-root="" className="relative aspect-[4/5] overflow-hidden rounded-panel bg-card lg:col-span-5" data-reveal>
            <div className="absolute -inset-y-[10%] inset-x-0" data-parallax="0.08">
              <Media image={photo('npc-cruise-boat')} sizes="(min-width: 1024px) 40vw, 100vw" className="object-[38%_center]" />
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <p className="kicker mb-4">Our story</p>
            <h2 className="text-title">The thrill of the sea, the calm of the coast</h2>
            <div className="mt-6 space-y-5 text-[17px] leading-[1.7] text-soft">
              <p>
                {brand.legalName} runs mini cruises and water sports from Tadadi, where the Aghanashini river meets the Arabian Sea. Our
                trips combine the excitement of the water with the quiet beauty of Gokarna’s coves — Paradise, Half Moon and Om Beach.
              </p>
              <p>
                On board, our crew explain each point along the way, and our instructors run kayaking, snorkeling and water sports with safety
                gear for every guest. The cruise boat has its own restroom, and our base has changing rooms.
              </p>
              <p>
                Booking stays simple and personal. Message us on WhatsApp or call — our office is open 24×7 — and we will welcome you at our
                counter near Union Bank, Tadadi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="promises-title" className="border-t border-ink/[0.08] bg-deep py-20 sm:py-28">
        <div className="wrap">
          <h2 id="promises-title" className="text-title" data-reveal>
            Three things we hold to
          </h2>
          <ol className="mt-12 grid gap-x-10 md:grid-cols-3">
            {promises.map((p, i) => (
              <li key={p.title} className="border-t border-ink/[0.08] py-6" data-reveal>
                <p className="font-mono text-[13px] text-ember-ink">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-[24px] leading-[1.2]">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-soft">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WhyUs />
      <Coastline limit={3} />
      <FinalCTA />
    </>
  );
}
