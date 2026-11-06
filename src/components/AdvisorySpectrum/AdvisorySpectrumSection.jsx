import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADVISORY_SERVICES } from './advisoryData';
import { AdvisoryWheel } from './AdvisoryWheel';
import { AdvisoryDetailPanel } from './AdvisoryDetailPanel';
import { AdvisoryBottomNav } from './AdvisoryBottomNav';

const TOTAL_SERVICES = ADVISORY_SERVICES.length; // 9
const AUTO_PLAY_DELAY = 3000; // 3 seconds per service

/**
 * AdvisorySpectrumSection renders the "Our Advisory Practices" section
 * with smooth automatic service rotation, hover-pause, and interactive navigation.
 */
export const AdvisorySpectrumSection = ({ onOpenConsultation }) => {
  const [activeServiceId, setActiveServiceId] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [timerResetKey, setTimerResetKey] = useState(0);

  const sectionRef = useRef(null);
  const touchTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // IntersectionObserver: Only auto-rotate when section is visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automatic service rotation effect (continuous loop 1 -> 9 -> 1)
  useEffect(() => {
    // Pause conditions: mouse hover, keyboard focus, out of viewport, or reduced motion
    if (isHovered || isFocused || !isInView || prefersReducedMotion) {
      return;
    }

    const timer = setInterval(() => {
      setActiveServiceId((prev) => (prev >= TOTAL_SERVICES ? 1 : prev + 1));
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(timer);
  }, [isHovered, isFocused, isInView, prefersReducedMotion, timerResetKey]);

  // Clean up touch timeout on unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  // Manual service selection handler (resets the 3s countdown)
  const handleSelectService = (id) => {
    setActiveServiceId(id);
    setTimerResetKey((prev) => prev + 1);
  };

  const handleExploreService = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookConsultation = (service) => {
    if (onOpenConsultation) {
      onOpenConsultation(service);
    } else {
      navigate(`/book-consultation?service=${encodeURIComponent(service.name)}`, {
        state: { service: service.name, category: service.name },
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeService =
    ADVISORY_SERVICES.find((s) => s.id === activeServiceId) ||
    ADVISORY_SERVICES[0];

  return (
    <section
      id="advisory-practices"
      ref={sectionRef}
      className="advisory-spectrum-section"
      aria-label="Our Advisory Practices Spectrum"
    >
      {/* Soft Ambient Background Glows */}
      <div className="advisory-spectrum-ambient-1" aria-hidden="true" />
      <div className="advisory-spectrum-ambient-2" aria-hidden="true" />

      <div className="advisory-spectrum-container">
        {/* Section Header */}
        <div className="advisory-spectrum-header">
          <div>
            <div className="advisory-spectrum-eyebrow">
              OUR PRACTICE SPECTRUM
            </div>

            <h2 className="advisory-spectrum-title">
              Our Advisory <span>Practices</span>
            </h2>
          </div>

          <div className="advisory-spectrum-subtitle-wrap">
            <div className="advisory-spectrum-divider" />
            <p className="advisory-spectrum-subtitle">
              Explore our 9 specialised services designed for every stage of your business growth.
            </p>
          </div>
        </div>

        {/* Interactive Container: Mouse Enter/Leave & Focus/Blur control the pause state */}
        <div
          className="advisory-spectrum-interactive-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsFocused(false);
            }
          }}
          onTouchStart={() => {
            if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
            setIsHovered(true);
          }}
          onTouchEnd={() => {
            // Resume autoplay 2.5s after touch interaction ends on mobile
            if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
            touchTimeoutRef.current = setTimeout(() => {
              setIsHovered(false);
            }, 2500);
          }}
        >
          {/* Main Two-Column Layout: Left Wheel (42%) | Right Detail Panel (58%) */}
          <div className="advisory-spectrum-grid">
            {/* Left Column: Compact Circular Wheel */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <AdvisoryWheel
                services={ADVISORY_SERVICES}
                activeServiceId={activeServiceId}
                onSelectService={handleSelectService}
              />
            </div>

            {/* Right Column: Dynamic Detail Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <AdvisoryDetailPanel
                service={activeService}
                onExploreService={handleExploreService}
                onBookConsultation={handleBookConsultation}
              />
            </div>
          </div>

          {/* Bottom 01 - 09 Circular Number Navigation */}
          <AdvisoryBottomNav
            services={ADVISORY_SERVICES}
            activeServiceId={activeServiceId}
            onSelectService={handleSelectService}
          />
        </div>
      </div>
    </section>
  );
};
