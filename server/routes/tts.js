import express from 'express';
import { generateSpeech } from '../services/ttsService.js';

const router = express.Router();

const SUPPORTED_LANGUAGES = ['en', 'hi', 'te', 'ml', 'kn', 'mr', 'bn', 'pa'];

let ttsRequestCount = 0;

router.post('/', async (req, res) => {
  ttsRequestCount++;
  console.log(`[TTS REQUEST #${ttsRequestCount}]`);
  console.log(`[HTTP TTS] request text: ${req.body.text}`);
  console.log(`[DIAGNOSTICS] /api/tts endpoint entered`);
  console.log(`[DIAGNOSTICS] Request Body Keys: ${Object.keys(req.body).join(', ')}`);
  try {
    const { text, language, languageCode } = req.body;
    console.log(`[DIAGNOSTICS] TTS requested for language: ${languageCode}`);
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Deep sanitize text specifically for speech to avoid pronouncing symbols
    const cleanText = text
      // Remove all markdown/decorative symbols
      .replace(/[*#_>`~\[\]={}]/g, '')
      // Remove standalone dashes or multiple dashes (but keep hyphens in words like co-op)
      .replace(/(?:\s-\s|--+)/g, ' ')
      // Replace newlines with periods to ensure proper pauses instead of skipping
      .replace(/\n+/g, ' . ')
      .trim();
      
    // Sarvam AI expects BCP-47 target_language_code format (e.g. 'en-IN')
    const TTS_MAP = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'te': 'te-IN',
      'ml': 'ml-IN',
      'kn': 'kn-IN',
      'mr': 'mr-IN',
      'pa': 'pa-IN',
      'en-IN': 'en-IN',
      'hi-IN': 'hi-IN',
      'bn-IN': 'bn-IN',
      'te-IN': 'te-IN',
      'ml-IN': 'ml-IN',
      'kn-IN': 'kn-IN',
      'mr-IN': 'mr-IN',
      'pa-IN': 'pa-IN'
    };

    let effectiveLangCode = languageCode || 'en-IN';
    let lang = TTS_MAP[effectiveLangCode] || 'en-IN'; // Default to en-IN if missing
    
    console.log(`[DIAGNOSTICS] TTS Mapping: Requested UI Locale [${languageCode}] -> Mapped Provider Language [${lang}]`);
    
    if (languageCode && !TTS_MAP[languageCode] && !SUPPORTED_LANGUAGES.includes(languageCode)) {
      console.warn(`[VOICE] TTS language fallback from ${languageCode} to en-IN`);
    }

    // Generate speech using Sarvam AI service
    const finalBuffer = await generateSpeech(cleanText, lang);

    res.set({
      'Content-Type': 'audio/mpeg', // Sarvam defaults to mp3
      'Content-Length': finalBuffer.length,
    });
    
    console.log(`[HTTP TTS] response bytes: ${finalBuffer.length}`);
    console.log(`[HTTP TTS] content-type: audio/mpeg`);
    console.log(`[DIAGNOSTICS] /api/tts upstream success, returning audio. Upstream Status: OK`);
    res.send(finalBuffer);
  } catch (error) {
    console.error(`[DIAGNOSTICS] TTS error intercepted: ${error.message}`);
    res.status(500).json({ error: error.message || 'Failed to generate audio' });
  }
});

export default router;
