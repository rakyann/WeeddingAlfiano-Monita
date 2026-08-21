'use client';

import React, { useState, useRef } from 'react';
import { parseGuestParams } from '@/lib/utils/url';
import { CoverHero } from '@/components/invitation/CoverHero';
import { WeddingProgram } from '@/components/invitation/WeddingProgram';
import { GuestDetails } from '@/components/invitation/GuestDetails';
import { VenuesSection } from '@/components/invitation/VenuesSection';
import { StoryEntourage } from '@/components/invitation/StoryEntourage';
import { GallerySection } from '@/components/invitation/GallerySection';
import { LivePhotoWall } from '@/components/invitation/LivePhotoWall';
import { RSVPSection } from '@/components/invitation/RSVPSection';
import { GuestQRCode } from '@/components/invitation/GuestQRCode';
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
    }, 400);
  };

  return (
    <main className="w-full relative min-h-screen">
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
            <WeddingProgram />
            <GuestDetails />
            <VenuesSection />
            <StoryEntourage />
            <GallerySection />
            <LivePhotoWall guestName={guestName} />
            <RSVPSection guestName={guestName} />
            <GuestQRCode guestName={guestName} tableNumber={tableNumber} />

            <footer className="py-8 px-4 bg-[#1A100C] text-center border-t border-[#C5A059]/30 text-[#FAF5EF]">
              <p className="font-script text-3xl text-[#C5A059] italic">
                Alifano &amp; Monita
              </p>
              <p className="text-[10px] text-[#D8C6B9] uppercase tracking-widest mt-1">
                Thank you for being part of our special day
              </p>
              <p className="text-[9px] text-[#8A7366] mt-4">
                © 2026 Alifano &amp; Monita Wedding Invitation. All Rights Reserved.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AudioPlayer
        isPlaying={isPlayingAudio}
        onToggle={() => setIsPlayingAudio(!isPlayingAudio)}
      />
    </main>
  );
}
