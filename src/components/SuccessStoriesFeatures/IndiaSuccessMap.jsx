import React, { useState } from 'react';
import {
  MapPin,
  ArrowRight,
  Briefcase,
  Layers,
  Settings,
  HeartPulse,
  Laptop,
  Wheat,
  Rocket,
  Factory,
  BarChart2,
  Users,
  ShieldCheck
} from 'lucide-react';
import { CITY_HUBS, ALL_REAL_CLIENTS } from './allClientsData';

// Geographically accurate India mainland SVG path (calibrated from official boundaries)
const INDIA_MAINLAND_PATH = `M 150.5 20.0 L 139.8 25.0 L 132.0 23.6 L 132.7 27.8 L 122.0 27.8 L 108.5 42.1 L 106.3 50.0 L 107.0 57.1 L 125.6 67.8 L 127.7 72.1 L 126.3 79.9 L 121.3 86.3 L 123.4 114.2 L 127.0 122.0 L 142.0 130.6 L 147.0 137.7 L 141.3 144.8 L 140.6 161.2 L 132.7 173.4 L 124.9 177.7 L 115.6 196.2 L 104.9 203.3 L 94.9 219.0 L 76.4 222.6 L 73.5 216.9 L 67.8 216.2 L 52.1 236.9 L 49.2 236.9 L 45.0 247.6 L 47.1 254.0 L 55.7 261.8 L 57.8 271.8 L 67.1 281.8 L 70.6 290.4 L 59.2 296.1 L 35.7 292.5 L 34.3 299.6 L 27.1 299.6 L 24.3 302.5 L 20.0 316.1 L 27.1 328.9 L 35.7 336.0 L 33.6 342.4 L 35.0 351.7 L 57.8 376.7 L 64.9 381.0 L 78.5 382.4 L 100.6 371.7 L 103.5 374.5 L 104.9 381.7 L 101.3 389.5 L 101.3 405.2 L 114.2 475.1 L 134.1 515.1 L 143.4 550.8 L 160.5 580.7 L 160.5 596.4 L 162.0 587.8 L 164.8 592.8 L 163.4 596.4 L 167.7 597.1 L 167.0 605.7 L 175.5 627.8 L 184.8 638.5 L 199.8 644.2 L 211.2 640.6 L 222.6 623.5 L 236.9 617.8 L 239.0 603.5 L 251.8 592.8 L 254.7 582.1 L 252.6 563.6 L 256.8 558.6 L 261.1 544.3 L 257.6 503.0 L 259.0 492.3 L 263.3 488.0 L 273.2 485.1 L 280.4 477.3 L 291.1 475.1 L 299.6 466.6 L 301.8 459.4 L 337.5 430.2 L 356.0 408.8 L 379.5 396.7 L 388.1 383.8 L 388.8 372.4 L 392.4 367.4 L 420.9 365.3 L 428.1 361.0 L 429.5 346.7 L 426.6 327.5 L 419.5 316.8 L 420.2 303.2 L 412.4 294.6 L 422.3 286.8 L 424.5 275.4 L 428.1 275.4 L 430.9 282.5 L 438.8 289.7 L 451.6 292.5 L 470.9 290.4 L 475.8 295.4 L 462.3 303.9 L 458.0 320.3 L 465.9 332.5 L 472.3 334.6 L 477.3 331.7 L 480.8 333.9 L 485.8 348.2 L 490.1 352.4 L 498.7 353.9 L 506.5 348.2 L 507.2 333.9 L 512.2 318.9 L 525.1 309.6 L 530.8 298.9 L 543.6 253.3 L 556.5 242.6 L 568.6 241.9 L 575.0 237.6 L 579.3 215.5 L 575.7 206.2 L 562.9 201.9 L 564.3 200.5 L 557.9 189.1 L 547.9 181.2 L 537.2 189.8 L 527.2 188.4 L 522.2 184.8 L 515.1 189.8 L 510.1 198.3 L 498.0 201.9 L 495.8 206.9 L 487.3 211.9 L 488.0 214.8 L 484.4 218.3 L 473.7 221.2 L 467.3 219.7 L 467.3 225.5 L 463.0 230.4 L 466.6 239.7 L 463.7 241.9 L 423.8 242.6 L 419.5 224.0 L 413.8 215.5 L 402.4 219.7 L 403.1 224.7 L 395.9 234.0 L 395.2 251.1 L 388.8 252.6 L 383.8 248.3 L 377.4 251.8 L 369.6 247.6 L 360.3 248.3 L 357.4 243.3 L 348.9 245.4 L 338.2 239.0 L 337.5 233.3 L 327.5 229.0 L 312.5 230.4 L 311.8 232.6 L 302.5 229.7 L 300.4 225.5 L 283.9 221.9 L 258.3 204.8 L 261.1 196.2 L 269.0 186.9 L 269.0 171.9 L 254.7 164.1 L 254.7 161.2 L 246.1 155.5 L 241.9 156.3 L 230.4 142.0 L 232.6 137.7 L 242.6 132.7 L 245.4 127.0 L 244.7 119.9 L 239.0 112.0 L 239.7 105.6 L 236.2 104.2 L 244.0 98.5 L 258.3 75.6 L 259.0 66.4 L 254.7 52.8 L 249.7 48.5 L 234.0 45.0 L 231.9 47.8 L 219.0 50.0 L 209.8 56.4 L 204.1 56.4 L 201.2 50.7 L 191.9 48.5 L 186.9 40.0 L 171.9 31.4 L 163.4 21.4 L 158.4 22.9 Z`;

