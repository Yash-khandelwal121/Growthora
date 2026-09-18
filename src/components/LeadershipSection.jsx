import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Calendar, Code, Users } from 'lucide-react';
import '../styles/leadership.css';

const LEADERS = [
  {
    id: 'nikhil',
    name: 'Nikhil Sankhala',
    designation: 'Founder & CEO',
    image: '/Nikhil Sankhala.png',
    initials: 'NS',
    coreStrength: 'Growth Leadership',
    expertise: 'Business Strategy & Growth Leadership',
    focus: 'Corporate Vision, Strategic Partnerships & Business Expansion',
    bio: 'Nikhil leads Growthora with a strong focus on building scalable businesses, creating strategic partnerships, and helping entrepreneurs turn ambitious ideas into sustainable enterprises.',
    linkedin: 'https://www.linkedin.com/in/nikhil-sankhala-342a75122/'
  },
  {
    id: 'shashank',
    name: 'Shashank Singh',
    designation: 'Director — Strategy',
    image: '/Shashank Singh.png',
    initials: 'SS',
    coreStrength: 'Strategic Execution',
    expertise: 'Business Strategy & Operational Excellence',
    focus: 'Process Improvement, Market Expansion & Strategic Execution',
    bio: 'Shashank focuses on strengthening business structures, improving operations, and developing practical strategies that help MSMEs scale with greater clarity, efficiency, and long-term confidence.',
    linkedin: 'https://www.linkedin.com/in/shashank-chauhan-aabc/'
  },
  {
    id: 'kunal',
    name: 'Raval Kunal',
    designation: 'Director — Technology',
    image: '/Raval Kunal.png',
    initials: 'RK',
    coreStrength: 'Digital Innovation',
    expertise: 'Technology, Automation & Digital Systems',
    focus: 'Product Development, Process Automation & Digital Transformation',
    bio: 'Kunal leads Growthora’s technology initiatives, building digital infrastructure and automated systems that make compliance, advisory, documentation, and business operations faster, smarter, and more scalable.',
    linkedin: 'https://www.linkedin.com/in/kunalraval-tech-entrepreneur/'
  }
];

export default function LeadershipSection() {
  const [activeId, setActiveId] = useState(null);
  const containerRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeId) {
        setActiveId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeId]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCardClick = (id) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  const handleKeyDownCard = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(id);
    }
  };

  const renderDetails = (leader) => (
    <div className="drawer-content-scrollable">
      <div className="drawer-header-content">
        <h3>{leader.name}</h3>
        <p className="designation-text">{leader.designation}</p>
      </div>

      <div className="drawer-body-content">
        {leader.coreStrength && (
          <div className="drawer-data-row">
            <div className="drawer-icon-box">
              <Calendar size={16} color="#FF5A00" strokeWidth={2.5} />
            </div>
            <div className="drawer-data-text">
              <span className="value">{leader.coreStrength}</span>
              <span className="label">Core Strength</span>
            </div>
          </div>
        )}
        
        {leader.expertise && (
          <div className="drawer-data-row">
            <div className="drawer-icon-box">
              <Code size={16} color="#FF5A00" strokeWidth={2.5} />
            </div>
            <div className="drawer-data-text">
              <span className="value">{leader.expertise}</span>
              <span className="label">Expertise</span>
            </div>
          </div>
        )}
        
        {leader.focus && (
          <div className="drawer-data-row">
            <div className="drawer-icon-box">
              <Users size={16} color="#FF5A00" strokeWidth={2.5} />
            </div>
            <div className="drawer-data-text">
              <span className="value">{leader.focus}</span>
              <span className="label">Focus</span>
            </div>
          </div>
        )}
      </div>

      {leader.bio && (
        <div className="drawer-bio">
          {leader.bio}
        </div>
      )}

      <div className="drawer-actions">
        <a href={leader.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="btn-view-profile">
          View Profile &rarr;
        </a>
        {leader.linkedin && (
          <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="btn-linkedin-connect">
            <div className="linkedin-icon">in</div>
            <span>Connect on<br/>LinkedIn</span>
          </a>
        )}
      </div>
      
      {/* Fallback if all fields are empty */}
      {!leader.coreStrength && !leader.expertise && !leader.focus && !leader.bio && !leader.linkedin && (
        <div className="text-gray-500 italic text-sm mt-4">
          Detailed profile information will be available soon.
        </div>
      )}
    </div>
  );

  return (
    <section className="leadership-section" ref={containerRef}>
      <div className="leadership-header">
        <h2>Leadership</h2>
        <p>Meet the visionaries driving growth and excellence.</p>
      </div>

      <div className="leadership-container">
        <div className="leadership-cards-wrapper">
          {LEADERS.map((leader) => {
            const isActive = activeId === leader.id;
            
            return (
              <div 
                key={leader.id} 
                className={`leadership-card-slot ${isActive ? 'active' : ''}`}
              >
                {/* Main Card */}
                <div 
                  className={`leadership-card ${isActive ? 'active' : ''}`}
                  onClick={() => handleCardClick(leader.id)}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDownCard(e, leader.id)}
                  aria-expanded={isActive}
                  role="button"
                >
                  {isActive && (
                    <div className="active-badge">
                      <Sparkles size={12} style={{ marginRight: '4px' }} />
                      ACTIVE
                    </div>
                  )}
                  <div className="leadership-image-wrapper">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="leadership-initials">
                      {leader.initials}
                    </div>
                  </div>
                  <div className="leadership-info">
                    <h3>{leader.name}</h3>
                    <p>{leader.designation}</p>
                  </div>
                </div>

                {/* Mobile Detail Accordion */}
                <div className={`mobile-detail-accordion ${isActive ? 'open' : ''}`}>
                  <div className="pt-6 pb-6 relative">
                    <button 
                      className="close-mobile-btn"
                      onClick={() => setActiveId(null)}
                      aria-label="Close details"
                    >
                      <X size={20} />
                    </button>
                    {renderDetails(leader)}
                  </div>
                </div>

                {/* Desktop Detail Drawer */}
                <div className={`desktop-drawer-inner ${isActive ? 'open' : ''}`} aria-hidden={!isActive}>
                  <div className="drawer-pointer"></div>
                  <button 
                    className="close-btn" 
                    onClick={() => setActiveId(null)}
                    aria-label="Close profile"
                  >
                    <X size={20} />
                  </button>
                  {renderDetails(leader)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
