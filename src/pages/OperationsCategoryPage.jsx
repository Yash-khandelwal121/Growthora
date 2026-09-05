import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  ShieldCheck, FileText, Settings, Briefcase, Zap, Compass, Users, MapPin, 
  Building, ArrowRight, ArrowLeft, CheckCircle, ChevronDown, ChevronUp,
  BarChart3, UserCheck, Layers, Headphones, Target, Sliders
} from 'lucide-react';
import { OPERATIONS_DATA, OPERATIONS_CATEGORY_DATA } from '../data/operationsData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function OperationsCategoryPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  const servicesList = [
    { 
      id: '01', 
      slug: 'hr-support', 
      title: 'HR Support',
      icon: Users,
      desc: 'Help businesses build structured HR processes, employee management systems, documentation, onboarding and day-to-day HR support.'
    },
    { 
      id: '02', 
      slug: 'crm-solutions', 
      title: 'CRM Solutions',
      icon: Sliders,
      desc: 'Set up and optimize CRM systems, customer pipelines, lead tracking, follow-ups and sales workflows.'
    },
    { 
      id: '03', 
      slug: 'business-strategy', 
      title: 'Business Strategy',
      icon: Target,
      desc: 'Build practical business strategies, operational processes, KPIs and execution frameworks for sustainable growth.'
    },
    { 
      id: '04', 
      slug: 'sales-support', 
      title: 'Sales Support',
      icon: BarChart3,
      desc: 'Improve sales processes, lead management, sales tracking, conversion workflows and revenue operations.'
    },
    { 
      id: '05', 
      slug: 'customer-support', 
      title: 'Customer Support',
      icon: Headphones,
      desc: 'Create structured customer support systems, communication workflows, ticket handling and customer experience processes.'
    }
  ];

  return (
    <div className="services-page-root">
      <Header 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />
      
      {/* 1. OPERATIONS PAGE HERO */}
      <section className="category-hero-section">
        <div className="hero-glow-bg" />
        <div className="hero-container">
          
          <div className="hero-content">
            <button className="back-btn-ghost" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Home / Services / Operations
            </button>
            <div className="eyebrow-badge" style={{ marginTop: '20px' }}>
              <Zap className="eyebrow-icon" size={14} />
              <span>GROWTHORA ADVISORY</span>
            </div>

            <h1 className="hero-title">
              Operations
            </h1>
            
            <h2 style={{ color: '#FF7200', fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>
              HR, CRM, and sales systems set up so your team runs without constant firefighting.
            </h2>

            <p className="hero-subtitle">
              We set up the operational systems — HR, CRM, and sales infrastructure — that a growing business needs to operate with structure, predictability, and scale.
            </p>

            <div className="hero-cta-group" style={{ marginTop: '30px' }}>
              <button className="btn-hero-primary" onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button 
                className="btn-hero-secondary" 
                onClick={() => {
                  const el = document.getElementById('operations-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Operations</span>
              </button>
            </div>
          </div>

          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion">
              <img 
                src="/services/ops_hero.jpg" 
                alt="Business Operations Advisory" 
                style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONS SERVICES */}
      <section className="category-services-section" id="operations-services">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Operations Services</h2>
            <p className="section-subtitle">
              Select the operational setup your business needs to scale efficiently and eliminate daily firefighting.
            </p>
          </div>

          <div className="services-grid-wrapper">
            {servicesList.map((item) => {
              const serviceData = OPERATIONS_DATA[item.slug];
              return (
                <div 
                  key={item.id} 
                  className="service-card-premium"
                  onClick={() => navigate(`/services/operations/${item.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-content-left">
                    <div className="card-top-row">
                      <span className="card-number">{item.id}</span>
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.desc}</p>
                    <button 
                      type="button" 
                      className="card-explore-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/services/operations/${item.slug}`);
                      }}
                    >
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="card-image-right" style={{ backgroundImage: `url(${serviceData.cardImage})` }}>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WHY OPERATIONS MATTERS */}
      <section className="foundation-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Build Predictable Operations</h2>
          </div>
          <div className="foundation-grid">
            <div className="foundation-card">
              <span className="f-num">01</span>
              <h4>Structured HR & Personnel</h4>
              <p>Establish clear roles, employment agreements, and onboarding frameworks for high performance.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">02</span>
              <h4>Centralized CRM Pipeline</h4>
              <p>Eliminate lead leakage with automated customer tracking, follow-ups, and sales stages.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">03</span>
              <h4>Data-Driven Strategy & KPIs</h4>
              <p>Align team goals with practical SOPs, execution models, and executive KPI dashboards.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">04</span>
              <h4>Scalable Support & Revenue Ops</h4>
              <p>Deliver consistent customer support and repeatable sales processes as your revenue grows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW GROWTHORA HELPS */}
      <section className="process-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">End-to-End Operational Execution</h2>
          </div>
          <div className="process-timeline">
            {[
              { num: '01', title: 'Operational Audit', desc: 'Detailed assessment of current workflows and friction points.' },
              { num: '02', title: 'Architecture Design', desc: 'Designing customized HR policies, CRM stages, and sales playbooks.' },
              { num: '03', title: 'Tool Selection & Integration', desc: 'Configuring HRMS, CRM, and ticketing platforms for your workflow.' },
              { num: '04', title: 'SOP Documentation', desc: 'Drafting step-by-step procedures and templates for your team.' },
              { num: '05', title: 'Data Migration & Pipeline Setup', desc: 'Cleaning and migrating existing contacts and lead databases.' },
              { num: '06', title: 'Team Training', desc: 'Conducting practical onboarding and enablement sessions.' },
              { num: '07', title: 'System Go-Live', desc: 'Deploying operational frameworks into daily business routines.' },
              { num: '08', title: 'Governance & KPI Review', desc: 'Monitoring execution and refining operational metrics monthly.' },
            ].map((step, idx) => (
              <div className="process-step-item" key={idx}>
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

      {/* 5 & 6. WHO IS IT FOR & DELIVERABLES */}
      <section className="two-col-info-section">
        <div className="container">
          <div className="info-grid-2">
            <div className="info-card-premium">
              <h2 className="section-title">Who Is Operations Support For?</h2>
              <ul className="custom-check-list">
                <li><CheckCircle size={18} /> Growing startups scaling headcount</li>
                <li><CheckCircle size={18} /> Established SMEs building formal HR & CRM systems</li>
                <li><CheckCircle size={18} /> Sales teams needing structured lead pipelines</li>
                <li><CheckCircle size={18} /> Founders overburdened by daily firefighting</li>
                <li><CheckCircle size={18} /> Companies restructuring internal operating SOPs</li>
                <li><CheckCircle size={18} /> Support teams setting up automated ticketing</li>
                <li><CheckCircle size={18} /> Executive leadership requiring real-time KPI metrics</li>
              </ul>
            </div>
            
            <div className="info-card-premium dark-card">
              <h2 className="section-title text-white">Core Operational Deliverables</h2>
              <p style={{ color: '#CBD5E1', marginBottom: '20px' }}>
                Key assets and frameworks delivered during operational setup:
              </p>
              <ul className="custom-check-list white-list">
                <li><FileText size={18} /> HR Policy Manual & Employee Handbooks</li>
                <li><FileText size={18} /> Configured CRM Pipelines & Automated Lead Triggers</li>
                <li><FileText size={18} /> Strategic SOPs & KPI Performance Dashboards</li>
                <li><FileText size={18} /> Sales Playbooks, Pitch Scripts & Proposal Templates</li>
                <li><FileText size={18} /> Helpdesk SLA Matrix & Support Response Libraries</li>
                <li><FileText size={18} /> Executive Operating Reports & Monthly Governance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY GROWTHORA */}
      <section className="why-growthora-cards">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Founders Choose Growthora</h2>
          </div>
          <div className="wg-grid">
            {[
              "Practical Systems Architecture",
              "End-to-End Implementation",
              "SOP & Playbook Creation",
              "Data-Driven KPI Governance",
              "Hands-On Team Training",
              "One Dedicated Advisory Team"
            ].map((reason, idx) => (
              <div className="wg-card" key={idx}>
                <ShieldCheck size={24} color="#FF7200" />
                <h4>{reason}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="faq-section" style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Operations FAQs</h2>
          </div>
          <div className="faq-accordion-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {OPERATIONS_CATEGORY_DATA.faqs.map((faq, idx) => (
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

      {/* 9. FINAL CTA */}
      <section className="category-final-cta" style={{ background: '#0F172A', padding: '100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px' }}>Ready to Systematize Your Operations?</h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Set up structured HR, CRM, sales, and support systems so your company operates with efficiency and scale.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Book a Free Consultation</button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Talk to an Operations Expert</button>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: 'Business & HR Operations', category: 'OPERATIONS' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
