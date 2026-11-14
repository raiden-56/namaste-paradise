import { ImageResponse } from 'next/og';
import { brand } from '@/config/brand';
export const dynamic = 'force-static';

export const alt = `${brand.name} — boat tours and mini cruises in Gokarna`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social share card generated at build time (replace with a real photo later if preferred). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#eaf6f8',
          backgroundColor: '#040a11',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(52,240,214,0.35), transparent 45%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }}>
          <div style={{ width: 40, height: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#34f0d6' }} />
          {brand.name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -2, maxWidth: 900 }}>Discover Gokarna beyond the shore</div>
          <div style={{ fontSize: 30, opacity: 0.8 }}>Boat tours and mini cruises · book on WhatsApp</div>
        </div>
      </div>
    ),
    size,
  );
}
