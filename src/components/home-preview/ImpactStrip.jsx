import React from 'react';
import { Users, BarChart3, Handshake, Sprout } from 'lucide-react';

export function ImpactStrip() {
  return (
    <div className="eco-impact-strip">
      <div className="eco-impact-item">
        <div className="eco-impact-icon orange">
          <Users size={24} />
        </div>
        <div className="eco-impact-text">
          <span className="eco-impact-val">500+</span>
          <span className="eco-impact-label">Ecosystem Partners</span>
        </div>
      </div>
      
      <div className="eco-impact-divider"></div>
      
      <div className="eco-impact-item">
        <div className="eco-impact-icon purple">
          <BarChart3 size={24} />
        </div>
        <div className="eco-impact-text">
          <span className="eco-impact-val">1000s</span>
          <span className="eco-impact-label">Founders Empowered</span>
        </div>
      </div>
      
      <div className="eco-impact-divider"></div>
      
      <div className="eco-impact-item">
        <div className="eco-impact-icon green">
          <Handshake size={24} />
        </div>
        <div className="eco-impact-text">
          <span className="eco-impact-val">Stronger</span>
          <span className="eco-impact-label">Together</span>
        </div>
      </div>
      
      <div className="eco-impact-divider"></div>
      
      <div className="eco-impact-item">
        <div className="eco-impact-icon orange">
          <Sprout size={24} />
        </div>
        <div className="eco-impact-text">
          <span className="eco-impact-label" style={{ marginTop: 0 }}>Building a brighter</span>
          <span className="eco-impact-label" style={{ color: '#c45a2c', fontWeight: 700 }}>Innovation-Led India</span>
        </div>
      </div>
    </div>
  );
}
