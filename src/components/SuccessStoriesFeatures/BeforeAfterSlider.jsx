import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FileText,
  Coins,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MoveHorizontal
} from 'lucide-react';

export default function BeforeAfterSlider({ onConsultClick }) {
  // Slider position defaults to 50% for equal comparison
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mobileTab, setMobileTab] = useState('both'); // 'before', 'both', 'after'
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    // Bound slider between 25% and 75% so neither side collapses or cuts text
    const percentage = Math.max(25, Math.min(75, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  }, [isDragging, updatePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleDragEnd, handleTouchMove]);

  const beforePoints = [
    {
      title: 'Funding Uncertainty',
      desc: 'Traditional banks demanding 100%+ tangible collateral, slow multi-month evaluation cycles, and frequent rejections without clear guidance.',
      icon: Coins
    },
    {
      title: 'Documentation Challenges',
      desc: 'Complex DPR (Detailed Project Report) hurdles, missing regulatory clearances, and unverified financial projections causing bank bottlenecks.',
      icon: FileText
    },
    {
      title: 'Limited Scheme Awareness',
      desc: 'Unaware of high-value central & state subsidies (CGTMSE, PMEGP, Startup India Seed Fund) leaving lakhs of eligible benefits unclaimed.',
      icon: AlertTriangle
    },
    {
      title: 'Business Expansion Difficulties',
      desc: 'Founders stuck spending months chasing financing and bureaucratic paperwork rather than focusing on customer acquisition, hiring, and scaling.',
      icon: XCircle
    }
  ];

  const afterPoints = [
    {
      title: 'Expert Funding Guidance',
      desc: 'Structured access to collateral-free credit up to ₹5 Cr through CGTMSE and direct liaison with leading nationalized and private bank partners.',
      icon: ShieldCheck
    },
    {
      title: 'Documentation Assistance',
      desc: 'Bank-ready Detailed Project Reports (DPRs), CA-certified projections, and airtight compliance clearance delivered within days.',
      icon: FileText
    },
    {
      title: 'Government Scheme Support',
      desc: 'Precision mapping to 20+ government subsidy schemes, interest subventions, and capital grants maximizing financial benefits.',
      icon: Sparkles
    },
    {
      title: 'Structured Business Growth Planning',
      desc: 'Immediate working capital infusion leading to plant expansion, technology adoption, and confident long-term enterprise growth.',
      icon: TrendingUp
    }
  ];

  return (
    <section className="ss-feature-section ss-ba-section" aria-labelledby="ba-heading">
      <div className="ss-feature-container">
        {/* Section Header */}
        <div className="ss-feature-header center">
          <span className="ss-feature-badge">
            <Sparkles size={14} className="ss-badge-icon" />
            <span>Interactive Comparison</span>
          </span>
          <h2 id="ba-heading" className="ss-feature-title">
            Before Growthora <em>vs</em> After Growthora
          </h2>
          <p className="ss-feature-desc">
            See the transformative difference between navigating government funding alone versus having Growthora&apos;s strategic advisory by your side.
          </p>

          {/* Quick Preset Buttons */}
          <div className="ss-ba-presets" role="group" aria-label="Slider position presets">
            <button
              type="button"
              className={`ss-ba-preset-btn ${sliderPos > 60 || mobileTab === 'before' ? 'active' : ''}`}
              onClick={() => {
                setSliderPos(70);
                setMobileTab('before');
              }}
            >
              Focus Before (70 / 30)
            </button>
            <button
              type="button"
              className={`ss-ba-preset-btn ${sliderPos >= 45 && sliderPos <= 55 && mobileTab === 'both' ? 'active' : ''}`}
              onClick={() => {
                setSliderPos(50);
                setMobileTab('both');
              }}
            >
              50 / 50 Comparison
            </button>
            <button
              type="button"
              className={`ss-ba-preset-btn ${sliderPos < 40 || mobileTab === 'after' ? 'active' : ''}`}
              onClick={() => {
                setSliderPos(30);
                setMobileTab('after');
              }}
            >
              Focus After (30 / 70)
            </button>
          </div>
        </div>

        {/* Draggable Split Comparison Stage */}
        <div
          ref={containerRef}
          className={`ss-ba-card-stage mode-${mobileTab}`}
        >
          {/* LEFT PANEL: BEFORE GROWTHORA */}
          <div
            className="ss-ba-panel ss-ba-panel-before"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="ss-ba-panel-inner">
              <div className="ss-ba-panel-header">
                <span className="ss-ba-card-badge before">
                  <AlertTriangle size={15} />
                  <span>Before Growthora</span>
                </span>
                <span className="ss-ba-panel-status tag-before">The Challenge</span>
              </div>

              <h3 className="ss-ba-panel-title before">Bottlenecks &amp; Delays</h3>
              <p className="ss-ba-panel-subtitle">
                High collateral friction, procedural hurdles, and zero visibility into eligible government subsidies.
              </p>

              <div className="ss-ba-points-list">
                {beforePoints.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="ss-ba-item-card before">
                      <div className="ss-ba-item-icon before">
                        <Icon size={18} />
                      </div>
                      <div className="ss-ba-item-text">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DRAGGABLE DIVIDER LINE */}
          <div
            className={`ss-ba-divider-handle ${isDragging ? 'is-dragging' : ''}`}
            style={{ left: `${sliderPos}%` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsDragging(true);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setIsDragging(true);
            }}
            role="slider"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={25}
            aria-valuemax={75}
            aria-label="Comparison slider position"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setSliderPos((p) => Math.max(25, p - 5));
              }
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                setSliderPos((p) => Math.min(75, p + 5));
              }
            }}
          >
            <div className="ss-ba-handle-grip" title="Drag horizontally to compare">
              <MoveHorizontal size={18} strokeWidth={2.5} />
            </div>
            <div className="ss-ba-drag-tooltip">Drag to Compare</div>
          </div>

          {/* RIGHT PANEL: AFTER GROWTHORA */}
          <div
            className="ss-ba-panel ss-ba-panel-after"
            style={{ width: `${100 - sliderPos}%` }}
          >
            <div className="ss-ba-panel-inner">
              <div className="ss-ba-panel-header">
                <span className="ss-ba-card-badge after">
                  <CheckCircle2 size={15} />
                  <span>After Growthora</span>
                </span>
                <span className="ss-ba-panel-status tag-after">Structured Scaling</span>
              </div>

              <h3 className="ss-ba-panel-title after">Empowered &amp; Scaling</h3>
              <p className="ss-ba-panel-subtitle">
                Clear scheme roadmap, sanctioned collateral-free capital, and structured business expansion.
              </p>

              <div className="ss-ba-points-list">
                {afterPoints.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="ss-ba-item-card after">
                      <div className="ss-ba-item-icon after">
                        <Icon size={18} />
                      </div>
                      <div className="ss-ba-item-text">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {onConsultClick && (
                <div className="ss-ba-panel-footer">
                  <button
                    type="button"
                    className="ss-ba-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onConsultClick();
                    }}
                  >
                    <span>Experience This Transformation</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Explanatory Footer Pill */}
        <div className="ss-ba-mobile-hint">
          <MoveHorizontal size={14} />
          <span>Drag the central handle or use the preset buttons above to compare</span>
        </div>
      </div>
    </section>
  );
}
