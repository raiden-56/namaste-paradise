import { whatsappConfig } from '../config/whatsapp';
import type { BookingRequest } from '../types';

export type BookingErrors = Partial<Record<keyof BookingRequest | 'guests', string>>;

export function todayISO(): string {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
}

export function validateBooking(v: BookingRequest): BookingErrors {
  const e: BookingErrors = {};

  const name = v.name.trim();
  if (!name) e.name = 'Please enter your full name.';
  else if (name.length < 2) e.name = 'Name looks too short.';
  else if (!/^[\p{L}\p{M}' .-]+$/u.test(name)) e.name = 'Please use letters only.';

  const digits = v.whatsapp.replace(/[\s()-]/g, '');
  if (!digits) e.whatsapp = 'We need your WhatsApp number to reply.';
  else if (!/^\+?\d{10,15}$/.test(digits)) e.whatsapp = 'Enter a valid number, e.g. +91 98765 43210.';

  if (!v.packageId) e.packageId = 'Choose an experience (or “Not sure yet”).';

  if (!v.date) e.date = 'Select your preferred date.';
  else if (v.date < todayISO()) e.date = 'Please choose today or a future date.';

  if (!v.time) e.time = 'Select a preferred time.';

  if (!Number.isInteger(v.adults) || v.adults < 1) e.adults = 'At least 1 adult is required.';
  if (!Number.isInteger(v.children) || v.children < 0) e.children = 'Enter 0 or more.';
  if (v.adults + v.children > whatsappConfig.maxGuests)
    e.guests = `For groups over ${whatsappConfig.maxGuests}, please chat with us directly on WhatsApp.`;

  if (v.requirements.length > 500) e.requirements = 'Please keep this under 500 characters.';

  return e;
}
