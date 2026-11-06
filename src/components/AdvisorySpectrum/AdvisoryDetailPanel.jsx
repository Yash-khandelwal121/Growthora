import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * AdvisoryDetailPanel displays the active practice showcase.
 * Matches the reference screenshot:
 * - Rounded purple icon box
 * - "PRACTICE 01 / 09" orange badge pill
 * - Heading and comprehensive description
 * - Two-column Key Services Include with orange checkmarks
 * - Explore Practice Details & Book Consultation action buttons
 * - Subtle ascending bars & arrow watermark in background
 * - Framer Motion smooth fade & slide transitions
 */
export const AdvisoryDetailPanel = ({
  service,
  onExploreService,
  onBookConsultation,
}) => {
  const Icon = service.icon;

  return (
    <div className="advisory-panel-card">
      {/* Decorative Subtle Growth Watermark (Bottom Right) */}
      <div className="advisory-panel-watermark" aria-hidden="true">
        <svg viewBox="0 0 240 180" width="100%" height="100%">
          <rect x="70" y="130" width="16" height="40" rx="3" fill="#4B0B63" />
          <rect x="96" y="110" width="16" height="60" rx="3" fill="#FF5A00" />
          <rect x="122" y="85" width="16" height="85" rx="3" fill="#4B0B63" />
          <rect x="148" y="60" width="16" height="110" rx="3" fill="#FF5A00" />
          <rect x="174" y="30" width="16" height="140" rx="3" fill="#FF5A00" />
          <path
            d="M 50 155 C 100 150, 140 110, 195 24"
            fill="none"
            stroke="#FF5A00"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="195,24 175,28 185,46" fill="#FF5A00" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Info Area */}
          <div>
            <div className="advisory-panel-header-row">
              {/* Rounded Square Purple Icon Box */}
              <div className="advisory-panel-icon-box">
                <Icon size={28} color="#4B0B63" strokeWidth={2.3} />
              </div>

              {/* Title & Badge */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="advisory-panel-badge">
                  PRACTICE {service.code} / 09
                </div>

                <h3 className="advisory-panel-title">{service.heading}</h3>

                <p className="advisory-panel-desc">{service.description}</p>
              </div>
            </div>

            {/* Key Services Include Heading */}
            <div className="advisory-panel-services-header">
              <span className="advisory-panel-services-title">
                Key Services Include
              </span>
              <div className="advisory-panel-services-rule" />
            </div>

            {/* Two-Column Grid of Key Services */}
            <div className="advisory-panel-services-grid">
              {service.items.map((item, idx) => (
                <div key={idx} className="advisory-panel-service-item">
                  <CheckCircle2
                    size={16}
                    color="#FF5A00"
                    strokeWidth={2.5}
                    style={{ flexShrink: 0 }}
                  />
                  <span className="advisory-panel-item-text">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="advisory-panel-actions">
            <button
              type="button"
              onClick={() => onExploreService(service.path)}
              className="advisory-btn-secondary"
            >
              <span>Explore Practice Details</span>
              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              onClick={() => onBookConsultation(service)}
              className="advisory-btn-primary"
            >
              <span>Book Consultation</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
