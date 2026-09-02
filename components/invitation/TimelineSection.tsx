'use client';

import React from 'react';

export function TimelineSection() {
  const timelineEvents = [
    {
      icon: '/assets/vintage/icons/guest_arrival.svg',
      time: '08.00 WIB',
      title: 'Kehadiran Tamu',
    },
    {
      icon: '/assets/vintage/icons/bride_groom.svg',
      time: '08.30 WIB',
      title: 'Akad Nikah',
    },
    {
      icon: '/assets/vintage/icons/dining.svg',
      time: '11.00 WIB',
      title: 'Resepsi & Santap Siang',
    },
    {
      icon: '/assets/vintage/icons/photography.svg',
      time: '12.00 WIB',
      title: 'Sesi Foto Bersama',
    },
    {
      icon: '/assets/vintage/icons/farewell.svg',
      time: '13.00 WIB',
      title: 'Penutupan Acara',
    },
  ];

  return (
    <section id="timeline-section" className="wedding-section timeline-section">
      <h2 className="timeline-title">Our Timeline</h2>

      <div className="timeline-items-grid">
        {/* Row 1 */}
        <div className="timeline-row">
          {timelineEvents.slice(0, 3).map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-icon-box">
                <img src={item.icon} alt={item.title} />
              </div>
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-event-name">{item.title}</div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="timeline-row" style={{ maxWidth: '240px', margin: '0 auto' }}>
          {timelineEvents.slice(3, 5).map((item, idx) => (
            <div key={idx + 3} className="timeline-item">
              <div className="timeline-icon-box">
                <img src={item.icon} alt={item.title} />
              </div>
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-event-name">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
