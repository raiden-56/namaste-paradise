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

const hero = photoLibrary['half-moon-from-sea'];
const boat = photoLibrary['npc-cruise-boat'];

/** Light split hero: headline on a cursor-lit grid, the coast in a tall frame with a floating route card. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" data-spot="" className="relative isolate overflow-hidden bg-page">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="grid-bg absolute inset-0 -z-10"
        style={{
          WebkitMaskImage: 'radial-gradient(520px circle at var(--mx, 30%) var(--my, 40%), #000 0%, transparent 75%)',
          maskImage: 'radial-gradient(520px circle at var(--mx, 30%) var(--my, 40%), #000 0%, transparent 75%)',
        }}
      />
      <div aria-hidden className="absolute -left-32 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-glow/[0.12] blur-[110px]" />
      <div aria-hidden className="absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] rounded-full bg-violet/[0.10] blur-[110px]" />

      <div className="wrap grid min-h-[100svh] items-center gap-12 pb-12 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-16">
        {/* Copy */}
        <div className="lg:col-span-6">
          <p className="rise glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
            </span>
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> Tadadi, Gokarna, Karnataka
          </p>
          <h1 id="hero-title" className="rise rise-1 mt-7 font-display text-[clamp(2.3rem,4.7vw,4.9rem)] font-semibold uppercase leading-[0.98] tracking-[-0.035em] text-ink">
            Discover Gokarna <span className="text-ink-gradient block">beyond the shore</span>
          </h1>
          <p className="rise rise-2 mt-7 max-w-[34rem] text-[17px] leading-[1.7] text-soft sm:text-[18px]">
            Mini cruises, beach hopping, kayaking, snorkeling and dolphin watching along the Gokarna coast. Trips from{' '}
            <span className="font-medium text-ink">₹799 per person</span>.
          </p>
          <div className="rise rise-3 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/#tours" data-magnetic className={buttonClass('glow', 'lg')}>
              Explore our cruises <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <BookButton variant="secondary" size="lg" icon={<WhatsAppIcon className="h-[18px] w-[18px] text-whatsapp" />}>
              Book via WhatsApp
            </BookButton>
          </div>

          {/* HUD readouts */}
          <dl className="rise rise-4 mt-12 grid max-w-[34rem] grid-cols-3 gap-4 border-t border-ink/[0.08] pt-6">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">Google</dt>
              <dd className="mt-1.5">
                <a href={social.googleReviews} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-display text-[20px] font-medium tracking-[-0.03em] text-ink hover:text-glow-ink">
                  {social.googleRating.score} <Star className="h-4 w-4 fill-sun text-sun" strokeWidth={1.5} />
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">Departures</dt>
              <dd className="mt-1.5 font-display text-[20px] font-medium tracking-[-0.03em] text-ink">2 daily</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">Position</dt>
              <dd className="mt-1.5 font-mono text-[14px] leading-[28px] text-ink">14.5°N 74.3°E</dd>
            </div>
          </dl>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div data-parallax-root="" className="scene-in relative aspect-[4/5] overflow-hidden rounded-[32px] border border-ink/[0.08] bg-card shadow-[0_40px_80px_-40px_rgb(7_24_36/0.45)] sm:aspect-[5/4] lg:aspect-auto lg:h-[min(76svh,760px)]">
            <div className="absolute -inset-y-[8%] inset-x-0" data-parallax="0.1">
              <Image src="/images/half-moon-from-sea.webp" alt={hero.alt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover object-[55%_center]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent" />
          </div>

          {/* Our boat thumbnail */}
          <div className="rise rise-5 glass absolute left-4 top-4 hidden items-center gap-3 rounded-full p-1.5 pr-4 sm:flex">
            <span className="relative h-11 w-11 overflow-hidden rounded-full">
              <Image src="/images/npc-cruise-boat.webp" alt={boat.alt} fill sizes="44px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-medium text-ink">Our cruise boat</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-mute">Restroom on board</span>
            </span>
          </div>

          {/* Mission card */}
          <div className="rise rise-4 glass relative z-10 mx-4 -mt-24 overflow-hidden rounded-panel p-6 shadow-float sm:mx-auto sm:max-w-[400px] sm:p-7 lg:absolute lg:inset-x-5 lg:bottom-5 lg:mx-0 lg:mt-0 lg:max-w-none xl:inset-x-auto xl:-left-12 xl:bottom-10 xl:w-[380px] xl:animate-float">
            <div aria-hidden className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-glow/15 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">Signature route</p>
                <p className="mt-2 font-display text-[18px] font-medium leading-tight tracking-[-0.02em] text-ink">Premium beach hopping</p>
              </div>
              <p className="rounded-full border border-sun/30 bg-sun/10 px-3 py-1 font-mono text-[12px] text-sun">₹999</p>
            </div>

            <ol className="relative mt-5 grid grid-cols-4" aria-label={`Route: ${signatureRoute.join(' to ')}`}>
              <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[5px]">
                <span className="route-dots draw-x block" />
              </span>
              {signatureRoute.map((stop, i) => (
                <li key={stop} className="relative flex flex-col items-center text-center">
                  <span className={`h-[12px] w-[12px] rounded-full border-2 border-glow ${i === 0 || i === signatureRoute.length - 1 ? 'bg-glow shadow-[0_0_10px_rgb(var(--glow))]' : 'bg-card'}`} />
                  <span className="mt-2.5 font-mono text-[10px] leading-4 text-soft">{stop.replace(' Beach', '')}</span>
                </li>
              ))}
            </ol>

            <div className="relative mt-5 border-t border-ink/[0.08] pt-5">
              <DepartureClock onScene={false} />
            </div>
            <p className="relative mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-mute">From {boarding.name} · 3 hours · shared boat</p>
          </div>
        </div>
      </div>

      <a href="#experiences" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mute transition-colors hover:text-ink xl:flex" aria-label="Scroll to experiences">
        Scroll
        <span className="relative block h-8 w-px overflow-hidden bg-ink/15">
          <span className="scroll-cue absolute inset-0 bg-glow" />
        </span>
      </a>
    </section>
  );
}
