import express from "express";
import Faculty from "../models/Faculty.js";
import createMulterMiddleware from "../utils/upload.js";
import {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
} from "../controllers/common_controller.js";
import {
  deleteFaculty,
  facultyImageUpload,
  getFacultyId,
} from "../controllers/faculty_controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import limiter from "../middlewares/rateLimiter.js";
const router = express.Router();

//! Get All Faculty Data

router.get("/", (req, res) => getAllItems(req, res, Faculty, false, ["department"]));


router.get("/:id", (req, res) => getSingleItem(req, res, Faculty));

//! Edit or add faculty data
router.post("/", limiter, authenticateToken, (req, res) =>
  createItem(req, res, Faculty, "Faculty")
);

router.put("/:id", limiter, authenticateToken, (req, res) =>
  updateItem(req, res, Faculty, "Faculty")
);

router.get("/faculty/:id", (req, res) => {
  getFacultyId(req, res, Faculty)
})

//! Delete Blog
router.delete("/:id", deleteFaculty);

router.post(
  "/profile",
  createMulterMiddleware("public/uploads/profile").single("file"),
  facultyImageUpload
);

export default router;
