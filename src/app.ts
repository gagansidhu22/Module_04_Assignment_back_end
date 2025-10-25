import express from "express";
import morgan from "morgan";
import loanRoutes from "./api/v1/routes/loanRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/loans", loanRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Loan Application API is running 🚀");
});

export default app;
