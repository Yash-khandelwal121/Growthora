import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  ShieldCheck, FileText, Settings, Briefcase, Zap, 
  ArrowRight, ArrowLeft, CheckCircle, ChevronDown, ChevronUp,
  Landmark, Award, Sparkles, Clock, ChevronRight, TrendingUp,
  BarChart3, Building2, Check, Lock, Scale, FileCheck,
  Calculator, PieChart, DollarSign, Layers
} from 'lucide-react';
import { VALUATION_CATEGORY_DATA, VALUATION_SERVICES_DATA } from '../data/valuationData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function ValuationPage() {
  const navigate = useNavigate();
  const [activeServiceSlug, setActiveServiceSlug] = useState('business-valuation');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  const servicesList = VALUATION_CATEGORY_DATA.servicesList;
  const activeServiceData = VALUATION_SERVICES_DATA[activeServiceSlug] || VALUATION_SERVICES_DATA['business-valuation'];

  const handleSelectService = (slug) => {
    setActiveServiceSlug(slug);
    const element = document.getElementById('active-valuation-content');
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="services-page-root" style={{ overflowX: 'hidden' }}>
      <Header 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />
      
      {/* 1. HERO SECTION */}
      <section className="category-hero-section">
        <div className="hero-glow-bg" />
        <div className="hero-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          
          <div className="hero-content">
            <button className="back-btn-ghost" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Home / Services / Valuation
            </button>
            <div className="eyebrow-badge" style={{ marginTop: '20px' }}>
              <Zap className="eyebrow-icon" size={14} />
              <span>GROWTHORA ADVISORY</span>
            </div>

            <h1 className="hero-title">
              Valuation
            </h1>
            
            <h2 style={{ color: '#FF7200', fontSize: '1.45rem', fontWeight: '600', marginBottom: '20px', lineHeight: '1.4' }}>
              “Know what your business is truly worth — with a structured, defensible valuation built for decisions, fundraising, compliance and growth.”
            </h2>

            <p className="hero-subtitle">
              Independent valuation reports, DCF financial modeling, and regulatory compliance certificates accepted by investors, tax authorities, and global institutions.
            </p>

            <div className="hero-cta-group" style={{ marginTop: '30px' }}>
              <button className="btn-hero-primary" onClick={() => setIsConsultationOpen(true)}>
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button 
                className="btn-hero-secondary" 
                onClick={() => {
                  const el = document.getElementById('valuation-services-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Valuation Services</span>
              </button>
            </div>
          </div>

          {/* Premium 3D Isometric Visual Illustration */}
          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion" style={{
              background: 'linear-gradient(135deg, #0A0F1D 0%, #17102B 50%, #2A123D 100%)',
              borderRadius: '24px',
              padding: '32px 24px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
              color: '#FFFFFF'
            }}>
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 114, 0, 0.2)', color: '#FF7200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calculator size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '1rem', letterSpacing: '0.04em' }}>VALUATION ENGINE</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Financial Modeling & Defense</div>
                  </div>
                </div>
                <span style={{ background: 'linear-gradient(90deg, #FF7200 0%, #E05600 100%)', color: '#FFF', fontSize: '0.72rem', fontWeight: '800', padding: '5px 12px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(255,114,0,0.3)' }}>
                  BUSINESS VALUE
                </span>
              </div>

              {/* 3D Visual Cards Diagram */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ color: '#FF7200', fontSize: '0.78rem', fontWeight: '800', marginBottom: '4px' }}>01 / INCOME</div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>DCF Cash-Flow Model</div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>WACC & Terminal Value</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ color: '#8B5CF6', fontSize: '0.78rem', fontWeight: '800', marginBottom: '4px' }}>02 / MARKET</div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>Peer & Deal Multiples</div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>EV/EBITDA & EV/Revenue</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ color: '#3B82F6', fontSize: '0.78rem', fontWeight: '800', marginBottom: '4px' }}>03 / ASSET</div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>Adjusted NAV Method</div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>Tangibles & Intangibles</div>
                </div>

                <div style={{ background: 'rgba(255, 114, 0, 0.15)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255, 114, 0, 0.4)' }}>
                  <div style={{ color: '#FF7200', fontSize: '0.78rem', fontWeight: '800', marginBottom: '4px' }}>04 / COMPLIANCE</div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>Registered Valuer</div>
                  <div style={{ fontSize: '0.72rem', color: '#FFE4E6', marginTop: '4px' }}>Sec 56(2)(xviib) & FEMA</div>
                </div>
              </div>

              {/* Bottom Ticker Info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', fontSize: '0.78rem', color: '#CBD5E1' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={14} color="#FF7200" /> Corporate & Startup Valuations
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={14} color="#10B981" /> 100% Defensible Reports
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN SECTION: SIDEBAR + DETAILED CONTENT AREA */}
      <section className="category-services-section" id="valuation-services-section" style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
          
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">Valuation & Financial Modeling Practice</h2>
            <p className="section-subtitle">
              Select a valuation practice from the sidebar to view approaches, applications, key deliverables, and execution process.
            </p>
          </div>

          {/* Flexible Grid Layout */}
          <div className="valuation-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 320px) minmax(0, 1fr)', gap: '32px', alignItems: 'start' }}>
            
            {/* LEFT SIDEBAR: VALUATION SERVICES */}
            <aside style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '16px',
              padding: '20px 16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              position: 'sticky',
              top: '100px'
            }}>
              {/* Sidebar Header */}
              <div 
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 8px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #F1F5F9',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calculator size={18} color="#FF7200" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    VALUATION SERVICES
                  </span>
                </div>
                <button 
                  type="button" 
                  aria-label="Toggle sidebar menu"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}
                >
                  {sidebarExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {/* 9 Sidebar Items */}
              {sidebarExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {servicesList.map((item) => {
                    const isActive = activeServiceSlug === item.slug;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectService(item.slug)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: isActive ? '1px solid rgba(255, 114, 0, 0.3)' : '1px solid transparent',
                          background: isActive ? 'rgba(255, 114, 0, 0.08)' : 'transparent',
                          color: isActive ? '#FF7200' : '#334155',
                          fontWeight: isActive ? '600' : '500',
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          minWidth: 0,
                          wordBreak: 'break-word'
                        }}
                      >
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: '700', 
                          padding: '2px 7px', 
                          borderRadius: '6px', 
                          background: isActive ? '#FF7200' : '#E2E8F0', 
                          color: isActive ? '#FFFFFF' : '#64748B',
                          flexShrink: 0
                        }}>
                          {item.id}
                        </span>
                        <span style={{ flexGrow: 1, minWidth: 0, wordBreak: 'break-word' }}>{item.title}</span>
                        {isActive && <ChevronRight size={16} color="#FF7200" style={{ flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </aside>

            {/* RIGHT CONTENT: DETAILED DYNAMIC VALUATION VIEW */}
            <main id="active-valuation-content" style={{ minWidth: 0 }}>
              
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '20px',
                padding: '36px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                boxSizing: 'border-box',
                width: '100%',
                overflow: 'hidden'
              }}>
                
                {/* Header Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', marginBottom: '24px' }}>
                  <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 114, 0, 0.1)', color: '#FF7200', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '12px' }}>
                      <Sparkles size={14} />
                      VALUATION PRACTICE {activeServiceData.id}
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0F172A', margin: '0 0 8px', wordBreak: 'break-word' }}>
                      {activeServiceData.subtitle}
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#475569', margin: 0, lineHeight: '1.6' }}>
                      {activeServiceData.description}
                    </p>
                  </div>

                  <button 
                    type="button" 
                    className="btn-primary"
                    style={{ padding: '12px 22px', fontSize: '0.95rem', flexShrink: 0 }}
                    onClick={() => setIsConsultationOpen(true)}
                  >
                    Get Business Valued <ArrowRight size={16} />
                  </button>
                </div>

                {/* 1. CHOOSE THE RIGHT VALUATION APPROACH (3 CARDS) */}
                <div style={{ marginBottom: '36px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
                    Choose the Right Valuation Approach
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    {(activeServiceData.approaches || VALUATION_CATEGORY_DATA.valuationApproaches).map((app, idx) => (
                      <div key={idx} style={{ background: '#F8FAFC', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', position: 'relative' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#FF7200', display: 'block', marginBottom: '6px' }}>
                          METHOD {app.id}
                        </span>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A', margin: '0 0 8px' }}>{app.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0, lineHeight: '1.45' }}>{app.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. WHERE VALUATION HELPS */}
                <div style={{ marginBottom: '36px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Where Valuation Helps</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                    {(activeServiceData.applications || VALUATION_CATEGORY_DATA.whereValuationHelps).map((item, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255, 114, 0, 0.12)', color: '#FF7200', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span style={{ color: '#1E293B', fontSize: '0.92rem', fontWeight: '600' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. KEY DELIVERABLES */}
                <div style={{ marginBottom: '36px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Key Deliverables & Outputs</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                    {activeServiceData.deliverables.map((del, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#F8FAFC', padding: '14px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                        <FileCheck size={18} color="#FF7200" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.4', fontWeight: '500' }}>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. OUR VALUATION PROCESS (5 STEPS) */}
                <div style={{ marginBottom: '36px', background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <TrendingUp size={20} color="#FF7200" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Our Valuation Process</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
                    {VALUATION_CATEGORY_DATA.valuationProcess.map((proc, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#FF7200', display: 'block', marginBottom: '4px' }}>
                          STEP {proc.stage}
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>{proc.title}</h4>
                        <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0, lineHeight: '1.4' }}>{proc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. HIGHLIGHTED CARD: BUILT FOR REAL BUSINESS DECISIONS */}
                <div style={{
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
                  borderRadius: '16px',
                  padding: '28px',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  marginBottom: '28px',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)'
                }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <span style={{ background: 'rgba(255, 114, 0, 0.2)', color: '#FF7200', fontSize: '0.78rem', fontWeight: '800', padding: '4px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '8px' }}>
                      DEFENSIBLE & ACCURATE
                    </span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 6px', color: '#FFFFFF' }}>
                      Built for Real Business Decisions
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#CBD5E1', margin: 0, lineHeight: '1.5' }}>
                      Not just a number. A defensible valuation that helps founders, investors and stakeholders make better decisions.
                    </p>
                  </div>
                  <button 
                    type="button" 
                    className="btn-primary"
                    style={{ background: '#FF7200', borderColor: '#FF7200', padding: '12px 24px', fontSize: '0.95rem', flexShrink: 0 }}
                    onClick={() => setIsConsultationOpen(true)}
                  >
                    Get Your Business Valued →
                  </button>
                </div>

                {/* Bottom Card Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.9rem' }}>
                    <Clock size={16} color="#FF7200" />
                    <span>Expected Timeline: <strong>{activeServiceData.timeline}</strong></span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      type="button" 
                      className="btn-primary" 
                      style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                      onClick={() => setIsConsultationOpen(true)}
                    >
                      Get Your Business Valued →
                    </button>
                  </div>
                </div>

              </div>

            </main>

          </div>

        </div>
      </section>

      {/* 3. VALUATION PRACTICE PILLARS */}
      <section className="foundation-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Valuation Practice Pillars</h2>
          </div>
          <div className="foundation-grid">
            <div className="foundation-card">
              <span className="f-num">01</span>
              <h4>Independent & Defensible</h4>
              <p>Valuation models constructed with empirical market data, peer multiples, and clear financial logic.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">02</span>
              <h4>IBBI & SEBI Registered Valuers</h4>
              <p>Statutory reports signed off by IBBI Registered Valuers & SEBI Category-I Merchant Bankers.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">03</span>
              <h4>Multi-Methodology Approach</h4>
              <p>Combining DCF, Comparable Companies, Transaction Multiples, and NAV for balanced conclusions.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">04</span>
              <h4>Real Business Decisions</h4>
              <p>Helping founders negotiate term sheets, structure ESOP pools, and navigate regulatory audits smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY GROWTHORA FOR VALUATION */}
      <section className="why-growthora-cards">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Founders Choose Growthora for Valuation</h2>
          </div>
          <div className="wg-grid">
            {[
              "Audit-Ready Valuation Reports Accepted by Regulators",
              "Income Tax Section 56(2)(xviib) Safe Harbor Valuation",
              "FEMA / RBI Inbound & Outbound Pricing Clearance",
              "Complex Cap Table & Convertible Instrument Modeling",
              "Ind AS & IFRS Fair Value Financial Reporting Support",
              "Fast 3 to 5 Day Express Compliance Delivery"
            ].map((reason, idx) => (
              <div className="wg-card" key={idx}>
                <ShieldCheck size={24} color="#FF7200" />
                <h4>{reason}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="faq-section" style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Valuation Services FAQs</h2>
          </div>
          <div className="faq-accordion-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {VALUATION_CATEGORY_DATA.faqs.map((faq, idx) => (
              <div className="sd-faq-item" key={idx}>
                <div 
                  className="sd-faq-q" 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  {faq.q}
                  {openFaqIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {openFaqIndex === idx && (
                  <div className="sd-faq-a">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONSULTATION CTA */}
      <section className="category-final-cta" style={{ background: '#0F172A', padding: '90px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginBottom: '20px' }}>
            Not sure what your business is worth?
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Talk to our advisory team and get clarity on the right valuation approach for your business.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '14px 32px', fontSize: '1.05rem', background: '#FF7200', borderColor: '#FF7200' }} 
              onClick={() => setIsConsultationOpen(true)}
            >
              Book a Consultation →
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: 'Valuation & Financial Modeling', category: 'VALUATION' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
