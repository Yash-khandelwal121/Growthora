import React from 'react';

/**
 * GrowthProgressChart renders the six ascending vertical bars and
 * the smooth curving orange acceleration arrow underneath the central logo.
 * Proportioned to sit neatly below the logo with clean visual separation.
 */
const COLOR_PURPLE = '#803886';
const COLOR_ORANGE = '#F07126';

export const GrowthProgressChart = ({ activeStage, maxStages = 6 }) => {
  const bars = [
    { id: 1, x: 294, targetH: 10, color: COLOR_PURPLE, lightColor: '#9C4B9E' },
    { id: 2, x: 318, targetH: 18, color: COLOR_ORANGE, lightColor: '#F99454' },
    { id: 3, x: 342, targetH: 26, color: COLOR_PURPLE, lightColor: '#9C4B9E' },
    { id: 4, x: 366, targetH: 34, color: COLOR_ORANGE, lightColor: '#F99454' },
    { id: 5, x: 390, targetH: 42, color: COLOR_PURPLE, lightColor: '#9C4B9E' },
    { id: 6, x: 414, targetH: 50, color: COLOR_ORANGE, lightColor: '#F99454' },
  ];

  const baselineY = 370;
  const progressRatio = Math.min(Math.max(activeStage / maxStages, 0), 1);
  const arrowLength = 175;

  return (
    <g className="growth-progress-chart pointer-events-none select-none">
      <defs>
        <linearGradient id="barGradPurple" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9C4B9E" />
          <stop offset="100%" stopColor="#803886" />
        </linearGradient>
        <linearGradient id="barGradOrange" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F99454" />
          <stop offset="100%" stopColor="#F07126" />
        </linearGradient>
        <linearGradient id="barGradInactive" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ECE8E9" />
          <stop offset="100%" stopColor="#DDD8D9" />
        </linearGradient>
      </defs>

      {/* Six Ascending Vertical Bars along the same bottom baseline */}
      {bars.map((bar) => {
        const isBarActive = activeStage >= bar.id;
        const currentHeight = isBarActive ? bar.targetH : 4;
        const currentY = baselineY - currentHeight;
        const barFill = isBarActive
          ? bar.color === COLOR_PURPLE
            ? 'url(#barGradPurple)'
            : 'url(#barGradOrange)'
          : 'url(#barGradInactive)';

        return (
          <rect
            key={bar.id}
            x={bar.x}
            y={currentY}
            width={12}
            height={currentHeight}
            rx={3}
            fill={barFill}
            opacity={isBarActive ? 0.95 : 0.45}
            className="transition-all duration-400 ease-out"
            style={{
              filter: isBarActive ? 'drop-shadow(0 2px 4px rgba(128, 56, 134, 0.15))' : 'none',
            }}
          />
        );
      })}

      {/* Upward-Curving Growth Arrow Path (Floats gracefully above bars, below logo) */}
      <path
        d="M 278 362 C 320 350, 375 328, 432 298"
        fill="none"
        stroke={COLOR_ORANGE}
        strokeWidth={3}
        strokeLinecap="round"
        style={{
          strokeDasharray: arrowLength,
          strokeDashoffset: arrowLength * (1 - progressRatio),
          transition: 'stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Arrowhead Triangle at the Tip (Reveals smoothly as progress nears 100%) */}
      <polygon
        points="434,297 421,299 427,309"
        fill={COLOR_ORANGE}
        style={{
          opacity: activeStage >= 5 ? 1 : 0,
          transform: `scale(${activeStage >= 5 ? 1 : 0.6})`,
          transformOrigin: '434px 297px',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      />
    </g>
  );
};

