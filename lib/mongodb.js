import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'purplepulse';

let client;
let clientPromise;

if (!uri) {
  console.warn('MONGODB_URI is not set. Falling back to demo data mode.');
}

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export async function getDb() {
  if (!clientPromise) {
    return null;
  }

  const resolvedClient = await clientPromise;
  return resolvedClient.db(dbName);
}
