import React, { useState, useRef } from 'react';
import {
  Factory,
  Laptop,
  Wheat,
  HeartPulse,
  Rocket,
  Layers,
  MapPin,
  CheckCircle2,
  Play,
  Sparkles
} from 'lucide-react';
import { ALL_REAL_CLIENTS, CITY_HUBS } from './allClientsData';

export default function IndustrySuccessFilter({ onOpenVideo, activeCityFilter, onClearCityFilter }) {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const activeHub = CITY_HUBS.find(h => h.id === activeCityFilter);

  const filterTabs = [
    { id: 'all', label: 'All Industries', icon: Layers },
    { id: 'technology', label: 'Technology', icon: Laptop },
    { id: 'manufacturing', label: 'Manufacturing', icon: Factory },
    { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
    { id: 'agriculture', label: 'Agriculture', icon: Wheat },
    { id: 'startups', label: 'Startups', icon: Rocket }
  ];

  const filteredStories = ALL_REAL_CLIENTS.filter(story => {
    const matchesIndustry = selectedIndustry === 'all' || story.industryKey === selectedIndustry;
    const matchesCity = !activeCityFilter || story.hubId === activeCityFilter;
    return matchesIndustry && matchesCity;
  });

  const visibleStories = isExpanded ? filteredStories : filteredStories.slice(0, 6);
  const hasMoreStories = filteredStories.length > 6;

  const handleTabClick = (tabId) => {
    setSelectedIndustry(tabId);
    setIsExpanded(false);
  };

  const toggleExpand = () => {
    if (isExpanded) {
      setIsExpanded(false);
      // Smoothly scroll back to the section heading
      if (headingRef.current) {
        headingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setIsExpanded(true);
    }
  };

  const handleVideoTrigger = (client) => {
    if (!client.hasVideo || !onOpenVideo) return;
    onOpenVideo({
      name: client.name,
      clientName: client.name,
      role: `${client.role}, ${client.company}`,
      subtext: `${client.role}, ${client.company}`,
      videoUrl: client.videoUrl,
      videoSrc: client.videoUrl
    });
  };

  return (
    <section
      ref={sectionRef}
      className="ss-feature-section ss-filter-section"
      aria-labelledby="filter-heading"
    >
      <div className="ss-feature-container">
        {/* Section Header */}
        <div ref={headingRef} className="ss-feature-header center">
          <span className="ss-feature-badge">
            <Sparkles size={14} className="ss-badge-icon" />
            <span>Tailored By Sector</span>
          </span>
          <h2 id="filter-heading" className="ss-feature-title">
            Find a Success Story <em>Like Yours</em>
          </h2>
          <p className="ss-feature-desc">
            Filter authentic client case studies across manufacturing, healthcare, technology, agriculture, and high-growth startups to see results relevant to your industry.
          </p>

          {/* Industry Filter Tabs with Counts */}
          <div className="ss-filter-tabs-row" role="tablist" aria-label="Industry filter tabs">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedIndustry === tab.id;
              const count = tab.id === 'all' 
                ? ALL_REAL_CLIENTS.length 
                : ALL_REAL_CLIENTS.filter((c) => c.industryKey === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`ss-filter-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <Icon size={15} className="ss-filter-tab-icon" />
                  <span className="ss-filter-tab-label">{tab.label}</span>
                  <span className="ss-filter-tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Active City Filter Pill (if city selected) */}
          {activeCityFilter && activeHub && (
            <div className="ss-filter-city-active-banner">
              <span className="ss-filter-city-badge">
                <MapPin size={13} className="ss-filter-city-icon" />
                <span>City: <strong>{activeHub.fullName}</strong></span>
              </span>
              <button
                type="button"
                className="ss-filter-city-clear-btn"
                onClick={onClearCityFilter}
                title="Remove city filter to view all locations"
              >
                <span>Clear Location Filter</span>
                &times;
              </button>
            </div>
          )}
        </div>

        {/* Stories Grid: 3 Desktop (3x2 initial = 6 cards), 2 Tablet, 1 Mobile */}
        {filteredStories.length > 0 ? (
          <>
            <div className="ss-filter-cards-grid">
              {visibleStories.map((story) => (
                <div key={story.id} className="ss-filter-story-card">
                  {/* Card Media Container */}
                  <div
                    className={`ss-filter-card-media ${story.hasVideo ? 'has-video-click' : ''}`}
                    onClick={story.hasVideo ? () => handleVideoTrigger(story) : undefined}
                    role={story.hasVideo ? 'button' : undefined}
                    tabIndex={story.hasVideo ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (story.hasVideo && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleVideoTrigger(story);
                      }
                    }}
                    aria-label={story.hasVideo ? `Watch ${story.name}'s testimonial video` : `${story.name}'s photo`}
                  >
                    <img
                      src={story.photo}
                      alt={story.name}
                      className="ss-filter-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/stories/raj_shekhar_clean.jpg';
                      }}
                    />

                    {/* Play Button Overlay */}
                    {story.hasVideo && (
                      <div className="ss-filter-play-overlay">
                        <div className="ss-filter-play-circle">
                          <Play size={18} fill="#FFFFFF" stroke="#FFFFFF" />
                        </div>
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="ss-filter-card-top-tags">
                      <span className="ss-filter-ind-badge">{story.industry}</span>
                      {story.city && (
                        <span className="ss-filter-loc-badge">
                          <MapPin size={11} />
                          <span>{story.city}</span>
                        </span>
                      )}
                    </div>

                    {/* Duration Pill */}
                    {story.duration && (
                      <span className="ss-filter-duration-badge">
                        {story.duration}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="ss-filter-card-body">
                    <div className="ss-filter-founder-meta">
                      <h3 className="ss-filter-founder-name">{story.name}</h3>
                      <p className="ss-filter-founder-company">
                        {story.role} &bull; <strong>{story.company}</strong>
                      </p>
                    </div>

                    {/* Outcome Highlight Pill */}
                    <div className="ss-filter-outcome-row">
                      <CheckCircle2 size={14} className="ss-filter-check" />
                      <span>{story.badge}</span>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="ss-filter-quote-text">&ldquo;{story.quote}&rdquo;</p>

                    {/* Bottom Action */}
                    <div className="ss-filter-card-bottom">
                      {story.hasVideo ? (
                        <button
                          type="button"
                          className="ss-filter-action-btn video"
                          onClick={() => handleVideoTrigger(story)}
                        >
                          <Play size={14} fill="currentColor" />
                          <span>Watch Video</span>
                        </button>
                      ) : (
                        <span className="ss-filter-verified-tag">
                          <CheckCircle2 size={13} />
                          <span>Verified Case Record</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Centered Premium Toggle Button */}
            {hasMoreStories && (
              <div className="ss-filter-cta-wrapper">
                <button
                  type="button"
                  className="ss-filter-toggle-btn"
                  onClick={toggleExpand}
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Show Less ↑' : 'See All Success Stories →'}</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State Fallback */
          <div className="ss-filter-empty-state">
            <p>
              No verified client records found {activeHub ? `for ${activeHub.fullName}` : ''} in this sector yet.
            </p>
            {activeCityFilter && (
              <button
                type="button"
                className="ss-filter-empty-reset"
                onClick={onClearCityFilter}
              >
                View all cities in {filterTabs.find(t => t.id === selectedIndustry)?.label || 'this sector'}
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
