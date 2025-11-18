import express from "express";
import blog from "../models/Event.js";
import createMulterMiddleware from "../utils/upload.js";
import {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
} from "../controllers/common_controller.js";
import {
  categoryWiseEvent,
  deleteEvent,
  eventImageUpload,
  latestEvent,
} from "../controllers/event-controller.js";
import validateRequest from "../middlewares/validate.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import limiter from "../middlewares/rateLimiter.js";
const router = express.Router();

//! Get All blog Data
router.get("/", (req, res) => getAllItems(req, res, blog, false));

router.get("/latestevents", latestEvent);
router.get("/category/:categoryname/:limits/:skip", categoryWiseEvent);
router.get("/:id", (req, res) => getSingleItem(req, res, blog));

//! Edit or add blog data
router.post(
  "/",
  limiter,
  authenticateToken,
  (req, res) => createItem(req, res, blog, "Event")
);

router.put(
  "/:id",
  limiter,
  authenticateToken,
  (req, res) => updateItem(req, res, blog, "Event")
);

//! Delete Blog
router.delete("/:id", deleteEvent);

router.post(
  "/event",
  createMulterMiddleware("public/uploads/event").single("file"),
  eventImageUpload
);

export default router;
