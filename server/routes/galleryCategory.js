import express from "express";
import galleryCategory from "../models/GalleryCategory.js";
import {
  deleteItem,
  getAllItems,
  getSingleItem,
} from "../controllers/common_controller.js";
import {
  createGalleryCategory,
  deleteGalleryCategory,
  updateGalleryCategory,
} from "../controllers/galleryCategory_controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import limiter from "../middlewares/rateLimiter.js";
const router = express.Router();

//! Get All blog Data
router.get("/", (req, res) => getAllItems(req, res, galleryCategory, false));

router.get("/:id", (req, res) => getSingleItem(req, res, galleryCategory));

//! Edit or add blog data
router.post("/", limiter, authenticateToken, createGalleryCategory);

router.put("/:id", limiter, authenticateToken, updateGalleryCategory);

//! Delete Blog
router.delete("/:id", deleteGalleryCategory);

export default router;
