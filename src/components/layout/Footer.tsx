import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { buttonClass } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { boarding, brand, contact, social } from '@/config/brand';
import { activePackages } from '@/config/packages';
import { navItems } from '@/config/site';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.08] bg-deep pb-24 pt-16 md:pb-10">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-[22rem] text-[14px] leading-[1.6] text-soft">{brand.description}</p>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'md', 'mt-6')}>
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp {contact.phoneDisplay}
            </a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="font-sans text-[14px] font-medium text-ink">Explore</h2>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {navItems.map((n) => (
                  <li key={n.to}>
                    <Link href={n.to} className="text-soft transition-colors duration-160 hover:text-ink">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-[14px] font-medium text-ink">Tour packages</h2>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {activePackages.map((p) => (
                  <li key={p.id}>
                    <Link href={`/packages/${p.slug}`} className="text-soft transition-colors duration-160 hover:text-ink">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-sans text-[14px] font-medium text-ink">Contact</h2>
              <ul className="mt-4 space-y-3 text-[14px] text-soft">
                <li>
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors duration-160 hover:text-ink">
                    <WhatsAppIcon className="h-4 w-4 text-mute" /> WhatsApp booking
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mute" strokeWidth={1.5} />
                  <span>
                    Near Union Bank, {boarding.name}
                    <br />
                    Gokarna, Karnataka 581326
                  </span>
                </li>
                <li>
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors duration-160 hover:text-ink">
                    <Instagram className="h-4 w-4 text-mute" strokeWidth={1.5} /> {social.instagramHandle}
                  </a>
                </li>
                <li>
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors duration-160 hover:text-ink">
                    <Facebook className="h-4 w-4 text-mute" strokeWidth={1.5} /> Facebook
                  </a>
                </li>
                {contact.phones.map((ph) => (
                  <li key={ph}>
                    <a href={`tel:${ph.replace(/\s/g, '')}`} className="inline-flex items-center gap-2.5 transition-colors duration-160 hover:text-ink">
                      <Phone className="h-4 w-4 text-mute" strokeWidth={1.5} /> {ph}
                    </a>
                  </li>
                ))}
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="hover:text-ink">
                      {contact.email}
                    </a>
                  </li>
                )}
                <li className="text-[13px] text-mute">{contact.operatingHours}</li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-ink/[0.08] pt-6 text-[13px] text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/policies#terms" className="hover:text-ink">Terms and conditions</Link>
            </li>
            <li>
              <Link href="/policies#privacy" className="hover:text-ink">Privacy policy</Link>
            </li>
            <li>
              <Link href="/policies#cancellation" className="hover:text-ink">Cancellation policy</Link>
            </li>
            <li>
              <Link href="/policies#credits" className="hover:text-ink">Photo credits</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
