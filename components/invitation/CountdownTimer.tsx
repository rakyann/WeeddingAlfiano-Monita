'use client';

import React, { useState, useEffect } from 'react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Wedding: 13 September 2026
    const targetDate = new Date('2026-09-13T08:00:00+07:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('The Wedding of Alifano & Monita');
    const details = encodeURIComponent(
      'Akad Nikah & Resepsi Pernikahan Alifano & Monita. Kami dengan penuh kebahagiaan mengundang Anda untuk hadir.'
    );
    const location = encodeURIComponent('Venue Pernikahan');
    const dates = '20260913T010000Z/20260913T100000Z'; // UTC

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <section className="section-card countdown-section">
      <div className="tuscany-doodle doodle-cd-l">
        <img src="/assets/tuscany/tuscany35.png" alt="Doodle" />
      </div>
      <div className="tuscany-doodle doodle-cd-r">
        <img src="/assets/tuscany/tuscany36.png" alt="Doodle" />
      </div>

      <div className="section-badge-pill">Save The Date</div>
      <h2 className="tuscany-script-heading">Menghitung Hari</h2>

      {/* Countdown Timer Display */}
      <div className="tuscany-countdown-widget">
        <div className="countdown-unit">
          <span className="cd-num">{formatNumber(timeLeft.days)}</span>
          <span className="cd-lbl">Hari</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-unit">
          <span className="cd-num">{formatNumber(timeLeft.hours)}</span>
          <span className="cd-lbl">Jam</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-unit">
          <span className="cd-num">{formatNumber(timeLeft.minutes)}</span>
          <span className="cd-lbl">Menit</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-unit">
          <span className="cd-num">{formatNumber(timeLeft.seconds)}</span>
          <span className="cd-lbl">Detik</span>
        </div>
      </div>

      {/* Date Highlight Card & Calendar */}
      <div className="tuscany-calendar-card">
        <div className="cal-top-banner">
          <span className="cal-badge-month">September 2026</span>
          <h3 className="cal-main-date">Minggu, 13 September 2026</h3>
        </div>

        <div className="cal-grid-mini">
          <div className="cal-days-header">
            <span>Kam</span>
            <span>Jum</span>
            <span>Sab</span>
            <span className="sun-active">Min</span>
            <span>Sen</span>
            <span>Sel</span>
            <span>Rab</span>
          </div>
          <div className="cal-days-numbers">
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span className="cal-target-day">
              <span className="day-n">13</span>
              <i className="fa-solid fa-heart cal-heart" />
            </span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
          </div>
        </div>

        <button onClick={handleAddToCalendar} className="btn-tuscany-primary">
          <i className="fa-regular fa-calendar-plus" /> Tambah ke Google Calendar
        </button>
      </div>
    </section>
  );
}
