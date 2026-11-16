import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Star,
  ExternalLink,
  Phone,
  PhoneCall,
  Headphones,
  Mail,
  ShieldCheck,
  Sparkles,
  Building2,
  TrendingUp,
  FileText,
  Award,
  Coins,
  Layers,
  Handshake,
  Factory,
  Wheat,
  Sprout,
  BarChart3,
  Laptop,
  HardHat,
  Package,
  Code2,
  Users,
  Trophy
} from 'lucide-react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import EligibilityWizardForm from '../components/EligibilityWizardForm';

import {
  OUTCOMES_TICKER,
  HERO_STORY_CARDS,
  SUCCESS_METRICS,
  CLIENT_VIDEOS,
  FEATURED_CASE_STUDIES,
  SUCCESS_RECORDS,
  GOOGLE_REVIEWS,
  GOOGLE_REVIEW_SLIDES,
  INDUSTRIES_EMPOWERED,
  SCHEMES_BEHIND_STORIES,
  PROCESS_STEPS,
  FAQS
} from '../data/successStoriesData';

import '../styles/index.css';
import '../styles/successStories.css';

// Google Multicolour G Icon
const GoogleGIcon = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Quotation Mark Icon
const QuoteIcon = ({ size = 32, color = 'currentColor', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
  </svg>
);

// Industry Icon Map for the curved card design
const INDUSTRY_ICON_MAP = {
  factory: Factory,
  laptop: Laptop,
  hardhat: HardHat,
  package: Package,
  sprout: Sprout,
  code: Code2
};

export default function SuccessStoriesPage() {
  const navigate = useNavigate();

  // Modal states
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [selectedVideoModal, setSelectedVideoModal] = useState(null);
  const [selectedCaseModal, setSelectedCaseModal] = useState(null);

  // Active Featured Video State
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const featuredVideoRef = useRef(null);
  const playlistScrollRef = useRef(null);

  // Active Case Study Tab
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  // Success Record Filter & Expansion
  const [recordFilter, setRecordFilter] = useState('all');
  const [isRecordsExpanded, setIsRecordsExpanded] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Client Satisfaction Journey Interactive State & Viewport Animation Ref
  const [activeMilestoneId, setActiveMilestoneId] = useState(null);
  const graphRef = useRef(null);
  const [isGraphVisible, setIsGraphVisible] = useState(false);

  useEffect(() => {
    const node = graphRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsGraphVisible(false);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setIsGraphVisible(true);
              });
            });
          } else {
            setIsGraphVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Achievement Statistics animated count-up (2,137+, ₹33+ Cr, 97%)
  const [statsCounts, setStatsCounts] = useState({ businesses: 2137, loan: 33, satisfaction: 97 });

  useEffect(() => {
    if (!isGraphVisible) return;
    let startTimestamp = null;
    const duration = 1800;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setStatsCounts({
        businesses: Math.floor(easeOut * 2137),
        loan: Math.floor(easeOut * 33),
        satisfaction: Math.floor(easeOut * 97)
      });
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setStatsCounts({ businesses: 2137, loan: 33, satisfaction: 97 });
      }
    };
    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [isGraphVisible]);

  // Google Reviews Carousel State
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const reviewTouchStartX = useRef(null);

  const handlePrevReview = () => {
    setCurrentReviewSlide((prev) => (prev > 0 ? prev - 1 : GOOGLE_REVIEW_SLIDES.length - 1));
  };

  const handleNextReview = () => {
    setCurrentReviewSlide((prev) => (prev < GOOGLE_REVIEW_SLIDES.length - 1 ? prev + 1 : 0));
  };

  const handleReviewTouchStart = (e) => {
    reviewTouchStartX.current = e.touches[0].clientX;
  };

  const handleReviewTouchEnd = (e) => {
    if (reviewTouchStartX.current === null) return;
    const diff = reviewTouchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNextReview();
      else handlePrevReview();
    }
    reviewTouchStartX.current = null;
  };

  // Hero Video Cards State & Refs (Hover to Play Client Video)
  const heroVideoRefs = useRef([]);
  const heroPlayPromises = useRef([]);
  const [activeHeroVideo, setActiveHeroVideo] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Cleanup hero videos on unmount
  useEffect(() => {
    return () => {
      heroVideoRefs.current.forEach((v) => {
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      });
    };
  }, []);

  const HERO_VIDEO_CARDS = [
    {
      id: 'raj-shekhar',
      cls: 'card-mfg',
      category: 'Growth & Scale',
      clientName: 'Raj Shekhar',
      subtext: 'Strategic Scaling',
      duration: '2:16',
      icon: TrendingUp,
      poster: '/images/hero/hero_card_1.jpg',
      videoSrc: '/videos/hero/testimonial_1.mp4',
      alt: 'Raj Shekhar - Founder & Entrepreneur Testimonial Video'
    },
    {
      id: 'yoshita-saxena',
      cls: 'card-food',
      category: 'Institutional Grants',
      clientName: 'Yoshita Saxena',
      subtext: 'Kastha Foundation',
      duration: '1:48',
      icon: Award,
      poster: '/images/hero/hero_card_2.jpg',
      videoSrc: '/videos/hero/testimonial_2.mp4',
      alt: 'Yoshita Saxena - Kastha Foundation Testimonial Video'
    },
    {
      id: 'pragnesh',
      cls: 'card-agri',
      category: 'Tech MSME & Subsidies',
      clientName: 'Pragnesh',
      subtext: 'Shikhodiya Technology',
      duration: '2:03',
      icon: Layers,
      poster: '/images/hero/hero_card_3.jpg',
      videoSrc: '/videos/hero/testimonial_3.mp4',
      alt: 'Pragnesh - Shikhodiya Technology Testimonial Video'
    }
  ];

  const handleOpenFullVideo = (card) => {
    // Pause any playing hero card video
    heroVideoRefs.current.forEach((v) => {
      if (v) {
        v.pause();
        try { v.currentTime = 0; } catch (e) {}
      }
    });
    setActiveHeroVideo(null);
    setSelectedVideoModal(card);
  };

  const handleHeroCardMouseEnter = (index) => {
    // Pause any other playing video
    heroVideoRefs.current.forEach((v, idx) => {
      if (v && idx !== index) {
        v.pause();
        try { v.currentTime = 0; } catch (e) {}
      }
    });

    const targetVideo = heroVideoRefs.current[index];
    if (targetVideo) {
      setActiveHeroVideo(index);
      try { targetVideo.currentTime = 0; } catch (e) {}
      const playPromise = targetVideo.play();
      heroPlayPromises.current[index] = playPromise;
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleHeroCardMouseLeave = (index) => {
    const targetVideo = heroVideoRefs.current[index];
    if (targetVideo) {
      const p = heroPlayPromises.current[index];
      if (p !== undefined && typeof p.then === 'function') {
        p.then(() => {
          targetVideo.pause();
          try { targetVideo.currentTime = 0; } catch (e) {}
        }).catch(() => {
          targetVideo.pause();
          try { targetVideo.currentTime = 0; } catch (e) {}
        });
      } else {
        targetVideo.pause();
        try { targetVideo.currentTime = 0; } catch (e) {}
      }
    }
    setActiveHeroVideo((prev) => (prev === index ? null : prev));
  };

  const handleHeroCardTouchToggle = (index, e) => {
    e.stopPropagation();
    const targetVideo = heroVideoRefs.current[index];
    if (!targetVideo) return;

    if (activeHeroVideo === index) {
      targetVideo.pause();
      try { targetVideo.currentTime = 0; } catch (err) {}
      setActiveHeroVideo(null);
    } else {
      heroVideoRefs.current.forEach((v, idx) => {
        if (v && idx !== index) {
          v.pause();
          try { v.currentTime = 0; } catch (err) {}
        }
      });
      setActiveHeroVideo(index);
      try { targetVideo.currentTime = 0; } catch (err) {}
      const p = targetVideo.play();
      heroPlayPromises.current[index] = p;
      if (p !== undefined) {
        p.catch(() => {});
      }
    }
  };

  // Set Page Title & SEO Meta
  useEffect(() => {
    document.title = 'Client Success Stories & Case Studies | Growthora Advisory';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Handle Video Player Events
  const handleVideoSelect = (index, autoPlay = true) => {
    setActiveVideoIndex(index);
    if (featuredVideoRef.current) {
      featuredVideoRef.current.pause();
      featuredVideoRef.current.currentTime = 0;
      if (autoPlay) {
        setTimeout(() => {
          featuredVideoRef.current?.play().then(() => {
            setIsVideoPlaying(true);
          }).catch(() => {
            setIsVideoPlaying(false);
          });
        }, 100);
      } else {
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleVideoPlay = () => {
    if (!featuredVideoRef.current) return;
    if (isVideoPlaying) {
      featuredVideoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      featuredVideoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        setIsVideoPlaying(false);
      });
    }
  };

  const scrollPlaylist = (direction) => {
    if (playlistScrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      playlistScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (id) => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('services-master');
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const activeVideo = CLIENT_VIDEOS[activeVideoIndex] || CLIENT_VIDEOS[0];
  const activeCase = FEATURED_CASE_STUDIES[activeCaseIndex] || FEATURED_CASE_STUDIES[0];

  const filteredRecords = recordFilter === 'all'
    ? SUCCESS_RECORDS
    : SUCCESS_RECORDS.filter(r => r.type === recordFilter);

  const displayedRecords = isRecordsExpanded
    ? filteredRecords
    : filteredRecords.slice(0, 6);

  return (
    <div className="ss-page-root">
      {/* 1. Global Navigation Header */}
      <Header
        onOpenAskGrowthora={() => setIsAskOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <main id="main-content">
        {/* 2. Hero Section — Exact Replica of Reference Image 1 */}
        <section className="ss-hero" aria-labelledby="hero-title">
          {/* Ambient Background Glows */}
          <div className="ss-hero-ambient-tl" aria-hidden="true" />
          <div className="ss-hero-ambient-br" aria-hidden="true" />

          {/* Faint Concentric Contour Waves in Bottom-Left */}
          <svg className="ss-hero-contour-waves" viewBox="0 0 620 340" fill="none" aria-hidden="true">
            <path d="M-60,180 C120,160 220,240 440,200 C520,185 580,210 660,200" stroke="rgba(112, 39, 141, 0.09)" strokeWidth="1.2" />
            <path d="M-60,215 C130,195 240,270 470,230 C550,215 610,240 690,230" stroke="rgba(112, 39, 141, 0.08)" strokeWidth="1.2" />
            <path d="M-60,250 C140,230 260,300 500,260 C580,245 640,270 720,260" stroke="rgba(112, 39, 141, 0.07)" strokeWidth="1.2" />
            <path d="M-60,285 C150,265 280,330 530,290 C610,275 670,300 750,290" stroke="rgba(112, 39, 141, 0.06)" strokeWidth="1.2" />
          </svg>

          <div className="ss-container ss-hero-container">
            <div className="ss-hero-grid">
              {/* Left Column: Heading, Subtitle, CTAs & Trust Indicator */}
              <div className="ss-hero-content">
                <div className="ss-hero-tag">
                  <span className="ss-hero-tag-text">SUCCESS STORIES</span>
                  <span className="ss-hero-tag-dash" />
                </div>

                <h1 id="hero-title" className="ss-hero-title">
                  <span className="ss-title-primary">Real Businesses.</span>
                  <span className="ss-title-accent">Real Growth.</span>
                </h1>

                <p className="ss-hero-desc">
                  From first consultation to final approval, explore how entrepreneurs across India have turned challenges into measurable success with Growthora Advisory.
                </p>

                <div className="ss-hero-actions">
                  <a href="#featured-cases" className="ss-hero-btn-primary">
                    <span>Explore Success Stories</span>
                    <ArrowRight size={17} />
                  </a>
                  <a href="#video-testimonials" className="ss-hero-btn-secondary">
                    <span className="ss-play-icon-wrap">
                      <Play size={12} fill="#70278D" color="#70278D" />
                    </span>
                    <span>Watch Client Experiences</span>
                  </a>
                </div>

                {/* Trust Indicator */}
                <div className="ss-hero-trust">
                  <div className="ss-trust-avatars" aria-hidden="true">
                    <img src="/images/hero/avatar1.jpg" alt="Client 1" className="ss-trust-avatar" />
                    <img src="/images/hero/avatar2.jpg" alt="Client 2" className="ss-trust-avatar" />
                    <img src="/images/hero/avatar3.jpg" alt="Client 3" className="ss-trust-avatar" />
                  </div>
                  <div className="ss-trust-divider" aria-hidden="true" />
                  <div className="ss-trust-details">
                    <div className="ss-trust-count">2,137+</div>
                    <div className="ss-trust-labels">
                      <span className="ss-trust-line-1">Businesses Supported</span>
                      <span className="ss-trust-line-2">Across India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Three Angled Overlapping Testimonial Video Cards */}
              <div className="ss-hero-showcase">
                <div className="ss-cards-wrapper">
                  {HERO_VIDEO_CARDS.map((card, idx) => {
                    const IconComp = card.icon;
                    const hasVideo = Boolean(card.videoSrc);
                    const isPlaying = hasVideo && activeHeroVideo === idx;

                    return (
                      <article
                        key={card.id}
                        className={`ss-angled-card ${card.cls} ${isPlaying ? 'is-video-playing' : ''}`}
                        onMouseEnter={() => handleHeroCardMouseEnter(idx)}
                        onMouseLeave={() => handleHeroCardMouseLeave(idx)}
                        onClick={() => handleOpenFullVideo(card)}
                        tabIndex={0}
                        role="region"
                        aria-label={`View ${card.clientName} Testimonial: ${card.category} - ${card.subtext}`}
                      >
                        {/* Upper Video Area (Approx 70% height) */}
                        <div className="ss-card-video-box">
                          {/* Static Poster Image matching Master Reference */}
                          <img
                            src={card.poster}
                            alt={card.alt}
                            className={`ss-hero-card-poster ${isPlaying ? 'fade-out' : 'fade-in'}`}
                            loading="eager"
                          />

                          {/* Inline Video on Hover */}
                          {hasVideo && (
                            <video
                              ref={(el) => (heroVideoRefs.current[idx] = el)}
                              src={card.videoSrc}
                              muted
                              playsInline
                              loop
                              preload="none"
                              className={`testimonial-video ${isPlaying ? 'fade-in' : 'fade-out'}`}
                              aria-hidden={!isPlaying}
                            />
                          )}

                          {/* Transparent Click Target for Accessibility / Play trigger */}
                          <button
                            type="button"
                            className="ss-card-click-hitbox"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenFullVideo(card);
                            }}
                            aria-label={`Play full testimonial of ${card.clientName}`}
                          />
                        </div>

                        {/* Lower Purple Information Panel (Approx 30% height) */}
                        <div className="ss-card-purple-panel">
                          <div className="ss-card-category-row">
                            <IconComp size={15} className="ss-card-category-icon" />
                            <span>{card.category}</span>
                          </div>
                          <div className="ss-card-info-row">
                            <div className="ss-card-name-group">
                              <h3 className="ss-card-client-name">{card.clientName}</h3>
                              <span className="ss-card-client-sub">{card.subtext}</span>
                            </div>
                            <button
                              type="button"
                              className="ss-card-arrow-circle-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenFullVideo(card);
                              }}
                              aria-label={`Watch ${card.clientName} story`}
                            >
                              <ArrowUpRight size={16} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating Bottom Statistics Bar — Exact 5 Columns matching Image 1 */}
            <div className="ss-hero-stats-bar" aria-label="Key Achievements">
              <div className="ss-hero-stat-col">
                <Building2 size={30} className="ss-stat-icon-purple" strokeWidth={1.75} />
                <div className="ss-hero-stat-details">
                  <div className="ss-hero-stat-val">2,137+</div>
                  <div className="ss-hero-stat-lbl">Businesses Supported</div>
                </div>
              </div>

              <div className="ss-hero-stat-divider" aria-hidden="true" />

              <div className="ss-hero-stat-col">
                <Coins size={30} className="ss-stat-icon-orange" strokeWidth={1.75} />
                <div className="ss-hero-stat-details">
                  <div className="ss-hero-stat-val">₹190 Cr+</div>
                  <div className="ss-hero-stat-lbl">Funding Facilitated</div>
                </div>
              </div>

              <div className="ss-hero-stat-divider" aria-hidden="true" />

              <div className="ss-hero-stat-col">
                <Layers size={30} className="ss-stat-icon-purple" strokeWidth={1.75} />
                <div className="ss-hero-stat-details">
                  <div className="ss-hero-stat-val">12+</div>
                  <div className="ss-hero-stat-lbl">Industries Served</div>
                </div>
              </div>

              <div className="ss-hero-stat-divider" aria-hidden="true" />

              <div className="ss-hero-stat-col">
                <Star size={30} className="ss-stat-icon-orange" fill="#F26522" strokeWidth={1.5} />
                <div className="ss-hero-stat-details">
                  <div className="ss-hero-stat-val">4.9/5</div>
                  <div className="ss-hero-stat-lbl">Google Rating</div>
                </div>
              </div>

              <div className="ss-hero-stat-divider" aria-hidden="true" />

              <div className="ss-hero-stat-col">
                <Handshake size={30} className="ss-stat-icon-purple" strokeWidth={1.75} />
                <div className="ss-hero-stat-details">
                  <div className="ss-hero-stat-val">97%</div>
                  <div className="ss-hero-stat-lbl">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Outcomes Live Ticker */}
        <section className="ss-ticker-bar" aria-label="Recent client achievements">
          <div className="ss-ticker-badge">
            <TrendingUp size={14} />
            <span>Recent Outcomes</span>
          </div>
          <div className="ss-ticker-viewport">
            <div className="ss-ticker-track">
              <ul className="ss-ticker-list">
                {OUTCOMES_TICKER.map((item, idx) => (
                  <li key={`ticker-1-${idx}`} className="ss-ticker-item">
                    <b>{item.company}</b> {item.outcome}
                  </li>
                ))}
              </ul>
              <ul className="ss-ticker-list" aria-hidden="true">
                {OUTCOMES_TICKER.map((item, idx) => (
                  <li key={`ticker-2-${idx}`} className="ss-ticker-item">
                    <b>{item.company}</b> {item.outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Client Video Testimonials ("Watch Real Founders Share Their Journey.") */}
        <section id="video-testimonials" className="ss-theatre-section" aria-labelledby="theatre-title">
          <div className="ss-container">
            <div className="ss-sec-head center">
              <span className="ss-kicker">
                <span className="ss-kicker-dot"></span>
                Client Video Stories
              </span>
              <h2 id="theatre-title" className="ss-sec-title">
                Watch Real Founders <em>Share Their Journey.</em>
              </h2>
              <p className="ss-sec-desc">
                Hear directly from business owners across India on how they unlocked collateral-free loans, government subsidies, and regulatory certifications with Growthora.
              </p>
            </div>

            <div className="ss-theatre-grid">
              {/* Featured Large Video Player */}
              <div className="ss-stage-wrapper">
                <div className="ss-stage-frame">
                  <video
                    ref={featuredVideoRef}
                    playsInline
                    controls={isVideoPlaying}
                    poster={activeVideo.posterUrl}
                    src={activeVideo.videoUrl}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                  />

                  {/* Play Overlay */}
                  <div
                    className={`ss-stage-poster-wrap ${isVideoPlaying ? 'hidden' : ''}`}
                    onClick={toggleVideoPlay}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play video testimonial of ${activeVideo.name}`}
                  >
                    <div className="ss-play-btn-circle">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>

                  <span className="ss-stage-badge">
                    <ShieldCheck size={14} />
                    Verified Video Testimonial
                  </span>
                </div>
              </div>

              {/* Video Founder Info & Carousel Playlist */}
              <div className="ss-stage-info">
                <span className="ss-stage-tag">{activeVideo.tag}</span>
                <h3 className="ss-stage-name">{activeVideo.name}</h3>
                <p className="ss-stage-role">{activeVideo.role}</p>

                <blockquote className="ss-stage-quote">
                  &ldquo;{activeVideo.quote}&rdquo;
                </blockquote>

                {/* Playlist Controls & Head */}
                <div className="ss-playlist-header">
                  <div className="ss-playlist-count">
                    Now viewing <b>{activeVideoIndex + 1}</b> of {CLIENT_VIDEOS.length} Client Stories
                  </div>
                  <div className="ss-playlist-arrows">
                    <button
                      type="button"
                      className="ss-arrow-btn"
                      onClick={() => scrollPlaylist('left')}
                      aria-label="Previous video stories"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="ss-arrow-btn"
                      onClick={() => scrollPlaylist('right')}
                      aria-label="Next video stories"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Horizontal Playlist */}
                <div className="ss-playlist-scroll" ref={playlistScrollRef} role="list" aria-label="All client videos">
                  {CLIENT_VIDEOS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`ss-playlist-item ${idx === activeVideoIndex ? 'active' : ''}`}
                      onClick={() => handleVideoSelect(idx, true)}
                      role="listitem"
                      aria-current={idx === activeVideoIndex ? 'true' : 'false'}
                    >
                      <div className="ss-playlist-thumb">
                        <img src={item.posterUrl} alt={item.name} loading="lazy" />
                        <span className="ss-mini-play">
                          <Play size={10} fill="currentColor" />
                        </span>
                      </div>
                      <span className="ss-playlist-name">{item.name}</span>
                      <span className="ss-playlist-role">{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Featured Case Studies ("Behind Every Success, There's a Strategy.") */}
        <section id="featured-cases" className="ss-cases-section" aria-labelledby="cases-title">
          <div className="ss-container">
            <div className="ss-sec-head center">
              <span className="ss-kicker">
                <span className="ss-kicker-dot"></span>
                In-Depth Advisory Case Studies
              </span>
              <h2 id="cases-title" className="ss-sec-title">
                Behind Every Success, <em>There&rsquo;s a Strategy.</em>
              </h2>
              <p className="ss-sec-desc">
                From initial diagnostic eligibility to money in the bank. Explore how structured compliance and financial advisory enabled real growth for these businesses.
              </p>
            </div>

            {/* Case Selector Tabs */}
            <div className="ss-case-tabs-nav" role="tablist">
              {FEATURED_CASE_STUDIES.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeCaseIndex}
                  className={`ss-case-tab-btn ${i === activeCaseIndex ? 'active' : ''}`}
                  onClick={() => setActiveCaseIndex(i)}
                >
                  {c.company} ({c.amount})
                </button>
              ))}
            </div>

            {/* Main Interactive Case Showcase */}
            <div className="ss-case-showcase">
              <div className="ss-case-grid-inner">
                {/* Left Information */}
                <div>
                  <div className="ss-case-chips">
                    {activeCase.chips.map((chip, i) => (
                      <span key={`chip-${i}`} className="ss-case-chip">{chip}</span>
                    ))}
                  </div>

                  <div className="ss-case-heading-group">
                    <h3>{activeCase.company}</h3>
                    <span className="ss-case-scheme-badge">{activeCase.scheme}</span>
                  </div>

                  <div className="ss-case-narrative">
                    <div className="ss-case-narrative-item">
                      <strong>The Business Challenge:</strong> {activeCase.challenge}
                    </div>
                    <div className="ss-case-narrative-item">
                      <strong>Growthora&rsquo;s Strategy:</strong> {activeCase.strategy}
                    </div>
                    <div className="ss-case-narrative-item">
                      <strong>The Verified Outcome:</strong> {activeCase.outcome}
                    </div>
                  </div>

                  <div className="ss-case-quote-box">
                    <p>&ldquo;{activeCase.quote}&rdquo;</p>
                    <span className="ss-case-founder">&mdash; {activeCase.founder}, {activeCase.founderRole}</span>
                  </div>

                  {/* Metrics */}
                  <div className="ss-case-metrics-grid">
                    {activeCase.metrics.map((m, idx) => (
                      <div key={`m-${idx}`} className="ss-case-metric-box">
                        <div className="ss-case-metric-val">{m.val}</div>
                        <div className="ss-case-metric-label">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '28px' }}>
                    <button
                      type="button"
                      className="ss-btn-primary"
                      onClick={() => setSelectedCaseModal(activeCase)}
                    >
                      <span>Read Full Success Story</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* Right Visual with Rotating Seal */}
                <div className="ss-case-visual-side">
                  <div className="ss-seal-badge" aria-hidden="true">
                    <svg className="ss-seal-svg" viewBox="0 0 120 120">
                      <defs>
                        <path id="sealPathA" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
                      </defs>
                      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
                      <text fill="currentColor" fontFamily="DM Sans, sans-serif" fontSize="8.6" fontWeight="700" letterSpacing="2">
                        <textPath href="#sealPathA" textLength="285" lengthAdjust="spacing">
                          VERIFIED OUTCOME ✦ GROWTHORA ADVISORY ✦
                        </textPath>
                      </text>
                    </svg>
                    <div className="ss-seal-center">
                      <span>{activeCase.sealText.split(' ')[0]}</span>
                      <small>{activeCase.sealText.split(' ')[1] || 'VERIFIED'}</small>
                    </div>
                  </div>

                  <div className="ss-case-visual-frame">
                    <img src={activeCase.image} alt={activeCase.company} loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Success Record (Client-by-Client Proof) — Two-Column Layout */}
        <section className="ss-record-section" aria-labelledby="record-title">
          <div className="ss-record-container">
            <div className="ss-record-header-wrap">
              <span className="ss-kicker">
                <span className="ss-kicker-dot"></span>
                Verified Client Register
              </span>
              <h2 id="record-title" className="ss-sec-title">
                Proof, Written <em>Client by Client.</em>
              </h2>
              <p className="ss-sec-desc">
                Every row below represents an authentic enterprise with verified outcomes: sanctioned funding, certificates issued, or statutory registrations cleared.
              </p>

              {/* Filter Pills */}
              <div className="ss-filter-pills" role="group" aria-label="Filter success records">
                <button
                  type="button"
                  className={`ss-filter-btn ${recordFilter === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    setRecordFilter('all');
                    setIsRecordsExpanded(false);
                  }}
                >
                  All <small>11</small>
                </button>
                <button
                  type="button"
                  className={`ss-filter-btn ${recordFilter === 'funding' ? 'active' : ''}`}
                  onClick={() => {
                    setRecordFilter('funding');
                    setIsRecordsExpanded(false);
                  }}
                >
                  Funding <small>4</small>
                </button>
                <button
                  type="button"
                  className={`ss-filter-btn ${recordFilter === 'certificates' ? 'active' : ''}`}
                  onClick={() => {
                    setRecordFilter('certificates');
                    setIsRecordsExpanded(false);
                  }}
                >
                  Certificates <small>4</small>
                </button>
                <button
                  type="button"
                  className={`ss-filter-btn ${recordFilter === 'registration' ? 'active' : ''}`}
                  onClick={() => {
                    setRecordFilter('registration');
                    setIsRecordsExpanded(false);
                  }}
                >
                  Registration and compliance <small>3</small>
                </button>
              </div>
            </div>

            {/* Two-Column Grid: 72% Client Records / 28% Sticky Schemes Sidebar */}
            <div className="ss-record-grid">
              {/* Left Column (72%): Client Records */}
              <div className="ss-record-main-col">
                <div className="ss-record-list">
                  {displayedRecords.map((rec, index) => {
                    const avatarBg =
                      index % 3 === 0
                        ? '#251039'
                        : index % 3 === 1
                        ? '#F26522'
                        : '#8A5A1E';

                    return (
                      <article key={rec.id} className="ss-record-card">
                        <div className="ss-record-top-grid">
                          <div className="ss-record-id-wrap">
                            <div
                              className="ss-record-mono"
                              style={{ backgroundColor: avatarBg }}
                              aria-hidden="true"
                            >
                              {rec.mono}
                            </div>
                            <div className="ss-record-company">
                              <h4>{rec.name}</h4>
                              <p>{rec.location}</p>
                            </div>
                          </div>

                          <div className="ss-record-service-col">
                            <span className="label">Service</span>
                            <strong>{rec.service}</strong>
                          </div>

                          <div className="ss-record-outcome-col">
                            <span className="label">Outcome</span>
                            <strong>{rec.outcome}</strong>
                            <small>{rec.outcomeDetail}</small>
                          </div>
                        </div>

                        {/* 4-Step Journey */}
                        <ol className="ss-journey-row" aria-label="Completed Journey Steps">
                          {rec.steps.map((st, i) => (
                            <li key={`step-${i}`} className="ss-journey-step">
                              <div className="ss-journey-dot">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <span>{st}</span>
                            </li>
                          ))}
                        </ol>
                      </article>
                    );
                  })}
                </div>

                {/* Show All / Show Fewer Button */}
                {filteredRecords.length > 6 && (
                  <div className="ss-rec-more">
                    <button
                      type="button"
                      className="ss-btn-show-all"
                      onClick={() => setIsRecordsExpanded(!isRecordsExpanded)}
                      aria-expanded={isRecordsExpanded}
                    >
                      {isRecordsExpanded ? "Show fewer records" : `Show all ${filteredRecords.length} records`}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column (28%): Sticky Schemes Sidebar & Eligibility CTA */}
              <aside className="ss-schemes-sidebar" aria-label="Schemes behind these stories">
                <div className="ss-schemes-sidebar-sticky">
                  {/* Schemes Card */}
                  <div className="ss-scheme-card">
                    <h3 className="ss-scheme-card-title">Schemes behind these stories</h3>
                    <p className="ss-scheme-card-desc">The government schemes our clients use most.</p>

                    <ul className="ss-scheme-list">
                      {SCHEMES_BEHIND_STORIES.map((scheme, idx) => (
                        <li key={`scheme-${idx}`} className="ss-scheme-item">
                          <a
                            href={scheme.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ss-scheme-link"
                          >
                            <div className="ss-scheme-info">
                              <strong className="ss-scheme-name">{scheme.name}</strong>
                              <span className="ss-scheme-sub">{scheme.desc}</span>
                            </div>
                            <ArrowUpRight size={16} className="ss-scheme-arrow" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dark-Purple Eligibility CTA */}
                  <div className="ss-elig-card">
                    <h3 className="ss-elig-title">Not sure which scheme fits you?</h3>
                    <p className="ss-elig-desc">Get a free eligibility check. The first 30-minute consultation costs nothing.</p>
                    <button
                      type="button"
                      className="ss-btn-elig-cta"
                      onClick={() => setIsConsultationOpen(true)}
                    >
                      Check my eligibility
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 8. Google Reviews Section (Soft Lavender Background - Master Asymmetric 1 + 2x2 Grid) */}
        <section className="ss-reviews-section" aria-labelledby="reviews-title">
          <div className="ss-reviews-container">
            {/* Header & Rating Summary Row */}
            <div className="ss-reviews-header-row">
              <div className="ss-reviews-title-box">
                <div className="ss-reviews-eyebrow">
                  <span className="ss-reviews-orange-dot" aria-hidden="true" />
                  <span>VERIFIED GOOGLE REVIEWS</span>
                </div>
                <h2 id="reviews-title" className="ss-reviews-main-title">
                  Real Words. <em>Real Trust.</em>
                </h2>
                <p className="ss-reviews-subtitle">
                  Discover what entrepreneurs and business owners say about their journey with Growthora Advisory.
                </p>
              </div>

              {/* Google Rating Summary Box (Top-Right) */}
              <div className="ss-google-summary-box">
                <div className="ss-gsummary-left">
                  <GoogleGIcon size={34} />
                </div>
                <div className="ss-gsummary-divider" aria-hidden="true" />
                <div className="ss-gsummary-center">
                  <div className="ss-gsummary-score-row">
                    <span className="ss-gsummary-score">4.9/5</span>
                    <span className="ss-gsummary-stars">★★★★★</span>
                  </div>
                  <span className="ss-gsummary-count">Based on 500+ Google Reviews</span>
                </div>
                <div className="ss-gsummary-right">
                  <a
                    href="https://www.google.com/search?q=growthora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ss-gsummary-btn"
                  >
                    <span>Read All Reviews on Google</span>
                    <ArrowUpRight size={14} className="ss-gsummary-arrow" />
                  </a>
                </div>
              </div>
            </div>

            {/* Asymmetric Reviews Showcase: Left Featured Card (36%) + Right 2x2 Grid (64%) */}
            <div
              className="ss-reviews-showcase"
              onTouchStart={handleReviewTouchStart}
              onTouchEnd={handleReviewTouchEnd}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') handlePrevReview();
                if (e.key === 'ArrowRight') handleNextReview();
              }}
              role="region"
              aria-label="Google Reviews Carousel"
            >
              {GOOGLE_REVIEW_SLIDES.map((slide, sIdx) => {
                const isActive = sIdx === currentReviewSlide;
                if (!isActive) return null;
                const { featured, reviews } = slide;

                return (
                  <div key={slide.id} className="ss-reviews-slide-grid ss-slide-fade-in">
                    {/* Left: Featured Review Card (Deep Purple Gradient) */}
                    <article className="ss-featured-review-card">
                      {/* Top: Google G circle, 5 stars, Featured badge */}
                      <div className="ss-featured-card-top">
                        <div className="ss-featured-g-and-stars">
                          <div className="ss-featured-g-circle">
                            <GoogleGIcon size={20} />
                          </div>
                          <div className="ss-featured-stars">★★★★★</div>
                        </div>
                        <span className="ss-featured-pill-badge">Featured Review</span>
                      </div>

                      {/* Content: Large Quote & Decorative Orange Quote Icon */}
                      <div className="ss-featured-body-wrap">
                        <blockquote className="ss-featured-quote">
                          &ldquo;{featured.review}&rdquo;
                        </blockquote>
                        <div className="ss-featured-quote-icon" aria-hidden="true">
                          <QuoteIcon size={52} color="#F26522" />
                        </div>
                      </div>

                      {/* Bottom: Divider & Author Row */}
                      <div className="ss-featured-card-bottom">
                        <div className="ss-featured-divider" />
                        <div className="ss-featured-author-row">
                          <div className="ss-featured-avatar-circle">
                            {featured.initials}
                          </div>
                          <div className="ss-featured-author-info">
                            <strong className="ss-featured-author-name">{featured.name}</strong>
                            <span className="ss-featured-author-role">{featured.role}</span>
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* Right: 2x2 Grid of 4 Supporting Review Cards */}
                    <div className="ss-supporting-reviews-grid">
                      {reviews.map((rev) => (
                        <article key={rev.id} className="ss-support-review-card">
                          <div className="ss-support-card-top">
                            <div className="ss-support-g-and-stars">
                              <GoogleGIcon size={18} />
                              <span className="ss-support-stars">★★★★★</span>
                            </div>
                            <div className="ss-support-quote-icon" aria-hidden="true">
                              <QuoteIcon size={26} color="#E2D0E8" />
                            </div>
                          </div>

                          <blockquote className="ss-support-quote">
                            &ldquo;{rev.review}&rdquo;
                          </blockquote>

                          <div className="ss-support-card-bottom">
                            <div className="ss-support-divider" />
                            <div className="ss-support-author-row">
                              <div className={`ss-support-avatar-circle ${rev.avatarBg === 'orange' ? 'bg-orange' : 'bg-purple'}`}>
                                {rev.initials}
                              </div>
                              <div className="ss-support-author-info">
                                <strong className="ss-support-author-name">{rev.name}</strong>
                                <span className="ss-support-author-role">{rev.role}</span>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Carousel Navigation Controls */}
            <div className="ss-reviews-carousel-nav" aria-label="Review Carousel Navigation">
              <button
                type="button"
                className="ss-reviews-nav-btn prev"
                onClick={handlePrevReview}
                aria-label="Previous Reviews"
              >
                <ChevronLeft size={18} strokeWidth={2.4} />
              </button>

              <div className="ss-reviews-dots" role="tablist" aria-label="Review Groups">
                {GOOGLE_REVIEW_SLIDES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`ss-reviews-dot ${dotIdx === currentReviewSlide ? 'is-active' : ''}`}
                    onClick={() => setCurrentReviewSlide(dotIdx)}
                    role="tab"
                    aria-selected={dotIdx === currentReviewSlide}
                    aria-label={`Go to review group ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="ss-reviews-nav-btn next"
                onClick={handleNextReview}
                aria-label="Next Reviews"
              >
                <ChevronRight size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </section>

        {/* 9. Industries Section ("Industries We Empower.") — Curved Card Design */}
        <section className="ss-industries-section" aria-labelledby="ind-title">
          <div className="ss-ind-container">
            {/* Header Row: Heading + Stats */}
            <div className="ss-ind-header-row">
              <div className="ss-ind-header-left">
                <span className="ss-kicker">
                  <span className="ss-kicker-dot"></span>
                  Sectors We Advance
                </span>
                <h2 id="ind-title" className="ss-ind-main-heading">
                  Industries We <em>Empower.</em>
                </h2>
                <p className="ss-ind-description">
                  Growthora delivers sector-specific advisory and specialized scheme mapping tailored to India&rsquo;s core industries.
                </p>
              </div>
              <div className="ss-ind-stats-row" aria-label="Industry statistics">
                <div className="ss-ind-stat-item">
                  <div className="ss-ind-stat-icon-circle"><BarChart3 size={20} /></div>
                  <div className="ss-ind-stat-text">
                    <span className="ss-ind-stat-val">12+</span>
                    <span className="ss-ind-stat-label">Core Industries</span>
                  </div>
                </div>
                <div className="ss-ind-stat-sep" aria-hidden="true" />
                <div className="ss-ind-stat-item">
                  <div className="ss-ind-stat-icon-circle"><Handshake size={20} /></div>
                  <div className="ss-ind-stat-text">
                    <span className="ss-ind-stat-val">2,137+</span>
                    <span className="ss-ind-stat-label">Businesses Guided</span>
                  </div>
                </div>
                <div className="ss-ind-stat-sep" aria-hidden="true" />
                <div className="ss-ind-stat-item">
                  <div className="ss-ind-stat-icon-circle"><Star size={20} /></div>
                  <div className="ss-ind-stat-text">
                    <span className="ss-ind-stat-val">97%</span>
                    <span className="ss-ind-stat-label">Success Rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3×2 Industry Cards Grid */}
            <div className="ss-ind-grid">
              {INDUSTRIES_EMPOWERED.map((ind) => {
                const IconComp = INDUSTRY_ICON_MAP[ind.iconId];
                return (
                  <a
                    key={ind.id}
                    href={`/industries#${ind.id}`}
                    className={`ss-ind-card accent-${ind.accent}`}
                    aria-label={`Explore ${ind.name} industry advisory`}
                  >
                    {/* Full-bleed industry photograph */}
                    <div className="ss-ind-img-wrap">
                      <img src={ind.image} alt={`${ind.name} industry professionals`} className="ss-ind-photo" loading="lazy" />
                    </div>

                    {/* SVG curved white wave separator */}
                    <svg className="ss-ind-wave" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M0,52 C30,18 68,16 112,36 C175,62 310,70 400,30 L400,80 L0,80 Z" fill="#FFFFFF" />
                    </svg>

                    {/* White content information panel */}
                    <div className="ss-ind-info">
                      <div className={`ss-ind-icon-circle ${ind.accent === 'purple' ? 'icon-purple' : 'icon-orange'}`}>
                        {IconComp && <IconComp size={22} strokeWidth={1.8} />}
                      </div>
                      <h3 className="ss-ind-name">{ind.name}</h3>
                      <p className="ss-ind-desc">{ind.desc}</p>
                      <span className="ss-ind-badge">{ind.count}</span>
                    </div>

                    {/* Bottom-right decorative accent curve */}
                    <svg className="ss-ind-accent-svg" viewBox="0 0 130 130" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M130,20 C110,55 88,80 58,100 C40,112 22,122 8,130 L130,130 Z" />
                    </svg>

                    {/* Circular arrow button */}
                    <div className="ss-ind-arrow-btn" aria-hidden="true">
                      <ArrowRight size={18} />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="ss-ind-bottom-cta">
              <span className="ss-ind-cta-line" aria-hidden="true" />
              <a href="/industries" className="ss-ind-cta-btn">
                <span>Explore All Industries</span>
                <ArrowRight size={16} />
              </a>
              <span className="ss-ind-cta-line" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* 10. How Every Story Begins (Four Steps Process & Eligibility Assessment Form) */}
        <section className="ss-process-section" id="how-every-story-begins" aria-labelledby="process-title">
          <div className="ss-container">
            <div className="ss-process-grid">
              {/* Left Column: Four Steps from First Call to Final Approval */}
              <div className="ss-process-steps-col">
                <div className="ss-sec-head" style={{ marginBottom: '24px' }}>
                  <span className="ss-kicker">
                    <span className="ss-kicker-dot"></span>
                    Methodical Advisory Framework
                  </span>
                  <h2 id="process-title" className="ss-sec-title">
                    Four Steps from <em>First Call</em> to Final Approval.
                  </h2>
                </div>

                <ol className="ss-steps-list">
                  {PROCESS_STEPS.map((step, idx) => (
                    <li key={`step-${idx}`} className="ss-step-item">
                      <div className="ss-step-numeral">{step.numeral}</div>
                      <div className="ss-step-info">
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right Column: Actual Working Growthora Eligibility Assessment Form */}
              <div className="ss-process-form-col">
                <EligibilityWizardForm
                  heading="Check Your Business Eligibility"
                  subheading="Find the right government funding scheme and support for your business with Growthora Advisory."
                  showBadge={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 11. Frequently Asked Questions */}
        <section className="ss-faq-section" aria-labelledby="faq-title">
          <div className="ss-container">
            <div className="ss-faq-grid">
              <div className="ss-sec-head" style={{ marginBottom: 0 }}>
                <span className="ss-kicker">
                  <span className="ss-kicker-dot"></span>
                  Clarity & Transparency
                </span>
                <h2 id="faq-title" className="ss-sec-title">
                  What Founders <em>Ask Us</em> Most.
                </h2>
                <p className="ss-sec-desc">
                  Clear answers to key questions on collateral-free funding, registration timelines, and eligibility criteria.
                </p>
                <div style={{ marginTop: '28px' }}>
                  <button
                    type="button"
                    className="ss-btn-primary"
                    onClick={() => setIsConsultationOpen(true)}
                  >
                    <span>Talk to an Advisor</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              <div className="ss-faq-list">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={`faq-${idx}`} className={`ss-faq-item ${isOpen ? 'open' : ''}`}>
                      <button
                        type="button"
                        className="ss-faq-trigger"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                      >
                        <h4>{faq.q}</h4>
                        <div className="ss-faq-icon">
                          <ChevronDown size={18} />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="ss-faq-body">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 12. Client Success Stories — Premium Testimonial Section with Satisfaction Graph */}
        <section className="ss-cs-section" aria-labelledby="cs-title">
          <div className="ss-cs-container">

            {/* Top Grid: Heading Row + Satisfaction Journey Graph */}
            <div className="ss-cs-top-grid">

              {/* Left Column — Badge & Heading Row */}
              <div className="ss-cs-head-col">
                <span className="ss-cs-badge">SUCCESS STORIES</span>

                <div className="ss-cs-head-row">
                  <h2 className="ss-cs-heading" id="cs-title">
                    <span>Real Businesses.</span>
                    <span>Real Progress.</span>
                    <span className="ss-cs-highlight">Real Impact.</span>
                  </h2>

                  <div className="ss-cs-divider-col">
                    <div className="ss-cs-divider-line" />
                    <p className="ss-cs-desc-text">
                      See how our support turns business challenges into measurable success.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column — Client Satisfaction Journey Graph Card */}
              <div className="ss-cs-graph-card" ref={graphRef}>
                <div className="ss-cs-graph-head">
                  <div className="ss-cs-graph-title-group">
                    <svg className="ss-cs-graph-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <div>
                      <span className="ss-cs-graph-title">Client Satisfaction Journey</span>
                      {activeMilestoneId && (
                        <span className="ss-cs-graph-stage-hint">
                          {activeMilestoneId === 'initial' && 'Advisory onboarding & readiness assessment (Illustrative milestone)'}
                          {activeMilestoneId === 'reg' && 'Entity incorporation & scheme mapping complete (Illustrative milestone)'}
                          {activeMilestoneId === 'funding' && 'DPR approved & funding disbursed (Illustrative milestone)'}
                          {activeMilestoneId === 'satisfaction' && 'Advisory excellence & verified client satisfaction benchmark'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`ss-cs-sat-badge ${isGraphVisible ? 'is-drawn' : ''} ${activeMilestoneId === 'satisfaction' ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveMilestoneId('satisfaction')}
                    onMouseLeave={() => setActiveMilestoneId(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="ss-cs-sat-val">97%</span>
                    <span className="ss-cs-sat-lbl">Client Satisfaction</span>
                  </div>
                </div>

                <div className="ss-cs-chart-wrap">
                  <svg className="ss-cs-chart-svg" viewBox="0 0 520 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive client satisfaction journey chart showing progression from 0% initial stage to 97% client satisfaction benchmark">
                    <defs>
                      {/* Premium light-orange gradient below the curve */}
                      <linearGradient id="csOrangeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF7518" stopOpacity="0.32" />
                        <stop offset="60%" stopColor="#FF7518" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#FFF1E6" stopOpacity="0.02" />
                      </linearGradient>
                      <marker id="csArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#FF7518" />
                      </marker>
                    </defs>

                    {/* Y-axis Labels */}
                    <text x="32" y="165" fill="#8F7260" fontSize="10.5" textAnchor="end" fontFamily="sans-serif">0%</text>
                    <text x="32" y="137" fill="#8F7260" fontSize="10.5" textAnchor="end" fontFamily="sans-serif">20%</text>
                    <text x="32" y="109" fill="#8F7260" fontSize="10.5" textAnchor="end" fontFamily="sans-serif">40%</text>
                    <text x="32" y="81" fill="#8F7260" fontSize="10.5" textAnchor="end" fontFamily="sans-serif">60%</text>
                    <text x="32" y="53" fill="#8F7260" fontSize="10.5" textAnchor="end" fontFamily="sans-serif">80%</text>
                    <text x="32" y="25" fill="#8F7260" fontSize="10.5" textAnchor="end" fontFamily="sans-serif">100%</text>

                    {/* Horizontal Grid lines */}
                    <line x1="42" y1="21" x2="490" y2="21" stroke="#FFE5D1" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="42" y1="49" x2="490" y2="49" stroke="#FFE5D1" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="42" y1="77" x2="490" y2="77" stroke="#FFE5D1" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="42" y1="105" x2="490" y2="105" stroke="#FFE5D1" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="42" y1="133" x2="490" y2="133" stroke="#FFE5D1" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="42" y1="161" x2="490" y2="161" stroke="#FFE5D1" strokeWidth="1.2" />

                    {/* Y-axis vertical line */}
                    <line x1="42" y1="18" x2="42" y2="161" stroke="#FFE5D1" strokeWidth="1.2" />

                    {/* Smooth Light-Orange Gradient Fill under curve */}
                    <path
                      className={`ss-cs-graph-fill ${isGraphVisible ? 'is-drawn' : ''}`}
                      d="M 42 161 L 44 161 C 80 160 110 156 140 148 C 190 134 230 108 275 88 C 320 68 375 52 435 34 C 452 29 468 25 476 22 L 476 161 Z"
                      fill="url(#csOrangeGradient)"
                    />

                    {/* Smooth Orange Curve Line — Animated 2s from bottom-left (0%) to top-right (97%) */}
                    <path
                      className={`ss-cs-graph-curve ${isGraphVisible ? 'is-drawn' : ''}`}
                      d="M 42 161 C 80 160 110 156 140 148 C 190 134 230 108 275 88 C 320 68 375 52 435 34 C 452 29 468 25 474 23"
                      stroke="#FF7518"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      fill="none"
                      markerEnd="url(#csArrow)"
                    />

                    {/* Milestone 0: Origin */}
                    <circle cx="42" cy="161" r="5" fill="#FFFFFF" stroke="#FF7518" strokeWidth="2.5" />

                    {/* Milestone 1: 0% Initial Stage (Illustrative) */}
                    <g
                      className={`ss-cs-point-group ss-cs-point-delay-1 ${isGraphVisible ? 'is-drawn' : ''} ${activeMilestoneId === 'initial' ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveMilestoneId('initial')}
                      onMouseLeave={() => setActiveMilestoneId(null)}
                      tabIndex={0}
                      role="button"
                      aria-label="0% Initial Stage: Illustrative journey milestone"
                    >
                      <circle cx="120" cy="154" r="10" fill="#FF7518" className="ss-cs-dot-ring" />
                      <circle cx="120" cy="154" r="5" fill="#FFFFFF" stroke="#FF7518" strokeWidth="2.5" className="ss-cs-dot-core" />
                      <g transform="translate(86, 96)">
                        <rect
                          width="68"
                          height="42"
                          rx="10"
                          fill="#FFFFFF"
                          filter={activeMilestoneId === 'initial' ? "drop-shadow(0 4px 10px rgba(255,117,24,0.3))" : "drop-shadow(0 2px 6px rgba(45,21,56,0.08))"}
                          stroke={activeMilestoneId === 'initial' ? "#FF7518" : "#FFD6BA"}
                          strokeWidth="1.5"
                        />
                        <text x="34" y="20" fill={activeMilestoneId === 'initial' ? "#FF7518" : "#2D1538"} fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">0%</text>
                        <text x="34" y="33" fill="#7A5239" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Initial Stage</text>
                      </g>

                      {activeMilestoneId === 'initial' && (
                        <g className="ss-cs-tooltip-bubble" transform="translate(56, 38)">
                          <rect width="130" height="48" rx="8" fill="#2D1538" />
                          <text x="65" y="18" fill="#FF7518" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">0% • Initial Stage</text>
                          <text x="65" y="32" fill="#FFFFFF" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Illustrative Milestone</text>
                          <text x="65" y="42" fill="#FFE5D1" fontSize="7" fontWeight="400" textAnchor="middle" fontFamily="sans-serif">Onboarding & readiness audit</text>
                          <polygon points="61,48 65,53 69,48" fill="#2D1538" />
                        </g>
                      )}
                    </g>

                    {/* Milestone 2: 56% After Registration (Illustrative) */}
                    <g
                      className={`ss-cs-point-group ss-cs-point-delay-2 ${isGraphVisible ? 'is-drawn' : ''} ${activeMilestoneId === 'reg' ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveMilestoneId('reg')}
                      onMouseLeave={() => setActiveMilestoneId(null)}
                      tabIndex={0}
                      role="button"
                      aria-label="56% After Registration: Illustrative journey milestone"
                    >
                      <circle cx="230" cy="110" r="10" fill="#FF7518" className="ss-cs-dot-ring" />
                      <circle cx="230" cy="110" r="5" fill="#FFFFFF" stroke="#FF7518" strokeWidth="2.5" className="ss-cs-dot-core" />
                      <g transform="translate(186, 50)">
                        <rect
                          width="88"
                          height="42"
                          rx="10"
                          fill="#FFFFFF"
                          filter={activeMilestoneId === 'reg' ? "drop-shadow(0 4px 10px rgba(255,117,24,0.3))" : "drop-shadow(0 2px 6px rgba(45,21,56,0.08))"}
                          stroke={activeMilestoneId === 'reg' ? "#FF7518" : "#FFD6BA"}
                          strokeWidth="1.5"
                        />
                        <text x="44" y="20" fill={activeMilestoneId === 'reg' ? "#FF7518" : "#2D1538"} fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">56%</text>
                        <text x="44" y="33" fill="#7A5239" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">After Registration</text>
                      </g>

                      {activeMilestoneId === 'reg' && (
                        <g className="ss-cs-tooltip-bubble" transform="translate(165, -4)">
                          <rect width="130" height="48" rx="8" fill="#2D1538" />
                          <text x="65" y="18" fill="#FF7518" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">56% • After Registration</text>
                          <text x="65" y="32" fill="#FFFFFF" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Illustrative Milestone</text>
                          <text x="65" y="42" fill="#FFE5D1" fontSize="7" fontWeight="400" textAnchor="middle" fontFamily="sans-serif">Incorporation & scheme mapped</text>
                          <polygon points="61,48 65,53 69,48" fill="#2D1538" />
                        </g>
                      )}
                    </g>

                    {/* Milestone 3: 78% After Funding (Illustrative) */}
                    <g
                      className={`ss-cs-point-group ss-cs-point-delay-3 ${isGraphVisible ? 'is-drawn' : ''} ${activeMilestoneId === 'funding' ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveMilestoneId('funding')}
                      onMouseLeave={() => setActiveMilestoneId(null)}
                      tabIndex={0}
                      role="button"
                      aria-label="78% After Funding: Illustrative journey milestone"
                    >
                      <circle cx="330" cy="72" r="10" fill="#FF7518" className="ss-cs-dot-ring" />
                      <circle cx="330" cy="72" r="5" fill="#FFFFFF" stroke="#FF7518" strokeWidth="2.5" className="ss-cs-dot-core" />
                      <g transform="translate(294, 14)">
                        <rect
                          width="72"
                          height="42"
                          rx="10"
                          fill="#FFFFFF"
                          filter={activeMilestoneId === 'funding' ? "drop-shadow(0 4px 10px rgba(255,117,24,0.3))" : "drop-shadow(0 2px 6px rgba(45,21,56,0.08))"}
                          stroke={activeMilestoneId === 'funding' ? "#FF7518" : "#FFD6BA"}
                          strokeWidth="1.5"
                        />
                        <text x="36" y="20" fill={activeMilestoneId === 'funding' ? "#FF7518" : "#2D1538"} fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">78%</text>
                        <text x="36" y="33" fill="#7A5239" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">After Funding</text>
                      </g>

                      {activeMilestoneId === 'funding' && (
                        <g className="ss-cs-tooltip-bubble" transform="translate(265, -40)">
                          <rect width="130" height="48" rx="8" fill="#2D1538" />
                          <text x="65" y="18" fill="#FF7518" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">78% • After Funding</text>
                          <text x="65" y="32" fill="#FFFFFF" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Illustrative Milestone</text>
                          <text x="65" y="42" fill="#FFE5D1" fontSize="7" fontWeight="400" textAnchor="middle" fontFamily="sans-serif">DPR approved & funding cleared</text>
                          <polygon points="61,48 65,53 69,48" fill="#2D1538" />
                        </g>
                      )}
                    </g>

                    {/* Milestone 4: 97% Tip Indicator */}
                    <g
                      className={`ss-cs-point-group ss-cs-point-delay-4 ${isGraphVisible ? 'is-drawn' : ''} ${activeMilestoneId === 'satisfaction' ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveMilestoneId('satisfaction')}
                      onMouseLeave={() => setActiveMilestoneId(null)}
                      tabIndex={0}
                      role="button"
                      aria-label="97% Client Satisfaction: Verified satisfaction benchmark"
                    >
                      <circle cx="478" cy="22" r="10" fill="#FF7518" className="ss-cs-dot-ring" />
                      <circle cx="478" cy="22" r="6" fill="#FF7518" stroke="#FFFFFF" strokeWidth="2.5" className="ss-cs-dot-core" />
                    </g>
                  </svg>
                </div>
              </div>

            </div>

            {/* Middle: Testimonial Cards Grid (3 Equal-Height Cards matching Reference Design) */}
            <div className="ss-cs-cards-grid">

              {/* Card 1: Manufacturing (Raj Shekhar) */}
              <article className="ss-cs-card">
                <div
                  className="ss-cs-card-media"
                  onClick={() => setSelectedVideoModal(CLIENT_VIDEOS[0])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedVideoModal(CLIENT_VIDEOS[0]); } }}
                  aria-label="Play Raj Shekhar video testimonial"
                >
                  <span className="ss-cs-card-badge">
                    <Factory size={12} strokeWidth={2.4} />
                    <span>Manufacturing</span>
                  </span>

                  <img
                    className="ss-cs-card-img ss-cs-card-img-raj"
                    src="/images/stories/raj_shekhar_clean.jpg"
                    alt="Raj Shekhar — Founder, Strategic Scaling"
                    loading="lazy"
                  />

                  <div className="ss-cs-card-play-btn" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF7417">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </div>

                  <span className="ss-cs-card-duration">01:02</span>
                </div>

                <div className="ss-cs-card-content">
                  <div className="ss-cs-quote-badge" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF7417">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <p className="ss-cs-card-text">
                    &ldquo;Working with Growthora has been a game-changer for our business. Their strategic insights, professional approach and genuine commitment towards our growth have helped us scale with confidence.&rdquo;
                  </p>

                  <div className="ss-cs-card-footer">
                    <div className="ss-cs-author-info">
                      <h4 className="ss-cs-author-name">Raj Shekhar</h4>
                      <p className="ss-cs-author-designation">Founder, Strategic Scaling</p>
                    </div>

                    <button
                      type="button"
                      className="ss-cs-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideoModal(CLIENT_VIDEOS[0]);
                      }}
                      aria-label="Play Raj Shekhar video testimonial"
                    >
                      <ArrowUpRight size={17} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              </article>

              {/* Card 2: Foundation / NGO (Yoshita Saxena) */}
              <article className="ss-cs-card">
                <div
                  className="ss-cs-card-media"
                  onClick={() => setSelectedVideoModal(CLIENT_VIDEOS[1])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedVideoModal(CLIENT_VIDEOS[1]); } }}
                  aria-label="Play Yoshita Saxena video testimonial"
                >
                  <span className="ss-cs-card-badge">
                    <Handshake size={12} strokeWidth={2.4} />
                    <span>Foundation / NGO</span>
                  </span>

                  <img
                    className="ss-cs-card-img ss-cs-card-img-yoshita"
                    src="/images/stories/yoshita_saxena_clean.jpg"
                    alt="Yoshita Saxena — President, Kastha Foundation"
                    loading="lazy"
                  />

                  <div className="ss-cs-card-play-btn" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF7417">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </div>

                  <span className="ss-cs-card-duration">01:00</span>
                </div>

                <div className="ss-cs-card-content">
                  <div className="ss-cs-quote-badge" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF7417">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <p className="ss-cs-card-text">
                    &ldquo;Growthora helped Kastha Foundation navigate institutional support, grants, and compliance with utmost professionalism and speed.&rdquo;
                  </p>

                  <div className="ss-cs-card-footer">
                    <div className="ss-cs-author-info">
                      <h4 className="ss-cs-author-name">Yoshita Saxena</h4>
                      <p className="ss-cs-author-designation">President, Kastha Foundation</p>
                    </div>

                    <button
                      type="button"
                      className="ss-cs-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideoModal(CLIENT_VIDEOS[1]);
                      }}
                      aria-label="Play Yoshita Saxena video testimonial"
                    >
                      <ArrowUpRight size={17} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              </article>

              {/* Card 3: Technology (Pragnesh) */}
              <article className="ss-cs-card">
                <div
                  className="ss-cs-card-media"
                  onClick={() => setSelectedVideoModal(CLIENT_VIDEOS[2])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedVideoModal(CLIENT_VIDEOS[2]); } }}
                  aria-label="Play Pragnesh video testimonial"
                >
                  <span className="ss-cs-card-badge">
                    <Laptop size={12} strokeWidth={2.4} />
                    <span>Technology</span>
                  </span>

                  <img
                    className="ss-cs-card-img ss-cs-card-img-pragnesh"
                    src="/images/stories/pragnesh_clean.jpg"
                    alt="Pragnesh — Founder, Shikhodiya Technology"
                    loading="lazy"
                  />

                  <div className="ss-cs-card-play-btn" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF7417">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </div>

                  <span className="ss-cs-card-duration">00:53</span>
                </div>

                <div className="ss-cs-card-content">
                  <div className="ss-cs-quote-badge" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF7417">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <p className="ss-cs-card-text">
                    &ldquo;Growthora guided us step-by-step through technology enterprise certifications, MSME benefits, and business financing with full transparency.&rdquo;
                  </p>

                  <div className="ss-cs-card-footer">
                    <div className="ss-cs-author-info">
                      <h4 className="ss-cs-author-name">Pragnesh</h4>
                      <p className="ss-cs-author-designation">Founder, Shikhodiya Technology</p>
                    </div>

                    <button
                      type="button"
                      className="ss-cs-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideoModal(CLIENT_VIDEOS[2]);
                      }}
                      aria-label="Play Pragnesh video testimonial"
                    >
                      <ArrowUpRight size={17} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              </article>

            </div>

            {/* Bottom: Achievement Statistics Row in Premium White/Light-Orange Pill Theme */}
            <div className="ss-cs-stats-bar">
              <div className="ss-cs-stat-item">
                <div className="ss-cs-stat-icon-wrap" aria-hidden="true">
                  <Users size={24} strokeWidth={2} />
                </div>
                <div className="ss-cs-stat-text-group">
                  <span className="ss-cs-stat-num">{statsCounts.businesses.toLocaleString()}+</span>
                  <span className="ss-cs-stat-tag">Businesses Guided</span>
                </div>
              </div>

              <div className="ss-cs-stat-divider" aria-hidden="true" />

              <div className="ss-cs-stat-item">
                <div className="ss-cs-stat-icon-wrap" aria-hidden="true">
                  <Coins size={24} strokeWidth={2} />
                </div>
                <div className="ss-cs-stat-text-group">
                  <span className="ss-cs-stat-num">₹{statsCounts.loan}+ Cr</span>
                  <span className="ss-cs-stat-tag">Loan Approvals</span>
                </div>
              </div>

              <div className="ss-cs-stat-divider" aria-hidden="true" />

              <div className="ss-cs-stat-item">
                <div className="ss-cs-stat-icon-wrap" aria-hidden="true">
                  <Trophy size={24} strokeWidth={2} />
                </div>
                <div className="ss-cs-stat-text-group">
                  <span className="ss-cs-stat-num">{statsCounts.satisfaction}%</span>
                  <span className="ss-cs-stat-tag">Success Rate</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* 13. Case Study Details Modal */}
      {selectedCaseModal && (
        <div className="ss-video-modal-backdrop" onClick={() => setSelectedCaseModal(null)}>
          <div className="ss-video-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ss-video-modal-close"
              onClick={() => setSelectedCaseModal(null)}
              aria-label="Close Case Study Details"
            >
              <X size={20} />
            </button>

            <div style={{ padding: '36px 32px', color: '#FFFFFF' }}>
              <div className="ss-case-chips" style={{ marginBottom: '14px' }}>
                {selectedCaseModal.chips.map((c, i) => (
                  <span key={i} className="ss-case-chip">{c}</span>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--ss-font-heading)', fontSize: '28px', margin: '0 0 6px' }}>
                {selectedCaseModal.company}
              </h3>
              <p style={{ color: 'var(--ss-orange)', fontWeight: 700, margin: '0 0 20px' }}>
                {selectedCaseModal.scheme} &bull; {selectedCaseModal.amount}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px', lineHeight: 1.6, color: '#E2D9E8' }}>
                <p><strong>Challenge:</strong> {selectedCaseModal.challenge}</p>
                <p><strong>Advisory Strategy:</strong> {selectedCaseModal.strategy}</p>
                <p><strong>Measurable Outcome:</strong> {selectedCaseModal.outcome}</p>
              </div>

              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                <p style={{ fontStyle: 'italic', margin: 0, color: '#F3E8FA' }}>
                  &ldquo;{selectedCaseModal.quote}&rdquo;
                </p>
                <span style={{ display: 'block', fontSize: '13px', marginTop: '8px', color: '#BBAEC5' }}>
                  &mdash; {selectedCaseModal.founder}, {selectedCaseModal.founderRole}
                </span>
              </div>

              <div style={{ marginTop: '28px', display: 'flex', gap: '14px' }}>
                <button
                  type="button"
                  className="ss-btn-primary"
                  onClick={() => {
                    setSelectedCaseModal(null);
                    setIsConsultationOpen(true);
                  }}
                >
                  <span>Consult with Advisor</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Video Testimonial Modal */}
      {selectedVideoModal && (
        <div
          className="ss-video-modal-backdrop"
          onClick={() => setSelectedVideoModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedVideoModal.clientName || selectedVideoModal.name} Testimonial Video`}
        >
          <div className="ss-video-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ss-video-modal-close"
              onClick={() => setSelectedVideoModal(null)}
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <div className="ss-video-modal-player-wrap">
              <video
                src={selectedVideoModal.videoSrc || selectedVideoModal.videoUrl}
                controls
                autoPlay
                playsInline
                className="ss-modal-video-player"
              />
            </div>
            <div className="ss-video-modal-details">
              <h4>{selectedVideoModal.clientName || selectedVideoModal.name}</h4>
              <p>{selectedVideoModal.subtext || selectedVideoModal.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* 14. Global Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* 15. Reusable Global Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}

