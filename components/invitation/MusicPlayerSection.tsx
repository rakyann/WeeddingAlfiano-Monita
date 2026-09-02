'use client';

import React from 'react';

interface MusicPlayerSectionProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  duration: number;
  onSeek: (percent: number) => void;
  onSkip: (seconds: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function MusicPlayerSection({
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
  onSkip,
  isMuted,
  onToggleMute,
}: MusicPlayerSectionProps) {
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTime = duration > 0 ? duration - currentTime : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(pct);
  };

  return (
    <section id="music-section" className="wedding-section music-banner">
      <div className="music-inner">
        <h2 className="music-couple-names">Alifano &amp; Monita</h2>
        <p className="music-sub">Are getting married!</p>

        {/* Interactive Music Player UI */}
        <div className="music-player-card">
          <div className="player-title">CLICK TO PLAY OUR SONG</div>

          <div className="player-progress-wrap">
            <div className="progress-bar-bg" onClick={handleProgressClick}>
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="player-time-labels">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(remainingTime)}</span>
            </div>
          </div>

          <div className="player-controls">
            <button
              className="player-btn"
              onClick={() => onSkip(-10)}
              title="Rewind 10s"
            >
              <i className="fa-solid fa-backward-step" />
            </button>
            <button
              className="player-btn player-btn-main"
              onClick={onTogglePlay}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
            </button>
            <button
              className="player-btn"
              onClick={() => onSkip(10)}
              title="Forward 10s"
            >
              <i className="fa-solid fa-forward-step" />
            </button>
            <button
              className="player-btn"
              onClick={onToggleMute}
              title="Volume"
            >
              <i
                className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
