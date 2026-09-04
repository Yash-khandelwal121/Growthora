import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LineChart, Wallet, PieChart, Landmark, TrendingUp, ArrowRight, ArrowLeft, CheckCircle, ChevronDown, ChevronUp, FileText, Settings, ShieldCheck, Briefcase, Compass } from 'lucide-react';
import { FINANCE_FUNDING_DATA } from '../data/financeFundingData';

export default function FinanceFundingCategoryPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const grantsList = [
    { id: '01', slug: 'ivp-tn' },
    { id: '02', slug: 'global-ai-innovation-challenge' },
    { id: '03', slug: 'growth-grant' },
    { id: '04', slug: 'spark-grant' },
    { id: '05', slug: 'textile-industry' }
  ];

  const fundingCategories = [
    {
      title: "Debt Funding",
      desc: "Business Loans, Working Capital, Term Loans, Equipment / Business Expansion Finance, and Loan Documentation & Readiness.",
      slug: "debt",
      icon: Wallet
    },
    {
      title: "Equity Funding",
      desc: "Equity Fundraising Strategy, Investor Readiness, Funding Deck Preparation, Financial Story & Business Case.",
      slug: "equity",
      icon: PieChart
    },
    {
      title: "MSME Funding",
      desc: "MSME Funding Assessment, Government Scheme Identification, Credit Readiness, and Application Guidance.",
      slug: "msme",
      icon: Landmark
    },
    {
      title: "VC / Angel Funding",
      desc: "Investor Readiness, Pitch Deck Support, Business Model Positioning, Financial Projections, and Investor Outreach Strategy.",
      slug: "vc-angel",
      icon: TrendingUp
    }
  ];

  const faqs = [
    { q: "Which funding option is right for my business?", a: "It depends on your business stage, sector, and risk profile. We assess these factors to recommend the optimal mix of debt, equity, or grants." },
    { q: "Can Growthora help identify suitable government grants?", a: "Yes, we actively track and match businesses with state and central government grants like IVP, Seed Funds, and MSME schemes." },
    { q: "What documents are generally required for funding?", a: "Typically: Pitch deck, Financial Projections, Audited Financials, KYC, and a Detailed Project Report (DPR). The exact list varies." },
    { q: "Can startups approach investors through Growthora?", a: "Growthora provides strategic advisory to make you 100% investor-ready, helping you build the right collateral to approach investors confidently." },
    { q: "What is the difference between debt and equity funding?", a: "Debt is a loan that must be repaid with interest (you keep ownership). Equity involves selling a portion of your company to investors (no EMI, but dilutes ownership)." },
    { q: "Can MSMEs get help identifying funding schemes?", a: "Absolutely. We specialize in mapping MSME profiles to relevant subsidies, collateral-free loan schemes (like CGTMSE), and technology grants." },
    { q: "Does Growthora guarantee funding approval?", a: "Funding approval depends on the relevant lender, investor, grant programme or authority. Growthora provides advisory and execution support but cannot guarantee approval." }
  ];

  return (
    <div className="services-page-root">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="category-hero-section">
        <div className="hero-glow-bg" />
        <div className="hero-container">
          
          <div className="hero-content">
            <button className="back-btn-ghost" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Back to Ecosystem
            </button>
            <div className="eyebrow-badge" style={{ marginTop: '20px' }}>
              <LineChart className="eyebrow-icon" size={14} />
              <span>GROWTHORA ADVISORY</span>
            </div>

            <h1 className="hero-title">
              Finance & Funding
            </h1>
            
            <h2 style={{ color: '#FF7200', fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>
              Find the Right Capital for Your Business.
            </h2>

            <p className="hero-subtitle">
              From grants and government funding to debt, equity and investor readiness, Growthora helps founders identify suitable funding pathways and prepare for the next stage of growth.
            </p>

            <div className="hero-cta-group" style={{ marginTop: '30px' }}>
              <button className="btn-hero-primary">
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn-hero-secondary">
                <span>Explore Funding Options</span>
              </button>
            </div>
          </div>

          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion">
              {/* Premium conceptual placeholder for Hero */}
              <div className="placeholder-hero-graphic" style={{ boxShadow: '0 0 40px rgba(15,23,42,0.1) inset' }}>
                <LineChart size={80} color="#FF7200" opacity={0.8} />
                <div className="floating-doc-1"><Wallet size={24} /></div>
                <div className="floating-doc-2"><Landmark size={24} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FUNDING OPTIONS */}
      <section className="category-services-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Explore Your Funding Options</h2>
            <p className="section-subtitle">
              Choose the funding pathway that best fits your business stage, capital requirement and growth plans.
            </p>
          </div>

          {/* 01 GRANT FINDING */}
          <div className="grant-finding-section" style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>01 Grant Finding</h3>
            <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '30px' }}>
              Identify relevant government, institutional and sector-specific grant opportunities for your business.
            </p>
            
            <div className="services-grid-wrapper" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {grantsList.map((item) => {
                const grantData = FINANCE_FUNDING_DATA.grants[item.slug];
                return (
                  <div 
                    key={item.id} 
                    className="service-card-premium"
                    style={{ gridTemplateColumns: '1fr' }} /* Reverting to column for grants since there's 5 */
                    onClick={() => navigate(`/services/finance-funding/grants/${item.slug}`)}
                  >
                    <div className="card-content-left" style={{ padding: '24px' }}>
                      <div className="card-top-row">
                        <span className="card-number">{item.id}</span>
                        <div className="card-icon-wrap" style={{ height: '36px', width: '36px' }}>
                          <Landmark size={18} color="#FF7200" />
                        </div>
                      </div>
                      <h3 className="card-title" style={{ fontSize: '1.1rem' }}>{grantData.title}</h3>
                      <p className="card-desc" style={{ fontSize: '0.85rem' }}>{grantData.description.substring(0, 80)}...</p>
                      
                      <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', color: '#334155' }}>
                        <strong>Eligibility:</strong> {grantData.overview.whoNeedsIt.substring(0, 60)}...
                      </div>

                      <button className="card-explore-btn">
                        Explore Grant <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '20px', fontStyle: 'italic' }}>
              *Note: Eligibility, grant amounts, and availability depend on current scheme guidelines.
            </p>
          </div>

          {/* OTHER FUNDING CATEGORIES */}
          <div className="info-grid-2" style={{ marginTop: '30px' }}>
            {fundingCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={idx} 
                  className="info-card-premium" 
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onClick={() => navigate(`/services/finance-funding/${cat.slug}`)}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                      0{idx + 2} {cat.title}
                    </h3>
                    <div className="card-icon-wrap">
                      <Icon size={24} color="#FF7200" />
                    </div>
                  </div>
                  <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    {cat.desc}
                  </p>
                  <button className="card-explore-btn">
                    Explore {cat.title} <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FUNDING JOURNEY */}
      <section className="process-section" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">From Funding Need to Funding Readiness</h2>
          </div>
          <div className="process-timeline">
            {[
              { num: '01', title: 'Understand Your Funding Need', desc: 'Determining exact capital requirements.' },
              { num: '02', title: 'Assess Business & Financial Readiness', desc: 'Evaluating current financial health.' },
              { num: '03', title: 'Identify Suitable Funding Pathways', desc: 'Selecting Debt, Equity, or Grants.' },
              { num: '04', title: 'Prepare Documentation', desc: 'Organizing KYC, financials, and legal docs.' },
              { num: '05', title: 'Build Funding / Investor Materials', desc: 'Creating Pitch Decks and DPRs.' },
              { num: '06', title: 'Application / Investor Engagement', desc: 'Submitting applications or pitching.' },
              { num: '07', title: 'Follow-up & Advisory Support', desc: 'Handling due diligence and queries.' },
            ].map((step, idx) => (
              <div className="process-step-item" key={idx} style={{ background: 'white' }}>
                <div className="ps-num">{step.num}</div>
                <div className="ps-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE HELP WITH */}
      <section className="foundation-section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Complete Funding Advisory Support</h2>
          </div>
          <div className="wg-grid">
            {[
              { title: "Funding Strategy", icon: Compass },
              { title: "Grant Identification", icon: Landmark },
              { title: "Financial Documentation", icon: FileText },
              { title: "Investor Readiness", icon: TrendingUp },
              { title: "Application Support", icon: Settings },
              { title: "Funding Pathway Advisory", icon: ShieldCheck }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="wg-card" key={idx} style={{ background: '#F8FAFC' }}>
                  <Icon size={24} color="#FF7200" />
                  <h4>{item.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 & 6. DOCUMENTS & WHO IS THIS FOR */}
      <section className="two-col-info-section">
        <div className="container">
          <div className="info-grid-2">
            <div className="info-card-premium" style={{ background: '#F8FAFC' }}>
              <h2 className="section-title">Who Is This For?</h2>
              <ul className="custom-check-list">
                <li><CheckCircle size={18} /> Early-stage founders</li>
                <li><CheckCircle size={18} /> Startups seeking capital</li>
                <li><CheckCircle size={18} /> MSMEs looking for funding</li>
                <li><CheckCircle size={18} /> Businesses seeking expansion finance</li>
                <li><CheckCircle size={18} /> Founders exploring government grants</li>
                <li><CheckCircle size={18} /> Businesses preparing for investors</li>
                <li><CheckCircle size={18} /> Companies planning their next growth stage</li>
              </ul>
            </div>
            
            <div className="info-card-premium dark-card">
              <h2 className="section-title text-white">Get Funding-Ready</h2>
              <p style={{ color: '#CBD5E1', marginBottom: '20px' }}>
                Documents vary depending on the funding route, lender, investor or grant programme. Possible examples:
              </p>
              <ul className="custom-check-list white-list">
                <li><FileText size={18} /> PAN / Business KYC</li>
                <li><FileText size={18} /> Business Registration Documents</li>
                <li><FileText size={18} /> GST / Tax Documents where applicable</li>
                <li><FileText size={18} /> Bank & Financial Statements</li>
                <li><FileText size={18} /> Business Plan & Projections</li>
                <li><FileText size={18} /> Pitch Deck for investor funding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7 & 8. TIMELINE & WHY GROWTHORA */}
      <section className="foundation-section" style={{ background: 'white' }}>
        <div className="container">
          <div className="info-grid-2">
            
            <div className="info-card-premium" style={{ background: '#FFF7ED', border: '1px solid #FFEDD5' }}>
              <h2 className="section-title" style={{ color: '#C2410C' }}>Expected Funding Timeline</h2>
              <p style={{ fontSize: '1.05rem', color: '#9A3412', lineHeight: '1.6' }}>
                Funding timelines vary significantly depending on the funding route, documentation readiness, lender/investor/grant programme and external processing requirements.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#C2410C', marginTop: '16px', fontWeight: '500' }}>
                *Note: Growthora cannot promise guaranteed funding timelines or guaranteed approval.
              </p>
            </div>

            <div>
              <h2 className="section-title">Why Founders Choose Growthora</h2>
              <div className="info-grid-2">
                {[
                  "Expert Funding Advisory",
                  "End-to-End Execution",
                  "Documentation Support",
                  "Funding Route Assessment",
                  "Investor Readiness",
                  "Transparent Communication"
                ].map((reason, idx) => (
                  <div className="wg-card" key={idx} style={{ padding: '20px' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{reason}</h4>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="faq-section" style={{ background: '#F8FAFC', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Finance & Funding FAQs</h2>
          </div>
          <div className="faq-accordion-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, idx) => (
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
      </section>

      {/* 10. FINAL CTA */}
      <section className="category-final-cta" style={{ background: '#0F172A', padding: '100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px' }}>Ready to Find the Right Funding Path?</h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Tell us where your business is today. We'll help you understand the funding routes that may fit your goals.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>Book a Free Consultation</button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>Talk to an Expert</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
