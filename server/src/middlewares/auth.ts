import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Replace with your real secret (make sure it's in .env for production)
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

// Type for JWT payload
interface JwtPayload {
  id: string;
  role: string;
}

// Extend Express Request to include `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.get("Authorization") || req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({ message: "Authorization header was not provided" });
    console.log('auh',authHeader);
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Token was not provided" });
    console.log("Token was not provided");
    console.log(token);
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any ;
    req.user = decoded;
    console.log(decoded)
   

    next();
  } catch (err) {
    res.status(401).json(console.log(err));
  }
};
