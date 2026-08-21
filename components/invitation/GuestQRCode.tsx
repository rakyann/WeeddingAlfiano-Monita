'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, ShieldCheck } from 'lucide-react';
import { FloralDivider } from '../ui/FloralDecoration';

interface GuestQRCodeProps {
  guestName: string;
  tableNumber: string | null;
}

export const GuestQRCode: React.FC<GuestQRCodeProps> = ({ guestName, tableNumber }) => {
  // Generate a clean check-in token payload URL for Usher scanning
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wedding-invitation-app.vercel.app';
  const qrData = `${siteUrl}/scan?token=${encodeURIComponent(guestName)}`;

  return (
    <section className="relative py-14 px-6 bg-[#17335C] text-[#F7F3EA]">
      <div className="max-w-md mx-auto text-center">
        <span className="font-serif-title text-xs text-[#D4AF37] tracking-[0.2em]">
          VENUE ACCESS
        </span>
        <h2 className="font-script text-4xl text-[#F7F3EA] mt-1 mb-2">
          QR Code Check-in
        </h2>
        <p className="text-xs text-[#B7C7E3] mb-4">
          Tunjukkan QR Code ini kepada Usher saat tiba di venue untuk verifikasi kedatangan.
        </p>
        <FloralDivider color="#D4AF37" />

        {/* QR Box Container */}
        <div className="glass-panel p-6 rounded-3xl border-2 border-[#D4AF37]/50 max-w-xs mx-auto text-center shadow-2xl mt-6">
          <div className="p-4 bg-white rounded-2xl shadow-inner inline-block">
            <QRCodeSVG
              value={qrData}
              size={180}
              bgColor="#FFFFFF"
              fgColor="#17335C"
              level="H"
              includeMargin={false}
            />
          </div>

          <h3 className="font-serif text-lg font-bold text-[#F7F3EA] mt-4">
            {guestName}
          </h3>

          {tableNumber && (
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-[#D4AF37] text-[#17335C] text-xs font-bold uppercase">
              MEJA: {tableNumber}
            </span>
          )}

          <div className="flex items-center justify-center gap-1 text-[11px] text-[#B7C7E3] mt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Digital Pass Tiket Resepsi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
