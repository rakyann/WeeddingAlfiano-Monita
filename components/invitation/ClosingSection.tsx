'use client';

import React from 'react';

export function ClosingSection() {
  return (
    <section className="section-card closing-section">
      <div className="tuscany-doodle doodle-cl-l">
        <img src="/assets/tuscany/img_5016.gif" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-cl-r">
        <img src="/assets/tuscany/img_5019.gif" alt="Doodle" />
      </div>

      <h2 className="tuscany-script-heading thank-you-title">Thank You</h2>
      <p className="closing-sub">for your presence &amp; blessing</p>

      {/* Closing Photo Arch */}
      <div className="closing-photo-arch-wrap">
        <img
          src="/img/DEV03503.JPG"
          alt="Alifano & Monita"
          className="closing-couple-img"
        />
        <img
          src="/assets/tuscany/fruits.png"
          alt="Fruits"
          className="closing-decor-fruits"
        />
        <img
          src="/assets/tuscany/lemon.png"
          alt="Lemon"
          className="closing-decor-lemon"
        />
      </div>

      <p className="closing-paragraph">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do&apos;a restu kepada kami.
      </p>

      <div className="closing-sign-names">Alifano &amp; Monita</div>

      {/* Footer */}
      <footer className="tuscany-footer">
        <div className="footer-copy">The Wedding of Alifano &amp; Monita &copy; 2026</div>
        <div className="footer-sub">Crafted by tuaipandang</div>
      </footer>
    </section>
  );
}
