import React from 'react';

/**
 * AdvisoryWheel renders the 9-segment circular service navigation wheel.
 * Features:
 * - Fixed, normal, compact sizing constrained to 440px max-width.
 * - 9 equal 40-degree segments with clean divider gaps.
 * - Deep purple gradient with orange accent rim and glow for the active segment.
 * - Crisp white petals with soft peach borders for inactive segments.
 * - Centered authentic Growthora logo inside circular hub.
 * - Pure SVG typography so text never truncates or misaligns.
 * - Stationary wheel (only styling and right panel update on selection).
 */
export const AdvisoryWheel = ({
  services,
  activeServiceId,
  onSelectService,
}) => {
  const cx = 270;
  const cy = 270;
  const rHub = 104;
  const rInactive = 236;
  const rActive = 254;

  const toCoords = (alphaDeg, radius) => {
    const rad = (alphaDeg * Math.PI) / 180;
    return {
      x: +(cx + radius * Math.sin(rad)).toFixed(2),
      y: +(cy - radius * Math.cos(rad)).toFixed(2),
    };
  };

  return (
    <div className="advisory-wheel-wrap select-none">
      <svg
        viewBox="0 0 540 540"
        className="advisory-wheel-svg drop-shadow-md"
        role="region"
        aria-label="Growthora 9 Advisory Practices Wheel"
        style={{ outline: 'none' }}
      >
        <defs>
          {/* Active Petal Purple Gradient */}
          <linearGradient id="wheelActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#680062" />
            <stop offset="60%" stopColor="#4B0B63" />
            <stop offset="100%" stopColor="#350647" />
          </linearGradient>

          {/* Active Petal Elevation Drop Shadow */}
          <filter id="wheelActiveGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#4B0B63" floodOpacity="0.35" />
          </filter>

          {/* Center Hub Soft Radial Glow */}
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#FFFBF8" />
            <stop offset="100%" stopColor="#FDF4EC" />
          </radialGradient>

          {/* Subtle Inactive Petal Shadow */}
          <filter id="petalShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#151B35" floodOpacity="0.04" />
          </filter>
        </defs>

        {/* Outer Decorative Track Guide */}
        <circle
          cx={cx}
          cy={cy}
          r={rInactive + 2}
          fill="none"
          stroke="#F3E5D8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.6"
        />

        {/* 9 Service Petal Segments */}
        <g id="wheel-petals-layer">
          {services.map((srv, index) => {
            const isActive = srv.id === activeServiceId;
            const Icon = srv.icon;

            // Clockwise angle: 0 deg at top (Registration)
            const aMid = index * 40;
            const pad = 1.25; // Angular gap between petals
            const aStart = aMid - 20 + pad;
            const aEnd = aMid + 20 - pad;

            const R = isActive ? rActive : rInactive;
            const r = rHub;

            const p1 = toCoords(aStart, R);
            const p2 = toCoords(aEnd, R);
            const p3 = toCoords(aEnd, r);
            const p4 = toCoords(aStart, r);

            // Annular sector path
            const pathD = `M ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${r} ${r} 0 0 0 ${p4.x} ${p4.y} Z`;

            // Center of petal for icon and typography placement
            const rMid = isActive ? 176 : 170;
            const center = toCoords(aMid, rMid);
            const hasTwoLines = srv.lines && srv.lines.length > 1;

            return (
              <g
                key={srv.id}
                className={`advisory-wheel-segment ${isActive ? 'active' : ''}`}
                onClick={() => onSelectService(srv.id)}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`Select practice ${srv.code} - ${srv.name}`}
                style={{
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  cursor: 'pointer',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectService(srv.id);
                  }
                }}
              >
                {/* Petal Arc Body */}
                <path
                  d={pathD}
                  fill={isActive ? 'url(#wheelActiveGradient)' : '#FFFFFF'}
                  stroke={isActive ? '#680062' : '#F6DFCE'}
                  strokeWidth={isActive ? '2' : '1.2'}
                  strokeLinejoin="round"
                  filter={isActive ? 'url(#wheelActiveGlow)' : 'url(#petalShadow)'}
                  style={{
                    transition: 'fill 0.25s ease, stroke 0.25s ease, filter 0.25s ease',
                  }}
                />

                {/* Orange Outer Rim Highlight on Active Petal */}
                {isActive && (
                  <path
                    d={`M ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke="#FF5A00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}

                {/* Lucide Icon in upright container */}
                <foreignObject
                  x={center.x - 14}
                  y={center.y - 31}
                  width="28"
                  height="28"
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon
                      size={19}
                      strokeWidth={2.4}
                      color={isActive ? '#FFFFFF' : '#FF5A00'}
                    />
                  </div>
                </foreignObject>

                {/* Step Number (Upright SVG text, strictly on own line) */}
                <text
                  x={center.x}
                  y={center.y + 7}
                  textAnchor="middle"
                  fill={isActive ? '#FFFFFF' : '#4B0B63'}
                  fontSize="11"
                  fontWeight="800"
                  fontFamily="var(--font-heading, 'Plus Jakarta Sans', sans-serif)"
                  letterSpacing="0.04em"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {srv.code}
                </text>

                {/* Service Name (Upright SVG text with proper multi-line spacing) */}
                {hasTwoLines ? (
                  <text
                    x={center.x}
                    y={center.y + 19}
                    textAnchor="middle"
                    fill={isActive ? '#FFFFFF' : '#151B35'}
                    fontSize="10.5"
                    fontWeight="700"
                    fontFamily="var(--font-heading, 'Plus Jakarta Sans', sans-serif)"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    <tspan x={center.x} dy="0">
                      {srv.lines[0]}
                    </tspan>
                    <tspan x={center.x} dy="12.5">
                      {srv.lines[1]}
                    </tspan>
                  </text>
                ) : (
                  <text
                    x={center.x}
                    y={center.y + 21}
                    textAnchor="middle"
                    fill={isActive ? '#FFFFFF' : '#151B35'}
                    fontSize="10.5"
                    fontWeight="700"
                    fontFamily="var(--font-heading, 'Plus Jakarta Sans', sans-serif)"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {srv.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Center Hub Dish with Authentic Company Logo */}
        <g id="wheel-center-hub" className="pointer-events-none select-none">
          {/* Inner Circle Base */}
          <circle
            cx={cx}
            cy={cy}
            r={rHub - 2}
            fill="url(#hubGlow)"
            stroke="#F2D8C2"
            strokeWidth="2"
          />

          {/* Delicate Inner Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={rHub - 8}
            fill="none"
            stroke="#F8EADB"
            strokeWidth="1.2"
          />

          {/* Authentic Growthora Logo Image */}
          <image
            href="/logofooter.png"
            x={cx - 68}
            y={cy - 28}
            width="136"
            height="56"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </div>
  );
};
