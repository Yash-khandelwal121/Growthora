import React, { useEffect, useRef } from 'react';
import { Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ChatMessages({ messages, isTyping, setShowFundingPopup }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Very simple markdown parser
  const parseMarkdown = (text) => {
    if (!text) return { __html: '' };
    let html = text
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/# (.*)/g, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br/>')
      .replace(/- (.*?)<br\/>/g, '<li>$1</li>');
    
    if (html.includes('<li>')) {
       html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    }
    return { __html: html };
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      // Could show a brief success toast here
    });
  };

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => {
        const isFundingRelevant = msg.role === 'ai' && (msg.content.toLowerCase().includes('funding assessment') || msg.content.toLowerCase().includes('fund'));

        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={`chat-message-row ${msg.role}`}>
              {msg.role === 'ai' && (
                <div className="ai-avatar">
                  <Bot size={20} />
                </div>
              )}
              
              <div className={`chat-message ${msg.role}`}>
                {msg.role === 'user' && msg.imagePreview && (
                  <img src={msg.imagePreview} alt="User Upload" />
                )}
                <div 
                  className="chat-message-content"
                  dangerouslySetInnerHTML={parseMarkdown(msg.content)} 
                />

                {msg.role === 'ai' && index !== 0 && (
                  <div className="chat-message-actions">
                    <button className="message-action-btn" onClick={() => handleCopy(msg.content)} title="Copy">
                      <Copy size={14} /> Copy
                    </button>
                    <button className="message-action-btn" title="Helpful">
                      <ThumbsUp size={14} />
                    </button>
                    <button className="message-action-btn" title="Not Helpful">
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Contextual Premium Funding CTA */}
            {isFundingRelevant && index === messages.length - 1 && (
              <div className="premium-funding-cta">
                <h4>💼 Need Business Funding?</h4>
                <p>Let Growthora identify the right funding route for your business.</p>
                <button onClick={() => setShowFundingPopup(true)}>
                  Start Funding Assessment <span>→</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
      
      {isTyping && (
        <div className="chat-message-row ai">
          <div className="ai-avatar">
            <Bot size={20} />
          </div>
          <div className="chat-message ai" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="typing-indicator">
              Growthora AI is thinking
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
