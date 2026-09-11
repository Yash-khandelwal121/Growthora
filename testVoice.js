// Using standard web fetch API since node >= 18
// Using standard web fetch API since node >= 18
const testVoiceChat = async () => {
  try {
    const formData = new FormData();
    // A tiny dummy text file posing as audio just to hit the endpoint
    const blob = new Blob(['RIFF$dummywavdata'], { type: 'audio/wav' }); 
    formData.append('audio', blob, 'audio.wav');

    const response = await fetch('http://localhost:5000/api/transcribe', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    console.log('Response from API (Voice Transcribe):', data);
  } catch (error) {
    console.error('Error calling Voice API:', error);
  }
};

testVoiceChat();
