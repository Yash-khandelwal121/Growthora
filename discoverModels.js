import dotenv from 'dotenv';
dotenv.config();

const testModels = async () => {
  try {
    const response = await fetch('https://router.huggingface.co/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`
      }
    });
    const data = await response.json();
    console.log(JSON.stringify(data.data.map(m => m.id), null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};

testModels();
