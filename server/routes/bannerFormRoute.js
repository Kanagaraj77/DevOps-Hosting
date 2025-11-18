import express from "express";
import { createBannerForm } from "../controllers/bannerform.js";

const router = express.Router();

// GET => http://localhost:4321/api/bannerform
router.post("/", createBannerForm);

export default router;
