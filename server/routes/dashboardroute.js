import express from "express";
import { all } from "../controllers/dashboard.js";

const router = express.Router();

// GET => http://localhost:4321/api/dashboard
router.get("/", all);

export default router;
