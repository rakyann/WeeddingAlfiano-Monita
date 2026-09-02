'use client';

import React from 'react';

export function MempelaiSection() {
  return (
    <section id="mempelai-section" className="wedding-section mempelai-section">
      <div className="section-badge-pill">Groom &amp; Bride</div>
      <h2 className="section-script-title">Pasangan Mempelai</h2>
      <p className="section-intro-text">
        Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon Rahmat dan Ridho-Nya, kami bermaksud melangsungkan pernikahan:
      </p>

      <div className="couple-profile-cards">
        {/* Groom Profile */}
        <div className="couple-profile-card">
          <div className="couple-photo-arch">
            <img
              src="/img/alifano.jpeg"
              alt="Alifano Dwi Cahyo"
            />
          </div>
          <h3 className="couple-calligraphy-name">Alifano</h3>
          <h4 className="couple-full-name">Alifano Dwi Cahyo</h4>
          <p className="couple-parents-info">
            Putra tercinta dari<br />
            <strong>Bapak Sudir</strong> &amp; <strong>Ibu Estiningsih</strong>
          </p>
          <a
            href="https://instagram.com/alifanodc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ig-pill"
          >
            <i className="fa-brands fa-instagram" /> @alifanodc
          </a>
        </div>

        {/* Ampersand Divider */}
        <div className="ampersand-divider">&amp;</div>

        {/* Bride Profile */}
        <div className="couple-profile-card">
          <div className="couple-photo-arch">
            <img
              src="/img/Monita.jpeg"
              alt="Monita Ameliani Febriana"
            />
          </div>
          <h3 className="couple-calligraphy-name">Monita</h3>
          <h4 className="couple-full-name">Monita Ameliani Febriana</h4>
          <p className="couple-parents-info">
            Putri tercinta dari<br />
            <strong>Bapak (Alm) Toto Sugiarto</strong> &amp;<br />
            <strong>Ibu Puji Sistiawati</strong>
          </p>
          <a
            href="https://instagram.com/monitameliaa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ig-pill"
          >
            <i className="fa-brands fa-instagram" /> @monitameliaa
          </a>
        </div>
      </div>
    </section>
  );
}
