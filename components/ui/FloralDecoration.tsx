import React from 'react';

interface FloralProps {
  className?: string;
  color?: string;
}

export const FloralCorner: React.FC<FloralProps> = ({
  className = '',
  color = '#D4AF37',
}) => {
  return (
    <svg
      className={`w-16 h-16 pointer-events-none opacity-80 ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Curved vine with leaves & flower blossom */}
      <path d="M 5,95 Q 5,20 80,5" />
      <path d="M 5,95 Q 20,5 95,5" />
      <path d="M 25,75 Q 15,60 30,50 Q 45,60 25,75" fill={color} fillOpacity="0.2" />
      <path d="M 60,30 Q 50,15 75,25 Q 70,40 60,30" fill={color} fillOpacity="0.2" />
      <circle cx="80" cy="5" r="4" fill={color} />
      <circle cx="95" cy="5" r="3" fill={color} />
    </svg>
  );
};

export const FloralDivider: React.FC<FloralProps> = ({
  className = '',
  color = '#D4AF37',
}) => {
  return (
    <div className={`flex items-center justify-center my-4 space-x-3 opacity-90 ${className}`}>
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      >
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill={color} fillOpacity="0.3" />
        <circle cx="12" cy="12" r="2" fill={color} />
      </svg>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
    </div>
  );
};

export const MonogramFrame: React.FC<{ initials: string; className?: string }> = ({
  initials,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center justify-center p-6 ${className}`}>
      {/* Outer Golden Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/60 animate-pulse-glow" />
      <div className="absolute inset-1 rounded-full border border-dashed border-[#D4AF37]/40" />
      
      {/* Initials Text */}
      <span className="font-script text-4xl md:text-5xl font-bold tracking-widest text-[#D4AF37] drop-shadow-md z-10">
        {initials}
      </span>
    </div>
  );
};
