import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "vyrix";
const collectionName = "waitlist";

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  if (!uri) throw new Error("MONGODB_URI is not set in environment variables.");

  const client = new MongoClient(uri, { tls: true });
  await client.connect();
  cachedClient = client;
  return client;
}

export async function getWaitlistCollection() {
  const client = await connectToDatabase();
  return client.db(dbName).collection(collectionName);
}
