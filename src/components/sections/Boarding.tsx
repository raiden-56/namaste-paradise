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
    <section id="location" aria-labelledby="location-title" className="relative border-t border-ink/[0.08] py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="mb-5 flex items-center gap-3">
            <span className="kicker">Boarding</span>
          </p>
          <h2 id="location-title" className="text-title">
            Where your trip begins
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-[16px] text-soft">
            Departing from <span className="text-ink">{boarding.name}</span>
            {boarding.isPlaceholder && <Placeholder label="Confirm boarding point" />}
          </div>
          <p className="mt-6 border-l-2 border-glow pl-4 text-[14px] leading-[1.65] text-ink">{boarding.explainer}</p>
          <dl className="mt-8 space-y-2">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="grid grid-cols-[36px_80px_1fr] items-start gap-3 rounded-[16px] border border-ink/[0.06] bg-card/60 px-3 py-3 text-[14px]">
                <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-raised">
                  <Icon className="h-4 w-4 text-glow" strokeWidth={1.5} />
                </span>
                <dt className="pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">{label}</dt>
                <dd className="pt-1.5 leading-[1.55] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" data-magnetic className={buttonClass('glow', 'lg', 'mt-8 w-full sm:w-auto')}>
            <Navigation className="h-4 w-4" strokeWidth={1.75} /> Get directions
          </a>
        </div>

        <div className="relative min-h-[380px] overflow-hidden rounded-panel border border-ink/[0.08] bg-card lg:col-span-7 lg:min-h-[600px]" data-reveal>
          {map ? (
            <iframe title={`Map of ${boarding.name}`} src={mapsEmbedUrl} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          ) : (
            <button type="button" onClick={() => setMap(true)} className="group absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden p-8 text-center" aria-label="Load interactive Google Map">
              <span aria-hidden className="grid-bg absolute inset-0" />
              {/* radar */}
              <span aria-hidden className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2">
                {[1, 0.72, 0.46].map((s) => (
                  <span key={s} className="absolute inset-0 m-auto rounded-full border border-glow/15" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
                ))}
                <span className="absolute inset-0 animate-sweep rounded-full" style={{ background: 'conic-gradient(from 0deg, rgb(var(--glow) / 0.28), transparent 25%)' }} />
                <span className="absolute left-1/2 top-0 h-full w-px bg-glow/10" />
                <span className="absolute left-0 top-1/2 h-px w-full bg-glow/10" />
              </span>
              <span className="relative grid h-14 w-14 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-glow/40" />
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-glow text-on-glow shadow-glow">
                  <MapPin className="h-6 w-6" strokeWidth={1.75} />
                </span>
              </span>
              <span className="relative font-display text-[26px] font-semibold uppercase tracking-[-0.02em] text-ink">{boarding.name}</span>
              <span className="glass relative rounded-full px-4 py-2 text-[13px] text-soft transition-colors duration-160 group-hover:border-glow/40 group-hover:text-ink">Load the interactive map</span>
              <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.16em] text-mute">Gokarna · Karnataka 581326</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
