'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Copy,
  Check,
  Share2,
  Plus,
  RefreshCw,
  Crown,
  ShieldAlert,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { generateWhatsAppMessage, buildGuestInvitationUrl } from '@/lib/utils/url';

interface PendingPhoto {
  id: string;
  uploader_name: string;
  photo_url: string;
  caption: string | null;
  status: string;
  created_at: string;
}

interface RSVPStat {
  totalRsvps: number;
  totalAttending: number;
  totalDeclined: number;
  totalPax: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<RSVPStat>({
    totalRsvps: 3,
    totalAttending: 2,
    totalDeclined: 0,
    totalPax: 6,
  });

  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [newGuestName, setNewGuestName] = useState<string>('');
  const [isVip, setIsVip] = useState<boolean>(false);
  const [tableNumber, setTableNumber] = useState<string>('');

  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [generatedWaText, setGeneratedWaText] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedWa, setCopiedWa] = useState<boolean>(false);

  // Fetch Stats & Pending Photos
  const loadDashboardData = async () => {
    try {
      // Load Pending Photos
      const { data: photos } = await supabase
        .from('live_photos')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (photos) {
        setPendingPhotos(photos);
      }

      // Load RSVPs for statistics
      const { data: rsvps } = await supabase.from('rsvps').select('*');
      if (rsvps) {
        const attending = rsvps.filter((r) => r.attendance === 'attending');
        const declined = rsvps.filter((r) => r.attendance === 'declined');
        const paxSum = attending.reduce((acc, r) => acc + (r.pax || 1), 0);

        setStats({
          totalRsvps: rsvps.length,
          totalAttending: attending.length,
          totalDeclined: declined.length,
          totalPax: paxSum,
        });
      }
    } catch (err) {
      console.warn('Dashboard load error:', err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Moderate Photo: Approve or Reject
  const handleModeratePhoto = async (photoId: string, status: 'approved' | 'rejected') => {
    try {
      await supabase.from('live_photos').update({ status }).eq('id', photoId);
      setPendingPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah status foto');
    }
  };

  // Generate WA Blast Link
  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://wedding.app');
    const url = buildGuestInvitationUrl(baseUrl, newGuestName.trim(), {
      isVip,
      table: tableNumber.trim() || undefined,
    });

    const waMsg = generateWhatsAppMessage(newGuestName.trim(), url, 'Romeo & Juliet');

    setGeneratedLink(url);
    setGeneratedWaText(waMsg);
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

  return (
    <main className="min-h-screen bg-[#17335C] text-[#F7F3EA] p-6 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#3E5C8A] pb-4">
        <div>
          <h1 className="font-script text-3xl text-[#F7F3EA]">
            Admin Dashboard
          </h1>
          <p className="text-xs text-[#B7C7E3]">
            Manajemen Tamu, Rekap RSVP &amp; Moderasi Live Photo Wall
          </p>
        </div>
        <button
          onClick={loadDashboardData}
          className="p-2 rounded-xl bg-[#3E5C8A] text-[#D4AF37] hover:bg-[#102443] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/30">
          <p className="text-[10px] uppercase font-bold text-[#B7C7E3]">Total RSVP</p>
          <p className="text-2xl font-bold text-[#D4AF37] mt-1">{stats.totalRsvps}</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/30">
          <p className="text-[10px] uppercase font-bold text-[#B7C7E3]">Total Pax Hadir</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.totalPax} Pax</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/30">
          <p className="text-[10px] uppercase font-bold text-[#B7C7E3]">Konfirmasi Hadir</p>
          <p className="text-xl font-bold text-emerald-300 mt-1">{stats.totalAttending} Tamu</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/30">
          <p className="text-[10px] uppercase font-bold text-[#B7C7E3]">Berhalangan</p>
          <p className="text-xl font-bold text-rose-400 mt-1">{stats.totalDeclined} Tamu</p>
        </div>
      </div>

      {/* 2. Photo Moderation Section */}
      <div className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/40 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-title text-xs font-bold text-[#D4AF37] tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4" /> MODERASI FOTO GUEST ({pendingPhotos.length})
          </h2>
        </div>

        {pendingPhotos.length === 0 ? (
          <p className="text-xs text-[#B7C7E3] italic py-2">
            Tidak ada foto dalam antrean moderasi saat ini.
          </p>
        ) : (
          <div className="space-y-3">
            {pendingPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-[#102443] p-3 rounded-xl border border-[#3E5C8A] flex items-center justify-between gap-3"
              >
                <img
                  src={photo.photo_url}
                  alt="Pending"
                  className="w-16 h-16 object-cover rounded-lg border border-[#D4AF37]/40"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#F7F3EA] truncate">
                    {photo.uploader_name}
                  </p>
                  {photo.caption && (
                    <p className="text-[10px] text-[#B7C7E3] truncate">
                      "{photo.caption}"
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleModeratePhoto(photo.id, 'approved')}
                    className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    title="Approve Foto"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleModeratePhoto(photo.id, 'rejected')}
                    className="p-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                    title="Reject Foto"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Dynamic Link Generator & WA Blast Exporter */}
      <div className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/40 space-y-4">
        <h2 className="font-serif-title text-xs font-bold text-[#D4AF37] tracking-wider flex items-center gap-1.5">
          <Share2 className="w-4 h-4" /> GENERATOR LINK TAMU &amp; WA BLAST
        </h2>

        <form onSubmit={handleGenerateLink} className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-[#B7C7E3] uppercase block mb-1">
              Nama Tamu Undangan
            </label>
            <input
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#102443] border border-[#3E5C8A] text-xs text-[#F7F3EA] focus:outline-none focus:border-[#D4AF37]"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs text-[#F7F3EA] cursor-pointer">
              <input
                type="checkbox"
                checked={isVip}
                onChange={(e) => setIsVip(e.target.checked)}
                className="rounded border-[#3E5C8A] text-[#D4AF37]"
              />
              <span className="flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" /> Set VIP Status
              </span>
            </label>

            <div className="flex-1">
              <input
                type="text"
                placeholder="No. Meja (Opsional: A1)"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-[#102443] border border-[#3E5C8A] text-xs text-[#F7F3EA]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#17335C] font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Generate Link Undangan
          </button>
        </form>

        {generatedLink && (
          <div className="mt-4 pt-4 border-t border-[#3E5C8A] space-y-3">
            <div>
              <p className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">
                URL Undangan Personal:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="w-full px-3 py-2 rounded-xl bg-[#102443] text-xs font-mono text-[#B7C7E3]"
                />
                <button
                  onClick={() => copyToClipboard(generatedLink, false)}
                  className="px-3 py-2 rounded-xl bg-[#3E5C8A] text-[#D4AF37] text-xs font-bold shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">
                Format Pesan WhatsApp Ready-to-Copy:
              </p>
              <textarea
                readOnly
                rows={6}
                value={generatedWaText}
                className="w-full px-3 py-2 rounded-xl bg-[#102443] text-xs font-mono text-[#B7C7E3] resize-none"
              />
              <button
                onClick={() => copyToClipboard(generatedWaText, true)}
                className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700"
              >
                {copiedWa ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedWa ? 'Tersalin ke Clipboard!' : 'Copy Format Pesan WhatsApp'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
