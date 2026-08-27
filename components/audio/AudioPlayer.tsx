'use client';

import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function AudioPlayer({ isPlaying, onToggle }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/wedding_song.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={onToggle}
        className={`floating-music-btn ${isPlaying ? 'playing' : ''}`}
        aria-label="Toggle Music"
        title="Putar / Hentikan Musik"
      >
        <div className="music-disc-wrapper">
          <i className="fa-solid fa-compact-disc disc-icon" />
          <i className="fa-solid fa-play play-overlay" />
        </div>
        <span className="music-note-float">🎵</span>
      </button>
    </>
  );
}
