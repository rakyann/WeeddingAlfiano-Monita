'use client';

import React, { useState, useEffect } from 'react';

interface WishItem {
  name: string;
  message: string;
  time: string;
}

const DEFAULT_WISHES: WishItem[] = [];

interface WishesSectionProps {
  onShowToast: (msg: string) => void;
}

export function WishesSection({ onShowToast }: WishesSectionProps) {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wedding_alifano_monita_wishes');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishes(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const totalPages = Math.ceil(wishes.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWishes = wishes.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    const newWish: WishItem = {
      name: senderName.trim(),
      message: message.trim(),
      time: 'Baru saja',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('wedding_alifano_monita_wishes', JSON.stringify(updated));
    } catch (e) {}

    setSenderName('');
    setMessage('');
    setCurrentPage(1);
    onShowToast('Ucapan & Doa Anda berhasil terkirim!');
  };

  return (
    <section className="section-card wishes-section">
      <div className="tuscany-doodle doodle-wish-t">
        <img src="/assets/tuscany/tuscany28.png" alt="Doodle" />
      </div>

      <div className="section-badge-pill">Wishes</div>
      <h2 className="tuscany-script-heading">Ucapan &amp; Doa</h2>
      <p className="section-intro-text">
        Kirimkan doa dan harapan terbaik Anda untuk mengawali langkah baru kami
      </p>

      <form onSubmit={handleSubmit} className="tuscany-form">
        <div className="form-field">
          <label htmlFor="wishSenderName">Nama Pengirim</label>
          <input
            type="text"
            id="wishSenderName"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
            placeholder="Tuliskan nama Anda"
          />
        </div>

        <div className="form-field">
          <label htmlFor="wishMessage">Ucapan &amp; Doa Restu</label>
          <textarea
            id="wishMessage"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Tuliskan doa restu yang tulus..."
          />
        </div>

        <button type="submit" className="btn-tuscany-primary full-width">
          <i className="fa-solid fa-heart" /> Kirim Ucapan
        </button>
      </form>

      {/* Wishes Stream List */}
      <div className="wishes-stream-container">
        <div className="wishes-stream-header">
          <i className="fa-regular fa-comments" />{' '}
          <span>{wishes.length}</span> Ucapan Terkirim
        </div>

        {wishes.length === 0 ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-olive-soft)', fontSize: '0.88rem' }}>
            <p>Belum ada ucapan terkirim.</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.25rem' }}>
              Jadilah yang pertama mengirimkan ucapan &amp; doa restu untuk kedua mempelai!
            </p>
          </div>
        ) : (
          <>
            <div className="wishes-stream-list">
              {currentWishes.map((item, idx) => (
                <div key={idx} className="wish-card-item">
                  <div className="wish-header-row">
                    <div className="wish-avatar">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="wish-author-name">{item.name}</div>
                  </div>
                  <p className="wish-message-body">{item.message}</p>
                  <div className="wish-time-tag">
                    <i className="fa-regular fa-clock" /> {item.time}
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="wishes-pagination">
                <button
                  className="page-nav-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  &larr; Prev
                </button>
                <div className="page-nums">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`page-num-btn ${pageNum === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
                <button
                  className="page-nav-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
