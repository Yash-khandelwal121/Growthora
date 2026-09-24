import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Send } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

export const Footer = ({ onSelectCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
              <a href="#" className="social-icon linkedin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="social-icon instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* 6. India Map Section */}
          <div className="footer-map-section">
            <div className="map-container">
              <img src="/images/india_map.png" alt="India Map" className="india-map-bg" />
              <div className="map-pin pin-jaipur">
                <svg className="map-pin-icon" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z" fill="#ea580c"/>
                  <circle cx="12" cy="8" r="3.5" fill="#fff"/>
                </svg>
                <div className="map-pin-shadow"></div>
                <span>Jaipur</span>
              </div>
              <div className="map-pin pin-ahmedabad">
                <svg className="map-pin-icon" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z" fill="#ea580c"/>
                  <circle cx="12" cy="8" r="3.5" fill="#fff"/>
                </svg>
                <div className="map-pin-shadow"></div>
                <span>Ahmedabad</span>
              </div>
              <div className="map-pin pin-pune">
                <svg className="map-pin-icon" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z" fill="#ea580c"/>
                  <circle cx="12" cy="8" r="3.5" fill="#fff"/>
                </svg>
                <div className="map-pin-shadow"></div>
                <span>Pune</span>
              </div>
              <div className="map-pin pin-bengaluru">
                <svg className="map-pin-icon" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z" fill="#ea580c"/>
                  <circle cx="12" cy="8" r="3.5" fill="#fff"/>
                </svg>
                <div className="map-pin-shadow"></div>
                <span>Bengaluru</span>
              </div>
              
              {/* Elegant curved orange connection lines */}
              <svg className="map-connections" viewBox="0 0 380 350" preserveAspectRatio="none">
                <path d="M 171 52 Q 50 80, 57 140 Q 57 200, 83 227 Q 110 270, 159 297" fill="none" stroke="#ea580c" strokeWidth="1.2" opacity="0.8"/>
              </svg>

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
            </div>
            
            {/* New Skyline Layer */}
            <div className="skyline-layer"></div>
            
            <h3 className="map-caption">Expanding<br/>Opportunities<br/>Across India</h3>
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
              
              <div className="office-card">
                <div className="office-image">
                  <img src="/ahemdabad.png" alt="Ahmedabad Office" />
                </div>
                <div className="office-details">
                  <div className="office-header">
                    <h5>Ahmedabad</h5>
                    <ArrowUpRight size={16} className="ext-icon"/>
                  </div>
                  <p><MapPin size={14}/> A-204, Empire Business Hub, Nr Shukan Mall, Science City Road, Sola, Ahmedabad, Gujarat</p>
                </div>
              </div>

              <div className="office-card">
                <div className="office-image">
                  <img src="/jaipur.png" alt="Jaipur Office" />
                </div>
                <div className="office-details">
                  <div className="office-header">
                    <h5>Jaipur</h5>
                    <ArrowUpRight size={16} className="ext-icon"/>
                  </div>
                  <p><MapPin size={14}/> Plot No. 350 Ramkripa Tower, 3rd Floor, Himmat Nagar, Bajaj Nagar, Tonk Road, Jaipur, Rajasthan</p>
                </div>
              </div>

              <div className="office-card">
                <div className="office-image">
                  <img src="/benglore.png" alt="Bengaluru Office" />
                </div>
                <div className="office-details">
                  <div className="office-header">
                    <h5>Bengaluru</h5>
                    <ArrowUpRight size={16} className="ext-icon"/>
                  </div>
                  <p><MapPin size={14}/> MFAR Silver Line Tech Park - Hub.iTrosys 3rd floor Plot No. 180, EPIP Zone, Whitefield, Bengaluru, Karnataka</p>
                </div>
              </div>

              <div className="office-card">
                <div className="office-image">
                  <img src="/pune.png" alt="Pune Office" />
                </div>
                <div className="office-details">
                  <div className="office-header">
                    <h5>Pune</h5>
                    <ArrowUpRight size={16} className="ext-icon"/>
                  </div>
                  <p><MapPin size={14}/> Office No. 902, Maruti Millennium Tower, Pune-Mumbai Highway, Baner, Pune, Maharashtra</p>
                </div>
              </div>

            </div>
          </div>

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

