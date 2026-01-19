import { MongoClient } from "mongodb";

// 1. Extend the NodeJS global type
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside ");
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // 2. Now you can access it directly without casting to 'any' or 'unknown'
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export default clientPromise;