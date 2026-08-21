'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck } from 'lucide-react';

interface GuestQRCodeProps {
  guestName: string;
  tableNumber: string | null;
}

export const GuestQRCode: React.FC<GuestQRCodeProps> = ({ guestName, tableNumber }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wedding-invitation-app.vercel.app';
  const qrData = `${siteUrl}/scan?token=${encodeURIComponent(guestName)}`;

  return (
    <section className="relative py-14 px-6 bg-[#3B2B24] text-[#FAF6F0]">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            VENUE ACCESS PASS
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            QR Code Check-in
          </h2>
          <p className="text-xs text-[#D8C6B9] mt-2">
            Tunjukkan QR Code ini kepada Usher saat tiba di venue untuk verifikasi kedatangan.
          </p>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-3" />
        </div>

        <div className="paper-card p-6 relative max-w-xs mx-auto text-center shadow-2xl">
          <div className="pearl-pin" />

          <div className="p-4 bg-white rounded-2xl shadow-inner inline-block border border-[#C5A059]/40">
            <QRCodeSVG
              value={qrData}
              size={180}
              bgColor="#FFFFFF"
              fgColor="#2D1E18"
              level="H"
              includeMargin={false}
            />
          </div>

          <h3 className="font-serif text-xl font-bold text-[#2C1D18] mt-4">
            {guestName}
          </h3>

          {tableNumber && (
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-[#2D1E18] text-[#C5A059] text-xs font-bold uppercase">
              MEJA: {tableNumber}
            </span>
          )}

          <div className="flex items-center justify-center gap-1 text-[11px] text-[#5A453C] mt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span>Digital Pass Tiket Resepsi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
