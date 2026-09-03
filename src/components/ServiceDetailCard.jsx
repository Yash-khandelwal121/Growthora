import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Target, Layers, Sparkles } from 'lucide-react';
import { ServiceVisual } from './ServiceVisuals/ServiceVisual';

export const ServiceDetailCard = ({ service, onOpenConsultation }) => {
  return (
    <article className="service-detail-card" id={`service-${service.id}`}>
      {/* Header Badge */}
      <div className="card-top-bar">
        <div className="card-num-badge">
          <span className="card-num">{service.num}</span>
          <span className="card-category">{service.category}</span>
        </div>
        <span className="card-tag" style={{ backgroundColor: service.accentColor, color: service.glowColor }}>
          {service.badge}
        </span>
      </div>

      {/* Main Title & Description */}
      <h2 className="card-main-title">{service.title}</h2>
      <p className="card-description">{service.description}</p>

      {/* Visual Section */}
      <div className="card-visual-wrapper">
        <ServiceVisual categoryId={service.id} />
      </div>

      {/* Included Services Tags */}
      <div className="card-block included-block">
        <div className="block-header">
          <Layers size={18} className="block-icon" />
          <h3 className="block-title">Included Services</h3>
        </div>
        <div className="included-tags-grid">
          {service.included.map((item, idx) => (
            <div key={idx} className="included-pill">
              <span className="pill-dot" style={{ backgroundColor: service.glowColor }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid for Ideal For & What You Get */}
      <div className="card-two-col">
        {/* Ideal For */}
        <div className="card-block ideal-block">
          <div className="block-header">
            <Target size={18} className="block-icon" />
            <h3 className="block-title">Ideal For</h3>
          </div>
          <ul className="feature-list">
            {service.idealFor.map((item, idx) => (
              <li key={idx} className="feature-item">
                <CheckCircle2 size={16} className="item-icon-ideal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What You Get */}
        <div className="card-block get-block">
          <div className="block-header">
            <Sparkles size={18} className="block-icon" />
            <h3 className="block-title">What You Get</h3>
          </div>
          <ul className="feature-list">
            {service.whatYouGet.map((item, idx) => (
              <li key={idx} className="feature-item">
                <CheckCircle2 size={16} className="item-icon-get" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline Footer */}
      <div className="card-timeline-footer">
        <div className="timeline-info">
          <Clock size={18} className="timeline-icon" />
          <div className="timeline-text">
            <span className="timeline-label">Expected Timeline</span>
            <p className="timeline-desc">{service.timeline}</p>
          </div>
        </div>

        <button
          type="button"
          className="btn-card-cta"
          onClick={() => onOpenConsultation(service)}
        >
          <span>{service.cta}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
};
