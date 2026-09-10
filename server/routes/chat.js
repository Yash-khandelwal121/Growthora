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
6. HINDI/HINGLISH: Reply naturally in the user's language/style (English, Hindi, or Hinglish).
7. Be professional, easy to understand, and action-oriented. Use Markdown for readability.`;

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { message, conversation } = req.body;
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
    
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + '\n\nKnowledge Context:\n' + contextStr }
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

    res.json({ reply: aiMessage.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Sorry, I am having trouble connecting right now. Please try again in a moment.' });
  }
});

export default router;
