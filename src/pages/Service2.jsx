import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  Coins,
  Award,
  Megaphone,
  Scale,
  Settings,
  Store,
  TrendingUp,
  Layers,
  Users,
  Target,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Building2,
  Building,
  UserCheck,
  Receipt,
  BadgeCheck,
  Globe,
  Sprout,
  PhoneCall,
  Sparkles,
  ClipboardCheck,
  Landmark,
  Palette,
  Search,
  Rocket,
  CheckCircle2,
} from 'lucide-react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { ServiceEcosystem } from '../components/ServiceEcosystem';
import { AdvisorySpectrumSection } from '../components/AdvisorySpectrum';
import { ImpactStatistics } from '../components/ImpactStatistics';
import { ServiceJourneyFinder } from '../components/ServiceJourneyFinder';
import { ServiceFAQ } from '../components/ServiceFAQ';
import '../styles/service2.css';

// 8 Specific Registration Services for the Interactive Portal
const REGISTRATION_SERVICES = [
  {
    code: '01',
    name: 'Limited Liability Partnership (LLP)',
    icon: Building2,
  },
  {
    code: '02',
    name: 'Proprietorship Registration',
    icon: UserCheck,
  },
  {
    code: '03',
    name: 'Private Limited Company',
    icon: Building,
  },
  {
    code: '04',
    name: 'Partnership Firm Registration',
    icon: Users,
  },
  {
    code: '05',
    name: 'Trademark Registration',
    icon: Award,
  },
  {
    code: '06',
    name: 'GST Registration',
    icon: Receipt,
  },
  {
    code: '07',
    name: 'MSME / Udyam Registration',
    icon: BadgeCheck,
  },
  {
    code: '08',
    name: 'GeM Registration',
    icon: Globe,
  },
];

// 4 Specific Steps for Finance & Funding Interactive Portal
const FUNDING_STEPS = [
  {
    code: '01',
    name: 'Eligibility',
    icon: ClipboardCheck,
  },
  {
    code: '02',
    name: 'Documentation',
    icon: FileText,
  },
  {
    code: '03',
    name: 'Application',
    icon: Landmark,
  },
  {
    code: '04',
    name: 'Certification',
    icon: BadgeCheck,
  },
];

// 5 Specific Cards for Certifications Interactive Portal
const CERTIFICATION_SERVICES = [
  {
    code: '01',
    name: 'Strategy',
    icon: Target,
  },
  {
    code: '02',
    name: 'Identity',
    icon: Palette,
  },
  {
    code: '03',
    name: 'Website',
    icon: Globe,
  },
  {
    code: '04',
    name: 'SEO',
    icon: Search,
  },
  {
    code: '05',
    name: 'Digital Growth',
    icon: Rocket,
  },
];

