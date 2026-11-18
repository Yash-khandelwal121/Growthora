import React, { useState } from 'react';
import {
  Layers,
  Bot,
  Laptop,
  Briefcase,
  Tag,
  ShieldCheck,
  MapPin,
  Target,
  ArrowRight,
  Quote,
  Coins,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Award,
  Sparkles
} from 'lucide-react';
import { FEATURED_CASE_STUDIES } from '../../data/successStoriesData';

// Map specific icons to the 4 companies for the selector tabs
const TAB_ICONS = {
  meridian: Layers,
  'forge-robotics': Bot,
  techmudra: Laptop,
  healthplus: Briefcase
};

export default function InDepthCaseStudies({ onOpenModal }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeCase = FEATURED_CASE_STUDIES[activeIdx] || FEATURED_CASE_STUDIES[0];

  return (
    <section id="featured-cases" className="ss-cases-section-v2" aria-labelledby="cases-title">
      <div className="ss-cases-outer-container">
        
        {/* Ambient Decorative Background Waves */}
        <div className="ss-cases-bg-decor" aria-hidden="true">
          <svg className="ss-cases-bg-svg" viewBox="0 0 1440 280" fill="none" preserveAspectRatio="none">
            <path
              d="M -50 30 C 240 110, 380 15, 620 55 C 860 95, 1040 10, 1260 45 C 1390 65, 1460 30, 1500 40 L 1500 -40 L -50 -40 Z"
              fill="url(#casesWaveTop)"
              opacity="0.35"
            />
            <path
              d="M -50 250 C 220 210, 400 270, 640 230 C 880 190, 1060 250, 1280 220 C 1400 200, 1460 230, 1500 225 L 1500 320 L -50 320 Z"
              fill="url(#casesWaveBottom)"
              opacity="0.25"
            />
            <defs>
              <linearGradient id="casesWaveTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA66B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFF2E8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="casesWaveBottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6500" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FFE5D1" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 1. SECTION HEADER */}
        <div className="ss-cases-header-block">
          <span className="ss-cases-kicker-pill">
            <span className="ss-kicker-dot-left">•</span>
            <span>IN-DEPTH ADVISORY CASE STUDIES</span>
            <span className="ss-kicker-dot-right">•</span>
          </span>

          <h2 id="cases-title" className="ss-cases-heading-title">
            Behind Every Success,{' '}
            <span className="ss-cases-heading-highlight">
              <em>There&rsquo;s a Strategy.</em>
            </span>
          </h2>

          <p className="ss-cases-subtitle-desc">
            From initial diagnostic eligibility to money in the bank. Explore how structured compliance and financial advisory enabled real growth for these businesses.
          </p>
        </div>

        {/* 2. INTERACTIVE 4-COMPANY SELECTOR TABS */}
        <div className="ss-cases-tabs-wrapper" role="tablist" aria-label="Featured case study selector">
          {FEATURED_CASE_STUDIES.map((c, i) => {
            const isActive = i === activeIdx;
            const TabIcon = TAB_ICONS[c.id] || Layers;

            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`ss-cases-tab-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <div className="ss-tab-icon-wrap" aria-hidden="true">
                  <TabIcon size={18} className="ss-tab-icon-svg" />
                </div>
                <div className="ss-tab-label-group">
                  <span className="ss-tab-company-name">{c.company}</span>
                  <span className="ss-tab-amount-tag">({c.amount})</span>
                </div>

                {/* Downward pointing triangle indicator notch on active tab */}
                {isActive && <span className="ss-tab-notch-indicator" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* 3. MAIN CASE STUDY CONTAINER */}
        <div className="ss-cases-showcase-panel">
          <div className="ss-cases-grid-inner">
            
            {/* LEFT COLUMN: 55% */}
            <div className="ss-cases-content-col">
              
              {/* Badges Row */}
              <div className="ss-cases-chips-row">
                <span className="ss-cases-chip-pill">
                  <Tag size={12} className="ss-chip-icon" />
                  <span>{activeCase.chips[0] || activeCase.industry}</span>
                </span>
                <span className="ss-cases-chip-pill">
                  <ShieldCheck size={12} className="ss-chip-icon" />
                  <span>{activeCase.chips[1] || activeCase.scheme}</span>
                </span>
                <span className="ss-cases-chip-pill">
                  <MapPin size={12} className="ss-chip-icon" />
                  <span>{activeCase.chips[2] || activeCase.location}</span>
                </span>
              </div>

              {/* Company Heading Group with Vertical Accent */}
              <div className="ss-cases-title-group">
                <div className="ss-cases-title-accent-bar" aria-hidden="true" />
                <div className="ss-cases-title-text-wrap">
                  <h3 className="ss-cases-company-title">{activeCase.company}</h3>
                  <div className="ss-cases-scheme-subhead">{activeCase.scheme}</div>
                </div>
              </div>

              {/* 3 Connected Horizontal Panels: Challenge -> Strategy -> Outcome */}
              <div className="ss-cases-steps-row">
                
                {/* 01. Challenge */}
                <div className="ss-cases-step-card">
                  <div className="ss-step-card-head">
                    <Target size={15} className="ss-step-card-icon" />
                    <span className="ss-step-card-num">01. THE CHALLENGE</span>
                  </div>
                  <p className="ss-step-card-desc">
                    {activeCase.shortChallenge || activeCase.challenge}
                  </p>
                </div>

                <div className="ss-steps-arrow-wrap" aria-hidden="true">
                  <ArrowRight size={16} className="ss-steps-connector-arrow" />
                </div>

                {/* 02. Strategy */}
                <div className="ss-cases-step-card">
                  <div className="ss-step-card-head">
                    <Layers size={15} className="ss-step-card-icon" />
                    <span className="ss-step-card-num">02. GROWTHORA'S STRATEGY</span>
                  </div>
                  <p className="ss-step-card-desc">
                    {activeCase.shortStrategy || activeCase.strategy}
                  </p>
                </div>

                <div className="ss-steps-arrow-wrap" aria-hidden="true">
                  <ArrowRight size={16} className="ss-steps-connector-arrow" />
                </div>

                {/* 03. Outcome */}
                <div className="ss-cases-step-card outcome-card">
                  <div className="ss-step-card-head">
                    <ShieldCheck size={15} className="ss-step-card-icon" />
                    <span className="ss-step-card-num">03. THE OUTCOME</span>
                  </div>
                  <p className="ss-step-card-desc">
                    {activeCase.shortOutcome ? (
                      activeCase.shortOutcome.startsWith(activeCase.amount) ? (
                        <>
                          <strong className="ss-outcome-bold-amt">{activeCase.amount}</strong>{' '}
                          {activeCase.shortOutcome.replace(activeCase.amount, '').trim()}
                        </>
                      ) : (
                        activeCase.shortOutcome
                      )
                    ) : (
                      activeCase.outcome
                    )}
                  </p>
                </div>

              </div>

              {/* Client Testimonial Panel */}
              <div className="ss-cases-testimonial-card">
                <div className="ss-testimonial-quote-col" aria-hidden="true">
                  <Quote size={20} className="ss-testimonial-quote-svg" />
                </div>
                <div className="ss-testimonial-body">
                  <p className="ss-testimonial-quote-text">
                    &ldquo;{activeCase.quote}&rdquo;
                  </p>
                  <div className="ss-testimonial-author-text">
                    &mdash; {activeCase.founder}, {activeCase.founderRole}
                  </div>
                </div>
              </div>

              {/* Financial Results KPI Strip */}
              <div className="ss-cases-kpis-strip">
                {activeCase.metrics.map((m, idx) => {
                  let KpiIcon = Coins;
                  if (idx === 1) KpiIcon = TrendingUp;
                  if (idx === 2) KpiIcon = Calendar;

                  return (
                    <React.Fragment key={`kpi-${idx}`}>
                      {idx > 0 && <div className="ss-kpi-vertical-divider" aria-hidden="true" />}
                      <div className="ss-kpi-item-block">
                        <div className="ss-kpi-icon-wrap" aria-hidden="true">
                          <KpiIcon size={18} className="ss-kpi-lucide-icon" />
                        </div>
                        <div className="ss-kpi-text-wrap">
                          <div className="ss-kpi-val-number">{m.val}</div>
                          <div className="ss-kpi-lbl-name">{m.label}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Read Full Success Story CTA Button */}
              <div className="ss-cases-cta-row">
                <button
                  type="button"
                  className="ss-cases-read-more-btn"
                  onClick={() => onOpenModal && onOpenModal(activeCase)}
                  aria-label={`Read full success story for ${activeCase.company}`}
                >
                  <span>Read Full Success Story</span>
                  <ArrowRight size={16} className="ss-cta-arrow-lucide" />
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: 45% VISUAL & FLOATING MILESTONE CARDS */}
            <div className="ss-cases-visual-col">
              
              {/* Industry Photograph */}
              <div className="ss-cases-photo-frame">
                <img
                  key={activeCase.id}
                  src={activeCase.image}
                  alt={`${activeCase.company} — ${activeCase.industry}`}
                  className="ss-cases-industry-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/industries/textile.jpg';
                  }}
                />
              </div>

              {/* Concave Curved Divider SVG Overlay along Left Edge */}
              <div className="ss-cases-concave-divider" aria-hidden="true">
                <svg
                  viewBox="0 0 100 500"
                  fill="none"
                  preserveAspectRatio="none"
                  className="ss-concave-cases-svg"
                >
                  {/* Subtle Glow */}
                  <path
                    d="M 100 0 C 18 130, 18 370, 100 500"
                    stroke="url(#casesCurveOuterGlow)"
                    strokeWidth="8"
                    opacity="0.25"
                  />
                  {/* Crisp Gold-Orange Separator Line */}
                  <path
                    d="M 100 0 C 18 130, 18 370, 100 500"
                    stroke="url(#casesCurveGoldLine)"
                    strokeWidth="2.5"
                  />
                  {/* Left Solid White Mask */}
                  <path
                    d="M 0 0 L 100 0 C 18 130, 18 370, 100 500 L 0 500 Z"
                    fill="#FFFFFF"
                  />
                  <defs>
                    <linearGradient id="casesCurveGoldLine" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFA66B" />
                      <stop offset="50%" stopColor="#FF6500" />
                      <stop offset="100%" stopColor="#FFA66B" />
                    </linearGradient>
                    <linearGradient id="casesCurveOuterGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFD4B8" />
                      <stop offset="50%" stopColor="#FF8A33" />
                      <stop offset="100%" stopColor="#FFD4B8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Gold Ribbon Seal Badge (Top-Right) */}
              {activeCase.id !== 'meridian' && (
                <div className="ss-cases-seal-ribbon-badge" aria-hidden="true">
                  <div className="ss-ribbon-circle-seal">
                    <CheckCircle2 size={16} className="ss-ribbon-check-icon" />
                    <span className="ss-ribbon-seal-text">{activeCase.sealText || 'VERIFIED SANCTION'}</span>
                  </div>
                  <div className="ss-ribbon-tail-wrap">
                    <span className="ss-ribbon-tail left" />
                    <span className="ss-ribbon-tail right" />
                  </div>
                </div>
              )}

              {/* Floating Glassmorphic Milestone Pill (Bottom-Left) */}
              {activeCase.id !== 'meridian' && (
                <div className="ss-cases-milestone-glass-pill" aria-hidden="true">
                  <div className="ss-milestone-pill-left">
                    <div className="ss-milestone-coins-bubble">
                      <Coins size={20} className="ss-milestone-coin-svg" />
                    </div>
                    <div className="ss-milestone-info-wrap">
                      <span className="ss-milestone-bold-amt">{activeCase.amount}</span>
                      <span className="ss-milestone-lbl-text">{activeCase.amountLabel || 'Working Capital'}</span>
                    </div>
                  </div>

                  {/* Rising 3D mini bar chart with upward arrow */}
                  <div className="ss-milestone-chart-graphic">
                    <div className="ss-chart-bar b1" />
                    <div className="ss-chart-bar b2" />
                    <div className="ss-chart-bar b3" />
                    <div className="ss-chart-bar b4" />
                    <div className="ss-chart-arrow-head" />
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

