import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const DATA_URL = process.env.DATA_URL as string;

// Native MongoClient — required by better-auth's mongodbAdapter
export const client = new MongoClient(DATA_URL);
export const db = client.db(); // uses the DB name from the URI

// Mongoose connection function — used by your app server
export async function connection() {
  try {
    await mongoose.connect(DATA_URL);
    console.log("Database connected!");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
}