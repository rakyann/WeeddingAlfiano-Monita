'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, CheckCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wishesList, setWishesList] = useState<RSVPWish[]>([]);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (data && !error) setWishesList(data);
    } catch (err) {
      console.warn('Error fetching wishes:', err);
    }
  };

  useEffect(() => { fetchWishes(); }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#17335C', '#3E5C8A', '#B7C7E3', '#F7F3EA'],
      });
    } catch { /* ignore */ }
  };

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('rsvps').insert([{
        guest_name: name.trim(),
        attendance,
        pax: attendance === 'attending' ? pax : 0,
        wishes: wishes.trim() || null,
      }]);
      if (error) throw error;
      triggerConfetti();
      setIsSuccess(true);
      setWishes('');
      fetchWishes();
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-cream py-20 px-6 border-b border-navy-deep/10">
      <h2 className="font-script text-5xl text-navy-deep mb-8 text-center">R.S.V.P</h2>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-navy-deep/10">
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-4"
          >
            <CheckCircle className="w-12 h-12 text-navy-accent mx-auto mb-3" />
            <h3 className="font-serif-title text-lg font-bold text-navy-deep">Terima Kasih!</h3>
            <p className="text-xs text-ink/60 mt-1 font-serif">Konfirmasi & ucapan Anda telah tersimpan.</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-navy-deep text-cream hover:bg-navy-accent transition-colors"
            >
              Kirim Ucapan Lain
            </button>
          </motion.div>
        ) : (
          <>
            <p className="text-center font-serif text-ink/60 text-sm mb-8">
              Mohon konfirmasi sebelum 1 September 2026
            </p>

            <form onSubmit={handleSubmitRSVP} className="space-y-6">
              <div className="space-y-3 font-serif">
                <label className="flex items-center gap-3 p-3 border border-navy-deep/10 rounded cursor-pointer hover:bg-navy-deep/5 transition-colors">
                  <input
                    type="radio"
                    name="is_attending"
                    value="attending"
                    className="accent-navy-deep"
                    checked={attendance === 'attending'}
                    onChange={() => setAttendance('attending')}
                  />
                  <span className="text-ink text-sm">Joyfully Accept</span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-navy-deep/10 rounded cursor-pointer hover:bg-navy-deep/5 transition-colors">
                  <input
                    type="radio"
                    name="is_attending"
                    value="declined"
                    className="accent-navy-deep"
                    checked={attendance === 'declined'}
                    onChange={() => setAttendance('declined')}
                  />
                  <span className="text-ink text-sm">Regretfully Decline</span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-navy-deep/10 rounded cursor-pointer hover:bg-navy-deep/5 transition-colors">
                  <input
                    type="radio"
                    name="is_attending"
                    value="tentative"
                    className="accent-navy-deep"
                    checked={attendance === 'tentative'}
                    onChange={() => setAttendance('tentative')}
                  />
                  <span className="text-ink text-sm">Belum Pasti</span>
                </label>
              </div>

              {attendance === 'attending' && (
                <div className="space-y-2">
                  <label className="block text-sm font-bold uppercase tracking-wider font-serif text-navy-deep">
                    Jumlah Tamu
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                    className="w-full border border-navy-deep/20 rounded p-3 font-serif text-ink focus:ring-2 focus:ring-navy-accent focus:border-navy-accent outline-none"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} Orang</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-wider font-serif text-navy-deep">
                  Nama Anda
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-navy-deep/20 rounded p-3 font-serif text-ink focus:ring-2 focus:ring-navy-accent focus:border-navy-accent outline-none placeholder:text-ink/30"
                  placeholder="Nama Anda..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-wider font-serif text-navy-deep">
                  Ucapan &amp; Doa
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan ucapan untuk Alifano & Monita..."
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full border border-navy-deep/20 rounded p-3 font-serif text-ink focus:ring-2 focus:ring-navy-accent focus:border-navy-accent outline-none resize-none placeholder:text-ink/30"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-navy-deep text-white py-4 font-bold uppercase tracking-widest font-serif hover:bg-navy-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Menyimpan...' : 'Send R.S.V.P'}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Guestbook */}
      {wishesList.length > 0 && (
        <div className="mt-12 max-w-md mx-auto text-center">
          <h3 className="font-script text-4xl text-navy-accent mb-5">Doa &amp; Ucapan Tamu</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishesList.map((item) => (
              <div key={item.id} className="bg-white border border-navy-deep/10 rounded-lg p-4 text-left shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-navy-deep">{item.guest_name}</p>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase"
                    style={{
                      backgroundColor:
                        item.attendance === 'attending' ? '#E0F0FF' :
                        item.attendance === 'declined' ? '#FFE4E6' : '#FEF3C7',
                      color:
                        item.attendance === 'attending' ? '#17335C' :
                        item.attendance === 'declined' ? '#9F1239' : '#92400E',
                    }}
                  >
                    {item.attendance === 'attending' ? `Hadir (${item.pax})` :
                     item.attendance === 'declined' ? 'Berhalangan' : 'Ragu-ragu'}
                  </span>
                </div>
                {item.wishes && (
                  <p className="text-xs text-ink/70 italic leading-relaxed">&ldquo;{item.wishes}&rdquo;</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
