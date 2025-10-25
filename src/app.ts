import express from "express";
import morgan from "morgan";
import loanRoutes from "./api/v1/routes/loanRoutes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// ✅ Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Loan Application API is running 🚀" });
});

// ✅ Versioned API route
app.use("/api/v1/loans", loanRoutes);

export default app;
