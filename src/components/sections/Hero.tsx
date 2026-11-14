import { ArrowRight, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BookButton } from '@/components/booking/BookButton';
import { buttonClass } from '@/components/ui/button';
import { DepartureClock } from '@/components/ui/DepartureClock';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { boarding, social } from '@/config/brand';
import { photoLibrary } from '@/config/photos';
import { signatureRoute } from '@/config/site';

const hero = photoLibrary['kudle-sunset-rocks'];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-parallax-root=""
      data-out=""
      data-spot=""
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-cream"
    >
      {/* Scene */}
      <div className="scene-in absolute inset-0 -z-20">
        <div className="absolute -inset-y-[6%] inset-x-0" data-parallax="0.14">
          <Image src="/images/kudle-sunset-rocks.webp" alt={hero.alt} fill priority sizes="100vw" className="object-cover object-[48%_center] md:object-[65%_center]" />
        </div>
      </div>
      {/* Tone: dark on the left for the headline, a cursor "torch" that lifts the shade where you point */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/90 via-night/45 to-night/10 max-md:from-night/75 max-md:via-night/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/60 via-transparent via-40% to-night" />
      <div
        aria-hidden
        className="grid-bg-scene absolute inset-0 -z-10 opacity-70"
        style={{
          WebkitMaskImage: 'radial-gradient(420px circle at var(--mx, 70%) var(--my, 45%), #000 0%, transparent 70%)',
          maskImage: 'radial-gradient(420px circle at var(--mx, 70%) var(--my, 45%), #000 0%, transparent 70%)',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-aqua/50 to-transparent scan-line" />

      <div className="wrap grid flex-1 items-center gap-10 pb-10 pt-32 sm:pt-36 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7" data-parallax="-0.2">
          <p className="rise inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-night/40 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/80 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
            </span>
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> Tadadi, Gokarna, Karnataka
          </p>
          <h1 id="hero-title" className="rise rise-1 mt-7 text-hero font-semibold uppercase text-cream">
            Discover Gokarna <span className="text-glow-gradient block">beyond the shore</span>
          </h1>
          <p className="rise rise-2 mt-7 max-w-[34rem] text-[17px] leading-[1.7] text-cream/80 sm:text-[18px]">
            Mini cruises, beach hopping, kayaking, snorkeling and dolphin watching along the Gokarna coast. Trips from{' '}
            <span className="text-cream">₹799 per person</span>.
          </p>
          <div className="rise rise-3 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/#tours" data-magnetic className={buttonClass('glow', 'lg')}>
              Explore our cruises <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <BookButton variant="scene" size="lg" icon={<WhatsAppIcon />}>
              Book via WhatsApp
            </BookButton>
          </div>
        </div>

        {/* Mission card */}
        <div className="rise rise-4 lg:col-span-5 lg:justify-self-end">
          <div className="glass-scene relative w-full max-w-[420px] overflow-hidden rounded-panel p-6 shadow-float sm:p-7 lg:animate-float">
            <div aria-hidden className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-aqua/20 blur-3xl" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">Signature route</p>
                <p className="mt-2 font-display text-[19px] font-medium leading-tight tracking-[-0.02em] text-cream">Premium beach hopping</p>
              </div>
              <p className="rounded-full border border-sun/40 bg-sun/10 px-3 py-1 font-mono text-[12px] text-sun">₹999</p>
            </div>

            <ol className="relative mt-6 space-y-4 pl-6" aria-label={`Route: ${signatureRoute.join(' to ')}`}>
              <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-aqua via-aqua/60 to-aqua/10" />
              {signatureRoute.map((stop, i) => (
                <li key={stop} className="relative flex items-center justify-between text-[14px]">
                  <span
                    className={`absolute -left-6 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full border-2 border-aqua ${i === 0 ? 'bg-aqua shadow-[0_0_12px_#34f0d6]' : 'bg-night'}`}
                  />
                  <span className="text-cream/90">{stop}</span>
                  <span className="font-mono text-[11px] text-cream/45">{String(i + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 border-t border-cream/10 pt-5">
              <DepartureClock />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/45">From {boarding.name} · 3 hours · shared boat</p>
          </div>
        </div>
      </div>

      {/* HUD footer */}
      <div className="wrap rise rise-5 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-cream/10 pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/55">
          <span>14.5° N · 74.3° E · Arabian Sea</span>
          <a href={social.googleReviews} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors duration-160 hover:text-cream">
            <Star className="h-3.5 w-3.5 fill-sun text-sun" strokeWidth={1.5} /> {social.googleRating.score} · {social.googleRating.count} Google reviews
          </a>
          <span className="hidden sm:inline">Departures 08:30 · 14:30</span>
          <a href="#experiences" className="hidden items-center gap-3 transition-colors duration-160 hover:text-cream md:inline-flex" aria-label="Scroll to experiences">
            Scroll
            <span className="relative block h-8 w-px overflow-hidden bg-cream/20">
              <span className="scroll-cue absolute inset-0 bg-aqua" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
