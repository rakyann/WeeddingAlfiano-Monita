'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Instagram } from 'lucide-react';
import { FloralDivider, FloralCorner } from '../ui/FloralDecoration';

export const StoryEntourage: React.FC = () => {
  const entourage = [
    {
      role: 'Mempelai Pria',
      name: 'Alifano Dwi Cahyo (Alifano)',
      parents: 'Putra dari Bpk. Sudir & Ibu Estiningsih',
      ig: '@alifanodc',
    },
    {
      role: 'Mempelai Wanita',
      name: 'Monita Ameliani Febriana (Monita)',
      parents: 'Putri dari Bpk. (Alm) Toto Sugiarto & Ibu Puji Sistiawati',
      ig: '@monitameliaa',
    },
  ];

  return (
    <section className="relative py-14 px-6 bg-[#17335C] text-[#F7F3EA] overflow-hidden">
      <FloralCorner className="absolute top-2 right-2 text-[#D4AF37] -scale-x-100 opacity-40" />

      <div className="max-w-md mx-auto text-center space-y-12">
        <div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#3E5C8A] text-[#D4AF37] flex items-center justify-center mb-3 shadow">
            <Users className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#D4AF37] tracking-[0.2em]">
            THE BRIDE &amp; GROOM
          </span>
          <h2 className="font-script text-4xl text-[#F7F3EA] mt-1 mb-2">
            Pasangan Mempelai
          </h2>
          <FloralDivider color="#D4AF37" />

          <div className="space-y-6 mt-8">
            {entourage.map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 text-center space-y-2"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37] text-[#17335C] font-mono text-[10px] font-bold uppercase tracking-wider">
                  {person.role}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F7F3EA]">
                  {person.name}
                </h3>
                <p className="text-xs text-[#B7C7E3]">
                  {person.parents}
                </p>
                <a
                  href={`https://instagram.com/${person.ig.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:underline mt-2 font-mono"
                >
                  <Instagram className="w-3.5 h-3.5" /> {person.ig}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
