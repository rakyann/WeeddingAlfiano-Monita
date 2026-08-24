'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

/* ── Torn paper top edge (cream sits on top of navy from venues) ── */
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

/* ── Mempelai (Bride & Groom) Section ── */
export const MempelaiSection: React.FC = () => {
  const couple = [
    {
      role: 'Mempelai Pria',
      name: 'Alifano Dwi Cahyo',
      nickname: 'Alifano',
      parents: 'Putra dari Bpk. Sudir & Ibu Estiningsih',
      ig: '@alifanodc',
      photo: '/img/DEV04107.JPG',
    },
    {
      role: 'Mempelai Wanita',
      name: 'Monita Ameliani Febriana',
      nickname: 'Monita',
      parents: 'Putri dari Bpk. (Alm) Toto Sugiarto & Ibu Puji Sistiawati',
      ig: '@monitameliaa',
      photo: '/img/DEV04100.JPG',
    },
  ];

  return (
    <section
      className="w-full text-cream py-20 px-6 relative text-center"
      style={{ backgroundColor: '#17335C' }}
    >
      <TornCreamTop />

      <h2 className="font-script text-5xl mb-12 mt-4 text-white">Pasangan Mempelai</h2>

      <div className="space-y-10 max-w-sm mx-auto">
        {couple.map((person, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="bg-white/5 border border-cream/15 rounded-xl p-6 backdrop-blur-sm"
          >
            {/* Portrait photo */}
            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-cream/30 shadow-lg">
              <img
                src={person.photo}
                alt={person.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 bg-blue-mid/20 text-blue-light"
            >
              {person.role}
            </span>

            <h3 className="font-script text-4xl text-cream my-1">{person.nickname}</h3>
            <p className="font-serif-title text-sm font-semibold text-cream/90 tracking-wide">
              {person.name}
            </p>
            <p className="text-[11px] text-cream/60 mt-2 leading-relaxed font-serif">
              {person.parents}
            </p>

            <a
              href={`https://instagram.com/${person.ig.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-light hover:underline mt-3 font-mono"
            >
              <Instagram className="w-3.5 h-3.5" /> {person.ig}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ── Love Story (Our Story) Section ── */
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
        'Dari teman menjadi lebih dari sekadar teman. Mereka memutuskan untuk melangkah lebih jauh bersama.',
    },
    {
      milestone: 'Melamar',
      year: 'Des 2025 — Bandung',
      story:
        'Di bawah cahaya bintang malam, ia meminta satu jawaban paling penting dalam hidupnya. Dan tentu saja, jawabannya adalah iya.',
    },
  ];

  return (
    <section className="w-full bg-cream py-20 px-6 border-b border-navy-deep/10 relative">
      <h2 className="font-script text-5xl text-navy-deep mb-12 text-center">Our Love Story</h2>

      <div className="max-w-xs mx-auto relative">
        {/* Vertical timeline line */}
        <div className="absolute left-0 top-2 bottom-2 w-[1.5px] bg-navy-deep/15 ml-[5px]" />

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
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-navy-accent bg-cream shadow-sm" />

              <h3 className="uppercase tracking-widest text-xs font-bold text-navy-accent mb-1 font-serif">
                {item.milestone}
              </h3>
              <p className="font-bold text-ink text-sm mb-2 font-serif">{item.year}</p>
              <p className="font-serif text-ink/70 text-sm leading-relaxed">{item.story}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12 text-navy-accent text-xl">~ ❀ ~</div>
    </section>
  );
};
