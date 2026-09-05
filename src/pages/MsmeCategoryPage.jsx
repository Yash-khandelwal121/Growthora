import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  ShieldCheck, FileText, Settings, Briefcase, Zap, 
  ArrowRight, ArrowLeft, CheckCircle, ChevronDown, ChevronUp,
  Landmark, Award, Sparkles, Clock, ChevronRight
} from 'lucide-react';
import { MSME_DATA, MSME_CATEGORY_DATA } from '../data/msmeData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function MsmeCategoryPage() {
  const navigate = useNavigate();
  const [activeSchemeSlug, setActiveSchemeSlug] = useState('electricity-duty-exemption');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  const schemesList = MSME_CATEGORY_DATA.schemesList;
  const activeSchemeData = MSME_DATA[activeSchemeSlug] || MSME_DATA['electricity-duty-exemption'];

  const handleSelectScheme = (slug) => {
    setActiveSchemeSlug(slug);
    const element = document.getElementById('active-scheme-content');
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
              <ArrowLeft size={16} /> Home / Services / MSME Benefits
            </button>
            <div className="eyebrow-badge" style={{ marginTop: '20px' }}>
              <Zap className="eyebrow-icon" size={14} />
              <span>GROWTHORA ADVISORY</span>
            </div>

            <h1 className="hero-title">
              MSME Benefits
            </h1>
            
            <h2 style={{ color: '#FF7200', fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', lineHeight: '1.4' }}>
              Every loan subsidy, capital grant, and state incentive identified, applied for, and secured end to end.
            </h2>

            <p className="hero-subtitle">
              We identify and unlock every government scheme, subsidy, and incentive your MSME is eligible for — from capital grants and interest subventions to state-level duty exemptions.
            </p>

            <div className="hero-cta-group" style={{ marginTop: '30px' }}>
              <button className="btn-hero-primary" onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button 
                className="btn-hero-secondary" 
                onClick={() => {
                  const el = document.getElementById('msme-schemes-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Government Schemes</span>
              </button>
            </div>
          </div>

          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion">
              <img 
                src="/services/msme_hero.jpg?v=2" 
                alt="MSME Government Benefits Advisory" 
                style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SECTION: SIDEBAR + DETAILED CONTENT AREA */}
      <section className="category-services-section" id="msme-schemes-section" style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
          
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">Government MSME Schemes & Subsidies</h2>
            <p className="section-subtitle">
              Select a government scheme from the sidebar to view eligibility, capital subsidies, required documents, and execution roadmap.
            </p>
          </div>

          {/* Flexible Grid Layout */}
          <div className="msme-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 300px) minmax(0, 1fr)', gap: '32px', alignItems: 'start' }}>
            
            {/* LEFT SIDEBAR: GOVERNMENT SCHEMES */}
            <aside style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '16px',
              padding: '20px 16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              position: 'sticky',
              top: '100px'
            }}>
              {/* Header with expand/collapse arrow */}
              <div 
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  padding: '8px 8px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #F1F5F9',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Landmark size={18} color="#FF7200" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', tracking: '0.05em', textTransform: 'uppercase' }}>
                    GOVERNMENT SCHEMES
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

              {/* Sidebar items */}
              {sidebarExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {schemesList.map((item) => {
                    const isActive = activeSchemeSlug === item.slug;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectScheme(item.slug)}
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
                          fontSize: '0.9rem',
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

            {/* RIGHT CONTENT: DETAILED ACTIVE SCHEME VIEW */}
            <main id="active-scheme-content" style={{ minWidth: 0 }}>
              
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
                      SCHEME 0{activeSchemeData.id}
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0F172A', margin: '0 0 8px', wordBreak: 'break-word' }}>
                      {activeSchemeData.title}
                    </h2>
                    <h3 style={{ fontSize: '1.15rem', color: '#FF7200', fontWeight: '600', margin: 0 }}>
                      {activeSchemeData.subtitle}
                    </h3>
                  </div>

                  <button 
                    type="button" 
                    className="btn-primary"
                    style={{ padding: '12px 22px', fontSize: '0.95rem', flexShrink: 0 }}
                    onClick={() => navigate(`/services/msme-benefits/${activeSchemeData.slug}`)}
                  >
                    View Details <ArrowRight size={16} />
                  </button>
                </div>

                {/* Banner Graphic Image */}
                <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', height: '240px', marginBottom: '30px' }}>
                  <img 
                    src={activeSchemeData.heroImage} 
                    alt={activeSchemeData.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                {/* Overview Description */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>Scheme Summary</h4>
                  <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                    {activeSchemeData.overview.whatItIs}
                  </p>
                </div>

                {/* Key Benefits Grid */}
                <div style={{ marginBottom: '36px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Key Benefits</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    {activeSchemeData.overview.benefits.map((benefit, idx) => (
                      <div key={idx} style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <CheckCircle size={18} color="#FF7200" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: '#1E293B', fontSize: '0.92rem', fontWeight: '500', lineHeight: '1.4' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements / Documents List */}
                <div style={{ marginBottom: '36px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Required Documentation & Inputs</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                    {activeSchemeData.documents.map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#FFFFFF', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                        <FileText size={16} color="#64748B" style={{ flexShrink: 0 }} />
                        <span style={{ color: '#475569', fontSize: '0.9rem' }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Execution Steps */}
                <div style={{ marginBottom: '36px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Growthora Support Process</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {activeSchemeData.process.map((step, idx) => (
                      <div key={idx} style={{ background: '#F8FAFC', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#FF7200', display: 'block', marginBottom: '6px' }}>
                          STEP {step.step}
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
                    <span>Expected Timeline: <strong>{activeSchemeData.timeline}</strong></span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      type="button" 
                      className="btn-primary" 
                      style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                      onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                      Apply for This Scheme
                    </button>
                  </div>
                </div>

              </div>

            </main>

          </div>

          {/* ALL 6 SCHEMES GRID DISPLAY */}
          <div style={{ marginTop: '70px' }}>
            <div className="section-header text-center" style={{ marginBottom: '40px' }}>
              <h2 className="section-title">All MSME Government Schemes</h2>
            </div>

            <div className="services-grid-wrapper" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {schemesList.map((item) => {
                const sData = MSME_DATA[item.slug];
                return (
                  <div 
                    key={item.id}
                    className="service-card-premium"
                    onClick={() => {
                      setActiveSchemeSlug(item.slug);
                      navigate(`/services/msme-benefits/${item.slug}`);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-content-left">
                      <div className="card-top-row">
                        <span className="card-number">{item.id}</span>
                      </div>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-desc">{sData.description.substring(0, 80)}...</p>
                      <button 
                        type="button" 
                        className="card-explore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/services/msme-benefits/${item.slug}`);
                        }}
                      >
                        View Details <ArrowRight size={16} />
                      </button>
                    </div>
                    <div className="card-image-right" style={{ backgroundImage: `url(${sData.cardImage})` }}>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHY MSME BENEFITS MATTER */}
      <section className="foundation-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Maximize Government Financial Assistance</h2>
          </div>
          <div className="foundation-grid">
            <div className="foundation-card">
              <span className="f-num">01</span>
              <h4>Capital Grants & Subsidies</h4>
              <p>Secure up to 35% capital subsidies for plant machinery, technology upgrading, and food processing units.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">02</span>
              <h4>3% Interest Subvention</h4>
              <p>Reduce annual debt servicing costs under Agriculture Infrastructure Fund and Animal Husbandry schemes.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">03</span>
              <h4>State Tax & Duty Exemptions</h4>
              <p>Unlock 100% Electricity Duty Exemption and state SGST reimbursements for industrial investments.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">04</span>
              <h4>Credit Guarantee Access</h4>
              <p>Access collateral-free bank credit options backed by central credit guarantee trusts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY GROWTHORA */}
      <section className="why-growthora-cards">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Founders Choose Growthora</h2>
          </div>
          <div className="wg-grid">
            {[
              "Complete Scheme Eligibility Audit",
              "Bankable DPR & Project Modeling",
              "Government Portal Application Filing",
              "Nodal Bank & Committee Coordination",
              "Disbursement & Subsidy Release",
              "One Dedicated Advisory Practice"
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
            <h2 className="section-title">MSME Schemes FAQs</h2>
          </div>
          <div className="faq-accordion-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {MSME_CATEGORY_DATA.faqs.map((faq, idx) => (
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
            Not sure which MSME scheme applies to your business?
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Consult our MSME government incentive specialists to map your business to eligible capital grants, interest subventions, and industrial schemes.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '14px 32px', fontSize: '1.05rem', background: '#FF7200', borderColor: '#FF7200' }} 
              onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Book a consultation →
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: 'MSME Government Schemes & Capital Subsidies', category: 'MSME BENEFITS' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
