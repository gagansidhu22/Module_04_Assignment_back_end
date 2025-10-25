import express from "express";
import { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan } from "../controllers/loanController";

const router = express.Router();

// GET all loans
router.get("/", getAllLoans);

// GET loan by ID
router.get("/:id", getLoanById);

// POST create new loan
router.post("/", createLoan);

// PUT update loan
router.put("/:id", updateLoan);

// DELETE loan
router.delete("/:id", deleteLoan);

export default router;
