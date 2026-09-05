import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, CheckCircle, ArrowRight, ShieldCheck, ChevronDown, ChevronUp, Rocket, Users, TrendingUp } from 'lucide-react';
import { FINANCE_FUNDING_DATA } from '../data/financeFundingData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { FundingSolutionPopup } from '../components/FundingSolutionPopup';

export default function FinanceFundingDetailPage() {
  const { categoryId, grantId } = useParams();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, grantId]);

  // Determine if we are rendering a major category or a specific grant
  let detailData = null;
  let backLink = '/services/finance-funding';
  let backText = 'Back to Finance & Funding';

  if (grantId && FINANCE_FUNDING_DATA.grants[grantId]) {
    detailData = FINANCE_FUNDING_DATA.grants[grantId];
  } else if (categoryId && FINANCE_FUNDING_DATA[`${categoryId}Funding`]) {
    detailData = FINANCE_FUNDING_DATA[`${categoryId}Funding`];
  } else if (categoryId === 'vc-angel' && FINANCE_FUNDING_DATA.vcAngelFunding) {
    detailData = FINANCE_FUNDING_DATA.vcAngelFunding;
  }

  if (!detailData) {
    return (
      <div className="services-page-root">
        <Header />
        <div style={{ padding: '200px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Funding Pathway Not Found</h2>
          <p>The funding pathway you are looking for does not exist.</p>
          <button className="btn-primary" onClick={() => navigate(backLink)}>
            Return to Finance & Funding
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="service-detail-root">
      <Header 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* 1. HERO SECTION */}
      <section className="sd-hero">
        <div className="sd-container">
          <button className="back-btn-ghost" onClick={() => navigate(backLink)}>
            <ArrowLeft size={16} /> {backText}
          </button>
          
          <div className="sd-hero-grid">
            <div className="sd-hero-content">
              <div className="eyebrow-badge" style={{ marginBottom: '20px' }}>
                <ShieldCheck className="eyebrow-icon" size={14} />
                <span>FINANCE & FUNDING</span>
              </div>
              <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>
                {detailData.title}
              </h1>
              <h2 style={{ color: '#FF7200', fontSize: '1.4rem', fontWeight: '600', marginBottom: '20px' }}>
                {detailData.subtitle}
              </h2>
              <p className="hero-subtitle" style={{ fontSize: '1.1rem' }}>
                {detailData.description}
              </p>
              
              <div className="hero-cta-group" style={{ marginTop: '30px' }}>
                <button className="btn-hero-primary" onClick={() => setIsFundingModalOpen(true)}>
                  <span>Start Your Application</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {detailData.heroHighlights && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  {detailData.heroHighlights.map((hh, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      {hh.icon === 'Rocket' && <Rocket size={20} color="#FF7200" style={{ flexShrink: 0, marginTop: '2px' }} />}
                      {hh.icon === 'Users' && <Users size={20} color="#FF7200" style={{ flexShrink: 0, marginTop: '2px' }} />}
                      {hh.icon === 'TrendingUp' && <TrendingUp size={20} color="#FF7200" style={{ flexShrink: 0, marginTop: '2px' }} />}
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#0F172A' }}>{hh.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: '1.4' }}>{hh.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="sd-hero-img-wrapper" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img 
                src={detailData.heroImage || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={detailData.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SPLIT */}
      <section className="sd-content-section">
        <div className="sd-container">
          <div className="sd-content-grid">
            
            {/* LEFT COLUMN: DETAILS */}
            <div className="sd-main-content">
              
              {/* 2. OVERVIEW */}
              <h2>Overview</h2>
              <p><strong>What it is:</strong> {detailData.overview.whatItIs}</p>
              <p><strong>Why it is important:</strong> {detailData.overview.whyImportant}</p>
              
              {/* 3. WHAT YOU GET */}
              <h2>How We Help</h2>
              <ul className="sd-check-list">
                {detailData.whatYouGet.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle className="sd-check-icon" size={20} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* 4. ELIGIBILITY / WHO IT'S FOR */}
              <h2>Who Is This For?</h2>
              <ul className="sd-check-list">
                {detailData.idealFor.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle className="sd-check-icon" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#64748B' }}>
                *Eligibility depends heavily on the specific nature of your business and the current guidelines of the respective funding body.
              </p>

              {/* 5. DOCUMENTS REQUIRED */}
              <h2>Documents Required</h2>
              <ul className="sd-check-list">
                {detailData.documents.map((doc, idx) => (
                  <li key={idx}>
                    <ArrowRight className="sd-check-icon" size={20} />
                    {doc}
                  </li>
                ))}
              </ul>

              {/* 6. PROCESS */}
              <h2>Funding Process</h2>
              <div className="sd-process-steps">
                {detailData.process.map((step, idx) => (
                  <div className="sd-step" key={idx}>
                    <div className="sd-step-num">{step.step}</div>
                    <div className="sd-step-content">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 7. FAQS */}
              <div className="sd-faqs">
                <h2>Frequently Asked Questions</h2>
                {detailData.faqs.map((faq, idx) => (
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

            {/* RIGHT COLUMN: SIDEBAR */}
            <div className="sd-sidebar">
              <FundingSolutionPopup />
            </div>

          </div>
        </div>
      </section>

      {/* 8. WHY GROWTHORA & 10. FINAL CTA */}
      <section className="category-final-cta" style={{ background: '#0F172A', padding: '100px 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px' }}>Why Founders Choose Growthora</h2>
          <div className="wg-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '60px' }}>
            {[
              "Expert Advisory",
              "End-to-End Support",
              "Document Readiness",
            ].map((reason, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', color: 'white', fontWeight: '500' }}>
                {reason}
              </div>
            ))}
          </div>

          <h3 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '20px' }}>Ready to Secure Your Funding?</h3>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Let us handle the complexity of investor readiness, documentation, and applications so you can focus on building your business.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Start Process</button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Talk to an Expert</button>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: detailData.title, category: 'FINANCE & FUNDING' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />

      {/* Mobile floating trigger button */}
      <button
        className="fp-mobile-trigger"
        onClick={() => setIsFundingModalOpen(true)}
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          background: '#FF7200',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: '0 8px 30px rgba(255, 114, 0, 0.3)',
          cursor: 'pointer'
        }}
      >
        Check Eligibility →
      </button>

      {isFundingModalOpen && (
        <FundingSolutionPopup isModal={true} onClose={() => setIsFundingModalOpen(false)} />
      )}
    </div>
  );
}
