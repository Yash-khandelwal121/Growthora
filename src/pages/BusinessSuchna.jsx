import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, ChevronRight, Landmark, CheckCircle2, 
  Sparkles, ShieldCheck, ChevronDown, Award, 
  FileText, HelpCircle, Zap
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import PremiumBusinessGate from '../components/business-suchna/PremiumBusinessGate';
import { MSMESchemeFinder } from '../components/business-suchna/MSMESchemeFinder';
import '../styles/businessSuchna.css';

// Verified MSME Government Schemes Directory
const SCHEMES_DATABASE = [
  {
    id: 'cgtmse',
    name: 'CGTMSE (Credit Guarantee Fund Trust)',
    category: 'Collateral-Free Credit',
    tag: 'Govt Guarantee',
    amount: 'Up to ₹10 Crore',
    desc: 'Collateral-free credit facility for new and existing Micro and Small Enterprises with guarantee coverage up to 85% through scheduled commercial banks.',
    highlights: [
      'Zero collateral or third-party guarantee required',
      'Covers term loans and working capital facilities',
      'Guarantee fee subsidised for women & aspirational districts',
      'Applicable for manufacturing and service sectors'
    ],
    route: '/services/finance-funding'
  },
  {
    id: 'pmegp',
    name: 'PMEGP (Prime Minister Employment Generation)',
    category: 'Central Subsidies',
    tag: 'Capital Subsidy',
    amount: 'Up to ₹50 Lakh',
    desc: 'Credit-linked subsidy program administered by KVIC to establish new micro-enterprises in manufacturing (up to ₹50L) and services (up to ₹20L).',
    highlights: [
      '15% to 35% government capital subsidy on project cost',
      'Own promoter contribution only 5% to 10%',
      'Bank finance of 90% to 95% of total project cost',
      'Second loan up to ₹1 Cr for upgradation of existing units'
    ],
    route: '/services/msme-benefits'
  },
  {
    id: 'pmfme',
    name: 'PMFME Scheme (Micro Food Processing)',
    category: 'Agri & Food Processing',
    tag: 'Food Processing',
    amount: 'Up to ₹10 Lakh',
    desc: 'Flagship Ministry of Food Processing scheme providing 35% credit-linked capital subsidy for formalization, machinery upgrade, and FSSAI standards.',
    highlights: [
      '35% capital subsidy on eligible machinery investment',
      'Financial support for branding and packaging',
      'Technical training & food quality compliance handholding',
      'Open to individual micro food units, SHGs, and FPOs'
    ],
    route: '/services/msme-benefits/pmfme-scheme'
  },
  {
    id: 'mudra',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    category: 'Collateral-Free Credit',
    tag: 'Mudra Loan',
    amount: 'Up to ₹20 Lakh',
    desc: 'Refinancing scheme facilitating non-corporate micro enterprises with Shishu (up to ₹50K), Kishore (₹50K-₹5L), Tarun (₹5L-₹10L), and Tarun Plus (₹10L-₹20L).',
    highlights: [
      'No collateral requirement for micro businesses',
      'Low processing charges and competitive interest rates',
      'Mudra Debit Card for flexible working capital withdrawals',
      'Expedited loan processing via nationalized banks'
    ],
    route: '/services/finance-funding'
  },
  {
    id: 'sisfs',
    name: 'Startup India Seed Fund Scheme (SISFS)',
    category: 'Startup & Innovation',
    tag: 'DPIIT Seed Support',
    amount: 'Up to ₹50 Lakh',
    desc: 'Non-dilutive seed capital assistance for DPIIT-recognised startups for proof-of-concept, prototype development, product trials, and market entry.',
    highlights: [
      'Up to ₹20 Lakh grant for validation and prototype',
      'Up to ₹50 Lakh debt or convertible debentures for scaling',
      'Disbursement channeled through recognised incubators',
      'Guidance and mentorship by incubator committees'
    ],
    route: '/scheme-guide'
  },
  {
    id: 'gujarat-power',
    name: 'Gujarat Industrial Electricity Duty Exemption',
    category: 'State Specific',
    tag: 'State Power Incentive',
    amount: '100% Duty Exemption',
    desc: 'Government of Gujarat industrial incentive granting 100% electricity duty waiver for 5 years to eligible newly established or expanding manufacturing units.',
    highlights: [
      'Direct monthly reduction on DISCOM power tariff',
      'Retroactive duty refund for eligible operational periods',
      'Improves industrial bottom line by 15% to 25%',
      'Streamlined liaisoning with Chief Electrical Inspector'
    ],
    route: '/services/msme-benefits/electricity-duty-exemption'
  },
  {
    id: 'aif',
    name: 'Agriculture Infrastructure Fund (AIF)',
    category: 'Agri & Food Processing',
    tag: 'Interest Subvention',
    amount: 'Up to ₹2 Crore',
    desc: 'Medium-long term debt financing facility for investment in viable post-harvest management infrastructure and community farming assets.',
    highlights: [
      '3% interest subvention per annum up to ₹2 Crore loan',
      'Credit guarantee coverage under CGTMSE for loans up to ₹2 Cr',
      'Moratorium period from 6 months up to 2 years',
      'Open to agri-entrepreneurs, startups, FPOs, and PACS'
    ],
    route: '/services/msme-benefits/naiff-agri-infra-fund'
  },
  {
    id: 'rips-rajasthan',
    name: 'Rajasthan Investment Promotion Scheme (RIPS 2024)',
    category: 'State Specific',
    tag: 'State Incentive',
    amount: 'Up to 25% Capex Subsidy',
    desc: 'Comprehensive investment promotion package offering capital subsidy, turnover-linked incentives, interest subvention, and stamp duty exemptions in Rajasthan.',
    highlights: [
      'Capital subsidy on plant and machinery investment',
      '100% exemption on Electricity Duty, Mandi Fee & Land Tax',
      'Additional incentives for green and employment-intensive units',
      'Direct facilitation via Single Window Clearance system'
    ],
    route: '/services/msme-benefits/rips-2024-rajasthan'
  },
  {
    id: 'cgss',
    name: 'CGSS (Credit Guarantee Scheme for Startups)',
    category: 'Startup & Innovation',
    tag: 'Startup Credit',
    amount: 'Up to ₹20 Crore',
    desc: 'Government credit guarantee scheme specifically designed to provide collateral-free debt financing to DPIIT-recognized startups through member institutions.',
    highlights: [
      'Collateral-free venture debt and term loans',
      'Guarantee coverage up to 80% for non-default obligations',
      'Empowers venture-backed and revenue-generating startups',
      'Bridges equity funding gaps without equity dilution'
    ],
    route: '/services/finance-funding'
  }
];

