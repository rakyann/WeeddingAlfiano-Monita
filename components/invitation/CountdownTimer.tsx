'use client';

import React, { useEffect, useState } from 'react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Wedding Date: 13 September 2026, 08:00 WIB (UTC+7)
    const targetDate = new Date('2026-09-13T08:00:00+07:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown-section" className="wedding-section countdown-banner">
      <div className="countdown-inner">
        <h3 className="countdown-title">The countdown is on!</h3>
        <div className="countdown-grid">
          <div className="countdown-unit">
            <span className="countdown-number" id="countdownDays">
              {timeLeft.days}
            </span>
            <span className="countdown-label">Hari</span>
          </div>
          <span className="countdown-colon">:</span>
          <div className="countdown-unit">
            <span className="countdown-number" id="countdownHours">
              {timeLeft.hours}
            </span>
            <span className="countdown-label">Jam</span>
          </div>
          <span className="countdown-colon">:</span>
          <div className="countdown-unit">
            <span className="countdown-number" id="countdownMinutes">
              {timeLeft.minutes}
            </span>
            <span className="countdown-label">Menit</span>
          </div>
          <span className="countdown-colon">:</span>
          <div className="countdown-unit">
            <span className="countdown-number" id="countdownSeconds">
              {timeLeft.seconds}
            </span>
            <span className="countdown-label">Detik</span>
          </div>
        </div>
      </div>
    </section>
  );
}
