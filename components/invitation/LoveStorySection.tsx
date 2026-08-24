'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LoveStorySection: React.FC = () => {
  const milestones = [
    {
      milestone: 'Pertama Bertemu',
      year: '2019 — Kampus',
      story:
        'Di sudut perpustakaan kampus, sepasang buku yang sama mempertemukan dua hati. Satu senyum, satu sapa, dan cerita pun dimulai.',
    },
    {
      milestone: 'Menjalin Hubungan',
      year: '2020',
      story:
        'Dari teman menjadi teman bercerita, hingga saling melengkapi dalam setiap langkah perjalanan hidup bersama.',
    },
    {
      milestone: 'Lamaran',
      year: 'Desember 2025 — Bandung',
      story:
        'Di bawah cahaya malam kota Bandung, sebuah komitmen suci diucapkan untuk melangkah bersama menuju ikatan pernikahan.',
    },
  ];

  return (
    <section className="w-full bg-cream py-20 px-6 border-b border-navy-deep/10 relative">
      <div className="text-center mb-12">
        <p className="tracking-[0.25em] text-[11px] font-serif uppercase text-navy-accent mb-2">
          How It All Began
        </p>
        <h2 className="font-script text-5xl text-navy-deep">Cerita Cinta</h2>
      </div>

      <div className="max-w-xs mx-auto relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[7px] top-3 bottom-3 w-[1.5px] bg-navy-deep/20" />

        <div className="flex flex-col gap-10">
          {milestones.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="pl-8 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-navy-deep bg-cream shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-navy-accent" />
              </div>

              <h3 className="uppercase tracking-widest text-xs font-bold text-navy-accent mb-1 font-serif">
                {item.milestone}
              </h3>
              <p className="font-bold text-navy-deep text-sm mb-2 font-serif">{item.year}</p>
              <p className="font-serif text-ink/75 text-xs leading-relaxed">{item.story}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12 text-navy-accent text-xl">~ ❀ ~</div>
    </section>
  );
};
