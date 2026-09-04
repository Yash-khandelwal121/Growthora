import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, CheckCircle, ArrowRight, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { FINANCE_FUNDING_DATA } from '../data/financeFundingData';

export default function FinanceFundingDetailPage() {
  const { categoryId, grantId } = useParams();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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
      <Header />

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
                <button className="btn-hero-primary">
                  <span>Start Your Application</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="sd-hero-img-wrapper" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img 
                src={detailData.heroImage || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={detailData.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
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

              {/* 6. PROCESS */}
              <h2>The Application Process</h2>
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

              {/* 9. FAQs */}
              <div className="sd-faqs">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-accordion-wrapper">
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

            </div>

            {/* RIGHT COLUMN: SIDEBAR */}
            <div className="sd-sidebar">
              <div className="sd-sidebar-card">
                
                {/* 5. DOCUMENTS / READINESS */}
                <h3>Required Documents</h3>
                <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '20px' }}>
                  The exact documents required vary depending on the funding route, but commonly include:
                </p>
                <ul className="custom-check-list white-list" style={{ marginBottom: '40px' }}>
                  {detailData.documents.map((doc, idx) => (
                    <li key={idx} style={{ fontSize: '0.95rem', marginBottom: '12px' }}>
                      <CheckCircle size={16} color="#FF7200" style={{ flexShrink: 0, marginTop: '2px' }} />
                      {doc}
                    </li>
                  ))}
                </ul>

                {/* 7. EXPECTED TIMELINE */}
                <h3>Expected Timeline</h3>
                <div className="sd-timeline" style={{ background: 'rgba(255,114,0,0.1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,114,0,0.2)' }}>
                  <p style={{ fontSize: '0.95rem', margin: 0, color: '#FFEDD5', lineHeight: '1.5' }}>
                    {detailData.timeline}
                  </p>
                </div>
                
                <div style={{ marginTop: '20px', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8', fontStyle: 'italic', margin: 0 }}>
                    *Growthora provides advisory and execution support but cannot guarantee approval. Approval depends entirely on the respective authority or investor.
                  </p>
                </div>

                <div style={{ marginTop: '40px' }}>
                  <button className="btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
                    Book a Free Consultation
                  </button>
                  <button className="btn-secondary" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                    Talk to an Expert
                  </button>
                </div>
              </div>
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
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>Start Process</button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>Talk to an Expert</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
