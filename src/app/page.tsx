import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Boarding } from '@/components/sections/Boarding';
import { Coastline } from '@/components/sections/Coastline';
import { Experiences } from '@/components/sections/Experiences';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { Safety } from '@/components/sections/Safety';
import { Testimonials } from '@/components/sections/Testimonials';
import { Tours } from '@/components/sections/Tours';
import { WhyUs } from '@/components/sections/WhyUs';
import { brand } from '@/config/brand';
import { faqSchema } from '@/utils/structuredData';

export const metadata: Metadata = {
  title: { absolute: `Gokarna Boat Ride, Mini Cruise & Water Sports | ${brand.name}` },
  description:
    'Mini cruise and boat rides from Tadadi, Gokarna: dolphin watching from ₹799 and 3-hour beach hopping to Paradise, Half Moon and Om Beach with kayaking and snorkeling from ₹999. Book on WhatsApp.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experiences />
      <Tours />
      <Coastline />
      <Journey />
      <WhyUs />
      <Gallery limit={8} />
      <Testimonials />
      <Safety />
      <FAQ />
      <Boarding />
      <FinalCTA />
      <JsonLd data={faqSchema()} />
    </>
  );
}
