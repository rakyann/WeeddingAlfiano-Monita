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
      <body className="antialiased min-h-screen bg-[#0b182b] flex justify-center items-center">
        <div className="mobile-frame-container shadow-2xl relative">
          {children}
        </div>
      </body>
    </html>
  );
}