// 9 Advisory Practices
const SERVICES = [
  {
    id: 1,
    code: '01',
    name: 'Registration',
    path: '/services/registration',
    icon: FileText,
    tagline: 'Foundational Compliance & Entity Incorporation',
    description: 'Set up your business the right way with complete registration support — Pvt Ltd, LLP, OPC, GST, Udyam, and GeM portal onboarding.',
    deliverables: ['Company / LLP Incorporation', 'GST & Udyam Filings', 'Import Export Code (IEC)', 'GeM Registration'],
  },
  {
    id: 2,
    code: '02',
    name: 'Finance & Funding',
    path: '/services/finance-funding',
    icon: Coins,
    tagline: 'Capital Mapping & Lender-Ready Advisory',
    description: 'Explore suitable business loans, government funding schemes (CGTMSE, PMEGP, Mudra), grants, and investor readiness advisory.',
    deliverables: ['Collateral-Free MSME Loans', 'PMEGP Subsidy Schemes', 'DPR & CMA Preparation', 'Venture Debt & Equity'],
  },
  {
    id: 3,
    code: '03',
    name: 'Certifications',
    path: '/services/certifications',
    icon: Award,
    tagline: 'Quality Standards & Global Accreditations',
    description: 'Gain customer trust and tender eligibility with ISO 9001, 14001, 45001, ZED Bronze/Silver/Gold, CE, GMP, and FSSAI certifications.',
    deliverables: ['ISO Standards Accreditations', 'ZED Certification for MSMEs', 'CE & GMP Approvals', 'FSSAI Food Licensing'],
  },
  {
    id: 4,
    code: '04',
    name: 'Branding',
    path: '/services/branding',
    icon: Megaphone,
    tagline: 'Identity, Trademark & Market Positioning',
    description: 'Build an enduring business identity with professional corporate branding, trademark protection, packaging design, and online presence.',
    deliverables: ['Trademark Filing & Protection', 'Brand Identity & Guidelines', 'Packaging & Collateral Design', 'Digital Presence Strategy'],
  },
  {
    id: 5,
    code: '05',
    name: 'Legal & CA',
    path: '/services/legal-ca',
    icon: Scale,
    tagline: 'Corporate Governance & Chartered Advisory',
    description: 'Comprehensive legal structuring, contract drafting, statutory RoC filings, income tax, and regular compliance monitoring.',
    deliverables: ['Statutory Audits & Tax Filings', 'Founders Agreement & Contracts', 'Annual RoC Compliances', 'Litigation & Notice Advisory'],
  },
  {
    id: 6,
    code: '06',
    name: 'Operations',
    path: '/services/operations',
    icon: Settings,
    tagline: 'Process Automation & Enterprise Excellence',
    description: 'Streamline standard operating procedures (SOPs), automate repetitive workflows, optimize supply chains, and implement custom ERP systems.',
    deliverables: ['SOP Design & Implementation', 'Workflow Process Automation', 'Supply Chain Optimization', 'ERP Advisory & Integration'],
  },
  {
    id: 7,
    code: '07',
    name: 'MSME Benefits',
    path: '/services/msme-benefits',
    icon: Store,
    tagline: 'Subsidies, Incentives & Government Rebates',
    description: 'Unlock government capital subsidies, interest subvention, concessional industrial electricity tariffs, and tender fee exemptions.',
    deliverables: ['Capital Investment Subsidies', 'Power Tariff Concessions', 'Public Procurement Exemptions', 'State Industrial Policy Benefits'],
  },
  {
    id: 8,
    code: '08',
    name: 'IPO',
    path: '/services/ipo',
    icon: TrendingUp,
    tagline: 'BSE SME & NSE Emerge Public Listing',
    description: 'Transition from private enterprise to public entity with end-to-end SME IPO advisory, DRHP filing, merchant banker coordination, and roadshows.',
    deliverables: ['IPO Readiness & Restructuring', 'DRHP Document Filing', 'Merchant Banking Coordination', 'Investor Roadshow Support'],
  },
  {
    id: 9,
    code: '09',
    name: 'Valuation',
    path: '/services/valuation',
    icon: Layers,
    tagline: 'Registered Valuer Reports for Funding & Tax',
    description: 'Certified enterprise valuation reports under Companies Act, Income Tax Rules, FEMA, and IBBI Registered Valuers for fundraising & mergers.',
    deliverables: ['IBBI Registered Valuations', 'DCF & Relative Methodologies', 'FEMA / Cross-Border Valuations', 'Share Swap & Merger Ratios'],
  },
];

