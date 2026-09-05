import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

export const Footer = ({ onSelectCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (srv) => {
    if (srv.id === '01') {
      navigate('/services/registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (srv.id === '02') {
      navigate('/services/finance-funding');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (srv.id === '03') {
      navigate('/services/certifications');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (srv.id === '04') {
      navigate('/services/branding');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (srv.id === '05') {
      navigate('/services/legal-ca');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (srv.id === '06') {
      navigate('/services/operations');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname === '/') {
      if (onSelectCategory) {
        onSelectCategory(srv.id);
      } else {
        const el = document.getElementById('services-master');
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
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

  return (
    <footer className="compact-footer">
      <div className="footer-container">
        
        {/* Brand Summary Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <img 
              src="/growthora_logo.jpg" 
              alt="Growthora Advisory Private Limited" 
              className="footer-brand-logo-img"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          <p className="footer-tagline">
            "The One Stop Growth Partner For Every Stage Of Business."
          </p>

          <div className="footer-offices">
            <div className="office-title">
              <MapPin size={14} />
              <span>Advisory Offices</span>
            </div>
            <div className="office-cities">
              <span>Ahmedabad</span>
              <span className="sep">•</span>
              <span>Jaipur</span>
              <span className="sep">•</span>
              <span>Bengaluru</span>
            </div>
          </div>
        </div>

        {/* Services Quick Nav Column */}
        <div className="footer-nav-col">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-services-list">
            {SERVICES_DATA.map((srv) => (
              <li key={srv.id}>
                <button
                  type="button"
                  className="footer-srv-link"
                  onClick={() => handleCategoryClick(srv)}
                >
                  {srv.navLabel}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-contact-col">
          <h3 className="footer-heading">Contact Us</h3>
          
          <div className="contact-item">
            <Phone size={16} className="contact-icon" />
            <a href="tel:+919005427979" className="contact-link">+91 90054 27979</a>
          </div>

          <div className="contact-item">
            <Mail size={16} className="contact-icon" />
            <a href="mailto:info@growthora.co.in" className="contact-link">info@growthora.co.in</a>
          </div>

          <div className="footer-legal-links">
            <a href="#privacy" className="legal-link" onClick={(e) => e.preventDefault()}>Privacy</a>
            <span className="sep">•</span>
            <a href="#terms" className="legal-link" onClick={(e) => e.preventDefault()}>Terms</a>
            <span className="sep">•</span>
            <a href="#refund" className="legal-link" onClick={(e) => e.preventDefault()}>Refund Policy</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom-bar">
        <div className="bottom-container">
          <p>© {new Date().getFullYear()} Growthora Advisory Private Limited. All rights reserved.</p>
          <p className="redesign-tag">Premium Advisory Redesign — Services Catalogue</p>
        </div>
      </div>
    </footer>
  );
};
