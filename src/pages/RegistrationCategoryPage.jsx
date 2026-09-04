import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FinalCTA } from '../components/FinalCTA';
import { ShieldCheck, FileText, Settings, Briefcase, Zap, Compass, Users, MapPin, Building, ArrowRight, ArrowLeft } from 'lucide-react';
import { DETAILED_SERVICES_DATA } from '../data/detailedServicesData';

export default function RegistrationCategoryPage() {
  const navigate = useNavigate();

  // Map the 9 services from the data object to an array for rendering cards
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

  return (
    <div className="services-page-root">
      <Header />
      
      {/* Registration Category Hero */}
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
              Business <span className="highlight-text">Registration</span> & Setup
            </h1>

            <p className="hero-subtitle">
              Build the right foundation for your business with guided registration, documentation and compliance support.
            </p>
          </div>

          <div className="category-hero-visual">
            <div className="blueprint-3d-wrapper float-3d-motion">
              {/* Premium generic image for the category hero */}
              <div className="placeholder-hero-graphic registration-graphic">
                <ShieldCheck size={80} color="#FF7200" opacity={0.8} />
                <div className="floating-doc-1"><FileText size={24} /></div>
                <div className="floating-doc-2"><Building size={24} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Services List Section */}
      <section className="category-services-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Choose the Right Business Structure</h2>
            <p className="section-subtitle">
              Different founders and businesses require different structures and registrations. Explore our 9 specialized services below.
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
                >
                  <div className="card-top-row">
                    <span className="card-number">{item.id}</span>
                    <div className="card-icon-wrap">
                      <Icon size={24} color="#FF7200" />
                    </div>
                  </div>
                  <h3 className="card-title">{serviceData.title}</h3>
                  <p className="card-desc">{serviceData.description.substring(0, 110)}...</p>
                  <button className="card-explore-btn">
                    Explore Service <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Registration Matters */}
      <section className="why-section">
        <div className="container">
          <div className="two-col-layout">
            <div className="why-content">
              <h2 className="section-title">Why Choose Growthora</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <ShieldCheck className="benefit-icon" />
                  <div>
                    <h4>Expert Advisory</h4>
                    <p>We don't just fill forms. We advise you on the best structure for your growth.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FileText className="benefit-icon" />
                  <div>
                    <h4>End-to-End Execution</h4>
                    <p>From name approval to PAN and bank account setup, we handle it all.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <Settings className="benefit-icon" />
                  <div>
                    <h4>Compliance-Focused Approach</h4>
                    <p>We ensure you start on the right side of the law to prevent future penalties.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-visual">
              <div className="info-box-premium">
                <h3>Not Sure Which Registration Is Right for You?</h3>
                <p>Talk to our advisory team and choose the right structure for your business.</p>
                <div className="btn-group-vertical">
                  <button className="btn-primary" style={{width: '100%'}}>Book a Free Consultation</button>
                  <button className="btn-secondary" style={{width: '100%'}}>Talk to an Expert</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
