async function testTTS(languageCode, text) {
  console.log(`Testing /api/tts endpoint for ${languageCode}...`);
  try {
    const response = await fetch('http://localhost:5000/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, languageCode })
    });
    
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      console.log(`Success! Received audio stream: ${buffer.byteLength} bytes for ${languageCode}. Content-Type: ${response.headers.get('content-type')}`);
    } else {
      const errorText = await response.text();
      console.error(`TTS Failed for ${languageCode}:`, response.status, errorText);
    }
  } catch (err) {
    console.error(`Error during test for ${languageCode}:`, err.message);
  }
}

async function runAll() {
  await testTTS('en-IN', 'Hello, this is a test of the Growthora TTS in English.');
  await testTTS('hi-IN', 'Namaste, yeh Growthora TTS ka Hindi mein ek test hai.');
}

runAll();
