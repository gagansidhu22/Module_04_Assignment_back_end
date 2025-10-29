// src/api/v1/routes/loanRoutes.ts
import { Router, Request, Response } from "express";

const router = Router();

interface Loan {
  id: number;
  applicant: string;
  amount: number;
  riskLevel: string;
}

let loans: Loan[] = [
  { id: 1, applicant: "Alice", amount: 5000, riskLevel: "low" },
  { id: 2, applicant: "Bob", amount: 10000, riskLevel: "high" },
];

// Welcome route
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Loan Application API is running 🚀" });
});

// Get all loans
router.get("/loans", (req: Request, res: Response) => {
  res.status(200).json({ data: loans });
});

// Get loan by ID
router.get("/loans/:id", (req: Request, res: Response) => {
  const loan = loans.find(l => l.id === parseInt(req.params.id));
  if (!loan) return res.status(404).json({ message: "Loan not found." });
  res.status(200).json({ data: loan });
});

// Create new loan
router.post("/loans", (req: Request, res: Response) => {
  const newLoan: Loan = {
    id: loans.length + 1,
    ...req.body,
  };
  loans.push(newLoan);
  res.status(201).json({ data: newLoan });
});

// Update existing loan
router.put("/loans/:id", (req: Request, res: Response) => {
  const index = loans.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Loan not found." });

  loans[index] = { ...loans[index], ...req.body };
  res.status(200).json({ data: loans[index] });
});

// Delete loan
router.delete("/loans/:id", (req: Request, res: Response) => {
  const index = loans.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Loan not found." });

  loans.splice(index, 1);
  res.status(200).json({ message: "Loan deleted successfully." });
});

export default router;
