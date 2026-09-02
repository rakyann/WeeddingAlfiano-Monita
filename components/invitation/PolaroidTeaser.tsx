'use client';

import React from 'react';

export function PolaroidTeaser() {
  const scrollToRsvp = () => {
    const rsvp = document.getElementById('rsvp-section');
    if (rsvp) {
      rsvp.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="wedding-section rsvp-teaser-section">
      <div className="rsvp-teaser-inner">
        <div
          className="polaroid-envelope-stack"
          id="rsvpTeaserCard"
          onClick={scrollToRsvp}
          title="Klik untuk RSVP"
        >
          {/* Vintage Polaroid 1 */}
          <img
            src="/assets/vintage/images/polaroid_1.png"
            alt="Polaroid Couple"
            className="polaroid-card polaroid-1"
          />

          {/* Vintage Polaroid 2 */}
          <img
            src="/assets/vintage/images/polaroid_2.png"
            alt="Polaroid Couple Reflection"
            className="polaroid-card polaroid-2"
          />

          {/* Antique Handmade Lace Envelope Base */}
          <div className="stack-envelope-base">
            <img
              src="/assets/vintage/images/vintage_envelope_cutout.png"
              alt="Antique Lace Envelope"
              className="stack-envelope-img"
            />
          </div>

          {/* Deep Burgundy Wax Seal Tag */}
          <div className="stack-heart-seal">
            <img
              src="/assets/vintage/icons/heart_rsvp_seal.svg"
              alt="Kindly RSVP - Click Here"
              className="stack-heart-seal-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
