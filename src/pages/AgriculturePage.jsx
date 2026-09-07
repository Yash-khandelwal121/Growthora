import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  Leaf,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { AGRICULTURE_PAGE_DATA } from '../data/agricultureData';
import { INDUSTRIES_DATA } from '../data/industriesData';

import '../styles/index.css';
import '../styles/animations.css';
import '../styles/agriculture.css';

// Dynamic Registration Icon Mapper
const RegIcon = ({ iconName, size = 22 }) => {
  const iconMap = {
    Award,
    ShieldCheck,
    CheckCircle2,
    Users,
    Leaf
  };
  const Component = iconMap[iconName] || Award;
  return <Component size={size} />;
};

export default function AgriculturePage() {
  const navigate = useNavigate();
  const { industrySlug } = useParams();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);

  const {
    hero,
    overview,
    registrations,
    painPoints,
    departments,
    schemes,
    fundingCta
  } = AGRICULTURE_PAGE_DATA;

  // Dynamic industry data matching
  const currentSlug = industrySlug || 'agriculture';
  const matchedIndustry = INDUSTRIES_DATA.find((ind) => ind.slug === currentSlug) || INDUSTRIES_DATA[0];

  const heroTitle = currentSlug === 'agriculture'
    ? hero.title
    : `${matchedIndustry.name} - Advisory, Funding & Growth`;

  const heroDescription = currentSlug === 'agriculture'
    ? hero.description
    : matchedIndustry.description;

  const heroEyebrow = matchedIndustry ? matchedIndustry.name.toUpperCase() : 'AGRICULTURE';
  const heroImage = matchedIndustry ? matchedIndustry.image : '/industries/agriculture.jpg';

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Industries', link: '/industries' },
    { label: matchedIndustry ? matchedIndustry.name : 'Agriculture', link: `/industries/${currentSlug}` }
  ];

  // Open consultation modal helper
  const handleOpenConsultation = (customTitle = null) => {
    if (customTitle) {
      setSelectedServiceForModal({
        id: 'agri-consult',
        navLabel: customTitle,
        title: customTitle,
        categoryName: `${matchedIndustry.name} Industry`
      });
    } else {
      setSelectedServiceForModal({
        id: 'agri-gen',
        navLabel: `${matchedIndustry.name} Advisory`,
        title: `${matchedIndustry.name} Industry Advisory & Funding`,
        categoryName: `${matchedIndustry.name} Industry`
      });
    }
    setIsConsultationOpen(true);
  };

  // Department click navigation
  const handleDepartmentClick = (dept) => {
    if (dept.route) {
      navigate(dept.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleOpenConsultation(`Department: ${dept.name}`);
    }
  };

  // Scheme click navigation
  const handleSchemeClick = (scheme) => {
    if (scheme.route) {
      navigate(scheme.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleOpenConsultation(`Scheme: ${scheme.title}`);
    }
  };

  return (
    <div className="agri-page-root" style={{ background: '#FAF9F6', minHeight: '100vh' }}>
      {/* 1. Header Component */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* 1. INDUSTRY HERO */}
      <section className="agri-hero-section">
        <div className="agri-hero-container">
          <div className="agri-hero-left">
            {/* Breadcrumbs */}
            <nav className="agri-breadcrumb" aria-label="Breadcrumb">
              {breadcrumbItems.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && <span className="agri-breadcrumb-sep">/</span>}
                  {idx === breadcrumbItems.length - 1 ? (
                    <span className="agri-breadcrumb-active">{crumb.label}</span>
                  ) : (
                    <a
                      href={crumb.link}
                      className="agri-breadcrumb-item"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(crumb.link);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {crumb.label}
                    </a>
                  )}
                </React.Fragment>
              ))}
            </nav>

            <div className="agri-eyebrow-badge">
              <Sparkles size={14} />
              <span>{heroEyebrow}</span>
            </div>

            <h1 className="agri-hero-title">{heroTitle}</h1>
            <p className="agri-hero-description">{heroDescription}</p>

            <div className="agri-hero-actions">
              <button
                type="button"
                className="btn-agri-primary"
                onClick={() => {
                  const el = document.getElementById('agri-schemes-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore {matchedIndustry ? matchedIndustry.name : 'Agriculture'} Schemes</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-agri-secondary"
                onClick={() => handleOpenConsultation()}
              >
                <span>Book a Consultation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Hero Visual Card Container */}
          <div className="agri-hero-visual-card">
            <img src={heroImage} alt={heroTitle} />
          </div>
        </div>
      </section>


      {/* 2. HOW THE WORK RUNS FOR AGRICULTURE */}
      <section className="agri-overview-section">
        <div className="agri-overview-container">
          <div className="agri-overview-left">
            <div className="agri-section-eyebrow">
              <Sparkles size={14} />
              <span>INDUSTRY OVERVIEW</span>
            </div>

            <h2 className="agri-section-title">{overview.heading}</h2>

            {overview.paragraphs.map((p, idx) => (
              <p key={idx} className="agri-paragraph">
                {p}
              </p>
            ))}
          </div>

          <div className="agri-stats-grid">
            {overview.stats.map((stat, idx) => (
              <div key={idx} className="agri-stat-card">
                <span className="agri-stat-val">{stat.value}</span>
                <span className="agri-stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 3. REGISTRATIONS AGRICULTURE BUSINESSES USUALLY NEED */}
      <section className="agri-registrations-section">
        <div className="agri-registrations-container">
          <div className="agri-section-eyebrow">
            <Sparkles size={14} />
            <span>REGULATORY REQUIREMENT</span>
          </div>

          <h2 className="agri-section-title">{registrations.heading}</h2>

          <div className="agri-registrations-grid">
            {registrations.items.map((item) => (
              <div key={item.id} className="agri-reg-card">
                <div className="agri-reg-icon-wrap">
                  <RegIcon iconName={item.icon} size={22} />
                </div>
                <h3 className="agri-reg-title">{item.title}</h3>
                <p className="agri-reg-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. WHERE AGRICULTURE BUSINESSES USUALLY GET STUCK */}
      <section className="agri-painpoints-section">
        <div className="agri-painpoints-container">
          <div className="agri-section-eyebrow" style={{ color: '#EF4444' }}>
            <AlertTriangle size={14} />
            <span>COMMON BOTTLENECKS</span>
          </div>

          <h2 className="agri-section-title">{painPoints.heading}</h2>

          <div className="agri-painpoints-grid">
            {painPoints.items.map((pain) => (
              <div key={pain.id} className="agri-pain-card">
                <h3 className="agri-pain-title">{pain.title}</h3>
                <p className="agri-pain-desc">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. DEPARTMENTS ENGAGED */}
      <section className="agri-departments-section">
        <div className="agri-departments-container">
          <div className="agri-section-eyebrow" style={{ color: '#FF6B00' }}>
            <Sparkles size={14} />
            <span>INTEGRATED SOLUTIONS</span>
          </div>

          <h2 className="agri-section-title" style={{ color: '#FFFFFF' }}>
            {departments.heading}
          </h2>

          <div className="agri-departments-grid">
            {departments.items.map((dept, index) => (
              <div key={dept.id} className="agri-dept-card">
                <div>
                  <div className="agri-dept-header">
                    <span className="agri-dept-num">0{index + 1}</span>
                  </div>
                  <h3 className="agri-dept-name">{dept.name}</h3>
                  <p className="agri-dept-desc">{dept.description}</p>
                </div>

                <button
                  type="button"
                  className="agri-dept-btn"
                  onClick={() => handleDepartmentClick(dept)}
                >
                  <span>Open</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. CONSULTATION CTA MID BANNER */}
      <section className="agri-mid-cta-section">
        <div className="agri-mid-cta-banner">
          <div className="agri-mid-cta-text">
            <h3>Check what agriculture qualifies for</h3>
            <p>Get a instant tailored roadmap for grants, subsidies, and compliance.</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-agri-primary"
              onClick={() => handleOpenConsultation('Check Agriculture Qualifications')}
            >
              <span>Check Qualifications</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="btn-agri-secondary"
              style={{ background: '#FFFFFF', color: '#0F172A', border: '1px solid rgba(15,23,42,0.15)' }}
              onClick={() => handleOpenConsultation('Book a Consultation')}
            >
              <span>Book a Consultation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>


      {/* 7. AGRICULTURE SCHEMES */}
      <section className="agri-schemes-section" id="agri-schemes-section">
        <div className="agri-schemes-container">
          <div className="agri-schemes-header-row">
            <div>
              <div className="agri-section-eyebrow">
                <Sparkles size={14} />
                <span>AVAILABLE GRANTS & SCHEMES</span>
              </div>
              <h2 className="agri-section-title" style={{ marginBottom: 0 }}>
                {schemes.heading}
              </h2>
            </div>

            <a
              href={schemes.allSchemesUrl || "https://growthora.co.in/govtschemes"}
              target="_blank"
              rel="noopener noreferrer"
              className="agri-all-schemes-link"
            >
              <span>All schemes</span>
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="agri-schemes-grid">
            {schemes.items.map((scheme) => (
              <div key={scheme.id} className="agri-scheme-card">
                <div>
                  <div className="agri-scheme-top">
                    <span className="agri-scheme-badge">{scheme.type}</span>
                    <span className="agri-scheme-coverage">{scheme.coverage}</span>
                  </div>

                  <h3 className="agri-scheme-title">{scheme.title}</h3>
                  <p className="agri-scheme-authority">{scheme.authority}</p>
                  <div className="agri-scheme-amount">{scheme.amount}</div>
                </div>

                {scheme.externalUrl ? (
                  <a
                    href={scheme.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="agri-scheme-open-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>Open Details</span>
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <div
                    className="agri-scheme-open-btn"
                    onClick={() => handleSchemeClick(scheme)}
                  >
                    <span>Open Details</span>
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 8. FUNDING CTA */}
      <section className="agri-funding-cta-section">
        <div className="agri-funding-cta-banner">
          <div className="agri-cta-glow" />

          <div className="agri-section-eyebrow" style={{ color: '#FF6B00', justifyContent: 'center' }}>
            <Sparkles size={14} />
            <span>EXPERT FUNDING ADVISORY</span>
          </div>

          <h2 className="agri-funding-cta-title">{fundingCta.heading}</h2>
          <p className="agri-funding-cta-sub">{fundingCta.supportingCopy}</p>

          <div className="agri-funding-trust-points">
            {fundingCta.trustPoints.map((point) => (
              <div key={point} className="agri-trust-item">
                <CheckCircle2 size={16} className="agri-trust-icon" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn-agri-primary"
            style={{ fontSize: '1rem', padding: '0.95rem 2.2rem' }}
            onClick={() => handleOpenConsultation('Senior Agriculture Advisor Call')}
          >
            <span>Book a Consultation</span>
            <ArrowRight size={18} />
          </button>

          <div className="agri-confidential-tag">{fundingCta.confidentialNotice}</div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={selectedServiceForModal}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
