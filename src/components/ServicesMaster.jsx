import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { BlueprintCanvas } from './BusinessBlueprint/BlueprintCanvas';
import { BlueprintPanels } from './BusinessBlueprint/BlueprintPanels';
import { Layers } from 'lucide-react';

export const ServicesMaster = ({ activeId, setActiveId, onOpenConsultation }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeService = SERVICES_DATA.find((s) => s.id === activeId) || SERVICES_DATA[0];
  const activeIndex = SERVICES_DATA.findIndex((s) => s.id === activeId);

  const handleSelectCategory = (id) => {
    if (id === activeId) return;
    setIsTransitioning(true);
    setActiveId(id);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <section className="services-master-section blueprint-mode" id="services-master">
      {/* Redesigned Light Section Header */}
      <div className="blueprint-section-header">
        <div className="eyebrow-badge">
          <Layers size={14} />
          <span>OUR ADVISORY PRACTICE</span>
        </div>
        <h2 className="blueprint-section-title">
          Explore Our Advisory Practice
        </h2>
        <p className="blueprint-section-desc">
          Choose a practice area to see exactly what we cover, what you receive, and how we execute it.
        </p>
      </div>

      {/* Main 30/70 Blueprint Layout */}
      <div className="blueprint-layout-container">
        
        {/* Left Sidebar (30% Width): Vertical Service Selector */}
        <aside className="blueprint-sidebar-sticky">
          <div className="blueprint-sidebar-header">
            <span className="sidebar-label">Practice Selector</span>
            <div className="sidebar-progress-badge">
              <span className="current-num">0{activeIndex + 1}</span>
              <span className="sep">/</span>
              <span className="total-num">09</span>
            </div>
          </div>

          <div className="blueprint-nav-list" role="tablist" aria-label="Practice Categories">
            {SERVICES_DATA.map((service) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`blueprint-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectCategory(service.id)}
                >
                  <span className="nav-num">{service.num}</span>
                  <span className="nav-text">{service.navLabel}</span>
                  {isActive && <span className="active-orange-indicator" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Blueprint Area (70% Width): 3D Blueprint Canvas + Paper Panels */}
        <main className={`blueprint-main-content ${isTransitioning ? 'transitioning' : 'active'}`}>
          
          {/* Large 3D Business Blueprint Canvas */}
          <BlueprintCanvas categoryId={activeService.id} />

          {/* 4 Factual Service Content Paper Panels */}
          <BlueprintPanels 
            service={activeService} 
            onOpenConsultation={onOpenConsultation}
          />

        </main>
      </div>
    </section>
  );
};
