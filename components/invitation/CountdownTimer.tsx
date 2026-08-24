'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CountdownTimer: React.FC = () => {
  const weddingDate = new Date('2026-09-13T08:00:00');

  const calcTimeLeft = () => {
    const diff = weddingDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="w-full bg-cream py-16 px-6 text-center border-t border-navy-deep/10">
      <p className="tracking-[0.2em] text-[11px] font-serif uppercase text-navy-accent mb-2">
        Menuju Hari Bahagia
      </p>
      <h2 className="font-script text-4xl text-navy-deep mb-10">Save the Date</h2>

      <div className="flex justify-center gap-3">
        {units.map((unit, idx) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded-lg border border-navy-deep/20 bg-white shadow-sm"
            >
              <span className="font-serif-title text-2xl font-bold text-navy-deep">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-ink/50 mt-1.5 font-serif">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="font-serif text-ink/60 text-xs mt-8">
        Minggu, 13 September 2026
      </p>
    </section>
  );
};
