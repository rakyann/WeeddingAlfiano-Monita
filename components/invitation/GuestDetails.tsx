'use client';

import React, { useState } from 'react';
import { Copy, Check, QrCode } from 'lucide-react';

export const GuestDetails: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState(false);

  // 3 outfit inspiration photos (tall portrait) from real pre-wedding photos
  const outfitPhotos = [
    '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.40%20(1).jpeg',
    '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.56%20(1).jpeg',
    '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.57.jpeg',
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

  // 5 dress code color swatches (navy palette)
  const dressCodeColors = [
    { hex: '#17335C', label: 'Navy Deep' },
    { hex: '#3E5C8A', label: 'Navy Accent' },
    { hex: '#7C97C4', label: 'Blue Mid' },
    { hex: '#B7C7E3', label: 'Blue Light' },
    { hex: '#F7F3EA', label: 'Cream' },
  ];

  return (
    <section className="w-full bg-cream py-16 px-6 border-t border-navy-deep/10">
      <h2 className="font-script text-4xl text-navy-deep mb-12 text-center">The Details</h2>

      <div className="space-y-12">
        {/* Dress Code */}
        <div className="text-center">
          <h3 className="uppercase tracking-widest text-sm font-bold text-ink mb-4 font-serif">
            Dress Code
          </h3>
          <p className="font-serif text-ink/80 text-sm max-w-xs mx-auto leading-relaxed">
            Formal Attire. Kami mengharapkan para tamu mengenakan busana dengan nuansa warna tema pernikahan kami.
          </p>
        </div>

        {/* Color Guide */}
        <div className="text-center">
          <h3 className="uppercase tracking-widest text-sm font-bold text-ink mb-4 font-serif">
            Color Guide
          </h3>
          <div className="flex justify-center gap-3 mt-4">
            {dressCodeColors.map((col, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full shadow-sm border border-black/5 transition-transform hover:scale-110"
                style={{ backgroundColor: col.hex }}
                title={col.label}
              />
            ))}
          </div>
          <p className="text-[11px] text-ink/50 italic mt-3 font-serif">
            Mohon hindari warna putih polos.
          </p>
        </div>

        {/* Snap & Share */}
        <div className="text-center">
          <h3 className="uppercase tracking-widest text-sm font-bold text-ink mb-4 font-serif">
            Snap &amp; Share
          </h3>
          <p className="font-serif text-ink/80 text-sm max-w-xs mx-auto leading-relaxed">
            Abadikan momen bahagia! Gunakan tagar kami saat posting di media sosial:
          </p>
          <p className="font-bold text-navy-accent mt-2 tracking-wider text-sm">
            #AlifanoMonita2026
          </p>
        </div>

        {/* Outfit Inspiration with real photos */}
        <div>
          <h3 className="uppercase tracking-widest text-sm font-bold text-ink mb-5 font-serif text-center">
            Inspirasi Busana
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {outfitPhotos.map((src, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-navy-deep/15"
              >
                <img
                  src={src}
                  alt={`Inspirasi busana ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Digital Angpao */}
        <div className="text-center">
          <h3 className="uppercase tracking-widest text-sm font-bold text-ink mb-4 font-serif">
            Wedding Gift
          </h3>
          <p className="font-serif text-ink/70 text-sm max-w-xs mx-auto leading-relaxed mb-6">
            Kehadiran dan doa Anda adalah hadiah terindah. Namun bagi yang ingin memberikan tanda kasih:
          </p>

          <div className="space-y-3 max-w-sm mx-auto">
            {bankAccounts.map((acc, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-sm border border-navy-deep/10 flex items-center justify-between"
              >
                <div className="text-left">
                  <p className="text-[11px] font-bold text-navy-deep uppercase tracking-wider">
                    {acc.bank}
                  </p>
                  <p className="font-mono text-base font-bold text-ink tracking-wider my-0.5">
                    {acc.number}
                  </p>
                  <p className="text-[11px] text-ink/60">a.n {acc.owner}</p>
                </div>
                <button
                  onClick={() => handleCopy(acc.number)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-navy-deep text-cream hover:bg-navy-accent transition-colors"
                >
                  {copiedAccount === acc.number ? (
                    <><Check className="w-3.5 h-3.5 text-blue-light" /> Copied</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy</>
                  )}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowQrisModal(true)}
            className="mt-4 px-6 py-2.5 rounded-lg text-xs font-serif-title tracking-[0.15em] flex items-center justify-center gap-2 mx-auto border border-navy-accent text-navy-accent hover:bg-navy-deep hover:text-cream transition-colors"
          >
            <QrCode className="w-4 h-4" /> Scan QRIS Transfer
          </button>
        </div>
      </div>

      {/* QRIS Modal */}
      {showQrisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-cream p-6 rounded-xl relative max-w-xs w-full text-center border border-navy-deep/20 shadow-2xl">
            <h3 className="font-serif-title text-base font-bold text-navy-deep mb-2">
              QRIS ALL PAYMENT
            </h3>
            <div className="p-3 bg-white rounded-xl shadow-inner inline-block my-2 border border-navy-deep/10">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126580014ID.CO.QRIS.WWW01189360091400000000005204581253033605802ID5914AlifanoMonita6007Jakarta63041D99"
                alt="QRIS Wedding Gift"
                className="w-44 h-44 mx-auto"
              />
            </div>
            <button
              onClick={() => setShowQrisModal(false)}
              className="mt-4 w-full py-2.5 rounded-lg text-xs font-bold bg-navy-deep text-cream hover:bg-navy-accent transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
