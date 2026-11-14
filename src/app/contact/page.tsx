import { Clock, Instagram, Mail, PhoneCall } from 'lucide-react';
import { BookingForm } from '@/components/booking/BookingForm';
import { Boarding } from '@/components/sections/Boarding';
import { FAQ } from '@/components/sections/FAQ';
import { PageHero } from '@/components/sections/PageHero';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { contact, social } from '@/config/brand';
import { photo } from '@/config/photos';
import { pageMetadata } from '@/utils/seo';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

export const metadata = pageMetadata({
  title: 'Contact and Book a Gokarna Boat Tour on WhatsApp',
  description:
    'Send a Gokarna boat tour booking request on WhatsApp. Share your date, package and group size — our team confirms availability, fare and boarding details.',
  path: '/contact',
});

export default function ContactPage() {
  const channels = [
    { icon: WhatsAppIcon, title: 'WhatsApp', value: contact.phoneDisplay, href: buildWhatsAppUrl(), note: 'Fastest way to book' },
    { icon: Instagram, title: 'Instagram', value: social.instagramHandle, href: social.instagram, note: 'Trips and updates' },
    ...(contact.email ? [{ icon: Mail, title: 'Email', value: contact.email, href: `mailto:${contact.email}`, note: 'Group enquiries' }] : []),
  ];

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Plan your day at sea"
        description="Send a request below. It opens WhatsApp with everything filled in, and a person from our team replies."
        image={photo('npc-sea-sun')}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="kicker mb-4">Reach us</p>
            <h2 className="text-title">Talk to our team</h2>
            <p className="mt-5 text-[17px] leading-[1.65] text-soft">{contact.responseTime}</p>
            <ul className="mt-10 border-t border-ink/[0.08]">
              {channels.map(({ icon: Icon, title, value, href, note }) => (
                <li key={title} className="border-b border-ink/[0.08]">
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[18px_1fr_auto] items-center gap-4 py-5">
                    <Icon className="h-[18px] w-[18px] text-mute" />
                    <span>
                      <span className="block text-[13px] text-mute">{title}</span>
                      <span className="mt-0.5 block text-[16px] text-ink transition-colors duration-160 group-hover:text-ember-ink">{value}</span>
                    </span>
                    <span className="hidden text-[13px] text-mute sm:block">{note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 text-[15px] text-soft">
              <p className="flex items-center gap-3">
                <Clock className="h-[18px] w-[18px] text-mute" strokeWidth={1.5} /> {contact.operatingHours}
              </p>
              <p className="flex items-center gap-3">
                <PhoneCall className="h-[18px] w-[18px] text-mute" strokeWidth={1.5} /> Emergency: {contact.emergencyContact}
              </p>
            </div>
          </div>

          <div className="rounded-panel border border-ink/[0.08] bg-card p-6 sm:p-10 lg:col-span-7">
            <h2 className="text-subtitle">Send a booking request</h2>
            <p className="mb-8 mt-2 text-[15px] text-soft">Confirmed only after our team replies on WhatsApp</p>
            <BookingForm />
          </div>
        </div>
      </section>

      <Boarding />
      <FAQ limit={5} />
    </>
  );
}
