import React, { useState } from 'react';
import { ArrowRight, Sparkles, Menu, X } from 'lucide-react';

export const Header = ({ onOpenConsultation, onOpenAskGrowthora }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky-header">
      <div className="header-container">
        {/* Logo */}
        <a href="#services-top" className="brand-logo" aria-label="Growthora Advisory Home">
          <img 
            src="/growthora_logo.jpg" 
            alt="Growthora Advisory Private Limited" 
            className="header-brand-logo-img"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="#services-master" className="nav-link active">
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
            onClick={onOpenConsultation}
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
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
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
