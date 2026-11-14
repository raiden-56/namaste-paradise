import { Baby, CalendarClock, ClipboardList, CloudRain, LifeBuoy, PhoneCall, Users, Waves } from 'lucide-react';
import type { SafetyItem } from '../types';
import { contact } from './brand';

/** Visitor and safety information. Only claims made by the business are stated as fact. */
export const safetyItems: SafetyItem[] = [
  {
    id: 'gear',
    title: 'Safety gear',
    detail: 'Safety gear is provided on every trip, and activities are run by professional instructors.',
    icon: LifeBuoy,
    needsConfirmation: false,
  },
  {
    id: 'weather',
    title: 'Weather',
    detail: 'Trips never run in unsafe weather. If conditions turn, we reschedule with you on WhatsApp.',
    icon: CloudRain,
    needsConfirmation: false,
  },
  {
    id: 'sea',
    title: 'Sea conditions',
    detail: 'Routes, beach stops and activities may change on the day depending on tide, swell and permissions.',
    icon: Waves,
    needsConfirmation: false,
  },
  {
    id: 'capacity',
    title: 'Passenger capacity',
    detail: 'Each trip runs within the boat’s permitted capacity. Your seats are confirmed with your booking.',
    icon: Users,
    needsConfirmation: true,
  },
  {
    id: 'children',
    title: 'Children',
    detail: 'Families with children are welcome. Tell us the ages when you book so we can prepare.',
    icon: Baby,
    needsConfirmation: true,
  },
  {
    id: 'boarding',
    title: 'Boarding',
    detail: 'Come to our counter near Union Bank, Tadadi, 20–30 minutes early, and follow the crew while boarding.',
    icon: ClipboardList,
    needsConfirmation: false,
  },
  {
    id: 'emergency',
    title: 'Contact on the day',
    detail: `${contact.phones.join(' or ')} — office open 24×7`,
    icon: PhoneCall,
    needsConfirmation: false,
  },
  {
    id: 'cancellation',
    title: 'Cancellation and rescheduling',
    detail: 'Terms are shared on WhatsApp before you confirm.',
    icon: CalendarClock,
    needsConfirmation: true,
  },
];
