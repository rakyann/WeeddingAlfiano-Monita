'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck } from 'lucide-react';

interface GuestQRCodeProps {
  guestName: string;
  tableNumber: string | null;
}

export const GuestQRCode: React.FC<GuestQRCodeProps> = ({ guestName, tableNumber }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://weedding-alfiano-monita.vercel.app';
  const qrData = `${siteUrl}/scan?token=${encodeURIComponent(guestName)}`;

  return (
    <section className="w-full bg-cream py-14 px-6">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div>
          <span className="font-serif text-xs text-navy-accent tracking-[0.25em] uppercase">
            VENUE ACCESS PASS
          </span>
          <h2 className="font-script text-4xl text-navy-deep mt-1">QR Code Check-in</h2>
          <p className="text-xs text-ink/60 mt-2 font-serif">
            Tunjukkan QR Code ini kepada Usher saat tiba di venue.
          </p>
          <div className="w-16 h-[1px] bg-navy-deep/20 mx-auto mt-3" />
        </div>

        <div className="bg-white border border-navy-deep/10 rounded-xl p-6 max-w-xs mx-auto shadow-sm">
          <div className="p-4 bg-white rounded-xl shadow-inner inline-block border border-navy-deep/10">
            <QRCodeSVG
              value={qrData}
              size={180}
              bgColor="#FFFFFF"
              fgColor="#17335C"
              level="H"
              includeMargin={false}
            />
          </div>

          <h3 className="font-serif-title text-xl font-bold text-navy-deep mt-4">{guestName}</h3>

          {tableNumber && (
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-navy-deep text-cream text-xs font-bold uppercase">
              MEJA: {tableNumber}
            </span>
          )}

          <div className="flex items-center justify-center gap-1 text-[11px] text-ink/50 mt-3 font-serif">
            <ShieldCheck className="w-3.5 h-3.5 text-navy-accent" />
            <span>Digital Pass Tiket Resepsi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
