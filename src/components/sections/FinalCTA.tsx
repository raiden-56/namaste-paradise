import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { BookButton } from '@/components/booking/BookButton';
import { buttonClass } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { photoLibrary } from '@/config/photos';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="px-3 py-3 sm:px-5 sm:py-5">
      <div data-parallax-root="" data-spot="" className="relative isolate overflow-hidden rounded-[32px] bg-night py-28 text-cream sm:py-40">
        <div className="absolute -inset-y-[14%] inset-x-0 -z-20" data-parallax="0.12">
          <Image src="/images/kudle-sunset-boat.webp" alt={photoLibrary['kudle-sunset-boat'].alt} fill sizes="100vw" className="object-cover object-[30%_center]" />
        </div>
        <div className="absolute inset-0 -z-10 bg-night/55" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(3_7_12/0.85)_75%)]" />
        <div
          aria-hidden
          className="grid-bg-scene absolute inset-0 -z-10"
          style={{
            WebkitMaskImage: 'radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), #000, transparent 70%)',
            maskImage: 'radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), #000, transparent 70%)',
          }}
        />
        <div className="wrap text-center" data-reveal>
          <p className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-aqua">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-aqua" /> Boarding now open
          </p>
          <h2 id="cta-title" className="mx-auto mt-6 max-w-[56rem] font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-cream">
            Your next great escape <span className="text-glow-gradient">starts here</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[32rem] text-[17px] leading-[1.7] text-cream/80">The Arabian Sea is waiting. Discover Gokarna from a whole new perspective.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <span data-magnetic className="inline-flex">
              <BookButton variant="glow" size="lg" className="w-full">
                Book your experience <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </BookButton>
            </span>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass('scene', 'lg')}>
              <WhatsAppIcon /> Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
