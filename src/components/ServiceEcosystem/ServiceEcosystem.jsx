import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  FileText,
  Coins,
  Award,
  Megaphone,
  Scale,
  TrendingUp,
} from 'lucide-react';

import { ServiceArc } from './ServiceArc';
import { ServiceTooltip } from './ServiceTooltip';

/**
 * 6 Advisory Service Segments according to the Growthora Master Specification
 */
const SERVICE_SEGMENTS = [
  {
    id: 1,
    code: '01',
    name: 'Registration',
    lines: ['Registration'],
    a1: 180,
    a2: 150,
    color: '#65005F', // Primary Growthora Purple
    icon: FileText,
    description: 'Set up your business with the right legal structure.',
  },
  {
    id: 2,
    code: '02',
    name: 'Finance & Funding',
    lines: ['Finance &', 'Funding'],
    a1: 150,
    a2: 120,
    color: '#FF5A00', // Vibrant Growthora Orange
    icon: Coins,
    description: 'Access the right funding and financial support.',
  },
  {
    id: 3,
    code: '03',
    name: 'Certifications',
    lines: ['Certifications'],
    a1: 120,
    a2: 90,
    color: '#65005F', // Primary Growthora Purple
    icon: Award,
    description: 'Obtain essential licences and industry certifications.',
  },
  {
    id: 4,
    code: '04',
    name: 'Branding',
    lines: ['Branding'],
    a1: 90,
    a2: 60,
    color: '#FF5A00', // Vibrant Growthora Orange
    icon: Megaphone,
    description: 'Build a strong and credible brand identity.',
  },
  {
    id: 5,
    code: '05',
    name: 'Legal & CA',
    lines: ['Legal & CA'],
    a1: 60,
    a2: 30,
    color: '#65005F', // Primary Growthora Purple
    icon: Scale,
    description: 'Stay compliant with legal, tax and regulatory requirements.',
  },
  {
    id: 6,
    code: '06',
    name: 'Growth & Expansion',
    lines: ['Growth &', 'Expansion'],
    a1: 30,
    a2: 0,
    color: '#FF5A00', // Vibrant Growthora Orange
    icon: TrendingUp,
    description: 'Scale with operations, MSME benefits, IPO and valuation support.',
  },
];

/**
 * ServiceEcosystem orchestrates the sequential speedometer-style fill animation,
 * ascending growth bars, and user interactions.
 */
export const ServiceEcosystem = () => {
  const [activeStage, setActiveStage] = useState(0); // 0 (initial 0%) to 6 (100% active)
  const [hoveredStage, setHoveredStage] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // IntersectionObserver: Only animate when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automatic sequential animation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveStage(6);
      return;
    }

    // Do not auto-advance if paused, out of view, or a specific stage is locked by user
    if (isPaused || !isInView || selectedStage !== null) {
      return;
    }

    let timer;

    if (activeStage < 6) {
      // 0.4s between stage increments
      timer = setTimeout(() => {
        setActiveStage((prev) => prev + 1);
      }, 400);
    } else {
      // Hold completed state for 3 seconds, then loop
      timer = setTimeout(() => {
        setActiveStage(0);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [activeStage, isPaused, isInView, selectedStage, prefersReducedMotion]);

  // Handle user clicking on a specific segment
  const handleSegmentClick = (id) => {
    if (selectedStage === id) {
      // Re-clicking selected stage unfreezes auto-loop
      setSelectedStage(null);
      setIsPaused(false);
    } else {
      setSelectedStage(id);
      setActiveStage(id);
      setIsPaused(true);
    }
  };

  // Hover handlers: highlight hovered segment and temporarily pause auto-loop
  const handleSegmentHover = (id) => {
    setHoveredStage(id);
    if (!selectedStage) {
      setIsPaused(true);
    }
  };

  const handleSegmentLeave = () => {
    setHoveredStage(null);
    if (!selectedStage) {
      setIsPaused(false);
    }
  };

  // The segment to display in the tooltip: hovered takes precedence, then selected, then activeStage
  const displayedStageId = hoveredStage || selectedStage || (activeStage > 0 ? activeStage : 1);
  const displayedSegment = SERVICE_SEGMENTS.find((s) => s.id === displayedStageId) || SERVICE_SEGMENTS[0];

  return (
    <div
      ref={containerRef}
      className="service-ecosystem-wrapper w-full flex flex-col items-center justify-center relative py-0 sm:py-1"
      aria-live="polite"
    >
      {/* Semicircular Gauge Arc SVG */}
      <ServiceArc
        segments={SERVICE_SEGMENTS}
        activeStage={selectedStage !== null ? selectedStage : activeStage}
        hoveredStage={hoveredStage}
        selectedStage={selectedStage}
        onSegmentClick={handleSegmentClick}
        onSegmentHover={handleSegmentHover}
        onSegmentLeave={handleSegmentLeave}
      />

      {/* Connected Information Tooltip Panel */}
      <ServiceTooltip
        activeSegment={displayedSegment}
        activeStageIndex={selectedStage !== null ? selectedStage : activeStage}
      />
    </div>
  );
};

