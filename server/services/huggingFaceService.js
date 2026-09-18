import { HfInference } from '@huggingface/inference';

let hf;

export function initHuggingFace(token) {
  // Kept for backward compatibility but dynamic initialization is preferred
  if (token) hf = new HfInference(token);
}

export async function chatCompletion(messages) {
  const token = process.env.HF_TOKEN;
  if (!token) {
    console.error('[DIAGNOSTICS] Hugging Face initialization failed: HF_TOKEN is missing in Vercel env');
    throw new Error('HF_TOKEN environment variable is missing in Vercel. Please add it to your project settings.');
  }
  
  const client = hf || new HfInference(token);
  if (!hf) console.log('[DIAGNOSTICS] Hugging Face client successfully initialized dynamically');

  // Check if any message content contains an image_url
  const hasImage = messages.some(msg => {
    if (Array.isArray(msg.content)) {
      return msg.content.some(part => part.type === 'image_url');
    }
    return false;
  });

  if (!hasImage && process.env.GROQ_API_KEY) {
    console.log(`[DIAGNOSTICS] Target Provider: Groq API (groq/compound-mini)`);
    try {
      console.time('GROQ_API_CALL_DURATION');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'groq/compound-mini',
          messages: messages,
          max_tokens: 1024
        })
      });

      console.timeEnd('GROQ_API_CALL_DURATION');
      
      if (!response.ok) {
        const errData = await response.text();
        throw new Error(`Groq API Error: ${errData}`);
      }
      
      const data = await response.json();
      return data.choices[0].message;
    } catch (error) {
      console.timeEnd('GROQ_API_CALL_DURATION');
      console.error("Groq API Error Full:", error);
      throw new Error('AI Service is currently unavailable.');
    }
  }

  // Fallback to Hugging Face
  const targetModel = hasImage 
    ? (process.env.HF_VISION_MODEL || "Qwen/Qwen2.5-VL-72B-Instruct")
    : (process.env.HF_TEXT_MODEL || "meta-llama/Llama-3.1-8B-Instruct");

  console.log(`[DIAGNOSTICS] Hugging Face Target Model/Provider: ${targetModel}`);

  try {
    console.time('HF_API_CALL_DURATION');
    const response = await client.chatCompletion({
      model: targetModel,
      messages: messages,
      max_tokens: 1024,
    });
    console.timeEnd('HF_API_CALL_DURATION');
    
    return response.choices[0].message;
  } catch (error) {
    console.timeEnd('HF_API_CALL_DURATION');
    console.error("HuggingFace API Error Full:", error.httpResponse?.body?.error || error);
    throw new Error('AI Service is currently unavailable.');
  }
}
