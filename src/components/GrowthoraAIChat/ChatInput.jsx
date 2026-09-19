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
            <X size={16} />
          </button>
          
          <div className={`ai-robot-container ${voiceState}`}>
            <div className="ai-robot-glow-bg"></div>
            <video 
              src="/aivideo.mp4" 
              className="ai-robot-icon" 
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '24px' }}
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
