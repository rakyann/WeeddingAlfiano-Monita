import React from 'react';

/* ================================================================
   ORNAMENT COMPONENT LIBRARY
   Pixel-precise replicas of every decorative element visible in the
   reference design image.
   ================================================================ */

/* ── 1. DRIED BOTANICAL SPRIG ────────────────────────────────────
   Visible in reference: bottom-right corner of the cream paper
   note card on the cover section, and inside the venue card.
   A single dried flower stem with leaves and seed pods.
   ─────────────────────────────────────────────────────────────── */
export const DriedBotanicalSprig: React.FC<{ className?: string; flip?: boolean }> = ({
  className = '',
  flip = false,
}) => {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      width="72"
      height="100"
      viewBox="0 0 72 100"
      fill="none"
    >
      {/* Main stem */}
      <path
        d="M 22 95 Q 32 65, 52 15"
        stroke="#A68B5B"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Branch 1 */}
      <path
        d="M 30 75 Q 18 62, 22 68"
        stroke="#A68B5B"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Leaf 1 - bottom */}
      <path
        d="M 28 78 C 18 68, 14 74, 26 82 Z"
        fill="#C5A059"
        fillOpacity="0.35"
        stroke="#A68B5B"
        strokeWidth="0.5"
      />
      {/* Leaf 2 - middle */}
      <path
        d="M 38 58 C 26 46, 22 52, 35 62 Z"
        fill="#C5A059"
        fillOpacity="0.3"
        stroke="#A68B5B"
        strokeWidth="0.5"
      />
      {/* Leaf 3 - upper */}
      <path
        d="M 46 38 C 56 28, 58 34, 48 42 Z"
        fill="#C5A059"
        fillOpacity="0.3"
        stroke="#A68B5B"
        strokeWidth="0.5"
      />
      {/* Seed pods / dried flower heads */}
      <circle cx="52" cy="14" r="3.5" fill="#C5A059" opacity="0.8" />
      <circle cx="56" cy="22" r="2.5" fill="#D4AF37" opacity="0.6" />
      <circle cx="46" cy="20" r="2" fill="#A68B5B" opacity="0.7" />
      {/* Tiny branch to side pod */}
      <path d="M 50 18 Q 54 20, 56 22" stroke="#A68B5B" strokeWidth="0.6" fill="none" />
    </svg>
  );
};

/* ── 2. GOLDEN OVAL SWATCH ───────────────────────────────────────
   Visible in reference: 5 dress-code color swatches in a row,
   each is an oval shape with a double gold ring border.
   ─────────────────────────────────────────────────────────────── */
export const GoldenOvalSwatch: React.FC<{ hex: string }> = ({ hex }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Outer gold gradient ring */}
      <div
        className="rounded-[50%/46%] flex items-center justify-center shadow-lg"
        style={{
          width: 44,
          height: 64,
          padding: 3,
          background: 'linear-gradient(180deg, #E5C378 0%, #C5A059 50%, #7E5E2A 100%)',
        }}
      >
        {/* Inner beaded ring */}
        <div
          className="w-full h-full rounded-[50%/46%] flex items-center justify-center"
          style={{
            padding: 2,
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Color fill */}
          <div
            className="w-full h-full rounded-[50%/46%]"
            style={{
              backgroundColor: hex,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.25)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ── 3. SILVER PEARL TRAY FRAME ──────────────────────────────────
   Visible in reference: top-right card "Место проведения" (Venue)
   is wrapped in an antique silver serving tray with a draped
   pearl necklace strand across the top edge.
   ─────────────────────────────────────────────────────────────── */
export const SilverPearlTrayFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      {/* Tray body: silver metallic gradient with embossed rim */}
      <div
        className="relative rounded-2xl overflow-visible"
        style={{
          padding: 14,
          background: 'linear-gradient(160deg, #E0DEDA 0%, #C8C4BE 20%, #9A9590 50%, #706B66 80%, #585350 100%)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.2)',
          border: '2px solid rgba(197,160,89,0.4)',
        }}
      >
        {/* Draped Pearl Necklace (catenary curve of pearl beads) */}
        <div className="absolute -top-2.5 left-3 right-3 flex justify-between z-20 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i % 3 === 0 ? 10 : 8,
                height: i % 3 === 0 ? 10 : 8,
                background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #F5F0E8 50%, #A8A098 100%)',
                border: '1px solid #999',
                boxShadow: '0 2px 3px rgba(0,0,0,0.35)',
                // Simulate catenary sag: middle pearls sit slightly lower
                marginTop: `${Math.abs(i - 7.5) < 3 ? 4 : Math.abs(i - 7.5) < 5 ? 2 : 0}px`,
              }}
            />
          ))}
        </div>

        {children}
      </div>
    </div>
  );
};

