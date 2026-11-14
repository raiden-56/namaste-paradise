import { whatsappConfig } from '../config/whatsapp';
import { getPackageById } from '../config/packages';
import type { BookingRequest } from '../types';

/** Build a wa.me link with a properly encoded, prefilled message. */
export function buildWhatsAppUrl(message: string = whatsappConfig.defaultMessage): string {
  return `https://wa.me/${whatsappConfig.number}?text=${encodeURIComponent(message)}`;
}

/** Quick enquiry used by package-card WhatsApp buttons. */
export function buildPackageEnquiry(packageName: string): string {
  return [
    'Hello! I would like to enquire about a Gokarna boat tour.',
    '',
    `Package: ${packageName}`,
    '',
    'Please share the availability, pricing, duration and boarding details.',
    '',
    'Thank you!',
  ].join('\n');
}

/** Formats an ISO date (yyyy-mm-dd) as e.g. "Sat, 14 Dec 2026". */
export function formatTravelDate(iso: string): string {
  if (!iso) return 'Flexible';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/** Full booking request message from the booking form. */
export function buildBookingMessage(req: BookingRequest): string {
  const pkg = getPackageById(req.packageId);
  const lines = [
    'Hello! I would like to enquire about booking a Gokarna boat tour.',
    '',
    `Name: ${req.name.trim()}`,
    `WhatsApp: ${req.whatsapp.trim()}`,
    `Package: ${pkg?.name ?? 'Not sure yet — please suggest'}`,
    `Travel Date: ${formatTravelDate(req.date)}`,
    `Preferred Time: ${req.time || 'Flexible'}`,
    `Adults: ${req.adults}`,
    `Children: ${req.children}`,
    `Special Requirements: ${req.requirements.trim() || 'None'}`,
    '',
    'Please share the availability, pricing and boarding details.',
    '',
    'Thank you!',
  ];
  return lines.join('\n');
}

/**
 * Opens WhatsApp. Uses a new tab on desktop (keeps the site open) and the
 * same tab on touch devices, where wa.me hands off to the WhatsApp app.
 */
export function openWhatsApp(url: string): void {
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) {
    window.location.href = url;
    return;
  }
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url; // popup blocked → fall back
}
