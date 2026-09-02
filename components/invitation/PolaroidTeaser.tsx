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
          {/* Real Photo Polaroid 1 */}
          <div className="polaroid-custom-frame polaroid-1">
            <img
              src="/img/WhatsApp%20Image%202026-08-27%20at%2022.08.40%20(1).jpeg"
              alt="Alifano & Monita"
            />
          </div>

          {/* Real Photo Polaroid 2 */}
          <div className="polaroid-custom-frame polaroid-2">
            <img
              src="/img/cover.jpeg"
              alt="Alifano & Monita Prewedding"
            />
          </div>

          {/* Antique Handmade Lace Envelope Base */}
          <div className="stack-envelope-base">
            <img
              src="/assets/vintage/images/vintage_envelope_cutout.png"
              alt="Antique Lace Envelope"
              className="stack-envelope-img"
            />
          </div>

          {/* Deep Red Wax Heart Seal (Tanpa teks RSVP) */}
          <div className="stack-heart-seal">
            <img
              src="/assets/vintage/icons/heart_rsvp_seal.svg"
              alt="Red Heart Wax Seal"
              className="stack-heart-seal-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
