import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * AdvisoryBottomNav renders the bottom 01 - 09 circular navigation indicators
 * with previous (←) and next (→) arrow buttons.
 */
export const AdvisoryBottomNav = ({
  services,
  activeServiceId,
  onSelectService,
}) => {
  const currentIndex = services.findIndex((s) => s.id === activeServiceId);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + services.length) % services.length;
    onSelectService(services[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % services.length;
    onSelectService(services[nextIndex].id);
  };

  return (
    <div className="advisory-bottom-nav-wrap select-none">
      <div className="advisory-bottom-nav-pill">
        {/* Subtle Horizontal Connecting Guide Behind Numbers */}
        <div className="advisory-bottom-nav-line" aria-hidden="true" />

        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          title="Previous Practice"
          aria-label="Previous Practice"
          className="advisory-nav-arrow-btn"
        >
          <ArrowLeft size={15} strokeWidth={2.4} />
        </button>

        {/* 01 to 09 Circular Number Buttons */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {services.map((srv) => {
            const isActive = srv.id === activeServiceId;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => onSelectService(srv.id)}
                title={`Practice ${srv.code} — ${srv.name}`}
                aria-label={`Practice ${srv.code} — ${srv.name}`}
                aria-pressed={isActive}
                className={`advisory-nav-num-btn ${isActive ? 'active' : ''}`}
              >
                {srv.code}
              </button>
            );
          })}
        </div>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          title="Next Practice"
          aria-label="Next Practice"
          className="advisory-nav-arrow-btn"
        >
          <ArrowRight size={15} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
};
