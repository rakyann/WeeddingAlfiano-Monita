'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const WeddingProgram: React.FC = () => {
  const events = [
    {
      time: '08:00 WIB',
      title: 'AKAD NIKAH',
      desc: 'Prosesi Ijab Kabul & Penandatanganan Buku Nikah',
    },
    {
      time: '11:00 WIB',
      title: 'RESEPSI PERNIKAHAN',
      desc: 'Ramah Tamah, Ucapan Selamat & Santap Siang',
    },
  ];

  return (
    <section className="relative py-14 px-6 bg-[#251712] text-[#FAF5EF] overflow-hidden">
      <div className="lace-overlay-right" />

      <div className="max-w-md mx-auto text-center space-y-8">
        <div>
          <h2 className="font-script text-5xl text-[#FAF5EF] italic">
            Rangkaian Acara
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-2" />
        </div>

        {/* Timeline with Vintage Pocketwatch image overlay (Matching reference image bottom-left layout) */}
        <div className="relative my-8 py-4 px-2 max-w-xs mx-auto">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#C5A059]/50" />

          {/* Realistic Vintage Pocket Watch Graphic Attachment */}
          <div className="absolute right-2 bottom-6 w-20 h-20 z-20 pointer-events-none drop-shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=80"
              alt="Vintage Pocket Watch"
              className="w-full h-full object-cover rounded-full border-2 border-[#C5A059] shadow-2xl"
            />
          </div>

          <div className="space-y-12 relative z-10 text-center">
            {events.map((evt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="space-y-1"
              >
                <div className="inline-block px-4 py-1 rounded-full bg-[#C5A059] text-[#251712] font-serif text-sm font-bold tracking-wider shadow">
                  {evt.time}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#FAF5EF] tracking-widest uppercase pt-2">
                  {evt.title}
                </h3>
                <p className="text-xs text-[#D8C6B9] italic">
                  {evt.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
