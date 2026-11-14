import { whyChooseUs } from '@/config/site';

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32" data-reveal>
            <p className="mb-5 flex items-center gap-3">
              <span className="kicker">Why sail with us</span>
            </p>
            <h2 id="why-title" className="text-title">
              Local waters, a friendly crew and booking that is just a conversation
            </h2>
            <p className="mt-6 max-w-[30rem] text-[14px] leading-[1.65] text-mute">
              Details on crew training, vessel equipment and permits are shared on request and listed here only once verified.
            </p>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {whyChooseUs.map((f, i) => {
            const Icon = f.icon;
            return (
              <li key={f.title} data-reveal>
                <div data-spot="" data-tilt="4" className="spot spot-border group relative h-full overflow-hidden rounded-card border border-ink/[0.08] bg-card p-6 sm:p-7">
                  <div className="relative z-[3] flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-[14px] border border-ink/10 bg-raised transition-[border-color,background-color,box-shadow] duration-400 group-hover:border-glow/50 group-hover:bg-glow/10 group-hover:shadow-[0_0_24px_rgb(var(--glow)/0.35)]">
                      <Icon className="h-5 w-5 text-glow" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[11px] text-mute">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="relative z-[3] mt-8 font-display text-[17px] font-medium tracking-[-0.02em] text-ink">{f.title}</h3>
                  <p className="relative z-[3] mt-2 text-[14px] leading-[1.6] text-soft">{f.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
