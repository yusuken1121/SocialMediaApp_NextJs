import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
}

export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No Authorization" });
  }
  jwt.verify(token, process.env.SECRET_KEY!, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: "token error" });
    }
    const payload = decoded as JwtPayload;
    req.userId = payload.id;
    next();
  });
};
