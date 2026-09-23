import { ImageResponse } from 'next/og';
import { WORDMARK } from '@/components/ui/logo-paths';

export const alt = 'MONVEX – Building what’s next.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  const ww = 1000;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#F6F5F1', padding: 80, color: '#0B0B0D', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 24, color: '#55575D', letterSpacing: 4 }}>MONVEX UG (HAFTUNGSBESCHRÄNKT)</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <svg width={ww} height={(ww * WORDMARK.height) / WORDMARK.width} viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`}>
            <path d={WORDMARK.ember} fill="#FF4A1C" />
            <path d={WORDMARK.ink} fill="#0B0B0D" />
          </svg>
          <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: -2, marginTop: 44, display: 'flex' }}>
            BUILDING WHAT’S&nbsp;<span style={{ color: '#FF4A1C' }}>NEXT.</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#55575D' }}>
          <div>Marken · Produkte · Unternehmen · Geschäftsmodelle</div>
          <div>Bremen · Est. 2026</div>
        </div>
      </div>
    ),
    size,
  );
}
