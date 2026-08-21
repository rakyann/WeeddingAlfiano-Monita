'use client';

import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

export const VenuesSection: React.FC = () => {
  const googleMapsUrl = 'https://maps.google.com/?q=Hotel+Mulia+Jakarta';
  const wazeUrl = 'https://waze.com/ul?ll=-6.2163,106.7975&navigate=yes';

  return (
    <section className="relative py-14 px-6 bg-[#2D1E18] text-[#FAF6F0]">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            VENUE LOCATION
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            Lokasi Acara
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* Vintage Silver/Gold Mirror Tray Framed Location Card (Matching reference design top-right card) */}
        <div className="relative p-2 rounded-3xl bg-gradient-to-b from-[#D4AF37] via-[#C5A059] to-[#8C6D37] shadow-2xl">
          <div className="paper-card p-6 relative text-center text-[#2C1D18]">
            <div className="pearl-pin" />

            <div className="w-8 h-8 mx-auto rounded-full bg-[#2D1E18] text-[#C5A059] flex items-center justify-center mb-3">
              <MapPin className="w-4 h-4" />
            </div>

            <span className="text-[10px] uppercase font-bold text-[#8C6D37] tracking-widest block mb-1">
              GRAND BALLROOM
            </span>
            <h3 className="font-serif text-xl font-bold text-[#2C1D18] mb-2">
              Hotel Mulia Senayan, Jakarta
            </h3>

            <p className="text-xs text-[#5A453C] leading-relaxed mb-4">
              Jl. Asia Afrika No.1, Gelora, Tanah Abang, Jakarta Pusat, DKI Jakarta 10270
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#C5A059]/30">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#2D1E18] text-[#FAF6F0] text-xs font-serif-title tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#3B2B24] transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C5A059]" /> Google Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#2D1E18] text-[#FAF6F0] text-xs font-serif-title tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#3B2B24] transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" /> Waze App
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
