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
      {/* Outer Ornate Golden Pearl Ring */}
      <div className="relative w-64 h-80 rounded-[50%/45%] p-3.5 bg-gradient-to-b from-[#D4AF37] via-[#C5A059] to-[#8C6D37] shadow-2xl flex items-center justify-center">
        {/* Inner Beaded Border */}
        <div className="w-full h-full rounded-[50%/45%] p-1.5 border-2 border-dashed border-[#FFFDF9]/60 flex items-center justify-center bg-[#2D1E18]">
          {/* Image Container */}
          <div className="w-full h-full rounded-[50%/45%] overflow-hidden relative shadow-inner">
            <img
              src={imageSrc}
              alt={altText}
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Subtle Sepia Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1E18]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Top & Bottom Pearl Brooch Ornaments */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-radial from-white via-[#E6DCCD] to-[#A3937A] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
        </div>
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-radial from-white via-[#E6DCCD] to-[#A3937A] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
};

export const LaceEdgeDivider: React.FC<{ position?: 'top' | 'bottom'; color?: string }> = ({
  position = 'top',
  color = '#F5EFEB',
}) => {
  const isTop = position === 'top';

  return (
    <div className={`w-full overflow-hidden leading-none z-10 pointer-events-none ${isTop ? '-mb-1' : '-mt-1 rotate-180'}`}>
      <svg
        className="w-full h-8 md:h-12 block"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {/* Scalloped Vintage Lace Arc Path */}
        <path
          d="M0,0 Q30,60 60,0 Q90,60 120,0 Q150,60 180,0 Q210,60 240,0 Q270,60 300,0 Q330,60 360,0 Q390,60 420,0 Q450,60 480,0 Q510,60 540,0 Q570,60 600,0 Q630,60 660,0 Q690,60 720,0 Q750,60 780,0 Q810,60 840,0 Q870,60 900,0 Q930,60 960,0 Q990,60 1020,0 Q1050,60 1080,0 Q1110,60 1140,0 Q1170,60 1200,0 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
