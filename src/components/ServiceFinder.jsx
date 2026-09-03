import React, { useState } from 'react';
import { SERVICE_FINDER_OPTIONS, SERVICES_DATA } from '../data/servicesData';
import { Compass, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const ServiceFinder = ({ onSelectCategory, onOpenConsultation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedOption = SERVICE_FINDER_OPTIONS[selectedIndex];
  const matchedService = SERVICES_DATA.find((s) => s.id === selectedOption.targetId) || SERVICES_DATA[0];

  const handleApplyFinder = () => {
    onSelectCategory(matchedService.id);
  };

  return (
    <section className="service-finder-section" id="finder">
      <div className="finder-container">
        
        {/* Section Header */}
        <div className="finder-header">
          <div className="eyebrow-badge">
            <Compass size={14} />
            <span>INTERACTIVE ADVISORY FINDER</span>
          </div>
          <h2 className="finder-title">Not Sure Where to Start?</h2>
          <p className="finder-sub">
            Tell us what your business needs. We'll point you in the right direction.
          </p>
        </div>

        {/* Interactive Grid Options */}
        <div className="finder-body-grid">
          
          {/* Options Column */}
          <div className="finder-options-list" role="radiogroup" aria-label="Business Goals">
            {SERVICE_FINDER_OPTIONS.map((opt, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`finder-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <span className="radio-circle">
                    {isSelected && <span className="radio-inner" />}
                  </span>
                  <span className="option-label">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Result Recommendation Card */}
          <div className="finder-result-card">
            <div className="result-badge-row">
              <span className="recommended-tag">
                <Sparkles size={14} />
                Recommended Practice
              </span>
              <span className="result-num">{matchedService.num}</span>
            </div>

            <h3 className="result-title">{matchedService.title}</h3>
            <p className="result-desc">{matchedService.description}</p>

            <div className="result-highlights">
              <span className="highlights-label">Key Included Offerings:</span>
              <div className="result-pills">
                {matchedService.included.slice(0, 3).map((inc, i) => (
                  <span key={i} className="res-pill">
                    <CheckCircle2 size={12} />
                    {inc}
                  </span>
                ))}
              </div>
            </div>

            <div className="result-actions">
              <button
                type="button"
                className="btn-finder-primary"
                onClick={handleApplyFinder}
              >
                <span>Find My Service</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn-finder-consult"
                onClick={() => onOpenConsultation(matchedService)}
              >
                Book Call For This Service
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
