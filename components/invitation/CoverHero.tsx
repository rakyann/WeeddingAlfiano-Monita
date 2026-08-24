'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MailOpen, Crown } from 'lucide-react';

interface CoverHeroProps {
  guestName: string;
  isVip: boolean;
  tableNumber: string | null;
  isOpen: boolean;
  onOpen: () => void;
}

/* ── Inline SVG torn-paper bottom edge ── */
function TornBottom() {
  return (
    <div
      className="absolute bottom-0 w-full h-8 bg-cream z-30"
      style={{
        maskImage:
          "url(\"data:image/svg+xml,%3Csvg preserveAspectRatio='none' viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z' opacity='.25'/%3E%3Cpath d='M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-51.24V0z' opacity='.5'/%3E%3Cpath d='M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z'/%3E%3C/svg%3E\")",
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        transform: 'rotate(180deg)',
        marginBottom: '-1px',
      }}
    />
  );
}

/* ── Simple floral SVG decoration ── */
function FloralCorner({ className = '' }: { className?: string }) {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      className={`pointer-events-none opacity-25 ${className}`}
    >
      <circle cx="10" cy="10" r="4" stroke="#B7C7E3" strokeWidth="1" fill="none" />
      <circle cx="20" cy="8" r="3" stroke="#B7C7E3" strokeWidth="1" fill="none" />
      <circle cx="8" cy="20" r="3" stroke="#B7C7E3" strokeWidth="1" fill="none" />
      <path d="M 5 50 Q 25 25, 50 5" stroke="#B7C7E3" strokeWidth="0.8" fill="none" />
      <path d="M 15 55 Q 35 35, 55 15" stroke="#B7C7E3" strokeWidth="0.6" fill="none" />
      <path d="M 25 60 Q 45 40, 60 25" stroke="#7C97C4" strokeWidth="0.5" fill="none" />
      <circle cx="52" cy="5" r="2.5" stroke="#7C97C4" strokeWidth="0.8" fill="none" />
      <circle cx="60" cy="12" r="2" stroke="#7C97C4" strokeWidth="0.8" fill="none" />
      <circle cx="5" cy="52" r="2.5" stroke="#7C97C4" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

export const CoverHero: React.FC<CoverHeroProps> = ({
  guestName,
  isVip,
  tableNumber,
  isOpen,
  onOpen,
}) => {
  const couplePhoto =
    '/img/DEV03503.JPG';

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-white text-center overflow-hidden"
      style={{ backgroundColor: '#17335C' }}
    >
      {/* Background photo with navy overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${couplePhoto}')` }}
      />
      <div className="absolute inset-0 bg-navy-deep/65 z-10" />

      {/* Floral corners */}
      <FloralCorner className="absolute top-0 left-0 z-20" />
      <FloralCorner className="absolute top-0 right-0 z-20 rotate-90" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 px-6 flex flex-col items-center gap-5 w-full"
      >
        <p className="tracking-[0.22em] text-[11px] font-serif uppercase text-cream/80">
          The Wedding Of
        </p>

        {/* Script names */}
        <h1 className="font-script text-6xl text-cream drop-shadow-md leading-tight">
          Alifano &amp; Monita
        </h1>

        {/* Date box */}
        <div className="border border-cream/30 px-6 py-3 mt-2 uppercase font-serif tracking-[0.12em]">
          <p className="text-lg font-bold text-cream">13 / 09 / 2026</p>
        </div>

        {/* Bible verse / quote */}
        <p className="text-cream/75 italic mt-2 max-w-xs font-serif text-sm leading-relaxed">
          &ldquo;Dan di atas segalanya: kenakanlah kasih sebagai pengikat yang mempersatukan dan menyempurnakan.&rdquo;
        </p>


        {/* Guest card */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-sm bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-lg p-5 text-left mt-2"
          >
            {isVip && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-light text-navy-deep text-[10px] font-bold uppercase tracking-wider mb-2">
                <Crown className="w-3 h-3" /> VIP Guest
              </div>
            )}
            <p className="font-serif text-[11px] text-cream/70 uppercase tracking-widest mb-1">
              Kepada Yth.
            </p>
            <h2 className="font-serif-title text-xl font-bold text-cream leading-snug">
              {guestName}
            </h2>
            {tableNumber && (
              <p className="text-[11px] text-blue-light mt-1 font-mono">
                Meja: <span className="font-bold">{tableNumber}</span>
              </p>
            )}

            {/* Open button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpen}
              className="mt-5 w-full py-3 bg-cream text-navy-deep font-serif-title tracking-[0.2em] text-xs font-bold rounded-full shadow-lg flex items-center justify-center gap-2 hover:bg-white transition-all"
            >
              <MailOpen className="w-4 h-4" />
              BUKA UNDANGAN
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Torn paper bottom */}
      <TornBottom />
    </section>
  );
};
