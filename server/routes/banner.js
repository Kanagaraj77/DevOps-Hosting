import express from "express";
import createMulterMiddleware from "../utils/upload.js";
import banner from "../models/banner.js";
import { getAllItems } from "../controllers/common_controller.js";
import {
  bannerImageUpload,
  updateBanner,
} from "../controllers/banner-controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import limiter from "../middlewares/rateLimiter.js";

const router = express.Router();

router.get("/", (req, res) => getAllItems(req, res, banner));
router.post("/", updateBanner);
router.post(
  "/banner",
  limiter,
  authenticateToken,
  createMulterMiddleware("public/uploads/banner").single("file"),
  bannerImageUpload
);

export default router;
