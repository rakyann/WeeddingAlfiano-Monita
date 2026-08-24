'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const WeddingProgram: React.FC = () => {
  const timeline = [
    { time: '16:30', label: 'Sambut Tamu', desc: 'Penyambutan tamu & registrasi kedatangan' },
    { time: '18:00', label: 'Akad Nikah', desc: 'Prosesi ijab kabul sakral' },
    { time: '19:00', label: 'Resepsi', desc: 'Ramah tamah, santap malam & foto bersama' },
  ];

  return (
    <section className="w-full bg-cream py-20 px-6 flex flex-col items-center">
      <h2 className="font-script text-5xl text-navy-deep mb-12 text-center">
        Wedding Program
      </h2>

      <div className="w-full max-w-sm border border-navy-deep/20 rounded-t-full p-8 flex flex-col gap-8 relative">
        {/* Decorative floral top */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cream px-4 text-blue-mid text-xl">
          ❀
        </div>

        {timeline.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12 }}
            className="flex justify-between items-center mt-2 first:mt-6"
          >
            <div className="text-left font-serif text-ink">
              <h3 className="font-bold uppercase tracking-wider text-sm">{item.label}</h3>
              <p className="text-xs text-ink/60 mt-0.5">{item.desc}</p>
            </div>
            <div className="text-right font-serif text-navy-deep font-bold text-base">
              {item.time}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
