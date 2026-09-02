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
    <section id="gallery-section" className="wedding-section gallery-section">
      <div className="section-badge-pill">Our Moments</div>
      <h2 className="section-script-title">Galeri Foto</h2>
      <p className="section-intro-text">
        Setiap potret mengabadikan kisah kasih, tawa, dan janji suci kami berdua
      </p>

      {/* Gallery Grid */}
      <div className="gallery-grid" id="galleryGrid">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className={`gallery-card ${img.span}`}
            onClick={() => onOpenLightbox(idx)}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
            <div className="gallery-overlay">
              <i className="fa-solid fa-magnifying-glass-plus" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
