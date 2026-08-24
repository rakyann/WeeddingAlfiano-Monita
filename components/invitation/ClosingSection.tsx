'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ── Torn paper top edge ── */
function TornCreamTop() {
  return (
    <div
      className="absolute top-0 w-full h-8 bg-cream z-10 left-0"
      style={{
        maskImage:
          "url(\"data:image/svg+xml,%3Csvg preserveAspectRatio='none' viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z' opacity='.25'/%3E%3Cpath d='M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-51.24V0z' opacity='.5'/%3E%3Cpath d='M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z'/%3E%3C/svg%3E\")",
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        marginTop: '-1px',
      }}
    />
  );
}

export const ClosingSection: React.FC = () => {
  return (
    <section
      className="w-full text-cream py-24 px-6 relative text-center"
      style={{ backgroundColor: '#17335C' }}
    >
      <TornCreamTop />

      <div className="max-w-md mx-auto space-y-8 mt-2">
        {/* Holy Verse (QS Ar-Rum: 21) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-cream/15 rounded-3xl p-7 backdrop-blur-sm shadow-xl"
        >
          <div className="text-xl text-blue-light mb-4">﷽</div>
          <p className="font-serif italic text-cream/90 text-xs md:text-sm leading-relaxed mb-4">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
          </p>
          <p className="text-[11px] font-bold tracking-widest text-blue-light uppercase font-serif">
            QS. Ar-Rum: 21
          </p>
        </motion.div>

        {/* Closing Greeting & Gratitude */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="space-y-4 pt-4"
        >
          <p className="text-xs text-cream/80 font-serif leading-relaxed max-w-xs mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
          </p>
          <p className="text-xs text-blue-light font-serif">
            Wassalamu’alaikum Warahmatullahi Wabarakatuh
          </p>

          <div className="pt-6">
            <p className="text-xs text-cream/60 font-serif uppercase tracking-widest mb-1">
              Kami yang berbahagia,
            </p>
            <h3 className="font-script text-5xl text-cream">
              Alifano &amp; Monita
            </h3>
            <p className="text-[11px] text-cream/70 font-serif mt-2">
              Beserta segenap keluarga besar kedua mempelai
            </p>
          </div>
        </motion.div>

        <div className="flex justify-center text-blue-mid text-lg pt-4">~ ❀ ~</div>

        {/* Footer info */}
        <div className="pt-6 border-t border-cream/10 text-center">
          <p className="text-[9px] text-blue-mid/70 font-serif tracking-wider">
            © 2026 Alifano &amp; Monita Wedding Invitation. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};
