import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ShieldCheck, FileText, Settings, Briefcase, Zap, Compass, Users, MapPin, Building, ArrowRight, ArrowLeft, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { DETAILED_SERVICES_DATA } from '../data/detailedServicesData';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function RegistrationCategoryPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  const servicesList = [
    { id: '01', slug: 'llp', icon: Users },
    { id: '02', slug: 'proprietorship', icon: Briefcase },
    { id: '03', slug: 'private-limited-company', icon: Building },
    { id: '04', slug: 'partnership', icon: Users },
    { id: '05', slug: 'trademark', icon: ShieldCheck },
    { id: '06', slug: 'gst-registration', icon: FileText },
    { id: '07', slug: 'msme-udyam', icon: Settings },
    { id: '08', slug: 'gem-registration', icon: Compass },
    { id: '09', slug: 'company-registration', icon: MapPin },
  ];

  const faqs = [
    { q: "Which business registration is right for me?", a: "It depends on your scale, capital, and risk appetite. Solo founders might prefer OPC or Proprietorship, while scalable startups should opt for a Private Limited Company." },
    { q: "What documents are generally required?", a: "Common documents include PAN, Aadhaar, address proofs, and bank statements. Exact requirements depend on the specific registration type." },
    { q: "Can Growthora help choose the business structure?", a: "Absolutely! Our experts will analyze your business model and advise you on the best structure." },
    { q: "How long does registration take?", a: "Timelines vary. Proprietorships (via MSME/GST) can take 3-7 days, while Company Incorporation takes 10-15 days depending on government approvals." },
    { q: "Can registration be completed online?", a: "Yes, most of the registration process is entirely online, facilitated through DSCs and government portals." },
    { q: "What happens after registration?", a: "You will need to open a corporate bank account and handle post-incorporation compliances, which Growthora can fully support." },
    { q: "Do different registrations have different compliance requirements?", a: "Yes. Private Limited Companies have the highest compliance, whereas Proprietorships have minimal regulatory burden." }
  ];

  return (
    <div className="services-page-root">
      <Header 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />
      
      {/* 1. REGISTRATION PAGE HERO */}
      <section className="category-hero-section">
        <div className="hero-glow-bg" />
        <div className="hero-container">
          
          <div className="hero-content">
            <button className="back-btn-ghost" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Back to Ecosystem
            </button>
            <div className="eyebrow-badge" style={{ marginTop: '20px' }}>
              <Zap className="eyebrow-icon" size={14} />
              <span>GROWTHORA ADVISORY</span>
            </div>

            <h1 className="hero-title">
              Business Registration & Setup
            </h1>
            
            <h2 style={{ color: '#FF7200', fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>
              Start Your Business the Right Way.
            </h2>

            <p className="hero-subtitle">
              From choosing the right business structure to completing registrations and documentation, Growthora helps founders build a compliant foundation for their business.
            </p>

            <div className="hero-cta-group" style={{ marginTop: '30px' }}>
              <button className="btn-hero-primary" onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button 
                className="btn-hero-secondary" 
                onClick={() => {
                  const el = document.getElementById('registration-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Registrations</span>
              </button>
            </div>
          </div>

          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion">
              <img 
                src="/services/reg_hero.png" 
                alt="Business Registration Setup" 
                style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. REGISTRATION SERVICES */}
      <section className="category-services-section" id="registration-services">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Choose Your Registration</h2>
            <p className="section-subtitle">
              Select the registration that matches your business and get complete guidance from documentation to filing.
            </p>
          </div>

          <div className="services-grid-wrapper">
            {servicesList.map((item) => {
              const serviceData = DETAILED_SERVICES_DATA[item.slug];
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className="service-card-premium"
                  onClick={() => navigate(`/services/registration/${item.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-content-left">
                    <div className="card-top-row">
                      <span className="card-number">{item.id}</span>
                    </div>
                    <h3 className="card-title">{serviceData.title}</h3>
                    <p className="card-desc">{serviceData.description.substring(0, 75)}...</p>
                    <button 
                      type="button" 
                      className="card-explore-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/services/registration/${item.slug}`);
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

      {/* 3. WHY REGISTRATION MATTERS */}
      <section className="foundation-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Build a Strong Business Foundation</h2>
          </div>
          <div className="foundation-grid">
            <div className="foundation-card">
              <span className="f-num">01</span>
              <h4>Choose the Right Structure</h4>
              <p>Selecting the optimal entity protects personal assets and aligns with your business goals.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">02</span>
              <h4>Complete Essential Registrations</h4>
              <p>Secure PAN, TAN, GST, and MSME registrations to operate fully within the law.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">03</span>
              <h4>Maintain Compliance</h4>
              <p>Prevent penalties and legal issues by starting on the right side of government regulations.</p>
            </div>
            <div className="foundation-card">
              <span className="f-num">04</span>
              <h4>Prepare for Future Growth</h4>
              <p>A formal structure makes it easier to open corporate accounts, get loans, and raise venture capital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW GROWTHORA HELPS */}
      <section className="process-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">End-to-End Registration Support</h2>
          </div>
          <div className="process-timeline">
            {[
              { num: '01', title: 'Consultation', desc: 'Expert assessment of your needs.' },
              { num: '02', title: 'Business Structure Selection', desc: 'Choosing the right legal entity.' },
              { num: '03', title: 'Document Collection', desc: 'Gathering necessary proofs.' },
              { num: '04', title: 'Document Verification', desc: 'Ensuring all details are correct.' },
              { num: '05', title: 'Application Preparation', desc: 'Drafting agreements and forms.' },
              { num: '06', title: 'Government Filing', desc: 'Submitting directly to authorities.' },
              { num: '07', title: 'Registration / Certificate', desc: 'Receiving your official documents.' },
              { num: '08', title: 'Post-registration Guidance', desc: 'Next steps for compliance.' },
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

      {/* 5 & 6. WHO IS IT FOR & DOCUMENTATION */}
      <section className="two-col-info-section">
        <div className="container">
          <div className="info-grid-2">
            <div className="info-card-premium">
              <h2 className="section-title">Who Is Registration Support For?</h2>
              <ul className="custom-check-list">
                <li><CheckCircle size={18} /> First-time founders</li>
                <li><CheckCircle size={18} /> Startups</li>
                <li><CheckCircle size={18} /> Small businesses</li>
                <li><CheckCircle size={18} /> Partnership businesses</li>
                <li><CheckCircle size={18} /> Individual entrepreneurs</li>
                <li><CheckCircle size={18} /> Growing companies</li>
                <li><CheckCircle size={18} /> Businesses entering government procurement</li>
              </ul>
            </div>
            
            <div className="info-card-premium dark-card">
              <h2 className="section-title text-white">Documentation Support</h2>
              <p style={{ color: '#CBD5E1', marginBottom: '20px' }}>
                Exact requirements vary by registration type and applicant structure. Common examples include:
              </p>
              <ul className="custom-check-list white-list">
                <li><FileText size={18} /> PAN Card</li>
                <li><FileText size={18} /> Aadhaar / Identity Proof</li>
                <li><FileText size={18} /> Address Proof & Photograph</li>
                <li><FileText size={18} /> Business Address Proof</li>
                <li><FileText size={18} /> Partnership / LLP documents where applicable</li>
                <li><FileText size={18} /> Digital Signature / KYC documents</li>
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
              "Expert Advisory",
              "End-to-End Execution",
              "Documentation Support",
              "Compliance-Focused Approach",
              "Transparent Communication",
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
            <h2 className="section-title">Registration FAQs</h2>
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

      {/* 9. FINAL CTA */}
      <section className="category-final-cta" style={{ background: '#0F172A', padding: '100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px' }}>Ready to Register Your Business?</h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Choose the right registration, complete your documentation, and build your business foundation with Growthora.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Book a Free Consultation</button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }} onClick={() => { navigate('/book-consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Talk to an Expert</button>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: 'Business Registration & Setup', category: 'REGISTRATION' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
