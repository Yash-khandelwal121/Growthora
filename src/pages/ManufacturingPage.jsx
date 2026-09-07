import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  Factory,
  Building2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Shield
} from 'lucide-react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { MANUFACTURING_PAGE_DATA } from '../data/manufacturingData';

import '../styles/index.css';
import '../styles/animations.css';
import '../styles/manufacturing.css';

// Dynamic Registration Icon Mapper
const RegIcon = ({ iconName, size = 22 }) => {
  const iconMap = {
    Award,
    Factory,
    ShieldCheck,
    CheckCircle2,
    Building2,
    Users
  };
  const Component = iconMap[iconName] || Award;
  return <Component size={size} />;
};

export default function ManufacturingPage() {
  const navigate = useNavigate();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);

  const {
    hero,
    overview,
    registrations,
    painPoints,
    storytellerBanner,
    departments,
    schemes,
    fundingCta
  } = MANUFACTURING_PAGE_DATA;

  // Open consultation modal helper
  const handleOpenConsultation = (customTitle = null) => {
    if (customTitle) {
      setSelectedServiceForModal({
        id: 'mfg-consult',
        navLabel: customTitle,
        title: customTitle,
        categoryName: 'Manufacturing Industry'
      });
    } else {
      setSelectedServiceForModal({
        id: 'mfg-gen',
        navLabel: 'Manufacturing Advisory',
        title: 'Manufacturing Industry Advisory & Funding',
        categoryName: 'Manufacturing Industry'
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

  // Scheme click handler
  const handleSchemeClick = (scheme) => {
    if (scheme.externalUrl) {
      window.open(scheme.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (scheme.route) {
      navigate(scheme.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleOpenConsultation(`Scheme: ${scheme.title}`);
    }
  };

  return (
    <div className="mfg-page-root" style={{ background: '#FAF9F6', minHeight: '100vh' }}>
      {/* 1. Header Component */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* 2. MANUFACTURING HERO SECTION */}
      <section className="mfg-hero-section">
        <div className="mfg-hero-container">
          <div className="mfg-hero-left">
            {/* Breadcrumbs */}
            <nav className="mfg-breadcrumb" aria-label="Breadcrumb">
              {hero.breadcrumb.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && <span className="mfg-breadcrumb-sep">/</span>}
                  {idx === hero.breadcrumb.length - 1 ? (
                    <span className="mfg-breadcrumb-active">{crumb.label}</span>
                  ) : (
                    <a
                      href={crumb.link}
                      className="mfg-breadcrumb-item"
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

            <div className="mfg-eyebrow-badge">
              <Sparkles size={14} />
              <span>{hero.eyebrow}</span>
            </div>

            <h1 className="mfg-hero-title">{hero.title}</h1>
            <p className="mfg-hero-description">{hero.description}</p>

            <div className="mfg-hero-actions">
              <button
                type="button"
                className="btn-mfg-primary"
                onClick={() => handleOpenConsultation('Check What Manufacturing Qualifies For')}
              >
                <span>Check what manufacturing qualifies for</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-mfg-secondary"
                onClick={() => handleOpenConsultation('Book a Manufacturing Consultation')}
              >
                <span>Book a consultation</span>
              </button>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="mfg-hero-visual-card">
            <img src={hero.image} alt="Manufacturing Industrial Plant" />
            <div className="mfg-hero-visual-overlay" />
            
            <div className="mfg-hero-floating-badges">
              {hero.floatingStats.map((stat, i) => (
                <div className="mfg-floating-badge" key={i}>
                  <div className="mfg-badge-number">{stat.number}</div>
                  <div className="mfg-badge-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 3. OVERVIEW & IMPACT STATS SECTION */}
      <section className="mfg-overview-section" id="mfg-overview">
        <div className="mfg-overview-container">
          <div className="mfg-overview-grid">
            <div className="mfg-overview-text">
              <h2 className="mfg-section-title">{overview.heading}</h2>
              {overview.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mfg-overview-image-wrap">
              <img src={overview.visualImage} alt="Manufacturing Production Floor" />
            </div>
          </div>

          {/* Impact Stats Grid */}
          <div className="mfg-stats-grid">
            {overview.stats.map((stat, idx) => (
              <div className="mfg-stat-item" key={idx}>
                <div className="mfg-stat-value">{stat.value}</div>
                <div className="mfg-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. REGISTRATION + PAIN POINTS SPLIT SECTION */}
      <section className="mfg-split-section">
        <div className="mfg-split-container">
          {/* Left Column: Registrations */}
          <div className="mfg-split-col">
            <h2 className="mfg-split-col-title">{registrations.heading}</h2>
            {registrations.items.map((item) => (
              <div className="mfg-reg-card" key={item.id}>
                <div className="mfg-reg-icon-box">
                  <RegIcon iconName={item.icon} size={22} />
                </div>
                <div>
                  <h3 className="mfg-reg-card-title">{item.title}</h3>
                  <p className="mfg-reg-card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Pain Points */}
          <div className="mfg-split-col">
            <h2 className="mfg-split-col-title">{painPoints.heading}</h2>
            {painPoints.items.map((item) => (
              <div className="mfg-pain-card" key={item.id}>
                <div className="mfg-pain-card-header">
                  <AlertTriangle className="mfg-pain-icon" size={20} />
                  <h3 className="mfg-pain-card-title">{item.title}</h3>
                </div>
                <p className="mfg-pain-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. VISUAL STORYTELLING BANNER */}
      <section className="mfg-storyteller-section">
        <div className="mfg-storyteller-container">
          <div>
            <h2 className="mfg-storyteller-title">{storytellerBanner.heading}</h2>
            <p className="mfg-storyteller-subtext">{storytellerBanner.subtext}</p>
            <button
              type="button"
              className="btn-mfg-primary"
              onClick={() => handleOpenConsultation('Manufacturing Expansion Advisory')}
            >
              <span>Explore Industrial Subsidies</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mfg-storyteller-image-card">
            <img src={storytellerBanner.image} alt="Industrial Advisory Execution" />
          </div>
        </div>
      </section>


      {/* 6. DEPARTMENTS ENGAGED SECTION */}
      <section className="mfg-depts-section" id="mfg-departments">
        <div className="mfg-depts-container">
          <div className="mfg-depts-header">
            <h2 className="mfg-section-title">{departments.heading}</h2>
          </div>

          <div className="mfg-dept-list">
            {departments.items.map((dept) => (
              <div
                className="mfg-dept-row"
                key={dept.id}
                onClick={() => handleDepartmentClick(dept)}
              >
                <div className="mfg-dept-info">
                  <div className="mfg-dept-name">{dept.name}</div>
                  <div className="mfg-dept-desc">{dept.description}</div>
                </div>
                <div className="mfg-dept-open-btn">
                  <span>Open</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>

          <div className="mfg-depts-cta-row">
            <button
              type="button"
              className="btn-mfg-primary"
              onClick={() => handleOpenConsultation('Check What Manufacturing Qualifies For')}
            >
              <span>Check what manufacturing qualifies for</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn-mfg-secondary"
              style={{ color: '#0F172A', borderColor: 'rgba(15, 23, 42, 0.2)' }}
              onClick={() => handleOpenConsultation('Book a Consultation')}
            >
              <span>Book a consultation</span>
            </button>
          </div>
        </div>
      </section>


      {/* 7. SCHEMES THAT FIT MANUFACTURING */}
      <section className="mfg-schemes-section" id="mfg-schemes-section">
        <div className="mfg-schemes-container">
          <div className="mfg-schemes-header">
            <h2 className="mfg-section-title">{schemes.heading}</h2>
            <a
              href={schemes.allSchemesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mfg-schemes-all-link"
            >
              <span>All schemes →</span>
            </a>
          </div>

          <div className="mfg-schemes-grid">
            {schemes.items.map((scheme) => (
              <div
                className="mfg-scheme-card"
                key={scheme.id}
                onClick={() => handleSchemeClick(scheme)}
              >
                <div>
                  <div className="mfg-scheme-card-top">
                    <h3 className="mfg-scheme-title">{scheme.title}</h3>
                    <span className="mfg-scheme-badge">{scheme.type}</span>
                  </div>

                  <p className="mfg-scheme-authority">{scheme.authority}</p>
                  <div className="mfg-scheme-amount">{scheme.amount}</div>
                </div>

                <div className="mfg-scheme-footer">
                  <span className="mfg-scheme-provider">{scheme.provider}</span>
                  <span className="mfg-scheme-open-link">
                    <span>Open</span>
                    <ExternalLink size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 8. FINAL STRATEGY CONSULTATION CTA BANNER */}
      <section className="mfg-cta-section">
        <div className="mfg-cta-container">
          <div>
            <h2 className="mfg-cta-title">{fundingCta.heading}</h2>
            <p className="mfg-cta-desc">{fundingCta.supportingCopy}</p>

            <button
              type="button"
              className="btn-mfg-primary"
              onClick={() => handleOpenConsultation('Book Manufacturing Strategy Call')}
            >
              <span>Book a Manufacturing Strategy Call</span>
              <ArrowRight size={18} />
            </button>

            <div className="mfg-cta-trust">
              {fundingCta.trustPoints.map((pt, i) => (
                <div className="mfg-trust-item" key={i}>
                  <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', fontStyle: 'italic' }}>
              {fundingCta.confidentialNotice}
            </p>
          </div>
        </div>
      </section>


      {/* 9. Footer Component */}
      <Footer />

      {/* Consultation Modal */}
      {isConsultationOpen && (
        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
          service={selectedServiceForModal}
        />
      )}

      {/* Ask Growthora Modal */}
      {isAskOpen && (
        <AskGrowthoraModal
          isOpen={isAskOpen}
          onClose={() => setIsAskOpen(false)}
        />
      )}
    </div>
  );
}
