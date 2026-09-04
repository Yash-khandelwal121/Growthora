import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  Award, CheckCircle, ArrowRight, ArrowLeft, ChevronDown, ChevronUp,
  FileText, ShieldCheck, Briefcase, Zap, Building2, Globe, Star, Cpu, UtensilsCrossed, BadgeCheck, Settings, Users, Clock
} from 'lucide-react';

export default function CertificationCategoryPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const certificationServices = [
    {
      id: '01', slug: 'startup-india', title: 'Startup India Certificate',
      icon: Zap,
      desc: 'Get DPIIT recognition for your startup and unlock tax exemptions, self-certification benefits, fast-track IP, and exclusive government schemes.'
    },
    {
      id: '02', slug: 'section-80-iac', title: 'Section 80-IAC',
      icon: Star,
      desc: '100% income tax deduction on profits for 3 years for eligible DPIIT-recognized startups — a significant tax advantage during critical growth years.'
    },
    {
      id: '03', slug: 'seed-funding', title: 'SEED Funding',
      icon: Briefcase,
      desc: 'Access the Startup India Seed Fund Scheme (SISFS) for early-stage proof of concept, prototype, and commercialization support through empanelled incubators.'
    },
    {
      id: '04', slug: 'shram-suvidha', title: 'Shram Suvidha',
      icon: Users,
      desc: 'Register and comply on the Government\'s unified labour compliance portal — simplifying multi-law compliance for your workforce into one platform.'
    },
    {
      id: '05', slug: 'gem-registration', title: 'GeM Registration',
      icon: Globe,
      desc: 'Register as a seller on Government e-Marketplace and supply goods and services directly to central and state government departments and PSUs.'
    },
    {
      id: '06', slug: 'iso', title: 'ISO Certificate',
      icon: BadgeCheck,
      desc: 'Obtain internationally recognized ISO certification for Quality (9001), Environmental (14001), Food Safety (22000), or other applicable standards.'
    },
    {
      id: '07', slug: 'duns', title: 'DUNS Number',
      icon: Building2,
      desc: 'Register your global business identity with a Dun & Bradstreet DUNS Number — required for international contracts, US government procurement, and global credibility.'
    },
    {
      id: '08', slug: 'zed', title: 'ZED Certification',
      icon: Cpu,
      desc: 'Achieve Zero Defect Zero Effect certification for your manufacturing MSME — unlocking quality recognition, government subsidies, and export opportunities.'
    },
    {
      id: '09', slug: 'fssai', title: 'FSSAI',
      icon: UtensilsCrossed,
      desc: 'Obtain your mandatory FSSAI registration or licence to legally operate any food manufacturing, processing, distribution, or food service business.'
    }
  ];

  const whyCertsMatter = [
    { num: '01', title: 'Build Business Credibility', desc: 'Certifications signal to clients, partners, and institutions that your business meets recognized standards — building trust before any conversation begins.' },
    { num: '02', title: 'Meet Applicable Standards', desc: 'Regulatory compliance and sector-specific certifications protect your business, avoid penalties, and meet the requirements of your industry or supply chain.' },
    { num: '03', title: 'Improve Market Opportunities', desc: 'Many government tenders, institutional buyers, export markets, and major clients require specific certifications as a baseline qualification to participate.' },
    { num: '04', title: 'Strengthen Business Readiness', desc: 'Certified businesses are more investor-ready, procurement-ready, and expansion-ready — positioning you for the next stage of growth with credibility in place.' },
  ];

  const certJourney = [
    { num: '01', title: 'Understand Your Requirement', desc: 'Identifying the right certification or registration based on your business type, sector, and objectives.' },
    { num: '02', title: 'Eligibility & Requirement Assessment', desc: 'Checking that your business meets the qualification criteria for the target certification or registration.' },
    { num: '03', title: 'Document Collection', desc: 'Systematically gathering all required identity, business, and process-specific documentation.' },
    { num: '04', title: 'Document Verification', desc: 'Reviewing documents for accuracy, completeness, and compliance with the authority\'s requirements.' },
    { num: '05', title: 'Application Preparation', desc: 'Preparing the complete application with correct information, descriptions, and supporting evidence.' },
    { num: '06', title: 'Filing / Submission', desc: 'Submitting the application to the relevant portal, authority, or certification body.' },
    { num: '07', title: 'Review / Assessment', desc: 'The relevant authority or certification body reviews the application and may conduct inspections or assessments.' },
    { num: '08', title: 'Certificate / Registration', desc: 'Upon successful review, the certificate or registration is issued in your business\'s name.' },
  ];

  const supportAreas = [
    { title: 'Requirement Assessment', icon: Settings, desc: 'We identify the right certifications for your business type, sector, and stage.' },
    { title: 'Documentation Support', icon: FileText, desc: 'Systematic collection, organization, and verification of all required documents.' },
    { title: 'Application Preparation', icon: Briefcase, desc: 'Precise, complete application preparation to reduce delays and rejections.' },
    { title: 'Filing Assistance', icon: CheckCircle, desc: 'Accurate submission to the relevant portal or authority on your behalf.' },
    { title: 'Compliance Guidance', icon: ShieldCheck, desc: 'Post-certification compliance advisory to maintain your registered status.' },
    { title: 'Post-Certification Support', icon: Award, desc: 'Renewal reminders, ongoing compliance advisory, and scale-up guidance.' },
  ];

  const audience = [
    'Startups seeking DPIIT recognition and tax benefits',
    'MSMEs looking for government procurement access (GeM, ZED)',
    'Manufacturers seeking quality and process certifications (ISO, ZED)',
    'Food businesses requiring mandatory FSSAI registration or licence',
    'Service businesses seeking institutional credibility (DUNS, ISO)',
    'Export-oriented businesses needing international recognition',
    'Businesses seeking government tenders and scheme benefits',
    'Businesses preparing for investor due diligence and audits'
  ];

  const whyGrowthora = [
    { title: 'Expert Advisory', icon: Award, desc: 'Specialists who understand the exact requirements for each certification authority and scheme.' },
    { title: 'End-to-End Execution', icon: CheckCircle, desc: 'From eligibility check to certificate in hand — we manage the full process.' },
    { title: 'Documentation Support', icon: FileText, desc: 'Complete document review, organization, and gap-filling before every submission.' },
    { title: 'Compliance-Focused Approach', icon: ShieldCheck, desc: 'We ensure accuracy and compliance, reducing the risk of rejections or delays.' },
    { title: 'Transparent Communication', icon: Globe, desc: 'Clear updates at every stage — no surprises about status, timelines, or requirements.' },
    { title: 'Dedicated Advisory Team', icon: Users, desc: 'A dedicated point of contact who understands your business and its certification journey.' },
  ];

  const faqs = [
    {
      q: 'Which certification does my business need?',
      a: 'The right certification depends on your business type, sector, target markets, and stage. Startups typically benefit from DPIIT recognition; food businesses need FSSAI; manufacturers can benefit from ISO and ZED; businesses selling to government should consider GeM registration.'
    },
    {
      q: 'Can Growthora help identify the right certification?',
      a: 'Yes. Growthora\'s first step is always a requirement assessment — we evaluate your business profile and recommend the most relevant certifications based on your goals and applicable requirements.'
    },
    {
      q: 'What documents are generally required?',
      a: 'Documents vary by certification. Common requirements include PAN, Aadhaar, business registration certificates, address proof, and sector-specific documents. Growthora provides a tailored document checklist for each certification.'
    },
    {
      q: 'How long does certification usually take?',
      a: 'Timelines vary depending on the certification, documentation readiness, assessment requirements, and the processing authority. Growthora provides indicative timelines for each certification during the initial advisory session.'
    },
    {
      q: 'Can startups apply for these certifications?',
      a: 'Yes. Startup India Certificate, Section 80-IAC, SEED Funding, GeM Registration, DUNS Number, and ISO are all accessible to eligible startups. FSSAI applies if the startup operates in the food sector.'
    },
    {
      q: 'Can MSMEs get certification support?',
      a: 'Absolutely. MSMEs are a key beneficiary of GeM Registration, ZED Certification, ISO, FSSAI, Shram Suvidha, and DUNS. Growthora has specific advisory tracks for MSME certification journeys.'
    },
    {
      q: 'Does Growthora guarantee certification approval?',
      a: 'No. Certification approval depends entirely on the relevant authority, eligibility criteria, and applicable requirements at the time of assessment. Growthora provides advisory and execution support to prepare the strongest possible application, but cannot guarantee approval.'
    }
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
              <Award className="eyebrow-icon" size={14} />
              <span>GROWTHORA ADVISORY</span>
            </div>

            <h1 className="hero-title">Certifications</h1>

            <h2 style={{ color: '#FF7200', fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>
              Build Trust. Meet Standards. Grow with Confidence.
            </h2>

            <p className="hero-subtitle">
              Get the certifications, registrations and compliance support your business needs to build credibility, meet applicable requirements and unlock new opportunities.
            </p>

            <div className="hero-cta-group" style={{ marginTop: '30px' }}>
              <button className="btn-hero-primary">
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn-hero-secondary">
                <span>Explore Certifications</span>
              </button>
            </div>
          </div>

          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion">
              <img
                src="/services/cert_hero.jpg"
                alt="Business Certifications and Compliance"
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CERTIFICATION SERVICES */}
      <section className="category-services-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Choose Your Certification</h2>
            <p className="section-subtitle">
              Explore certification and compliance options based on your business, industry and growth requirements.
            </p>
          </div>

          <div className="services-grid-wrapper">
            {certificationServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="service-card-premium"
                  onClick={() => navigate(`/services/certifications/${svc.slug}`)}
                >
                  <div className="card-content-left" style={{ padding: '32px' }}>
                    <div className="card-top-row">
                      <span className="card-number">{svc.id}</span>
                      <div className="card-icon-wrap">
                        <Icon size={20} color="#FF7200" />
                      </div>
                    </div>
                    <h3 className="card-title" style={{ fontSize: '1.4rem', marginBottom: '14px' }}>
                      {svc.title}
                    </h3>
                    <p className="card-desc" style={{ fontSize: '1rem', marginBottom: '24px' }}>
                      {svc.desc}
                    </p>
                    <button className="card-explore-btn">
                      Explore Service <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WHY CERTIFICATIONS MATTER */}
      <section className="process-section" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Business Certifications Matter</h2>
          </div>
          <div className="info-grid-2">
            {whyCertsMatter.map((item, idx) => (
              <div key={idx} className="info-card-premium" style={{ background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span className="ps-num" style={{ width: '44px', height: '44px', fontSize: '0.9rem', flexShrink: 0 }}>{item.num}</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>{item.title}</h3>
                </div>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CERTIFICATION JOURNEY */}
      <section className="process-section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">From Assessment to Certification</h2>
          </div>
          <div className="process-timeline">
            {certJourney.map((step, idx) => (
              <div className="process-step-item" key={idx} style={{ background: '#F8FAFC' }}>
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

      {/* 5. WHAT WE HELP WITH */}
      <section className="foundation-section" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Complete Certification Support</h2>
          </div>
          <div className="wg-grid">
            {supportAreas.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="wg-card" key={idx} style={{ background: 'white' }}>
                  <Icon size={24} color="#FF7200" />
                  <h4>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', margin: 0 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. WHO IS THIS FOR + 7. DOCUMENTATION */}
      <section className="two-col-info-section">
        <div className="container">
          <div className="info-grid-2">
            <div className="info-card-premium" style={{ background: '#F8FAFC' }}>
              <h2 className="section-title">Who Is This For?</h2>
              <ul className="custom-check-list">
                {audience.map((item, idx) => (
                  <li key={idx}><CheckCircle size={18} /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="info-card-premium dark-card">
              <h2 className="section-title text-white">Documentation Support</h2>
              <p style={{ color: '#CBD5E1', marginBottom: '16px', fontSize: '0.95rem' }}>
                Required documents vary depending on the certification, authority, business structure and applicant profile. Examples include:
              </p>
              <ul className="custom-check-list white-list">
                <li><FileText size={18} /> PAN</li>
                <li><FileText size={18} /> Aadhaar / Identity Proof</li>
                <li><FileText size={18} /> Business Registration Documents</li>
                <li><FileText size={18} /> Address Proof</li>
                <li><FileText size={18} /> Business / Factory Address Documents where applicable</li>
                <li><FileText size={18} /> Financial Documents where applicable</li>
                <li><FileText size={18} /> Product / Food-related documents where applicable</li>
                <li><FileText size={18} /> Quality / Process documents where applicable</li>
                <li><FileText size={18} /> KYC documents</li>
                <li><FileText size={18} /> Existing certificates / licences where applicable</li>
              </ul>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '16px', fontStyle: 'italic' }}>
                *Not every document is mandatory for every certification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EXPECTED TIMELINE */}
      <section className="foundation-section" style={{ background: 'white' }}>
        <div className="container">
          <div className="info-grid-2">
            <div className="info-card-premium" style={{ background: '#FFF7ED', border: '1px solid #FFEDD5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Clock size={24} color="#C2410C" />
                <h2 className="section-title" style={{ color: '#C2410C', margin: 0 }}>Expected Timeline</h2>
              </div>
              <p style={{ fontSize: '1.05rem', color: '#9A3412', lineHeight: '1.6' }}>
                Timelines vary depending on the certification, documentation readiness, assessment requirements and the processing authority.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#C2410C', marginTop: '16px', fontWeight: '500' }}>
                *Growthora cannot promise guaranteed approval or guaranteed processing time.
              </p>
            </div>

            {/* 9. WHY GROWTHORA — inline */}
            <div>
              <h2 className="section-title">Why Businesses Choose Growthora</h2>
              <div className="info-grid-2" style={{ gap: '16px' }}>
                {whyGrowthora.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div className="wg-card" key={idx} style={{ padding: '20px', background: '#F8FAFC' }}>
                      <Icon size={20} color="#FF7200" />
                      <h4 style={{ margin: '8px 0 4px', fontSize: '0.95rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="faq-section" style={{ background: '#F8FAFC', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Certification FAQs</h2>
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
                  <div className="sd-faq-a">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="category-final-cta" style={{ background: '#0F172A', padding: '100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px' }}>
            Ready to Strengthen Your Business?
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Tell us what your business needs. Growthora will help you identify the relevant certification and guide you through the process.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
              Book a Free Consultation
            </button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
