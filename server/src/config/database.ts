import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const DATAURL = process.env.DATAURL as string;

// Native MongoClient — required by better-auth's mongodbAdapter
export const client = new MongoClient(DATAURL);
export const db = client.db(); // uses the DB name from the URI

// Mongoose connection function — used by your app server
export async function connection() {
  try {
    await mongoose.connect(DATAURL);
    console.log("Database connected!");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
}