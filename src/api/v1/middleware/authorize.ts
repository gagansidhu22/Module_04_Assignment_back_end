// External library imports
import { Request, Response, NextFunction } from "express";

// Internal module imports
import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/expressTypes";
import { AuthorizationError } from "../errors/errors";

/**
 * Middleware to check if a user is authorized based on their role or UID.
 * Integrated with centralized error handling system.
 *
 * - Checks if the user has required roles
 * - Optionally allows users to access their own resources
 * - Throws standardized AuthorizationError for denied access
 */
const isAuthorized = (opts: AuthorizationOptions): MiddlewareFunction => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role, uid } = res.locals;
      const { id } = req.params;

      // ✅ Case 1: Allow same-user access (if enabled)
      if (opts.allowSameUser && id && uid === id) {
        return next();
      }

      // 🚫 Case 2: No role found
      if (!role) {
        throw new AuthorizationError("Forbidden: No role found", "ROLE_NOT_FOUND");
      }

      // ✅ Case 3: Role is authorized
      if (opts.hasRole.includes(role)) {
        return next();
      }

      // 🚫 Case 4: Role not permitted
      throw new AuthorizationError("Forbidden: Insufficient role", "INSUFFICIENT_ROLE");
    } catch (error) {
      next(error); // Forward to centralized error handler
    }
  };
};

export default isAuthorized;
