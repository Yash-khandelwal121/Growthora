import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  ArrowRight,
  PhoneCall,
  Headset,
} from 'lucide-react';
import { BusinessGrowthInfographic } from './BusinessGrowthInfographic';
import './serviceFaq.css';

const FAQS_DATA = [
  {
    id: 1,
    code: '01',
    question: 'How do I choose the right service for my business?',
    answer:
      'Select your business requirement in the Advisory Finder above to get a tailored service recommendation, or book a free consultation with our senior advisory team.',
  },
  {
    id: 2,
    code: '02',
    question: 'Can Growthora help with government schemes and funding?',
    answer:
      'Yes, Growthora provides end-to-end advisory and execution for government loan programs like CGTMSE, PMEGP, Mudra loans, state industrial capital subsidies, interest subvention, and technology upgradation schemes, including preparation of bank-ready Project Reports (DPR).',
  },
  {
    id: 3,
    code: '03',
    question: 'How long does the registration process take?',
    answer:
      'Most standard statutory registrations (Private Limited Company, LLP, Udyam, GST) take between 3 to 7 working days once all documentation is in order, fully coordinated by our dedicated compliance officers.',
  },
];

export function ServiceFAQ({ onOpenConsultation }) {
  // FAQ 01 expanded by default as per requirement
  const [openIndex, setOpenIndex] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleCtaClick = () => {
    if (typeof onOpenConsultation === 'function') {
      onOpenConsultation();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="s2-faq-section-wrapper"
      aria-label="Frequently Asked Questions & Growth Visualization"
    >
      {/* Background Soft Peach Ambient Waves */}
      <div className="s2-faq-ambient-glow" aria-hidden="true" />
      <div className="s2-faq-curve-bg" aria-hidden="true">
        <svg viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <path
            d="M 680 0 C 950 120, 1220 60, 1440 180 L 1440 600 L 0 600 L 0 350 C 240 450, 480 320, 680 0 Z"
            fill="url(#s2FaqBgGrad)"
            opacity="0.45"
          />
          <defs>
            <linearGradient id="s2FaqBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE7D6" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#FFF2E8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="s2-faq-container">
        {/* ===================================================================
            MAIN TWO-COLUMN LAYOUT: 52% LEFT (FAQ) / 48% RIGHT (ILLUSTRATION)
            =================================================================== */}
        <div className="s2-faq-grid">
          {/* LEFT COLUMN — 52%: FAQ HEADER & ACCORDION CARDS */}
          <div className="s2-faq-left-col">
            {/* Top Pill Badge: (?) FAQs */}
            <motion.div
              className="s2-faq-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="s2-faq-badge-icon" aria-hidden="true">
                <HelpCircle size={15} strokeWidth={2.6} />
              </div>
              <span className="s2-faq-badge-text">FAQs</span>
            </motion.div>

            {/* Main Heading: "Frequently Asked Questions" with orange curved underline */}
            <motion.div
              className="s2-faq-title-group"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="s2-faq-main-heading">
                <span className="s2-faq-title-purple">Frequently Asked </span>
                <span className="s2-faq-title-orange-wrap">
                  <span className="s2-faq-title-orange">Questions</span>
                  {/* Distinct curved orange underline arc */}
                  <svg
                    className="s2-faq-title-underline"
                    viewBox="0 0 170 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 8 C 48 16, 122 16, 166 6"
                      stroke="#FF6500"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="s2-faq-desc">
                Find quick answers to common questions about our advisory services.
              </p>
            </motion.div>

            {/* Three Interactive Accordion Cards */}
            <div className="s2-faq-accordion-list" role="region" aria-label="FAQ Accordion">
              {FAQS_DATA.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={faq.id}
                    className={`s2-faq-card ${isOpen ? 'is-open' : ''}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: 0.18 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      type="button"
                      className="s2-faq-card-trigger"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <div className="s2-faq-trigger-left">
                        <span className="s2-faq-num-badge">{faq.code}</span>
                        <span className="s2-faq-question-text">{faq.question}</span>
                      </div>

                      <div
                        className={`s2-faq-chevron-pill ${isOpen ? 'active-open' : ''}`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <ChevronUp size={18} strokeWidth={2.6} />
                        ) : (
                          <ChevronDown size={18} strokeWidth={2.4} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          key="faq-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="s2-faq-answer-collapse"
                        >
                          <div className="s2-faq-answer-body">
                            {/* Subtle vertical indicator line aligning under number */}
                            <div className="s2-faq-answer-line" aria-hidden="true" />
                            <p className="s2-faq-answer-text">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN — 48%: EXACT REFERENCE-BASED ANIMATED GROWTH INFOGRAPHIC */}
          <div className="s2-faq-right-col">
            <BusinessGrowthInfographic />
          </div>
        </div>

        {/* ===================================================================
            7. BOTTOM FULL-WIDTH CTA BANNER: ASYMMETRICAL WHITE-PEACH RIBBON
            =================================================================== */}
        <motion.div
          className="s2-faq-bottom-banner"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Asymmetrical Left Wave Ribbon Accent */}
          <div className="s2-banner-wave-accent" aria-hidden="true">
            <svg
              viewBox="0 0 80 120"
              fill="none"
              preserveAspectRatio="none"
              className="s2-banner-wave-svg"
            >
              <path
                d="M 0 10 C 35 35, 30 85, 0 115 L 0 120 L 0 0 Z"
                fill="url(#bannerAccentGrad)"
              />
              <path
                d="M 0 25 C 28 48, 24 82, 0 105"
                stroke="#FF6500"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="bannerAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA459" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FF6500" stopOpacity="0.08" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Left Side: Headset Icon + Heading + Subtext */}
          <div className="s2-banner-left">
            <div className="s2-banner-headset-circle" aria-hidden="true">
              <Headset size={32} strokeWidth={2.3} />
            </div>

            <div className="s2-banner-text-block">
              <h3 className="s2-banner-heading">
                <span className="s2-banner-title-purple">Have a Question or </span>
                <span className="s2-banner-title-orange">Need Expert Guidance?</span>
              </h3>
              <p className="s2-banner-subtext">
                Talk to our advisory experts and get the right support for your business,
                funding and compliance needs.
              </p>
            </div>
          </div>

          {/* Right Side: Two Pill Action Buttons */}
          <div className="s2-banner-actions">
            {/* Button 1: Book a Free Consultation */}
            <button
              type="button"
              className="s2-btn-pill-orange"
              onClick={handleCtaClick}
            >
              <Calendar size={18} strokeWidth={2.4} />
              <span>Book a Free Consultation</span>
              <ArrowRight size={16} strokeWidth={2.4} />
            </button>

            {/* Button 2: Talk to an Expert */}
            <button
              type="button"
              className="s2-btn-pill-outline"
              onClick={handleCtaClick}
            >
              <PhoneCall size={17} strokeWidth={2.3} />
              <span>Talk to an Expert</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServiceFAQ;

