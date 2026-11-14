import type { Testimonial } from '../types';

/**
 * Real Google reviews of Namaste Paradise Cruise & Watersports, as published in the
 * reviews widget on namasteparadisecruise.com (Nov 2026). Text lightly trimmed;
 * names shortened to first name + initial. Refresh from Google periodically.
 */
export const testimonialsConfig = {
  enabled: true,
  heading: 'What guests say on Google',
};

export const testimonials: Testimonial[] = [
  {
    id: 'sree',
    name: 'Sree V.',
    origin: 'Google review',
    review:
      'The boat ride wasn’t crowded and it was very chill and relaxed. I did kayaking on the sea for the first time, and my first snorkeling — I saw fishes swimming freely near the seaweed. Totally worth the money. I did this on my birthday and it made my day.',
    isPlaceholder: false,
  },
  {
    id: 'adarsh',
    name: 'Adarsh N.',
    origin: 'Google review',
    review:
      'We opted for the sunset cruise and it was filled with fun. The Aghanashini backwater experience was mesmerizing and the staff treated us very well. Do visit if you are in Gokarna.',
    isPlaceholder: false,
  },
  {
    id: 'ranjith',
    name: 'Ranjith R.',
    origin: 'Google review',
    review: 'Well organised and reasonable pricing. Recommended for families too. It was a pleasant experience — enjoyed a lot.',
    isPlaceholder: false,
  },
  {
    id: 'jyothi',
    name: 'Jyothi H.',
    origin: 'Google review',
    review: 'We had such a wonderful time with Namaste Paradise Cruise. They made our new year memorable, and the whole crew was friendly and worth it.',
    isPlaceholder: false,
  },
  {
    id: 'kartik',
    name: 'Kartik M.',
    origin: 'Google review',
    review:
      'Amazing experience. Staff were cooperative and friendly, and every activity was explained properly. At the end of the journey they gave us biscuits and water bottles, which was very generous.',
    isPlaceholder: false,
  },
];
