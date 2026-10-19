import React, { useState } from 'react';
import {
  ArrowRight, CheckCircle, ChevronDown, FileText, Shield,
  TrendingUp, Users, Lightbulb, BarChart2, BookOpen,
  ClipboardCheck, Award, Layers, HelpCircle, AlertCircle,
  Star, Building2, Target, Zap, PieChart
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import api from '../lib/api';
import '../styles/schemeGuide.css';

/* ─── FAQ Data ─── */
const FAQ_DATA = [
  {
    q: 'What is the Startup India Seed Fund Scheme?',
    a: 'The Startup India Seed Fund Scheme (SISFS) is a Government of India initiative under the Department for Promotion of Industry and Internal Trade (DPIIT). It provides financial assistance to startups for proof-of-concept, prototype development, product trials, market entry, and commercialisation. The scheme channels funding through selected DPIIT-recognised incubators.',
  },
  {
    q: 'Who can apply for the Startup India Seed Fund Scheme?',
    a: 'DPIIT-recognised startups that are incorporated as a private limited company, LLP, or registered partnership firm, with a business idea that involves technology or innovation. The startup must not have received more than ₹10 lakh in monetary support under any other Central or State Government scheme. Additionally, at least 51% of the shareholding must be held by Indian promoters.',
  },
  {
    q: 'How much funding is available under this scheme?',
    a: 'Eligible startups can receive up to ₹20 lakh as a grant for validation of proof-of-concept, prototype development, or product trials. Startups requiring funding for market entry, commercialisation, or scaling up may receive debt/convertible debentures or debt-linked instruments up to ₹50 lakh through the incubator. Exact amounts are at the discretion of the Incubator Seed Management Committee (ISMC). Growthora will assess your eligibility before making any representation.',
  },
  {
    q: 'What documents are required to apply?',
    a: 'You will typically need: DPIIT Recognition Certificate, Certificate of Incorporation (Company or LLP), a Business Plan / Pitch Deck, Financial Projections (3–5 years), KYC and Promoter Details, and a brief description of the innovation or problem being solved. Additional documents may be requested by the incubator\'s selection committee. Growthora\'s team will help you compile and review your documentation.',
  },
  {
    q: 'What is the application process?',
    a: 'The application is made through the DPIIT-recognised incubators empanelled under the scheme. The process involves: (1) checking eligibility via official DPIIT criteria, (2) preparing required documentation, (3) submitting an application to the empanelled incubator of your choice, (4) evaluation by the Incubator Seed Management Committee, and (5) a funding decision. Growthora can guide you through each of these steps.',
  },
  {
    q: 'How can Growthora assist with the SISFS application?',
    a: 'Growthora Advisory provides end-to-end assistance including eligibility assessment, documentation preparation, business plan and DPR writing, financial projection modelling, and application guidance. Our team does not guarantee approvals but ensures your application is well-prepared, complete, and presented professionally to maximise your chances of consideration.',
  },
];

/* ─── Form Submission ─── */
async function submitSchemeEnquiry(formData) {
  try {
    const visitorId =
      localStorage.getItem('growthora.visitorId') ||
      (() => {
        const id = crypto.randomUUID();
        localStorage.setItem('growthora.visitorId', id);
        return id;
      })();

    await api.post('/leads', {
      sessionId: visitorId,
      data: {
        source: 'scheme-guide-sisfs',
        fullName: formData.fullName,
        mobile: formData.mobile,
        businessType: formData.businessType,
        startupStage: formData.startupStage,
        fundingRequirement: formData.fundingRequirement,
        enquiryType: 'Startup India Seed Fund Scheme',
      },
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

/* ─── Component ─── */
export default function SchemeGuidePage() {

  /* Modals */
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  /* FAQ */
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  /* Enquiry Form */
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    businessType: '',
    startupStage: '',
    fundingRequirement: '',
    consent: false,
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) return;
    setFormStatus('submitting');
    const result = await submitSchemeEnquiry(formData);
    setFormStatus(result.success ? 'success' : 'error');
  };

  const toggleFaq = (i) => {
    setOpenFaqIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="sg-page">
      {/* ── Global Header (unchanged) ── */}
      <Header
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* ================================================================
          SECTION 1 — PREMIUM HERO
      ================================================================ */}
      <section className="sg-hero" aria-label="Scheme Overview">
        <div className="sg-hero-decor" aria-hidden="true" />
        <div className="sg-container">
          <div className="sg-hero-grid">

            {/* LEFT: Content */}
            <div className="sg-hero-left">
              <div className="sg-category-badge" role="note">
                <span className="sg-category-badge-dot" />
                Government Funding Scheme
              </div>

              <h1 className="sg-hero-title">
                Startup India{' '}
                <span className="sg-hero-title-highlight">Seed Fund</span>{' '}Scheme
              </h1>

              <p className="sg-hero-subtitle">
                Fuel Your Startup's Next Stage of Growth
              </p>

              <p className="sg-hero-desc">
                Explore government-backed funding opportunities with professional
                guidance from Growthora Advisory. We help eligible startups
                navigate the SISFS process — from eligibility assessment to
                application submission.
              </p>

              <div className="sg-hero-ctas">
                <a
                  href="/eligibility"
                  className="sg-btn-primary"
                  id="sg-hero-eligibility-cta"
                >
                  <CheckCircle size={16} />
                  Check Eligibility
                </a>
                <button
                  type="button"
                  className="sg-btn-secondary"
                  id="sg-hero-expert-cta"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  Talk to an Expert
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* RIGHT: Enquiry Form Card */}
            <aside className="sg-hero-form-card" aria-label="Funding eligibility enquiry form">
              {formStatus === 'success' ? (
                <div className="sg-form-success" role="alert">
                  <div className="sg-success-icon" aria-hidden="true">
                    <CheckCircle size={24} />
                  </div>
                  <p className="sg-success-title">Request Submitted!</p>
                  <p className="sg-success-text">
                    Thank you. Our advisory team will review your details and
                    reach out within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="sg-form-card-heading">Check Your Funding Eligibility</h2>
                  <p className="sg-form-card-sub">
                    Free assessment from Growthora's expert advisory team.
                  </p>

                  <form onSubmit={handleFormSubmit} noValidate id="sg-eligibility-form">
                    {/* Row 1: Full Name | Mobile */}
                    <div className="sg-form-grid-2">
                      <div className="sg-form-group">
                        <label className="sg-form-label" htmlFor="sg-fullName">
                          Full Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="sg-fullName"
                          type="text"
                          name="fullName"
                          className="sg-form-input"
                          placeholder="Your full name"
                          required
                          value={formData.fullName}
                          onChange={handleFormChange}
                          autoComplete="name"
                        />
                      </div>
                      <div className="sg-form-group">
                        <label className="sg-form-label" htmlFor="sg-mobile">
                          Mobile Number <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="sg-mobile"
                          type="tel"
                          name="mobile"
                          className="sg-form-input"
                          placeholder="10-digit mobile"
                          required
                          pattern="[6-9][0-9]{9}"
                          value={formData.mobile}
                          onChange={handleFormChange}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    {/* Row 2: Business Type | Startup Stage */}
                    <div className="sg-form-grid-2">
                      <div className="sg-form-group">
                        <label className="sg-form-label" htmlFor="sg-businessType">
                          Business Type <span aria-hidden="true">*</span>
                        </label>
                        <select
                          id="sg-businessType"
                          name="businessType"
                          className="sg-form-select"
                          required
                          value={formData.businessType}
                          onChange={handleFormChange}
                        >
                          <option value="">Business type</option>
                          <option>Private Limited Company</option>
                          <option>LLP</option>
                          <option>Registered Partnership</option>
                          <option>Proprietorship</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="sg-form-group">
                        <label className="sg-form-label" htmlFor="sg-startupStage">
                          Startup Stage <span aria-hidden="true">*</span>
                        </label>
                        <select
                          id="sg-startupStage"
                          name="startupStage"
                          className="sg-form-select"
                          required
                          value={formData.startupStage}
                          onChange={handleFormChange}
                        >
                          <option value="">Startup stage</option>
                          <option>Idea / Concept</option>
                          <option>Prototype Development</option>
                          <option>Early Revenue</option>
                          <option>Growth Stage</option>
                          <option>Scaling</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Funding Requirement — full width */}
                    <div className="sg-form-full">
                      <div className="sg-form-group">
                        <label className="sg-form-label" htmlFor="sg-fundingRequirement">
                          Funding Requirement
                        </label>
                        <select
                          id="sg-fundingRequirement"
                          name="fundingRequirement"
                          className="sg-form-select"
                          value={formData.fundingRequirement}
                          onChange={handleFormChange}
                        >
                          <option value="">Select funding range</option>
                          <option>Up to ₹5 Lakh</option>
                          <option>₹5 – ₹20 Lakh (Grant)</option>
                          <option>₹20 – ₹50 Lakh (Debt/Convertible)</option>
                          <option>Above ₹50 Lakh</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Consent */}
                    <label className="sg-form-consent" htmlFor="sg-consent">
                      <input
                        id="sg-consent"
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleFormChange}
                        required
                      />
                      <span className="sg-consent-text">
                        I agree to Growthora's{' '}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                          Privacy Policy
                        </a>{' '}
                        and consent to being contacted about funding assistance.
                      </span>
                    </label>

                    {formStatus === 'error' && (
                      <p
                        role="alert"
                        style={{
                          fontSize: '0.78rem',
                          color: '#DC2626',
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <AlertCircle size={13} />
                        Something went wrong. Please try again or call us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="sg-btn-form-submit"
                      id="sg-form-submit-btn"
                      disabled={formStatus === 'submitting' || !formData.consent}
                    >
                      {formStatus === 'submitting' ? 'Submitting…' : 'Request Free Assessment'}
                      {formStatus !== 'submitting' && <ArrowRight size={16} />}
                    </button>
                  </form>
                </>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — FUNDING HIGHLIGHTS
      ================================================================ */}
      <section className="sg-highlights-section" aria-label="Funding highlights">
        <div className="sg-container">
          <div className="sg-highlights-grid">

            <article className="sg-highlight-card">
              <div className="sg-highlight-icon" aria-hidden="true">
                <Award size={22} />
              </div>
              <div className="sg-highlight-amount">Up to ₹20 Lakh</div>
              <div className="sg-highlight-label">Grant Support</div>
            </article>

            <article className="sg-highlight-card">
              <div className="sg-highlight-icon" aria-hidden="true">
                <BarChart2 size={22} />
              </div>
              <div className="sg-highlight-amount">Up to ₹50 Lakh</div>
              <div className="sg-highlight-label">Debt / Convertible Instruments</div>
            </article>

            <article className="sg-highlight-card">
              <div className="sg-highlight-icon" aria-hidden="true">
                <Shield size={22} />
              </div>
              <div className="sg-highlight-amount">DPIIT</div>
              <div className="sg-highlight-label">Recognition Required</div>
            </article>

            <article className="sg-highlight-card">
              <div className="sg-highlight-icon" aria-hidden="true">
                <Building2 size={22} />
              </div>
              <div className="sg-highlight-amount">Incubators</div>
              <div className="sg-highlight-label">DPIIT Empanelled Channel</div>
            </article>

          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — ABOUT THE SCHEME
      ================================================================ */}
      <section className="sg-about-section" aria-labelledby="sg-about-heading">
        <div className="sg-container">
          <div className="sg-about-grid">

            {/* Left: Editorial Content */}
            <div className="sg-about-left">
              <span className="sg-section-eyebrow" aria-hidden="true">
                <BookOpen size={12} />
                About the Scheme
              </span>

              <h2 id="sg-about-heading" className="sg-section-title">
                What is the Startup India Seed Fund Scheme?
              </h2>

              <div className="sg-about-body">
                <p>
                  The <strong>Startup India Seed Fund Scheme (SISFS)</strong> is a
                  flagship initiative by the Government of India, administered by the
                  Department for Promotion of Industry and Internal Trade (DPIIT). It
                  was launched to provide critical early-stage financial support to
                  eligible DPIIT-recognised startups.
                </p>

                <p>
                  <strong>Objective:</strong> The scheme aims to provide financial
                  assistance to startups for proof-of-concept (PoC) validation,
                  prototype development, product trials, market entry, and
                  commercialisation. It bridges the gap between ideation and
                  investment readiness.
                </p>

                <p>
                  <strong>Who can apply?</strong> Startups that are DPIIT-recognised,
                  incorporated in India as a Private Limited Company, LLP, or
                  Registered Partnership, and have not received more than ₹10 lakh in
                  monetary support under any Central or State Government scheme at the
                  time of application. At least 51% of the shareholding must be held
                  by Indian promoters.
                </p>

                <p>
                  <strong>How does the funding work?</strong> Funding is disbursed
                  through DPIIT-empanelled incubators. Startups apply to an incubator
                  of their choice, and the Incubator Seed Management Committee (ISMC)
                  evaluates applications. Grants of up to ₹20 lakh are available for
                  early-stage validation. Debt instruments or convertible instruments
                  of up to ₹50 lakh are available for market entry and scale-up.
                </p>

                <p>
                  <em>
                    Important: Growthora Advisory is a private advisory firm. We assist
                    startups with preparation and guidance — we do not represent or act
                    on behalf of any government body, and we do not guarantee funding
                    approvals.
                  </em>
                </p>
              </div>
            </div>

            {/* Right: Info Card */}
            <aside className="sg-about-info-card" aria-label="Scheme quick details">
              <div className="sg-info-card-header">
                <div className="sg-info-card-header-title">Scheme Quick Reference</div>
              </div>
              <div className="sg-info-card-body">
                <div className="sg-info-row">
                  <span className="sg-info-label">Scheme</span>
                  <span className="sg-info-value">Startup India Seed Fund Scheme</span>
                </div>
                <div className="sg-info-row">
                  <span className="sg-info-label">Nodal Body</span>
                  <span className="sg-info-value">DPIIT, Govt. of India</span>
                </div>
                <div className="sg-info-row">
                  <span className="sg-info-label">Grant Limit</span>
                  <span className="sg-info-value">Up to ₹20 Lakh</span>
                </div>
                <div className="sg-info-row">
                  <span className="sg-info-label">Debt Limit</span>
                  <span className="sg-info-value">Up to ₹50 Lakh</span>
                </div>
                <div className="sg-info-row">
                  <span className="sg-info-label">Eligibility</span>
                  <span className="sg-info-value">DPIIT-recognised Startups</span>
                </div>
                <div className="sg-info-row">
                  <span className="sg-info-label">Channel</span>
                  <span className="sg-info-value">DPIIT Empanelled Incubators</span>
                </div>
                <div className="sg-info-row">
                  <span className="sg-info-label">Status</span>
                  <span className="sg-info-value">
                    <span className="sg-info-badge active">Active Scheme</span>
                  </span>
                </div>
                <div className="sg-info-row">
                  <span className="sg-info-label">Official Portal</span>
                  <span className="sg-info-value">
                    <a
                      href="https://www.startupindia.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--sg-green-primary)', fontWeight: 700 }}
                    >
                      startupindia.gov.in ↗
                    </a>
                  </span>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — KEY BENEFITS
      ================================================================ */}
      <section className="sg-benefits-section" aria-labelledby="sg-benefits-heading">
        <div className="sg-container">
          <div className="sg-section-header">
            <span className="sg-section-eyebrow" aria-hidden="true">
              <Star size={12} />
              Key Benefits
            </span>
            <h2 id="sg-benefits-heading" className="sg-section-title">
              What the Scheme Supports
            </h2>
            <p className="sg-section-desc">
              SISFS funding can be used across critical early-stage activities.
            </p>
          </div>

          <div className="sg-benefits-grid">

            <article className="sg-benefit-card">
              <div className="sg-benefit-icon" aria-hidden="true">
                <Lightbulb size={20} />
              </div>
              <h3 className="sg-benefit-title">Product Development</h3>
              <p className="sg-benefit-desc">
                Fund proof-of-concept validation and core product development
                activities to demonstrate technical feasibility of your innovation.
              </p>
            </article>

            <article className="sg-benefit-card">
              <div className="sg-benefit-icon" aria-hidden="true">
                <Zap size={20} />
              </div>
              <h3 className="sg-benefit-title">Prototype &amp; Trials</h3>
              <p className="sg-benefit-desc">
                Build functional prototypes and conduct product trials to refine
                your offering before entering the market.
              </p>
            </article>

            <article className="sg-benefit-card">
              <div className="sg-benefit-icon" aria-hidden="true">
                <Target size={20} />
              </div>
              <h3 className="sg-benefit-title">Market Entry</h3>
              <p className="sg-benefit-desc">
                Access debt instruments to fund initial market launch, customer
                acquisition, and early commercialisation efforts.
              </p>
            </article>

            <article className="sg-benefit-card">
              <div className="sg-benefit-icon" aria-hidden="true">
                <TrendingUp size={20} />
              </div>
              <h3 className="sg-benefit-title">Startup Growth Support</h3>
              <p className="sg-benefit-desc">
                Scale up operations with convertible instruments and mentorship
                access through the incubator network.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — ELIGIBILITY
      ================================================================ */}
      <section className="sg-eligibility-section" aria-labelledby="sg-eligibility-heading">
        <div className="sg-container">
          <div className="sg-section-header">
            <span className="sg-section-eyebrow" aria-hidden="true">
              <ClipboardCheck size={12} />
              Eligibility Criteria
            </span>
            <h2 id="sg-eligibility-heading" className="sg-section-title">
              Are You Eligible?
            </h2>
            <p className="sg-section-desc">
              Review the general eligibility criteria for the Startup India Seed Fund Scheme.
              Always verify current conditions on the official DPIIT portal.
            </p>
          </div>

          <div className="sg-eligibility-grid">

            <div className="sg-checklist-card">
              <h3 className="sg-checklist-card-title">General Eligibility</h3>

              {[
                'Must be a DPIIT-recognised startup at the time of application',
                'Incorporated in India as a Private Limited Company, LLP, or Registered Partnership Firm',
                'At least 51% shareholding held by Indian promoters',
                'Startup must have a viable, innovative business idea or product',
                'Must not have received more than ₹10 lakh under any Central / State Govt scheme',
                'Should not be a promoter-group company of a larger business',
              ].map((item, i) => (
                <div key={i} className="sg-checklist-item">
                  <div className="sg-check-icon" aria-hidden="true">
                    <CheckCircle size={11} />
                  </div>
                  <span className="sg-checklist-text">{item}</span>
                </div>
              ))}
            </div>

            <div className="sg-checklist-card">
              <h3 className="sg-checklist-card-title">Sector &amp; Stage Criteria</h3>

              {[
                'Startups working in technology or innovation-driven sectors',
                'At least a minimum viable idea or prototype ready',
                'Preference for startups with potential for scalability and replication',
                'Social enterprises and deep-tech startups are encouraged',
                'Agri-tech, health-tech, clean-energy startups often prioritised',
                'Startups at pre-seed, seed, or early growth stage may apply',
              ].map((item, i) => (
                <div key={i} className="sg-checklist-item">
                  <div className="sg-check-icon" aria-hidden="true">
                    <CheckCircle size={11} />
                  </div>
                  <span className="sg-checklist-text">{item}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="sg-eligibility-cta">
            <a
              href="/eligibility"
              className="sg-btn-cta-green"
              id="sg-eligibility-section-cta"
            >
              <ClipboardCheck size={16} />
              Check Your Eligibility Now
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — APPLICATION PROCESS
      ================================================================ */}
      <section className="sg-process-section" aria-labelledby="sg-process-heading">
        <div className="sg-container">
          <div className="sg-section-header">
            <span className="sg-section-eyebrow" aria-hidden="true">
              <Layers size={12} />
              Application Process
            </span>
            <h2 id="sg-process-heading" className="sg-section-title">
              How to Apply — Step by Step
            </h2>
            <p className="sg-section-desc">
              Growthora can assist you at every stage of this process.
            </p>
          </div>

          <ol className="sg-timeline" aria-label="Application process steps">
            {[
              {
                num: '01',
                title: 'Eligibility Check',
                desc: 'Confirm DPIIT recognition and meet funding criteria',
              },
              {
                num: '02',
                title: 'Documentation',
                desc: 'Prepare business plan, projections and required documents',
              },
              {
                num: '03',
                title: 'Application Submission',
                desc: 'Apply to a DPIIT-empanelled incubator of your choice',
              },
              {
                num: '04',
                title: 'Evaluation',
                desc: 'Review by Incubator Seed Management Committee (ISMC)',
              },
              {
                num: '05',
                title: 'Funding Decision',
                desc: 'ISMC approves or declines; disbursement through incubator',
              },
            ].map((step, i) => (
              <li key={i} className="sg-step">
                <div className="sg-step-num" aria-hidden="true">{step.num}</div>
                <div>
                  <div className="sg-step-title">{step.title}</div>
                  <div className="sg-step-desc">{step.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — REQUIRED DOCUMENTS
      ================================================================ */}
      <section className="sg-documents-section" aria-labelledby="sg-docs-heading">
        <div className="sg-container">
          <div className="sg-section-header">
            <span className="sg-section-eyebrow" aria-hidden="true">
              <FileText size={12} />
              Required Documents
            </span>
            <h2 id="sg-docs-heading" className="sg-section-title">
              Document Checklist
            </h2>
            <p className="sg-section-desc">
              Documents typically required. Actual requirements may vary by incubator.
              Always confirm with your chosen incubator's guidelines.
            </p>
          </div>

          <div className="sg-docs-grid">

            <div className="sg-doc-group">
              <div className="sg-doc-group-header required">
                <FileText size={16} color="var(--sg-green-primary)" />
                <span className="sg-doc-group-title">Generally Required Documents</span>
                <span className="sg-doc-tag required">Required</span>
              </div>
              <ul className="sg-doc-list">
                {[
                  'DPIIT Recognition Certificate',
                  'Certificate of Incorporation (MCA / Registrar of Firms)',
                  'Business Plan or Pitch Deck (10–20 slides)',
                  'Financial Projections (3–5 year P&L, Cash Flow)',
                  'KYC of All Promoters (PAN, Aadhaar)',
                  'Board Resolution or Authorisation Letter',
                ].map((doc, i) => (
                  <li key={i} className="sg-doc-item">
                    <CheckCircle size={14} className="sg-doc-icon" aria-hidden="true" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sg-doc-group">
              <div className="sg-doc-group-header optional">
                <FileText size={16} color="#B45309" />
                <span className="sg-doc-group-title">May Be Requested</span>
                <span className="sg-doc-tag optional">Optional / As Applicable</span>
              </div>
              <ul className="sg-doc-list">
                {[
                  'Udyam Registration Certificate (if applicable)',
                  'GST Registration (if applicable)',
                  'Letters of Intent (LOI) from potential customers',
                  'IP / Patent Filing Evidence',
                  'Bank Statements (last 6–12 months)',
                  'Any earlier grant / subsidy approval letters',
                ].map((doc, i) => (
                  <li key={i} className="sg-doc-item">
                    <HelpCircle
                      size={14}
                      className="sg-doc-icon optional-icon"
                      aria-hidden="true"
                    />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 8 — WHY GROWTHORA
      ================================================================ */}
      <section className="sg-why-section" aria-labelledby="sg-why-heading">
        <div className="sg-container">
          <div className="sg-why-header">
            <div className="sg-why-eyebrow" aria-hidden="true">
              <Star size={12} />
              Why Growthora
            </div>
            <h2 id="sg-why-heading" className="sg-why-title">
              Your Growth. Our Expertise.
            </h2>
            <p className="sg-why-desc">
              Growthora Advisory provides professional, end-to-end support for
              startups navigating government funding programmes.
            </p>
          </div>

          <div className="sg-why-grid">

            <article className="sg-why-card">
              <div className="sg-why-card-icon" aria-hidden="true">
                <ClipboardCheck size={20} />
              </div>
              <h3 className="sg-why-card-title">Eligibility Assessment</h3>
              <p className="sg-why-card-desc">
                We evaluate your startup's readiness against current SISFS criteria
                before you invest time in a full application.
              </p>
            </article>

            <article className="sg-why-card">
              <div className="sg-why-card-icon" aria-hidden="true">
                <BookOpen size={20} />
              </div>
              <h3 className="sg-why-card-title">DPR &amp; Business Plan</h3>
              <p className="sg-why-card-desc">
                Our analysts craft professional Detailed Project Reports and
                business plans aligned with incubator evaluation criteria.
              </p>
            </article>

            <article className="sg-why-card">
              <div className="sg-why-card-icon" aria-hidden="true">
                <PieChart size={20} />
              </div>
              <h3 className="sg-why-card-title">Financial Projections</h3>
              <p className="sg-why-card-desc">
                We build credible, data-backed 3–5 year financial models that
                strengthen your application's credibility.
              </p>
            </article>

            <article className="sg-why-card">
              <div className="sg-why-card-icon" aria-hidden="true">
                <Users size={20} />
              </div>
              <h3 className="sg-why-card-title">Application Guidance</h3>
              <p className="sg-why-card-desc">
                End-to-end support through incubator selection, documentation
                review, and application submission.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 9 — FAQ
      ================================================================ */}
      <section className="sg-faq-section" aria-labelledby="sg-faq-heading">
        <div className="sg-container">
          <div className="sg-section-header">
            <span className="sg-section-eyebrow" aria-hidden="true">
              <HelpCircle size={12} />
              Frequently Asked Questions
            </span>
            <h2 id="sg-faq-heading" className="sg-section-title">
              Common Questions Answered
            </h2>
            <p className="sg-section-desc">
              Straight answers about the Startup India Seed Fund Scheme.
            </p>
          </div>

          <div className="sg-faq-wrapper" role="list">
            {FAQ_DATA.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className={`sg-faq-item${isOpen ? ' open' : ''}`}
                  role="listitem"
                >
                  <button
                    type="button"
                    className="sg-faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`sg-faq-answer-${i}`}
                    id={`sg-faq-btn-${i}`}
                    onClick={() => toggleFaq(i)}
                  >
                    <span className="sg-faq-question">{item.q}</span>
                    <ChevronDown size={18} className="sg-faq-chevron" aria-hidden="true" />
                  </button>

                  {isOpen && (
                    <div
                      id={`sg-faq-answer-${i}`}
                      className="sg-faq-answer"
                      role="region"
                      aria-labelledby={`sg-faq-btn-${i}`}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 10 — FINAL CTA
      ================================================================ */}
      <section className="sg-final-cta-section" aria-label="Call to action">
        <div className="sg-container">
          <div className="sg-final-cta-card">
            <div className="sg-cta-eyebrow" aria-hidden="true">
              <Star size={12} />
              Get Started Today
            </div>
            <h2 className="sg-cta-title">
              Ready to Explore Your Funding Opportunities?
            </h2>
            <p className="sg-cta-desc">
              Get professional assistance from Growthora Advisory and take the
              first step towards securing government-backed funding for your startup.
            </p>
            <div className="sg-cta-btns">
              <button
                type="button"
                className="sg-btn-cta-white"
                id="sg-final-cta-consultation-btn"
                onClick={() => setIsConsultationOpen(true)}
              >
                Book a Consultation
                <ArrowRight size={16} />
              </button>
              <a
                href="/services/finance-funding"
                className="sg-btn-cta-outline-white"
                id="sg-final-cta-schemes-btn"
              >
                Explore Other Schemes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <div className="sg-disclaimer" role="note">
        <p className="sg-disclaimer-text">
          <strong>Disclaimer:</strong> The information on this page is for general
          educational purposes only. Growthora Advisory Pvt. Ltd. is a private advisory firm and
          is not affiliated with, endorsed by, or representing any Government of India body or
          DPIIT. Funding amounts, eligibility criteria, and scheme terms are subject to change.
          Always refer to the official Startup India portal (startupindia.gov.in) for the most
          current information. Growthora does not guarantee funding approvals.
        </p>
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Modals ── */}
      {isConsultationOpen && (
        <ConsultationModal onClose={() => setIsConsultationOpen(false)} />
      )}
      {isAskOpen && (
        <AskGrowthoraModal onClose={() => setIsAskOpen(false)} />
      )}
    </div>
  );
}
