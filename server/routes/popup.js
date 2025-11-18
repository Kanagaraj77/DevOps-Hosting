import express from "express";
import createMulterMiddleware from "../utils/upload.js";
import popup from "../models/Popup.js";
import { getAllItems } from "../controllers/common_controller.js";
import { ImageUpload } from "../controllers/imageUpload_controller.js";
import { updatePopup } from "../controllers/popup_controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import limiter from "../middlewares/rateLimiter.js";

const router = express.Router();

router.get("/", (req, res) => getAllItems(req, res, popup));
router.post("/", limiter, authenticateToken, updatePopup);
router.post(
  "/popup",
  createMulterMiddleware("public/uploads/popup").single("file"),
  ImageUpload
);

export default router;
