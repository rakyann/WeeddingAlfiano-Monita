'use client';

import React, { useState, useEffect } from 'react';

interface RSVPSectionProps {
  guestName?: string;
  onShowToast: (msg: string) => void;
}

interface WishItem {
  id: string;
  name: string;
  attendance: string;
  message: string;
  created_at: string;
}

export function RSVPSection({ guestName = '', onShowToast }: RSVPSectionProps) {
  const [name, setName] = useState(guestName || '');
  const [attendance, setAttendance] = useState('yes');
  const [guests, setGuests] = useState(1);
  const [wishes, setWishes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default wishes list
  const [wishesList, setWishesList] = useState<WishItem[]>([
    {
      id: '1',
      name: 'Rian & Keluarga',
      attendance: 'yes',
      message: 'Barakallahu lakum wa baraka alaikum! Selamat menempuh hidup baru Alifano & Monita!',
      created_at: '2026-09-01T10:00:00Z',
    },
    {
      id: '2',
      name: 'Sarah Amalia',
      attendance: 'yes',
      message: 'Happy wedding Monita & Mas Alifano! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
      created_at: '2026-09-01T14:30:00Z',
    },
    {
      id: '3',
      name: 'Dimas Prasetyo',
      attendance: 'yes',
      message: 'Selamat bro Alifano! Lancar sampai hari H ya!',
      created_at: '2026-09-02T08:15:00Z',
    },
  ]);

  useEffect(() => {
    if (guestName && !name) {
      setName(guestName);
    }
  }, [guestName]);

  // Load saved wishes
  useEffect(() => {
    try {
      const saved = localStorage.getItem('alifano_monita_wishes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishesList(parsed);
        }
      }
    } catch (e) {}

    // Fetch from backend API
    fetch('/api/wishes')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setWishesList(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Silakan masukkan nama Anda');
      return;
    }

    setIsSubmitting(true);

    const newWish: WishItem = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      message: wishes.trim() || 'Selamat berbahagia!',
      created_at: new Date().toISOString(),
    };

    // Optimistic Update
    const updatedList = [newWish, ...wishesList];
    setWishesList(updatedList);
    try {
      localStorage.setItem('alifano_monita_wishes', JSON.stringify(updatedList));
    } catch (e) {}

    // Send to backend API
    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish),
      });
    } catch (e) {}

    // Also send to RSVP API
    try {
      await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          attendance: attendance === 'yes' ? 'Hadir' : 'Tidak Hadir',
          guests: Number(guests) || 1,
          message: wishes.trim(),
        }),
      });
    } catch (e) {}

    setTimeout(() => {
      setIsSubmitting(false);
      setWishes('');
      onShowToast(`Terima kasih ${name}, konfirmasi dan doa Anda telah terkirim!`);
    }, 400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="rsvp-section" className="wedding-section rsvp-section-wrap">
      {/* Section Header */}
      <div className="rsvp-page-header">
        <h2 className="rsvp-page-title">RSVP</h2>
        <div className="rsvp-page-icon">
          <img
            src="/assets/vintage/icons/rsvp_hearts.svg"
            alt="RSVP Intertwined Hearts"
          />
        </div>
        <p className="rsvp-intro-text">
          Merupakan suatu kehormatan bagi kami atas kehadiran dan doa restu Anda di hari bahagia kami.
        </p>
        <div className="rsvp-deadline-alert">
          MOHON KONFIRMASI SEBELUM 10 SEPTEMBER 2026
        </div>
      </div>

      {/* RSVP Form */}
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="rsvpGuestName">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="rsvpGuestName"
            className="form-input-text"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Apakah Anda akan hadir?</label>
          <div className="attendance-options">
            <label
              className={`attendance-pill ${attendance === 'yes' ? 'selected' : ''}`}
              onClick={() => setAttendance('yes')}
            >
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={attendance === 'yes'}
                onChange={() => setAttendance('yes')}
              />
              <i className="fa-solid fa-check" /> Ya, Saya Hadir
            </label>
            <label
              className={`attendance-pill ${attendance === 'no' ? 'selected' : ''}`}
              onClick={() => setAttendance('no')}
            >
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={attendance === 'no'}
                onChange={() => setAttendance('no')}
              />
              <i className="fa-solid fa-xmark" /> Maaf, Belum Bisa
            </label>
          </div>
        </div>

        {attendance === 'yes' && (
          <div className="form-group">
            <label className="form-label" htmlFor="rsvpGuestCount">
              Jumlah Tamu (termasuk Anda)
            </label>
            <input
              type="number"
              id="rsvpGuestCount"
              className="form-input-text"
              min="1"
              max="5"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="rsvpWishes">
            Ucapan &amp; Doa Restu
          </label>
          <textarea
            id="rsvpWishes"
            className="form-textarea"
            placeholder="Tuliskan ucapan dan doa terbaik untuk mempelai..."
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
          />
        </div>

        <button
          type="submit"
          id="rsvpSubmitBtn"
          className="btn-rsvp-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'MENGIRIM...' : 'KIRIM RSVP & DOA'}
        </button>
      </form>

      {/* Live Wishes Board / Guestbook */}
      <div className="wishes-wall-section">
        <div className="wishes-wall-title">
          <span>Buku Tamu &amp; Doa Restu</span>
          <span className="wishes-count-badge">
            {wishesList.length} Ucapan
          </span>
        </div>
        <div className="wishes-list" id="wishesListContainer">
          {wishesList.map((item) => (
            <div key={item.id} className="wishes-card">
              <div className="wishes-sender-row">
                <span className="wishes-sender-name">{item.name}</span>
                <span
                  className={`wishes-status-tag ${
                    item.attendance === 'yes' ? 'attending' : 'declined'
                  }`}
                >
                  {item.attendance === 'yes' ? 'Hadir' : 'Tidak Hadir'}
                </span>
              </div>
              <p className="wishes-message">{item.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button className="btn-luxury-outline" onClick={scrollToTop}>
          <i className="fa-solid fa-arrow-up" /> KEMBALI KE ATAS
        </button>
      </div>
    </section>
  );
}
