'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, QrCode, Gift, MapPin, CreditCard } from 'lucide-react';

export const DigitalEnvelopeSection: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState<boolean>(false);

  const bankAccounts = [
    {
      bank: 'Bank Central Asia (BCA)',
      number: '4240380175',
      owner: 'Alifano Dwi Cahyo',
    },
    {
      bank: 'Bank Negara Indonesia (BNI)',
      number: '0778824047',
      owner: 'Monita Ameliani Febriana',
    },
  ];

  const giftAddress = {
    recipient: 'Alifano & Monita',
    phone: '0812-3456-7890',
    address: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12150',
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <section className="w-full bg-cream py-20 px-6 border-t border-navy-deep/10">
      <div className="text-center mb-12">
        <p className="tracking-[0.25em] text-[11px] font-serif uppercase text-navy-accent mb-2">
          Wedding Gift
        </p>
        <h2 className="font-script text-5xl text-navy-deep">Amplop Digital</h2>
        <p className="font-serif text-ink/75 text-xs max-w-xs mx-auto mt-3 leading-relaxed">
          Doa restu Anda merupakan hadiah terindah bagi kami. Namun jika Anda hendak memberikan tanda kasih, Anda dapat memberikannya secara cashless melalui:
        </p>
      </div>

      <div className="space-y-6 max-w-sm mx-auto">
        {/* Bank Transfer Cards */}
        {bankAccounts.map((acc, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl shadow-sm border border-navy-deep/10 flex items-center justify-between"
          >
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-navy-deep font-bold text-xs uppercase tracking-wider font-serif">
                <CreditCard className="w-3.5 h-3.5 text-navy-accent" />
                <span>{acc.bank}</span>
              </div>
              <p className="font-mono text-lg font-bold text-ink tracking-wider my-1">
                {acc.number}
              </p>
              <p className="text-[11px] text-ink/60 font-serif">a.n {acc.owner}</p>
            </div>
            <button
              onClick={() => handleCopy(acc.number, `bank-${idx}`)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-navy-deep text-cream hover:bg-navy-accent transition-colors shadow-sm"
            >
              {copiedItem === `bank-${idx}` ? (
                <>
                  <Check className="w-3.5 h-3.5 text-blue-light" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>
        ))}

        {/* QRIS Transfer Button */}
        <button
          onClick={() => setShowQrisModal(true)}
          className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-navy-accent/40 bg-white hover:bg-navy-deep/5 transition-all flex items-center justify-center gap-2 font-serif text-xs font-bold uppercase tracking-widest text-navy-deep"
        >
          <QrCode className="w-4 h-4 text-navy-accent" />
          <span>Lihat QRIS Pembayaran</span>
        </button>

        {/* Physical Gift Delivery Address */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-navy-deep/10 text-left">
          <div className="flex items-center gap-1.5 text-navy-deep font-bold text-xs uppercase tracking-wider font-serif mb-2">
            <Gift className="w-4 h-4 text-navy-accent" />
            <span>Kirim Kado Fisik</span>
          </div>
          <p className="text-xs font-serif text-ink/80 leading-relaxed">
            <span className="font-bold text-ink">{giftAddress.recipient}</span> ({giftAddress.phone})
          </p>
          <p className="text-xs font-serif text-ink/70 mt-1 leading-relaxed">
            {giftAddress.address}
          </p>
          <button
            onClick={() => handleCopy(giftAddress.address, 'address')}
            className="mt-3 w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-navy-deep/20 text-navy-deep hover:bg-navy-deep hover:text-cream transition-colors"
          >
            {copiedItem === 'address' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Alamat Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Alamat Pengiriman</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* QRIS Modal */}
      {showQrisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-cream p-6 rounded-2xl relative max-w-xs w-full text-center border border-navy-deep/20 shadow-2xl"
          >
            <h3 className="font-serif-title text-base font-bold text-navy-deep mb-1">
              QRIS ALL PAYMENT
            </h3>
            <p className="text-[11px] text-ink/60 font-serif mb-3">
              Scan barcode berikut menggunakan m-Banking / e-Wallet Anda:
            </p>
            <div className="p-3 bg-white rounded-xl shadow-inner inline-block my-2 border border-navy-deep/10">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126580014ID.CO.QRIS.WWW01189360091400000000005204581253033605802ID5914AlifanoMonita6007Jakarta63041D99"
                alt="QRIS Wedding Gift"
                className="w-44 h-44 mx-auto"
              />
            </div>
            <p className="text-[10px] text-ink/50 font-serif mt-1">Alifano &amp; Monita</p>
            <button
              onClick={() => setShowQrisModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold bg-navy-deep text-cream hover:bg-navy-accent transition-colors"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};
