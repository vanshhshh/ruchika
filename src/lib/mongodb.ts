import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  const client = new MongoClient(uri);
  const clientPromise = global._mongoClientPromise ?? client.connect();

  if (process.env.NODE_ENV !== "production") {
    global._mongoClientPromise = clientPromise;
  }

  return clientPromise;
}

export default getMongoClientPromise;
