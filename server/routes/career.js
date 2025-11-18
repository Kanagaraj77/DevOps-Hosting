import express from "express";
import career from "../models/Career.js";
import {
  createItem,
  deleteItem,
  getAllItems,
  getSingleItem,
  updateItem,
} from "../controllers/common_controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import limiter from "../middlewares/rateLimiter.js";

const router = express.Router();

//! Get All blog Data
router.get("/", (req, res) => getAllItems(req, res, career, false));

router.get("/:id", (req, res) => getSingleItem(req, res, career));

//! Edit or add blog data
router.post(
  "/",
  limiter, authenticateToken,
  (req, res) => createItem(req, res, career, "Career")
);

router.put(
  "/:id",
  limiter, authenticateToken,
  (req, res) => updateItem(req, res, career, "Career")
);

//! Delete Blog
router.delete("/:id", (req, res) => deleteItem(req, res, career, "Career"));

export default router;
