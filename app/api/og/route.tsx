import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const toParam = searchParams.get('to');
    const guestName = toParam ? decodeURIComponent(toParam) : 'Tamu Undangan';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#17335C',
            backgroundImage: 'radial-gradient(circle at center, #3E5C8A 0%, #17335C 100%)',
            fontFamily: 'serif',
            color: '#F7F3EA',
            padding: '40px',
            border: '12px solid #D4AF37',
            boxSizing: 'border-box',
          }}
        >
          {/* Header Subtitle */}
          <div
            style={{
              fontSize: '18px',
              letterSpacing: '6px',
              color: '#D4AF37',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            THE WEDDING INVITATION OF
          </div>

          {/* Couple Names */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#F7F3EA',
              margin: '10px 0',
            }}
          >
            Romeo &amp; Juliet
          </div>

          <div
            style={{
              width: '120px',
              height: '2px',
              backgroundColor: '#D4AF37',
              margin: '20px 0',
            }}
          />

          {/* Guest Greeting Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '20px 40px',
              border: '1px solid rgba(212, 175, 55, 0.5)',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                color: '#B7C7E3',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#D4AF37',
              }}
            >
              {guestName}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}
