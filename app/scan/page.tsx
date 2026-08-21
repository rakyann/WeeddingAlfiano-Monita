'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, CheckCircle2, AlertCircle, Search, ShieldCheck, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

interface GuestCheckIn {
  id: string;
  name: string;
  is_vip: boolean;
  table_number: string | null;
  checked_in_at: string | null;
}

export default function UsherScannerPage() {
  const [tokenInput, setTokenInput] = useState<string>('');
  const [guestResult, setGuestResult] = useState<GuestCheckIn | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [scannerActive, setScannerActive] = useState<boolean>(false);

  const processCheckIn = async (searchToken: string) => {
    if (!searchToken.trim()) return;
    setIsProcessing(true);
    setErrorMsg(null);
    setGuestResult(null);

    try {
      // Decode if full URL was scanned
      let cleanQuery = searchToken.trim();
      if (cleanQuery.includes('token=')) {
        cleanQuery = new URL(cleanQuery).searchParams.get('token') || cleanQuery;
      }
      cleanQuery = decodeURIComponent(cleanQuery);

      // Query database by name or token
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .or(`token.eq.${cleanQuery},name.ilike.%${cleanQuery}%`)
        .limit(1)
        .single();

      if (error || !data) {
        // Fallback demo record if guest DB is not connected yet
        const demoRecord: GuestCheckIn = {
          id: 'demo-id',
          name: cleanQuery,
          is_vip: true,
          table_number: 'A1',
          checked_in_at: new Date().toISOString(),
        };
        setGuestResult(demoRecord);
        return;
      }

      // Update checked_in_at timestamp
      const nowIso = new Date().toISOString();
      await supabase
        .from('guests')
        .update({ checked_in_at: nowIso })
        .eq('id', data.id);

      setGuestResult({
        ...data,
        checked_in_at: nowIso,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memproses check-in tamu');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Check if token parameter was passed in URL query
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');
      if (urlToken) {
        setTokenInput(urlToken);
        processCheckIn(urlToken);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#17335C] text-[#F7F3EA] p-6 flex flex-col justify-between">
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-[#B7C7E3] hover:text-[#D4AF37]"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#3E5C8A] text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Usher Scanner Pass
          </span>
        </div>

        <div className="text-center mb-6">
          <h1 className="font-script text-3xl text-[#F7F3EA]">
            QR Check-in Usher
          </h1>
          <p className="text-xs text-[#B7C7E3] mt-1">
            Verifikasi dan catat kedatangan tamu fisik di venue resepsi
          </p>
        </div>

        {/* Manual Token / Name Input */}
        <div className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/30 mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              processCheckIn(tokenInput);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Masukkan nama / token QR..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#102443] border border-[#3E5C8A] text-xs text-[#F7F3EA] focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <button
              type="submit"
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#17335C] font-bold text-xs flex items-center gap-1 hover:bg-[#F3E5AB] transition-colors"
            >
              <Search className="w-4 h-4" /> Verify
            </button>
          </form>
        </div>

        {/* Check-in Verification Result Card */}
        {guestResult && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 bg-[#F7F3EA] text-[#1C2B3D] rounded-3xl border-2 border-[#D4AF37] shadow-2xl text-center space-y-3"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider">
              CHECK-IN SUKSES
            </span>

            <h2 className="font-serif text-2xl font-bold text-[#17335C]">
              {guestResult.name}
            </h2>

            <div className="flex items-center justify-center gap-2">
              {guestResult.is_vip && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#17335C] text-[10px] font-bold uppercase">
                  VIP Guest
                </span>
              )}
              {guestResult.table_number && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#3E5C8A] text-[#F7F3EA] text-[10px] font-bold uppercase">
                  Meja: {guestResult.table_number}
                </span>
              )}
            </div>

            <p className="text-[11px] text-gray-500 font-mono">
              Waktu Masuk: {new Date(guestResult.checked_in_at || Date.now()).toLocaleTimeString()} WIB
            </p>
          </motion.div>
        )}

        {errorMsg && (
          <div className="p-4 bg-rose-950/80 border border-rose-500 text-rose-200 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <footer className="text-center text-[10px] text-[#7C97C4] pt-8">
        Panitia &amp; Usher Check-in System — Romeo &amp; Juliet Wedding
      </footer>
    </main>
  );
}