// 9 Interactive Business Needs for Advisory Finder
const BUSINESS_NEEDS = [
  {
    label: 'Start a New Business',
    serviceId: 1,
    heading: 'Registration Advisory',
    description: 'Set up your business the right way with complete registration support, correct entity sequencing, and all initial tax filings handled.',
    offerings: ['Private Limited Company', 'LLP & OPC Setup', 'GST Registration', 'Udyam Registration', 'GeM Portal Onboarding'],
  },
  {
    label: 'Get Business Funding',
    serviceId: 2,
    heading: 'Capital & Advisory Financing',
    description: 'We map your business to the right capital — grants, debt, or equity — prepare lender-ready documentation, and drive the process through to disbursement.',
    offerings: ['Grant Funding', 'Debt Funding', 'Equity Funding', 'CGTMSE & PMEGP Loans', 'DPR & CMA Reports'],
  },
  {
    label: 'Get Business Certifications',
    serviceId: 3,
    heading: 'Quality & Certifications',
    description: 'Gain customer trust, tender eligibility, and global standard approvals with recognized certifications and quality frameworks.',
    offerings: ['ISO 9001 / 14001 / 45001', 'ZED Certification for MSMEs', 'CE & GMP Approvals', 'FSSAI Licensing'],
  },
  {
    label: 'Improve Branding & Website',
    serviceId: 4,
    heading: 'Branding & Digital Presence',
    description: 'Build an enduring business identity with professional brand design, trademark protection, modern website development, and high-impact digital presence.',
    offerings: ['Trademark Registration', 'Brand Identity & Guidelines', 'Corporate Website', 'High-Impact Digital Growth'],
  },
  {
    label: 'Get Legal & Compliance Support',
    serviceId: 5,
    heading: 'Legal & Statutory Compliance',
    description: 'Comprehensive legal structuring, contract drafting, statutory RoC filings, income tax, and regular compliance monitoring.',
    offerings: ['Statutory Audits & Tax Filings', 'Founders Agreement & Contracts', 'Annual RoC Compliances', 'Notice & Litigation Advisory'],
  },
  {
    label: 'Improve Business Operations',
    serviceId: 6,
    heading: 'Operations & Enterprise Systems',
    description: 'Streamline standard operating procedures (SOPs), automate repetitive workflows, optimize supply chains, and integrate tailored ERP systems.',
    offerings: ['SOP Design & Rollout', 'Workflow Process Automation', 'Supply Chain Optimization', 'Custom ERP Integration'],
  },
  {
    label: 'Explore Government Schemes',
    serviceId: 7,
    heading: 'Government Schemes & Subsidies',
    description: 'Unlock government capital subsidies, interest subventions, concessional industrial electricity tariffs, and public procurement preferences.',
    offerings: ['Capital Investment Subsidies', 'Interest Subvention Schemes', 'Power Tariff Concessions', 'Tender Fee Exemptions'],
  },
  {
    label: 'Prepare for IPO',
    serviceId: 8,
    heading: 'SME IPO Advisory & Listing',
    description: 'Transition from private enterprise to public entity with end-to-end BSE SME / NSE Emerge IPO readiness, merchant banking, and listing advisory.',
    offerings: ['IPO Readiness Assessment', 'DRHP Document Filing', 'Merchant Banking Coordination', 'Roadshows & Investor Outreach'],
  },
  {
    label: 'Get Business Valuation',
    serviceId: 9,
    heading: 'Enterprise Valuation Advisory',
    description: 'Certified enterprise valuation reports under Companies Act, Income Tax Rules, FEMA, and IBBI Registered Valuers for fundraising & restructuring.',
    offerings: ['IBBI Registered Valuations', 'DCF & Relative Methodologies', 'FEMA Cross-Border Valuations', 'Mergers & Share Swap Ratios'],
  },
];

// 5 Growth Staircase Stages matching Image 1
const GROWTH_STAGES = [
  {
    id: 1,
    title: 'Setup',
    stageNum: 'STAGE 01',
    icon: Sprout,
    className: 's2-step-1',
    highlight: 'Entity, GST & Udyam',
    description: 'Incorporate your company, register GST, and secure foundational IDs without procedural hiccups.',
  },
  {
    id: 2,
    title: 'Comply',
    stageNum: 'STAGE 02',
    icon: ShieldCheck,
    className: 's2-step-2',
    highlight: 'Audits & Governance',
    description: 'Maintain pristine RoC filings, statutory books, and tax disclosures to remain perpetually audit-ready.',
  },
  {
    id: 3,
    title: 'Fund',
    stageNum: 'STAGE 03',
    icon: Building2,
    className: 's2-step-3',
    highlight: 'Loans & Capital',
    description: 'Tap collateral-free MSME credit, state subsidies, grants, and bank debt to fuel operational expansions.',
  },
  {
    id: 4,
    title: 'Grow',
    stageNum: 'STAGE 04',
    icon: TrendingUp,
    className: 's2-step-4',
    highlight: 'Scale & Systems',
    description: 'Standardize operations with SOPs, protect your trademark, and broaden market footprint nationwide.',
  },
  {
    id: 5,
    title: 'Scale',
    stageNum: 'STAGE 05',
    icon: Award,
    className: 's2-step-5',
    highlight: 'IPO & Valuation',
    description: 'Unlock enterprise valuation, attract institutional investors, and list on the BSE/NSE SME exchange.',
  },
];

