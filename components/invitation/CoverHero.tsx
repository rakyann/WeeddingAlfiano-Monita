'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, MailOpen } from 'lucide-react';
import { BaroqueOvalFrame, BotanicalSprig } from '../ui/BaroqueFrame';
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
  const couplePhoto =
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80';

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center p-6 bg-[#2D1E18] text-[#FAF5EF] overflow-hidden">
      {/* Right Side Lace Edge Overlay */}
      <div className="lace-overlay-right" />

      {/* Top Header matching reference image: "Undangan PERNIKAHAN" */}
      <div className="pt-4 text-left w-full z-10 pl-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-script text-3xl text-[#FAF5EF] block leading-none italic">
            Undangan
          </span>
          <span className="font-serif-title text-xs tracking-[0.35em] text-[#C5A059] uppercase block font-semibold">
            PERNIKAHAN
          </span>
        </motion.div>
      </div>

      {/* Names in Cursive Script matching reference design ("Alifano" & "Monita") */}
      <div className="w-full text-left pl-4 my-2 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-script text-5xl md:text-6xl text-[#FAF5EF] block leading-tight tracking-wide">
            Alifano
          </span>
          <span className="font-script text-5xl md:text-6xl text-[#C5A059] block leading-tight tracking-wide pl-12">
            Monita
          </span>
        </motion.div>
      </div>

      {/* Center Oval Pearl Portrait Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="my-3 z-10"
      >
        <BaroqueOvalFrame
          imageSrc={couplePhoto}
          altText="Alifano & Monita Wedding Portrait"
        />
      </motion.div>

      {/* 3D Envelope Container */}
      <div className="w-full my-1 z-10">
        <Envelope3D isOpen={isOpen} onOpen={onOpen} />
      </div>

      {/* Deckled Cream Paper Note Card (Matching reference design image note card) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm paper-card p-6 relative z-10 my-4 text-[#2C1E18] shadow-2xl overflow-hidden"
      >
        {/* Top Pearl Brooch Pin */}
        <div className="pearl-pin" />

        {/* Dried Botanical Sprig Overlay on Bottom Right */}
        <BotanicalSprig className="absolute bottom-1 right-1" />

        {isVip && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#C5A059] text-[#2C1E18] text-[10px] font-bold uppercase tracking-wider mb-2 shadow">
            <Crown className="w-3 h-3 fill-current" /> VIP Guest
          </div>
        )}

        <p className="font-script text-2xl text-[#8C6D37] mb-1 italic">
          Bapak/Ibu/Saudara/i!
        </p>

        <h2 className="font-serif text-2xl font-bold text-[#2C1E18] my-1 tracking-wide">
          {guestName}
        </h2>

        {tableNumber && (
          <p className="text-xs text-[#8C6D37] font-mono mt-1">
            Meja Acara: <span className="font-bold underline">{tableNumber}</span>
          </p>
        )}

        <p className="text-xs text-[#5A453C] my-3 leading-relaxed">
          Kami mengundang Anda untuk merayakan momen paling membahagiakan dalam hidup kami — <br />
          <span className="font-bold uppercase tracking-wider text-[#2C1E18]">HARI PERNIKAHAN KAMI.</span>
        </p>

        {/* Date matching reference image format: 18/09/2026 */}
        <div className="my-3 py-2 border-y border-[#C5A059]/40">
          <p className="font-serif text-2xl font-bold text-[#8C6D37] tracking-widest">
            20 / 11 / 2026
          </p>
        </div>

        <p className="text-[11px] text-[#7A6458] leading-relaxed italic">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami dapat berbagi momen istimewa ini bersama Anda.
        </p>

        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="mt-5 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#382821] via-[#251712] to-[#382821] text-[#FAF5EF] border border-[#C5A059] font-serif-title tracking-widest text-xs shadow-xl flex items-center justify-center gap-2 group z-20 relative"
          >
            <MailOpen className="w-4 h-4 text-[#C5A059] group-hover:animate-bounce" />
            Buka Undangan
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};
