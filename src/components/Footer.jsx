import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Send } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

const OFFICES = [
  { id: 'jaipur', name: 'Jaipur', address: 'Plot No. 350 Ramkripa Tower, 3rd Floor, Himmat Nagar, Bajaj Nagar, Tonk Road, Jaipur, Rajasthan', image: '/jaipur.png' },
  { id: 'ahmedabad', name: 'Ahmedabad', address: 'A-204, Empire Business Hub, Nr Shukan Mall, Science City Road, Sola, Ahmedabad, Gujarat', image: '/ahemdabad.png' },
  { id: 'pune', name: 'Pune', address: 'Office No. 902, Maruti Millennium Tower, Pune-Mumbai Highway, Baner, Pune, Maharashtra', image: '/pune.png' },
  { id: 'bengaluru', name: 'Bengaluru', address: 'MFAR Silver Line Tech Park, Hub.iTrosys, Plot No. 180, EPIP Zone, Whitefield, Bengaluru, Karnataka', image: '/benglore.png' },
];

const mapsLink = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const Footer = ({ onSelectCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const canvasRef = useRef(null);
  const [lineData, setLineData] = useState({ w: 0, h: 0, points: [] });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const measure = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const icons = Array.from(canvas.querySelectorAll('.map-pin-icon'));
      
      if (icons.length !== 4) return;
      
      const points = icons.map(icon => {
        const r = icon.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - canvasRect.left,
          y: r.top + r.height * (21 / 30) - canvasRect.top
        };
      });
      
      setLineData({
        w: canvasRect.width,
        h: canvasRect.height,
        points
      });
    };

    measure();
    
    window.addEventListener('resize', measure);
    document.fonts.ready.then(measure);
    
    const ro = new ResizeObserver(() => measure());
    ro.observe(canvas);
    
    const img = canvas.querySelector('.india-map-image');
    if (img) {
      if (img.complete) measure();
      img.addEventListener('load', measure);
    }
    
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
      if (img) img.removeEventListener('load', measure);
    };
  }, []);

  const buildPath = (points) => {
    if (!points || points.length !== 4) return '';
    const [p0, p1, p2, p3] = points;
    
    // Jaipur -> Ahmedabad
    let dx = p1.x - p0.x;
    let dy = p1.y - p0.y;
    let c1x = p0.x + dx * 0.9;
    let c1y = p0.y;
    let c2x = p1.x;
    let c2y = p1.y - dy * 0.5;
    const seg1 = `M ${p0.x} ${p0.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p1.x} ${p1.y}`;
    
    // Ahmedabad -> Pune
    dx = p2.x - p1.x;
    dy = p2.y - p1.y;
    c1x = p1.x + Math.abs(dx) * 0.5;
    c1y = p1.y + dy * 0.35;
    c2x = p2.x;
    c2y = p2.y - dy * 0.35;
    const seg2 = `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    
    // Pune -> Bengaluru
    dx = p3.x - p2.x;
    dy = p3.y - p2.y;
    c1x = p2.x - 5;
    c1y = p2.y + dy * 0.4;
    c2x = p3.x - dx * 0.5;
    c2y = p3.y;
    const seg3 = `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p3.x} ${p3.y}`;
    
    return `${seg1} ${seg2} ${seg3}`;
  };

  const handleCategoryClick = (id, path) => {
    if (location.pathname === '/') {
      if (onSelectCategory) {
        onSelectCategory(id);
      } else {
        const el = document.getElementById('services-master');
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItemClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="premium-footer">
      <div className="premium-footer-top">
        <div className="premium-footer-grid">
          
          {/* 1. Brand Section */}
          <div className="footer-brand-section">
            <img 
              src="/logofooter.png" 
              alt="Growthora" 
              className="footer-brand-logo"
              onClick={() => navItemClick('/')}
            />
            <h3 className="footer-tagline">“From Enterprises<br/>to a Stronger Tomorrow”</h3>
            <p className="footer-desc">
              Your trusted partner for business growth, government schemes, funding, compliance and end-to-end business support.
            </p>
          </div>

          {/* 2. Services Column */}
          <div className="footer-links-col">
            <h4>Our Services</h4>
            <ul className="footer-links-list">
              <li onClick={() => handleCategoryClick('01', '/services/registration')}>Registration <ArrowRight size={14}/></li>
              <li onClick={() => handleCategoryClick('02', '/services/finance-funding')}>Finance & Funding <ArrowRight size={14}/></li>
              <li onClick={() => handleCategoryClick('03', '/services/certifications')}>Certifications <ArrowRight size={14}/></li>
              <li onClick={() => handleCategoryClick('04', '/services/branding')}>Branding <ArrowRight size={14}/></li>
              <li onClick={() => handleCategoryClick('06', '/services/operations')}>Operations <ArrowRight size={14}/></li>
              <li onClick={() => handleCategoryClick('05', '/services/legal-ca')}>Legal & CA <ArrowRight size={14}/></li>
              <li onClick={() => handleCategoryClick('07', '/services/msme-benefits')}>MSME Benefits <ArrowRight size={14}/></li>
              <li onClick={() => handleCategoryClick('08', '/services/ipo')}>IPO & Valuation <ArrowRight size={14}/></li>
            </ul>
          </div>

          {/* 3. Popular Schemes Column */}
          <div className="footer-links-col">
            <h4>Popular Schemes</h4>
            <ul className="footer-links-list">
              <li>PMEGP</li>
              <li>Mudra Loan</li>
              <li>CGTMSE</li>
              <li>Startup India</li>
              <li>Stand-Up India</li>
              <li>CLCSS</li>
              <li>NIDHI Schemes</li>
              <li className="highlight-link">View All Schemes <ArrowRight size={14}/></li>
            </ul>
          </div>

          {/* 4. Company Column */}
          <div className="footer-links-col">
            <h4>Company</h4>
            <ul className="footer-links-list">
              <li onClick={() => navItemClick('/')}>About</li>
              <li onClick={() => navItemClick('/')}>Success Stories</li>
              <li onClick={() => navItemClick('/insights')}>Growthora Insights</li>
              <li onClick={() => navItemClick('/')}>Blogs</li>
              <li onClick={() => navItemClick('/')}>Careers</li>
              <li onClick={() => navItemClick('/')}>Contact</li>
              <li onClick={() => navItemClick('/')}>Case Studies</li>
              <li>Company Profile (PDF)</li>
            </ul>
          </div>

          {/* 5. Contact & Socials */}
          <div className="footer-contact-col">
            <h4>Get in Touch</h4>
            <div className="contact-card">
              <div className="contact-icon-wrapper"><Phone size={18}/></div>
              <div className="contact-info">
                <strong>+91 90054 27979</strong>
                <span>Direct Helpline</span>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon-wrapper"><Phone size={18}/></div>
              <div className="contact-info">
                <strong>1800 410 2598</strong>
                <span>Toll-Free Helpline</span>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon-wrapper"><Mail size={18}/></div>
              <div className="contact-info">
                <strong>info@growthora.co.in</strong>
              </div>
            </div>
            
            <h4 className="mt-6">Follow Us</h4>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/growthora-advisory-private-limited/home/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.instagram.com/growthora_advisory?stkn=MTVjejR6ODB0MGNrZw==" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/share/1TdvSogAKd/" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* 6. India Map Section */}
          <div className="footer-map-section">
            <div className="map-container">
              <div className="india-map-canvas" ref={canvasRef}>
                <img src="/images/india_map.png" alt="India Map" className="india-map-image" />
              {OFFICES.map(office => (
                <a key={office.id} className={`map-pin pin-${office.id}`} href={mapsLink(office.address)} target="_blank" rel="noopener noreferrer" aria-label={`${office.name} office on Google Maps`}>
                  <svg className="map-pin-icon" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z" fill="#ea580c"/>
                    <circle cx="12" cy="8" r="3.5" fill="#fff"/>
                  </svg>
                  <div className="map-pin-shadow"></div>
                  <span>{office.name}</span>
                </a>
              ))}
              
              {/* Elegant curved orange connection lines */}
              {lineData.points.length === 4 && (
                <svg className="map-connections" width={lineData.w} height={lineData.h} viewBox={`0 0 ${lineData.w} ${lineData.h}`}>
                  <path d={buildPath(lineData.points)} fill="none" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                </svg>
              )}
              </div>

              <div className="map-copy">
                <div className="pan-india-badge">
                <div className="badge-arrow">
                  {/* Custom refined curved arrow */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17C10.5 13.5 15.5 10 20 8" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M14 7.5L20.5 7.5L20.5 14" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>Pan India<br/>Support</span>
                </div>
                
                <h3 className="map-caption">Expanding<br/>Opportunities<br/>Across India</h3>
              </div>
            </div>
            
            {/* New Skyline Layer */}
            <div className="skyline-layer"></div>
          </div>
          
        </div>

        {/* 7. Newsletter & Offices Bar */}
        <div className="footer-middle-section">
          
          <div className="newsletter-card">
            <div className="newsletter-icon">
              <Send size={24} color="#fff" />
            </div>
            <div className="newsletter-content">
              <h3>Stay Updated With<br/>New Opportunities</h3>
              <p>Get the latest schemes, funding updates<br/>and business insights directly in your inbox.</p>
              
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email address" />
                <button type="button"><ArrowRight size={20}/></button>
              </div>
              
              <label className="newsletter-consent">
                <input type="checkbox" />
                <span>I agree to receive important updates from Growthora.</span>
              </label>
            </div>
          </div>

          <div className="offices-section">
            <div className="offices-header-row">
              <h4>Our Offices</h4>
            </div>
            <div className="offices-grid">
              {['ahmedabad', 'jaipur', 'bengaluru', 'pune'].map(id => {
                const office = OFFICES.find(o => o.id === id);
                return (
                  <a key={id} className="office-card" href={mapsLink(office.address)} target="_blank" rel="noopener noreferrer">
                    <div className="office-image">
                      <img src={office.image} alt={`${office.name} Office`} />
                    </div>
                    <div className="office-details">
                      <div className="office-header">
                        <h5>{office.name}</h5>
                        <ArrowUpRight size={16} className="ext-icon"/>
                      </div>
                      <p><MapPin size={14}/> {office.address}</p>
                    </div>
                  </a>
                );
              })}

            </div>
          </div>

        </div>

        {/* Hindi Tagline centered below office images */}
        <div className="hindi-bottom-tagline-wrapper">
          <h3 className="hindi-bottom-tagline">हम बढ़ाएँ आपका बिज़नेस</h3>
        </div>

      </div>

      {/* 8. Bottom Legal Bar */}
      <div className="premium-footer-bottom">
        <div className="legal-bar-container">
          <p>© {new Date().getFullYear()} Growthora Advisory Private Limited. All Rights Reserved.</p>
          
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
            <a href="#disclaimer">Disclaimer</a>
            <a href="#sitemap">Sitemap</a>
          </div>

          <p className="designed-for">Designed for a Stronger Tomorrow <span className="orange-dash"></span></p>
        </div>
      </div>
    </footer>
  );
};

