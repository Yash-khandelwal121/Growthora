import React, { useMemo, useState, useEffect } from "react";

const flyers = [
  {
    id: 1,
    title: "MSME Registration",
    category: "Government Schemes",
    subtitle: "Register | Grow | Get Government Benefits",
    image: "/Msme2.png",
    description:
      "Get your business officially registered under Udyam and explore access to government schemes, financial support, incentives and business growth opportunities.",
    highlights: [
      {
        title: "Udyam Registration",
        text: "Quick & Hassle-Free Process"
      },
      {
        title: "Access to Government Schemes",
        text: "Subsidies, Incentives & Support"
      },
      {
        title: "Enhanced Business Credibility",
        text: "Build Trust with Clients & Banks"
      },
      {
        title: "Easier Loan Approval",
        text: "Better Financial Opportunities"
      }
    ],
    link: "https://growthora.co.in/services/registration/msme-udyam"
  },
  {
    id: 2,
    title: "Startup India",
    category: "Startup",
    subtitle: "Innovate | Register | Scale with Government Support",
    image: "/startupindia.png",
    description:
      "Startup India recognition can help eligible startups access government incentives, tax benefits, funding opportunities, incubation support and a stronger entrepreneurial ecosystem.",
    highlights: [
      {
        title: "Recognized Startup",
        text: "Get DPIIT Recognition"
      },
      {
        title: "Access to Benefits",
        text: "Incentives, Tax Exemptions & Schemes"
      },
      {
        title: "Funding Opportunities",
        text: "Grants, Incubation & Investor Connect"
      },
      {
        title: "Grow Your Business",
        text: "Mentorship, Networking & Exposure"
      }
    ],
    link: "https://growthora.co.in/schemes/startup-india-seed-fund"
  },
  {
    id: 3,
    title: "PMEGP Loan Scheme",
    category: "Government Schemes",
    subtitle: "Finance Your Business Dreams with Government Support",
    image: "/pmgppng.png",
    description:
      "PMEGP supports new micro enterprises through bank-linked financial assistance and government subsidy support for eligible manufacturing and service-sector projects.",
    highlights: [
      {
        title: "Financial Support",
        text: "Support for New Business Setup"
      },
      {
        title: "Eligible Applicants",
        text: "Individuals, SHGs, Trusts & More"
      },
      {
        title: "Manufacturing & Service",
        text: "Wide Range of Activities Covered"
      },
      {
        title: "Government Backed",
        text: "Support for Self-Employment"
      }
    ],
    link: "https://growthora.co.in/schemes/pmegp"
  },
  {
    id: 4,
    title: "Business Advisory",
    category: "Business Advisory",
    subtitle: "Expert Guidance for Your Business Growth",
    image: "/Buisness.png",
    description:
      "Our business advisory support helps entrepreneurs and growing companies make better strategic decisions, improve operations and build a clear roadmap for sustainable growth.",
    highlights: [
      {
        title: "Strategic Guidance",
        text: "Business Planning & Growth Strategy"
      },
      {
        title: "Personalized Solutions",
        text: "As per Your Business Needs"
      },
      {
        title: "End-to-End Support",
        text: "From Idea to Implementation"
      },
      {
        title: "Industry Expertise",
        text: "Practical Insights for Sustainable Growth"
      }
    ],
    link: ""
  },
  {
    id: 5,
    title: "Government Schemes",
    category: "Government Schemes",
    subtitle: "Explore | Apply | Grow with Government Support",
    image: "/goverment2.png",
    description:
      "Discover suitable central and state government schemes for your business and get structured support for eligibility assessment, documentation, applications and available incentives.",
    highlights: [
      {
        title: "Wide Range of Schemes",
        text: "Central & State Government"
      },
      {
        title: "Identify the Right Scheme",
        text: "As per Your Business Needs"
      },
      {
        title: "End-to-End Support",
        text: "Application, Documentation & Follow-up"
      },
      {
        title: "Subsidies & Incentives",
        text: "Financial Support for Your Growth"
      }
    ],
    link: "https://growthora.co.in/schemes"
  },
  {
    id: 6,
    title: "Taxation Services",
    category: "Taxation",
    subtitle: "Compliant Business | Reduced Liabilities | Peace of Mind",
    image: "/Taxation.png",
    description:
      "Stay compliant and manage your tax responsibilities with structured support for registrations, return filing, tax planning and ongoing regulatory assistance.",
    highlights: [
      {
        title: "Tax Registration",
        text: "PAN, TAN, GST & Other Registrations"
      },
      {
        title: "Tax Filing & Compliance",
        text: "Income Tax, GST, TDS & More"
      },
      {
        title: "Tax Planning",
        text: "Optimize Tax Liabilities Legally"
      },
      {
        title: "Expert Support",
        text: "End-to-End Assistance"
      }
    ],
    link: "https://growthora.co.in/schemes/80-iac-tax-exemption"
  },
  {
    id: 7,
    title: "ISO Certification",
    category: "Certifications",
    subtitle: "Build Trust | Ensure Quality | Grow Your Business",
    image: "/iso.png",
    description:
      "Strengthen your business credibility and quality systems with structured support for applicable ISO standards, documentation, implementation and certification readiness.",
    highlights: [
      {
        title: "Global Recognition",
        text: "Enhance Business Credibility"
      },
      {
        title: "Multiple ISO Standards",
        text: "ISO 9001, 14001, 45001 & More"
      },
      {
        title: "Expert Guidance",
        text: "End-to-End Certification Support"
      },
      {
        title: "Applicable for Businesses",
        text: "Manufacturing, Services & Startups"
      }
    ],
    link: "https://growthora.co.in/services/certifications"
  },
  {
    id: 8,
    title: "Digital Marketing",
    category: "Business Advisory",
    subtitle: "Grow Your Brand | Reach More Customers | Drive Real Results",
    image: "/digital.png",
    description:
      "Build a stronger digital presence with strategic marketing focused on brand visibility, customer acquisition, content, search performance and measurable business growth.",
    highlights: [
      {
        title: "Strategic Marketing",
        text: "Tailored Strategies for Your Business"
      },
      {
        title: "Brand Visibility",
        text: "Increase Awareness & Engagement"
      },
      {
        title: "Multi-Channel Campaigns",
        text: "Social Media, Search, Content & More"
      },
      {
        title: "Measurable Results",
        text: "Data-Driven Growth & ROI"
      }
    ],
    link: "https://growthora.co.in/services/branding"
  }
];

