import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID || "demo-project",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "demo@example.com",
      privateKey:
        process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") ||
        "-----BEGIN PRIVATE KEY-----FAKE-----END PRIVATE KEY-----",
    }),
  });
}

export default admin;
