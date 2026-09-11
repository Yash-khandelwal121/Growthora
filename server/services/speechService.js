import { HfInference } from '@huggingface/inference';

let hf;

export function initSpeechService(token) {
  // Kept for backward compatibility but dynamic initialization is preferred
  if (token) hf = new HfInference(token);
}

export async function transcribeAudio(audioBuffer) {
  const token = process.env.HF_TOKEN;
  if (!token) {
    throw new Error('HF_TOKEN environment variable is missing in Vercel. Please add it to your project settings.');
  }
  
  const client = hf || new HfInference(token);

  try {
    const response = await client.automaticSpeechRecognition({
      model: 'openai/whisper-large-v3',
      data: audioBuffer,
    });
    
    return response.text;
  } catch (error) {
    console.error("Speech Service Error:", error.message);
    throw new Error('Speech transcription failed.');
  }
}
