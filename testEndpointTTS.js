async function testTTS() {
  console.log('Testing /api/tts endpoint...');
  try {
    const response = await fetch('http://localhost:5000/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello, this is a test of the Growthora TTS.' })
    });
    
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      console.log(`Success! Received audio stream: ${buffer.byteLength} bytes.`);
    } else {
      const errorText = await response.text();
      console.error('TTS Failed:', response.status, errorText);
    }
  } catch (err) {
    console.error('Error during test:', err.message);
  }
}

testTTS();
