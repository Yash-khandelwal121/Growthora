## D:\Growthora\src\components\GrowthoraAIChat\ChatInput.jsx

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Mic, X, Loader2, Square, Keyboard, AudioLines } from 'lucide-react';
import { VOICE_LANGUAGES } from './GrowthoraAIChat';



export default function ChatInput({ 
  onSendMessage, 
  isTyping, 
  isLiveVoiceMode, 
  setIsLiveVoiceMode, 
  playAudio, 
  audioPlayerRef,
  playingMessageId,
  isAudioPlaying,
  selectedLanguage,
  onLanguageSelect,
  onStopAudio,
  onStopAssistant
}) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Voice UI state
  const [voiceState, setVoiceState] = useState('idle');
  const [voiceError, setVoiceError] = useState('');
  
  const fileInputRef = useRef(null);
  
  // Runtime Locks
  const isLiveVoiceModeRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isProcessingRef = useRef(false);
  const recognitionRunningRef = useRef(false);
  const lastTtsEndTimeRef = useRef(0);
  const ttsStartTimeRef = useRef(0);
  const listeningUnlockTimerRef = useRef(null);
  const recognitionRef = useRef(null);

  const selectedLanguageRef = useRef(selectedLanguage);
  const onSendMessageRef = useRef(onSendMessage);
  const onLanguageSelectRef = useRef(onLanguageSelect);
  const onStopAudioRef = useRef(onStopAudio);
  const onStopAssistantRef = useRef(onStopAssistant);

  useEffect(() => { selectedLanguageRef.current = selectedLanguage; }, [selectedLanguage]);
  useEffect(() => { onSendMessageRef.current = onSendMessage; }, [onSendMessage]);
  useEffect(() => { onLanguageSelectRef.current = onLanguageSelect; }, [onLanguageSelect]);
  useEffect(() => { onStopAudioRef.current = onStopAudio; }, [onStopAudio]);
  useEffect(() => { onStopAssistantRef.current = onStopAssistant; }, [onStopAssistant]);

  // Fallback unlock if API fails or returns no audio
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        if (isProcessingRef.current && !isSpeakingRef.current && isLiveVoiceModeRef.current) {
           console.log("[VOICE] API finished but no TTS started. Unlocking.");
           isProcessingRef.current = false;
           setVoiceState('listening');
           startRecognition();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // Initialize SpeechRecognition once
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError("Live voice conversation is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    
    // Initial lang (will be updated by another effect)
    recognition.lang = 'en-IN';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("[VOICE] Recognition STARTED");
      recognitionRunningRef.current = true;
      setVoiceState('listening');
    };

    recognition.onsoundstart = () => {
      // 1. Only allow barge-in if the bot is actually speaking
      if (!isSpeakingRef.current) return;

      // 2. 500ms grace period check (echo prevention)
      const elapsed = Date.now() - ttsStartTimeRef.current;
      if (elapsed < 500) {
          console.log("[VOICE] Sound detected during grace period. Ignoring (echo prevention).");
          return;
      }
      
      // 3. Barge-in trigger
      console.log("[VOICE] Barge-in detected! But keeping audio playing for debugging.");
      // if (onStopAudioRef.current) {
      //   onStopAudioRef.current();
      // }
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }
      
      const fullTranscriptForLang = (finalTranscript + " " + interimTranscript).trim();

      // INTERRUPT/BARGE-IN DETECTION: Check immediately on both interim and final
      const stopRegex = /(?:\b|\s|^)(stop|stop speaking|bas|बस|रुक|रुको|चुप|बंद करो|बोलना बंद करो|ruk|ruko|chup|band karo|shh|quiet)(?:\b|\s|$)/i;
      const stopMatch = stopRegex.exec(fullTranscriptForLang);
      
      if (stopMatch) {
         console.log("[VOICE] Stop command detected in transcript! Halting AI.");
         if (onStopAssistantRef.current) {
            onStopAssistantRef.current(); // Central abort
         }
         
         const remainingText = fullTranscriptForLang.substring(stopMatch.index + stopMatch[0].length).trim();
         
         try { recognition.stop(); } catch(e){}
         recognitionRunningRef.current = false;
         isProcessingRef.current = false;
         setVoiceState('listening');
         
         if (remainingText.length > 2) {
             console.log("[VOICE] Text after stop detected, processing as new query:", remainingText);
             isProcessingRef.current = true;
             setVoiceState('thinking');
             
             onSendMessageRef.current({
               text: remainingText,
               image: null,
               imagePreview: null,
               isVoiceQuery: true
             });
         } else {
             const langName = selectedLanguageRef.current?.name?.toLowerCase() || 'english';
             const ackMsg = langName.startsWith('hi') ? 'Ji, main ruk gayi. Batayein.' : 'I have stopped. Please go ahead.';
             isProcessingRef.current = true;
             setVoiceState('speaking');
             playAudio(ackMsg, 'ack-stop').then(() => {
                 isProcessingRef.current = false;
                 setVoiceState('listening');
                 startRecognition();
             });
         }
         return; // Early return to prevent chat call
      }

      // Prevent duplicate processing if already thinking/processing or speaking
      if (isProcessingRef.current || isSpeakingRef.current) return;

      // IMMEDIATE ONBOARDING LANGUAGE DETECTION (No waiting for silence/isFinal)
      if (!selectedLanguageRef.current && fullTranscriptForLang.length > 0) {
        const lowerText = fullTranscriptForLang.toLowerCase();
        const supported = [
          { name: 'English', code: 'en-IN', words: ['english'] },
          { name: 'Hindi', code: 'hi-IN', words: ['hindi', 'हिंदी'] },
          { name: 'Telugu', code: 'te-IN', words: ['telugu', 'తెలుగు'] },
          { name: 'Malayalam', code: 'ml-IN', words: ['malayalam', 'മലയാളം'] },
          { name: 'Kannada', code: 'kn-IN', words: ['kannada', 'ಕನ್ನಡ'] },
          { name: 'Marathi', code: 'mr-IN', words: ['marathi', 'मराठी'] },
          { name: 'Bengali', code: 'bn-IN', words: ['bengali', 'bangla', 'বাংলা'] },
          { name: 'Punjabi', code: 'pa-IN', words: ['punjabi', 'ਪੰਜਾਬੀ'] }
        ];

        for (const lang of supported) {
          if (lang.words.some(w => lowerText.includes(w))) {
            console.log(`[VOICE TIMING] ${Date.now()} - Onboarding language detected (Interim):`, lang.name);
            
            // IMMEDIATELY lock processing so ghost final transcripts do not trigger /api/chat
            isProcessingRef.current = true;
            recognitionRunningRef.current = false;
            
            try { recognition.stop(); } catch(e){}
            
            onLanguageSelectRef.current(lang);
            return;
          }
        }
      }
      
      const normalizeTranscript = (text) => {
        // Context-aware replacement of common Growthora misrecognitions
        return text.replace(/(?:^|\s)(गुरुद्वारा|ग्रोथोरा|Growth Ora|ग्रोथोरा AI|Growth aura)(?=\s|$|[.,!?])/gi, ' Growthora');
      };
      
      const finalText = normalizeTranscript(finalTranscript.trim());
      
      const isAnyFinal = Array.from(event.results).some(r => r.isFinal);
      if (isAnyFinal && finalText.length < 2) {
          console.log("[VOICE] USER SPEECH IGNORED (Too short/noise):", finalText);
          const langName = selectedLanguageRef.current?.name?.toLowerCase() || 'english';
          const repeatMsg = langName.startsWith('hi') 
            ? "Maaf kijiye, aapki awaaz clear nahi aayi. Kya aap ek baar phir se bol sakte hain?" 
            : "Sorry, I couldn't hear you clearly. Could you please say that again?";
          
          try { recognition.stop(); } catch(e){}
          recognitionRunningRef.current = false;
          isProcessingRef.current = true;
          setVoiceState('speaking');
          playAudio(repeatMsg, 'repeat-prompt').then(() => {
              isProcessingRef.current = false;
              setVoiceState('listening');
              startRecognition();
          });
          return;
      }

      if (!finalText) return;
      
      console.log(`[VOICE_PRODUCTION_LOG] FINAL_TRANSCRIPT: ${finalText}`);
      console.log(`[VOICE TIMING] ${Date.now()} - STT Final Transcript received:`, finalText);

      const elapsed = Date.now() - lastTtsEndTimeRef.current;
      if (elapsed < 200) {
        console.log("[VOICE] USER SPEECH IGNORED (TTS Cooldown):", finalText);
        return;
      }
      
      console.log(`[VOICE TIMING] ${Date.now()} - Chat Start (Sending to /api/chat)`);

      try { recognition.stop(); } catch(e){}
      
      recognitionRunningRef.current = false;
      isProcessingRef.current = true;
      setVoiceState('thinking');
      
      onSendMessageRef.current({
        text: finalText,
        image: null,
        imagePreview: null,
        isVoiceQuery: true
      });
    };

    recognition.onend = () => {
      recognitionRunningRef.current = false;

      if (!isLiveVoiceModeRef.current) return;
      if (isSpeakingRef.current) return;
      if (isProcessingRef.current) return;

      const elapsed = Date.now() - lastTtsEndTimeRef.current;
      const delay = Math.max(100, 200 - elapsed);

      clearTimeout(listeningUnlockTimerRef.current);
      listeningUnlockTimerRef.current = setTimeout(() => {
        if (
          isLiveVoiceModeRef.current &&
          !isSpeakingRef.current &&
          !isProcessingRef.current &&
          !recognitionRunningRef.current
        ) {
          startRecognition();
        }
      }, delay);
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        console.warn("[VOICE] Recognition error:", event.error);
        recognitionRunningRef.current = false;
        setIsLiveVoiceMode(false);
        alert('Microphone permission denied.');
      } else if (event.error !== 'no-speech') {
        console.warn("[VOICE] Recognition error:", event.error);
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startRecognition = () => {
    if (!isLiveVoiceModeRef.current) return;
    if (isProcessingRef.current) {
      return;
    }
    if (recognitionRunningRef.current) return;
    if (!recognitionRef.current) return;

    try {
      console.log("[VOICE] STARTING LISTENING");
      recognitionRef.current.start();
    } catch (error) {
      console.warn("[VOICE] Recognition start failed:", error);
    }
  };

  const stopVoiceMode = () => {
    isSpeakingRef.current = false;
    isProcessingRef.current = false;
    clearTimeout(listeningUnlockTimerRef.current);
    setVoiceState('idle');
    if (recognitionRunningRef.current) {
      try { recognitionRef.current?.abort(); } catch(e){}
      recognitionRunningRef.current = false;
    }
  };

  // Update SpeechRecognition lang when selectedLanguage changes
  useEffect(() => {
    if (recognitionRef.current) {
      const requestLang = selectedLanguage?.name?.toLowerCase() || 'english';
      const langConfig = VOICE_LANGUAGES[requestLang] || VOICE_LANGUAGES.english;
      recognitionRef.current.lang = selectedLanguage ? langConfig.speechRecognition : 'en-IN';
      
      if (recognitionRunningRef.current) {
        try { recognitionRef.current.abort(); } catch(e){}
      }
    }
  }, [selectedLanguage]);

  // Greeting flow
  useEffect(() => {
    isLiveVoiceModeRef.current = isLiveVoiceMode;

    const runGreeting = async () => {
      console.log("[VOICE] TTS FETCHING GREETING");
      isProcessingRef.current = true;
      setVoiceState('thinking');
      
      try {
        if (!selectedLanguageRef.current) {
          const prompt = "Hello! Welcome to Growthora AI. Please select your language. You can say English, Hindi, Telugu, Malayalam, Kannada, Marathi, Bengali, or Punjabi.";
          await playAudio(prompt, 'language-prompt', 'en-IN');
        } else {
          // If a language is already selected, just play a localized welcome back greeting
          const GREETINGS = {
            english: "Welcome back! How can I help you today?",
            hindi: "वापसी पर स्वागत है! आज मैं आपकी कैसे मदद कर सकती हूँ?",
            telugu: "తిరిగి స్వాగతం! ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?",
            malayalam: "തിരികെ സ്വാഗതം! ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?",
            kannada: "ಮತ್ತೆ ಸ್ವಾಗತ! ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
            marathi: "परत स्वागत आहे! आज मी तुम्हाला कशी मदत करू शकेन?",
            bengali: "ফিরে আসার জন্য স্বাগত! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
            punjabi: "ਵਾਪਸੀ 'ਤੇ ਜੀ ਆਇਆਂ ਨੂੰ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
          };
          const requestLang = selectedLanguageRef.current?.name?.toLowerCase() || 'english';
          const greetingText = GREETINGS[requestLang] || GREETINGS.english;
          
          await playAudio(greetingText, 'greeting');
        }
      } catch (err) {
        console.error(err);
      }
      
      // Wait for playAudio to completely finish, but don't force 'listening' state 
      // if we are already processing another message or stopped.
      if (!isLiveVoiceModeRef.current || isProcessingRef.current) return;
      
      console.log("[VOICE] TTS GREETING END");
      isSpeakingRef.current = false;
      lastTtsEndTimeRef.current = Date.now();
      setVoiceState('listening');
      
      clearTimeout(listeningUnlockTimerRef.current);
      listeningUnlockTimerRef.current = setTimeout(() => {
        if (
          isLiveVoiceModeRef.current &&
          !isSpeakingRef.current &&
          !isProcessingRef.current
        ) {
          startRecognition();
        }
      }, 200);
    };

    if (isLiveVoiceMode) {
      if (voiceError) return;
      runGreeting();
    } else {
      stopVoiceMode();
    }
  }, [isLiveVoiceMode, voiceError]);

  // Handle TTS Lifecycle from parent AI response
  useEffect(() => {
    if (isLiveVoiceMode) {
      if (isAudioPlaying) {
        console.log("[VOICE] TTS ACTUAL PLAYBACK STARTED");
        isSpeakingRef.current = true;
        isProcessingRef.current = false;
        ttsStartTimeRef.current = Date.now();
        setVoiceState('speaking');
        
        // DO NOT abort recognition. Let it listen for barge-in.
        if (isLiveVoiceModeRef.current && !recognitionRunningRef.current) {
           startRecognition();
        }
      } else {
        if (isSpeakingRef.current) {
          console.log("[VOICE] TTS END");
          isSpeakingRef.current = false;
          isProcessingRef.current = false;
          lastTtsEndTimeRef.current = Date.now();
          setVoiceState('listening');
          
          clearTimeout(listeningUnlockTimerRef.current);
          listeningUnlockTimerRef.current = setTimeout(() => {
            if (
              isLiveVoiceModeRef.current &&
              !isSpeakingRef.current &&
              !isProcessingRef.current
            ) {
              startRecognition();
            }
          }, 200);
        }
      }
    }
  }, [isAudioPlaying, isLiveVoiceMode]);

  useEffect(() => {
    return () => {
      stopVoiceMode();
    };
  }, []);

  // Standard chat handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    onSendMessage({ text, image, imagePreview, isVoiceQuery: false });
    setText('');
    removeImage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (isLiveVoiceMode) {
    if (voiceError) {
      return (
        <div className="live-voice-overlay error-state">
          <div className="voice-modal-box">
            <button type="button" className="close-voice-btn" onClick={() => setIsLiveVoiceMode(false)}>
              <X size={16} />
            </button>
            <div className="voice-status-text error-text">
              <span>{voiceError}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="live-voice-overlay">
        <div className="voice-modal-box">
          <button 
            type="button" 
            className="close-voice-btn" 
            onClick={() => setIsLiveVoiceMode(false)}
            title="Switch to Text Chat"
          >
            <X size={18} />
          </button>
          
          <div className={`ai-robot-container ${voiceState}`}>
            <div className="ai-robot-glow-bg"></div>
            <video 
              src="/1000137542_gwr_video_mvp.mp4" 
              className="ai-robot-icon" 
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-input-area">
      {imagePreview && (
        <div className="image-preview-container">
          <img src={imagePreview} alt="Preview" />
          <span className="preview-text">{image.name}</span>
          <button type="button" onClick={removeImage} title="Remove image">
            <X size={14} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input-wrapper">
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }} 
          ref={fileInputRef} 
          onChange={handleImageChange}
        />
        
        <button 
          type="button" 
          className="icon-button" 
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
        >
          <ImageIcon size={20} />
        </button>

        <textarea 
          placeholder="Ask me anything..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
          rows={1}
        />

        <button 
          type="button" 
          className="icon-button" 
          onClick={() => setIsLiveVoiceMode(true)}
          title="Live Voice Mode"
        >
          <Mic size={20} />
        </button>

        <button 
          type="submit" 
          className="send-button" 
          disabled={isTyping || (!text.trim() && !image)}
          title="Send Message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

```

## D:\Growthora\src\components\GrowthoraAIChat\ChatMessages.jsx

```jsx
import React, { useEffect, useRef } from 'react';
import { Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import cleanLogo from '../../assets/growthora_logo_clean.png';

export default function ChatMessages({ messages, isTyping, setShowFundingPopup, playingMessageId, setPlayingMessageId, audioPlayerRef, playAudio, onStopAudio }) {
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

  // Auto-play is now handled explicitly in GrowthoraAIChat's handleSendMessage
  // to avoid duplicate playback and race conditions.

  return (
    <div className="chat-messages">
      <div className="chat-watermark-bg">
        <img src={cleanLogo} alt="Growthora Watermark" />
      </div>
      {messages.map((msg, index) => {
        const isFundingRelevant = msg.role === 'ai' && typeof msg.content === 'string' && (msg.content.toLowerCase().includes('funding assessment') || msg.content.toLowerCase().includes('fund'));
        const msgId = msg.id || index;

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
                    <button 
                      className={`message-action-btn ${playingMessageId === msgId ? 'playing' : ''}`}
                      onClick={() => {
                        if (playingMessageId === msgId) {
                          onStopAudio();
                        } else {
                          playAudio(msg.content, msgId);
                        }
                      }}
                      title={playingMessageId === msgId ? 'Stop Listening' : 'Listen'}
                    >
                      {playingMessageId === msgId ? (
                        <>⏹️ Stop</>
                      ) : (
                        <>🔊 Listen</>
                      )}
                    </button>
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

```

## D:\Growthora\src\components\GrowthoraAIChat\GrowthoraAIChat.jsx

```jsx
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
  content: "Namaste! Main Growthora AI Assistant hoon. Main aapki business aur funding related queries mein madad kar sakti hoon.\n\nWhich language would you like to continue in?",
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
  'hi-IN': "बिल्कुल, अब से मैं आपसे हिंदी में बात करूंगी। मैं आपकी कैसे सहायता कर सकती हूँ?",
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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [isLiveVoiceMode, setIsLiveVoiceMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [convState, setConvState] = useState('language_selection');
  const [sessionId, setSessionId] = useState(() => 'sess_' + Date.now());
  const [leadData, setLeadData] = useState({});

  const groqAbortControllerRef = React.useRef(null);
  const ttsAbortControllerRef = React.useRef(null);

  const stopAssistantSpeech = () => {
    console.log('[VOICE] Stop command detected (Central Stop Function)');

    if (groqAbortControllerRef.current) {
      groqAbortControllerRef.current.abort();
      groqAbortControllerRef.current = null;
    }

    if (ttsAbortControllerRef.current) {
      ttsAbortControllerRef.current.abort();
      ttsAbortControllerRef.current = null;
    }

    stopAudio();
    setIsTyping(false);
  };

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
      setIsAudioPlaying(false);
      return;
    }

    console.log('[VOICE] STOP AUDIO');

    audio.onended = null;
    audio.onerror = null;
    audio.onpause = null;
    audio.onplaying = null;

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
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        stopAudio();
      }
    };
  }, []);

  const clearChat = () => {
    const newSession = 'sess_' + Date.now();
    setSessionId(newSession);
    setLeadData({});
    if (selectedLanguage) {
      setConvState('collect_name');
      const msg = getLocalizedPrompt('ask_name', selectedLanguage.code);
      setMessages([{
        role: 'ai',
        content: msg,
        id: Date.now()
      }]);
      playAudio(msg, Date.now());
    } else {
      setConvState('language_selection');
      setMessages([INITIAL_MESSAGE]);
    }
    setErrorMsg(null);
    stopAudio();
  };

  const changeLanguage = () => {
    stopAudio();
    setIsLiveVoiceMode(false);
    setSelectedLanguage(null);
    setConvState('language_selection');
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

  const getLocalizedPrompt = (promptType, langCode) => {
    const prompts = {
      'ask_name': {
        'en-IN': "Great! What is your name?",
        'hi-IN': "बहुत अच्छा! क्या मैं आपका नाम जान सकती हूँ?",
        'te-IN': "చాలా బాగుంది! మీ పేరు ఏమిటి?",
        'ml-IN': "വളരെ നല്ലത്! നിങ്ങളുടെ പേരെന്താണ്?",
        'kn-IN': "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! ನಿಮ್ಮ ಹೆಸರೇನು?",
        'mr-IN': "खूप छान! मी तुमचे नाव जाणून घेऊ शकतो का?",
        'bn-IN': "খুব ভালো! আপনার নাম কী?",
        'pa-IN': "ਬਹੁਤ ਵਧੀਆ! ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?"
      },
      'ask_mobile': {
        'en-IN': "Thank you. Could you please provide your 10-digit mobile number?",
        'hi-IN': "धन्यवाद। क्या आप अपना 10 अंकों का मोबाइल नंबर बता सकते हैं?",
        'te-IN': "ధన్యవాదాలు. దయచేసి మీ 10 అంకెల మొబైల్ నంబర్‌ను చెప్పగలరా?",
        'ml-IN': "നന്ദി. ദയവായി നിങ്ങളുടെ 10 അക്ക മൊബൈൽ നമ്പർ നൽകാമോ?",
        'kn-IN': "ಧನ್ಯವಾದಗಳು. ದಯವಿಟ್ಟು ನಿಮ್ಮ 10 ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಒದಗಿಸಬಹುದೇ?",
        'mr-IN': "धन्यवाद. कृपया तुम्ही तुमचा १० अंकी मोबाईल नंबर सांगू शकता का?",
        'bn-IN': "ধন্যবাদ। আপনি কি আপনার ১০-সংখ্যার মোবাইল নম্বর দিতে পারেন?",
        'pa-IN': "ਧੰਨਵਾਦ। ਕੀ ਤੁਸੀਂ ਆਪਣਾ 10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦੇ ਸਕਦੇ ਹੋ?"
      },
      'invalid_mobile': {
        'en-IN': "That doesn't seem like a valid 10-digit number. Please provide your mobile number again.",
        'hi-IN': "यह सही 10 अंकों का नंबर नहीं लग रहा है। कृपया अपना मोबाइल नंबर फिर से बताएं।",
        'te-IN': "ఇది సరైన 10 అంకెల నంబర్ లాగా లేదు. దయచేసి మళ్లీ చెప్పండి.",
        'ml-IN': "ഇതൊരു ശരിയായ 10 അക്ക നമ്പർ അല്ല. ദയവായി നിങ്ങളുടെ നമ്പർ വീണ്ടും പറയുക.",
        'kn-IN': "ಇದು ಸರಿಯಾದ 10 ಅಂಕಿಗಳ ಸಂಖ್ಯೆ ಎಂದು ತೋರುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಹೇಳಿ.",
        'mr-IN': "हा योग्य १० अंकी नंबर वाटत नाही. कृपया तुमचा मोबाईल नंबर पुन्हा सांगा.",
        'bn-IN': "এটি সঠিক ১০-সংখ্যার নম্বর বলে মনে হচ্ছে না। অনুগ্রহ করে আবার বলুন।",
        'pa-IN': "ਇਹ ਸਹੀ 10 ਅੰਕਾਂ ਦਾ ਨੰਬਰ ਨਹੀਂ ਲੱਗ ਰਿਹਾ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦੁਬਾਰਾ ਦੱਸੋ।"
      },
      'ask_state': {
        'en-IN': "Got it. Which state are you from?",
        'hi-IN': "समझ गया। आप किस राज्य (स्टेट) से बात कर रहे हैं?",
        'te-IN': "అర్థమైంది. మీరు ఏ రాష్ట్రం నుండి మాట్లాడుతున్నారు?",
        'ml-IN': "മനസ്സിലായി. നിങ്ങൾ ഏത് സംസ്ഥാനത്തുനിന്നാണ്?",
        'kn-IN': "ಅರ್ಥವಾಯಿತು. ನೀವು ಯಾವ ರಾಜ್ಯದವರು?",
        'mr-IN': "समजले. तुम्ही कोणत्या राज्यातून बोलत आहात?",
        'bn-IN': "বুঝতে পেরেছি। আপনি কোন রাজ্য থেকে বলছেন?",
        'pa-IN': "ਸਮਝ ਗਿਆ। ਤੁਸੀਂ ਕਿਹੜੇ ਰਾਜ ਤੋਂ ਹੋ?"
      },
      'ask_topic': {
        'en-IN': "Thank you. Now, what topic would you like to know about? For example: Government schemes, Business loans, or MSME registrations.",
        'hi-IN': "धन्यवाद। अब बताएं, आप किस टॉपिक के बारे में जानकारी चाहते हैं? जैसे: गवर्नमेंट स्कीम्स, बिजनेस लोन या MSME रजिस्ट्रेशन।",
        'te-IN': "ధన్యవాదాలు. ఇప్పుడు చెప్పండి, మీరు దేని గురించి తెలుసుకోవాలనుకుంటున్నారు? ఉదాహరణకు: ప్రభుత్వ పథకాలు లేదా వ్యాపార రుణాలు.",
        'ml-IN': "നന്ദി. ഇനി പറയൂ, നിങ്ങൾക്ക് എന്തിനെക്കുറിച്ചാണ് അറിയേണ്ടത്? ഉദാഹരണത്തിന്: സർക്കാർ പദ്ധതികൾ അല്ലെങ്കിൽ ബിസിനസ് ലോണുകൾ.",
        'kn-IN': "ಧನ್ಯವಾದಗಳು. ಈಗ ಹೇಳಿ, ನೀವು ಯಾವ ವಿಷಯದ ಬಗ್ಗೆ ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ? ಉದಾಹರಣೆಗೆ: ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಅಥವಾ ವ್ಯಾಪಾರ ಸಾಲಗಳು.",
        'mr-IN': "धन्यवाद. आता सांगा, तुम्हाला कोणत्या विषयाबद्दल माहिती हवी आहे? उदा: सरकारी योजना किंवा व्यवसाय कर्ज.",
        'bn-IN': "ধন্যবাদ। এখন বলুন, আপনি কোন বিষয়ে জানতে চান? যেমন: সরকারি স্কিম বা ব্যবসা ঋণ।",
        'pa-IN': "ਧੰਨਵਾਦ। ਹੁਣ ਦੱਸੋ, ਤੁਸੀਂ ਕਿਸ ਵਿਸ਼ੇ ਬਾਰੇ ਜਾਣਕਾਰੀ ਚਾਹੁੰਦੇ ਹੋ? ਜਿਵੇਂ: ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਜਾਂ ਬਿਜ਼ਨਸ ਲੋਨ।"
      },
      'closing': {
        'en-IN': "Thank you for speaking with Growthora. I hope I was able to help. Wishing you success and growth in your business. Have a great day.",
        'hi-IN': "ग्रोथोरा से बात करने के लिए धन्यवाद। आशा है मैं आपकी मदद कर पाई। आपके बिज़नेस और ग्रोथ के लिए शुभकामनाएँ। आपका दिन शुभ हो।",
        'te-IN': "గ్రోథోరాతో మాట్లాడినందుకు ధన్యవాదాలు. నేను మీకు సహాయం చేయగలిగానని ఆశిస్తున్నాను. శుభ దినం.",
        'ml-IN': "ഗ്രോത്തോറയുമായി സംസാരിച്ചതിന് നന്ദി. ശുഭദിനം.",
        'kn-IN': "ಗ್ರೋಥೋರಾ ಜೊತೆ ಮಾತನಾಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು. ಶುಭ ದಿನ.",
        'mr-IN': "ग्रोथोरा सोबत बोलल्याबद्दल धन्यवाद. तुमचा दिवस शुभ असो.",
        'bn-IN': "গ্রোথোরার সাথে কথা বলার জন্য ধন্যবাদ। আপনার দিনটি শুভ হোক।",
        'pa-IN': "Growthora ਨਾਲ ਗੱਲ ਕਰਨ ਲਈ ਧੰਨਵਾਦ। ਤੁਹਾਡਾ ਦਿਨ ਸ਼ੁਭ ਰਹੇ।"
      }
    };
    return prompts[promptType][langCode] || prompts[promptType]['en-IN'];
  };

  const saveLeadProgress = async (data) => {
    try {
      const mergedData = { ...leadData, ...data, language: selectedLanguage?.name };
      setLeadData(mergedData);
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, data: mergedData })
      });
    } catch (e) {
      console.error('Failed to save lead progress', e);
    }
  };

  const handleLanguageSelect = async (langObj) => {
    console.log(`[VOICE TIMING] ${Date.now()} - languageDetected: ${langObj.name}`);
    setSelectedLanguage(langObj);
    setIsLiveVoiceMode(true);
    setConvState('collect_name');
    
    await saveLeadProgress({ language: langObj.name });
    
    const confirmText = getLocalizedPrompt('ask_name', langObj.code);
    
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

        console.log(`\n[VOICE DEBUG] TTS FULL TEXT:\n${text}\n`);
        console.log(`[VOICE TIMING] ${Date.now()} - TTSRequest started`);

        console.log(`[VOICE_PRODUCTION_LOG] TTS_REQUEST_START - Fetching /api/tts for lang: ${finalLangCode}`);
        
        ttsAbortControllerRef.current = new AbortController();
        const timeoutId = setTimeout(() => {
          if (ttsAbortControllerRef.current) ttsAbortControllerRef.current.abort();
        }, 30000); // 30s TTS timeout

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
          signal: ttsAbortControllerRef.current.signal
        });
        
        clearTimeout(timeoutId);
        ttsAbortControllerRef.current = null;

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
        console.log(`[VOICE DEBUG] AUDIO BLOB:\nsize: ${blob.size}\ntype: ${blob.type}\n`);

        const audio = new Audio(url);

        audioPlayerRef.current = audio;

        audio.onplaying = () => {
          console.log(`[VOICE TIMING] ${Date.now()} - audioPlaying (Cloud)`);
          setIsAudioPlaying(true);
        };

        audio.onended = () => {
          console.log(`[VOICE TIMING] ${Date.now()} - audioEnded (Cloud)`);
          console.log(`[VOICE DEBUG] AUDIO COMPLETED`);

          setPlayingMessageId(null);
          setIsAudioPlaying(false);

          if (audioPlayerRef.current === audio) {
            audioPlayerRef.current = null;
          }

          URL.revokeObjectURL(url);

          resolve();
        };

        audio.onstalled = () => console.log(`[AUDIO STALLED]`);
        audio.onabort = () => console.log(`[AUDIO ABORTED]`);
        
        audio.onplay = () => {
           console.log(`[VOICE DEBUG] AUDIO STARTED`);
        };

        audio.onloadedmetadata = () => {
           console.log(`[VOICE DEBUG] AUDIO DURATION:`, audio.duration);
        };

        audio.onerror = (error) => {
          console.error('[VOICE DEBUG] AUDIO ERROR:', error);

          setPlayingMessageId(null);
          setIsAudioPlaying(false);

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

            utterance.onstart = () => {
              console.log(`[VOICE TIMING] ${Date.now()} - audioPlaying (Native)`);
              setIsAudioPlaying(true);
            };

            utterance.onend = () => {
              console.log(`[VOICE TIMING] ${Date.now()} - audioEnded (Native)`);
              setPlayingMessageId(null);
              setIsAudioPlaying(false);
              resolve();
            };

            utterance.onerror = (e) => {
              console.error('[VOICE] Native TTS error:', e);
              setPlayingMessageId(null);
              setIsAudioPlaying(false);
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
    
    if (!selectedLanguage && convState === 'language_selection') {
      setMessages(prev => [...prev, { role: 'ai', content: 'Please select a language first!' }]);
      return;
    }

    const userMessage = { role: 'user', content: text || 'Uploaded an image', imagePreview };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setErrorMsg(null);
    stopAudio();
    
    const langCode = selectedLanguage?.code || 'en-IN';
    const lowerText = text ? text.toLowerCase() : '';

    // Check for Closing Intent (not including stop)
    const closingRegex = /(?:^|\s)(bye|goodbye|that's all|bas itna hi|no thanks|nahi chahiye|thank you, i am done)(?:\s|$|[.,!?])/i;
    if (closingRegex.test(lowerText) && convState !== 'language_selection') {
       const msg = getLocalizedPrompt('closing', langCode);
       setConvState('closed');
       const msgId = Date.now();
       setMessages((prev) => [...prev, { role: 'ai', content: msg, id: msgId, isVoiceResponse: isVoiceQuery }]);
       setIsTyping(false);
       setIsLiveVoiceMode(false);
       if (isVoiceQuery) playAudio(msg, msgId);
       return;
    }

    // State Machine Processing
    if (convState === 'collect_name') {
      await saveLeadProgress({ name: text });
      const msg = getLocalizedPrompt('ask_mobile', langCode);
      setConvState('collect_mobile');
      const msgId = Date.now();
      setMessages((prev) => [...prev, { role: 'ai', content: msg, id: msgId, isVoiceResponse: isVoiceQuery }]);
      setIsTyping(false);
      if (isVoiceQuery) playAudio(msg, msgId);
      return;
    }

    if (convState === 'collect_mobile') {
      // Validate 10-digit number
      const digits = text.replace(/\D/g, '');
      if (digits.length >= 10) {
         const mobile = digits.slice(-10);
         await saveLeadProgress({ mobile });
         const msg = getLocalizedPrompt('ask_state', langCode);
         setConvState('collect_state');
         const msgId = Date.now();
         setMessages((prev) => [...prev, { role: 'ai', content: msg, id: msgId, isVoiceResponse: isVoiceQuery }]);
         setIsTyping(false);
         if (isVoiceQuery) playAudio(msg, msgId);
      } else {
         const msg = getLocalizedPrompt('invalid_mobile', langCode);
         const msgId = Date.now();
         setMessages((prev) => [...prev, { role: 'ai', content: msg, id: msgId, isVoiceResponse: isVoiceQuery }]);
         setIsTyping(false);
         if (isVoiceQuery) playAudio(msg, msgId);
      }
      return;
    }

    if (convState === 'collect_state') {
      await saveLeadProgress({ state: text });
      const msg = getLocalizedPrompt('ask_topic', langCode);
      setConvState('ready_for_questions');
      const msgId = Date.now();
      setMessages((prev) => [...prev, { role: 'ai', content: msg, id: msgId, isVoiceResponse: isVoiceQuery }]);
      setIsTyping(false);
      if (isVoiceQuery) playAudio(msg, msgId);
      return;
    }

    if (convState === 'consultation_booking') {
      // User replied to consultation offer
      if (/(yes|book|haan|theek hai|ok)/i.test(lowerText)) {
        try {
          await fetch('/api/leads/consultation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, consultationData: { topic: text } })
          });
          const successMsg = langCode.startsWith('hi') 
            ? "Thank you. Aapki free consultation request successfully register ho gayi hai. Growthora team aapse aapke registered mobile number par contact karegi."
            : "Thank you. Your free consultation request has been successfully registered. The Growthora team will contact you on your registered mobile number.";
          const msgId = Date.now();
          setMessages((prev) => [...prev, { role: 'ai', content: successMsg, id: msgId, isVoiceResponse: isVoiceQuery }]);
          setIsTyping(false);
          setConvState('ready_for_questions');
          if (isVoiceQuery) playAudio(successMsg, msgId);
          return;
        } catch (e) {
           console.error("Consultation booking failed", e);
        }
      } else if (/(no|nahi)/i.test(lowerText)) {
         setConvState('ready_for_questions');
         const msgId = Date.now();
         const msg = langCode.startsWith('hi') ? "Koi baat nahi. Batayein, main aapki aur kya madad kar sakti hoon?" : "No problem. How else can I help you?";
         setMessages((prev) => [...prev, { role: 'ai', content: msg, id: msgId, isVoiceResponse: isVoiceQuery }]);
         setIsTyping(false);
         if (isVoiceQuery) playAudio(msg, msgId);
         return;
      }
    }

    try {
      console.log(`[VOICE_PRODUCTION_LOG] CHAT_REQUEST_START - Query: ${text}`);
      
      const history = messages.filter(m => m.role !== 'system' && !m.isLanguagePrompt && !m.isSystemAlert).map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content
      }));

      groqAbortControllerRef.current = new AbortController();
      const timeoutId = setTimeout(() => {
        if (groqAbortControllerRef.current) groqAbortControllerRef.current.abort();
      }, 120000); // 120s chat timeout

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
          signal: groqAbortControllerRef.current.signal
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
          signal: groqAbortControllerRef.current.signal
        });
      }
      
      clearTimeout(timeoutId);
      groqAbortControllerRef.current = null;
      
      console.log(`[VOICE_PRODUCTION_LOG] CHAT_RESPONSE - Status: ${response.status}`);
      const data = await response.json();
      console.log(`[VOICE TIMING] ${Date.now()} - Chat Response Received`);

      if (!response.ok) {
        throw new Error(data.error || `Failed to fetch AI response: ${response.status}`);
      }

      let aiResponseText = data.reply;
      
      // If AI offered consultation, transition to booking state and ask for confirmation
      if (aiResponseText.includes("[OFFER_CONSULTATION]")) {
         aiResponseText = aiResponseText.replace(/\[OFFER_CONSULTATION\]/gi, '').trim();
         const mobileStr = leadData.mobile ? leadData.mobile.slice(-4) : '';
         const consultMsg = langCode.startsWith('hi')
           ? `\n\nMere paas aapka naam ${leadData.name || ''}, mobile number ending ${mobileStr}, aur state ${leadData.state || ''} saved hai. Kya main isi details ke sath free consultation book kar doon? (Haan / Nahi)`
           : `\n\nI have your name ${leadData.name || ''}, mobile ending in ${mobileStr}, and state ${leadData.state || ''} saved. Shall I book a free consultation with these details? (Yes / No)`;
         aiResponseText += consultMsg;
         setConvState('consultation_booking');
      }

      const messageId = Date.now();
      const newAiMessage = { role: 'ai', content: aiResponseText, id: messageId, isVoiceResponse: isVoiceQuery };
      
      setMessages((prev) => [...prev, newAiMessage]);
      setIsTyping(false); // Clear typing state immediately so text is visible!

      if (isVoiceQuery && aiResponseText) {
        try {
          await playAudio(aiResponseText, messageId);
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
              isAudioPlaying={isAudioPlaying}
              selectedLanguage={selectedLanguage}
              onStopAudio={stopAudio}
              onStopAssistant={stopAssistantSpeech}
              onLanguageSelect={handleLanguageSelect}
            />
          </div>
        ) : (
          <>
            <button className="growthora-ai-button" onClick={() => setIsOpen(true)} style={{ padding: 0, overflow: 'visible', border: '2px solid rgba(255,107,0,0.3)', position: 'relative' }}>
              <video src="/1000137542_gwr_video_mvp.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
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

```

## D:\Growthora\src\components\GrowthoraAIChat\growthoraAIChat.css

```css
.growthora-ai-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 16px;
}

.growthora-welcome-bubble {
  background: linear-gradient(135deg, #1a0b16, #0f0a1c);
  border: 1px solid rgba(255, 107, 0, 0.5);
  box-shadow: 0 6px 24px rgba(255, 107, 0, 0.25), inset 0 0 20px rgba(255, 107, 0, 0.05);
  border-radius: 20px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-right: 8px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px) scale(0.95);
  transform-origin: bottom right;
}

@media (hover: hover) {
  .growthora-ai-button:hover ~ .growthora-welcome-bubble,
  .growthora-welcome-bubble:hover {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0) scale(1);
    box-shadow: 0 8px 32px rgba(255, 107, 0, 0.35), inset 0 0 20px rgba(255, 107, 0, 0.1);
  }
}

