'use client';

import React, { useState, useRef } from 'react';
import { parseGuestParams } from '@/lib/utils/url';
import { TopNav } from '@/components/invitation/TopNav';
import { CoverHero } from '@/components/invitation/CoverHero';
import { MusicPlayerSection } from '@/components/invitation/MusicPlayerSection';
import { StorySection } from '@/components/invitation/StorySection';
import { MempelaiSection } from '@/components/invitation/MempelaiSection';
import { CountdownTimer } from '@/components/invitation/CountdownTimer';
import { EventDetailsSection } from '@/components/invitation/EventDetailsSection';
import { PolaroidTeaser } from '@/components/invitation/PolaroidTeaser';
import { GallerySection, galleryImages } from '@/components/invitation/GallerySection';
import { TimelineSection } from '@/components/invitation/TimelineSection';
import { BlessingContactSection } from '@/components/invitation/BlessingContactSection';
import { DigitalEnvelopeSection } from '@/components/invitation/DigitalEnvelopeSection';
import { RSVPSection } from '@/components/invitation/RSVPSection';
import { PageFooter } from '@/components/invitation/PageFooter';
import { LightboxModal } from '@/components/invitation/LightboxModal';
import { QRISModal } from '@/components/invitation/QRISModal';
import { ToastNotification } from '@/components/invitation/ToastNotification';
import { AudioPlayer } from '@/components/audio/AudioPlayer';

export default function InvitationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { to: guestName, isVip } = parseGuestParams(searchParams);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [seekPercent, setSeekPercent] = useState<number | null>(null);
  const [skipDelta, setSkipDelta] = useState<number | null>(null);

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
    }, 300);
  };

  const handleAudioTimeUpdate = (curr: number, dur: number) => {
    setCurrentTime(curr);
    setDuration(dur);
  };

  const handleSeek = (pct: number) => {
    setSeekPercent(pct);
    // Reset seek marker after trigger
    setTimeout(() => setSeekPercent(null), 50);
  };

  const handleSkip = (seconds: number) => {
    setSkipDelta(seconds);
    setTimeout(() => setSkipDelta(null), 50);
  };

  return (
    <>
      {/* Desktop Ambient Lighting Backdrop */}
      <div className="desktop-backdrop" />

      {/* Main Mobile-Framed Web App Viewport */}
      <div className="app-viewport">
        {/* Sticky Top Navigation */}
        <TopNav />

        {/* SECTION 1: Cover Hero with Authentic Vintage Envelope */}
        <CoverHero
          guestName={guestName || 'Tamu Undangan'}
          isVip={isVip}
          isOpen={isOpen}
          onOpen={handleOpenInvitation}
        />

        {/* Invitation Sections (Unlocked on Open) */}
        {isOpen && (
          <div ref={invitationBodyRef}>
            {/* SECTION 2: Music Player & Couple Banner */}
            <MusicPlayerSection
              isPlaying={isPlayingAudio}
              onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              onSkip={handleSkip}
              isMuted={isAudioMuted}
              onToggleMute={() => setIsAudioMuted(!isAudioMuted)}
            />

            {/* SECTION 3: Love Story & Baroque Mirror Photo */}
            <StorySection />

            {/* SECTION 4: Groom & Bride Profiles */}
            <MempelaiSection />

            {/* SECTION 5: Live Countdown Timer */}
            <CountdownTimer />

            {/* SECTION 6: Reception & Akad Location Details */}
            <EventDetailsSection onShowToast={showToast} />

            {/* SECTION 7: Polaroid Stack Teaser */}
            <PolaroidTeaser />

            {/* SECTION 8: Prewedding Gallery */}
            <GallerySection onOpenLightbox={(idx) => setLightboxIndex(idx)} />

            {/* SECTION 9: Our Timeline Rundown */}
            <TimelineSection />

            {/* SECTION 10: Blessing Dua & Parents Contact Cards */}
            <BlessingContactSection />

            {/* SECTION 11: Digital Envelope (Wedding Gift / Tanda Kasih) */}
            <DigitalEnvelopeSection onShowToast={showToast} />

            {/* SECTION 12: RSVP Form & Live Wishes Wall */}
            <RSVPSection guestName={guestName} onShowToast={showToast} />

            {/* Page Footer */}
            <PageFooter />
          </div>
        )}
      </div>

      {/* Modals & Overlays */}
      <LightboxModal
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex(
              (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
            );
          }
        }}
        onNext={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
          }
        }}
      />

      <QRISModal isOpen={isQrisOpen} onClose={() => setIsQrisOpen(false)} />

      <ToastNotification message={toastMessage} />

      {/* Floating Audio Controller */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        onToggle={() => setIsPlayingAudio(!isPlayingAudio)}
        onTimeUpdate={handleAudioTimeUpdate}
        seekPercent={seekPercent}
        skipDelta={skipDelta}
        isMuted={isAudioMuted}
      />
    </>
  );
}
