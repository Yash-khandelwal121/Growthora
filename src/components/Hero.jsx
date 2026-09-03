import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, ShieldCheck, Zap, Users, Award, TrendingUp, Compass } from 'lucide-react';

export const Hero = ({ onOpenConsultation, onSelectCategory }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Clickable transparent hotspots aligned over the printed labels in growthora_hero_ecosystem.jpg
  const ecosystemNodes = [
    { label: "Registration",   ariaLabel: "Registration services",   id: "01",
      style: { top: "3%",  left: "48%",  width: "27%", height: "10%" } },
    { label: "Finance",        ariaLabel: "Finance services",         id: "02",
      style: { top: "14%", left: "74%",  width: "24%", height: "9%"  } },
    { label: "Certifications", ariaLabel: "Certifications services",  id: "03",
      style: { top: "32%", left: "77%",  width: "25%", height: "9%"  } },
    { label: "Branding",       ariaLabel: "Branding services",        id: "04",
      style: { top: "59%", left: "75%",  width: "23%", height: "9%"  } },
    { label: "Legal & CA",     ariaLabel: "Legal and CA services",    id: "05",
      style: { top: "74%", left: "40%",  width: "24%", height: "9%"  } },
    { label: "Operations",     ariaLabel: "Operations services",      id: "06",
      style: { top: "70%", left: "56%",  width: "23%", height: "9%"  } },
    { label: "MSME Benefits",  ariaLabel: "MSME Benefits services",   id: "07",
      style: { top: "56%", left: "0%",   width: "30%", height: "9%"  } },
    { label: "IPO",            ariaLabel: "IPO services",             id: "08",
      style: { top: "31%", left: "0%",   width: "20%", height: "9%"  } },
    { label: "Valuation",      ariaLabel: "Valuation services",       id: "09",
      style: { top: "8%",  left: "11%",  width: "26%", height: "9%"  } },
  ];

  const handleHotspotClick = (nodeId) => {
    if (onSelectCategory) {
      onSelectCategory(nodeId);
    }
    const element = document.getElementById('services-master');
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };


  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="hero-section" id="services-top">
      <div className="hero-glow-bg" />
      <div className="hero-container">
        
        {/* Left Column Text Content */}
        <div className="hero-content">
          <div className="eyebrow-badge">
            <Zap className="eyebrow-icon" size={14} />
            <span>OUR SERVICES</span>
          </div>

          <h1 className="hero-title">
            The Complete Practice for an <span className="highlight-text">Indian Founder.</span>
          </h1>

          <p className="hero-subtitle">
            Funding, registrations, compliance, branding, growth, legal — handled by one team so nothing falls through the gap between vendors.
          </p>

          {/* Hero CTAs with Interactive Dropdown */}
          <div className="hero-cta-group">
            <button 
              type="button" 
              className="btn-hero-primary"
              onClick={onOpenConsultation}
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={18} />
            </button>

            {/* Interactive Explore Services Dropdown */}
            <div className="hero-dropdown-wrapper" ref={dropdownRef}>
              <button
                type="button"
                className={`btn-hero-secondary ${isDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                <span>Explore Services</span>
                {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isDropdownOpen && (
                <div className="explore-services-dropdown-menu animate-fade-in">
                  <div className="dropdown-header">
                    <span>SELECT PRACTICE AREA</span>
                    <span className="dropdown-count">09 SERVICES</span>
                  </div>
                  
                  <div className="dropdown-services-list">
                    {ecosystemNodes.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="dropdown-service-item"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          onSelectCategory(item.id);
                        }}
                      >
                        <span className="dropdown-item-num">{item.id}</span>
                        <span className="dropdown-item-label">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Trust badges */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <ShieldCheck size={16} className="trust-icon" />
              <span>Multi-disciplinary Advisory Team</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} className="trust-icon" />
              <span>End-to-End Execution</span>
            </div>
          </div>
        </div>

        {/* Right Column — Pristine 3D Growthora Ecosystem Image with Invisible Interactive Hotspots */}
        <div className="hero-visual-container">
          <div className="hero-3d-ecosystem-wrapper float-3d-motion">
            <img 
              src="/growthora_hero_ecosystem.jpg" 
              alt="Growthora business services ecosystem showing Registration, Finance, Certifications, Branding, Operations, Legal and CA, MSME Benefits, IPO and Valuation services." 
              className="hero-3d-ecosystem-img"
              loading="eager"
            />

            {/* Invisible transparent hotspots over all 9 printed labels */}
            {ecosystemNodes.map((node) => (
              <button
                key={node.id}
                type="button"
                className="hero-stage-hotspot-pill"
                style={node.style}
                onClick={() => handleHotspotClick(node.id)}
                title={`Click to view ${node.label}`}
                aria-label={`Jump to ${node.label}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Hero Bottom Metrics & Quote Banner */}
      <div className="hero-bottom-banner">
        <div className="hero-metrics-grid">
          <div className="metric-box">
            <div className="metric-icon-wrap orange">
              <Users size={16} />
            </div>
            <div className="metric-data">
              <span className="metric-val">2,173+</span>
              <span className="metric-lbl">Businesses Served</span>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap purple">
              <Award size={16} />
            </div>
            <div className="metric-data">
              <span className="metric-val">₹19 Cr+</span>
              <span className="metric-lbl">Funding Facilitated</span>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap green">
              <TrendingUp size={16} />
            </div>
            <div className="metric-data">
              <span className="metric-val">97%</span>
              <span className="metric-lbl">Funding Success</span>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap orange">
              <Award size={16} />
            </div>
            <div className="metric-data">
              <span className="metric-val">12+</span>
              <span className="metric-lbl">Industries Covered</span>
            </div>
          </div>
        </div>

        {/* Right Quote Card */}
        <div className="hero-quote-card">
          <div className="quote-icon-badge">
            <Compass size={18} />
          </div>
          <div className="quote-text-wrap">
            <h4 className="quote-title">One Partner. Every Mile.</h4>
            <p className="quote-sub">From incorporation to IPO — we build your growth journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
