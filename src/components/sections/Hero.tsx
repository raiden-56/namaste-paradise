import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BookButton } from '@/components/booking/BookButton';
import { RouteStops } from '@/components/media/RouteStops';
import { buttonClass } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { boarding } from '@/config/brand';
import { photoLibrary } from '@/config/photos';
import { signatureRoute } from '@/config/site';

const hero = photoLibrary['kudle-sunset-rocks'];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-parallax-root=""
      data-out=""
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-cream"
    >
      <div className="scene-in absolute inset-0 -z-10">
        <div className="absolute -inset-y-[6%] inset-x-0" data-parallax="0.12">
          <Image src="/images/kudle-sunset-rocks.webp" alt={hero.alt} fill priority sizes="100vw" className="object-cover object-[48%_center] md:object-[65%_center]" />
        </div>
      </div>
      {/* tone for legibility: darker on the calm left side and under the nav; the sun stays bright */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/75 via-night/30 to-night/0 max-md:from-night/60 max-md:via-night/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/50 via-night/0 via-35% to-night/70" />

      <div className="wrap flex flex-1 flex-col justify-center pb-12 pt-28 sm:pt-32">
        <div className="max-w-[38rem]" data-parallax="-0.25">
          <p className="rise flex items-center gap-2 font-mono text-[13px] text-cream/75">
            <MapPin className="h-4 w-4" strokeWidth={1.5} /> Tadadi, Gokarna, Karnataka
          </p>
          <h1 id="hero-title" className="rise rise-1 mt-6 text-hero text-cream">
            Discover Gokarna beyond the shore
          </h1>
          <p className="rise rise-2 mt-6 max-w-[32rem] text-[18px] leading-[1.6] text-cream/85">
            Mini cruises, beach hopping, kayaking, snorkeling and dolphin watching along the Gokarna coast. Trips from ₹799 per person.
          </p>
          <div className="rise rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/#tours" className={buttonClass('ember', 'lg')}>
              Explore our cruises <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <BookButton variant="scene" size="lg" icon={<WhatsAppIcon />}>
              Book via WhatsApp
            </BookButton>
          </div>
        </div>
      </div>

      <a href="#experiences" className="rise rise-5 absolute bottom-[200px] right-5 hidden flex-col items-center gap-3 font-mono text-[12px] text-cream/60 sm:right-8 md:flex lg:right-12" aria-label="Scroll to experiences">
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-cream/20">
          <span className="scroll-cue absolute inset-0 bg-cream/80" />
        </span>
      </a>

      {/* Route panel rising from the bottom edge */}
      <div className="wrap rise rise-4">
        <div className="rounded-t-panel border border-b-0 border-cream/10 bg-[#1c1a18]/95 px-5 pb-6 pt-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-serif text-[20px] leading-none text-cream">Premium beach-hopping route</p>
            <p className="font-mono text-[12px] text-cream/60">
              From {boarding.name} · 3 hours · ₹999 per person
            </p>
          </div>
          <RouteStops stops={signatureRoute} onScene animate="load" className="mt-6" />
        </div>
      </div>
    </section>
  );
}
