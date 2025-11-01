import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthenticationError } from "../errors/errors";
import { auth } from "../../../../config/firebase";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined;

    if (!token) {
      throw new AuthenticationError("Unauthorized: No token provided", "TOKEN_NOT_FOUND");
    }

    const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);
    res.locals.uid = decodedToken.uid;
    res.locals.role = decodedToken.role || "user";
    next();
  } catch (error) {
    next(new AuthenticationError("Unauthorized: Invalid token", "TOKEN_INVALID"));
  }
};

export default authenticate;
