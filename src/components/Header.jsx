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
          <a href="#services-master" className="nav-link active" onClick={handleServicesClick}>
            Services
            <span className="active-dot" />
          </a>
          <span className="nav-link disabled" title="Services Page Only Redesign">
            Industries
          </span>
          <span className="nav-link disabled" title="Services Page Only Redesign">
            Govt Schemes
          </span>
          <span className="nav-link disabled" title="Services Page Only Redesign">
            Insights
          </span>
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
            className="mobile-nav-link active"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services (Active)
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
