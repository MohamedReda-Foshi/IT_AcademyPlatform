import express from 'express';
import {connection,client} from './config/database';
import admin from './routes/adminRoute';
import user from './routes/userRoute';
import course from './routes/courseRoute';
import chapter from './routes/Chapter';
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
 
dotenv.config();

const app = express();
connection();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Home page!");
})

//auth 
// 
// 
// 
// Login Post: /api/auth/sign-in/email
// Registration: Post /api/auth/sign-up/email
// Get Session : Get /api/auth/get-Session
// Logout: Post /api/auth/sign-out


app.use(cors({
    origin: `${process.env.FRONT_END_PORT}` || "http://localhost:3000" , // frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }));

app.all("/api/auth/*", toNodeHandler(auth));

app.use('/dashboard', admin);
app.use('/chapter', chapter);
app.use('/user', user);
app.use('/course', course);

async function bootstrap() {
  await client.connect();     // connect native MongoClient (for better-auth)
  await connection();         // connect Mongoose (for your models)

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
  });
}

bootstrap();

export default app;