import type { FaqItem } from '../types';

/**
 * Answers based on namasteparadisecruise.com. Items with needsConfirmation:true
 * still need the owner's check (they are excluded from FAQ structured data).
 */
export const faqs: FaqItem[] = [
  {
    id: 'start',
    question: 'Where does the boat ride start?',
    answer:
      'All trips start from our counter near Union Bank on Tadadi Main Road, Gokarna 581326, by the Aghanashini river mouth. Om, Half Moon and Paradise Beach are reached by boat along the route.',
    needsConfirmation: false,
  },
  {
    id: 'duration',
    question: 'How long are the trips and what do they cost?',
    answer:
      'The basic package (sightseeing and dolphin watching) is 1 hour at ₹799 per person. The premium beach-hopping package is 3 hours at ₹999 per person, with departures at 08:30 and 14:30. Night cruises, water sports and group trips are priced on WhatsApp.',
    needsConfirmation: false,
  },
  {
    id: 'beaches',
    question: 'Which places do we see?',
    answer:
      'The premium route covers the fishing harbour, Aghanashini river, the lighthouse, dolphin watching, Haven Beach, Nirvana Beach, the mystery caves, Paradise Beach, Half Moon Beach and Om Beach. The exact route depends on sea conditions on the day.',
    needsConfirmation: false,
  },
  {
    id: 'activities',
    question: 'What activities are included in the premium package?',
    answer:
      'Boat ride, kayaking, swimming, sea diving and snorkeling, plus beach football, frisbee, volleyball and badminton at the beach stop. Jet ski, banana and bumper rides are not included and can be added separately.',
    needsConfirmation: false,
  },
  {
    id: 'private',
    question: 'Can we book for a group or a celebration?',
    answer:
      'Yes. We run night cruise parties for birthdays, anniversaries and new year, and offer special discounts for corporate groups and content creators. Send your group size and date on WhatsApp.',
    needsConfirmation: false,
  },
  {
    id: 'families',
    question: 'Is it suitable for families and children?',
    answer:
      'Many families with children join our trips. Tell us the ages of the children when you book and we will advise on activities and safety gear for them.',
    needsConfirmation: true,
  },
  {
    id: 'safety',
    question: 'Is safety gear provided?',
    answer: 'Yes, safety gear is provided and activities are run by our instructors. Ask us about sizes for small children.',
    needsConfirmation: true,
  },
  {
    id: 'dolphins',
    question: 'Will we see dolphins?',
    answer: 'There is a good chance, but sightings are never guaranteed. Dolphins are wild animals and we never chase or disturb them.',
    needsConfirmation: false,
  },
  {
    id: 'weather',
    question: 'What happens if the weather is bad?',
    answer:
      'Safety comes first. Trips do not run in unsafe sea or weather conditions. If your trip cannot run we will contact you on WhatsApp to reschedule.',
    needsConfirmation: true,
  },
  {
    id: 'how-to-book',
    question: 'How do I book?',
    answer:
      'Use any Book button, choose a package, date, time and number of guests, and we open WhatsApp with your request filled in. Press send. Your booking is confirmed when our team replies. You can also call +91 95358 71114 or +91 95359 71114 — our office is open 24×7.',
    needsConfirmation: false,
  },
  {
    id: 'amenities',
    question: 'Are there restrooms and changing rooms?',
    answer:
      'Yes. There is a restroom on board the cruise boat and changing rooms at our base. We can also help with hotel bookings and transport.',
    needsConfirmation: false,
  },
  {
    id: 'cancellation',
    question: 'What is the cancellation policy?',
    answer: 'Cancellation and rescheduling terms are shared on WhatsApp before you confirm your booking.',
    needsConfirmation: true,
  },
];
