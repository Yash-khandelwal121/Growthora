import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, CheckCircle, ArrowRight, ShieldCheck, FileText, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { MSME_DATA } from '../data/msmeData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function MsmeDetailPage() {
  const { schemeSlug } = useParams();
  const navigate = useNavigate();
  const detailData = MSME_DATA[schemeSlug];

  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [schemeSlug]);

  if (!detailData) {
    return (
      <div className="services-page-root">
        <Header 
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onOpenAskGrowthora={() => setIsAskOpen(true)}
        />
        <div style={{ padding: '200px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>MSME Scheme Not Found</h2>
          <p>The requested government scheme does not exist.</p>
          <button className="btn-primary" onClick={() => navigate('/services/msme-benefits')}>
            Return to MSME Benefits
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
      
      {/* Service Hero */}
      <section className="sd-hero">
        <div className="sd-container">
          <button className="back-btn-ghost" onClick={() => navigate('/services/msme-benefits')}>
            <ArrowLeft size={16} /> Back to MSME Benefits
          </button>
          
          <div className="sd-hero-grid">
            <div className="sd-hero-content">
              <div className="eyebrow-badge">
                <ShieldCheck className="eyebrow-icon" size={14} />
                <span>GROWTHORA ADVISORY</span>
              </div>
              <h1 className="hero-title">{detailData.title}</h1>
              <p className="hero-subtitle">{detailData.subtitle}</p>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
                {detailData.description}
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn-primary" onClick={() => setIsConsultationOpen(true)}>
                  Apply for Scheme
                </button>
              </div>
            </div>
            <div className="sd-hero-visual">
              <div className="sd-hero-img-wrapper" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <img 
                  src={detailData.heroImage} 
                  alt={detailData.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="sd-content-section">
        <div className="sd-container">
          <div className="sd-content-grid">
            
            <div className="sd-main-content">
              {/* Overview */}
              <h2>Scheme Overview</h2>
              <p><strong>What it is:</strong> {detailData.overview.whatItIs}</p>
              <p><strong>Why it's important:</strong> {detailData.overview.whyImportant}</p>
              <p><strong>Who needs it:</strong> {detailData.overview.whoNeedsIt}</p>
              
              <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>Key Benefits & Subsidies</h3>
              <ul className="sd-check-list">
                {detailData.overview.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <CheckCircle size={18} className="sd-check-icon" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* What You Get */}
              <h2>What You Get with Growthora</h2>
              <ul className="sd-check-list">
                {detailData.whatYouGet.map((item, idx) => (
                  <li key={idx}>
                    <ArrowRight size={18} className="sd-check-icon" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Documents Required */}
              <h2>Required Documentation</h2>
              <ul className="sd-check-list">
                {detailData.documents.map((doc, idx) => (
                  <li key={idx}>
                    <FileText size={18} className="sd-check-icon" />
                    {doc}
                  </li>
                ))}
              </ul>

              {/* Process */}
              <h2>Application & Clearance Process</h2>
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

              {/* FAQs */}
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

            {/* Sidebar */}
            <div className="sd-sidebar">
              <div className="sd-sidebar-card">
                <h3>Apply for Scheme Today</h3>
                
                <div className="sd-timeline">
                  <Settings size={20} className="sd-timeline-icon" />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Expected Timeline</div>
                    <div style={{ fontWeight: '500' }}>{detailData.timeline}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '12px' }}>Ideal For:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#CBD5E1' }}>
                    {detailData.idealFor.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '8px', paddingLeft: '16px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: '6px', width: '4px', height: '4px', borderRadius: '50%', background: '#FF7200' }}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginBottom: '12px' }}
                  onClick={() => setIsConsultationOpen(true)}
                >
                  Proceed with Application
                </button>
                <button 
                  className="btn-secondary" 
                  style={{ width: '100%', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  onClick={() => setIsConsultationOpen(true)}
                >
                  Request Scheme Callback
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: detailData.title, category: 'MSME BENEFITS' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
