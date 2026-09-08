import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  BookOpen,
  Compass,
  TrendingUp,
  Clock,
  Calendar,
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  ShieldCheck,
  Building2,
  Mail,
  ChevronRight,
  HelpCircle,
  BarChart2
} from 'lucide-react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

import {
  INSIGHT_CATEGORIES,
  FEATURED_INSIGHT,
  LATEST_INSIGHTS,
  GRID_INSIGHTS,
  INSIGHTS_STATS,
  ALL_INSIGHTS
} from '../data/insightsData';

import '../styles/index.css';
import '../styles/animations.css';
import '../styles/insights.css';

export function InsightsPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskGrowthoraOpen, setIsAskGrowthoraOpen] = useState(false);

  // Live search dropdown state & refs
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [highlightedSearchIndex, setHighlightedSearchIndex] = useState(0);
  const searchContainerRef = useRef(null);

  // Selected article for reader modal
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState(null);

  // Sync category from URL search params on mount & browser back/forward navigation
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      const matchedCat = INSIGHT_CATEGORIES.find(
        (c) => c.toLowerCase() === catParam.toLowerCase()
      );
      if (matchedCat) {
        setSelectedCategory(matchedCat);
        return;
      }
    }
    setSelectedCategory('All');
  }, [searchParams]);

  // Sync route slug with selectedArticle & scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      const match = ALL_INSIGHTS.find((a) => a.slug === slug);
      if (match) {
        setSelectedArticle(match);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [slug]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    if (article && article.slug) {
      navigate(`/insights/${article.slug}`, { replace: false });
    }
  };

  const handleCloseArticleModal = () => {
    setSelectedArticle(null);
    const catParam = searchParams.get('category');
    if (catParam) {
      navigate(`/insights?category=${encodeURIComponent(catParam)}`, { replace: false });
    } else {
      navigate('/insights', { replace: false });
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);

    if (cat === 'All') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      setSearchParams(newParams, { replace: false });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('category', cat.toLowerCase());
      setSearchParams(newParams, { replace: false });
    }

    const el = document.getElementById('insights-grid-section');
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < 0 || rect.top > 250) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Filtered pool of articles matching selected category AND search query
  const filteredCategoryArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ALL_INSIGHTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!query) return matchesCategory;

      const matchesTitle = item.title?.toLowerCase().includes(query);
      const matchesDesc = item.description?.toLowerCase().includes(query);
      const matchesCat = item.category?.toLowerCase().includes(query);
      const matchesBadge = item.badge?.toLowerCase().includes(query);
      const matchesTag =
        item.overlayTag?.toLowerCase().includes(query) ||
        item.overlayText?.toLowerCase().includes(query);

      return matchesCategory && (matchesTitle || matchesDesc || matchesCat || matchesBadge || matchesTag);
    });
  }, [selectedCategory, searchQuery]);

  // Dynamic Featured Article based on category & search filter
  const activeFeaturedInsight = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery.trim()) {
      return FEATURED_INSIGHT;
    }
    return filteredCategoryArticles.length > 0 ? filteredCategoryArticles[0] : null;
  }, [selectedCategory, searchQuery, filteredCategoryArticles]);

  // Dynamic Latest Insights (up to 3 articles) based on category & search filter
  const activeLatestInsights = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery.trim()) {
      return LATEST_INSIGHTS;
    }
    if (filteredCategoryArticles.length > 1) {
      return filteredCategoryArticles.slice(1, 4);
    }
    return [];
  }, [selectedCategory, searchQuery, filteredCategoryArticles]);

  // Live search dropdown results (strictly A-Z sorted)
  const searchDropdownResults = useMemo(() => {
    return [...filteredCategoryArticles].sort((a, b) => a.title.localeCompare(b.title));
  }, [filteredCategoryArticles]);

  // Main grid output
  const filteredGridInsights = useMemo(() => {
    return filteredCategoryArticles;
  }, [filteredCategoryArticles]);

  // Click Outside & Escape key listener to close live dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchDropdownOpen(false);
      }
    };

    const handleKeyDownGlobal = (e) => {
      if (e.key === 'Escape') {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDownGlobal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, []);

  const handleSelectSearchItem = (article) => {
    setIsSearchDropdownOpen(false);
    handleArticleClick(article);
  };

  const handleSearchKeyDown = (e) => {
    if (!isSearchDropdownOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsSearchDropdownOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedSearchIndex((prev) =>
        prev < searchDropdownResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedSearchIndex((prev) =>
        prev > 0 ? prev - 1 : searchDropdownResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (
        searchDropdownResults.length > 0 &&
        highlightedSearchIndex >= 0 &&
        highlightedSearchIndex < searchDropdownResults.length
      ) {
        handleSelectSearchItem(searchDropdownResults[highlightedSearchIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsSearchDropdownOpen(false);
    }
  };

  // Parallax & Interactive 3D visual state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleHeroMouseMove = (e) => {
    if (typeof window !== 'undefined' && (window.matchMedia('(hover: none)').matches || window.innerWidth <= 768)) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const getLayerStyle = (depthFactor, baseRotateX = 0, baseRotateY = 0) => {
    if (!isHovered || (typeof window !== 'undefined' && window.innerWidth <= 768)) return {};
    const moveX = (mousePos.x * 16 * depthFactor).toFixed(2);
    const moveY = (mousePos.y * 14 * depthFactor).toFixed(2);
    const rotX = (-mousePos.y * 6 * depthFactor + baseRotateX).toFixed(2);
    const rotY = (mousePos.x * 6 * depthFactor + baseRotateY).toFixed(2);
    return {
      transform: `translate3d(${moveX}px, ${moveY}px, 0px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
    };
  };

  const scrollToGrid = () => {
    const el = document.getElementById('insights-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();

    if (!email) {
      setNewsletterMsg({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNewsletterMsg({ type: 'error', text: 'Please enter a valid email address format (e.g. name@company.com).' });
      return;
    }

    setNewsletterMsg({
      type: 'success',
      text: 'Thank you for subscribing to Growthora Insights! You will receive our latest advisory updates.'
    });
    setNewsletterEmail('');
  };

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  return (
    <div className="insights-root">
      {/* Header */}
      <Header
        onOpenConsultation={handleOpenConsultation}
        onOpenAskGrowthora={() => setIsAskGrowthoraOpen(true)}
      />

      {/* ─── HERO SECTION ─── */}
      <section className="insights-hero">
        <div className="insights-container">
          <div className="insights-hero-layout">
            
            {/* Left Content */}
            <div className="insights-hero-left">
              <div className="insights-hero-eyebrow animate-fade-in-up">
                <Sparkles size={14} className="eyebrow-sparkle" />
                <span>GROWTHORA INSIGHTS</span>
              </div>

              <h1 className="insights-hero-title animate-title-reveal">
                <span className="title-line title-line-1">Clarity for the decisions</span>{' '}
                <span className="title-line title-line-2">
                  that <span className="highlight-orange">grow your business.</span>
                </span>
              </h1>

              <p className="insights-hero-subtitle animate-fade-in-delayed">
                Practical insights on funding, compliance, strategy and growth for Indian founders.
              </p>

              {/* 3 Support Points */}
              <div className="insights-hero-points">
                <div className="insights-hero-point point-stagger-1">
                  <div className="insights-point-icon">
                    <BookOpen size={18} />
                  </div>
                  <span className="insights-point-text">Expert-backed analysis</span>
                </div>

                <div className="insights-hero-point point-stagger-2">
                  <div className="insights-point-icon">
                    <Compass size={18} />
                  </div>
                  <span className="insights-point-text">India-focused insights</span>
                </div>

                <div className="insights-hero-point point-stagger-3">
                  <div className="insights-point-icon">
                    <TrendingUp size={18} />
                  </div>
                  <span className="insights-point-text">Actionable takeaways</span>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="insights-hero-actions point-stagger-3">
                <button
                  type="button"
                  className="insights-btn-primary"
                  onClick={scrollToGrid}
                >
                  <span>Explore Insights</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="insights-btn-secondary"
                  onClick={handleOpenConsultation}
                >
                  <span>Book Advisory</span>
                </button>
              </div>

              {/* Bottom Bharat Accent Tag */}
              <div className="hero-bharat-accent">
                <span className="accent-line" />
                <span className="accent-text">For a Stronger Bharat</span>
              </div>
            </div>

            {/* Right Editorial Visual 3D Stage Composition (Two-View Rotating Object) */}
            <div
              className="insights-hero-visual-wrapper"
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
            >
              <div className="insights-hero-stage" style={getLayerStyle(1.0)}>
                
                {/* Soft Ambient Radial Glow Backdrop */}
                <div className="insights-glow-backdrop" />

                {/* Layer 0: Rotating Translucent Orange Ring & Micro-grid */}
                <div className="insights-orange-ring">
                  <svg viewBox="0 0 400 400" className="insights-ring-svg">
                    <circle cx="200" cy="200" r="175" stroke="rgba(240, 99, 30, 0.28)" strokeWidth="1.5" strokeDasharray="8 8" fill="none" />
                    <circle cx="200" cy="200" r="140" stroke="rgba(240, 99, 30, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="200" cy="200" r="105" stroke="rgba(240, 99, 30, 0.08)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                  </svg>
                </div>
                <div className="insights-micro-grid" />

                {/* Top Right Cursive Annotation */}
                <div className="cursive-annotation top-cursive">
                  <div className="cursive-line-1">Knowledge today</div>
                  <div className="cursive-line-2">
                    Growth tomorrow <span className="cursive-arrow">↗</span>
                  </div>
                </div>

                {/* 3D Rotating Flipper Box */}
                <div className="insights-3d-flipper">
                  
                  {/* ─── FACE 1: EDITORIAL / INSIGHTS VIEW ─── */}
                  <div className="flipper-face face-front">
                    {/* Back Document Card */}
                    <div className="insights-back-card card-depth-back" />

                    {/* Central 3D Editorial Glass Card */}
                    <div className="insights-main-3d-card">
                      {/* Left Section */}
                      <div className="main-card-left-section">
                        <div className="main-card-orange-badge">
                          <div className="badge-3d-bars">
                            <span className="badge-bar bar-1" />
                            <span className="badge-bar bar-2" />
                            <span className="badge-bar bar-3" />
                          </div>
                        </div>
                        <div className="main-card-text-block">
                          <div className="brand-word word-ideas">Ideas</div>
                          <div className="brand-word word-insights">Insights</div>
                          <div className="brand-word word-impact">Impact</div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="main-card-divider" />

                      {/* Right Category Stack */}
                      <div className="main-card-pills-stack">
                        <div className="interactive-pill pill-funding">
                          <span className="pill-dot-bullet" />
                          <span className="pill-label">Funding</span>
                        </div>
                        <div className="interactive-pill pill-strategy">
                          <span className="pill-dot-bullet" />
                          <span className="pill-label">Strategy</span>
                        </div>
                        <div className="interactive-pill pill-compliance">
                          <span className="pill-dot-bullet" />
                          <span className="pill-label">Compliance</span>
                        </div>
                        <div className="interactive-pill pill-growth">
                          <span className="pill-dot-bullet" />
                          <span className="pill-label">Growth</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating 3D Icon Badges */}
                    <div className="floating-3d-icon icon-lightbulb float-idle-1">
                      <Sparkles size={18} color="#F0631E" />
                    </div>
                    <div className="floating-3d-icon icon-shield float-idle-2">
                      <ShieldCheck size={18} color="#10192B" />
                    </div>
                    <div className="floating-3d-icon icon-book float-idle-3">
                      <BookOpen size={18} color="#10192B" />
                    </div>
                    <div className="floating-3d-icon icon-chart float-idle-4">
                      <TrendingUp size={18} color="#F0631E" />
                    </div>
                  </div>

                  {/* ─── FACE 2: GROWTH TRAJECTORY VIEW (SPACIOUS & UNCLIPPED) ─── */}
                  <div className="flipper-face face-back">
                    <div className="insights-growth-graph-card">
                      
                      {/* Card Header */}
                      <div className="graph-card-header">
                        <div className="graph-title-box">
                          <div className="graph-badge-icon">
                            <BarChart2 size={16} color="#F0631E" />
                          </div>
                          <div>
                            <span className="card-tag-label">GROWTH TRAJECTORY</span>
                            <span className="card-sub-label">Indian Founder Performance</span>
                          </div>
                        </div>

                        <span className="card-growth-pill">
                          <span className="live-pulse-dot" />
                          <span>+240% YoY</span>
                        </span>
                      </div>

                      {/* Main Unclipped SVG Graph */}
                      <div className="insights-chart-box-spacious">
                        <svg viewBox="0 0 350 150" className="insights-chart-svg-full">
                          {/* Grid Lines */}
                          <line x1="0" y1="28" x2="350" y2="28" stroke="rgba(16,25,43,0.06)" strokeDasharray="4 4" />
                          <line x1="0" y1="65" x2="350" y2="65" stroke="rgba(16,25,43,0.06)" strokeDasharray="4 4" />
                          <line x1="0" y1="102" x2="350" y2="102" stroke="rgba(16,25,43,0.06)" strokeDasharray="4 4" />

                          {/* Column 1: Compliance — ₹30L */}
                          <g className="chart-col col-1">
                            <text x="32" y="91" fontSize="9.5" fontWeight="800" fill="#475569" textAnchor="middle" className="bar-val-text val-1">₹30L</text>
                            <rect x="22" y="97" width="20" height="18" rx="4" fill="rgba(240, 99, 30, 0.3)" className="chart-bar-face2 face2-bar-1" />
                            <text x="32" y="132" fontSize="8.5" fontWeight="700" fill="#64748B" textAnchor="middle">Compliance</text>
                            <title>Compliance — ₹30L</title>
                          </g>

                          {/* Column 2: Loan — ₹2 Cr */}
                          <g className="chart-col col-2">
                            <text x="98" y="73" fontSize="9.5" fontWeight="800" fill="#475569" textAnchor="middle" className="bar-val-text val-2">₹2 Cr</text>
                            <rect x="88" y="79" width="20" height="36" rx="4" fill="rgba(240, 99, 30, 0.5)" className="chart-bar-face2 face2-bar-2" />
                            <text x="98" y="132" fontSize="8.5" fontWeight="700" fill="#64748B" textAnchor="middle">Loan</text>
                            <title>Loan — ₹2 Cr</title>
                          </g>

                          {/* Column 3: Subsidy — ₹15 Cr */}
                          <g className="chart-col col-3">
                            <text x="164" y="53" fontSize="9.5" fontWeight="800" fill="#475569" textAnchor="middle" className="bar-val-text val-3">₹15 Cr</text>
                            <rect x="154" y="59" width="20" height="56" rx="4" fill="rgba(240, 99, 30, 0.7)" className="chart-bar-face2 face2-bar-3" />
                            <text x="164" y="132" fontSize="8.5" fontWeight="700" fill="#64748B" textAnchor="middle">Subsidy</text>
                            <title>Subsidy — ₹15 Cr</title>
                          </g>

                          {/* Column 4: Funding — ₹75 Cr */}
                          <g className="chart-col col-4">
                            <text x="230" y="33" fontSize="9.5" fontWeight="800" fill="#475569" textAnchor="middle" className="bar-val-text val-4">₹75 Cr</text>
                            <rect x="220" y="39" width="20" height="76" rx="4" fill="rgba(240, 99, 30, 0.85)" className="chart-bar-face2 face2-bar-4" />
                            <text x="230" y="132" fontSize="8.5" fontWeight="700" fill="#64748B" textAnchor="middle">Funding</text>
                            <title>Funding — ₹75 Cr</title>
                          </g>

                          {/* Column 5: Registration — ₹205 Cr (Emphasized Peak Point) */}
                          <g className="chart-col col-5">
                            <text x="296" y="11" fontSize="10.5" fontWeight="900" fill="#F0631E" textAnchor="middle" className="bar-val-text val-5">₹205 Cr</text>
                            <rect x="286" y="17" width="20" height="98" rx="4" fill="#F0631E" className="chart-bar-face2 face2-bar-5" />
                            <text x="296" y="132" fontSize="8.5" fontWeight="800" fill="#F0631E" textAnchor="middle">Registration</text>
                            <title>Registration — ₹205 Cr</title>
                          </g>

                          {/* Navy Trend Line */}
                          <path
                            d="M 32 97 L 98 79 L 164 59 L 230 39 L 296 17"
                            fill="none"
                            stroke="#10192B"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="chart-line-face2"
                          />

                          {/* Peak Circle Indicator */}
                          <circle cx="296" cy="17" r="5.5" fill="#F0631E" stroke="#FFFFFF" strokeWidth="2.5" className="chart-dot-face2" />
                        </svg>
                      </div>

                      {/* Card Footer Metric Strip */}
                      <div className="graph-card-footer">
                        <div className="footer-metric">
                          <span className="metric-lbl">Avg Growth Rate</span>
                          <span className="metric-val">3.4x</span>
                        </div>
                        <div className="footer-metric">
                          <span className="metric-lbl">Compliance Rate</span>
                          <span className="metric-val">99.8%</span>
                        </div>
                        <div className="footer-metric">
                          <span className="metric-lbl">Strategy Outcome</span>
                          <span className="metric-val">Strong</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FILTER BAR & SEARCH ─── */}
      <section id="insights-grid-section" className="insights-filter-section">
        <div className="insights-container">
          <div className="insights-filter-row">
            
            {/* Category Pills */}
            <div className="insights-categories-scroll" role="tablist" aria-label="Insight Categories">
              {INSIGHT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`insights-category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box with Live Dropdown */}
            <div ref={searchContainerRef} className="insights-search-box">
              <Search className="insights-search-icon" size={16} />
              <input
                type="text"
                className="insights-search-input"
                placeholder="Search insights..."
                value={searchQuery}
                onFocus={() => {
                  setIsSearchDropdownOpen(true);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                  setHighlightedSearchIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                aria-expanded={isSearchDropdownOpen}
                aria-haspopup="listbox"
              />

              {searchQuery && (
                <button
                  type="button"
                  className="insights-clear-search"
                  onClick={() => {
                    setSearchQuery('');
                    setHighlightedSearchIndex(0);
                    setIsSearchDropdownOpen(false);
                  }}
                  aria-label="Clear search query"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}

              {/* Live Search Dropdown Panel */}
              {isSearchDropdownOpen && searchQuery.trim() !== '' && (
                <div className="insights-search-dropdown" role="listbox">
                  {searchDropdownResults.length > 0 ? (
                    <div className="insights-dropdown-results-header">
                      <span>{searchDropdownResults.length} {searchDropdownResults.length === 1 ? 'article' : 'articles'} found (Sorted A–Z)</span>
                    </div>
                  ) : null}

                  {searchDropdownResults.length > 0 ? (
                    searchDropdownResults.map((item, index) => (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={highlightedSearchIndex === index}
                        className={`insights-search-result-item ${
                          highlightedSearchIndex === index ? 'highlighted' : ''
                        }`}
                        onMouseEnter={() => setHighlightedSearchIndex(index)}
                        onClick={() => handleSelectSearchItem(item)}
                      >
                        <div className="insights-search-result-info">
                          <div className="insights-search-result-title">{item.title}</div>
                          <div className="insights-search-result-meta">
                            <span className="insights-search-result-badge">{item.badge || item.category}</span>
                            <span className="insights-meta-dot" />
                            <Clock size={12} />
                            <span>{item.readTime}</span>
                          </div>
                        </div>
                        <ChevronRight className="insights-search-result-arrow" size={16} />
                      </div>
                    ))
                  ) : (
                    <div className="insights-search-empty-state">
                      <HelpCircle size={22} className="insights-empty-icon-sub" />
                      <p className="insights-empty-title">No insights found</p>
                      <span className="insights-empty-desc">
                        We couldn't find any articles matching "{searchQuery}". Try searching for funding, compliance, tax, or ISO.
                      </span>
                      <button
                        type="button"
                        className="insights-empty-reset-btn"
                        onClick={() => {
                          setSearchQuery('');
                          handleCategoryClick('All');
                          setIsSearchDropdownOpen(false);
                        }}
                      >
                        Reset Search & Filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ─── FEATURED INSIGHT SECTION ─── */}
      {activeFeaturedInsight && (
        <section className="insights-featured-section">
          <div className="insights-container">
            <div className="insights-section-eyebrow">
              <span style={{ fontSize: '1rem', color: '#FF7200', fontWeight: 'bold' }}>⊕</span>
              <span>
                {selectedCategory !== 'All'
                  ? `FEATURED IN ${selectedCategory.toUpperCase()}`
                  : 'FEATURED INSIGHT'}
              </span>
            </div>

            <div className="insights-featured-grid">
              
              {/* Left Featured Article Card */}
              <div
                className="insights-featured-card"
                onClick={() => handleArticleClick(activeFeaturedInsight)}
              >
                <div className="insights-featured-img-wrap">
                  <img
                    src={activeFeaturedInsight.image}
                    alt={activeFeaturedInsight.title}
                    className="insights-featured-img"
                    width="600"
                    height="375"
                    loading="eager"
                    decoding="async"
                    style={{
                      objectFit: activeFeaturedInsight.objectFit || 'cover',
                      objectPosition: activeFeaturedInsight.objectPosition || 'top center'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/growthora_industries_hero_building.jpg';
                    }}
                  />
                  {activeFeaturedInsight.overlayText && (
                    <div className="insights-featured-overlay-badge">
                      {activeFeaturedInsight.overlayText}
                    </div>
                  )}
                </div>

                <div className="insights-featured-body">
                  <span className="insights-badge">{activeFeaturedInsight.badge}</span>
                  <h2 className="insights-featured-title">{activeFeaturedInsight.title}</h2>
                  <p className="insights-featured-desc">{activeFeaturedInsight.description}</p>

                  <div className="insights-card-meta">
                    <Clock size={14} />
                    <span>{activeFeaturedInsight.readTime}</span>
                    <span className="insights-meta-dot" />
                    <Calendar size={14} />
                    <span>{activeFeaturedInsight.date}</span>
                  </div>

                  <button type="button" className="insights-btn-read">
                    <span>Read Insight</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Right Latest Insights Column */}
              {activeLatestInsights.length > 0 && (
                <div className="insights-latest-col">
                  <div className="insights-section-eyebrow" style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '1rem', color: '#FF7200', fontWeight: 'bold' }}>⊕</span>
                    <span>
                      {selectedCategory !== 'All'
                        ? `MORE IN ${selectedCategory.toUpperCase()}`
                        : 'LATEST INSIGHTS'}
                    </span>
                  </div>

                  {activeLatestInsights.map((item) => (
                    <div
                      key={item.id}
                      className="insights-latest-card"
                      onClick={() => handleArticleClick(item)}
                    >
                      <div className="insights-latest-thumb-wrap">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="insights-latest-thumb"
                          width="160"
                          height="100"
                          loading="lazy"
                          decoding="async"
                          style={{
                            objectFit: item.objectFit || 'cover',
                            objectPosition: item.objectPosition || 'top center'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/services/ff_meeting.jpg';
                          }}
                        />
                      </div>

                      <div className="insights-latest-content">
                        <span className="insights-badge">{item.badge}</span>
                        <h3 className="insights-latest-title">{item.title}</h3>
                        <div className="insights-card-meta" style={{ marginBottom: 0 }}>
                          <Clock size={13} />
                          <span>{item.readTime}</span>
                          <span className="insights-meta-dot" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <ArrowRight className="insights-latest-arrow" size={18} />
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* ─── MAIN INSIGHTS GRID ─── */}
      <section className="insights-grid-section">
        <div className="insights-container">
          
          <div className="insights-grid-header">
            <div className="insights-grid-title-group">
              <div className="insights-section-eyebrow" style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '1rem', color: '#FF7200', fontWeight: 'bold' }}>⊕</span>
                <span>
                  {selectedCategory !== 'All'
                    ? `${selectedCategory.toUpperCase()} INSIGHTS (${filteredGridInsights.length})`
                    : 'EXPLORE INSIGHTS'}
                </span>
              </div>
              <h2>
                {selectedCategory !== 'All'
                  ? `${selectedCategory} Articles & Analysis`
                  : 'Ideas, insights and opportunities'}
              </h2>
              <p className="insights-grid-subtitle">
                {selectedCategory !== 'All'
                  ? `Showing all ${filteredGridInsights.length} ${selectedCategory.toLowerCase()} articles from our growth database.`
                  : 'In-depth articles, guides and analysis to help you build, comply and grow.'}
              </p>
            </div>

            {(selectedCategory !== 'All' || searchQuery !== '') && (
              <div
                className="insights-view-all-link"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryClick('All');
                }}
              >
                <span>View all insights</span>
                <ArrowRight size={16} />
              </div>
            )}
          </div>

          {/* Grid Output */}
          {filteredGridInsights.length > 0 ? (
            <div className="insights-grid">
              {filteredGridInsights.map((item) => (
                <div
                  key={item.id}
                  className="insights-card"
                  onClick={() => handleArticleClick(item)}
                >
                  <div className="insights-card-img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="insights-card-img"
                      width="400"
                      height="250"
                      loading="lazy"
                      decoding="async"
                      style={{
                        objectFit: item.objectFit || 'cover',
                        objectPosition: item.objectPosition || 'top center'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/services/card_reg_pvt_ltd.jpg';
                      }}
                    />
                    {item.overlayTag && (
                      <div className="insights-card-tag-overlay">
                        {item.overlayTag}
                      </div>
                    )}
                  </div>

                  <div className="insights-card-body">
                    <span className="insights-badge">{item.badge}</span>
                    <h3 className="insights-card-title">{item.title}</h3>
                    <p className="insights-card-desc">{item.description}</p>

                    <div className="insights-card-footer">
                      <div className="insights-card-meta" style={{ marginBottom: 0 }}>
                        <Clock size={13} />
                        <span>{item.readTime}</span>
                        <span className="insights-meta-dot" />
                        <span>{item.date}</span>
                      </div>

                      <div className="insights-card-footer-arrow">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="insights-empty-state">
              <div className="insights-empty-icon">
                <Search size={24} />
              </div>
              <h3>No insights found</h3>
              <p>We couldn't find any articles matching "{searchQuery}". Try searching another keyword or clearing filters.</p>
              <button
                type="button"
                className="insights-empty-reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryClick('All');
                }}
              >
                Reset Search & Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ─── STATS / TRUST STRIP ─── */}
      <section className="insights-stats-strip">
        <div className="insights-container">
          <div className="insights-stats-grid">
            
            <div className="insights-stat-item">
              <div className="insights-stat-icon-wrap">
                <BookOpen size={26} />
              </div>
              <div>
                <div className="insights-stat-num">40+</div>
                <div className="insights-stat-label">Insights</div>
                <div className="insights-stat-subtext">In-depth articles & guides</div>
              </div>
            </div>

            <div className="insights-stat-item">
              <div className="insights-stat-icon-wrap">
                <Layers size={26} />
              </div>
              <div>
                <div className="insights-stat-num">5</div>
                <div className="insights-stat-label">Key Topics</div>
                <div className="insights-stat-subtext">Funding, Compliance, Strategy & more</div>
              </div>
            </div>

            <div className="insights-stat-item">
              <div className="insights-stat-icon-wrap">
                <Award size={26} />
              </div>
              <div>
                <div className="insights-stat-num" style={{ fontSize: '1.4rem' }}>Built for</div>
                <div className="insights-stat-label" style={{ fontSize: '1.3rem', color: '#FF7200' }}>Founders</div>
                <div className="insights-stat-subtext">Real insights. Real impact.</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER SECTION ─── */}
      <section className="insights-newsletter-section">
        <div className="insights-container">
          <div className="insights-newsletter-card">
            
            <div className="insights-newsletter-content">
              <div className="insights-section-eyebrow" style={{ marginBottom: '8px' }}>
                <Mail size={14} />
                <span>STAY UPDATED</span>
              </div>
              <h3>Get the latest insights in your inbox</h3>
              <p>No spam. Just practical insights for your business growth.</p>
            </div>

            <div className="insights-newsletter-form-wrap">
              <form className="insights-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="insights-newsletter-input"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="insights-newsletter-btn">
                  <span>Subscribe</span>
                  <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
                </button>
              </form>

              {newsletterMsg && (
                <div className={`insights-newsletter-msg ${newsletterMsg.type}`}>
                  {newsletterMsg.text}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ─── FINAL CTA SECTION ─── */}
      <section className="insights-cta-section">
        <div className="insights-container">
          <div className="insights-cta-card">
            <div className="insights-cta-bg-accent" />

            <div className="insights-cta-grid">
              
              <div className="insights-cta-content">
                <h2>Have a business decision to make?</h2>
                <p>Get expert guidance on funding, compliance, strategy and growth.</p>

                <div className="insights-cta-bullets">
                  <div className="insights-cta-bullet">
                    <div className="insights-cta-bullet-icon">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="insights-cta-bullet-text">Personalized advice</span>
                  </div>

                  <div className="insights-cta-bullet">
                    <div className="insights-cta-bullet-icon">
                      <ShieldCheck size={16} />
                    </div>
                    <span className="insights-cta-bullet-text">Sector-specific expertise</span>
                  </div>

                  <div className="insights-cta-bullet">
                    <div className="insights-cta-bullet-icon">
                      <Building2 size={16} />
                    </div>
                    <span className="insights-cta-bullet-text">End-to-end support</span>
                  </div>
                </div>
              </div>

              <div className="insights-cta-action-col">
                <button
                  type="button"
                  className="insights-btn-cta"
                  onClick={handleOpenConsultation}
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight size={18} />
                </button>

                <div className="insights-cta-doodle">
                  <span>Let's Build What's Next ↗</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE READER MODAL ─── */}
      {selectedArticle && (
        <div
          className="insights-modal-overlay"
          onClick={handleCloseArticleModal}
        >
          <div
            className="insights-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="insights-modal-close"
              onClick={handleCloseArticleModal}
            >
              <X size={20} />
            </button>

            <div className="insights-modal-header">
              <span className="insights-badge">{selectedArticle.badge}</span>
              <h2 className="insights-modal-title">{selectedArticle.title}</h2>
              <div className="insights-card-meta">
                <Clock size={14} />
                <span>{selectedArticle.readTime}</span>
                <span className="insights-meta-dot" />
                <Calendar size={14} />
                <span>{selectedArticle.date}</span>
                {selectedArticle.author && (
                  <>
                    <span className="insights-meta-dot" />
                    <span>By {selectedArticle.author}</span>
                  </>
                )}
              </div>
            </div>

            <div className="insights-modal-img-wrap">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="insights-modal-img"
                width="800"
                height="500"
                loading="eager"
                decoding="async"
                style={{
                  objectFit: selectedArticle.objectFit || 'cover',
                  objectPosition: selectedArticle.objectPosition || 'top center'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/services/card_reg_pvt_ltd.jpg';
                }}
              />
            </div>

            <div className="insights-modal-intro">
              {selectedArticle.description}
            </div>

            {selectedArticle.content && (
              <>
                {selectedArticle.content.introduction && (
                  <div className="insights-modal-section">
                    <p>{selectedArticle.content.introduction}</p>
                  </div>
                )}

                {selectedArticle.content.sections?.map((sec, idx) => (
                  <div key={idx} className="insights-modal-section">
                    <h4>{sec.heading}</h4>
                    <p>{sec.body}</p>
                  </div>
                ))}

                {selectedArticle.content.takeaways && (
                  <div className="insights-modal-takeaways">
                    <h5>Key Takeaways for Founders</h5>
                    <ul>
                      {selectedArticle.content.takeaways.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            <div className="insights-modal-cta-box">
              <p>Need customized advisory for your venture?</p>
              <button
                type="button"
                className="insights-btn-read"
                onClick={() => {
                  setSelectedArticle(null);
                  handleOpenConsultation();
                }}
              >
                <span>Book Consultation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Standalone Consultation Modal */}
      {isConsultationOpen && (
        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
        />
      )}

      {/* Ask Growthora AI Assistant Modal */}
      {isAskGrowthoraOpen && (
        <AskGrowthoraModal
          isOpen={isAskGrowthoraOpen}
          onClose={() => setIsAskGrowthoraOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default InsightsPage;
