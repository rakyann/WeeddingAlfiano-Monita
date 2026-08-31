'use client';

import React from 'react';

interface GallerySectionProps {
  onOpenLightbox: (index: number) => void;
}

export const galleryImages = [
  { src: '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.40%20(1).jpeg', caption: 'Alifano & Monita', span: 'item-tall' },
  { src: '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.40.jpeg', caption: 'Momen Bahagia', span: '' },
  { src: '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.56%20(1).jpeg', caption: 'Kisah Kasih', span: 'item-wide' },
  { src: '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.56%20(2).jpeg', caption: 'Senyum Indah', span: '' },
  { src: '/img/WhatsApp%20Image%202026-08-27%20at%2022.08.57.jpeg', caption: 'Bersama Selamanya', span: 'item-tall' },
];

export function GallerySection({ onOpenLightbox }: GallerySectionProps) {
  return (
    <section className="section-card gallery-section">
      <div className="tuscany-doodle doodle-gal-l">
        <img src="/assets/tuscany/tuscany40.png" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-gal-r">
        <img src="/assets/tuscany/tuscany41.png" alt="Doodle" />
      </div>

      <div className="section-badge-pill">Our Moments</div>
      <h2 className="tuscany-script-heading">Galeri Kebahagiaan</h2>
      <p className="section-intro-text">
        Setiap potret mengabadikan kisah kasih, tawa, dan janji suci kami berdua
      </p>

      {/* Gallery Grid */}
      <div className="tuscany-gallery-grid" id="galleryGrid">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className="gallery-card"
            onClick={() => onOpenLightbox(idx)}
            data-index={idx}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
            <div className="gallery-card-overlay">
              <i className="fa-solid fa-magnifying-glass-plus" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
