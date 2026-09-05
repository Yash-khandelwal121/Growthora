import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ArrowRight, ArrowLeft, Building, TrendingUp, Award, 
  Sparkles, Scale, Sliders, Gift, BarChart3, Calculator, Check, ShieldCheck, 
  Lock, PhoneCall
} from 'lucide-react';
import '../styles/consultationModal.css';

export const ConsultationModal = ({ isOpen, onClose, selectedService }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    selectedNeed: 'Business Registration',
    businessStage: 'New Business',
    businessType: 'Private Limited',
    turnover: 'Pre-Revenue',
    requirement: 'Start my business',
    fullName: '',
    phone: '',
    email: '',
    city: '',
    companyName: '',
    agreed: true
  });

  // Pre-select service on open
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setStep(1);
      if (selectedService && selectedService.title) {
        setFormData((prev) => ({
          ...prev,
          selectedNeed: selectedService.title
        }));
      }
    }
  }, [isOpen, selectedService]);

  // Lock body scroll & Handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Step 1 Need Options
  const needsList = [
    { title: 'Business Registration', icon: Building, desc: 'Company incorporation, GST, Udyam & setup' },
    { title: 'Finance & Funding', icon: TrendingUp, desc: 'Grants, debt, equity & MSME loans' },
    { title: 'Certifications & Compliance', icon: Award, desc: 'ISO, Startup India, FSSAI & ZED' },
    { title: 'Branding & Marketing', icon: Sparkles, desc: 'Logo, website, SEO & brand identity' },
    { title: 'Legal & CA', icon: Scale, desc: 'Agreements, IP, ROC filings & CA support' },
    { title: 'Operations', icon: Sliders, desc: 'HR, CRM, sales & customer workflows' },
    { title: 'MSME Benefits', icon: Gift, desc: 'Subsidies, duty exemptions & schemes' },
    { title: 'IPO & Capital Markets', icon: BarChart3, desc: 'SME listing & DRHP readiness' },
    { title: 'Business Valuation', icon: Calculator, desc: 'FEMA, M&A & fundraising models' }
  ];

  // Step 2 Profile Options
  const stagesList = ['Idea Stage', 'New Business', 'Early Stage (1–3 Years)', 'Established Business (3+ Years)'];
  const typesList = ['Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Other'];
  const turnoverList = ['Pre-Revenue', 'Below ₹10 Lakh', '₹10 Lakh – ₹50 Lakh', '₹50 Lakh – ₹2 Crore', '₹2 Crore+'];

  // Step 3 Requirement Options
  const reqList = [
    'Start my business',
    'Raise funding',
    'Get government benefits',
    'Improve compliance',
    'Build my brand',
    'Improve business operations',
    'Prepare for growth',
    'Business valuation',
    'IPO readiness',
    'Not sure — I need guidance'
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isStepValid = () => {
    if (step === 1) return !!formData.selectedNeed;
    if (step === 2) return !!(formData.businessStage && formData.businessType && formData.turnover);
    if (step === 3) return !!formData.requirement;
    if (step === 4) return !!(formData.fullName && formData.phone && formData.email && formData.city && formData.agreed);
    return true;
  };

  return (
    <div className="growthora-modal-overlay" onClick={onClose}>
      <div className="growthora-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* LEFT PANEL: VISUAL BRANDING */}
        <div className="growthora-modal-left">
          <div>
            <div className="modal-brand-header">
              <img src="/growthora_logo.jpg" alt="Growthora Advisory" className="modal-brand-logo" />
              <span className="modal-brand-badge">GROWTHORA ADVISORY</span>
            </div>

            <div className="modal-left-body">
              <h3 className="modal-left-title">Your Growth Journey Starts Here</h3>
              
              {/* Stylized Journey Road */}
              <div className="growth-journey-track">
                <div className={`journey-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                  <span className="node-number">{step > 1 ? <Check size={14} /> : '01'}</span>
                  <span className="node-label">START</span>
                </div>
                <div className={`journey-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                  <span className="node-number">{step > 2 ? <Check size={14} /> : '02'}</span>
                  <span className="node-label">BUILD</span>
                </div>
                <div className={`journey-node ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                  <span className="node-number">{step > 3 ? <Check size={14} /> : '03'}</span>
                  <span className="node-label">GROW</span>
                </div>
                <div className={`journey-node ${step >= 4 ? 'active' : ''}`}>
                  <span className="node-number">04</span>
                  <span className="node-label">SCALE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-left-trust">
            <div className="trust-item"><CheckCircle2 size={15} /> Local Expertise</div>
            <div className="trust-item"><CheckCircle2 size={15} /> Trust & Integrity</div>
            <div className="trust-item"><CheckCircle2 size={15} /> Strategic Growth</div>
          </div>
        </div>

        {/* RIGHT PANEL: INTERACTIVE WIZARD */}
        <div className="growthora-modal-right">
          
          {!submitted ? (
            <>
              <div>
                {/* Step Progress Header */}
                <div className="modal-step-header">
                  <div className="progress-info-row">
                    <span className="step-count-badge">STEP {step} OF 4</span>
                    <span className="percentage-badge">{step * 25}% Complete</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${step * 25}%` }} />
                  </div>
                </div>

                {/* STEP 1: BUSINESS NEED */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <h2 className="step-heading">How can Growthora help your business?</h2>
                    <div className="cards-grid-3col">
                      {needsList.map((item, idx) => {
                        const isSelected = formData.selectedNeed === item.title;
                        const Icon = item.icon;
                        return (
                          <div 
                            key={idx}
                            className={`selectable-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, selectedNeed: item.title })}
                          >
                            <div className="card-icon-box">
                              <Icon size={18} />
                            </div>
                            <div className="card-title-text">{item.title}</div>
                            <div className="card-desc-text">{item.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: BUSINESS PROFILE */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <h2 className="step-heading">Tell us about your business</h2>
                    
                    {/* Business Stage */}
                    <div className="profile-section-block">
                      <label className="profile-section-label">Business Stage</label>
                      <div className="pills-option-grid">
                        {stagesList.map((stg, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`pill-option-btn ${formData.businessStage === stg ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, businessStage: stg })}
                          >
                            {stg}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Business Type */}
                    <div className="profile-section-block">
                      <label className="profile-section-label">Business Type</label>
                      <div className="pills-option-grid">
                        {typesList.map((type, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`pill-option-btn ${formData.businessType === type ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, businessType: type })}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Annual Turnover */}
                    <div className="profile-section-block">
                      <label className="profile-section-label">Annual Turnover</label>
                      <div className="pills-option-grid">
                        {turnoverList.map((to, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`pill-option-btn ${formData.turnover === to ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, turnover: to })}
                          >
                            {to}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: REQUIREMENT */}
                {step === 3 && (
                  <div className="animate-fade-in">
                    <h2 className="step-heading">What is your current requirement?</h2>
                    <div className="req-grid-2col">
                      {reqList.map((req, idx) => {
                        const isSelected = formData.requirement === req;
                        return (
                          <div
                            key={idx}
                            className={`req-option-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, requirement: req })}
                          >
                            <span>{req}</span>
                            {isSelected && <Check size={16} color="#FF7200" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: CONTACT DETAILS */}
                {step === 4 && (
                  <div className="animate-fade-in">
                    <h2 className="step-heading">Let's build your next success story.</h2>
                    <form id="consultation-final-form" onSubmit={handleSubmit}>
                      <div className="contact-form-grid">
                        <div className="contact-input-field">
                          <label htmlFor="fullName">Full Name *</label>
                          <input
                            id="fullName"
                            type="text"
                            required
                            placeholder="e.g. Rajesh Kumar"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          />
                        </div>

                        <div className="contact-input-field">
                          <label htmlFor="phone">Mobile Number *</label>
                          <input
                            id="phone"
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>

                        <div className="contact-input-field">
                          <label htmlFor="email">Email Address *</label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="rajesh@company.in"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        <div className="contact-input-field">
                          <label htmlFor="city">City *</label>
                          <input
                            id="city"
                            type="text"
                            required
                            placeholder="e.g. Ahmedabad, Mumbai"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="contact-input-field" style={{ marginBottom: '12px' }}>
                        <label htmlFor="companyName">Company / Business Name</label>
                        <input
                          id="companyName"
                          type="text"
                          placeholder="e.g. Acme Enterprises Pvt Ltd"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>

                      <div className="agree-checkbox-row">
                        <input
                          id="agree"
                          type="checkbox"
                          checked={formData.agreed}
                          onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                        />
                        <label htmlFor="agree">
                          I agree to be contacted by Growthora Advisory regarding my enquiry.
                        </label>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Wizard Control Buttons */}
              <div className="modal-controls-row">
                {step > 1 ? (
                  <button type="button" className="btn-wizard-back" onClick={handleBack}>
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button 
                    type="button" 
                    className="btn-wizard-next" 
                    disabled={!isStepValid()}
                    onClick={handleNext}
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    form="consultation-final-form" 
                    className="btn-wizard-next"
                    disabled={!isStepValid()}
                  >
                    <span>Get My Free Consultation</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="success-modal-body animate-scale-up">
              <div className="success-check-badge">
                <CheckCircle2 size={44} />
              </div>
              <h2 className="success-modal-title">You're All Set!</h2>
              <p className="success-modal-desc">
                Thank you for choosing <strong>Growthora Advisory</strong>. Our senior advisory team will review your requirements for <strong>{formData.selectedNeed}</strong> and get in touch with you shortly.
              </p>
              <button
                type="button"
                className="btn-wizard-next"
                style={{ padding: '14px 36px', fontSize: '1rem' }}
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  onClose();
                }}
              >
                Back to Website
              </button>
            </div>
          )}
        </div>

        {/* BOTTOM NAVY TRUST STRIP */}
        <div className="modal-bottom-trust-strip">
          <div className="trust-badges-list">
            <span className="trust-badge-item"><ShieldCheck size={14} /> 100% Secure</span>
            <span className="trust-badge-item"><Lock size={14} /> No Spam</span>
            <span className="trust-badge-item"><PhoneCall size={14} /> Expert Consultation</span>
          </div>
          <div style={{ fontWeight: '600' }}>
            One Stop Solution For All Your Business Growth Needs • Funding • Compliance • Growth • Sustainability
          </div>
        </div>

      </div>
    </div>
  );
};
