import React, { useState, useEffect } from 'react';
import { PartnerNode } from './PartnerNode';

export function EcosystemOrbit({ data }) {
  const { title, subtitle, color, bgImage, bgVideo, icon: Icon, partners, labelNum, labelText, topSubtitle, innerBadges } = data;
  const [radius, setRadius] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setRadius(150);
      } else if (window.innerWidth <= 1200) {
        setRadius(170);
      } else {
        setRadius(200); // desktop radius
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="eco-orbit-wrapper" data-color={color}>
      {/* Micro Label */}
      <div className="eco-micro-label-wrapper">
        <div className="eco-micro-label">
          <span className="eco-micro-num">{labelNum}</span>
          <span className="eco-micro-text">{labelText}</span>
        </div>
        {topSubtitle && <div className="eco-micro-subtitle">{topSubtitle}</div>}
      </div>

      {/* Rotating Layer containing ring and nodes */}
      <div className="eco-orbit-rotating-layer">
        <div className="eco-orbit-ring"></div>
        {partners.map((partner, index) => (
          <PartnerNode 
            key={index}
            partner={partner}
            index={index}
            total={partners.length}
            radius={radius}
          />
        ))}
      </div>

      {/* Static Center Circle */}
      <div className="eco-center-circle-wrapper">
        <div className="eco-center-inner-ring">
          {innerBadges && innerBadges.map((badge, idx) => {
            const angle = (360 / innerBadges.length) * idx - 45; // rotate starting point
            const radian = (angle - 90) * (Math.PI / 180); 
            // inner ring radius is approx 135px
            const innerRadius = 145; 
            const x = Math.cos(radian) * innerRadius;
            const y = Math.sin(radian) * innerRadius;
            
            return (
              <div 
                key={idx} 
                className="eco-inner-badge"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
              >
                {/* SVG Icon Placeholder based on category/index */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span>{badge}</span>
              </div>
            );
          })}
        </div>
        
        <div className="eco-center-circle">
          {bgVideo ? (
            <video 
              className="eco-center-bg eco-center-video"
              src={bgVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : bgImage ? (
            <div 
              className="eco-center-bg" 
              style={{ backgroundImage: `url(${bgImage})` }}
            />
          ) : null}
          <div className="eco-center-content">
            <div className="eco-center-icon">
              <Icon size={22} />
            </div>
            <h3 className="eco-center-title" dangerouslySetInnerHTML={{ __html: title }}></h3>
            <p className="eco-center-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }}></p>
          </div>
        </div>
      </div>
    </div>
  );
}
