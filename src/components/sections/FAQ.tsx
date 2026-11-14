import { Plus } from 'lucide-react';
import { buttonClass } from '@/components/ui/button';
import { Placeholder } from '@/components/ui/Placeholder';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { faqs } from '@/config/faq';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

/** Native <details> accordion — accessible, works without JS and fully indexable. */
export function FAQ({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-ink/[0.08] py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28" data-reveal>
            <p className="kicker mb-4">Questions</p>
            <h2 id="faq-title" className="text-title">
              Good to know before you board
            </h2>
            <p className="mt-5 text-[17px] leading-[1.65] text-soft">Can’t find your answer? Message us and a person from our team replies.</p>
            <a href={buildWhatsAppUrl('Hello, I have a question about your Gokarna boat tours.')} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'md', 'mt-8')}>
              <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
        </div>
        <div className="border-t border-ink/[0.08] lg:col-span-8">
          {list.map((f, i) => (
            <details key={f.id} className="group border-b border-ink/[0.08]" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] font-medium leading-[1.4] text-ink transition-colors duration-160 hover:text-ember-ink [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-[17px] font-medium">{f.question}</h3>
                <Plus className="mt-0.5 h-[18px] w-[18px] shrink-0 text-mute transition-transform duration-160 group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <div className="pb-6 pr-10">
                <p className="text-[15px] leading-[1.65] text-soft">{f.answer}</p>
                {f.needsConfirmation && <Placeholder label="Draft answer, to confirm" className="mt-3" />}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
