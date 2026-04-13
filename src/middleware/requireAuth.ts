import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

//  Define an interface for the authenticated request, extending the Express Request
export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

// Define the shape of the JWT payload
interface JwtPayload {
    id: string;
    email: string;
}

// Middleware to require authentication
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    // Check if the request has an authorization header
    const authHeader = req.headers.authorization;
    // If not, return 401 Unauthorized
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Missing or invalid Authorization header." });
        return;
    }

    // Extract the token from the header
    const token = authHeader.slice(7); // Remove "Bearer " prefix
    try {
        const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
        (req as AuthRequest).user = { id: payload.id, email: payload.email };
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
    } 
};