import React, { useState, useEffect } from 'react';
import { MessageSquare, X, RotateCcw, Sparkles, Globe } from 'lucide-react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { FundingSolutionPopup } from '../FundingSolutionPopup';
import './growthoraAIChat.css';

const INITIAL_MESSAGE = {
  role: 'ai',
  content: "Hello! Welcome to Growthora AI. Which language would you like to continue in?",
  isLanguagePrompt: true
};

export const SUPPORTED_LANGUAGES = [
  { name: 'English', label: 'English', code: 'en' },
  { name: 'Hindi', label: 'Hindi', code: 'hi' },
  { name: 'Telugu', label: 'Telugu', code: 'te' },
  { name: 'Malayalam', label: 'Malayalam', code: 'ml' },
  { name: 'Kannada', label: 'Kannada', code: 'kn' },
  { name: 'Marathi', label: 'Marathi', code: 'mr' },
  { name: 'Bengali', label: 'Bengali', code: 'bn' },
  { name: 'Punjabi', label: 'Punjabi', code: 'pa' }
];

export const CONFIRMATION_MESSAGES = {
  en: "Great! I'll continue in English. How can I help you today?",
  hi: "बहुत अच्छा! अब मैं आपसे हिंदी में बात करूंगा। मैं आपकी कैसे सहायता कर सकता हूँ?",
  te: "చాలా బాగుంది! ఇకపై నేను మీతో తెలుగులో మాట్లాడతాను. నేను మీకు ఎలా సహాయం చేయగలను?",
  ml: "വളരെ നല്ലത്! ഇനി ഞാൻ നിങ്ങളോട് മലയാളത്തിൽ സംസാരിക്കും. ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
  kn: "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! ಇನ್ನು ಮುಂದೆ ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  mr: "खूप छान! आता मी तुमच्याशी मराठीत बोलेन. मी तुम्हाला कशी मदत करू शकतो?",
  bn: "খুব ভালো! এখন থেকে আমি আপনার সঙ্গে বাংলায় কথা বলব। আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
  pa: "ਬਹੁਤ ਵਧੀਆ! ਹੁਣ ਮੈਂ ਤੁਹਾਡੇ ਨਾਲ ਪੰਜਾਬੀ ਵਿੱਚ ਗੱਲ ਕਰਾਂਗਾ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
};

