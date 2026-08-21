'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { FloralDivider } from '../ui/FloralDecoration';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos = [
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
  ];

  return (
    <section className="relative py-14 px-6 bg-[#F7F3EA] text-[#1C2B3D]">
      <div className="max-w-md mx-auto text-center">
        <span className="font-serif-title text-xs text-[#3E5C8A] tracking-[0.2em]">
          SWEET MEMORIES
        </span>
        <h2 className="font-script text-4xl text-[#17335C] mt-1 mb-2">
          Galeri Pre-Wedding
        </h2>
        <FloralDivider color="#3E5C8A" />

        {/* 3-Column Photo Grid */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          {photos.map((src, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPhoto(src)}
              className="relative aspect-square rounded-xl overflow-hidden border border-[#3E5C8A]/30 shadow cursor-pointer group"
            >
              <img
                src={src}
                alt={`Pre-wedding photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#17335C]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#D4AF37]">
                <ZoomIn className="w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedPhoto}
              alt="Lightbox Preview"
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain border border-[#D4AF37]/50"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
