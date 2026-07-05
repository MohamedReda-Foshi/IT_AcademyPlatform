import express from "express";
import { connection, client } from "./config/database";
import admin from "./routes/adminRoute";
import user from "./routes/userRoute";
import course from "./routes/courseRoute";
import chapter from "./routes/Chapter";
import instructor from "./routes/instructorRoute";
import quiz from "./routes/quizRoute";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json({
  verify: (req: any, _res, buf) => { req.rawBody = buf; }
}));

app.get("/", (_req, res) => {
  res.send("Home page!");
});

app.all("/api/auth/*", toNodeHandler(auth));

app.use("/dashboard", admin);
app.use("/chapter", chapter);
app.use("/user", user);
app.use("/course", course);
app.use("/instructor", instructor);
app.use("/quiz", quiz);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

async function bootstrap() {
  await client.connect();
  await connection();

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
  });
}

bootstrap();

export default app;
