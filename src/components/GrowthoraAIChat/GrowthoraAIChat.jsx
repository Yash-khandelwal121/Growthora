import React, { useState, useEffect } from 'react';
import { MessageSquare, X, RotateCcw, Sparkles, Globe } from 'lucide-react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { FundingSolutionPopup } from '../FundingSolutionPopup';
import aiLogo from '../../assets/growthora_chatbot_logo.jpg';
import cleanLogo from '../../assets/growthora_logo_clean.png';
import './growthoraAIChat.css';

const INITIAL_MESSAGE = {
  role: 'ai',
  content: "Hello! Welcome to Growthora AI. Which language would you like to continue in?",
  isLanguagePrompt: true
};

export const SUPPORTED_LANGUAGES = [
  { name: 'English', label: 'English', code: 'en-IN' },
  { name: 'Hindi', label: 'Hindi', code: 'hi-IN' },
  { name: 'Telugu', label: 'Telugu', code: 'te-IN' },
  { name: 'Malayalam', label: 'Malayalam', code: 'ml-IN' },
  { name: 'Kannada', label: 'Kannada', code: 'kn-IN' },
  { name: 'Marathi', label: 'Marathi', code: 'mr-IN' },
  { name: 'Bengali', label: 'Bengali', code: 'bn-IN' },
  { name: 'Punjabi', label: 'Punjabi', code: 'pa-IN' }
];

export const VOICE_LANGUAGES = {
  english: { speechRecognition: 'en-IN', tts: 'en-IN' },
  hindi: { speechRecognition: 'hi-IN', tts: 'hi-IN' },
  telugu: { speechRecognition: 'te-IN', tts: 'te-IN' },
  malayalam: { speechRecognition: 'ml-IN', tts: 'ml-IN' },
  kannada: { speechRecognition: 'kn-IN', tts: 'kn-IN' },
  marathi: { speechRecognition: 'mr-IN', tts: 'mr-IN' },
  bengali: { speechRecognition: 'bn-IN', tts: 'bn-IN' },
  punjabi: { speechRecognition: 'pa-IN', tts: 'pa-IN' }
};

export const CONFIRMATION_MESSAGES = {
  'en-IN': "Great! I'll continue in English. How can I help you today?",
  'hi-IN': "बहुत अच्छा! अब मैं आपसे हिंदी में बात करूंगा। मैं आपकी कैसे सहायता कर सकता हूँ?",
  'te-IN': "చాలా బాగుంది! ఇకపై నేను మీతో తెలుగులో మాట్లాడతాను. నేను మీకు ఎలా సహాయం చేయగలను?",
  'ml-IN': "വളരെ നല്ലത്! ഇനി ഞാൻ നിങ്ങളോട് മലയാളത്തിൽ സംസാരിക്കും. ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
  'kn-IN': "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! ಇನ್ನು ಮುಂದೆ ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  'mr-IN': "खूप छान! आता मी तुमच्याशी मराठीत बोलेन. मी तुम्हाला कशी मदत करू शकतो?",
  'bn-IN': "খুব ভালো! এখন থেকে আমি আপনার সঙ্গে বাংলায় কথা বলব। আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
  'pa-IN': "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ Growthora AI ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
};

