import React, { useState, useEffect } from 'react';
import {
  X, Check, Building, TrendingUp, Award,
  MapPin, Handshake, ShieldCheck, ChevronDown, Rocket, Briefcase
} from 'lucide-react';
import '../styles/fundingPopup.css';

export const FundingSolutionPopup = ({ isModal = false, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fundingType: 'Business Loan',
    amount: '',
    stage: '',
    industry: '',
    state: 'Gujarat',
    fullName: '',
    mobile: '',
    email: ''
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.mobile || !formData.email) {
      alert('Please fill all required fields');
      return;
    }
    alert('Thank you! Your eligibility report request has been received.');
    if (onClose) onClose();
  };

  // Don't render inline panel on mobile (shown via modal instead)
  if (!isModal && isMobile) return null;

  // ─── Left "Our Offices" Panel (modal only) ───
  const renderLeftPanel = () => (
    <div className="fp-left-panel">
      <div className="fp-brand">
        <h3>GROWTHORA</h3>
        <p>ADVISORY</p>
        <span style={{ fontSize: '0.65rem', color: '#6B7280' }}>Guiding Growth, Empowering Future.</span>
      </div>

      <h4 className="fp-offices-title">OUR OFFICES</h4>
      <div className="fp-offices-subtitle">ONE VISION. MANY LOCATIONS.<br />INFINITE POSSIBILITIES.</div>

      <div className="fp-map-visual">
        <div style={{ position: 'absolute', left: '22px', top: '10px', bottom: '10px', width: '4px', background: 'rgba(59,28,50,0.1)', borderRadius: '2px', zIndex: 0 }} />
        {[
          { label: '01 INDORE & LUCKNOW', ml: 0 },
          { label: '02 BENGALURU',        ml: 16 },
          { label: '03 JAIPUR',           ml: 32 },
          { label: '04 AHMEDABAD',        ml: 8 }
        ].map(({ label, ml }) => (
          <div className="fp-pin-item" key={label} style={{ zIndex: 1, marginLeft: ml }}>
            <div className="fp-pin-icon"><MapPin size={13} /></div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="fp-promise">
        <div className="fp-promise-title">OUR PROMISE</div>
        {[
          { Icon: MapPin,    title: 'LOCAL EXPERTISE',   desc: 'Deep understanding of regional markets.' },
          { Icon: Handshake, title: 'TRUST & INTEGRITY', desc: 'Built on transparency and long-term relationships.' },
          { Icon: TrendingUp,title: 'STRATEGIC GROWTH',  desc: 'Driving fluid & tailored solutions for business owners.' }
        ].map(({ Icon, title, desc }) => (
          <div className="fp-promise-item" key={title}>
            <Icon size={16} />
            <div><h5>{title}</h5><p>{desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Step Content ───
  const renderStepContent = () => {
    const fundingOptions = [
      { id: 'Business Loan',         icon: Building,    desc: 'Debt Funding',    checks: ['Up to ₹10 Crore', 'Fast Approval', 'Low Interest Rates'] },
      { id: 'Government Grant',       icon: Award,       desc: 'Non-Refundable',  checks: ['Non-Refundable Grant', 'Central & State Schemes', 'For Startup & MSME'] },
      { id: 'Startup Funding',        icon: Rocket,      desc: 'Equity / Seed',   checks: ['Seed Fund Support', 'Angel Investor Connect'] },
      { id: 'Business Growth Support',icon: TrendingUp,  desc: 'Consulting',      checks: ['Expansion Planning', 'Digital Marketing'] }
    ];

    if (step === 1) return (
      <div className="fp-step-content">
        <h2 className="fp-title">Let's Find The Best <span>Funding Solution</span> For Your Business</h2>
        <p className="fp-subtitle">Answer a few quick questions to check your eligibility. ✨</p>
        <div className="fp-cards-grid">
          {fundingOptions.map(opt => (
            <div
              key={opt.id}
              className={`fp-card ${formData.fundingType === opt.id ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, fundingType: opt.id })}
            >
              <div className="fp-card-header">
                <div className="fp-card-icon"><opt.icon size={16} /></div>
                <div className="fp-radio"><div className="fp-radio-inner" /></div>
              </div>
              <h4>{opt.id}</h4>
              <p>{opt.desc}</p>
              <ul className="fp-card-list">
                {opt.checks.map((chk, i) => <li key={i}><Check size={11} /> {chk}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );

    if (step === 2) return (
      <div className="fp-step-content">
        <h2 className="fp-title">What is your <span>requirement size?</span></h2>
        <p className="fp-subtitle">Select your estimated capital requirement and current business stage.</p>
        <div className="fp-section-label">REQUIRED FUNDING AMOUNT</div>
        <div className="fp-pill-grid">
          {[
            { id: '₹10 Lakh - ₹50 Lakh',  sub: 'Micro & Early Stage' },
            { id: '₹50 Lakh - ₹2 Crore',   sub: 'Small Business / CGTMSE' },
            { id: '₹2 Crore - ₹5 Crore',   sub: 'MSME Expansion & Subsidy' },
            { id: '₹5 Crore - ₹10 Cr+',    sub: 'Large Scale / Capex' }
          ].map(amt => (
            <div
              key={amt.id}
              className={`fp-pill ${formData.amount === amt.id ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, amount: amt.id })}
            >
              <strong>{amt.id}</strong>
              <span>{amt.sub}</span>
            </div>
          ))}
        </div>
        <div className="fp-section-label">CURRENT BUSINESS STAGE</div>
        <div className="fp-pill-grid">
          {['Idea Stage', 'Early Stage (< 2 Yrs)', 'Registered MSME', 'Established (3+ Yrs)'].map(stg => (
            <div
              key={stg}
              className={`fp-pill ${formData.stage === stg ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, stage: stg })}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
              <strong>{stg}</strong>
            </div>
          ))}
        </div>
      </div>
    );

    if (step === 3) return (
      <div className="fp-step-content">
        <h2 className="fp-title">Tell us about your <span>industry & location</span></h2>
        <p className="fp-subtitle">Government subsidies and loan terms differ by sector and state.</p>
        <div className="fp-section-label">SELECT INDUSTRY / SECTOR</div>
        <div className="fp-pill-grid industry-grid">
          {['Manufacturing', 'Information Technology', 'Food & Beverages', 'Healthcare', 'Textile', 'Trader / Retail', 'Agriculture', 'Clean Energy', 'Logistics', 'Other'].map(ind => (
            <div
              key={ind}
              className={`fp-pill ${formData.industry === ind ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, industry: ind })}
              style={{ alignItems: 'center', padding: '9px 12px' }}
            >
              <strong style={{ fontSize: '0.82rem', margin: 0, textAlign: 'center' }}>{ind}</strong>
            </div>
          ))}
        </div>
        <div className="fp-section-label">STATE / UNION TERRITORY</div>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <select
            className="fp-select"
            value={formData.state}
            onChange={e => setFormData({ ...formData, state: e.target.value })}
          >
            {['Gujarat', 'Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Other'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={15} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', pointerEvents: 'none' }} />
        </div>
      </div>
    );

    return (
      <div className="fp-step-content">
        <h2 className="fp-title">Where should we send your <span>eligibility report?</span></h2>
        <p className="fp-subtitle">Our senior advisor will call once to explain eligible schemes with zero commitment.</p>
        <div className="fp-form-grid full">
          <div className="fp-input-group">
            <label>YOUR FULL NAME <span>*</span></label>
            <input type="text" placeholder="Enter your full name" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
          </div>
        </div>
        <div className="fp-form-grid">
          <div className="fp-input-group">
            <label>MOBILE NUMBER <span>*</span></label>
            <input type="tel" placeholder="98765 43210" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
          </div>
          <div className="fp-input-group">
            <label>EMAIL ADDRESS <span>*</span></label>
            <input type="email" placeholder="you@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </div>
        </div>
      </div>
    );
  };

  // ─── Footer ───
  const renderFooter = () => (
    <div className="fp-footer">
      <div className="fp-actions">
        {step > 1 && (
          <button className="fp-btn-back" onClick={handleBack}>← Back</button>
        )}
        <button className="fp-btn-continue" onClick={handleNext}>
          {step === 4 ? 'Get Free Eligibility Report & Callback' : 'Continue →'}
        </button>
      </div>
      <div className="fp-security-badges">
        <div className="fp-badge"><ShieldCheck size={13} /> 100% Secure</div>
        <div className="fp-badge"><X size={13} style={{ color: '#EF4444' }} /> No Spam</div>
        <div className="fp-badge"><Briefcase size={13} /> Expert Consultation</div>
      </div>
      <div className="fp-bottom-banner">
        <strong>★ One Stop Solution For All Your Business Growth Needs</strong>
        <span>Funding • Compliance • Growth • Sustainability</span>
      </div>
    </div>
  );

  // ─── MODAL mode (full-screen overlay with left + right panels) ───
  if (isModal) {
    return (
      <div className="funding-modal-overlay" onClick={onClose}>
        <div className="funding-popup-wrapper" onClick={e => e.stopPropagation()}>
          {renderLeftPanel()}
          <div className="fp-right-panel">
            <div className="fp-right-panel" style={{ padding: 0 }}>
              <div className="fp-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div className="fp-step-indicator">
                  STEP {step} OF 4 <span>{step * 25}% COMPLETE</span>
                </div>
                <button className="fp-close-btn" onClick={onClose}><X size={15} /></button>
              </div>
              <div className="fp-progress-bar">
                <div className="fp-progress-fill" style={{ width: `${step * 25}%` }} />
              </div>
              {renderStepContent()}
              {renderFooter()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── INLINE DESKTOP SIDEBAR mode ───
  return (
    <div className="fp-inline-panel">
      <div className="fp-inline-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div className="fp-step-indicator">
            STEP {step} OF 4 <span>{step * 25}% COMPLETE</span>
          </div>
        </div>
        <div className="fp-progress-bar">
          <div className="fp-progress-fill" style={{ width: `${step * 25}%` }} />
        </div>
        {renderStepContent()}
        {renderFooter()}
      </div>
    </div>
  );
};