.welcome-tail {
  position: absolute;
  bottom: -7px;
  right: 24px;
  width: 14px;
  height: 14px;
  background: #0f0a1c;
  border-right: 1px solid rgba(255, 107, 0, 0.5);
  border-bottom: 1px solid rgba(255, 107, 0, 0.5);
  transform: rotate(45deg);
  border-bottom-right-radius: 3px;
  box-shadow: 4px 4px 8px rgba(255, 107, 0, 0.1);
}

.welcome-sparkles {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 4px;
}

.welcome-sparkles-icon-main {
  color: #ffad66;
  filter: drop-shadow(0 0 6px rgba(255, 173, 102, 0.8));
}

.welcome-sparkles-icon-sub {
  position: absolute;
  bottom: -2px;
  right: -4px;
  color: #ffad66;
  filter: drop-shadow(0 0 6px rgba(255, 173, 102, 0.8));
}

.welcome-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.welcome-title {
  color: #ffffff;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.2px;
}

.welcome-subtitle {
  color: #94a3b8;
  font-size: 15px;
  font-weight: 400;
}

@keyframes floatBubble {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.growthora-ai-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0f172a, #ff6b00);
  color: white;
  border: none;
  box-shadow: 0 10px 24px rgba(255, 107, 0, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
}

.growthora-ai-button:hover {
  transform: scale(1.05);
  box-shadow: 0 14px 28px rgba(255, 107, 0, 0.5);
}

.growthora-ai-panel {
  position: absolute;
  bottom: 84px;
  right: 0;
  width: 440px;
  height: 680px;
  max-height: calc(100vh - 120px);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border-radius: 24px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.6);
  transform-origin: bottom right;
  animation: panelFadeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes panelFadeIn {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.chat-header {
  background: #1c2033;
  backdrop-filter: blur(12px);
  color: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 10;
  gap: 12px;
}

.chat-header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.chat-header-logo-container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-header-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.chat-header-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.chat-header-info-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-header-info h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
}

.chat-header-info p {
  margin: 4px 0 0;
  font-size: 13px;
  color: #94a3b8;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-header-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.chat-header-actions button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s, transform 0.2s;
  padding: 6px;
  border-radius: 50%;
}

.chat-header-actions button:hover {
  opacity: 1;
  background: rgba(255,255,255,0.1);
  transform: scale(1.05);
}

.language-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 32px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  padding: 8px;
  z-index: 100;
  min-width: 140px;
  border: 1px solid rgba(0,0,0,0.05);
  animation: dropdownFade 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: top right;
}

