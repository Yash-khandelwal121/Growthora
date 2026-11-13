import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * ServiceTooltip renders the connected status panel below the semicircular graph.
 * Displays the current active stage details and consultation navigation.
 * Uses dedicated CSS classes (.service-tooltip-*) in service2.css for robust layout.
 */
export const ServiceTooltip = ({
  activeSegment,
  activeStageIndex,
}) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    if (!activeSegment) return;
    navigate(`/book-consultation?service=${encodeURIComponent(activeSegment.name)}`, {
      state: { service: activeSegment.name, category: activeSegment.name },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isComplete = activeStageIndex >= 6;
  const stageColor = activeSegment?.color || '#F07126';

  return (
    <div className="service-tooltip-wrapper">
      <div
        className="service-tooltip-card"
        style={{
          boxShadow: `0 10px 28px ${stageColor}18, 0 2px 8px rgba(17, 27, 52, 0.04)`,
          borderColor: `${stageColor}28`,
        }}
      >
        <div className="service-tooltip-row">
          {/* Left info area */}
          <div className="service-tooltip-left">
            {/* Compact Stage Number Badge */}
            <div
              className="service-tooltip-badge"
              style={{
                backgroundColor: stageColor,
                boxShadow: `0 4px 14px ${stageColor}38`,
              }}
            >
              {activeSegment ? activeSegment.code : '00'}
            </div>

            <div className="service-tooltip-info">
              <div className="service-tooltip-meta">
                <span
                  className="service-tooltip-pill"
                  style={{
                    color: stageColor,
                    borderColor: `${stageColor}35`,
                    backgroundColor: `${stageColor}12`,
                  }}
                >
                  Stage {activeSegment ? activeSegment.code : '00'} / 06
                </span>

                {isComplete && (
                  <span className="service-tooltip-complete-tag">
                    <Sparkles size={11} />
                    Complete Ecosystem
                  </span>
                )}
              </div>

              <h4 className="service-tooltip-title">
                {activeSegment ? activeSegment.name : 'Complete Business Advisory Ecosystem'}
              </h4>

              <p className="service-tooltip-desc">
                {activeSegment
                  ? activeSegment.description
                  : 'A sequential advisory journey guiding your business from setup to scaling.'}
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="service-tooltip-action">
            <button
              type="button"
              onClick={handleExplore}
              className="service-tooltip-btn"
              style={{
                backgroundColor: stageColor,
                boxShadow: `0 4px 14px ${stageColor}30`,
              }}
            >
              <span>Explore</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


