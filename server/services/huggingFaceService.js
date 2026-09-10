import { HfInference } from '@huggingface/inference';

let hf;

export function initHuggingFace(token) {
  if (!token) throw new Error('HF_TOKEN is missing');
  hf = new HfInference(token);
}

export async function chatCompletion(messages) {
  if (!hf) throw new Error('HuggingFace client not initialized');

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

  try {
    const response = await hf.chatCompletion({
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
