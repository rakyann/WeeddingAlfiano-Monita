import React from 'react';

interface TornPaperEdgeProps {
  position: 'top' | 'bottom';
  fillColor?: string; // Color of the paper body (e.g. #F7F3EA for cream, #17335C for navy)
  className?: string;
}

export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  position,
  fillColor = '#F7F3EA',
  className = '',
}) => {
  const isTop = position === 'top';

  return (
    <div
      className={`w-full overflow-hidden leading-none z-10 pointer-events-none ${
        isTop ? '-mb-1' : '-mt-1 rotate-180'
      } ${className}`}
    >
      <svg
        className="relative block w-full h-6 md:h-10"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 350,-40 500,65 C650,140 900,-20 1200,45 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
