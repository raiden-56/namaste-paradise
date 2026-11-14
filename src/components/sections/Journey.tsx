import { SectionHeader } from '@/components/ui/SectionHeader';

const steps = [
  { title: 'Choose your experience', text: 'Explore the available sightseeing and cruise packages.' },
  { title: 'Send your booking request', text: 'Pick a package and share your preferred date, number of guests and contact details.' },
  { title: 'Confirm with our team', text: 'We reply on WhatsApp to confirm availability, timing, fare and boarding details.' },
  { title: 'Enjoy Gokarna', text: 'Arrive at the confirmed boarding point and head out onto the water.' },
];

export function Journey() {
  return (
    <section id="how-it-works" aria-labelledby="journey-title" className="border-y border-ink/[0.08] bg-deep py-24 sm:py-32">
      <div className="wrap">
        <SectionHeader id="journey-title" kicker="How it works" title="From message to jetty in four steps">
          No accounts and no online payment. Just a conversation with our team on WhatsApp.
        </SectionHeader>

        <div className="relative mt-16" data-progress-root="">
          {/* rail: horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute left-[5px] top-2 h-[calc(100%-16px)] w-1 md:left-[calc(12.5%)] md:right-[calc(12.5%)] md:top-[5px] md:h-1 md:w-auto">
            <div className="route-dots hidden md:block" data-progress="x" />
            <div
              className="h-full w-1 origin-top md:hidden"
              style={{ background: 'radial-gradient(circle, rgb(var(--ember)) 1.3px, transparent 1.8px) 50% 0 / 4px 9px repeat-y' }}
              data-progress="y"
            />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-6 md:flex-col md:items-center md:text-center" data-reveal>
                <span className={`relative h-[14px] w-[14px] shrink-0 rounded-full border-2 border-ember ${i === steps.length - 1 ? 'bg-ember' : 'bg-deep'}`} />
                <div className="-mt-1 md:mt-6 md:px-2">
                  <p className="font-mono text-[13px] text-mute">Step {i + 1}</p>
                  <h3 className="mt-2 text-[24px] leading-[1.2]">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-16 max-w-[36rem] rounded-card border border-ember/30 bg-ember/[0.06] px-5 py-4 text-[15px] leading-[1.6] text-ink" data-reveal>
          Your booking is confirmed only after our team replies on WhatsApp and confirms availability.
        </p>
      </div>
    </section>
  );
}
