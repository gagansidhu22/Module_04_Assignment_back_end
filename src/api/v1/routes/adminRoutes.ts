import express from "express";
import { setUserRole } from "../controllers/adminController";

const router = express.Router();

// POST /api/admin/setRole
router.post("/setRole", setUserRole);

export default router;
