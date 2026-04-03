import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
  });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
};