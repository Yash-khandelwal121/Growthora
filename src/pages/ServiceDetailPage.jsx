import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, CheckCircle, ArrowRight, ShieldCheck, FileText, Settings, HelpCircle, ChevronDown, ChevronUp, Building } from 'lucide-react';
import { DETAILED_SERVICES_DATA } from '../data/detailedServicesData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { FundingSolutionPopup } from '../components/FundingSolutionPopup';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const serviceData = DETAILED_SERVICES_DATA[serviceId];
  
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);

  // If URL is invalid, redirect back to category
  useEffect(() => {
    if (!serviceData) {
      navigate('/services/registration');
    }
  }, [serviceData, navigate]);

  if (!serviceData) return null;

  return (
    <div className="service-detail-root">
      <Header 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />
      
      {/* Service Hero */}
      <section className="sd-hero">
        <div className="sd-container">
          <button className="back-btn-ghost" onClick={() => navigate('/services/registration')}>
            <ArrowLeft size={16} /> Back to Registration Services
          </button>
          
          <div className="sd-hero-grid">
            <div className="sd-hero-content">
              <div className="eyebrow-badge">
                <ShieldCheck className="eyebrow-icon" size={14} />
                <span>GROWTHORA ADVISORY</span>
              </div>
              <h1 className="hero-title">{serviceData.title}</h1>
              <p className="hero-subtitle">{serviceData.subtitle}</p>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
                {serviceData.description}
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn-primary" onClick={() => setIsFundingModalOpen(true)}>
                  Book Free Consultation
                </button>
              </div>
            </div>
            <div className="sd-hero-visual">
              <div className="sd-hero-img-wrapper">
                {serviceData.heroImage ? (
                  <img src={serviceData.heroImage} alt={serviceData.title} className="sd-hero-img" />
                ) : (
                  <div className="placeholder-hero-graphic registration-graphic">
                    <Building size={80} color="#FF7200" opacity={0.8} />
                  </div>
                )}
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
              <p><strong>What it is:</strong> {serviceData.overview.whatItIs}</p>
              <p><strong>Why it's important:</strong> {serviceData.overview.whyImportant}</p>
              <p><strong>Who needs it:</strong> {serviceData.overview.whoNeedsIt}</p>
              
              <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>Key Benefits</h3>
              <ul className="sd-check-list">
                {serviceData.overview.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <CheckCircle size={18} className="sd-check-icon" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* What You Get */}
              <h2>What You Get with Growthora</h2>
              <ul className="sd-check-list">
                {serviceData.whatYouGet.map((item, idx) => (
                  <li key={idx}>
                    <ArrowRight size={18} className="sd-check-icon" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Documents Required */}
              <h2>Documents Required</h2>
              <ul className="sd-check-list">
                {serviceData.documents.map((doc, idx) => (
                  <li key={idx}>
                    <FileText size={18} className="sd-check-icon" />
                    {doc}
                  </li>
                ))}
              </ul>

              {/* Process */}
              <h2>Registration Process</h2>
              <div className="sd-process-steps">
                {serviceData.process.map((step, idx) => (
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
                {serviceData.faqs.map((faq, idx) => (
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
        selectedService={{ title: serviceData.title, category: 'REGISTRATION' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />

      {/* Floating trigger button */}
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
