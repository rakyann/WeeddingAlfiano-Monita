'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Navigation } from 'lucide-react';

/* ── Torn paper top edge ── */
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

export const EventDetailsSection: React.FC = () => {
  const events = [
    {
      title: 'Akad Nikah',
      subTitle: 'Holy Matrimony',
      date: 'Minggu, 13 September 2026',
      time: '08:00 - 10:00 WIB',
      venue: 'Masjid Agung At-Tin',
      address: 'Jl. Taman Mini I No.3, Pinang Ranti, Kec. Makasar, Kota Jakarta Timur, DKI Jakarta 13560',
      mapsUrl: 'https://maps.google.com/?q=Masjid+Agung+At-Tin+Jakarta',
      image: '/img/DEV03791.JPG',
    },
    {
      title: 'Resepsi Pernikahan',
      subTitle: 'Wedding Celebration & Dining',
      date: 'Minggu, 13 September 2026',
      time: '18:30 - 21:30 WIB',
      venue: 'Grand Ballroom Hotel Mulia Senayan',
      address: 'Jl. Asia Afrika No.1, Gelora, Tanah Abang, Kota Jakarta Pusat, DKI Jakarta 10270',
      mapsUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta',
      image: '/img/DSC07688.JPG',
    },
  ];

  return (
    <section
      className="w-full text-cream py-20 px-6 relative"
      style={{ backgroundColor: '#17335C' }}
    >
      <TornCreamTop />

      <div className="text-center mt-4 mb-12">
        <p className="tracking-[0.25em] text-[11px] font-serif uppercase text-blue-light mb-2">
          Save the Date &amp; Location
        </p>
        <h2 className="font-script text-5xl text-white">Detail Acara</h2>
        <p className="text-xs text-cream/75 max-w-xs mx-auto mt-2 font-serif">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
      </div>

      <div className="space-y-16 max-w-sm mx-auto">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="flex flex-col items-center text-center bg-white/5 border border-cream/15 rounded-3xl p-6 backdrop-blur-sm shadow-xl"
          >
            {/* Arched image */}
            <div className="w-56 h-44 rounded-t-full rounded-b-lg overflow-hidden mb-6 border-2 border-cream/20 shadow-md">
              <img
                src={event.image}
                alt={event.venue}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-serif text-[11px] uppercase tracking-widest text-blue-light font-bold mb-1">
              {event.subTitle}
            </span>
            <h3 className="font-script text-4xl text-cream mb-4">{event.title}</h3>

            <div className="w-full space-y-3 font-serif text-sm border-t border-b border-cream/15 py-4 my-2">
              <div className="flex items-center justify-center gap-2 text-cream/90">
                <Calendar className="w-4 h-4 text-blue-light flex-shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-cream/90">
                <Clock className="w-4 h-4 text-blue-light flex-shrink-0" />
                <span>{event.time}</span>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <h4 className="font-serif-title font-bold text-base text-cream">{event.venue}</h4>
              <p className="font-sans text-xs text-cream/70 mt-1 max-w-[260px] leading-relaxed">
                {event.address}
              </p>
            </div>

            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cream text-navy-deep font-serif text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              Petunjuk Google Maps
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
