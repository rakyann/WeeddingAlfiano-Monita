'use client';

import React from 'react';

interface GallerySectionProps {
  onOpenLightbox: (index: number) => void;
}

export const galleryImages = [
  { src: '/img/DEV03503.JPG', caption: 'Alifano & Monita', span: 'item-tall' },
  { src: '/img/DEV03564.JPG', caption: 'Momen Bersama', span: '' },
  { src: '/img/DEV03606.JPG', caption: 'Kebersamaan', span: '' },
  { src: '/img/DEV03652.JPG', caption: 'Penuh Kasih', span: 'item-wide' },
  { src: '/img/DEV03712.JPG', caption: 'Senyum Bahagia', span: '' },
  { src: '/img/DEV03791.JPG', caption: 'Bersama Selamanya', span: 'item-tall' },
  { src: '/img/DEV04091.JPG', caption: 'Momen Berharga', span: '' },
  { src: '/img/DEV04100.JPG', caption: 'Kenangan Indah', span: '' },
  { src: '/img/DSC07649.JPG', caption: 'Love Story', span: 'item-wide' },
];

export function GallerySection({ onOpenLightbox }: GallerySectionProps) {
  return (
    <section className="section-card gallery-section">
      <div className="tuscany-doodle doodle-gal-l">
        <img src="/assets/tuscany/lemon.png" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-gal-r">
        <img src="/assets/tuscany/fruits.png" alt="Doodle" />
      </div>

      <div className="section-badge-pill">Our Moments</div>
      <h2 className="tuscany-script-heading">Galeri Kebahagiaan</h2>
      <p className="section-intro-text">
        Setiap potret mengabadikan kisah kasih, tawa, dan janji suci kami berdua
      </p>

      {/* Gallery Grid */}
      <div className="tuscany-gallery-grid">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className={`gallery-grid-item ${img.span}`}
            onClick={() => onOpenLightbox(idx)}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
            <div className="gallery-item-overlay">
              <i className="fa-solid fa-magnifying-glass-plus" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
