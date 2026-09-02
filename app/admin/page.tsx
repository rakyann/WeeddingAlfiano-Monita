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
  Download,
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
  message?: string;
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

  // Load Dashboard Data
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
            address: item.address || item.message || '-',
            attendance: item.attendance || 'Hadir',
            pax: Number(item.pax) || Number(item.guests) || 1,
            message: item.message,
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
      const { data: supaRsvps } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });
      if (supaRsvps && supaRsvps.length > 0) {
        const existingNames = new Set(allRsvps.map((r) => r.name.toLowerCase()));
        for (const r of supaRsvps) {
          const rName = (r.guest_name || r.name || 'Tamu').trim();
          if (!existingNames.has(rName.toLowerCase())) {
            allRsvps.push({
              id: r.id || Date.now().toString(),
              name: rName,
              address: r.address || r.message || '-',
              attendance:
                r.attendance === 'attending'
                  ? 'Hadir'
                  : r.attendance === 'declined'
                  ? 'Tidak Hadir'
                  : r.attendance || 'Hadir',
              pax: Number(r.pax) || Number(r.guests) || 1,
              message: r.message,
              created_at: r.created_at || new Date().toISOString(),
            });
            existingNames.add(rName.toLowerCase());
          }
        }
      }
    } catch (err) {}

    setRsvpList(allRsvps);

    // Calculate Statistics
    const attending = allRsvps.filter(
      (r) =>
        r.attendance.toLowerCase().includes('hadir') &&
        !r.attendance.toLowerCase().includes('tidak')
    );
    const declined = allRsvps.filter((r) =>
      r.attendance.toLowerCase().includes('tidak')
    );
    const maybe = allRsvps.filter((r) =>
      r.attendance.toLowerCase().includes('ragu')
    );
    const paxSum = attending.reduce(
      (acc, r) => acc + (Number(r.pax) || 1),
      0
    );

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
      (typeof window !== 'undefined'
        ? window.location.origin
        : 'https://weedding-alfiano-monita.vercel.app');

    const url = buildGuestInvitationUrl(baseUrl, newGuestName.trim(), {
      isVip,
      table: tableNumber.trim() || undefined,
    });

    const waMsg = generateWhatsAppMessage(
      newGuestName.trim(),
      url,
      'Alifano & Monita'
    );

    setGeneratedLink(url);
    setGeneratedWaText(waMsg);

    const newItem: GuestHistoryItem = {
      id: Date.now().toString(),
      name: newGuestName.trim(),
      isVip,
      table: tableNumber.trim() || undefined,
      url,
      waText: waMsg,
      createdAt: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedHistory = [
      newItem,
      ...history.filter(
        (h) => h.name.toLowerCase() !== newGuestName.trim().toLowerCase()
      ),
    ].slice(0, 50);
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
        localStorage.setItem(
          'wedding_alifano_monita_rsvps',
          JSON.stringify(updated)
        );
      } catch (e) {}
      loadDashboardData();
    }
  };

  const exportToCSV = () => {
    if (rsvpList.length === 0) return;
    const headers = ['Nama Tamu', 'Status Kehadiran', 'Jumlah Pax', 'Kota/Pesan', 'Waktu'];
    const rows = rsvpList.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.attendance}"`,
      r.pax,
      `"${(r.address || r.message || '').replace(/"/g, '""')}"`,
      `"${r.created_at || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RSVP_Alifano_Monita_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRsvps = rsvpList.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.address && r.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2820] font-sans antialiased pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E2DBD0] shadow-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1F2820] text-white hover:bg-[#2E3B2F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lihat Undangan</span>
            </Link>
            <div className="h-4 w-[1px] bg-[#E2DBD0]" />
            <div>
              <h1 className="text-base font-bold text-[#1F2820]">
                Dashboard RSVP &amp; Buku Tamu
              </h1>
              <p className="text-[11px] text-[#7A746B]">
                The Wedding of Alifano &amp; Monita &bull; Lembayung, Banyumas
              </p>
            </div>
          </div>

          <button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-[#E2DBD0] text-[#1F2820] hover:bg-[#F3ECE2] shadow-sm transition-all active:scale-95"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#C5A880]' : ''}`}
            />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        {/* 1. Statistics Cards */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Total RSVP */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DBD0] shadow-sm">
              <div className="flex items-center justify-between text-[#7A746B] mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Total Respon
                </span>
                <Users className="w-4 h-4 text-[#1F2820]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1F2820]">
                {stats.totalRsvps}
              </p>
              <p className="text-[11px] text-[#7A746B] mt-1">
                Formulir RSVP terisi
              </p>
            </div>

            {/* Hadir */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DBD0] shadow-sm">
              <div className="flex items-center justify-between text-[#7A746B] mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Konfirmasi Hadir
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-700">
                {stats.totalAttending}
              </p>
              <p className="text-[11px] text-emerald-600/80 mt-1">
                Tamu yang hadir
              </p>
            </div>

            {/* Estimasi Orang/Pax Catering */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#C5A880] shadow-sm bg-gradient-to-br from-white to-[#FAF7F2]">
              <div className="flex items-center justify-between text-[#7A746B] mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E835E]">
                  Total Pax (Porsi)
                </span>
                <Utensils className="w-4 h-4 text-[#C5A880]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#9E835E]">
                {stats.totalPax}{' '}
                <span className="text-xs font-normal text-[#7A746B]">
                  Porsi
                </span>
              </p>
              <p className="text-[11px] text-[#7A746B] mt-1">
                Estimasi porsi catering
              </p>
            </div>

            {/* Berhalangan */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DBD0] shadow-sm">
              <div className="flex items-center justify-between text-[#7A746B] mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                  Berhalangan
                </span>
                <XCircle className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-rose-700">
                {stats.totalDeclined}
              </p>
              <p className="text-[11px] text-rose-500/80 mt-1">
                Tidak dapat hadir
              </p>
            </div>
          </div>
        </section>

        {/* 2. Daftar Tamu RSVP */}
        <section className="bg-white rounded-2xl border border-[#E2DBD0] shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E2DBD0]">
            <div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#1F2820]" />
                <h2 className="text-base font-bold text-[#1F2820]">
                  Daftar Tamu yang Telah RSVP
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F3ECE2] text-[#1F2820]">
                  {rsvpList.length} Respon
                </span>
              </div>
              <p className="text-xs text-[#7A746B] mt-0.5">
                Data kehadiran dan ucapan dari para tamu undangan
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {rsvpList.length > 0 && (
                <>
                  <div className="relative flex-1 sm:w-60">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A746B]" />
                    <input
                      type="text"
                      placeholder="Cari nama tamu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E2DBD0] focus:outline-none focus:border-[#1F2820]"
                    />
                  </div>
                  <button
                    onClick={exportToCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F3ECE2] hover:bg-[#E2DBD0] text-[#1F2820] transition-colors shrink-0"
                    title="Unduh data dalam format Excel CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {rsvpList.length === 0 ? (
            <div className="text-center py-10 text-[#7A746B]">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-semibold text-[#1F2820]">
                Belum ada tamu yang mengisi konfirmasi RSVP.
              </p>
              <p className="text-[11px] mt-1">
                Data akan otomatis muncul di sini saat tamu mengirimkan form RSVP.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2DBD0] text-[#7A746B] font-bold">
                    <th className="pb-2.5">Nama Tamu</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5">Pax</th>
                    <th className="pb-2.5">Ucapan &amp; Doa</th>
                    <th className="pb-2.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3ECE2]">
                  {filteredRsvps.map((rsvp) => (
                    <tr
                      key={rsvp.id}
                      className="hover:bg-[#FAF7F2]/80 transition-colors"
                    >
                      <td className="py-3 font-bold text-[#1F2820]">
                        {rsvp.name}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rsvp.attendance.toLowerCase().includes('hadir') &&
                            !rsvp.attendance.toLowerCase().includes('tidak')
                              ? 'bg-emerald-100 text-emerald-800'
                              : rsvp.attendance.toLowerCase().includes('tidak')
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {rsvp.attendance.toLowerCase().includes('hadir') &&
                            !rsvp.attendance.toLowerCase().includes('tidak') && (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                          {rsvp.attendance.toLowerCase().includes('tidak') && (
                            <XCircle className="w-3 h-3" />
                          )}
                          {rsvp.attendance}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-[#1F2820]">
                        {rsvp.pax} Orang
                      </td>
                      <td className="py-3 text-[#55524E] max-w-xs truncate">
                        {rsvp.message || rsvp.address || '-'}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteRsvp(rsvp.id)}
                          className="p-1 rounded text-[#7A746B] hover:text-rose-600 transition-colors"
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
        <section className="bg-white rounded-2xl border border-[#E2DBD0] shadow-sm p-5 sm:p-7">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#E2DBD0]">
            <div className="w-8 h-8 rounded-full bg-[#1F2820] flex items-center justify-center text-white">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1F2820]">
                Generator Link Undangan WhatsApp Tamu
              </h2>
              <p className="text-xs text-[#7A746B]">
                Nama tamu akan otomatis muncul di amplop cover depan dan formulir RSVP
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateLink} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1F2820] mb-1.5">
                Nama Tamu Undangan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso / Bpk. Hendy & Keluarga"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2DBD0] text-sm text-[#1F2820] placeholder:text-[#A0988E] focus:outline-none focus:border-[#1F2820] transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E2DBD0] bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={isVip}
                  onChange={(e) => setIsVip(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E2DBD0] text-[#1F2820] focus:ring-[#1F2820]"
                />
                <span className="text-xs font-bold text-[#1F2820] flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-600" /> Tamu VIP
                </span>
              </label>

              <div>
                <input
                  type="text"
                  placeholder="Nomor Meja (Opsional: Meja 02)"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E2DBD0] text-xs text-[#1F2820] placeholder:text-[#A0988E] focus:outline-none focus:border-[#1F2820]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#1F2820] hover:bg-[#2E3B2F] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Link &amp; Pesan WhatsApp</span>
            </button>
          </form>

          {/* Generated Result Output */}
          {generatedLink && (
            <div className="mt-6 pt-5 border-t border-[#E2DBD0] space-y-4">
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E2DBD0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#1F2820]">
                    Link Undangan Tamu:
                  </span>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#C5A880] hover:underline inline-flex items-center gap-1"
                  >
                    Buka Preview <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E2DBD0] text-xs font-mono text-[#1F2820] select-all"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedLink, false)}
                    className="px-4 py-2 rounded-lg bg-[#1F2820] hover:bg-[#2E3B2F] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2DBD0] space-y-3">
                <span className="text-xs font-bold text-[#1F2820] block">
                  Format Pesan WhatsApp:
                </span>
                <textarea
                  readOnly
                  rows={8}
                  value={generatedWaText}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E2DBD0] text-xs font-sans text-[#1F2820] resize-none leading-relaxed focus:outline-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => copyToClipboard(generatedWaText, true)}
                    className="w-full py-2.5 rounded-lg bg-[#F3ECE2] hover:bg-[#E2DBD0] text-[#1F2820] font-bold text-xs flex items-center justify-center gap-2 border border-[#E2DBD0] transition-colors"
                  >
                    {copiedWa ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>
                      {copiedWa ? 'Pesan Tersalin!' : 'Salin Teks WhatsApp'}
                    </span>
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      generatedWaText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Buka WhatsApp Web/App</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 4. History of Generated Guest Links */}
        {history.length > 0 && (
          <section className="bg-white rounded-2xl border border-[#E2DBD0] shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2DBD0]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1F2820]">
                  Riwayat Link yang Telah Dibuat
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F3ECE2] text-[#1F2820]">
                  {history.length}
                </span>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Hapus semua riwayat link tamu?'))
                    saveHistory([]);
                }}
                className="text-[11px] text-[#7A746B] hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Hapus Riwayat
              </button>
            </div>

            <div className="divide-y divide-[#F3ECE2] max-h-80 overflow-y-auto pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#1F2820] truncate">
                        {item.name}
                      </p>
                      {item.isVip && (
                        <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-100 text-amber-800">
                          VIP
                        </span>
                      )}
                      {item.table && (
                        <span className="px-1.5 py-0.2 text-[9px] font-medium rounded bg-[#F3ECE2] text-[#7A746B]">
                          {item.table}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#7A746B] truncate mt-0.5">
                      {item.url}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => copyToClipboard(item.url, false)}
                      className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#E2DBD0] text-[#1F2820] text-xs transition-colors"
                      title="Salin Link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        item.waText
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors"
                      title="Kirim ke WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => {
                        const updated = history.filter((h) => h.id !== item.id);
                        saveHistory(updated);
                      }}
                      className="p-2 rounded-lg hover:bg-rose-50 text-[#7A746B] hover:text-rose-600 transition-colors"
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
