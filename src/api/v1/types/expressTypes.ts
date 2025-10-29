import { Request, Response, NextFunction } from "express";

/**
 * Custom type definition for Express middleware functions.
 */
export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
