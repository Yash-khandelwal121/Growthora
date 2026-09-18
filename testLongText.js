import dotenv from 'dotenv';
dotenv.config();
import { generateSpeech } from './server/services/ttsService.js';
import fs from 'fs';

async function testLongText() {
  const longText = "Growthora is an advisory company. ".repeat(30); // ~1020 characters
  console.log('Testing long text chunking (Length: ' + longText.length + ')');
  try {
    const buffer = await generateSpeech(longText, 'en-IN');
    console.log('Success! Combined buffer length:', buffer.length);
    fs.writeFileSync('long_test.mp3', buffer);
    console.log('Saved to long_test.mp3');
  } catch (err) {
    console.error('Failed:', err);
  }
}

testLongText();
