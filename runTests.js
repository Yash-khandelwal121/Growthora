const tests = [
  "Growthora kya karta hai?",
  "Growthora ki services kya hain?",
  "Mujhe business funding chahiye.",
  "Mujhe manufacturing business ke liye 50 lakh funding chahiye.",
  "MSME ke liye Growthora kya karta hai?",
  "Mujhe Pvt Ltd company register karni hai.",
  "FSSAI registration mein help karte ho?",
  "ISO ke liye kya service hai?",
  "Agriculture business ke liye kya support hai?",
  "Manufacturing company ko Growthora kaise help karta hai?",
  "IPO ke liye Growthora kya karta hai?",
  "Meri company ka compliance weak hai, kya aap help kar sakte ho?",
  "Growthora ke 500 clients hain kya?"
];

async function runTestMatrix() {
  for (const test of tests) {
    console.log(`\n\n=== Q: ${test} ===`);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: test })
      });
      const data = await response.json();
      console.log(`\nA: ${data.reply}`);
    } catch (error) {
      console.error(`Error:`, error);
    }
  }
}

runTestMatrix();
