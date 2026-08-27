'use client';

import React from 'react';

interface QRISModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRISModal({ isOpen, onClose }: QRISModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <div className="modal-header">
          <h3 className="modal-title">QRIS Digital Payment</h3>
          <p className="modal-desc">
            Scan QRIS menggunakan aplikasi Mobile Banking atau E-Wallet apapun
          </p>
        </div>
        <div className="qris-image-wrapper" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#637663', fontStyle: 'italic', padding: '2rem 0' }}>
            🌿 QRIS akan segera diupdate<br />
            <small>Hubungi kami untuk informasi lebih lanjut</small>
          </p>
        </div>
        <div className="qris-note">
          <strong>a.n. Alifano &amp; Monita</strong>
        </div>
      </div>
    </div>
  );
}
