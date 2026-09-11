const testChat = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Mujhe business ke liye funding chahiye.' })
    });
    const data = await response.json();
    console.log('Response from API (Funding):', data);
  } catch (error) {
    console.error('Error calling API:', error);
  }
};
testChat();
