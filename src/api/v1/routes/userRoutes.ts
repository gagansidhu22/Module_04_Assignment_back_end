import express from "express";
import { getUserDetails } from "../controllers/userController";

const router = express.Router();

// GET /api/user/:uid
router.get("/:uid", getUserDetails);

export default router;
