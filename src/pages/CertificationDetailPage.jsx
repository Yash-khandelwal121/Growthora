import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, CheckCircle, ArrowRight, Award, ChevronDown, ChevronUp, FileText, ShieldCheck, Users, Globe, Briefcase } from 'lucide-react';
import { CERTIFICATION_DATA } from '../data/certificationData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function CertificationDetailPage() {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  // Find the matching service data by slug
  const detailData = Object.values(CERTIFICATION_DATA).find(svc => svc.slug === serviceSlug);

  if (!detailData) {
    return (
      <div className="services-page-root">
        <Header 
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onOpenAskGrowthora={() => setIsAskOpen(true)}
        />
        <div style={{ padding: '200px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Certification Service Not Found</h2>
          <p>The certification service you are looking for does not exist.</p>
          <button className="btn-primary" onClick={() => navigate('/services/certifications')}>
            Return to Certifications
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
          <button className="back-btn-ghost" onClick={() => navigate('/services/certifications')}>
            <ArrowLeft size={16} /> Back to Certifications
          </button>

          <div className="sd-hero-grid">
            <div className="sd-hero-content">
              <div className="eyebrow-badge" style={{ marginBottom: '20px' }}>
                <Award className="eyebrow-icon" size={14} />
                <span>CERTIFICATIONS</span>
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
                <button className="btn-hero-primary" onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <span>Book a Free Consultation</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="sd-hero-img-wrapper" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img
                src={detailData.heroImage}
                alt={detailData.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SPLIT */}
      <section className="sd-content-section">
        <div className="sd-container">
          <div className="sd-content-grid">

            {/* LEFT COLUMN */}
            <div className="sd-main-content">

              {/* 2. OVERVIEW */}
              <h2>Overview</h2>
              <p><strong>What it is:</strong> {detailData.overview.whatItIs}</p>
              <p><strong>Why it matters:</strong> {detailData.overview.whyImportant}</p>

              {/* 3. WHAT YOU GET */}
              <h2>What You Get</h2>
              <ul className="sd-check-list">
                {detailData.whatYouGet.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle size={18} className="sd-check-icon" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* 4. ELIGIBILITY */}
              <h2>Eligibility Criteria</h2>
              <ul className="sd-check-list">
                {detailData.eligibility.map((item, idx) => (
                  <li key={idx}>
                    <ShieldCheck size={18} className="sd-check-icon" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* 5. DOCUMENTS REQUIRED */}
              <h2>Documents Required</h2>
              <ul className="sd-check-list">
                {detailData.documents.map((doc, idx) => (
                  <li key={idx}>
                    <FileText size={18} className="sd-check-icon" />
                    {doc}
                  </li>
                ))}
              </ul>

              {/* 6. PROCESS */}
              <h2>Certification Process</h2>
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
              <div className="sd-sidebar-card">
                <h3>Certification Summary</h3>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '8px' }}>Timeline &amp; Processing</div>
                  <div style={{ fontSize: '0.95rem', color: 'white', lineHeight: '1.5' }}>{detailData.timeline}</div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8', fontStyle: 'italic', margin: 0 }}>
                    *Growthora provides advisory and execution support but cannot guarantee approval. Approval depends entirely on the respective certification authority.
                  </p>
                </div>

                <div style={{ marginTop: '40px' }}>
                  <button className="btn-primary" style={{ width: '100%', marginBottom: '12px' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Book a Free Consultation
                  </button>
                  <button className="btn-secondary" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Talk to an Expert
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. WHY GROWTHORA + 10. FINAL CTA */}
      <section className="category-final-cta" style={{ background: '#0F172A', padding: '100px 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '16px' }}>Why Businesses Choose Growthora</h2>
          <div className="wg-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '60px' }}>
            {[
              { title: 'Expert Advisory', icon: Award },
              { title: 'End-to-End Execution', icon: CheckCircle },
              { title: 'Documentation Support', icon: FileText },
              { title: 'Compliance-Focused', icon: ShieldCheck },
              { title: 'Transparent Communication', icon: Globe },
              { title: 'Dedicated Advisory Team', icon: Users },
            ].map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', color: 'white' }}>
                  <Icon size={20} color="#FF7200" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{reason.title}</div>
                </div>
              );
            })}
          </div>

          <h3 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '20px' }}>
            Ready to Strengthen Your Business?
          </h3>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Tell us what your business needs. Growthora will help you identify the relevant certification and guide you through the process.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Book a Free Consultation
            </button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: detailData.title, category: 'CERTIFICATIONS' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
