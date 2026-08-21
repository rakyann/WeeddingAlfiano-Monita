'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, QrCode, Shirt, Camera } from 'lucide-react';
import { FloralDivider } from '../ui/FloralDecoration';

export const GuestDetails: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState<boolean>(false);

  const colorGuide = [
    { name: 'Deep Navy', hex: '#17335C' },
    { name: 'Navy Accent', hex: '#3E5C8A' },
    { name: 'Blue Mid', hex: '#7C97C4' },
    { name: 'Cream Sand', hex: '#F7F3EA' },
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
    <section className="relative py-14 px-6 bg-[#F7F3EA] text-[#1C2B3D]">
      <div className="max-w-md mx-auto space-y-12">
        {/* --- DRESS CODE SECTION --- */}
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#17335C] text-[#D4AF37] flex items-center justify-center mb-3 shadow">
            <Shirt className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#3E5C8A] tracking-[0.2em]">
            GUEST GUIDE
          </span>
          <h2 className="font-script text-3xl text-[#17335C] mt-1">
            Dress Code &amp; Color Guide
          </h2>
          <p className="text-xs text-[#3E5C8A] mt-2 leading-relaxed">
            Untuk menjaga keharmonisan visual acara, kami menyarankan para tamu undangan mengenakan busana bernuansa:
          </p>

          <div className="flex items-center justify-center gap-4 mt-5">
            {colorGuide.map((col, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#D4AF37] shadow-md transition-transform hover:scale-110"
                  style={{ backgroundColor: col.hex }}
                />
                <span className="text-[10px] text-[#1C2B3D] font-medium">
                  {col.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <FloralDivider color="#3E5C8A" />

        {/* --- DIGITAL ANGPAO / GIFT GUIDE SECTION --- */}
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#17335C] text-[#D4AF37] flex items-center justify-center mb-3 shadow">
            <Gift className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#3E5C8A] tracking-[0.2em]">
            WEDDING GIFT
          </span>
          <h2 className="font-script text-3xl text-[#17335C] mt-1">
            Digital Angpao &amp; Gift Guide
          </h2>
          <p className="text-xs text-[#3E5C8A] mt-2 leading-relaxed">
            Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila Anda ingin memberikan tanda kasih secara digital:
          </p>

          <div className="space-y-4 mt-6">
            {bankAccounts.map((acc, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#3E5C8A]/20 shadow-md flex items-center justify-between text-left"
              >
                <div>
                  <p className="text-xs font-bold text-[#17335C]">{acc.bank}</p>
                  <p className="text-base font-mono font-semibold text-[#3E5C8A] tracking-wider my-0.5">
                    {acc.number}
                  </p>
                  <p className="text-[11px] text-gray-500">a.n {acc.owner}</p>
                </div>
                <button
                  onClick={() => handleCopy(acc.number)}
                  className="px-3 py-2 rounded-xl bg-[#17335C] text-[#D4AF37] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#3E5C8A] transition-colors"
                >
                  {copiedAccount === acc.number ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" /> Copied
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
            className="mt-4 px-6 py-2.5 rounded-xl bg-[#3E5C8A] text-[#F7F3EA] text-xs font-serif-title tracking-wider flex items-center justify-center gap-2 mx-auto shadow hover:bg-[#17335C] transition-colors"
          >
            <QrCode className="w-4 h-4 text-[#D4AF37]" /> Scan QRIS Transfer
          </button>
        </div>

        <FloralDivider color="#3E5C8A" />

        {/* --- SNAP & SHARE SECTION --- */}
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#17335C] text-[#D4AF37] flex items-center justify-center mb-3 shadow">
            <Camera className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#3E5C8A] tracking-[0.2em]">
            SOCIAL &amp; HASHTAG
          </span>
          <h2 className="font-script text-3xl text-[#17335C] mt-1">
            Snap &amp; Share
          </h2>
          <p className="text-xs text-[#3E5C8A] mt-2">
            Bagikan momen bahagia Anda di media sosial dengan tagar resmi:
          </p>
          <div className="inline-block mt-3 px-5 py-2 rounded-full bg-[#17335C] text-[#D4AF37] font-mono text-sm font-bold shadow-md tracking-wider">
            #AlifanoMonita2026
          </div>
        </div>
      </div>

      {showQrisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#F7F3EA] p-6 rounded-3xl max-w-xs w-full text-center relative border-2 border-[#D4AF37] shadow-2xl">
            <h3 className="font-serif-title text-base font-bold text-[#17335C] mb-2">
              QRIS ALL PAYMENT
            </h3>
            <p className="text-[11px] text-[#3E5C8A] mb-4">
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
              className="mt-5 w-full py-2.5 rounded-xl bg-[#17335C] text-[#F7F3EA] text-xs font-semibold"
            >
              Tutup Modal
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
