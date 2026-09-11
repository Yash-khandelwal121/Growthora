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

  const targetModel = hasImage 
    ? (process.env.HF_VISION_MODEL || "Qwen/Qwen2.5-VL-72B-Instruct")
    : (process.env.HF_TEXT_MODEL || "Qwen/Qwen2.5-7B-Instruct");

  console.log(`[DIAGNOSTICS] Hugging Face Target Model/Provider: ${targetModel}`);

  try {
    const response = await client.chatCompletion({
      model: targetModel,
      messages: messages,
      max_tokens: 1024,
    });
    
    return response.choices[0].message;
  } catch (error) {
    console.error("HuggingFace API Error Full:", error.httpResponse?.body?.error || error);
    throw new Error('AI Service is currently unavailable.');
  }
}
