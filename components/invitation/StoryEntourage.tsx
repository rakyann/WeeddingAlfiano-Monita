'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Instagram } from 'lucide-react';

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
    <section className="relative py-14 px-6 bg-[#3B2B24] text-[#FAF6F0]">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#2D1E18] text-[#C5A059] flex items-center justify-center mb-3 shadow">
            <Users className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            THE BRIDE &amp; GROOM
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            Pasangan Mempelai
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-3" />
        </div>

        <div className="space-y-6">
          {entourage.map((person, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="paper-card p-6 relative text-center text-[#2C1D18] shadow-xl"
            >
              <div className="pearl-pin" />

              <span className="inline-block px-3 py-1 rounded-full bg-[#3B2B24] text-[#C5A059] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                {person.role}
              </span>

              <h3 className="font-serif text-2xl font-bold text-[#2C1D18]">
                {person.name}
              </h3>

              <p className="text-xs text-[#5A453C] mt-1">
                {person.parents}
              </p>

              <a
                href={`https://instagram.com/${person.ig.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#8C6D37] hover:underline mt-3 font-mono font-bold"
              >
                <Instagram className="w-3.5 h-3.5" /> {person.ig}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
