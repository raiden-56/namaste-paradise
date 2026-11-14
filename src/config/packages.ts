import type { TourPackage } from '../types';
import { photo } from './photos';

/**
 * ============================================================
 *  TOUR PACKAGES — from namasteparadisecruise.com (Nov 2026)
 * ============================================================
 *  - duration: null → "To be confirmed"
 *  - price:    null → "Contact for pricing"
 *  - isPlaceholder: true shows a "To confirm" tag until the owner checks it
 *  - enabled: false hides a package everywhere
 */
export const packages: TourPackage[] = [
  {
    id: 'basic-sightseeing',
    slug: 'basic-sightseeing-dolphin-watching',
    name: 'Basic package',
    tag: 'Sightseeing and dolphin watching',
    shortDescription: 'A one-hour boat ride along the Gokarna coast with a lookout for dolphins.',
    description:
      'Our shortest trip and the easiest way onto the water. The boat heads out from Tadadi for an hour of coastal sightseeing, with the crew pointing out the landmarks and keeping an eye out for dolphins. Dolphins are wild, so sightings are never guaranteed.',
    highlights: ['Coastal sightseeing from the sea', 'Dolphin watching', 'Crew explain each point along the way', 'Good for families and first-timers'],
    duration: '1 hour',
    price: '₹799 per person',
    groupInfo: 'Shared boat',
    bestFor: ['First-timers', 'Families', 'Short on time'],
    ctaLabel: 'Book basic package',
    route: ['Tadadi', 'Coast', 'Dolphin lookout', 'Tadadi'],
    notes: ['Dolphin sightings are never guaranteed.', 'Jet ski, banana and bumper rides are not included.'],
    image: photo('npc-sea-coast'),
    isPlaceholder: false,
    enabled: true,
  },
  {
    id: 'premium-beach-hopping',
    slug: 'premium-beach-hopping-cruise',
    name: 'Premium package',
    tag: 'Beach hopping, kayaking and snorkeling',
    shortDescription: 'Three hours of beach hopping past ten coastal sights, with a beach stop for swimming, kayaking and snorkeling.',
    description:
      'Our most popular trip. From Tadadi the boat passes the fishing harbour, the Aghanashini river mouth and the lighthouse, watches for dolphins, then hops along Haven, Nirvana and Paradise Beach and the mystery caves to Half Moon and Om Beach. At an approved beach stop you can swim, kayak, snorkel and play beach games while the crew looks after you.',
    highlights: [
      'Fishing harbour, Aghanashini river and lighthouse',
      'Dolphin watching',
      'Haven, Nirvana, Paradise, Half Moon and Om Beach',
      'Mystery caves',
      'Kayaking, swimming, snorkeling and sea diving',
      'Beach football, frisbee, volleyball and badminton',
    ],
    duration: '3 hours',
    price: '₹999 per person',
    groupInfo: 'Shared boat',
    bestFor: ['Families', 'Friends', 'First time snorkelers'],
    ctaLabel: 'Book premium package',
    route: ['Tadadi', 'Paradise', 'Half Moon', 'Om Beach'],
    notes: [
      'Departures at 08:30 and 14:30.',
      'Jet ski, banana and bumper rides are not included in this package.',
      'Beach stops and activities depend on sea conditions and permissions on the day.',
    ],
    image: photo('npc-cruise-boat'),
    isPlaceholder: false,
    enabled: true,
  },
  {
    id: 'night-cruise',
    slug: 'night-cruise-party',
    name: 'Night cruise ride',
    tag: 'Cruise parties and karaoke',
    shortDescription: 'Celebrate on the water with a cruise party, music and karaoke.',
    description:
      'Birthdays, anniversaries, new year, a night out with friends — our cruise party packages put the celebration on the water. Music and karaoke on board, with the coast lit up behind you. Tell us your occasion and group size and we will plan the evening with you.',
    highlights: ['Cruise party packages', 'Music on board', 'Karaoke game nights', 'Sunset and evening departures'],
    duration: null,
    price: null,
    groupInfo: 'Groups and celebrations',
    bestFor: ['Celebrations', 'Friends', 'Couples'],
    ctaLabel: 'Plan a night cruise',
    route: ['Tadadi', 'Evening coast', 'Tadadi'],
    notes: ['Timing, duration and price depend on the date and group — confirmed on WhatsApp.'],
    image: photo('npc-cabin'),
    isPlaceholder: true,
    enabled: true,
  },
  {
    id: 'water-sports',
    slug: 'water-sports-rides',
    name: 'Water sports rides',
    tag: 'Jet ski, banana and bumper rides',
    shortDescription: 'Fast, splashy add-ons: jet ski, banana boat and bumper rides.',
    description:
      'For more speed and spray, add a water sports ride. Take a jet ski out, hold on tight on the banana boat, or bounce across the waves on the bumper ride. Rides are run by our instructors with safety gear provided.',
    highlights: ['Jet ski ride', 'Banana boat ride', 'Bumper ride', 'Instructors and safety gear'],
    duration: null,
    price: null,
    groupInfo: 'Per ride',
    bestFor: ['Thrill seekers', 'Friends', 'Teens'],
    ctaLabel: 'Ask about rides',
    route: ['Tadadi', 'Ride', 'Tadadi'],
    notes: ['Not included in the basic or premium package.', 'Ride prices on WhatsApp.'],
    image: photo('npc-gear'),
    isPlaceholder: true,
    enabled: true,
  },
  {
    id: 'group-corporate',
    slug: 'group-and-corporate-cruise',
    name: 'Group and corporate cruise',
    tag: 'Groups, creators and companies',
    shortDescription: 'Special rates for corporate groups and content creators, with the trip planned around you.',
    description:
      'Bringing a team, a big family or a creator shoot? We offer exclusive discounts for corporate groups and content creators, and can help with hotel bookings and transport around your trip. Share your group size and dates and we will put together a plan.',
    highlights: ['Exclusive group and creator discounts', 'Flexible plan for your group', 'Help with hotel bookings', 'Transport arrangements'],
    duration: null,
    price: null,
    groupInfo: 'Private groups',
    bestFor: ['Corporate teams', 'Content creators', 'Large families'],
    ctaLabel: 'Request a group quote',
    route: ['Tadadi', 'Your route', 'Tadadi'],
    notes: ['Discounts, capacity and timings confirmed on WhatsApp.'],
    image: photo('npc-deck'),
    isPlaceholder: true,
    enabled: true,
  },
];

export const activePackages = packages.filter((p) => p.enabled);

export const getPackageBySlug = (slug: string) => activePackages.find((p) => p.slug === slug);
export const getPackageById = (id: string) => activePackages.find((p) => p.id === id);

export const formatDuration = (p: TourPackage) => p.duration ?? 'Confirm on WhatsApp';
export const formatPrice = (p: TourPackage) => p.price ?? 'Price on WhatsApp';
export const formatGroup = (p: TourPackage) => p.groupInfo ?? 'Confirm with our team';

/** Booking-form option for visitors who want a recommendation. */
export const NOT_SURE_PACKAGE = 'not-sure';
