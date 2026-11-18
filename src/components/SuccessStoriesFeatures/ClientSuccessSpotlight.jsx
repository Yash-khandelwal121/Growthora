import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Quote,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { ALL_REAL_CLIENTS } from './allClientsData';

export default function ClientSuccessSpotlight({ onOpenVideo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsTrackRef = useRef(null);

  // We load ALL verified real clients from allClientsData.js
  const clients = ALL_REAL_CLIENTS;
  const currentClient = clients[currentIndex] || clients[0];

  // Scroll active thumbnail into view when currentIndex changes
  useEffect(() => {
    if (!thumbnailsTrackRef.current) return;
    const activeEl = thumbnailsTrackRef.current.children[currentIndex];
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? clients.length - 1 : prev - 1));
  }, [clients.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === clients.length - 1 ? 0 : prev + 1));
  }, [clients.length]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const scrollThumbnails = (direction) => {
    if (!thumbnailsTrackRef.current) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    thumbnailsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleVideoTrigger = () => {
    if (!currentClient.hasVideo || !onOpenVideo) return;
    onOpenVideo({
      name: currentClient.name,
      clientName: currentClient.name,
      role: `${currentClient.role}, ${currentClient.company}`,
      subtext: `${currentClient.role}, ${currentClient.company}`,
      videoUrl: currentClient.videoUrl,
      videoSrc: currentClient.videoUrl
    });
  };

  return (
    <section className="ss-feature-section ss-spotlight-section" aria-labelledby="spotlight-heading">
      <div className="ss-feature-container">
        {/* Section Header */}
        <div className="ss-feature-header center">
          <span className="ss-feature-badge">
            <Sparkles size={14} className="ss-badge-icon" />
            <span>Deep-Dive Verification</span>
          </span>
          <h2 id="spotlight-heading" className="ss-feature-title">
            Client Success <em>Spotlight</em>
          </h2>
          <p className="ss-feature-desc">
            Explore authentic case breakdowns from real founders across India. Review their operational bottlenecks, Growthora&apos;s tailored intervention, and verified outcomes.
          </p>
        </div>

        {/* Premium Horizontal Client Selector with Left & Right Arrows */}
        <div className="ss-spotlight-selector-wrapper">
          <button
            type="button"
            className="ss-spotlight-scroll-arrow left"
            onClick={() => scrollThumbnails('left')}
            aria-label="Scroll clients left"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={thumbnailsTrackRef}
            className="ss-spotlight-thumbnails-track"
            role="tablist"
            aria-label="Select a client to spotlight"
          >
            {clients.map((client, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={client.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`ss-spotlight-thumb-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <div className="ss-thumb-avatar-wrap">
                    <img
                      src={client.avatar || client.photo}
                      alt={client.name}
                      className="ss-thumb-avatar-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/stories/raj_shekhar_clean.jpg';
                      }}
                    />
                    {client.hasVideo && (
                      <span className="ss-thumb-video-dot" title="Video testimonial available">
                        <Play size={8} fill="#FFFFFF" stroke="#FFFFFF" />
                      </span>
                    )}
                  </div>
                  <div className="ss-thumb-meta">
                    <span className="ss-thumb-name">{client.name}</span>
                    <span className="ss-thumb-company">{client.company}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="ss-spotlight-scroll-arrow right"
            onClick={() => scrollThumbnails('right')}
            aria-label="Scroll clients right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Main Spotlight Showcase (Two-Column Layout) */}
        <div className="ss-spotlight-card-stage">
          <div className="ss-spotlight-card-grid">
            
            {/* LEFT COLUMN: Client Media / Photograph / Video Trigger */}
            <div className="ss-spotlight-media-col">
              <div
                className={`ss-spotlight-media-frame ${currentClient.hasVideo ? 'has-video-trigger' : ''}`}
                onClick={currentClient.hasVideo ? handleVideoTrigger : undefined}
                role={currentClient.hasVideo ? 'button' : undefined}
                tabIndex={currentClient.hasVideo ? 0 : undefined}
                onKeyDown={(e) => {
                  if (currentClient.hasVideo && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleVideoTrigger();
                  }
                }}
                aria-label={currentClient.hasVideo ? `Play ${currentClient.name}'s testimonial video` : `${currentClient.name}'s photograph`}
              >
                <img
                  src={currentClient.photo}
                  alt={currentClient.name}
                  className="ss-spotlight-main-img"
                  onError={(e) => {
                    e.target.src = '/images/stories/raj_shekhar_clean.jpg';
                  }}
                />

                {/* Video Play Overlay */}
                {currentClient.hasVideo && (
                  <div className="ss-spotlight-play-overlay">
                    <div className="ss-spotlight-play-knob" title="Click to watch testimonial video">
                      <Play size={24} fill="#FFFFFF" stroke="#FFFFFF" className="ss-play-icon" />
                    </div>
                    <span className="ss-spotlight-play-label">Watch Full Video Testimonial</span>
                  </div>
                )}

                {/* Badges on image */}
                <div className="ss-spotlight-frame-badges">
                  {currentClient.duration && (
                    <span className="ss-spotlight-duration-pill">
                      <Clock size={12} />
                      <span>{currentClient.duration}</span>
                    </span>
                  )}
                  {currentClient.city && (
                    <span className="ss-spotlight-city-pill">
                      <MapPin size={12} />
                      <span>{currentClient.city}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button Under Image */}
              {currentClient.hasVideo ? (
                <button
                  type="button"
                  className="ss-spotlight-watch-btn"
                  onClick={handleVideoTrigger}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Watch {currentClient.name}&apos;s Video</span>
                </button>
              ) : (
                <div className="ss-spotlight-verified-badge">
                  <CheckCircle2 size={16} className="ss-check-icon" />
                  <span>Documented &amp; Verified Case Record</span>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Client Details, Quote & 3 Pillar Cards */}
            <div className="ss-spotlight-info-col">
              {/* Header Meta */}
              <div className="ss-spotlight-header-meta">
                <div className="ss-spotlight-title-group">
                  <h3 className="ss-spotlight-client-name">{currentClient.name}</h3>
                  <p className="ss-spotlight-client-role">
                    {currentClient.role} &bull; <strong>{currentClient.company}</strong>
                  </p>
                </div>
                <div className="ss-spotlight-tags-group">
                  <span className="ss-spotlight-ind-tag">{currentClient.industry}</span>
                  <span className="ss-spotlight-badge-tag">{currentClient.badge}</span>
                </div>
              </div>

              {/* Authentic Client Quote */}
              <div className="ss-spotlight-quote-box">
                <Quote size={28} className="ss-spotlight-quote-icon" />
                <p className="ss-spotlight-quote-text">&ldquo;{currentClient.quote}&rdquo;</p>
              </div>

              {/* 3 Compact Verification Cards */}
              <div className="ss-spotlight-pillars-grid">
                {/* 1. The Challenge */}
                <div className="ss-spotlight-pillar-card challenge">
                  <div className="ss-pillar-top">
                    <div className="ss-pillar-icon challenge">
                      <AlertCircle size={15} />
                    </div>
                    <span className="ss-pillar-title">The Challenge</span>
                  </div>
                  <p className="ss-pillar-text">{currentClient.challenge}</p>
                </div>

                {/* 2. Growthora's Support */}
                <div className="ss-spotlight-pillar-card support">
                  <div className="ss-pillar-top">
                    <div className="ss-pillar-icon support">
                      <ShieldCheck size={15} />
                    </div>
                    <span className="ss-pillar-title">Growthora&apos;s Support</span>
                  </div>
                  <p className="ss-pillar-text">{currentClient.support}</p>
                </div>

                {/* 3. Measurable Outcome */}
                <div className="ss-spotlight-pillar-card outcome">
                  <div className="ss-pillar-top">
                    <div className="ss-pillar-icon outcome">
                      <TrendingUp size={15} />
                    </div>
                    <span className="ss-pillar-title">Measurable Outcome</span>
                  </div>
                  <p className="ss-pillar-text outcome-highlight">{currentClient.outcome}</p>
                </div>
              </div>

              {/* Bottom Pagination & Next/Prev Controls */}
              <div className="ss-spotlight-nav-footer">
                <div className="ss-spotlight-counter">
                  Showing <strong>{String(currentIndex + 1).padStart(2, '0')}</strong> of <strong>{String(clients.length).padStart(2, '0')}</strong> Verified Founders
                </div>

                <div className="ss-spotlight-arrows-group">
                  <button
                    type="button"
                    className="ss-spotlight-nav-arrow"
                    onClick={handlePrev}
                    aria-label="Previous client"
                  >
                    <ChevronLeft size={18} />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    className="ss-spotlight-nav-arrow next"
                    onClick={handleNext}
                    aria-label="Next client"
                  >
                    <span>Next</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
