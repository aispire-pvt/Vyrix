import { MongoClient } from 'mongodb';

// Dynamically load dotenv as a local development fallback if env vars aren't loaded yet
if (!process.env.MONGODB_URI) {
  try {
    const dotenv = await import('dotenv');
    dotenv.config();
  } catch (e) {
    // Ignore if dotenv is not present (e.g. in minimal production container setups)
  }
}

// MongoDB Connection Configuration
const dbName = 'vyrix';
const collectionName = 'waitlist';

// Keep connection references outside the handler to reuse them across invocations
let cachedClient = null;
let cachedDb = null;

/**
 * Lazily establishes or retrieves a cached database connection.
 * This guarantees fast warm boots for serverless functions.
 */
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing. Please define it in your Vercel Dashboard Settings.');
  }

  console.log('Connecting to MongoDB cluster (lazy connection)...');
  const client = new MongoClient(uri, {
    tls: true, // Explicitly enforce secure TLS negotiation
  });
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

/**
 * Main Vercel serverless API handler for /api/waitlist
 */
export default async function handler(req, res) {
  // Only permit POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { email, college } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  if (!college || !college.trim()) {
    return res.status(400).json({ error: 'College name is required.' });
  }

  // Rigid email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email structure.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);

    // Create unique email index on warm/cold start if not verified yet in this container instance
    if (!cachedClient.indexCreated) {
      await collection.createIndex({ email: 1 }, { unique: true });
      cachedClient.indexCreated = true;
      console.log('Verified unique email database index.');
    }

    // Check for duplicate submission (case-insensitive search)
    const exists = await collection.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(400).json({ error: 'This email is already registered on the waitlist!' });
    }

    // Insert new waitlist registration
    const newEntry = {
      email: cleanEmail,
      college: college.trim() || 'UPES',
      timestamp: new Date().toISOString(),
    };

    await collection.insertOne(newEntry);
    console.log(`🟢 Successfully added ${cleanEmail} to waitlist.`);
    
    return res.status(200).json({ success: true, message: 'Successfully joined waitlist!' });
  } catch (err) {
    // Gracefully handle duplicate database constraints (race conditions)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This email is already registered on the waitlist!' });
    }
    
    console.error('MongoDB operation error:', err);
    return res.status(500).json({ error: err.message || 'Database connection error. Please try again later.' });
  }
};
