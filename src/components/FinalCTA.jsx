import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';

export const FinalCTA = ({ onOpenConsultation, onOpenAskGrowthora }) => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    navigate('/book-consultation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="final-cta-section">
      <div className="cta-card-wrapper">
        <div className="cta-glow-circle" />
        
        <div className="cta-content">
          <h2 className="cta-heading">
            Find Out What Your Business Qualifies For.
          </h2>

          <p className="cta-description">
            Book a call with an advisor. No obligation, no jargon — just a clear next step for your business.
          </p>

          <div className="cta-buttons-group">
            <button
              type="button"
              className="btn-cta-primary"
              onClick={handleConsultationClick}
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn-cta-secondary"
              onClick={handleConsultationClick}
            >
              <PhoneCall size={16} />
              <span>Talk to an Expert</span>
            </button>
          </div>

          <div className="cta-reassurance">
            <CheckCircle2 size={14} className="reassurance-icon" />
            <span>No commitment. No pitch. Just a clear next step.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
