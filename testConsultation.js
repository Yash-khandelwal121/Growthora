import dotenv from 'dotenv';
dotenv.config();

async function testConsultation() {
  console.log('Testing /api/chat consultation flow...');
  try {
    const history = [
      { role: "assistant", content: "Yes, we offer MSME registration." },
      { role: "user", content: "That answers all my questions. I am ready to proceed." }
    ];

    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "That answers all my questions. I am ready to proceed.",
        conversation: JSON.stringify(history)
      })
    });
    
    const data = await response.json();
    console.log('AI Response:', data.reply);
  } catch (err) {
    console.error('Error during chat test:', err.message);
  }
}

testConsultation();
