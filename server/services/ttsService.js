import fs from 'fs';
export const generateSpeech = async (text, languageCode) => {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) throw new Error('SARVAM_API_KEY is not defined in environment variables');

  // Chunking logic to stay strictly under 400 characters (API limit is 500)
  const chunks = [];
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  let currentChunk = "";
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > 400) {
      if (currentChunk) chunks.push(currentChunk.trim());
      // If a single sentence itself is > 400 chars, hard split it
      if (sentence.length > 400) {
         let temp = sentence;
         while(temp.length > 400) {
             chunks.push(temp.substring(0, 400));
             temp = temp.substring(400);
         }
         currentChunk = temp;
      } else {
         currentChunk = sentence;
      }
    } else {
      currentChunk += " " + sentence;
    }
  }
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  if (chunks.length === 0) return Buffer.from('');

  console.log(`[TTS Service] Text split into ${chunks.length} chunks. Target: ${languageCode}`);
  chunks.forEach((c, idx) => {
    console.log(`[TTS Service] Chunk ${idx+1} first 20 chars: "${c.substring(0, 20)}"`);
  });

  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    try {
      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'api-subscription-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: [chunk],
          target_language_code: languageCode,
          speaker: 'meera',
          pace: 1.0,
          speech_sample_rate: 8000,
          enable_preprocessing: true,
          model: 'bulbul:v3',
          output_audio_codec: 'mp3'
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`[TTS Service] Sarvam API Error (${response.status}) on chunk ${i+1}:`, errorData);
        throw new Error(`Sarvam API failed with status ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      console.log(`[TTS Service] Chunk ${i+1} response data.audios.length:`, data.audios ? data.audios.length : 0);
      
      if (data.audios && data.audios.length > 0) {
        buffers.push(Buffer.from(data.audios[0], 'base64'));
      }
    } catch (error) {
      console.error(`[TTS Service] Failed to generate speech for chunk ${i+1}:`, error.message);
      throw error;
    }
  }

  if (buffers.length === 0) throw new Error('No audio data returned from Sarvam API across all chunks');
  
  const finalBuffer = Buffer.concat(buffers);
  console.log(`[TTS Service] Final concatenated buffer size: ${finalBuffer.length} bytes`);
  
  fs.writeFileSync('./debug-final-tts.mp3', finalBuffer);
  
  return finalBuffer;
};
