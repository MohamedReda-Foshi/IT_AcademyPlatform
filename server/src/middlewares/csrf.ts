import { Request, Response, NextFunction } from "express";

// Cookie-authenticated writes must come from the configured frontend origin.
export function csrfMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    next();
    return;
  }

  const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
  if (req.get("origin") !== allowedOrigin) {
    res.status(403).json({ message: "Invalid request origin" });
    return;
  }

  next();
}
