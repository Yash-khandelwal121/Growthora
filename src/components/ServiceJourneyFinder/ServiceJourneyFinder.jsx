import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FileText,
  Coins,
  Award,
  Laptop,
  Scale,
  Settings,
  Landmark,
  Rocket,
  BarChart3,
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import elephantGrowthImg from '../../assets/elephant_growth_journey.png';
import './serviceJourneyFinder.css';

// 9 Clickable Services for the Right-Side Selection Grid
const ADVISORY_PRACTICES = [
  {
    id: 1,
    code: '01',
    name: 'Registration',
    title: 'Registration Advisory',
    icon: FileText,
    path: '/services/registration',
    description:
      'Set up your business the right way with complete registration support, correct entity sequencing, and all initial tax filings handled.',
    offerings: [
      'Private Limited Company',
      'LLP & OPC Setup',
      'GST Registration',
      'Udyam Registration',
      'GeM Portal Onboarding',
    ],
  },
  {
    id: 2,
    code: '02',
    name: 'Funding',
    title: 'Capital & Advisory Financing',
    icon: Coins,
    path: '/services/finance-funding',
    description:
      'We map your business to the right capital — grants, debt, or equity — prepare lender-ready documentation, and drive the process through to disbursement.',
    offerings: [
      'Grant Funding',
      'Debt & Bank Funding',
      'Equity Funding',
      'CGTMSE & PMEGP Loans',
      'DPR & CMA Reports',
    ],
  },
  {
    id: 3,
    code: '03',
    name: 'Certifications',
    title: 'Quality & Certifications',
    icon: Award,
    path: '/services/certifications',
    description:
      'Gain customer trust, tender eligibility, and global standard approvals with recognized certifications and quality frameworks.',
    offerings: [
      'ISO 9001 / 14001 / 45001',
      'ZED Certification for MSMEs',
      'CE & GMP Approvals',
      'FSSAI Licensing',
      'BIS & Halal Certification',
    ],
  },
  {
    id: 4,
    code: '04',
    name: 'Branding & Website',
    title: 'Branding & Digital Presence',
    icon: Laptop,
    path: '/services/branding',
    description:
      'Build an enduring business identity with professional brand design, trademark protection, modern website development, and high-impact digital presence.',
    offerings: [
      'Trademark Registration',
      'Brand Identity & Guidelines',
      'Corporate Website Development',
      'High-Impact Digital Growth',
      'UI/UX Design',
    ],
  },
  {
    id: 5,
    code: '05',
    name: 'Legal & CA Support',
    title: 'Legal & Statutory Compliance',
    icon: Scale,
    path: '/services/legal-ca',
    description:
      'Comprehensive legal structuring, contract drafting, statutory RoC filings, income tax, and regular compliance monitoring.',
    offerings: [
      'Statutory Audits & Tax Filings',
      'Founders Agreement & Contracts',
      'Annual RoC Compliances',
      'Notice & Litigation Advisory',
      'Secretarial Audit',
    ],
  },
  {
    id: 6,
    code: '06',
    name: 'Operations Support',
    title: 'Operations & Enterprise Systems',
    icon: Settings,
    path: '/services/operations',
    description:
      'Streamline standard operating procedures (SOPs), automate repetitive workflows, optimize supply chains, and integrate tailored ERP systems.',
    offerings: [
      'SOP Design & Rollout',
      'Workflow Process Automation',
      'Supply Chain Optimization',
      'Custom ERP Integration',
      'Cost Optimization',
    ],
  },
  {
    id: 7,
    code: '07',
    name: 'Govt. Schemes',
    title: 'Government Schemes & Subsidies',
    icon: Landmark,
    path: '/services/msme-benefits',
    description:
      'Unlock government capital subsidies, interest subventions, concessional industrial electricity tariffs, and public procurement preferences.',
    offerings: [
      'Capital Investment Subsidies',
      'Interest Subvention Schemes',
      'Power Tariff Concessions',
      'Tender Fee Exemptions',
      'State Industrial Benefits',
    ],
  },
  {
    id: 8,
    code: '08',
    name: 'IPO Advisory',
    title: 'SME IPO Advisory & Listing',
    icon: Rocket,
    path: '/services/ipo',
    description:
      'Transition from private enterprise to public entity with end-to-end BSE SME / NSE Emerge IPO readiness, merchant banking, and listing advisory.',
    offerings: [
      'IPO Readiness Assessment',
      'DRHP Document Filing',
      'Merchant Banking Coordination',
      'Roadshows & Investor Outreach',
      'Exchange Pre-approvals',
    ],
  },
  {
    id: 9,
    code: '09',
    name: 'Valuation',
    title: 'Enterprise Valuation Advisory',
    icon: BarChart3,
    path: '/services/valuation',
    description:
      'Certified enterprise valuation reports under Companies Act, Income Tax Rules, FEMA, and IBBI Registered Valuers for fundraising & restructuring.',
    offerings: [
      'IBBI Registered Valuations',
      'DCF & Relative Methodologies',
      'FEMA Cross-Border Valuations',
      'Mergers & Share Swap Ratios',
      'Fair Value Assessment',
    ],
  },
];

