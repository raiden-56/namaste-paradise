import { brand, contact, site, social } from '@/config/brand';
import { faqs } from '@/config/faq';
import { isWhatsAppConfigured, WHATSAPP_NUMBER } from '@/config/whatsapp';
import { activePackages } from '@/config/packages';
import type { TourPackage } from '@/types';

/** LocalBusiness / TravelAgency schema — only includes details that are actually configured. */
export function localBusinessSchema() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TravelAgency'],
    '@id': `${site.url}/#business`,
    name: brand.legalName,
    alternateName: brand.name,
    description: brand.description,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    areaServed: { '@type': 'Place', name: 'Gokarna, Karnataka, India' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Union Bank, Main Road, Tadadi',
      addressLocality: 'Gokarna',
      postalCode: '581326',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    knowsAbout: ['Gokarna boat ride', 'Gokarna mini cruise', 'Om Beach', 'Half Moon Beach', 'Paradise Beach', 'Dolphin watching'],
  };
  data.telephone = contact.phones[0].replace(/\s/g, '');
  if (isWhatsAppConfigured) data.contactPoint = { '@type': 'ContactPoint', telephone: `+${WHATSAPP_NUMBER}`, contactType: 'reservations', availableLanguage: ['en', 'hi', 'kn'] };
  if (contact.email) data.email = contact.email;
  data.sameAs = [social.instagram, social.facebook];
  data.priceRange = '₹799–₹999 per person';
  data.makesOffer = activePackages.filter((p) => p.price).map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: p.price!.replace(/[^0-9]/g, ''),
    priceCurrency: 'INR',
    url: `${site.url}/packages/${p.slug}`,
  }));
  return data;
}

export function websiteSchema() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: brand.name, url: site.url, inLanguage: 'en-IN' };
}

export function tourSchema(pkg: TourPackage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `${pkg.name} — Gokarna boat tour`,
    description: pkg.description,
    touristType: pkg.bestFor,
    url: `${site.url}/packages/${pkg.slug}`,
    provider: { '@id': `${site.url}/#business`, '@type': 'LocalBusiness', name: brand.legalName },
    ...(pkg.price ? { offers: { '@type': 'Offer', price: pkg.price.replace(/[^0-9]/g, ''), priceCurrency: 'INR', url: `${site.url}/packages/${pkg.slug}` } } : {}),
    itinerary: {
      '@type': 'ItemList',
      itemListElement: pkg.highlights.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: h })),
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

/** FAQ schema — emitted only once answers are confirmed (site.emitFaqSchema). */
export function faqSchema() {
  if (!site.emitFaqSchema) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs
      .filter((f) => !f.needsConfirmation)
      .map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
}
