'use client';

import React from 'react';

export function QuranSection() {
  return (
    <section className="section-card quran-section">
      <div className="tuscany-doodle doodle-mid-left">
        <img src="/assets/tuscany/img_5019.gif" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-mid-right">
        <img src="/assets/tuscany/img_5020.gif" alt="Doodle" />
      </div>

      <div className="section-badge-pill">Ayat Suci</div>
      <div className="tuscany-script-heading">Ar-Rum: 21</div>

      <div className="quote-card-box">
        <div className="olive-branch-icon">
          <img src="/assets/tuscany/tuscany30.png" alt="Olive Branch" className="olive-branch-img" />
        </div>
        <p className="quran-verse-text">
          &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
        </p>
        <div className="quran-reference">(QS. Ar-Rum: 21)</div>
      </div>
    </section>
  );
}
