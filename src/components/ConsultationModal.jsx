import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ArrowRight, ArrowLeft, Building, TrendingUp, Award, 
  Sparkles, Scale, Sliders, Gift, BarChart3, Calculator, Check, ShieldCheck, 
  Lock, PhoneCall, User, Mail, Phone, MapPin, Rocket, DollarSign, Landmark, 
  Megaphone, Settings, LineChart, HelpCircle, Lightbulb, Users, Briefcase, 
  Building2, MoreHorizontal, Layers, Shield, Zap
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

  // Step 1 Need Options (3x3 Grid)
  const needsList = [
    { title: 'Business Registration', icon: Building, color: '#3B82F6', bg: '#EFF6FF', desc: 'Start or structure your business' },
    { title: 'Finance & Funding', icon: TrendingUp, color: '#F97316', bg: '#FFF7ED', desc: 'Loans, grants, working capital & funding' },
    { title: 'Certifications & Compliance', icon: Award, color: '#10B981', bg: '#ECFDF5', desc: 'Government certifications and compliance' },
    { title: 'Branding & Marketing', icon: Megaphone, color: '#EF4444', bg: '#FEF2F2', desc: 'Build and grow your brand' },
    { title: 'Legal & CA', icon: Scale, color: '#D97706', bg: '#FFFBEB', desc: 'Legal, taxation and compliance support' },
    { title: 'Operations', icon: Sliders, color: '#8B5CF6', bg: '#F5F3FF', desc: 'HR, CRM, sales and business systems' },
    { title: 'MSME Benefits', icon: Gift, color: '#B45309', bg: '#FEF3C7', desc: 'Government schemes and MSME benefits' },
    { title: 'IPO & Capital Markets', icon: BarChart3, color: '#4F46E5', bg: '#EEF2FF', desc: 'Prepare for scale and public markets' },
    { title: 'Business Valuation', icon: Calculator, color: '#0284C7', bg: '#F0F9FF', desc: "Understand your company's value" }
  ];

  // Step 2 Profile Options
  const stagesList = [
    { label: 'Idea Stage', icon: Lightbulb },
    { label: 'New Business', icon: Rocket },
    { label: 'Early Stage (1–3 Years)', icon: TrendingUp },
    { label: 'Established (3+ Years)', icon: Building }
  ];

  const typesList = [
    { label: 'Proprietorship', icon: User },
    { label: 'Partnership', icon: Users },
    { label: 'LLP', icon: Briefcase },
    { label: 'Private Limited', icon: Building2 },
    { label: 'Other', icon: MoreHorizontal }
  ];

  const turnoverList = ['Pre-Revenue', 'Below ₹10 Lakh', '₹10 Lakh – ₹50 Lakh', '₹50 Lakh – ₹2 Crore', '₹2 Crore+'];

  // Step 3 Requirement Options
  const reqList = [
    { title: 'Start my business', icon: Rocket, bg: '#F5F3FF', color: '#8B5CF6' },
    { title: 'Raise funding', icon: DollarSign, bg: '#FEF3C7', color: '#D97706' },
    { title: 'Get government benefits', icon: Landmark, bg: '#EFF6FF', color: '#2563EB' },
    { title: 'Improve compliance', icon: ShieldCheck, bg: '#EEF2FF', color: '#4F46E5' },
    { title: 'Build my brand', icon: Megaphone, bg: '#FFF7ED', color: '#EA580C' },
    { title: 'Improve business operations', icon: Settings, bg: '#FFFBEB', color: '#CA8A04' },
    { title: 'Prepare for growth', icon: BarChart3, bg: '#F0FDF4', color: '#16A34A' },
    { title: 'Business valuation', icon: Calculator, bg: '#ECFDF5', color: '#059669' },
    { title: 'IPO readiness', icon: LineChart, bg: '#F0F9FF', color: '#0284C7' },
    { title: 'Not sure — I need guidance', icon: HelpCircle, bg: '#F8FAFC', color: '#475569' }
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
        
        {/* Close Icon Button */}
        <button type="button" className="modal-close-icon-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* LEFT PANEL: ULTRA PREMIUM LUXURY VISUAL DESIGN */}
        <div className="growthora-modal-left light-theme">
          
          {/* Top Logo Header */}
          <div className="modal-brand-header-group">
            <div className="modal-brand-logo-row">
              <img src="/growthora_logo.jpg" alt="Growthora Advisory" className="modal-brand-logo-img light-bg" />
              <div>
                <div className="modal-brand-name dark-text">GROWTHORA ADVISORY</div>
                <div className="modal-brand-tagline dark-sub">Guiding Growth. Empowering Futures.</div>
              </div>
            </div>
          </div>

          {/* Main Hero Title */}
          <div className="img1-hero-header">
            <h2 className="img1-main-headline">
              Your Growth <span className="img1-purple-text">Journey</span> Starts Here
            </h2>
            <p className="img1-main-subhead">
              From ideas to impact, we're with you at every step.
            </p>
          </div>

          {/* Split Journey Artwork: Timeline (Left) + 3D Winding Pathway Artwork (Right) */}
          <div className="img1-journey-split-container">
            {/* Vertical Step Timeline */}
            <div className="img1-vertical-timeline">
              <div className="img1-timeline-line" />
              
              {/* Step 1: START */}
              <div className="img1-timeline-step">
                <div className="img1-step-badge done">
                  <Check size={14} strokeWidth={3} />
                </div>
                <div>
                  <div className="img1-step-content-title">START</div>
                  <div className="img1-step-content-sub">Business Setup</div>
                </div>
              </div>

              {/* Step 2: BUILD */}
              <div className="img1-timeline-step">
                <div className={`img1-step-badge ${step >= 2 ? 'done' : 'upcoming'}`}>
                  {step >= 2 ? <Check size={14} strokeWidth={3} /> : '02'}
                </div>
                <div>
                  <div className="img1-step-content-title" style={{ color: step >= 2 ? '#1A102F' : '#64748B' }}>BUILD</div>
                  <div className="img1-step-content-sub">Compliance</div>
                </div>
              </div>

              {/* Step 3: GROW */}
              <div className="img1-timeline-step">
                <div className={`img1-step-badge ${step >= 3 ? 'done' : step === 3 ? 'active-orange' : 'upcoming'}`}>
                  {step > 3 ? <Check size={14} strokeWidth={3} /> : '03'}
                </div>
                <div>
                  <div className="img1-step-content-title" style={{ color: step === 3 ? '#FF7200' : step > 3 ? '#1A102F' : '#64748B' }}>GROW</div>
                  <div className="img1-step-content-sub">Funding</div>
                </div>
              </div>

              {/* Step 4: SCALE */}
              <div className="img1-timeline-step">
                <div className={`img1-step-badge ${step === 4 ? 'active-orange' : 'upcoming'}`}>
                  04
                </div>
                <div>
                  <div className="img1-step-content-title" style={{ color: step === 4 ? '#FF7200' : '#64748B' }}>SCALE</div>
                  <div className="img1-step-content-sub">Greater Possibilities</div>
                </div>
              </div>
            </div>

            {/* 3D Winding Pathway Visual Graphic */}
            <div className="img1-winding-artwork">
              {/* Gold Archway Header Banner */}
              <div className="img1-archway-header">
                <div className="img1-archway-title">
                  BIGGER BUSINESSES<br />BRIGHTER TOMORROWS
                </div>
              </div>

              {/* 3D Ecosystem Transparent Graphic Overlay */}
              <div className="img1-3d-graphic-wrapper">
                <img 
                  src="/hero_3d_ecosystem_transparent.png" 
                  alt="3D Business Growth Graphic" 
                  className="img1-3d-graphic-img" 
                />
              </div>

              {/* Stacked 3D Milestone Pathway Cards */}
              <div className="img1-road-blocks-stack">
                <div className="img1-road-card">
                  <div className="img1-road-card-icon" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                    <BarChart3 size={12} />
                  </div>
                  <div>
                    <div className="img1-road-card-title">SCALE</div>
                    <div className="img1-road-card-sub">Expand Globally</div>
                  </div>
                </div>

                <div className="img1-road-card">
                  <div className="img1-road-card-icon" style={{ background: '#ECFDF5', color: '#059669' }}>
                    <TrendingUp size={12} />
                  </div>
                  <div>
                    <div className="img1-road-card-title">GROW</div>
                    <div className="img1-road-card-sub">Get Funding</div>
                  </div>
                </div>

                <div className="img1-road-card">
                  <div className="img1-road-card-icon" style={{ background: '#FFFBEB', color: '#D97706' }}>
                    <ShieldCheck size={12} />
                  </div>
                  <div>
                    <div className="img1-road-card-title">BUILD</div>
                    <div className="img1-road-card-sub">Stay Compliant</div>
                  </div>
                </div>

                <div className="img1-road-card">
                  <div className="img1-road-card-icon" style={{ background: '#FFF7ED', color: '#EA580C' }}>
                    <Lightbulb size={12} />
                  </div>
                  <div>
                    <div className="img1-road-card-title">START</div>
                    <div className="img1-road-card-sub">Turn Idea Into Reality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cursive Tagline */}
          <div className="img1-cursive-tag-container">
            <span className="img1-cursive-text">Together Towards Sustainable Growth</span>
          </div>

          {/* Value Highlights List */}
          <div className="img1-trust-features-list">
            <div className="img1-trust-item">
              <div className="img1-trust-icon-circle">
                <Users size={15} />
              </div>
              <div>
                <div className="img1-trust-title">Local Expertise</div>
                <div className="img1-trust-sub">Deep understanding of regional markets</div>
              </div>
            </div>

            <div className="img1-trust-item">
              <div className="img1-trust-icon-circle">
                <ShieldCheck size={15} />
              </div>
              <div>
                <div className="img1-trust-title">Trust & Integrity</div>
                <div className="img1-trust-sub">Transparent and ethical advisory</div>
              </div>
            </div>

            <div className="img1-trust-item">
              <div className="img1-trust-icon-circle">
                <BarChart3 size={15} />
              </div>
              <div>
                <div className="img1-trust-title">Strategic Growth</div>
                <div className="img1-trust-sub">Driving businesses towards sustainable success</div>
              </div>
            </div>
          </div>

          {/* Dark Bottom Security Bar */}
          <div className="img1-dark-bottom-bar">
            <span className="img1-dark-bar-item">
              <ShieldCheck size={13} color="#C4B5FD" /> 100% Secure
            </span>
            <span className="img1-dark-bar-divider">|</span>
            <span className="img1-dark-bar-item">
              <Lock size={13} color="#C4B5FD" /> No Spam
            </span>
            <span className="img1-dark-bar-divider">|</span>
            <span className="img1-dark-bar-item">
              <PhoneCall size={13} color="#C4B5FD" /> Expert Consultation
            </span>
          </div>

        </div>

        {/* RIGHT PANEL: INTERACTIVE FORM WIZARD */}
        <div className="growthora-modal-right">
          
          {!submitted ? (
            <>
              {/* Stepper Progress Header */}
              <div className="stepper-header-wrapper">
                <div className="stepper-top-info">
                  <span className="step-indicator-text">STEP {step} OF 4</span>
                  <span className="step-percent-text">{step * 25}% Complete</span>
                </div>

                {/* Stepper Dots Track */}
                <div className="stepper-track-bar">
                  <div className="stepper-track-line" />
                  <div className="stepper-track-progress" style={{ width: `${((step - 1) / 3) * 100}%` }} />
                  <div className={`stepper-dot-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`} />
                  <div className={`stepper-dot-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`} />
                  <div className={`stepper-dot-item ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`} />
                  <div className={`stepper-dot-item ${step >= 4 ? 'active' : ''}`} />
                </div>
              </div>

              {/* Controlled Scrollable Body for Steps */}
              <div className="wizard-scrollable-body">
                {/* STEP 1: BUSINESS NEED */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <h2 className="wizard-step-title">How can Growthora help your business?</h2>
                    <p className="wizard-step-subtitle">Choose the area where you need expert guidance.</p>
                    
                    <div className="step1-cards-grid">
                      {needsList.map((item, idx) => {
                        const isSelected = formData.selectedNeed === item.title;
                        const Icon = item.icon;
                        return (
                          <div 
                            key={idx}
                            className={`step1-card-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, selectedNeed: item.title })}
                          >
                            <div className="step1-icon-circle" style={{ background: item.bg, color: item.color }}>
                              <Icon size={18} />
                            </div>
                            <div className="step1-card-name">{item.title}</div>
                            <div className="step1-card-desc">{item.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: BUSINESS PROFILE */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <h2 className="wizard-step-title">Tell us about your business</h2>
                    <p className="wizard-step-subtitle">A few details will help us recommend the right Growthora solution.</p>
                    
                    {/* Business Stage */}
                    <div className="profile-group-container">
                      <label className="profile-group-label">Business Stage</label>
                      <div className="profile-buttons-row">
                        {stagesList.map((stg, idx) => {
                          const Icon = stg.icon;
                          const isSelected = formData.businessStage === stg.label;
                          return (
                            <button
                              key={idx}
                              type="button"
                              className={`profile-select-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => setFormData({ ...formData, businessStage: stg.label })}
                            >
                              <Icon size={14} />
                              <span>{stg.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Business Type */}
                    <div className="profile-group-container">
                      <label className="profile-group-label">Business Type</label>
                      <div className="profile-buttons-row">
                        {typesList.map((type, idx) => {
                          const Icon = type.icon;
                          const isSelected = formData.businessType === type.label;
                          return (
                            <button
                              key={idx}
                              type="button"
                              className={`profile-select-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => setFormData({ ...formData, businessType: type.label })}
                            >
                              <Icon size={14} />
                              <span>{type.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Annual Turnover */}
                    <div className="profile-group-container">
                      <label className="profile-group-label">Annual Turnover</label>
                      <div className="profile-buttons-row">
                        {turnoverList.map((to, idx) => {
                          const isSelected = formData.turnover === to;
                          return (
                            <button
                              key={idx}
                              type="button"
                              className={`profile-select-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => setFormData({ ...formData, turnover: to })}
                            >
                              <span>{to}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: REQUIREMENT */}
                {step === 3 && (
                  <div className="animate-fade-in">
                    <h2 className="wizard-step-title">What is your current requirement?</h2>
                    <p className="wizard-step-subtitle">Select what you would like our advisory team to help you achieve.</p>
                    
                    <div className="step3-req-grid">
                      {reqList.map((item, idx) => {
                        const isSelected = formData.requirement === item.title;
                        const Icon = item.icon;
                        return (
                          <div
                            key={idx}
                            className={`step3-req-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, requirement: item.title })}
                          >
                            <div className="step3-req-icon" style={{ background: item.bg, color: item.color }}>
                              <Icon size={16} />
                            </div>
                            <span style={{ flexGrow: 1 }}>{item.title}</span>
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
                    <h2 className="wizard-step-title">Where should we send your consultation details?</h2>
                    <p className="wizard-step-subtitle">Our advisor will review your requirements and contact you with the right next steps.</p>
                    
                    <form id="consultation-wizard-form" onSubmit={handleSubmit}>
                      <div className="step4-form-grid">
                        <div className="step4-field-block">
                          <label htmlFor="fullName">Full Name *</label>
                          <div className="step4-input-box">
                            <User size={16} color="#64748B" />
                            <input
                              id="fullName"
                              type="text"
                              required
                              placeholder="Enter your full name"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="step4-field-block">
                          <label htmlFor="phone">Mobile Number *</label>
                          <div className="step4-input-box">
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>+91</span>
                            <input
                              id="phone"
                              type="tel"
                              required
                              placeholder="98765 43210"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="step4-field-block">
                          <label htmlFor="email">Email Address *</label>
                          <div className="step4-input-box">
                            <Mail size={16} color="#64748B" />
                            <input
                              id="email"
                              type="email"
                              required
                              placeholder="you@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="step4-field-block">
                          <label htmlFor="city">City *</label>
                          <div className="step4-input-box">
                            <MapPin size={16} color="#64748B" />
                            <input
                              id="city"
                              type="text"
                              required
                              placeholder="Select or type your city"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="step4-field-block" style={{ marginBottom: '10px' }}>
                        <label htmlFor="companyName">Company / Business Name (Optional)</label>
                        <div className="step4-input-box">
                          <Building size={16} color="#64748B" />
                          <input
                            id="companyName"
                            type="text"
                            placeholder="Enter your company name (optional)"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="step4-agree-row">
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

              {/* Wizard Bottom Controls Bar */}
              <div className="wizard-footer-bar">
                {/* Security Trust Badges Sub-Row */}
                <div className="wizard-footer-trust-notes">
                  <span className="trust-pill"><ShieldCheck size={12} color="#FF7200" /> 100% Secure</span>
                  <span className="trust-dot">•</span>
                  <span className="trust-pill"><Lock size={12} color="#FF7200" /> No Spam</span>
                  <span className="trust-dot">•</span>
                  <span className="trust-pill"><PhoneCall size={12} color="#FF7200" /> Expert Consultation</span>
                </div>

                {/* Main Control Buttons Row */}
                <div className="wizard-footer-btn-row">
                  {step > 1 ? (
                    <button type="button" className="btn-wizard-back-ghost" onClick={handleBack}>
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button 
                      type="button" 
                      className="btn-wizard-continue" 
                      disabled={!isStepValid()}
                      onClick={handleNext}
                    >
                      <span>Continue</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      form="consultation-wizard-form" 
                      className="btn-wizard-continue primary-cta"
                      disabled={!isStepValid()}
                    >
                      <span>Get My Free Consultation</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* SUCCESS OVERLAY MODAL CARD */
            <div className="success-card-centered animate-scale-up">
              <div className="success-badge-circle">
                <CheckCircle2 size={44} />
              </div>
              <h2 className="success-main-title">You're All Set!</h2>
              <p className="success-main-desc">
                Thank you for choosing <strong>Growthora Advisory</strong>. Our senior advisory team will review your requirements for <strong>{formData.selectedNeed}</strong> and get in touch with you shortly.
              </p>
              
              <div className="success-status-pill">
                ✓ Your consultation request has been received.
              </div>

              <button
                type="button"
                className="btn-back-to-site"
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

      </div>
    </div>
  );
};