const CATEGORIES = [
  'All Schemes',
  'Central Subsidies',
  'Collateral-Free Credit',
  'Agri & Food Processing',
  'State Specific',
  'Startup & Innovation'
];

const FAQ_ITEMS = [
  {
    q: 'What is the Business Suchna portal by Growthora?',
    a: 'Business Suchna is Growthora Advisory’s dedicated MSME Information Portal. It provides verified, updated intelligence on central and state government schemes, capital subsidies, collateral-free credit programs (like CGTMSE & PMEGP), compliance notifications, and registration benefits designed to empower Indian micro, small, and medium businesses.'
  },
  {
    q: 'Can an MSME get a collateral-free business loan in India?',
    a: 'Yes. Under the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE), eligible manufacturing and service enterprises can secure term loans and working capital up to ₹10 Crore without providing property collateral or third-party guarantees. Guarantee fees and approval timelines vary by bank and project feasibility.'
  },
  {
    q: 'How does the 35% PMEGP Capital Subsidy work?',
    a: 'Under PMEGP, entrepreneurs setting up new manufacturing projects (up to ₹50 Lakh) or service projects (up to ₹20 Lakh) can receive 15% to 35% of the project cost as a direct government subsidy. The subsidy is credited into a bank TDR for 3 years, and upon successful inspection, is adjusted against the loan balance.'
  },
  {
    q: 'Is Udyam Registration mandatory to access government subsidies?',
    a: 'Yes, Udyam MSME Registration is the primary statutory prerequisite for accessing all central and state industrial benefits, including priority sector lending, collateral-free guarantees, power duty exemptions, and government procurement tenders.'
  },
  {
    q: 'How does Growthora Advisory help MSMEs apply for schemes?',
    a: 'Growthora Advisory provides end-to-end handholding: assessing eligibility, preparing bank-compliant Detailed Project Reports (DPR), financial projections, statutory documentation (Udyam, GST, FSSAI, Pollution/Factory NOCs), liaising with designated nodal banks/agencies, and monitoring subsidy disbursements.'
  }
];