export default function Service2() {
  const navigate = useNavigate();
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const [selectedNeedIndex, setSelectedNeedIndex] = useState(0);
  const [activeStageId, setActiveStageId] = useState(1);

  // Interactive Portal State: tracks which service is active inside the arch (null = default image)
  const [activeServiceId, setActiveServiceId] = useState(null);
  const portalContainerRef = useRef(null);

  // Modals
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);

  const activeService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const handleOpenConsultation = (service = null) => {
    setSelectedServiceForModal(service || activeService);
    navigate('/book-consultation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeCardClick = (service) => {
    setSelectedServiceId(service.id);
  };

  // Service button click: 01 Registration, 02 Finance & Funding, 03 Certifications toggle their views, others restore image
  const handleServiceButtonClick = (srv) => {
    if (activeServiceId === srv.code) {
      // Clicking the active service again closes the panel and restores image
      setActiveServiceId(null);
    } else if (srv.code === '01' || srv.code === '02' || srv.code === '03') {
      // Open Registration (01), Finance & Funding (02), or Certifications (03) inside the arch
      setActiveServiceId(srv.code);
      setSelectedServiceId(srv.id);
    } else {
      // If another service has no implemented portal panel yet, restore original image
      setActiveServiceId(null);
      setSelectedServiceId(srv.id);
      handlePracticeCardClick(srv);
    }
  };

  // Outside click handler to restore original Business Growth Portal image
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeServiceId && portalContainerRef.current) {
        if (!portalContainerRef.current.contains(event.target)) {
          setActiveServiceId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeServiceId]);

  // Handle clicking any registration card -> navigate to /book-consultation
  const handleRegistrationClick = (serviceName) => {
    navigate(`/book-consultation?service=${encodeURIComponent(serviceName)}`, {
      state: { service: serviceName, category: 'Registration' },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clicking "Explore Registration →" -> navigate to /book-consultation
  const handleExploreRegistration = () => {
    navigate('/book-consultation?service=Registration', {
      state: { service: 'Registration', category: 'General' },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clicking any funding step -> navigate to /book-consultation
  const handleFundingStepClick = (stepName) => {
    navigate(`/book-consultation?service=Finance%20%26%20Funding&step=${encodeURIComponent(stepName)}`, {
      state: { service: 'Finance & Funding', step: stepName, category: 'Finance & Funding' },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clicking "Explore Finance & Funding →" -> navigate to /book-consultation
  const handleExploreFunding = () => {
    navigate('/book-consultation?service=Finance%20%26%20Funding', {
      state: { service: 'Finance & Funding', category: 'Finance & Funding' },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clicking any certification card -> navigate to /book-consultation
  const handleCertificationClick = (serviceName) => {
    navigate(`/book-consultation?service=Certifications&item=${encodeURIComponent(serviceName)}`, {
      state: { service: 'Certifications', item: serviceName, category: 'Certifications' },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clicking "Explore Services →" in Certifications panel -> navigate to /book-consultation
  const handleExploreCertifications = () => {
    navigate('/book-consultation?service=Certifications', {
      state: { service: 'Certifications', category: 'Certifications' },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNeedClick = (index) => {
    setSelectedNeedIndex(index);
    const targetServiceId = BUSINESS_NEEDS[index].serviceId;
    setSelectedServiceId(targetServiceId);
  };

  const handleExploreService = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAdvisoryPractices = (e) => {
    e.preventDefault();
    const element = document.getElementById('advisory-practices');
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="service2-page-root">
      {/* 1. Global Navigation Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      <main>
        {/* ===================================================================
            HERO SECTION: 40% CONTENT (LEFT) + 60% BUSINESS GROWTH PORTAL (RIGHT)
            =================================================================== */}
        <section className="service2-hero-wrapper relative w-full overflow-hidden bg-[#FFF9F5]">
          <div className="s2-hero-ambient-glow" aria-hidden="true" />
          <div className="s2-hero-corner-glow-left" aria-hidden="true" />

          <div ref={portalContainerRef} className="service2-hero">
            {/* LEFT SIDE — 40%: Editorial Headline, CTAs, Benefits */}
            <div className="service2-hero-content">
              <div className="s2-hero-badge">
                <span className="s2-hero-badge-line" aria-hidden="true" />
                <span className="s2-hero-badge-text">OUR SERVICES</span>
              </div>

              <h1 className="s2-hero-title">
                <span className="s2-hero-title-line1">Your Business. Our Expertise.</span>
                <span className="s2-hero-title-line2">
                  <span>Every Stage of </span>
                  <span className="s2-hero-underline-wrap">
                    <span>Growth.</span>
                    {/* Thin, elegant upward-curved orange arch beneath "Growth." matching reference */}
                    <svg
                      className="s2-hero-curved-underline"
                      viewBox="0 0 180 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M 2 11 C 55 1.5, 125 1.5, 178 11 C 125 5, 55 5, 2 11 Z"
                        fill="#FF5B00"
                      />
                    </svg>
                  </span>
                </span>
              </h1>

              <p className="s2-hero-description">
                From business registration and funding to compliance and expansion, we provide expert advisory and end-to-end support to help your business grow.
              </p>

              <div className="s2-hero-cta-group">
                <button
                  type="button"
                  className="s2-btn-primary"
                  onClick={() => handleOpenConsultation()}
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="s2-btn-arrow" />
                </button>

                <a
                  href="#advisory-practices"
                  className="s2-btn-secondary"
                  onClick={scrollToAdvisoryPractices}
                >
                  <span>Explore Services</span>
                  <ArrowRight size={18} strokeWidth={2.2} className="s2-btn-arrow" />
                </a>
              </div>

              {/* Trust Indicators / Bottom Benefits */}
              <div className="s2-hero-trust-indicators">
                <div className="s2-trust-item">
                  <div className="s2-trust-icon-box" aria-hidden="true">
                    <Users size={20} strokeWidth={2.4} />
                  </div>
                  <span className="s2-trust-text">
                    Multi-disciplinary
                    <br />
                    Advisory Team
                  </span>
                </div>

                <div className="s2-trust-divider" aria-hidden="true" />

                <div className="s2-trust-item">
                  <div className="s2-trust-icon-box" aria-hidden="true">
                    <ShieldCheck size={20} strokeWidth={2.4} />
                  </div>
                  <span className="s2-trust-text">
                    End-to-End
                    <br />
                    Execution
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — 60%: Semicircular Sequential Service Graph Infographic */}
            <div className="service2-hero-visual">
              <ServiceEcosystem />
            </div>
          </div>
        </section>

        {/* ===================================================================
            OUR IMPACT IN NUMBERS — PREMIUM STATISTICS SECTION
            =================================================================== */}
        <ImpactStatistics />

        {/* ===================================================================
            SECTION: ONE PARTNER. EVERY STAGE. & ADVISORY FINDER
            Pixel-Accurate reference design with elephant growth journey & 9-service finder
            =================================================================== */}
        <ServiceJourneyFinder
          onOpenConsultation={(service) => handleOpenConsultation(service)}
        />

        {/* ===================================================================
            OUR ADVISORY PRACTICES SPECTRUM (CIRCULAR WHEEL + DYNAMIC PANEL)
            =================================================================== */}
        <AdvisorySpectrumSection
          onOpenConsultation={(service) => handleOpenConsultation(service)}
        />

        {/* ===================================================================
            FREQUENTLY ASKED QUESTIONS & BUSINESS GROWTH CTA SECTION
            Pixel-Accurate reference design with glass growth graph & CTA banner
            =================================================================== */}
        <ServiceFAQ onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Corporate Global Footer */}
      <Footer onSelectCategory={(code) => {
        const found = SERVICES.find(s => s.code === code);
        if (found) {
          navigate(found.path);
        } else {
          navigate('/');
        }
      }} />

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={selectedServiceForModal}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
        onSelectCategory={(code) => {
          const found = SERVICES.find(s => s.code === code);
          if (found) {
            navigate(found.path);
          }
        }}
      />
    </div>
  );
}
