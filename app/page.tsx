'use client';

import React, { useState, useRef } from 'react';
import { parseGuestParams } from '@/lib/utils/url';
import { CoverHero } from '@/components/invitation/CoverHero';
import { MempelaiSection } from '@/components/invitation/MempelaiSection';
import { CountdownTimer } from '@/components/invitation/CountdownTimer';
import { EventDetailsSection } from '@/components/invitation/EventDetailsSection';
import { LoveStorySection } from '@/components/invitation/LoveStorySection';
import { GallerySection } from '@/components/invitation/GallerySection';
import { DresscodeSection } from '@/components/invitation/DresscodeSection';
import { DigitalEnvelopeSection } from '@/components/invitation/DigitalEnvelopeSection';
import { RSVPSection } from '@/components/invitation/RSVPSection';
import { ClosingSection } from '@/components/invitation/ClosingSection';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { motion, AnimatePresence } from 'framer-motion';

export default function InvitationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { to: guestName, isVip, table: tableNumber } = parseGuestParams(searchParams);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlayingAudio(true);
    setTimeout(() => {
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <main className="w-full relative min-h-screen" style={{ backgroundColor: '#F7F3EA' }}>
      {/* 1. Cover / Hero Section */}
      <CoverHero
        guestName={guestName}
        isVip={isVip}
        tableNumber={tableNumber}
        isOpen={isOpen}
        onOpen={handleOpenInvitation}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mainContentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative"
          >
            {/* 2. Mempelai (Bride & Groom) */}
            <MempelaiSection />

            {/* 3. Hitung Mundur (Countdown Timer) */}
            <CountdownTimer />

            {/* 4. Detail Acara (Event Details) */}
            <EventDetailsSection />

            {/* 5. Cerita Cinta (Our Story) */}
            <LoveStorySection />

            {/* 6. Galeri Foto & Video */}
            <GallerySection />

            {/* 7. Informasi Tambahan / Dresscode */}
            <DresscodeSection />

            {/* 8. Amplop Digital / Wedding Gift */}
            <DigitalEnvelopeSection />

            {/* 9. Konfirmasi Kehadiran & Ucapan (RSVP & Guestbook) */}
            <RSVPSection guestName={guestName} />

            {/* 10. Penutup & Ayat/Kutipan */}
            <ClosingSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Player */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        onToggle={() => setIsPlayingAudio(!isPlayingAudio)}
      />
    </main>
  );
}
