'use client';

import React from 'react';

export function MempelaiSection() {
  return (
    <section className="section-card couple-section">
      <div className="tuscany-doodle doodle-couple-t">
        <img src="/assets/tuscany/tuscany19.png" alt="Doodle" />
      </div>

      <div className="section-badge-pill">Groom &amp; Bride</div>
      <h2 className="tuscany-script-heading">Pasangan Mempelai</h2>
      <p className="section-intro-text">
        Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud mengundang Anda dalam momen sakral kami:
      </p>

      {/* Groom Card */}
      <div className="tuscany-profile-card">
        <div className="profile-frame-wrap">
          <div className="profile-photo-arch">
            <img
              src="/img/DEV03827.JPG"
              alt="Alifano"
              className="profile-img"
            />
          </div>
          <img
            src="/assets/tuscany/spaghetti.png"
            alt="Pasta Doodle"
            className="profile-decor-sticker pasta-sticker"
          />
          <img
            src="/assets/tuscany/img_5022.gif"
            alt="Gif Sparkle"
            className="profile-decor-gif"
          />
        </div>

        <div className="profile-text-content">
          <h3 className="profile-calligraphy-name">Alifano</h3>
          <h4 className="profile-full-name">Alifano</h4>
          <p className="profile-parents-info">
            Putra tercinta dari<br />
            <strong>Bapak ...</strong> &amp; <strong>Ibu ...</strong>
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tuscany-pill"
          >
            <i className="fa-brands fa-instagram" /> @alifano
          </a>
        </div>
      </div>

      {/* Ampersand Divider */}
      <div className="tuscany-ampersand-divider">
        <img src="/assets/tuscany/lemon.png" alt="Lemon" className="divider-lemon-img" />
        <span className="divider-and">&amp;</span>
        <img src="/assets/tuscany/fruits.png" alt="Fruits" className="divider-fruits-img" />
      </div>

      {/* Bride Card */}
      <div className="tuscany-profile-card">
        <div className="profile-frame-wrap">
          <div className="profile-photo-arch">
            <img
              src="/img/DEV03826.JPG"
              alt="Monita"
              className="profile-img"
            />
          </div>
          <img
            src="/assets/tuscany/tuscany31.png"
            alt="Olive Doodle"
            className="profile-decor-sticker olive-sticker"
          />
          <img
            src="/assets/tuscany/img_5035.gif"
            alt="Gif Sparkle"
            className="profile-decor-gif"
          />
        </div>

        <div className="profile-text-content">
          <h3 className="profile-calligraphy-name">Monita</h3>
          <h4 className="profile-full-name">Monita</h4>
          <p className="profile-parents-info">
            Putri tercinta dari<br />
            <strong>Bapak ...</strong> &amp; <strong>Ibu ...</strong>
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tuscany-pill"
          >
            <i className="fa-brands fa-instagram" /> @monita
          </a>
        </div>
      </div>
    </section>
  );
}
