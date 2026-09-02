'use client';

import React from 'react';

export function BlessingContactSection() {
  return (
    <section id="blessing-section" className="wedding-section blessing-section">
      <div className="blessing-inner">
        {/* Photo Frame */}
        <div className="blessing-frame-wrap">
          <img
            src="/img/WhatsApp%20Image%202026-08-27%20at%2022.08.57.jpeg"
            alt="Alifano & Monita"
          />
        </div>

        {/* Prayer Text */}
        <p className="blessing-dua-text">
          Semoga Allah SWT memberkahi pernikahan kami dengan cinta, kasih sayang, kesabaran, dan keberkahan, serta menjadikannya jalan menuju Jannah.
        </p>
        <div className="blessing-aamiin">Aamiin Allahumma Aamiin</div>

        {/* Monogram AM */}
        <div style={{ marginTop: '20px' }}>
          <div className="contact-monogram">AM</div>
          <div
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '15px',
              fontStyle: 'italic',
              color: '#7A746B',
            }}
          >
            Alifano &amp; Monita
          </div>
        </div>
      </div>
    </section>
  );
}
