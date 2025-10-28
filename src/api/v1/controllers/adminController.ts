import admin from "../../../../config/firebase";
import { Request, Response } from "express";

export const setUserRole = async (req: Request, res: Response) => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return res.status(400).json({ message: "UID and role are required." });
    }

    // Set the custom claim (role)
    await admin.auth().setCustomUserClaims(uid, { role });

    res.status(200).json({
      message: `Role '${role}' assigned successfully to user '${uid}'.`,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error setting role",
      error: error.message,
    });
  }
};

export const getUserClaims = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    const user = await admin.auth().getUser(uid);

    res.status(200).json({
      uid: user.uid,
      email: user.email,
      claims: user.customClaims || {},
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error retrieving user claims",
      error: error.message,
    });
  }
};

