'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos = [
    '/img/DEV03564.JPG',
    '/img/DEV03606.JPG',
    '/img/DEV03652.JPG',
    '/img/DEV03712.JPG',
    '/img/DEV03791.JPG',
    '/img/DEV03826.JPG',
    '/img/DEV03827.JPG',
    '/img/DEV03848.JPG',
    '/img/DEV03970.JPG',
    '/img/DEV04091.JPG',
    '/img/DEV04100.JPG',
    '/img/DEV04128.JPG',
    '/img/DSC07649.JPG',
    '/img/DSC07686.JPG',
    '/img/DSC07688.JPG',
  ];

  return (
    <section className="w-full bg-cream py-16 px-6">
      <h2 className="font-script text-5xl text-navy-deep mb-2 text-center">Gallery</h2>
      <p className="text-xs text-ink/50 mb-8 text-center font-serif">Momen pre-wedding kami</p>

      {/* 3-column photo grid */}
      <div className="grid grid-cols-3 gap-2">
        {photos.map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedPhoto(src)}
            className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group border border-navy-deep/15 shadow-sm"
          >
            <img
              src={src}
              alt={`Pre-wedding ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-navy-deep/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-cream" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
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
              className="absolute top-6 right-6 text-cream p-2 rounded-full bg-navy-accent/70"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedPhoto}
              alt="Lightbox"
              className="max-w-full max-h-[80vh] rounded-xl object-contain border border-cream/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
