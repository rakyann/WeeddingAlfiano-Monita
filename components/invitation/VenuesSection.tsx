'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { FloralDivider } from '../ui/FloralDecoration';

export const VenuesSection: React.FC = () => {
  const googleMapsUrl = 'https://maps.google.com/?q=Hotel+Mulia+Jakarta';
  const wazeUrl = 'https://waze.com/ul?ll=-6.2163,106.7975&navigate=yes';

  return (
    <section className="relative py-14 px-6 bg-[#17335C] text-[#F7F3EA]">
      <div className="max-w-md mx-auto text-center">
        <span className="font-serif-title text-xs text-[#D4AF37] tracking-[0.2em]">
          LOCATION GUIDE
        </span>
        <h2 className="font-script text-4xl text-[#F7F3EA] mt-1 mb-2">
          Lokasi Acara
        </h2>
        <FloralDivider color="#D4AF37" />

        {/* Venue Photo Frame */}
        <div className="relative my-6 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1545232979-fbf59202c395?w=800&auto=format&fit=crop&q=80"
            alt="Venue Hotel Mulia Jakarta"
            className="w-full h-52 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17335C] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 left-4 right-4 text-left">
            <span className="bg-[#D4AF37] text-[#17335C] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              GRAND BALLROOM
            </span>
            <h3 className="font-serif text-lg font-bold text-white mt-1">
              Hotel Mulia Senayan, Jakarta
            </h3>
          </div>
        </div>

        {/* Address Card */}
        <div className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/30 text-center mb-6">
          <div className="w-8 h-8 mx-auto rounded-full bg-[#3E5C8A] text-[#D4AF37] flex items-center justify-center mb-2">
            <MapPin className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#B7C7E3] leading-relaxed">
            Jl. Asia Afrika No.1, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270
          </p>
        </div>

        {/* 1-Click Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-[#3E5C8A] text-[#F7F3EA] border border-[#D4AF37]/40 text-xs font-serif-title tracking-wider flex items-center justify-center gap-2 shadow hover:bg-[#17335C] transition-all"
          >
            <Navigation className="w-4 h-4 text-[#D4AF37]" /> Google Maps
          </a>

          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-[#3E5C8A] text-[#F7F3EA] border border-[#D4AF37]/40 text-xs font-serif-title tracking-wider flex items-center justify-center gap-2 shadow hover:bg-[#17335C] transition-all"
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" /> Waze App
          </a>
        </div>
      </div>
    </section>
  );
};
