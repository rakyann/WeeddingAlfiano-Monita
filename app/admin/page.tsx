'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
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
  Utensils,
  CalendarCheck,
  Search,
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

interface RSVPRecord {
  id: string;
  name: string;
  address?: string;
  attendance: string;
  pax: number;
  created_at?: string;
}

interface RSVPStat {
  totalRsvps: number;
  totalAttending: number;
  totalDeclined: number;
  totalMaybe: number;
  totalPax: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<RSVPStat>({
    totalRsvps: 0,
    totalAttending: 0,
    totalDeclined: 0,
    totalMaybe: 0,
    totalPax: 0,
  });

  const [rsvpList, setRsvpList] = useState<RSVPRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [newGuestName, setNewGuestName] = useState<string>('');
  const [isVip, setIsVip] = useState<boolean>(false);
  const [tableNumber, setTableNumber] = useState<string>('');

  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [generatedWaText, setGeneratedWaText] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedWa, setCopiedWa] = useState<boolean>(false);
  const [history, setHistory] = useState<GuestHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load History & RSVPs from Backend API, localStorage and Supabase
  const loadDashboardData = async () => {
    setIsLoading(true);
    let allRsvps: RSVPRecord[] = [];

    // 1. Fetch from Backend API (/api/rsvps)
    try {
      const res = await fetch('/api/rsvps', { cache: 'no-store' });
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        for (const item of json.data) {
          allRsvps.push({
            id: item.id || Date.now().toString(),
            name: item.name,
            address: item.address || '-',
            attendance: item.attendance || 'Hadir',
            pax: Number(item.pax) || 1,
            created_at: item.created_at || new Date().toISOString(),
          });
        }
      }
    } catch (e) {}

    // 2. Merge with localStorage
    try {
      const localRsvps = localStorage.getItem('wedding_alifano_monita_rsvps');
      if (localRsvps) {
        const parsed = JSON.parse(localRsvps);
        const existingNames = new Set(allRsvps.map((r) => r.name.toLowerCase()));
        for (const p of parsed) {
          if (!existingNames.has(p.name.toLowerCase())) {
            allRsvps.push(p);
          }
        }
      }
    } catch (e) {}

    // 3. Merge with Supabase
    try {
      const { data: supaRsvps } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false });
      if (supaRsvps && supaRsvps.length > 0) {
        const existingNames = new Set(allRsvps.map((r) => r.name.toLowerCase()));
        for (const r of supaRsvps) {
          const rName = (r.guest_name || r.name || 'Tamu').trim();
          if (!existingNames.has(rName.toLowerCase())) {
            allRsvps.push({
              id: r.id || Date.now().toString(),
              name: rName,
              address: r.address || '-',
              attendance: r.attendance === 'attending' ? 'Hadir' : r.attendance === 'declined' ? 'Tidak Hadir' : r.attendance || 'Hadir',
              pax: Number(r.pax) || Number(r.guests) || 1,
              created_at: r.created_at || new Date().toISOString(),
            });
            existingNames.add(rName.toLowerCase());
          }
        }
      }
    } catch (err) {}

    setRsvpList(allRsvps);

    // Calculate Statistics
    const attending = allRsvps.filter((r) => r.attendance.toLowerCase().includes('hadir') && !r.attendance.toLowerCase().includes('tidak'));
    const declined = allRsvps.filter((r) => r.attendance.toLowerCase().includes('tidak'));
    const maybe = allRsvps.filter((r) => r.attendance.toLowerCase().includes('ragu'));
    const paxSum = attending.reduce((acc, r) => acc + (Number(r.pax) || 1), 0);

    setStats({
      totalRsvps: allRsvps.length,
      totalAttending: attending.length,
      totalDeclined: declined.length,
      totalMaybe: maybe.length,
      totalPax: paxSum,
    });

    // Load Guest Links History
    try {
      const savedHist = localStorage.getItem('wedding_guest_link_history');
      if (savedHist) {
        setHistory(JSON.parse(savedHist));
      }
    } catch (e) {}

    setIsLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const saveHistory = (items: GuestHistoryItem[]) => {
    setHistory(items);
    try {
      localStorage.setItem('wedding_guest_link_history', JSON.stringify(items));
    } catch (e) {}
  };

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

  const handleDeleteRsvp = (id: string) => {
    if (window.confirm('Hapus konfirmasi RSVP tamu ini?')) {
      const updated = rsvpList.filter((r) => r.id !== id);
      setRsvpList(updated);
      try {
        localStorage.setItem('wedding_alifano_monita_rsvps', JSON.stringify(updated));
      } catch (e) {}
      loadDashboardData();
    }
  };

  const filteredRsvps = rsvpList.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.address && r.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#faf6ee] text-[#2c3e2d] font-sans antialiased pb-16">
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
              <h1 className="text-base font-bold text-[#2e4a00]">Dashboard Tamu &amp; RSVP</h1>
              <p className="text-[11px] text-[#637663]">The Wedding of Alifano &amp; Monita</p>
            </div>
          </div>

          <button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#eeddc9] text-[#455645] hover:bg-[#faf6ee] shadow-sm transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#c5617a]' : ''}`} />
            <span>Perbarui Data</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        {/* 1. Statistics Cards with Clear Context */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Total RSVP */}
            <div className="bg-white p-4 rounded-2xl border border-[#eeddc9] shadow-sm">
              <div className="flex items-center justify-between text-[#8e9e8e] mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Total Konfirmasi</span>
                <Users className="w-4 h-4 text-[#455645]" />
              </div>
              <p className="text-2xl font-bold text-[#2e4a00]">{stats.totalRsvps}</p>
              <p className="text-[10px] text-[#8e9e8e] mt-0.5">Jumlah formulir RSVP yang diisi tamu</p>
            </div>

            {/* Hadir */}
            <div className="bg-white p-4 rounded-2xl border border-[#eeddc9] shadow-sm">
              <div className="flex items-center justify-between text-[#8e9e8e] mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Undangan Hadir</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-emerald-700">{stats.totalAttending}</p>
              <p className="text-[10px] text-emerald-600/80 mt-0.5">Nama/keluarga yang konfirmasi hadir</p>
            </div>

            {/* Estimasi Orang/Pax */}
            <div className="bg-white p-4 rounded-2xl border border-[#eeddc9] shadow-sm bg-gradient-to-br from-white to-[#fffaf2]">
              <div className="flex items-center justify-between text-[#8e9e8e] mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c5617a]">Total Pax (Orang)</span>
                <Utensils className="w-4 h-4 text-[#c5617a]" />
              </div>
              <p className="text-2xl font-bold text-[#c5617a]">
                {stats.totalPax} <span className="text-xs font-normal">Porsi/Orang</span>
              </p>
              <p className="text-[10px] text-[#637663] mt-0.5">Total kepala untuk catering (termasuk pasangan/anak)</p>
            </div>

            {/* Berhalangan */}
            <div className="bg-white p-4 rounded-2xl border border-[#eeddc9] shadow-sm">
              <div className="flex items-center justify-between text-[#8e9e8e] mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Berhalangan</span>
                <XCircle className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-2xl font-bold text-rose-600">{stats.totalDeclined}</p>
              <p className="text-[10px] text-rose-500/80 mt-0.5">Tamu yang izin tidak dapat hadir</p>
            </div>
          </div>
        </section>

        {/* 2. Daftar Siapa Saja yang Sudah Konfirmasi RSVP (Tabel Lengkap) */}
        <section className="bg-white rounded-2xl border border-[#eeddc9] shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#f4ece1]">
            <div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#455645]" />
                <h2 className="text-base font-bold text-[#2e4a00]">Daftar Tamu yang Sudah RSVP</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f4ece1] text-[#455645]">
                  {rsvpList.length} Respon
                </span>
              </div>
              <p className="text-xs text-[#637663] mt-0.5">Siapa saja yang telah mengisi konfirmasi kehadiran beserta jumlah orangnya</p>
            </div>

            {rsvpList.length > 0 && (
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8e9e8e]" />
                <input
                  type="text"
                  placeholder="Cari nama / alamat tamu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#faf6ee] border border-[#eeddc9] focus:outline-none focus:ring-1 focus:ring-[#c5617a]"
                />
              </div>
            )}
          </div>

          {rsvpList.length === 0 ? (
            <div className="text-center py-10 text-[#8e9e8e]">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-semibold text-[#637663]">Belum ada tamu yang mengisi form RSVP.</p>
              <p className="text-[11px] mt-1">Ketika tamu mengklik &quot;Kirim Konfirmasi&quot; di web undangan, nama mereka akan otomatis tercatat di sini.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#f4ece1] text-[#637663] font-bold">
                    <th className="pb-2">Nama Tamu</th>
                    <th className="pb-2">Kota / Alamat</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Jumlah (Pax)</th>
                    <th className="pb-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f4ece1]">
                  {filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-[#faf6ee]/60 transition-colors">
                      <td className="py-3 font-bold text-[#2e4a00]">{rsvp.name}</td>
                      <td className="py-3 text-[#637663]">{rsvp.address || '-'}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rsvp.attendance.toLowerCase().includes('hadir') && !rsvp.attendance.toLowerCase().includes('tidak')
                              ? 'bg-emerald-100 text-emerald-800'
                              : rsvp.attendance.toLowerCase().includes('tidak')
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {rsvp.attendance.toLowerCase().includes('hadir') && !rsvp.attendance.toLowerCase().includes('tidak') && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {rsvp.attendance.toLowerCase().includes('tidak') && <XCircle className="w-3 h-3" />}
                          {rsvp.attendance.toLowerCase().includes('ragu') && <HelpCircle className="w-3 h-3" />}
                          {rsvp.attendance}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-[#455645]">{rsvp.pax} Orang</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteRsvp(rsvp.id)}
                          className="p-1 rounded text-[#8e9e8e] hover:text-rose-600 transition-colors"
                          title="Hapus baris ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 3. Link Generator Card */}
        <section className="bg-white rounded-2xl border border-[#eeddc9] shadow-sm p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f4ece1]">
            <div className="w-8 h-8 rounded-full bg-[#f4ece1] flex items-center justify-center text-[#455645]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2e4a00]">Buat Link Undangan Khusus Tamu</h2>
              <p className="text-xs text-[#637663]">Nama tamu akan otomatis tampil di cover depan dan langsung terisi di form RSVP</p>
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

        {/* 4. History of Generated Guest Links */}
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
                onClick={() => {
                  if (window.confirm('Hapus semua riwayat link tamu?')) saveHistory([]);
                }}
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
                      onClick={() => {
                        const updated = history.filter((h) => h.id !== item.id);
                        saveHistory(updated);
                      }}
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