@keyframes dropdownFade {
  from { opacity: 0; transform: scale(0.95) translateY(-10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.language-dropdown-menu button {
  background: transparent !important;
  border: none !important;
  padding: 10px 16px !important;
  text-align: left !important;
  color: #1e293b !important;
  font-size: 14px !important;
  border-radius: 8px !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  width: 100% !important;
  opacity: 1 !important;
}

.language-dropdown-menu button:hover {
  background: #f1f5f9 !important;
  transform: none !important;
  color: #ff6b00 !important;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: rgba(253, 251, 248, 0.85);
  scroll-behavior: smooth;
  position: relative;
}

.chat-watermark-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 300px;
  opacity: 0.22;
  pointer-events: none;
  z-index: 0;
  filter: blur(3px);
  mix-blend-mode: multiply;
}

.chat-watermark-bg img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 10px;
}

.chat-message-row {
  display: flex;
  gap: 12px;
  max-width: 100%;
  position: relative;
  z-index: 1;
}

.chat-message-row.ai {
  align-items: flex-start;
}

.chat-message-row.user {
  justify-content: flex-end;
}

.ai-avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.chat-message {
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.6;
  animation: messageFadeIn 0.3s ease-out;
  word-wrap: break-word;
  position: relative;
}

@keyframes messageFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.chat-message.ai {
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  border-radius: 4px 18px 18px 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.4);
  max-width: 85%;
  backdrop-filter: blur(10px);
}

