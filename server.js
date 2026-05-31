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
if (!uri) {
  console.error('🔴 MONGODB_URI environment variable is not defined!');
}
const client = new MongoClient(uri || 'mongodb://localhost:27017');
const dbName = 'vyrix';
const collectionName = 'waitlist';

let db;
let collection;

// Establish database connection on startup
async function connectDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    db = client.db(dbName);
    collection = db.collection(collectionName);
    
    // Create a unique index on email to guarantee data integrity at database level
    await collection.createIndex({ email: 1 }, { unique: true });
    
    console.log('🟢 Successfully connected to MongoDB cluster and verified unique email index!');
  } catch (err) {
    console.error('🔴 MongoDB connection error:', err);
    // Allow the server to start, but requests will fail until DB connects
  }
}

connectDatabase();

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
    if (!collection) {
      return res.status(503).json({ error: 'Database service is currently unavailable. Please try again shortly.' });
    }

    // Check for duplicate submission (case-insensitive)
    const exists = await collection.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(400).json({ error: 'This email is already registered on the waitlist!' });
    }

    // Register entry
    const newEntry = {
      email: cleanEmail,
      timestamp: new Date().toISOString(),
    };

    await collection.insertOne(newEntry);
    return res.status(200).json({ success: true, message: 'Successfully joined waitlist!' });
  } catch (err) {
    // Handle index duplicate key error in case of concurrent submissions
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This email is already registered on the waitlist!' });
    }
    console.error('Database write error:', err);
    return res.status(500).json({ error: 'Database error. Please try again later.' });
  }
});

// Universal fallback middleware compatible with Express 4 & 5
// Serves index.html from the public directory for any unmatched request
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server listener
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 AISPIRE waitlist backend server is running!`);
  console.log(`🔗 Access local landing page: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});

