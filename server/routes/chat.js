import express from 'express';
import { chatCompletion } from '../services/huggingFaceService.js';
import { searchKnowledge } from '../services/growthoraKnowledge.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const SYSTEM_PROMPT = `You are Growthora AI, the official Company Knowledge & Business Advisory Assistant for Growthora Advisory Private Limited.
Your primary role is to answer questions about Growthora's services, funding solutions, MSME schemes, industries, registrations, and general business compliance using ONLY the provided verified Growthora Knowledge Context.

CRITICAL RULES:
1. NO HALLUCINATION: If the provided knowledge context does not contain the answer, you MUST clearly state: "I don't have verified Growthora-specific information for this detail. Please contact the Growthora team for exact information."
2. Never invent: prices, phone numbers, addresses, employees, branches, certifications, clients, revenue, funding guarantees, government approvals, success rates, or legal claims.
3. Only mention options, services, or schemes that are explicitly detailed in the Knowledge Context.
4. MULTI-TURN MEMORY: Remember the user's business type, industry, or funding amount from previous messages. Answer follow-up questions in that context.
5. FUNDING HANDOFF: If the user clearly indicates they need funding (e.g., "I need funding", "loan chahiye", "business loan", "grant", "investor"), you MUST explain the relevant Growthora funding routes (Grants, Debt, Equity) based on the context, and you MUST end your response by offering the "Start Funding Assessment" CTA.
6. LANGUAGE CONTINUITY: You MUST reply naturally and fluently in the user's selected language. Do not mix languages or fallback to Hindi/English unless explicitly requested.
7. Be professional, conversational, and easy to understand. Do NOT use any Markdown formatting, JSON, bolding, italics, or decorative separators. Use plain text structure.`;

router.post('/', upload.single('image'), async (req, res) => {
  console.log(`[DIAGNOSTICS] /api/chat endpoint entered`);
  console.log(`[DIAGNOSTICS] HF_TOKEN present: ${!!process.env.HF_TOKEN}`);
  console.log(`[DIAGNOSTICS] Request Body Keys: ${Object.keys(req.body).join(', ')}`);
  
  try {
    const { message, conversation, language } = req.body;
    let parsedConversation = [];
    if (conversation) {
      try {
        parsedConversation = JSON.parse(conversation);
      } catch(e) {
        parsedConversation = conversation;
      }
    }
    
    if (!message && !req.file) {
      return res.status(400).json({ error: 'Message or image is required.' });
    }

    const contextStr = searchKnowledge(message || '');
    
    let sysPrompt = SYSTEM_PROMPT;
    if (language) {
      sysPrompt += `\n\nCRITICAL LANGUAGE OVERRIDE: You MUST formulate your entire response exclusively and fluently in ${language}. Absolutely NO Hindi or English fallback unless the user explicitly requests it. Your text and script must be natively ${language}.`;
    }
    
    const messages = [
      { role: 'system', content: sysPrompt + '\n\nKnowledge Context:\n' + contextStr }
    ];

    // Append history
    if (Array.isArray(parsedConversation)) {
       messages.push(...parsedConversation.map(msg => ({
         role: msg.role,
         content: msg.content
       })));
    }

    // Append current user message
    const userMessageContent = [];
    if (message) {
      userMessageContent.push({ type: "text", text: message });
    }
    if (req.file) {
      const base64Image = req.file.buffer.toString('base64');
      const dataUrl = `data:${req.file.mimetype};base64,${base64Image}`;
      userMessageContent.push({
        type: "image_url",
        image_url: { url: dataUrl }
      });
    }

    messages.push({
      role: 'user',
      content: userMessageContent.length === 1 && userMessageContent[0].type === 'text' 
        ? userMessageContent[0].text 
        : userMessageContent
    });

    const aiMessage = await chatCompletion(messages);

    const sanitizeResponse = (text) => {
      if (!text) return "";
      let clean = text;
      // Remove horizontal rules and decorative lines (===, ---, ***, etc.)
      clean = clean.replace(/^[=\-_*~]{3,}\s*$/gm, '');
      // Convert markdown headers (###, ##, #) to plain text with a newline
      clean = clean.replace(/^#+\s+(.*)$/gm, '$1');
      // Remove list bullets (- or * or +) at the start of a line
      clean = clean.replace(/^[\s]*[-*+]\s+(.*)$/gm, '$1');
      // Convert bold/italic symbols (**text**, *text*, __text__) but keep the text
      clean = clean.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1');
      // Remove backticks and code blocks
      clean = clean.replace(/```[\s\S]*?```/g, '');
      clean = clean.replace(/`([^`]+)`/g, '$1');
      // Remove raw HTML tags
      clean = clean.replace(/<[^>]*>/g, '');
      // Clean up multiple newlines
      clean = clean.replace(/\n{3,}/g, '\n\n');
      return clean.trim();
    };

    const cleanReply = sanitizeResponse(aiMessage.content);
    console.log(`[DIAGNOSTICS] /api/chat upstream success`);
    res.json({ reply: cleanReply });
  } catch (error) {
    console.error(`[DIAGNOSTICS] Chat error intercepted: ${error.message}`);
    res.status(500).json({ error: error.message || 'Sorry, I am having trouble connecting right now. Please try again in a moment.' });
  }
});

export default router;