export function GrowthoraAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFundingPopup, setShowFundingPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const [playingMessageId, setPlayingMessageId] = useState(null);
  const audioPlayerRef = React.useRef(null);
  const ttsCancelledRef = React.useRef(false);

  const [isLiveVoiceMode, setIsLiveVoiceMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // Initialize Language
  useEffect(() => {
    setMessages([INITIAL_MESSAGE]);
    // localStorage caching intentionally removed to force language selection every time
  }, []);

  const stopAudio = () => {
    const audio = audioPlayerRef.current;
    
    ttsCancelledRef.current = true;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (!audio) {
      setPlayingMessageId(null);
      return;
    }

    console.log('[VOICE] STOP AUDIO');

    audio.onended = null;
    audio.onerror = null;
    audio.onpause = null;

    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {
      console.warn('[VOICE] Error stopping audio:', e);
    }

    if (audio.src?.startsWith('blob:')) {
      URL.revokeObjectURL(audio.src);
    }

    audioPlayerRef.current = null;
    setPlayingMessageId(null);
  };

  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        stopAudio();
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
    stopAudio();
  };

  const changeLanguage = () => {
    stopAudio();
    setIsLiveVoiceMode(false);
    setSelectedLanguage(null);
    setMessages([INITIAL_MESSAGE]);
    setShowLangMenu(false);
  };

  useEffect(() => {
    if (isOpen) {
      setIsLiveVoiceMode(true);
    } else {
      setIsLiveVoiceMode(false);
      stopAudio();
    }
  }, [isOpen]);

  const handleLanguageSelect = async (langObj) => {
    console.log(`[VOICE TIMING] ${Date.now()} - languageDetected: ${langObj.name}`);
    setSelectedLanguage(langObj);
    setIsLiveVoiceMode(true);
    
    const confirmText = CONFIRMATION_MESSAGES[langObj.code];
    console.log(`[VOICE TIMING] ${Date.now()} - confirmationGenerated: ${confirmText}`);
    
    const messageId = Date.now();
    const newAiMessage = { role: 'ai', content: confirmText, id: messageId, isVoiceResponse: true, isSystemAlert: true };
    setMessages((prev) => [...prev, newAiMessage]);
    
    await playAudio(confirmText, messageId, langObj.code);
  };

  const playAudio = (text, id, forceLangCode = null) => {
    return new Promise(async (resolve, reject) => {
      let url = null;
      
      ttsCancelledRef.current = false;

      try {
        if (audioPlayerRef.current) {
          stopAudio();
          ttsCancelledRef.current = false;
        }

        console.log(`[VOICE TIMING] ${Date.now()} - playAudio Started (fetching /api/tts)`);
        setPlayingMessageId(id);

        const requestLangObjName = selectedLanguage?.name?.toLowerCase() || 'english';
        const langConfig = VOICE_LANGUAGES[requestLangObjName] || VOICE_LANGUAGES.english;
        const finalLangCode = forceLangCode || langConfig.tts;

        console.log(`[VOICE TIMING] ${Date.now()} - TTSRequest started`);

        console.log(`[VOICE_PRODUCTION_LOG] TTS_REQUEST_START - Fetching /api/tts for lang: ${finalLangCode}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s TTS timeout

        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            text, 
            language: requestLangObjName,
            languageCode: finalLangCode
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        console.log(`[VOICE_PRODUCTION_LOG] TTS_RESPONSE - Status: ${response.status}`);

        if (!response.ok) {
          throw new Error(`TTS Failed with status: ${response.status}`);
        }

        if (ttsCancelledRef.current) {
          reject(new Error('TTS Cancelled before playback'));
          return;
        }

        const blob = await response.blob();

        if (ttsCancelledRef.current) {
          reject(new Error('TTS Cancelled before playback'));
          return;
        }

        url = URL.createObjectURL(blob);

        console.log(`[VOICE TIMING] ${Date.now()} - Cloud TTS Blob Received`);

        const audio = new Audio(url);

        audioPlayerRef.current = audio;

        audio.onended = () => {
          console.log(`[VOICE TIMING] ${Date.now()} - audioEnded (Cloud)`);

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

        console.log(`[VOICE TIMING] ${Date.now()} - audioStarted (Cloud)`);
        await audio.play();

      } catch (error) {
        console.log(`[VOICE_PRODUCTION_LOG] VOICE_ERROR during TTS API`, error);
        console.error('[VOICE] Cloud TTS error, falling back to native Web Speech API:', error);

        // Fallback to native Web Speech API
        if ('speechSynthesis' in window) {
          try {
            const requestLangObjName = selectedLanguage?.name?.toLowerCase() || 'english';
            const langConfig = VOICE_LANGUAGES[requestLangObjName] || VOICE_LANGUAGES.english;
            const finalLangCode = forceLangCode || langConfig.tts;
            
            // Deep sanitize for speech to avoid native voices pronouncing markdown symbols
            const speechSafeText = text
              .replace(/[*#_>`~\[\]={}]/g, '')
              .replace(/(?:\s-\s|--+)/g, ' ')
              .replace(/\n+/g, '. ')
              .trim();
              
            const utterance = new SpeechSynthesisUtterance(speechSafeText);
            utterance.lang = finalLangCode;
            
            // Try to find a native voice that perfectly matches the locale
            const voices = window.speechSynthesis.getVoices();
            const nativeVoice = voices.find(v => v.lang === finalLangCode) || 
                                voices.find(v => v.lang.startsWith(finalLangCode.split('-')[0]));
            if (nativeVoice) {
              utterance.voice = nativeVoice;
            }

            utterance.onend = () => {
              console.log(`[VOICE TIMING] ${Date.now()} - audioEnded (Native)`);
              setPlayingMessageId(null);
              resolve();
            };

            utterance.onerror = (e) => {
              console.error('[VOICE] Native TTS error:', e);
              setPlayingMessageId(null);
              reject(e);
            };

            console.log(`[VOICE TIMING] ${Date.now()} - audioStarted (Native) [Locale: ${utterance.lang}]`);
            window.speechSynthesis.speak(utterance);
            return;
          } catch (nativeErr) {
            console.error('[VOICE] Native TTS fallback also failed:', nativeErr);
          }
        }

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
    
    stopAudio();

    try {
      console.log(`[VOICE_PRODUCTION_LOG] CHAT_REQUEST_START - Query: ${text}`);
      
      const history = messages.filter(m => m.role !== 'system' && !m.isLanguagePrompt && !m.isSystemAlert).map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content
      }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s chat timeout

      let response;
      if (image) {
        // Send as FormData ONLY if there's an image, as multer on Vercel can hang on text-only FormData
        const formData = new FormData();
        if (text) formData.append('message', text);
        formData.append('image', image);
        formData.append('language', selectedLanguage.name);
        formData.append('conversation', JSON.stringify(history.slice(-10)));

        response = await fetch('/api/chat', {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });
      } else {
        // Send as JSON if there's no image to bypass multer hanging issue
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            language: selectedLanguage.name,
            conversation: JSON.stringify(history.slice(-10))
          }),
          signal: controller.signal
        });
      }
      
      clearTimeout(timeoutId);
      
      console.log(`[VOICE_PRODUCTION_LOG] CHAT_RESPONSE - Status: ${response.status}`);
      const data = await response.json();
      console.log(`[VOICE TIMING] ${Date.now()} - Chat Response Received`);

      if (!response.ok) {
        throw new Error(data.error || `Failed to fetch AI response: ${response.status}`);
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
      console.error(`[VOICE_PRODUCTION_LOG] VOICE_ERROR during /api/chat`, error);
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
              <div className="chat-header-brand">
                <div className="chat-header-logo-container">
                  <img src={cleanLogo} alt="Growthora Logo" className="chat-header-logo" />
                </div>
                <div className="chat-header-info">
                  <div className="chat-header-info-title">
                    <h3>Growthora AI</h3>
                    <Sparkles size={14} style={{ color: '#ff6b00', marginLeft: '4px', marginRight: '4px' }} />
                    <div className="status-indicator"></div>
                  </div>
                  <p>Your Growth & Business Assistant</p>
                </div>
              </div>
              <div className="chat-header-actions">
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setShowLangMenu(!showLangMenu)} title="Change Language"><Globe size={18} /></button>
                  {showLangMenu && (
                    <div className="language-dropdown-menu">
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <button 
                          key={lang.code} 
                          onClick={() => {
                            stopAudio();
                            handleLanguageSelect(lang);
                            setShowLangMenu(false);
                          }}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
              onStopAudio={stopAudio}
            />



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
          <>
            <button className="growthora-ai-button" onClick={() => setIsOpen(true)} style={{ padding: 0, overflow: 'visible', border: '2px solid rgba(255,107,0,0.3)', position: 'relative' }}>
              <img src={aiLogo} alt="Growthora AI Chat" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              <div className="ai-chat-badge" style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#ff6b00',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                border: '2px solid white'
              }}>
                <Sparkles size={12} color="white" />
              </div>
            </button>
            <div className="growthora-welcome-bubble" onClick={() => setIsOpen(true)}>
              <div className="welcome-sparkles">
                <Sparkles size={22} className="welcome-sparkles-icon-main" />
                <Sparkles size={12} className="welcome-sparkles-icon-sub" />
              </div>
              <div className="welcome-text">
                <div className="welcome-title">Hi! I'm Growthora AI</div>
                <div className="welcome-subtitle">How can I help you today?</div>
              </div>
              <div className="welcome-tail"></div>
            </div>
          </>
        )}
      </div>

      {showFundingPopup && (
        <FundingSolutionPopup isModal={true} onClose={() => setShowFundingPopup(false)} />
      )}
    </>
  );
}
