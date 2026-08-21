'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, CheckCircle2, Clock, ImagePlus, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { FloralDivider } from '../ui/FloralDecoration';

interface LivePhoto {
  id: string;
  uploader_name: string;
  photo_url: string;
  caption: string | null;
  created_at: string;
}

interface LivePhotoWallProps {
  guestName: string;
}

export const LivePhotoWall: React.FC<LivePhotoWallProps> = ({ guestName }) => {
  const [photos, setPhotos] = useState<LivePhoto[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploaderName, setUploaderName] = useState<string>(guestName);
  const [caption, setCaption] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch approved photos
  const fetchApprovedPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('live_photos')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setPhotos(data);
      }
    } catch (err) {
      console.warn('Error fetching live photos:', err);
    }
  };

  useEffect(() => {
    fetchApprovedPhotos();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Direct-to-Storage Upload using Signed URL
  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Step 1: Request signed upload URL from backend API route
      const res = await fetch('/api/photos/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }),
      });

      const { signedUrl, publicUrl, error: signedErr } = await res.json();
      if (signedErr || !signedUrl) {
        throw new Error(signedErr || 'Gagal mendapatkan signed upload URL');
      }

      // Step 2: Upload file DIRECTLY from browser to Supabase Storage Bucket
      const uploadRes = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': selectedFile.type,
        },
        body: selectedFile,
      });

      if (!uploadRes.ok) {
        throw new Error('Gagal mengunggah foto ke storage');
      }

      // Step 3: Insert metadata record into live_photos table (status = 'pending')
      const { error: dbErr } = await supabase.from('live_photos').insert([
        {
          uploader_name: uploaderName || guestName || 'Tamu Undangan',
          photo_url: publicUrl,
          caption: caption || null,
          status: 'pending',
        },
      ]);

      if (dbErr) throw dbErr;

      setToastMessage('Foto Anda berhasil diunggah & dalam antrean moderasi admin!');
      setShowModal(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setCaption('');
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan saat mengunggah foto');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="relative py-14 px-6 bg-[#17335C] text-[#F7F3EA]">
      <div className="max-w-md mx-auto text-center">
        <span className="font-serif-title text-xs text-[#D4AF37] tracking-[0.2em]">
          LIVE ALBUM
        </span>
        <h2 className="font-script text-4xl text-[#F7F3EA] mt-1 mb-2">
          Live Photo Wall
        </h2>
        <p className="text-xs text-[#B7C7E3] mb-4">
          Abadikan keceriaan Anda di venue dan bagikan langsung ke album pernikahan kami!
        </p>
        <FloralDivider color="#D4AF37" />

        {/* Upload Button Trigger */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#17335C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto shadow-lg hover:scale-105 transition-transform"
        >
          <Camera className="w-4 h-4 fill-current" /> Unggah Foto Momen Anda
        </button>

        {/* Toast Alert */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 mb-6 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs rounded-xl flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}

        {/* Photo Grid Stream */}
        {photos.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 text-center">
            <ImagePlus className="w-10 h-10 mx-auto text-[#D4AF37]/60 mb-2" />
            <p className="text-xs text-[#B7C7E3]">
              Belum ada foto yang ditampilkan. Jadilah yang pertama mengunggah momen keceriaan Anda!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 text-left">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel rounded-xl overflow-hidden border border-[#D4AF37]/30 shadow-md flex flex-col justify-between"
              >
                <img
                  src={photo.photo_url}
                  alt={photo.caption || 'Live Guest Photo'}
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <p className="text-[11px] font-bold text-[#D4AF37]">
                    {photo.uploader_name}
                  </p>
                  {photo.caption && (
                    <p className="text-[10px] text-[#B7C7E3] italic mt-0.5 line-clamp-2">
                      "{photo.caption}"
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Direct Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#17335C] p-6 rounded-3xl max-w-xs w-full border-2 border-[#D4AF37] shadow-2xl text-center">
            <h3 className="font-serif-title text-base font-bold text-[#F7F3EA] mb-1">
              UNGGAH FOTO VENUE
            </h3>
            <p className="text-[11px] text-[#B7C7E3] mb-4">
              Foto akan melalui antrean moderasi admin sebelum tayang di Live Wall.
            </p>

            <form onSubmit={handleUploadPhoto} className="space-y-3 text-left">
              <div>
                <label className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#102443] border border-[#3E5C8A] text-xs text-[#F7F3EA] focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Pesan / Catatan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Cerita foto..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#102443] border border-[#3E5C8A] text-xs text-[#F7F3EA] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Pilih Foto dari HP
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-input"
                  required
                />
                <label
                  htmlFor="photo-input"
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#D4AF37] bg-[#102443] text-xs text-[#B7C7E3] flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3E5C8A]/30 transition-colors"
                >
                  <Upload className="w-4 h-4 text-[#D4AF37]" />
                  <span>{selectedFile ? selectedFile.name : 'Pilih Berkas Foto'}</span>
                </label>
              </div>

              {previewUrl && (
                <div className="my-2 rounded-xl overflow-hidden border border-[#D4AF37]/50">
                  <img src={previewUrl} alt="Preview Upload" className="w-full h-32 object-cover" />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-[#3E5C8A] text-xs font-semibold text-[#B7C7E3]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="w-1/2 py-2.5 rounded-xl bg-[#D4AF37] text-[#17335C] text-xs font-bold disabled:opacity-50"
                >
                  {isUploading ? 'Mengunggah...' : 'Kirim Foto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
