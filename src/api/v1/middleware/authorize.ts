import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { AuthorizationError } from "../errors/errors";

const isAuthorized = (opts: AuthorizationOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role, uid } = res.locals;
      const { id } = req.params;

      // Allow same user (if enabled)
      if (opts.allowSameUser && id && uid === id) {
        return next();
      }

      // No role found
      if (!role) {
        throw new AuthorizationError("Forbidden: No role found", "ROLE_NOT_FOUND");
      }

      //Role is allowed
      if (opts.hasRole.includes(role)) {
        return next();
      }

      //Role not permitted
      throw new AuthorizationError("Forbidden: Insufficient role", "INSUFFICIENT_ROLE");
    } catch (error) {
      next(error);
    }
  };
};

export default isAuthorized;
