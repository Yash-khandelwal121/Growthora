import dotenv from 'dotenv';
dotenv.config();

async function testConsultation() {
  console.log('Testing /api/chat consultation flow...');
  try {
    const history = [
      { role: "assistant", content: "Great! Since we have answered all your questions, would you like to book a Free Consultation with our experts? Please tell me your Name, Mobile Number, and Email." },
      { role: "user", content: "Yes please. My name is Amit. Mobile is 9999999999 and email is amit@test.com." }
    ];

    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "Yes please. My name is Amit. Mobile is 9999999999 and email is amit@test.com.",
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
