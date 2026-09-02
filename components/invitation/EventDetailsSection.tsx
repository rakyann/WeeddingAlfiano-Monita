'use client';

import React from 'react';

interface EventDetailsSectionProps {
  onShowToast: (msg: string) => void;
}

export function EventDetailsSection({ onShowToast }: EventDetailsSectionProps) {
  const venueTitle = 'Venue Pernikahan Alifano & Monita';
  const venueAddress = 'Jl. Raya Kebahagiaan No. 13, Jakarta';
  const mapsUrl = 'https://maps.google.com/?q=Jakarta';
  const wazeUrl = 'https://waze.com/ul?q=Jakarta';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venueTitle}, ${venueAddress}`).then(() => {
      onShowToast('Alamat berhasil disalin ke clipboard!');
    }).catch(() => {
      onShowToast(`Salin: ${venueAddress}`);
    });
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('The Wedding of Alifano & Monita');
    const details = encodeURIComponent('Pernikahan Alifano Dwi Cahyo & Monita Ameliani Febriana');
    const location = encodeURIComponent(`${venueTitle}, ${venueAddress}`);
    // 2026-09-13 from 08:00 to 13:00 WIB (01:00 to 06:00 UTC)
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260913T010000Z/20260913T060000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <section id="reception-section" className="wedding-section reception-section">
      <div className="section-tag">Wedding Event</div>
      <h2 className="reception-heading">Waktu &amp; Lokasi</h2>

      <div className="event-details-grid">
        {/* Event 1: Akad Nikah */}
        <div className="event-detail-card">
          <div className="event-type-pill">
            <i className="fa-solid fa-ring" style={{ marginRight: '6px' }} />
            Akad Nikah
          </div>
          <div className="event-date-val">Minggu, 13 September 2026</div>
          <div className="event-time-val">
            <i className="fa-regular fa-clock" style={{ marginRight: '4px' }} />
            08.00 WIB &ndash; Selesai
          </div>
          <div className="event-venue-name">{venueTitle}</div>
          <p className="event-address">{venueAddress}</p>
        </div>

        {/* Event 2: Resepsi */}
        <div className="event-detail-card">
          <div className="event-type-pill">
            <i className="fa-solid fa-champagne-glasses" style={{ marginRight: '6px' }} />
            Resepsi Pernikahan
          </div>
          <div className="event-date-val">Minggu, 13 September 2026</div>
          <div className="event-time-val">
            <i className="fa-regular fa-clock" style={{ marginRight: '4px' }} />
            11.00 &ndash; 13.00 WIB
          </div>
          <div className="event-venue-name">{venueTitle}</div>
          <p className="event-address">{venueAddress}</p>
        </div>
      </div>

      <div className="map-buttons-grid">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxury-outline"
        >
          <i className="fa-solid fa-location-dot" /> Google Maps
        </a>
        <a
          href={wazeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxury-outline"
        >
          <i className="fa-brands fa-waze" /> Waze
        </a>
        <button
          onClick={handleCopyAddress}
          className="btn-luxury-outline"
        >
          <i className="fa-regular fa-copy" /> Salin Alamat
        </button>
      </div>

      <div style={{ marginTop: '14px' }}>
        <button
          className="btn-luxury-outline"
          onClick={handleAddToCalendar}
          style={{ minWidth: '240px' }}
        >
          <i className="fa-regular fa-calendar-plus" /> Simpan ke Google Calendar
        </button>
      </div>
    </section>
  );
}
