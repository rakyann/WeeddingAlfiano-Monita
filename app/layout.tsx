import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Wedding of Alifano & Monita',
  description: 'Undangan Pernikahan Digital Alifano & Monita',
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
      <body className="antialiased min-h-screen bg-navy-deep flex justify-center items-start">
        <div className="mobile-frame-container shadow-deep relative">
          {children}
        </div>
      </body>
    </html>
  );
}
