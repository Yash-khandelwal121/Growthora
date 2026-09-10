import React, { useState, useEffect } from 'react';
import { MessageSquare, X, RotateCcw, Sparkles } from 'lucide-react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { FundingSolutionPopup } from '../FundingSolutionPopup';
import './growthoraAIChat.css';

const INITIAL_MESSAGE = {
  role: 'ai',
  content: "👋 Welcome to Growthora AI\n\nI can help you explore Growthora's services, funding solutions, government schemes, compliance, registrations and business growth opportunities."
};

const SUGGESTIONS = [
  "Services",
  "Funding",
  "MSME Schemes",
  "IPO",
  "FSSAI"
];

export function GrowthoraAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFundingPopup, setShowFundingPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setErrorMsg(null);
  };

  const handleSendMessage = async ({ text, image, imagePreview }) => {
    const userMessage = { role: 'user', content: text || 'Uploaded an image', imagePreview };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      if (text) formData.append('message', text);
      if (image) formData.append('image', image);
      
      const history = messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content
      }));
      formData.append('conversation', JSON.stringify(history.slice(-10))); // send last 10 messages

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);

    } catch (error) {
      console.error(error);
      setErrorMsg('Sorry, I am having trouble connecting right now. Please try again in a moment.');
      setMessages((prev) => [...prev, { role: 'ai', content: 'Sorry, I am having trouble connecting right now. Please try again in a moment.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="growthora-ai-wrapper">
        {isOpen ? (
          <div className="growthora-ai-panel">
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-header-info-title">
                  <h3>Growthora AI <Sparkles size={14} style={{ color: '#ff6b00' }} /></h3>
                  <div className="status-indicator"></div>
                </div>
                <p>Your Growth & Business Assistant</p>
              </div>
              <div className="chat-header-actions">
                <button onClick={clearChat} title="Clear Conversation"><RotateCcw size={18} /></button>
                <button onClick={() => setIsOpen(false)} title="Close"><X size={22} /></button>
              </div>
            </div>

            <ChatMessages 
              messages={messages} 
              isTyping={isTyping} 
              setShowFundingPopup={setShowFundingPopup} 
            />

            {messages.length === 1 && (
              <div className="suggested-prompts-container">
                <div className="suggested-prompts-scroll">
                  {SUGGESTIONS.map((s, i) => (
                    <button 
                      key={i} 
                      className="suggested-prompt-chip" 
                      onClick={() => handleSendMessage({ text: s })}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
          </div>
        ) : (
          <button className="growthora-ai-button" onClick={() => setIsOpen(true)}>
            <MessageSquare size={28} />
          </button>
        )}
      </div>

      {showFundingPopup && (
        <FundingSolutionPopup isModal={true} onClose={() => setShowFundingPopup(false)} />
      )}
    </>
  );
}
