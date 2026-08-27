'use client';

import React, { useState } from 'react';

interface RSVPSectionProps {
  guestName?: string;
  onShowToast: (msg: string) => void;
}

export function RSVPSection({ guestName = '', onShowToast }: RSVPSectionProps) {
  const [name, setName] = useState(guestName || '');
  const [address, setAddress] = useState('');
  const [attendance, setAttendance] = useState('Hadir');
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMinus = () => {
    if (guests > 1) setGuests(guests - 1);
  };

  const handlePlus = () => {
    if (guests < 5) setGuests(guests + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Silakan isi nama Anda');
      return;
    }

    setIsSubmitting(true);

    const rsvpData = {
      id: Date.now().toString(),
      name: name.trim(),
      address: address.trim(),
      attendance,
      guests: Number(guests) || 1,
      pax: Number(guests) || 1,
      created_at: new Date().toISOString(),
    };

    // 1. Save to Backend API (/api/rsvps)
    try {
      await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData),
      });
    } catch (e) {}

    // 2. Save to LocalStorage
    try {
      const existing = localStorage.getItem('wedding_alifano_monita_rsvps');
      const list = existing ? JSON.parse(existing) : [];
      const updated = [rsvpData, ...list.filter((item: any) => item.name.toLowerCase() !== name.trim().toLowerCase())];
      localStorage.setItem('wedding_alifano_monita_rsvps', JSON.stringify(updated));
    } catch (e) {}

    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast(`Terima kasih ${name}, konfirmasi kehadiran berhasil dikirim!`);
    }, 300);
  };

  return (
    <section className="section-card rsvp-section">
      <div className="tuscany-doodle doodle-rsvp">
        <img src="/assets/tuscany/img_5022.gif" alt="Doodle" />
      </div>

      <div className="section-badge-pill">RSVP</div>
      <h2 className="tuscany-script-heading">Konfirmasi Kehadiran</h2>
      <p className="section-intro-text">
        Bantu kami mempersiapkan jamuan terbaik dengan mengonfirmasi kehadiran Anda
      </p>

      <form onSubmit={handleSubmit} className="tuscany-form">
        <div className="form-field">
          <label htmlFor="rsvpName">Nama Tamu</label>
          <input
            type="text"
            id="rsvpName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Masukkan nama Anda"
          />
        </div>

        <div className="form-field">
          <label htmlFor="rsvpAddress">Kota / Alamat</label>
          <input
            type="text"
            id="rsvpAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Contoh: Jakarta / Bandung"
          />
        </div>

        <div className="form-field">
          <label htmlFor="rsvpAttendance">Konfirmasi Kehadiran</label>
          <select
            id="rsvpAttendance"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            required
          >
            <option value="Hadir">Hadir</option>
            <option value="Tidak Hadir">Tidak Hadir</option>
            <option value="Masih Ragu">Masih Ragu</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="rsvpGuests">Jumlah Tamu</label>
          <div className="stepper-wrap">
            <button
              type="button"
              className="btn-step"
              onClick={handleMinus}
              aria-label="Decrease guests"
            >
              <i className="fa-solid fa-minus" />
            </button>
            <input
              type="number"
              id="rsvpGuests"
              value={guests}
              readOnly
              min={1}
              max={5}
            />
            <button
              type="button"
              className="btn-step"
              onClick={handlePlus}
              aria-label="Increase guests"
            >
              <i className="fa-solid fa-plus" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-tuscany-primary full-width"
        >
          <i className="fa-solid fa-paper-plane" />{' '}
          {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
        </button>
      </form>
    </section>
  );
}
