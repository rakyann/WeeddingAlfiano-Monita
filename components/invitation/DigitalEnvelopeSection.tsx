'use client';

import React from 'react';

interface DigitalGiftSectionProps {
  onOpenQris: () => void;
  onShowToast: (msg: string) => void;
}

export function DigitalEnvelopeSection({ onOpenQris, onShowToast }: DigitalGiftSectionProps) {
  const handleCopy = (text: string, bankName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      onShowToast(`Nomor rekening ${bankName} berhasil disalin!`);
    }).catch(() => {
      onShowToast(`Salin: ${text}`);
    });
  };

  return (
    <section className="section-card gift-section">
      <div className="tuscany-doodle doodle-gift-l">
        <img src="/assets/tuscany/lemon.png" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-gift-r">
        <img src="/assets/tuscany/fruits.png" alt="Doodle" />
      </div>

      <div className="section-badge-pill">Wedding Gift</div>
      <h2 className="tuscany-script-heading">Tanda Kasih</h2>
      <p className="section-intro-text">
        Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih secara digital, Anda dapat melalui:
      </p>

      <div className="tuscany-bank-cards-grid">
        {/* Bank BCA */}
        <div className="tuscany-bank-card">
          <div className="bank-header">
            <span className="bank-pill bca">BCA</span>
            <i className="fa-solid fa-credit-card" />
          </div>
          <div className="bank-acc-label">Nomor Rekening</div>
          <div className="bank-acc-number">4240380175</div>
          <div className="bank-acc-name">a.n. Alifano Dwi Cahyo</div>
          <button
            className="btn-copy-rekening"
            onClick={() => handleCopy('4240380175', 'BCA')}
          >
            <i className="fa-regular fa-copy" /> Salin No. Rekening
          </button>
        </div>

        {/* Bank BNI */}
        <div className="tuscany-bank-card">
          <div className="bank-header">
            <span className="bank-pill bni">BNI</span>
            <i className="fa-solid fa-credit-card" />
          </div>
          <div className="bank-acc-label">Nomor Rekening</div>
          <div className="bank-acc-number">0778824047</div>
          <div className="bank-acc-name">a.n. Monita Ameliani Febriana</div>
          <button
            className="btn-copy-rekening"
            onClick={() => handleCopy('0778824047', 'BNI')}
          >
            <i className="fa-regular fa-copy" /> Salin No. Rekening
          </button>
        </div>

        {/* QRIS Card Option */}
        <div className="tuscany-qris-card">
          <div className="qris-header-row">
            <span className="bank-pill qris-badge">QRIS</span>
            <span>Semua E-Wallet &amp; Bank</span>
          </div>
          <p className="qris-desc-text">
            Scan QRIS instan dari GoPay, OVO, Dana, ShopeePay, BCA Mobile, dll.
          </p>
          <button className="btn-open-qris" onClick={onOpenQris}>
            <i className="fa-solid fa-qrcode" /> Tampilkan QRIS
          </button>
        </div>
      </div>
    </section>
  );
}
