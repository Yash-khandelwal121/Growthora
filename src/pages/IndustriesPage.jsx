import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wheat,
  Factory,
  Store,
  Stethoscope,
  GraduationCap,
  Laptop,
  Scissors,
  Building2,
  Truck,
  Cpu,
  Utensils,
  Palette,
  TrendingUp,
  Brain,
  Leaf,
  Dna,
  Users,
  Shield,
  Gamepad2,
  Flame,
  Search,
  ArrowRight,
  CheckCircle2,
  Building,
  Award,
  Briefcase,
  ShieldCheck,
  Layers,
  Landmark,
  Sparkles
} from 'lucide-react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { INDUSTRIES_DATA, INDUSTRIES_CATEGORIES } from '../data/industriesData';

import '../styles/index.css';
import '../styles/animations.css';
import '../styles/industries.css';

// Helper component to render dynamic icons
const IndustryIcon = ({ iconName, size = 22, className = '' }) => {
  const iconsMap = {
    Wheat,
    Factory,
    Store,
    Stethoscope,
    GraduationCap,
    Laptop,
    Scissors,
    Building2,
    Truck,
    Cpu,
    Utensils,
    Palette,
    TrendingUp,
    Brain,
    Leaf,
    Dna,
    Users,
    Shield,
    Gamepad2,
    Flame
  };

  const IconComponent = iconsMap[iconName] || Building;
  return <IconComponent size={size} className={className} />;
};

