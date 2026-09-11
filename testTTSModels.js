import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const hf = new HfInference(process.env.HF_TOKEN);

async function testTTS(model, text) {
  try {
    console.log(`Testing TTS with model: ${model}`);
    const audioBlob = await hf.textToSpeech({
      model: model,
      inputs: text,
    });
    console.log(`Success with ${model}: Received audio blob of size ${audioBlob.size} bytes`);
    return true;
  } catch (error) {
    console.error(`Failed with ${model}:`, error.message);
    return false;
  }
}

async function runTests() {
  // Test a few common HF TTS models
  await testTTS('facebook/mms-tts-hin', 'Namaste, yeh ek test hai.');
  await testTTS('facebook/mms-tts-eng', 'Hello, this is a test.');
  await testTTS('espnet/kan-bayashi_ljspeech_vits', 'Hello, this is a test.');
  await testTTS('suno/bark-small', 'Hello, this is a test.');
}

runTests();
