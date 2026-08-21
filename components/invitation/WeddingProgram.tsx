'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart } from 'lucide-react';

export const WeddingProgram: React.FC = () => {
  const events = [
    {
      title: 'AKAD NIKAH',
      time: '08:00 - 10:00 WIB',
      location: 'Glass House Sanctuary',
      desc: 'Prosesi ijab kabul sakral keluarga & sanak saudara.',
    },
    {
      title: 'RESEPSI PERNIKAHAN',
      time: '11:00 - 14:00 WIB',
      location: 'Grand Ballroom',
      desc: 'Ramah tamah, ucapan selamat & santap siang.',
    },
    {
      title: 'DINNER & RAMAH TAMAH',
      time: '18:30 - 21:00 WIB',
      location: 'Mulia Rooftop Lounge',
      desc: 'Acara keakraban bersama sahabat & kerabat dekat.',
    },
  ];

  return (
    <section className="relative py-14 px-6 bg-[#2D1E18] text-[#FAF6F0]">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            EVENT SCHEDULE
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            Rangkaian Acara
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* Vintage Pocket Watch Icon Display */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-b from-[#D4AF37] to-[#8C6D37] p-1 shadow-2xl flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#2D1E18] flex items-center justify-center text-[#C5A059]">
            <Clock className="w-7 h-7 animate-pulse" />
          </div>
        </div>

        {/* Timeline Events */}
        <div className="space-y-6 text-center">
          {events.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="paper-card p-6 relative text-[#2C1D18] shadow-xl"
            >
              <div className="pearl-pin" />

              <h3 className="font-serif text-lg font-bold text-[#2C1D18] tracking-widest uppercase">
                {evt.title}
              </h3>

              <div className="inline-block my-2 px-4 py-1 rounded-full bg-[#3B2B24] text-[#C5A059] font-mono text-xs font-bold">
                {evt.time}
              </div>

              <p className="text-xs font-semibold text-[#5A453C]">
                {evt.location}
              </p>
              <p className="text-[11px] text-[#7A6458] italic mt-1">
                {evt.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
