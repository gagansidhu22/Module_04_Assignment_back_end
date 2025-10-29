// src/app.ts
import express from "express";
import loanRoutes from "./api/v1/routes/loanRoutes";
import userRoutes from "./api/v1/routes/userRoutes"; // if you have user routes

const app = express();

app.use(express.json());

// Mount routes
app.use("/api/v1", loanRoutes);
app.use("/api/user", userRoutes); // optional

// Start server (for dev/testing)
if (process.env.NODE_ENV !== "test") {
  app.listen(5000, () => console.log("Server running on port 5000"));
}

export default app;
