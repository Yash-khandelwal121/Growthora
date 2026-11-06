import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FileText,
  Coins,
  ShieldCheck,
  TrendingUp,
  Rocket,
  Settings,
} from 'lucide-react';

// 5 Working Stages for the Growth Graph
const GRAPH_STAGES = [
  {
    id: 1,
    label: 'Registration',
    percentage: 20,
    targetHeight: 38, // SVG units
    colorType: 'orange',
    icon: FileText,
    journeyStep: 1,
    nodeX: 80,
    nodeY: 192,
  },
  {
    id: 2,
    label: 'Funding',
    percentage: 40,
    targetHeight: 74,
    colorType: 'purple',
    icon: Coins,
    journeyStep: 2,
    nodeX: 160,
    nodeY: 156,
  },
  {
    id: 3,
    label: 'Compliance',
    percentage: 60,
    targetHeight: 110,
    colorType: 'orange',
    icon: ShieldCheck,
    journeyStep: 2,
    nodeX: 240,
    nodeY: 120,
  },
  {
    id: 4,
    label: 'Growth',
    percentage: 80,
    targetHeight: 146,
    colorType: 'purple',
    icon: TrendingUp,
    journeyStep: 3,
    nodeX: 320,
    nodeY: 84,
  },
  {
    id: 5,
    label: 'Expansion',
    percentage: 100,
    targetHeight: 182,
    colorType: 'orange',
    icon: Rocket,
    journeyStep: 4,
    nodeX: 400,
    nodeY: 48,
  },
];

// Bottom 4-Step Journey Pills
const JOURNEY_STEPS = [
  { id: 1, num: '01', label: 'START', targetStage: 1 },
  { id: 2, num: '02', label: 'COMPLY', targetStage: 3 },
  { id: 3, num: '03', label: 'GROW', targetStage: 4 },
  { id: 4, num: '04', label: 'SCALE', targetStage: 5 },
];

// 4 Floating Service Cards outside the panel (clean, no orbits)
const FLOATING_CARDS = [
  {
    id: 'funding',
    title: 'Funding Advisory',
    icon: Coins,
    positionClass: 's2-float-top-left',
    lines: ['Funding', 'Advisory'],
  },
  {
    id: 'compliance',
    title: 'Registrations & Compliance',
    icon: FileText,
    positionClass: 's2-float-bottom-left',
    lines: ['Registrations', '& Compliance'],
  },
  {
    id: 'schemes',
    title: 'Government Schemes',
    icon: Settings,
    positionClass: 's2-float-top-right',
    lines: ['Government', 'Schemes'],
  },
  {
    id: 'growth',
    title: 'Business Growth',
    icon: TrendingUp,
    positionClass: 's2-float-bottom-right',
    lines: ['Business', 'Growth'],
  },
];

