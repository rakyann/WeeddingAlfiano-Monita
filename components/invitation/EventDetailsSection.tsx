'use client';

import React from 'react';

interface EventDetailsSectionProps {
  onShowToast: (msg: string) => void;
}

export function EventDetailsSection({ onShowToast }: EventDetailsSectionProps) {
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      onShowToast('Alamat berhasil disalin ke clipboard!');
    }).catch(() => {
      onShowToast(`Salin: ${address}`);
    });
  };

  const venueAddress = 'Venue Pernikahan Alifano & Monita';

  return (
    <section className="section-card events-section">
      <div className="tuscany-doodle doodle-ev-t">
        <img src="/assets/tuscany/untitled_artwork.gif" alt="Doodle" />
      </div>

      <div className="section-badge-pill">Wedding Event</div>
      <h2 className="tuscany-script-heading">Rangkaian Acara</h2>

      {/* Event 1: Akad Nikah */}
      <div className="event-card-tuscany">
        <div className="event-type-badge">
          <i className="fa-solid fa-ring" /> Akad Nikah
        </div>
        <div className="event-time-row">
          <div className="time-item">
            <i className="fa-regular fa-calendar" /> Minggu, 13 September 2026
          </div>
          <div className="time-item highlight-time">
            <i className="fa-regular fa-clock" /> 08:00 WIB - Selesai
          </div>
        </div>

        <div className="event-location-box">
          <div className="location-icon-wrapper">
            <img src="/assets/tuscany/Location.gif" alt="Location" className="location-gif-icon" />
          </div>
          <h4 className="venue-title">Venue Pernikahan</h4>
          <p className="venue-detail-address">
            Alamat venue pernikahan Alifano &amp; Monita
          </p>

          <div className="event-btn-group">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tuscany-outline"
            >
              <i className="fa-solid fa-map-location-dot" /> Buka Google Maps
            </a>
            <button
              onClick={() => handleCopyAddress(venueAddress)}
              className="btn-tuscany-copy-addr"
            >
              <i className="fa-regular fa-copy" /> Salin Alamat
            </button>
          </div>
        </div>
      </div>

      {/* Event 2: Resepsi */}
      <div className="event-card-tuscany">
        <div className="event-type-badge">
          <i className="fa-solid fa-champagne-glasses" /> Resepsi Pernikahan
        </div>
        <div className="event-time-row">
          <div className="time-item">
            <i className="fa-regular fa-calendar" /> Minggu, 13 September 2026
          </div>
          <div className="time-item highlight-time">
            <i className="fa-regular fa-clock" /> 11:00 WIB - 13:00 WIB
          </div>
        </div>

        <div className="event-location-box">
          <div className="location-icon-wrapper">
            <img src="/assets/tuscany/Location.gif" alt="Location" className="location-gif-icon" />
          </div>
          <h4 className="venue-title">Venue Pernikahan</h4>
          <p className="venue-detail-address">
            Alamat venue pernikahan Alifano &amp; Monita
          </p>

          <div className="event-btn-group">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tuscany-outline"
            >
              <i className="fa-solid fa-map-location-dot" /> Buka Google Maps
            </a>
            <button
              onClick={() => handleCopyAddress(venueAddress)}
              className="btn-tuscany-copy-addr"
            >
              <i className="fa-regular fa-copy" /> Salin Alamat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
