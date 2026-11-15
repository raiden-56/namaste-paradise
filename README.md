# Namaste Paradise Cruise — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS · GSAP + Framer Motion. Every page is statically pre-rendered for SEO. No backend: all bookings go to WhatsApp.

## Run

```bash
npm install
npm run dev        # http://localhost:3001  (3000 is used by another local project)
npm run build && npm start
```

## Edit content (no component changes needed)

| What | File |
| --- | --- |
| Business name, phones, email, address, social, Google rating | `src/config/brand.ts` |
| **WhatsApp number** and time slots | `src/config/whatsapp.ts` |
| Packages, prices, durations, routes | `src/config/packages.ts` |
| Experiences, destinations, gallery | `src/config/experiences.ts`, `destinations.ts`, `gallery.ts` |
| Reviews, FAQ, safety, amenities | `src/config/testimonials.ts`, `faq.ts`, `safety.ts`, `site.ts` |
| Photos and their credits | `src/config/photos.ts` + files in `public/images/` |

To add a photo, put an optimized `.webp` in `public/images/` and add an entry in `src/config/photos.ts`. `next/image` serves AVIF/WebP at the right size automatically.

## Before launch, confirm

- `91 95358 71114` is the WhatsApp number (`src/config/whatsapp.ts`).
- Items tagged "To confirm" on the site (night cruise and group prices, children, cancellation). When everything is verified, set `showPlaceholderMarkers: false` in `src/config/brand.ts`.
- The Google rating and review count in `brand.ts`.

## Photos

- `npc-*`, `coast-*` and `gokarna-sunset` files: the business's own photos (from namasteparadisecruise.com and trip photos taken in Nov 2026).
- All other location photos: Wikimedia Commons, under CC BY / CC BY-SA / CC0 / public domain. They're credited on `/policies#credits`, which the licences require, so keep that page.
