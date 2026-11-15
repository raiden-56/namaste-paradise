import type { ImageAsset } from '../types';

/**
 * ============================================================
 *  PHOTO LIBRARY — /public/images (optimized WebP, ≤ 2400px)
 * ============================================================
 *  npc-*, coast-*, gokarna-sunset : the business's own photos (old website, and trip photos from Nov 2026)
 *  others : Gokarna locations from Wikimedia Commons (CC licences, credited on /policies#credits)
 *  Next/Image serves AVIF/WebP at the right size automatically.
 *  To add a photo: drop a file in public/images and add an entry here.
 */
type PhotoMeta = Pick<ImageAsset, 'alt' | 'width' | 'height' | 'credit'>;

const own = { author: 'Namaste Paradise Cruise', license: 'Used with permission of the business', source: 'https://namasteparadisecruise.com' };

export const photoLibrary = {
  // Trip photos taken by the business, November 2026
  'npc-boat-river': { alt: 'The Namaste Paradise Cruise boat, with kayaks on its roof, on the Aghanashini river at Tadadi', width: 2400, height: 1600, credit: own },
  'npc-boat-beach': { alt: 'The Namaste Paradise Cruise boat anchored in clear shallow water at a beach stop', width: 2400, height: 1800, credit: own },
  'npc-boat-kayaks': { alt: 'The Namaste Paradise Cruise boat at a beach stop, kayaks stacked on the upper deck', width: 2400, height: 1800, credit: own },
  'npc-kayaks-deck': { alt: 'Two sea kayaks on the deck of the Namaste Paradise Cruise boat, with a rocky cove behind', width: 1800, height: 2400, credit: own },
  'npc-lifebuoy': { alt: 'An orange lifebuoy on the deck rail of the Namaste Paradise Cruise boat', width: 2400, height: 1800, credit: own },
  'coast-palm-beach': { alt: 'A palm-lined beach with beach huts below forested hills, seen from the boat', width: 2400, height: 1800, credit: own },
  'coast-rocks': { alt: 'Granite boulders on a headland of the Gokarna coast, seen from the boat', width: 2400, height: 1800, credit: own },
  'coast-cliff-hut': { alt: 'A beach hut on dark rocks above the sea on the Gokarna coast, seen from the boat', width: 2400, height: 1800, credit: own },
  'gokarna-sunset': { alt: 'The sun setting into the haze over the Arabian Sea at Gokarna, people silhouetted on the beach', width: 1800, height: 2400, credit: own },
  // From namasteparadisecruise.com
  'npc-cruise-boat': {"alt":"The Namaste Paradise Cruise boat moored at the shore","width":1600,"height":1068,"credit":{"author":"Namaste Paradise Cruise","license":"Used with permission of the business","source":"https://namasteparadisecruise.com"}},
  'npc-cabin': {"alt":"Seating inside the Namaste Paradise Cruise boat cabin, decorated with balloons","width":1600,"height":1068,"credit":{"author":"Namaste Paradise Cruise","license":"Used with permission of the business","source":"https://namasteparadisecruise.com"}},
  'npc-deck': {"alt":"The Namaste Paradise Cruise boat seen from above, with its upper deck and kayak","width":1600,"height":1068,"credit":{"author":"Namaste Paradise Cruise","license":"Used with permission of the business","source":"https://namasteparadisecruise.com"}},
  'npc-onboard-restroom': {"alt":"The onboard restroom of the Namaste Paradise Cruise boat","width":1600,"height":1068,"credit":{"author":"Namaste Paradise Cruise","license":"Used with permission of the business","source":"https://namasteparadisecruise.com"}},
  'npc-ticket-counter': {"alt":"The Namaste Paradise Cruise ticket counter at Tadadi","width":1600,"height":1068,"credit":{"author":"Namaste Paradise Cruise","license":"Used with permission of the business","source":"https://namasteparadisecruise.com"}},
  'npc-sea-coast': {"alt":"The Gokarna coastline seen from the Namaste Paradise Cruise boat","width":1280,"height":960,"credit":{"author":"Namaste Paradise Cruise","license":"Used with permission of the business","source":"https://namasteparadisecruise.com"}},
  'npc-sea-sun': {"alt":"Sun behind the forested hills, seen from the boat on the Arabian Sea","width":1280,"height":960,"credit":{"author":"Namaste Paradise Cruise","license":"Used with permission of the business","source":"https://namasteparadisecruise.com"}},
  'npc-gear': {"alt":"Kayak paddles ready for the next trip","width":1600,"height":2397,"credit":{"author":"Namaste Paradise Cruise","license":"Used with permission of the business","source":"https://namasteparadisecruise.com"}},
  'om-beach-sunset': {"alt":"Sun low over the sea at Om Beach, Gokarna","width":2268,"height":4032,"credit":{"author":"Sourabh.biswas003","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0","source":"https://commons.wikimedia.org/wiki/File:PXL_20260103_101009613_People_and_Beach_Om_Beach_Gokarna,_Karnataka_46.jpg"}},
  'kudle-aerial': {"alt":"Kudle Beach curving below green hills, Gokarna","width":2400,"height":1800,"credit":{"author":"Happyshopper","license":"CC BY 2.5","licenseUrl":"https://creativecommons.org/licenses/by/2.5","source":"https://commons.wikimedia.org/wiki/File:Kudle_beach_gokarna.jpg"}},
  'kudle-sunset-rocks': {"alt":"Sun setting over the Arabian Sea beside dark rocks at Kudle Beach, Gokarna","width":2400,"height":1600,"credit":{"author":"Pranabandhu Nayak","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0","source":"https://commons.wikimedia.org/wiki/File:Sunset_in_the_Arabian_sea,_Kudle_Beach,_Gokarna,_Karnataka.jpg"}},
  'half-moon-from-sea': {"alt":"Half Moon Beach, Gokarna, a small cove under forested hills, seen from the water","width":1920,"height":1080,"credit":{"author":"Photos Worldwide","license":"CC0","licenseUrl":"http://creativecommons.org/publicdomain/zero/1.0/deed.en","source":"https://commons.wikimedia.org/wiki/File:5-Halfmoon_beach_Gokarna_Karnatak_India.jpg"}},
  'paradise-swimmers': {"alt":"People swimming in the calm sea at Paradise Beach, Gokarna","width":2400,"height":1350,"credit":{"author":"Sourabh.biswas003","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0","source":"https://commons.wikimedia.org/wiki/File:PXL_20260103_054657562.MP_Paradise_beach_gokarna_Paradise_Beach_Trail,_Gokarna,_Karnataka_581326_05.jpg"}},
  'paradise-surf': {"alt":"Surf breaking over dark rocks at Paradise Beach, Gokarna","width":2400,"height":1350,"credit":{"author":"Sourabh.biswas003","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0","source":"https://commons.wikimedia.org/wiki/File:PXL_20260103_054657562.MP_Paradise_beach_gokarna_Paradise_Beach_Trail,_Gokarna,_Karnataka_581326_09.jpg"}},
  'paradise-cove': {"alt":"Secluded cove at Paradise Beach, Gokarna, with wooded headlands","width":2400,"height":1350,"credit":{"author":"Sourabh.biswas003","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0","source":"https://commons.wikimedia.org/wiki/File:PXL_20260103_054657562.MP_Paradise_beach_gokarna_Paradise_Beach_Trail,_Gokarna,_Karnataka_581326_12.jpg"}},
  'om-beach-boats': {"alt":"Boats moored at Om Beach, Gokarna, seen from the hillside","width":2400,"height":1350,"credit":{"author":"Axis of eran","license":"CC0","licenseUrl":"http://creativecommons.org/publicdomain/zero/1.0/deed.en","source":"https://commons.wikimedia.org/wiki/File:Om_beach_Gokarna.JPG"}},
  'kudle-sunset-boat': {"alt":"A boat on calm water at sunset off Kudle Beach, Gokarna, with swimmers in the shallows","width":2400,"height":1800,"credit":{"author":"Pranet","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0","source":"https://commons.wikimedia.org/wiki/File:Beach_at_gokarna.jpg"}},
  'gokarna-sunset-boat': {"alt":"A boat with passengers silhouetted against a red sunset in Gokarna","width":2310,"height":1536,"credit":{"author":"Sanjanan0212","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0","source":"https://commons.wikimedia.org/wiki/File:Sunset_in_Gokarna.jpg"}},
  'main-beach-aerial': {"alt":"Gokarna Main Beach and the temple town seen from above","width":2400,"height":1600,"credit":{"author":"Alexey Komarov","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0","source":"https://commons.wikimedia.org/wiki/File:Gokarna_Main_Beach_in_January_2023.jpg"}},
  'aghanashini-river': {"alt":"The Aghanashini river winding through green hills near Gokarna","width":2048,"height":1536,"credit":{"author":"Kishisykes","license":"Public domain","source":"https://commons.wikimedia.org/wiki/File:Aghnashini_River.JPG"}},
  'jet-ski-ride': {"alt":"Two riders in life jackets on a jet ski, spray flying over the blue sea at Port Blair, India","width":1421,"height":947,"credit":{"author":"Ankur P from Pune, India","license":"CC BY-SA 2.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/2.0","source":"https://commons.wikimedia.org/wiki/File:Port_Blair_-_Water_scooter_ride_(15545775398).jpg"}},
} satisfies Record<string, PhotoMeta>;

export type PhotoSlug = keyof typeof photoLibrary;

/** ImageAsset for a library photo, with an illustrated fallback if the file is ever removed. */
export function photo(slug: PhotoSlug, alt?: string): ImageAsset {
  const p = photoLibrary[slug] as PhotoMeta;
  return { ...p, alt: alt ?? p.alt, src: `/images/${slug}.webp`, art: { scene: 'open-sea', mood: 'dusk', seed: 1 } };
}
