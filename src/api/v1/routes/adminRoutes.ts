import { Router } from "express";
import { setUserRole, getUserClaims } from "../controllers/adminController";

const router = Router();

// Set custom claim (role)
router.post("/setRole", setUserRole);

// Get custom claim (role)
router.get("/getClaims/:uid", getUserClaims);

export default router;