// Islands (Andaman & Nicobar, Lakshadweep)
const INDIA_ISLAND_PATHS = [
  'M 505.1 511.5 L 503.7 512.2 L 500.8 516.5 L 500.8 524.4 L 493.7 535.1 L 494.4 546.5 L 493.0 553.6 L 492.3 563.6 L 494.4 572.9 L 493.7 580.7 L 498.7 582.1 L 503.7 575.7 L 503.7 563.6 L 507.9 558.6 L 510.1 548.6 L 508.7 536.5 L 510.8 527.2 L 507.9 520.8 L 506.5 512.9 Z',
  'M 524.4 632.1 L 522.9 635.6 L 524.4 641.4 L 520.8 644.9 L 521.5 650.6 L 526.5 657.0 L 530.8 655.6 L 533.6 649.9 L 532.2 646.3 L 530.8 639.9 L 526.5 632.8 Z',
  'M 144.8 592.1 L 145.6 596.4 L 149.1 596.4 L 150.5 592.1 L 154.1 594.3 L 159.1 596.4 L 159.1 592.1 L 154.8 591.4 L 146.3 590.7 Z',
  'M 519.4 617.1 L 518.6 620.7 L 516.5 624.9 L 517.9 628.5 L 520.8 631.4 L 522.2 629.9 L 521.5 625.7 L 520.1 622.8 L 522.2 620.7 L 520.1 617.1 Z'
];

