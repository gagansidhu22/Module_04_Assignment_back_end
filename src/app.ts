// src/app.ts
import express from "express";
import dotenv from "dotenv";
import { consoleLogger, accessLogger, errorLogger } from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import loanRoutes from "./api/v1/routes/loanRoutes";
import userRoutes from "./api/v1/routes/userRoutes";

dotenv.config();

const app = express();

/**
 * ✅ Middleware integration order
 * 1. Logging (console + file)
 * 2. Body parsing (JSON)
 * 3. Routes (with auth + authorization inside routes if required)
 * 4. Error logging (for failed requests)
 * 5. Global error handler (final catch)
 */

// 1️⃣ Logging middleware
app.use(consoleLogger);
app.use(accessLogger);

// 2️⃣ Body parsing middleware
app.use(express.json());

// 3️⃣ API routes
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/users", userRoutes);

// 4️⃣ Error logger (captures 4xx/5xx)
app.use(errorLogger);

// 5️⃣ Global error handler
app.use(errorHandler);

// 6️⃣ Start server (for local development)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

export default app;
