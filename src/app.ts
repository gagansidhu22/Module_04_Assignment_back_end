// src/app.ts
import express from "express";
import dotenv from "dotenv";
import { consoleLogger, accessLogger, errorLogger } from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import loanRoutes from "./api/v1/routes/loanRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes"

dotenv.config();

const app = express();

/**
 * Middleware integration order
 * 1. Logging (console + file)
 * 2. Body parsing (JSON)
 * 3. Routes (with auth + authorization inside routes if required)
 * 4. Error logging (for failed requests)
 * 5. Global error handler (final catch)
 */

// Logging middleware
app.use(consoleLogger);
app.use(accessLogger);

// Body parsing middleware
app.use(express.json());

// API routes
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// Error logger (captures 4xx/5xx)
app.use(errorLogger);

// Global error handler
app.use(errorHandler);

export default app;
