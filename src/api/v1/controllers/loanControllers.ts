import { Request, Response } from "express";

let loans = [
  { id: 1, applicant: "Alice", amount: 5000, riskLevel: "low" },
  { id: 2, applicant: "Bob", amount: 10000, riskLevel: "high" },
];

// GET all loans
export const getAllLoans = (req: Request, res: Response) => {
  res.status(200).json({
    data: loans,
  });
};

// GET loan by ID
export const getLoanById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const loan = loans.find((l) => l.id === id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found." });
  }

  res.status(200).json({ data: loan });
};

// POST create new loan
export const createLoan = (req: Request, res: Response) => {
  const { applicant, amount, riskLevel } = req.body;

  const newLoan = {
    id: loans.length + 1,
    applicant,
    amount,
    riskLevel,
  };

  loans.push(newLoan);
  res.status(201).json({ data: newLoan });
};

// PUT update existing loan
export const updateLoan = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const loan = loans.find((l) => l.id === id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found." });
  }

  loan.amount = req.body.amount ?? loan.amount;
  res.status(200).json({ data: loan });
};

// DELETE loan
export const deleteLoan = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = loans.findIndex((l) => l.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Loan not found." });
  }

  loans.splice(index, 1);
  res.status(200).json({ message: "Loan deleted successfully." });
};
