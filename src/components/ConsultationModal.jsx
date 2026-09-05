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

        {/* LEFT PANEL: DYNAMIC BRANDING & ARTWORK PER STEP */}
        <div className="growthora-modal-left">
          
          <div className="modal-brand-header-group">
            <div className="modal-brand-logo-row">
              <img src="/growthora_logo.jpg" alt="Growthora Advisory" className="modal-brand-logo-img" />
              <div>
                <div className="modal-brand-name">GROWTHORA</div>
                <div className="modal-brand-tagline">Guiding Growth. Empowering Futures.</div>
              </div>
            </div>
          </div>

          {/* DYNAMIC LEFT PANEL CONTENT FOR STEP 1 */}
          {step === 1 && (
            <div className="modal-left-main-content">
              <h2 className="modal-left-headline">Big Goals Need the Right Partner.</h2>
              <p className="modal-left-subhead">From startup to scale, we're with you at every step.</p>

              {/* 4-Block Staircase Visual */}
              <div className="staircase-visual-container">
                <div className="stair-block-item active">
                  <span className="stair-num-badge">01</span>
                  <div>
                    <div className="stair-label-title">START</div>
                  </div>
                  <span className="stair-label-sub">Business Setup</span>
                </div>
                <div className="stair-block-item">
                  <span className="stair-num-badge">02</span>
                  <div>
                    <div className="stair-label-title">BUILD</div>
                  </div>
                  <span className="stair-label-sub">Compliance</span>
                </div>
                <div className="stair-block-item">
                  <span className="stair-num-badge">03</span>
                  <div>
                    <div className="stair-label-title">GROW</div>
                  </div>
                  <span className="stair-label-sub">Funding</span>
                </div>
                <div className="stair-block-item">
                  <span className="stair-num-badge">04</span>
                  <div>
                    <div className="stair-label-title">SCALE</div>
                  </div>
                  <span className="stair-label-sub">Growth</span>
                </div>
              </div>

              <span className="cursive-highlight-tag">"Your Growth, Our Commitment."</span>
            </div>
          )}

          {/* DYNAMIC LEFT PANEL CONTENT FOR STEP 2 */}
          {step === 2 && (
            <div className="modal-left-main-content">
              <h2 className="modal-left-headline">Every Business Stage Has an Opportunity.</h2>
              <p className="modal-left-subhead">Tell us about your business so we can guide you better.</p>

              <div className="workstation-visual-card">
                <div className="notepad-art-box">
                  <div className="notepad-title">Strategic Roadmap</div>
                  <div className="notepad-check-list">
                    <div>✓ Ideas & Entity Setup</div>
                    <div>✓ Compliance & Taxation</div>
                    <div>✓ Operational Architecture</div>
                    <div>✓ Capital & Scale ✓</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '16px', textCenter: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#FF7200' }}>2,500+</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Advised</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#8B5CF6' }}>12+</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Industries</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#10B981' }}>9</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Practices</div>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC LEFT PANEL CONTENT FOR STEP 3 */}
          {step === 3 && (
            <div className="modal-left-main-content">
              <h2 className="modal-left-headline">Turn Your Vision Into Real Progress.</h2>
              <p className="modal-left-subhead">What's your main goal right now?</p>

              <div className="rocket-visual-card">
                <div className="rocket-icon-pulse">
                  <Rocket size={28} />
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#FFFFFF' }}>Targeted Acceleration</div>
                <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '4px' }}>Custom advisory solutions built for your milestones.</div>
              </div>

              <span className="cursive-highlight-tag">"Bigger, Brighter, Together."</span>
            </div>
          )}

          {/* DYNAMIC LEFT PANEL CONTENT FOR STEP 4 */}
          {step === 4 && (
            <div className="modal-left-main-content">
              <h2 className="modal-left-headline">Let's Build Your Next Success Story.</h2>
              <p className="modal-left-subhead">Share your details and our senior advisor will get in touch.</p>

              <div className="handshake-visual-card">
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FF7200', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', flexShrink: 0 }}>
                  <PhoneCall size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#FFFFFF' }}>Zero-Obligation Session</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Direct consultation with domain experts.</div>
                </div>
              </div>
            </div>
          )}

          {/* Left Footer Trust Badges */}
          <div className="modal-left-trust-bar">
            {step === 1 && (
              <>
                <span className="trust-pill-tag"><ShieldCheck size={13} /> Local Expertise</span>
                <span className="trust-pill-tag"><Lock size={13} /> Trust & Integrity</span>
                <span className="trust-pill-tag"><TrendingUp size={13} /> Strategic Growth</span>
              </>
            )}
            {step === 2 && (
              <>
                <span className="trust-pill-tag"><Award size={13} /> Proven Track Record</span>
                <span className="trust-pill-tag"><ShieldCheck size={13} /> Confidential Advisory</span>
              </>
            )}
            {step === 3 && (
              <>
                <span className="trust-pill-tag"><CheckCircle2 size={13} /> Strategy Led</span>
                <span className="trust-pill-tag"><Zap size={13} /> Execution Focused</span>
                <span className="trust-pill-tag"><Rocket size={13} /> Growth Driven</span>
              </>
            )}
            {step === 4 && (
              <>
                <span className="trust-pill-tag"><Building size={13} /> Pan-India Support</span>
                <span className="trust-pill-tag"><ShieldCheck size={13} /> Long-Term Partnership</span>
              </>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: INTERACTIVE FORM WIZARD */}
        <div className="growthora-modal-right">
          
          {!submitted ? (
            <>
              <div>
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

                      <div className="step4-field-block" style={{ marginBottom: '12px' }}>
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
                {step > 1 ? (
                  <button type="button" className="btn-wizard-back-ghost" onClick={handleBack}>
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <div className="wizard-footer-trust-notes">
                  <span>🔒 100% Secure</span>
                  <span>•</span>
                  <span>🚫 No Spam</span>
                  <span>•</span>
                  <span>👨‍💼 Expert Consultation</span>
                </div>

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
                    className="btn-wizard-continue"
                    disabled={!isStepValid()}
                  >
                    <span>Get My Free Consultation</span>
                    <ArrowRight size={16} />
                  </button>
                )}
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
