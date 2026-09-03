import React from 'react';
import { Layers, Target, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const BlueprintPanels = ({ service, onOpenConsultation }) => {
  if (!service) return null;

  return (
    <div className="blueprint-paper-panels-grid">
      
      {/* Panel 1: Included Services */}
      <div className="blueprint-paper-card">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <Layers size={18} className="panel-icon orange" />
            <h3 className="panel-title">Included Services</h3>
          </div>
          <span className="panel-sheet-num">SHEET 01</span>
        </div>
        <div className="panel-content">
          <div className="included-pills-wrap">
            {service.included.map((inc, i) => (
              <div key={i} className="blueprint-pill">
                <span className="pill-orange-dot" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel 2: Ideal For */}
      <div className="blueprint-paper-card">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <Target size={18} className="panel-icon purple" />
            <h3 className="panel-title">Ideal For</h3>
          </div>
          <span className="panel-sheet-num">SHEET 02</span>
        </div>
        <div className="panel-content">
          <ul className="blueprint-list">
            {service.idealFor.map((item, idx) => (
              <li key={idx} className="blueprint-list-item">
                <CheckCircle2 size={16} className="item-icon purple" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Panel 3: What You Get */}
      <div className="blueprint-paper-card">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <Sparkles size={18} className="panel-icon orange" />
            <h3 className="panel-title">What You Get</h3>
          </div>
          <span className="panel-sheet-num">SHEET 03</span>
        </div>
        <div className="panel-content">
          <ul className="blueprint-list">
            {service.whatYouGet.map((item, idx) => (
              <li key={idx} className="blueprint-list-item">
                <CheckCircle2 size={16} className="item-icon orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Panel 4: Typical Timeline & CTA */}
      <div className="blueprint-paper-card timeline-card">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <Clock size={18} className="panel-icon orange" />
            <h3 className="panel-title">Execution Timeline & Advisory CTA</h3>
          </div>
          <span className="panel-sheet-num">SHEET 04</span>
        </div>
        <div className="panel-content timeline-panel-body">
          <div className="timeline-text-block">
            <span className="timeline-label">EXPECTED TIMELINE</span>
            <p className="timeline-desc">{service.timeline}</p>
          </div>

          <button
            type="button"
            className="btn-blueprint-cta"
            onClick={() => onOpenConsultation(service)}
          >
            <span>{service.cta}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
};
