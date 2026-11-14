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

/** Real photos only: the business's own (npc-*) and credited Wikimedia Commons images of Gokarna. */
export const gallery: GalleryItem[] = [
  { id: 'g1', caption: 'Our cruise boat', category: 'Mini Cruises', ratio: 'landscape', image: photo('npc-cruise-boat') },
  { id: 'g2', caption: 'Sunset at Kudle', category: 'Sunset Experiences', ratio: 'portrait', image: photo('kudle-sunset-rocks') },
  { id: 'g3', caption: 'Half Moon from the water', category: 'Gokarna Beaches', ratio: 'landscape', image: photo('half-moon-from-sea') },
  { id: 'g4', caption: 'On the water off Gokarna', category: 'Boat Rides', ratio: 'square', image: photo('npc-sea-coast') },
  { id: 'g5', caption: 'Inside the cabin', category: 'Mini Cruises', ratio: 'portrait', image: photo('npc-cabin') },
  { id: 'g6', caption: 'Paradise Beach cove', category: 'Gokarna Beaches', ratio: 'landscape', image: photo('paradise-cove') },
  { id: 'g7', caption: 'Swimming at Paradise', category: 'Adventure Activities', ratio: 'square', image: photo('paradise-swimmers') },
  { id: 'g8', caption: 'Boats at Om Beach', category: 'Gokarna Beaches', ratio: 'landscape', image: photo('om-beach-boats') },
  { id: 'g9', caption: 'Evening light, Kudle', category: 'Sunset Experiences', ratio: 'landscape', image: photo('kudle-sunset-boat') },
  { id: 'g10', caption: 'Paddles ready', category: 'Adventure Activities', ratio: 'tall', image: photo('npc-gear') },
  { id: 'g11', caption: 'Surf on the rocks', category: 'Coastal Views', ratio: 'landscape', image: photo('paradise-surf') },
  { id: 'g12', caption: 'Upper deck and kayak', category: 'Mini Cruises', ratio: 'landscape', image: photo('npc-deck') },
  { id: 'g13', caption: 'Aghanashini river', category: 'Coastal Views', ratio: 'square', image: photo('aghanashini-river') },
  { id: 'g14', caption: 'Red sky on the ride home', category: 'Sunset Experiences', ratio: 'landscape', image: photo('gokarna-sunset-boat') },
  { id: 'g15', caption: 'Boats near the Tadadi jetty', category: 'Boat Rides', ratio: 'landscape', image: photo('aghanashini-jetty-boats') },
  { id: 'g16', caption: 'Om Beach at sunset', category: 'Sunset Experiences', ratio: 'tall', image: photo('om-beach-sunset') },
  { id: 'g17', caption: 'Paradise headland', category: 'Coastal Views', ratio: 'landscape', image: photo('paradise-headland') },
  { id: 'g18', caption: 'Kudle Beach', category: 'Gokarna Beaches', ratio: 'landscape', image: photo('kudle-aerial') },
];
