'use client';

import React, { useEffect } from 'react';
import { galleryImages } from './GallerySection';

interface LightboxModalProps {
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxModal({
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null) return null;

  const currentItem = galleryImages[currentIndex];

  return (
    <div
      className="lightbox-modal active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close Lightbox"
      >
        &times;
      </button>
      <button
        className="lightbox-nav lightbox-prev"
        onClick={onPrev}
        aria-label="Previous image"
      >
        <i className="fa-solid fa-chevron-left" />
      </button>
      <button
        className="lightbox-nav lightbox-next"
        onClick={onNext}
        aria-label="Next image"
      >
        <i className="fa-solid fa-chevron-right" />
      </button>
      <div className="lightbox-content">
        <img
          src={currentItem.src}
          alt={currentItem.caption}
        />
        <div className="lightbox-caption">{currentItem.caption}</div>
      </div>
    </div>
  );
}
