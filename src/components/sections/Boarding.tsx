'use client';

import { Car, Clock, Landmark, MapPin, Navigation, Timer } from 'lucide-react';
import { useState } from 'react';
import { buttonClass } from '@/components/ui/button';
import { Placeholder } from '@/components/ui/Placeholder';
import { boarding, contact, mapsDirectionsUrl, mapsEmbedUrl } from '@/config/brand';

const rows = [
  { icon: MapPin, label: 'Address', value: boarding.address },
  { icon: Landmark, label: 'Landmark', value: boarding.landmark },
  { icon: Car, label: 'Parking', value: boarding.parking },
  { icon: Timer, label: 'Arrive', value: boarding.arrival },
  { icon: Clock, label: 'Hours', value: contact.operatingHours },
];

export function Boarding() {
  // Click-to-load keeps the heavy Google Maps iframe off the critical path.
  const [map, setMap] = useState(false);
  return (
    <section id="location" aria-labelledby="location-title" className="border-t border-ink/[0.08] py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="kicker mb-4">Boarding</p>
          <h2 id="location-title" className="text-title">
            Where your trip begins
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-[17px] text-soft">
            Departing from <span className="text-ink">{boarding.name}</span>
            {boarding.isPlaceholder && <Placeholder label="Confirm boarding point" />}
          </div>
          <p className="mt-6 border-l-2 border-ember pl-4 text-[15px] leading-[1.6] text-ink">{boarding.explainer}</p>
          <dl className="mt-8">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="grid grid-cols-[18px_96px_1fr] gap-3 border-t border-ink/[0.08] py-4 text-[15px]">
                <Icon className="mt-0.5 h-[18px] w-[18px] text-mute" strokeWidth={1.5} />
                <dt className="text-mute">{label}</dt>
                <dd className="leading-[1.6] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg', 'mt-8 w-full sm:w-auto')}>
            <Navigation className="h-4 w-4" strokeWidth={1.5} /> Get directions
          </a>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-panel border border-ink/[0.08] bg-card lg:col-span-7 lg:min-h-[560px]" data-reveal>
          {map ? (
            <iframe title={`Map of ${boarding.name}`} src={mapsEmbedUrl} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          ) : (
            <button type="button" onClick={() => setMap(true)} className="group absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center" aria-label="Load interactive Google Map">
              <svg aria-hidden className="absolute inset-0 h-full w-full">
                <defs>
                  <pattern id="map-contours" width="160" height="80" patternUnits="userSpaceOnUse">
                    <path d="M0 40 Q40 10 80 40 T160 40" fill="none" stroke="rgb(var(--ink) / 0.07)" />
                    <path d="M0 70 Q40 40 80 70 T160 70" fill="none" stroke="rgb(var(--ink) / 0.05)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-contours)" />
              </svg>
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-ember text-on-ember">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="relative font-serif text-[24px] text-ink">{boarding.name}</span>
              <span className="relative text-[14px] text-soft transition-colors duration-160 group-hover:text-ink">Load the interactive map</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
