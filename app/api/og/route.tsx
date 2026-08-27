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
            backgroundColor: '#fff8e8',
            fontFamily: 'serif',
            color: '#455645',
            padding: '40px',
            border: '14px solid #455645',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              letterSpacing: '6px',
              color: '#c5617a',
              textTransform: 'uppercase',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            THE WEDDING INVITATION OF
          </div>

          <div
            style={{
              fontSize: '68px',
              fontWeight: 'bold',
              color: '#2e4a00',
              margin: '10px 0',
            }}
          >
            Alifano &amp; Monita
          </div>

          <div
            style={{
              width: '120px',
              height: '3px',
              backgroundColor: '#c5617a',
              margin: '20px 0',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '20px 48px',
              border: '2px solid #eeddc9',
              boxShadow: '0 8px 24px rgba(69, 86, 69, 0.08)',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                color: '#637663',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 'bold',
                color: '#2e4a00',
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
