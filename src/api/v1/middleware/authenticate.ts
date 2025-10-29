// External library imports
import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthenticationError } from "../errors/errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";

// Internal module imports
import { auth } from "../../../../config/firebase";

/**
 * Middleware to authenticate a user using a Firebase ID token.
 * Integrated with centralized error handling system.
 *
 * This middleware:
 * - Extracts the token from the Authorization header
 * - Verifies the token with Firebase Auth
 * - Stores user info in res.locals for downstream middleware
 * - Throws standardized AuthenticationError for failures
 */
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token: string | undefined = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined;

    // Missing token
    if (!token) {
      throw new AuthenticationError(
        "Unauthorized: No token provided",
        "TOKEN_NOT_FOUND"
      );
    }

    // Verify token using Firebase
    const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);

    // Attach user info to response locals
    res.locals.uid = decodedToken.uid;
    res.locals.role = decodedToken.role || "user"; // default role if missing

    next();
  } catch (error: unknown) {
    // Pass consistent AuthenticationError to error handler
    if (error instanceof AuthenticationError) {
      next(error);
    } else if (error instanceof Error) {
      next(
        new AuthenticationError(
          `Unauthorized: ${getErrorMessage(error)}`,
          getErrorCode(error)
        )
      );
    } else {
      next(new AuthenticationError("Unauthorized: Invalid token", "TOKEN_INVALID"));
    }
  }
};

export default authenticate;
