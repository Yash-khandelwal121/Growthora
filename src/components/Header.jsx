import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles, Menu, X } from 'lucide-react';

export const Header = ({ onOpenConsultation, onOpenAskGrowthora }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('services-master');
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('services-master');
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleIndustriesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/industries') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/industries');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInsightsClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/insights') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/insights');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConsultationClick = (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    navigate('/book-consultation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky-header">
      <div className="header-container">
        {/* Logo */}
        <a href="/" className="brand-logo" onClick={handleLogoClick} aria-label="Growthora Advisory Home">
          <img 
            src="/growthora_logo.jpg" 
            alt="Growthora Advisory Private Limited" 
            className="header-brand-logo-img"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a 
            href="/#services-master" 
            className={`nav-link ${location.pathname !== '/industries' && location.pathname !== '/insights' ? 'active' : ''}`} 
            onClick={handleServicesClick}
          >
            Services
            {location.pathname !== '/industries' && location.pathname !== '/insights' && <span className="active-dot" />}
          </a>
          <a 
            href="/industries" 
            className={`nav-link ${location.pathname === '/industries' ? 'active' : ''}`}
            onClick={handleIndustriesClick}
          >
            Industries
            {location.pathname === '/industries' && <span className="active-dot" />}
          </a>
          <span className="nav-link disabled" title="Services Page Only Redesign">
            Govt Schemes
          </span>
          <a 
            href="/insights" 
            className={`nav-link ${location.pathname === '/insights' ? 'active' : ''}`}
            onClick={handleInsightsClick}
          >
            Insights
            {location.pathname === '/insights' && <span className="active-dot" />}
          </a>
          <span className="nav-link disabled" title="Services Page Only Redesign">
            About
          </span>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          <button 
            type="button" 
            className="btn-ask-growthora"
            onClick={onOpenAskGrowthora}
          >
            <Sparkles className="btn-icon" size={16} />
            <span>Ask Growthora</span>
          </button>
          
          <button 
            type="button" 
            className="btn-primary-header"
            onClick={handleConsultationClick}
          >
            <span>Book a Consultation</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile menu toggle */}
          <button 
            type="button" 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <a 
            href="#services-master" 
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleServicesClick(e);
            }}
          >
            Services
          </a>
          <a 
            href="/industries" 
            className={`mobile-nav-link ${location.pathname === '/industries' ? 'active' : ''}`} 
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleIndustriesClick(e);
            }}
          >
            Industries
          </a>
          <a 
            href="/insights" 
            className={`mobile-nav-link ${location.pathname === '/insights' ? 'active' : ''}`} 
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleInsightsClick(e);
            }}
          >
            Growthora Insights
          </a>
          <a href="#finder" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Which Service Do I Need?
          </a>
          <div className="mobile-drawer-actions">
            <button 
              type="button" 
              className="btn-ask-growthora w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAskGrowthora();
              }}
            >
              <Sparkles size={16} />
              <span>Ask Growthora</span>
            </button>
            <button 
              type="button" 
              className="btn-primary-header w-full"
              onClick={handleConsultationClick}
            >
              <span>Book a Consultation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
