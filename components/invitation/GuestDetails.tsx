'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, QrCode } from 'lucide-react';
import { BotanicalSprig } from '../ui/BaroqueFrame';

export const GuestDetails: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState<boolean>(false);

  // 5 Oval Golden Swatches matching reference design
  const colorGuide = [
    { name: 'Black', hex: '#121212' },
    { name: 'Chocolate', hex: '#382821' },
    { name: 'Taupe', hex: '#8A7366' },
    { name: 'Sand Gold', hex: '#C5A059' },
    { name: 'Pearl Cream', hex: '#FAF5EF' },
  ];

  // 3-Column Outfit Inspiration Photos (Matching reference design outfit grid)
  const outfitExamples = [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
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
    <section className="relative py-14 px-6 bg-[#251712] text-[#FAF5EF]">
      <div className="lace-overlay-right" />

      <div className="max-w-md mx-auto space-y-12 text-center">
        {/* --- DRESS CODE SECTION (Matching reference image) --- */}
        <div>
          <h2 className="font-script text-5xl text-[#FAF5EF] italic">
            Dress Code
          </h2>

          <p className="text-xs text-[#D8C6B9] mt-3 leading-relaxed max-w-xs mx-auto">
            Kami akan sangat senang apabila Anda berkenan menyelaraskan busana dengan nuansa warna berikut:
          </p>

          {/* 5 Golden Oval Color Swatches */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {colorGuide.map((col, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-16 rounded-[50%/45%] border-2 border-[#C5A059] shadow-xl flex items-center justify-center p-0.5"
                  style={{ backgroundColor: col.hex }}
                >
                  <div className="w-full h-full rounded-[50%/45%] border border-white/20" />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#A8988D] mt-4 italic max-w-xs mx-auto">
            Demi kenyamanan bersama, mohon menghindari penggunaan busana berwarna putih polos.
          </p>
        </div>

        {/* --- OUTFIT INSPIRATION GRID ("Примеры образов" matching reference image) --- */}
        <div>
          <h2 className="font-script text-4xl text-[#C5A059] mb-4 italic">
            Inspirasi Busana
          </h2>

          <div className="grid grid-cols-3 gap-2.5">
            {outfitExamples.map((src, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] rounded-lg overflow-hidden border border-[#C5A059]/40 shadow-lg"
              >
                <img
                  src={src}
                  alt={`Inspirasi Busana ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-20 h-[1px] bg-[#C5A059]/40 mx-auto" />

        {/* --- DIGITAL ANGPAO SECTION --- */}
        <div>
          <h2 className="font-script text-5xl text-[#FAF5EF] mb-2 italic">
            Digital Angpao
          </h2>
          <p className="text-xs text-[#D8C6B9] mb-6 leading-relaxed">
            Doa restu Anda merupakan hadiah paling bermakna bagi kami. Bagi Anda yang hendak memberikan tanda kasih:
          </p>

          <div className="space-y-4">
            {bankAccounts.map((acc, idx) => (
              <div
                key={idx}
                className="paper-card p-5 relative text-left flex items-center justify-between shadow-xl"
              >
                <div className="pearl-pin" />
                <BotanicalSprig className="absolute bottom-1 right-1 opacity-70" />
                <div>
                  <p className="text-xs font-bold text-[#2C1E18]">{acc.bank}</p>
                  <p className="text-base font-mono font-semibold text-[#8C6D37] tracking-wider my-0.5">
                    {acc.number}
                  </p>
                  <p className="text-[11px] text-[#5A453C]">a.n {acc.owner}</p>
                </div>
                <button
                  onClick={() => handleCopy(acc.number)}
                  className="px-3.5 py-2 rounded-xl bg-[#251712] text-[#C5A059] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#382821] transition-colors z-10"
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
            className="mt-4 px-6 py-2.5 rounded-xl bg-[#382821] text-[#FAF5EF] border border-[#C5A059] text-xs font-serif-title tracking-wider flex items-center justify-center gap-2 mx-auto shadow hover:bg-[#251712] transition-colors"
          >
            <QrCode className="w-4 h-4 text-[#C5A059]" /> Scan QRIS Transfer
          </button>
        </div>
      </div>

      {showQrisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="paper-card p-6 relative max-w-xs w-full text-center border-2 border-[#C5A059] shadow-2xl">
            <div className="pearl-pin" />
            <h3 className="font-serif-title text-base font-bold text-[#2C1E18] mb-2">
              QRIS ALL PAYMENT
            </h3>
            <div className="p-3 bg-white rounded-xl shadow-inner inline-block my-2">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126580014ID.CO.QRIS.WWW01189360091400000000005204581253033605802ID5914AlifanoMonita6007Jakarta63041D99"
                alt="QRIS Wedding Gift"
                className="w-44 h-44 mx-auto"
              />
            </div>
            <button
              onClick={() => setShowQrisModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#251712] text-[#FAF5EF] text-xs font-semibold"
            >
              Tutup Modal
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
