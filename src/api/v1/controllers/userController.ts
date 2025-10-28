import { Request, Response } from "express";
import admin from "../../../../config/firebase";

// Controller: Get user details by UID
export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await admin.auth().getUser(req.params.uid);

    res.status(200).json({
      uid: user.uid,
      email: user.email,
      claims: user.customClaims || {},
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};
