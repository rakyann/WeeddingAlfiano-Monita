'use client';

import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  onTimeUpdate?: (current: number, dur: number) => void;
  seekPercent?: number | null;
  skipDelta?: number | null;
  isMuted?: boolean;
}

export function AudioPlayer({
  isPlaying,
  onToggle,
  onTimeUpdate,
  seekPercent,
  skipDelta,
  isMuted = false,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play / Pause control
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Mute control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Seek control
  useEffect(() => {
    if (
      audioRef.current &&
      typeof seekPercent === 'number' &&
      audioRef.current.duration
    ) {
      audioRef.current.currentTime = seekPercent * audioRef.current.duration;
    }
  }, [seekPercent]);

  // Skip control
  useEffect(() => {
    if (
      audioRef.current &&
      typeof skipDelta === 'number' &&
      skipDelta !== 0
    ) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(
          audioRef.current.duration || 100,
          audioRef.current.currentTime + skipDelta
        )
      );
    }
  }, [skipDelta]);

  const handleTimeUpdate = () => {
    if (audioRef.current && onTimeUpdate) {
      onTimeUpdate(
        audioRef.current.currentTime,
        audioRef.current.duration || 0
      );
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/vintage/audio/wedding_song.mp4"
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Floating Audio Disc Controller */}
      <button
        className={`floating-audio-toggle ${isPlaying ? 'spinning' : ''}`}
        onClick={onToggle}
        title={isPlaying ? 'Pause Musik' : 'Putar Musik'}
      >
        <i className={`fa-solid ${isPlaying ? 'fa-compact-disc' : 'fa-play'}`} />
      </button>
    </>
  );
}
