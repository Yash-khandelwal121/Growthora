import express from 'express';
import * as googleTTS from 'google-tts-api';

const router = express.Router();

const SUPPORTED_LANGUAGES = ['en', 'hi', 'te', 'ml', 'kn', 'mr', 'bn', 'pa'];

router.post('/', async (req, res) => {
  try {
    const { text, language, languageCode } = req.body;
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
      
    const TTS_MAP = {
      'en-IN': 'en-IN',
      'hi-IN': 'hi-IN',
      'bn-IN': 'bn-IN',
      'te-IN': 'te',
      'ml-IN': 'ml',
      'kn-IN': 'kn',
      'mr-IN': 'mr',
      'pa-IN': 'pa'
    };

    let lang = TTS_MAP[languageCode] || languageCode || 'en-IN';
    
    if (languageCode && !TTS_MAP[languageCode]) {
      console.warn(`[VOICE] TTS language fallback from ${languageCode} to en-IN`);
    }

    // Get Base64 Audio
    const results = await googleTTS.getAllAudioBase64(cleanText, {
      lang: lang,
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });

    const audioBuffers = results.map(result => Buffer.from(result.base64, 'base64'));
    const finalBuffer = Buffer.concat(audioBuffers);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': finalBuffer.length,
    });
    
    res.send(finalBuffer);
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ error: 'Failed to generate audio' });
  }
});

export default router;
