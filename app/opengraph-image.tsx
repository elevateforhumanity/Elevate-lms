import { ImageResponse } from 'next/og';

// Note: OG images automatically use edge runtime for optimal performance
export const alt = 'Elevate for Humanity - Workforce Training & Career Development';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // For OG images, we need to use absolute URLs or inline the image
  // Using a solid color background with text overlay instead
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2563eb',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          Elevate for Humanity
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: 'center',
            padding: '0 60px',
            opacity: 0.9,
          }}
        >
          Workforce Training & Career Development
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
