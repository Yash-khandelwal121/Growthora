import React, { useState } from 'react';
import { X, Sparkles, Send, ArrowRight, HelpCircle, ShieldCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

export const AskGrowthoraModal = ({ isOpen, onClose, onSelectCategory }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState(null);

  if (!isOpen) return null;

  const samplePrompts = [
    { text: "What MSME subsidies am I eligible for?", targetId: "07" },
    { text: "How do I get collateral-free loan & project reports?", targetId: "02" },
    { text: "What is required for SME IPO listing on NSE Emerge?", targetId: "08" },
    { text: "Do I need ISO or FSSAI certification first?", targetId: "03" },
    { text: "What filings are needed after company registration?", targetId: "06" }
  ];

  const handleAsk = (textToAsk, targetId) => {
    const qText = textToAsk || query;
    if (!qText.trim()) return;

    let recService = SERVICES_DATA[0];
    if (targetId) {
      recService = SERVICES_DATA.find((s) => s.id === targetId) || SERVICES_DATA[0];
    } else {
      const lower = qText.toLowerCase();
      if (lower.includes('ipo') || lower.includes('drhp') || lower.includes('sebi')) recService = SERVICES_DATA[7];
      else if (lower.includes('subsidy') || lower.includes('msme') || lower.includes('scheme') || lower.includes('unnati') || lower.includes('pmfme')) recService = SERVICES_DATA[6];
      else if (lower.includes('loan') || lower.includes('funding') || lower.includes('finance') || lower.includes('debt') || lower.includes('vc')) recService = SERVICES_DATA[1];
      else if (lower.includes('iso') || lower.includes('fssai') || lower.includes('certif')) recService = SERVICES_DATA[2];
      else if (lower.includes('brand') || lower.includes('logo') || lower.includes('website') || lower.includes('seo')) recService = SERVICES_DATA[3];
      else if (lower.includes('valuation') || lower.includes('fema') || lower.includes('m&a')) recService = SERVICES_DATA[8];
      else if (lower.includes('legal') || lower.includes('agreement') || lower.includes('patent') || lower.includes('audit')) recService = SERVICES_DATA[5];
      else if (lower.includes('hr') || lower.includes('crm') || lower.includes('sales') || lower.includes('operat')) recService = SERVICES_DATA[4];
      else recService = SERVICES_DATA[0];
    }

    setAnswer({
      question: qText,
      service: recService,
      summary: `For "${qText}", Growthora handles this under practice 0${recService.id} — ${recService.category}. Our team prepares end-to-end documentation, regulatory compliance, and execution follow-up.`
    });
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-container ask-modal-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="eyebrow-badge">
            <Sparkles size={14} />
            <span>INSTANT ADVISORY ASSISTANT</span>
          </div>
          <h2 className="modal-title">Ask Growthora</h2>
          <p className="modal-sub">
            Type your business situation or regulatory question for immediate practice routing.
          </p>
        </div>

        <div className="ask-input-row">
          <input
            type="text"
            className="ask-text-input"
            placeholder="e.g. Can I get a ₹5 Cr capital subsidy for my expansion?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button
            type="button"
            className="btn-ask-submit"
            onClick={() => handleAsk()}
          >
            <span>Ask</span>
            <Send size={16} />
          </button>
        </div>

        {!answer ? (
          <div className="sample-prompts-block">
            <span className="prompts-label">Popular Founder Queries:</span>
            <div className="prompts-list">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  className="prompt-chip"
                  onClick={() => {
                    setQuery(p.text);
                    handleAsk(p.text, p.targetId);
                  }}
                >
                  <HelpCircle size={14} />
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="ask-answer-box animate-fade-in">
            <div className="answer-header">
              <ShieldCheck size={18} className="ans-icon" />
              <span>Recommended Growthora Practice</span>
            </div>
            <p className="answer-summary">{answer.summary}</p>

            <div className="recommended-service-preview">
              <div className="rec-top">
                <span className="rec-num">{answer.service.num}</span>
                <span className="rec-cat">{answer.service.category}</span>
              </div>
              <h4 className="rec-title">{answer.service.title}</h4>
              <p className="rec-desc">{answer.service.description}</p>
            </div>

            <div className="answer-actions">
              <button
                type="button"
                className="btn-finder-primary"
                onClick={() => {
                  onSelectCategory(answer.service.id);
                  onClose();
                }}
              >
                <span>View Full Practice ({answer.service.navLabel})</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
