import { Request, Response } from "express";

// Temporary in-memory loan data
let loans = [
  { id: 1, applicant: "Alice", amount: 5000, riskLevel: "low", status: "pending" },
  { id: 2, applicant: "Bob", amount: 10000, riskLevel: "high", status: "pending" },
];

// 🟢 Welcome route controller
export const welcome = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Loan Application API is running 🚀" });
};

// 👤 Create new loan (User)
export const createLoan = (req: Request, res: Response): void => {
  const { applicant, amount, riskLevel } = req.body;

  if (!applicant || !amount || !riskLevel) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const newLoan = {
    id: loans.length + 1,
    applicant,
    amount,
    riskLevel,
    status: "pending",
  };

  loans.push(newLoan);
  res.status(201).json({ message: "Loan created successfully", data: newLoan });
};

// 🟠 Review loan (Officer)
export const reviewLoan = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const loan = loans.find((l) => l.id === id);

  if (!loan) {
    res.status(404).json({ message: "Loan not found" });
    return;
  }

  loan.status = "reviewed";
  res.status(200).json({ message: "Loan reviewed successfully", data: loan });
};

// 🟣 Get all loans (Officer + Manager)
export const getAllLoans = (req: Request, res: Response): void => {
  res.status(200).json({ data: loans });
};

// 🔵 Approve loan (Manager)
export const approveLoan = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const loan = loans.find((l) => l.id === id);

  if (!loan) {
    res.status(404).json({ message: "Loan not found" });
    return;
  }

  loan.status = "approved";
  res.status(200).json({ message: "Loan approved successfully", data: loan });
};
