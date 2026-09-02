'use client';

import React from 'react';

export function StorySection() {
  return (
    <section id="story-section" className="wedding-section story-section">
      <div className="mirror-frame-wrap">
        <img
          src="/img/cover.jpeg"
          alt="Alifano & Monita Prewedding"
          className="mirror-frame-img"
        />
      </div>

      <div className="story-body">
        <p>
          Setiap kisah cinta memiliki awal yang istimewa. Bagi kami, pertemuan sederhana bertumbuh menjadi ikatan persahabatan, tawa bersama, dan saling mendukung dalam setiap langkah hidup.
        </p>
        <p className="story-quote-italic">
          &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
        </p>
        <p style={{ fontSize: '13px', color: '#8C8478', marginTop: '6px' }}>
          (QS. Ar-Rum: 21)
        </p>
      </div>

      <div className="story-signature-prefix">Dengan Penuh Cinta,</div>
      <div className="story-signature">Alifano &amp; Monita</div>
    </section>
  );
}
