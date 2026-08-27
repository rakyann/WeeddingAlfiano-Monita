'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Share2,
  Plus,
  RefreshCw,
  Crown,
  ExternalLink,
  MessageCircle,
  Trash2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { generateWhatsAppMessage, buildGuestInvitationUrl } from '@/lib/utils/url';
import Link from 'next/link';

interface GuestHistoryItem {
  id: string;
  name: string;
  isVip: boolean;
  table?: string;
  url: string;
  waText: string;
  createdAt: string;
}

interface RSVPStat {
  totalRsvps: number;
  totalAttending: number;
  totalDeclined: number;
  totalPax: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<RSVPStat>({
    totalRsvps: 0,
    totalAttending: 0,
    totalDeclined: 0,
    totalPax: 0,
  });

  const [newGuestName, setNewGuestName] = useState<string>('');
  const [isVip, setIsVip] = useState<boolean>(false);
  const [tableNumber, setTableNumber] = useState<string>('');

  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [generatedWaText, setGeneratedWaText] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedWa, setCopiedWa] = useState<boolean>(false);
  const [history, setHistory] = useState<GuestHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load History from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_guest_link_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const saveHistory = (items: GuestHistoryItem[]) => {
    setHistory(items);
    try {
      localStorage.setItem('wedding_guest_link_history', JSON.stringify(items));
    } catch (e) {}
  };

  // Fetch Stats from Supabase if configured
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const { data: rsvps } = await supabase.from('rsvps').select('*');
      if (rsvps && rsvps.length > 0) {
        const attending = rsvps.filter((r) => r.attendance === 'attending' || r.attendance === 'Hadir');
        const declined = rsvps.filter((r) => r.attendance === 'declined' || r.attendance === 'Tidak Hadir');
        const paxSum = attending.reduce((acc, r) => acc + (Number(r.pax) || Number(r.guests) || 1), 0);

        setStats({
          totalRsvps: rsvps.length,
          totalAttending: attending.length,
          totalDeclined: declined.length,
          totalPax: paxSum,
        });
      } else {
        setStats({
          totalRsvps: 0,
          totalAttending: 0,
          totalDeclined: 0,
          totalPax: 0,
        });
      }
    } catch (err) {
      setStats({
        totalRsvps: 0,
        totalAttending: 0,
        totalDeclined: 0,
        totalPax: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Generate Link
  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : 'https://weedding-alfiano-monita.vercel.app');

    const url = buildGuestInvitationUrl(baseUrl, newGuestName.trim(), {
      isVip,
      table: tableNumber.trim() || undefined,
    });

    const waMsg = generateWhatsAppMessage(newGuestName.trim(), url, 'Alifano & Monita');

    setGeneratedLink(url);
    setGeneratedWaText(waMsg);

    const newItem: GuestHistoryItem = {
      id: Date.now().toString(),
      name: newGuestName.trim(),
      isVip,
      table: tableNumber.trim() || undefined,
      url,
      waText: waMsg,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [newItem, ...history.filter((h) => h.name.toLowerCase() !== newGuestName.trim().toLowerCase())].slice(0, 30);
    saveHistory(updatedHistory);
  };

  const copyToClipboard = (text: string, isWa: boolean) => {
    navigator.clipboard.writeText(text);
    if (isWa) {
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistory(updated);
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Hapus semua riwayat tamu yang dibuat?')) {
      saveHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6ee] text-[#2c3e2d] font-sans antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#eeddc9]/80 shadow-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f4ece1] text-[#455645] hover:bg-[#ebdcc8] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lihat Web Undangan</span>
            </Link>
            <div className="h-4 w-[1px] bg-[#eeddc9]" />
            <div>
              <h1 className="text-base font-bold text-[#2e4a00]">Generator Link Tamu</h1>
              <p className="text-[11px] text-[#637663]">The Wedding of Alifano &amp; Monita</p>
            </div>
          </div>

          <button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#eeddc9] text-[#455645] hover:bg-[#faf6ee] shadow-sm transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#c5617a]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        {/* 1. Clean Summary Stats Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white p-4 rounded-2xl border border-[#eeddc9] shadow-sm">
              <div className="flex items-center justify-between text-[#8e9e8e] mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Total RSVP</span>
                <Users className="w-4 h-4 text-[#455645]" />
              </div>
              <p className="text-2xl font-bold text-[#2e4a00]">{stats.totalRsvps}</p>
              <span className="text-[10px] text-[#8e9e8e]">Respon Tamu Masuk</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#eeddc9] shadow-sm">
              <div className="flex items-center justify-between text-[#8e9e8e] mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Hadir</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-emerald-700">{stats.totalAttending}</p>
              <span className="text-[10px] text-emerald-600/80">Tamu Konfirmasi</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#eeddc9] shadow-sm">
              <div className="flex items-center justify-between text-[#8e9e8e] mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Estimasi Tamu</span>
                <Sparkles className="w-4 h-4 text-[#c5617a]" />
              </div>
              <p className="text-2xl font-bold text-[#c5617a]">{stats.totalPax} <span className="text-xs font-normal">Pax</span></p>
              <span className="text-[10px] text-[#8e9e8e]">Total Orang Datang</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#eeddc9] shadow-sm">
              <div className="flex items-center justify-between text-[#8e9e8e] mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Berhalangan</span>
                <XCircle className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-2xl font-bold text-rose-600">{stats.totalDeclined}</p>
              <span className="text-[10px] text-rose-500/80">Tidak Dapat Hadir</span>
            </div>
          </div>
        </section>

        {/* 2. Main Link Generator Card */}
        <section className="bg-white rounded-2xl border border-[#eeddc9] shadow-sm p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f4ece1]">
            <div className="w-8 h-8 rounded-full bg-[#f4ece1] flex items-center justify-center text-[#455645]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2e4a00]">Buat Link Undangan Khusus</h2>
              <p className="text-xs text-[#637663]">Nama tamu akan otomatis tampil di cover depan dan form RSVP</p>
            </div>
          </div>

          <form onSubmit={handleGenerateLink} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#455645] mb-1.5">
                Nama Tamu Undangan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso & Partner / Keluarga Bpk. Hendy"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#faf6ee] border border-[#eeddc9] text-sm text-[#2e4a00] placeholder:text-[#a0a89d] focus:outline-none focus:ring-2 focus:ring-[#c5617a]/30 focus:border-[#c5617a] transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#eeddc9] bg-[#faf6ee]/50 hover:bg-[#faf6ee] cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={isVip}
                  onChange={(e) => setIsVip(e.target.checked)}
                  className="w-4 h-4 rounded border-[#eeddc9] text-[#c5617a] focus:ring-[#c5617a]"
                />
                <span className="text-xs font-semibold text-[#455645] flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-600" /> Tamu VIP (Khusus)
                </span>
              </label>

              <div>
                <input
                  type="text"
                  placeholder="No. Meja (Opsional: Meja 04)"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#faf6ee]/50 border border-[#eeddc9] text-xs text-[#2e4a00] placeholder:text-[#a0a89d] focus:outline-none focus:ring-2 focus:ring-[#c5617a]/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#455645] hover:bg-[#2e4a00] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Link Undangan</span>
            </button>
          </form>

          {/* Generated Result Output */}
          {generatedLink && (
            <div className="mt-6 pt-5 border-t border-[#eeddc9] space-y-4">
              <div className="bg-[#faf6ee] p-4 rounded-xl border border-[#eeddc9]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#2e4a00]">URL Undangan Siap Kirim:</span>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#c5617a] hover:underline inline-flex items-center gap-1"
                  >
                    Buka Link <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#eeddc9] text-xs font-mono text-[#455645] select-all"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedLink, false)}
                    className="px-4 py-2 rounded-lg bg-[#455645] hover:bg-[#2e4a00] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#eeddc9] space-y-3">
                <span className="text-xs font-bold text-[#2e4a00] block">Teks Pesan WhatsApp:</span>
                <textarea
                  readOnly
                  rows={6}
                  value={generatedWaText}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#faf6ee] border border-[#eeddc9] text-xs font-sans text-[#2e4a00] resize-none leading-relaxed focus:outline-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => copyToClipboard(generatedWaText, true)}
                    className="w-full py-2.5 rounded-lg bg-[#f4ece1] hover:bg-[#ebdcc8] text-[#455645] font-bold text-xs flex items-center justify-center gap-2 border border-[#eeddc9] transition-colors"
                  >
                    {copiedWa ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedWa ? 'Pesan Tersalin!' : 'Salin Teks WhatsApp'}</span>
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(generatedWaText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Langsung Buka WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 3. History of Generated Guest Links */}
        {history.length > 0 && (
          <section className="bg-white rounded-2xl border border-[#eeddc9] shadow-sm p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f4ece1]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#2e4a00]">Riwayat Link Tamu Dibuat</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f4ece1] text-[#455645]">
                  {history.length}
                </span>
              </div>
              <button
                onClick={handleClearAllHistory}
                className="text-[11px] text-[#8e9e8e] hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Hapus Semua
              </button>
            </div>

            <div className="divide-y divide-[#f4ece1] max-h-80 overflow-y-auto pr-1">
              {history.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3 group">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#2e4a00] truncate">{item.name}</p>
                      {item.isVip && (
                        <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-100 text-amber-800">
                          VIP
                        </span>
                      )}
                      {item.table && (
                        <span className="px-1.5 py-0.2 text-[9px] font-medium rounded bg-[#f4ece1] text-[#637663]">
                          {item.table}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#8e9e8e] truncate mt-0.5">{item.url}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copyToClipboard(item.url, false)}
                      className="p-1.5 rounded-lg bg-[#faf6ee] hover:bg-[#ebdcc8] text-[#455645] text-xs transition-colors"
                      title="Salin Link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(item.waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors"
                      title="Kirim ke WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleDeleteHistoryItem(item.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-[#8e9e8e] hover:text-rose-600 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
