import express from "express";
import { setUserRole } from "../controllers/adminController";

const router = express.Router();

router.post("/setRole", setUserRole);

export default router;
