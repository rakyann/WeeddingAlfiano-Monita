'use client';

import React from 'react';

export function DesktopHeroSide() {
  return (
    <aside className="desktop-hero-side">
      <div
        className="desktop-bg-layer"
        style={{
          backgroundImage: "url('/assets/tuscany/desktop-bg2.png'), url('/img/DEV03503.JPG')",
        }}
      />
      <div className="desktop-hero-overlay" />

      {/* Floating Tuscany Doodles on Desktop Banner */}
      <img
        src="/assets/tuscany/lemon.png"
        alt="Lemon Doodle"
        className="desktop-doodle d-lemon"
      />
      <img
        src="/assets/tuscany/fruits.png"
        alt="Fruits Doodle"
        className="desktop-doodle d-fruits"
      />
      <img
        src="/assets/tuscany/spaghetti.png"
        alt="Spaghetti Doodle"
        className="desktop-doodle d-pasta"
      />
      <img
        src="/assets/tuscany/img_5016.gif"
        alt="Animated Doodle"
        className="desktop-doodle d-gif1"
      />
      <img
        src="/assets/tuscany/img_5035.gif"
        alt="Animated Doodle"
        className="desktop-doodle d-gif2"
      />

      <div className="desktop-hero-content">
        <span className="desktop-tagline">The Wedding of</span>
        <h1 className="desktop-couple-names">Alifano &amp; Monita</h1>
        <p className="desktop-date">
          <i className="fa-regular fa-calendar" /> Minggu, 13 September 2026
        </p>
        <div className="desktop-location-badge">
          <i className="fa-solid fa-location-dot" /> Venue Pernikahan
        </div>
      </div>
    </aside>
  );
}
