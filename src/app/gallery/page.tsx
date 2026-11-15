import { FinalCTA } from '@/components/sections/FinalCTA';
import { Gallery } from '@/components/sections/Gallery';
import { PageHero } from '@/components/sections/PageHero';
import { photo } from '@/config/photos';
import { pageMetadata } from '@/utils/seo';

export const metadata = pageMetadata({
  title: 'Gallery of Gokarna Boat Rides, Beaches and Sunsets',
  description: 'Gokarna boat rides and mini cruises: Om Beach, Half Moon Beach, Paradise Beach, coastal views and Arabian Sea sunsets.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        kicker="Gallery"
        title="The coast, frame by frame"
        description="Boat rides, mini cruises, beaches and sunsets along the Gokarna coastline."
        image={photo('coast-rocks')}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />
      <Gallery filters heading={false} />
      <FinalCTA />
    </>
  );
}
