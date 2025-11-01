import { Router } from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { welcome, createLoan, reviewLoan, getAllLoans, approveLoan } from "../controllers/loanControllers";

const router = Router();

// 🟢 Welcome route
router.get("/", welcome);

// 👤 USER: Create new loan
router.post(
  "/loans",
  authenticate,
  isAuthorized({ hasRole: ["user"] }), // ✅ correct usage
  createLoan
);

// 🟠 OFFICER: Review loan
router.put(
  "/loans/:id/review",
  authenticate,
  isAuthorized({ hasRole: ["officer"] }), // ✅ correct usage
  reviewLoan
);

// 🟣 OFFICER + MANAGER: Get all loans
router.get(
  "/loans",
  authenticate,
  isAuthorized({ hasRole: ["officer", "manager"] }), // ✅ correct usage
  getAllLoans
);

// 🔵 MANAGER: Approve loan
router.put(
  "/loans/:id/approve",
  authenticate,
  isAuthorized({ hasRole: ["manager"] }), // ✅ correct usage
  approveLoan
);

export default router;
