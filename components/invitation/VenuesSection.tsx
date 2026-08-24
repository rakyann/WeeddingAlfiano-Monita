'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ── Torn paper edge: cream bar at top (sits on navy background) ── */
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

const venues = [
  {
    key: 'ceremony',
    label: 'Ceremony',
    name: 'Masjid Agung At-Tin',
    address: 'Taman Mini Indonesia Indah, Jakarta Timur',
    mapsUrl: 'https://maps.google.com/?q=Masjid+Agung+At-Tin+Jakarta',
    image: '/img/DEV03791.JPG',
  },
  {
    key: 'reception',
    label: 'Reception',
    name: 'Hotel Mulia Senayan',
    address: 'Jl. Asia Afrika No.1, Gelora, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta',
    image: '/img/DSC07688.JPG',
  },
];

export const VenuesSection: React.FC = () => {
  return (
    <section
      className="w-full text-cream py-20 px-6 relative"
      style={{ backgroundColor: '#17335C' }}
    >
      <TornCreamTop />

      <h2 className="font-script text-5xl text-center mb-12 mt-4 text-white">The Venues</h2>

      <div className="space-y-16">
        {venues.map((venue, idx) => (
          <motion.div
            key={venue.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="flex flex-col items-center"
          >
            {/* Oval portrait frame */}
            <div className="w-64 h-64 rounded-t-full bg-navy-deep/20 mb-6 overflow-hidden border-4 border-navy-accent/30 shadow-lg">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-serif font-bold tracking-widest text-sm uppercase text-cream/70 mb-2">
              {venue.label}
            </h3>
            <h4 className="font-serif text-2xl text-cream mb-3 text-center">{venue.name}</h4>
            <p className="font-sans text-cream/75 text-sm mb-5 max-w-xs mx-auto text-center leading-relaxed">
              {venue.address}
            </p>
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-cream/50 pb-1 font-serif text-sm uppercase tracking-widest hover:text-blue-light transition-colors"
            >
              View Map
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
