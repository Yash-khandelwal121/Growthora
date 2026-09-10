import { HfInference } from '@huggingface/inference';

let hf;

export function initSpeechService(token) {
  if (!token) throw new Error('HF_TOKEN is missing');
  hf = new HfInference(token);
}

export async function transcribeAudio(audioBuffer) {
  if (!hf) throw new Error('HuggingFace client not initialized');

  try {
    const response = await hf.automaticSpeechRecognition({
      model: 'openai/whisper-large-v3',
      data: audioBuffer,
    });
    
    return response.text;
  } catch (error) {
    console.error("Speech Service Error:", error.message);
    throw new Error('Speech transcription failed.');
  }
}
