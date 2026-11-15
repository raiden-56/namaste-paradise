import { Anchor, Fish, Music, Palmtree, Waves, Zap } from 'lucide-react';
import type { Experience } from '../types';
import { photo } from './photos';

/** Activities offered by Namaste Paradise Cruise (namasteparadisecruise.com). */
export const experiences: Experience[] = [
  {
    id: 'sightseeing',
    title: 'Coastal sightseeing',
    description: 'Fishing harbour, river mouth, lighthouse and the coves, with the crew explaining each point.',
    icon: Anchor,
    packageSlug: 'basic-sightseeing-dolphin-watching',
    enabled: true,
    image: photo('coast-cliff-hut'),
  },
  {
    id: 'dolphins',
    title: 'Dolphin watching',
    description: 'Scan the open sea for a flash of fins on every sightseeing trip.',
    icon: Fish,
    packageSlug: 'basic-sightseeing-dolphin-watching',
    enabled: true,
    note: 'Not guaranteed',
    image: photo('npc-sea-sun'),
  },
  {
    id: 'beach-hopping',
    title: 'Beach hopping',
    description: 'Paradise, Half Moon and Om Beach from the water, with time ashore to swim.',
    icon: Palmtree,
    packageSlug: 'premium-beach-hopping-cruise',
    enabled: true,
    image: photo('npc-boat-beach'),
  },
  {
    id: 'kayak-snorkel',
    title: 'Kayaking and snorkeling',
    description: 'Paddle a sea kayak, then snorkel to explore Gokarna’s underwater life among the rocks, with instructors on hand.',
    icon: Waves,
    packageSlug: 'premium-beach-hopping-cruise',
    enabled: true,
    note: 'Conditions apply',
    image: photo('npc-kayaks-deck'),
  },
  {
    id: 'night-cruise',
    title: 'Night cruise and karaoke',
    description: 'Cruise parties for birthdays, anniversaries and new year, with music on board.',
    icon: Music,
    packageSlug: 'night-cruise-party',
    enabled: true,
    image: photo('gokarna-sunset'),
  },
  {
    id: 'water-sports',
    title: 'Jet ski, banana and bumper rides',
    description: 'Fast, splashy add-on rides run by our instructors. Bumper ride ₹500.',
    icon: Zap,
    packageSlug: 'water-sports-rides',
    enabled: true,
    image: photo('jet-ski-ride'),
  },
];

export const activeExperiences = experiences.filter((e) => e.enabled);
