'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';

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
    <section className="relative py-14 px-6 bg-[#2D1E18] text-[#FAF6F0]">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            SWEET MEMORIES
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            Galeri Pre-Wedding
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* 3-Column Photo Grid with Golden Frames */}
        <div className="grid grid-cols-3 gap-3">
          {photos.map((src, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPhoto(src)}
              className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#C5A059]/60 shadow-lg cursor-pointer group"
            >
              <img
                src={src}
                alt={`Pre-wedding photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#2D1E18]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#C5A059]">
                <ZoomIn className="w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain border-2 border-[#C5A059]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
