'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, HeartHandshake, Camera } from 'lucide-react';

export const DresscodeSection: React.FC = () => {
  const dressCodeColors = [
    { hex: '#17335C', label: 'Navy Deep' },
    { hex: '#3E5C8A', label: 'Navy Accent' },
    { hex: '#7C97C4', label: 'Blue Mid' },
    { hex: '#B7C7E3', label: 'Blue Light' },
    { hex: '#F7F3EA', label: 'Cream' },
  ];

  const outfitInspiration = [
    '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.40%20(1).jpeg',
    '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.56%20(1).jpeg',
    '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.57.jpeg',
  ];

  const protocols = [
    {
      icon: <Sparkles className="w-5 h-5 text-navy-accent" />,
      title: 'Dress Code',
      desc: 'Pakaian Formal / Batik / Gaun bernuansa Navy & Cream.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-navy-accent" />,
      title: 'Tertib & Nyaman',
      desc: 'Mohon hadir tepat waktu dan menjaga kenyamanan bersama selama acara berlangsung.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-navy-accent" />,
      title: 'Doa Restu',
      desc: 'Kehadiran dan doa restu Anda adalah anugerah terindah bagi kami.',
    },
  ];

  return (
    <section className="w-full bg-cream py-20 px-6 border-t border-navy-deep/10">
      <div className="text-center mb-12">
        <p className="tracking-[0.25em] text-[11px] font-serif uppercase text-navy-accent mb-2">
          Guest Information
        </p>
        <h2 className="font-script text-5xl text-navy-deep">Informasi Acara</h2>
      </div>

      <div className="space-y-12 max-w-sm mx-auto">
        {/* Color Guide & Swatches */}
        <div className="bg-white p-6 rounded-2xl border border-navy-deep/10 shadow-sm text-center">
          <h3 className="uppercase tracking-widest text-xs font-bold text-navy-deep mb-3 font-serif">
            Panduan Warna Busana (Dress Code)
          </h3>
          <p className="font-serif text-ink/75 text-xs leading-relaxed max-w-xs mx-auto mb-4">
            Kami mengharapkan para tamu undangan mengenakan busana yang selaras dengan tema palet pernikahan kami:
          </p>

          <div className="flex justify-center gap-3 my-4">
            {dressCodeColors.map((col, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className="w-9 h-9 rounded-full shadow-md border-2 border-white transition-transform hover:scale-110"
                  style={{ backgroundColor: col.hex }}
                  title={col.label}
                />
                <span className="text-[9px] text-ink/60 font-serif">{col.label}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-ink/50 italic mt-3 font-serif">
            *Dihimbau untuk menghindari busana berwarna putih polos demi keserasian pengantin.
          </p>
        </div>

        {/* Inspirasi Busana */}
        <div>
          <h3 className="uppercase tracking-widest text-xs font-bold text-navy-deep mb-4 font-serif text-center">
            Inspirasi Busana
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {outfitInspiration.map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-navy-deep/15"
              >
                <img
                  src={src}
                  alt={`Inspirasi busana ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tata Tertib / Protokol */}
        <div className="space-y-3">
          {protocols.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-navy-deep/10 shadow-sm flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-cream flex-shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <h4 className="font-serif-title font-bold text-xs text-navy-deep uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="text-xs text-ink/70 font-serif mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
