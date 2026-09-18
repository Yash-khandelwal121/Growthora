import dotenv from 'dotenv';
dotenv.config();

async function testConsultation() {
  console.log('Testing /api/chat strict state machine...');
  try {
    const history = [
      { role: "assistant", content: "Yes, MSME loans are available. \n\nWould you like me to book a Free Consultation for you?" },
      { role: "user", content: "Yes please" }
    ];

    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "Yes please",
        conversation: JSON.stringify(history),
        language: "English"
      })
    });
    
    const data = await response.json();
    console.log('AI Final Reply (sent to frontend):', data.reply);
  } catch (err) {
    console.error('Error during chat test:', err.message);
  }
}

testConsultation();
