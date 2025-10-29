import { Request, Response } from "express";
import admin from "../../../../config/firebase"; // adjust path if needed

// ✅ Get user details and custom claims
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await admin.auth().getUser(uid);

    return res.status(200).json({
      uid: user.uid,
      email: user.email,
      claims: user.customClaims || {},
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error fetching user details",
      error: error.message,
    });
  }
};
