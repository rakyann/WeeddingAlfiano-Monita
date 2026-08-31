import type { Metadata } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://weedding-alfiano-monita.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'The Wedding of Alifano & Monita',
  description: 'Undangan Pernikahan Digital Alifano & Monita - 13 September 2026',
  openGraph: {
    title: 'The Wedding of Alifano & Monita',
    description: 'Undangan Pernikahan Digital Alifano & Monita',
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caudex:ital,wght@0,400;0,700;1,400;1,700&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
