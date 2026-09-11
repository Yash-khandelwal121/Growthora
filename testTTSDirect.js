
import dotenv from 'dotenv';
dotenv.config();

async function testTTSDirect(model, text) {
  try {
    console.log(`Testing direct fetch with model: ${model}`);
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed with ${model}:`, response.status, errorText);
      return false;
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`Success with ${model}: Received audio buffer of size ${audioBuffer.byteLength} bytes`);
    return true;
  } catch (error) {
    console.error(`Failed with ${model}:`, error.message);
    return false;
  }
}

async function runTests() {
  await testTTSDirect('facebook/mms-tts-hin', 'Namaste, yeh ek test hai.');
  await testTTSDirect('facebook/mms-tts-eng', 'Hello, this is a test.');
  await testTTSDirect('suno/bark-small', 'Hello, this is a test.');
}

runTests();
