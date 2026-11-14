import { whyChooseUs } from '@/config/site';

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="kicker mb-4">Why sail with us</p>
          <h2 id="why-title" className="text-title">
            Local waters, a friendly crew and booking that is just a conversation
          </h2>
          <p className="mt-6 max-w-[30rem] text-[14px] leading-[1.6] text-mute">
            Details on crew training, vessel equipment and permits are shared on request and listed here only once verified.
          </p>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {whyChooseUs.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.title} className="border-t border-ink/[0.08] py-6" data-reveal>
                <Icon className="h-[18px] w-[18px] text-mute" strokeWidth={1.5} />
                <h3 className="mt-4 font-sans text-[16px] font-medium text-ink">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-soft">{f.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
