'use client';

import React, { useEffect, useState } from 'react';

export function LoadingOverlay() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  return (
    <div className={`loading-overlay ${progress >= 100 ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <img
          src="/assets/tuscany/lemon.png"
          alt="Lemon Illustration"
          className="loading-lemon-icon"
        />
        <div className="loading-sub">Wedding Invitation</div>
        <h1 className="loading-title">Alifano &amp; Monita</h1>
        <div className="loading-progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-percentage">{progress}%</div>
        <p className="loading-ecofriendly">
          This invitation saves paper and reduces carbon footprint 🍃
        </p>
      </div>
    </div>
  );
}
