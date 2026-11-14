import { ArrowUpRight, Facebook, Instagram, MapPin, Phone } from 'lucide-react';
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
    <footer className="relative overflow-hidden bg-deep pb-28 pt-20 md:pb-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[360px] w-[900px] -translate-x-1/2 rounded-full bg-glow/[0.06] blur-[120px]" />
      <div className="wrap relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-[22rem] text-[14px] leading-[1.7] text-soft">{brand.description}</p>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'md', 'mt-7')}>
              <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> WhatsApp {contact.phoneDisplay}
            </a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-mute">Explore</h2>
              <ul className="mt-5 space-y-3 text-[14px]">
                {navItems.map((n) => (
                  <li key={n.to}>
                    <Link href={n.to} className="group inline-flex items-center gap-1 text-soft transition-colors duration-160 hover:text-glow-ink">
                      {n.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-160 group-hover:opacity-100" strokeWidth={1.5} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-mute">Tour packages</h2>
              <ul className="mt-5 space-y-3 text-[14px]">
                {activePackages.map((p) => (
                  <li key={p.id}>
                    <Link href={`/packages/${p.slug}`} className="text-soft transition-colors duration-160 hover:text-glow-ink">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-mute">Contact</h2>
              <ul className="mt-5 space-y-3 text-[14px] text-soft">
                <li>
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors duration-160 hover:text-glow-ink">
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
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors duration-160 hover:text-glow-ink">
                    <Instagram className="h-4 w-4 text-mute" strokeWidth={1.5} /> {social.instagramHandle}
                  </a>
                </li>
                <li>
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors duration-160 hover:text-glow-ink">
                    <Facebook className="h-4 w-4 text-mute" strokeWidth={1.5} /> Facebook
                  </a>
                </li>
                {contact.phones.map((ph) => (
                  <li key={ph}>
                    <a href={`tel:${ph.replace(/\s/g, '')}`} className="inline-flex items-center gap-2.5 transition-colors duration-160 hover:text-glow-ink">
                      <Phone className="h-4 w-4 text-mute" strokeWidth={1.5} /> {ph}
                    </a>
                  </li>
                ))}
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="break-all hover:text-glow-ink">
                      {contact.email}
                    </a>
                  </li>
                )}
                <li className="text-[12px] text-mute">{contact.operatingHours}</li>
              </ul>
            </div>
          </nav>
        </div>

        {/* oversized wordmark */}
        <p aria-hidden className="text-outline mt-20 select-none text-center font-display text-[clamp(2.4rem,7vw,7.5rem)] sm:whitespace-nowrap font-bold uppercase leading-none tracking-[-0.05em]">
          Namaste Paradise
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink/[0.08] pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/policies#terms" className="hover:text-glow-ink">Terms</Link>
            </li>
            <li>
              <Link href="/policies#privacy" className="hover:text-glow-ink">Privacy</Link>
            </li>
            <li>
              <Link href="/policies#cancellation" className="hover:text-glow-ink">Cancellation</Link>
            </li>
            <li>
              <Link href="/policies#credits" className="hover:text-glow-ink">Photo credits</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
