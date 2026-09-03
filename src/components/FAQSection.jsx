import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection = () => {
  const [openId, setOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? FAQ_DATA : FAQ_DATA.slice(0, 5);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        
        {/* Section Header */}
        <div className="faq-header">
          <div className="eyebrow-badge">
            <HelpCircle size={14} />
            <span>FAQ</span>
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-description">
            Everything you need to know about Growthora's business advisory services.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list" role="region" aria-label="Frequently Asked Questions Accordion">
          {visibleFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`faq-card ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  className="faq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${faq.id}`}
                >
                  <div className="faq-question-text-wrap">
                    <span className="faq-num">{faq.num}.</span>
                    <span className="faq-question-title">{faq.question}</span>
                  </div>
                  <div className="faq-icon-wrap" aria-hidden="true">
                    {isOpen ? (
                      <ChevronUp size={20} className="icon-active" />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div 
                    id={`faq-ans-${faq.id}`}
                    className="faq-answer-body animate-fade-in"
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                  >
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All / Show Less Button */}
        <div className="faq-toggle-row">
          <button
            type="button"
            className="btn-faq-toggle"
            onClick={handleToggleShowAll}
            aria-expanded={showAll}
          >
            <span>{showAll ? 'Show Less' : 'View All FAQs'}</span>
            {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

      </div>
    </section>
  );
};