/* ── 4. ANTIQUE POCKET WATCH ─────────────────────────────────────
   Visible in reference: bottom-left of "Программа дня" section,
   a classic gold pocket watch with chain ring at top, Roman
   numeral dial face (XII, III, VI, IX), and clock hands.
   ─────────────────────────────────────────────────────────────── */
export const AntiquePocketWatch: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Chain ring connector at top */}
      <div
        className="rounded-full mb-[-3px]"
        style={{
          width: 16,
          height: 16,
          border: '2.5px solid #C5A059',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}
      />
      {/* Crown knob */}
      <div
        className="mb-[-2px]"
        style={{
          width: 6,
          height: 5,
          backgroundColor: '#C5A059',
          borderRadius: '2px 2px 0 0',
        }}
      />

      {/* Watch casing: gold gradient ring */}
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: 72,
          height: 72,
          padding: 4,
          background: 'linear-gradient(150deg, #E5C378 0%, #C5A059 40%, #7E5E2A 100%)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
        }}
      >
        {/* Dial face */}
        <div
          className="w-full h-full rounded-full flex items-center justify-center relative"
          style={{
            backgroundColor: '#FAF5EF',
            border: '1.5px solid #8C6D37',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          {/* Roman numerals */}
          <span className="absolute font-serif font-bold text-[#2C1D18]" style={{ top: 4, fontSize: 7 }}>XII</span>
          <span className="absolute font-serif font-bold text-[#2C1D18]" style={{ right: 4, fontSize: 7 }}>III</span>
          <span className="absolute font-serif font-bold text-[#2C1D18]" style={{ bottom: 4, fontSize: 7 }}>VI</span>
          <span className="absolute font-serif font-bold text-[#2C1D18]" style={{ left: 5, fontSize: 7 }}>IX</span>

          {/* Hour markers (small ticks at 1,2,4,5,7,8,10,11 positions) */}
          {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
            <div
              key={deg}
              className="absolute bg-[#2C1D18]"
              style={{
                width: 1,
                height: 3,
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${deg}deg) translate(-0.5px, -26px)`,
              }}
            />
          ))}

          {/* Minute hand */}
          <div
            className="absolute bg-[#2C1D18]"
            style={{
              width: 1.2,
              height: 22,
              bottom: '50%',
              left: '50%',
              marginLeft: -0.6,
              transformOrigin: 'bottom center',
              transform: 'rotate(-30deg)',
              borderRadius: 1,
            }}
          />
          {/* Hour hand */}
          <div
            className="absolute bg-[#2C1D18]"
            style={{
              width: 1.5,
              height: 16,
              bottom: '50%',
              left: '50%',
              marginLeft: -0.75,
              transformOrigin: 'bottom center',
              transform: 'rotate(60deg)',
              borderRadius: 1,
            }}
          />
          {/* Center pin */}
          <div
            className="absolute rounded-full"
            style={{
              width: 5,
              height: 5,
              backgroundColor: '#C5A059',
              boxShadow: '0 0 2px rgba(0,0,0,0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
