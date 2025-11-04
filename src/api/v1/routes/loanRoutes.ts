import { Router } from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import {
  createLoan,
  reviewLoan,
  getAllLoans,
  getLoanById,
  approveLoan,
  deleteLoan
} from "../controllers/loanControllers";

const router = Router();

//Create new loan
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  createLoan
);

// Get all loans
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["officer", "manager"] }),
  getAllLoans
);

//Get a loan by ID
router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["officer", "manager"] }),
  getLoanById
);

// Review loan
router.put(
  "/:id/review",
  authenticate,
  isAuthorized({ hasRole: ["officer"] }),
  reviewLoan
);

// Approve loan
router.put(
  "/:id/approve",
  authenticate,
  isAuthorized({ hasRole: ["manager"] }),
  approveLoan
);

//Delete loan
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["manager"] }),
  deleteLoan
);

export default router;


