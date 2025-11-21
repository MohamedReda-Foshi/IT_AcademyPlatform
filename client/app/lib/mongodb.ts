import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export default clientPromise;
