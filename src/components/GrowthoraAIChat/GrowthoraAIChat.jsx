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
