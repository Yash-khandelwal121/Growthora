import express from 'express';
import { upsertLead, requestConsultation } from '../services/leadService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { sessionId, data } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }
    
    const lead = await upsertLead(sessionId, data);
    res.json({ success: true, lead });
  } catch (error) {
    console.error('[LEADS API ERROR]', error);
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

router.post('/consultation', async (req, res) => {
  try {
    const { sessionId, consultationData } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }
    
    const lead = await requestConsultation(sessionId, consultationData);
    res.json({ success: true, lead });
  } catch (error) {
    console.error('[LEADS CONSULTATION API ERROR]', error);
    res.status(500).json({ error: 'Failed to request consultation' });
  }
});

export default router;