const media = [
  {
    id: 1,
    video: "/growthoravideo.mp4",
  },
  {
    id: 2,
    title: "Team Celebrations",
    category: "Team",
    duration: "01:30",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    video: "/nikhil award .mp4",
  },
  {
    id: 4,
    title: "Office Tour",
    category: "Office",
    duration: "01:12",
    video: "/officetour.mp4",
  },
  {
    id: 5,
    title: "Client Testimonial",
    category: "Client Testimonials",
    duration: "01:20",
    video: "/Raj Shekhar Testimonial reel 2.mp4",
  },
];

const albums = [
  {
    title: "Team",
    count: "5 Photos",
    category: "Team",
    images: [
      "/office space.webp",
      "/office image 6.webp",
      "/office image 5.webp",
      "/office image 3.webp",
      "/office image 2.webp",
    ],
  },
  {
    title: "Office Space",
    category: "Office",
    images: [
      "/officetour.mp4"
    ],
  },

  {
    title: "Awards & Recognition",
    count: "4 Photos",
    category: "Awards",
    images: [
      "/nikhil award .mp4",
      "/award photo.png",
      "/awardphoto2.webp",
      "/awardphoto3.webp",
    ],
  },


  {
    title: "Office Culture",
    count: "26 Photos",
    category: "Team",
    images: [
      "/office image 5.webp"
    ],
  },


];

const flyerFilters = [
  "All",
  "Government Schemes",
  "Business Advisory",
  "Funding & Finance",
  "Startup",
  "Taxation",
  "Certifications",
];

const mediaFilters = [
  "All",
  "Events",
  "Team",
  "Office",
  "Awards",
  "Client Testimonials",
  "Behind the Scenes",
];

const AlbumImageSlider = ({ images, delay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRefs = React.useRef({});

  const currentSrc = images ? images[currentIndex] : null;
  const currentIsVideo = currentSrc ? currentSrc.endsWith('.mp4') : false;

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const idx = parseInt(key, 10);
      const videoEl = videoRefs.current[idx];
      if (videoEl) {
        if (idx === currentIndex) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
          videoEl.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    if (!images || images.length <= 1 || currentIsVideo) return;

    const intervalTime = window.innerWidth <= 700 ? 4000 : 3000;
    let timeout;
    let interval;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (!isHovered || window.innerWidth <= 700) {
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }
      }, intervalTime);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [images, delay, isHovered, currentIsVideo]);

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="album-image-slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((src, idx) => {
        let translateX = '100%';
        let opacity = 0;
        let zIndex = 1;
        
        if (idx === currentIndex) {
          translateX = '0%';
          opacity = 1;
          zIndex = 2;
        } else if (idx === (currentIndex - 1 + images.length) % images.length) {
          translateX = '-20%';
          opacity = 0;
          zIndex = 1;
        }

        const isVideo = src.endsWith('.mp4');

        return (
          <div 
            key={idx} 
            className={`album-slide ${isVideo ? 'album-slide-video' : ''}`}
            style={{
              transform: translateX,
              opacity: opacity,
              transition: 'transform 600ms cubic-bezier(.22,.61,.36,1), opacity 600ms ease',
              zIndex: zIndex
            }}
          >
            {isVideo ? (
              <>
                <video className="album-slide-bg" src={src} muted playsInline autoPlay loop />
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  className="album-video-main"
                  src={src}
                  muted
                  playsInline
                  preload="auto"
                  onEnded={() => {
                    if (idx === currentIndex) {
                      setCurrentIndex((prev) => (prev + 1) % images.length);
                    }
                  }}
                />
              </>
            ) : (
              <div className="album-slide-media">
                <img className="album-slide-bg" src={src} alt="" />
                <img className="album-slide-main" src={src} alt="Album Slide" />
              </div>
            )}
          </div>
        );
      })}

      {images.length > 1 && (
        <>
          <div className="album-slider-dots">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`album-slider-dot ${idx === currentIndex ? 'active' : ''}`} 
              />
            ))}
          </div>

          <button 
            className="album-slider-arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
          >
            ‹
          </button>
          <button 
            className="album-slider-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % images.length);
            }}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

