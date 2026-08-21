'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Clock, Sparkles } from 'lucide-react';
import { FloralDivider } from '../ui/FloralDecoration';

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
      location: 'Grand Ballroom Hotel Mulia',
      desc: 'Ramah tamah, ucapan selamat & santap siang.',
    },
    {
      title: 'PRIVATE DINNER',
      time: '18:30 - 21:00 WIB',
      location: 'Mulia Rooftop Lounge',
      desc: 'Acara keakraban bersama sahabat & kerabat dekat.',
    },
  ];

  return (
    <section className="relative py-14 px-6 bg-[#F7F3EA] text-[#1C2B3D]">
      <div className="max-w-md mx-auto text-center">
        <span className="font-serif-title text-xs text-[#3E5C8A] tracking-[0.2em]">
          EVENT SCHEDULE
        </span>
        <h2 className="font-script text-4xl text-[#17335C] mt-1 mb-2">
          Rangkaian Acara
        </h2>
        <FloralDivider color="#3E5C8A" />

        {/* Event Cards */}
        <div className="space-y-6 mt-8">
          {events.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-card-light p-6 rounded-3xl border border-[#3E5C8A]/20 shadow-md relative overflow-hidden text-center"
            >
              {/* Top Accent Icon */}
              <div className="w-10 h-10 mx-auto rounded-full bg-[#17335C] text-[#D4AF37] flex items-center justify-center mb-3 shadow">
                <Heart className="w-5 h-5 fill-current" />
              </div>

              <h3 className="font-serif-title text-base font-bold text-[#17335C] tracking-widest">
                {evt.title}
              </h3>

              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#3E5C8A] my-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{evt.time}</span>
              </div>

              <p className="text-xs text-[#1C2B3D] font-medium mb-1">
                {evt.location}
              </p>
              <p className="text-[11px] text-[#3E5C8A]/80 italic">
                {evt.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
