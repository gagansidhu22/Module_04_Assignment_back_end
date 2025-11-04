// config/firebase.ts
import admin from "firebase-admin";
import serviceAccount from "../service-key.json";

// Prevent error during reloads
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

// Export initialized services
const auth = admin.auth();
const db = admin.firestore();

export { admin, auth, db };
