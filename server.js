// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection Configuration
const uri = process.env.MONGODB_URI;
const dbName = 'vyrix';
const collectionName = 'waitlist';

let client = null;
let db = null;
let collection = null;

// Serverless-friendly dynamic database connection helper
async function getCollection() {
  if (collection) {
    return collection;
  }

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing. Please define it in your hosting provider settings (e.g., Vercel Dashboard).');
  }

  console.log('Connecting to MongoDB cluster...');
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  collection = db.collection(collectionName);

  // Ensure unique index on email to guarantee data integrity at database level
  await collection.createIndex({ email: 1 }, { unique: true });
  console.log('🟢 Successfully connected to MongoDB cluster and verified unique email index!');
  return collection;
}

// Proactively connect on startup (for long-running local/virtual servers)
// If it fails initially, it will retry dynamically on the first incoming request.
getCollection().catch((err) => {
  console.warn('⚠️ Initial MongoDB connection failed (will retry on incoming requests):', err.message);
});

// Middleware to parse incoming request JSON
app.use(express.json());

// Serve static web files directly from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * POST /api/waitlist
 * Adds a new verified email to the MongoDB waitlist database.
 */
app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  // Double-verify email syntax on server side
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email structure.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    // Dynamically retrieve collection (reuses connection or establishes a new one)
    const activeCollection = await getCollection();

    // Check for duplicate submission (case-insensitive)
    const exists = await activeCollection.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(400).json({ error: 'This email is already registered on the waitlist!' });
    }

    // Register entry
    const newEntry = {
      email: cleanEmail,
      timestamp: new Date().toISOString(),
    };

    await activeCollection.insertOne(newEntry);
    return res.status(200).json({ success: true, message: 'Successfully joined waitlist!' });
  } catch (err) {
    // Handle index duplicate key error in case of concurrent submissions
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This email is already registered on the waitlist!' });
    }
    console.error('Database query/write error:', err);
    return res.status(500).json({ error: err.message || 'Database error. Please try again later.' });
  }
});

// Universal fallback middleware compatible with Express 4 & 5
// Serves index.html from the public directory for any unmatched request
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server listener (only if run directly, not when imported as a serverless module)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 AISPIRE waitlist backend server is running!`);
    console.log(`🔗 Access local landing page: http://localhost:${PORT}`);
    console.log('==================================================\n');
  });
}

// Export the Express app for Vercel/serverless integration
module.exports = app;

