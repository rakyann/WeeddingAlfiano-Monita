'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, MailOpen } from 'lucide-react';
import { MonogramFrame, FloralCorner, FloralDivider } from '../ui/FloralDecoration';
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
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center p-6 bg-gradient-to-b from-[#17335C] via-[#102443] to-[#17335C] text-[#F7F3EA] overflow-hidden">
      <FloralCorner className="absolute top-3 left-3 text-[#D4AF37]" />
      <FloralCorner className="absolute top-3 right-3 text-[#D4AF37] -scale-x-100" />

      <div className="pt-10 z-10">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif-title text-xs tracking-[0.3em] text-[#D4AF37]"
        >
          THE WEDDING OF
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="my-3 flex justify-center"
        >
          <MonogramFrame initials="A & M" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-script text-4xl md:text-5xl text-[#F7F3EA] drop-shadow"
        >
          Alifano &amp; Monita
        </motion.h1>
      </div>

      <div className="w-full my-4 z-10">
        <Envelope3D isOpen={isOpen} onOpen={onOpen} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm glass-panel p-5 rounded-2xl border border-[#D4AF37]/40 shadow-2xl relative z-10 my-4"
      >
        {isVip && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#17335C] text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
            <Crown className="w-3 h-3 fill-current" /> VIP Guest
          </div>
        )}

        <p className="text-xs uppercase tracking-widest text-[#B7C7E3] mb-1 font-serif">
          Kepada Yth. Bapak/Ibu/Saudara/i:
        </p>

        <h2 className="font-serif text-2xl font-bold text-[#F7F3EA] my-1 tracking-wide">
          {guestName}
        </h2>

        {tableNumber && (
          <p className="text-xs text-[#D4AF37] font-mono mt-1">
            Meja Acara: <span className="font-bold underline">{tableNumber}</span>
          </p>
        )}

        <p className="text-[11px] text-[#7C97C4] mt-2 italic">
          Mohon maaf apabila ada kesalahan penulisan nama/gelar.
        </p>

        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-[#3E5C8A] via-[#17335C] to-[#3E5C8A] text-[#F7F3EA] border border-[#D4AF37] font-serif-title tracking-widest text-xs shadow-lg flex items-center justify-center gap-2 group"
          >
            <MailOpen className="w-4 h-4 text-[#D4AF37] group-hover:animate-bounce" />
            Buka Undangan
          </motion.button>
        )}
      </motion.div>

      <FloralDivider className="z-10 pb-6" />
    </section>
  );
};
