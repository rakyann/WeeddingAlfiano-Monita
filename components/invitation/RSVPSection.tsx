'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, CheckCircle, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';

interface RSVPWish {
  id: string;
  guest_name: string;
  attendance: string;
  pax: number;
  wishes: string | null;
  created_at: string;
}

interface RSVPSectionProps {
  guestName: string;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ guestName }) => {
  const [name, setName] = useState<string>(guestName);
  const [attendance, setAttendance] = useState<string>('attending');
  const [pax, setPax] = useState<number>(1);
  const [wishes, setWishes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [wishesList, setWishesList] = useState<RSVPWish[]>([]);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (data && !error) {
        setWishesList(data);
      }
    } catch (err) {
      console.warn('Error fetching wishes:', err);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const triggerFlowerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#3B2B24', '#FAF6F0', '#E8DFC9'],
      });
    } catch {
      // Ignore if canvas-confetti fails
    }
  };

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('rsvps').insert([
        {
          guest_name: name.trim(),
          attendance,
          pax: attendance === 'attending' ? pax : 0,
          wishes: wishes.trim() || null,
        },
      ]);

      if (error) throw error;

      triggerFlowerConfetti();
      setIsSuccess(true);
      setWishes('');
      fetchWishes();
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan saat menyimpan konfirmasi RSVP');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-14 px-6 bg-[#2D1E18] text-[#FAF6F0]">
      <div className="max-w-md mx-auto space-y-12">
        <div className="text-center">
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            ATTENDANCE CONFIRMATION
          </span>
          <h2 className="font-script text-4xl text-[#FAF6F0] mt-1 italic">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-xs text-[#D8C6B9] mt-2 mb-4">
            Mohon konfirmasi kehadiran Anda sebelum tanggal 10 November 2026.
          </p>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-3" />

          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 p-6 paper-card text-[#2C1D18] text-center shadow-xl relative"
            >
              <div className="pearl-pin" />
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold">Terima Kasih!</h3>
              <p className="text-xs text-[#5A453C] mt-1">
                Konfirmasi kehadiran &amp; ucapan Anda telah berhasil disimpan.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-[#2D1E18] text-[#C5A059] text-xs font-semibold"
              >
                Kirim Ucapan Lain
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitRSVP} className="mt-8 space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-[#C5A059] uppercase tracking-wider block mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#3B2B24] border border-[#C5A059]/40 text-xs text-[#FAF6F0] focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#C5A059] uppercase tracking-wider block mb-2">
                  Status Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'attending', label: 'Hadir' },
                    { id: 'declined', label: 'Maaf, Halangan' },
                    { id: 'tentative', label: 'Ragu-ragu' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAttendance(opt.id)}
                      className={`py-2.5 px-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                        attendance === opt.id
                          ? 'bg-[#C5A059] text-[#2C1D18] border-[#C5A059] shadow-md font-bold'
                          : 'bg-[#3B2B24] text-[#D8C6B9] border-[#C5A059]/30 hover:bg-[#4A3B34]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {attendance === 'attending' && (
                <div>
                  <label className="text-xs font-bold text-[#C5A059] uppercase tracking-wider block mb-1">
                    Jumlah Pendamping (Termasuk Anda)
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#3B2B24] border border-[#C5A059]/40 text-xs text-[#FAF6F0] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-[#C5A059] uppercase tracking-wider block mb-1">
                  Ucapan &amp; Doa Restu
                </label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan ucapan selamat & doa restu untuk Alifano & Monita..."
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#3B2B24] border border-[#C5A059]/40 text-xs text-[#FAF6F0] focus:outline-none focus:border-[#C5A059] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#2C1D18] font-serif-title tracking-widest text-xs font-bold shadow-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Send className="w-4 h-4 fill-current" />
                {isSubmitting ? 'Menyimpan...' : 'Kirim Konfirmasi RSVP'}
              </button>
            </form>
          )}
        </div>

        <div className="w-20 h-[1px] bg-[#C5A059]/40 mx-auto" />

        {/* --- GUESTBOOK WISHES STREAM --- */}
        <div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#3B2B24] text-[#C5A059] flex items-center justify-center mb-3 shadow">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-serif-title text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            GUESTBOOK &amp; WISHES
          </span>
          <h2 className="font-script text-3xl text-[#FAF6F0] mt-1 mb-4 italic">
            Doa &amp; Ucapan Tamu
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishesList.length === 0 ? (
              <p className="text-xs text-[#D8C6B9] italic text-center">
                Belum ada ucapan. Jadilah yang first memberikan doa!
              </p>
            ) : (
              wishesList.map((item) => (
                <div
                  key={item.id}
                  className="paper-card p-4 relative text-left shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#2C1D18]">
                      {item.guest_name}
                    </p>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.attendance === 'attending'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.attendance === 'declined'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.attendance === 'attending'
                        ? `Hadir (${item.pax} Pax)`
                        : item.attendance === 'declined'
                        ? 'Berhalangan'
                        : 'Ragu-ragu'}
                    </span>
                  </div>
                  {item.wishes && (
                    <p className="text-xs text-[#5A453C] mt-2 leading-relaxed italic">
                      "{item.wishes}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
