import { Placeholder } from '@/components/ui/Placeholder';
import { safetyItems } from '@/config/safety';

export function Safety() {
  return (
    <section id="safety" aria-labelledby="safety-title" className="border-t border-ink/[0.08] py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" data-reveal>
          <p className="kicker mb-4">Before you sail</p>
          <h2 id="safety-title" className="text-title">
            The sea sets the schedule
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-soft">
            Trips run only when sea and weather conditions allow. Routes, stops and timings are confirmed on WhatsApp and may change on the day for
            safety.
          </p>
        </div>
        <dl className="lg:col-span-8">
          {safetyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="grid gap-2 border-t border-ink/[0.08] py-5 sm:grid-cols-[240px_1fr] sm:gap-8" data-reveal>
                <dt className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
                  <Icon className="h-[18px] w-[18px] shrink-0 text-mute" strokeWidth={1.5} />
                  {item.title}
                </dt>
                <dd className="flex flex-wrap items-start justify-between gap-3 text-[15px] leading-[1.6] text-soft">
                  <span className="max-w-[32rem]">{item.detail}</span>
                  {item.needsConfirmation && <Placeholder label="To confirm" />}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
