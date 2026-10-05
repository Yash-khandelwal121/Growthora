import React from 'react';
import './blog-page.css';

export function BlogHeader() {
  const navItems = [
    'Latest',
    'Funding',
    'Government Schemes',
    'Compliance',
    'Certifications',
    'Startup Guides'
  ];

  return (
    <div className="blog-insights-header">
      <div className="blog-insights-header-container">
        <div className="blog-header-left">
          <span className="blog-header-brand">GROWTHORA BLOG</span>
          <span className="blog-header-subtitle">Business Updates & Resources</span>
        </div>
        <div className="blog-header-right">
          <nav className="blog-header-nav" aria-label="Blog Navigation">
            {navItems.map((item, index) => (
              <a key={index} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="blog-header-link">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
