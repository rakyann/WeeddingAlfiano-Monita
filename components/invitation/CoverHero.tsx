'use client';

import React, { useState } from 'react';

interface CoverHeroProps {
  guestName: string;
  isVip?: boolean;
  onOpen: () => void;
  isOpen: boolean;
}

export function CoverHero({ guestName, isVip, onOpen, isOpen }: CoverHeroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <section id="cover-section" className="wedding-section hero-cover">
      {/* Header Monogram & Names */}
      <div className="hero-header">
        <p className="hero-subtitle">WE'RE GETTING MARRIED</p>
        <h1 className="hero-title">
          Alifano
          <span className="hero-title-amp">&amp;</span>
          Monita
        </h1>

        {/* Dynamic Guest Name Tag */}
        <div className="guest-invitation-box">
          <div className="guest-intro-label">Kepada Yth. Bapak/Ibu/Saudara/i:</div>
          <div className="guest-target-name">{guestName || 'Tamu Undangan'}</div>
          {isVip && <div className="vip-badge-pill">VIP GUEST</div>}
        </div>
      </div>

      {/* Authentic Vintage Lace Envelope */}
      <div
        className={`vintage-envelope-trigger ${isOpen || isOpening ? 'unsealed' : ''}`}
        id="envelopeTrigger"
        onClick={handleClick}
      >
        <div className="envelope-card-stage">
          {/* Gold foil invitation card sliding out */}
          <div className="envelope-slide-card" id="cardInside">
            <div className="envelope-slide-card-inner">
              <span
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '11px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: '#8C8478',
                  marginBottom: '2px',
                }}
              >
                Wedding Invitation
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '32px',
                  fontStyle: 'italic',
                  color: '#1F2820',
                  lineHeight: 1,
                }}
              >
                Alifano &amp; Monita
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#C5A880',
                  marginTop: '4px',
                }}
              >
                13 September 2026
              </div>
            </div>
          </div>

          {/* Pure Antique Lace Envelope */}
          <img
            src="/assets/vintage/images/vintage_envelope_cutout.png"
            alt="Luxury Vintage Envelope"
            className="envelope-main-img"
          />
        </div>
      </div>

      {/* Pulsing Open Hint Button */}
      {!isOpen && (
        <button className="envelope-hint-pill" id="openHintBtn" onClick={handleClick}>
          <i className="fa-solid fa-envelope-open-text" />
          <span>KLIK AMPLOP UNTUK MEMBUKA</span>
        </button>
      )}
    </section>
  );
}
