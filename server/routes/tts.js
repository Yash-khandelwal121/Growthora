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

    // Strip markdown formatting for speech
    const cleanText = text
      .replace(/[*#_>`~\[\]]/g, '')
      .replace(/\n/g, ' . ')
      .trim();
      
    const TTS_MAP = {
      'en-IN': 'en',
      'hi-IN': 'hi',
      'te-IN': 'te',
      'ml-IN': 'ml',
      'kn-IN': 'kn',
      'mr-IN': 'mr',
      'bn-IN': 'bn',
      'pa-IN': 'pa'
    };

    let lang = TTS_MAP[languageCode] || 'en';
    
    if (languageCode && !TTS_MAP[languageCode]) {
      console.warn(`[VOICE] TTS language fallback from ${languageCode} to en`);
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
