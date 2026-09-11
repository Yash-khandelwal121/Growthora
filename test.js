const testChat = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Growthora kya karta hai?' })
    });
    const data = await response.json();
    console.log('Response from API:', data);
  } catch (error) {
    console.error('Error calling API:', error);
  }
};

testChat();
