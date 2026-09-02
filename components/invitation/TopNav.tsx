'use client';

import React, { useEffect, useState } from 'react';

export function TopNav() {
  const [activeNav, setActiveNav] = useState('cover');

  const scrollTo = (id: string, navKey: string) => {
    setActiveNav(navKey);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      const rsvp = document.getElementById('rsvp-section');
      const reception = document.getElementById('reception-section');
      const music = document.getElementById('music-section');

      if (rsvp && scrollPos >= rsvp.offsetTop) {
        setActiveNav('rsvp');
      } else if (reception && scrollPos >= reception.offsetTop) {
        setActiveNav('invitation');
      } else if (music && scrollPos >= music.offsetTop) {
        setActiveNav('invitation');
      } else {
        setActiveNav('cover');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="top-nav">
      <button
        className={`nav-link ${activeNav === 'cover' ? 'active' : ''}`}
        onClick={() => scrollTo('cover-section', 'cover')}
      >
        Alifano &amp; Monita
      </button>
      <button
        className={`nav-link ${activeNav === 'invitation' ? 'active' : ''}`}
        onClick={() => scrollTo('music-section', 'invitation')}
      >
        Undangan
      </button>
      <button
        className={`nav-link ${activeNav === 'rsvp' ? 'active' : ''}`}
        onClick={() => scrollTo('rsvp-section', 'rsvp')}
      >
        RSVP
      </button>
    </header>
  );
}