export function GrowthoraAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFundingPopup, setShowFundingPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [playingMessageId, setPlayingMessageId] = useState(null);
  const audioPlayerRef = React.useRef(null);

  const [isLiveVoiceMode, setIsLiveVoiceMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // Initialize Language
  useEffect(() => {
    try {
      const stored = localStorage.getItem('growthora_ai_language');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedLanguage(parsed);
        setMessages([{
          role: 'ai',
          content: `Welcome back to Growthora AI! I am ready to help you in ${parsed.name}.`
        }]);
      } else {
        setMessages([INITIAL_MESSAGE]);
      }
    } catch (e) {
      setMessages([INITIAL_MESSAGE]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
    };
  }, []);

  const clearChat = () => {
    if (selectedLanguage) {
      setMessages([{
        role: 'ai',
        content: `Welcome back to Growthora AI! I am ready to help you in ${selectedLanguage.name}.`
      }]);
    } else {
      setMessages([INITIAL_MESSAGE]);
    }
    setErrorMsg(null);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    setPlayingMessageId(null);
  };

  const changeLanguage = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    setPlayingMessageId(null);
    setIsLiveVoiceMode(false);
    setSelectedLanguage(null);
    localStorage.removeItem('growthora_ai_language');
    setMessages([INITIAL_MESSAGE]);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsLiveVoiceMode(false);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      setPlayingMessageId(null);
    }
  }, [isOpen]);

  const handleLanguageSelect = async (langObj) => {
    setSelectedLanguage(langObj);
    localStorage.setItem('growthora_ai_language', JSON.stringify(langObj));

    const confirmText = CONFIRMATION_MESSAGES[langObj.code];
    
    const messageId = Date.now();
    const newAiMessage = { role: 'ai', content: confirmText, id: messageId, isVoiceResponse: true, isSystemAlert: true };
    setMessages((prev) => [...prev, newAiMessage]);
    
    await playAudio(confirmText, messageId, langObj.code);
  };

  const playAudio = (text, id, forceLangCode = null) => {
    return new Promise(async (resolve, reject) => {
      let url = null;

      try {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.pause();
          audioPlayerRef.current = null;
        }

        setPlayingMessageId(id);

        console.log('[VOICE] Sending text to TTS');

        const requestLang = forceLangCode || selectedLanguage?.code || 'en';

        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text, language: requestLang })
        });

        if (!response.ok) {
          throw new Error('TTS Failed');
        }

        const blob = await response.blob();

        url = URL.createObjectURL(blob);

        const audio = new Audio(url);

        audioPlayerRef.current = audio;

        audio.onended = () => {
          console.log('[VOICE] TTS playback finished');

          setPlayingMessageId(null);

          if (audioPlayerRef.current === audio) {
            audioPlayerRef.current = null;
          }

          URL.revokeObjectURL(url);

          resolve();
        };

        audio.onerror = (error) => {
          console.error('[VOICE] TTS playback error', error);

          setPlayingMessageId(null);

          if (audioPlayerRef.current === audio) {
            audioPlayerRef.current = null;
          }

          if (url) {
            URL.revokeObjectURL(url);
          }

          reject(error);
        };

        console.log('[VOICE] TTS playback started');

        await audio.play();

      } catch (error) {

        console.error('[VOICE] TTS error:', error);

        setPlayingMessageId(null);

        if (url) {
          URL.revokeObjectURL(url);
        }

        reject(error);
      }
    });
  };

  const handleSendMessage = async ({ text, image, imagePreview, isVoiceQuery = false }) => {
    if (isTyping) return;
    
    if (!selectedLanguage) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Please select a language first!' }]);
      return;
    }

    const userMessage = { role: 'user', content: text || 'Uploaded an image', imagePreview };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setErrorMsg(null);
    
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
      setPlayingMessageId(null);
    }

    try {
      const formData = new FormData();
      if (text) formData.append('message', text);
      if (image) formData.append('image', image);
      formData.append('language', selectedLanguage.name);
      
      const history = messages.filter(m => m.role !== 'system' && !m.isLanguagePrompt && !m.isSystemAlert).map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content
      }));
      formData.append('conversation', JSON.stringify(history.slice(-10)));

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      const messageId = Date.now();
      const newAiMessage = { role: 'ai', content: data.reply, id: messageId, isVoiceResponse: isVoiceQuery };
      
      setMessages((prev) => [...prev, newAiMessage]);
      setIsTyping(false); // Clear typing state immediately so text is visible!

      if (isVoiceQuery && data.reply) {
        try {
          await playAudio(data.reply, messageId);
        } catch (ttsError) {
          console.error('[VOICE] Non-fatal TTS error during chat:', ttsError);
        }
      }

    } catch (error) {
      console.error(error);
      setErrorMsg('Sorry, I am having trouble connecting right now. Please try again in a moment.');
      setMessages((prev) => [...prev, { role: 'ai', content: 'Sorry, I am having trouble connecting right now. Please try again in a moment.' }]);
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
                <button onClick={changeLanguage} title="Change Language"><Globe size={18} /></button>
                <button onClick={clearChat} title="Clear Conversation"><RotateCcw size={18} /></button>
                <button onClick={() => setIsOpen(false)} title="Close"><X size={22} /></button>
              </div>
            </div>

            <ChatMessages 
              messages={messages} 
              isTyping={isTyping} 
              setShowFundingPopup={setShowFundingPopup}
              playingMessageId={playingMessageId}
              setPlayingMessageId={setPlayingMessageId}
              audioPlayerRef={audioPlayerRef}
              playAudio={playAudio}
            />

            {messages.length === 1 && !selectedLanguage && (
              <div className="language-selector-container">
                <div className="language-selector-header">
                  <h4>Choose your language</h4>
                  <p>Select a language to continue</p>
                </div>
                <div className="language-selector-grid">
                  {SUPPORTED_LANGUAGES.map((langObj, i) => (
                    <button 
                      key={i} 
                      className="language-chip" 
                      onClick={() => handleLanguageSelect(langObj)}
                    >
                      {langObj.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ChatInput 
              onSendMessage={handleSendMessage} 
              isTyping={isTyping}
              isLiveVoiceMode={isLiveVoiceMode}
              setIsLiveVoiceMode={setIsLiveVoiceMode}
              playAudio={playAudio}
              audioPlayerRef={audioPlayerRef}
              playingMessageId={playingMessageId}
              selectedLanguage={selectedLanguage}
              onLanguageSelect={handleLanguageSelect}
            />
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