.chat-message.user {
  background: linear-gradient(135deg, #ff6b00, #ff8a33);
  color: white;
  border-radius: 18px 18px 0 18px;
  max-width: 85%;
  box-shadow: 0 6px 16px rgba(255, 107, 0, 0.25);
}

.chat-message.user img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
}

.chat-message-actions {
  display: flex;
  gap: 12px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.message-action-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.2s;
}

.message-action-btn:hover {
  color: #ff6b00;
  background: rgba(255, 107, 0, 0.1);
}

.message-action-btn.playing {
  color: #ff6b00;
  background: rgba(255, 107, 0, 0.1);
  animation: pulseLight 1.5s infinite;
}

@keyframes pulseLight {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 5px;
  height: 5px;
  background-color: #ff6b00;
  border-radius: 50%;
  animation: typingDot 1.4s infinite ease-in-out both;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typingDot {
  0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

.chat-input-area {
  padding: 16px 20px 24px;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}

.chat-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  padding: 10px 14px 10px 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.chat-input-wrapper:focus-within {
  border-color: #ff6b00;
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
}

.chat-input-wrapper textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  color: #0f172a;
  resize: none;
  min-height: 24px;
  max-height: 120px;
  padding: 4px 0;
  font-family: inherit;
}

.chat-input-wrapper textarea::placeholder {
  color: #94a3b8;
}

.icon-button {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  flex-shrink: 0;
}

.icon-button:hover {
  color: #1e293b;
  background: rgba(0, 0, 0, 0.04);
}

.send-button {
  background: #cbd5e1;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  flex-shrink: 0;
}

.send-button:not(:disabled):hover {
  background: #94a3b8;
  transform: scale(1.05);
}

.send-button:disabled {
  background: #f1f5f9;
  color: #cbd5e1;
  cursor: not-allowed;
}

/* LIVE VOICE OVERLAY (Premium Centered Modal) */
.live-voice-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(255, 253, 249, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: overlayFadeIn 0.3s ease-out;
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.voice-modal-box {
  position: relative;
  width: 320px;
  max-width: 90%;
  background: white;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 32px 24px 20px;
  animation: modalPopIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes modalPopIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 480px) {
  .voice-modal-box {
    width: 280px;
    padding: 28px 20px 16px;
  }
}

.close-voice-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.04);
  color: #64748b;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 101;
}

