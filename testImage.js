const testImageChat = async () => {
  try {
    const dummyImageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'What is this image?',
        image: dummyImageBase64
      })
    });
    const data = await response.json();
    console.log('Response from API (Image):', data);
  } catch (error) {
    console.error('Error calling API:', error);
  }
};

testImageChat();