export function BusinessGrowthInfographic() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.25 });

  // Current animation stage: 0 = start/reset, 1..5 = stages
  const [currentStage, setCurrentStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Automatic sequential animation loop with pause on hover
  useEffect(() => {
    if (!isInView || isHovered) return;

    let timer = null;

    if (currentStage === 0) {
      // Short initial pause before starting stage 1
      timer = setTimeout(() => {
        setCurrentStage(1);
      }, 400);
    } else if (currentStage < 5) {
      // Progress through stages 1 -> 2 -> 3 -> 4 -> 5 every 600ms (~3s total)
      timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, 600);
    } else if (currentStage === 5) {
      // Hold at 100% final stage for 3 seconds, then restart loop
      timer = setTimeout(() => {
        setCurrentStage(0);
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInView, isHovered, currentStage]);

  // Curve progress fraction based on active stage (0 to 1)
  const curveProgress = currentStage / 5;

  // Derive active journey step from stage
  const activeJourneyStep =
    currentStage <= 1
      ? 1
      : currentStage <= 3
      ? 2
      : currentStage === 4
      ? 3
      : 4;

  const handleStageClick = (stageId) => {
    setCurrentStage(stageId);
  };

  const handleJourneyClick = (targetStage) => {
    setCurrentStage(targetStage);
  };

  return (
    <div
      ref={containerRef}
      className="s2-infographic-outer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Interactive Business Growth Infographic"
    >
      {/* 4 Clean Floating Service Cards (NO background orbits) */}
      {FLOATING_CARDS.map((card) => {
        const IconComp = card.icon;
        return (
          <div
            key={card.id}
            className={`s2-floating-service-card ${card.positionClass}`}
          >
            <div className="s2-float-icon-box" aria-hidden="true">
              <IconComp size={20} strokeWidth={2.2} />
            </div>
            <div className="s2-float-text-box">
              {card.lines.map((line, lIdx) => (
                <span key={lIdx} className="s2-float-text-line">
                  {line}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {/* Main Glass Panel & Base Podium Composition */}
      <div className="s2-infographic-panel-container">
        {/* Central Glass Plaque */}
        <div className="s2-infographic-glass-card">
          {/* Main Heading: "Your Growth, Our Expertise" with smooth curved underline */}
          <div className="s2-info-heading-wrap">
            <h3 className="s2-info-main-title">
              <span className="s2-info-title-purple">Your Growth, </span>
              <span className="s2-info-title-orange">Our Expertise</span>
            </h3>
            {/* Orange curved underline arc (warm smile shape) */}
            <svg
              className="s2-info-title-underline"
              viewBox="0 0 220 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 12 5 C 75 18, 145 18, 208 5"
                stroke="#FF6500"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Main SVG Growth Graph Area */}
          <div className="s2-info-graph-stage">
            {/* Stage 5 Tooltip: Expansion (Scale your business with strategic support) */}
            <AnimatePresence>
              {currentStage === 5 && (
                <motion.div
                  className="s2-info-expansion-tooltip"
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="s2-tooltip-header">
                    <Rocket size={13} strokeWidth={2.4} />
                    <span>Expansion</span>
                  </div>
                  <div className="s2-tooltip-body">
                    <span>Scale your business with strategic support.</span>
                  </div>
                  <div className="s2-tooltip-tail" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>

            <svg
              viewBox="0 0 500 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="s2-info-graph-svg"
            >
              <defs>
                {/* Orange Bar Gradient */}
                <linearGradient id="barOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFA447" />
                  <stop offset="30%" stopColor="#FF7A1A" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>

                {/* Purple Bar Gradient */}
                <linearGradient id="barPurpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8A23A8" />
                  <stop offset="35%" stopColor="#6C1786" />
                  <stop offset="100%" stopColor="#4A075C" />
                </linearGradient>

                {/* Growth Curve Line Gradient */}
                <linearGradient id="growthCurveLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFB866" />
                  <stop offset="50%" stopColor="#FF6E08" />
                  <stop offset="100%" stopColor="#FF4D00" />
                </linearGradient>

                {/* Bar Glow Filter */}
                <filter id="barGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="6"
                    floodColor="#FF6500"
                    floodOpacity="0.16"
                  />
                </filter>
              </defs>

              {/* Baseline */}
              <line
                x1="40"
                y1="230"
                x2="460"
                y2="230"
                stroke="#F2DFC9"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* 5 Vertical Animated Bars */}
              {GRAPH_STAGES.map((stageItem, idx) => {
                const barWidth = 42;
                const barCenters = [80, 160, 240, 320, 400];
                const cx = barCenters[idx];
                const bx = cx - barWidth / 2;
                const baselineY = 230;

                const isBarActive = currentStage >= stageItem.id;
                const targetH = stageItem.targetHeight;
                const currentH = isBarActive ? targetH : 0;
                const barY = baselineY - currentH;

                const isOrange = stageItem.colorType === 'orange';
                const gradId = isOrange ? 'url(#barOrangeGrad)' : 'url(#barPurpleGrad)';

                return (
                  <g
                    key={stageItem.id}
                    className="s2-graph-bar-group"
                    onClick={() => handleStageClick(stageItem.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Bar Column with rounded top corners */}
                    <rect
                      x={bx}
                      y={barY}
                      width={barWidth}
                      height={currentH}
                      rx="9"
                      fill={gradId}
                      style={{
                        transition:
                          'y 0.55s cubic-bezier(0.16, 1, 0.3, 1), height 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      filter={isBarActive ? 'url(#barGlowFilter)' : undefined}
                    />

                    {/* Percentage Label directly above bar */}
                    <text
                      x={cx}
                      y={isBarActive ? barY - 11 : baselineY - 11}
                      textAnchor="middle"
                      fill="#101B35"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="var(--font-heading, sans-serif)"
                      style={{
                        opacity: isBarActive ? 1 : 0,
                        transition: 'all 0.45s ease',
                      }}
                    >
                      {stageItem.percentage}%
                    </text>
                  </g>
                );
              })}

              {/* Dynamic Smooth Orange Growth Curve with Path-Drawing */}
              <path
                d="M 45 208 C 115 190, 195 150, 428 28"
                stroke="url(#growthCurveLineGrad)"
                strokeWidth="4.8"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 420,
                  strokeDashoffset: 420 * (1 - curveProgress),
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Circular Nodes on Curve at each Bar */}
              {GRAPH_STAGES.map((stg) => {
                const isNodeActive = currentStage >= stg.id;
                // Stage 5 has a special glowing halo at 100%
                if (stg.id === 5) {
                  return (
                    <AnimatePresence key={stg.id}>
                      {isNodeActive && (
                        <motion.g
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ transformOrigin: `${stg.nodeX}px ${stg.nodeY}px` }}
                        >
                          {/* Pulsing Ambient Halo */}
                          <circle
                            cx={stg.nodeX}
                            cy={stg.nodeY}
                            r="15"
                            fill="#FF6500"
                            fillOpacity="0.22"
                            className="animate-pulse"
                          />
                          {/* Middle Ring */}
                          <circle
                            cx={stg.nodeX}
                            cy={stg.nodeY}
                            r="8"
                            fill="#FFA54F"
                            stroke="#FF6500"
                            strokeWidth="2.5"
                          />
                          {/* Inner White Core */}
                          <circle cx={stg.nodeX} cy={stg.nodeY} r="3.5" fill="#FFFFFF" />

                          {/* Arrowhead polygon pointing up-right at (428, 28) */}
                          <polygon
                            points="433,22 417,28 425,40"
                            fill="#FF6500"
                          />
                        </motion.g>
                      )}
                    </AnimatePresence>
                  );
                }

                // Stages 1 to 4: Circular white dot with orange border
                return (
                  <circle
                    key={stg.id}
                    cx={stg.nodeX}
                    cy={stg.nodeY}
                    r="5.5"
                    fill="#FFFFFF"
                    stroke="#FF6500"
                    strokeWidth="2.4"
                    style={{
                      opacity: isNodeActive ? 1 : 0,
                      transform: isNodeActive ? 'scale(1)' : 'scale(0.5)',
                      transformOrigin: `${stg.nodeX}px ${stg.nodeY}px`,
                      transition: 'all 0.35s ease',
                    }}
                  />
                );
              })}
            </svg>

            {/* Bottom Service Stage Icons & Labels with Vertical Dividers */}
            <div className="s2-info-stages-row">
              {GRAPH_STAGES.map((stg, sIdx) => {
                const IconComponent = stg.icon;
                const isPurple = stg.colorType === 'purple';
                const isCurrent = currentStage === stg.id;
                const isPastOrActive = currentStage >= stg.id;

                return (
                  <React.Fragment key={stg.id}>
                    <div
                      className={`s2-stage-item ${isCurrent ? 'active-highlight' : ''}`}
                      onClick={() => handleStageClick(stg.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        className={`s2-stage-icon-bare ${
                          isPurple ? 'icon-purple' : 'icon-orange'
                        } ${isPastOrActive ? 'icon-lit' : ''}`}
                        aria-hidden="true"
                      >
                        <IconComponent size={21} strokeWidth={2.4} />
                      </div>
                      <span className="s2-stage-label">{stg.label}</span>
                    </div>

                    {/* Subtle Vertical Divider between columns (1 to 4) */}
                    {sIdx < GRAPH_STAGES.length - 1 && (
                      <div className="s2-stage-divider" aria-hidden="true" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Bottom Business Journey Indicator: 01 START > 02 COMPLY > 03 GROW > 04 SCALE */}
          <div className="s2-card-journey-container">
            <div className="s2-card-journey-pill" role="navigation" aria-label="Business Journey">
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = activeJourneyStep === step.id;

                return (
                  <React.Fragment key={step.id}>
                    <button
                      type="button"
                      className={`s2-journey-step-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleJourneyClick(step.targetStage)}
                    >
                      <span className="s2-journey-num-badge">{step.num}</span>
                      <span className="s2-journey-label">{step.label}</span>
                    </button>

                    {idx < JOURNEY_STEPS.length - 1 && (
                      <span className="s2-journey-chevron" aria-hidden="true">
                        ›
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Layered Premium Rounded Base Podium Platform Underneath */}
        <div className="s2-infographic-podium-wrap" aria-hidden="true">
          <div className="s2-podium-tier-main" />
          <div className="s2-podium-tier-base" />
        </div>
      </div>
    </div>
  );
}

export default BusinessGrowthInfographic;
