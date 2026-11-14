import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Imagery                                                             */
/* ------------------------------------------------------------------ */

/** Illustrated scene compositions rendered by <CoastalArt/> until real photos are supplied. */
export type ArtScene =
  | 'hero'
  | 'cove'
  | 'twin-cove'
  | 'cliffs'
  | 'estuary'
  | 'open-sea'
  | 'dolphins'
  | 'town'
  | 'cruise'
  | 'swim';

export type ArtMood = 'haze' | 'golden' | 'ember' | 'dusk' | 'night' | 'monsoon';

export interface ArtPreset {
  scene: ArtScene;
  mood: ArtMood;
  /** Changes ridge shapes so repeated scenes don't look identical. */
  seed?: number;
}

/**
 * An image slot. While `src` is empty an illustrated placeholder (`art`) is shown.
 * Drop real, authentic Gokarna photos into /public/images and fill in `src`
 * (+ optional `avif` / `webp` / `srcSet`) to switch to photography.
 */
export interface ImageAsset {
  alt: string;
  art: ArtPreset;
  src?: string;
  srcSet?: string;
  avif?: string;
  webp?: string;
  width?: number;
  height?: number;
  credit?: PhotoCredit;
}

export interface PhotoCredit {
  author: string;
  license: string;
  licenseUrl?: string;
  source?: string;
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  tag: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  /** null → shown as "To be confirmed" */
  duration: string | null;
  /** null → shown as "Contact for pricing" */
  price: string | null;
  /** e.g. "Shared boat", "Private charter". null → "Confirm with team" */
  groupInfo: string | null;
  bestFor: string[];
  ctaLabel: string;
  /** Sample route stops shown on the ticket — confirm with the operator. */
  route: string[];
  notes: string[];
  image: ImageAsset;
  /** Marked as sample content until the operator confirms details. */
  isPlaceholder: boolean;
  enabled: boolean;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: ImageAsset;
  /** Package slug the "Explore" link points to. */
  packageSlug: string;
  /** Only show activities the business actually offers. */
  enabled: boolean;
  note?: string;
}

export type RouteStatus = 'on-route' | 'select-routes' | 'separate-trip';

export interface Destination {
  id: string;
  name: string;
  kicker: string;
  description: string;
  special: string;
  routeStatus: RouteStatus;
  routeNote: string;
  image: ImageAsset;
  /** Position on the schematic coast chart (viewBox 0 0 400 600, north up). */
  chart: { x: number; y: number };
}

export type GalleryCategory =
  | 'Boat Rides'
  | 'Mini Cruises'
  | 'Gokarna Beaches'
  | 'Coastal Views'
  | 'Adventure Activities'
  | 'Sunset Experiences';

export interface GalleryItem {
  id: string;
  caption: string;
  category: GalleryCategory;
  image: ImageAsset;
  /** Aspect ratio class used by the masonry grid. */
  ratio: 'portrait' | 'landscape' | 'square' | 'tall';
}

export interface Testimonial {
  id: string;
  name: string;
  origin?: string;
  review: string;
  rating?: number;
  photo?: string;
  isPlaceholder: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** true until the operator has reviewed the answer. */
  needsConfirmation: boolean;
}

export interface SafetyItem {
  id: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  needsConfirmation: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  to: string;
}

/* ------------------------------------------------------------------ */
/* Booking                                                             */
/* ------------------------------------------------------------------ */

export interface BookingRequest {
  name: string;
  whatsapp: string;
  packageId: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  requirements: string;
}
