'use client';

import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  src?: string;
}

export function AudioPlayer({
  isPlaying,
  onToggle,
  src = '/assets/Music/midnightpetals%20-%20in%20between(Official%20Lyric%20Video).mp3',
}: AudioPlayerProps) {
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
        src={src}
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