const FlyerStackCarousel = ({ flyers, onFlyerClick }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredActive, setHoveredActive] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % flyers.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, flyers.length]);

  return (
    <div 
      className="flyer-stack-stage"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); setHoveredActive(false); }}
    >
      <div className="flyer-stack-watermark">Growthora</div>
      
      <div className="flyer-stack-label">
        <span className="orange-line" style={{ width: '12px', height: '2px', background: '#ff5a0a', display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}></span>
        <span>FEATURED FLYERS</span>
      </div>

      <div className="flyer-stack-area">
        {flyers.map((flyer, idx) => {
          let position = 'far';
          
          if (idx === activeIdx) {
            position = 'center';
          } else if (idx === (activeIdx - 1 + flyers.length) % flyers.length) {
            position = 'left';
          } else if (idx === (activeIdx + 1) % flyers.length) {
            position = 'right';
          }

          const isCenter = position === 'center';
          
          return (
            <div
              key={flyer.id}
              className={`flyer-stack-card pos-${position} ${isCenter && hoveredActive ? 'is-active-hovered' : ''}`}
              onClick={() => {
                if (position === 'center') {
                  onFlyerClick(flyer);
                } else if (position === 'left' || position === 'right') {
                  setActiveIdx(idx);
                }
              }}
              onMouseEnter={() => {
                if (isCenter) setHoveredActive(true);
              }}
              onMouseLeave={() => {
                if (isCenter) setHoveredActive(false);
              }}
            >
              <img src={flyer.image} alt={flyer.title} />
              
              <div className="flyer-stack-overlay">
                <strong>{flyer.title}</strong>
                <small>{flyer.category}</small>
                <span>View Details →</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flyer-stack-dots">
        {flyers.map((_, idx) => (
          <div 
            key={idx} 
            className={`flyer-stack-dot ${idx === activeIdx ? 'active' : ''}`}
            onClick={() => setActiveIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [tab, setTab] = useState("flyers");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [toggledCardId, setToggledCardId] = useState(null);

  useEffect(() => {
    if (preview) setPreviewIndex(0);
  }, [preview]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedFlyer(null);
        setPreview(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredFlyers = useMemo(() => {
    return flyers.filter((item) => {
      const category = filter === "All" || item.category === filter;
      const text = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return category && text;
    });
  }, [filter, search]);

  const filteredAlbums = useMemo(() => {
    return albums.filter((item) => {
      const category = filter === "All" || item.category === filter;
      const text = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return category && text;
    });
  }, [filter, search]);

  const changeTab = (nextTab) => {
    setTab(nextTab);
    setFilter("All");
    setSearch("");
  };

  return (
    <main className="gallery-page">
      <style>{`
        .gallery-page {
          --orange: #ff5a0a;
          --orange2: #ff762b;
          --navy: #111c38;
          --text: #61708a;
          --cream: #fff9f4;

          background:
            radial-gradient(circle at 92% 5%, rgba(255,90,10,.11), transparent 20%),
            #fffdfa;
          color: var(--navy);
          min-height: 100vh;
        }

        .gallery-container {
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
        }

        .gallery-breadcrumb {
          padding-top: 28px;
          font-size: 13px;
          color: #8490a3;
        }

        .gallery-breadcrumb span {
          color: var(--orange);
          padding: 0 8px;
        }

        /* HERO */

        .gallery-hero {
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          align-items: center;
          gap: 40px;
          padding: 55px 0;
        }

        .gallery-label {
          display: inline-flex;
          padding: 9px 15px;
          border-radius: 30px;
          border: 1px solid rgba(255,90,10,.35);
          color: var(--orange);
          background: #fff;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .gallery-hero h1 {
          font-size: clamp(65px, 7.5vw, 100px);
          line-height: 1;
          letter-spacing: -3px;
          margin: 0;
        }

        .gallery-hero h2 {
          margin: 15px 0 10px;
          font-size: 32px;
        }

        .gallery-hero p {
          max-width: 620px;
          color: var(--text);
          font-size: 19px;
          line-height: 1.7;
        }

        .hero-visual-container {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-mode-fade {
          animation: heroFadeScale 350ms ease forwards;
        }

        @keyframes heroFadeScale {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .flyer-stack-stage {
          position: relative;
          width: min(520px, 40vw);
          height: 430px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background: transparent;
        }

        .flyer-stack-watermark {
          position: absolute;
          z-index: 0;
          font-family: serif;
          font-size: clamp(60px, 7vw, 105px);
          color: rgba(16,32,31,.05);
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }

        .flyer-stack-label {
          position: absolute;
          top: 0;
          z-index: 10;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: .16em;
          color: #ff5a0a;
          display: flex;
          align-items: center;
        }

        .flyer-stack-area {
          position: relative;
          width: 100%;
          height: 310px;
          margin-top: 20px;
          perspective: 1000px;
          z-index: 5;
        }

        .flyer-stack-card {
          position: absolute;
          left: 50%;
          top: 50%;

          width: 230px;
          height: 310px;

          border: 4px solid #ffffff;
          border-radius: 18px;
          overflow: hidden;

          background: #ffffff;

          box-shadow: 0 22px 55px rgba(16, 32, 31, .16);

          transform-origin: center;
          transition: transform .75s cubic-bezier(.2,.7,.1,1), opacity .55s ease, filter .55s ease;
          cursor: pointer;
        }

        .flyer-stack-card img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        .flyer-stack-card.pos-center {
          transform: translate(-50%, -50%) translateX(0) scale(1) rotate(0deg);
          z-index: 5;
          opacity: 1;
          filter: blur(0);
        }

        .flyer-stack-card.pos-center.is-active-hovered {
          transform: translate(-50%, -50%) translateY(-7px) scale(1.035);
          box-shadow: 0 28px 60px rgba(16, 32, 31, .22);
        }

        .flyer-stack-card.pos-left {
          transform: translate(-50%, -50%) translateX(-145px) scale(.83) rotate(-7deg);
          z-index: 2;
          opacity: .82;
        }

        .flyer-stack-card.pos-right {
          transform: translate(-50%, -50%) translateX(145px) scale(.83) rotate(7deg);
          z-index: 2;
          opacity: .82;
        }

        .flyer-stack-card.pos-far {
          transform: translate(-50%, -50%) scale(.72);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }

        .flyer-stack-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,29,28,.94), rgba(15,29,28,.60) 50%, transparent);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .flyer-stack-card.pos-center.is-active-hovered .flyer-stack-overlay {
          opacity: 1;
        }

        .flyer-stack-overlay strong {
          font-size: 14px;
          margin-bottom: 2px;
          line-height: 1.2;
        }
        
        .flyer-stack-overlay small {
          font-size: 11px;
          opacity: 0.8;
          margin-bottom: 8px;
        }

        .flyer-stack-overlay span {
          font-size: 11px;
          font-weight: 700;
          color: #ff5a0a;
          margin-top: 5px;
        }

        .flyer-stack-dots {
          position: absolute;
          bottom: 10px;
          display: flex;
          gap: 8px;
          align-items: center;
          z-index: 10;
        }

        .flyer-stack-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(16,32,31,.16);
          cursor: pointer;
          transition: .3s ease;
        }

        .flyer-stack-dot.active {
          width: 8px;
          height: 8px;
          background: #ff5a0a;
        }

        .hero-3d-carousel {
          position: relative;
          width: 470px;
          height: 330px;
          margin-left: -20px;
          perspective: 1100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-3d-stage {
          position: absolute;
          width: 255px;
          height: 285px;
          transform-style: preserve-3d;
          animation: galleryCarouselRotate 18s infinite linear;
        }

        .hero-3d-carousel:hover .hero-3d-stage {
          animation-play-state: paused;
        }

        @keyframes galleryCarouselRotate {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(-360deg);
          }
        }

        .hero-3d-item {
          position: absolute;
          inset: 0;
          transform: rotateY(calc(var(--i) * 72deg)) translateZ(235px);
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .hero-3d-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(.2,.7,.2,1);
        }

        .hero-3d-item:hover .hero-3d-card,
        .hero-3d-item:active .hero-3d-card,
        .hero-3d-item:focus .hero-3d-card {
          transform: rotateY(180deg);
        }

        .hero-card-front {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          backface-visibility: hidden;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
          overflow: hidden;
          border: 5px solid #fff;
          transform: rotateY(0deg);
          background: #fff;
        }

        .hero-card-front img,
        .hero-card-front video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-card-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          transform: rotateY(180deg);
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
          border: 1px solid rgba(255, 90, 10, 0.1);

          background: linear-gradient(145deg, #ffffff, #fff8f2);
          border-radius: 18px;

          padding: 18px 18px 16px;

          display: flex;
          flex-direction: column;

          overflow-y: auto;
          overflow-x: hidden;

          scrollbar-width: thin;
          scrollbar-color: rgba(255, 90, 10, 0.35) transparent;
        }

        .hero-card-back::-webkit-scrollbar {
          width: 4px;
        }

        .hero-card-back::-webkit-scrollbar-thumb {
          background: rgba(255, 90, 10, 0.35);
          border-radius: 20px;
        }

        .hero-card-back-content {
          display: flex;
          flex-direction: column;
        }

        .leadership-list {
          width: calc(100% + 36px);
          height: calc(100% + 34px);
          margin: -18px -18px -16px;
          padding: 15px 20px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;

          box-sizing: border-box;
          overflow: hidden;
        }

        .leadership-row {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 12px;
          align-items: center;

          padding: 8px 0 10px;
          border-bottom: 1px solid rgba(255, 90, 10, 0.16);
        }

        .leadership-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .leadership-number {
          font-size: 11px;
          font-weight: 800;
          color: #ff5a0a;
          letter-spacing: .5px;
        }

        .leadership-row h3 {
          margin: 0 0 2px;
          font-size: 14px;
          line-height: 1.15;
          font-weight: 800;
          color: #101c36;
          white-space: normal;
        }

        .leadership-row p {
          margin: 0;
          font-size: 11px;
          line-height: 1.25;
          font-weight: 600;
          color: #75839a;
        }

        .hero-category-pill {
          align-self: flex-start;
          background: #fff3ec;
          color: var(--orange);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .hero-card-back h3 {
          color: var(--navy);
          margin: 10px 0 8px;
          font-size: 18px;
          line-height: 1.25;
        }

        .hero-card-back p {
          margin: 0;
          font-size: 13px;
          line-height: 1.45;
          color: #738198;
        }

        .hero-card-line {
          height: 3px;
          width: 40px;
          background: var(--orange);
          border-radius: 3px;
          margin-top: 15px;
        }

        .founder-photo-grid {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 50% 50%;
          gap: 6px;
          overflow: hidden;
          border-radius: 18px;
          background: #fff;
        }

        .founder-photo-main {
          grid-column: 1 / 3;
          grid-row: 1;
          overflow: hidden;
        }

        .founder-photo-small.left {
          grid-column: 1;
          grid-row: 2;
          overflow: hidden;
        }

        .founder-photo-small.right {
          grid-column: 2;
          grid-row: 2;
          overflow: hidden;
        }

        .founder-photo-grid img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .founder-photo-main img {
          object-position: center 25%;
        }

        .founder-photo-small.left img {
          object-position: center 15%;
        }

        .founder-photo-small.right img {
          object-position: center 15%;
        }

        /* TABS */

        .gallery-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 42px;
        }

        .gallery-tab {
          border: 1px solid #e4e7ec;
          background: #fff;
          border-radius: 15px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          text-align: left;
          transition: .25s;
        }

        .gallery-tab:hover {
          transform: translateY(-2px);
          border-color: rgba(255,90,10,.5);
        }

        .gallery-tab.active {
          background: linear-gradient(
            120deg,
            var(--orange),
            var(--orange2)
          );
          border-color: var(--orange);
          color: #fff;
          box-shadow: 0 12px 28px rgba(255,90,10,.2);
        }

        .tab-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #fff3ec;
          color: var(--orange);
          font-size: 21px;
        }

        .active .tab-icon {
          background: #fff;
        }

        .tab-copy {
          flex: 1;
        }

        .tab-copy strong {
          display: block;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .tab-copy small {
          color: #7f8aa0;
        }

        .active .tab-copy small {
          color: rgba(255,255,255,.85);
        }

        .tab-arrow {
          font-size: 25px;
        }

        /* TITLES */

        .section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .section-heading-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .orange-line {
          width: 5px;
          height: 24px;
          background: var(--orange);
          border-radius: 8px;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 25px;
        }

        .view-all {
          border: 0;
          background: transparent;
          color: var(--orange);
          cursor: pointer;
          font-weight: 700;
        }

        /* FILTERS */

        .gallery-toolbar {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          margin-bottom: 28px;
        }

        .gallery-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-button {
          border: 1px solid #e4e7ec;
          background: #fff;
          border-radius: 999px;
          padding: 9px 15px;
          cursor: pointer;
          color: #344054;
          transition: .2s;
        }

        .filter-button.active {
          background: var(--orange);
          border-color: var(--orange);
          color: #fff;
        }

        .gallery-search {
          width: 250px;
          min-width: 250px;
          height: 43px;
          border-radius: 12px;
          border: 1px solid #e4e7ec;
          outline: none;
          padding: 0 15px;
          background: #fff;
        }

        .gallery-search:focus {
          border-color: var(--orange);
        }

        /* FLYERS */

        .flyer-grid {
          display: grid;
          grid-template-columns: repeat(4, 246.25px);
          gap: 19px;
          justify-content: center;
          padding-bottom: 70px;
        }

        .flyer-motion-card {
          width: 246.25px;
          height: 330px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          border-radius: 15px;
          background: #fff;
          box-shadow: 0 5px 17px rgba(25,32,51,.04);
        }

        .flyer-motion-image,
        .flyer-motion-content {
          position: absolute;
          inset: 0;
          transition: transform .75s cubic-bezier(.22,.61,.36,1), opacity .6s ease;
        }

        .flyer-motion-image {
          z-index: 3;
          background: #fff;
        }

        .flyer-motion-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
          object-position: center;
        }

        .flyer-motion-content {
          z-index: 1;
          opacity: 0;
          transform: translateX(35px) scale(.96);
          background: linear-gradient(145deg, #ffffff, #fff8f3);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          pointer-events: none;
        }

        .fm-category {
          display: inline-block;
          background: #ff5a0a;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 999px;
          width: fit-content;
          margin-bottom: 8px;
        }

        .fm-title {
          color: #111c38;
          font-weight: 800;
          font-size: 16px;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .fm-desc {
          font-size: 13px;
          line-height: 1.4;
          color: #61708a;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .fm-highlights {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: auto;
        }

        .fm-highlight-item {
          font-size: 11px;
          color: #ff5a0a;
          font-weight: 600;
        }

        .fm-link {
          font-size: 13px;
          font-weight: 700;
          color: #ff5a0a;
          margin-top: 10px;
        }

        @media (min-width: 701px) {
          .flyer-motion-image {
            animation: flyerImageMotion 8s cubic-bezier(.22,.61,.36,1) infinite;
            animation-delay: var(--delay, 0s);
          }
          .flyer-motion-content {
            animation: flyerContentMotion 8s cubic-bezier(.22,.61,.36,1) infinite;
            animation-delay: var(--delay, 0s);
          }
          
          .flyer-motion-card:hover .flyer-motion-image,
          .flyer-motion-card:hover .flyer-motion-content {
            animation-play-state: paused;
          }
        }

        @media (max-width: 700px) {
          .flyer-motion-card.is-toggled .flyer-motion-image {
            transform: translateX(-38%) scale(.62) rotateY(5deg);
            opacity: .94;
            z-index: 1;
          }
          .flyer-motion-card.is-toggled .flyer-motion-content {
            transform: translateX(0) scale(1);
            opacity: 1;
            z-index: 4;
            pointer-events: auto;
          }
        }

        @keyframes flyerImageMotion {
          0%, 35% {
            transform: translateX(0) scale(1);
            opacity: 1;
            z-index: 3;
          }
          40%, 70% {
            transform: translateX(-38%) scale(.62) rotateY(5deg);
            opacity: .94;
            z-index: 1;
          }
          75%, 100% {
            transform: translateX(0) scale(1);
            opacity: 1;
            z-index: 3;
          }
        }

        @keyframes flyerContentMotion {
          0%, 35% {
            transform: translateX(38px) scale(.96);
            opacity: 0;
            pointer-events: none;
            z-index: 1;
          }
          40%, 70% {
            transform: translateX(0) scale(1);
            opacity: 1;
            pointer-events: auto;
            z-index: 4;
          }
          75%, 100% {
            transform: translateX(38px) scale(.96);
            opacity: 0;
            pointer-events: none;
            z-index: 1;
          }
        }

        /* FEATURED */

        .featured-layout {
          display: grid;
          grid-template-columns: 1.1fr 1.25fr;
          gap: 15px;
          margin-bottom: 50px;
        }

        .featured-main,
        .featured-small {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          cursor: pointer;
          background: #ddd;
        }

        .featured-main {
          height: 420px;
        }

        .featured-side {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .featured-small {
          height: 202px;
        }

        .featured-main img,
        .featured-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: .35s;
        }

        .featured-main:hover img,
        .featured-small:hover img {
          transform: scale(1.035);
        }

        .featured-video-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .featured-main::after,
        .featured-small::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,.72),
            transparent 55%
          );
        }

        .play-button {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 0;
          background: rgba(255,255,255,.95);
          position: absolute;
          z-index: 4;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 19px;
          cursor: pointer;
          color: var(--navy);
        }

        .featured-small .play-button {
          width: 46px;
          height: 46px;
        }

        .duration {
          position: absolute;
          z-index: 4;
          top: 10px;
          right: 10px;
          color: #fff;
          background: rgba(0,0,0,.68);
          padding: 5px 8px;
          border-radius: 7px;
          font-size: 11px;
        }

        .media-caption {
          position: absolute;
          z-index: 4;
          bottom: 16px;
          left: 17px;
          color: #fff;
        }

        .media-caption strong {
          display: block;
          margin-bottom: 3px;
        }

        .media-caption small {
          opacity: .8;
        }

        /* PHOTO GALLERY */

        .photo-gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 44px;
          max-width: 1100px;
          margin: 0 auto;
          padding-bottom: 70px;
        }

        .photo-gallery-card {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          background: transparent;
          border: 1.5px solid #ff6a1a;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
          min-height: 0;
          cursor: pointer;
          transition: .25s;
        }

        .photo-gallery-card:nth-child(5) {
          grid-column: 1 / 3;
          width: calc(50% - 22px);
          justify-self: center;
        }

        .photo-gallery-card:hover {
          transform: translateY(-4px);
          border-color: #ff5a0a;
          box-shadow: 0 16px 34px rgba(255, 90, 10, 0.14);
        }

        .photo-gallery-image,
        .album-image-slider {
          position: relative;
          width: 100%;
          height: 430px;
          overflow: hidden;
          border-radius: 21px;
        }

        .album-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .album-slide-media {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #fff8f3;
        }

        .album-slide-bg {
          position: absolute;
          inset: -10px;
          width: calc(100% + 20px);
          height: calc(100% + 20px);
          object-fit: cover;
          filter: blur(18px);
          transform: scale(1.08);
          opacity: 0.42;
        }

        .album-slide-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.10);
        }

        .album-slide-main {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        .album-slide-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: transparent;
        }

        .album-video-main {
          position: absolute;
          inset: 0;
          z-index: 1;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;
          background: transparent;

          display: block;
          opacity: 1 !important;
          visibility: visible !important;

          filter: none !important;
          transform: none !important;
        }

        .album-slide-video::after {
          display: none !important;
        }

        .album-slider-dots {
          position: absolute;
          bottom: 78px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 9;
        }

        .album-slider-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          transition: 0.3s;
        }

        .album-slider-dot.active {
          background: var(--orange);
          width: 6px;
          height: 6px;
        }

        .album-slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          background: #fff;
          border: none;
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #333;
          z-index: 8;
          opacity: 0;
          cursor: pointer;
          transition: 0.2s;
        }

        .album-image-slider:hover .album-slider-arrow {
          opacity: 1;
        }

        .album-slider-arrow.prev { left: 10px; }
        .album-slider-arrow.next { right: 10px; }

        @media (max-width: 700px) {
          .album-slider-arrow {
            display: none !important;
          }
        }

        .album-info-overlay {
          position: absolute;
          z-index: 8;
          left: 0;
          right: 0;
          bottom: 0;

          padding: 65px 24px 22px;

          background: linear-gradient(
            to top,
            rgba(9, 18, 36, 0.82),
            rgba(9, 18, 36, 0.35),
            transparent
          );

          color: #ffffff;
          pointer-events: none;
        }

        .album-info-overlay h3 {
          margin: 0 0 8px;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
        }

        .album-info-overlay .photo-count {
          font-size: 14px;
          color: rgba(255,255,255,.88);
        }

        @media (max-width: 700px) {
          .photo-gallery-grid {
            grid-template-columns: 1fr;
          }

          .photo-gallery-card:nth-child(5) {
            grid-column: auto;
            width: 100%;
          }
        }

        /* MODAL */

        .gallery-modal {
          position: fixed;
          z-index: 99999;
          inset: 0;
          background: rgba(8,12,22,.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .gallery-modal img {
          max-width: 95vw;
          max-height: 85vh;
          border-radius: 14px;
        }

        .modal-carousel {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.9);
          color: #000;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 30px;
          cursor: pointer;
          display: grid;
          place-items: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: 0.2s;
        }

        .modal-nav:hover {
          background: var(--orange, #ff5a0a);
          color: #fff;
        }

        .modal-nav.prev {
          left: -70px;
        }

        .modal-nav.next {
          right: -70px;
        }

        .modal-counter {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-weight: 500;
          background: rgba(255,255,255,0.2);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .modal-nav.prev { left: 10px; }
          .modal-nav.next { right: 10px; }
        }

        .modal-close {
          position: fixed;
          z-index: 100000;
          right: 25px;
          top: 22px;
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 50%;
          background: #fff;
          font-size: 25px;
          cursor: pointer;
        }

        /* RESPONSIVE */

        @media (max-width: 1050px) {
          .flyer-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .flyer-card {
            width: auto;
          }
          .flyer-image {
            width: 100%;
            height: auto;
            aspect-ratio: 246.25 / 330;
          }
          .flyer-image img {
            width: 100%;
            height: 100%;
          }
        }

        @media (max-width: 900px) {
          .flyer-stack-stage {
            width: min(500px, 100%);
            height: 390px;
          }
          .flyer-stack-area {
            height: 255px;
          }
          .flyer-stack-card {
            width: 190px;
            height: 255px;
          }
          .flyer-stack-card.pos-left {
            transform: translate(-50%, -50%) translateX(-115px) scale(.82) rotate(-7deg);
          }
          .flyer-stack-card.pos-right {
            transform: translate(-50%, -50%) translateX(115px) scale(.82) rotate(7deg);
          }

          .hero-3d-carousel {
            width: 410px;
            height: 300px;
            margin-left: 0;
          }
          .hero-3d-stage {
            width: 225px;
            height: 255px;
          }
          .hero-3d-item {
            transform: rotateY(calc(var(--i) * 72deg)) translateZ(200px);
          }
        }

        @media (max-width: 820px) {
          .gallery-hero {
            grid-template-columns: 1fr;
          }

          .gallery-tabs {
            grid-template-columns: 1fr;
          }

          .gallery-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .gallery-filters {
            flex-wrap: nowrap;
            overflow-x: auto;
          }

          .filter-button {
            white-space: nowrap;
          }

          .gallery-search {
            width: 100%;
            min-width: 0;
          }

          .flyer-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .featured-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .flyer-stack-stage {
            height: 330px;
          }
          .flyer-stack-area {
            height: 202px;
          }
          .flyer-stack-card {
            width: 150px;
            height: 202px;
          }
          .flyer-stack-card.pos-left {
            transform: translate(-50%, -50%) translateX(-82px) scale(.78) rotate(-7deg);
          }
          .flyer-stack-card.pos-right {
            transform: translate(-50%, -50%) translateX(82px) scale(.78) rotate(7deg);
          }

          .gallery-container {
            width: calc(100% - 30px);
          }

          .gallery-hero {
            padding: 38px 0 25px;
          }

          .gallery-hero h1 {
            font-size: 50px;
          }

          .hero-3d-carousel {
            width: 100%;
            height: 300px;
            margin-top: 30px;
            overflow: visible;
          }

          .hero-3d-stage {
            width: 210px;
            height: 240px;
          }

          .hero-3d-item {
            transform: rotateY(calc(var(--i) * 72deg)) translateZ(175px);
          }

          .hero-card-back {
            padding: 18px;
          }

          .hero-card-back h3 {
            font-size: 20px;
          }

          .hero-card-back p {
            font-size: 13px;
            line-height: 1.45;
          }


          .featured-main {
            height: 300px;
          }

          .featured-side {
            gap: 10px;
          }

          .featured-small {
            height: 155px;
          }
        }

        /* FLYER DETAIL MODAL */
        .flyer-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(10, 18, 32, 0.88);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
        }

        .flyer-detail-modal {
          width: min(1100px, 92vw);
          height: min(760px, 88vh);
          display: grid;
          grid-template-columns: 48% 52%;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 90px rgba(0,0,0,.30);
        }

        .flyer-detail-image {
          background: linear-gradient(145deg, #fffaf6, #fff4eb);
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flyer-detail-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 16px;
          display: block;
        }

        .flyer-detail-content {
          padding: 46px 46px 38px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .flyer-detail-category {
          width: fit-content;
          padding: 8px 14px;
          border-radius: 999px;
          background: #fff1e8;
          color: #ff5a0a;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .flyer-detail-title {
          font-size: 36px;
          line-height: 1.1;
          font-weight: 800;
          color: #101c36;
          margin: 0 0 10px;
        }

        .flyer-detail-subtitle {
          font-size: 18px;
          line-height: 1.45;
          color: #607089;
          margin-bottom: 16px;
        }

        .flyer-detail-divider {
          width: 65px;
          height: 4px;
          background: #ff5a0a;
          border-radius: 20px;
          margin-bottom: 24px;
        }

        .flyer-detail-description {
          font-size: 16px;
          line-height: 1.7;
          color: #65758d;
          margin-bottom: 24px;
        }

        .flyer-detail-highlight {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 14px;
          align-items: center;
          margin-bottom: 14px;
        }

        .flyer-detail-highlight-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff0e6;
          color: #ff5a0a;
          display: grid;
          place-items: center;
        }

        .flyer-detail-highlight strong {
          display: block;
          font-weight: 700;
          color: #101c36;
        }

        .flyer-detail-highlight span {
          display: block;
          font-size: 13px;
          color: #75839a;
        }

        .flyer-know-more {
          margin-top: 18px;
          width: fit-content;
          min-width: 190px;
          padding: 14px 24px;
          border-radius: 999px;
          background: linear-gradient(120deg, #ff5a0a, #ff762b);
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          text-align: center;
          transition: .25s ease;
        }

        .flyer-know-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255,90,10,.25);
        }

        .flyer-modal-close {
          position: fixed;
          top: 24px;
          right: 28px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          background: #ffffff;
          color: #101c36;
          font-size: 28px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(0,0,0,.18);
          transition: transform 0.2s, color 0.2s;
        }

        .flyer-modal-close:hover {
          color: #ff5a0a;
          transform: scale(1.05);
        }

        @media (max-width: 800px) {
          .flyer-detail-modal {
            width: min(94vw, 600px);
            height: 92vh;
            display: block;
            overflow-y: auto;
          }

          .flyer-detail-image {
            height: 470px;
            padding: 20px;
          }

          .flyer-detail-content {
            padding: 28px 24px 36px;
            overflow: visible;
          }

          .flyer-detail-title {
            font-size: 28px;
          }

          .flyer-detail-subtitle {
            font-size: 16px;
          }

          .flyer-detail-description {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .flyer-detail-image {
            height: 390px;
          }

          .flyer-detail-title {
            font-size: 25px;
          }
        }
      `}</style>

      <div className="gallery-container">
        <div className="gallery-breadcrumb">
          Home <span>›</span> Gallery
        </div>

        <section className="gallery-hero">
          <div>
            <span className="gallery-label">▣ &nbsp; OUR GALLERY</span>

            <h1>Gallery</h1>

            <h2>Moments, Milestones & Growth in Motion</h2>

            <p>
              Explore our campaign creatives, events, team moments and the
              impact we create together.
            </p>
          </div>

          <div className="hero-visual-container">
            {tab === "flyers" && (
              <div className="hero-mode-fade" key="flyers">
                <FlyerStackCarousel flyers={flyers} onFlyerClick={setSelectedFlyer} />
              </div>
            )}
            
            {tab === "media" && (
              <div className="hero-mode-fade" key="media">
                <div className="hero-3d-carousel">
                  <div className="hero-3d-stage">
              {[
                {
                  id: 1,
                  title: "Global Business Leader Award",
                  category: "Excellence in Enterprise Advisory & Capital Acceleration",
                  desc: "Awarded in recognition of Growthora's comprehensive business advisory model, accelerating startup funding access, statutory compliance, and corporate structuring for Indian founders.",
                  img: "/award photo.png"
                },
                {
                  id: 2,
                  title: "People Who Power Our Vision",
                  category: "Team",
                  desc: "Behind every Growthora milestone is a team committed to strategy, innovation and meaningful impact. We work together to transform ideas into progress and possibilities into growth.",
                  img: "/Team.png"
                },
                {
                  id: 3,
                  title: "Client Conversations That Matter",
                  category: "Client Meetings",
                  desc: "Every client journey starts with a meaningful conversation. We listen carefully to understand their goals, challenges, and vision. Our team works closely to identify the right opportunities and solutions. Each discussion is focused on clarity, strategy, and practical next steps. Together, we turn business conversations into measurable growth.",
                  img: "/client consultation .mp4"
                },
                {
                  id: 4,
                  title: "National Dialogue on Startup Ecosystem",
                  category: "Events",
                  desc: "Meeting with Family of Dr. Ram Manohar Lohia. A meaningful dialogue focused on strengthening India’s startup and MSME ecosystem by encouraging grassroots entrepreneurship and supporting businesses in their journey from local markets to larger urban and national opportunities. The discussion highlighted the importance of rural-to-urban enterprise scaling, access to structured support, innovation-led development, and sustainable job creation.",
                  img: "/business event.png"
                },
                {
                  id: 5,
                  title: "The Leadership Behind Growthora",
                  category: "Growthora",
                  desc: "Meet the people shaping Growthora’s vision and direction. Our founders and directors bring together strategy, experience, and leadership. They guide the team, strengthen client relationships, and drive key business decisions. Together, they are building Growthora with a clear focus on sustainable growth and impact.",
                  img: [
                    "/Nikhil Sankhala.png",
                    "/Shashank Singh.png",
                    "/Raval Kunal.png"
                  ]
                }
              ].map((item, index) => (
                <div
                  key={item.id}
                  className="hero-3d-item"
                  style={{ "--i": index }}
                >
                  <div className="hero-3d-card">
                    <div className="hero-card-front">
                      {Array.isArray(item.img) ? (
                        <div className="founder-photo-grid">
                          <div className="founder-photo-main">
                            <img src={item.img[0]} alt={item.title} />
                          </div>
                          <div className="founder-photo-small left">
                            <img src={item.img[1]} alt={item.title} />
                          </div>
                          <div className="founder-photo-small right">
                            <img src={item.img[2]} alt={item.title} />
                          </div>
                        </div>
                      ) : typeof item.img === 'string' && item.img.endsWith('.mp4') ? (
                        <video src={item.img} autoPlay loop muted playsInline />
                      ) : (
                        <img src={item.img} alt={item.title} />
                      )}
                    </div>
                    <div className="hero-card-back">
                      {item.id === 5 ? (
                        <div className="leadership-list">
                          <div className="leadership-row">
                            <span className="leadership-number">01</span>
                            <div>
                              <h3>Nikhil Sankhala</h3>
                              <p>Founder & CEO</p>
                            </div>
                          </div>
                          <div className="leadership-row">
                            <span className="leadership-number">02</span>
                            <div>
                              <h3>Shashank Singh</h3>
                              <p>Director — Strategy</p>
                            </div>
                          </div>
                          <div className="leadership-row">
                            <span className="leadership-number">03</span>
                            <div>
                              <h3>Raval Kunal</h3>
                              <p>Director — Technology</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="hero-card-back-content">
                          <span className="hero-category-pill">{item.category}</span>
                          <h3>{item.title}</h3>
                          <p>{item.desc}</p>
                          <div className="hero-card-line"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
              </div>
            )}
          </div>
        </section>

        <div className="gallery-tabs">
          <button
            className={`gallery-tab ${tab === "flyers" ? "active" : ""}`}
            onClick={() => changeTab("flyers")}
          >
            <div className="tab-icon">▤</div>

            <div className="tab-copy">
              <strong>Growthora Flyers</strong>
              <small>Browse our latest flyers and campaign creatives</small>
            </div>

            <span className="tab-arrow">›</span>
          </button>

          <button
            className={`gallery-tab ${tab === "media" ? "active" : ""}`}
            onClick={() => changeTab("media")}
          >
            <div className="tab-icon">▧</div>

            <div className="tab-copy">
              <strong>Photos & Videos</strong>
              <small>Explore our events, team, office and more</small>
            </div>

            <span className="tab-arrow">›</span>
          </button>
        </div>

        {tab === "flyers" && (
          <section>
            <div className="section-heading">
              <div className="section-heading-left">
                <span className="orange-line" />
                <h2>Browse Flyers</h2>
              </div>
            </div>

            <div className="gallery-toolbar">
              <div className="gallery-filters">
                {flyerFilters.map((item) => (
                  <button
                    key={item}
                    className={`filter-button ${
                      filter === item ? "active" : ""
                    }`}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <input
                className="gallery-search"
                type="search"
                placeholder="Search flyers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flyer-grid">
              {filteredFlyers.map((item, index) => (
                <article
                  className={`flyer-motion-card ${toggledCardId === item.id ? 'is-toggled' : ''}`}
                  key={item.id}
                  style={{ "--delay": `${index}s` }}
                  onClick={(e) => {
                    if (window.innerWidth <= 700) {
                      setToggledCardId((prev) => (prev === item.id ? null : item.id));
                    } else {
                      setSelectedFlyer(item);
                    }
                  }}
                >
                  <div className="flyer-motion-image">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="flyer-motion-content" onClick={(e) => {
                      if (window.innerWidth <= 700 && e.target.closest('.fm-link')) {
                         e.stopPropagation();
                         setSelectedFlyer(item);
                      }
                  }}>
                    <div className="fm-category">{item.category}</div>
                    <div className="fm-title">{item.title}</div>
                    <div className="fm-desc">{item.description}</div>
                    <div className="fm-highlights">
                      {item.highlights && item.highlights.slice(0, 3).map((hl, idx) => (
                        <div key={idx} className="fm-highlight-item">
                          • {hl.title}
                        </div>
                      ))}
                    </div>
                    {item.link && (
                      <div className="fm-link">Know More →</div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {tab === "media" && (
          <section>
            <div className="gallery-toolbar">
              <div className="gallery-filters">
                {mediaFilters.map((item) => (
                  <button
                    key={item}
                    className={`filter-button ${
                      filter === item ? "active" : ""
                    }`}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="section-heading">
              <div className="section-heading-left">
                <span className="orange-line" />
                <h2>Featured Media</h2>
              </div>
            </div>

            <div className="featured-layout">
              <div
                className="featured-main"
                onClick={() => setPreview(media[0].video || media[0].image)}
                onMouseEnter={(e) => {
                  const v = e.currentTarget.querySelector('video');
                  if (v && window.innerWidth > 768) {
                    v.play().catch(() => {});
                  }
                }}
                onMouseLeave={(e) => {
                  const v = e.currentTarget.querySelector('video');
                  if (v) {
                    v.pause();
                    v.currentTime = 0;
                  }
                }}
              >
                {media[0].video ? (
                  <video
                    src={media[0].video}
                    muted
                    playsInline
                    preload="metadata"
                    className="featured-video-preview"
                  />
                ) : (
                  <img src={media[0].image} alt={media[0].title} />
                )}

                {media[0].duration && <span className="duration">{media[0].duration}</span>}

                <button className="play-button">▶</button>

                {(media[0].title || media[0].category) && (
                  <div className="media-caption">
                    {media[0].title && <strong>{media[0].title}</strong>}
                    {media[0].category && <small>{media[0].category}</small>}
                  </div>
                )}
              </div>

              <div className="featured-side">
                {media.slice(1).map((item) => (
                  <div
                    className="featured-small"
                    key={item.id}
                    onClick={() => setPreview(item.video || item.image)}
                    onMouseEnter={(e) => {
                      const v = e.currentTarget.querySelector('video');
                      if (v && window.innerWidth > 768) {
                        v.play().catch(() => {});
                      }
                    }}
                    onMouseLeave={(e) => {
                      const v = e.currentTarget.querySelector('video');
                      if (v) {
                        v.pause();
                        v.currentTime = 0;
                      }
                    }}
                  >
                    {item.video ? (
                      <video
                        src={item.video}
                        muted
                        playsInline
                        preload="metadata"
                        className="featured-video-preview"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                      />
                    )}

                    {item.duration && <span className="duration">{item.duration}</span>}

                    <button className="play-button">▶</button>

                    {(item.title || item.category) && (
                      <div className="media-caption">
                        {item.title && <strong>{item.title}</strong>}
                        {item.category && <small>{item.category}</small>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="section-heading">
              <div className="section-heading-left">
                <span className="orange-line" />
                <h2>Photo Gallery</h2>
              </div>

              <button className="view-all">View All →</button>
            </div>

            <div className="photo-gallery-grid">
              {filteredAlbums.map((item, index) => (
                <article
                  className="photo-gallery-card"
                  key={item.title}
                  onClick={() => setPreview(item.images ? item.images : item.image)}
                >
                  <div className="photo-gallery-image">
                    <AlbumImageSlider images={item.images} delay={index * 500} />
                  </div>

                  <div className="album-info-overlay">
                    <h3>{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {preview && (
        <div
          className="gallery-modal"
          onClick={() => setPreview(null)}
        >
          <button
            className="modal-close"
            onClick={() => setPreview(null)}
          >
            ×
          </button>

          {Array.isArray(preview) ? (
            <div className="modal-carousel" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-nav prev"
                onClick={() => setPreviewIndex((prev) => (prev > 0 ? prev - 1 : preview.length - 1))}
              >
                ‹
              </button>
              
              {preview[previewIndex].endsWith('.mp4') ? (
                <video src={preview[previewIndex]} controls autoPlay style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '12px', outline: 'none' }} />
              ) : (
                <img src={preview[previewIndex]} alt="Gallery preview" />
              )}
              
              <button 
                className="modal-nav next"
                onClick={() => setPreviewIndex((prev) => (prev < preview.length - 1 ? prev + 1 : 0))}
              >
                ›
              </button>

              <div className="modal-counter">
                {previewIndex + 1} / {preview.length}
              </div>
            </div>
          ) : typeof preview === 'string' && preview.endsWith('.mp4') ? (
            <video
              src={preview}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '90vh', maxWidth: '90vw', outline: 'none', borderRadius: '12px' }}
            />
          ) : (
            <img
              src={preview}
              alt="Gallery preview"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}

      {selectedFlyer && (
        <div
          className="flyer-modal-backdrop"
          onClick={() => setSelectedFlyer(null)}
        >
          <div
            className="flyer-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flyer-detail-image">
              <img src={selectedFlyer.image} alt={selectedFlyer.title} />
            </div>

            <div className="flyer-detail-content">
              <div className="flyer-detail-category">{selectedFlyer.category}</div>
              <h2 className="flyer-detail-title">{selectedFlyer.title}</h2>
              <p className="flyer-detail-subtitle">{selectedFlyer.subtitle}</p>
              <div className="flyer-detail-divider"></div>
              <p className="flyer-detail-description">{selectedFlyer.description}</p>

              {selectedFlyer.highlights && selectedFlyer.highlights.map((hl, idx) => (
                <div key={idx} className="flyer-detail-highlight">
                  <div className="flyer-detail-highlight-icon">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <strong>{hl.title}</strong>
                    <span>{hl.text}</span>
                  </div>
                </div>
              ))}

              {selectedFlyer.link && (
                <a
                  href={selectedFlyer.link}
                  className="flyer-know-more"
                >
                  Read More →
                </a>
              )}
            </div>
          </div>

          <button
            className="flyer-modal-close"
            onClick={() => setSelectedFlyer(null)}
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
};

export default Gallery;