.close-voice-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #1e293b;
  transform: scale(1.05);
}

/* PREMIUM AI ROBOT ICON */
.ai-robot-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  width: 90%;
  aspect-ratio: 16/9;
}

.ai-robot-glow-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(135deg, #a855f7, #ff6b00);
  filter: blur(16px);
  opacity: 0.4;
  transition: all 0.4s ease;
  z-index: 1;
}

.ai-robot-icon {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* States */
.ai-robot-container.idle .ai-robot-icon {
  animation: robotAlive 6s infinite ease-in-out;
}

.ai-robot-container.listening .ai-robot-icon {
  animation: robotListening 3s infinite ease-in-out;
}

.ai-robot-container.listening .ai-robot-glow-bg {
  background: linear-gradient(45deg, #a855f7, #38bdf8);
  opacity: 0.3;
  animation: pulseBreathe 3s infinite alternate ease-in-out;
}

.ai-robot-container.transcribing .ai-robot-icon,
.ai-robot-container.thinking .ai-robot-icon {
  animation: robotAlive 4s infinite ease-in-out;
}
.ai-robot-container.thinking .ai-robot-glow-bg,
.ai-robot-container.transcribing .ai-robot-glow-bg {
  background: #38bdf8;
  opacity: 0.4;
  animation: pulseBreathe 2s infinite alternate ease-in-out;
}

.ai-robot-container.speaking .ai-robot-icon {
  animation: robotSpeaking 1.5s infinite ease-in-out;
}
.ai-robot-container.speaking .ai-robot-glow-bg {
  background: linear-gradient(45deg, #ff6b00, #ff8a33);
  animation: pulseSpeaking 1.5s infinite alternate ease-in-out;
}

@keyframes pulseBreathe {
  0% { opacity: 0.2; transform: scale(0.95); filter: blur(25px); }
  100% { opacity: 0.5; transform: scale(1.15); filter: blur(30px); }
}

@keyframes pulseSpeaking {
  0% { opacity: 0.3; transform: scale(1); filter: blur(25px); }
  50% { opacity: 0.7; transform: scale(1.3); filter: blur(35px); }
  100% { opacity: 0.4; transform: scale(1.1); filter: blur(30px); }
}

@keyframes robotAlive {
  0% { transform: translateY(0) rotate(0deg); filter: brightness(1); }
  25% { transform: translateY(-8px) rotate(2deg); filter: brightness(1.05); } 
  50% { transform: translateY(0) rotate(0deg); filter: brightness(1); }
  75% { transform: translateY(5px) rotate(-2deg); filter: brightness(0.95); } 
  100% { transform: translateY(0) rotate(0deg); filter: brightness(1); }
}

@keyframes robotListening {
  0% { transform: translateY(0) scale(1); filter: brightness(1); }
  50% { transform: translateY(-6px) scale(1.02); filter: brightness(1.08); }
  100% { transform: translateY(0) scale(1); filter: brightness(1); }
}

@keyframes robotSpeaking {
  0% { transform: translateY(0) scale(1); filter: brightness(1); }
  25% { transform: translateY(-4px) scale(1.03); filter: brightness(1.1); }
  50% { transform: translateY(3px) scale(1); filter: brightness(1.05); }
  75% { transform: translateY(-5px) scale(1.04); filter: brightness(1.15); }
  100% { transform: translateY(0) scale(1); filter: brightness(1); }
}

/* Robot Mouth Equalizer Animation */
.ai-robot-container.speaking .eq-bar {
  animation: eqPulse 0.5s infinite alternate ease-in-out;
}
.ai-robot-container.speaking .eq-1 { animation-delay: 0s; }
.ai-robot-container.speaking .eq-2 { animation-delay: 0.15s; }
.ai-robot-container.speaking .eq-3 { animation-delay: 0.3s; }

@keyframes eqPulse {
  0% { transform: scaleY(0.5); }
  100% { transform: scaleY(1.5); }
}

/* Gentle Pulsing Halo */
.robot-halo {
  transition: all 0.4s ease;
}
.ai-robot-container.speaking .robot-halo {
  animation: haloPulse 2s infinite alternate ease-in-out;
}

@keyframes haloPulse {
  0% { transform: scale(0.9); opacity: 0.1; }
  100% { transform: scale(1.2); opacity: 0.3; }
}

.voice-status-text {
  font-size: 16px;
  font-weight: 500;
  color: white;
  letter-spacing: 0.3px;
  text-align: center;
  min-height: 24px;
  animation: fadeIn 0.3s;
}

.error-state .voice-status-text {
  color: #ef4444;
  font-size: 14px;
  padding: 0 16px;
}

/* LANGUAGE SELECTOR */
.language-selector-container {
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255,255,255,0.6);
  backdrop-filter: blur(10px);
}

.language-selector-header {
  text-align: center;
}

.language-selector-header h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.language-selector-header p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.language-selector-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.language-chip {
  background: white;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  color: #1e293b;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  text-align: center;
}

.language-chip:hover {
  background: linear-gradient(135deg, #ff6b00, #ff8a33);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 107, 0, 0.2);
}

/* PREMIUM FUNDING CTA */
.premium-funding-cta {
  background: linear-gradient(145deg, #0f172a, #1e293b);
  border-radius: 16px;
  padding: 24px;
  margin: 8px 0;
  color: white;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
}

.premium-funding-cta::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,107,0,0.2) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
}

.premium-funding-cta h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 8px;
}

.premium-funding-cta p {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.5;
}

.premium-funding-cta button {
  background: #ff6b00;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
}

.premium-funding-cta button:hover {
  background: #e66000;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
}

.chat-message-content h1, .chat-message-content h2, .chat-message-content h3 {
  font-size: 16px;
  margin: 14px 0 10px;
  font-weight: 600;
  color: inherit;
}
.chat-message-content ul, .chat-message-content ol {
  margin: 10px 0;
  padding-left: 22px;
}
.chat-message-content li {
  margin-bottom: 6px;
}
.chat-message-content p {
  margin: 10px 0;
}
.chat-message-content a {
  color: #ff6b00;
  text-decoration: underline;
  font-weight: 500;
}
.chat-message.user .chat-message-content a {
  color: white;
}

@media (max-width: 480px) {
  .growthora-ai-wrapper {
    bottom: 16px;
    right: 16px;
  }
  .growthora-ai-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
    z-index: 99999;
  }
  .chat-header {
    padding: 18px 20px;
  }
}

