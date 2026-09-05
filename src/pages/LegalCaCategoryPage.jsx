import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  ShieldCheck, FileText, Settings, Briefcase, Zap, Building, 
  ArrowRight, ArrowLeft, CheckCircle, ChevronDown, ChevronUp,
  Scale, FileSignature, Award, Calculator, Lock, Scroll
} from 'lucide-react';
import { LEGAL_CA_DATA, LEGAL_CA_CATEGORY_DATA } from '../data/legalCaData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function LegalCaCategoryPage() {
  const navigate = useNavigate();
  const [activeCategorySlug, setActiveCategorySlug] = useState('post-registration-compliance');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  const sidebarCategories = [
    { id: '01', slug: 'post-registration-compliance', label: 'Post Registration Compliance', icon: Scroll },
    { id: '02', slug: 'legal-compliance', label: 'Legal Compliance', icon: Scale },
    { id: '03', slug: 'licence-registrations', label: 'Licence', icon: Award },
    { id: '04', slug: 'agreement-drafting', label: 'Agreement Drafting', icon: FileSignature },
    { id: '05', slug: 'patent-ip', label: 'Patent & IP', icon: Lock },
    { id: '06', slug: 'accounting-ca-services', label: 'Accounting & CA Services', icon: Calculator }
  ];

  const handleSelectSidebar = (slug) => {
    setActiveCategorySlug(slug);
    const targetEl = document.getElementById(`card-${slug}`);
    if (targetEl) {
      const yOffset = -100;
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="services-page-root">
      <Header 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />
      
      {/* 1. HERO SECTION */}
      <section className="category-hero-section">
        <div className="hero-glow-bg" />
        <div className="hero-container">
          
          <div className="hero-content">
            <button className="back-btn-ghost" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Home / Services / Legal & CA
            </button>
            <div className="eyebrow-badge" style={{ marginTop: '20px' }}>
              <Zap className="eyebrow-icon" size={14} />
              <span>GROWTHORA ADVISORY</span>
            </div>

            <h1 className="hero-title">
              Legal & CA
            </h1>
            
            <h2 style={{ color: '#FF7200', fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', lineHeight: '1.4' }}>
              Agreements, IP, compliance, and advisory support — keeping the legal and financial side of your business protected and compliant.
            </h2>

            <p className="hero-subtitle">
              From corporate compliance filings and custom agreements to IP protection and Chartered Accountant support, Growthora keeps your business statutory-ready.
            </p>

            <div className="hero-cta-group" style={{ marginTop: '30px' }}>
              <button className="btn-hero-primary" onClick={() => setIsConsultationOpen(true)}>
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button 
                className="btn-hero-secondary" 
                onClick={() => {
                  const el = document.getElementById('legal-ca-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Legal & CA</span>
              </button>
            </div>
          </div>

          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion">
              <img 
                src="/services/legal_hero.jpg" 
                alt="Legal & CA Advisory Practice" 
                style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SECTION WITH SIDEBAR & CARDS GRID */}
      <section className="category-services-section" id="legal-ca-services" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          
          <div className="section-header text-center" style={{ marginBottom: '50px' }}>
            <h2 className="section-title">Legal & CA Services</h2>
            <p className="section-subtitle">
              Comprehensive legal, CA, taxation, and intellectual property solutions tailored for business founders.
            </p>
          </div>

          {/* Interactive Layout: Sidebar + Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '36px', alignItems: 'start' }}>
            
            {/* LEFT SIDEBAR CATEGORY NAVIGATION */}
            <aside style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '16px',
              padding: '20px 16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              position: 'sticky',
              top: '110px'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', tracking: '0.05em', marginBottom: '16px', paddingLeft: '8px' }}>
                Practice Categories
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sidebarCategories.map((cat) => {
                  const isActive = activeCategorySlug === cat.slug;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectSidebar(cat.slug)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: 'none',
                        background: isActive ? 'rgba(255, 114, 0, 0.1)' : 'transparent',
                        color: isActive ? '#FF7200' : '#475569',
                        fontWeight: isActive ? '600' : '500',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '700', 
                        padding: '2px 6px', 
                        borderRadius: '6px', 
                        background: isActive ? '#FF7200' : '#E2E8F0', 
                        color: isActive ? '#FFFFFF' : '#64748B' 
                      }}>
                        {cat.id}
                      </span>
                      <span style={{ flexGrow: 1 }}>{cat.label}</span>
                      {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF7200' }} />}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* RIGHT CARDS GRID (3-Column Desktop Grid Layout) */}
            <div className="services-grid-wrapper" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {sidebarCategories.map((cat) => {
                const serviceData = LEGAL_CA_DATA[cat.slug];
                const isActiveCard = activeCategorySlug === cat.slug;
                return (
                  <div 
                    id={`card-${cat.slug}`}
                    key={cat.id} 
                    className="service-card-premium"
                    onClick={() => {
                      setActiveCategorySlug(cat.slug);
                      navigate(`/services/legal-ca/${cat.slug}`);
                    }}
                    style={{ 
                      cursor: 'pointer',
                      border: isActiveCard ? '1.5px solid #FF7200' : '1px solid rgba(0,0,0,0.05)',
                      boxShadow: isActiveCard ? '0 8px 30px rgba(255,114,0,0.12)' : '0 4px 20px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div className="card-content-left">
                      <div className="card-top-row">
                        <span className="card-number">{cat.id}</span>
                      </div>
                      <h3 className="card-title">{serviceData.title}</h3>
                      <p className="card-desc">{serviceData.description.substring(0, 80)}...</p>
                      <button 
                        type="button" 
                        className="card-explore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/services/legal-ca/${cat.slug}`);
                        }}
                      >
                        View Details <ArrowRight size={16} />
                      </button>
                    </div>
                    <div className="card-image-right" style={{ backgroundImage: `url(${serviceData.cardImage})` }}>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 3. WHY LEGAL & CA MATTERS */}
      <section className="foundation-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Protect & Scale Your Enterprise</h2>
          </div>
          <div className="foundation-grid">
            <div className="foundation-card">
              <span className="f-num">01</span>
              <h4>Maintain Statutory Standing</h4>
              <p>Keep your company fully compliant with ROC, tax, and labor law regulations without risk of penalties.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">02</span>
              <h4>Secure IP & Brand Value</h4>
              <p>Register trademarks, patents, and copyrights to build exclusive, defensible intangible assets.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">03</span>
              <h4>Water-Tight Commercial Agreements</h4>
              <p>Protect business revenue, equity, and IP with professionally drafted contracts and NDAs.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">04</span>
              <h4>Audit-Ready Financials</h4>
              <p>Ensure your accounting, GST, and Income Tax returns are structured for investor and lender due diligence.</p>
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
              { num: '01', title: 'Consultation & Scope Assessment', desc: 'Analyzing legal or CA requirements based on entity type and stage.' },
              { num: '02', title: 'Document Verification', desc: 'Gathering identity proofs, financial records, and previous filings.' },
              { num: '03', title: 'Drafting & Vetting', desc: 'Preparing agreements, ROC returns, or tax filings with CA/legal experts.' },
              { num: '04', title: 'Review & Client Approval', desc: 'Sharing drafts with founders for feedback and sign-off.' },
              { num: '05', title: 'Statutory Portal Filing', desc: 'Submitting applications directly to MCA, Income Tax, GST, or IPO portals.' },
              { num: '06', title: 'Clarification & Hearing Support', desc: 'Managing officer queries, objections, or examination replies.' },
              { num: '07', title: 'Certificate / Filing Approval', desc: 'Receiving approved filings, licenses, or trademark certificates.' },
              { num: '08', title: 'Ongoing Governance & Reminders', desc: 'Continuous compliance tracking and automated renewal alerts.' },
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

      {/* 5 & 6. WHO IS IT FOR & DELIVERABLES */}
      <section className="two-col-info-section">
        <div className="container">
          <div className="info-grid-2">
            <div className="info-card-premium">
              <h2 className="section-title">Who Is Legal & CA Support For?</h2>
              <ul className="custom-check-list">
                <li><CheckCircle size={18} /> Newly incorporated Private Limiteds & LLPs needing post-registration filings</li>
                <li><CheckCircle size={18} /> Founders onboarding partners, investors, or key employees</li>
                <li><CheckCircle size={18} /> Companies requiring monthly bookkeeping, GST, and ITR filings</li>
                <li><CheckCircle size={18} /> Brand owners and innovators protecting Trademarks & Patents</li>
                <li><CheckCircle size={18} /> Businesses receiving legal or statutory notices</li>
                <li><CheckCircle size={18} /> Enterprises seeking operating licenses (IEC, Shop Act, FSSAI)</li>
                <li><CheckCircle size={18} /> Teams preparing for due diligence or financial audits</li>
              </ul>
            </div>
            
            <div className="info-card-premium dark-card">
              <h2 className="section-title text-white">Core Deliverables & Filings</h2>
              <p style={{ color: '#CBD5E1', marginBottom: '20px' }}>
                Key legal and statutory records provided by our practice:
              </p>
              <ul className="custom-check-list white-list">
                <li><FileText size={18} /> INC-20A, ADT-1, AOC-4 & MGT-7 ROC Acknowledgments</li>
                <li><FileText size={18} /> Water-tight NDAs, MSAs, & Founder Shareholder Agreements</li>
                <li><FileText size={18} /> Trademark & Patent Filing Certificates (Form TM-A / IPO)</li>
                <li><FileText size={18} /> Monthly Balance Sheets, P&L, & GST Return Summaries</li>
                <li><FileText size={18} /> Government Operating Licenses (IEC, Gumasta, FSSAI)</li>
                <li><FileText size={18} /> Income Tax Return (ITR) & Audit Clearance Reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY GROWTHORA */}
      <section className="why-growthora-cards">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Founders Choose Growthora</h2>
          </div>
          <div className="wg-grid">
            {[
              "Qualified Legal & CA Professionals",
              "Zero-Delay Statutory Filings",
              "Custom Water-Tight Agreements",
              "Transparent Pricing & No Hidden Fees",
              "End-to-End Audit & Tax Support",
              "One Dedicated Advisory Team"
            ].map((reason, idx) => (
              <div className="wg-card" key={idx}>
                <ShieldCheck size={24} color="#FF7200" />
                <h4>{reason}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="faq-section" style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Legal & CA FAQs</h2>
          </div>
          <div className="faq-accordion-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {LEGAL_CA_CATEGORY_DATA.faqs.map((faq, idx) => (
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

      {/* 9. BOTTOM CONSULTATION CTA */}
      <section className="category-final-cta" style={{ background: '#0F172A', padding: '90px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginBottom: '20px' }}>
            Not sure which legal or CA service applies to your business?
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Speak with our corporate legal and CA advisors to get clarity on your statutory compliance, agreement requirements, and tax structure.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '14px 32px', fontSize: '1.05rem', background: '#FF7200', borderColor: '#FF7200' }} 
              onClick={() => setIsConsultationOpen(true)}
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
        selectedService={{ title: 'Legal, CA & Corporate Compliance', category: 'LEGAL & CA' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
