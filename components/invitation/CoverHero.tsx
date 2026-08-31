'use client';

import React from 'react';

interface CoverHeroProps {
  guestName?: string;
  onOpen: () => void;
}

export function CoverHero({ guestName = 'Tamu Undangan', onOpen }: CoverHeroProps) {
  return (
    <section className="section-card cover-section" id="coverSection">
      {/* Tuscany Border Arch / Doodles */}
      <div className="tuscany-doodle doodle-tl">
        <img src="/assets/tuscany/tuscany14.png" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-tr">
        <img src="/assets/tuscany/tuscany15.png" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-bl">
        <img src="/assets/tuscany/fruits.png" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-br">
        <img src="/assets/tuscany/lemon.png" alt="Doodle" />
      </div>

      <div className="cover-inner">
        <div className="tuscany-script-sub">The Wedding of</div>
        <h1 className="tuscany-main-title">Alifano &amp; Monita</h1>

        {/* Central Couple Photo inside Tuscany Floral Arch Frame */}
        <div className="cover-illustration-box">
          <div className="cover-arch-photo-wrapper">
            <img
              src="/img/cover.jpeg"
              alt="Foto Mempelai Alifano & Monita"
              className="cover-couple-photo"
            />
          </div>
          <img
            src="/assets/tuscany/img_5008.gif"
            alt="Sparkle Animated"
            className="cover-art-gif"
          />
        </div>

        {/* Guest Card Box */}
        <div className="guest-card-box">
          <p className="guest-salutation">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <h2 className="guest-name">{guestName}</h2>
          <p className="guest-note">*Mohon maaf bila ada kesalahan penulisan nama / gelar</p>
        </div>

        {/* Open Invitation Button */}
        <button onClick={onOpen} className="btn-open-invitation" id="openInvitationBtn">
          <i className="fa-solid fa-envelope-open-text" />
          <span>Buka Undangan</span>
        </button>
      </div>
    </section>
  );
}
