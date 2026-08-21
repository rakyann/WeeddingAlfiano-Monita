import React from 'react';

interface BaroqueOvalFrameProps {
  imageSrc: string;
  altText: string;
  className?: string;
}

export const BaroqueOvalFrame: React.FC<BaroqueOvalFrameProps> = ({
  imageSrc,
  altText,
  className = '',
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Outer Ornate Golden Pearl Oval Ring */}
      <div className="relative w-64 h-84 rounded-[50%/46%] p-4 bg-gradient-to-b from-[#E5C378] via-[#C5A059] to-[#7E5E2A] shadow-2xl flex items-center justify-center">
        {/* Inner Beaded Pearl Ring */}
        <div className="w-full h-full rounded-[50%/46%] p-1.5 border-2 border-dashed border-[#FAF5EF]/70 flex items-center justify-center bg-[#251712]">
          {/* Portrait Container */}
          <div className="w-full h-full rounded-[50%/46%] overflow-hidden relative shadow-inner">
            <img
              src={imageSrc}
              alt={altText}
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Sepia Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#251712]/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Top Pearl Brooch Ornament */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-radial from-white via-[#FAF5EF] to-[#C5A059] border-2 border-[#C5A059] shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#C5A059]" />
        </div>
      </div>
    </div>
  );
};

export const BotanicalSprig: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`w-16 h-20 text-[#A67C43] opacity-70 pointer-events-none ${className}`}
      viewBox="0 0 100 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M 20,110 Q 50,70 80,10" />
      <path d="M 45,75 Q 30,60 25,65 Q 35,75 45,75" fill="#C5A059" fillOpacity="0.3" />
      <path d="M 60,50 Q 75,40 70,45 Q 60,55 60,50" fill="#C5A059" fillOpacity="0.3" />
      <circle cx="80" cy="10" r="4" fill="#C5A059" />
      <circle cx="70" cy="20" r="3" fill="#C5A059" />
      <circle cx="85" cy="25" r="3" fill="#C5A059" />
    </svg>
  );
};

export const SilverTrayFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative p-4 rounded-3xl bg-gradient-to-b from-[#E0E0E0] via-[#A8A8A8] to-[#6E6E6E] shadow-2xl border-2 border-[#C5A059]/60">
      {/* Decorative Pearl Strand Graphic */}
      <div className="absolute -top-3 left-6 right-6 flex justify-between z-10">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-radial from-white via-[#EFEFEF] to-[#AAAAAA] border border-[#888] shadow-sm" />
        ))}
      </div>
      {children}
    </div>
  );
};
