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
  selectedLanguage,
  onLanguageSelect
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
  const listeningUnlockTimerRef = useRef(null);
  const recognitionRef = useRef(null);

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
    
    const requestLang = selectedLanguage?.name?.toLowerCase() || 'english';
    const langConfig = VOICE_LANGUAGES[requestLang] || VOICE_LANGUAGES.english;
    recognition.lang = selectedLanguage ? langConfig.speechRecognition : 'en-IN';
    
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("[VOICE] Recognition STARTED");
      recognitionRunningRef.current = true;
      setVoiceState('listening');
    };

    recognition.onresult = (event) => {
      // Prevent duplicate processing if already thinking/processing
      if (isProcessingRef.current || isSpeakingRef.current) return;

      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      
      const finalText = transcript.trim();
      if (!finalText) return;
      
      console.log("[VOICE] FINAL TRANSCRIPT:", finalText);

      const elapsed = Date.now() - lastTtsEndTimeRef.current;
      if (elapsed < 1000) {
        console.log("[VOICE] USER SPEECH IGNORED (TTS Cooldown):", finalText);
        return;
      }
      
      if (finalText.length < 2) {
        console.log("[VOICE] USER SPEECH IGNORED (Too short/noise):", finalText);
        return;
      }

      // If no language is selected yet, check if the user spoke a language name
      if (!selectedLanguage) {
        const lowerText = finalText.toLowerCase();
        const supported = [
          { name: 'English', code: 'en', words: ['english'] },
          { name: 'Hindi', code: 'hi', words: ['hindi', 'हिंदी'] },
          { name: 'Telugu', code: 'te', words: ['telugu', 'తెలుగు'] },
          { name: 'Malayalam', code: 'ml', words: ['malayalam', 'മലയാളം'] },
          { name: 'Kannada', code: 'kn', words: ['kannada', 'ಕನ್ನಡ'] },
          { name: 'Marathi', code: 'mr', words: ['marathi', 'मराठी'] },
          { name: 'Bengali', code: 'bn', words: ['bengali', 'bangla', 'বাংলা'] },
          { name: 'Punjabi', code: 'pa', words: ['punjabi', 'ਪੰਜਾਬੀ'] }
        ];

        for (const lang of supported) {
          if (lang.words.some(w => lowerText.includes(w))) {
            console.log("[VOICE] Language Selected via Mic:", lang.name);
            try { recognition.stop(); } catch(e){}
            recognitionRunningRef.current = false;
            onLanguageSelect(lang);
            return;
          }
        }
        
        // If they spoke something else but no language is selected, just drop it 
        // to prevent API calls before language selection.
        console.log("[VOICE] Ignored speech because no language selected yet:", finalText);
        return;
      }
      
      console.log("[VOICE] USER SPEECH ACCEPTED:", finalText);

      try { recognition.stop(); } catch(e){}
      
      recognitionRunningRef.current = false;
      isProcessingRef.current = true;
      setVoiceState('thinking');
      
      onSendMessage({
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
      const delay = Math.max(700, 1000 - elapsed);

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
    if (isSpeakingRef.current) {
      return;
    }
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
      console.log("[VOICE] TTS START");
      isSpeakingRef.current = true;
      setVoiceState('speaking');
      
      if (recognitionRunningRef.current) {
        try { recognitionRef.current?.abort(); } catch(e){}
        recognitionRunningRef.current = false;
      }
      
      try {
        const GREETINGS = {
          english: "Hello, hi! This is Growthora Agent. How can I help you?",
          hindi: "नमस्ते! मैं Growthora Agent हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
          telugu: "నమస్కారం! నేను Growthora Agent ని. నేను మీకు ఎలా సహాయపడగలను?",
          malayalam: "നമസ്കാരം! ഞാൻ Growthora Agent ആണ്. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?",
          kannada: "ನಮಸ್ಕಾರ! ನಾನು Growthora Agent. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
          marathi: "नमस्कार! मी Growthora Agent आहे. मी तुम्हाला कशी मदत करू शकेन?",
          bengali: "নমস্কার! আমি Growthora Agent। আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
          punjabi: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ Growthora Agent ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
        };
        const requestLang = selectedLanguage?.name?.toLowerCase() || 'english';
        const greetingText = GREETINGS[requestLang] || GREETINGS.english;
        
        await playAudio(greetingText, 'greeting');
      } catch (err) {
        console.error(err);
      }
      
      console.log("[VOICE] TTS END");
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
      }, 1000);
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
      if (playingMessageId) {
        console.log("[VOICE] TTS START");
        isSpeakingRef.current = true;
        isProcessingRef.current = false;
        setVoiceState('speaking');
        
        if (recognitionRunningRef.current) {
          try { recognitionRef.current?.abort(); } catch (e) {}
          recognitionRunningRef.current = false;
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
          }, 1000);
        }
      }
    }
  }, [playingMessageId, isLiveVoiceMode]);

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
        <div className="chat-input-area live-voice-mode">
          <div className="voice-status-display">
            <div className="voice-state" style={{ color: '#ef4444', textAlign: 'center' }}>
              <span>{voiceError}</span>
            </div>
          </div>
          <button type="button" className="exit-voice-btn" onClick={() => setIsLiveVoiceMode(false)}>
            <Keyboard size={16} /> Exit Voice
          </button>
        </div>
      );
    }

    return (
      <div className="chat-input-area live-voice-mode">
        <div className="voice-status-display">
          {voiceState === 'listening' && (
            <div className="voice-state listening">
              <AudioLines className="pulse-anim" size={32} color="#ff6b00" />
              <span>Listening...</span>
            </div>
          )}
          {voiceState === 'transcribing' && (
            <div className="voice-state">
              <Loader2 className="lucide-spin" size={24} color="#64748b" />
              <span>Processing speech...</span>
            </div>
          )}
          {voiceState === 'thinking' && (
            <div className="voice-state">
              <Loader2 className="lucide-spin" size={24} color="#ff6b00" />
              <span>Thinking...</span>
            </div>
          )}
          {voiceState === 'speaking' && (
            <div className="voice-state speaking">
              <AudioLines size={32} color="#ff6b00" />
              <span>Speaking...</span>
            </div>
          )}
        </div>
        
        <button 
          type="button" 
          className="exit-voice-btn" 
          onClick={() => setIsLiveVoiceMode(false)}
        >
          <Keyboard size={16} /> Exit Voice
        </button>
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
