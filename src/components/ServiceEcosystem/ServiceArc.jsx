import React from 'react';
import { ServiceSegment } from './ServiceSegment';
import { GrowthProgressChart } from './GrowthProgressChart';

/**
 * ServiceArc renders the SVG semicircular gauge dashboard.
 * Includes the 6 annular segments, center Growthora logo,
 * ascending growth bars, and orange curved acceleration arrow.
 */
export const ServiceArc = ({
  segments,
  activeStage,
  hoveredStage,
  selectedStage,
  onSegmentClick,
  onSegmentHover,
  onSegmentLeave,
}) => {
  const cx = 360;
  const cy = 370;
  const R = 300;
  const r = 165;

  // Outer gauge track for the digital speedometer progress effect
  const outerTrackR = 308;
  const toRad = (d) => (d * Math.PI) / 180;

  // Progress bead angle (moves from 180 deg to 0 deg as activeStage goes from 0 to 6)
  const progressRatio = Math.min(Math.max(activeStage / 6, 0), 1);
  const beadAngle = 180 - progressRatio * 180;
  const beadX = cx + outerTrackR * Math.cos(toRad(beadAngle));
  const beadY = cy - outerTrackR * Math.sin(toRad(beadAngle));

  return (
    <div className="w-full relative flex flex-col items-center justify-center select-none">
      <svg
        viewBox="0 0 720 395"
        className="service-ecosystem-graph overflow-visible drop-shadow-sm"
        role="img"
        aria-label="Growthora Complete Business Advisory Ecosystem Semicircular Infographic"
      >
        <defs>
          {/* Subtle Outer Drop Shadows */}
          <filter id="ecosystem-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#101A37" floodOpacity="0.06" />
          </filter>

          {/* Speedometer Track Linear Gradient */}
          <linearGradient id="gaugeTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#65005F" />
            <stop offset="50%" stopColor="#FF5A00" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Central Hub Radial Glow */}
          <radialGradient id="centerHubGlow" cx="50%" cy="100%" r="90%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FFF9F3" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FAF1E6" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* 1. Header Title inside SVG */}
        <g className="infographic-title-group pointer-events-none">
          <text
            x={cx}
            y={32}
            textAnchor="middle"
            fontFamily="var(--font-heading, 'Plus Jakarta Sans', system-ui, sans-serif)"
            className="tracking-tight select-none"
          >
            <tspan fill="#101A37" fontWeight="800" fontSize="22">
              Complete Business{' '}
            </tspan>
            <tspan fill="#FF5A00" fontWeight="800" fontSize="22">
              Advisory Ecosystem
            </tspan>
          </text>
        </g>

        {/* 2. Outer Speedometer Perimeter Guide (Soft neutral arc) */}
        <path
          d={`M ${cx - outerTrackR} ${cy} A ${outerTrackR} ${outerTrackR} 0 0 1 ${cx + outerTrackR} ${cy}`}
          fill="none"
          stroke="#EAE4DF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />

        {/* Active Speedometer Perimeter Progress Line */}
        <path
          d={`M ${cx - outerTrackR} ${cy} A ${outerTrackR} ${outerTrackR} 0 0 1 ${cx + outerTrackR} ${cy}`}
          fill="none"
          stroke="url(#gaugeTrackGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDasharray: Math.PI * outerTrackR,
            strokeDashoffset: Math.PI * outerTrackR * (1 - progressRatio),
            transition: 'stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Speedometer Progress Indicator Bead */}
        {activeStage > 0 && (
          <g
            className="transition-transform duration-300 pointer-events-none"
            style={{
              transform: `translate(${beadX}px, ${beadY}px)`,
            }}
          >
            <circle r="7" fill="#FF5A00" stroke="#FFFFFF" strokeWidth="2" />
            <circle r="12" fill="#FF5A00" opacity="0.25" className="animate-ping" />
          </g>
        )}

        {/* 3. Central Hub Inner Dish Background */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`}
          fill="url(#centerHubGlow)"
          stroke="#F3E3D3"
          strokeWidth="1.5"
        />

        {/* 4. Six Annular Service Segments */}
        <g id="service-segments-layer">
          {segments.map((seg) => {
            const isSegActive = activeStage >= seg.id;
            const isSegHovered = hoveredStage === seg.id;
            const isSegSelected = selectedStage === seg.id;

            return (
              <ServiceSegment
                key={seg.id}
                segment={seg}
                isActive={isSegActive}
                isHovered={isSegHovered}
                isSelected={isSegSelected}
                cx={cx}
                cy={cy}
                R={R}
                r={r}
                onClick={onSegmentClick}
                onMouseEnter={onSegmentHover}
                onMouseLeave={onSegmentLeave}
              />
            );
          })}
        </g>

        {/* 5. Central Hub: Authentic Growthora Company Logo (Horizontally centered, moved upward) */}
        <g id="central-hub-logo" className="pointer-events-none select-none">
          <image
            href="/logofooter.png"
            x={cx - 68}
            y={220}
            width="136"
            height="56"
            preserveAspectRatio="xMidYMid meet"
            className="drop-shadow-sm"
          />
        </g>

        {/* 6. Bottom Growth Chart: 6 Ascending Bars & Curved Orange Arrow */}
        <GrowthProgressChart activeStage={activeStage} maxStages={6} />
      </svg>
    </div>
  );
};

