import { Bath, BedDouble, Bus, LifeBuoy, Shirt, UserCheck } from 'lucide-react';
import type { Feature, NavItem } from '../types';
import { boarding } from './brand';

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Boat tours', to: '/#tours' },
  { label: 'Tour packages', to: '/packages' },
  { label: 'Experiences', to: '/#experiences' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/** Amenities listed by the business on namasteparadisecruise.com. */
export const whyChooseUs: Feature[] = [
  { title: 'Professional instructors', description: 'Kayaking, snorkeling and water sports are run by our own instructors.', icon: UserCheck },
  { title: 'Safety gear', description: 'Safety gear is provided for every guest before activities start.', icon: LifeBuoy },
  { title: 'Restroom on board', description: 'Our cruise boat has its own restroom, so longer trips stay comfortable.', icon: Bath },
  { title: 'Changing rooms', description: 'Change before and after swimming at our base in Tadadi.', icon: Shirt },
  { title: 'Transportation', description: 'Ask us to arrange transport to and from the boarding point.', icon: Bus },
  { title: 'Hotel bookings', description: 'Need a place to stay in Gokarna? We can help you book.', icon: BedDouble },
];

/** Route shown on the hero card (premium package). */
export const signatureRoute = [boarding.name, 'Paradise Beach', 'Half Moon', 'Om Beach'];
