'use client';

import React from 'react';

interface DigitalEnvelopeSectionProps {
  onOpenQris: () => void;
  onShowToast: (msg: string) => void;
}

export function DigitalEnvelopeSection({
  onOpenQris,
  onShowToast,
}: DigitalEnvelopeSectionProps) {
  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text).then(() => {
      onShowToast(`Nomor rekening ${bank} berhasil disalin!`);
    }).catch(() => {
      onShowToast(`Salin: ${text}`);
    });
  };

  return (
    <section id="gift-section" className="wedding-section gift-section">
      <div className="section-badge-pill">Wedding Gift</div>
      <h2 className="section-script-title">Tanda Kasih</h2>
      <p className="section-intro-text">
        Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih secara digital, Anda dapat melalui:
      </p>

      <div className="bank-cards-grid">
        {/* Bank BCA */}
        <div className="bank-card">
          <div className="bank-header-row">
            <span className="bank-name-badge bca">BCA</span>
            <i className="fa-solid fa-credit-card" style={{ color: '#0060AF' }} />
          </div>
          <div className="bank-number">4240380175</div>
          <div className="bank-holder">a.n. Alifano Dwi Cahyo</div>
          <button
            className="btn-copy-rekening"
            onClick={() => handleCopy('4240380175', 'BCA')}
          >
            <i className="fa-regular fa-copy" /> Salin No. Rekening
          </button>
        </div>

        {/* Bank BNI */}
        <div className="bank-card">
          <div className="bank-header-row">
            <span className="bank-name-badge bni">BNI</span>
            <i className="fa-solid fa-credit-card" style={{ color: '#F15A24' }} />
          </div>
          <div className="bank-number">0778824047</div>
          <div className="bank-holder">a.n. Monita Ameliani Febriana</div>
          <button
            className="btn-copy-rekening"
            onClick={() => handleCopy('0778824047', 'BNI')}
          >
            <i className="fa-regular fa-copy" /> Salin No. Rekening
          </button>
        </div>

        {/* QRIS */}
        <div className="qris-card">
          <div className="qris-title">
            <i className="fa-solid fa-qrcode" style={{ marginRight: '6px' }} />
            QRIS Pembayaran
          </div>
          <p className="qris-desc">
            Dapat dipindai melalui seluruh aplikasi E-Wallet &amp; Mobile Banking (GoPay, OVO, Dana, ShopeePay, BCA, dll).
          </p>
          <button
            className="btn-copy-rekening"
            onClick={onOpenQris}
            style={{ borderStyle: 'solid' }}
          >
            <i className="fa-solid fa-expand" /> Tampilkan Kode QRIS
          </button>
        </div>
      </div>
    </section>
  );
}