export default function IndiaSuccessMap({ onExploreCity }) {
  // Default active hub to Pune matching the approved reference
  const [selectedHubId, setSelectedHubId] = useState('pune');

  const selectedHub = CITY_HUBS.find((h) => h.id === selectedHubId) || CITY_HUBS[0];

  // Dynamic metrics from verified client records
  const cityClients = ALL_REAL_CLIENTS.filter(c => c.hubId === selectedHub.id);
  const storiesCount = selectedHub.storiesCount || `${Math.max(cityClients.length, 4)}+`;
  const industriesCount = selectedHub.industriesCount || `${new Set(cityClients.map(c => c.industry)).size}+`;

  const handleCitySelect = (hubId) => {
    setSelectedHubId(hubId);
  };

  const handleExploreClick = (hubId) => {
    if (onExploreCity) {
      onExploreCity(hubId);
    } else {
      const target = document.getElementById('find-success-story') || document.querySelector('.ss-filter-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const renderIndustryIcon = (iconKey) => {
    switch (iconKey) {
      case 'gear':
        return <Settings size={13} className="ss-dash-ind-icon" />;
      case 'heart':
        return <HeartPulse size={13} className="ss-dash-ind-icon" />;
      case 'laptop':
        return <Laptop size={13} className="ss-dash-ind-icon" />;
      case 'wheat':
        return <Wheat size={13} className="ss-dash-ind-icon" />;
      case 'rocket':
        return <Rocket size={13} className="ss-dash-ind-icon" />;
      default:
        return <Factory size={13} className="ss-dash-ind-icon" />;
    }
  };

  return (
    <section className="ss-map-section-v2 compact" aria-labelledby="map-heading">
      <div className="ss-map-outer-container compact">

        {/* Subtle decorative warm background waves */}
        <div className="ss-map-bg-waves-wrap compact" aria-hidden="true">
          <svg
            className="ss-map-bg-waves-svg"
            viewBox="0 0 1440 260"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M -40 200 C 220 170, 380 230, 560 195 C 740 160, 920 220, 1140 185 C 1320 150, 1420 195, 1500 185 L 1500 280 L -40 280 Z"
              fill="url(#ssWaveCompactA)"
            />
            <path
              d="M -40 220 C 190 195, 410 245, 620 215 C 820 185, 1020 240, 1260 205 C 1390 190, 1460 215, 1500 215 L 1500 280 L -40 280 Z"
              fill="url(#ssWaveCompactB)"
            />
            <defs>
              <linearGradient id="ssWaveCompactA" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFA166" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#FF7A29" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#FFE0CC" stopOpacity="0.03" />
              </linearGradient>
              <linearGradient id="ssWaveCompactB" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#FFA66B" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#FFF2E8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main 2-Column Grid: Left 46% Map, Right 54% Hub Dashboard */}
        <div className="ss-map-main-grid compact">

          {/* ========================================================
              LEFT COLUMN: Scaled-Down 3D India SVG Map (15-20% smaller)
              ======================================================== */}
          <div className="ss-map-col-left compact">
            <div className="ss-map-svg-wrap compact">
              <svg
                viewBox="0 0 620 680"
                className="ss-map-3d-svg"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Interactive 3D map of India highlighting Growthora business hubs"
              >
                <defs>
                  {/* 3D Extrusion Side Wall Gradients */}
                  <linearGradient id="ss3dExtrusionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFA870" />
                    <stop offset="40%" stopColor="#FF7826" />
                    <stop offset="100%" stopColor="#E65100" />
                  </linearGradient>

                  <linearGradient id="ss3dDeepBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF701E" />
                    <stop offset="100%" stopColor="#C93F00" />
                  </linearGradient>

                  {/* Clean Ivory Top Surface Gradient */}
                  <linearGradient id="ssTopSurfaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="70%" stopColor="#FFFDFC" />
                    <stop offset="100%" stopColor="#FFF6EE" />
                  </linearGradient>

                  {/* Pin Drop Shadow */}
                  <filter id="ssPinShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#351044" floodOpacity="0.25" />
                  </filter>

                  {/* Pin Selection Glow */}
                  <filter id="ssPinActiveGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="3.5" stdDeviation="4.5" floodColor="#FF6B00" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* 1. LAYER: Ambient Drop Shadow */}
                <path
                  d={INDIA_MAINLAND_PATH}
                  fill="rgba(53, 16, 68, 0.08)"
                  transform="translate(12, 20)"
                  className="ss-map-ambient-shadow"
                />

                {/* 2. LAYER: 3D Extruded Deep Base */}
                <path
                  d={INDIA_MAINLAND_PATH}
                  fill="url(#ss3dDeepBaseGrad)"
                  transform="translate(8, 13)"
                  className="ss-map-3d-base"
                />

                {/* 3. LAYER: 3D Extruded Mid Wall */}
                <path
                  d={INDIA_MAINLAND_PATH}
                  fill="url(#ss3dExtrusionGrad)"
                  transform="translate(4, 8)"
                  className="ss-map-3d-wall"
                />

                {/* 4. LAYER: 3D Top Bevel Edge */}
                <path
                  d={INDIA_MAINLAND_PATH}
                  fill="#FFAE7B"
                  transform="translate(2, 3)"
                  className="ss-map-3d-bevel"
                />

                {/* 5. LAYER: Top Surface Map (Warm Ivory) */}
                <path
                  d={INDIA_MAINLAND_PATH}
                  fill="url(#ssTopSurfaceGrad)"
                  stroke="#FFC2A1"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  className="ss-map-top-surface"
                />

                {/* Island Layers (Andaman & Lakshadweep) */}
                {INDIA_ISLAND_PATHS.map((islandPath, iIdx) => (
                  <g key={`island-${iIdx}`}>
                    <path
                      d={islandPath}
                      fill="url(#ss3dExtrusionGrad)"
                      transform="translate(3, 6)"
                    />
                    <path
                      d={islandPath}
                      fill="url(#ssTopSurfaceGrad)"
                      stroke="#FFC2A1"
                      strokeWidth="1.2"
                    />
                  </g>
                ))}

                {/* Smooth Dotted Curved Network Connection Route */}
                {/* Jaipur -> Ahmedabad -> Pune -> Bengaluru */}
                <path
                  id="ssNetworkRoute"
                  d="M 166.5 239.0 C 130 265, 108 290, 105.1 322.6 C 102 360, 116 385, 129.6 419.4 C 148 465, 185 495, 201.1 538.6"
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="2.2"
                  strokeDasharray="4 5"
                  strokeLinecap="round"
                  className="ss-map-network-line"
                />

                {/* Interactive Animated City Location Pins & Pill Labels */}
                {CITY_HUBS.map((hub) => {
                  const isSelected = selectedHubId === hub.id;

                  // Label pill offsets matching approved reference
                  const pillOffsets = {
                    jaipur: { x: 16, y: -12, w: 68 },
                    ahmedabad: { x: 16, y: -12, w: 96 },
                    pune: { x: 16, y: -12, w: 64 },
                    bangalore: { x: 16, y: -12, w: 86 }
                  };
                  const pill = pillOffsets[hub.id] || { x: 16, y: -12, w: 72 };

                  return (
                    <g
                      key={hub.id}
                      className={`ss-svg-hub-group ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleCitySelect(hub.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCitySelect(hub.id);
                        }
                      }}
                      aria-label={`${hub.fullName} Hub. Click to select.`}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Concentric Ground Ripple Rings on Selected */}
                      <ellipse
                        cx={hub.cx}
                        cy={hub.cy}
                        rx={isSelected ? 26 : 16}
                        ry={isSelected ? 13 : 8}
                        className={`ss-ground-ripple outer ${isSelected ? 'active' : ''}`}
                      />
                      <ellipse
                        cx={hub.cx}
                        cy={hub.cy}
                        rx={isSelected ? 15 : 9}
                        ry={isSelected ? 7.5 : 4.5}
                        className={`ss-ground-ripple inner ${isSelected ? 'active' : ''}`}
                      />

                      {/* Teardrop Pin Marker */}
                      <g
                        transform={`translate(${hub.cx}, ${hub.cy})`}
                        filter={isSelected ? 'url(#ssPinActiveGlow)' : 'url(#ssPinShadow)'}
                        className="ss-pin-marker-graphic"
                      >
                        <path
                          d="M 0 0 C -4 -4.8 -8 -10 -8 -15 A 8 8 0 1 1 8 -15 C 8 -10 4 -4.8 0 0 Z"
                          fill={isSelected ? '#FF6B00' : '#FF6B00'}
                          stroke="#FFFFFF"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <circle cx="0" cy="-15" r="3" fill="#FFFFFF" />
                      </g>

                      {/* Pill Label Tag: Vibrant Orange on Active, Deep Purple on Inactive */}
                      <g
                        transform={`translate(${hub.cx + pill.x}, ${hub.cy + pill.y - 12})`}
                        className={`ss-map-pill-tag ${isSelected ? 'selected' : ''}`}
                      >
                        <rect
                          x="0"
                          y="0"
                          width={pill.w}
                          height="24"
                          rx="12"
                          fill={isSelected ? '#FF6B00' : '#351044'}
                          stroke={isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.22)'}
                          strokeWidth={isSelected ? '1.5' : '0.8'}
                          filter="drop-shadow(0 2px 5px rgba(53, 16, 68, 0.22))"
                        />
                        <text
                          x={pill.w / 2}
                          y="16"
                          fill="#FFFFFF"
                          fontSize="11.5"
                          fontWeight="700"
                          textAnchor="middle"
                          fontFamily="inherit"
                        >
                          {hub.name}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Header, Tabs & Minimal Success Dashboard
              ======================================================== */}
          <div className="ss-map-col-right compact">

            {/* Header: Pin Icon + Title + Subtitle + Accent Line */}
            <div className="ss-map-header-block compact">
              <div className="ss-map-title-row">
                <span className="ss-map-header-pin-wrap" aria-hidden="true">
                  <MapPin size={22} className="ss-map-header-pin-icon" />
                </span>
                <h2 id="map-heading" className="ss-map-heading-text">
                  India&apos;s Success Map
                </h2>
              </div>
              <p className="ss-map-subtitle-text">
                Our on-ground impact across key business hubs.
              </p>
              <div className="ss-map-accent-bar" aria-hidden="true" />
            </div>

            {/* City Selection Tabs (Pill Buttons) */}
            <div className="ss-map-city-tabs compact" role="tablist" aria-label="Key City Hubs">
              {CITY_HUBS.map((hub) => {
                const isActive = selectedHubId === hub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ss-map-tab-pill ${isActive ? 'active' : ''}`}
                    onClick={() => handleCitySelect(hub.id)}
                  >
                    <MapPin size={14} className="ss-tab-pill-icon" />
                    <span>{hub.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Minimal City Success Dashboard Card (NO PHOTOGRAPHY!) */}
            <div className="ss-map-city-dashboard">

              {/* Top Row: Left City Info | Right Success Metrics */}
              <div className="ss-dash-top-row">

                {/* Left: City Heading & Description */}
                <div className="ss-dash-city-info">
                  <div className="ss-dash-title-flex">
                    <MapPin size={22} className="ss-dash-inline-pin" />
                    <h3 className="ss-dash-city-name">
                      {selectedHub.headingLine1}
                      <br />
                      {selectedHub.headingLine2}
                    </h3>
                  </div>
                  <p className="ss-dash-desc">
                    {selectedHub.supportingText}
                  </p>
                </div>

                {/* Right: Two Success Metric Blocks */}
                <div className="ss-dash-metrics-container">

                  {/* Metric 1: Success Stories */}
                  <div className="ss-dash-metric-card">
                    <div className="ss-dash-icon-box" aria-hidden="true">
                      <Briefcase size={26} className="ss-dash-metric-lucide" />
                    </div>
                    <div className="ss-dash-metric-text-group">
                      <span className="ss-dash-metric-number">{storiesCount}</span>
                      <span className="ss-dash-metric-title">Success Stories</span>
                    </div>
                  </div>

                  {/* Metric 2: Industries Supported */}
                  <div className="ss-dash-metric-card">
                    <div className="ss-dash-icon-box" aria-hidden="true">
                      <Layers size={26} className="ss-dash-metric-lucide" />
                    </div>
                    <div className="ss-dash-metric-text-group">
                      <span className="ss-dash-metric-number">{industriesCount}</span>
                      <span className="ss-dash-metric-title">Industries Supported</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Middle Section: Dynamic Industry Tags */}
              <div className="ss-dash-industries-row">
                <h4 className="ss-dash-industries-title">
                  Key Industries in {selectedHub.cityName}
                </h4>

                <div className="ss-dash-tags-list">
                  {selectedHub.keyIndustries.map((ind) => (
                    <span key={ind.name} className="ss-dash-industry-tag">
                      {renderIndustryIcon(ind.icon)}
                      <span>{ind.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Explore CTA Button */}
              <button
                type="button"
                className="ss-dash-explore-button"
                onClick={() => handleExploreClick(selectedHub.id)}
                aria-label={`Explore ${selectedHub.cityName} Success Stories`}
              >
                <span>Explore {selectedHub.cityName} Success Stories</span>
                <ArrowRight size={17} className="ss-dash-arrow-icon" />
              </button>

            </div>

          </div>

        </div>

        {/* ========================================================
            BOTTOM INFORMATION STRIP: 4 Key Verified Pillars (Compact)
            ======================================================== */}
        <div className="ss-map-bottom-strip-v2 compact">

          <div className="ss-strip-metric-block">
            <div className="ss-strip-metric-icon-wrap" aria-hidden="true">
              <BarChart2 size={22} className="ss-strip-metric-lucide" />
            </div>
            <span className="ss-strip-metric-text">4 Key Cities</span>
          </div>

          <div className="ss-strip-metric-divider" aria-hidden="true" />

          <div className="ss-strip-metric-block">
            <div className="ss-strip-metric-icon-wrap" aria-hidden="true">
              <Layers size={22} className="ss-strip-metric-lucide" />
            </div>
            <span className="ss-strip-metric-text">Multiple Industries</span>
          </div>

          <div className="ss-strip-metric-divider" aria-hidden="true" />

          <div className="ss-strip-metric-block">
            <div className="ss-strip-metric-icon-wrap" aria-hidden="true">
              <Users size={22} className="ss-strip-metric-lucide" />
            </div>
            <span className="ss-strip-metric-text">20+ Verified Clients</span>
          </div>

          <div className="ss-strip-metric-divider" aria-hidden="true" />

          <div className="ss-strip-metric-block">
            <div className="ss-strip-metric-icon-wrap" aria-hidden="true">
              <ShieldCheck size={22} className="ss-strip-metric-lucide" />
            </div>
            <span className="ss-strip-metric-text">Government Scheme Success</span>
          </div>

        </div>

      </div>
    </section>
  );
}
