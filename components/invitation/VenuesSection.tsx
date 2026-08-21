'use client';

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { SilverTrayFrame, BotanicalSprig } from '../ui/BaroqueFrame';

export const VenuesSection: React.FC = () => {
  const googleMapsUrl = 'https://maps.google.com/?q=Hotel+Mulia+Jakarta';

  return (
    <section className="relative py-14 px-6 bg-[#382821] text-[#FAF5EF]">
      <div className="lace-overlay-right" />

      <div className="max-w-md mx-auto text-center space-y-8">
        {/* Silver Tray & Pearl Mirror Tray Container (Matching top-right card of reference image) */}
        <SilverTrayFrame>
          <div className="paper-card p-6 relative text-center text-[#2C1E18]">
            <div className="pearl-pin" />
            <BotanicalSprig className="absolute bottom-2 right-2 opacity-80" />

            <h2 className="font-script text-4xl text-[#8C6D37] mb-2 italic">
              Lokasi Acara
            </h2>

            <h3 className="font-serif text-xl font-bold text-[#2C1E18] my-2">
              Hotel Mulia Senayan, Jakarta
            </h3>

            <p className="text-xs text-[#5A453C] leading-relaxed mb-6">
              Jl. Asia Afrika No.1, Gelora, Tanah Abang, Jakarta Pusat, DKI Jakarta 10270
            </p>

            {/* Underlined link button matching reference design "ПОСМОТРЕТЬ КАРТУ" */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b-2 border-[#2C1E18] text-[#2C1E18] font-serif-title font-bold text-xs tracking-widest uppercase hover:text-[#8C6D37] hover:border-[#8C6D37] transition-colors pb-1"
            >
              LIHAT PETA GOOGLE MAPS
            </a>
          </div>
        </SilverTrayFrame>
      </div>
    </section>
  );
};
