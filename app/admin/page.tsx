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
    link.setAttribute(
      'download',
      `RSVP_Alifano_Monita_${new Date().toISOString().slice(0, 10)}.csv`
    );
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
    <div className="admin-page-wrap">
      {/* Top Navbar */}
      <header className="admin-header-bar">
        <div className="admin-header-inner">
          <div className="admin-nav-left">
            <Link href="/" className="admin-btn-back">
              <ArrowLeft size={14} />
              <span>Lihat Undangan</span>
            </Link>
            <div className="admin-title-box">
              <h1>Dashboard RSVP &amp; Buku Tamu</h1>
              <p>The Wedding of Alifano &amp; Monita &bull; Lembayung, Banyumas</p>
            </div>
          </div>

          <button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="admin-btn-refresh"
          >
            <RefreshCw
              size={14}
              className={isLoading ? 'animate-spin' : ''}
              style={{ color: '#C5A880' }}
            />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      <main className="admin-content-container">
        {/* 1. Statistics Cards */}
        <section className="admin-stats-grid">
          {/* Total RSVP */}
          <div className="admin-stat-card">
            <div className="admin-stat-label-row">
              <span className="admin-stat-label">Total Respon</span>
              <Users size={18} color="#1F2820" />
            </div>
            <div className="admin-stat-val">{stats.totalRsvps}</div>
            <div className="admin-stat-desc">Formulir RSVP terisi</div>
          </div>

          {/* Konfirmasi Hadir */}
          <div className="admin-stat-card">
            <div className="admin-stat-label-row">
              <span className="admin-stat-label" style={{ color: '#2E7D32' }}>
                Konfirmasi Hadir
              </span>
              <CheckCircle2 size={18} color="#2E7D32" />
            </div>
            <div className="admin-stat-val green">{stats.totalAttending}</div>
            <div className="admin-stat-desc">Tamu yang hadir</div>
          </div>

          {/* Estimasi Pax Catering */}
          <div className="admin-stat-card highlight">
            <div className="admin-stat-label-row">
              <span className="admin-stat-label" style={{ color: '#9E835E' }}>
                Total Pax (Porsi)
              </span>
              <Utensils size={18} color="#C5A880" />
            </div>
            <div className="admin-stat-val gold">
              {stats.totalPax}{' '}
              <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#7A746B' }}>
                Porsi
              </span>
            </div>
            <div className="admin-stat-desc">Estimasi porsi catering</div>
          </div>

          {/* Berhalangan */}
          <div className="admin-stat-card">
            <div className="admin-stat-label-row">
              <span className="admin-stat-label" style={{ color: '#C62828' }}>
                Berhalangan
              </span>
              <XCircle size={18} color="#C62828" />
            </div>
            <div className="admin-stat-val rose">{stats.totalDeclined}</div>
            <div className="admin-stat-desc">Tidak dapat hadir</div>
          </div>
        </section>

        {/* 2. Daftar Tamu RSVP */}
        <section className="admin-card-section">
          <div className="admin-card-header">
            <div>
              <div className="admin-card-title">
                <CalendarCheck size={18} color="#1F2820" />
                <span>Daftar Tamu yang Telah RSVP</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: '#F3ECE2',
                    color: '#1F2820',
                  }}
                >
                  {rsvpList.length} Respon
                </span>
              </div>
              <p className="admin-card-desc">
                Data kehadiran dan ucapan dari para tamu undangan
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {rsvpList.length > 0 && (
                <>
                  <input
                    type="text"
                    placeholder="Cari nama tamu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="admin-search-input"
                  />
                  <button
                    onClick={exportToCSV}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: '#F3ECE2',
                      border: '1px solid #E2DBD0',
                      color: '#1F2820',
                      cursor: 'pointer',
                    }}
                    title="Unduh data dalam format Excel CSV"
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {rsvpList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7A746B' }}>
              <Users size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F2820' }}>
                Belum ada tamu yang mengisi konfirmasi RSVP.
              </p>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                Data akan otomatis muncul di sini saat tamu mengirimkan form RSVP.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nama Tamu</th>
                    <th>Status</th>
                    <th>Pax</th>
                    <th>Ucapan &amp; Doa</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id}>
                      <td style={{ fontWeight: 700 }}>{rsvp.name}</td>
                      <td>
                        <span
                          className={`admin-pill-badge ${
                            rsvp.attendance.toLowerCase().includes('hadir') &&
                            !rsvp.attendance.toLowerCase().includes('tidak')
                              ? 'hadir'
                              : rsvp.attendance.toLowerCase().includes('tidak')
                              ? 'tidak'
                              : 'ragu'
                          }`}
                        >
                          {rsvp.attendance.toLowerCase().includes('hadir') &&
                            !rsvp.attendance.toLowerCase().includes('tidak') && (
                              <CheckCircle2 size={12} />
                            )}
                          {rsvp.attendance.toLowerCase().includes('tidak') && (
                            <XCircle size={12} />
                          )}
                          {rsvp.attendance}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{rsvp.pax} Orang</td>
                      <td style={{ color: '#55524E', maxWidth: '280px' }}>
                        {rsvp.message || rsvp.address || '-'}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteRsvp(rsvp.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#7A746B',
                            cursor: 'pointer',
                            padding: '4px',
                          }}
                          title="Hapus baris ini"
                        >
                          <Trash2 size={14} />
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
        <section className="admin-card-section">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Share2 size={18} color="#1F2820" />
              <span>Generator Link Undangan WhatsApp Tamu</span>
            </div>
            <p className="admin-card-desc">
              Nama tamu akan otomatis muncul di amplop cover depan dan formulir RSVP
            </p>
          </div>

          <form onSubmit={handleGenerateLink}>
            <div className="admin-form-group">
              <label className="admin-form-label">
                Nama Tamu Undangan <span style={{ color: '#C62828' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso / Bpk. Hendy & Keluarga"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: '#FAF7F2',
                  border: '1px solid #E2DBD0',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1F2820',
                }}
              >
                <input
                  type="checkbox"
                  checked={isVip}
                  onChange={(e) => setIsVip(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#1F2820' }}
                />
                <Crown size={15} color="#C5A880" />
                <span>Tamu VIP</span>
              </label>

              <input
                type="text"
                placeholder="Nomor Meja (Opsional: Meja 02)"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="admin-form-input"
              />
            </div>

            <button type="submit" className="admin-btn-generate">
              <Plus size={16} />
              <span>Buat Link &amp; Pesan WhatsApp</span>
            </button>
          </form>

          {/* Generated Result Output */}
          {generatedLink && (
            <div className="admin-result-box">
              {/* URL Card */}
              <div className="admin-result-url-card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2820' }}>
                    Link Undangan Tamu:
                  </span>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#C5A880',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Buka Preview <ExternalLink size={12} />
                  </a>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#FFFFFF',
                      border: '1px solid #E2DBD0',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                      color: '#1F2820',
                    }}
                  />
                  <button
                    onClick={() => copyToClipboard(generatedLink, false)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: '#1F2820',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      flexShrink: 0,
                    }}
                  >
                    {copiedLink ? <Check size={14} color="#A5D6A7" /> : <Copy size={14} />}
                    <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
                  </button>
                </div>
              </div>

              {/* WA Text Card */}
              <div className="admin-result-wa-card">
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2820' }}>
                  Format Pesan WhatsApp Siap Kirim:
                </span>
                <textarea
                  readOnly
                  rows={8}
                  value={generatedWaText}
                  className="admin-wa-textarea"
                />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px',
                    marginTop: '10px',
                  }}
                >
                  <button
                    onClick={() => copyToClipboard(generatedWaText, true)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: '#F3ECE2',
                      border: '1px solid #E2DBD0',
                      color: '#1F2820',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    {copiedWa ? <Check size={16} color="#2E7D32" /> : <Copy size={16} />}
                    <span>{copiedWa ? 'Pesan Tersalin!' : 'Salin Teks WhatsApp'}</span>
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      generatedWaText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn-wa-blast"
                  >
                    <MessageCircle size={16} />
                    <span>Buka WhatsApp Web / App</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 4. History List */}
        {history.length > 0 && (
          <section className="admin-card-section">
            <div className="admin-card-header">
              <div className="admin-card-title">
                <span>Riwayat Link yang Telah Dibuat</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: '#F3ECE2',
                    color: '#1F2820',
                  }}
                >
                  {history.length}
                </span>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Hapus semua riwayat link tamu?')) saveHistory([]);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '11px',
                  color: '#7A746B',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Trash2 size={12} /> Hapus Riwayat
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {history.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: '#FAF7F2',
                    border: '1px solid #E2DBD0',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1, marginRight: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2820' }}>
                        {item.name}
                      </span>
                      {item.isVip && <span className="admin-pill-badge vip">VIP</span>}
                      {item.table && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: '#FFFFFF',
                            color: '#7A746B',
                            border: '1px solid #E2DBD0',
                          }}
                        >
                          {item.table}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#7A746B',
                        fontFamily: 'monospace',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginTop: '2px',
                      }}
                    >
                      {item.url}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => copyToClipboard(item.url, false)}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: '#FFFFFF',
                        border: '1px solid #E2DBD0',
                        cursor: 'pointer',
                        color: '#1F2820',
                      }}
                      title="Salin Link"
                    >
                      <Copy size={14} />
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        item.waText
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: 'rgba(37, 211, 102, 0.15)',
                        border: '1px solid rgba(37, 211, 102, 0.3)',
                        color: '#25D366',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="Kirim ke WhatsApp"
                    >
                      <MessageCircle size={14} />
                    </a>
                    <button
                      onClick={() => {
                        const updated = history.filter((h) => h.id !== item.id);
                        saveHistory(updated);
                      }}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: '#FFFFFF',
                        border: '1px solid #E2DBD0',
                        cursor: 'pointer',
                        color: '#7A746B',
                      }}
                      title="Hapus"
                    >
                      <Trash2 size={14} />
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
