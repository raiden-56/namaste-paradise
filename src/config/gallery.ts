import type { GalleryCategory, GalleryItem } from '../types';
import { photo } from './photos';

export const galleryCategories: GalleryCategory[] = [
  'Boat Rides',
  'Mini Cruises',
  'Gokarna Beaches',
  'Coastal Views',
  'Adventure Activities',
  'Sunset Experiences',
];

/** Real photos only: the business’s own (listed first) and credited Wikimedia Commons images of Gokarna. */
export const gallery: GalleryItem[] = [
  { id: 'g1', caption: 'Our boat on the Aghanashini river', category: 'Boat Rides', ratio: 'landscape', image: photo('npc-boat-river') },
  { id: 'g2', caption: 'Kayaks on deck, ready for the cove', category: 'Adventure Activities', ratio: 'tall', image: photo('npc-kayaks-deck') },
  { id: 'g3', caption: 'Anchored at the beach stop', category: 'Mini Cruises', ratio: 'landscape', image: photo('npc-boat-beach') },
  { id: 'g4', caption: 'Palm-lined beach from the water', category: 'Gokarna Beaches', ratio: 'landscape', image: photo('coast-palm-beach') },
  { id: 'g5', caption: 'Sun going down over the Arabian Sea', category: 'Sunset Experiences', ratio: 'tall', image: photo('gokarna-sunset') },
  { id: 'g6', caption: 'Granite headland on the route', category: 'Coastal Views', ratio: 'landscape', image: photo('coast-rocks') },
  { id: 'g7', caption: 'Kayaks stacked on the upper deck', category: 'Mini Cruises', ratio: 'landscape', image: photo('npc-boat-kayaks') },
  { id: 'g8', caption: 'Beach hut on the rocks', category: 'Coastal Views', ratio: 'square', image: photo('coast-cliff-hut') },
  { id: 'g9', caption: 'Lifebuoy on the deck rail', category: 'Boat Rides', ratio: 'landscape', image: photo('npc-lifebuoy') },
  { id: 'g10', caption: 'Our cruise boat', category: 'Mini Cruises', ratio: 'landscape', image: photo('npc-cruise-boat') },
  { id: 'g11', caption: 'Inside the cabin', category: 'Mini Cruises', ratio: 'portrait', image: photo('npc-cabin') },
  { id: 'g12', caption: 'On the water off Gokarna', category: 'Boat Rides', ratio: 'square', image: photo('npc-sea-coast') },
  { id: 'g13', caption: 'Paddles ready', category: 'Adventure Activities', ratio: 'tall', image: photo('npc-gear') },
  { id: 'g14', caption: 'Upper deck and kayak', category: 'Mini Cruises', ratio: 'landscape', image: photo('npc-deck') },
  { id: 'g15', caption: 'Our ticket counter at Tadadi', category: 'Boat Rides', ratio: 'landscape', image: photo('npc-ticket-counter') },
  { id: 'g16', caption: 'Restroom on board', category: 'Mini Cruises', ratio: 'landscape', image: photo('npc-onboard-restroom') },
  { id: 'g17', caption: 'Sun over the hills, from the boat', category: 'Sunset Experiences', ratio: 'landscape', image: photo('npc-sea-sun') },
  { id: 'g18', caption: 'Half Moon from the water', category: 'Gokarna Beaches', ratio: 'landscape', image: photo('half-moon-from-sea') },
  { id: 'g19', caption: 'Paradise Beach cove', category: 'Gokarna Beaches', ratio: 'landscape', image: photo('paradise-cove') },
  { id: 'g20', caption: 'Swimming at Paradise', category: 'Adventure Activities', ratio: 'square', image: photo('paradise-swimmers') },
  { id: 'g25', caption: 'Jet ski ride (Port Blair)', category: 'Adventure Activities', ratio: 'landscape', image: photo('jet-ski-ride') },
  { id: 'g21', caption: 'Boats at Om Beach', category: 'Gokarna Beaches', ratio: 'landscape', image: photo('om-beach-boats') },
  { id: 'g22', caption: 'Sunset at Kudle', category: 'Sunset Experiences', ratio: 'portrait', image: photo('kudle-sunset-rocks') },
  { id: 'g23', caption: 'Om Beach at sunset', category: 'Sunset Experiences', ratio: 'tall', image: photo('om-beach-sunset') },
  { id: 'g24', caption: 'Surf on the rocks', category: 'Coastal Views', ratio: 'landscape', image: photo('paradise-surf') },
];