// 5 Connected Stages for the Business Growth Timeline
const TIMELINE_STAGES = [
  {
    code: '01',
    label: 'START',
    icon: Settings,
    color: '#FF6500',
    bgColor: '#FFF7F1',
    borderColor: '#FFD6BF',
  },
  {
    code: '02',
    label: 'COMPLY',
    icon: ShieldCheck,
    color: '#4B1164',
    bgColor: '#FAF2FC',
    borderColor: '#E8D2EF',
  },
  {
    code: '03',
    label: 'FUND',
    icon: Coins,
    color: '#FF6500',
    bgColor: '#FFF7F1',
    borderColor: '#FFD6BF',
  },
  {
    code: '04',
    label: 'GROW',
    icon: TrendingUp,
    color: '#4B1164',
    bgColor: '#FAF2FC',
    borderColor: '#E8D2EF',
  },
  {
    code: '05',
    label: 'SCALE',
    icon: Trophy,
    color: '#FF6500',
    bgColor: '#FFF7F1',
    borderColor: '#FFD6BF',
  },
];

// 3 Bottom Horizontal Benefits
const BOTTOM_BENEFITS = [
  { id: 1, title: 'Expert Advisory', icon: TrendingUp },
  { id: 2, title: 'End-to-End Support', icon: Users },
  { id: 3, title: 'Growth Focused', icon: Target },
];

