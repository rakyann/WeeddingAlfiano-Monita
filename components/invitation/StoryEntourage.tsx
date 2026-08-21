'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Users } from 'lucide-react';
import { FloralDivider, FloralCorner } from '../ui/FloralDecoration';

export const StoryEntourage: React.FC = () => {
  const loveStory = [
    {
      year: '2020',
      title: 'Pertemuan Pertama',
      desc: 'Berawal dari ruang perpustakaan kampus, sebuah senyuman hangat mengawali kisah perjalanan panjang kami.',
    },
    {
      year: '2023',
      title: 'Momen Lamaran',
      desc: 'Di bawah kilauan bintang malam di Bali, janji suci diucapkan untuk melangkah ke jenjang yang lebih serius.',
    },
    {
      year: '2026',
      title: 'Pernikahan Suci',
      desc: 'Dengan penuh sukacita dan doa restu, kami mengikat janji suci pernikahan untuk selamanya.',
    },
  ];

  const entourage = [
    { role: 'Orang Tua Mempelai Pria', names: 'Bpk. Alexander Smith & Ibu Maria Smith' },
    { role: 'Orang Tua Mempelai Wanita', names: 'Bpk. David Capulet & Ibu Elena Capulet' },
  ];

  return (
    <section className="relative py-14 px-6 bg-[#17335C] text-[#F7F3EA] overflow-hidden">
      <FloralCorner className="absolute top-2 right-2 text-[#D4AF37] -scale-x-100 opacity-40" />

      <div className="max-w-md mx-auto text-center space-y-12">
        {/* --- LOVE STORY TIMELINE --- */}
        <div>
          <span className="font-serif-title text-xs text-[#D4AF37] tracking-[0.2em]">
            OUR JOURNEY
          </span>
          <h2 className="font-script text-4xl text-[#F7F3EA] mt-1 mb-2">
            Cerita Cinta Kami
          </h2>
          <FloralDivider color="#D4AF37" />

          <div className="space-y-6 mt-8 relative before:absolute before:inset-y-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#3E5C8A]">
            {loveStory.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 glass-panel p-5 rounded-2xl border border-[#D4AF37]/30 text-center"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37] text-[#17335C] font-mono text-xs font-bold mb-2 shadow">
                  {item.year}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#F7F3EA]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#B7C7E3] mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- ENTOURAGE / FAMILY SECTION --- */}
        <div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#3E5C8A] text-[#D4AF37] flex items-center justify-center mb-3 shadow">
            <Users className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#D4AF37] tracking-[0.2em]">
            FAMILY &amp; ENTOURAGE
          </span>
          <h2 className="font-script text-3xl text-[#F7F3EA] mt-1 mb-4">
            Keluarga Besar
          </h2>

          <div className="space-y-4">
            {entourage.map((ent, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border border-[#D4AF37]/20"
              >
                <p className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {ent.role}
                </p>
                <p className="font-serif text-sm text-[#F7F3EA] mt-1">
                  {ent.names}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
