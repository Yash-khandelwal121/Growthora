import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle, ChevronDown, ChevronUp,
  Clock, Award, FileText, ShieldCheck, Users, Globe, Zap, Star
} from 'lucide-react';
import { BRANDING_DATA } from '../data/brandingData';
import '../styles/branding.css';

const WHY_GROWTHORA = [
  { title: 'Strategic Approach', icon: Star },
  { title: 'End-to-End Execution', icon: CheckCircle },
  { title: 'Industry Experience', icon: Award },
  { title: 'Transparent Process', icon: Globe },
  { title: 'Results-Oriented', icon: Zap },
  { title: 'Dedicated Team', icon: Users },
];

const SIDEBAR_ITEMS = [
  { key: 'logoDesign',       label: 'Logo Design' },
  { key: 'websiteDev',       label: 'Website Development' },
  { key: 'seo',              label: 'SEO' },
  { key: 'socialMedia',      label: 'Social Media Marketing' },
  { key: 'adsLeadGen',       label: 'Ads & Lead Generation' },
  { key: 'brandingSolutions',label: 'Branding Solutions' },
];

export default function BrandingPage() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('logoDesign');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleSelect = (key) => {
    setActiveKey(key);
    setOpenFaqIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const svc = BRANDING_DATA[activeKey];

  return (
    <div className="branding-root">
      <Header />

      {/* ── Mobile Pill Nav ─────────────────────── */}
      <nav className="branding-mobile-nav" aria-label="Branding services">
        {SIDEBAR_ITEMS.map((item, idx) => (
          <button
            key={item.key}
            className={`branding-mobile-pill${activeKey === item.key ? ' active' : ''}`}
            onClick={() => handleSelect(item.key)}
          >
            {String(idx + 1).padStart(2, '0')} {item.label}
          </button>
        ))}
      </nav>

      {/* ── Page Header ─────────────────────────── */}
      <header className="branding-page-header">
        <div className="container">
          <button className="back-btn-ghost" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Ecosystem
          </button>

          {/* Breadcrumb */}
          <div className="branding-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <span className="bc-sep">/</span>
            <span onClick={() => navigate('/')}>Services</span>
            <span className="bc-sep">/</span>
            <span className="bc-active">Branding</span>
          </div>

          <h1 className="branding-page-title">Branding &amp; Growth Marketing</h1>
          <div className="branding-title-divider" />
          <p className="branding-page-desc">
            Logo, website, SEO, social media, ads, and full brand systems — everything your business needs to build presence, drive traffic, and convert customers.
          </p>
        </div>
      </header>

      {/* ── Main Layout ─────────────────────────── */}
      <div className="branding-layout">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="branding-sidebar">
          <ul className="branding-sidebar-nav" role="tablist">
            {SIDEBAR_ITEMS.map((item, idx) => (
              <li
                key={item.key}
                role="tab"
                aria-selected={activeKey === item.key}
                className={`branding-sidebar-item${activeKey === item.key ? ' active' : ''}`}
                onClick={() => handleSelect(item.key)}
              >
                <span className="branding-sidebar-num">{String(idx + 1).padStart(2, '0')}</span>
                {item.label}
              </li>
            ))}
          </ul>

          <div className="branding-sidebar-cta">
            <p>Not sure which branding service fits your business?</p>
            <button className="branding-sidebar-cta-btn">
              Book a consultation <ArrowRight size={16} />
            </button>
          </div>
        </aside>

        {/* ── RIGHT CONTENT PANEL ── */}
        <main className="branding-content" role="tabpanel">

          {/* 1. Service Hero Image */}
          <div className="branding-service-hero">
            <img
              src={svc.image}
              alt={svc.title}
              loading="lazy"
            />
            <div className="branding-service-hero-overlay" />
            <div className="branding-hero-badge">
              {String(SIDEBAR_ITEMS.findIndex(i => i.key === activeKey) + 1).padStart(2,'0')} — BRANDING &amp; GROWTH
            </div>
          </div>

          {/* 2. Overview */}
          <span className="branding-section-label">Overview</span>
          <h2>{svc.title}</h2>
          <p className="branding-service-subtitle">{svc.subtitle}</p>
          <p className="branding-content-desc">{svc.description}</p>

          <div className="branding-section-divider" />

          {/* 3. Key Benefits Card */}
          <div className="branding-benefits-card">
            <div className="branding-benefits-card-header">
              <span className="branding-benefits-card-badge">Key Benefits</span>
            </div>
            <div className="branding-benefits-list">
              {svc.benefits.map((b, idx) => (
                <div key={idx} className="branding-benefit-item">
                  <div className="branding-benefit-icon">
                    <Check size={14} />
                  </div>
                  <div className="branding-benefit-text">
                    <strong>{b.title}</strong>
                    <span>{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="branding-section-divider" />

          {/* 4. What You Get */}
          <span className="branding-section-label">What You Get</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Included in This Service</h2>
          <div className="branding-wyg-grid">
            {svc.whatYouGet.map((item, idx) => (
              <div key={idx} className="branding-wyg-item">
                <CheckCircle size={18} color="#FF7200" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="branding-section-divider" />

          {/* 5. Our Process */}
          <span className="branding-section-label">Our Process</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>How We Work</h2>
          <div className="branding-process-grid">
            {svc.process.map((step, idx) => (
              <div key={idx} className="branding-process-step">
                <div className="branding-process-num">{step.step}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="branding-section-divider" />

          {/* 6. Who Is This For */}
          <span className="branding-section-label">Ideal For</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Who Is This For?</h2>
          <div className="branding-audience-list">
            {svc.whoIsItFor.map((item, idx) => (
              <div key={idx} className="branding-audience-item">
                <Users size={16} color="#FF7200" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="branding-section-divider" />

          {/* 7. Expected Timeline */}
          <span className="branding-section-label">Timeline</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Expected Timeline</h2>
          <div className="branding-timeline-box">
            <Clock size={22} className="branding-timeline-icon" />
            <p>{svc.timeline}</p>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', fontStyle: 'italic', marginTop: '8px' }}>
            *Timelines are indicative and depend on scope, feedback cycles, and project complexity.
          </p>

          <div className="branding-section-divider" />

          {/* 8. Why Choose Growthora */}
          <span className="branding-section-label">Why Growthora</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Why Businesses Choose Growthora</h2>
          <div className="branding-wg-grid">
            {WHY_GROWTHORA.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="branding-wg-card">
                  <Icon size={22} />
                  <h4>{item.title}</h4>
                </div>
              );
            })}
          </div>

          <div className="branding-section-divider" />

          {/* 9. FAQs */}
          <span className="branding-section-label">FAQ</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Frequently Asked Questions</h2>
          <div className="branding-faq-list">
            {svc.faqs.map((faq, idx) => (
              <div className="sd-faq-item" key={idx}>
                <div
                  className="sd-faq-q"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  {faq.q}
                  {openFaqIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {openFaqIndex === idx && (
                  <div className="sd-faq-a">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

          {/* 10. Final CTA */}
          <div className="branding-final-cta" style={{ marginTop: '48px' }}>
            <h3>Ready to Build Your Brand?</h3>
            <p>
              Tell us about your business. Growthora will put together the right branding strategy and execution plan to help you stand out, attract customers, and grow.
            </p>
            <div className="branding-cta-btns">
              <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                Book a Free Consultation
              </button>
              <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                Talk to an Expert
              </button>
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