export default function BusinessSuchna() {
  const navigate = useNavigate();

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Schemes');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Modals
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [consultationService, setConsultationService] = useState(null);

  const handleOpenConsultation = (serviceData) => {
    setConsultationService(serviceData || { title: 'Business Suchna & MSME Schemes' });
    setIsConsultationOpen(true);
  };

  const handlePopularSearch = (term) => {
    setSearchQuery(term);
    // Scroll smoothly to explorer section
    const el = document.getElementById('schemes-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const el = document.getElementById('schemes-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered Schemes List
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATABASE.filter((scheme) => {
      const matchesCategory =
        selectedCategory === 'All Schemes' || scheme.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        scheme.name.toLowerCase().includes(query) ||
        scheme.desc.toLowerCase().includes(query) ||
        scheme.tag.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="business-suchna-page">
      {/* 1. Sticky Navigation Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* 2. Hero Section */}
      <section className="suchna-hero-section" aria-label="Business Suchna Hero">
        <div className="suchna-hero-container">
          
          {/* Left Column: Heading, Search & Popular Searches */}
          <div className="suchna-hero-left">
            {/* Eyebrow */}
            <div className="suchna-eyebrow">
              <span className="suchna-eyebrow-dash" aria-hidden="true" />
              <span>INDIA'S MSME INFORMATION PORTAL</span>
            </div>

            {/* Main Headline */}
            <h1 className="suchna-hero-title">
              All MSME Schemes,<br />
              Funding & Business Updates<br />
              in <span className="highlight-orange">One Place</span>
            </h1>

            {/* Supporting Description */}
            <p className="suchna-hero-description">
              Find the right government schemes, loans, subsidies, registrations, 
              compliance updates and growth opportunities for your MSME — with expert guidance.
            </p>

            {/* Scheme Search Bar */}
            <form onSubmit={handleSearchSubmit} className="suchna-search-box" role="search">
              <Search className="suchna-search-icon" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes, PMEGP, CGTMSE, Mudra, Subsidy..."
                className="suchna-search-input"
                aria-label="Search government schemes and subsidies"
              />
              <button type="submit" className="suchna-search-btn" aria-label="Search schemes">
                <span>Search</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Popular Searches Pills */}
            <div className="suchna-popular-searches" aria-label="Popular scheme searches">
              <span className="popular-label">Popular Searches:</span>
              {[
                'MSME Registration',
                'PMEGP',
                'CGTMSE',
                'Mudra Loan',
                'Udyam Registration'
              ].map((term) => (
                <button
                  key={term}
                  type="button"
                  className={`popular-pill ${searchQuery === term ? 'active' : ''}`}
                  onClick={() => handlePopularSearch(term)}
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Bottom Support Badges & Floating Cards */}
            <div className="suchna-hero-bottom-badges">
              <div className="gov-support-badge">
                <Landmark size={15} />
                <span>GOVERNMENT SUPPORT</span>
              </div>

              <div className="floating-scheme-cards-row">
                <button
                  type="button"
                  className="floating-scheme-pill"
                  onClick={() => handlePopularSearch('CGTMSE')}
                >
                  <span className="dot-orange" />
                  <strong>CGTMSE SCHEME</strong>
                  <span>₹10 Cr Collateral-Free Loans</span>
                  <ChevronRight size={14} className="chevron-icon" />
                </button>

                <button
                  type="button"
                  className="floating-scheme-pill"
                  onClick={() => handlePopularSearch('CGSS')}
                >
                  <span className="dot-orange" />
                  <strong>CGSS SCHEME</strong>
                  <span>₹20 Cr Funding Eligibility</span>
                  <ChevronRight size={14} className="chevron-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive Premium Business Suchna Gate */}
          <div className="suchna-hero-right">
            <PremiumBusinessGate>
              <MSMESchemeFinder onOpenConsultation={handleOpenConsultation} />
            </PremiumBusinessGate>
          </div>

        </div>
      </section>

      {/* 3. Schemes Explorer Section (MSME Information Hub) */}
      <section className="suchna-explorer-section" id="schemes-explorer">
        <div className="suchna-section-container">
          
          <div className="suchna-section-header">
            <div className="suchna-section-badge">
              <Sparkles size={14} />
              <span>Verified Scheme Directory</span>
            </div>
            <h2 className="suchna-section-title">
              Explore 100+ Verified MSME Schemes & Subsidies
            </h2>
            <p className="suchna-section-desc">
              From capital subsidies and interest subventions to collateral-free bank financing,
              discover government-backed growth pathways tailored for your enterprise.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="suchna-category-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`suchna-cat-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Schemes Grid */}
          <div className="suchna-schemes-grid">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="suchna-scheme-card">
                <div className="scheme-card-header">
                  <span className="scheme-card-badge">{scheme.tag}</span>
                  <span className="scheme-card-amount">{scheme.amount}</span>
                </div>

                <h3 className="scheme-card-title">{scheme.name}</h3>
                <p className="scheme-card-desc">{scheme.desc}</p>

                <div className="scheme-card-highlights">
                  {scheme.highlights.map((item, idx) => (
                    <div key={idx} className="scheme-highlight-item">
                      <CheckCircle2 size={13} className="icon-check" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="scheme-card-actions">
                  <button
                    type="button"
                    className="btn-card-apply"
                    onClick={() => handleOpenConsultation({ title: scheme.name })}
                  >
                    <span>Check Eligibility</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    type="button"
                    className="btn-card-details"
                    onClick={() => navigate(scheme.route)}
                  >
                    <span>Learn More</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
                No schemes found matching "{searchQuery}".
              </p>
              <button
                type="button"
                className="btn-card-details"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Schemes');
                }}
              >
                Clear Search Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. Why Growthora Advisory Section */}
      <section className="suchna-why-section">
        <div className="suchna-section-container">
          <div className="suchna-section-header">
            <div className="suchna-section-badge">
              <Award size={14} />
              <span>Expert MSME Advisory</span>
            </div>
            <h2 className="suchna-section-title">
              Why Indian MSMEs Rely on Growthora Business Suchna
            </h2>
            <p className="suchna-section-desc">
              We bridge the gap between government policies and MSME execution with bank-grade
              documentation and seasoned liaisoning advisors.
            </p>
          </div>

          <div className="suchna-pillars-grid">
            <div className="suchna-pillar-card">
              <div className="pillar-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3 className="pillar-title">100% Free Scheme Identification</h3>
              <p className="pillar-desc">
                Instantly map your entity type, state policy, and turnover against active 
                central and state schemes with zero upfront cost.
              </p>
            </div>

            <div className="suchna-pillar-card">
              <div className="pillar-icon-box">
                <FileText size={24} />
              </div>
              <h3 className="pillar-title">Bank-Approved Project Reports</h3>
              <p className="pillar-desc">
                Our in-house corporate finance team crafts bank-ready Detailed Project Reports (DPR) 
                and financial projections that pass credit committee scrutiny.
              </p>
            </div>

            <div className="suchna-pillar-card">
              <div className="pillar-icon-box">
                <Landmark size={24} />
              </div>
              <h3 className="pillar-title">End-to-End Liaisoning Support</h3>
              <p className="pillar-desc">
                From DIC and Ministry portals to scheduled bank branches, we manage the complete
                paperwork and department follow-ups.
              </p>
            </div>

            <div className="suchna-pillar-card">
              <div className="pillar-icon-box">
                <Zap size={24} />
              </div>
              <h3 className="pillar-title">Subsidy & Compliance Tracking</h3>
              <p className="pillar-desc">
                Stay updated with real-time notifications on subsidy releases, compliance filing 
                deadlines, and new industrial policy notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="suchna-faq-section">
        <div className="suchna-section-container">
          <div className="suchna-section-header">
            <div className="suchna-section-badge">
              <HelpCircle size={14} />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="suchna-section-title">
              Common Questions About MSME Schemes & Subsidies
            </h2>
          </div>

          <div className="suchna-faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`suchna-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="suchna-faq-question"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  {isOpen && (
                    <div className="suchna-faq-answer animate-fade-in">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Bottom Call to Action */}
      <section className="suchna-cta-section">
        <div className="suchna-cta-container">
          <h2 className="suchna-cta-title">
            Ready to Unlock Government Subsidies & Funding for <span>Your MSME?</span>
          </h2>
          <p className="suchna-cta-desc">
            Speak directly with a Growthora Senior Advisor today to assess your exact scheme eligibility,
            evaluate subsidy caps, and fast-track bank sanctions.
          </p>
          <div className="suchna-cta-btn-row">
            <button
              type="button"
              className="btn-cta-orange"
              onClick={() => handleOpenConsultation()}
            >
              <span>Book Free Scheme Consultation</span>
              <ArrowRight size={17} />
            </button>
            <button
              type="button"
              className="btn-cta-secondary"
              onClick={() => navigate('/eligibility')}
            >
              <span>Take Full Eligibility Test</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      {/* 8. Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={consultationService}
      />
      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
