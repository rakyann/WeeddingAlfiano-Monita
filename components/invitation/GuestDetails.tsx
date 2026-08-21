'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, QrCode, Shirt, Camera } from 'lucide-react';

export const GuestDetails: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState<boolean>(false);

  // 5 Oval Golden Framed Color Swatches matching reference design image
  const colorGuide = [
    { name: 'Black', hex: '#1A100C' },
    { name: 'Espresso', hex: '#36251E' },
    { name: 'Taupe', hex: '#7A6458' },
    { name: 'Gold', hex: '#C5A059' },
    { name: 'Cream', hex: '#FAF6F0' },
  ];

  const bankAccounts = [
    { bank: 'Bank BCA', number: '4240380175', owner: 'Alifano Dwi Cahyo' },
    { bank: 'Bank BNI', number: '0778824047', owner: 'Monita Ameliani Febriana' },
  ];

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedAccount(num);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <section className="relative py-14 px-6 bg-[#3B2B24] text-[#FAF6F0]">
      <div className="max-w-md mx-auto space-y-12 text-center">
        {/* --- DRESS CODE SECTION (Matching reference image golden ovals) --- */}
        <div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#2D1E18] text-[#C5A059] flex items-center justify-center mb-3 shadow">
            <Shirt className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            GUEST GUIDE
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            Dress Code &amp; Palette
          </h2>
          <p className="text-xs text-[#D8C6B9] mt-2 leading-relaxed max-w-xs mx-auto">
            Kami sangat mengharapkan Bapak/Ibu/Saudara/i dapat mengenakan busana dengan nuansa warna berikut:
          </p>

          {/* Golden Oval Framed Color Swatches (Exact reference design look) */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {colorGuide.map((col, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-9 h-14 rounded-[50%/45%] border-2 border-[#C5A059] shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                  style={{ backgroundColor: col.hex }}
                >
                  <div className="w-full h-full rounded-[50%/45%] border border-white/20" />
                </div>
                <span className="text-[10px] text-[#FAF6F0] font-serif tracking-wider">
                  {col.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-20 h-[1px] bg-[#C5A059]/40 mx-auto" />

        {/* --- DIGITAL ANGPAO / GIFT GUIDE SECTION --- */}
        <div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#2D1E18] text-[#C5A059] flex items-center justify-center mb-3 shadow">
            <Gift className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            WEDDING GIFT
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            Digital Angpao
          </h2>
          <p className="text-xs text-[#D8C6B9] mt-2 leading-relaxed">
            Doa restu Anda merupakan hadiah paling bermakna bagi kami. Bagi Anda yang hendak memberikan tanda kasih:
          </p>

          <div className="space-y-4 mt-6">
            {bankAccounts.map((acc, idx) => (
              <div
                key={idx}
                className="paper-card p-5 relative text-left flex items-center justify-between shadow-xl"
              >
                <div className="pearl-pin" />
                <div>
                  <p className="text-xs font-bold text-[#2C1D18]">{acc.bank}</p>
                  <p className="text-base font-mono font-semibold text-[#8C6D37] tracking-wider my-0.5">
                    {acc.number}
                  </p>
                  <p className="text-[11px] text-[#5A453C]">a.n {acc.owner}</p>
                </div>
                <button
                  onClick={() => handleCopy(acc.number)}
                  className="px-3.5 py-2 rounded-xl bg-[#2D1E18] text-[#C5A059] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#3B2B24] transition-colors"
                >
                  {copiedAccount === acc.number ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowQrisModal(true)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-[#2D1E18] text-[#FAF6F0] border border-[#C5A059] text-xs font-serif-title tracking-wider flex items-center justify-center gap-2 mx-auto shadow hover:bg-[#3B2B24] transition-colors"
          >
            <QrCode className="w-4 h-4 text-[#C5A059]" /> Scan QRIS Transfer
          </button>
        </div>

        <div className="w-20 h-[1px] bg-[#C5A059]/40 mx-auto" />

        {/* --- SNAP & SHARE SECTION --- */}
        <div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#2D1E18] text-[#C5A059] flex items-center justify-center mb-3 shadow">
            <Camera className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            HASHTAG RESMI
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            Snap &amp; Share
          </h2>
          <div className="inline-block mt-3 px-6 py-2 rounded-full bg-[#2D1E18] text-[#C5A059] border border-[#C5A059]/50 font-mono text-sm font-bold shadow-md tracking-wider">
            #AlifanoMonita2026
          </div>
        </div>
      </div>

      {showQrisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="paper-card p-6 relative max-w-xs w-full text-center border-2 border-[#C5A059] shadow-2xl">
            <div className="pearl-pin" />
            <h3 className="font-serif-title text-base font-bold text-[#2C1D18] mb-2">
              QRIS ALL PAYMENT
            </h3>
            <p className="text-[11px] text-[#5A453C] mb-4">
              Scan menggunakan GoPay, OVO, Dana, ShopeePay, atau Mobile Banking Anda.
            </p>
            <div className="p-3 bg-white rounded-xl shadow-inner inline-block">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126580014ID.CO.QRIS.WWW01189360091400000000005204581253033605802ID5914AlifanoMonita6007Jakarta63041D99"
                alt="QRIS Wedding Gift"
                className="w-44 h-44 mx-auto"
              />
            </div>
            <button
              onClick={() => setShowQrisModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#2D1E18] text-[#FAF6F0] text-xs font-semibold"
            >
              Tutup Modal
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
