import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, CheckCircle, ArrowRight, ShieldCheck, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { OPERATIONS_DATA } from '../data/operationsData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { FundingSolutionPopup } from '../components/FundingSolutionPopup';

export default function OperationsDetailPage() {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const detailData = OPERATIONS_DATA[serviceSlug];

  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  if (!detailData) {
    return (
      <div className="services-page-root">
        <Header 
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onOpenAskGrowthora={() => setIsAskOpen(true)}
        />
        <div style={{ padding: '200px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Operations Service Not Found</h2>
          <p>The operations service you are looking for does not exist.</p>
          <button className="btn-primary" onClick={() => navigate('/services/operations')}>
            Return to Operations Services
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
          <button className="back-btn-ghost" onClick={() => navigate('/services/operations')}>
            <ArrowLeft size={16} /> Back to Operations Services
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
                <button className="btn-primary" onClick={() => setIsFundingModalOpen(true)}>
                  Book Free Consultation
                </button>
              </div>
            </div>
            <div className="sd-hero-visual">
              <div className="sd-hero-img-wrapper" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <img 
                  src={detailData.heroImage} 
                  alt={detailData.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} 
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
              <h2>Overview</h2>
              <p><strong>What it is:</strong> {detailData.overview.whatItIs}</p>
              <p><strong>Why it's important:</strong> {detailData.overview.whyImportant}</p>
              <p><strong>Who needs it:</strong> {detailData.overview.whoNeedsIt}</p>
              
              <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>Key Benefits</h3>
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
              <h2>Required Inputs & Documents</h2>
              <ul className="sd-check-list">
                {detailData.documents.map((doc, idx) => (
                  <li key={idx}>
                    <FileText size={18} className="sd-check-icon" />
                    {doc}
                  </li>
                ))}
              </ul>

              {/* Process */}
              <h2>Implementation Process</h2>
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
              <FundingSolutionPopup />
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: detailData.title, category: 'OPERATIONS' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />

      {/* Mobile floating trigger button */}
      <button
        className="fp-mobile-trigger"
        onClick={() => setIsFundingModalOpen(true)}
      >
        Check Eligibility →
      </button>

      {isFundingModalOpen && (
        <FundingSolutionPopup isModal={true} onClose={() => setIsFundingModalOpen(false)} />
      )}
    </div>
  );
}
