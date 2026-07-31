// Load environment variables from local .env file
import 'dotenv/config';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import waitlistHandler from './api/waitlist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming request JSON
app.use(express.json());

// Serve static web files directly from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Route POST /api/waitlist to the Vercel serverless handler (adapting Express req/res)
 */
app.post('/api/waitlist', async (req, res) => {
  try {
    await waitlistHandler(req, res);
  } catch (err) {
    console.error('Error in local waitlist handler execution:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  }
});

// Universal fallback middleware compatible with Express 4 & 5
// Serves index.html from the public directory for any unmatched request
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start local server listener
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 AISPIRE Waitlist LOCAL backend server running!`);
  console.log(`🔗 Access local landing page: http://localhost:${PORT}`);
  console.log(`📡 Serving API endpoint: http://localhost:${PORT}/api/waitlist`);
  console.log('==================================================\n');
});

// Export the Express app for compatibility
export default app;


