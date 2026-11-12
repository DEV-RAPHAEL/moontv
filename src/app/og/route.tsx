import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export function GET() {
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
          background: 'linear-gradient(135deg, #050b07 0%, #08170c 55%, #0c2112 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: 18,
              background: '#d8b642',
              color: '#050b07',
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: 6 }}>
            MOON TV
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            Stories that unite a nation
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 30,
              color: '#a3b8aa',
              maxWidth: 940,
            }}
          >
            Nigeria&apos;s national cultural broadcaster - programmes, schedule and stories.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', width: 120, height: 6, background: '#d8b642' }} />
          <div style={{ display: 'flex', fontSize: 28, color: '#a3b8aa' }}>moontvonline.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
