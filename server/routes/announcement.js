import express from "express";
import announcement from "../models/Announcement.js";
import { getAllItems } from "../controllers/common_controller.js";
import { updateAnnouncement } from "../controllers/announcement_controller.js";
import limiter from "../middlewares/rateLimiter.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/", (req, res) => getAllItems(req, res, announcement));
router.post("/", limiter, authenticateToken, updateAnnouncement);

export default router;
