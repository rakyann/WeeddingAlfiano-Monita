'use client';

import React from 'react';

export function BlessingContactSection() {
  const parents = [
    {
      name: 'Ibu Estiningsih',
      role: 'Ibunda Alifano',
      wa: 'https://wa.me/628123456789?text=Halo%20Ibu%20Estiningsih,%20selamat%20atas%20pernikahan%20Alifano%20%26%20Monita',
    },
    {
      name: 'Ibu Puji Sistiawati',
      role: 'Ibunda Monita',
      wa: 'https://wa.me/628123456780?text=Halo%20Ibu%20Puji,%20selamat%20atas%20pernikahan%20Alifano%20%26%20Monita',
    },
  ];

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

        {/* Parents Contact Card */}
        <div className="parents-contact-box">
          <div className="contact-monogram">AM</div>
          <p className="contact-subtitle">
            Jika Anda memiliki pertanyaan seputar acara, silakan menghubungi pihak keluarga:
          </p>

          <div className="parents-grid">
            {parents.map((parent, idx) => (
              <div key={idx} className="parent-card">
                <div className="parent-name">{parent.name}</div>
                <div className="parent-role">{parent.role}</div>
                <a
                  href={parent.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-circle"
                  title={`WhatsApp ${parent.name}`}
                >
                  <i className="fa-brands fa-whatsapp" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
