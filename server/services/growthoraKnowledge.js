import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Intent map mapping common keywords to knowledge domains
const INTENT_MAP = {
  'funding.md': ['fund', 'funding', 'loan', 'grant', 'subsidy', 'equity', 'debt', 'paisa', 'invest', 'seed', 'scheme', 'capital'],
  'msme-government-schemes.md': ['msme', 'udyam', 'government scheme', 'sarkari yojana', 'subsidy', 'scale'],
  'registrations-compliance.md': ['registration', 'compliance', 'gst', 'audit', 'trademark', 'fssai', 'iso', 'gem', 'pvt ltd', 'llp', 'proprietorship', 'company register', 'incorporation'],
  'industries.md': ['industry', 'agriculture', 'manufacturing', 'kheti', 'kisan', 'factory', 'sector', 'business type'],
  'ipo-valuation.md': ['ipo', 'valuation', 'value', 'share', 'market', 'listing', 'sme ipo', 'bse', 'nse'],
  'services.md': ['services', 'kya karta hai', 'help', 'provide', 'list', 'offer'],
  'company.md': ['company', 'about', 'overview', 'who', 'team', 'growthora', 'founder', 'contact', 'office']
};

export function searchKnowledge(query) {
  let knowledgeDir = path.join(process.cwd(), 'knowledge');
  if (!fs.existsSync(knowledgeDir)) {
    knowledgeDir = path.join(__dirname, '../../knowledge');
  }
  
  if (!fs.existsSync(knowledgeDir)) {
    console.warn(`[DIAGNOSTICS] RAG Knowledge Directory NOT FOUND! Tried: ${process.cwd()}/knowledge and ${path.join(__dirname, '../../knowledge')}`);
    return '';
  }

  const files = fs.readdirSync(knowledgeDir).filter(f => f.endsWith('.md'));
  
  const queryLower = query.toLowerCase();
  
  // 1. Calculate intent scores for each document
  const scores = files.map(file => {
    let score = 0;
    
    // Check predefined intents
    const intentKeywords = INTENT_MAP[file] || [];
    for (const kw of intentKeywords) {
      if (queryLower.includes(kw)) {
        score += 3; // High weight for exact intent match
      }
    }
    
    // Check filename direct match
    if (queryLower.includes(file.replace('.md', ''))) {
      score += 2;
    }
    
    // Read file to check embedded keywords
    const content = fs.readFileSync(path.join(knowledgeDir, file), 'utf8');
    const keywordsMatch = (content.match(/\*\*Keywords:\*\*(.*)/i)?.[1] || '').toLowerCase();
    
    if (keywordsMatch) {
      const keywords = keywordsMatch.split(',').map(k => k.trim());
      for (const k of keywords) {
        if (queryLower.includes(k) && k.length > 2) {
          score += 1;
        }
      }
    }
    
    return { file, score, content };
  });
  
  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);
  
  // 2. Combine top contexts
  let bestContexts = [];
  
  // Always include the highest scoring document if score > 0
  if (scores[0].score > 0) {
    bestContexts.push(scores[0].content);
  }
  
  // If the second highest has a strong score, include it too for multi-intent
  if (scores[1] && scores[1].score >= 3) {
    bestContexts.push(scores[1].content);
  }
  
  // 3. Fallback
  if (bestContexts.length === 0) {
    const aboutPath = path.join(knowledgeDir, 'company.md');
    const servicesPath = path.join(knowledgeDir, 'services.md');
    if (fs.existsSync(aboutPath)) bestContexts.push(fs.readFileSync(aboutPath, 'utf8'));
    if (fs.existsSync(servicesPath)) bestContexts.push(fs.readFileSync(servicesPath, 'utf8'));
  }

  // Ensure we don't blow up the context window. Limit to 3000 chars roughly.
  let combined = bestContexts.join('\n\n---\n\n');
  if (combined.length > 3500) {
    combined = combined.substring(0, 3500) + '... [Content Truncated]';
  }
  
  return combined;
}