export default function IndustriesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);

  const filterNavRef = useRef(null);
  const scrollDirectionRef = useRef(1); // 1 = Left to Right, -1 = Right to Left
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef(null);

  const handleUserInteraction = () => {
    isPausedRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1200);
  };

  useEffect(() => {
    const el = filterNavRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId;
    const speed = 1.2; // smooth continuous speed per frame (~72px/sec)

    const step = () => {
      if (el && !isPausedRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          el.scrollLeft += speed * scrollDirectionRef.current;

          if (scrollDirectionRef.current === 1 && el.scrollLeft >= maxScroll - 2) {
            scrollDirectionRef.current = -1;
          } else if (scrollDirectionRef.current === -1 && el.scrollLeft <= 2) {
            scrollDirectionRef.current = 1;
          }
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Open consultation modal / navigate to industry detail
  const handleOpenConsultation = (industryItem = null) => {
    if (industryItem && (industryItem.slug === 'agriculture' || industryItem.name.toLowerCase() === 'agriculture')) {
      navigate('/industries/agriculture');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (industryItem && (industryItem.slug === 'manufacturing' || industryItem.name.toLowerCase() === 'manufacturing')) {
      navigate('/industries/manufacturing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (industryItem) {
      setSelectedServiceForModal({
        id: industryItem.id,
        navLabel: `${industryItem.name} Advisory`,
        title: `Industry Advisory — ${industryItem.name}`,
        categoryName: 'Industry Solutions'
      });
    } else {
      setSelectedServiceForModal(null);
    }
    setIsConsultationOpen(true);
  };

  // Filtered industries list
  const filteredIndustries = useMemo(() => {
    return INDUSTRIES_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const featuredIndustries = useMemo(() => {
    return INDUSTRIES_DATA.filter((item) => item.featured);
  }, []);

  return (
    <div className="industries-page-root" style={{ background: '#FAF9F6', minHeight: '100vh' }}>
      {/* 1. Header Component */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* SECTION 1 — PREMIUM DARK HERO */}
      <section className="ind-hero-section">
        <div className="ind-hero-container">
          {/* Hero Left Content */}
          <div className="ind-hero-left">
            <div className="ind-eyebrow">
              <Sparkles size={14} />
              <span>INDUSTRIES WE SERVE</span>
            </div>

            <h1 className="ind-hero-title">
              Every Industry.<br />
              A <span className="ind-text-highlight">Smarter Path</span> to Growth.
            </h1>

            <p className="ind-hero-subtitle">
              Industry-specific advisory, compliance, funding and growth solutions designed around how your business actually operates.
            </p>

            <div className="ind-hero-cta-group">
              <button
                type="button"
                className="btn-ind-primary"
                onClick={() => {
                  const el = document.getElementById('industries-directory');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Industries</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-ind-secondary"
                onClick={() => handleOpenConsultation()}
              >
                <span>Talk to an Expert</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="ind-hero-feature-points">
              <div className="ind-feature-point">
                <div className="ind-feature-icon-box">
                  <Briefcase size={16} />
                </div>
                <span>Industry-Focused Advisory</span>
              </div>

              <div className="ind-feature-point">
                <div className="ind-feature-icon-box">
                  <ShieldCheck size={16} />
                </div>
                <span>Regulatory Expertise</span>
              </div>

              <div className="ind-feature-point">
                <div className="ind-feature-icon-box">
                  <Layers size={16} />
                </div>
                <span>End-to-End Support</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual & Stats Composition */}
          <div className="ind-hero-visual-wrapper">
            <div className="ind-hero-image-card">
              <img
                src="/growthora_industries_hero_building.png"
                alt="Growthora Corporate Industry Advisory Building"
              />
            </div>

            {/* Vertical Stats Stack */}
            <div className="ind-hero-stats-stack">
              <div className="ind-hero-stat-card">
                <div className="ind-hero-stat-number">20+</div>
                <div className="ind-hero-stat-label">Industries Served</div>
              </div>

              <div className="ind-hero-stat-card">
                <div className="ind-hero-stat-number">1,000+</div>
                <div className="ind-hero-stat-label">Businesses Advised</div>
              </div>

              <div className="ind-hero-stat-card">
                <div className="ind-hero-stat-number">100+</div>
                <div className="ind-hero-stat-label">Government Schemes</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 2 — INDUSTRIES DIRECTORY */}
      <section className="ind-directory-section" id="industries-directory">
        <div className="ind-directory-container">
          <div className="ind-directory-header">
            <div>
              <div className="ind-section-eyebrow">
                <Sparkles size={14} />
                <span>EXPLORE BY INDUSTRY</span>
              </div>
              <h2 className="ind-section-title">Industries We Understand</h2>
              <p className="ind-section-subtitle">
                Deep sector knowledge. Practical advisory. Measurable outcomes.
              </p>
            </div>

            {/* Search Box */}
            <div className="ind-search-box">
              <Search className="ind-search-icon" size={18} />
              <input
                type="text"
                className="ind-search-input"
                placeholder="Search your industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            ref={filterNavRef}
            className="ind-filter-nav"
            onTouchStart={handleUserInteraction}
            onPointerDown={handleUserInteraction}
            onWheel={handleUserInteraction}
          >
            {INDUSTRIES_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`ind-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 20 Industry Cards Responsive Grid */}
          <div className="ind-cards-grid">
            {filteredIndustries.length > 0 ? (
              filteredIndustries.map((ind) => (
                <div
                  key={ind.id}
                  className="ind-card"
                  onClick={() => handleOpenConsultation(ind)}
                >
                  {/* Card Top Image */}
                  <div className="ind-card-image-wrap">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      loading="lazy"
                    />
                    <div className="ind-card-image-overlay" />
                  </div>

                  {/* Card Body */}
                  <div className="ind-card-body">
                    <div className="ind-card-icon-wrap">
                      <IndustryIcon iconName={ind.iconName} size={22} />
                    </div>
                    <h3 className="ind-card-name">{ind.name}</h3>
                    <p className="ind-card-desc">{ind.subtitle}</p>
                  </div>

                  {/* Card Footer */}
                  <div className="ind-card-footer">
                    <span className="ind-card-explore-lbl">Explore</span>
                    <div className="ind-card-arrow-circle">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="ind-no-results">
                <h3>No industries found matching "{searchTerm}"</h3>
                <p>Try searching with another keyword or pick from the category tabs above.</p>
                <button
                  type="button"
                  className="btn-ind-primary"
                  style={{ marginTop: '1.25rem' }}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* SECTION 3 — FEATURED INDUSTRIES */}
      <section className="ind-featured-section">
        <div className="ind-featured-container">
          <div className="ind-featured-top">
            <div>
              <div className="ind-section-eyebrow" style={{ color: '#FF6B00' }}>
                <Sparkles size={14} />
                <span>FEATURED INDUSTRIES</span>
              </div>
              <h2 className="ind-section-title" style={{ color: '#FFFFFF' }}>
                Built Around Your Industry
              </h2>
              <p className="ind-section-subtitle" style={{ color: '#CBD5E1' }}>
                Focused expertise for businesses operating in India's most dynamic sectors.
              </p>
            </div>

            <button
              type="button"
              className="btn-ind-secondary"
              onClick={() => {
                const el = document.getElementById('industries-directory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View All Industries</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="ind-featured-grid">
            {featuredIndustries.map((ind) => (
              <div
                key={ind.id}
                className="ind-featured-card"
                onClick={() => handleOpenConsultation(ind)}
              >
                <img src={ind.bgImage} alt={ind.name} className="ind-featured-bg-img" />
                <div className="ind-featured-overlay" />

                <div className="ind-featured-content">
                  <span className="ind-featured-num">{ind.featuredNumber}</span>
                  <h3 className="ind-featured-title">{ind.name}</h3>
                  <p className="ind-featured-desc">{ind.featuredDesc}</p>

                  <div className="ind-featured-action">
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 4 — INDUSTRY INTELLIGENCE */}
      <section className="ind-intelligence-section">
        <div className="ind-intelligence-container">
          <div>
            <div className="ind-eyebrow">
              <Sparkles size={14} />
              <span>INDUSTRY INTELLIGENCE</span>
            </div>

            <h2 className="ind-intelligence-title">
              <span className="ind-cyan-highlight">Your Industry</span> Changes.<br />
              <span className="ind-text-highlight">Your Advisory</span> Should Too.
            </h2>

            <p className="ind-intelligence-desc">
              Regulations, funding opportunities and market conditions evolve continuously. Growthora combines sector knowledge with regulatory intelligence to help businesses make better decisions.
            </p>

            <button
              type="button"
              className="btn-ind-secondary"
              onClick={() => handleOpenConsultation()}
            >
              <span>Explore Opportunities</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Stats Grid */}
          <div className="ind-stats-grid">
            <div className="ind-stat-item">
              <div className="ind-stat-val cyan">20+</div>
              <div className="ind-stat-lbl">Industries Covered</div>
            </div>

            <div className="ind-stat-item">
              <div className="ind-stat-val orange">1,000+</div>
              <div className="ind-stat-lbl">Businesses Advised</div>
            </div>

            <div className="ind-stat-item">
              <div className="ind-stat-val orange">95%</div>
              <div className="ind-stat-lbl">Client Satisfaction</div>
            </div>

            <div className="ind-stat-item">
              <div className="ind-stat-val cyan">100+</div>
              <div className="ind-stat-lbl">Government Schemes Mapped</div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 5 — WHY GROWTHORA */}
      <section className="ind-why-section">
        <div className="ind-why-container">
          <div className="ind-why-top">
            <div>
              <div className="ind-section-eyebrow">
                <Sparkles size={14} />
                <span>WHY BUSINESSES CHOOSE GROWTHORA</span>
              </div>
              <h2 className="ind-section-title">A Partner Who Understands Your Industry</h2>
              <p className="ind-section-subtitle">
                Every industry has unique challenges. We combine deep regulatory knowledge with industry-specific insights to provide practical, results-driven solutions.
              </p>
            </div>

            <button
              type="button"
              className="btn-ind-primary"
              onClick={() => handleOpenConsultation()}
            >
              <span>Talk to an Expert</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 4 Feature Cards */}
          <div className="ind-why-cards-grid">
            <div className="ind-why-card">
              <div className="ind-why-card-header">
                <span className="ind-why-step-num">01</span>
                <div className="ind-why-icon-box">
                  <Briefcase size={20} />
                </div>
              </div>
              <h3 className="ind-why-card-title">Industry Expertise</h3>
              <p className="ind-why-card-desc">Advice built around your sector.</p>
            </div>

            <div className="ind-why-card">
              <div className="ind-why-card-header">
                <span className="ind-why-step-num">02</span>
                <div className="ind-why-icon-box">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <h3 className="ind-why-card-title">Regulatory Intelligence</h3>
              <p className="ind-why-card-desc">Stay ahead of changing requirements.</p>
            </div>

            <div className="ind-why-card">
              <div className="ind-why-card-header">
                <span className="ind-why-step-num">03</span>
                <div className="ind-why-icon-box">
                  <Landmark size={20} />
                </div>
              </div>
              <h3 className="ind-why-card-title">Funding Access</h3>
              <p className="ind-why-card-desc">Identify relevant funding and government schemes.</p>
            </div>

            <div className="ind-why-card">
              <div className="ind-why-card-header">
                <span className="ind-why-step-num">04</span>
                <div className="ind-why-icon-box">
                  <TrendingUp size={20} />
                </div>
              </div>
              <h3 className="ind-why-card-title">Growth Strategy</h3>
              <p className="ind-why-card-desc">Turn compliance into a foundation for growth.</p>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 6 — FINAL CTA BANNER */}
      <section className="ind-cta-section">
        <div className="ind-cta-banner">
          <div className="ind-cta-banner-glow" />

          <div className="ind-cta-content-col">
            <div className="ind-eyebrow" style={{ background: 'rgba(255, 107, 0, 0.18)' }}>
              <Sparkles size={14} />
              <span>INDUSTRY SOLUTIONS</span>
            </div>

            <h2 className="ind-cta-title">
              Your Industry Has Opportunities.<br />
              <span className="ind-text-highlight">Let's Find Them.</span>
            </h2>

            <p className="ind-cta-subtitle">
              Talk with a Growthora advisor and discover the registrations, funding, compliance and growth opportunities relevant to your business.
            </p>

            <button
              type="button"
              className="btn-ind-primary"
              style={{ fontSize: '1rem', padding: '0.95rem 2.2rem' }}
              onClick={() => handleOpenConsultation()}
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={18} />
            </button>

            <div className="ind-cta-trust-points">
              <div className="ind-trust-point">
                <CheckCircle2 size={16} className="ind-trust-check" />
                <span>No obligation</span>
              </div>

              <div className="ind-trust-point">
                <CheckCircle2 size={16} className="ind-trust-check" />
                <span>No jargon</span>
              </div>

              <div className="ind-trust-point">
                <CheckCircle2 size={16} className="ind-trust-check" />
                <span>Clear next step</span>
              </div>
            </div>
          </div>

          <div className="ind-cta-image-col">
            <div className="ind-cta-image-wrap">
              <img
                src="/growthora_industries_hero_building.png"
                alt="Growthora Industry Opportunities Consultation"
              />
            </div>
          </div>
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
