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
import { TornPaperEdge } from '@/components/ui/TornPaperEdge';
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
      {/* Landing / Cover Section */}
      <CoverHero
        guestName={guestName}
        isVip={isVip}
        tableNumber={tableNumber}
        isOpen={isOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Main Content Sections (Revealed upon clicking "Buka Undangan") */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mainContentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative"
          >
            {/* Torn Paper Transition: Navy Cover -> Cream Program */}
            <TornPaperEdge position="top" fillColor="#F7F3EA" />
            <WeddingProgram />

            {/* Guest Details & Gift Guide (Cream Sand background) */}
            <GuestDetails />

            {/* Torn Paper Transition: Cream -> Deep Navy Venue */}
            <TornPaperEdge position="bottom" fillColor="#F7F3EA" />
            <VenuesSection />

            {/* Love Story & Entourage (Deep Navy background) */}
            <StoryEntourage />

            {/* Torn Paper Transition: Navy -> Cream Gallery */}
            <TornPaperEdge position="top" fillColor="#F7F3EA" />
            <GallerySection />

            {/* Torn Paper Transition: Cream -> Navy Live Wall */}
            <TornPaperEdge position="bottom" fillColor="#F7F3EA" />
            <LivePhotoWall guestName={guestName} />

            {/* Torn Paper Transition: Navy -> Cream RSVP */}
            <TornPaperEdge position="top" fillColor="#F7F3EA" />
            <RSVPSection guestName={guestName} />

            {/* Torn Paper Transition: Cream -> Navy QR Access */}
            <TornPaperEdge position="bottom" fillColor="#F7F3EA" />
            <GuestQRCode guestName={guestName} tableNumber={tableNumber} />

            {/* Footer Copyright Section */}
            <footer className="py-8 px-4 bg-[#102443] text-center border-t border-[#D4AF37]/30">
              <p className="font-script text-xl text-[#D4AF37]">
                Romeo &amp; Juliet
              </p>
              <p className="text-[10px] text-[#7C97C4] uppercase tracking-widest mt-1">
                Thank you for being part of our special day
              </p>
              <p className="text-[9px] text-gray-500 mt-4">
                © 2026 Single Deployment Wedding App. All Rights Reserved.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Audio Control */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        onToggle={() => setIsPlayingAudio(!isPlayingAudio)}
      />
    </main>
  );
}
