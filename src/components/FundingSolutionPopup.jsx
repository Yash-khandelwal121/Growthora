import React, { useState, useEffect } from 'react';
import { X, Check, Building, TrendingUp, Award, MapPin, Handshake, ShieldCheck, ChevronDown, Rocket, Briefcase } from 'lucide-react';
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
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
    // Simulate submission
    alert('Thank you! Your eligibility report request has been received.');
    if (onClose) onClose();
  };

  // Prevent rendering inline version on mobile screens
  if (!isModal && isMobile) return null;

  const renderLeftPanel = () => (
    <div className="fp-left-panel">
      <div className="fp-brand">
        <h3>GROWTHORA</h3>
        <p>ADVISORY</p>
        <span style={{ fontSize: '0.65rem', color: '#6B7280' }}>Guiding Growth, Empowering Future.</span>
      </div>
      
      <h4 className="fp-offices-title">OUR OFFICES</h4>
      <div className="fp-offices-subtitle">ONE VISION. MANY LOCATIONS.<br/>INFINITE POSSIBILITIES.</div>

      <div className="fp-map-visual">
        <div style={{ position: 'absolute', left: '26px', top: '10px', bottom: '10px', width: '4px', background: 'rgba(59,28,50,0.1)', borderRadius: '2px', zIndex: 0 }}></div>
        
        <div className="fp-pin-item" style={{ zIndex: 1 }}>
          <div className="fp-pin-icon"><MapPin size={14} /></div>
          <span>01 INDORE & LUCKNOW</span>
        </div>
        <div className="fp-pin-item" style={{ zIndex: 1, marginLeft: '20px' }}>
          <div className="fp-pin-icon"><MapPin size={14} /></div>
          <span>02 BENGALURU</span>
        </div>
        <div className="fp-pin-item" style={{ zIndex: 1, marginLeft: '40px' }}>
          <div className="fp-pin-icon"><MapPin size={14} /></div>
          <span>03 JAIPUR</span>
        </div>
        <div className="fp-pin-item" style={{ zIndex: 1, marginLeft: '10px' }}>
          <div className="fp-pin-icon"><MapPin size={14} /></div>
          <span>04 AHMEDABAD</span>
        </div>
      </div>

      <div className="fp-promise">
        <div className="fp-promise-title">OUR PROMISE</div>
        <div className="fp-promise-item">
          <MapPin size={18} />
          <div>
            <h5>LOCAL EXPERTISE</h5>
            <p>Deep understanding of regional markets.</p>
          </div>
        </div>
        <div className="fp-promise-item">
          <Handshake size={18} />
          <div>
            <h5>TRUST & INTEGRITY</h5>
            <p>Built on transparency and long-term relationships.</p>
          </div>
        </div>
        <div className="fp-promise-item">
          <TrendingUp size={18} />
          <div>
            <h5>STRATEGIC GROWTH</h5>
            <p>Driving fluid & tailored solutions for business owners.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="fp-right-panel">
      <div className="fp-header">
        <div className="fp-step-indicator">
          STEP {step} OF 4 <span>{step * 25}% Complete</span>
        </div>
        {isModal && (
          <button className="fp-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        )}
      </div>

      <div className="fp-progress-bar">
        <div className="fp-progress-fill" style={{ width: `${step * 25}%` }}></div>
      </div>

      {step === 1 && (
        <div className="fp-step-content">
          <h2 className="fp-title">Let's Find The Best <span>Funding Solution</span> For Your Business</h2>
          <p className="fp-subtitle">Answer a few quick questions to check your eligibility. ✨</p>
          
          <div className="fp-cards-grid">
            {[
              { id: 'Business Loan', icon: Building, desc: 'Debt Funding', checks: ['Up to ₹10 Crore', 'Fast Approval', 'Low Interest Rates'] },
              { id: 'Government Grant', icon: Award, desc: 'Non-Refundable', checks: ['Non-Refundable Grant', 'Central & State Schemes', 'For Startup & MSME'] },
              { id: 'Startup Funding', icon: Rocket, desc: 'Equity / Seed', checks: ['Seed Fund Support', 'Angel Investor Connect'] },
              { id: 'Business Growth Support', icon: TrendingUp, desc: 'Consulting', checks: ['Expansion Planning', 'Digital Marketing'] }
            ].map((opt) => (
              <div 
                key={opt.id} 
                className={`fp-card ${formData.fundingType === opt.id ? 'active' : ''}`}
                onClick={() => setFormData({...formData, fundingType: opt.id})}
              >
                <div className="fp-card-header">
                  <div className="fp-card-icon"><opt.icon size={18} /></div>
                  <div className="fp-radio">
                    <div className="fp-radio-inner"></div>
                  </div>
                </div>
                <h4>{opt.id}</h4>
                <p>{opt.desc}</p>
                <ul className="fp-card-list">
                  {opt.checks.map((chk, i) => (
                    <li key={i}><Check size={12} /> {chk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fp-step-content">
          <h2 className="fp-title">What is your <span>requirement size?</span></h2>
          <p className="fp-subtitle">Select your estimated capital requirement and current business stage.</p>
          
          <div className="fp-section-label">REQUIRED FUNDING AMOUNT</div>
          <div className="fp-pill-grid">
            {[
              { id: '₹10 Lakh - ₹50 Lakh', sub: 'Micro & Early Stage' },
              { id: '₹50 Lakh - ₹2 Crore', sub: 'Small Business / CGTMSE' },
              { id: '₹2 Crore - ₹5 Crore', sub: 'MSME Expansion & Subsidy' },
              { id: '₹5 Crore - ₹10 Cr+', sub: 'Large Scale / Capex' }
            ].map(amt => (
              <div 
                key={amt.id} 
                className={`fp-pill ${formData.amount === amt.id ? 'active' : ''}`}
                onClick={() => setFormData({...formData, amount: amt.id})}
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
                onClick={() => setFormData({...formData, stage: stg})}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <strong>{stg}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fp-step-content">
          <h2 className="fp-title">Tell us about your <span>industry & location</span></h2>
          <p className="fp-subtitle">Government subsidies and loan terms differ by sector and state.</p>
          
          <div className="fp-section-label">SELECT INDUSTRY / SECTOR</div>
          <div className="fp-pill-grid industry-grid">
            {[
              'Manufacturing', 'Information Technology', 'Food & Beverages',
              'Healthcare', 'Textile', 'Trader / Retail',
              'Agriculture', 'Clean Energy', 'Logistics', 'Other'
            ].map(ind => (
              <div 
                key={ind} 
                className={`fp-pill ${formData.industry === ind ? 'active' : ''}`}
                onClick={() => setFormData({...formData, industry: ind})}
                style={{ alignItems: 'center', padding: '10px' }}
              >
                <strong style={{ fontSize: '0.85rem', margin: 0 }}>{ind}</strong>
              </div>
            ))}
          </div>

          <div className="fp-section-label">STATE / UNION TERRITORY</div>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <select 
              className="fp-select"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
            >
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Delhi">Delhi</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '16px', color: '#6B7280', pointerEvents: 'none' }} />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="fp-step-content">
          <h2 className="fp-title">Where should we send your <span>eligibility report?</span></h2>
          <p className="fp-subtitle">Our senior advisor will call once to explain eligible schemes with zero commitment.</p>
          
          <div className="fp-form-grid full">
            <div className="fp-input-group">
              <label>YOUR FULL NAME <span>*</span></label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>
          
          <div className="fp-form-grid">
            <div className="fp-input-group">
              <label>MOBILE NUMBER <span>*</span></label>
              <input 
                type="tel" 
                placeholder="98765 43210" 
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              />
            </div>
            <div className="fp-input-group">
              <label>EMAIL ADDRESS <span>*</span></label>
              <input 
                type="email" 
                placeholder="you@company.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
        </div>
      )}

      <div className="fp-footer">
        <div className="fp-actions">
          {step > 1 && (
            <button className="fp-btn-back" onClick={handleBack}>
              ← Back
            </button>
          )}
          <button className="fp-btn-continue" onClick={handleNext}>
            {step === 4 ? 'Get Free Eligibility Report & Callback' : 'Continue →'}
          </button>
        </div>
        
        <div className="fp-security-badges">
          <div className="fp-badge"><ShieldCheck size={14} /> 100% Secure</div>
          <div className="fp-badge"><X size={14} style={{ color: '#EF4444' }} /> No Spam</div>
          <div className="fp-badge"><Briefcase size={14} /> Expert Consultation</div>
        </div>
        
        <div className="fp-bottom-banner">
          <strong>★ One Stop Solution For All Your Business Growth Needs</strong>
          <span>Funding • Compliance • Growth • Sustainability</span>
        </div>
      </div>
    </div>
  );

  const containerClass = `funding-popup-wrapper ${isModal ? 'modal-mode' : 'inline-mode'}`;

  if (isModal) {
    return (
      <div className="funding-modal-overlay" onClick={onClose}>
        <div className={containerClass} onClick={(e) => e.stopPropagation()}>
          {renderLeftPanel()}
          {renderContent()}
        </div>
      </div>
    );
  }

  // Inline sidebar mode — no left panel, just the form
  return (
    <div className={containerClass} style={{ position: 'sticky', top: '140px' }}>
      {renderContent()}
    </div>
  );
};