```

## D:\Growthora\src\styles\index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --bg-primary: #FAF9F6;
  --bg-surface: #FFFFFF;
  --bg-surface-alt: #F3F0E6;
  --bg-milky: #FAF8F5;
  --bg-milky-card: #FFFFFF;

  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #64748B;
  --text-inverse: #FFFFFF;

  --accent-orange: #FF6B00;
  --accent-orange-hover: #E05600;
  --accent-orange-light: rgba(255, 107, 0, 0.08);
  --accent-purple: #6366F1;
  --accent-purple-light: rgba(99, 102, 241, 0.1);

  --border-light: rgba(15, 23, 42, 0.08);
  --border-medium: rgba(15, 23, 42, 0.12);
  --border-active: #FF6B00;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 24px;

  --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 8px 30px rgba(15, 23, 42, 0.06);
  --shadow-glow: 0 0 35px rgba(255, 107, 0, 0.18);

  --font-heading: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Reset & Base */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  text-size-adjust: 100%;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

a {
  color: inherit;
  text-decoration: none;
}

/* -------------------------------------------------------------
   STICKY HEADER
------------------------------------------------------------- */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 249, 246, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.header-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0.85rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%);
  border: 1.5px solid var(--accent-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.15);
}

.logo-g {
  color: var(--accent-orange);
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.35rem;
}

.logo-text-wrapper {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.header-brand-logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
  border-radius: 6px;
  transition: transform 0.25s ease;
}

.brand-logo:hover .header-brand-logo-img {
  transform: scale(1.03);
}

.footer-brand-logo-img {
  height: 54px;
  width: auto;
  object-fit: contain;
  border-radius: 8px;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-secondary);
  position: relative;
  padding: 0.4rem 0;
  transition: color 0.2s ease;
}

.nav-link.active {
  color: var(--accent-orange);
}

.active-dot {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent-orange);
}

.nav-link.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.btn-ask-growthora {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-md);
  background: var(--accent-purple-light);
  color: var(--accent-purple);
  font-size: 0.88rem;
  font-weight: 700;
  transition: all 0.2s ease;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.btn-ask-growthora:hover {
  background: rgba(99, 102, 241, 0.18);
  transform: translateY(-1px);
}

.btn-primary-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-md);
  background: var(--accent-orange);
  color: #FFFFFF;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(255, 107, 0, 0.25);
  transition: all 0.2s ease;
}

.btn-primary-header:hover {
  background: var(--accent-orange-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(255, 107, 0, 0.35);
}

.mobile-menu-toggle {
  display: none;
}

.mobile-drawer {
  display: none;
}

/* -------------------------------------------------------------
   HERO SECTION (MILKY WHITE REDESIGN)
------------------------------------------------------------- */
.hero-section {
  position: relative;
  padding: 4.5rem 2rem 5rem;
  background: linear-gradient(135deg, #FFFDF9 0%, #FAF7EF 60%, #F5F0E4 100%);
  color: var(--text-primary);
  overflow: hidden;
  border-bottom: 1px solid var(--border-light);
}

.hero-glow-bg {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.hero-container {
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3.5rem;
  align-items: center;
}

.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.9rem;
  border-radius: 30px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.25);
  color: var(--accent-orange);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3.25rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #0F172A;
  margin-bottom: 1.25rem;
}

.highlight-text {
  background: linear-gradient(135deg, #FF6B00 0%, #E05600 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 620px;
  margin-bottom: 2.25rem;
}

.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.8rem;
  border-radius: var(--radius-md);
  background: var(--accent-orange);
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(255, 107, 0, 0.3);
  transition: all 0.25s ease;
}

.btn-hero-primary:hover {
  background: var(--accent-orange-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(255, 107, 0, 0.4);
}

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.6rem;
  border-radius: var(--radius-md);
  background: #FFFFFF;
  border: 1px solid var(--border-medium);
  color: #0F172A;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.btn-hero-secondary:hover {
  background: #FAF8F5;
  border-color: var(--accent-orange);
  transform: translateY(-2px);
}

/* Hero Explore Services Dropdown Menu */
.hero-dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.btn-hero-secondary.active {
  background: #FFF7F2;
  border-color: #FF7200;
  color: #FF7200;
  box-shadow: 0 4px 16px rgba(255, 114, 0, 0.15);
}

.explore-services-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 440px;
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid #E6E9EF;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.15);
  padding: 1.15rem;
  z-index: 100;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  margin-bottom: 0.6rem;
  border-bottom: 1px solid #E6E9EF;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.06em;
}

.dropdown-count {
  color: #FF7200;
}

.dropdown-services-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem;
  max-height: none;
  overflow: visible;
}

.dropdown-service-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  background: #FAF8F5;
  border: 1px solid transparent;
  color: #071A3D;
  font-size: 0.88rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-service-item:hover {
  background: #FFFFFF;
  border-color: #FF7200;
  color: #FF7200;
  box-shadow: 0 4px 12px rgba(255, 114, 0, 0.12);
  transform: translateX(3px);
}

.dropdown-item-num {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.78rem;
  color: #FF7200;
  background: rgba(255, 114, 0, 0.1);
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
}

.dropdown-item-label {
  font-weight: 700;
}

/* Official Center Hub Logo Badge on 3D Stage */
.hero-stage-center-logo-badge {
  position: absolute;
  top: 50.5%;
  left: 50%;
  transform: translate(-50%, -50%) perspective(500px) rotateX(20deg);
  width: 142px;
  height: 142px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 3px solid #FFFDF9;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15), inset 0 2px 8px rgba(255, 114, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  z-index: 5;
  pointer-events: none;
  overflow: hidden;
}

.center-hub-official-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.hero-trust-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.trust-icon {
  color: #10B981;
}

/* Hero 3D Ecosystem Image Asset Replacement */
.hero-visual-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: visible;
}

.hero-3d-ecosystem-wrapper {
  position: relative;
  width: 100%;
  max-width: 620px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 45px;
  overflow: visible;
  box-sizing: border-box;
}

.hero-3d-ecosystem-img {
  width: 100%;
  max-width: 580px;
  height: auto;
  object-fit: contain;
  border-radius: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  display: block;
}

/* ─── 3D Ecosystem Float Animation ─── */
@keyframes subtle3DFloat {
  0%   { transform: translateY(0px) rotate3d(1, 0, 0, 0deg); }
  25%  { transform: translateY(-8px) rotate3d(1, 0, 0, 1.5deg); }
  50%  { transform: translateY(-12px) rotate3d(1, 0, 0, 0deg); }
  75%  { transform: translateY(-6px) rotate3d(1, 0, 0, -1deg); }
  100% { transform: translateY(0px) rotate3d(1, 0, 0, 0deg); }
}

.float-3d-motion {
  animation: subtle3DFloat 6s ease-in-out infinite;
  transform-origin: center bottom;
  will-change: transform;
}

/* Visually Hidden Screen Reader Only Utility Class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Transparent Interactive Clickable Hotspots for 3D Stage Labels */
.hero-stage-hotspot-pill {
  position: absolute;
  background: transparent;
  border: none;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  z-index: 25;
  border-radius: 20px;
  transition: all 0.2s ease;
  min-width: 140px;
  min-height: 38px;
}

.hero-stage-hotspot-pill:hover {
  background: transparent;
  box-shadow: none;
  border: none;
}

.hero-stage-hotspot-pill:focus-visible {
  outline: 2px solid #FF7200;
  outline-offset: 2px;
}

/* ─── Service Label Pills (cover the image's baked-in labels, exact visual match) ─── */
.svc-pill {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  height: 32px;
  padding: 0 12px 0 10px;
  border-radius: 30px;
  /* White frosted pill exactly matching image label style */
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.98);
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.10),
    0 1px 3px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  z-index: 20;
  transition:
    transform 0.20s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.20s ease,
    border-color 0.20s ease;
  white-space: nowrap;
  overflow: visible;
  font-family: var(--font-body, 'Inter', sans-serif);
  box-sizing: border-box;
}

.svc-pill:hover {
  transform: translateY(-2px) scale(1.04);
  border-color: #FF7200;
  box-shadow:
    0 6px 18px rgba(255, 114, 0, 0.22),
    0 2px 6px rgba(0, 0, 0, 0.10);
  background: rgba(255, 255, 255, 1);
}

.svc-pill:focus-visible {
  outline: 2px solid #FF7200;
  outline-offset: 2px;
}

.svc-pill-num {
  font-size: 0.72rem;
  font-weight: 800;
  color: #FF7200;
  letter-spacing: 0.02em;
  flex-shrink: 0;
  line-height: 1;
}

.svc-pill-text {
  font-size: 0.80rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.01em;
  line-height: 1;
}

@media (max-width: 991px) {
  .hero-3d-ecosystem-wrapper {
    max-width: 560px;
    margin: 0 auto;
  }
  .svc-pill { gap: 4px; padding: 0 9px 0 8px; }
  .svc-pill-num  { font-size: 0.62rem; }
  .svc-pill-text { font-size: 0.70rem; }
}

@media (max-width: 600px) {
  .svc-pill { gap: 3px; padding: 0 7px 0 6px; }
  .svc-pill-num  { font-size: 0.56rem; }
  .svc-pill-text { font-size: 0.62rem; }
}


.hero-visual-container:hover .hero-3d-stage-img {
  transform: scale(1.02) translateY(-4px);
}

.hero-stage-node-pill {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: #FFFFFF;
  border: 1px solid #E6E9EF;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  font-size: 0.8rem;
  font-weight: 700;
  color: #071A3D;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
}

.hero-stage-node-pill:hover {
  background: #FFFFFF;
  border-color: #FF7200;
  color: #FF7200;
  box-shadow: 0 6px 20px rgba(255, 114, 0, 0.25);
  transform: translate(-50%, -50%) scale(1.08) translateY(-2px);
}

.hero-stage-node-pill .pill-num {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.75rem;
  color: #FF7200;
}

/* Hero Bottom Metrics & Quote Banner */
.hero-bottom-banner {
  max-width: 1360px;
  margin: 3.5rem auto 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: center;
}

.hero-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  background: #FFFDF9;
  border: 1px solid #E6E9EF;
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
}

.metric-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.metric-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon-wrap.orange {
  background: rgba(255, 107, 0, 0.1);
  color: var(--accent-orange);
}

.metric-icon-wrap.purple {
  background: rgba(99, 102, 241, 0.1);
  color: #6366F1;
}

.metric-icon-wrap.green {
  background: rgba(16, 185, 129, 0.1);
  color: #10B981;
}

.metric-data {
  display: flex;
  flex-direction: column;
}

.metric-val {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: #071A3D;
  line-height: 1.2;
}

.metric-lbl {
  font-size: 0.78rem;
  color: #64748B;
  font-weight: 500;
}

.hero-quote-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #FFFFFF;
  border: 1px solid #E6E9EF;
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
  position: relative;
  overflow: hidden;
}

.hero-quote-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #FF7200;
}

.quote-icon-badge {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #FFF7F2;
  border: 1px solid rgba(255, 114, 0, 0.3);
  color: #FF7200;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.quote-title {
  font-family: var(--font-heading);
  font-size: 0.98rem;
  font-weight: 800;
  color: #071A3D;
  margin-bottom: 0.15rem;
}

.quote-sub {
  font-size: 0.8rem;
  color: #64748B;
  line-height: 1.35;
}

.ecosystem-graphic {
  position: relative;
  width: 440px;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ecosystem-core {
  position: absolute;
  z-index: 10;
  width: 135px;
  height: 135px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%);
  border: 2.5px solid var(--accent-orange);
  box-shadow: 0 10px 30px rgba(255, 107, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.core-inner {
  display: flex;
  flex-direction: column;
}

.core-title {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1rem;
  color: #0F172A;
  letter-spacing: 0.05em;
}

.core-sub {
  font-size: 0.68rem;
  color: var(--accent-orange);
  font-weight: 700;
  text-transform: uppercase;
}

.ecosystem-web-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-node-btn {
  position: absolute;
  z-index: 12;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: #0F172A;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.floating-node-btn:hover {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
  color: #FFFFFF;
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 107, 0, 0.35);
}

.node-num {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--accent-orange);
}

.floating-node-btn:hover .node-num {
  color: #FFFFFF;
}

/* -------------------------------------------------------------
   SERVICES MASTER SECTION
------------------------------------------------------------- */
.services-master-section {
  max-width: 1360px;
  margin: 0 auto;
  padding: 5rem 2rem;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3.5rem;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent-orange);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.section-desc {
  font-size: 1.05rem;
  color: var(--text-secondary);
}

/* Desktop Grid Layout */
.desktop-services-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
  align-items: start;
}

.services-sidebar-sticky {
  position: sticky;
  top: 90px;
  background: #FFFFFF;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.sidebar-title {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-count {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent-orange);
  background: var(--accent-orange-light);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.progress-bar-track {
  width: 100%;
  height: 4px;
  background: var(--bg-surface-alt);
  border-radius: 2px;
  margin-bottom: 1.25rem;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF6B00 0%, #6366F1 100%);
  transition: width 0.3s ease;
}

.sidebar-nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
}

.sidebar-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-md);
  text-align: left;
  transition: all 0.2s ease;
  color: var(--text-secondary);
}

.sidebar-nav-item:hover {
  background: var(--bg-surface-alt);
  color: var(--text-primary);
}

.sidebar-nav-item.active {
  background: #FAF8F5;
  border: 1px solid rgba(255, 107, 0, 0.3);
  color: var(--text-primary);
  box-shadow: 0 4px 14px rgba(255, 107, 0, 0.08);
}

.nav-num {
  font-size: 0.85rem;
  font-weight: 800;
  opacity: 0.6;
  width: 24px;
}

.sidebar-nav-item.active .nav-num {
  color: var(--accent-orange);
  opacity: 1;
}

.nav-text {
  font-size: 0.95rem;
  font-weight: 700;
}

.nav-active-bar {
  position: absolute;
  right: 0;
  top: 15%;
  height: 70%;
  width: 4px;
  border-radius: 2px;
  background: var(--accent-orange);
}

.sidebar-help-card {
  background: linear-gradient(135deg, #FFFDF9 0%, #F5F0E6 100%);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  border: 1px solid var(--border-medium);
  color: #0F172A;
}

.help-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.35rem;
  color: #0F172A;
}

.help-text {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 1rem;
}

.btn-sidebar-help {
  width: 100%;
  padding: 0.55rem;
  border-radius: var(--radius-sm);
  background: var(--accent-orange);
  color: #FFF;
  font-size: 0.82rem;
  font-weight: 700;
  transition: background 0.2s ease;
}

.btn-sidebar-help:hover {
  background: var(--accent-orange-hover);
}

/* Mobile Accordion */
.mobile-services-accordion {
  display: none;
}

/* -------------------------------------------------------------
   SERVICE DETAIL CARD
------------------------------------------------------------- */
.service-detail-card {
  background: #FFFFFF;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  padding: 2.75rem;
  box-shadow: var(--shadow-md);
}

.card-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.card-num-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.card-num {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--accent-orange);
}

.card-category {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  text-transform: uppercase;
}

.card-tag {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 700;
}

.card-main-title {
  font-family: var(--font-heading);
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.card-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 2rem;
}

.card-visual-wrapper {
  margin-bottom: 2.25rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.visual-wrapper {
  width: 100%;
  max-height: 320px;
  background: #FAF8F5;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-svg {
  width: 100%;
  max-height: 280px;
}

/* Card Blocks */
.card-block {
  background: #FAF8F5;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.75rem;
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.block-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.block-icon {
  color: var(--accent-orange);
}

.block-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
}

.included-tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.included-pill {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  border-radius: 20px;
  background: #FFFFFF;
  border: 1px solid var(--border-light);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.pill-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.card-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.item-icon-ideal {
  color: var(--accent-purple);
  flex-shrink: 0;
  margin-top: 3px;
}

.item-icon-get {
  color: var(--accent-orange);
  flex-shrink: 0;
  margin-top: 3px;
}

.card-timeline-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border-light);
  gap: 1.5rem;
  flex-wrap: wrap;
}

.timeline-info {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 420px;
}

.timeline-icon {
  color: var(--accent-orange);
  flex-shrink: 0;
  margin-top: 3px;
}

.timeline-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
}

.timeline-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.btn-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
  border-radius: var(--radius-md);
  background: var(--text-primary);
  color: #FFF;
  font-size: 0.95rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-card-cta:hover {
  background: var(--accent-orange);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(255, 107, 0, 0.3);
}

/* -------------------------------------------------------------
   SERVICE FINDER SECTION (MILKY WHITE THEME)
------------------------------------------------------------- */
.service-finder-section {
  background: linear-gradient(135deg, #FAF7F0 0%, #F4EFE5 100%);
  color: var(--text-primary);
  padding: 5rem 2rem;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
}

.finder-container {
  max-width: 1200px;
  margin: 0 auto;
}

.finder-header {
  text-align: center;
  max-width: 650px;
  margin: 0 auto 3rem;
}

.finder-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.5rem;
}

.finder-sub {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.finder-body-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.finder-options-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.finder-option-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.9rem 1.2rem;
  border-radius: var(--radius-md);
  background: #FFFFFF;
  border: 1px solid var(--border-medium);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 600;
  text-align: left;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.finder-option-btn:hover {
  background: #FAF8F5;
  border-color: rgba(15, 23, 42, 0.2);
}

.finder-option-btn.selected {
  background: #FFF7F2;
  border-color: var(--accent-orange);
  color: var(--text-primary);
  box-shadow: 0 4px 14px rgba(255, 107, 0, 0.12);
}

.radio-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.finder-option-btn.selected .radio-circle {
  border-color: var(--accent-orange);
}

.radio-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-orange);
}

.finder-result-card {
  background: #FFFFFF;
  border-radius: var(--radius-xl);
  border: 2px solid var(--accent-orange);
  padding: 2.25rem;
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
}

.result-badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.recommended-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--accent-orange);
  background: rgba(255, 107, 0, 0.1);
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
}

.result-num {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--accent-orange);
}

.result-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.75rem;
}

.result-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.5rem;
}

.result-highlights {
  margin-bottom: 1.75rem;
}

.highlights-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.6rem;
}

.result-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.res-pill {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 14px;
  background: #FAF8F5;
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  font-size: 0.82rem;
  font-weight: 600;
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-finder-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  background: var(--accent-orange);
  color: #FFF;
  font-size: 0.95rem;
  font-weight: 700;
  transition: background 0.2s ease;
}

.btn-finder-primary:hover {
  background: var(--accent-orange-hover);
}

.btn-finder-consult {
  padding: 0.7rem;
  border-radius: var(--radius-md);
  background: #FAF8F5;
  border: 1px solid var(--border-medium);
  color: var(--text-primary);
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-finder-consult:hover {
  background: #F3F0E6;
  border-color: var(--text-primary);
}

/* -------------------------------------------------------------
   FAQ SECTION (MILKY WHITE THEME)
------------------------------------------------------------- */
.faq-section {
  padding: 4.5rem 2rem 2.5rem;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-light);
}

.faq-container {
  max-width: 980px;
  margin: 0 auto;
}

.faq-header {
  text-align: center;
  max-width: 650px;
  margin: 0 auto 3rem;
}

.faq-title {
  font-family: var(--font-heading);
  font-size: 2.3rem;
  font-weight: 800;
  color: #071A3D;
  margin: 0.5rem 0;
  letter-spacing: -0.02em;
}

.faq-description {
  font-size: 1.05rem;
  color: #52627A;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 2.25rem;
}

.faq-card {
  background: #FFFFFF;
  border: 1px solid #E6E9EF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
  transition: all 0.25s ease;
}

.faq-card:hover {
  border-color: rgba(255, 107, 0, 0.3);
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
}

.faq-card.open {
  border-color: var(--accent-orange);
  box-shadow: 0 6px 24px rgba(255, 107, 0, 0.12);
}

.faq-question-btn {
  width: 100%;
  min-height: 68px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  text-align: left;
  background: #FFFFFF;
  outline: none;
  transition: background 0.2s ease;
}

.faq-question-btn:focus-visible {
  outline: 2px solid var(--accent-orange);
  outline-offset: -2px;
}

.faq-question-text-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.faq-num {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--accent-orange);
  opacity: 0.85;
}

.faq-question-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.05rem;
  color: #071A3D;
  line-height: 1.4;
}

.faq-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #FAF8F5;
  color: #52627A;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.faq-card.open .faq-icon-wrap {
  background: rgba(255, 107, 0, 0.1);
  color: var(--accent-orange);
}

.faq-answer-body {
  padding: 0 1.5rem 1.5rem 2.85rem;
  border-top: 1px solid rgba(230, 233, 239, 0.6);
}

.faq-answer-text {
  font-size: 0.98rem;
  color: #52627A;
  line-height: 1.65;
  padding-top: 1rem;
}

.faq-toggle-row {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.btn-faq-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.8rem;
  border-radius: 30px;
  background: #FFFFFF;
  border: 1.5px solid var(--accent-orange);
  color: var(--accent-orange);
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(255, 107, 0, 0.12);
  transition: all 0.25s ease;
}

.btn-faq-toggle:hover {
  background: var(--accent-orange);
  color: #FFFFFF;
  box-shadow: 0 6px 20px rgba(255, 107, 0, 0.3);
  transform: translateY(-1px);
}

/* -------------------------------------------------------------
   FINAL CTA SECTION (MILKY WHITE THEME)
------------------------------------------------------------- */
.final-cta-section {
  max-width: 1040px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.cta-card-wrapper {
  position: relative;
  background: linear-gradient(135deg, #FFFDF9 0%, #FAF7EE 60%, #F5EFE0 100%);
  border-radius: var(--radius-lg);
  border: 1.5px solid rgba(255, 107, 0, 0.25);
  padding: 2.75rem 2.25rem;
  text-align: center;
  color: var(--text-primary);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.cta-glow-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 10;
  max-width: 640px;
  margin: 0 auto;
}

.cta-heading {
  font-family: var(--font-heading);
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0F172A;
  margin-bottom: 0.65rem;
  line-height: 1.25;
}

.cta-description {
  font-size: 1.02rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.75rem;
}

.cta-buttons-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.btn-cta-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.6rem;
  border-radius: var(--radius-md);
  background: var(--accent-orange);
  color: #FFF;
  font-size: 0.92rem;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(255, 107, 0, 0.3);
  transition: all 0.2s ease;
}

.btn-cta-primary:hover {
  background: var(--accent-orange-hover);
  transform: translateY(-2px);
}

.btn-cta-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.4rem;
  border-radius: var(--radius-md);
  background: #FFFFFF;
  border: 1px solid var(--border-medium);
  color: #0F172A;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.btn-cta-secondary:hover {
  background: #FAF8F5;
}

.cta-reassurance {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.reassurance-icon {
  color: #10B981;
}

/* -------------------------------------------------------------
   COMPACT FOOTER (MILKY WHITE THEME)
------------------------------------------------------------- */
.compact-footer {
  background: #F4F1EA;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-light);
}

.footer-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 4rem 2rem 3rem;
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr;
  gap: 3rem;
}

.footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-logo .logo-title {
  color: #0F172A;
}

.footer-tagline {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--text-secondary);
  line-height: 1.5;
}

.footer-offices {
  background: #FFFFFF;
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  border: 1px solid var(--border-light);
}

.office-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-orange);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.35rem;
}

.office-cities {
  font-size: 0.88rem;
  color: var(--text-primary);
  font-weight: 600;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.sep {
  color: #CBD5E1;
}

.footer-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  color: #0F172A;
  margin-bottom: 1.25rem;
}

.footer-services-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem 1.5rem;
}

.footer-srv-link {
  font-size: 0.88rem;
  color: var(--text-secondary);
  text-align: left;
  transition: color 0.2s ease;
}

.footer-srv-link:hover {
  color: var(--accent-orange);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
}

.contact-icon {
  color: var(--accent-orange);
}

.contact-link {
  font-size: 0.92rem;
  color: #0F172A;
  font-weight: 600;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--accent-orange);
}

.footer-legal-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  font-size: 0.82rem;
}

.legal-link {
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.legal-link:hover {
  color: var(--text-primary);
}

.footer-bottom-bar {
  border-top: 1px solid var(--border-light);
  padding: 1.25rem 2rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.bottom-container {
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* -------------------------------------------------------------
   MODALS (CONSULTATION & ASK GROWTHORA)
------------------------------------------------------------- */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 620px;
  background: #FFFFFF;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-medium);
  padding: 2.5rem;
  color: var(--text-primary);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  color: var(--text-muted);
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  color: var(--text-primary);
  background: var(--bg-surface-alt);
}

.modal-eyebrow {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--accent-orange);
  letter-spacing: 0.08em;
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.25rem 0 0.5rem;
}

.modal-sub {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-group-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-field label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: #FAF8F5;
  border: 1px solid var(--border-medium);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--accent-orange);
  background: #FFFFFF;
}

.btn-modal-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem;
  border-radius: var(--radius-md);
  background: var(--accent-orange);
  color: #FFF;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.5rem;
  transition: background 0.2s ease;
}

.btn-modal-submit:hover {
  background: var(--accent-orange-hover);
}

.modal-privacy-note {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-align: center;
}

.modal-success-state {
  text-align: center;
  padding: 2rem 1rem;
}

.success-icon {
  color: #10B981;
  margin-bottom: 1rem;
}

.success-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.75rem;
}

.success-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.75rem;
}

/* Ask Growthora Modal */
.ask-input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.ask-text-input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border-radius: var(--radius-md);
  background: #FAF8F5;
  border: 1px solid var(--border-medium);
  color: var(--text-primary);
  font-size: 0.95rem;
  outline: none;
}

.ask-text-input:focus {
  border-color: var(--accent-purple);
  background: #FFFFFF;
}

.btn-ask-submit {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem 1.4rem;
  border-radius: var(--radius-md);
  background: var(--accent-purple);
  color: #FFF;
  font-weight: 700;
}

.prompts-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 700;
  display: block;
  margin-bottom: 0.6rem;
}

.prompts-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prompt-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  border-radius: var(--radius-sm);
  background: #FAF8F5;
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  font-size: 0.88rem;
  text-align: left;
  transition: all 0.2s ease;
}

.prompt-chip:hover {
  background: var(--accent-purple-light);
  border-color: var(--accent-purple);
  color: var(--accent-purple);
}

.ask-answer-box {
  background: #FAF8F5;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1.5px solid var(--accent-purple);
}

.answer-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent-purple);
  margin-bottom: 0.5rem;
}

.answer-summary {
  font-size: 0.95rem;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.recommended-service-preview {
  background: #FFFFFF;
  border-radius: var(--radius-md);
  padding: 1rem;
  margin-bottom: 1.25rem;
  border: 1px solid var(--border-light);
}

.rec-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--accent-orange);
}

.rec-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.25rem 0;
}

.rec-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* -------------------------------------------------------------
   RESPONSIVE BREAKPOINTS
------------------------------------------------------------- */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-visual-container {
    order: -1;
    min-height: 380px;
  }

  .desktop-services-layout {
    display: none;
  }

  .mobile-services-accordion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .accordion-card {
    background: var(--bg-surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-light);
    overflow: hidden;
  }

  .accordion-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    background: var(--bg-surface);
  }

  .accordion-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .acc-num {
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--accent-orange);
  }

  .acc-name {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text-primary);
  }

  .accordion-body {
    padding: 0 1rem 1.5rem;
  }

  .service-detail-card {
    padding: 1.5rem;
    box-shadow: none;
    border: none;
  }

  .finder-body-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-container {
    grid-template-columns: 1fr 1fr;
  }
}

/* GLOBAL MOBILE RESPONSIVENESS ENHANCEMENTS */

html, body, .services-page-root {
  max-width: 100vw;
  overflow-x: hidden;
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-title {
    font-size: clamp(2.2rem, 5vw, 3.25rem);
  }

  .hero-visual-container {
    width: 100%;
    max-width: 580px;
    margin: 0 auto;
  }

  .hero-bottom-banner {
    flex-direction: column;
    gap: 1.5rem;
  }

  .hero-metrics-grid {
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .sticky-header {
    padding: 0.75rem 0;
  }

  .header-brand-logo-img {
    height: 38px;
  }

  .desktop-nav {
    display: none;
  }

  .header-actions .btn-ask-growthora,
  .header-actions .btn-primary-header {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    min-width: 44px;
    min-height: 44px;
    color: var(--text-primary);
  }

  .mobile-drawer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #FAF8F5;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-medium);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    z-index: 100;
  }

  .hero-section {
    padding: 2.5rem 1rem 3.5rem;
  }

  .hero-title {
    font-size: clamp(2rem, 6vw, 2.5rem);
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1.75rem;
  }

  .hero-cta-group {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .btn-hero-primary,
  .btn-hero-secondary {
    width: 100%;
    justify-content: center;
  }

  .hero-dropdown-wrapper {
    width: 100%;
  }

  .explore-services-dropdown-menu {
    width: 100%;
    max-width: 100%;
  }

  .dropdown-services-list {
    grid-template-columns: 1fr 1fr;
  }

  .hero-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .metric-box {
    padding: 0.85rem;
  }

  .metric-val {
    font-size: 1.25rem;
  }

  .metric-lbl {
    font-size: 0.75rem;
  }

  .hero-quote-card {
    width: 100%;
  }

  .card-two-col {
    grid-template-columns: 1fr;
  }

  .footer-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .footer-bottom-bar .bottom-container {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .form-group-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dropdown-services-list {
    grid-template-columns: 1fr;
  }

  .hero-trust-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .consultation-modal-content,
  .ask-modal-content {
    width: 95%;
    padding: 1.25rem;
    border-radius: 16px;
  }

  .modal-header h3 {
    font-size: 1.35rem;
  }
}

/* ─────────────────────────────────────────
   COMPREHENSIVE MOBILE LAYOUT FIXES
   Targets: Hero, 3D Ecosystem, Metrics, Blueprint
───────────────────────────────────────── */

@media (max-width: 768px) {
  /* Hero section — proper padding */
  .hero-section {
    padding: 2.5rem 1rem 3rem;
  }

  /* Hero grid → single column, image below text */
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0;
  }

  /* 3D ecosystem image */
  .hero-visual-container {
    width: 100%;
    max-width: 100%;
    order: 2;
  }

  .hero-3d-ecosystem-wrapper {
    width: 100%;
    max-width: 100%;
  }

  .hero-3d-ecosystem-img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  /* Disable floating animation on mobile to prevent layout jumps */
  .float-3d-motion {
    animation: none;
  }

  /* Hero bottom banner → stack vertically */
  .hero-bottom-banner {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }

  /* Metrics grid → 2 columns on mobile */
  .hero-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 14px;
  }

  .metric-box {
    gap: 0.5rem;
  }

  .metric-icon-wrap {
    width: 30px;
    height: 30px;
    border-radius: 8px;
  }

  .metric-val {
    font-size: 1.1rem;
  }

  .metric-lbl {
    font-size: 0.7rem;
  }

  /* Quote card — full width */
  .hero-quote-card {
    padding: 1rem 1.25rem;
    border-radius: 14px;
  }

  /* Hero content */
  .hero-content {
    order: 1;
  }

  .hero-title {
    font-size: clamp(1.85rem, 6vw, 2.4rem);
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .hero-cta-group {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    margin-bottom: 1.75rem;
  }

  .btn-hero-primary,
  .btn-hero-secondary {
    width: 100%;
    justify-content: center;
    padding: 0.8rem 1.25rem;
    font-size: 0.95rem;
  }

  .hero-dropdown-wrapper {
    width: 100%;
  }

  .explore-services-dropdown-menu {
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
  }

  /* Hero trust bar */
  .hero-trust-bar {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .trust-item {
    font-size: 0.82rem;
  }
}

@media (max-width: 430px) {
  .hero-section {
    padding: 2rem 0.875rem 2.5rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .metric-val {
    font-size: 1rem;
  }

  .metric-lbl {
    font-size: 0.65rem;
  }

  .hero-metrics-grid {
    padding: 0.75rem;
    gap: 0.5rem;
  }
}

/* ─────────────────────────────────────────
   UNIVERSAL MOBILE RESPONSIVE AUDIT & FIXES
   Enforces width: 100%, max-width: 100%, box-sizing: border-box,
   natural text wrapping, and zero horizontal scrolling on 375px, 390px, 430px, 768px
───────────────────────────────────────── */

* {
  box-sizing: border-box;
}

img, svg, video {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  html, body, .services-page-root {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  /* Universal container & card constraints */
  .hero-container,
  .blueprint-layout-container,
  .header-container,
  .footer-container,
  .finder-container,
  .cta-container,
  .service-detail-card,
  .blueprint-paper-card,
  .blueprint-table-container,
  .hero-metrics-grid,
  .hero-quote-card,
  .blueprint-execution-path-card {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Universal text wrapping rules — no text overflows */
  h1, h2, h3, h4, h5, h6, p, span, li, a, div, button {
    overflow-wrap: anywhere;
    word-break: normal;
  }

  /* Universal button scaling */
  button, .btn, input, select {
    max-width: 100%;
    box-sizing: border-box;
  }
}


```

