import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  ShieldCheck, FileText, Settings, Briefcase, Zap, 
  ArrowRight, ArrowLeft, CheckCircle, ChevronDown, ChevronUp,
  Landmark, Award, Sparkles, Clock, ChevronRight, TrendingUp,
  BarChart3, Building2, Check, Lock, Scale, FileCheck
} from 'lucide-react';
import { IPO_CATEGORY_DATA, IPO_SERVICES_DATA } from '../data/ipoData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function IpoPage() {
  const navigate = useNavigate();
  const [activeServiceSlug, setActiveServiceSlug] = useState('ipo-readiness-assessment');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  const servicesList = IPO_CATEGORY_DATA.servicesList;
  const activeServiceData = IPO_SERVICES_DATA[activeServiceSlug] || IPO_SERVICES_DATA['ipo-readiness-assessment'];

  const handleSelectService = (slug) => {
    setActiveServiceSlug(slug);
    const element = document.getElementById('active-ipo-content');
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
              <ArrowLeft size={16} /> Home / Services / IPO
            </button>
            <div className="eyebrow-badge" style={{ marginTop: '20px' }}>
              <Zap className="eyebrow-icon" size={14} />
              <span>GROWTHORA ADVISORY</span>
            </div>

            <h1 className="hero-title">
              IPO
            </h1>
            
            <h2 style={{ color: '#FF7200', fontSize: '1.45rem', fontWeight: '600', marginBottom: '20px', lineHeight: '1.4' }}>
              “From IPO readiness to listing, we help ambitious businesses prepare, structure, and execute their journey to the public markets.”
            </h2>

            <p className="hero-subtitle">
              End-to-end capital market advisory — from DRHP preparation and merchant banker coordination to SEBI approvals, book building, and post-listing corporate governance.
            </p>

            <div className="hero-cta-group" style={{ marginTop: '30px' }}>
              <button className="btn-hero-primary" onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button 
                className="btn-hero-secondary" 
                onClick={() => {
                  const el = document.getElementById('ipo-services-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore IPO Services</span>
              </button>
            </div>
          </div>

          {/* Premium 3D Isometric Visual Illustration */}
          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion" style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #31103F 100%)',
              borderRadius: '24px',
              padding: '32px 24px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
              color: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 114, 0, 0.2)', color: '#FF7200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BarChart3 size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '1rem', letterSpacing: '0.04em' }}>BSE & NSE IPO ROADMAP</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Capital Markets & Public Listing</div>
                  </div>
                </div>
                <span style={{ background: '#10B981', color: '#FFF', fontSize: '0.72rem', fontWeight: '800', padding: '4px 10px', borderRadius: '20px' }}>
                  SEBI READY
                </span>
              </div>

              {/* 3D Visual Cards Diagram */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ color: '#FF7200', fontSize: '0.78rem', fontWeight: '800', marginBottom: '4px' }}>01 / READINESS</div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>Audit & Restructuring</div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>3-Year Restated Financials</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ color: '#8B5CF6', fontSize: '0.78rem', fontWeight: '800', marginBottom: '4px' }}>02 / PROSPECTUS</div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>DRHP & SEBI Filing</div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>Intermediaries & Due Diligence</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ color: '#3B82F6', fontSize: '0.78rem', fontWeight: '800', marginBottom: '4px' }}>03 / BOOK BUILDING</div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>Roadshows & Pricing</div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '4px' }}>Anchor & Syndicate Allocation</div>
                </div>

                <div style={{ background: 'rgba(255, 114, 0, 0.15)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255, 114, 0, 0.4)' }}>
                  <div style={{ color: '#FF7200', fontSize: '0.78rem', fontWeight: '800', marginBottom: '4px' }}>04 / LISTING</div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>Bell Ringing & Trading</div>
                  <div style={{ fontSize: '0.72rem', color: '#FFE4E6', marginTop: '4px' }}>BSE SME / NSE Emerge</div>
                </div>
              </div>

              {/* Bottom Ticker Info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', fontSize: '0.78rem', color: '#CBD5E1' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={14} color="#FF7200" /> Corporate Headquarters
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={14} color="#10B981" /> 100% Growth Roadmap
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN SECTION: SIDEBAR + DETAILED CONTENT AREA */}
      <section className="category-services-section" id="ipo-services-section" style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
          
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">IPO & Capital Markets Practice</h2>
            <p className="section-subtitle">
              Select an IPO practice area from the sidebar to view readiness requirements, execution stages, key deliverables, and advisory roadmap.
            </p>
          </div>

          {/* Flexible Grid Layout */}
          <div className="ipo-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 320px) minmax(0, 1fr)', gap: '32px', alignItems: 'start' }}>
            
            {/* LEFT SIDEBAR: IPO SERVICES */}
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
                  <Landmark size={18} color="#FF7200" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    IPO SERVICES
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

            {/* RIGHT CONTENT: DETAILED DYNAMIC IPO VIEW */}
            <main id="active-ipo-content" style={{ minWidth: 0 }}>
              
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
                      IPO PRACTICE {activeServiceData.id}
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
                    onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    Start Assessment <ArrowRight size={16} />
                  </button>
                </div>

                {/* 1. YOUR IPO JOURNEY (5 STAGES) */}
                <div style={{ marginBottom: '36px', background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <TrendingUp size={20} color="#FF7200" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Your IPO Journey</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                    {activeServiceData.journeyStages.map((stage, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', position: 'relative' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FF7200', display: 'block', marginBottom: '4px' }}>
                          STAGE {stage.num}
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>{stage.title}</h4>
                        <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0, lineHeight: '1.4' }}>{stage.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. KEY IPO READINESS AREAS CARD */}
                <div style={{ marginBottom: '36px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Key IPO Readiness Areas</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                    {activeServiceData.readinessAreas.map((area, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255, 114, 0, 0.12)', color: '#FF7200', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span style={{ color: '#1E293B', fontSize: '0.92rem', fontWeight: '600' }}>{area}</span>
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

                {/* 4. GROWTHORA EXECUTION PROCESS */}
                <div style={{ marginBottom: '36px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Growthora Support Process</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {activeServiceData.process.map((step, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#FF7200', display: 'block', marginBottom: '6px' }}>
                          STEP 0{step.step}
                        </span>
                        <h5 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A', margin: '0 0 6px' }}>{step.title}</h5>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0, lineHeight: '1.4' }}>{step.desc}</p>
                      </div>
                    ))}
                  </div>
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
                      onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                      Start Your IPO Readiness Assessment →
                    </button>
                  </div>
                </div>

              </div>

            </main>

          </div>

        </div>
      </section>

      {/* 3. CAPITAL MARKET EXCELLENCE */}
      <section className="foundation-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Capital Market Excellence</h2>
          </div>
          <div className="foundation-grid">
            <div className="foundation-card">
              <span className="f-num">01</span>
              <h4>BSE & NSE Platform Expertise</h4>
              <p>Specialized guidance across BSE SME, NSE Emerge, and Mainboard equity listing requirements.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">02</span>
              <h4>Intermediary Network</h4>
              <p>Direct coordination with SEBI-registered Category-I Merchant Bankers, Peer Reviewed Auditors & Legal Counsels.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">03</span>
              <h4>Governance & Structuring</h4>
              <p>Strengthening board composition, internal financial controls (IFC), and capital structure prior to DRHP filing.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">04</span>
              <h4>Post-Listing Stewardship</h4>
              <p>Continuous compliance management for LODR, quarterly investor disclosures, and secretarial audits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESS TIMELINE */}
      <section className="process-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">End-to-End Execution Process</h2>
          </div>
          <div className="process-timeline">
            {[
              { num: '01', title: 'Readiness & Diagnostic Audit', desc: 'Financial, legal, and secretarial audit to identify listing eligibility and gaps.' },
              { num: '02', title: 'Capital & Business Structuring', desc: 'Restructuring share capital, bonus issues, and corporate entity cleanup.' },
              { num: '03', title: 'Intermediary Onboarding', desc: 'Selecting and appointing Merchant Bankers, Legal Counsels, Registrar & Peer Auditors.' },
              { num: '04', title: 'DRHP / Prospectus Drafting', desc: 'Preparing draft offer documents and business story with legal vetting.' },
              { num: '05', title: 'SEBI & Exchange Filing', desc: 'Submitting DRHP to SEBI / Stock Exchanges for observations and approvals.' },
              { num: '06', title: 'Roadshows & Book Building', desc: 'Investor presentation, anchor placement, and public issue marketing.' },
              { num: '07', title: 'Allotment & Stock Listing', desc: 'Finalizing issue pricing, share allotment, and formal exchange trading commencement.' },
              { num: '08', title: 'Post-Listing LODR Compliance', desc: 'Quarterly secretarial filings, SEBI compliance, and investor relationship management.' },
            ].map((step, idx) => (
              <div className="process-step-item" key={idx}>
                <div className="ps-num">{step.num}</div>
                <div className="ps-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="faq-section" style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">IPO Advisory FAQs</h2>
          </div>
          <div className="faq-accordion-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {IPO_CATEGORY_DATA.faqs.map((faq, idx) => (
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
            Planning an IPO for your business?
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Talk to our advisory team and understand the right path to the public markets.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '14px 32px', fontSize: '1.05rem', background: '#FF7200', borderColor: '#FF7200' }} 
              onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
        selectedService={{ title: 'IPO Advisory & Exchange Listing', category: 'IPO' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
