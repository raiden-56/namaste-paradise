import { Anchor, CalendarCheck, MessageCircle, Sailboat } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const steps = [
  { title: 'Choose your experience', text: 'Explore the available sightseeing and cruise packages.', icon: Sailboat },
  { title: 'Send your booking request', text: 'Pick a package and share your preferred date, number of guests and contact details.', icon: MessageCircle },
  { title: 'Confirm with our team', text: 'We reply on WhatsApp to confirm availability, timing, fare and boarding details.', icon: CalendarCheck },
  { title: 'Enjoy Gokarna', text: 'Arrive at the confirmed boarding point and head out onto the water.', icon: Anchor },
];

export function Journey() {
  return (
    <section id="how-it-works" aria-labelledby="journey-title" className="relative overflow-hidden border-y border-ink/[0.08] bg-deep py-24 sm:py-32">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
      <div className="wrap relative">
        <SectionHeader id="journey-title" kicker="How it works" title="From message to jetty in four steps" align="center">
          No accounts and no online payment. Just a conversation with our team on WhatsApp.
        </SectionHeader>

        <div className="relative mt-16" data-progress-root="">
          {/* signal line: horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute left-[27px] top-0 h-full w-px bg-ink/10 md:left-[12.5%] md:right-[12.5%] md:top-[27px] md:h-px md:w-auto">
            <div className="hidden h-px w-full origin-left bg-gradient-to-r from-glow to-violet shadow-[0_0_10px_rgb(var(--glow))] md:block" data-progress="x" />
            <div className="h-full w-px origin-top bg-gradient-to-b from-glow to-violet md:hidden" data-progress="y" />
          </div>

          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-5">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="group flex gap-5 md:flex-col md:items-center md:text-center" data-reveal>
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-glow/40 bg-deep shadow-[0_0_0_6px_rgb(var(--deep))] transition-[background-color,box-shadow] duration-400 group-hover:bg-glow/15 group-hover:shadow-[0_0_0_6px_rgb(var(--deep)),0_0_28px_rgb(var(--glow)/0.5)]">
                    <Icon className="h-5 w-5 text-glow" strokeWidth={1.5} />
                  </span>
                  <div data-spot="" className="spot spot-border relative w-full overflow-hidden rounded-card border border-ink/[0.08] bg-card/60 p-6 md:mt-6">
                    <span aria-hidden className="text-outline pointer-events-none absolute -right-2 -top-4 font-display text-[88px] font-bold leading-none">
                      {i + 1}
                    </span>
                    <p className="relative font-mono text-[11px] uppercase tracking-[0.16em] text-glow-ink">Step {String(i + 1).padStart(2, '0')}</p>
                    <h3 className="relative mt-3 font-display text-[18px] font-medium leading-[1.2] tracking-[-0.02em]">{s.title}</h3>
                    <p className="relative mt-2 text-[14px] leading-[1.6] text-soft">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mx-auto mt-14 flex max-w-[40rem] items-center justify-center gap-3 rounded-full border border-glow/30 bg-glow/[0.06] px-5 py-3 text-center text-[14px] leading-[1.5] text-ink" data-reveal>
          <span className="h-2 w-2 shrink-0 animate-blink rounded-full bg-glow" />
          Your booking is confirmed only after our team replies on WhatsApp and confirms availability.
        </p>
      </div>
    </section>
  );
}
