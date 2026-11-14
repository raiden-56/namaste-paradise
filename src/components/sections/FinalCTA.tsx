import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { BookButton } from '@/components/booking/BookButton';
import { buttonClass } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { photoLibrary } from '@/config/photos';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" data-parallax-root="" className="relative isolate overflow-hidden bg-night py-32 text-cream sm:py-44">
      <div className="absolute -inset-y-[12%] inset-x-0 -z-10" data-parallax="0.1">
        <Image src="/images/kudle-sunset-boat.webp" alt={photoLibrary['kudle-sunset-boat'].alt} fill sizes="100vw" className="object-cover object-[30%_center]" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/80 via-night/50 to-night/20" />
      <div className="wrap" data-reveal>
        <div className="max-w-[40rem]">
          <h2 id="cta-title" className="text-title text-cream">
            Your next great escape starts here
          </h2>
          <p className="mt-5 max-w-[30rem] text-[18px] leading-[1.6] text-cream/85">
            The Arabian Sea is waiting. Discover Gokarna from a whole new perspective.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookButton variant="ember" size="lg">
              Book your experience <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </BookButton>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass('scene', 'lg')}>
              <WhatsAppIcon /> Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
