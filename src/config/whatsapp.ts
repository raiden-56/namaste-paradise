/**
 * ============================================================
 *  WHATSAPP CONFIGURATION — the ONLY place the number lives
 * ============================================================
 *  Country code + number, digits only. 9535871114 is the main number on
 *  namasteparadisecruise.com — CONFIRM it is the WhatsApp number (the other
 *  listed number is 9535971114).
 */
export const WHATSAPP_NUMBER = '919535871114';

export const whatsappConfig = {
  number: WHATSAPP_NUMBER,
  defaultMessage:
    'Hello Namaste Paradise Cruise! I would like to know more about your Gokarna boat trips. Could you share availability, prices and boarding details?',
  /** Departure slots from the business's package details. */
  timeSlots: ['Morning, 08:30–11:30', 'Afternoon, 14:30–17:30', 'Sunset or night cruise', "I'm flexible"],
  maxGuests: 60,
} as const;

export const isWhatsAppConfigured = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