// Service Journey Finder Component
export function ServiceJourneyFinder({ onOpenConsultation }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Selected Service Index (0..8)
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activePractice = ADVISORY_PRACTICES[selectedIndex] || ADVISORY_PRACTICES[0];
  const ActiveIcon = activePractice.icon;

  const handleSelectService = (index) => {
    setSelectedIndex(index);
  };

  const handleExploreClick = () => {
    if (activePractice.path) {
      navigate(activePractice.path);
    }
  };

  const handleConsultationClick = () => {
    if (typeof onOpenConsultation === 'function') {
      onOpenConsultation(activePractice);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="s2-journey-finder-section"
      aria-label="Business Growth Journey and Service Finder"
    >
      <div className="s2-journey-finder-container">
        <div className="s2-journey-finder-grid">
          {/* =================================================================
              LEFT COLUMN — 52%: BUSINESS GROWTH JOURNEY
              ================================================================= */}
          <div className="s2-journey-card">
            {/* Small Orange Tag: — ONE */}
            <div className="s2-journey-tag">
              <span className="s2-journey-dash" aria-hidden="true" />
              <span className="s2-journey-tag-text">ONE</span>
            </div>

            {/* Main Heading: ONE PARTNER. EVERY STAGE. */}
            <div className="s2-journey-heading-wrap">
              <h2 className="s2-journey-main-heading">
                <span className="s2-heading-purple">ONE PARTNER.</span>
                <br />
                <span className="s2-heading-orange-wrap">
                  <span className="s2-heading-orange">EVERY STAGE.</span>
                  {/* Orange curved decorative underline */}
                  <svg
                    className="s2-heading-underline-svg"
                    viewBox="0 0 280 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 6 8 C 80 18, 190 18, 274 7"
                      stroke="#FF6500"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="s2-journey-description">
                A complete advisory journey for businesses at every step from setup
                and compliance to funding, growth and value creation.
              </p>
            </div>

            {/* Business Growth Illustration: Correctly scaled (35-40% reduced), clean, no duplicate arrow */}
            <motion.div
              className="growth-illustration"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={elephantGrowthImg}
                alt="Realistic elephant walking out of a glowing orange doorway stepping up the five business growth stages"
                className="growth-illustration-img"
                loading="lazy"
              />
            </motion.div>

            {/* From Vision to Victory. Section */}
            <div className="s2-vision-block">
              <span className="s2-vision-dash" aria-hidden="true" />
              <h3 className="s2-vision-title">From Vision to Victory.</h3>
              <p className="s2-vision-subtitle">
                Every successful business starts with the right guidance.
              </p>
            </div>

            {/* Five-Stage Connected Growth Journey Timeline */}
            <div className="s2-timeline-container" aria-label="Five-stage business growth timeline">
              {/* Base connecting line */}
              <div className="s2-timeline-track-base" aria-hidden="true" />

              {/* Animated filling line from left to right */}
              <motion.div
                className="s2-timeline-track-fill"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                aria-hidden="true"
              />

              {/* Intermediate milestone connection dots */}
              {[12.5, 37.5, 62.5, 87.5].map((pct, dotIdx) => (
                <motion.div
                  key={`dot-${dotIdx}`}
                  className="s2-timeline-mid-dot"
                  style={{ left: `${pct}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.25 + dotIdx * 0.35, ease: 'easeOut' }}
                  aria-hidden="true"
                />
              ))}

              {/* 5 Connected Milestone Nodes */}
              <div className="s2-timeline-stages-row">
                {TIMELINE_STAGES.map((stage, idx) => {
                  const StageIcon = stage.icon;
                  return (
                    <motion.div
                      key={stage.code}
                      className="s2-timeline-node"
                      initial={{ opacity: 0, y: 8, scale: 0.92 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{
                        duration: 0.45,
                        delay: 0.15 + idx * 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div
                        className="s2-timeline-circle"
                        style={{
                          backgroundColor: stage.bgColor,
                          borderColor: stage.borderColor,
                        }}
                      >
                        <StageIcon size={20} color={stage.color} strokeWidth={2.4} />
                      </div>

                      <span className="s2-timeline-stage-num">{stage.code}</span>
                      <span className="s2-timeline-stage-label">{stage.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Milestone Tagline */}
            <div className="s2-milestone-tagline">
              <span className="s2-tagline-dash" aria-hidden="true" />
              <span className="s2-tagline-text">ONE PARTNER. EVERY MILESTONE</span>
              <span className="s2-tagline-dash" aria-hidden="true" />
            </div>

            {/* Bottom 3 Horizontal Benefits */}
            <div className="s2-journey-benefits-bar">
              {BOTTOM_BENEFITS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <React.Fragment key={item.id}>
                    <div className="s2-benefit-item">
                      <div className="s2-benefit-icon-wrap" aria-hidden="true">
                        <Icon size={19} strokeWidth={2.4} />
                      </div>
                      <span className="s2-benefit-title">{item.title}</span>
                    </div>

                    {idx < BOTTOM_BENEFITS.length - 1 && (
                      <div className="s2-benefit-divider" aria-hidden="true" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN — 48%: SERVICE RECOMMENDATION & ADVISORY FINDER
              ================================================================= */}
          <div className="s2-finder-card">
            {/* Header: Not Sure Where to Start? */}
            <div className="s2-finder-header">
              <h2 className="s2-finder-main-title">
                <span className="s2-title-purple">Not Sure Where to </span>
                <span className="s2-title-orange">Start?</span>
              </h2>
              <p className="s2-finder-subtext">
                Tell us your business need and get a personalised service recommendation.
              </p>
            </div>

            {/* 9 Clickable Service Options (2-Column Grid, ~52px button height, 12px gap) */}
            <div
              className="s2-services-grid"
              role="radiogroup"
              aria-label="Select an advisory practice"
            >
              {ADVISORY_PRACTICES.map((svc, idx) => {
                const IconComponent = svc.icon;
                const isSelected = selectedIndex === idx;

                return (
                  <button
                    key={svc.id}
                    type="button"
                    className={`s2-service-opt-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectService(idx)}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <span className="s2-service-opt-icon" aria-hidden="true">
                      <IconComponent size={19} strokeWidth={2.3} />
                    </span>
                    <span className="s2-service-opt-label">{svc.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Recommended Practice Panel (Directly below grid with ~24px spacing, no gap) */}
            <div className="s2-recommendation-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePractice.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="s2-rec-content-block"
                >
                  {/* Top Row: Sparkle Badge & Practice Number */}
                  <div className="s2-rec-top-row">
                    <div className="s2-rec-pill-badge">
                      <Sparkles size={12} strokeWidth={2.5} className="s2-sparkle-icon" />
                      <span>RECOMMENDED PRACTICE</span>
                    </div>
                    <span className="s2-rec-number-badge">{activePractice.code}</span>
                  </div>

                  {/* Service Header: Large Orange Icon Box + Title */}
                  <div className="s2-rec-hero-header">
                    <div className="s2-rec-icon-box" aria-hidden="true">
                      <ActiveIcon size={22} strokeWidth={2.3} />
                    </div>
                    <div className="s2-rec-title-wrap">
                      <h3 className="s2-rec-main-title">{activePractice.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="s2-rec-description-text">{activePractice.description}</p>

                  {/* Key Included Offerings */}
                  <div className="s2-rec-offerings-box">
                    <span className="s2-offerings-label">KEY INCLUDED OFFERINGS:</span>
                    <div className="s2-offerings-chips-grid">
                      {activePractice.offerings.map((item) => (
                        <div key={item} className="s2-offering-chip">
                          <CheckCircle2
                            size={13}
                            strokeWidth={2.5}
                            className="s2-chip-check-icon"
                          />
                          <span className="s2-chip-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons: Primary & Secondary */}
              <div className="s2-rec-action-buttons">
                {/* Primary: Explore This Practice */}
                <button
                  type="button"
                  className="s2-btn-explore-practice"
                  onClick={handleExploreClick}
                >
                  <span>Explore This Practice</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>

                {/* Secondary: Book a Free Consultation */}
                <button
                  type="button"
                  className="s2-btn-consultation"
                  onClick={handleConsultationClick}
                >
                  <Calendar size={15} strokeWidth={2.3} className="s2-consult-cal-icon" />
                  <span>Book a Free Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceJourneyFinder;
