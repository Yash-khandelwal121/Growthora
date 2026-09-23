import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EcosystemCategoryCard } from './EcosystemCategoryCard';
import { PartnerCard } from './PartnerCard';

export function EcosystemCarousel({ theme, title, description, partners }) {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  // Update visible items based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 768) {
        setVisibleCount(2);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(partners.length / visibleCount));

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (!isHovered && partners.length > visibleCount) {
      interval = setInterval(() => {
        handleNext();
      }, 4000); // 4 seconds autoplay
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, isHovered, visibleCount, partners.length]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalPages - 1); // loop
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  // Touch and drag support
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Calculate translation distance
  // the gap is 20px, so item width + gap = 100% of wrapper
  const getTransform = () => {
    const translatePercentage = currentIndex * 100;
    const gapOffset = currentIndex * 20; // 20px gap per page jump approx, or adjust
    // A simpler way: we move by 100% per index and also account for gap.
    // Actually, if we group items by view width, track width = 100%. 
    // TranslateX by -(currentIndex * 100)%
    // We also need to add gap distance: + currentIndex * 20px if we use calc.
    return `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 20}px))`;
  };

  return (
    <div 
      className="eco-carousel-block" 
      data-theme={theme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="eco-carousel-block-bg"></div>
      <EcosystemCategoryCard theme={theme} title={title} description={description} />
      
      <div className="eco-carousel-wrapper">
        <div className="eco-carousel-header">
          <a href="#" className="eco-view-all" onClick={(e) => e.preventDefault()}>View All &rarr;</a>
        </div>
        
        <div 
          className="eco-carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="eco-carousel-track" 
            ref={trackRef}
            style={{ transform: getTransform() }}
          >
            {partners.map((partner, index) => (
              <PartnerCard key={index} logo={partner.logo} name={partner.name} />
            ))}
          </div>
        </div>
        
        
        {totalPages > 1 && (
          <>
            <button className="eco-nav-btn eco-nav-right" onClick={handleNext} aria-label="Next">
              <ChevronRight size={20} />
            </button>
            
            <div className="eco-pagination-container">
              <div className="eco-pagination">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`eco-dot ${i === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(i)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
