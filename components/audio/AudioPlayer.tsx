'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play hindered by browser policy:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-piano-112702.mp3"
        preload="auto"
      />
      <button
        onClick={onToggle}
        aria-label="Toggle Background Music"
        className="flex items-center justify-center w-11 h-11 rounded-full bg-navy-deep/90 text-cream border border-blue-mid/50 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-blue-light/70" />
        )}
      </button>
    </div>
  );
};
