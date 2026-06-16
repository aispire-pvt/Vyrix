/**
 * MIGRATION SCRIPT: Backfill college field for existing waitlist documents
 * 
 * Sets college to "UPES" for all documents where the field is null or undefined.
 * Safe to run multiple times — only updates documents missing the field.
 * 
 * Usage: node migrate-college.js
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

const dbName = 'vyrix';
const collectionName = 'waitlist';

async function migrate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is missing.');
    process.exit(1);
  }

  const client = new MongoClient(uri, { tls: true });

  try {
    console.log('🔗 Connecting to MongoDB...');
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Count documents that need migration
    const countBefore = await collection.countDocuments({
      $or: [
        { college: { $exists: false } },
        { college: null },
        { college: '' },
      ],
    });

    console.log(`📊 Found ${countBefore} document(s) missing the "college" field.`);

    if (countBefore === 0) {
      console.log('✅ No migration needed — all documents already have the college field.');
      return;
    }

    // Backfill: set college to "UPES" for all documents where it is missing/null/empty
    const result = await collection.updateMany(
      {
        $or: [
          { college: { $exists: false } },
          { college: null },
          { college: '' },
        ],
      },
      { $set: { college: 'UPES' } }
    );

    console.log(`✅ Migration complete: ${result.modifiedCount} document(s) updated with college = "UPES".`);
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔒 MongoDB connection closed.');
  }
}

migrate();
