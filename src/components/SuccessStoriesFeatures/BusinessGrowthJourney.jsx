import React, { useState } from 'react';
import {
  Mountain,
  Handshake,
  Coins,
  TrendingUp,
  Layers,
  Building2,
  Megaphone,
  FileX,
  FileSearch,
  FileSpreadsheet,
  ShieldCheck,
  CheckCircle2,
  Users,
  Factory,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Compass
} from 'lucide-react';

export default function BusinessGrowthJourney({ onConsultClick }) {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    {
      id: 0,
      number: '01',
      title: 'Business Challenge',
      stepIcon: Mountain,
      badge: 'STAGE 01 • ASSESSMENT',
      badgeIcon: Compass,
      timeframe: 'Day 1 — Onboarding',
      headingTitle: 'Business Challenge:',
      headingSubtitle: 'Identifying Bottlenecks & Growth Gaps',
      tagline: 'High collateral demands, working capital shortages, and complex bureaucratic procedures hold back promising enterprises.',
      points: [
        {
          text: 'Working capital bottlenecks impacting daily operations and order fulfillment',
          icon: Layers
        },
        {
          text: 'Traditional commercial banks demanding 100%+ tangible real estate collateral',
          icon: Building2
        },
        {
          text: 'Lack of awareness about central and state subsidy schemes available for the sector',
          icon: Megaphone
        },
        {
          text: 'Rejection of loan applications due to unverified project documentation',
          icon: FileX
        }
      ],
      deliverable: 'Free Initial Diagnostic & Scheme Eligibility Report',
      image: '/images/journey/stage_01_challenge.webp',
      alt: 'Business Challenge — Business gap assessment blocks, checklist, and strategic planning',
      objectPosition: '85% 35%'
    },
    {
      id: 1,
      number: '02',
      title: 'Expert Consultation',
      stepIcon: Handshake,
      badge: 'STAGE 02 • STRATEGY',
      badgeIcon: Users,
      timeframe: 'Days 2–7 — Structuring',
      headingTitle: 'Expert Consultation:',
      headingSubtitle: 'Scheme Mapping & Financial Modeling',
      tagline: 'Senior advisors analyze your balance sheet, evaluate 20+ government schemes, and prepare bank-ready Detailed Project Reports.',
      points: [
        {
          text: 'One-on-one session with dedicated government funding and banking advisors',
          icon: Users
        },
        {
          text: 'Precision scheme identification (CGTMSE, PMEGP, Startup India, Stand-Up India)',
          icon: FileSearch
        },
        {
          text: 'Comprehensive DPR preparation with CA-certified 5-year financial projections',
          icon: FileSpreadsheet
        },
        {
          text: 'Regulatory gap closure (Udyam, GST, DPIIT recognition, statutory filings)',
          icon: ShieldCheck
        }
      ],
      deliverable: 'Bank-Ready DPR & Government Scheme Dossier',
      image: '/images/journey/stage_02_strategy.webp',
      alt: 'Expert Consultation — Financial modeling projections, government scheme blocks, and DPR documentation',
      objectPosition: '70% 35%'
    },
    {
      id: 2,
      number: '03',
      title: 'Funding Support',
      stepIcon: Coins,
      badge: 'STAGE 03 • EXECUTION',
      badgeIcon: Coins,
      timeframe: 'Weeks 2–6 — Banking Liaison',
      headingTitle: 'Funding Support:',
      headingSubtitle: 'Liaison, Sanction & Documentation',
      tagline: 'Direct liaison with nationalized banks, state nodal agencies, and credit guarantee trusts to fast-track sanction letters.',
      points: [
        {
          text: 'Application submission across verified public and private sector partner banks',
          icon: Building2
        },
        {
          text: 'Direct coordination with credit managers, minimizing branch friction and delays',
          icon: Handshake
        },
        {
          text: 'End-to-end follow-up for CGTMSE guarantee cover approvals up to ₹5 Crore',
          icon: ShieldCheck
        },
        {
          text: 'Queries and compliance verification handled proactively by our finance desk',
          icon: CheckCircle2
        }
      ],
      deliverable: 'Official Loan Sanction & Government Subsidy In-Principle Approval',
      image: '/images/journey/stage-03-funding-support.png',
      alt: 'Funding Support — Bank consultation, CGTMSE guarantee cover, compliance documentation, and loan sanction',
      objectPosition: '12% 25%'
    },
    {
      id: 3,
      number: '04',
      title: 'Business Growth',
      stepIcon: TrendingUp,
      badge: 'STAGE 04 • EXPANSION',
      badgeIcon: TrendingUp,
      timeframe: 'Post-Disbursement — Scale',
      headingTitle: 'Business Growth:',
      headingSubtitle: 'Disbursement, Scaling & Subsidies',
      tagline: 'Collateral-free capital is disbursed into your bank account, enabling modern plant machinery, hiring, and sustained market expansion.',
      points: [
        {
          text: 'Immediate liquidity infusion supporting bulk raw material procurement',
          icon: Coins
        },
        {
          text: 'Capacity expansion and technological modernization of production facilities',
          icon: Factory
        },
        {
          text: 'Capital subsidies disbursed directly to loan account, reducing effective borrowing cost',
          icon: TrendingUp
        },
        {
          text: 'Continuous advisory support for post-funding compliance and next growth rounds',
          icon: Rocket
        }
      ],
      deliverable: 'Multiplied Capacity, Reduced Interest Burden & Sustainable Scale',
      image: '/images/journey/stage_04_expansion.webp',
      alt: 'Business Growth — Modern manufacturing expansion, capacity scaling, and loan disbursement',
      objectPosition: '35% 30%'
    }
  ];

  const currentStage = stages[activeStep];
  const BadgeIcon = currentStage.badgeIcon;

  const handleNextClick = () => {
    if (activeStep < stages.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else if (onConsultClick) {
      onConsultClick();
    }
  };

  const getNextButtonLabel = () => {
    if (activeStep === 0) return 'Next: Expert Consultation';
    if (activeStep === 1) return 'Next: Funding Support';
    if (activeStep === 2) return 'Next: Business Growth';
    return 'Start Your Growth Journey';
  };

  return (
    <section className="ss-journey-section-v2" aria-labelledby="journey-heading">
      <div className="ss-journey-outer-container">
        
        {/* Subtle decorative background ribbons */}
        <div className="ss-journey-bg-decor" aria-hidden="true">
          <svg className="ss-journey-bg-svg" viewBox="0 0 1440 280" fill="none" preserveAspectRatio="none">
            <path
              d="M -50 40 C 220 120, 360 10, 580 60 C 800 110, 980 10, 1220 50 C 1380 75, 1450 40, 1500 50 L 1500 -50 L -50 -50 Z"
              fill="url(#journeyWaveTop)"
              opacity="0.35"
            />
            <path
              d="M -50 240 C 200 200, 380 260, 600 220 C 820 180, 1020 240, 1240 210 C 1380 190, 1450 220, 1500 215 L 1500 320 L -50 320 Z"
              fill="url(#journeyWaveBottom)"
              opacity="0.25"
            />
            <defs>
              <linearGradient id="journeyWaveTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA66B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFF2E8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="journeyWaveBottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FFE5D1" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 1. SECTION HEADER */}
        <div className="ss-journey-header-block">
          <span className="ss-journey-kicker-pill">
            <Compass size={14} className="ss-kicker-icon" />
            <span>STRUCTURED SCALING ROADMAP</span>
          </span>

          <h2 id="journey-heading" className="ss-journey-heading-title">
            Interactive Business{' '}
            <span className="ss-journey-heading-highlight">
              <em>Growth Journey</em>
              <svg className="ss-journey-swoop-svg" viewBox="0 0 240 18" fill="none" aria-hidden="true">
                <path
                  d="M 4 11 C 65 3, 175 3, 236 13"
                  stroke="#FF6B00"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="ss-heading-sparks-wrap" aria-hidden="true">
                <span className="ss-spark s1" />
                <span className="ss-spark s2" />
                <span className="ss-spark s3" />
              </span>
            </span>
          </h2>

          <p className="ss-journey-subtitle-desc">
            Explore how Growthora systematically moves your enterprise from initial capital constraints to sanctioned government funding and sustained business scaling.
          </p>
        </div>

        {/* 2. PREMIUM INTERACTIVE FOUR-STEP TIMELINE */}
        <div className="ss-journey-timeline-container">
          <div className="ss-journey-timeline-track">
            {/* Horizontal Connecting Line */}
            <div className="ss-journey-track-base-line" aria-hidden="true" />
            
            {/* Connecting Arrow at Right End */}
            <div className="ss-journey-track-arrow-head" aria-hidden="true">
              <ArrowRight size={18} className="ss-track-arrow-lucide" />
            </div>

            {/* 4 Step Cards */}
            <div className="ss-journey-cards-grid" role="tablist" aria-label="Roadmap stages">
              {stages.map((stage, idx) => {
                const isActive = activeStep === idx;
                const StepIcon = stage.stepIcon;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ss-journey-step-pill-card ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div className="ss-step-card-top-row">
                      <div className="ss-step-icon-bubble">
                        <StepIcon size={20} className="ss-step-icon-svg" />
                      </div>
                      <span className="ss-step-num-pill">{stage.number}</span>
                    </div>
                    <span className="ss-step-label-text">{stage.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. PREMIUM SPLIT-SCREEN CONTENT PANEL */}
        <div className="ss-journey-showcase-panel">
          
          {/* LEFT CONTENT AREA (~68%) */}
          <div className="ss-journey-content-col">
            
            {/* Top Meta Badges */}
            <div className="ss-journey-meta-row">
              <span className="ss-journey-stage-tag">
                <BadgeIcon size={13} className="ss-tag-icon" />
                <span>{currentStage.badge}</span>
              </span>
              <span className="ss-journey-calendar-tag">
                <Calendar size={13} className="ss-calendar-icon" />
                <span>{currentStage.timeframe}</span>
              </span>
            </div>

            {/* Stage Heading */}
            <h3 className="ss-journey-panel-heading">
              {currentStage.headingTitle} <em>{currentStage.headingSubtitle}</em>
            </h3>

            {/* Description Tagline */}
            <p className="ss-journey-panel-tagline">
              {currentStage.tagline}
            </p>

            {/* 4 Key Points in Clean 2-Column Grid */}
            <div className="ss-journey-points-2col">
              {currentStage.points.map((pt, pIdx) => {
                const PointIcon = pt.icon;
                return (
                  <div key={pIdx} className="ss-journey-point-card">
                    <div className="ss-point-icon-wrap" aria-hidden="true">
                      <PointIcon size={17} className="ss-point-lucide" />
                    </div>
                    <span className="ss-point-desc-text">{pt.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Key Deliverable Highlight Strip */}
            <div className="ss-journey-deliverable-box">
              <div className="ss-deliv-icon-pill" aria-hidden="true">
                <ShieldCheck size={17} className="ss-deliv-check-lucide" />
              </div>
              <div className="ss-deliv-text-wrap">
                <strong>Key Deliverable:</strong> <span>{currentStage.deliverable}</span>
              </div>
            </div>

            {/* Bottom Navigation & Progress Dots */}
            <div className="ss-journey-nav-footer">
              <div className="ss-journey-nav-buttons">
                {/* Previous Button */}
                <button
                  type="button"
                  className="ss-journey-prev-button"
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                  aria-label="Previous step"
                >
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  className="ss-journey-next-button"
                  onClick={handleNextClick}
                  aria-label={getNextButtonLabel()}
                >
                  <span>{getNextButtonLabel()}</span>
                  <ArrowRight size={16} className="ss-btn-arrow-right" />
                </button>
              </div>

              {/* Progress Indicators (4 Dots / Elongated Active Pill) */}
              <div className="ss-journey-progress-pills" role="tablist" aria-label="Stage indicators">
                {stages.map((st, i) => (
                  <button
                    key={st.id}
                    type="button"
                    role="tab"
                    aria-selected={activeStep === i}
                    aria-label={`Jump to stage ${i + 1}: ${st.title}`}
                    className={`ss-journey-dot-indicator ${activeStep === i ? 'active' : ''}`}
                    onClick={() => setActiveStep(i)}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT VISUAL AREA (~32%) WITH ELEGANT CONCAVE CURVED DIVIDER */}
          <div className="ss-journey-visual-col">
            
            {/* Visual Photography / Composition */}
            <div className="ss-journey-photo-frame">
              <img
                key={currentStage.id}
                src={currentStage.image}
                alt={currentStage.alt}
                className="ss-journey-stage-img"
                style={{ objectPosition: currentStage.objectPosition || 'center center' }}
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/insights/founder-to-professional-management-india.png';
                }}
              />
            </div>

            {/* Concave Curved Divider SVG */}
            <div className="ss-journey-concave-divider" aria-hidden="true">
              <svg
                viewBox="0 0 100 500"
                fill="none"
                preserveAspectRatio="none"
                className="ss-concave-svg"
              >
                {/* Outer Glow */}
                <path
                  d="M 100 0 C 18 130, 18 370, 100 500"
                  stroke="url(#journeyCurveOuterGlow)"
                  strokeWidth="8"
                  opacity="0.25"
                />
                {/* Crisp Separator Line */}
                <path
                  d="M 100 0 C 18 130, 18 370, 100 500"
                  stroke="url(#journeyCurveGoldLine)"
                  strokeWidth="2.5"
                />
                {/* Left Solid White Mask */}
                <path
                  d="M 0 0 L 100 0 C 18 130, 18 370, 100 500 L 0 500 Z"
                  fill="#FFFFFF"
                />
                <defs>
                  <linearGradient id="journeyCurveGoldLine" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFA66B" />
                    <stop offset="50%" stopColor="#FF6B00" />
                    <stop offset="100%" stopColor="#FFA66B" />
                  </linearGradient>
                  <linearGradient id="journeyCurveOuterGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD4B8" />
                    <stop offset="50%" stopColor="#FF8A33" />
                    <stop offset="100%" stopColor="#FFD4B8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
