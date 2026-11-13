import React from 'react';

/**
 * ServiceSegment renders an annular slice representing one of the six advisory services.
 * Features smooth color-fill transitions, scale transforms, glow filters, and accessible SVG text.
 */
export const ServiceSegment = ({
  segment,
  isActive,
  isHovered,
  isSelected,
  cx,
  cy,
  R,
  r,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const Icon = segment.icon;
  const toRad = (deg) => (deg * Math.PI) / 180;

  // Angular padding for the segment divider gap
  const pad = 0.55;
  const startA = segment.a1 - pad;
  const endA = segment.a2 + pad;

  // Outer Arc points (clockwise from startA to endA)
  const x1 = (cx + R * Math.cos(toRad(startA))).toFixed(2);
  const y1 = (cy - R * Math.sin(toRad(startA))).toFixed(2);
  const x2 = (cx + R * Math.cos(toRad(endA))).toFixed(2);
  const y2 = (cy - R * Math.sin(toRad(endA))).toFixed(2);

  // Inner Arc points (counter-clockwise from endA back to startA)
  const x3 = (cx + r * Math.cos(toRad(endA))).toFixed(2);
  const y3 = (cy - r * Math.sin(toRad(endA))).toFixed(2);
  const x4 = (cx + r * Math.cos(toRad(startA))).toFixed(2);
  const y4 = (cy - r * Math.sin(toRad(startA))).toFixed(2);

  const pathD = `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 0 0 ${x4} ${y4} Z`;

  // Center coordinates for label & icon placement
  const midA = (segment.a1 + segment.a2) / 2;
  const labelRadius = (R + r) / 2;
  const mx = Math.round(cx + labelRadius * Math.cos(toRad(midA)));
  const my = Math.round(cy - labelRadius * Math.sin(toRad(midA)));

  // Determine active fill color
  const activeColor = segment.color;
  const inactiveColor = '#EAE7E8';
  const hoverColor = '#DFDCDE';

  const fillColor = isActive || isSelected ? activeColor : isHovered ? hoverColor : inactiveColor;
  const textColor = isActive || isSelected ? '#FFFFFF' : '#334155';
  const iconColor = isActive || isSelected ? '#FFFFFF' : '#475569';

  const hasTwoLines = segment.lines && segment.lines.length > 1;

  return (
    <g
      className={`service-segment-group cursor-pointer transition-transform duration-300 ${
        isSelected || isHovered ? 'segment-focused' : ''
      }`}
      onClick={() => onClick(segment.id)}
      onMouseEnter={() => onMouseEnter(segment.id)}
      onMouseLeave={() => onMouseLeave(segment.id)}
      role="button"
      tabIndex={0}
      aria-label={`${segment.name} service`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(segment.id);
        }
      }}
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        transform: isSelected || isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Background Arc Path */}
      <path
        d={pathD}
        fill={fillColor}
        stroke="#FFFFFF"
        strokeWidth={3}
        className="transition-all duration-400 ease-out"
        style={{
          filter:
            isActive || isSelected
              ? `drop-shadow(0 4px 12px ${activeColor}38)`
              : 'none',
        }}
      />

      {/* Lucide Icon rendered cleanly via foreignObject */}
      <foreignObject
        x={mx - 14}
        y={my - 26}
        width="28"
        height="28"
        className="pointer-events-none"
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
            size={20}
            strokeWidth={2.4}
            color={iconColor}
            className="transition-colors duration-300 drop-shadow-sm"
          />
        </div>
      </foreignObject>

      {/* Segment Text Label */}
      <text
        x={mx}
        y={my + (hasTwoLines ? 6 : 10)}
        textAnchor="middle"
        fill={textColor}
        fontSize="12.5"
        fontWeight="700"
        fontFamily="var(--font-heading, 'Plus Jakarta Sans', system-ui, sans-serif)"
        letterSpacing="-0.01em"
        className="pointer-events-none transition-colors duration-300 select-none"
      >
        {hasTwoLines ? (
          <>
            <tspan x={mx} dy="0">
              {segment.lines[0]}
            </tspan>
            <tspan x={mx} dy="13.5">
              {segment.lines[1]}
            </tspan>
          </>
        ) : (
          <tspan x={mx} dy="0">
            {segment.name}
          </tspan>
        )}
      </text>
    </g>
  );
};

