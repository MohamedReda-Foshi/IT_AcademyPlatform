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
import morgan from "morgan";
import { csrfMiddleware } from "./middlewares/csrf";

dotenv.config();

const app = express();
if (process.env.VERCEL) app.set("trust proxy", 1);

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

app.use(morgan("combined"));

app.use(express.json({
  verify: (req: any, _res, buf) => { req.rawBody = buf; }
}));

let databaseReady: Promise<void> | undefined;
function connectDatabase(): Promise<void> {
  databaseReady ??= Promise.all([client.connect(), connection()]).then(() => undefined).catch((error) => {
    databaseReady = undefined;
    throw error;
  });
  return databaseReady;
}

if (process.env.VERCEL) {
  app.use(async (_req, _res, next) => {
    try {
      await connectDatabase();
      next();
    } catch (error) {
      next(error);
    }
  });
}

app.all("/api/auth/*", toNodeHandler(auth));
app.use(csrfMiddleware);

app.get("/", (_req, res) => {
  res.send("Home page!");
});

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
  await connectDatabase();

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
  });
}

if (!process.env.VERCEL) bootstrap();

export default app;
