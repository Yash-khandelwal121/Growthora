import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Search, Clock, Calendar, User, X } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogData';
import './blog-page.css';

export function BlogHero({ posts = BLOG_POSTS }) {
  const [mounted, setMounted] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trendingCategories = [
    'Government Scheme',
    'Startup Schemes',
    'Certifications',
    'Business Growth'
  ];

  // Dynamic content mapping from BLOG_POSTS dataset
  const activePosts = posts && posts.length > 0 ? posts : BLOG_POSTS;
  const mainFeatured = activePosts[0];

  // Dynamically compute 3 related recommendation posts
  const relatedPosts = useMemo(() => {
    if (!mainFeatured) return [];
    const matched = activePosts.filter(
      (post) =>
        post.id !== mainFeatured.id &&
        (post.category === mainFeatured.category ||
          (post.tags && mainFeatured.tags && post.tags.some((t) => mainFeatured.tags.includes(t))))
    );
    if (matched.length >= 3) return matched.slice(0, 3);
    const remaining = activePosts.filter(
      (post) => post.id !== mainFeatured.id && !matched.includes(post)
    );
    return [...matched, ...remaining].slice(0, 3);
  }, [mainFeatured, activePosts]);

  const handleFeaturedCardClick = (e) => {
    setShowRecommendations((prev) => !prev);
  };

  return (
    <section className={`blog-hero ${mounted ? 'is-visible' : ''}`}>
      <div className="blog-hero-container">
        
        {/* Left Side */}
        <div className="blog-hero-left">
          <div className="blog-breadcrumb">
            <a href="/">Home</a> / <span>Blog</span>
          </div>

          <div className="blog-eyebrow">
            GROWTHORA BLOG • BUSINESS RESOURCES
          </div>

          <h1 className="blog-main-heading">
            Ideas That Help<br />
            Businesses<br />
            <span className="blog-highlight-orange">Move Forward.</span>
          </h1>

          <p className="blog-description">
            Practical insights on funding, government schemes, business compliance, certifications and startup growth.
          </p>

          <div className="blog-search-wrapper">
            <div className="blog-search-input-container">
              <Search className="blog-search-icon" size={20} />
              <input 
                type="text" 
                className="blog-search-input" 
                placeholder="Search articles, schemes, funding, compliance..."
              />
              <button className="blog-search-btn">
                Search <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="blog-trending">
            <span className="blog-trending-label">Trending:</span>
            <div className="blog-trending-pills">
              {trendingCategories.map((cat, idx) => (
                <button key={idx} className="blog-category-pill">{cat}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className={`blog-hero-right ${showRecommendations ? 'recommendations-open' : 'recommendations-closed'}`}>
          
          {mainFeatured && (
            <div 
              className={`blog-featured-card ${showRecommendations ? 'is-active' : ''}`}
              onClick={handleFeaturedCardClick}
              role="button"
              tabIndex={0}
              aria-expanded={showRecommendations}
              title={showRecommendations ? "Click to hide recommendations" : "Click to view related recommendations"}
            >
              <a 
                href={mainFeatured.link || '/blog/make-in-india-2-0'} 
                className="blog-featured-img-wrap"
                onClick={(e) => e.stopPropagation()}
              >
                {mainFeatured.image && (
                  <img src={mainFeatured.image} alt={mainFeatured.title} className="blog-featured-img" />
                )}
              </a>
              <div className="blog-featured-content">
                <div className="blog-featured-meta">
                  <span className="blog-badge-featured">FEATURED</span>
                  <span className="blog-card-category">{mainFeatured.category}</span>
                </div>
                <a 
                  href={mainFeatured.link || '/blog/make-in-india-2-0'} 
                  className="blog-featured-title-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="blog-featured-title">{mainFeatured.title}</h2>
                </a>
                
                {/* Subtle Interactive Hint */}
                <div className="blog-featured-toggle-btn">
                  <span>{showRecommendations ? 'Hide recommendations ←' : 'Related Articles (3) →'}</span>
                </div>

                <a
                  href="https://growthora.co.in/blog/msme-innovative-scheme-incubation-ipr-design"
                  className="blog-featured-follow-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Follow this link →
                </a>

                <div className="blog-card-footer" onClick={(e) => e.stopPropagation()}>
                  <span className="blog-card-readtime">
                    <Calendar size={13} /> {mainFeatured.date} • <User size={13} /> {mainFeatured.author}
                  </span>
                  <a 
                    href={mainFeatured.link || '/blog/make-in-india-2-0'} 
                    className="blog-card-arrow-btn" 
                    aria-label={`Read ${mainFeatured.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Expandable Recommendation Panel */}
          <div className={`blog-mini-cards ${showRecommendations ? 'panel-open' : 'panel-closed'}`}>
            <div className="blog-mini-cards-header">
              <span className="blog-mini-cards-title">Recommended Articles</span>
              <button 
                type="button"
                className="blog-mini-cards-close" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRecommendations(false);
                }}
                aria-label="Close recommendations"
              >
                <X size={14} />
              </button>
            </div>

            {relatedPosts.map((card, idx) => (
              <a 
                key={card.id || idx} 
                href={card.link || '#'} 
                className={`blog-mini-card stagger-${idx + 1}`}
              >
                {card.image && (
                  <div className="blog-mini-card-img-wrap">
                    <img src={card.image} alt={card.title} className="blog-mini-card-img" />
                  </div>
                )}
                <div className="blog-mini-card-content">
                  <span className="blog-card-category">{card.category}</span>
                  <h3 className="blog-mini-title">{card.title}</h3>
                  <div className="blog-card-footer">
                    <span className="blog-card-readtime">
                      <Clock size={12} /> {card.date} • {card.author}
                    </span>
                    <span className="blog-card-arrow-btn">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}


