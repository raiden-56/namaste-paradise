import type { Destination, RouteStatus } from '../types';
import { photo } from './photos';

/**
 * Places along the coast. Route status follows the premium package itinerary on
 * namasteparadisecruise.com — stops still depend on sea conditions on the day.
 */
export const destinations: Destination[] = [
  {
    id: 'om-beach',
    name: 'Om Beach',
    kicker: 'The sacred curve',
    description:
      'Two linked crescents of sand that, seen from the hills or the sea, trace a shape often compared to the Om symbol. It is Gokarna’s best-known beach, lively by day and glowing at sunset.',
    special: 'Its twin-cove outline is clearest from the water, where the whole shape comes into view at once.',
    routeStatus: 'on-route',
    routeNote: 'On the premium beach-hopping route.',
    image: photo('om-beach-boats'),
    chart: { x: 222, y: 262 },
  },
  {
    id: 'half-moon',
    name: 'Half Moon Beach',
    kicker: 'A quiet crescent',
    description:
      'A small, sheltered cove beneath a wooded headland, reached on foot by a coastal trail or in a single sweep from the sea. Guests on our premium trip usually stop here to swim, kayak and snorkel.',
    special: 'One of the beaches approved for water activities, with forest running almost to the waterline.',
    routeStatus: 'on-route',
    routeNote: 'Usual activity stop on the premium route, subject to conditions.',
    image: photo('half-moon-from-sea'),
    chart: { x: 206, y: 338 },
  },
  {
    id: 'paradise',
    name: 'Paradise Beach',
    kicker: 'Rocks, palms, solitude',
    description:
      'Further along the cliffs, a rugged little beach of boulders and pale sand. Remote by land, it rewards those who approach it slowly from the water.',
    special: 'One of the most secluded stretches on this coast, framed by dark rock and green headland.',
    routeStatus: 'on-route',
    routeNote: 'On the premium beach-hopping route.',
    image: photo('paradise-cove'),
    chart: { x: 193, y: 410 },
  },
  {
    id: 'kudle',
    name: 'Kudle Beach',
    kicker: 'Long, golden, unhurried',
    description:
      'A long, gentle sweep of sand between the town and Om Beach, loved for its slow pace, beach cafés and wide sunset views.',
    special: 'Wide open western horizon — one of the best sunset outlooks along the coast.',
    routeStatus: 'select-routes',
    routeNote: 'Not on the standard route. Ask us about a custom or group trip.',
    image: photo('kudle-aerial'),
    chart: { x: 240, y: 172 },
  },
  {
    id: 'main-beach',
    name: 'Gokarna Main Beach',
    kicker: 'Where the temple town meets the sea',
    description:
      'The town beach beside Gokarna’s old temple streets — a place of pilgrims, fishing boats and evening walks, with the town rising behind the sand.',
    special: 'The cultural heart of Gokarna, where spiritual life and coastal life meet.',
    routeStatus: 'select-routes',
    routeNote: 'Not on the standard route. Ask us about a custom or group trip.',
    image: photo('main-beach-aerial'),
    chart: { x: 262, y: 80 },
  },
  {
    id: 'aghanashini',
    name: 'Aghanashini river and Tadadi',
    kicker: 'Where every trip begins',
    description:
      'South of the beaches, the Aghanashini river meets the Arabian Sea through mangroves and fishing villages. Our counter is at Tadadi, by the fishing harbour and the river mouth, and every trip starts here.',
    special: 'Fishing harbour, river backwaters and the lighthouse, all in the first minutes of the ride.',
    routeStatus: 'on-route',
    routeNote: 'Start of every trip.',
    image: photo('aghanashini-jetty-boats'),
    chart: { x: 214, y: 522 },
  },
];

export const routeStatusLabel: Record<RouteStatus, string> = {
  'on-route': 'On our route',
  'select-routes': 'Custom trips',
  'separate-trip': 'Separate trip',
};
