import { PageHero } from '@/components/sections/PageHero';
import { Placeholder } from '@/components/ui/Placeholder';
import { brand } from '@/config/brand';
import { photo, photoLibrary } from '@/config/photos';
import { pageMetadata } from '@/utils/seo';

export const metadata = pageMetadata({
  title: 'Terms, Privacy and Cancellation Policy',
  description: `Terms and conditions, privacy policy and cancellation policy for ${brand.name}.`,
  path: '/policies',
});

/** DRAFT POLICIES — to be reviewed and finalised by the business before launch. */
const sections = [
  {
    id: 'terms',
    title: 'Terms and conditions',
    body: [
      `Enquiries sent through this website are requests only. A booking with ${brand.name} is confirmed only when our team replies on WhatsApp confirming the date, time, fare and boarding details.`,
      'Trips operate subject to sea and weather conditions, instructions from port or other authorities, and vessel availability. Routes, beach views and stops may change on the day for safety.',
      'Guests must follow crew instructions at all times while boarding, on board and disembarking.',
      'Dolphin and wildlife sightings are never guaranteed.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy policy',
    body: [
      'This website has no user accounts and does not store your booking details on a server. When you submit the booking form, your details are placed into a WhatsApp message on your own device, which you choose to send.',
      'Information you send us on WhatsApp is used only to respond to your enquiry and manage your booking.',
      'The site stores your theme preference in your browser’s local storage. The map in the Boarding section is provided by Google Maps and loads only when you choose to open it.',
    ],
  },
  {
    id: 'cancellation',
    title: 'Cancellation and rescheduling',
    body: [
      'If a trip cannot operate because of unsafe weather or sea conditions, we will contact you on WhatsApp to reschedule or discuss the options available.',
      'Guest cancellation and rescheduling terms, including any notice period, charges or refunds, are shared on WhatsApp before you confirm your booking.',
      '[Placeholder: insert the operator’s exact cancellation terms here.]',
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        kicker="Policies"
        title="The fine print"
        image={photo('aghanashini-river')}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Policies' }]}
      >
        <Placeholder label="Draft policies, to be finalised by the business" onScene className="rise rise-4 mt-6" />
      </PageHero>
      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <nav aria-label="Policies" className="lg:col-span-3">
            <ul className="space-y-2 lg:sticky lg:top-24">
              {[...sections, { id: 'credits', title: 'Photo credits' }].map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[15px] text-soft transition-colors duration-160 hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-8">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-subtitle">{s.title}</h2>
                <div className="mt-5 max-w-[40rem] space-y-4 text-[16px] leading-[1.7] text-soft">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
            <article id="credits" className="scroll-mt-24">
              <h2 className="text-subtitle">Photo credits</h2>
              <p className="mt-5 max-w-[40rem] text-[16px] leading-[1.7] text-soft">
                Boat and facility photos are our own. Location photos of Gokarna are from Wikimedia Commons, used under the licences below.
              </p>
              <ul className="mt-6 border-t border-ink/[0.08] text-[14px]">
                {Object.entries(photoLibrary).map(([slug, p]) => (
                  <li key={slug} className="grid gap-1 border-b border-ink/[0.08] py-3 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <span className="text-ink">{p.alt}</span>
                    <span className="text-mute">
                      {p.credit.source ? (
                        <a href={p.credit.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                          {p.credit.author}
                        </a>
                      ) : (
                        p.credit.author
                      )}
                      {' · '}
                      {'licenseUrl' in p.credit && p.credit.licenseUrl ? (
                        <a href={p.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                          {p.credit.license}
                        </a>
                      ) : (
                        p.credit.license
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
