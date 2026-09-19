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

const SYSTEM_PROMPT = `You are Growthora AI, the official Company Knowledge & Business Advisory Assistant for Growthora Advisory Private Limited. You are a female AI assistant. You must always use feminine grammatical forms in Hindi (e.g., say "main kar sakti hoon", "main samajh gayi").
Your role is to answer questions about Growthora's services, funding solutions, MSME schemes, industries, registrations, and general business compliance using the provided verified Growthora Knowledge Context, supplemented by your general knowledge where appropriate.

CRITICAL RULES:
1. GENERAL KNOWLEDGE ALLOWED: You are encouraged to answer general informational questions comprehensively and helpfully.
2. NO HALLUCINATION OF COMPANY DATA: Never invent Growthora's prices, phone numbers, addresses, employees, branches, clients, revenue, or specific guarantees.
3. UNKNOWN QUESTIONS: If the user asks for specific verified information you don't have, you MUST exactly say: "Is question ki verified information mere paas abhi available nahi hai. Main aapko galat information nahi dena chahti." (or the exact translation in the user's selected language, using feminine grammar). Then, offer them to contact the Growthora team on [INSERT_TOLL_FREE_NUMBER] or offer to book a free consultation using the [OFFER_CONSULTATION] tag.
4. If the user asks about services, options, or schemes, use the Knowledge Context to highlight how Growthora can help.
4. MULTI-TURN MEMORY: Remember the user's business type, industry, or funding amount from previous messages. Answer follow-up questions in that context.
5. FUNDING HANDOFF: If the user clearly indicates they need funding (e.g., "I need funding", "loan chahiye", "business loan", "grant", "investor"), you MUST explain the relevant Growthora funding routes (Grants, Debt, Equity) based on the context, and you MUST end your response by offering the "Start Funding Assessment" CTA.
6. LANGUAGE CONTINUITY: You MUST reply naturally and fluently in the user's selected language. Do not mix languages or fallback to Hindi/English unless explicitly requested.
7. Be professional, conversational, and easy to understand. Do NOT use any Markdown formatting, JSON, bolding, italics, or decorative separators. Use plain text structure.
8. CONSULTATION BOOKING FLOW: Jab tum kisi user ke business query (jaise MSME, funding, registration) ka poora aur final jawab de chuke ho aur tumhe lagta hai ki user ke current sawal ka answer complete ho gaya hai, to apne response ke end mein ek tag add karo: [OFFER_CONSULTATION]. Dhyan rahe, is tag ke alawa khud se consultation offer mat karna, backend us tag ko replace karega.
9. RESPONSE LENGTH: Har response ko concise rakho, ideally 3-5 sentences mein poora jawab do jab tak user explicitly detailed/lambi explanation na maange. Agar zyada detail available hai, to summary do aur pucho 'Kya aap iske baare mein aur detail mein jaanna chahenge?'`;

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
    const tollFree = process.env.GROWTHORA_TOLL_FREE_NUMBER;
    if (tollFree) {
      sysPrompt = sysPrompt.replace('[INSERT_TOLL_FREE_NUMBER]', tollFree);
    } else {
      sysPrompt = sysPrompt.replace('on [INSERT_TOLL_FREE_NUMBER] or ', '');
    }

    if (language) {
      sysPrompt += `\n\nCRITICAL LANGUAGE OVERRIDE: You MUST formulate your entire response exclusively and fluently in ${language}. Absolutely NO Hindi or English fallback unless the user explicitly requests it. Your text and script must be natively ${language}.`;
    }

    // Dynamic Consultation State Machine Injection
    const lastAiMsg = parsedConversation.slice().reverse().find(m => m.role === 'assistant');
    if (lastAiMsg) {
       const content = lastAiMsg.content.toLowerCase();
       // Check if the AI recently offered or is in the middle of asking for details
       if (content.includes("free consultation book") || 
           content.includes("book a free consultation") || 
           content.includes("kya aap chahenge") || 
           content.includes("would you like") ||
           content.includes("name") ||
           content.includes("mobile") ||
           content.includes("email") ||
           content.includes("naam") ||
           content.includes("phone")) {
           
           sysPrompt += `\n\n[CONSULTATION ACTIVE]: The user has been offered or is in the process of booking a consultation. Your task is strictly to gather their Name, Mobile Number, and Email. 
CRITICAL: Ab tum Name, phir Mobile, phir Email — ek-ek karke sequentially pucho, ek hi message mein sab mat pucho.
Agar user ka Name nahi pata, to sirf Name pucho.
Agar Name pata hai par Mobile nahi, to sirf Mobile pucho.
Agar Name aur Mobile pata hai par Email nahi, to sirf Email pucho.
Teeno mil jaane ke baad hi [LEAD_CAPTURED: name=X, mobile=Y, email=Z] tag generate karo jaisa pehle se implement hai. Aur user ko thank you bolo.`;
       }
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

    console.log('[GROQ DEBUG] Messages:', JSON.stringify(messages, null, 2));

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

    let cleanReply = sanitizeResponse(aiMessage.content);
    
    // Check for explicit Consultation Offer tag from AI
    if (cleanReply.includes("[OFFER_CONSULTATION]")) {
      cleanReply = cleanReply.replace(/\[OFFER_CONSULTATION\]/gi, '').trim();
      const isEnglish = language && language.toLowerCase().includes('english');
      const offerText = isEnglish 
        ? "Would you like me to book a Free Consultation for you?"
        : "Kya aap chahenge ki main aapke liye ek Free Consultation book kar doon?";
      cleanReply += "\n\n" + offerText;
    }
    
    // Check for lead capture tag
    const leadMatch = cleanReply.match(/\[LEAD_CAPTURED:\s*(.*?)\]/i);
    if (leadMatch) {
      console.log(`[CRM_LEAD_SAVED] Data: ${leadMatch[1]}`);
      cleanReply = cleanReply.replace(/\[LEAD_CAPTURED:\s*(.*?)\]/i, '').trim();
    }

    console.log(`\n[VOICE DEBUG] GROQ FINAL TEXT:\n${cleanReply}\n`);
    console.log(`[VOICE DEBUG] FINAL TEXT LENGTH: ${cleanReply.length}\n`);

    console.log(`[DIAGNOSTICS] /api/chat upstream success`);
    res.json({ reply: cleanReply });
  } catch (error) {
    console.error(`[DIAGNOSTICS] Chat error intercepted: ${error.message}`);
    res.status(500).json({ error: error.message || 'Sorry, I am having trouble connecting right now. Please try again in a moment.' });
  }
});

export default router;
