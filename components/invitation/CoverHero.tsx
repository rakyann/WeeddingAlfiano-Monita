'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, MailOpen } from 'lucide-react';
import { BaroqueOvalFrame } from '../ui/BaroqueFrame';
import { Envelope3D } from '../3d/Envelope3D';

interface CoverHeroProps {
  guestName: string;
  isVip: boolean;
  tableNumber: string | null;
  isOpen: boolean;
  onOpen: () => void;
}

export const CoverHero: React.FC<CoverHeroProps> = ({
  guestName,
  isVip,
  tableNumber,
  isOpen,
  onOpen,
}) => {
  // Couple photo (using high-res romantic portrait matching the reference image)
  const couplePhoto =
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80';

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center p-6 bg-gradient-to-b from-[#2D1E18] via-[#3B2B24] to-[#2D1E18] text-[#FAF6F0] overflow-hidden">
      {/* Top Header Label */}
      <div className="pt-6 z-10 w-full">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif-title text-xs tracking-[0.35em] text-[#C5A059] uppercase"
        >
          WEDDING INVITATION
        </motion.p>

        {/* Cursive Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="font-script text-4xl md:text-5xl text-[#FAF6F0] mt-3 drop-shadow-md tracking-wide italic"
        >
          Alifano &amp; Monita
        </motion.h1>
      </div>

      {/* Center Oval Pearl Portrait Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="my-5 z-10"
      >
        <BaroqueOvalFrame
          imageSrc={couplePhoto}
          altText="Alifano & Monita Wedding Portrait"
        />
      </motion.div>

      {/* 3D Envelope Section */}
      <div className="w-full my-2 z-10">
        <Envelope3D isOpen={isOpen} onOpen={onOpen} />
      </div>

      {/* Cream Paper Note Card (Matching reference design note card) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm paper-card p-6 relative z-10 my-4 text-[#2C1D18] shadow-2xl"
      >
        {/* Top Pearl Pin Accent */}
        <div className="pearl-pin" />

        {isVip && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#C5A059] text-[#2C1D18] text-[10px] font-bold uppercase tracking-wider mb-2 shadow">
            <Crown className="w-3 h-3 fill-current" /> VIP Guest
          </div>
        )}

        <p className="font-script text-xl text-[#A67C43] mb-1 italic">
          Kepada Yth. Bapak/Ibu/Saudara/i:
        </p>

        <h2 className="font-serif text-2xl font-bold text-[#2C1D18] my-1 tracking-wide">
          {guestName}
        </h2>

        {tableNumber && (
          <p className="text-xs text-[#8C6D37] font-mono mt-1">
            Meja Acara: <span className="font-bold underline">{tableNumber}</span>
          </p>
        )}

        {/* Wedding Date Display (Matching reference image: 18/09/2026) */}
        <div className="my-4 py-2 border-y border-[#C5A059]/40">
          <p className="font-script text-2xl font-bold text-[#A67C43] tracking-widest">
            20 / 11 / 2026
          </p>
        </div>

        <p className="text-xs text-[#5A453C] leading-relaxed italic">
          Merupakan suatu kehormatan &amp; kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.
        </p>

        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-[#3B2B24] via-[#2D1E18] to-[#3B2B24] text-[#FAF6F0] border border-[#C5A059] font-serif-title tracking-widest text-xs shadow-xl flex items-center justify-center gap-2 group"
          >
            <MailOpen className="w-4 h-4 text-[#C5A059] group-hover:animate-bounce" />
            Buka Undangan
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};
