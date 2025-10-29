import express from "express";
import dotenv from "dotenv";
import { consoleLogger, accessLogger, errorLogger } from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import loanRoutes from "./api/v1/routes/loanRoutes";
import userRoutes from "./api/v1/routes/userRoutes"; // if you have user routes

dotenv.config();

const app = express();

/**
 * ✅ Middleware integration order
 * 1. Logging (console + file)
 * 2. Body parsing (JSON)
 * 3. Routes (with auth + authorization inside routes)
 * 4. Error logging (for failed requests)
 * 5. Global error handler (final catch)
 */

// 1️⃣ Logging middleware
app.use(consoleLogger);   // dev logs in console
app.use(accessLogger);    // logs all requests to access.log

// 2️⃣ Body parsing middleware
app.use(express.json());

// 3️⃣ Routes
app.use("/api/v1", loanRoutes);
app.use("/api/user", userRoutes); // optional

// 4️⃣ Error logger (logs 4xx/5xx to error.log)
app.use(errorLogger);

// 5️⃣ Global error handler
app.use(errorHandler);

// 6️⃣ Start server (for development/testing)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

export default app;
