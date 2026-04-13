import { RequestHandler } from "express";
import { AuthRequest } from "../middleware/requireAuth";
import { Response } from "express";

type AuthHandler = (req: AuthRequest, res: Response) => Promise<void> | void;

export const auth = (handler: AuthHandler): RequestHandler =>
  handler as unknown as RequestHandler;