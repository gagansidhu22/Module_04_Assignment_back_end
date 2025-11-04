import { Request, Response } from "express";

// Temporary in-memory loan data
let loans = [
  { id: 1, applicant: "Alice", amount: 5000, riskLevel: "low", status: "pending" },
  { id: 2, applicant: "Bob", amount: 10000, riskLevel: "high", status: "pending" },
];

// Create new loan (User)
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

// Review loan (Officer)
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

// Get all loans (Officer + Manager)
export const getAllLoans = (req: Request, res: Response): void => {
  res.status(200).json({ data: loans });
};

// Get loan by ID  ← Add this new one
export const getLoanById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    message: `Loan ${id} details fetched successfully`,
    data: {
      id,
      borrower: "John Doe",
      amount: 5000,
      status: "pending",
    },
  });
};

// Approve loan (Manager)
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

// DELETE loan (add this new one)
export const deleteLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Example: remove from mock data or Firestore
    // For now, just respond success for demo
    return res.status(200).json({
      success: true,
      message: `Loan ${id} deleted successfully`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error deleting loan",
      error: error.message,
    });
  }
};