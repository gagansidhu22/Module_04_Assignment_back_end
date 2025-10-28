import admin from "firebase-admin";
import path from "path";

// Use require to load the Firebase service key JSON
const serviceAccount = require(path.join(__dirname, "service-key.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
