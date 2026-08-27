'use client';

import React, { useState, useRef } from 'react';
import { parseGuestParams } from '@/lib/utils/url';
import { LoadingOverlay } from '@/components/invitation/LoadingOverlay';
import { DesktopHeroSide } from '@/components/invitation/DesktopHeroSide';
import { CoverHero } from '@/components/invitation/CoverHero';
import { QuranSection } from '@/components/invitation/QuranSection';
import { MempelaiSection } from '@/components/invitation/MempelaiSection';
import { CountdownTimer } from '@/components/invitation/CountdownTimer';
import { EventDetailsSection } from '@/components/invitation/EventDetailsSection';
import { GallerySection, galleryImages } from '@/components/invitation/GallerySection';
import { RSVPSection } from '@/components/invitation/RSVPSection';
import { WishesSection } from '@/components/invitation/WishesSection';
import { DigitalEnvelopeSection } from '@/components/invitation/DigitalEnvelopeSection';
import { ClosingSection } from '@/components/invitation/ClosingSection';
import { LightboxModal } from '@/components/invitation/LightboxModal';
import { QRISModal } from '@/components/invitation/QRISModal';
import { ToastNotification } from '@/components/invitation/ToastNotification';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { BackToTop } from '@/components/ui/BackToTop';

export default function InvitationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { to: guestName } = parseGuestParams(searchParams);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isQrisOpen, setIsQrisOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const invitationBodyRef = useRef<HTMLDivElement | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlayingAudio(true);
    setTimeout(() => {
      invitationBodyRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {/* 1. Loading Overlay */}
      <LoadingOverlay />

      {/* 2. Main Split Layout */}
      <div className="app-layout">
        {/* Desktop Left Sidebar Banner */}
        <DesktopHeroSide />

        {/* Right Scrollable Invitation Container */}
        <main className="invitation-scroll-side" id="invitationContainer">
          {/* Cover Section */}
          <CoverHero
            guestName={guestName || 'Tamu Undangan'}
            onOpen={handleOpenInvitation}
          />

          {/* Invitation Content (revealed after clicking Buka Undangan) */}
          {isOpen && (
            <div ref={invitationBodyRef}>
              {/* Quran Verse */}
              <QuranSection />

              {/* Groom & Bride */}
              <MempelaiSection />

              {/* Countdown & Save the date */}
              <CountdownTimer />

              {/* Wedding Events & Rundown */}
              <EventDetailsSection onShowToast={showToast} />

              {/* Gallery */}
              <GallerySection onOpenLightbox={(idx) => setLightboxIndex(idx)} />

              {/* RSVP Form */}
              <RSVPSection
                guestName={guestName}
                onShowToast={showToast}
              />

              {/* Wishes Stream */}
              <WishesSection onShowToast={showToast} />

              {/* Digital Gift / Wedding Gift */}
              <DigitalEnvelopeSection
                onOpenQris={() => setIsQrisOpen(true)}
                onShowToast={showToast}
              />

              {/* Closing Section */}
              <ClosingSection />
            </div>
          )}
        </main>
      </div>

      {/* 3. Modals & Notifications */}
      <LightboxModal
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
          }
        }}
        onNext={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
          }
        }}
      />

      <QRISModal
        isOpen={isQrisOpen}
        onClose={() => setIsQrisOpen(false)}
      />

      <ToastNotification message={toastMessage} />

      {/* 4. Floating Controls */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        onToggle={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      <BackToTop />
    </>
  );
}
