import express from "express";
import gallery from "../models/Gallery.js";
import createMulterMiddleware from "../utils/upload.js";
import {
  deleteItem,
  getAllItems,
  getSingleItem,
} from "../controllers/common_controller.js";
import {
  createGallery,
  editImageGallery,
  recentGallery,
  updateGallery,
} from "../controllers/gallery_controller.js";
import { ImageUpload } from "../controllers/imageUpload_controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import limiter from "../middlewares/rateLimiter.js";
const router = express.Router();

//! Get All blog Data
router.get("/", (req, res) => getAllItems(req, res, gallery, false, ["name"]));

router.get("/:id", (req, res) => getSingleItem(req, res, gallery));

//! Edit or add blog data
router.post("/", limiter, authenticateToken, createGallery);

router.put("/:id", limiter, authenticateToken, updateGallery);

//! Delete Blog
router.delete("/:id", (req, res) => deleteItem(req, res, gallery, "Gallery"));

router.post(
  "/gallery",
  createMulterMiddleware("public/uploads/gallery").single("file"),
  ImageUpload
);

// recent gallery images
router.post("/recent", recentGallery);

//  edit image in gallery
router.post("/editimage", editImageGallery);

export default router;
