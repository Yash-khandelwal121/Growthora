import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initHuggingFace } from './services/huggingFaceService.js';
import { initSpeechService } from './services/speechService.js';
import chatRoutes from './routes/chat.js';
import transcribeRoutes from './routes/transcribe.js';
import ttsRoutes from './routes/tts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize services with token
try {
  initHuggingFace(process.env.HF_TOKEN);
  initSpeechService(process.env.HF_TOKEN);
} catch (error) {
  console.error("Failed to initialize AI Services. Check your HF_TOKEN.", error.message);
}

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/transcribe', transcribeRoutes);
app.use('/api/tts', ttsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

export default app;
